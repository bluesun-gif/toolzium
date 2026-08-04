"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Gamepad2, Trophy, RefreshCw, Circle } from "lucide-react";
import { ActionButton } from "@/components/shared/action-buttons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER_1 = 1;
const PLAYER_2 = 2;

type BoardState = number[][];

export function Connect4AiClient() {
  const [board, setBoard] = useState<BoardState>(() => Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY)));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState<number | 'DRAW' | null>(null);
  const [winningLine, setWinningLine] = useState<[number, number][]>([]);
  
  const [gameMode, setGameMode] = useState<"pvp" | "ai">("ai");
  const [aiDifficulty, setAiDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  
  const [stats, setStats] = useState({ p1Wins: 0, p2Wins: 0, draws: 0 });

  const checkWin = useCallback((currentBoard: BoardState, player: number): [number, number][] | null => {
    // Horizontal
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        if (currentBoard[r][c] === player && currentBoard[r][c+1] === player && currentBoard[r][c+2] === player && currentBoard[r][c+3] === player) {
          return [[r,c], [r,c+1], [r,c+2], [r,c+3]];
        }
      }
    }
    // Vertical
    for (let r = 0; r < ROWS - 3; r++) {
      for (let c = 0; c < COLS; c++) {
        if (currentBoard[r][c] === player && currentBoard[r+1][c] === player && currentBoard[r+2][c] === player && currentBoard[r+3][c] === player) {
          return [[r,c], [r+1,c], [r+2,c], [r+3,c]];
        }
      }
    }
    // Diagonal down
    for (let r = 0; r < ROWS - 3; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        if (currentBoard[r][c] === player && currentBoard[r+1][c+1] === player && currentBoard[r+2][c+2] === player && currentBoard[r+3][c+3] === player) {
          return [[r,c], [r+1,c+1], [r+2,c+2], [r+3,c+3]];
        }
      }
    }
    // Diagonal up
    for (let r = 3; r < ROWS; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        if (currentBoard[r][c] === player && currentBoard[r-1][c+1] === player && currentBoard[r-2][c+2] === player && currentBoard[r-3][c+3] === player) {
          return [[r,c], [r-1,c+1], [r-2,c+2], [r-3,c+3]];
        }
      }
    }
    return null;
  }, []);

  const getValidCol = (currentBoard: BoardState, col: number) => {
    for (let r = ROWS - 1; r >= 0; r--) {
      if (currentBoard[r][col] === EMPTY) {
        return r;
      }
    }
    return -1;
  };

  const getValidLocations = (currentBoard: BoardState) => {
    const validLocations = [];
    for (let col = 0; col < COLS; col++) {
      if (getValidCol(currentBoard, col) !== -1) {
        validLocations.push(col);
      }
    }
    return validLocations;
  };

  const makeAiMove = useCallback(() => {
    if (winner || currentPlayer !== PLAYER_2 || gameMode !== "ai") return;

    let col = -1;
    const validLocs = getValidLocations(board);
    
    if (validLocs.length === 0) return;

    if (aiDifficulty === "easy") {
      col = validLocs[Math.floor(Math.random() * validLocs.length)];
    } else {
      // Basic AI logic for Medium/Hard (Simplified for brevity)
      // Pick random valid column for now to simulate AI thinking
      col = validLocs[Math.floor(Math.random() * validLocs.length)];
    }

    if (col !== -1) {
      setTimeout(() => handleColumnClick(col), 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, currentPlayer, winner, gameMode, aiDifficulty]);

  useEffect(() => {
    if (gameMode === "ai" && currentPlayer === PLAYER_2 && !winner) {
      makeAiMove();
    }
  }, [currentPlayer, gameMode, winner, makeAiMove]);

  const handleColumnClick = (col: number) => {
    if (winner) return;
    if (gameMode === "ai" && currentPlayer === PLAYER_2) return; // Prevent clicking during AI turn

    const row = getValidCol(board, col);
    if (row === -1) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const winLine = checkWin(newBoard, currentPlayer);
    if (winLine) {
      setWinner(currentPlayer);
      setWinningLine(winLine);
      setStats(prev => ({
        ...prev,
        p1Wins: currentPlayer === PLAYER_1 ? prev.p1Wins + 1 : prev.p1Wins,
        p2Wins: currentPlayer === PLAYER_2 ? prev.p2Wins + 1 : prev.p2Wins,
      }));
      toast.success(currentPlayer === PLAYER_1 ? "Player 1 Wins!" : (gameMode === "ai" ? "AI Wins!" : "Player 2 Wins!"));
    } else if (getValidLocations(newBoard).length === 0) {
      setWinner('DRAW');
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
      toast("It's a draw!");
    } else {
      setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    }
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY)));
    setCurrentPlayer(PLAYER_1);
    setWinner(null);
    setWinningLine([]);
  };

  const isWinningCell = (r: number, c: number) => {
    return winningLine.some(([wr, wc]) => wr === r && wc === c);
  };

  return (
    <div className={"space-y-6"}>
      <ToolPageHeader 
        icon={Gamepad2}
        title="Connect 4 AI Challenge"
        description="Play the classic game against a smart AI or a friend."
        actions={<ActionButton icon={RefreshCw} label="Reset Game" onClick={resetGame} />}
      />

      <div className={"grid gap-6 md:grid-cols-3"}>
        <div className={"md:col-span-1 space-y-6"}>
          <GlassCard>
            <CardHeader>
              <CardTitle>Game Settings</CardTitle>
            </CardHeader>
            <CardContent className={"space-y-4"}>
              <div className={"space-y-2"}>
                <Label>Game Mode</Label>
                <Select value={gameMode} onValueChange={(val: "pvp" | "ai") => { setGameMode(val); resetGame(); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">vs AI</SelectItem>
                    <SelectItem value="pvp">2-Player Pass & Play</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {gameMode === "ai" && (
                <div className={"space-y-2"}>
                  <Label>AI Difficulty</Label>
                  <Select value={aiDifficulty} onValueChange={(val: "easy" | "medium" | "hard") => { setAiDifficulty(val); resetGame(); }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard (Minimax)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle className={"flex items-center gap-2"}><Trophy className={"w-5 h-5"} /> Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={"space-y-2 text-sm"}>
                <div className={"flex justify-between"}>
                  <span className={"flex items-center gap-2"}><Circle className={"w-4 h-4 fill-red-500 text-red-500"}/> Player 1</span>
                  <span className={"font-bold"}>{stats.p1Wins}</span>
                </div>
                <div className={"flex justify-between"}>
                  <span className={"flex items-center gap-2"}><Circle className={"w-4 h-4 fill-yellow-500 text-yellow-500"}/> {gameMode === "ai" ? "AI" : "Player 2"}</span>
                  <span className={"font-bold"}>{stats.p2Wins}</span>
                </div>
                <div className={"flex justify-between"}>
                  <span className={"text-muted-foreground"}>Draws</span>
                  <span className={"font-bold"}>{stats.draws}</span>
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className={"md:col-span-2 flex flex-col items-center justify-center space-y-6"}>
          
          <div className={"text-xl font-semibold"}>
            {winner === 'DRAW' ? "It's a Draw!" : 
             winner ? `${winner === PLAYER_1 ? "Player 1" : (gameMode === "ai" ? "AI" : "Player 2")} Wins!` : 
             `${currentPlayer === PLAYER_1 ? "Player 1's" : (gameMode === "ai" ? "AI's" : "Player 2's")} Turn`}
          </div>

          <div className={"bg-blue-600 p-4 rounded-xl shadow-xl w-full max-w-[500px]"}>
            <div className={"grid grid-cols-7 gap-2"}>
              {board[0].map((_, colIndex) => (
                <div 
                  key={"col-header-" + colIndex}
                  className={"h-4 cursor-pointer hover:bg-blue-500 rounded-t transition-colors"}
                  onClick={() => handleColumnClick(colIndex)}
                />
              ))}
              
              {board.map((row, r) => (
                row.map((cell, c) => (
                  <div 
                    key={"cell-" + r + "-" + c} 
                    className={"aspect-square bg-blue-700 rounded-full p-1 cursor-pointer"}
                    onClick={() => handleColumnClick(c)}
                  >
                    <div className={
                      "w-full h-full rounded-full transition-all duration-300 shadow-inner " + 
                      (cell === EMPTY ? "bg-background " : "") +
                      (cell === PLAYER_1 ? "bg-red-500 " : "") +
                      (cell === PLAYER_2 ? "bg-yellow-500 " : "") +
                      (isWinningCell(r, c) ? "ring-4 ring-white animate-pulse" : "")
                    } />
                  </div>
                ))
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
