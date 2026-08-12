"use client";

import React, { useState, useEffect, useRef, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Shuffle, Timer, Lightbulb, SkipForward, CheckCircle2, RotateCcw } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const WORDS = [
 { w:"ELEPHANT", c:"Animal"}, { w:"GIRAFFE", c:"Animal"}, { w:"PENGUIN", c:"Animal"},
 { w:"DOLPHIN", c:"Animal"}, { w:"CHEETAH", c:"Animal"}, { w:"KANGAROO", c:"Animal"},
 { w:"BUTTERFLY", c:"Animal"}, { w:"CROCODILE", c:"Animal"}, { w:"TORTOISE", c:"Animal"},
 { w:"CHAMELEON", c:"Animal"},
 { w:"SPAGHETTI", c:"Food"}, { w:"CHOCOLATE", c:"Food"}, { w:"AVOCADO", c:"Food"},
 { w:"BROCCOLI", c:"Food"}, { w:"PANCAKE", c:"Food"}, { w:"CROISSANT", c:"Food"},
 { w:"WATERMELON", c:"Food"}, { w:"PINEAPPLE", c:"Food"}, { w:"MUSHROOM", c:"Food"},
 { w:"HAMBURGER", c:"Food"},
 { w:"AUSTRALIA", c:"Country"}, { w:"BRAZIL", c:"Country"}, { w:"ICELAND", c:"Country"},
 { w:"SINGAPORE", c:"Country"}, { w:"MADAGASCAR", c:"Country"}, { w:"SWITZERLAND", c:"Country"},
 { w:"ARGENTINA", c:"Country"}, { w:"PORTUGAL", c:"Country"}, { w:"THAILAND", c:"Country"},
 { w:"ZIMBABWE", c:"Country"},
 { w:"BASKETBALL", c:"Sport"}, { w:"BADMINTON", c:"Sport"}, { w:"GYMNASTICS", c:"Sport"},
 { w:"SNOWBOARD", c:"Sport"}, { w:"ARCHERY", c:"Sport"}, { w:"WRESTLING", c:"Sport"},
 { w:"VOLLEYBALL", c:"Sport"}, { w:"MARATHON", c:"Sport"}, { w:"CRICKET", c:"Sport"},
 { w:"LACROSSE", c:"Sport"},
 { w:"TURQUOISE", c:"Color"}, { w:"MAGENTA", c:"Color"}, { w:"CRIMSON", c:"Color"},
 { w:"AMETHYST", c:"Color"}, { w:"SAPPHIRE", c:"Color"}, { w:"EMERALD", c:"Color"},
 { w:"MAROON", c:"Color"}, { w:"INDIGO", c:"Color"}, { w:"FUCHSIA", c:"Color"},
 { w:"CHARTREUSE", c:"Color"}
];

