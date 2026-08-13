"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import toast from"react-hot-toast";
import { Grid3X3, RotateCcw } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type Player ="X"|"O"| null;
const WINNING_LINES = [
 [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
 [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
 [0, 4, 8], [2, 4, 6] // Diagonals
];

export default function TicTacToeClient() {
 const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
 const [isXNext, setIsXNext] = useState(true);
 const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

 const { winner, line } = useMemo(() => {
 for (let i = 0; i < WINNING_LINES.length; i++) {
 const [a, b, c] = WINNING_LINES[i];
 if (board[a] && board[a] === board[b] && board[a] === board[c]) {
 return { winner: board[a], line: WINNING_LINES[i] };
 }
 }
 return { winner: null, line: [] as number[] };
 }, [board]);

 const isDraw = !winner && board.every(cell => cell !== null);

 const handleClick = (i: number) => {
 if (board[i] || winner) return;
 const newBoard = [...board];
 newBoard[i] = isXNext ?"X":"O";
 setBoard(newBoard);
 setIsXNext(!isXNext);
 };

 React.useEffect(() => {
 if (winner) {
 setScore(s => ({ ...s, [winner]: s[winner as"X"|"O"] + 1 }));
 toast.success(`Player ${winner} Wins! 🎉`);
 } else if (isDraw) {
 setScore(s => ({ ...s, draws: s.draws + 1 }));
 toast("It's a Draw! 🤝", { icon:"🤝"});
 }
 }, [winner, isDraw]);

 const resetBoard = () => {
 setBoard(Array(9).fill(null));
 setIsXNext(true);
 };

 const resetAll = () => {
 resetBoard();
 setScore({ X: 0, O: 0, draws: 0 });
 toast.success("All stats reset!");
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader 
 icon={Grid3X3} 
 title="Tic-Tac-Toe"
 description="Play the classic 3x3 grid game with a friend."
 />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Grid3X3 className="w-4 h-4 text-primary"/> Game Board
 </CardTitle>
 <div className="flex gap-4 text-sm mt-2 font-bold">
 <span className="text-primary">X Wins: {score.X}</span>
 <span className="text-red-500">O Wins: {score.O}</span>
 <span className="text-muted-foreground">Draws: {score.draws}</span>
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-6 flex flex-col items-center">
 <div className="text-lg font-semibold text-primary">
 {winner ? `Winner: ${winner}` : isDraw ?"Draw!": `Next Turn: ${isXNext ?"X":"O"}`}
 </div>

 <div className="grid grid-cols-3 gap-2 w-full max-w-[300px] aspect-square">
 {board.map((cell, i) => {
 const isWinCell = line.includes(i);
 return (
 <Button
 key={i}
 onClick={() => handleClick(i)}
 variant="outline"
 className={`text-4xl font-bold h-full w-full p-0 transition-colors ${
 isWinCell ?"bg-green-500/20 border-green-500 text-green-600 dark:text-green-400":""
 } ${cell ==="X"?"text-primary":"text-red-500"}`}
 disabled={!!cell || !!winner}
 >
 {cell}
 </Button>
 );
 })}
 </div>

 <div className="flex gap-4">
 <Button onClick={resetBoard} variant="secondary"className="gap-2">
 <RotateCcw className="w-4 h-4"/> Next Round
 </Button>
 <Button onClick={resetAll} variant="ghost"className="gap-2 text-muted-foreground">
 Reset Score
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Take Turns", description:"Player X goes first, followed by Player O.", icon: Grid3X3 },
 { step:"02", title:"Claim Squares", description:"Click any empty square to place your mark.", icon: Grid3X3 },
 { step:"03", title:"Get Three", description:"Align three marks horizontally, vertically, or diagonally to win.", icon: Grid3X3 }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides 
 features={[
 { icon: Grid3X3, title:"Win Highlighting", description:"Winning cells turn green to clearly show the victory line."},
 { icon: Grid3X3, title:"Score Tracking", description:"Keeps a tally of wins for X, O, and draws across rounds."},
 { icon: Grid3X3, title:"Turn Indicator", description:"Always shows whose turn it is to prevent confusion."},
 { icon: Grid3X3, title:"Quick Reset", description:"Instantly clear the board for a rematch without losing scores."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Tic-Tac-Toe is a solved game. With perfect play from both sides, the game will always end in a draw. This makes it an excellent game for teaching logic and game theory to children.</p>
 <p>Despite its simplicity, the game offers 255,168 possible game sequences, reducing to 26,830 possible unique games when accounting for symmetry.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion 
 faqs={[
 { question:"Can I play against a computer?", answer:"This version is designed for local 2-player hot-seat gaming. Pass the device back and forth!"},
 { question:"What happens if the board fills up?", answer:"If all 9 squares are filled and no one has 3 in a row, the game is declared a draw."},
 { question:"Are the scores saved if I refresh?", answer:"No, scores are kept in temporary memory and will reset if you reload the page."}
 ]} 
 />

 <RelatedTools currentToolUrl="/tools/fun/tic-tac-toe" max={6} />
 </div>
 );
}
