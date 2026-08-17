"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Grid3X3, RotateCcw, CheckCircle2, Check, Grid } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const THEMES = {
  Animals: ["LION", "TIGER", "BEAR", "ZEBRA", "EAGLE", "SHARK", "WHALE", "SNAKE", "HORSE", "SHEEP"],
  Fruits: ["APPLE", "BANANA", "CHERRY", "GRAPE", "LEMON", "MANGO", "PEACH", "PLUM", "MELON", "BERRY"],
  Colors: ["RED", "BLUE", "GREEN", "YELLOW", "PURPLE", "ORANGE", "BLACK", "WHITE", "BROWN", "PINK"]
};
type Placement = {
  word: string;
  cells: string[];
};
export default function WordSearchClient() {
  const [theme, setTheme] = useState<keyof typeof THEMES>("Animals");
  const [grid, setGrid] = useState<string[][]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [gridSize] = useState(12);
  const generateGrid = useCallback(() => {
    const size = gridSize;
    const emptyGrid: string[][] = Array(size).fill("").map(() => Array(size).fill(""));
    const words = THEMES[theme].slice(0, 8);
    const newPlacements: Placement[] = [];
    for (const word of words) {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        attempts++;
        const dir = Math.random() > 0.5 ? "H" : "V";
        const maxRow = dir === "V" ? size - word.length : size - 1;
        const maxCol = dir === "H" ? size - word.length : size - 1;
        const r = Math.floor(Math.random() * (maxRow + 1));
        const c = Math.floor(Math.random() * (maxCol + 1));
        let canPlace = true;
        const cells: string[] = [];
        for (let i = 0; i < word.length; i++) {
          const currR = dir === "V" ? r + i : r;
          const currC = dir === "H" ? c + i : c;
          const cellId = `${currR},${currC}`;
          if (emptyGrid[currR][currC] !== "" && emptyGrid[currR][currC] !== word[i]) {
            canPlace = false;
            break;
          }
          cells.push(cellId);
        }
        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const currR = dir === "V" ? r + i : r;
            const currC = dir === "H" ? c + i : c;
            emptyGrid[currR][currC] = word[i];
          }
          newPlacements.push({
            word,
            cells
          });
          placed = true;
        }
      }
    }
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (emptyGrid[r][c] === "") {
          emptyGrid[r][c] = alphabet[Math.floor(Math.random() * 26)];
        }
      }
    }
    setGrid(emptyGrid);
    setPlacements(newPlacements);
    setFoundWords(new Set());
    setSelectedCells(new Set());
  }, [theme, gridSize]);
  useEffect(() => {
    generateGrid();
  }, [generateGrid]);
  const toggleCell = (r: number, c: number) => {
    const cellId = `${r},${c}`;
    const newSelected = new Set(selectedCells);
    if (newSelected.has(cellId)) {
      newSelected.delete(cellId);
    } else {
      newSelected.add(cellId);
    }
    setSelectedCells(newSelected);
  };
  const checkSelection = () => {
    if (selectedCells.size === 0) return;
    let matchedWord = "";
    for (const p of placements) {
      if (p.cells.length === selectedCells.size && p.cells.every(c => selectedCells.has(c))) {
        matchedWord = p.word;
        break;
      }
    }
    if (matchedWord) {
      const newFound = new Set(foundWords);
      newFound.add(matchedWord);
      setFoundWords(newFound);
      setSelectedCells(new Set());
      toast.success(`Found: ${matchedWord}!`);
      if (newFound.size === placements.length) {
        toast.success("Congratulations! You found all words!");
      }
    } else {
      toast.error("No matching word found in selected cells.");
      setSelectedCells(new Set());
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Search} title="Word Search Generator" description="Generate custom word search puzzles and find the hidden words in the grid." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex flex-wrap items-center justify-between gap-4">
 <CardTitle className={titleClass}>Theme: {theme}</CardTitle>
 <div className="flex gap-2">
 {Object.keys(THEMES).map(t => <Button key={t} variant={theme === t ? "default" : "outline"} size="sm" onClick={() => setTheme(t as keyof typeof THEMES)}>
 {t}
 </Button>)}
 <Button variant="ghost" size="sm" onClick={generateGrid} className="gap-1">
 <RotateCcw className="w-3 h-3" /> New Grid
 </Button>
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-4 sm:p-6">
 <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8">
 <div className="flex flex-col items-center">
 <div className="grid gap-1" style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
              }}>
 {grid.map((row, r) => row.map((char, c) => {
                  const cellId = `${r},${c}`;
                  const isSelected = selectedCells.has(cellId);
                  const isFound = Array.from(foundWords).some(w => placements.find(p => p.word === w)?.cells.includes(cellId));
                  return <Button key={cellId} onClick={() => toggleCell(r, c)} className={cn(`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center font-bold text-sm sm:text-base rounded transition-all border ${isFound ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-400" : isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border/50 hover:bg-muted"}`)}>
 {char}
 </Button>;
                }))}
 </div>
 <Button onClick={checkSelection} className="mt-6 w-full max-w-xs gap-2">
 <CheckCircle2 className="w-4 h-4" /> Check Selection
 </Button>
 </div>
 
 <div className="space-y-3 md:min-w-[150px]">
 <h3 className="font-bold text-lg border-b pb-2">Words to Find ({foundWords.size}/{placements.length})</h3>
 <ul className="space-y-2">
 {placements.map(p => <li key={p.word} className={`font-mono tracking-wider text-sm ${foundWords.has(p.word) ? "line-through text-muted-foreground" : "text-foreground"}`}>
 {p.word}
 </li>)}
 </ul>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Pick a Theme",
        description: "Choose Animals, Fruits, or Colors to generate your custom puzzle.",
        icon: Grid3X3
      }, {
        step: "02",
        title: "Select Letters",
        description: "Click and highlight the cells in the grid that spell a hidden word.",
        icon: Search
      }, {
        step: "03",
        title: "Verify & Win",
        description: "Hit 'Check Selection' to mark the word as found and clear the board.",
        icon: CheckCircle2
      }]} badges={["100% Free", "Client-Side", "Fun"]} />

 <ToolFeatureGuides features={[{
        icon: Search,
        title: "Dynamic Generation",
        description: "Every time you switch themes or click reset, a brand new puzzle is created."
      }, {
        icon: Grid3X3,
        title: "Multiple Themes",
        description: "Choose from Animals, Fruits, or Colors to tailor the vocabulary."
      }, {
        icon: CheckCircle2,
        title: "Smart Validation",
        description: "The game checks your selected cells against all hidden word coordinates."
      }, {
        icon: RotateCcw,
        title: "Endless Replay",
        description: "Generate infinite variations of puzzles for continuous brain training."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Word searches are a beloved puzzle that combines visual scanning with vocabulary recall. They require you to disengage from the chaotic background noise of random letters and focus on specific sequential patterns.</p>
 <p>Our generator creates puzzles algorithmically, placing words horizontally and vertically, then filling the void with random letters. This ensures a perfectly balanced difficulty level every time you play.</p>
 <p>To solve, simply click the cells that make up the word you have spotted, then press"Check Selection". This digital approach eliminates the need for paper and pencil, making it an eco-friendly and highly portable brain teaser.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "How do I highlight a word?",
        answer: "Click on each individual letter cell that makes up the word to highlight it, then click the 'Check Selection' button to verify."
      }, {
        question: "Are words placed diagonally?",
        answer: "To ensure a smooth digital experience, words are currently placed only horizontally and vertically."
      }, {
        question: "Can I generate a new puzzle with the same theme?",
        answer: "Yes! Simply click the 'New Grid' button to reshuffle the words and random letters for the current theme."
      }]} />
    </div>
    </div>
);
}
