"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Grid3x3, RotateCcw, Trophy, History, Cpu, User } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type Difficulty = 'easy' | 'medium' | 'hard';
type Symbol = 'X' | 'O';

const winPatterns = [
 [0,1,2], [3,4,5], [6,7,8],
 [0,3,6], [1,4,7], [2,5,8],
 [0,4,8], [2,4,6]
];

export function TictactoeAiClient() {
 const [board, setBoard] = useState<string[]>(Array(9).fill(""));
 const [isPlayerTurn, setIsPlayerTurn] = useState(true);
 const [playerSymbol, setPlayerSymbol] = useState<Symbol>('X');
 const [difficulty, setDifficulty] = useState<Difficulty>('hard');
 const [gameOver, setGameOver] = useState(false);
 const [winningLine, setWinningLine] = useState<number[]>([]);
 const [score, setScore] = useState({ player: 0, ai: 0, draw: 0 });
 const [history, setHistory] = useState<string[]>([]);
 const [isAiThinking, setIsAiThinking] = useState(false);

 const aiSymbol = playerSymbol === 'X' ? 'O' : 'X';

 const checkWinner = (b: string[]): { winner: string | null; line: number[] } => {
 for (const p of winPatterns) {
 if (b[p[0]] && b[p[0]] === b[p[1]] && b[p[1]] === b[p[2]]) {
 return { winner: b[p[0]], line: p };
 }
 }
 return { winner: b.includes("") ? null :"draw", line: [] };
 };

 const minimax = (b: string[], isMax: boolean): number => {
 const { winner } = checkWinner(b);
 if (winner === aiSymbol) return 10;
 if (winner === playerSymbol) return -10;
 if (winner ==="draw") return 0;

 let best = isMax ? -Infinity : Infinity;
 for (let i = 0; i < 9; i++) {
 if (b[i] ==="") {
 b[i] = isMax ? aiSymbol : playerSymbol;
 const score = minimax(b, !isMax);
 b[i] ="";
 best = isMax ? Math.max(best, score) : Math.min(best, score);
 }
 }
 return best;
 };

 const getBestMove = (b: string[]): number => {
 let bestScore = -Infinity;
 let move = -1;
 for (let i = 0; i < 9; i++) {
 if (b[i] ==="") {
 b[i] = aiSymbol;
 const score = minimax(b, false);
 b[i] ="";
 if (score > bestScore) {
 bestScore = score;
 move = i;
 }
 }
 }
 return move;
 };

 const getMediumMove = (b: string[]): number => {
 for (let i = 0; i < 9; i++) {
 if (b[i] ==="") {
 b[i] = aiSymbol;
 if (checkWinner(b).winner === aiSymbol) { b[i] =""; return i; }
 b[i] ="";
 }
 }
 for (let i = 0; i < 9; i++) {
 if (b[i] ==="") {
 b[i] = playerSymbol;
 if (checkWinner(b).winner === playerSymbol) { b[i] =""; return i; }
 b[i] ="";
 }
 }
 const empty = b.map((v, i) => v ===""? i : -1).filter((v) => v !== -1);
 return empty[Math.floor(Math.random() * empty.length)];
 };

 const getEasyMove = (b: string[]): number => {
 const empty = b.map((v, i) => v ===""? i : -1).filter((v) => v !== -1);
 return empty[Math.floor(Math.random() * empty.length)];
 };

 const makeAiMove = useCallback((b: string[]) => {
 setIsAiThinking(true);
 setTimeout(() => {
 let move = -1;
 if (difficulty === 'easy') move = getEasyMove(b);
 else if (difficulty === 'medium') move = getMediumMove(b);
 else move = getBestMove(b);

 if (move !== -1) {
 const newBoard = [...b];
 newBoard[move] = aiSymbol;
 setBoard(newBoard);
 
 const { winner, line } = checkWinner(newBoard);
 if (winner) {
 setGameOver(true);
 setWinningLine(line);
 if (winner === aiSymbol) {
 setScore((s) => ({ ...s, ai: s.ai + 1 }));
 setHistory((h) => [`AI Win (${difficulty})`, ...h.slice(0, 4)]);
 toast.error("AI Wins!");
 } else if (winner ==="draw") {
 setScore((s) => ({ ...s, draw: s.draw + 1 }));
 setHistory((h) => ["Draw", ...h.slice(0, 4)]);
 toast("Draw!", { icon:"🤝"});
 }
 } else {
 setIsPlayerTurn(true);
 }
 }
 setIsAiThinking(false);
 }, 600);
 }, [difficulty, aiSymbol, playerSymbol]);

 useEffect(() => {
 if (!isPlayerTurn && !gameOver) {
 makeAiMove(board);
 }
 }, [isPlayerTurn, gameOver, makeAiMove, board]);

 useEffect(() => {
 if (playerSymbol === 'O' && board.every(c => c ==="") && !gameOver) {
 setIsPlayerTurn(false);
 }
 }, [playerSymbol]);

 const handleCellClick = (idx: number) => {
 if (board[idx] || !isPlayerTurn || gameOver || isAiThinking) return;
 const newBoard = [...board];
 newBoard[idx] = playerSymbol;
 setBoard(newBoard);
 
 const { winner, line } = checkWinner(newBoard);
 if (winner) {
 setGameOver(true);
 setWinningLine(line);
 if (winner === playerSymbol) {
 setScore((s) => ({ ...s, player: s.player + 1 }));
 setHistory((h) => [`Player Win (${difficulty})`, ...h.slice(0, 4)]);
 toast.success("You Win!");
 } else if (winner ==="draw") {
 setScore((s) => ({ ...s, draw: s.draw + 1 }));
 setHistory((h) => ["Draw", ...h.slice(0, 4)]);
 toast("Draw!", { icon:"🤝"});
 }
 } else {
 setIsPlayerTurn(false);
 }
 };

 const resetGame = () => {
 setBoard(Array(9).fill(""));
 setGameOver(false);
 setWinningLine([]);
 setIsPlayerTurn(playerSymbol === 'X');
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader
 icon={Grid3x3}
 title="Tic-Tac-Toe AI"
 description="Challenge an unbeatable Minimax AI or test your tactics against randomized and medium-difficulty bots."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Grid3x3 className="w-4 h-4"/> Tic-Tac-Toe AI
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="flex flex-wrap gap-3 items-center justify-between">
 <div className="flex gap-2">
 {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
 <Button key={d} variant={difficulty === d ?"default":"outline"} size="sm"onClick={() => { setDifficulty(d); resetGame(); }}>
 {d.charAt(0).toUpperCase() + d.slice(1)}
 </Button>
 ))}
 </div>
 <div className="flex gap-2">
 <Button variant={playerSymbol === 'X' ?"default":"outline"} size="sm"onClick={() => { setPlayerSymbol('X'); resetGame(); }}>
 Play X
 </Button>
 <Button variant={playerSymbol === 'O' ?"default":"outline"} size="sm"onClick={() => { setPlayerSymbol('O'); resetGame(); }}>
 Play O
 </Button>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-4 text-center max-w-xs mx-auto">
 <div className="p-2 bg-muted/30 rounded-lg">
 <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground"><User className="w-3 h-3"/> You</div>
 <div className="text-2xl font-bold text-primary">{score.player}</div>
 </div>
 <div className="p-2 bg-muted/30 rounded-lg">
 <div className="text-xs text-muted-foreground">Draws</div>
 <div className="text-2xl font-bold">{score.draw}</div>
 </div>
 <div className="p-2 bg-muted/30 rounded-lg">
 <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground"><Cpu className="w-3 h-3"/> AI</div>
 <div className="text-2xl font-bold text-red-500">{score.ai}</div>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto aspect-square">
 {board.map((cell, idx) => (
 <button
 key={idx}
 onClick={() => handleCellClick(idx)}
 className={`aspect-square rounded-xl bg-muted/50 flex items-center justify-center text-4xl font-bold transition-all border border-border/50
 ${cell === 'X' ? 'text-primary' : cell === 'O' ? 'text-red-500' : 'text-transparent'}
 ${winningLine.includes(idx) ? 'bg-green-500/20 ring-2 ring-green-500' : 'hover:bg-muted'}
 `}
 disabled={!!cell || gameOver || isAiThinking || !isPlayerTurn}
 >
 {cell}
 </button>
 ))}
 </div>

 {isAiThinking && (
 <p className="text-center text-sm text-muted-foreground animate-pulse">AI is calculating optimal move...</p>
 )}

 <div className="flex justify-center">
 <Button variant="outline"onClick={resetGame} className="gap-2">
 <RotateCcw className="w-4 h-4"/> New Game
 </Button>
 </div>

 {history.length > 0 && (
 <div className="space-y-2 pt-4 border-t border-border/50">
 <h3 className="text-sm font-semibold flex items-center gap-2"><History className="w-4 h-4"/> Recent Matches</h3>
 <ul className="text-xs text-muted-foreground space-y-1">
 {history.map((h, i) => <li key={i}>• {h}</li>)}
 </ul>
 </div>
 )}
 </CardContent>
 </Card>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Select Difficulty", description:"Choose between Easy (random), Medium (tactical), or Hard (perfect Minimax AI).", icon: Cpu },
 { step:"02", title:"Make Your Move", description:"Tap any empty cell to place your symbol. X always goes first.", icon: Grid3x3 },
 { step:"03", title:"Outsmart the Bot", description:"Analyze the board, block threats, and aim for a draw against the unbeatable Hard AI.", icon: Trophy }
 ]}
 badges={["100% Free","Client-Side Privacy","No Signup"]}
 />

 <ToolFeatureGuides features={[
 { icon: Cpu, title:"Minimax Algorithm", description:"Hard mode uses exhaustive game-tree search to guarantee mathematically perfect play."},
 { icon: User, title:"Symbol Selection", description:"Choose to play as X (first mover advantage) or O (defensive counter-play)."},
 { icon: Trophy, title:"Score Tracking", description:"Persistent session scoring tracks your wins, losses, and draws across all difficulty tiers."},
 { icon: History, title:"Match History", description:"Review your recent tactical outcomes to identify patterns and improve your strategy."}
 ]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>Mastering Game Theory & Minimax</h3>
 <p>Tic-Tac-Toe AI elevates the childhood classic into a sophisticated laboratory for strategic thinking and algorithmic game theory. While the standard 3x3 grid is often dismissed as a solved game resulting in inevitable draws between perfect players, our platform introduces new artificial intelligence difficulty tiers that transform this simple framework into a dynamic training ground for decision-making. Whether you are facing our 'Easy' bot that makes randomized moves, the 'Medium' bot that actively blocks and seeks winning lines, or the 'Hard' bot powered by the legendary Minimax algorithm, every match offers a unique psychological and logical challenge.</p>
 <p>The Minimax algorithm, a cornerstone of artificial intelligence and game theory, simulates every possible future board state to determine the mathematically optimal move. Playing against our unbeatable Hard AI is a masterclass in defensive strategy and spatial awareness; it forces you to recognize the futility of flawed attacks and teaches the importance of controlling the center and setting up multi-threat forks. The beautifully animated interface provides immediate visual feedback, highlighting winning lines and tracking your historical performance across multiple sessions. This persistent score tracker and game history log allow you to monitor your strategic evolution and identify recurring tactical blind spots.</p>
 <p>Beyond casual entertainment, this tool serves as an exceptional educational resource for computer science students and aspiring developers studying recursive algorithms, state-space search, and zero-sum game dynamics. By observing the AI's flawless responses, users can intuitively grasp complex concepts like backward induction and decision trees. The responsive design ensures that the tactical battlefield is always at your fingertips, whether you are on a desktop studying algorithmic behavior or on a mobile device enjoying a quick mental spar during a commute. Challenge the machine, refine your logical foresight, and experience the elegant mathematical perfection of Tic-Tac-Toe through the lens of modern artificial intelligence. Master the grid, anticipate the machine, and enjoy the timeless duel of human intuition versus computational perfection.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Is it possible to beat the Hard AI?", answer:"Mathematically, no. The Hard AI uses the Minimax algorithm, which evaluates every possible future move. If you play perfectly, you will force a draw, but you cannot win."},
 { question:"How does the Medium AI make decisions?", answer:"The Medium AI checks if it can win in one move, then checks if it needs to block your winning move. If neither applies, it makes a random valid move."},
 { question:"Does X always have an advantage?", answer:"Yes, X moves first, which provides a slight initiative advantage. However, against perfect play, the first-move advantage is neutralized into a guaranteed draw."},
 { question:"Is my score saved permanently?", answer:"Scores are tracked locally during your active browser session to maintain a competitive feel without requiring user accounts or databases."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/tictactoe-ai"max={6} />
 </div>
 );
}

export default TictactoeAiClient;
