"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Gamepad2, Trophy, RotateCcw, HelpCircle } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const WORD_LIST = ["APPLE", "TRAIN", "BEACH", "CHAIR", "DANCE", "EAGLE", "FROGS", "GHOST", "HEART", "IGLOO", "JUICE", "KNIFE", "LEMON", "MAGIC", "NIGHT", "OCEAN", "PIZZA", "QUEEN", "RIVER", "SNAKE", "TIGER", "UMBRA", "VOICE", "WATER", "XENON", "YACHT", "ZEBRA", "BRAIN", "CLOUD", "DREAM"];
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

export function WordleClient() {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [stats, setStats] = useState({ played: 0, won: 0, currentStreak: 0, maxStreak: 0 });

  useEffect(() => {
    startNewGame();
    const savedStats = localStorage.getItem("wordleStats");
    if (savedStats) {
      try { setStats(JSON.parse(savedStats)); } catch (e) {}
    }
  }, []);

  const saveStats = (won: boolean) => {
    setStats(prev => {
      const newStats = {
        played: prev.played + 1,
        won: prev.won + (won ? 1 : 0),
        currentStreak: won ? prev.currentStreak + 1 : 0,
        maxStreak: won ? Math.max(prev.maxStreak, prev.currentStreak + 1) : prev.maxStreak
      };
      localStorage.setItem("wordleStats", JSON.stringify(newStats));
      return newStats;
    });
  };

  const startNewGame = () => {
    setTargetWord(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
    setGuesses([]);
    setCurrentGuess("");
    setGameState("playing");
  };

  const onKeyPress = useCallback((key: string) => {
    if (gameState !== "playing") return;
    
    if (key === "ENTER") {
      if (currentGuess.length !== WORD_LENGTH) {
        toast.error("Not enough letters");
        return;
      }
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      if (currentGuess === targetWord) {
        setGameState("won");
        toast.success("You won!");
        saveStats(true);
      } else if (newGuesses.length >= MAX_ATTEMPTS) {
        setGameState("lost");
        toast.error("Game over. Word was " + targetWord);
        saveStats(false);
      }
      setCurrentGuess("");
    } else if (key === "BACKSPACE" || key === "DELETE") {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameState, guesses, targetWord]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") onKeyPress("ENTER");
      else if (e.key === "Backspace") onKeyPress("BACKSPACE");
      else {
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) onKeyPress(key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  const getKeyStatus = (key: string) => {
    let status = "";
    guesses.forEach(guess => {
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === key) {
          if (targetWord[i] === key) status = "correct";
          else if (targetWord.includes(key) && status !== "correct") status = "present";
          else if (status !== "correct" && status !== "present") status = "absent";
        }
      }
    });
    return status;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Gamepad2}
        title="Word Guess Game"
        description="A 5-letter word guessing game. 6 attempts to find the hidden word."
        actions={
          <div className="flex gap-2">
            <ResetButton onClick={startNewGame} label="New Game" />
            <ActionButton onClick={() => {
              if (gameState === "playing") {
                setGameState("lost");
                toast.error("Given up! Word was " + targetWord);
                saveStats(false);
              }
            }} icon={HelpCircle} label="Give Up" variant="outline" size="default" />
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle>Game Board</CardTitle>
            <CardDescription>Guess the 5-letter word</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="grid grid-rows-6 gap-2">
              {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => {
                const guess = i < guesses.length ? guesses[i] : i === guesses.length ? currentGuess : "";
                return (
                  <div key={i} className="flex gap-2">
                    {Array.from({ length: WORD_LENGTH }).map((_, j) => {
                      const letter = guess[j] || "";
                      let bgColor = "bg-secondary";
                      if (i < guesses.length) {
                        if (letter === targetWord[j]) bgColor = "bg-green-500 text-white border-green-600";
                        else if (targetWord.includes(letter)) bgColor = "bg-yellow-500 text-white border-yellow-600";
                        else bgColor = "bg-gray-500 text-white border-gray-600";
                      }
                      return (
                        <div key={j} className={"w-12 h-12 flex items-center justify-center text-2xl font-bold uppercase border-2 " + bgColor + (letter && i === guesses.length ? " border-primary" : "")}>
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 flex flex-col gap-2">
              {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, i) => (
                <div key={i} className="flex justify-center gap-1">
                  {i === 2 && <Button variant="secondary" className="px-2" onClick={() => onKeyPress("ENTER")}>ENTER</Button>}
                  {row.split("").map(key => {
                    const status = getKeyStatus(key);
                    let color = "bg-secondary hover:bg-secondary/80";
                    if (status === "correct") color = "bg-green-500 text-white hover:bg-green-600";
                    else if (status === "present") color = "bg-yellow-500 text-white hover:bg-yellow-600";
                    else if (status === "absent") color = "bg-gray-500 text-white hover:bg-gray-600";
                    return (
                      <Button key={key} variant="secondary" className={"w-10 h-12 p-0 " + color} onClick={() => onKeyPress(key)}>{key}</Button>
                    );
                  })}
                  {i === 2 && <Button variant="secondary" className="px-2" onClick={() => onKeyPress("BACKSPACE")}>DEL</Button>}
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5" /> Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-3xl font-bold">{stats.played}</div>
                <div className="text-xs text-muted-foreground">Played</div>
              </div>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-3xl font-bold">{stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0}%</div>
                <div className="text-xs text-muted-foreground">Win Rate</div>
              </div>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-3xl font-bold">{stats.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Current Streak</div>
              </div>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-3xl font-bold">{stats.maxStreak}</div>
                <div className="text-xs text-muted-foreground">Max Streak</div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h4 className="font-medium">How to play</h4>
              <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                <li>Guess the word in 6 tries.</li>
                <li>Each guess must be a valid 5-letter word.</li>
                <li>The color of the tiles will change to show how close your guess was to the word.</li>
                <li><span className="text-green-500 font-bold">Green</span>: Letter is in the word and in the correct spot.</li>
                <li><span className="text-yellow-500 font-bold">Yellow</span>: Letter is in the word but in the wrong spot.</li>
                <li><span className="text-gray-500 font-bold">Gray</span>: Letter is not in the word in any spot.</li>
              </ul>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
