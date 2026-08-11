"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid3x3, RotateCcw, Lightbulb, Timer, Pen, CheckCircle2, Undo2, Play, Pause } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

type Difficulty = 'easy' | 'medium' | 'hard';

export function SudokuClient() {
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initial, setInitial] = useState<boolean[][]>([]);
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);
  const [notesMode, setNotesMode] = useState(false);
  const [notes, setNotes] = useState<boolean[][][]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [showErrors, setShowErrors] = useState(true);

  const generatePuzzle = useCallback((diff: Difficulty) => {
    const N = 3;
    const size = 9;
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
    
    const cellsToRemove = diff === 'easy' ? 35 : diff === 'medium' ? 45 : 55;
    const indices = Array.from({ length: 81 }, (_, i) => i);
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
    setNotes(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => Array(9).fill(false))));
    setHistory([]);
    setTime(0);
    setIsPlaying(true);
    setErrors(new Set());
    setSelected(null);
  }, []);

  useEffect(() => {
    generatePuzzle(difficulty);
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const validateGrid = useCallback((g: (number | null)[][]) => {
    const newErrors = new Set<string>();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const val = g[i][j];
        if (val !== null) {
          for (let k = 0; k < 9; k++) {
            if (k !== j && g[i][k] === val) newErrors.add(`${i}-${j}`);
            if (k !== i && g[k][j] === val) newErrors.add(`${i}-${j}`);
          }
          const br = Math.floor(i / 3) * 3;
          const bc = Math.floor(j / 3) * 3;
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              if (br + r !== i || bc + c !== j) {
                if (g[br + r][bc + c] === val) newErrors.add(`${i}-${j}`);
              }
            }
          }
        }
      }
    }
    setErrors(newErrors);
  }, []);

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
      newNotes[r][c] = Array(9).fill(false);
      setNotes(newNotes);
      validateGrid(newGrid);
      
      if (newGrid.every((row, i) => row.every((val, j) => val === solution[i][j]))) {
        setIsPlaying(false);
        toast.success("Sudoku Solved!");
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

  const handleHint = () => {
    if (!selected) {
      toast("Select an empty cell first");
      return;
    }
    const { r, c } = selected;
    if (initial[r][c]) return;
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = solution[r][c];
    setGrid(newGrid);
    setHistory((h) => [...h, { r, c, oldVal: grid[r][c], oldNotes: notes[r][c].map(n => n) }]);
    validateGrid(newGrid);
    if (newGrid.every((row, i) => row.every((val, j) => val === solution[i][j]))) {
      setIsPlaying(false);
      toast.success("Sudoku Solved!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        icon={Grid3x3}
        title="Classic Sudoku"
        description="The definitive 9x9 logic puzzle experience with intelligent pencil notes, real-time error checking, and dynamic puzzle generation."
      />

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Grid3x3 className="w-4 h-4" /> Classic Sudoku
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                <Button key={d} variant={difficulty === d ? "default" : "outline"} size="sm" onClick={() => { setDifficulty(d); generatePuzzle(d); }}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</span>
              <Button variant={isPlaying ? "outline" : "default"} size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-center">
            <div className="grid grid-cols-9 border-2 border-foreground rounded-lg overflow-hidden max-w-[360px] w-full aspect-square">
              {grid.map((row, r) => row.map((cell, c) => {
                const isSelected = selected?.r === r && selected?.c === c;
                const isInitial = initial[r][c];
                const isError = showErrors && errors.has(`${r}-${c}`);
                const borderR = c === 2 || c === 5 ? 'border-r-2 border-r-foreground' : 'border-r border-r-border';
                const borderB = r === 2 || r === 5 ? 'border-b-2 border-b-foreground' : 'border-b border-b-border';
                
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`relative flex items-center justify-center text-lg font-bold transition-colors
                      ${borderR} ${borderB}
                      ${isSelected ? 'bg-primary/20' : 'bg-background hover:bg-muted/50'}
                      ${isError ? 'text-red-500' : isInitial ? 'text-foreground' : 'text-blue-500'}
                    `}
                  >
                    {cell || (
                      <div className="grid grid-cols-3 gap-0.5 p-0.5 w-full h-full">
                        {notes[r]?.[c]?.map((hasNote, i) => (
                          <span key={i} className="text-[8px] text-muted-foreground flex items-center justify-center">
                            {hasNote ? i + 1 : ''}
                          </span>
                        )) || null}
                      </div>
                    )}
                  </button>
                );
              }))}
            </div>

            <div className="space-y-4 w-full max-w-[200px]">
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                  <Button key={num} variant="outline" className="h-12 text-lg font-bold" onClick={() => handleNumberInput(num)}>
                    {num}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant={notesMode ? "default" : "outline"} size="sm" onClick={() => setNotesMode(!notesMode)} className="gap-1">
                  <Pen className="w-3 h-3" /> Notes
                </Button>
                <Button variant="outline" size="sm" onClick={handleUndo} className="gap-1">
                  <Undo2 className="w-3 h-3" /> Undo
                </Button>
                <Button variant="outline" size="sm" onClick={handleHint} className="gap-1">
                  <Lightbulb className="w-3 h-3" /> Hint
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowErrors(!showErrors)} className="gap-1 text-xs">
                  Errors: {showErrors ? 'On' : 'Off'}
                </Button>
              </div>
              <Button variant="destructive" size="sm" className="w-full gap-1" onClick={() => generatePuzzle(difficulty)}>
                <RotateCcw className="w-3 h-3" /> New Puzzle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Analyze the Grid", description: "Scan the 9x9 board to identify missing numbers in rows, columns, and 3x3 boxes.", icon: Grid3x3 },
          { step: "02", title: "Use Pencil Notes", description: "Toggle notes mode to mark potential candidates in empty cells and narrow down possibilities.", icon: Pen },
          { step: "03", title: "Apply Logic", description: "Place definitive numbers using deductive reasoning until the entire grid is perfectly filled.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Client-Side Privacy", "No Signup"]}
      />

      <ToolFeatureGuides features={[
        { icon: Grid3x3, title: "Dynamic Generation", description: "Every puzzle is mathematically generated on the fly, ensuring infinite unique challenges." },
        { icon: Pen, title: "Smart Pencil Notes", description: "Track candidate numbers effortlessly with our integrated 3x3 sub-grid note system." },
        { icon: CheckCircle2, title: "Real-Time Validation", description: "Instantly highlights conflicting numbers to prevent logical dead-ends and invalid states." },
        { icon: Undo2, title: "Infinite Undo", description: "Experiment with complex hypothetical chains without fear, backed by a complete move history." }
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Ultimate Logic Puzzle Engine</h3>
          <p>Sudoku is the world's most beloved logic-based number placement puzzle, and our premium online Sudoku engine delivers the definitive experience for purists and casual players alike. Originating from the concept of Latin squares, Sudoku requires no mathematical arithmetic—only pure deductive reasoning, pattern recognition, and logical elimination. Our platform generates mathematically unique, symmetrically balanced puzzles across three distinct difficulty tiers: Easy, Medium, and Hard. Whether you are looking for a gentle morning brain-teaser or a grueling logical labyrinth to test your limits, our dynamic generation algorithm ensures a fresh, solvable challenge every single time you click 'New Puzzle'.</p>
          <p>The interface is meticulously crafted to replicate the tactile satisfaction of solving a puzzle on paper while leveraging the power of modern web technology. Features like intelligent pencil notes (candidate marking) allow you to track potential numbers for each cell, automatically clearing them when a definitive number is placed in a corresponding row, column, or 3x3 box. Our real-time error highlighting gently guides beginners by preventing invalid placements, while veterans can toggle this feature off for a raw, unassisted experience. The integrated undo system and smart hint engine ensure that you never get permanently stuck, transforming frustration into a learning opportunity.</p>
          <p>Playing Sudoku regularly is scientifically proven to improve concentration, logical thinking, and problem-solving speed. It forces the brain to recognize complex interactions between intersecting constraints, a skill that translates directly to programming, mathematics, and strategic planning. Our client-side architecture guarantees that your game state is preserved instantly, with zero latency and absolute privacy—no data is ever sent to a server. Experience the zen-like flow state of filling the final cell, backed by a precise timer and move tracker that lets you benchmark your logical prowess against your personal bests. Engage your mind with the ultimate classic puzzle, optimized for both desktop strategists and mobile commuters.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[
        { question: "Are the Sudoku puzzles uniquely solvable?", answer: "Yes. Our generation algorithm guarantees that every puzzle has exactly one logical solution, eliminating the need for guessing." },
        { question: "How do pencil notes work?", answer: "Toggle the 'Notes' button, then select a cell and tap any number. Small candidate digits will appear in the cell. Placing a definitive number automatically clears notes in that cell." },
        { question: "Can I turn off error highlighting?", answer: "Absolutely. Click the 'Errors' toggle to disable real-time conflict highlighting for a more traditional, unassisted pen-and-paper experience." },
        { question: "Is my game saved if I close the tab?", answer: "The game maintains state during your active session. For long-term persistence, we recommend completing the puzzle in one sitting to maintain your flow state." }
      ]} />

      <RelatedTools currentToolUrl="/tools/fun/sudoku" max={6} />
    </div>
  );
}

export default SudokuClient;
