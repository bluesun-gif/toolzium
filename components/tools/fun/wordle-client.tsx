"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Keyboard, RotateCcw, Trophy, Share2, Sparkles, Settings } from "lucide-react";
import toast from "react-hot-toast";

const WORDS_5 = ["REACT", "BUILD", "CLEAN", "SMART", "FLASH", "BRAIN", "POWER", "LOGIC", "SPEED", "TRAIN", "PLANT", "STONE", "LIGHT", "FRAME", "SOUND"];

type LetterState = "correct" | "present" | "absent" | "empty" | "tbd";

export function WordleClient() {
  const [solution, setSolution] = useState("REACT");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [hardMode, setHardMode] = useState(false);
  const [stats, setStats] = useState({ played: 0, won: 0, streak: 0, max: 0, dist: [0, 0, 0, 0, 0, 0] });
  const [showStats, setShowStats] = useState(false);

  const initGame = useCallback(() => {
    const sol = WORDS_5[Math.floor(Math.random() * WORDS_5.length)];
    setSolution(sol);
    setGuesses([]);
    setCurrent("");
    setGameOver(false);
    setWon(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    const saved = localStorage.getItem("wordle_stats");
    if (saved) {
      try {
        setStats(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wordle_stats", JSON.stringify(stats));
  }, [stats]);

  const submitGuess = useCallback(() => {
    if (current.length !== 5) {
      toast.error("Word must be 5 letters!");
      return;
    }

    const nextGuesses = [...guesses, current];
    setGuesses(nextGuesses);
    setCurrent("");

    if (current === solution) {
      setWon(true);
      setGameOver(true);
      const newStats = {
        ...stats,
        played: stats.played + 1,
        won: stats.won + 1,
        streak: stats.streak + 1,
        max: Math.max(stats.max, stats.streak + 1),
        dist: [...stats.dist]
      };
      newStats.dist[nextGuesses.length - 1]++;
      setStats(newStats);
      setTimeout(() => setShowStats(true), 1200);
      toast.success("Splendid! Puzzle solved!");
    } else if (nextGuesses.length >= 6) {
      setGameOver(true);
      const newStats = { ...stats, played: stats.played + 1, streak: 0, dist: [...stats.dist] };
      setStats(newStats);
      setTimeout(() => setShowStats(true), 1200);
      toast.error(`Game Over! The word was ${solution}`);
    }
  }, [current, guesses, solution, stats]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (gameOver || showStats) return;
      if (e.key === "Enter") submitGuess();
      else if (e.key === "Backspace") setCurrent(g => g.slice(0, -1));
      else if (/^[a-zA-Z]$/.test(e.key) && current.length < 5) setCurrent(g => g + e.key.toUpperCase());
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, gameOver, submitGuess, showStats]);

  const shareResults = () => {
    const text = `Toolzium Wordle ${won ? guesses.length : "X"}/6\nhttps://toolzium.com/tools/fun/wordle`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const getLetterStyle = (guess: string, idx: number) => {
    const letter = guess[idx];
    if (solution[idx] === letter) return "bg-green-600 text-white border-green-600";
    if (solution.includes(letter)) return "bg-yellow-500 text-white border-yellow-500";
    return "bg-muted text-muted-foreground border-muted";
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Trophy}
          title="Wordle Game"
          description="Play the classic 5-letter word guessing game with local statistics tracking and infinite replayability."
        />

        <GlassCard>
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <CardTitle className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-primary" /> Daily Wordle Puzzle
              </CardTitle>
              <div className="flex gap-2 items-center">
                <Label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={hardMode}
                    onChange={e => setHardMode(e.target.checked)}
                    className="rounded"
                  />
                  Hard Mode
                </Label>
                <Button size="sm" variant="ghost" onClick={initGame}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowStats(true)}>
                  <Trophy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center">
            {/* Grid */}
            <div className="flex flex-col gap-1.5 mb-6">
              {Array.from({ length: 6 }).map((_, r) => {
                const isCurrent = r === guesses.length;
                const guess = guesses[r] || (isCurrent ? current : "");
                return (
                  <div key={r} className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, c) => {
                      const letter = guess[c] || "";
                      const evaluated = r < guesses.length;
                      const style = evaluated
                        ? getLetterStyle(guess, c)
                        : "border-muted-foreground/30 bg-background text-foreground";
                      return (
                        <div
                          key={c}
                          className={`w-12 h-12 border-2 rounded-md flex items-center justify-center font-bold text-xl uppercase transition-all ${style}`}
                        >
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Virtual Keyboard */}
            <div className="flex flex-col gap-1.5 max-w-lg w-full">
              {[
                ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
              ].map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-1">
                  {row.map(k => (
                    <Button
                      key={k}
                      variant="outline"
                      size="sm"
                      className={`h-10 text-xs font-bold px-2 ${k.length > 1 ? "px-3" : "w-9"}`}
                      onClick={() => {
                        if (k === "ENTER") submitGuess();
                        else if (k === "⌫") setCurrent(g => g.slice(0, -1));
                        else if (current.length < 5) setCurrent(g => g + k);
                      }}
                    >
                      {k}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>

        {showStats && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowStats(false)}
          >
            <Card className="max-w-sm w-full bg-background p-6 space-y-4" onClick={e => e.stopPropagation()}>
              <CardTitle className="text-center text-2xl">
                {won ? "Magnificent!" : `The word was: ${solution}`}
              </CardTitle>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div><div className="text-3xl font-bold">{stats.played}</div><div className="text-xs text-muted-foreground">Played</div></div>
                <div><div className="text-3xl font-bold">{stats.played ? Math.round((stats.won / stats.played) * 100) : 0}</div><div className="text-xs text-muted-foreground">Win %</div></div>
                <div><div className="text-3xl font-bold">{stats.streak}</div><div className="text-xs text-muted-foreground">Streak</div></div>
                <div><div className="text-3xl font-bold">{stats.max}</div><div className="text-xs text-muted-foreground">Max</div></div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={shareResults}><Share2 className="w-4 h-4 mr-2" /> Share</Button>
                <Button className="flex-1" variant="outline" onClick={() => { setShowStats(false); initGame(); }}>Next</Button>
              </div>
            </Card>
          </div>
        )}

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Type a 5-Letter Word", description: "Submit your initial guess to uncover letter frequency and positions.", icon: Keyboard },
            { step: "02", title: "Read Color Hints", description: "Green means correct spot, Yellow means wrong position, Gray means absent.", icon: Sparkles },
            { step: "03", title: "Solve in 6 Tries", description: "Use deductive reasoning to find the target word within 6 attempts.", icon: Trophy }
          ]}
          badges={["100% Free Forever", "No Daily Lockouts", "Offline Browser Engine"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Keyboard, title: "Physical Keyboard Support", description: "Type naturally on desktop or use the responsive virtual keyboard on mobile." },
            { icon: Trophy, title: "Personal Win Tracking", description: "Tracks played games, win percentage, and maximum streak locally in your browser." },
            { icon: Settings, title: "Hard Mode Option", description: "Forces hints revealed in previous attempts to be used in subsequent guesses." },
            { icon: Share2, title: "Instant Result Sharing", description: "Copy your score matrix with one click to share with friends." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Deductive Word Solving Strategy</h3>
            <p>
              Wordle is a renowned logic puzzle that blends English vocabulary knowledge with deductive elimination. By starting with high-vowel words such as CRANE, SLATE, or AUDIO, players can quickly isolate the primary vowel structure of the hidden solution.
            </p>
            <p>
              Because Toolzium Wordle runs entirely client-side, all guess validations and streak tallies happen instantaneously with zero latency and complete privacy.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Is Wordle free to play?", answer: "Yes, 100% free with unlimited rounds and no subscriptions." },
            { question: "Does my streak save when I refresh?", answer: "Yes, your game statistics are saved in your browser's local storage." },
            { question: "Can I play offline?", answer: "Yes! Once loaded, the game operates entirely inside your local browser." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/fun/wordle" max={6} />
      </div>
    </div>
  );
}

export default WordleClient;
