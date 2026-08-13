"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { RotateCcw, Grid3X3, Play, Heart, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export function PatternMemoryClient() {
 const [phase, setPhase] = useState<"idle"|"memorize"|"recall"|"feedback"|"gameover">("idle");
 const [level, setLevel] = useState(1);
 const [lives, setLives] = useState(3);
 const [pattern, setPattern] = useState<number[]>([]);
 const [selectedCells, setSelectedCells] = useState<number[]>([]);
 const [highScore, setHighScore] = useState(0);

 const gridSize = useMemo(() => {
 if (level >= 15) return 6;
 if (level >= 8) return 5;
 return 4;
 }, [level]);

 const totalCells = gridSize * gridSize;
 const patternSize = level + 2; // Start with 3 cells

 const generatePattern = useCallback((size: number, total: number): number[] => {
 const cells: number[] = [];
 while (cells.length < size) {
 const r = Math.floor(Math.random() * total);
 if (!cells.includes(r)) cells.push(r);
 }
 return cells;
 }, []);

 const startGame = useCallback(() => {
 setLevel(1);
 setLives(3);
 setSelectedCells([]);
 setPhase("memorize");
 const newPattern = generatePattern(3, 16);
 setPattern(newPattern);
 
 (async () => {
 await delay(2500);
 setPhase("recall");
 })();
 }, [generatePattern]);

 const handleCellClick = (idx: number) => {
 if (phase !=="recall") return;
 
 if (selectedCells.includes(idx)) {
 setSelectedCells(selectedCells.filter((c) => c !== idx));
 } else {
 setSelectedCells([...selectedCells, idx]);
 }
 };

 const checkResult = useCallback(async () => {
 if (selectedCells.length !== pattern.length) {
 toast.error(`Select exactly ${pattern.length} cells!`);
 return;
 }
 
 setPhase("feedback");
 await delay(1500);
 
 const isCorrect = selectedCells.every((c) => pattern.includes(c));
 
 if (isCorrect) {
 const nextLvl = level + 1;
 setLevel(nextLvl);
 if (nextLvl > highScore) {
 setHighScore(nextLvl);
 toast.success(`Level ${nextLvl} unlocked!`);
 } else {
 toast.success("Correct! Next level...");
 }
 setSelectedCells([]);
 
 const newSize = nextLvl + 2;
 const newTotal = (nextLvl >= 15 ? 6 : nextLvl >= 8 ? 5 : 4) ** 2;
 const newPattern = generatePattern(newSize, newTotal);
 setPattern(newPattern);
 setPhase("memorize");
 
 await delay(1000 + (newSize * 200));
 setPhase("recall");
 } else {
 const newLives = lives - 1;
 setLives(newLives);
 
 if (newLives <= 0) {
 setPhase("gameover");
 toast.error("Out of lives! Game Over.");
 } else {
 toast.error(`Incorrect! ${newLives} lives remaining.`);
 setSelectedCells([]);
 setPhase("memorize");
 await delay(2500);
 setPhase("recall");
 }
 }
 }, [selectedCells, pattern, level, lives, highScore, generatePattern]);

 const getCellColor = (idx: number) => {
 if (phase ==="memorize"&& pattern.includes(idx)) return"bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)]";
 if (phase ==="feedback") {
 if (pattern.includes(idx) && selectedCells.includes(idx)) return"bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]";
 if (pattern.includes(idx) && !selectedCells.includes(idx)) return"bg-blue-500 opacity-50";
 if (!pattern.includes(idx) && selectedCells.includes(idx)) return"bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]";
 }
 if (selectedCells.includes(idx)) return"bg-yellow-500 shadow-md";
 return"bg-muted/50 hover:bg-muted border border-border/50";
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 pb-12">
      <GridPattern />

 <ToolPageHeader
 icon={Grid3X3}
 title="Pattern Memory"
 description="Memorize expanding grid patterns under pressure. Test your spatial working memory and endurance with our lives-based challenge."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Zap className="w-4 h-4"/> Spatial Grid
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
 <div className="flex items-center gap-6">
 <div className="text-center">
 <div className="text-xs text-muted-foreground">Level</div>
 <div className="text-2xl font-bold text-primary">{phase ==="idle"? 0 : level}</div>
 </div>
 <div className="flex items-center gap-1">
 {Array(3).fill(0).map((_, i) => (
 <Heart key={i} className={`w-5 h-5 ${i < lives ? 'fill-red-500 text-red-500' : 'text-gray-300 dark:text-gray-700'}`} />
 ))}
 </div>
 <div className="text-center">
 <div className="text-xs text-muted-foreground">Best</div>
 <div className="text-2xl font-bold text-yellow-500">{highScore}</div>
 </div>
 </div>
 <div className="flex items-center gap-3">
 {phase ==="idle"|| phase ==="gameover"? (
 <Button onClick={startGame} variant="default"size="sm">
 <Play className="w-4 h-4 mr-2"/> Start Game
 </Button>
 ) : (
 <Button onClick={startGame} variant="outline"size="sm">
 <RotateCcw className="w-4 h-4 mr-2"/> Restart
 </Button>
 )}
 </div>
 </div>

 <div className="text-center text-sm font-medium text-muted-foreground h-6">
 {phase ==="memorize"&&"Memorize the highlighted cells..."}
 {phase ==="recall"&& `Select ${patternSize} cells from memory`}
 {phase ==="feedback"&&"Checking results..."}
 {phase ==="gameover"&& `Game Over! You reached Level ${level}.`}
 </div>

 <div 
 className={`grid gap-2 sm:gap-3 max-w-md mx-auto`}
 style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
 >
 {Array(totalCells).fill(0).map((_, idx) => (
 <button
 key={idx}
 className={`aspect-square rounded-xl transition-all duration-300 ${getCellColor(idx)}`}
 onClick={() => handleCellClick(idx)}
 disabled={phase !=="recall"}
 />
 ))}
 </div>

 {phase ==="recall"&& (
 <div className="flex justify-center">
 <Button 
 onClick={checkResult} 
 variant="default"
 size="lg"
 disabled={selectedCells.length !== patternSize}
 >
 Submit Pattern
 </Button>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Memorize the Pattern", description:"A set of cells will light up on the grid. Memorize their exact positions before they disappear.", icon: Grid3X3 },
 { step:"02", title:"Recall & Select", description:"Tap the cells you remember. You must select the exact same number of cells as were highlighted.", icon: Zap },
 { step:"03", title:"Survive & Expand", description:"Correct guesses advance you to the next level, adding more cells and eventually expanding the grid size.", icon: Heart }
 ]}
 badges={["100% Free","Spatial Memory","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Grid3X3, title:"Dynamic Grid Expansion", description:"The grid starts at 4x4, expands to 5x5 at level 8, and 6x6 at level 15, drastically increasing spatial complexity."},
 { icon: Heart, title:"Lives System", description:"You have 3 lives to recover from mistakes, adding a layer of endurance and pressure to the cognitive challenge."},
 { icon: Zap, title:"Instant Feedback", description:"Upon submission, correct selections glow green while missed or wrong cells flash red, providing clear error analysis."},
 { icon: RotateCcw, title:"Progressive Load", description:"Each level adds one more cell to the pattern, systematically pushing your visuospatial sketchpad to its limits."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none mt-6">
 <h3>Visuospatial Pattern Recall</h3>
 <p>Pattern Memory is a sophisticated grid-based challenge designed to isolate and train your visuospatial working memory. Unlike sequential memory tasks that rely on temporal ordering, this tool requires you to encode a simultaneous, two-dimensional spatial configuration. When the pattern flashes, your brain must rapidly map the coordinates of the highlighted cells relative to the grid's boundaries. This process heavily engages the occipital lobe for visual processing and the parietal lobe for spatial orientation. As the pattern size increases with each level, the cognitive load scales non-linearly, forcing your brain to abandon simple point-memorization and adopt advanced strategies like geometric chunking or boundary-mapping.</p>
 <p>The true genius of this tool lies in its dynamic grid expansion mechanic. Starting on a manageable 4x4 grid, the playing field expands to 5x5 at level 8, and finally to a massive 6x6 matrix at level 15. This expansion fundamentally alters the spatial relationships, requiring your brain to constantly recalibrate its internal coordinate system. The inclusion of a 3-life endurance system transforms the experience from a simple memory test into a test of cognitive stamina and emotional regulation under pressure. The immediate, color-coded feedback upon submission (green for hits, red for false alarms, blue for misses) provides the precise error signals necessary for neuroplastic adaptation. Whether you are an athlete looking to improve your field vision, a surgeon honing your spatial awareness, or a student seeking to boost your working memory capacity, Pattern Memory offers a deeply engaging and scientifically rigorous training environment.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"When does the grid expand?", answer:"The grid expands from 4x4 to 5x5 when you reach Level 8, and from 5x5 to 6x6 when you reach Level 15."},
 { question:"What happens if I select the wrong cells?", answer:"You will lose one life. The game will show you which cells were correct (green) and which were incorrect (red) before resetting the pattern for another attempt."},
 { question:"Do I get partial credit?", answer:"No, you must identify all highlighted cells perfectly to advance to the next level. Partial matches will result in a lost life."},
 { question:"How many cells are in the pattern?", answer:"The pattern starts with 3 cells at Level 1, and adds exactly one more cell for every subsequent level."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/fun/pattern-memory" max={6} />
 </div>
 );
}

export default PatternMemoryClient;
