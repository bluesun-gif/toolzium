"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Grid, Play, Check, RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";

type Difficulty = "Easy" | "Medium" | "Hard";
type GridType = (number | null)[][];

// Helper functions for Sudoku
const emptyGrid = (): GridType => Array(9).fill(null).map(() => Array(9).fill(null));

const solveSudoku = (board: GridType): boolean => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, r, c, num)) {
            board[r][c] = num;
            if (solveSudoku(board)) return true;
            board[r][c] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const isValid = (board: GridType, row: number, col: number, num: number): boolean => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && i !== col) return false;
    if (board[i][col] === num && i !== row) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num && (startRow + i !== row || startCol + j !== col)) return false;
    }
  }
  return true;
};

const fillBox = (board: GridType, rowStart: number, colStart: number) => {
  let num;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      do {
        num = Math.floor(Math.random() * 9) + 1;
      } while (!isValidInBox(board, rowStart, colStart, num));
      board[rowStart + i][colStart + j] = num;
    }
  }
};

const isValidInBox = (board: GridType, rowStart: number, colStart: number, num: number) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[rowStart + i][colStart + j] === num) return false;
    }
  }
  return true;
};

const generatePuzzle = (difficulty: Difficulty): { puzzle: GridType; solution: GridType } => {
  const board = emptyGrid();
  
  // Fill diagonal 3x3 blocks
  for (let i = 0; i < 9; i += 3) {
    fillBox(board, i, i);
  }
  
  // Solve the rest
  solveSudoku(board);
  const solution = board.map(row => [...row]);
  
  // Remove numbers based on difficulty
  const puzzle = solution.map(row => [...row]);
  let toRemove = difficulty === "Easy" ? 40 : difficulty === "Medium" ? 50 : 60;
  
  while (toRemove > 0) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== null) {
      puzzle[r][c] = null;
      toRemove--;
    }
  }
  
  return { puzzle, solution };
};

export function SudokuClient() {
  const [grid, setGrid] = useState<GridType>(emptyGrid());
  const [initialGrid, setInitialGrid] = useState<GridType>(emptyGrid());
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer]);

  useEffect(() => {
     const savedGrid = localStorage.getItem("sudokuGrid");
     const savedInitial = localStorage.getItem("sudokuInitial");
     if (savedGrid && savedInitial) {
        try {
           setGrid(JSON.parse(savedGrid));
           setInitialGrid(JSON.parse(savedInitial));
        } catch (e) {}
     }
  }, []);

  useEffect(() => {
     localStorage.setItem("sudokuGrid", JSON.stringify(grid));
     localStorage.setItem("sudokuInitial", JSON.stringify(initialGrid));
  }, [grid, initialGrid]);

  const startNewGame = () => {
    const { puzzle } = generatePuzzle(difficulty);
    setGrid(puzzle);
    setInitialGrid(puzzle.map(row => [...row]));
    setTimer(0);
    setMistakes(0);
    setIsActive(true);
    setSelectedCell(null);
  };

  const handleCellClick = (r: number, c: number) => {
    setSelectedCell([r, c]);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (initialGrid[r][c] !== null) return; // Cannot edit initial numbers

    const newGrid = [...grid];
    newGrid[r] = [...newGrid[r]];
    newGrid[r][c] = num;
    setGrid(newGrid);

    if (!isValid(newGrid, r, c, num)) {
      setMistakes(m => m + 1);
    }
  };

  const solveGame = () => {
    const board = grid.map(row => [...row]);
    if (solveSudoku(board)) {
      setGrid(board);
      setIsActive(false);
      toast.success("Puzzle solved!");
    } else {
      toast.error("No solution exists for current state!");
    }
  };

  const resetGame = () => {
    setGrid(initialGrid.map(row => [...row]));
    setMistakes(0);
  };

  const isCellInvalid = (r: number, c: number) => {
    const val = grid[r][c];
    if (val === null) return false;
    const tempGrid = grid.map(row => [...row]);
    tempGrid[r][c] = null;
    return !isValid(tempGrid, r, c, val);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Grid}
        title="Sudoku Puzzle & Solver"
        description="Play Sudoku or let the solver complete it for you."
        actions={
          <>
            <ActionButton onClick={solveGame} icon={Check} label="Solve Puzzle" />
            <ResetButton onClick={resetGame} label="Reset Board" />
          </>
        }
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Game Settings</CardTitle>
          <CardDescription>Select difficulty and start playing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={difficulty} onValueChange={(val: Difficulty) => setDifficulty(val)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ActionButton onClick={startNewGame} icon={Play} label="New Game" variant="default" />
          </div>
          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <div>Timer: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</div>
            <div>Mistakes: {mistakes}</div>
          </div>
        </CardContent>
      </GlassCard>

      <GlassCard>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6">
            <div className="grid grid-cols-9 gap-0 border-2 border-foreground w-fit">
              {grid.map((row, r) => (
                row.map((cell, c) => {
                  const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
                  const isInitial = initialGrid[r][c] !== null;
                  const isInvalid = isCellInvalid(r, c);
                  const isHighlighted = selectedCell && (selectedCell[0] === r || selectedCell[1] === c || (Math.floor(selectedCell[0] / 3) === Math.floor(r / 3) && Math.floor(selectedCell[1] / 3) === Math.floor(c / 3)));
                  
                  let cellClasses = "w-10 h-10 flex items-center justify-center text-lg cursor-pointer border border-border/50 select-none ";
                  if (c % 3 === 2 && c !== 8) cellClasses += "border-r-2 border-r-foreground ";
                  if (r % 3 === 2 && r !== 8) cellClasses += "border-b-2 border-b-foreground ";
                  
                  if (isSelected) cellClasses += "bg-primary/20 ";
                  else if (isHighlighted) cellClasses += "bg-muted ";
                  else cellClasses += "bg-background ";

                  if (isInvalid) cellClasses += "text-destructive font-bold ";
                  else if (isInitial) cellClasses += "font-bold text-foreground ";
                  else cellClasses += "text-primary ";

                  return (
                    <div
                      key={r + "-" + c}
                      className={cellClasses}
                      onClick={() => handleCellClick(r, c)}
                    >
                      {cell}
                    </div>
                  );
                })
              ))}
            </div>

            <div className="grid grid-cols-5 gap-2 sm:grid-cols-9">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  className="w-12 h-12 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center justify-center text-xl font-bold transition-colors"
                  onClick={() => handleNumberInput(num)}
                >
                  {num}
                </button>
              ))}
              <button
                className="w-12 h-12 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center justify-center transition-colors col-span-5 sm:col-span-9 mt-2"
                onClick={() => {
                  if (selectedCell) {
                     const [r, c] = selectedCell;
                     if (initialGrid[r][c] === null) {
                        const newGrid = [...grid];
                        newGrid[r] = [...newGrid[r]];
                        newGrid[r][c] = null;
                        setGrid(newGrid);
                     }
                  }
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
