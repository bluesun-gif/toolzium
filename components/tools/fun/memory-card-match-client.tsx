"use client";

import React, { useState, useEffect, useMemo, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Layers, Timer, Move, RotateCcw, Trophy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const EMOJIS = ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮"];

type CardType = { id: number, emoji: string, isFlipped: boolean, isMatched: boolean };

const DIFFICULTIES = {
 Easy: { pairs: 6, cols:"grid-cols-4", rows: 3 },
 Medium: { pairs: 8, cols:"grid-cols-4", rows: 4 },
 Hard: { pairs: 12, cols:"grid-cols-6", rows: 4 }
};

export default function MemoryCardMatchClient() {
 const [difficulty, setDifficulty] = useState<keyof typeof DIFFICULTIES>("Medium");
 const [cards, setCards] = useState<CardType[]>([]);
 const [flipped, setFlipped] = useState<number[]>([]);
 const [moves, setMoves] = useState(0);
 const [time, setTime] = useState(0);
 const [isPlaying, setIsPlaying] = useState(true);
 const [isWon, setIsWon] = useState(false);

 const config = DIFFICULTIES[difficulty];

 const initGame = useCallback(() => {
 const selected = EMOJIS.slice(0, config.pairs);
 const deck = [...selected, ...selected]
 .sort(() => Math.random() - 0.5)
 .map((emoji, idx) => ({ id: idx, emoji, isFlipped: false, isMatched: false }));
 setCards(deck);
 setFlipped([]);
 setMoves(0);
 setTime(0);
 setIsPlaying(true);
 setIsWon(false);
 }, [config.pairs]);

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

 const handleClick = (id: number) => {
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
 if (newCards[first].emoji === newCards[second].emoji) {
 newCards[first].isMatched = true;
 newCards[second].isMatched = true;
 setCards(newCards);
 setFlipped([]);
 
 if (newCards.every(c => c.isMatched)) {
 setIsWon(true);
 setIsPlaying(false);
 toast.success(`Victory in ${moves + 1} moves!`);
 }
 } else {
 setTimeout(() => {
 newCards[first].isFlipped = false;
 newCards[second].isFlipped = false;
 setCards([...newCards]);
 setFlipped([]);
 }, 800);
 }
 }
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader 
 icon={Layers} 
 title="Memory Card Match"
 description="Flip the cards and find the matching emoji pairs in this classic memory challenge."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex flex-wrap items-center justify-between gap-4">
 <CardTitle className={titleClass}>Emoji Match</CardTitle>
 <div className="flex gap-2">
 {Object.keys(DIFFICULTIES).map((d) => (
 <Button 
 key={d} 
 variant={difficulty === d ?"default":"outline"} 
 size="sm"
 onClick={() => setDifficulty(d as keyof typeof DIFFICULTIES)}
 >
 {d}
 </Button>
 ))}
 </div>
 </div>
 <div className="flex gap-6 mt-4 text-sm font-medium text-muted-foreground">
 <span className="flex items-center gap-1"><Timer className="w-4 h-4"/> {time}s</span>
 <span className="flex items-center gap-1"><Move className="w-4 h-4"/> {moves} Moves</span>
 </div>
 </CardHeader>
 <CardContent className="p-4 sm:p-6">
 <div className={`grid ${config.cols} gap-2 sm:gap-3 max-w-2xl mx-auto`}>
 {cards.map((card) => (
 <button
 key={card.id}
 onClick={() => handleClick(card.id)}
 className={`aspect-square rounded-xl text-3xl sm:text-4xl flex items-center justify-center transition-all duration-300 transform ${
 card.isFlipped || card.isMatched 
 ?"bg-background border-2 border-primary scale-95"
 :"bg-primary/10 hover:bg-primary/20 border border-border shadow-md"
 }`}
 disabled={card.isMatched || flipped.length === 2}
 >
 {card.isFlipped || card.isMatched ? card.emoji :"?"}
 </button>
 ))}
 </div>
 {isWon && (
 <div className="mt-6 text-center p-6 bg-primary/10 rounded-xl border border-primary/20 space-y-3">
 <Trophy className="w-12 h-12 text-yellow-500 mx-auto"/>
 <h3 className="text-2xl font-bold text-primary">You Won!</h3>
 <p className="text-muted-foreground">Cleared {difficulty} mode in {moves} moves and {time} seconds.</p>
 <Button onClick={initGame} className="gap-2">
 <RotateCcw className="w-4 h-4"/> Play Again
 </Button>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Select Difficulty", description:"Choose between Easy, Medium, or Hard to set the grid size.", icon: Layers },
 { step:"02", title:"Flip Two Cards", description:"Click any two cards to reveal the hidden emojis underneath.", icon: Move },
 { step:"03", title:"Match All Pairs", description:"Remember the positions and match every pair to win the game.", icon: Trophy }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Layers, title:"Three Difficulties", description:"Scale the challenge from a 12-card Easy grid up to a 24-card Hard grid."},
 { icon: Timer, title:"Speed Tracking", description:"A live stopwatch records exactly how fast you clear the board."},
 { icon: Move, title:"Move Counter", description:"Keep track of your mistakes and efficiency with a live move counter."},
 { icon: Trophy, title:"Victory Screen", description:"Celebrate your win with a summary of your time and moves."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>The Memory Card Match game is a timeless exercise in visual-spatial memory. By forcing your brain to hold onto the locations of hidden items, you actively train your working memory capacity.</p>
 <p>This version uses universally recognizable emojis, making it accessible and fun for players of all ages and language backgrounds. The three difficulty tiers allow for a smooth learning curve, starting with simple recall and progressing to complex grid mapping.</p>
 <p>Perfect for a quick mental reset during a busy workday, or as a screen-time activity for children that actually promotes cognitive development rather than passive consumption.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"What happens if I click two cards that don't match?", answer:"The cards will remain face-up for a brief moment (0.8 seconds) so you can memorize them, and then they will automatically flip back face-down."},
 { question:"Can I change the difficulty in the middle of a game?", answer:"Yes, selecting a new difficulty button will instantly reset the board and start a fresh game with the new grid size."},
 { question:"Is there a time limit to finish the game?", answer:"No, there is no maximum time limit. The timer simply counts up so you can track your personal bests."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/memory-card-match" max={6} />
 </div>
 );
}
