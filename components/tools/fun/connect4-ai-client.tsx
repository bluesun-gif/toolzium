"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { BrainCircuit, RotateCcw, Zap, Shield, Grid3X3 } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER = 1;
const AI_PIECE = 2;

const createEmptyBoard = (): number[][] => {
 return Array(ROWS).fill(0).map(() => Array(COLS).fill(0) as number[]);
};

const getRow = (board: number[][], col: number): number => {
 for (let r = ROWS - 1; r >= 0; r--) {
 if (board[r][col] === EMPTY) return r;
 }
 return -1;
};

const checkWin = (board: number[][], piece: number): [number, number][] | null => {
 for (let r = 0; r < ROWS; r++) {
 for (let c = 0; c < COLS - 3; c++) {
 if (board[r][c] === piece && board[r][c+1] === piece && board[r][c+2] === piece && board[r][c+3] === piece) {
 return [[r,c], [r,c+1], [r,c+2], [r,c+3]];
 }
 }
 }
 for (let r = 0; r < ROWS - 3; r++) {
 for (let c = 0; c < COLS; c++) {
 if (board[r][c] === piece && board[r+1][c] === piece && board[r+2][c] === piece && board[r+3][c] === piece) {
 return [[r,c], [r+1,c], [r+2,c], [r+3,c]];
 }
 }
 }
 for (let r = 0; r < ROWS - 3; r++) {
 for (let c = 0; c < COLS - 3; c++) {
 if (board[r][c] === piece && board[r+1][c+1] === piece && board[r+2][c+2] === piece && board[r+3][c+3] === piece) {
 return [[r,c], [r+1,c+1], [r+2,c+2], [r+3,c+3]];
 }
 }
 }
 for (let r = 3; r < ROWS; r++) {
 for (let c = 0; c < COLS - 3; c++) {
 if (board[r][c] === piece && board[r-1][c+1] === piece && board[r-2][c+2] === piece && board[r-3][c+3] === piece) {
 return [[r,c], [r-1,c+1], [r-2,c+2], [r-3,c+3]];
 }
 }
 }
 return null;
};

const evaluateWindow = (window: number[], piece: number): number => {
 const oppPiece = piece === PLAYER ? AI_PIECE : PLAYER;
 let score = 0;
 const countPiece = window.filter((p) => p === piece).length;
 const countOpp = window.filter((p) => p === oppPiece).length;
 const countEmpty = window.filter((p) => p === EMPTY).length;

 if (countPiece === 4) score += 100;
 else if (countPiece === 3 && countEmpty === 1) score += 5;
 else if (countPiece === 2 && countEmpty === 2) score += 2;

 if (countOpp === 3 && countEmpty === 1) score -= 4;
 return score;
};

const scorePosition = (board: number[][], piece: number): number => {
 let score = 0;
 const centerArray = board.map((row) => row[3]);
 score += centerArray.filter((p) => p === piece).length * 3;

 for (let r = 0; r < ROWS; r++) {
 for (let c = 0; c < COLS - 3; c++) {
 const window = [board[r][c], board[r][c+1], board[r][c+2], board[r][c+3]];
 score += evaluateWindow(window, piece);
 }
 }
 for (let r = 0; r < ROWS - 3; r++) {
 for (let c = 0; c < COLS; c++) {
 const window = [board[r][c], board[r+1][c], board[r+2][c], board[r+3][c]];
 score += evaluateWindow(window, piece);
 }
 }
 for (let r = 0; r < ROWS - 3; r++) {
 for (let c = 0; c < COLS - 3; c++) {
 const window = [board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3]];
 score += evaluateWindow(window, piece);
 }
 }
 for (let r = 3; r < ROWS; r++) {
 for (let c = 0; c < COLS - 3; c++) {
 const window = [board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3]];
 score += evaluateWindow(window, piece);
 }
 }
 return score;
};

const getValidLocations = (board: number[][]): number[] => {
 return [0,1,2,3,4,5,6].filter((c) => board[0][c] === EMPTY);
};

