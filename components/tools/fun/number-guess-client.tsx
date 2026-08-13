"use client";

import React, { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import toast from"react-hot-toast";
import { HelpCircle, RotateCcw } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type Difficulty ="easy"|"medium"|"hard";
const LIMITS: Record<Difficulty, number> = { easy: 100, medium: 500, hard: 1000 };

export default function NumberGuessClient() {
 const [difficulty, setDifficulty] = useState<Difficulty>("easy");
 const [target, setTarget] = useState(0);
 const [guess, setGuess] = useState("");
 const [history, setHistory] = useState<{ val: number, hint: string }[]>([]);
 const [status, setStatus] = useState<"playing"|"won">("playing");

 const initGame = (diff: Difficulty = difficulty) => {
 const max = LIMITS[diff];
 setTarget(Math.floor(Math.random() * max) + 1);
 setHistory([]);
 setGuess("");
 setStatus("playing");
 setDifficulty(diff);
 };

 useEffect(() => { initGame(); }, []);

 const handleGuess = () => {
 const num = parseInt(guess);
 if (isNaN(num)) return toast.error("Please enter a valid number.");
 
 let hint ="";
 if (num < target) hint ="Too Low ⬆️";
 else if (num > target) hint ="Too High ⬇️";
 else {
 hint ="Correct! 🎉";
 setStatus("won");
 toast.success(`You got it in ${history.length + 1} attempts!`);
 }
 
 setHistory([{ val: num, hint }, ...history]);
 setGuess("");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader 
 icon={HelpCircle} 
 title="Number Guessing Game"
 description="Test your intuition and logic skills by guessing the hidden number."
 />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <HelpCircle className="w-4 h-4 text-primary"/> Guess the Number
 </CardTitle>
 <div className="flex gap-2 mt-3">
 {Object.keys(LIMITS).map(d => (
 <Button 
 key={d} 
 variant={difficulty === d ?"default":"outline"} 
 size="sm"
 onClick={() => initGame(d as Difficulty)}
 >
 {d.charAt(0).toUpperCase() + d.slice(1)} (1-{LIMITS[d as Difficulty]})
 </Button>
 ))}
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-6">
 {status ==="playing"? (
 <div className="flex gap-2 max-w-md mx-auto">
 <Input 
 type="number"
 value={guess} 
 onChange={(e) => setGuess(e.target.value)} 
 placeholder={`1 to ${LIMITS[difficulty]}`}
 onKeyDown={(e) => e.key ==="Enter"&& handleGuess()}
 />
 <Button onClick={handleGuess}>Guess</Button>
 </div>
 ) : (
 <div className="text-center space-y-4">
 <p className="text-2xl font-bold text-green-500">You Won! The number was {target}.</p>
 <p className="text-muted-foreground">Attempts: {history.length}</p>
 <Button onClick={() => initGame()} className="gap-2">
 <RotateCcw className="w-4 h-4"/> Play Again
 </Button>
 </div>
 )}

 <div className="space-y-2 max-h-64 overflow-y-auto">
 <h3 className="text-sm font-semibold text-muted-foreground">Guess History:</h3>
 {history.length === 0 ? (
 <p className="text-sm italic text-muted-foreground">No guesses yet...</p>
 ) : (
 history.map((h, i) => (
 <div key={i} className="flex justify-between items-center bg-muted/50 px-4 py-2 rounded-lg border border-border/50">
 <span className="font-mono font-bold">{h.val}</span>
 <span className={`text-sm font-medium ${h.hint.includes("Low") ?"text-primary": h.hint.includes("High") ?"text-orange-500":"text-green-500"}`}>
 {h.hint}
 </span>
 </div>
 ))
 )}
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Choose Difficulty", description:"Select a range: Easy (1-100), Medium (1-500), or Hard (1-1000).", icon: HelpCircle },
 { step:"02", title:"Make a Guess", description:"Enter a number and submit it. The tool will tell you if it's too high or low.", icon: HelpCircle },
 { step:"03", title:"Find the Target", description:"Use the hints to narrow down the range and guess the exact number.", icon: HelpCircle }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides 
 features={[
 { icon: HelpCircle, title:"Three Difficulty Modes", description:"Scale the challenge from 100 to 1000 possible numbers."},
 { icon: HelpCircle, title:"Directional Hints", description:"Clear visual feedback telling you if your guess is too high or too low."},
 { icon: HelpCircle, title:"Attempt Tracking", description:"Keep a history log of all your guesses and hints."},
 { icon: HelpCircle, title:"Instant Reset", description:"Start a new game with a new random number instantly."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>The Number Guessing Game is a classic exercise in logic and binary search algorithms. By consistently guessing the midpoint of the remaining range, you can mathematically guarantee finding the number in the minimum number of attempts.</p>
 <p>For the 1-100 range, a perfect binary search strategy will always find the number in 7 guesses or fewer. Can you beat the mathematical average?</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion 
 faqs={[
 { question:"What is the best strategy?", answer:"Use a binary search. Always guess the number exactly halfway between your current known 'too high' and 'too low' boundaries."},
 { question:"Are numbers repeated in the history?", answer:"The game allows duplicate guesses, but it's logically inefficient. The history will show all your attempts."},
 { question:"Is the number truly random?", answer:"Yes, it uses JavaScript's Math.random() which provides a pseudo-random number uniformly distributed in the selected range."}
 ]} 
 />

 <RelatedTools currentToolUrl="/tools/fun/number-guess" max={6} />
 </div>
 );
}
