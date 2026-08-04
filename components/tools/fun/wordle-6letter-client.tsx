"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, RefreshCw, BarChart2 } from "lucide-react";
import toast from "react-hot-toast";

const WORDS = [
  "PLANET", "ORANGE", "SPRING", "SUMMER", "WINTER", "SYSTEM", "NATURE",
  "PERSON", "MONKEY", "ROCKET", "BUTTON", "GUITAR", "MARKET", "OFFICE"
];

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

export function Wordle6LetterClient() {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [stats, setStats] = useState({ played: 0, wins: 0, currentStreak: 0, maxStreak: 0 });
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    setTargetWord(getRandomWord());
    const savedStats = localStorage.getItem("wordle6Stats");
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  const handleKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === "Enter") {
      if (guesses[currentGuessIndex].length !== 6) {
        toast.error("Word must be 6 letters");
        return;
      }
      
      const newGuesses = [...guesses];
      
      if (guesses[currentGuessIndex] === targetWord) {
        const newStats = {
          ...stats,
          played: stats.played + 1,
          wins: stats.wins + 1,
          currentStreak: stats.currentStreak + 1,
          maxStreak: Math.max(stats.maxStreak, stats.currentStreak + 1)
        };
        setStats(newStats);
        localStorage.setItem("wordle6Stats", JSON.stringify(newStats));
        toast.success("You won!");
        setGameOver(true);
      } else if (currentGuessIndex === 5) {
        const newStats = {
          ...stats,
          played: stats.played + 1,
          currentStreak: 0
        };
        setStats(newStats);
        localStorage.setItem("wordle6Stats", JSON.stringify(newStats));
        toast.error("Game Over! Word was " + targetWord);
        setGameOver(true);
      }
      setCurrentGuessIndex(currentGuessIndex + 1);
    } else if (key === "Backspace") {
      const newGuesses = [...guesses];
      newGuesses[currentGuessIndex] = newGuesses[currentGuessIndex].slice(0, -1);
      setGuesses(newGuesses);
    } else if (guesses[currentGuessIndex].length < 6 && /^[A-Z]$/.test(key)) {
      const newGuesses = [...guesses];
      newGuesses[currentGuessIndex] += key;
      setGuesses(newGuesses);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === "ENTER") handleKeyPress("Enter");
      else if (key === "BACKSPACE") handleKeyPress("Backspace");
      else if (/^[A-Z]$/.test(key)) handleKeyPress(key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guesses, currentGuessIndex, gameOver, targetWord]);

  const resetGame = () => {
    setTargetWord(getRandomWord());
    setGuesses(Array(6).fill(""));
    setCurrentGuessIndex(0);
    setGameOver(false);
  };

  const getLetterStatus = (letter: string, index: number, word: string) => {
    if (!targetWord || !word) return "";
    if (targetWord[index] === letter) return "bg-green-500 text-white border-green-600";
    if (targetWord.includes(letter)) return "bg-yellow-500 text-white border-yellow-600";
    return "bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-600";
  };

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"]
  ];

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="6-Letter Wordle Challenge"
        description="Guess the 6-letter word in 6 tries."
        icon={Gamepad2}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setShowStats(!showStats)}>
              <BarChart2 className="w-4 h-4 mr-2" /> Stats
            </Button>
            <Button variant="default" size="sm" onClick={resetGame}>
              <RefreshCw className="w-4 h-4 mr-2" /> New Game
            </Button>
          </>
        }
      />

      {showStats && (
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5" /> Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{stats.played}</div>
                <div className="text-xs text-muted-foreground">Played</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{stats.played ? Math.round((stats.wins / stats.played) * 100) : 0}%</div>
                <div className="text-xs text-muted-foreground">Win %</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{stats.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Current Streak</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{stats.maxStreak}</div>
                <div className="text-xs text-muted-foreground">Max Streak</div>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      )}

      <GlassCard className="max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="grid grid-rows-6 gap-2 mb-8">
            {guesses.map((guess, i) => (
              <div key={i} className="grid grid-cols-6 gap-2">
                {Array(6).fill("").map((_, j) => {
                  const letter = guess[j] || "";
                  const isSubmitted = i < currentGuessIndex;
                  const statusClass = isSubmitted ? getLetterStatus(letter, j, guess) : "border-gray-200 dark:border-gray-800";
                  return (
                    <div
                      key={j}
                      className={"flex items-center justify-center w-12 h-12 text-xl font-bold uppercase border-2 rounded-sm " + statusClass}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            {keyboardRows.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map(key => (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className={"px-2 py-3 text-sm font-semibold rounded " + (key === "Enter" || key === "Backspace" ? "px-3 bg-gray-300 dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600")}
                  >
                    {key === "Backspace" ? "⌫" : key}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
