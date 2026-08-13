"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Timer, Move, Grid3X3 } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🍎", "🍉", "🍓", "🍕", "🚗", "🚀", "⚽", "🏀", "🎸", "🎮", "💡", "📚"];
interface CardType {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};
export function MemoryGridFlipClient() {
  const [gridSize, setGridSize] = useState<"4x3" | "4x4" | "6x6">("4x4");
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScores, setBestScores] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const pairsCount = useMemo(() => {
    if (gridSize === "4x3") return 6;
    if (gridSize === "4x4") return 8;
    return 18;
  }, [gridSize]);
  const gridCols = useMemo(() => {
    if (gridSize === "4x3") return "grid-cols-4";
    if (gridSize === "4x4") return "grid-cols-4";
    return "grid-cols-6";
  }, [gridSize]);
  const initGame = useCallback(() => {
    const selectedEmojis = shuffleArray(EMOJIS).slice(0, pairsCount);
    const paired = [...selectedEmojis, ...selectedEmojis];
    const shuffled = shuffleArray(paired).map((emoji, idx) => ({
      id: idx,
      emoji,
      flipped: false,
      matched: false
    }));
    setCards(shuffled);
    setFlippedIds([]);
    setMoves(0);
    setSeconds(0);
    setIsPlaying(true);
    setIsCompleted(false);
  }, [pairsCount]);
  useEffect(() => {
    initGame();
  }, [initGame]);
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isCompleted]);
  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;
    const newCards = cards.map(c => c.id === id ? {
      ...c,
      flipped: true
    } : c);
    setCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [id1, id2] = newFlipped;
      const c1 = newCards.find(c => c.id === id1)!;
      const c2 = newCards.find(c => c.id === id2)!;
      if (c1.emoji === c2.emoji) {
        setTimeout(() => {
          const matchedCards = newCards.map(c => c.id === id1 || c.id === id2 ? {
            ...c,
            matched: true
          } : c);
          setCards(matchedCards);
          setFlippedIds([]);
          if (matchedCards.every(c => c.matched)) {
            setIsCompleted(true);
            setIsPlaying(false);
            toast.success(`Completed in ${moves + 1} moves!`);
            const currentBest = bestScores[gridSize];
            if (!currentBest || moves + 1 < currentBest) {
              setBestScores(prev => ({
                ...prev,
                [gridSize]: moves + 1
              }));
              toast.success("New Best Score!");
            }
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = newCards.map(c => c.id === id1 || c.id === id2 ? {
            ...c,
            flipped: false
          } : c);
          setCards(resetCards);
          setFlippedIds([]);
        }, 1000);
      }
    }
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 pb-12"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Grid3X3} title="Memory Grid Flip" description="Test your spatial recall and working memory with this classic card-matching game. Flip cards, find pairs, and beat your best time." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Grid3X3 className="w-4 h-4" /> Game Board
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
 <div className="flex items-center gap-6">
 <div className="flex items-center gap-2">
 <Move className="w-4 h-4 text-muted-foreground" />
 <span className="font-bold">{moves} Moves</span>
 </div>
 <div className="flex items-center gap-2">
 <Timer className="w-4 h-4 text-muted-foreground" />
 <span className="font-bold">{seconds}s</span>
 </div>
 {bestScores[gridSize] && <div className="text-sm text-primary font-semibold">
 Best: {bestScores[gridSize]} moves
 </div>}
 </div>
 <div className="flex items-center gap-3">
 <select value={gridSize} onChange={e => setGridSize(e.target.value as any)} className="px-3 py-2 rounded-lg bg-background border border-border text-sm">
 <option value="4x3">4x3 (Easy)</option>
 <option value="4x4">4x4 (Medium)</option>
 <option value="6x6">6x6 (Hard)</option>
 </select>
 <Button onClick={initGame} variant="outline" size="sm">
 <RotateCcw className="w-4 h-4 mr-2" /> New Game
 </Button>
 </div>
 </div>

 {isCompleted && <div className="text-center p-4 bg-green-500/10 text-green-500 rounded-lg font-bold text-lg animate-pulse">
 🎉 Congratulations! You cleared the board!
 </div>}

 <div className={`grid ${gridCols} gap-3 sm:gap-4 max-w-2xl mx-auto`}>
 {cards.map(card => <div key={card.id} className="relative aspect-square cursor-pointer perspective-1000" onClick={() => handleCardClick(card.id)}>
 {card.flipped || card.matched ? <div className={`absolute inset-0 w-full h-full rounded-xl bg-background dark:bg-gray-800 flex items-center justify-center text-3xl sm:text-4xl shadow-inner border-2 transition-all duration-300 ${card.matched ? 'border-green-500 ring-4 ring-green-400/50 scale-95' : 'border-gray-200 dark:border-gray-700'}`}>
 {card.emoji}
 </div> : <div className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-primary to-primary flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-lg hover:scale-105 transition-transform border-2 border-primary/50/50">
 ?
 </div>}
 </div>)}
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Select Grid Size",
        description: "Choose your difficulty level from 4x3 (12 cards), 4x4 (16 cards), or 6x6 (36 cards) layouts.",
        icon: Grid3X3
      }, {
        step: "02",
        title: "Flip & Memorize",
        description: "Click cards to reveal their hidden emojis. Memorize their locations before they flip back face-down.",
        icon: RotateCcw
      }, {
        step: "03",
        title: "Match Pairs",
        description: "Select two matching emojis to lock them in place. Clear the entire board in the fewest moves possible.",
        icon: Timer
      }]} badges={["100% Free", "Brain Training", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: Grid3X3,
        title: "Dynamic Grids",
        description: "Scale your challenge with 3 different board sizes, accommodating both beginners and memory champions."
      }, {
        icon: RotateCcw,
        title: "Visual Feedback",
        description: "Matched pairs lock in with a satisfying green glow and scale animation, providing clear progress tracking."
      }, {
        icon: Timer,
        title: "Performance Tracking",
        description: "Monitor your moves and time, with local best-score tracking to encourage continuous improvement."
      }, {
        icon: Move,
        title: "Spatial Recall",
        description: "Specifically designed to exercise your visuospatial sketchpad and working memory capacity."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none mt-6">
 <h3>Mastering Spatial Memory</h3>
 <p>Memory Grid Flip is a digital adaptation of the classic card-matching game, specifically engineered to challenge and improve your visuospatial working memory. Unlike simple reaction games, this tool requires you to encode, store, and retrieve the spatial locations of hidden items. When you flip a card, your brain must rapidly process the visual stimulus (the emoji) and bind it to its specific coordinate on the grid. This process engages the hippocampus and the parietal cortex, regions critical for spatial navigation and memory consolidation. As the grid expands from a simple 4x3 layout to a demanding 6x6 matrix, the cognitive load increases exponentially, forcing your brain to develop advanced chunking strategies and spatial mapping techniques.</p>
 <p>The game mechanics are designed to provide immediate, unambiguous feedback. Correct matches are rewarded with a stabilizing green glow, reinforcing the neural pathway associated with that successful recall. Mismatches, on the other hand, require you to suppress the incorrect association and maintain the location of the first card in your working memory while searching for its pair. This constant cycle of encoding, retrieval, and error-correction is fundamental to neuroplasticity. By tracking your move count and time, the tool transforms a casual pastime into a measurable cognitive exercise. Whether you are a student looking to sharpen your focus, a professional seeking to maintain mental acuity, or simply a puzzle enthusiast, Memory Grid Flip offers a scientifically grounded method to keep your brain agile and resilient against cognitive decline.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "How is the best score calculated?",
        answer: "The best score is determined by the fewest number of moves taken to clear the board. Time is tracked for personal reference, but moves are the primary metric for efficiency."
      }, {
        question: "Are the emojis randomized?",
        answer: "Yes, every new game selects a random subset of emojis from our diverse pool and shuffles their positions, ensuring no two games are exactly alike."
      }, {
        question: "Does this game help with real-world memory?",
        answer: "Yes, practicing spatial recall tasks like this can improve your working memory capacity, which is useful for everyday tasks like remembering where you placed your keys or navigating new environments."
      }, {
        question: "Can I play on mobile?",
        answer: "Absolutely. The grid is fully responsive and optimized for touch interactions, making it perfect for quick brain-training sessions on your phone or tablet."
      }]} />

 <RelatedTools currentToolUrl="/tools/fun/memory-grid-flip" max={6} />
 </div></div>;
}
export default MemoryGridFlipClient;