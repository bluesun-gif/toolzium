"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { Gamepad2, Trophy } from "lucide-react";
import { toast } from "react-hot-toast";

type Player = "X" | "O" | null;
type Difficulty = "easy" | "medium" | "hard";
type Mode = "ai" | "pvp";

export function TictactoeAiClient() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [mode, setMode] = useState<Mode>("ai");
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");
  const [stats, setStats] = useState({ xWins: 0, oWins: 0, draws: 0 });
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const getAvailableMoves = (squares: Player[]) => {
    return squares.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
  };

  const minimax = (squares: Player[], depth: number, isMaximizing: boolean): number => {
    const result = calculateWinner(squares);
    if (result) {
      return result.winner === "O" ? 10 - depth : depth - 10;
    }
    if (getAvailableMoves(squares).length === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = "O";
          let score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = "X";
          let score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (squares: Player[]) => {
    let bestScore = -Infinity;
    let move = -1;
    const available = getAvailableMoves(squares);
    
    if (available.length === 0) return -1;
    
    if (difficulty === "easy") {
      return available[Math.floor(Math.random() * available.length)];
    }
    
    if (difficulty === "medium" && Math.random() > 0.6) {
      return available[Math.floor(Math.random() * available.length)];
    }

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = "O";
        let score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const handleAiMove = () => {
    if (calculateWinner(board) || getAvailableMoves(board).length === 0) return;
    
    const newBoard = [...board];
    const bestMove = getBestMove(newBoard);
    if (bestMove !== -1) {
      newBoard[bestMove] = "O";
      setBoard(newBoard);
      setIsXNext(true);
      checkGameEnd(newBoard);
    }
  };

  useEffect(() => {
    if (mode === "ai" && !isXNext && !calculateWinner(board)) {
      const timer = setTimeout(() => {
        handleAiMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, mode, board]);

  const checkGameEnd = (squares: Player[]) => {
    const result = calculateWinner(squares);
    if (result) {
      setWinningLine(result.line);
      if (result.winner === "X") setStats(s => ({ ...s, xWins: s.xWins + 1 }));
      else if (result.winner === "O") setStats(s => ({ ...s, oWins: s.oWins + 1 }));
      toast.success(result.winner + " Wins!");
    } else if (getAvailableMoves(squares).length === 0) {
      setStats(s => ({ ...s, draws: s.draws + 1 }));
      toast("It's a draw!", { icon: "🤝" });
    }
  };

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;
    if (mode === "ai" && !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkGameEnd(newBoard);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
  };

  return (
    <div className={"space-y-6"}>
      <ToolPageHeader
        title="Tic-Tac-Toe AI Unbeatable Challenge"
        description="Play Tic-Tac-Toe against an Unbeatable Minimax AI or a friend."
        icon={Gamepad2}
        actions={
          <ResetButton onClick={resetGame} label="Restart Game" />
        }
      />

      <div className={"grid grid-cols-1 md:grid-cols-3 gap-6"}>
        <div className={"md:col-span-1 space-y-6"}>
          <GlassCard>
            <CardHeader>
              <CardTitle>Game Settings</CardTitle>
            </CardHeader>
            <CardContent className={"space-y-4"}>
              <div className={"space-y-2"}>
                <Label>Game Mode</Label>
                <Select value={mode} onValueChange={(val: Mode) => { setMode(val); resetGame(); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">Vs AI (You are X)</SelectItem>
                    <SelectItem value="pvp">2-Player Pass & Play</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {mode === "ai" && (
                <div className={"space-y-2"}>
                  <Label>AI Difficulty</Label>
                  <Select value={difficulty} onValueChange={(val: Difficulty) => { setDifficulty(val); resetGame(); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy (Random)</SelectItem>
                      <SelectItem value="medium">Medium (Smart)</SelectItem>
                      <SelectItem value="hard">Unbeatable (Minimax)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={"space-y-2"}>
                <div className={"flex justify-between items-center p-2 bg-secondary/20 rounded-md"}>
                  <span className={"font-semibold text-primary"}>Player X Wins</span>
                  <span className={"font-bold"}>{stats.xWins}</span>
                </div>
                <div className={"flex justify-between items-center p-2 bg-secondary/20 rounded-md"}>
                  <span className={"font-semibold text-destructive"}>Player O {mode === "ai" ? "(AI) " : ""}Wins</span>
                  <span className={"font-bold"}>{stats.oWins}</span>
                </div>
                <div className={"flex justify-between items-center p-2 bg-secondary/20 rounded-md"}>
                  <span className={"font-semibold text-muted-foreground"}>Draws</span>
                  <span className={"font-bold"}>{stats.draws}</span>
                </div>
                <Button variant="outline" size="sm" className={"w-full mt-2"} onClick={() => setStats({ xWins: 0, oWins: 0, draws: 0 })}>
                  Reset Stats
                </Button>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className={"md:col-span-2 flex justify-center items-center"}>
          <GlassCard className={"p-6 sm:p-12 w-full max-w-md flex flex-col items-center"}>
            <div className={"mb-6 text-xl font-bold"}>
              {calculateWinner(board) ? (
                <span className={"text-green-500 flex items-center gap-2"}><Trophy className={"w-5 h-5"} /> {calculateWinner(board)?.winner} Wins!</span>
              ) : getAvailableMoves(board).length === 0 ? (
                <span className={"text-muted-foreground"}>Draw!</span>
              ) : (
                <span>Current Turn: <span className={isXNext ? "text-primary" : "text-destructive"}>{isXNext ? "X" : "O"}</span></span>
              )}
            </div>
            
            <div className={"grid grid-cols-3 gap-2 sm:gap-4 w-full aspect-square"}>
              {board.map((cell, index) => {
                const isWinningSquare = winningLine?.includes(index);
                return (
                  <Button
                    key={index}
                    variant={isWinningSquare ? "default" : "outline"}
                    className={
                      "h-full w-full text-4xl sm:text-6xl font-bold transition-all duration-200 " + 
                      (cell === "X" ? "text-primary" : cell === "O" ? "text-destructive" : "") +
                      (isWinningSquare ? " bg-green-500/20 text-green-500 border-green-500" : "")
                    }
                    onClick={() => handleClick(index)}
                    disabled={cell !== null || calculateWinner(board) !== null || (mode === "ai" && !isXNext)}
                  >
                    {cell}
                  </Button>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
