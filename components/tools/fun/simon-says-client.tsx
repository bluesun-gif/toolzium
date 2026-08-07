"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Play, Trophy, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type ColorName = "red" | "green" | "blue" | "yellow";

const COLORS: ColorName[] = ["red", "green", "blue", "yellow"];

const FREQUENCIES: Record<ColorName, number> = {
  red: 329.63, // E4
  green: 261.63, // C4
  blue: 440.0, // A4
  yellow: 392.00, // G4
};

export function SimonSaysClient() {
  const [sequence, setSequence] = useState<ColorName[]>([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeColor, setActiveColor] = useState<ColorName | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("simon-says-highscore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playTone = (color: ColorName, duration: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Resume context if suspended
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(FREQUENCIES[color], ctx.currentTime);
    
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  };

  const showSequence = useCallback(async (currentSeq: ColorName[]) => {
    setIsShowingSequence(true);
    
    const speedMultiplier = Math.max(0.4, 1 - Math.floor(currentSeq.length / 5) * 0.15);
    const duration = 600 * speedMultiplier;
    const pause = 200 * speedMultiplier;
    
    for (let i = 0; i < currentSeq.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, pause));
      const color = currentSeq[i];
      setActiveColor(color);
      playTone(color, duration);
      await new Promise((resolve) => setTimeout(resolve, duration));
      setActiveColor(null);
    }
    
    setIsShowingSequence(false);
  }, []);

  const startGame = () => {
    initAudio();
    const firstColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setSequence([firstColor]);
    setPlayerStep(0);
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    showSequence([firstColor]);
  };

  const handleColorClick = (color: ColorName) => {
    if (!isPlaying || isShowingSequence || gameOver) return;
    
    initAudio();
    playTone(color, 200);
    setActiveColor(color);
    setTimeout(() => setActiveColor(null), 200);
    
    if (color !== sequence[playerStep]) {
      // Game Over
      setGameOver(true);
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("simon-says-highscore", score.toString());
      }
      return;
    }
    
    if (playerStep + 1 === sequence.length) {
      // Round Complete
      const newScore = score + 1;
      setScore(newScore);
      setPlayerStep(0);
      
      const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      const newSeq = [...sequence, nextColor];
      setSequence(newSeq);
      
      setTimeout(() => {
        showSequence(newSeq);
      }, 1000);
    } else {
      setPlayerStep(playerStep + 1);
    }
  };

  const getColorClasses = (color: ColorName) => {
    const baseClass = "w-full aspect-square rounded-tl-full sm:rounded-2xl transition-all duration-100 cursor-pointer shadow-lg active:scale-95";
    const isActive = activeColor === color;
    
    let colorClass = "";
    if (color === "red") {
      colorClass = isActive ? "bg-red-400 shadow-[0_0_30px_rgba(248,113,113,0.8)]" : "bg-red-700 hover:bg-red-600";
    } else if (color === "green") {
      colorClass = isActive ? "bg-green-400 shadow-[0_0_30px_rgba(74,222,128,0.8)]" : "bg-green-700 hover:bg-green-600";
    } else if (color === "blue") {
      colorClass = isActive ? "bg-blue-400 shadow-[0_0_30px_rgba(96,165,250,0.8)]" : "bg-blue-700 hover:bg-blue-600";
    } else if (color === "yellow") {
      colorClass = isActive ? "bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.8)]" : "bg-yellow-600 hover:bg-yellow-500";
    }
    
    return cn(baseClass, colorClass, (isShowingSequence || !isPlaying) && !isActive ? "opacity-50 cursor-not-allowed pointer-events-none" : "");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Brain}
        title="Simon Says"
        description="Test your memory with this classic game. Repeat the sequence of lights and sounds."
        actions={
          <Button onClick={startGame} disabled={isPlaying && !gameOver}>
            <Play className="w-4 h-4 mr-2" /> Start Game
          </Button>
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Game Board</CardTitle>
            <CardDescription>
              {isShowingSequence ? "Watch the pattern..." : isPlaying ? "Your turn!" : "Press Start Game to play"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm aspect-square p-4 bg-[#0f172a] text-[#f8fafc] rounded-full sm:rounded-3xl shadow-2xl">
              <div 
                className={cn(getColorClasses("green"), "rounded-tl-full")} 
                onClick={() => handleColorClick("green")}
              />
              <div 
                className={cn(getColorClasses("red"), "rounded-tr-full")} 
                onClick={() => handleColorClick("red")}
              />
              <div 
                className={cn(getColorClasses("yellow"), "rounded-bl-full")} 
                onClick={() => handleColorClick("yellow")}
              />
              <div 
                className={cn(getColorClasses("blue"), "rounded-br-full")} 
                onClick={() => handleColorClick("blue")}
              />
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Scoreboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-center">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Score</div>
                  <div className="text-4xl font-bold font-mono">{score}</div>
                </div>
                <div className="w-px h-12 bg-border mx-4"></div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1 flex items-center justify-center">
                    <Trophy className="w-4 h-4 mr-1 text-yellow-500" /> High Score
                  </div>
                  <div className="text-4xl font-bold font-mono text-primary">{highScore}</div>
                </div>
              </div>
            </CardContent>
          </GlassCard>

          {gameOver && (
            <GlassCard className="bg-destructive/10 border-destructive/20 animate-in zoom-in-95">
              <CardHeader>
                <CardTitle className="text-destructive">Game Over!</CardTitle>
                <CardDescription>
                  You remembered a sequence of {score} {score === 1 ? "color" : "colors"}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={startGame} className="w-full" variant="default">
                  <RotateCcw className="w-4 h-4 mr-2" /> Play Again
                </Button>
              </CardContent>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
