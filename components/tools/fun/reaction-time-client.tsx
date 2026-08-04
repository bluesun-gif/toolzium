"use client";

import { useState, useRef, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { Zap, Timer, Trophy, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

type GameState = "waiting" | "ready" | "clicked" | "early";

export function ReactionTimeClient() {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const bestScore = attempts.length > 0 ? Math.min(...attempts) : null;
  const averageScore = attempts.length > 0 ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length) : null;

  const startTest = () => {
    setGameState("ready");
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2 to 5 seconds
    timeoutRef.current = setTimeout(() => {
      setGameState("clicked");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      startTest();
    } else if (gameState === "ready") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState("early");
    } else if (gameState === "clicked") {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setGameState("waiting");
      setAttempts(prev => {
        const newAttempts = [time, ...prev].slice(0, 10);
        return newAttempts;
      });
    } else if (gameState === "early") {
      setGameState("waiting");
    }
  };

  const getRating = (ms: number) => {
    if (ms < 200) return "Superhuman ⚡";
    if (ms < 300) return "Excellent 🚀";
    if (ms < 400) return "Good 🏃";
    if (ms < 500) return "Average 🚶";
    return "Slow 🐢";
  };

  const resetScores = () => {
    setAttempts([]);
    toast.success("Scores reset!");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Zap}
        title="Reaction Time Test"
        description="Test how fast you can respond to visual cues. Click when the screen turns green!"
        actions={<ResetButton onClick={resetScores} label="Reset Scores" />}
      />

      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle>Reaction Area</CardTitle>
            <CardDescription>Click the area below based on instructions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onClick={handleClick}
              className={cn(
                "h-64 flex flex-col items-center justify-center rounded-xl cursor-pointer text-white transition-colors select-none",
                gameState === "waiting" && "bg-blue-500 hover:bg-blue-600",
                gameState === "ready" && "bg-red-500",
                gameState === "clicked" && "bg-green-500",
                gameState === "early" && "bg-orange-500"
              )}
            >
              {gameState === "waiting" && (
                <>
                  <Zap className="w-12 h-12 mb-2" />
                  <p className="text-2xl font-bold">Click to Start</p>
                  {reactionTime && (
                    <p className="mt-2 opacity-90">{reactionTime} ms ({getRating(reactionTime)})</p>
                  )}
                </>
              )}
              {gameState === "ready" && (
                <>
                  <Timer className="w-12 h-12 mb-2 animate-pulse" />
                  <p className="text-2xl font-bold">Wait for green...</p>
                </>
              )}
              {gameState === "clicked" && (
                <>
                  <Zap className="w-12 h-12 mb-2" />
                  <p className="text-2xl font-bold">CLICK!</p>
                </>
              )}
              {gameState === "early" && (
                <>
                  <RotateCcw className="w-12 h-12 mb-2" />
                  <p className="text-2xl font-bold">Too early!</p>
                  <p className="mt-2 opacity-90">Click to try again.</p>
                </>
              )}
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5" /> Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                <span className="font-medium">Best Score</span>
                <span className="font-bold text-primary">{bestScore ? `${bestScore} ms` : '-'}</span>
             </div>
             <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                <span className="font-medium">Average</span>
                <span className="font-bold">{averageScore ? `${averageScore} ms` : '-'}</span>
             </div>
             <Separator />
             <div>
                <h4 className="font-medium mb-2">Recent Attempts</h4>
                {attempts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No attempts yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {attempts.map((time, idx) => (
                      <li key={idx} className="text-sm flex justify-between items-center">
                        <span className="text-muted-foreground">#{attempts.length - idx}</span>
                        <span className="font-mono">{time} ms</span>
                      </li>
                    ))}
                  </ul>
                )}
             </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
