"use client";

import React, { useState, useRef, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import toast from"react-hot-toast";
import { Zap, RotateCcw } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type GameState ="idle"|"waiting"|"ready"|"result"|"tooEarly";

export default function ReactionTimeClient() {
 const [state, setState] = useState<GameState>("idle");
 const [reactionTime, setReactionTime] = useState(0);
 const [times, setTimes] = useState<number[]>([]);
 const timeoutRef = useRef<NodeJS.Timeout | null>(null);
 const startTimeRef = useRef<number>(0);

 useEffect(() => {
 return () => {
 if (timeoutRef.current) clearTimeout(timeoutRef.current);
 };
 }, []);

 const startTest = () => {
 setState("waiting");
 const delay = Math.random() * 3000 + 2000; // 2 to 5 seconds
 timeoutRef.current = setTimeout(() => {
 setState("ready");
 startTimeRef.current = Date.now();
 }, delay);
 };

 const handleClick = () => {
 if (state ==="idle"|| state ==="result"|| state ==="tooEarly") {
 startTest();
 } else if (state ==="waiting") {
 if (timeoutRef.current) clearTimeout(timeoutRef.current);
 setState("tooEarly");
 toast.error("Too early! Wait for green.");
 } else if (state ==="ready") {
 const time = Date.now() - startTimeRef.current;
 setReactionTime(time);
 setTimes(prev => [...prev, time]);
 setState("result");
 }
 };

 const resetAll = () => {
 if (timeoutRef.current) clearTimeout(timeoutRef.current);
 setState("idle");
 setTimes([]);
 setReactionTime(0);
 toast.success("Stats reset!");
 };

 const bestTime = times.length > 0 ? Math.min(...times) : 0;
 const avgTime = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;

 const bgColor = 
 state ==="waiting"?"bg-red-500 hover:bg-red-600": 
 state ==="ready"?"bg-green-500 hover:bg-green-600": 
 state ==="tooEarly"?"bg-orange-500 hover:bg-orange-600": 
"bg-blue-600 hover:bg-blue-700";

 const message = 
 state ==="waiting"?"Wait for green...": 
 state ==="ready"?"CLICK NOW!": 
 state ==="tooEarly"?"Too Early! Click to try again.": 
 state ==="result"? `${reactionTime} ms! Click to try again.` : 
"Click to Start";

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
 icon={Zap} 
 title="Reaction Time Test"
 description="Measure your reflexes and track your fastest reaction times."
 />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Zap className="w-4 h-4 text-primary"/> Reflex Tester
 </CardTitle>
 <div className="flex gap-4 text-sm mt-2">
 <span className="text-primary font-bold">Best: {bestTime > 0 ? `${bestTime}ms` :"-"}</span>
 <span className="text-muted-foreground font-bold">Avg: {avgTime > 0 ? `${avgTime}ms` :"-"}</span>
 <span className="text-muted-foreground">Attempts: {times.length}</span>
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-6">
 <div 
 onClick={handleClick}
 className={`w-full h-64 rounded-xl flex items-center justify-center text-white text-3xl font-bold cursor-pointer transition-colors select-none ${bgColor}`}
 >
 {message}
 </div>
 
 <div className="flex justify-center">
 <Button onClick={resetAll} variant="outline"className="gap-2">
 <RotateCcw className="w-4 h-4"/> Reset Stats
 </Button>
 </div>

 {times.length > 0 && (
 <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
 {times.slice(-10).map((t, i) => (
 <div key={i} className="bg-muted/50 p-2 rounded text-center text-sm font-mono border border-border/50">
 {t} ms
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Start", description:"Click the blue area to begin the test.", icon: Zap },
 { step:"02", title:"Wait", description:"The screen will turn red. Do NOT click until it turns green.", icon: Zap },
 { step:"03", title:"React", description:"Click as fast as you can when the screen turns green to record your time.", icon: Zap }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides 
 features={[
 { icon: Zap, title:"Millisecond Precision", description:"Uses high-resolution timestamps for accurate measurement."},
 { icon: Zap, title:"Anti-Cheat Logic", description:"Clicking before the green screen results in a penalty and resets the trial."},
 { icon: Zap, title:"Statistical Tracking", description:"Automatically calculates your best and average reaction times."},
 { icon: Zap, title:"Visual History", description:"Shows your last 10 attempts so you can track your improvement."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>The average human reaction time to a visual stimulus is between 200 and 250 milliseconds. Elite athletes and gamers often achieve times below 180ms.</p>
 <p>This test measures your cognitive processing speed and motor response. Factors like fatigue, caffeine, and screen refresh rates can all influence your final score.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion 
 faqs={[
 { question:"What is a good reaction time?", answer:"Around 200-250ms is average for adults. Anything under 200ms is considered excellent, often seen in competitive gamers."},
 { question:"Why did it say 'Too Early'?", answer:"You clicked while the screen was still red. This prevents cheating by anticipating the color change."},
 { question:"Does my monitor affect the score?", answer:"Yes. High refresh rate monitors (144Hz+) and low-latency mice will yield slightly faster results than standard 60Hz office equipment."}
 ]} 
 />

 <RelatedTools currentToolUrl="/tools/fun/reaction-time" max={6} />
 </div>
 );
}