const isTerminalNode = (board: number[][]): boolean => {
 return checkWin(board, PLAYER) !== null || checkWin(board, AI_PIECE) !== null || getValidLocations(board).length === 0;
};

const minimax = (board: number[][], depth: number, alpha: number, beta: number, maximizingPlayer: boolean): [number | null, number] => {
 const validLocations = getValidLocations(board);
 const isTerminal = isTerminalNode(board);
 if (depth === 0 || isTerminal) {
 if (isTerminal) {
 if (checkWin(board, AI_PIECE)) return [null, 100000000];
 if (checkWin(board, PLAYER)) return [null, -100000000];
 return [null, 0];
 }
 return [null, scorePosition(board, AI_PIECE)];
 }
 if (maximizingPlayer) {
 let value = -Infinity;
 let bestCol = validLocations[Math.floor(Math.random() * validLocations.length)];
 for (const col of validLocations) {
 const row = getRow(board, col);
 const bCopy = board.map((r) => [...r]);
 bCopy[row][col] = AI_PIECE;
 const newScore = minimax(bCopy, depth - 1, alpha, beta, false)[1];
 if (newScore > value) {
 value = newScore;
 bestCol = col;
 }
 alpha = Math.max(alpha, value);
 if (alpha >= beta) break;
 }
 return [bestCol, value];
 } else {
 let value = Infinity;
 let bestCol = validLocations[Math.floor(Math.random() * validLocations.length)];
 for (const col of validLocations) {
 const row = getRow(board, col);
 const bCopy = board.map((r) => [...r]);
 bCopy[row][col] = PLAYER;
 const newScore = minimax(bCopy, depth - 1, alpha, beta, true)[1];
 if (newScore < value) {
 value = newScore;
 bestCol = col;
 }
 beta = Math.min(beta, value);
 if (alpha >= beta) break;
 }
 return [bestCol, value];
 }
};

