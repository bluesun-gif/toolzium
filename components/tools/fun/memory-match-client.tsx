"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { RotateCcw, Timer, Play, Grid3X3, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export function MemoryMatchClient() {
 const [difficulty, setDifficulty] = useState<"normal"|"fast"|"insane">("normal");
 const [level, setLevel] = useState(1);
 const [sequence, setSequence] = useState<number[]>([]);
 const [userStep, setUserStep] = useState(0);
 const [activeTile, setActiveTile] = useState(-1);
 const [wrongTile, setWrongTile] = useState(-1);
 const [phase, setPhase] = useState<"idle"|"showing"|"input"|"gameover">("idle");
 const [highScore, setHighScore] = useState(0);

 const speed = useMemo(() => {
 if (difficulty ==="normal") return 800;
 if (difficulty ==="fast") return 400;
 return 200;
 }, [difficulty]);

 const generateSequence = useCallback((lvl: number): number[] => {
 const seq: number[] = [];
 const len = lvl + 1; // Start with 2 tiles
 for (let i = 0; i < len; i++) {
 seq.push(Math.floor(Math.random() * 9));
 }
 return seq;
 }, []);

 const startGame = useCallback(() => {
 setLevel(1);
 setUserStep(0);
 setPhase("showing");
 const newSeq = generateSequence(1);
 setSequence(newSeq);
 
 (async () => {
 await delay(500);
 for (let i = 0; i < newSeq.length; i++) {
 setActiveTile(newSeq[i]);
 await delay(speed);
 setActiveTile(-1);
 await delay(speed / 2);
 }
 setPhase("input");
 })();
 }, [generateSequence, speed]);

 const handleTileClick = useCallback(async (idx: number) => {
 if (phase !=="input") return;
 
 if (idx === sequence[userStep]) {
 setActiveTile(idx);
 await delay(200);
 setActiveTile(-1);
 
 if (userStep + 1 === sequence.length) {
 // Level complete
 const nextLvl = level + 1;
 setLevel(nextLvl);
 if (nextLvl > highScore) {
 setHighScore(nextLvl);
 toast.success(`New High Score: Level ${nextLvl}!`);
 } else {
 toast.success(`Level ${nextLvl} unlocked!`);
 }
 setUserStep(0);
 setPhase("showing");
 
 const newSeq = [...sequence, Math.floor(Math.random() * 9)];
 setSequence(newSeq);
 
 await delay(800);
 for (let i = 0; i < newSeq.length; i++) {
 setActiveTile(newSeq[i]);
 await delay(speed);
 setActiveTile(-1);
 await delay(speed / 2);
 }
 setPhase("input");
 } else {
 setUserStep(userStep + 1);
 }
 } else {
 // Wrong tile
 setWrongTile(idx);
 await delay(500);
 setWrongTile(-1);
 setPhase("gameover");
 toast.error("Wrong sequence! Game Over.");
 }
 }, [phase, sequence, userStep, level, highScore, speed]);

 const getTileColor = (idx: number) => {
 if (idx === wrongTile) return"bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]";
 if (idx === activeTile) return"bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] scale-105";
 return"bg-blue-600 hover:bg-blue-500 shadow-md";
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Grid3X3}
 title="Memory Match"
 description="Test your sequential memory and reaction time. Watch the pattern, memorize it, and repeat it perfectly as the speed increases."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Zap className="w-4 h-4"/> Simon Grid
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
 <div className="flex items-center gap-6">
 <div className="text-center">
 <div className="text-xs text-muted-foreground">Level</div>
 <div className="text-2xl font-bold text-primary">{phase ==="idle"? 0 : level}</div>
 </div>
 <div className="text-center">
 <div className="text-xs text-muted-foreground">High Score</div>
 <div className="text-2xl font-bold text-yellow-500">{highScore}</div>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <select 
 value={difficulty} 
 onChange={(e) => setDifficulty(e.target.value as any)}
 className="px-3 py-2 rounded-lg bg-background border border-border text-sm"
 disabled={phase !=="idle"&& phase !=="gameover"}
 >
 <option value="normal">Normal (800ms)</option>
 <option value="fast">Fast (400ms)</option>
 <option value="insane">Insane (200ms)</option>
 </select>
 <Button onClick={startGame} variant="default"size="sm">
 {phase ==="idle"|| phase ==="gameover"? <><Play className="w-4 h-4 mr-2"/> Start</> : <><RotateCcw className="w-4 h-4 mr-2"/> Restart</>}
 </Button>
 </div>
 </div>

 <div className="text-center text-sm font-medium text-muted-foreground h-6">
 {phase ==="showing"&&"Memorize the pattern..."}
 {phase ==="input"&& `Your turn! Repeat the sequence (${userStep}/${sequence.length})`}
 {phase ==="gameover"&&"Game Over! Try again."}
 </div>

 <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
 {Array(9).fill(0).map((_, idx) => (
 <button
 key={idx}
 className={`aspect-square rounded-2xl transition-all duration-200 border-b-4 border-black/20 active:scale-95 ${getTileColor(idx)}`}
 onClick={() => handleTileClick(idx)}
 disabled={phase !=="input"}
 />
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Watch the Pattern", description:"The grid will light up in a specific sequence. Pay close attention to the order and speed.", icon: Zap },
 { step:"02", title:"Memorize & Repeat", description:"Once the sequence finishes, tap the tiles in the exact same order from memory.", icon: Grid3X3 },
 { step:"03", title:"Survive the Speed", description:"Each level adds a new tile to the sequence and increases the speed. How far can you go?", icon: Play }
 ]}
 badges={["100% Free","Focus Training","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Zap, title:"Sequential Memory", description:"Trains your brain's ability to encode and recall sequential information, a key component of working memory."},
 { icon: Grid3X3, title:"Visual Feedback", description:"Satisfying color shifts and glowing animations provide instant feedback on correct and incorrect inputs."},
 { icon: Play, title:"Progressive Difficulty", description:"The sequence lengthens and the playback speed increases dynamically as you advance through levels."},
 { icon: RotateCcw, title:"High Score Tracking", description:"Your personal best level is tracked locally, motivating you to beat your previous cognitive limits."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none mt-6">
 <h3>Sequential Pattern Recall</h3>
 <p>Memory Match is a modern, grid-based evolution of the classic Simon Says game. It is specifically designed to challenge your sequential memory and sustained attention. Unlike spatial memory tasks that rely on static locations, this tool requires you to hold a temporal sequence of events in your working memory. As the grid lights up, your brain's phonological loop and visuospatial sketchpad work in tandem to encode the order of the activations. When it is your turn to reproduce the pattern, you must retrieve this sequence accurately, suppressing any impulsive guesses. This type of cognitive training is highly correlated with improvements in fluid intelligence and executive function.</p>
 <p>The game's difficulty scales dynamically on two axes: sequence length and playback speed. Starting with a simple two-tile pattern, each successful round adds a new random tile to the end of the sequence. Simultaneously, depending on your chosen difficulty mode, the delay between tile activations shrinks, forcing your brain to process visual information more rapidly. The 'Insane' mode, with its 200ms flash rate, pushes the boundaries of human reaction time and short-term memory capacity. The immediate visual feedback—green for correct, red for incorrect—ensures that your brain receives clear error signals, which are crucial for neuroplastic adaptation. Whether you are preparing for competitive exams, looking to sharpen your daily focus, or simply enjoy high-stakes brain teasers, Memory Match provides a rigorous, scientifically grounded workout for your neural pathways.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What is the difference between the difficulty modes?", answer:"The difficulty modes control the speed at which the sequence is shown. Normal is 800ms per tile, Fast is 400ms, and Insane is a blistering 200ms, requiring intense focus."},
 { question:"Does the sequence get longer every level?", answer:"Yes, every time you successfully complete a level, one additional tile is added to the end of the sequence, increasing the memory load."},
 { question:"Is my high score saved?", answer:"Your high score for the current session is tracked. Future updates may include persistent local storage to save your all-time best level."},
 { question:"Can I play without sound?", answer:"Yes, this tool is entirely visual. It uses color and animation to provide feedback, making it perfect for playing in quiet environments like offices or libraries."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/fun/memory-match" max={6} />
 </div>
 );
}

export default MemoryMatchClient;
