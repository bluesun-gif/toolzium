"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Gamepad2, Search, Trophy, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

const WORDS = ["APPLE", "TRAIN", "HOUSE", "GRAPE", "TIGER", "PLANT", "TABLE", "CHAIR", "SMILE", "MOUSE", "BREAD", "RIVER", "MUSIC", "GHOST", "SHIRT", "WATER", "STONE", "WORLD", "DREAM", "STORY", "SMART", "BRAIN", "HEART", "NIGHT", "EARTH", "LUCKY", "CLEAN", "SWEET", "CRAZY", "HAPPY", "FUNNY", "QUICK", "NOISY", "QUIET", "BRAVE"];

export function WordleUnlimitedClient() {
  const [mode, setMode] = useState<"game" | "solver">("game");
  
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [streak, setStreak] = useState(0);

  const [solverGreen, setSolverGreen] = useState(["", "", "", "", ""]);
  const [solverYellow, setSolverYellow] = useState("");
  const [solverGray, setSolverGray] = useState("");
  const [solverResults, setSolverResults] = useState<string[]>([]);

  const initGame = useCallback(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const onKeyPress = useCallback((key: string) => {
    if (gameStatus !== "playing") return;
    
    if (key === "ENTER") {
      if (currentGuess.length !== 5) {
        toast.error("Not enough letters");
        return;
      }
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      if (currentGuess === targetWord) {
        setGameStatus("won");
        setStreak(s => s + 1);
        toast.success("You won!");
      } else if (newGuesses.length >= 6) {
        setGameStatus("lost");
        setStreak(0);
        toast.error("Game over! Word was " + targetWord);
      }
      setCurrentGuess("");
    } else if (key === "BACKSPACE") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  }, [currentGuess, gameStatus, guesses, targetWord]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode !== "game") return;
      if (e.key === "Enter") onKeyPress("ENTER");
      else if (e.key === "Backspace") onKeyPress("BACKSPACE");
      else {
        const char = e.key.toUpperCase();
        if (/^[A-Z]$/.test(char)) onKeyPress(char);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress, mode]);

  const getLetterStatus = (letter: string, index: number, word: string) => {
    if (targetWord[index] === letter) return "correct";
    if (targetWord.includes(letter)) return "present";
    return "absent";
  };

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
  ];

  const getKeyStatus = (key: string) => {
    let status = "";
    guesses.forEach(guess => {
      for (let i = 0; i < 5; i++) {
        if (guess[i] === key) {
          const s = getLetterStatus(key, i, guess);
          if (s === "correct") status = "correct";
          else if (s === "present" && status !== "correct") status = "present";
          else if (s === "absent" && status === "") status = "absent";
        }
      }
    });
    return status;
  };

  const runSolver = () => {
    let filtered = WORDS.filter(w => {
      for (let i = 0; i < 5; i++) {
        if (solverGreen[i] && w[i] !== solverGreen[i].toUpperCase()) return false;
      }
      const yellows = solverYellow.toUpperCase().split("");
      for (let y of yellows) {
        if (!w.includes(y)) return false;
      }
      const grays = solverGray.toUpperCase().split("");
      for (let g of grays) {
        if (w.includes(g)) return false;
      }
      return true;
    });
    setSolverResults(filtered);
  };

  const handleGreenChange = (index: number, val: string) => {
    const newG = [...solverGreen];
    newG[index] = val.slice(0, 1).toUpperCase();
    setSolverGreen(newG);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Gamepad2}
        title="Wordle Unlimited Game & Word Helper"
        description="Play unlimited Wordle games or use the helper to solve puzzles."
        actions={
          <>
            <ActionButton 
              onClick={() => setMode(mode === "game" ? "solver" : "game")} 
              icon={Search} 
              label={mode === "game" ? "Switch to Solver" : "Switch to Game"} 
            />
          </>
        }
      />

      {mode === "game" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <GlassCard>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Wordle Unlimited</CardTitle>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="font-bold text-lg">Streak: {streak}</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="grid gap-2 mb-8">
                  {[...Array(6)].map((_, rowIndex) => {
                    const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess.padEnd(5, " ") : "     ");
                    const isSubmitted = rowIndex < guesses.length;
                    
                    return (
                      <div key={rowIndex} className="flex gap-2">
                        {[...Array(5)].map((_, colIndex) => {
                          const letter = guess[colIndex];
                          const status = isSubmitted ? getLetterStatus(letter, colIndex, guess) : "";
                          
                          let bgClass = "bg-background border-border text-foreground";
                          if (status === "correct") bgClass = "bg-green-500 border-green-500 text-white";
                          else if (status === "present") bgClass = "bg-yellow-500 border-yellow-500 text-white";
                          else if (status === "absent") bgClass = "bg-gray-500 border-gray-500 text-white";
                          
                          return (
                            <div 
                              key={colIndex} 
                              className={"w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded-sm uppercase " + bgClass}
                            >
                              {letter !== " " ? letter : ""}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                <div className="w-full max-w-lg flex flex-col gap-2">
                  {keyboardRows.map((row, i) => (
                    <div key={i} className="flex justify-center gap-1.5">
                      {row.map(key => {
                        const status = getKeyStatus(key);
                        let bgClass = "bg-muted hover:bg-muted/80";
                        if (status === "correct") bgClass = "bg-green-500 text-white hover:bg-green-600";
                        else if (status === "present") bgClass = "bg-yellow-500 text-white hover:bg-yellow-600";
                        else if (status === "absent") bgClass = "bg-gray-500 text-white hover:bg-gray-600";
                        
                        return (
                          <button
                            key={key}
                            onClick={() => onKeyPress(key)}
                            className={"h-12 rounded font-bold text-sm " + bgClass + (key === "ENTER" || key === "BACKSPACE" ? " px-3" : " w-10")}
                          >
                            {key === "BACKSPACE" ? "⌫" : key}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
                
                {gameStatus !== "playing" && (
                  <div className="mt-8">
                    <ActionButton icon={RotateCcw} onClick={initGame} label="Play Again" />
                  </div>
                )}
              </CardContent>
            </GlassCard>
          </div>
          <div className="space-y-6">
            <GlassCard>
              <CardHeader>
                <CardTitle>How to Play</CardTitle>
                <CardDescription>Guess the Wordle in 6 tries.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>Each guess must be a valid 5-letter word. Hit the enter button to submit.</p>
                <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 bg-green-500 flex items-center justify-center text-white font-bold rounded-sm">W</div>
                  <span>The letter W is in the word and in the correct spot.</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 bg-yellow-500 flex items-center justify-center text-white font-bold rounded-sm">I</div>
                  <span>The letter I is in the word but in the wrong spot.</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 bg-gray-500 flex items-center justify-center text-white font-bold rounded-sm">U</div>
                  <span>The letter U is not in the word in any spot.</span>
                </div>
              </CardContent>
            </GlassCard>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Wordle Solver</CardTitle>
              <CardDescription>Enter known letters to find matching words.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Green Letters (Correct Position)</Label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map(i => (
                    <Input 
                      key={i} 
                      value={solverGreen[i]} 
                      onChange={(e) => handleGreenChange(i, e.target.value)}
                      className="w-12 h-12 text-center text-xl font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-500 uppercase"
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Yellow Letters (Present, Wrong Position)</Label>
                <Input 
                  value={solverYellow} 
                  onChange={(e) => setSolverYellow(e.target.value)}
                  placeholder="e.g. A E"
                  className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-500 uppercase"
                />
              </div>
              <div className="space-y-2">
                <Label>Gray Letters (Not in word)</Label>
                <Input 
                  value={solverGray} 
                  onChange={(e) => setSolverGray(e.target.value)}
                  placeholder="e.g. Q R T Z"
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-500 uppercase"
                />
              </div>
              <Button onClick={runSolver} className="w-full">Find Words</Button>
            </CardContent>
          </GlassCard>
          <GlassCard>
            <CardHeader>
              <CardTitle>Possible Words ({solverResults.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
                {solverResults.length > 0 ? (
                  solverResults.map(w => (
                    <div key={w} className="px-3 py-1 bg-muted rounded text-sm font-medium">
                      {w}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No words found or enter clues to search.</p>
                )}
              </div>
            </CardContent>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
