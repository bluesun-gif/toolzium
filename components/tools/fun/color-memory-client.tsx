"use client";

import { Switch } from "@/components/ui/switch";

import { ToolBackground } from"@/components/shared/tool-background";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Timer, Move, RotateCcw, Shuffle, Grid } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const COLORS = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-orange-500", "bg-cyan-500", "bg-lime-500", "bg-teal-500", "bg-indigo-500", "bg-fuchsia-500", "bg-rose-500", "bg-amber-500", "bg-emerald-500", "bg-sky-500", "bg-violet-500", "bg-stone-500"];
type CardType = {
  id: number;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
};
export default function ColorMemoryClient() {
  const [gridSize, setGridSize] = useState<4 | 6>(4);
  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const totalPairs = useMemo(() => gridSize * gridSize / 2, [gridSize]);
  const initGame = useCallback(() => {
    const selectedColors = COLORS.slice(0, totalPairs);
    const deck = [...selectedColors, ...selectedColors].sort(() => Math.random() - 0.5).map((color, idx) => ({
      id: idx,
      color,
      isFlipped: false,
      isMatched: false
    }));
    setCards(deck);
    setFlipped([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
    setIsWon(false);
  }, [totalPairs]);
  useEffect(() => {
    initGame();
  }, [initGame]);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isWon) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWon]);
  const handleCardClick = (id: number) => {
    if (flipped.length === 2) return;
    const card = cards[id];
    if (card.isFlipped || card.isMatched) return;
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (newCards[first].color === newCards[second].color) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlipped([]);
        if (newCards.every(c => c.isMatched)) {
          setIsWon(true);
          setIsPlaying(false);
          toast.success(`You won in ${moves + 1} moves!`);
        }
      } else {
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards([...newCards]);
          setFlipped([]);
        }, 1000);
      }
    }
  };
  const gridCols = gridSize === 4 ? "grid-cols-4" : "grid-cols-6";
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Palette} title="Color Memory Game" description="Flip the tiles, match the colors, and test your memory with this classic grid game." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex flex-wrap items-center justify-between gap-4">
 <CardTitle className={titleClass}>Color Memory</CardTitle>
 <div className="flex gap-2">
 <Button variant={gridSize === 4 ? "default" : "outline"} size="sm" onClick={() => setGridSize(4)}>4x4</Button>
 <Button variant={gridSize === 6 ? "default" : "outline"} size="sm" onClick={() => setGridSize(6)}>6x6</Button>
 <Button variant="outline" size="sm" onClick={initGame} className="gap-1">
 <RotateCcw className="w-3 h-3" /> Reset
 </Button>
 </div>
 </div>
 <div className="flex gap-6 mt-4 text-sm font-medium text-muted-foreground">
 <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {time}s</span>
 <span className="flex items-center gap-1"><Move className="w-4 h-4" /> {moves} Moves</span>
 </div>
 </CardHeader>
 <CardContent className="p-4 sm:p-6">
 <div className={`grid ${gridCols} gap-2 sm:gap-3 max-w-2xl mx-auto`}>
 {cards.map(card => <Button key={card.id} onClick={() => handleCardClick(card.id)} className={cn(`aspect-square rounded-xl transition-all duration-300 transform ${card.isFlipped || card.isMatched ? `${card.color} scale-95 shadow-inner` : "bg-muted hover:bg-muted/80 shadow-md border border-border/50"}`)} disabled={card.isMatched || flipped.length === 2} />)}
 </div>
 {isWon && <div className="mt-6 text-center p-4 bg-primary/10 rounded-xl border border-primary/20">
 <h3 className="text-xl font-bold text-primary">Congratulations!</h3>
 <p className="text-muted-foreground">You matched all pairs in {moves} moves and {time} seconds.</p>
 </div>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Choose Grid Size",
        description: "Select either the 4x4 or 6x6 grid difficulty to begin your game.",
        icon: Palette
      }, {
        step: "02",
        title: "Flip Two Tiles",
        description: "Click on any two face-down tiles to reveal their hidden colors.",
        icon: Move
      }, {
        step: "03",
        title: "Match & Win",
        description: "Remember the locations and match all color pairs to win the game.",
        icon: Timer
      }]} badges={["100% Free", "Client-Side", "Fun"]} />

 <ToolFeatureGuides features={[{
        icon: Palette,
        title: "Multiple Difficulties",
        description: "Switch between a relaxed 4x4 grid or a challenging 6x6 grid."
      }, {
        icon: Timer,
        title: "Live Timer",
        description: "Track exactly how long it takes you to clear the board."
      }, {
        icon: Move,
        title: "Move Counter",
        description: "Monitor your efficiency by counting every pair of tiles you flip."
      }, {
        icon: RotateCcw,
        title: "Instant Reset",
        description: "Shuffle the board and start a fresh game at any time with one click."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>The Color Memory Game is a digital take on the classic card-matching challenge. It is designed to test and improve your short-term visual memory, concentration, and pattern recognition skills.</p>
 <p>By flipping tiles and trying to recall where specific colors are hidden, you actively engage your brain's hippocampus, which is responsible for memory formation. The 4x4 grid is perfect for beginners or a quick mental warm-up, while the 6x6 grid offers a serious challenge for memory champions.</p>
 <p>This game runs entirely in your browser, meaning no scores or personal data are tracked online. It is a safe, private, and relaxing way to take a break from work or study while keeping your mind sharp.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "How do I win the Color Memory Game?",
        answer: "You win by successfully matching all pairs of identical colors on the grid. The game ends when no face-down tiles remain."
      }, {
        question: "Can I play this game on a touchscreen device?",
        answer: "Yes, the game is fully optimized for touch interactions on smartphones and tablets. Simply tap the tiles to flip them."
      }, {
        question: "Does the game save my high scores?",
        answer: "To ensure complete privacy, the game does not save high scores to a server. Each session is a fresh start."
      }]} />
    </div>
    </div>
);
}
