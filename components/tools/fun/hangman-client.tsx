"use client";

import { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Gamepad2, Trophy, RotateCcw, HelpCircle } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const CATEGORIES = {
  "Tech & Coding": ["REACT", "JAVASCRIPT", "TYPESCRIPT", "PYTHON", "DATABASE", "FRONTEND", "BACKEND", "FRAMEWORK", "COMPILER", "ALGORITHM"],
  "Animals": ["ELEPHANT", "GIRAFFE", "KANGAROO", "PENGUIN", "DOLPHIN", "TIGER", "CHEETAH", "RHINOCEROS", "HIPPOPOTAMUS", "CHIMPANZEE"],
  "Countries": ["AUSTRALIA", "BRAZIL", "CANADA", "DENMARK", "EGYPT", "FRANCE", "GERMANY", "INDIA", "JAPAN", "MEXICO"],
  "Movies": ["INCEPTION", "TITANIC", "AVATAR", "GLADIATOR", "MATRIX", "GOODFELLAS", "CASABLANCA", "ROCKY", "HALLOWEEN", "PSYCHO"],
  "Food": ["PIZZA", "BURGER", "SUSHI", "PASTA", "TACO", "STEAK", "SALAD", "PANCAKE", "WAFFLE", "NOODLE"]
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_MISTAKES = 6;

export function HangmanClient() {
  const [category, setCategory] = useState<keyof typeof CATEGORIES>("Tech & Coding");
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  const initGame = useCallback((cat = category) => {
    const words = CATEGORIES[cat as keyof typeof CATEGORIES];
    const newWord = words[Math.floor(Math.random() * words.length)];
    setWord(newWord);
    setGuessedLetters(new Set());
    setMistakes(0);
    setHintUsed(false);
  }, [category]);

  useEffect(() => {
    const savedStreak = localStorage.getItem("hangman-streak");
    if (savedStreak) setStreak(parseInt(savedStreak, 10));
    initGame();
  }, [initGame]);

  const saveStreak = (newStreak: number) => {
    setStreak(newStreak);
    localStorage.setItem("hangman-streak", newStreak.toString());
  };

  const isWinner = word && word.split("").every(letter => guessedLetters.has(letter));
  const isLoser = mistakes >= MAX_MISTAKES;

  const guess = useCallback((letter: string) => {
    if (isWinner || isLoser || guessedLetters.has(letter)) return;

    const newGuessedLetters = new Set(guessedLetters).add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      setMistakes(prev => {
        const next = prev + 1;
        if (next >= MAX_MISTAKES) {
          saveStreak(0);
          toast.error("Game Over! The word was " + word);
        }
        return next;
      });
    } else {
      const isNowWinner = word.split("").every(l => newGuessedLetters.has(l));
      if (isNowWinner) {
        saveStreak(streak + 1);
        toast.success("You won!");
      }
    }
  }, [guessedLetters, isWinner, isLoser, word, streak]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= 'a' && e.key <= 'z') {
        guess(e.key.toUpperCase());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guess]);

  const getHint = () => {
    if (hintUsed || isWinner || isLoser) return;
    const unrevealed = word.split("").filter(l => !guessedLetters.has(l));
    if (unrevealed.length > 0) {
      const randomHint = unrevealed[Math.floor(Math.random() * unrevealed.length)];
      guess(randomHint);
      setHintUsed(true);
      toast("Hint used!");
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Gamepad2}
        title="Hangman Word Game"
        description="Classic Hangman word guessing game. Test your vocabulary!"
        actions={
          <div className="flex space-x-2">
            <ResetButton onClick={() => initGame()} label="Restart Game" />
          </div>
        }
      />

      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle>Game Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select value={category} onValueChange={(v: keyof typeof CATEGORIES) => { setCategory(v); initGame(v); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(CATEGORIES).map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Mistakes:</span>
              <span className="text-lg font-bold text-destructive">{mistakes} / {MAX_MISTAKES}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center"><Trophy className="w-4 h-4 mr-1 text-yellow-500" /> Streak:</span>
              <span className="text-lg font-bold text-primary">{streak}</span>
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={getHint} 
              disabled={hintUsed || isWinner || isLoser}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Use Hint
            </Button>
          </CardContent>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
            
            <svg viewBox="0 0 200 250" className="w-48 h-48 mb-8 stroke-primary stroke-2 fill-none stroke-linecap-round stroke-linejoin-round">
              <line x1="20" y1="230" x2="100" y2="230" />
              <line x1="60" y1="230" x2="60" y2="20" />
              <line x1="60" y1="20" x2="140" y2="20" />
              <line x1="140" y1="20" x2="140" y2="50" />
              
              {mistakes > 0 && <circle cx="140" cy="70" r="20" />}
              {mistakes > 1 && <line x1="140" y1="90" x2="140" y2="150" />}
              {mistakes > 2 && <line x1="140" y1="100" x2="120" y2="130" />}
              {mistakes > 3 && <line x1="140" y1="100" x2="160" y2="130" />}
              {mistakes > 4 && <line x1="140" y1="150" x2="120" y2="190" />}
              {mistakes > 5 && <line x1="140" y1="150" x2="160" y2="190" />}
            </svg>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {word.split("").map((letter, i) => (
                <div key={i} className={"w-10 h-12 flex items-center justify-center text-2xl font-bold border-b-4 " + (guessedLetters.has(letter) || isLoser ? "border-primary text-foreground" : "border-muted text-transparent")}>
                  {guessedLetters.has(letter) || isLoser ? letter : ""}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {ALPHABET.map(letter => {
                const isGuessed = guessedLetters.has(letter);
                const isCorrect = isGuessed && word.includes(letter);
                const isWrong = isGuessed && !word.includes(letter);
                
                return (
                  <Button
                    key={letter}
                    variant={isCorrect ? "default" : isWrong ? "destructive" : "outline"}
                    className={"w-10 h-10 p-0 text-lg font-semibold " + (isGuessed ? "opacity-50" : "")}
                    disabled={isGuessed || isWinner || isLoser}
                    onClick={() => guess(letter)}
                  >
                    {letter}
                  </Button>
                );
              })}
            </div>
            
            {(isWinner || isLoser) && (
              <div className="mt-8 flex flex-col items-center animate-in fade-in">
                <h3 className={"text-2xl font-bold mb-4 " + (isWinner ? "text-green-500" : "text-destructive")}>
                  {isWinner ? "You Won!" : "Game Over!"}
                </h3>
                <Button onClick={() => initGame()}>Play Again</Button>
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
