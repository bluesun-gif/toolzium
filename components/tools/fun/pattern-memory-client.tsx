"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Grid, Play, Trophy, RotateCcw } from "lucide-react";
import { toast } from "react-hot-toast";

export function PatternMemoryClient() {
  const [gridSize, setGridSize] = useState("3");
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const savedScore = localStorage.getItem("memoryHighScore");
    if (savedScore) setHighScore(parseInt(savedScore, 10));
    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
  }, []);

  const playTone = (frequency: number) => {
    if (!audioCtxRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gainNode = audioCtxRef.current.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
    osc.connect(gainNode);
    gainNode.connect(audioCtxRef.current.destination);
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.5);
  };

  const startGame = () => {
    setGameOver(false);
    setLevel(1);
    setUserPattern([]);
    generatePattern(1);
  };

  const generatePattern = (currentLevel: number) => {
    const size = parseInt(gridSize, 10);
    const totalTiles = size * size;
    const newPattern = [];
    for (let i = 0; i < currentLevel + 2; i++) {
      newPattern.push(Math.floor(Math.random() * totalTiles));
    }
    setPattern(newPattern);
    showPattern(newPattern);
  };

  const showPattern = (patt: number[]) => {
    setIsPlaying(true);
    setIsShowingPattern(true);
    setUserPattern([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= patt.length) {
        clearInterval(interval);
        setIsShowingPattern(false);
        return;
      }
      playTone(200 + patt[i] * 50);
      setUserPattern([patt[i]]);
      setTimeout(() => setUserPattern([]), 400);
      i++;
    }, 800);
  };

  const handleTileClick = (index: number) => {
    if (isShowingPattern || !isPlaying || gameOver) return;
    playTone(200 + index * 50);
    const newUserPattern = [...userPattern, index];
    setUserPattern(newUserPattern);

    if (newUserPattern[newUserPattern.length - 1] !== pattern[newUserPattern.length - 1]) {
      endGame();
      return;
    }

    if (newUserPattern.length === pattern.length) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      if (nextLevel > highScore) {
        setHighScore(nextLevel);
        localStorage.setItem("memoryHighScore", nextLevel.toString());
      }
      setTimeout(() => generatePattern(nextLevel), 1000);
    }
  };

  const endGame = () => {
    setGameOver(true);
    setIsPlaying(false);
    playTone(100);
    toast.error("Game Over! Incorrect pattern.");
  };

  const size = parseInt(gridSize, 10);
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(" + size + ", 1fr)",
    gap: "0.5rem",
    maxWidth: "400px",
    margin: "0 auto",
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Grid}
        title="Memory Pattern Game"
        description="Test your memory with this visual grid pattern game."
        actions={
          <ActionButton onClick={startGame} icon={Play} label="Start Game" variant="default" />
        }
      />
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Game Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Difficulty (Grid Size)</label>
              <Select value={gridSize} onValueChange={setGridSize} disabled={isPlaying}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Easy (3x3)</SelectItem>
                  <SelectItem value="4">Medium (4x4)</SelectItem>
                  <SelectItem value="5">Hard (5x5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center bg-muted p-4 rounded-md">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Current Level</span>
                <span className="text-2xl font-bold">{level}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-muted-foreground flex items-center"><Trophy className="w-4 h-4 mr-1" /> High Score</span>
                <span className="text-2xl font-bold">{highScore}</span>
              </div>
            </div>
            {gameOver && (
              <div className="text-center p-4 bg-destructive/10 text-destructive rounded-md">
                <p className="font-bold">Game Over!</p>
                <p className="text-sm">You reached level {level}</p>
                <Button onClick={startGame} className="mt-2 w-full"><RotateCcw className="w-4 h-4 mr-2" /> Play Again</Button>
              </div>
            )}
          </CardContent>
        </GlassCard>
        <GlassCard>
          <CardHeader>
            <CardTitle>Game Board</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={gridStyle}>
              {Array.from({ length: size * size }).map((_, i) => {
                const isActive = (isShowingPattern && userPattern[0] === i) || (!isShowingPattern && userPattern.includes(i) && !gameOver);
                return (
                  <button
                    key={i}
                    onClick={() => handleTileClick(i)}
                    disabled={isShowingPattern || !isPlaying || gameOver}
                    className={"aspect-square rounded-md transition-all duration-200 " + (isActive ? "bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-95" : "bg-muted hover:bg-muted/80")}
                  />
                );
              })}
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
