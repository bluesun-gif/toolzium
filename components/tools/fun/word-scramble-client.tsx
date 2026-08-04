"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Gamepad2, Trophy, RotateCcw, HelpCircle } from "lucide-react";
import toast from "react-hot-toast";

const WORDS = {
  Technology: ["COMPUTER", "NETWORK", "SOFTWARE", "INTERNET", "HARDWARE", "PROGRAMMING", "DATABASE", "KEYBOARD", "MONITOR", "BROWSER"],
  Animals: ["ELEPHANT", "GIRAFFE", "DOLPHIN", "PENGUIN", "KANGAROO", "CHEETAH", "GORILLA", "OSTRICH", "OCTOPUS", "RHINOCEROS"],
  Food: ["SPAGHETTI", "HAMBURGER", "SANDWICH", "PANCAKES", "BROCCOLI", "CHOCOLATE", "STRAWBERRY", "PINEAPPLE", "CROISSANT", "WATERMELON"],
  Science: ["PHYSICS", "BIOLOGY", "CHEMISTRY", "ASTRONOMY", "GRAVITY", "MOLECULE", "ELECTRON", "GENETICS", "MICROSCOPE", "RADIATION"],
  Travel: ["AIRPLANE", "PASSPORT", "SUITCASE", "LUGGAGE", "TOURIST", "VACATION", "HOTEL", "ITINERARY", "DESTINATION", "COMPASS"],
};

type Category = keyof typeof WORDS;

const playSound = (type: "correct" | "wrong" | "gameover") => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    if (type === "correct") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === "wrong") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === "gameover") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.5);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) {
    // Ignore audio context errors
  }
};

export function WordScrambleClient() {
  const [category, setCategory] = useState<Category>("Technology");
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState<number[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("wordScrambleHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const scramble = (word: string): string => {
    let arr = word.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const result = arr.join("");
    return result === word && word.length > 1 ? scramble(word) : result;
  };

  const nextWord = (resetTimer = true) => {
    const wordList = WORDS[category];
    let word = wordList[Math.floor(Math.random() * wordList.length)];
    while (word === currentWord && wordList.length > 1) {
      word = wordList[Math.floor(Math.random() * wordList.length)];
    }
    setCurrentWord(word);
    setScrambledWord(scramble(word));
    setGuess("");
    setHintsUsed(0);
    setRevealedLetters([]);
    if (resetTimer) {
      setTimeLeft(30);
    }
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setGameOver(false);
    setIsPlaying(true);
    nextWord();
  };

  useEffect(() => {
    if (isPlaying && !gameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, gameOver]);

  const endGame = () => {
    setGameOver(true);
    setIsPlaying(false);
    playSound("gameover");
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("wordScrambleHighScore", score.toString());
      toast.success("New High Score!");
    }
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isPlaying || gameOver) return;

    if (guess.toUpperCase() === currentWord) {
      playSound("correct");
      const points = Math.max(10 - hintsUsed * 3, 1) + Math.floor(timeLeft / 5);
      setScore((s) => s + points);
      setStreak((s) => s + 1);
      toast.success("Correct! +" + points + " pts");
      nextWord(false);
      setTimeLeft((prev) => Math.min(prev + 5, 30));
    } else {
      playSound("wrong");
      setStreak(0);
      toast.error("Incorrect!");
      setGuess("");
    }
  };

  const useHint = () => {
    if (hintsUsed >= currentWord.length - 1) {
      toast.error("No more hints available for this word.");
      return;
    }
    
    let unrevealed = [];
    for (let i = 0; i < currentWord.length; i++) {
      if (!revealedLetters.includes(i)) unrevealed.push(i);
    }
    
    if (unrevealed.length > 0) {
      const idx = unrevealed[Math.floor(Math.random() * unrevealed.length)];
      setRevealedLetters([...revealedLetters, idx]);
      setHintsUsed(hintsUsed + 1);
      // Construct new guess with revealed letter
      let currentGuessArr = guess.toUpperCase().padEnd(currentWord.length, "_").split("");
      currentGuessArr[idx] = currentWord[idx];
      setGuess(currentGuessArr.join("").replace(/_+$/, ""));
      toast.success("Hint used! (-3 pts from potential score)");
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Gamepad2}
        title="Word Scramble Game"
        description="Unscramble letters to find the hidden words before time runs out."
        actions={<></>}
      />

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Game Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={category}
                  onValueChange={(val: Category) => setCategory(val)}
                  disabled={isPlaying && !gameOver}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(WORDS).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!isPlaying ? (
                <Button className="w-full" onClick={startGame} size="lg">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  {gameOver ? "Play Again" : "Start Game"}
                </Button>
              ) : (
                <Button variant="outline" className="w-full" onClick={endGame}>
                  End Game
                </Button>
              )}
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className={"bg-secondary/50 p-4 rounded-lg text-center"}>
                  <div className="text-sm text-muted-foreground">Score</div>
                  <div className="text-3xl font-bold">{score}</div>
                </div>
                <div className={"bg-secondary/50 p-4 rounded-lg text-center"}>
                  <div className="text-sm text-muted-foreground">Streak</div>
                  <div className="text-3xl font-bold">{streak}</div>
                </div>
                <div className={"col-span-2 bg-primary/10 p-4 rounded-lg flex items-center justify-between"}>
                  <div className="flex items-center text-primary font-semibold">
                    <Trophy className="w-5 h-5 mr-2" />
                    High Score
                  </div>
                  <div className="text-xl font-bold text-primary">{highScore}</div>
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Play Area</CardTitle>
                <div className={"text-xl font-mono font-bold " + (timeLeft <= 10 ? "text-destructive" : "text-primary")}>
                  00:{timeLeft.toString().padStart(2, "0")}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isPlaying && !gameOver ? (
                <div className="space-y-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <div className="text-sm text-muted-foreground uppercase tracking-widest">{category}</div>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {scrambledWord.split("").map((letter, i) => (
                      <div key={i} className={"w-12 h-12 flex items-center justify-center text-2xl font-bold bg-primary text-primary-foreground rounded-lg shadow-sm border border-primary/20"}>
                        {letter}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                    <Input
                      autoFocus
                      placeholder="Type your guess..."
                      value={guess}
                      onChange={(e) => setGuess(e.target.value.toUpperCase())}
                      className="text-center text-xl uppercase tracking-widest font-mono py-6"
                      maxLength={currentWord.length}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">Submit</Button>
                      <Button type="button" variant="outline" onClick={useHint} disabled={hintsUsed >= currentWord.length - 1} title="Use Hint">
                        <HelpCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </form>
                </div>
              ) : gameOver ? (
                <div className="space-y-6 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <h2 className="text-3xl font-bold text-destructive">Game Over!</h2>
                  <p className="text-muted-foreground">The word was: <span className="font-bold text-foreground">{currentWord}</span></p>
                  <div className="space-y-2">
                    <p className="text-xl">Final Score: <span className="font-bold">{score}</span></p>
                    {score >= highScore && score > 0 && <p className="text-primary font-bold">New High Score!</p>}
                  </div>
                  <Button onClick={startGame} size="lg">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Play Again
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <Gamepad2 className="w-16 h-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground max-w-sm">Select a category and start the game. Unscramble the letters to guess the word before time runs out!</p>
                  <Button onClick={startGame}>Start Game</Button>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
