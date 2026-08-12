"use client";

import React, { useState, useEffect, useRef, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import toast from"react-hot-toast";
import { Keyboard, RotateCcw } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const PARAGRAPHS = {
 short:"The quick brown fox jumps over the lazy dog.",
 medium:"Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump. The five boxing wizards jump quickly.",
 long:"Sphinx of black quartz, judge my vow. Two driven jocks help fax my big quiz. The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump. Mr Jock, TV quiz PhD, bags few lynx."
};

export default function TypingChallengeClient() {
 const [difficulty, setDifficulty] = useState<"short"|"medium"|"long">("medium");
 const [targetText, setTargetText] = useState(PARAGRAPHS.medium);
 const [typedText, setTypedText] = useState("");
 const [startTime, setStartTime] = useState<number | null>(null);
 const [endTime, setEndTime] = useState<number | null>(null);
 const inputRef = useRef<HTMLTextAreaElement>(null);

 const stats = useMemo(() => {
 if (!startTime) return { wpm: 0, accuracy: 0, time: 0 };
 
 const now = endTime || Date.now();
 const timeMins = (now - startTime) / 1000 / 60;
 
 const correctChars = typedText.split("").filter((char, i) => char === targetText[i]).length;
 const totalWords = targetText.trim().split(/\s+/).length;
 
 const wpm = timeMins > 0 ? Math.round((typedText.trim().split(/\s+/).filter(Boolean).length) / timeMins) : 0;
 const accuracy = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 100;
 
 return { wpm, accuracy, time: Math.floor((now - startTime) / 1000) };
 }, [typedText, startTime, endTime, targetText]);

 const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
 const val = e.target.value;
 if (!startTime) setStartTime(Date.now());
 setTypedText(val);
 
 if (val === targetText) {
 setEndTime(Date.now());
 toast.success("Perfect! You finished the text. 🏆");
 }
 };

 const reset = (diff:"short"|"medium"|"long"= difficulty) => {
 setTargetText(PARAGRAPHS[diff]);
 setTypedText("");
 setStartTime(null);
 setEndTime(null);
 setDifficulty(diff);
 setTimeout(() => inputRef.current?.focus(), 50);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader 
 icon={Keyboard} 
 title="Typing Speed Challenge"
 description="Test your WPM and accuracy with this interactive typing test."
 />
 
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center flex-wrap gap-4">
 <CardTitle className={titleClass}>
 <Keyboard className="w-4 h-4 text-primary"/> Typing Test
 </CardTitle>
 <div className="flex gap-2">
 {Object.keys(PARAGRAPHS).map(d => (
 <Button 
 key={d} 
 variant={difficulty === d ?"default":"outline"} 
 size="sm"
 onClick={() => reset(d as"short"|"medium"|"long")}
 >
 {d.charAt(0).toUpperCase() + d.slice(1)}
 </Button>
 ))}
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-6">
 <div className="grid grid-cols-3 gap-4 text-center">
 <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
 <p className="text-xs text-muted-foreground">WPM</p>
 <p className="text-2xl font-bold text-primary">{stats.wpm}</p>
 </div>
 <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
 <p className="text-xs text-muted-foreground">Accuracy</p>
 <p className="text-2xl font-bold text-green-500">{stats.accuracy}%</p>
 </div>
 <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
 <p className="text-xs text-muted-foreground">Time (s)</p>
 <p className="text-2xl font-bold text-orange-500">{stats.time}</p>
 </div>
 </div>

 <div className="relative p-4 bg-muted/30 rounded-lg border border-border/50 font-mono text-lg leading-relaxed min-h-[120px]">
 {targetText.split("").map((char, i) => {
 let colorClass ="text-muted-foreground"; // Not typed yet
 if (i < typedText.length) {
 colorClass = typedText[i] === char ?"text-green-500 dark:text-green-400":"text-red-500 bg-red-500/10";
 } else if (i === typedText.length) {
 colorClass ="border-l-2 border-primary animate-pulse"; // Cursor
 }
 
 return (
 <span key={i} className={colorClass}>
 {char ===""&& typedText[i] !== char && i < typedText.length ?"·": char}
 </span>
 );
 })}
 </div>

 <textarea
 ref={inputRef}
 value={typedText}
 onChange={handleInput}
 rows={4}
 disabled={!!endTime}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono"
 placeholder="Start typing the text above exactly as it appears..."
 autoFocus
 />

 {endTime && (
 <div className="flex justify-center">
 <Button onClick={() => reset()} className="gap-2">
 <RotateCcw className="w-4 h-4"/> Try Again
 </Button>
 </div>
 )}
 </CardContent>
 </Card>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Choose Length", description:"Select short, medium, or long text difficulty.", icon: Keyboard },
 { step:"02", title:"Start Typing", description:"Begin typing the displayed text exactly as shown.", icon: Keyboard },
 { step:"03", title:"Review Stats", description:"Track your WPM and accuracy live as you type.", icon: Keyboard }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides 
 features={[
 { icon: Keyboard, title:"Live Highlighting", description:"Characters turn green for correct and red for errors instantly."},
 { icon: Keyboard, title:"WPM Calculator", description:"Uses standard word length calculations for accurate speed metrics."},
 { icon: Keyboard, title:"Error Detection", description:"Shows a dot (·) when you miss a space to help correct habits."},
 { icon: Keyboard, title:"Multiple Lengths", description:"Three difficulty tiers to test both sprint and endurance typing."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>The average typing speed for an adult is around 40 Words Per Minute (WPM), while professional typists often achieve 70-90 WPM. Elite competitive typists can exceed 120 WPM with near-perfect accuracy.</p>
 <p>This tool calculates WPM based on standard 5-character words. Accuracy is just as important as speed; high WPM with low accuracy is counterproductive in real-world scenarios like programming or data entry.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion 
 faqs={[
 { question:"How is WPM calculated?", answer:"WPM = (Characters Typed / 5) / Minutes. This standardizes all words to a length of 5 characters for fair comparison."},
 { question:"Does punctuation count as errors?", answer:"Yes, every character including spaces and punctuation must match exactly to maintain 100% accuracy."},
 { question:"Can I use my phone?", answer:"Yes, but touch-typing tests are generally designed for physical QWERTY keyboards to measure true muscle memory and speed."}
 ]} 
 />

 <RelatedTools currentToolUrl="/tools/fun/typing-challenge"max={6} />
 </div>
 );
}
