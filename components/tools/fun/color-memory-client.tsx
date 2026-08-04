"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, RotateCcw, Trophy, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

type Difficulty = "easy" | "medium" | "hard";
type Card = { id: number; color: string; isFlipped: boolean; isMatched: boolean };

const COLORS = [
  "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
  "bg-purple-500", "bg-pink-500", "bg-orange-500", "bg-teal-500",
  "bg-indigo-500", "bg-lime-500"
];

const DIFFICULTY_CONFIG = {
  easy: { pairs: 6, cols: 3, rows: 4 },
  medium: { pairs: 8, cols: 4, rows: 4 },
  hard: { pairs: 10, cols: 5, rows: 4 }
};

export function ColorMemoryClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [bestScore, setBestScore] = useState<Record<Difficulty, { moves: number; time: number } | null>>({
    easy: null, medium: null, hard: null
  });

  useEffect(() => {
    const saved = localStorage.getItem("colorMemoryBestScores");
    if (saved) setBestScore(JSON.parse(saved));
    initGame(difficulty);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !isWon) {
      timer = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isWon]);

  const initGame = (diff: Difficulty) => {
    const { pairs } = DIFFICULTY_CONFIG[diff];
    const gameColors = COLORS.slice(0, pairs);
    const duplicatedColors = [...gameColors, ...gameColors];
    const shuffledColors = duplicatedColors.sort(() => Math.random() - 0.5);
    
    setCards(shuffledColors.map((color, index) => ({
      id: index,
      color,
      isFlipped: false,
      isMatched: false
    })));
    setFlippedIds([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
    setIsWon(false);
  };

  const handleDifficultyChange = (val: Difficulty) => {
    setDifficulty(val);
    initGame(val);
  };

  const handleCardClick = (id: number) => {
    if (!isPlaying) setIsPlaying(true);
    if (flippedIds.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newFlippedIds = [...flippedIds, id];
    setFlippedIds(newFlippedIds);
    setCards(cards.map(c => c.id === id ? { ...c, isFlipped: true } : c));

    if (newFlippedIds.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = newFlippedIds;
      if (cards[firstId].color === cards[secondId].color) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c));
          setFlippedIds([]);
          checkWinState();
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c));
          setFlippedIds([]);
        }, 1000);
      }
    }
  };

  const checkWinState = () => {
    setCards(prev => {
      const isComplete = prev.every(c => c.isMatched || flippedIds.includes(c.id));
      if (isComplete) {
        setIsWon(true);
        setIsPlaying(false);
        updateBestScore();
      }
      return prev;
    });
  };

  const updateBestScore = () => {
    const currentBest = bestScore[difficulty];
    if (!currentBest || moves < currentBest.moves || (moves === currentBest.moves && time < currentBest.time)) {
      const newBest = { ...bestScore, [difficulty]: { moves, time } };
      setBestScore(newBest);
      localStorage.setItem("colorMemoryBestScores", JSON.stringify(newBest));
    }
  };

  const gridColsClass = {
    easy: "grid-cols-3",
    medium: "grid-cols-4",
    hard: "grid-cols-5"
  }[difficulty];

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Brain}
        title="Color Memory Game"
        description="Test your memory with this classic color matching card game."
        actions={
          <Button onClick={() => initGame(difficulty)} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" /> New Game
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 space-y-4">
          <GlassCard>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={difficulty} onValueChange={handleDifficultyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy (3x4)</SelectItem>
                  <SelectItem value="medium">Medium (4x4)</SelectItem>
                  <SelectItem value="hard">Hard (5x4)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="flex items-center text-muted-foreground"><RotateCcw className="w-5 h-5 mr-2" /> Moves:</span>
                <span className="font-bold">{moves}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="flex items-center text-muted-foreground"><Timer className="w-5 h-5 mr-2" /> Time:</span>
                <span className="font-bold">{time}s</span>
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="flex items-center text-muted-foreground"><Trophy className="w-4 h-4 mr-2" /> Best:</span>
                <span className="text-sm font-medium">
                  {bestScore[difficulty] ? `${bestScore[difficulty]?.moves} moves (${bestScore[difficulty]?.time}s)` : "None"}
                </span>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className="w-full md:w-2/3">
          <GlassCard className="h-full flex items-center justify-center p-6">
            {isWon ? (
              <div className="text-center space-y-4 animate-in zoom-in">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
                <h2 className="text-3xl font-bold">You Won!</h2>
                <p className="text-muted-foreground">Completed in {moves} moves and {time} seconds.</p>
                <Button onClick={() => initGame(difficulty)} size="lg" className="mt-4">Play Again</Button>
              </div>
            ) : (
              <div className={cn("grid gap-2 sm:gap-4 mx-auto", gridColsClass)}>
                {cards.map(card => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={cn(
                      "w-16 h-16 sm:w-20 sm:h-24 md:w-24 md:h-32 rounded-xl transition-all duration-300 transform preserve-3d shadow-md",
                      (card.isFlipped || card.isMatched) ? "rotate-y-180" : "bg-primary hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                    )}
                    disabled={card.isFlipped || card.isMatched}
                  >
                    <div className={cn(
                      "absolute inset-0 backface-hidden rounded-xl",
                      card.isFlipped || card.isMatched ? card.color : "hidden"
                    )} />
                  </button>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
