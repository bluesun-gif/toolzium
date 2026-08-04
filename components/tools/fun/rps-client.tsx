"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Gamepad2, Trophy, RotateCcw, History } from "lucide-react";
import { toast } from "react-hot-toast";

type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw";

interface Round {
  player: Choice;
  computer: Choice;
  result: Result;
}

export function RpsClient() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState<Round[]>([]);
  const [bestOf, setBestOf] = useState<"3" | "5" | "7" | "infinite">("infinite");
  
  const choices: Choice[] = ["rock", "paper", "scissors"];
  const emojis = { rock: "✊", paper: "✋", scissors: "✌️" };
  
  useEffect(() => {
    const saved = localStorage.getItem("rps-state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWins(parsed.wins || 0);
        setLosses(parsed.losses || 0);
        setDraws(parsed.draws || 0);
        setStreak(parsed.streak || 0);
        setHistory(parsed.history || []);
        setBestOf(parsed.bestOf || "infinite");
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rps-state", JSON.stringify({ wins, losses, draws, streak, history, bestOf }));
  }, [wins, losses, draws, streak, history, bestOf]);

  const play = (playerChoice: Choice) => {
    if (bestOf !== "infinite") {
      const target = Math.ceil(parseInt(bestOf) / 2);
      if (wins >= target || losses >= target) {
        toast("Match over! Reset to play again.");
        return;
      }
    }

    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    let result: Result = "draw";

    if (playerChoice === compChoice) {
      result = "draw";
      setDraws((d) => d + 1);
      setStreak(0);
      toast("It's a draw!");
    } else if (
      (playerChoice === "rock" && compChoice === "scissors") ||
      (playerChoice === "paper" && compChoice === "rock") ||
      (playerChoice === "scissors" && compChoice === "paper")
    ) {
      result = "win";
      setWins((w) => w + 1);
      setStreak((s) => s + 1);
      toast.success("You win!");
    } else {
      result = "lose";
      setLosses((l) => l + 1);
      setStreak(0);
      toast.error("You lose!");
    }

    setHistory((h) => [{ player: playerChoice, computer: compChoice, result }, ...h].slice(0, 50));
  };

  const reset = () => {
    setWins(0);
    setLosses(0);
    setDraws(0);
    setStreak(0);
    setHistory([]);
    toast.success("Scores reset!");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader icon={Gamepad2} title="Rock Paper Scissors" description="Play against the computer" actions={<ResetButton onClick={reset} label="Reset Game" />} />
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Play</CardTitle>
            <CardDescription>Select your move</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between gap-4">
              <Button variant="outline" className="flex-1 h-24 text-4xl" onClick={() => play("rock")}>{emojis.rock}</Button>
              <Button variant="outline" className="flex-1 h-24 text-4xl" onClick={() => play("paper")}>{emojis.paper}</Button>
              <Button variant="outline" className="flex-1 h-24 text-4xl" onClick={() => play("scissors")}>{emojis.scissors}</Button>
            </div>
            <div className="flex items-center space-x-2 pt-4">
              <Select value={bestOf} onValueChange={(val: any) => setBestOf(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infinite">Infinite Mode</SelectItem>
                  <SelectItem value="3">Best of 3</SelectItem>
                  <SelectItem value="5">Best of 5</SelectItem>
                  <SelectItem value="7">Best of 7</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-500">{wins}</div>
                <div className="text-sm text-muted-foreground">Wins</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">{losses}</div>
                <div className="text-sm text-muted-foreground">Losses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-500">{draws}</div>
                <div className="text-sm text-muted-foreground">Draws</div>
              </div>
            </div>
            <div className="text-center pt-2">
              <div className="text-xl font-bold">Streak: {streak} 🔥</div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Match History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {history.length === 0 && <p className="text-muted-foreground text-sm">No history yet.</p>}
            {history.map((round, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 rounded-md bg-secondary/50">
                <span>{emojis[round.player]} vs {emojis[round.computer]}</span>
                <span className={round.result === "win" ? "text-green-500" : round.result === "lose" ? "text-red-500" : "text-gray-500"}>
                  {round.result.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
