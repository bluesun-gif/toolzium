"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Gamepad2, Trophy, RefreshCw, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const THEMES = {
  emojis: ["😀", "😎", "🤩", "🤔", "😴", "🥶", "🤯", "🥳", "🤠", "🤑", "👽", "👻", "🤖", "🎃", "💩", "🦄", "🐼", "🦊"],
  developer: ["💻", "⌨️", "🖱️", "🖥️", "💽", "💾", "💿", "🔋", "🔌", "📱", "⌚", "📺", "📻", "🎙️", "🎧", "📸", "📹", "📽️"],
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦"],
  foods: ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍑", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🌽"]
};

export function MemoryCardMatchClient() {
  const [gridSize, setGridSize] = useState("16"); // 4x4=16 or 6x6=36
  const [theme, setTheme] = useState("emojis");
  const [cards, setCards] = useState<{id: number, content: string, isFlipped: boolean, isMatched: boolean}[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("memory-best-score-" + gridSize);
    if (saved) setBestScore(parseInt(saved, 10));
    initializeGame();
  }, [gridSize, theme]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const initializeGame = () => {
    const numPairs = parseInt(gridSize, 10) / 2;
    const items = THEMES[theme as keyof typeof THEMES].slice(0, numPairs);
    const deck = [...items, ...items].sort(() => Math.random() - 0.5).map((content, idx) => ({
      id: idx,
      content,
      isFlipped: false,
      isMatched: false
    }));
    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setIsPlaying(false);
  };

  const handleCardClick = (id: number) => {
    if (!isPlaying && moves === 0 && timer === 0) setIsPlaying(true);
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].content === cards[second].content) {
        setTimeout(() => {
          setCards((prev) => {
            const matched = [...prev];
            matched[first].isMatched = true;
            matched[second].isMatched = true;
            return matched;
          });
          setFlippedCards([]);
          checkWin();
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) => {
            const unflipped = [...prev];
            unflipped[first].isFlipped = false;
            unflipped[second].isFlipped = false;
            return unflipped;
          });
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const checkWin = () => {
    setTimeout(() => {
      setCards((prev) => {
        if (prev.every((c) => c.isMatched)) {
          setIsPlaying(false);
          toast.success("You won!");
          const currentBest = bestScore;
          if (currentBest === null || moves + 1 < currentBest) {
            setBestScore(moves + 1);
            localStorage.setItem("memory-best-score-" + gridSize, (moves + 1).toString());
          }
        }
        return prev;
      });
    }, 100);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        title="Memory Card Match" 
        icon={Gamepad2} 
        description="Test your memory with this fun card matching game." 
        actions={
          <ResetButton onClick={initializeGame} label="Restart Game" />
        }
      />
      <div className="grid md:grid-cols-4 gap-6">
        <GlassCard className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Grid Size</Label>
              <Select value={gridSize} onValueChange={setGridSize} disabled={isPlaying}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16">4 x 4</SelectItem>
                  <SelectItem value="36">6 x 6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme} disabled={isPlaying}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emojis">Emojis</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="animals">Animals</SelectItem>
                  <SelectItem value="foods">Foods</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span>Moves:</span>
              <span className="font-bold">{moves}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Time:</span>
              <span className="font-bold">{timer}s</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Best Score:</span>
              <span>{bestScore !== null ? bestScore + " moves" : "-"}</span>
            </div>
          </CardContent>
        </GlassCard>
        
        <GlassCard className="md:col-span-3">
          <CardContent className="p-6">
            <div className={"grid gap-2 " + (gridSize === "16" ? "grid-cols-4" : "grid-cols-6")}>
              {cards.map((card) => (
                <div 
                  key={card.id} 
                  onClick={() => handleCardClick(card.id)}
                  className={"aspect-square rounded-xl cursor-pointer flex items-center justify-center text-4xl transition-all duration-300 transform " + (card.isFlipped || card.isMatched ? "bg-primary/20 rotate-y-180" : "bg-secondary hover:bg-secondary/80")}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  <div className={"transition-opacity duration-300 " + (card.isFlipped || card.isMatched ? "opacity-100" : "opacity-0")}>
                    {card.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
