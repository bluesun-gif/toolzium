"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Grid, Trophy, Lightbulb, RotateCcw, Pencil, CheckCircle2, XCircle } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

const EMPTY = 0;

function generateEmptyGrid(): number[][] {
  return Array.from({ length: 9 }, () => Array(9).fill(EMPTY));
}

function isValid(grid: number[][], row: number, col: number, num: number): boolean {
  for (let x = 0; x <= 8; x++) {
    if (grid[row][x] === num) return false;
  }
  for (let x = 0; x <= 8; x++) {
    if (grid[x][col] === num) return false;
  }
  let startRow = row - (row % 3);
  let startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
}

function solveSudoku(grid: number[][]): boolean {
  let row = -1;
  let col = -1;
  let isEmpty = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === EMPTY) {
        row = i;
        col = j;
        isEmpty = false;
        break;
      }
    }
    if (!isEmpty) break;
  }
  if (isEmpty) return true;
  
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
  for (let num of nums) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;
      if (solveSudoku(grid)) return true;
      grid[row][col] = EMPTY;
    }
  }
  return false;
}

function generatePuzzle(difficulty: Difficulty): { puzzle: number[][], solution: number[][] } {
  let grid = generateEmptyGrid();
  solveSudoku(grid);
  const solution = grid.map(row => [...row]);
  
  let cellsToRemove = 40;
  if (difficulty === "Easy") cellsToRemove = 30;
  else if (difficulty === "Medium") cellsToRemove = 40;
  else if (difficulty === "Hard") cellsToRemove = 50;
  else if (difficulty === "Expert") cellsToRemove = 60;
  
  let count = cellsToRemove;
  while (count !== 0) {
    let cellId = Math.floor(Math.random() * 81);
    let i = Math.floor(cellId / 9);
    let j = cellId % 9;
    if (grid[i][j] !== EMPTY) {
      grid[i][j] = EMPTY;
      count--;
    }
  }
  return { puzzle: grid, solution };
}

