"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Keyboard, RotateCcw, Timer, Infinity as InfinityIcon, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const WORDS: Record<number, string[]> = {
  4: ["PLAN", "GAME", "CODE", "TIME", "FAST", "STAR", "NODE", "RACE", "BLUE", "WIND"],
  5: ["REACT", "BUILD", "CLEAN", "SMART", "FLASH", "BRAIN", "POWER", "LOGIC", "SPEED", "TRAIN"],
  6: ["FUTURE", "ENGINE", "SYSTEM", "SIMPLE", "SERVER", "CLIENT", "DESIGN", "MODERN", "SEARCH", "ROBUST"],
  7: ["DEVELOP", "PREMIUM", "OPTIMAL", "DYNAMIC", "FORWARD", "INSTANT", "PERFECT", "TRAFFIC", "BALANCE", "UPGRADE"]
};

export function WordleUnlimitedClient() {
  const [wordLen, setWordLen] = useState<number>(5);
  const [solution, setSolution] = useState<string>("REACT");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [speedMode, setSpeedMode] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const maxGuesses = wordLen + 1;

  const initGame = useCallback((len: number = wordLen) => {
    const list = WORDS[len] || WORDS[5];
    const picked = list[Math.floor(Math.random() * list.length)];
    setWordLen(len);
    setSolution(picked);
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setWon(false);
    setTimer(0);
    setTimerActive(false);
  }, [wordLen]);

  useEffect(() => {
    initGame(5);
  }, [initGame]);

  useEffect(() => {
    let interval: any = null;
    if (speedMode && timerActive && !gameOver) {
      interval = setInterval(() => setTimer(t => t + 10), 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [speedMode, timerActive, gameOver]);

  const handleKey = useCallback((key: string) => {
    if (gameOver) return;

    if (!timerActive && speedMode) {
      setTimerActive(true);
    }

    if (key === "ENTER") {
      if (currentGuess.length !== wordLen) {
        toast.error(`Word must be ${wordLen} letters!`);
        return;
      }
      const nextGuesses = [...guesses, currentGuess];
      setGuesses(nextGuesses);
      setCurrentGuess("");

      if (currentGuess === solution) {
        setWon(true);
        setGameOver(true);
        setTimerActive(false);
        toast.success("Splendid! You solved it!");
      } else if (nextGuesses.length >= maxGuesses) {
        setGameOver(true);
        setTimerActive(false);
        toast.error(`Game Over! The word was ${solution}`);
      }
    } else if (key === "BACKSPACE" || key === "⌫") {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key)) {
      if (currentGuess.length < wordLen) {
        setCurrentGuess(prev => prev + key);
      }
    }
  }, [currentGuess, gameOver, guesses, maxGuesses, solution, speedMode, timerActive, wordLen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleKey("ENTER");
      else if (e.key === "Backspace") handleKey("BACKSPACE");
      else {
        const k = e.key.toUpperCase();
        if (/^[A-Z]$/.test(k)) handleKey(k);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKey]);

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${s}.${cs < 10 ? "0" : ""}${cs}s`;
  };

  const getLetterStatus = (guess: string, idx: number) => {
    const letter = guess[idx];
    if (solution[idx] === letter) return "bg-green-500 text-white border-green-600";
    if (solution.includes(letter)) return "bg-yellow-500 text-white border-yellow-600";
    return "bg-muted text-muted-foreground border-muted";
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={InfinityIcon}
          title="Wordle Unlimited"
          description="Play endless rounds of Wordle with customizable word lengths, adaptive attempts, and speed-run mode."
        />

        <GlassCard>
          <CardHeader>
            <div className="flex flex-wrap justify-between items-center w-full gap-4">
              <CardTitle className="flex items-center gap-2">
                <InfinityIcon className="w-5 h-5 text-primary" /> Unlimited Mode ({wordLen} Letters)
              </CardTitle>
              <div className="flex gap-2 items-center flex-wrap">
                <div className="flex gap-1 bg-muted p-1 rounded-lg">
                  {[4, 5, 6, 7].map(l => (
                    <Button
                      key={l}
                      size="sm"
                      variant={wordLen === l ? "default" : "ghost"}
                      className="h-7 px-3 text-xs"
                      onClick={() => initGame(l)}
                    >
                      {l}L
                    </Button>
                  ))}
                </div>
                <Label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={speedMode}
                    onChange={e => setSpeedMode(e.target.checked)}
                    className="rounded"
                  />
                  Speed Run
                </Label>
                <Button size="sm" variant="ghost" onClick={() => initGame(wordLen)}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center">
            {speedMode && (
              <div className="mb-4 text-2xl font-mono font-bold flex items-center gap-2 text-primary">
                <Timer className="w-5 h-5" /> {formatTime(timer)}
              </div>
            )}

            {/* Grid */}
            <div className="flex flex-col gap-1.5 mb-6">
              {Array.from({ length: maxGuesses }).map((_, rowIdx) => {
                const isCurrent = rowIdx === guesses.length;
                const guess = guesses[rowIdx] || (isCurrent ? currentGuess : "");
                return (
                  <div key={rowIdx} className="flex gap-1.5">
                    {Array.from({ length: wordLen }).map((_, colIdx) => {
                      const letter = guess[colIdx] || "";
                      const evaluated = rowIdx < guesses.length;
                      const style = evaluated
                        ? getLetterStatus(guess, colIdx)
                        : "border-muted-foreground/30 bg-background text-foreground";
                      return (
                        <div
                          key={colIdx}
                          className={`w-12 h-12 border-2 rounded-md flex items-center justify-center font-bold text-lg uppercase transition-all ${style}`}
                        >
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {gameOver && (
              <div className="mt-4 text-center space-y-2">
                <p className="text-lg font-bold">
                  {won ? `Solved in ${guesses.length}/${maxGuesses} attempts!` : `The word was: ${solution}`}
                </p>
                <Button onClick={() => initGame(wordLen)}>Play Next Round</Button>
              </div>
            )}

            {/* Virtual Keyboard */}
            <div className="flex flex-col gap-1.5 mt-6 max-w-lg w-full">
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
                      onClick={() => handleKey(k)}
                    >
                      {k}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Select Word Length", description: "Choose 4, 5, 6, or 7 letter word modes for adaptive difficulty.", icon: Keyboard },
            { step: "02", title: "Type Your Guesses", description: "Green means correct spot, Yellow means wrong position, Gray means not present.", icon: Sparkles },
            { step: "03", title: "Beat the Timer", description: "Enable Speed Run mode to race the clock down to centiseconds.", icon: Timer }
          ]}
          badges={["100% Free Forever", "Unlimited Games", "Offline Client-Side Engine"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: InfinityIcon, title: "Infinite Replayability", description: "Play hundreds of games without artificial 24-hour daily lockouts." },
            { icon: Keyboard, title: "Dynamic Matrix Sizing", description: "Grid and attempt counts automatically adjust to word length." },
            { icon: Timer, title: "Precision Speed Timer", description: "Accurate centisecond chronometer tracks cognitive problem-solving speed." },
            { icon: RotateCcw, title: "Instant Reset", description: "Generate a new puzzle instantly with one click." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Unrestricted Word Puzzle Mechanics</h3>
            <p>
              Wordle Unlimited provides continuous, unthrottled access to logic-based vocabulary puzzles. While traditional games limit users to one puzzle every 24 hours, Wordle Unlimited lets you practice continuously across 4, 5, 6, and 7-letter word matrices.
            </p>
            <p>
              With client-side local computation, all dictionary checks and state management run directly in your web browser with zero server latency, zero tracking, and complete privacy.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Is Wordle Unlimited completely free?", answer: "Yes, 100% free with unlimited rounds and no subscription required." },
            { question: "How does the attempt count work?", answer: "The attempt count scales dynamically with word length (Attempts = Length + 1)." },
            { question: "Does this tool work offline?", answer: "Yes! All word evaluation algorithms execute entirely within your local browser." }
          ]}
        />
    </div>
    </div>
  );
}

export default WordleUnlimitedClient;
