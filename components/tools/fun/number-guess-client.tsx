"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Hash, TrendingUp, Trophy, RotateCcw } from "lucide-react";
import { toast } from "react-hot-toast";

type Difficulty = "Easy" | "Medium" | "Hard";

export function NumberGuessClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [target, setTarget] = useState(50);
  const [guesses, setGuesses] = useState<number[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [bestScores, setBestScores] = useState<Record<Difficulty, number | null>>({ Easy: null, Medium: null, Hard: null });
  const [streak, setStreak] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initGame = useCallback((diff: Difficulty = difficulty) => {
    let newMax = 100;
    if (diff === "Easy") newMax = 50;
    else if (diff === "Hard") newMax = 1000;
    
    setMax(newMax);
    setMin(1);
    setTarget(Math.floor(Math.random() * newMax) + 1);
    setGuesses([]);
    setCurrentGuess("");
    setStatus("playing");
    setStartTime(Date.now());
    setTimeElapsed(0);
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
  }, [difficulty, startTime]);

  useEffect(() => {
    const savedScores = localStorage.getItem("numberGuessBestScores");
    if (savedScores) {
      try { setBestScores(JSON.parse(savedScores)); } catch (e) {}
    }
    const savedStreak = localStorage.getItem("numberGuessStreak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
    initGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== "playing" && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [status]);

  const handleDifficultyChange = (val: string) => {
    const d = val as Difficulty;
    setDifficulty(d);
    initGame(d);
  };

  const handleGuess = () => {
    if (status !== "playing") return;
    const num = parseInt(currentGuess, 10);
    if (isNaN(num) || num < min || num > max) {
      toast.error(`Please enter a number between ${min} and ${max}`);
      return;
    }
    if (guesses.includes(num)) {
      toast.error("You already guessed that number!");
      return;
    }

    const newGuesses = [...guesses, num];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (num === target) {
      setStatus("won");
      toast.success(`You won in ${newGuesses.length} guesses!`);
      const currentBest = bestScores[difficulty];
      if (currentBest === null || newGuesses.length < currentBest) {
        const newBest = { ...bestScores, [difficulty]: newGuesses.length };
        setBestScores(newBest);
        localStorage.setItem("numberGuessBestScores", JSON.stringify(newBest));
        toast.success("New Best Score!");
      }
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem("numberGuessStreak", newStreak.toString());
    } else {
      setStreak(0);
      localStorage.setItem("numberGuessStreak", "0");
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Hash}
        title="Number Guessing Game"
        description="A fun classic game. Guess the number as fast as you can!"
        actions={
          <ActionButton onClick={() => initGame()} icon={RotateCcw} label="Restart Game" />
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Play Area</CardTitle>
            <CardDescription>Guess a number between {min} and {max}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={difficulty} onValueChange={handleDifficultyChange} disabled={status === "playing" && guesses.length > 0}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy (1-50)</SelectItem>
                    <SelectItem value="Medium">Medium (1-100)</SelectItem>
                    <SelectItem value="Hard">Hard (1-1000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground mb-2">Time: {timeElapsed}s</div>
            </div>

            <Separator />

            {status === "won" ? (
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-2">You Won! 🎉</h3>
                <p>The number was {target}.</p>
                <p>It took you {guesses.length} guesses and {timeElapsed} seconds.</p>
                <Button onClick={() => initGame()} className="mt-4">Play Again</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleGuess();
                    }}
                    placeholder={`Enter a number`}
                    min={min}
                    max={max}
                  />
                  <Button onClick={handleGuess}>Guess</Button>
                </div>
                {guesses.length > 0 && (
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {guesses[guesses.length - 1] > target ? "Too High!" : "Too Low!"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Stats & History</CardTitle>
            <CardDescription>Your game statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Current Streak</span>
              </div>
              <span className="text-xl font-bold">{streak}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Best Scores (Fewest Guesses)</h3>
              <div className="grid grid-cols-3 gap-2">
                {(["Easy", "Medium", "Hard"] as Difficulty[]).map((d) => (
                  <div key={d} className="bg-muted p-2 rounded text-center">
                    <div className="text-xs text-muted-foreground">{d}</div>
                    <div className="font-bold">{bestScores[d] ?? "-"}</div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Guess History
              </h3>
              <div className="flex flex-wrap gap-2">
                {guesses.map((g, i) => (
                  <div
                    key={i}
                    className={"px-3 py-1 rounded-full text-sm " + (g === target
                        ? "bg-green-500/20 text-green-700"
                        : g > target
                        ? "bg-red-500/20 text-red-700"
                        : "bg-blue-500/20 text-blue-700")}
                  >
                    {g} {g === target ? "✓" : g > target ? "↓" : "↑"}
                  </div>
                ))}
                {guesses.length === 0 && (
                  <span className="text-sm text-muted-foreground">No guesses yet</span>
                )}
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