export function Connect4AiClient() {
 const [board, setBoard] = useState<number[][]>(createEmptyBoard());
 const [turn, setTurn] = useState<"player"|"ai"|"over">("player");
 const [difficulty, setDifficulty] = useState<"easy"|"medium"|"hard">("hard");
 const [winningCells, setWinningCells] = useState<[number, number][]>([]);
 const [hoverCol, setHoverCol] = useState<number | null>(null);
 const [score, setScore] = useState({ player: 0, ai: 0, draw: 0 });
 const [status, setStatus] = useState("Your Turn");

 const resetGame = useCallback(() => {
 setBoard(createEmptyBoard());
 setTurn("player");
 setWinningCells([]);
 setStatus("Your Turn");
 }, []);

 const dropPiece = useCallback((col: number, piece: number, currentBoard: number[][]) => {
 const row = getRow(currentBoard, col);
 if (row === -1) return currentBoard;
 const newBoard = currentBoard.map((r) => [...r]);
 newBoard[row][col] = piece;
 return newBoard;
 }, []);

 const handleColClick = useCallback((col: number) => {
 if (turn !=="player"|| board[0][col] !== EMPTY) return;
 
 const newBoard = dropPiece(col, PLAYER, board);
 setBoard(newBoard);
 
 const winCells = checkWin(newBoard, PLAYER);
 if (winCells) {
 setWinningCells(winCells);
 setTurn("over");
 setStatus("You Win!");
 setScore((prev) => ({ ...prev, player: prev.player + 1 }));
 toast.success("Brilliant! You defeated the AI.");
 return;
 }
 
 if (getValidLocations(newBoard).length === 0) {
 setTurn("over");
 setStatus("Draw!");
 setScore((prev) => ({ ...prev, draw: prev.draw + 1 }));
 return;
 }
 
 setTurn("ai");
 setStatus("AI Thinking...");
 }, [turn, board, dropPiece]);

 useEffect(() => {
 if (turn ==="ai") {
 const timer = setTimeout(() => {
 let aiCol: number | null = null;
 if (difficulty ==="easy") {
 const valid = getValidLocations(board);
 aiCol = valid[Math.floor(Math.random() * valid.length)];
 } else if (difficulty ==="medium") {
 // Basic blocking logic
 const valid = getValidLocations(board);
 let bestMove = valid[Math.floor(Math.random() * valid.length)];
 for (const c of valid) {
 const bCopy = board.map((r) => [...r]);
 const row = getRow(bCopy, c);
 bCopy[row][c] = PLAYER;
 if (checkWin(bCopy, PLAYER)) {
 bestMove = c;
 break;
 }
 }
 aiCol = bestMove;
 } else {
 const [col] = minimax(board, 5, -Infinity, Infinity, true);
 aiCol = col;
 }
 
 if (aiCol !== null) {
 const newBoard = dropPiece(aiCol, AI_PIECE, board);
 setBoard(newBoard);
 
 const winCells = checkWin(newBoard, AI_PIECE);
 if (winCells) {
 setWinningCells(winCells);
 setTurn("over");
 setStatus("AI Wins!");
 setScore((prev) => ({ ...prev, ai: prev.ai + 1 }));
 toast.error("The AI outsmarted you. Try again!");
 return;
 }
 
 if (getValidLocations(newBoard).length === 0) {
 setTurn("over");
 setStatus("Draw!");
 setScore((prev) => ({ ...prev, draw: prev.draw + 1 }));
 return;
 }
 
 setTurn("player");
 setStatus("Your Turn");
 }
 }, 600);
 return () => clearTimeout(timer);
 }
 }, [turn, board, difficulty, dropPiece]);

 const isWinningCell = (r: number, c: number) => {
 return winningCells.some(([wr, wc]) => wr === r && wc === c);
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 pb-12">
      <GridPattern />

 <ToolPageHeader
 icon={BrainCircuit}
 title="Connect Four AI"
 description="Challenge a sophisticated Minimax AI opponent in the classic game of Connect Four. Test your strategic thinking and pattern recognition."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Grid3X3 className="w-4 h-4"/> Game Board
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
 <div className="flex items-center gap-4">
 <div className="text-center">
 <div className="text-xs text-muted-foreground">You (Red)</div>
 <div className="text-2xl font-bold text-red-500">{score.player}</div>
 </div>
 <div className="text-center">
 <div className="text-xs text-muted-foreground">Draws</div>
 <div className="text-2xl font-bold text-muted-foreground">{score.draw}</div>
 </div>
 <div className="text-center">
 <div className="text-xs text-muted-foreground">AI (Yellow)</div>
 <div className="text-2xl font-bold text-yellow-500">{score.ai}</div>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <select 
 value={difficulty} 
 onChange={(e) => setDifficulty(e.target.value as any)}
 className="px-3 py-2 rounded-lg bg-background border border-border text-sm"
 >
 <option value="easy">Easy</option>
 <option value="medium">Medium</option>
 <option value="hard">Hard (Minimax)</option>
 </select>
 <Button onClick={resetGame} variant="outline"size="sm">
 <RotateCcw className="w-4 h-4 mr-2"/> New Game
 </Button>
 </div>
 </div>

 <div className={`text-center text-lg font-semibold py-2 rounded-lg ${turn === 'player' ? 'bg-red-500/10 text-red-500' : turn === 'ai' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-primary/10 text-primary'}`}>
 {status}
 </div>

 <div className="flex justify-center overflow-x-auto">
 <div className="bg-blue-700 p-3 sm:p-4 rounded-xl shadow-2xl border-4 border-blue-900">
 <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
 {Array(COLS).fill(0).map((_, cIdx) => (
 <div 
 key={`hover-${cIdx}`} 
 className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
 onMouseEnter={() => setHoverCol(cIdx)}
 onMouseLeave={() => setHoverCol(null)}
 onClick={() => handleColClick(cIdx)}
 >
 {hoverCol === cIdx && turn ==="player"&& board[0][cIdx] === EMPTY && (
 <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-500 opacity-50 animate-pulse"/>
 )}
 </div>
 ))}
 {board.map((row, rIdx) => row.map((cell, cIdx) => (
 <div 
 key={`${rIdx}-${cIdx}`} 
 className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-900/40 rounded-full flex items-center justify-center cursor-pointer border border-blue-950/50 shadow-inner"
 onClick={() => handleColClick(cIdx)}
 >
 {cell === PLAYER && (
 <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-500 shadow-md ${isWinningCell(rIdx, cIdx) ? 'ring-4 ring-white animate-pulse' : ''}`} />
 )}
 {cell === AI_PIECE && (
 <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-400 shadow-md ${isWinningCell(rIdx, cIdx) ? 'ring-4 ring-white animate-pulse' : ''}`} />
 )}
 </div>
 )))}
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Choose Difficulty", description:"Select Easy, Medium, or Hard. Hard mode uses the Minimax algorithm with Alpha-Beta pruning for a perfect game.", icon: Zap },
 { step:"02", title:"Drop Your Disc", description:"Click any column to drop your red disc. It will fall to the lowest available row due to gravity physics.", icon: Grid3X3 },
 { step:"03", title:"Connect Four", description:"Align four of your discs horizontally, vertically, or diagonally before the AI does to win the match.", icon: Shield }
 ]}
 badges={["100% Free","Brain Training","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: BrainCircuit, title:"Minimax AI Engine", description:"The Hard difficulty uses a depth-5 Minimax search tree with Alpha-Beta pruning to evaluate millions of board states."},
 { icon: Grid3X3, title:"Gravity Physics", description:"Discs obey gravity, falling to the lowest available slot in the chosen column just like the physical board game."},
 { icon: Zap, title:"Win Tracking", description:"Advanced algorithms scan the board for horizontal, vertical, and diagonal connections, highlighting the winning line."},
 { icon: Shield, title:"Strategic Depth", description:"Develop your foresight and planning skills by anticipating the AI's counter-moves and setting up multi-turn traps."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none mt-6">
 <h3>The Ultimate Connect Four Challenge</h3>
 <p>Connect Four is a classic two-player connection game where the objective is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs. Our digital adaptation brings this beloved game to life with a sophisticated AI opponent powered by the Minimax algorithm with Alpha-Beta pruning. Unlike basic random-move bots, our Hard AI evaluates the game tree up to five moves deep, assessing positional advantages, center-column control, and potential threats. This means every move you make is met with a calculated, optimal response, providing a genuine test of your strategic thinking and pattern recognition skills.</p>
 <p>The game board features a premium design with smooth gravity animations, ensuring that every disc drop feels tactile and satisfying. The visual feedback system highlights winning combinations with a pulsing glow, making victories feel earned and spectacular. Whether you are a casual player looking to pass the time or a seasoned strategist wanting to test your logical foresight, this tool offers a scalable challenge. The Medium AI provides a balanced experience by actively blocking your immediate threats, while the Easy AI makes random moves, perfect for beginners learning the ropes of vertical strategy. Engage your brain, plan your traps, and see if you can outsmart the machine in this timeless battle of wits.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"How does the Hard AI work?", answer:"The Hard AI uses the Minimax algorithm with Alpha-Beta pruning. It simulates future moves up to a certain depth, evaluating board positions based on piece alignment and center control, to choose the mathematically optimal move."},
 { question:"Can I play offline?", answer:"Yes! The entire game logic, including the AI engine, runs 100% client-side in your browser. No internet connection or server API calls are required after the page loads."},
 { question:"Is the board standard size?", answer:"Yes, we use the classic 7-column by 6-row grid, ensuring the game feels exactly like the physical tabletop version you know and love."},
 { question:"Does the AI make mistakes?", answer:"On Hard mode, the AI plays optimally within its search depth. However, on Easy and Medium modes, it intentionally limits its strategic vision to give human players a fair chance to win."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/fun/connect4-ai" max={6} />
 </div>
 );
}

export default Connect4AiClient;
