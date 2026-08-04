"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gamepad2, Trophy, RefreshCw, Grid } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { ActionButton } from "@/components/shared/action-buttons";

export function MemorySequenceClient() {
  const [gridSize, setGridSize] = useState<"3" | "4">("3");
  const [speed, setSpeed] = useState<"slow" | "normal" | "fast">("normal");
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("memorySequenceHighScore");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  const numTiles = gridSize === "3" ? 9 : 16;
  
  const getSpeedMs = () => {
    switch(speed) {
      case "slow": return 800;
      case "fast": return 300;
      default: return 500;
    }
  };

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setLevel(1);
    setIsPlaying(true);
    setGameOver(false);
    nextLevel([]);
  };

  const nextLevel = (currentSeq: number[]) => {
    const nextTile = Math.floor(Math.random() * numTiles);
    const newSeq = [...currentSeq, nextTile];
    setSequence(newSeq);
    setPlayerSequence([]);
    playSequence(newSeq);
  };

  const playSequence = (seq: number[]) => {
    setIsShowingSequence(true);
    let i = 0;
    const speedMs = getSpeedMs();
    
    const playNext = () => {
      if (i < seq.length) {
        setActiveTile(seq[i]);
        timerRef.current = setTimeout(() => {
          setActiveTile(null);
          timerRef.current = setTimeout(playNext, speedMs / 2);
        }, speedMs);
        i++;
      } else {
        setIsShowingSequence(false);
      }
    };
    
    timerRef.current = setTimeout(playNext, 1000);
  };

  const handleTileClick = (index: number) => {
    if (!isPlaying || isShowingSequence || gameOver) return;

    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);
    
    // flash tile
    setActiveTile(index);
    setTimeout(() => setActiveTile(null), 200);

    // check if correct
    const currentIndex = newPlayerSeq.length - 1;
    if (newPlayerSeq[currentIndex] !== sequence[currentIndex]) {
      handleGameOver();
      return;
    }

    // check if level complete
    if (newPlayerSeq.length === sequence.length) {
      setIsShowingSequence(true); // disable clicks temporarily
      setTimeout(() => {
        setLevel((prev) => {
          const newLevel = prev + 1;
          if (newLevel - 1 > highScore) {
            setHighScore(newLevel - 1);
            localStorage.setItem("memorySequenceHighScore", (newLevel - 1).toString());
          }
          return newLevel;
        });
        nextLevel(sequence);
      }, 1000);
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    toast.error("Game Over! Wrong sequence.");
    if (level - 1 > highScore) {
      setHighScore(level - 1);
      localStorage.setItem("memorySequenceHighScore", (level - 1).toString());
      toast.success("New High Score!");
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const gridClass = gridSize === "3" ? "grid-cols-3" : "grid-cols-4";

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Gamepad2}
        title="Memory Tile Sequence Challenge"
        description="Test your memory with this interactive Simon-says style tile sequence game."
        actions={
          <ActionButton onClick={startGame} icon={RefreshCw} label={isPlaying ? "Restart" : "Start Game"} />
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Settings & Status</CardTitle>
            <CardDescription>Configure game options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">High Score</span>
              </div>
              <span className="text-2xl font-bold">{highScore}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-primary" />
                <span className="font-semibold">Current Level</span>
              </div>
              <span className="text-2xl font-bold">{level}</span>
            </div>
            
            <Separator />
            
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Grid Size</label>
                <Select
                  value={gridSize}
                  onValueChange={(val: "3" | "4") => {
                    setGridSize(val);
                    if (isPlaying) setGameOver(true);
                  }}
                  disabled={isPlaying && !gameOver}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3x3 (9 tiles)</SelectItem>
                    <SelectItem value="4">4x4 (16 tiles)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Speed</label>
                <Select
                  value={speed}
                  onValueChange={(val: "slow" | "normal" | "fast") => {
                    setSpeed(val);
                  }}
                  disabled={isPlaying && !gameOver}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Slow</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="fast">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </GlassCard>
        
        <GlassCard>
          <CardHeader>
            <CardTitle>Game Board</CardTitle>
            <CardDescription>
              {gameOver ? "Game Over!" : isShowingSequence ? "Watch the sequence..." : isPlaying ? "Your turn!" : "Press Start to play"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-8">
            <div className={"grid gap-2 " + gridClass}>
              {Array.from({ length: numTiles }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleTileClick(i)}
                  disabled={!isPlaying || isShowingSequence || gameOver}
                  className={cn(
                    "w-20 h-20 rounded-xl transition-all duration-200 border-2",
                    activeTile === i 
                      ? "bg-primary border-primary shadow-[0_0_20px_rgba(var(--primary),0.5)] scale-95" 
                      : "bg-muted hover:bg-muted/80 border-transparent",
                    (!isPlaying || isShowingSequence) && "cursor-not-allowed"
                  )}
                  aria-label={"Tile " + i}
                />
              ))}
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
