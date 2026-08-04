"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Gamepad2, Trophy, RotateCcw, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const THEMES = {
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"],
  food: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑"],
  sports: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓"],
  flags: ["🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇯🇵", "🇩🇪", "🇫🇷", "🇮🇹", "🇪🇸", "🇧🇷", "🇮🇳", "🇨🇳"],
  technology: ["💻", "📱", "⌚", "⌨️", "🖱️", "🖨️", "🎮", "🕹️", "📷", "🔋", "🔌", "💾"],
};

type CardState = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export function MemoryMatchClient() {
  const [theme, setTheme] = useState<keyof typeof THEMES>("animals");
  const [cardCount, setCardCount] = useState<16 | 24>(16);
  const [cards, setCards] = useState<CardState[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isVictory, setIsVictory] = useState(false);
  const [bestScore, setBestScore] = useState<{ moves: number; time: number } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initializeGame = useCallback(() => {
    const emojis = THEMES[theme].slice(0, cardCount / 2);
    const deck = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(deck);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
    setFlippedIndices([]);
    setIsVictory(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [theme, cardCount]);

  useEffect(() => {
    initializeGame();
    const savedScore = localStorage.getItem("memoryMatchBestScore");
    if (savedScore) {
      try {
        setBestScore(JSON.parse(savedScore));
      } catch (e) {
        // ignore
      }
    }
  }, [initializeGame]);

  useEffect(() => {
    if (isPlaying && !isVictory) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isVictory]);

  const handleCardClick = (index: number) => {
    if (!isPlaying) setIsPlaying(true);
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length === 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIndex].isMatched = true;
            updated[secondIndex].isMatched = true;
            return updated;
          });
          setFlippedIndices([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIndex].isFlipped = false;
            updated[secondIndex].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      setIsVictory(true);
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      
      const newScore = { moves, time };
      if (!bestScore || moves < bestScore.moves || (moves === bestScore.moves && time < bestScore.time)) {
        setBestScore(newScore);
        localStorage.setItem("memoryMatchBestScore", JSON.stringify(newScore));
        toast.success("New Best Score!");
      }
    }
  }, [cards, moves, time, bestScore]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Gamepad2}
        title="Memory Match Game"
        description="Test your memory by matching pairs of cards as quickly as possible."
        actions={
          <ActionButton onClick={initializeGame} icon={RotateCcw} label="Restart Game" />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure your game.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <Select value={theme} onValueChange={(val: keyof typeof THEMES) => setTheme(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="animals">Animals</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="flags">Flags</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={cardCount.toString()} onValueChange={(val) => setCardCount(parseInt(val) as 16 | 24)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16">Normal (16 cards)</SelectItem>
                  <SelectItem value="24">Hard (24 cards)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Moves:</span>
                <span className="font-bold">{moves}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Time:</span>
                <span className="font-bold">{formatTime(time)}</span>
              </div>
              {bestScore && (
                <div className="pt-2">
                  <span className="text-xs text-muted-foreground block mb-1">Best Score</span>
                  <div className="flex items-center gap-1 text-sm bg-primary/10 text-primary p-2 rounded-md">
                    <Trophy className="w-4 h-4" />
                    {bestScore.moves} moves in {formatTime(bestScore.time)}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard className="md:col-span-3">
          <CardHeader>
            <CardTitle>Game Board</CardTitle>
          </CardHeader>
          <CardContent>
            {isVictory ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold">You Won!</h2>
                <div className="flex gap-4 text-lg">
                  <div><span className="text-muted-foreground">Moves:</span> <span className="font-bold">{moves}</span></div>
                  <div><span className="text-muted-foreground">Time:</span> <span className="font-bold">{formatTime(time)}</span></div>
                </div>
                <Button size="lg" onClick={initializeGame} className="mt-4">
                  Play Again
                </Button>
              </div>
            ) : (
              <div 
                className={"grid gap-4 " + (cardCount === 16 ? "grid-cols-4 sm:grid-cols-4" : "grid-cols-4 sm:grid-cols-6")}
              >
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    className={
                      "aspect-square rounded-xl cursor-pointer transition-all duration-300 transform-style-3d flex items-center justify-center text-4xl sm:text-5xl select-none shadow-sm border " +
                      (card.isFlipped || card.isMatched
                        ? "bg-white border-primary/20 rotate-y-180"
                        : "bg-primary hover:bg-primary/90 text-transparent border-transparent")
                    }
                  >
                    <div className={"transition-opacity duration-300 " + (card.isFlipped || card.isMatched ? "opacity-100" : "opacity-0")}>
                      {card.emoji}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