export function SudokuUnlimitedClient() {
  const [board, setBoard] = useState<number[][]>(generateEmptyGrid());
  const [solution, setSolution] = useState<number[][]>(generateEmptyGrid());
  const [initialBoard, setInitialBoard] = useState<number[][]>(generateEmptyGrid());
  const [notes, setNotes] = useState<Record<string, number[]>>({});
  
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [pencilMode, setPencilMode] = useState(false);
  const [errorCheck, setErrorCheck] = useState(true);
  
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const newGame = () => {
    const { puzzle, solution: sol } = generatePuzzle(difficulty);
    setBoard(puzzle.map(row => [...row]));
    setInitialBoard(puzzle.map(row => [...row]));
    setSolution(sol);
    setNotes({});
    setMistakes(0);
    setTime(0);
    setIsPlaying(true);
    setSelectedCell(null);
  };

  useEffect(() => {
    const saved = localStorage.getItem("sudoku-save");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBoard(parsed.board);
        setInitialBoard(parsed.initialBoard);
        setSolution(parsed.solution);
        setNotes(parsed.notes);
        setDifficulty(parsed.difficulty);
        setMistakes(parsed.mistakes);
        setTime(parsed.time);
        setIsPlaying(parsed.isPlaying);
      } catch (e) {
        newGame();
      }
    } else {
      newGame();
    }
  }, []);

  useEffect(() => {
    if (board[0] && isPlaying) {
      localStorage.setItem("sudoku-save", JSON.stringify({
        board, initialBoard, solution, notes, difficulty, mistakes, time, isPlaying
      }));
    }
  }, [board, initialBoard, solution, notes, difficulty, mistakes, time, isPlaying]);

  const handleCellClick = (r: number, c: number) => {
    if (initialBoard[r][c] !== EMPTY) return;
    setSelectedCell([r, c]);
  };

  const handleInput = useCallback((num: number) => {
    if (!selectedCell || !isPlaying) return;
    const [r, c] = selectedCell;
    if (initialBoard[r][c] !== EMPTY) return;

    if (pencilMode) {
      setNotes(prev => {
        const key = r + "-" + c;
        const current = prev[key] || [];
        if (current.includes(num)) {
          return { ...prev, [key]: current.filter(n => n !== num) };
        } else {
          return { ...prev, [key]: [...current, num] };
        }
      });
    } else {
      const newBoard = [...board.map(row => [...row])];
      newBoard[r][c] = num;
      
      if (errorCheck && num !== solution[r][c] && num !== EMPTY) {
        const newMistakes = mistakes + 1;
        setMistakes(newMistakes);
        toast.error("Mistake! " + newMistakes + "/3");
        if (newMistakes >= 3) {
          toast.error("Game Over! 3 mistakes made.");
          setIsPlaying(false);
        }
      }
      
      setBoard(newBoard);
      
      // Check win
      let isComplete = true;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (newBoard[i][j] !== solution[i][j]) {
            isComplete = false;
          }
        }
      }
      if (isComplete) {
        setIsPlaying(false);
        toast.success("Congratulations! You solved it!");
      }
    }
  }, [selectedCell, isPlaying, pencilMode, board, errorCheck, solution, mistakes, initialBoard]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "9") {
        handleInput(parseInt(e.key));
      } else if (e.key === "Backspace" || e.key === "Delete") {
        handleInput(EMPTY);
      } else if (selectedCell) {
        const [r, c] = selectedCell;
        if (e.key === "ArrowUp" && r > 0) setSelectedCell([r - 1, c]);
        if (e.key === "ArrowDown" && r < 8) setSelectedCell([r + 1, c]);
        if (e.key === "ArrowLeft" && c > 0) setSelectedCell([r, c - 1]);
        if (e.key === "ArrowRight" && c < 8) setSelectedCell([r, c + 1]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput, selectedCell]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return m + ":" + s;
  };

  const autoSolve = () => {
    setBoard(solution.map(r => [...r]));
    setIsPlaying(false);
    toast.success("Puzzle automatically solved.");
  };

  const provideHint = () => {
    if (!selectedCell) {
      toast("Select an empty cell first for a hint.");
      return;
    }
    const [r, c] = selectedCell;
    if (board[r][c] === solution[r][c]) {
      toast("Cell is already correct.");
      return;
    }
    const newBoard = [...board.map(row => [...row])];
    newBoard[r][c] = solution[r][c];
    setBoard(newBoard);
    toast.success("Hint applied.");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Grid}
        title="Sudoku Unlimited"
        description="Play, generate, and solve Sudoku puzzles."
        actions={
          <ActionButton
            onClick={newGame}
            icon={RotateCcw}
            label="New Game"
            variant="default"
          />
        }
      />

      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        <GlassCard>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Board</CardTitle>
                <CardDescription>Use keyboard or buttons to fill cells.</CardDescription>
              </div>
              <div className="text-right text-sm">
                <div className="font-mono text-xl">{formatTime(time)}</div>
                <div className={"font-semibold " + (mistakes >= 3 ? "text-destructive" : "text-muted-foreground")}>
                  Mistakes: {mistakes}/3
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="inline-grid grid-cols-9 border-4 border-primary rounded bg-background">
              {board.map((row, r) => (
                row.map((val, c) => {
                  const isInitial = initialBoard[r][c] !== EMPTY;
                  const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
                  const isError = errorCheck && val !== EMPTY && val !== solution[r][c];
                  const hasNotes = !val && notes[r + "-" + c]?.length > 0;
                  
                  let cellClass = "w-8 h-8 sm:w-12 sm:h-12 border flex items-center justify-center text-lg sm:text-2xl font-medium cursor-pointer transition-colors relative ";
                  cellClass += (c % 3 === 2 && c !== 8 ? "border-r-2 border-r-primary " : "border-r-border ");
                  cellClass += (r % 3 === 2 && r !== 8 ? "border-b-2 border-b-primary " : "border-b-border ");
                  
                  if (isSelected) {
                    cellClass += "bg-primary/20 ";
                  } else if (isInitial) {
                    cellClass += "bg-muted/50 ";
                  } else if (isError) {
                    cellClass += "bg-destructive/20 text-destructive ";
                  } else if (val !== EMPTY) {
                    cellClass += "text-primary ";
                  }

                  return (
                    <div
                      key={r + "-" + c}
                      onClick={() => handleCellClick(r, c)}
                      className={cellClass}
                    >
                      {val !== EMPTY ? val : null}
                      {hasNotes && !val && (
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-0.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                            <div key={n} className="flex items-center justify-center text-[8px] sm:text-[10px] text-muted-foreground leading-none">
                              {notes[r + "-" + c].includes(n) ? n : ""}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-5 gap-2 w-full max-w-sm">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <Button key={n} variant="outline" onClick={() => handleInput(n)}>
                  {n}
                </Button>
              ))}
              <Button variant="outline" onClick={() => handleInput(EMPTY)} className="text-destructive">
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={(v: Difficulty) => setDifficulty(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 cursor-pointer" onClick={() => setPencilMode(!pencilMode)}>
                  <Pencil className="w-4 h-4" /> Pencil Mode
                </Label>
                <Switch checked={pencilMode} onCheckedChange={setPencilMode} />
              </div>

              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 cursor-pointer" onClick={() => setErrorCheck(!errorCheck)}>
                  <CheckCircle2 className="w-4 h-4" /> Error Checking
                </Label>
                <Switch checked={errorCheck} onCheckedChange={setErrorCheck} />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={provideHint} disabled={!isPlaying}>
                  <Lightbulb className="w-4 h-4 mr-2" /> Get Hint
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={autoSolve} disabled={!isPlaying}>
                  <Trophy className="w-4 h-4 mr-2" /> Auto Solve
                </Button>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
