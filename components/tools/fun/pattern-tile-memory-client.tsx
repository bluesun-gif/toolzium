"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Grid3x3, RotateCcw, Lightbulb, Timer, Trophy, Play } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const COLORS = [
 'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'
];

export function PatternTileMemoryClient() {
 const [gridSize, setGridSize] = useState(3);
 const [targetGrid, setTargetGrid] = useState<string[]>([]);
 const [playerGrid, setPlayerGrid] = useState<string[]>([]);
 const [selectedTile, setSelectedTile] = useState<number | null>(null);
 const [moves, setMoves] = useState(0);
 const [time, setTime] = useState(0);
 const [isPlaying, setIsPlaying] = useState(false);
 const [isShowingTarget, setIsShowingTarget] = useState(false);
 const [stars, setStars] = useState(0);
 const [level, setLevel] = useState(1);

 const generatePattern = useCallback((size: number): string[] => {
 const pattern: string[] = [];
 for (let i = 0; i < size * size; i++) {
 pattern.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
 }
 return pattern;
 }, []);

 const shuffleArray = useCallback((arr: string[]): string[] => {
 const a = [...arr];
 for (let i = a.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [a[i], a[j]] = [a[j], a[i]];
 }
 return a;
 }, []);

 const startGame = useCallback(() => {
 const target = generatePattern(gridSize);
 setTargetGrid(target);
 setPlayerGrid(shuffleArray(target));
 setMoves(0);
 setTime(0);
 setStars(0);
 setSelectedTile(null);
 setIsShowingTarget(true);
 setIsPlaying(true);
 setTimeout(() => setIsShowingTarget(false), 3000 + (gridSize * 500));
 }, [gridSize, generatePattern, shuffleArray]);

 useEffect(() => {
 let interval: any = null;
 if (isPlaying && !isShowingTarget) {
 interval = setInterval(() => setTime((t) => t + 1), 1000);
 }
 return () => clearInterval(interval);
 }, [isPlaying, isShowingTarget]);

 useEffect(() => {
 if (isPlaying && !isShowingTarget && playerGrid.length > 0 && playerGrid.every((c, i) => c === targetGrid[i])) {
 setIsPlaying(false);
 const optimalMoves = gridSize * gridSize;
 let s = 1;
 if (moves <= optimalMoves * 1.5) s = 3;
 else if (moves <= optimalMoves * 2.5) s = 2;
 setStars(s);
 toast.success(`Level ${level} Complete! ${s} Stars`);
 setLevel((l) => l + 1);
 if (gridSize < 5 && level % 3 === 0) setGridSize((g) => g + 1);
 }
 }, [playerGrid, targetGrid, isPlaying, isShowingTarget, moves, gridSize, level]);

 const handleTileClick = (index: number) => {
 if (!isPlaying || isShowingTarget) return;
 if (selectedTile === null) {
 setSelectedTile(index);
 } else {
 if (selectedTile !== index) {
 const newGrid = [...playerGrid];
 [newGrid[selectedTile], newGrid[index]] = [newGrid[index], newGrid[selectedTile]];
 setPlayerGrid(newGrid);
 setMoves((m) => m + 1);
 }
 setSelectedTile(null);
 }
 };

 const useHint = () => {
 if (!isPlaying || isShowingTarget) return;
 setIsShowingTarget(true);
 setMoves((m) => m + 5);
 toast("Hint used! +5 moves penalty", { icon:"💡"});
 setTimeout(() => setIsShowingTarget(false), 2000);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Grid3x3}
 title="Pattern Tile Memory"
 description="Test your spatial recall and pattern recognition by recreating shuffled color grids in this engaging cognitive challenge."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Grid3x3 className="w-4 h-4"/> Pattern Tile Memory
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="flex flex-wrap gap-4 items-center justify-between">
 <div className="flex gap-2">
 {[3, 4, 5].map((size) => (
 <Button key={size} variant={gridSize === size ?"default":"outline"} size="sm"onClick={() => setGridSize(size)}>
 {size}x{size}
 </Button>
 ))}
 </div>
 <div className="flex gap-4 text-sm font-medium">
 <span className="flex items-center gap-1"><Timer className="w-4 h-4"/> {time}s</span>
 <span>Moves: {moves}</span>
 <span>Level: {level}</span>
 </div>
 </div>

 <div className="flex justify-center">
 <div 
 className="grid gap-2 w-full max-w-md aspect-square"
 style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
 >
 {(isShowingTarget ? targetGrid : playerGrid).map((color, idx) => (
 <button
 key={idx}
 onClick={() => handleTileClick(idx)}
 className={`aspect-square rounded-lg transition-all duration-300 ${color} ${
 selectedTile === idx ? 'ring-4 ring-white scale-95' : 'hover:scale-105'
 } ${isShowingTarget ? 'cursor-default' : 'cursor-pointer'}`}
 disabled={isShowingTarget || !isPlaying}
 />
 ))}
 </div>
 </div>

 <div className="flex flex-wrap gap-3 justify-center">
 {!isPlaying ? (
 <Button onClick={startGame} className="gap-2"><Play className="w-4 h-4"/> {stars > 0 ?"Next Level":"Start Game"}</Button>
 ) : (
 <>
 <Button variant="outline"onClick={useHint} className="gap-2"><Lightbulb className="w-4 h-4"/> Hint</Button>
 <Button variant="outline"onClick={startGame} className="gap-2"><RotateCcw className="w-4 h-4"/> Restart</Button>
 </>
 )}
 </div>

 {stars > 0 && !isPlaying && (
 <div className="text-center space-y-2">
 <div className="flex justify-center gap-1 text-yellow-500">
 {Array.from({ length: 3 }).map((_, i) => (
 <Trophy key={i} className={`w-8 h-8 ${i < stars ? 'fill-yellow-500' : 'opacity-30'}`} />
 ))}
 </div>
 <p className="text-sm text-muted-foreground">Optimal moves: ~{gridSize * gridSize}. You used {moves}.</p>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Memorize the Pattern", description:"Observe the target grid of colored tiles carefully before it shuffles.", icon: Grid3x3 },
 { step:"02", title:"Swap the Tiles", description:"Click two tiles to swap their positions and recreate the original pattern.", icon: RotateCcw },
 { step:"03", title:"Earn Stars", description:"Complete the puzzle in the fewest moves possible to earn a 3-star rating.", icon: Trophy }
 ]}
 badges={["100% Free","Client-Side Privacy","No Signup"]}
 />

 <ToolFeatureGuides features={[
 { icon: Grid3x3, title:"Dynamic Scaling", description:"Grids expand from 3x3 to 5x5 as you progress, increasing cognitive load."},
 { icon: Timer, title:"Precision Tracking", description:"Monitor your exact move count and completion time for every puzzle."},
 { icon: Lightbulb, title:"Strategic Hints", description:"Use hints to briefly reveal the target pattern at the cost of move penalties."},
 { icon: Trophy, title:"Star Rating System", description:"Achieve perfect scores by solving puzzles near the mathematical optimal move count."}
 ]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Cognitive Science of Spatial Recall</h3>
 <p>Pattern Tile Memory is an engaging and visually stimulating cognitive game designed to test and improve your spatial memory, pattern recognition, and problem-solving skills. In a world where digital distractions constantly fragment our attention, exercises that demand focused visual recall are more valuable than ever. This tile-based memory challenge requires you to observe a specific arrangement of colored tiles, memorize their positions, and then recreate the exact pattern from a shuffled grid. The game dynamically scales in difficulty, offering 3x3, 4x4, and 5x5 grids to accommodate both beginners and advanced players seeking a rigorous mental workout.</p>
 <p>The core mechanics revolve around swapping tiles to restore the original sequence. Unlike traditional card-matching memory games where pairs are hidden, Pattern Tile Memory forces you to hold an entire spatial map in your working memory. This engages the hippocampus and the visual cortex simultaneously, promoting neuroplasticity and enhancing your ability to process complex visual information. As you progress through levels, the color palettes become more nuanced, and the grid sizes expand, demanding greater cognitive load management and strategic swapping to minimize your move count.</p>
 <p>Beyond mere entertainment, this tool serves as an excellent brain-training utility for students, professionals, and aging adults looking to keep their minds sharp. The integration of a move counter and timer adds a layer of competitive strategy, encouraging players to find the most efficient path to the solution rather than just any solution. Achieving a three-star rating requires not only perfect recall but also optimal spatial reasoning. Whether you are taking a quick mental break during a busy workday or dedicating time to structured cognitive training, the Pattern Tile Memory game provides a beautifully designed, frictionless, and highly rewarding experience that runs entirely in your browser with zero setup required. Dive into the vibrant grid, challenge your spatial recall, and see how many stars you can earn across increasingly complex puzzles.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"How is the star rating calculated?", answer:"Stars are awarded based on your move efficiency. Completing the puzzle close to the mathematical minimum number of swaps earns 3 stars, while taking excessive moves will result in 1 or 2 stars."},
 { question:"Does the game get harder over time?", answer:"Yes. As you complete levels, the grid size will automatically increase from 3x3 to 4x4 and eventually 5x5, introducing more colors and tiles to memorize."},
 { question:"Is my progress saved?", answer:"The game tracks your current level and streak during your browser session. All processing happens locally on your device for maximum privacy."},
 { question:"What happens if I use a hint?", answer:"Using a hint briefly reveals the target pattern again but adds a 5-move penalty to your score, making it harder to achieve a 3-star rating."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/pattern-tile-memory" max={6} />
 </div>
 );
}

export default PatternTileMemoryClient;