export default function WordScrambleClient() {
 const [currentIdx, setCurrentIdx] = useState(0);
 const [scrambled, setScrambled] = useState("");
 const [guess, setGuess] = useState("");
 const [score, setScore] = useState(0);
 const [total, setTotal] = useState(0);
 const [time, setTime] = useState(0);
 const [showHint, setShowHint] = useState(false);
 const [isPlaying, setIsPlaying] = useState(true);
 const [gameOver, setGameOver] = useState(false);
 const timerRef = useRef<NodeJS.Timeout | null>(null);

 const currentWord = WORDS[currentIdx];

 const scrambleWord = useCallback((word: string): string => {
 let arr = word.split("");
 for (let i = arr.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [arr[i], arr[j]] = [arr[j], arr[i]];
 }
 const res = arr.join("");
 return res === word ? scrambleWord(word) : res;
 }, []);

 const initRound = useCallback(() => {
 setScrambled(scrambleWord(currentWord.w));
 setGuess("");
 setShowHint(false);
 setTime(0);
 }, [currentWord.w, scrambleWord]);

 useEffect(() => {
 initRound();
 }, [currentIdx, initRound]);

 useEffect(() => {
 if (isPlaying && !gameOver) {
 timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
 }
 return () => {
 if (timerRef.current) clearInterval(timerRef.current);
 };
 }, [isPlaying, gameOver]);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 if (!guess.trim()) return;
 
 setTotal(t => t + 1);
 if (guess.trim().toUpperCase() === currentWord.w) {
 setScore(s => s + 1);
 toast.success("Correct!");
 nextWord();
 } else {
 toast.error(`Incorrect! The word was ${currentWord.w}.`);
 nextWord();
 }
 };

 const nextWord = () => {
 if (currentIdx < WORDS.length - 1) {
 setCurrentIdx(i => i + 1);
 } else {
 setIsPlaying(false);
 setGameOver(true);
 }
 };

 const skipWord = () => {
 setTotal(t => t + 1);
 toast(`Skipped! The word was ${currentWord.w}.`, { icon:"⏭️"});
 nextWord();
 };

 const restart = () => {
 setCurrentIdx(0);
 setScore(0);
 setTotal(0);
 setIsPlaying(true);
 setGameOver(false);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader 
 icon={Shuffle} 
 title="Word Scramble"
 description="Unscramble the letters to reveal the hidden word before the timer runs out!"
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center">
 <CardTitle className={titleClass}>
 Round {currentIdx + 1} / {WORDS.length}
 <span className="ml-3 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md uppercase">{currentWord.c}</span>
 </CardTitle>
 <div className="flex gap-4 text-sm font-medium text-muted-foreground">
 <span className="flex items-center gap-1"><Timer className="w-4 h-4"/> {time}s</span>
 <span>Score: {score}/{total}</span>
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-6 space-y-8 text-center">
 {!gameOver ? (
 <>
 <div className="flex flex-wrap justify-center gap-2 sm:gap-4 py-6">
 {scrambled.split("").map((char, idx) => (
 <div key={idx} className="w-10 h-12 sm:w-14 sm:h-16 bg-primary/10 border-2 border-primary/30 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold text-primary">
 {char}
 </div>
 ))}
 </div>

 {showHint && (
 <div className="text-lg text-muted-foreground animate-in fade-in slide-in-from-top-2">
 Hint: Starts with <span className="font-bold text-foreground">{currentWord.w[0]}</span>
 </div>
 )}

 <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
 <Input
 value={guess}
 onChange={(e) => setGuess(e.target.value)}
 placeholder="Type your guess..."
 className="text-center text-lg uppercase tracking-widest"
 autoFocus
 />
 <Button type="submit">Guess</Button>
 </form>

 <div className="flex justify-center gap-4">
 <Button variant="outline"size="sm"onClick={() => setShowHint(true)} disabled={showHint} className="gap-2">
 <Lightbulb className="w-4 h-4"/> Hint
 </Button>
 <Button variant="ghost"size="sm"onClick={skipWord} className="gap-2 text-muted-foreground">
 <SkipForward className="w-4 h-4"/> Skip
 </Button>
 </div>
 </>
 ) : (
 <div className="space-y-4 py-8">
 <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto"/>
 <h2 className="text-2xl font-bold">Game Complete!</h2>
 <p className="text-lg text-muted-foreground">You unscrambled <span className="text-primary font-bold">{score}</span> out of {WORDS.length} words.</p>
 <Button onClick={restart} className="gap-2">
 <RotateCcw className="w-4 h-4"/> Play Again
 </Button>
 </div>
 )}
 </CardContent>
 </Card>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Analyze the Letters", description:"Look at the scrambled letters and the category hint provided.", icon: Shuffle },
 { step:"02", title:"Type Your Guess", description:"Unscramble the word in your head and type it into the input box.", icon: CheckCircle2 },
 { step:"03", title:"Use Hints if Stuck", description:"Reveal the first letter or skip the word to keep your streak alive.", icon: Lightbulb }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Shuffle, title:"50+ Unique Words", description:"A massive library of words spanning Animals, Food, Countries, Sports, and Colors."},
 { icon: Lightbulb, title:"Smart Hints", description:"Stuck? Click the hint button to reveal the very first letter of the word."},
 { icon: Timer, title:"Speed Timer", description:"Track how long it takes your brain to decode each scrambled puzzle."},
 { icon: SkipForward, title:"Skip Option", description:"Don't waste time on impossible words; skip them and move to the next challenge."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Word scrambles are a fantastic cognitive exercise that engages multiple areas of the brain simultaneously. You must utilize pattern recognition, vocabulary recall, and working memory to rearrange the chaotic letters into a coherent string.</p>
 <p>Our Word Scramble tool categorizes the puzzles to give your brain a contextual anchor. Knowing that the word belongs to the"Animal"or"Country"category significantly narrows the search space, allowing you to practice targeted retrieval.</p>
 <p>This game is excellent for language learners, children developing spelling skills, or adults looking to maintain cognitive sharpness. The inclusion of a timer adds a layer of pressure that simulates real-world recall situations, improving your mental agility over time.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Are the scrambled words randomized?", answer:"Yes, the scrambling algorithm uses a Fisher-Yates shuffle, ensuring that every time you play, the letters are in a completely different order."},
 { question:"Does capitalization matter?", answer:"No, the game automatically converts your guess to uppercase before comparing it to the target word."},
 { question:"What happens if I use the hint?", answer:"Using the hint simply reveals the first letter of the word to help jog your memory. It does not penalize your score."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/word-scramble"max={6} />
 </div>
 );
}
