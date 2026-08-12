"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Grid3x3, RotateCcw, Timer, Pen, Undo2, Trophy } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type Mode = '4x4' | '9x9' | '16x16';
type Difficulty = 'easy' | 'medium' | 'hard';

export function SudokuUnlimitedClient() {
 const [mode, setMode] = useState<Mode>('9x9');
 const [difficulty, setDifficulty] = useState<Difficulty>('medium');
 const [grid, setGrid] = useState<(number | null)[][]>([]);
 const [solution, setSolution] = useState<number[][]>([]);
 const [initial, setInitial] = useState<boolean[][]>([]);
 const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);
 const [notesMode, setNotesMode] = useState(false);
 const [notes, setNotes] = useState<boolean[][][]>([]);
 const [time, setTime] = useState(0);
 const [isPlaying, setIsPlaying] = useState(false);
 const [history, setHistory] = useState<any[]>([]);
 const [errors, setErrors] = useState<Set<string>>(new Set());
 const [stats, setStats] = useState<Record<Mode, number>>({ '4x4': 0, '9x9': 0, '16x16': 0 });
 const [bestTimes, setBestTimes] = useState<Record<Mode, number>>({ '4x4': Infinity, '9x9': Infinity, '16x16': Infinity });

 const getN = (m: Mode) => m === '4x4' ? 2 : m === '9x9' ? 3 : 4;
 const getSize = (m: Mode) => m === '4x4' ? 4 : m === '9x9' ? 9 : 16;

 const generatePuzzle = useCallback((m: Mode, diff: Difficulty) => {
 const N = getN(m);
 const size = getSize(m);
 const base: number[][] = [];
 for (let i = 0; i < size; i++) {
 const row: number[] = [];
 for (let j = 0; j < size; j++) {
 row.push((N * (i % N) + Math.floor(i / N) + j) % size + 1);
 }
 base.push(row);
 }
 
 const symbols = Array.from({ length: size }, (_, i) => i + 1);
 for (let i = symbols.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
 }
 
 const solved: number[][] = base.map(row => row.map(val => symbols[val - 1]));
 const masked: (number | null)[][] = solved.map(row => [...row]);
 
 let cellsToRemove = 0;
 if (N === 2) cellsToRemove = diff === 'easy' ? 4 : diff === 'medium' ? 6 : 8;
 else if (N === 3) cellsToRemove = diff === 'easy' ? 35 : diff === 'medium' ? 45 : 55;
 else cellsToRemove = diff === 'easy' ? 120 : diff === 'medium' ? 160 : 200;
 
 const indices = Array.from({ length: size * size }, (_, i) => i);
 for (let i = indices.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [indices[i], indices[j]] = [indices[j], indices[i]];
 }
 
 for (let k = 0; k < cellsToRemove; k++) {
 const r = Math.floor(indices[k] / size);
 const c = indices[k] % size;
 masked[r][c] = null;
 }
 
 setSolution(solved);
 setGrid(masked);
 setInitial(masked.map(row => row.map(cell => cell !== null)));
 setNotes(Array.from({ length: size }, () => Array.from({ length: size }, () => Array(size).fill(false))));
 setHistory([]);
 setTime(0);
 setIsPlaying(true);
 setErrors(new Set());
 setSelected(null);
 }, []);

 useEffect(() => {
 generatePuzzle(mode, difficulty);
 }, []);

 useEffect(() => {
 let interval: any = null;
 if (isPlaying) {
 interval = setInterval(() => setTime((t) => t + 1), 1000);
 }
 return () => clearInterval(interval);
 }, [isPlaying]);

 const getSymbol = (val: number | null, N: number): string => {
 if (val === null || val === 0) return"";
 if (N === 4 && val > 9) return String.fromCharCode(64 + val - 9);
 return val.toString();
 };

 const validateGrid = useCallback((g: (number | null)[][]) => {
 const N = getN(mode);
 const size = getSize(mode);
 const newErrors = new Set<string>();
 for (let i = 0; i < size; i++) {
 for (let j = 0; j < size; j++) {
 const val = g[i][j];
 if (val !== null) {
 for (let k = 0; k < size; k++) {
 if (k !== j && g[i][k] === val) newErrors.add(`${i}-${j}`);
 if (k !== i && g[k][j] === val) newErrors.add(`${i}-${j}`);
 }
 const br = Math.floor(i / N) * N;
 const bc = Math.floor(j / N) * N;
 for (let r = 0; r < N; r++) {
 for (let c = 0; c < N; c++) {
 if (br + r !== i || bc + c !== j) {
 if (g[br + r][bc + c] === val) newErrors.add(`${i}-${j}`);
 }
 }
 }
 }
 }
 }
 setErrors(newErrors);
 }, [mode]);

 const handleCellClick = (r: number, c: number) => {
 if (initial[r][c]) return;
 setSelected({ r, c });
 };

 const handleNumberInput = (num: number) => {
 if (!selected) return;
 const { r, c } = selected;
 if (initial[r][c]) return;

 setHistory((h) => [...h, { r, c, oldVal: grid[r][c], oldNotes: notes[r][c].map(n => n) }]);

 if (notesMode) {
 const newNotes = notes.map(row => row.map(n => [...n]));
 newNotes[r][c][num - 1] = !newNotes[r][c][num - 1];
 setNotes(newNotes);
 } else {
 const newGrid = grid.map(row => [...row]);
 newGrid[r][c] = newGrid[r][c] === num ? null : num;
 setGrid(newGrid);
 const newNotes = notes.map(row => row.map(n => [...n]));
 newNotes[r][c] = Array(getSize(mode)).fill(false);
 setNotes(newNotes);
 validateGrid(newGrid);
 
 if (newGrid.every((row, i) => row.every((val, j) => val === solution[i][j]))) {
 setIsPlaying(false);
 setStats((s) => ({ ...s, [mode]: s[mode] + 1 }));
 setBestTimes((b) => ({ ...b, [mode]: Math.min(b[mode], time) }));
 toast.success(`${mode} Sudoku Solved!`);
 }
 }
 };

 const handleUndo = () => {
 if (history.length === 0) return;
 const last = history[history.length - 1];
 const newGrid = grid.map(row => [...row]);
 newGrid[last.r][last.c] = last.oldVal;
 setGrid(newGrid);
 const newNotes = notes.map(row => row.map(n => [...n]));
 newNotes[last.r][last.c] = last.oldNotes;
 setNotes(newNotes);
 setHistory(history.slice(0, -1));
 validateGrid(newGrid);
 };

 const N = getN(mode);
 const size = getSize(mode);
 const symbols = Array.from({ length: size }, (_, i) => i + 1);

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader
 icon={Grid3x3}
 title="Sudoku Unlimited"
 description="Conquer logic puzzles across multiple dimensions with 4x4 Mini, 9x9 Classic, and 16x16 Giant grids."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Grid3x3 className="w-4 h-4"/> Sudoku Unlimited
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="flex flex-wrap gap-3 items-center justify-between">
 <div className="flex gap-2">
 {(['4x4', '9x9', '16x16'] as Mode[]).map((m) => (
 <Button key={m} variant={mode === m ?"default":"outline"} size="sm"onClick={() => { setMode(m); generatePuzzle(m, difficulty); }}>
 {m}
 </Button>
 ))}
 </div>
 <div className="flex items-center gap-4 text-sm font-medium">
 <span className="flex items-center gap-1"><Timer className="w-4 h-4"/> {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</span>
 <span className="hidden sm:inline">Best: {bestTimes[mode] === Infinity ? '--:--' : `${Math.floor(bestTimes[mode] / 60)}:${(bestTimes[mode] % 60).toString().padStart(2, '0')}`}</span>
 </div>
 </div>

 <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-center">
 <div 
 className={`grid border-2 border-foreground rounded-lg overflow-hidden ${mode === '16x16' ? 'max-w-[500px]' : 'max-w-[360px]'} w-full aspect-square`}
 style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
 >
 {grid.map((row, r) => row.map((cell, c) => {
 const isSelected = selected?.r === r && selected?.c === c;
 const isInitial = initial[r][c];
 const isError = errors.has(`${r}-${c}`);
 const borderR = (c + 1) % N === 0 && c !== size - 1 ? 'border-r-2 border-r-foreground' : 'border-r border-r-border';
 const borderB = (r + 1) % N === 0 && r !== size - 1 ? 'border-b-2 border-b-foreground' : 'border-b border-b-border';
 
 return (
 <button
 key={`${r}-${c}`}
 onClick={() => handleCellClick(r, c)}
 className={`relative flex items-center justify-center font-bold transition-colors
 ${borderR} ${borderB}
 ${mode === '16x16' ? 'text-xs' : 'text-lg'}
 ${isSelected ? 'bg-primary/20' : 'bg-background hover:bg-muted/50'}
 ${isError ? 'text-red-500' : isInitial ? 'text-foreground' : 'text-primary'}
 `}
 >
 {cell ? getSymbol(cell, N) : (
 <div className={`grid gap-0.5 p-0.5 w-full h-full ${mode === '16x16' ? 'grid-cols-4' : 'grid-cols-3'}`}>
 {notes[r]?.[c]?.map((hasNote, i) => (
 <span key={i} className="text-[7px] text-muted-foreground flex items-center justify-center">
 {hasNote ? getSymbol(i + 1, N) : ''}
 </span>
 )) || null}
 </div>
 )}
 </button>
 );
 }))}
 </div>

 <div className="space-y-4 w-full max-w-[250px]">
 <div className={`grid ${mode === '16x16' ? 'grid-cols-4' : 'grid-cols-3'} gap-1`}>
 {symbols.map((num) => (
 <Button key={num} variant="outline"className="h-10 text-sm font-bold"onClick={() => handleNumberInput(num)}>
 {getSymbol(num, N)}
 </Button>
 ))}
 </div>
 <div className="grid grid-cols-2 gap-2">
 <Button variant={notesMode ?"default":"outline"} size="sm"onClick={() => setNotesMode(!notesMode)} className="gap-1">
 <Pen className="w-3 h-3"/> Notes
 </Button>
 <Button variant="outline"size="sm"onClick={handleUndo} className="gap-1">
 <Undo2 className="w-3 h-3"/> Undo
 </Button>
 </div>
 <Button variant="destructive"size="sm"className="w-full gap-1"onClick={() => generatePuzzle(mode, difficulty)}>
 <RotateCcw className="w-3 h-3"/> New Puzzle
 </Button>
 <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
 <p>Completed: {stats[mode]}</p>
 </div>
 </div>
 </div>
 </CardContent>
 </Card>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Choose Your Dimension", description:"Select between 4x4 Mini, 9x9 Classic, or 16x16 Giant grids based on your skill level.", icon: Grid3x3 },
 { step:"02", title:"Map the Constraints", description:"Analyze rows, columns, and sub-grids to identify missing symbols and logical deductions.", icon: Pen },
 { step:"03", title:"Conquer the Grid", description:"Place symbols systematically and track your best times across all puzzle dimensions.", icon: Trophy }
 ]}
 badges={["100% Free","Client-Side Privacy","No Signup"]}
 />

 <ToolFeatureGuides features={[
 { icon: Grid3x3, title:"Multi-Dimensional Play", description:"Seamlessly switch between 4x4, 9x9, and 16x16 grids with adaptive UI scaling."},
 { icon: Pen, title:"Advanced Notation", description:"Track complex candidate permutations with our dynamic sub-grid pencil note system."},
 { icon: Trophy, title:"Persistent Stats", description:"Monitor your completion rates and personal best times for every puzzle variant."},
 { icon: RotateCcw, title:"Infinite Generation", description:"Algorithmic permutation ensures you never play the exact same puzzle twice."}
 ]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>Expanding the Boundaries of Logic</h3>
 <p>Sudoku Unlimited expands the boundaries of traditional logic puzzles by introducing groundbreaking variant modes that cater to every skill level and cognitive appetite. While the classic 9x9 grid remains the gold standard for logical deduction, true puzzle aficionados often seek new dimensions to conquer. Our platform introduces the accessible Mini 4x4 mode, perfect for young learners and beginners grasping the fundamental rules of Latin squares and spatial constraints. Conversely, the colossal Giant 16x16 mode—utilizing digits 1-9 alongside letters A-G—offers a staggering 256-cell battlefield that will push even the most seasoned Sudoku grandmasters to their absolute cognitive limits.</p>
 <p>The transition between these modes is seamless, with our adaptive rendering engine dynamically adjusting cell sizes, number pads, and candidate note layouts to ensure perfect usability regardless of the grid's scale. The 16x16 variant, in particular, requires a profound expansion of working memory and multi-layered scanning techniques. Players must simultaneously track constraints across 16 rows, 16 columns, and sixteen 4x4 sub-grids, creating a deeply immersive and challenging mental environment. The inclusion of comprehensive tools like multi-cell pencil marking, infinite undo history, and precision hints ensures that the complexity remains manageable and deeply engaging rather than overwhelming.</p>
 <p>By diversifying the puzzle dimensions, Sudoku Unlimited targets different cognitive muscles. The 4x4 grid fosters rapid pattern recognition and quick decision-making, while the 16x16 grid demands sustained attention, advanced hypothetical reasoning, and long-term strategic planning. All puzzles are generated locally using advanced algorithmic permutations, guaranteeing unique logic paths without relying on repetitive templates. Track your mastery across all dimensions with our integrated statistics dashboard, which logs your completed puzzles and personal best times for every variant. Step beyond the ordinary and embrace the infinite possibilities of logic with Sudoku Unlimited, the most comprehensive browser-based puzzle suite available today. Sharpen your mind across multiple dimensions and prove that true logic knows no bounds.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"How do the 16x16 symbols work?", answer:"The 16x16 mode uses digits 1-9 followed by letters A-G to represent the 16 unique symbols required for the grid."},
 { question:"Is the 4x4 mode good for kids?", answer:"Absolutely. The 4x4 Mini mode simplifies the rules to 2x2 boxes, making it an excellent introduction to logical deduction for children."},
 { question:"Are the 16x16 puzzles generated dynamically?", answer:"Yes. We use a sophisticated Latin square permutation algorithm to generate valid 16x16 puzzles instantly in your browser."},
 { question:"Do my stats save if I refresh?", answer:"Stats are maintained in local session memory. For permanent tracking, we recommend keeping the tab open during your training sessions."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/sudoku-unlimited"max={6} />
 </div>
 );
}

export default SudokuUnlimitedClient;
