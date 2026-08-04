"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Label } from "@/components/ui/label";
import { Gamepad2, Trophy, RefreshCw, Grid } from "lucide-react";
import toast from "react-hot-toast";

type GameState = "idle" | "showing" | "playing" | "gameover";

export function PatternTileMemoryClient() {
  const [gridSize, setGridSize] = useState<number>(3);
  const [speed, setSpeed] = useState<number>(1000);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("patternTileHighScore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const startGame = () => {
    setScore(0);
    setSequence([]);
    setPlayerSequence([]);
    setGameState("showing");
    nextRound([]);
  };

  const nextRound = (currentSequence: number[]) => {
    const nextTile = Math.floor(Math.random() * (gridSize * gridSize));
    const newSequence = [...currentSequence, nextTile];
    setSequence(newSequence);
    setPlayerSequence([]);
    setGameState("showing");
    playSequence(newSequence);
  };

  const playSequence = async (seq: number[]) => {
    for (let i = 0; i < seq.length; i++) {
      await new Promise(r => setTimeout(r, speed / 2));
      setActiveTile(seq[i]);
      await new Promise(r => setTimeout(r, speed / 2));
      setActiveTile(null);
    }
    setGameState("playing");
  };

  const handleTileClick = (index: number) => {
    if (gameState !== "playing") return;

    setActiveTile(index);
    setTimeout(() => setActiveTile(null), 200);

    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);

    const currentIndex = newPlayerSeq.length - 1;
    if (newPlayerSeq[currentIndex] !== sequence[currentIndex]) {
      setGameState("gameover");
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("patternTileHighScore", score.toString());
        toast.success("New High Score!");
      } else {
        toast.error("Wrong tile! Game Over.");
      }
      return;
    }

    if (newPlayerSeq.length === sequence.length) {
      setScore(score + 1);
      setTimeout(() => nextRound(sequence), 1000);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Gamepad2}
        title="Tile Sequence Pattern Memory"
        description="Challenge your spatial memory by repeating the growing tile sequence."
        actions={
          <div className="flex space-x-2">
            <ResetButton onClick={() => setGameState("idle")} label="Reset Game" />
          </div>
        }
      />

      <div className={"grid grid-cols-1 md:grid-cols-3 gap-6"}>
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle>Settings & Stats</CardTitle>
            <CardDescription>Configure your challenge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Grid Size</Label>
              <Select disabled={gameState !== "idle" && gameState !== "gameover"} value={gridSize.toString()} onValueChange={(val) => setGridSize(parseInt(val))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3x3 (9 tiles)</SelectItem>
                  <SelectItem value="4">4x4 (16 tiles)</SelectItem>
                  <SelectItem value="5">5x5 (25 tiles)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Speed</Label>
              <Select disabled={gameState !== "idle" && gameState !== "gameover"} value={speed.toString()} onValueChange={(val) => setSpeed(parseInt(val))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1500">Slow</SelectItem>
                  <SelectItem value="1000">Medium</SelectItem>
                  <SelectItem value="500">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-xl font-bold">
              <span>Score:</span>
              <span className="text-primary">{score}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span className="flex items-center"><Trophy className="w-4 h-4 mr-1" /> High Score:</span>
              <span>{highScore}</span>
            </div>

            {(gameState === "idle" || gameState === "gameover") && (
              <ActionButton 
                onClick={startGame}
                icon={gameState === "gameover" ? RefreshCw : Gamepad2}
                label={gameState === "gameover" ? "Play Again" : "Start Game"}
                variant="default"
              />
            )}
          </CardContent>
        </GlassCard>

        <GlassCard className="md:col-span-2 flex flex-col items-center justify-center p-6 min-h-[400px]">
          {gameState === "idle" ? (
            <div className="text-center space-y-4">
              <Grid className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold">Ready to play?</h3>
              <p className="text-muted-foreground">Select your grid size and speed, then click start.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className={"mb-4 text-lg font-medium " + (gameState === "showing" ? "text-blue-500" : gameState === "playing" ? "text-green-500" : "text-red-500")}>
                {gameState === "showing" && "Watch the sequence..."}
                {gameState === "playing" && "Your turn!"}
                {gameState === "gameover" && "Game Over!"}
              </div>
              <div 
                className="grid gap-2"
                style={{ gridTemplateColumns: "repeat(" + gridSize + ", minmax(0, 1fr))" }}
              >
                {Array.from({ length: gridSize * gridSize }).map((_, i) => (
                  <button
                    key={i}
                    disabled={gameState !== "playing"}
                    onClick={() => handleTileClick(i)}
                    className={
                      "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg transition-all duration-200 shadow-sm " +
                      (activeTile === i 
                        ? "bg-primary scale-95 shadow-inner" 
                        : "bg-secondary hover:bg-secondary/80") +
                      (gameState === "playing" ? " cursor-pointer" : " cursor-default")
                    }
                    aria-label={"Tile " + i}
                  />
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
