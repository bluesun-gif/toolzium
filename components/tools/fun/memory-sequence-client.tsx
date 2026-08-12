"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { RotateCcw, Hash, Play, Type } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const NUMBERS ="0123456789".split("");
const LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function MemorySequenceClient() {
 const [mode, setMode] = useState<"numbers"|"mixed">("numbers");
 const [phase, setPhase] = useState<"idle"|"countdown"|"show"|"input"|"result">("idle");
 const [sequence, setSequence] = useState<string[]>([]);
 const [userInput, setUserInput] = useState<string[]>([]);
 const [countdown, setCountdown] = useState(3);
 const [level, setLevel] = useState(1);
 const [streak, setStreak] = useState(0);
 const [bestStreak, setBestStreak] = useState(0);

 const pool = useMemo(() => mode ==="numbers"? NUMBERS : [...NUMBERS, ...LETTERS], [mode]);

 const getDisplayTime = (lvl: number): number => {
 if (lvl <= 2) return 3000;
 if (lvl <= 5) return 2500;
 if (lvl <= 8) return 2000;
 return 1500;
 };

 const generateSequence = useCallback((lvl: number): string[] => {
 const len = lvl + 2; // Start with 3 items
 const seq: string[] = [];
 for (let i = 0; i < len; i++) {
 seq.push(pool[Math.floor(Math.random() * pool.length)]);
 }
 return seq;
 }, [pool]);

 const startGame = useCallback(() => {
 setLevel(1);
 setStreak(0);
 setUserInput([]);
 setPhase("countdown");
 setCountdown(3);
 }, []);

 useEffect(() => {
 if (phase ==="countdown") {
 if (countdown > 0) {
 const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
 return () => clearTimeout(timer);
 } else {
 const newSeq = generateSequence(level);
 setSequence(newSeq);
 setPhase("show");
 
 (async () => {
 await delay(getDisplayTime(level));
 setPhase("input");
 })();
 }
 }
 }, [phase, countdown, level, generateSequence]);

 const handleInput = (char: string) => {
 if (phase !=="input") return;
 
 const nextIdx = userInput.length;
 if (char === sequence[nextIdx]) {
 const newInput = [...userInput, char];
 setUserInput(newInput);
 
 if (newInput.length === sequence.length) {
 // Success
 const nextStreak = streak + 1;
 setStreak(nextStreak);
 if (nextStreak > bestStreak) setBestStreak(nextStreak);
 toast.success("Correct! Next level...");
 
 setTimeout(() => {
 const nextLvl = level + 1;
 setLevel(nextLvl);
 setUserInput([]);
 setPhase("countdown");
 setCountdown(3);
 }, 1000);
 }
 } else {
 // Fail
 setPhase("result");
 toast.error(`Incorrect! The sequence was ${sequence.join("")}`);
 }
 };

 const resetGame = () => {
 setPhase("idle");
 setUserInput([]);
 setSequence([]);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 pb-12">
 <ToolPageHeader
 icon={Hash}
 title="Memory Sequence"
 description="Memorize and reproduce sequences of numbers and letters. Test your short-term recall and chunking strategies under time pressure."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Type className="w-4 h-4"/> Sequence Recall
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
 <div className="flex items-center gap-6">
 <div className="text-center">
 <div className="text-xs text-muted-foreground">Level</div>
 <div className="text-2xl font-bold text-primary">{level}</div>
 </div>
 <div className="text-center">
 <div className="text-xs text-muted-foreground">Streak</div>
 <div className="text-2xl font-bold text-green-500">{streak}</div>
 </div>
 <div className="text-center">
 <div className="text-xs text-muted-foreground">Best</div>
 <div className="text-2xl font-bold text-yellow-500">{bestStreak}</div>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <select 
 value={mode} 
 onChange={(e) => setMode(e.target.value as any)}
 className="px-3 py-2 rounded-lg bg-background border border-border text-sm"
 disabled={phase !=="idle"&& phase !=="result"}
 >
 <option value="numbers">Numbers Only</option>
 <option value="mixed">Numbers + Letters</option>
 </select>
 {phase ==="idle"|| phase ==="result"? (
 <Button onClick={startGame} variant="default"size="sm">
 <Play className="w-4 h-4 mr-2"/> Start
 </Button>
 ) : (
 <Button onClick={resetGame} variant="outline"size="sm">
 <RotateCcw className="w-4 h-4 mr-2"/> Quit
 </Button>
 )}
 </div>
 </div>

 <div className="min-h-[120px] flex items-center justify-center bg-muted/30 rounded-xl border border-border/50 p-4">
 {phase ==="idle"&& <p className="text-muted-foreground">Press Start to begin memorizing sequences.</p>}
 {phase ==="countdown"&& (
 <div className="text-6xl font-bold text-primary animate-pulse">{countdown}</div>
 )}
 {phase ==="show"&& (
 <div className="text-4xl sm:text-5xl font-mono font-bold tracking-widest text-foreground">
 {sequence.join("")}
 </div>
 )}
 {phase ==="input"&& (
 <div className="text-4xl sm:text-5xl font-mono font-bold tracking-widest text-muted-foreground">
 {userInput.map((c, i) => <span key={i} className="text-green-500">{c}</span>)}
 <span className="animate-pulse ml-1">_</span>
 </div>
 )}
 {phase ==="result"&& (
 <div className="text-center space-y-2">
 <p className="text-xl font-bold text-red-500">Game Over</p>
 <p className="text-sm text-muted-foreground">Final Level: {level} | Streak: {streak}</p>
 </div>
 )}
 </div>

 {phase ==="input"&& (
 <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 max-w-2xl mx-auto">
 {pool.map((char) => (
 <Button
 key={char}
 variant="outline"
 className="h-12 text-lg font-mono font-bold"
 onClick={() => handleInput(char)}
 >
 {char}
 </Button>
 ))}
 </div>
 )}
 </CardContent>
 </Card>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Watch the Sequence", description:"A sequence of numbers or letters will appear for a few seconds. Memorize the exact order.", icon: Hash },
 { step:"02", title:"Recall from Memory", description:"Once hidden, use the on-screen keypad to input the sequence exactly as you saw it.", icon: Type },
 { step:"03", title:"Advance the Levels", description:"Each successful recall increases the sequence length and decreases the viewing time.", icon: Play }
 ]}
 badges={["100% Free","Working Memory","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Hash, title:"Dynamic Length", description:"Sequences start at 3 items and grow infinitely, pushing the boundaries of your short-term memory."},
 { icon: Type, title:"Mixed Modes", description:"Switch between pure numbers or a complex mix of alphanumeric characters to increase cognitive load."},
 { icon: Play, title:"Time Pressure", description:"The viewing window shrinks as you level up, forcing your brain to encode information faster."},
 { icon: RotateCcw, title:"Streak Tracking", description:"Monitor your consecutive successful recalls to maintain focus and build cognitive endurance."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none mt-6">
 <h3>Short-Term Sequence Recall</h3>
 <p>Memory Sequence is a rigorous cognitive tool designed to test and expand your short-term working memory capacity. Based on classic psychological paradigms like the digit-span test, this game challenges you to encode, retain, and reproduce sequential information under increasing time pressure. The human brain typically holds about 7 (plus or minus 2) items in its working memory at any given time. By starting with 3-item sequences and progressively adding more, this tool gently pushes you toward your cognitive limits, encouraging the development of advanced mnemonic strategies like 'chunking'—where individual characters are grouped into meaningful units to bypass standard memory constraints.</p>
 <p>The inclusion of a 'Numbers + Letters' mode introduces interference, forcing your brain to switch between different categorical encoding systems. This significantly increases the cognitive load compared to simple digit recall, engaging the prefrontal cortex more intensely. As you advance, the display time shrinks from 3 seconds down to 1.5 seconds, simulating the rapid information processing required in real-world scenarios like taking down a phone number or a license plate. The immediate visual feedback on the input screen ensures you are constantly aware of your accuracy, while the streak tracker adds a layer of gamification that promotes sustained attention. Whether you are a student preparing for exams, a professional looking to sharpen your mental agility, or a cognitive psychology enthusiast, Memory Sequence offers a precise, measurable environment for brain training.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What is 'chunking'?", answer:"Chunking is a memory strategy where you group individual items into larger, meaningful units (e.g., remembering '192' and '845' instead of '1,9,2,8,4,5'). This tool helps you practice this technique."},
 { question:"Why does the time decrease?", answer:"To simulate real-world cognitive demands. As your brain becomes more efficient at encoding, the tool forces you to process information faster, preventing plateauing."},
 { question:"Is the mixed mode harder?", answer:"Yes, switching between numbers and letters requires more cognitive effort and working memory resources than processing a single category."},
 { question:"Can I use my keyboard?", answer:"Currently, input is restricted to the on-screen buttons to ensure a consistent experience across all devices, including touchscreens."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/fun/memory-sequence"max={6} />
 </div>
 );
}

export default MemorySequenceClient;
