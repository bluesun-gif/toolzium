"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { Gamepad2, Trophy, RotateCcw, Cpu } from "lucide-react";
import toast from "react-hot-toast";

type Player = "X" | "O" | null;
type Mode = "pvp" | "ai";
type Difficulty = "easy" | "medium" | "unbeatable";

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export function TicTacToeClient() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [mode, setMode] = useState<Mode>("ai");
  const [difficulty, setDifficulty] = useState<Difficulty>("unbeatable");
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0, streak: 0 });
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("tictactoe_scores");
    if (saved) {
      try {
        setScores(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveScores = (newScores: any) => {
    setScores(newScores);
    localStorage.setItem("tictactoe_scores", JSON.stringify(newScores));
  };

  const playSound = (freq: number, type: OscillatorType = "sine", duration: number = 0.1) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // ignore
    }
  };

  const checkWinner = (squares: Player[]) => {
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const [a, b, c] = WINNING_COMBOS[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: WINNING_COMBOS[i] };
      }
    }
    if (!squares.includes(null)) return { winner: "Draw", line: null };
    return null;
  };

  const minimax = (squares: Player[], depth: number, isMaximizing: boolean): number => {
    const result = checkWinner(squares);
    if (result) {
      if (result.winner === "O") return 10 - depth;
      if (result.winner === "X") return depth - 10;
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
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
      for (let i = 0; i < 9; i++) {
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
    for (let i = 0; i < 9; i++) {
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

  const getRandomMove = (squares: Player[]) => {
    const empty = squares.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];
    if (empty.length === 0) return -1;
    return empty[Math.floor(Math.random() * empty.length)];
  };

  const makeAIMove = useCallback(() => {
    if (winningLine || !board.includes(null)) return;
    
    setTimeout(() => {
      let move = -1;
      if (difficulty === "easy") {
        move = getRandomMove(board);
      } else if (difficulty === "medium") {
        move = Math.random() > 0.5 ? getBestMove([...board]) : getRandomMove(board);
      } else {
        move = getBestMove([...board]);
      }
      
      if (move !== -1) {
        handleMove(move, "O");
      }
    }, 500);
  }, [board, difficulty, winningLine]);

  useEffect(() => {
    if (mode === "ai" && !isXNext && !winningLine && board.includes(null)) {
      makeAIMove();
    }
  }, [isXNext, mode, winningLine, board, makeAIMove]);

  const handleMove = (index: number, playerOverride?: Player) => {
    if (board[index] || winningLine) return;
    
    const currentPlayer = playerOverride || (isXNext ? "X" : "O");
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    playSound(currentPlayer === "X" ? 440 : 550, "square", 0.05);

    const result = checkWinner(newBoard);
    if (result) {
      setWinningLine(result.line);
      if (result.winner === "Draw") {
        saveScores({ ...scores, Draws: scores.Draws + 1, streak: 0 });
        toast("It's a draw!");
        playSound(300, "sawtooth", 0.5);
      } else {
        const isX = result.winner === "X";
        const newStreak = isX ? scores.streak + 1 : 0;
        saveScores({ ...scores, [result.winner]: scores[result.winner as "X" | "O"] + 1, streak: newStreak });
        toast.success(result.winner + " Wins!");
        playSound(isX ? 880 : 220, "sine", 0.5);
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
  };

  const resetScores = () => {
    saveScores({ X: 0, O: 0, Draws: 0, streak: 0 });
    toast.success("Scores reset");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Gamepad2} 
        title="Tic Tac Toe with AI" 
        description="Play classic Tic Tac Toe against a friend or challenge our Minimax AI."
        actions={
          <ResetButton onClick={resetGame} label="Play Again" />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle>Game Board</CardTitle>
            <CardDescription>
              {winningLine ? "Game Over" : "Current Turn: " + (isXNext ? "X" : "O")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="grid grid-cols-3 gap-2 w-full max-w-[400px] aspect-square p-4 bg-muted/30 rounded-xl">
              {board.map((cell, index) => {
                const isWinningCell = winningLine?.includes(index);
                return (
                  <button
                    key={index}
                    onClick={() => handleMove(index)}
                    disabled={!!cell || !!winningLine || (mode === "ai" && !isXNext)}
                    className={
                      "w-full h-full text-4xl sm:text-6xl font-bold flex items-center justify-center rounded-lg transition-colors " +
                      (cell ? "bg-background shadow-sm " : "bg-background/50 hover:bg-background/80 ") +
                      (isWinningCell ? "bg-primary text-primary-foreground animate-pulse " : "") +
                      (cell === "X" && !isWinningCell ? "text-blue-500 " : "") +
                      (cell === "O" && !isWinningCell ? "text-red-500 " : "")
                    }
                  >
                    {cell}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Cpu className="w-5 h-5" /> Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Game Mode</Label>
                <Select value={mode} onValueChange={(v: Mode) => { setMode(v); resetGame(); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">1 Player (vs AI)</SelectItem>
                    <SelectItem value="pvp">2 Players (Local)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {mode === "ai" && (
                <div className="space-y-2">
                  <Label>AI Difficulty</Label>
                  <Select value={difficulty} onValueChange={(v: Difficulty) => { setDifficulty(v); resetGame(); }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="unbeatable">Unbeatable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5" /> Scoreboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <div className="text-sm text-muted-foreground font-semibold">Player X</div>
                  <div className="text-2xl font-bold text-blue-500">{scores.X}</div>
                </div>
                <div className="p-2 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground font-semibold">Draws</div>
                  <div className="text-2xl font-bold">{scores.Draws}</div>
                </div>
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <div className="text-sm text-muted-foreground font-semibold">Player O</div>
                  <div className="text-2xl font-bold text-red-500">{scores.O}</div>
                </div>
              </div>
              
              <div className="text-center text-sm text-muted-foreground mb-4">
                Win Streak (X): <span className="font-bold text-foreground">{scores.streak}</span>
              </div>
              
              <Button variant="outline" size="sm" className="w-full" onClick={resetScores}>
                <RotateCcw className="w-4 h-4 mr-2" /> Reset Scores
              </Button>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
