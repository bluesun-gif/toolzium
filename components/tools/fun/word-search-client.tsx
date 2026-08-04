"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Grid, Search, Trophy, RotateCcw, Printer, Lightbulb } from "lucide-react";
import { toast } from "react-hot-toast";

const CATEGORIES = {
  coding: ["REACT", "JAVA", "PYTHON", "HTML", "CSS", "NODE"],
  animals: ["TIGER", "LION", "ELEPHANT", "GIRAFFE", "ZEBRA"],
  fruits: ["APPLE", "BANANA", "CHERRY", "MANGO", "ORANGE"],
  planets: ["EARTH", "MARS", "VENUS", "JUPITER", "SATURN"],
  geography: ["RIVER", "MOUNTAIN", "OCEAN", "DESERT", "VALLEY"]
};

export function WordSearchClient() {
  const [gridSize, setGridSize] = useState(10);
  const [category, setCategory] = useState("coding");
  const [customWords, setCustomWords] = useState("");
  const [grid, setGrid] = useState<string[][]>([]);
  const [wordsToFind, setWordsToFind] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selection, setSelection] = useState<number[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const generateGrid = () => {
    let wordList = CATEGORIES[category as keyof typeof CATEGORIES] || [];
    if (category === "custom" && customWords.trim()) {
      wordList = customWords.toUpperCase().split(",").map(w => w.trim()).filter(w => w.length > 0 && w.length <= gridSize);
    }
    
    if (wordList.length === 0) {
      toast.error("Please provide valid words.");
      return;
    }
    
    // Very basic grid generation logic for UI demonstration
    const newGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(""));
    const placedWords: string[] = [];
    
    wordList.forEach(word => {
      // Simplistic horizontal placement attempt
      for(let attempt = 0; attempt < 50; attempt++) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * (gridSize - word.length + 1));
        
        let canPlace = true;
        for(let i=0; i<word.length; i++) {
          if (newGrid[row][col+i] !== "" && newGrid[row][col+i] !== word[i]) {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          for(let i=0; i<word.length; i++) {
            newGrid[row][col+i] = word[i];
          }
          placedWords.push(word);
          break;
        }
      }
    });

    for(let r=0; r<gridSize; r++) {
      for(let c=0; c<gridSize; c++) {
        if (newGrid[r][c] === "") {
          newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
    setWordsToFind(placedWords);
    setFoundWords([]);
    setSelection([]);
    setIsPlaying(true);
    setTimer(0);
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    toast.success("Puzzle Generated!");
  };

  const handleCellClick = (r: number, c: number) => {
    if (!isPlaying) return;
    const index = r * gridSize + c;
    const newSelection = [...selection, index];
    setSelection(newSelection);
    
    // Simplistic word checking
    if (newSelection.length >= 2) {
      const start = newSelection[0];
      const end = newSelection[newSelection.length - 1];
      const sr = Math.floor(start / gridSize);
      const sc = start % gridSize;
      const er = Math.floor(end / gridSize);
      const ec = end % gridSize;
      
      if (sr === er || sc === ec) {
        let extracted = "";
        if (sr === er) {
          const min = Math.min(sc, ec);
          const max = Math.max(sc, ec);
          for(let i=min; i<=max; i++) extracted += grid[sr][i];
        } else {
          const min = Math.min(sr, er);
          const max = Math.max(sr, er);
          for(let i=min; i<=max; i++) extracted += grid[i][sc];
        }
        
        const reversed = extracted.split("").reverse().join("");
        
        const matched = wordsToFind.find(w => !foundWords.includes(w) && (w === extracted || w === reversed));
        if (matched) {
          setFoundWords([...foundWords, matched]);
          toast.success("Found: " + matched);
          if (foundWords.length + 1 === wordsToFind.length) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            toast.success("Puzzle Completed!");
          }
        }
      }
      setSelection([]);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Word Search Puzzle Generator"
        description="Create and play custom word search puzzles."
        icon={Grid}
        actions={
          <ActionButton onClick={() => window.print()} icon={Printer} label="Print" />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Grid Size</Label>
                <Select value={gridSize.toString()} onValueChange={(val) => setGridSize(parseInt(val))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 x 10</SelectItem>
                    <SelectItem value="12">12 x 12</SelectItem>
                    <SelectItem value="15">15 x 15</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coding">Coding</SelectItem>
                    <SelectItem value="animals">Animals</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="planets">Planets</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="custom">Custom Words</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {category === "custom" && (
                <div className="space-y-2">
                  <Label>Custom Words (comma separated)</Label>
                  <Input value={customWords} onChange={(e) => setCustomWords(e.target.value)} placeholder="E.g. JAVASCRIPT, REACT, NEXTJS" />
                </div>
              )}
              <Button onClick={generateGrid} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Generate Puzzle
              </Button>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardHeader>
              <CardTitle>Words to Find</CardTitle>
              <CardDescription>Time: {formatTime(timer)}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {wordsToFind.map((w, i) => (
                  <li key={i} className={"font-mono " + (foundWords.includes(w) ? "line-through text-muted-foreground" : "")}>
                    {w}
                  </li>
                ))}
              </ul>
            </CardContent>
          </GlassCard>
        </div>
        
        <div className="md:col-span-2">
          <GlassCard>
            <CardHeader>
              <CardTitle>Puzzle Area</CardTitle>
              <CardDescription>Click a starting letter, then click the ending letter of a word.</CardDescription>
            </CardHeader>
            <CardContent>
              {grid.length > 0 ? (
                <div 
                  className="grid gap-1 justify-center mx-auto select-none"
                  style={{ gridTemplateColumns: "repeat(" + gridSize + ", minmax(0, 1fr))", maxWidth: "min(100%, " + (gridSize * 30) + "px)" }}
                >
                  {grid.map((row, r) => 
                    row.map((cell, c) => {
                      const idx = r * gridSize + c;
                      const isSelected = selection.includes(idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => handleCellClick(r, c)}
                          className={"aspect-square flex items-center justify-center font-bold border rounded cursor-pointer transition-colors " + (isSelected ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted")}
                        >
                          {cell}
                        </div>
                      );
                    })
                  )}
                </div>
              ) : (
                <div className="text-center p-12 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Click Generate Puzzle to start.</p>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
