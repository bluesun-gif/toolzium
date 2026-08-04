"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/shared/action-buttons";
import { Gamepad2, Trophy, RefreshCw, Grid } from "lucide-react";
import { toast } from "react-hot-toast";

export function MemoryGridFlipClient() {
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gridSize, setGridSize] = useState(3);
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [gameState, setGameState] = useState<"start" | "memorize" | "play" | "gameover" | "win">("start");
  const [message, setMessage] = useState("Click Start Game to begin!");

  useEffect(() => {
    const savedHighScore = localStorage.getItem("memoryGridHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const generatePattern = (lvl: number, size: number) => {
    const numTiles = Math.min(lvl + 2, size * size - 1);
    const newPattern: number[] = [];
    while (newPattern.length < numTiles) {
      const randomTile = Math.floor(Math.random() * (size * size));
      if (!newPattern.includes(randomTile)) {
        newPattern.push(randomTile);
      }
    }
    return newPattern;
  };

  const startGame = () => {
    setLevel(1);
    setLives(3);
    setScore(0);
    setGridSize(3);
    startLevel(1, 3);
  };

  const startLevel = (currentLevel: number, currentSize: number) => {
    setGameState("memorize");
    setUserPattern([]);
    const newPattern = generatePattern(currentLevel, currentSize);
    setPattern(newPattern);
    setMessage("Memorize the pattern...");

    setTimeout(() => {
      setGameState("play");
      setMessage("Recall the pattern!");
    }, Math.max(1000, 3000 - currentLevel * 100)); // Faster as level increases
  };

  const handleTileClick = (index: number) => {
    if (gameState !== "play") return;

    if (pattern.includes(index)) {
      if (!userPattern.includes(index)) {
        const newUserPattern = [...userPattern, index];
        setUserPattern(newUserPattern);
        setScore(score + level * 10);
        
        if (newUserPattern.length === pattern.length) {
          handleLevelComplete();
        }
      }
    } else {
      handleWrongMove();
    }
  };

  const handleLevelComplete = () => {
    if (level === 20) {
      setGameState("win");
      setMessage("You Won! Maximum Level Reached!");
      updateHighScore(score + level * 10);
      toast.success("Congratulations! You beat the game!");
    } else {
      const nextLevel = level + 1;
      const nextSize = nextLevel > 5 ? (nextLevel > 12 ? 5 : 4) : 3;
      setLevel(nextLevel);
      setGridSize(nextSize);
      toast.success("Level Cleared!");
      setTimeout(() => {
        startLevel(nextLevel, nextSize);
      }, 1000);
    }
  };

  const handleWrongMove = () => {
    if (lives > 1) {
      setLives(lives - 1);
      toast.error("Wrong tile! Try again.");
      setGameState("memorize");
      setUserPattern([]);
      setMessage("Memorize the pattern...");
      setTimeout(() => {
        setGameState("play");
        setMessage("Recall the pattern!");
      }, 1500);
    } else {
      setGameState("gameover");
      setMessage("Game Over!");
      updateHighScore(score);
      toast.error("Game Over! Out of lives.");
    }
  };

  const updateHighScore = (currentScore: number) => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem("memoryGridHighScore", currentScore.toString());
      toast.success("New High Score!");
    }
  };

  const renderGrid = () => {
    const tiles = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      let isIlluminated = false;
      let isCorrect = false;

      if (gameState === "memorize") {
        isIlluminated = pattern.includes(i);
      } else if (gameState === "play" || gameState === "gameover" || gameState === "win") {
        isCorrect = userPattern.includes(i);
        if (gameState === "gameover" && pattern.includes(i) && !userPattern.includes(i)) {
           // Show missed tiles on game over
           isIlluminated = true; 
        }
      }

      let tileClass = "w-full h-16 sm:h-20 md:h-24 rounded-lg transition-all duration-300 ";
      if (gameState === "play" && !isCorrect) {
          tileClass += "bg-muted hover:bg-muted-foreground/20 cursor-pointer";
      } else if (isIlluminated) {
          tileClass += "bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)]";
      } else if (isCorrect) {
          tileClass += "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]";
      } else if (gameState === "gameover" && userPattern.includes(i) && !pattern.includes(i)) {
          tileClass += "bg-destructive"; // clicked wrong
      } else {
          tileClass += "bg-muted";
      }

      tiles.push(
        <div
          key={i}
          className={tileClass}
          onClick={() => handleTileClick(i)}
        />
      );
    }
    
    let gridClass = "grid gap-2 sm:gap-4 mx-auto ";
    if (gridSize === 3) gridClass += "grid-cols-3 max-w-[300px]";
    else if (gridSize === 4) gridClass += "grid-cols-4 max-w-[400px]";
    else gridClass += "grid-cols-5 max-w-[500px]";

    return <div className={gridClass}>{tiles}</div>;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Gamepad2}
        title="Memory Grid Flip Challenge"
        description="Test your memory! Memorize the pattern and click to recall."
        actions={
          <ActionButton onClick={startGame} icon={RefreshCw} label="Restart Game" />
        }
      />

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Grid className="w-4 h-4" /> Level
                </span>
                <span className="font-bold text-xl">{level}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Lives</span>
                <span className="font-bold text-xl text-destructive">{lives} ❤️</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Score</span>
                <span className="font-bold text-xl">{score}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" /> High Score
                </span>
                <span className="font-bold text-xl text-yellow-500">{highScore}</span>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className="md:col-span-2">
          <GlassCard className="h-full min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-bold mb-6 min-h-[32px]">{message}</h3>
            
            {(gameState === "start" || gameState === "gameover" || gameState === "win") ? (
              <Button size="lg" onClick={startGame} className="mb-8">
                {gameState === "start" ? "Start Game" : "Play Again"}
              </Button>
            ) : null}

            {gameState !== "start" && (
              <div className="w-full">
                {renderGrid()}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
