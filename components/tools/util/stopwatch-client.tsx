"use client";

import { useState, useRef, useEffect, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { ScrollArea } from"@/components/ui/scroll-area";
import { Play, Square, TimerReset, Flag, Copy, BookOpen, Shield, Timer, BarChart3, Zap, Pause, RotateCcw } from"lucide-react";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import toast from"react-hot-toast";

interface Lap {
 id: number;
 time: number;
 overall: number;
}

export default function StopwatchClient() {
 const [isRunning, setIsRunning] = useState(false);
 const [time, setTime] = useState(0);
 const [laps, setLaps] = useState<Lap[]>([]);

 const requestRef = useRef<number | undefined>(undefined);
 const startTimeRef = useRef<number>(0);
 const accumulatedTimeRef = useRef<number>(0);
 const timeRef = useRef<number>(0);

 const animate = useCallback((currentTime: number) => {
 const deltaTime = currentTime - startTimeRef.current;
 const newTime = accumulatedTimeRef.current + deltaTime;
 timeRef.current = newTime;
 setTime(newTime);
 requestRef.current = requestAnimationFrame(animate);
 }, []);

 useEffect(() => {
 if (isRunning) {
 startTimeRef.current = performance.now();
 requestRef.current = requestAnimationFrame(animate);
 } else {
 if (requestRef.current) {
 cancelAnimationFrame(requestRef.current);
 }
 accumulatedTimeRef.current = timeRef.current;
 }
 return () => {
 if (requestRef.current) {
 cancelAnimationFrame(requestRef.current);
 }
 };
 }, [isRunning, animate]);

 const handleStartStop = useCallback(() => {
 setIsRunning((prev) => !prev);
 }, []);

 const handleLap = useCallback(() => {
 if (!isRunning) return;
 setLaps((prevLaps) => {
 const prevTotal = prevLaps.length > 0 ? prevLaps[0].overall : 0;
 const lapTime = timeRef.current - prevTotal;
 return [{ id: prevLaps.length + 1, time: lapTime, overall: timeRef.current }, ...prevLaps];
 });
 }, [isRunning]);

 const handleReset = useCallback(() => {
 setIsRunning(false);
 setTime(0);
 timeRef.current = 0;
 accumulatedTimeRef.current = 0;
 setLaps([]);
 }, []);

 const recordLap = useCallback(() => {
 if (!isRunning && timeRef.current === 0) return;
 
 setLaps((prevLaps) => {
 const prevTotal = prevLaps.length > 0 ? prevLaps[0].overall : 0;
 const lapTime = timeRef.current - prevTotal;
 const newLap: Lap = {
 id: prevLaps.length + 1,
 time: lapTime,
 overall: timeRef.current,
 };
 return [newLap, ...prevLaps];
 });
 }, [isRunning]);

 useEffect(() => {
 // Keyboard shortcuts
 const handleKeyDown = (e: KeyboardEvent) => {
 if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
 
 if (e.code ==="Space") {
 e.preventDefault();
 handleStartStop();
 } else if (e.code ==="KeyL") {
 e.preventDefault();
 recordLap();
 } else if (e.code ==="KeyR") {
 e.preventDefault();
 handleReset();
 }
 };

 window.addEventListener("keydown", handleKeyDown);
 return () => window.removeEventListener("keydown", handleKeyDown);
 }, [handleStartStop, recordLap, handleReset]);

 const formatTime = (ms: number) => {
 if (ms === 0) return"00:00.00";
 const totalMs = Math.floor(ms);
 const milliseconds = Math.floor((totalMs % 1000) / 10).toString().padStart(2,"0");
 const seconds = Math.floor((totalMs / 1000) % 60).toString().padStart(2,"0");
 const minutes = Math.floor(totalMs / (1000 * 60)).toString().padStart(2,"0");
 
 return `${minutes}:${seconds}.${milliseconds}`;
 };

 const copyLaps = () => {
 if (laps.length === 0) {
 toast.error("Record some laps first.");
 return;
 }
 const text = laps
 .map((lap) => `Lap ${lap.id}: ${formatTime(lap.time)} (Total: ${formatTime(lap.overall)})`)
 .join("\n");
 navigator.clipboard.writeText(text);
 toast.success("Lap times copied to clipboard.");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader 
 title="Stopwatch"
 description="A precise stopwatch with lap recording and millisecond accuracy. Features keyboard shortcuts for quick control."
 />
 
 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
 <Card className="md:col-span-1 lg:col-span-2 flex flex-col">
 <CardHeader>
 <CardTitle>Timer</CardTitle>
 <CardDescription>
 Keyboard shortcuts: <kbd className="px-1 py-0.5 bg-muted rounded border text-xs">Space</kbd> Start/Stop · <kbd className="px-1 py-0.5 bg-muted rounded border text-xs">L</kbd> Lap · <kbd className="px-1 py-0.5 bg-muted rounded border text-xs">R</kbd> Reset
 </CardDescription>
 </CardHeader>
 <CardContent className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
 <div className="font-mono text-6xl md:text-8xl lg:text-9xl font-bold tabular-nums tracking-tight">
 {formatTime(time)}
 </div>
 
 <div className="flex flex-wrap gap-4 justify-center w-full max-w-md">
 <Button 
 size="lg"
 variant={isRunning ?"destructive":"default"} 
 className="flex-1 min-w-32 h-16 text-lg"
 onClick={handleStartStop}
 >
 {isRunning ? (
 <><Square className="mr-2 h-5 w-5 fill-current"/> Stop</>
 ) : (
 <><Play className="mr-2 h-5 w-5 fill-current"/> Start</>
 )}
 </Button>
 
 <Button 
 size="lg"
 variant="secondary"
 className="flex-1 min-w-32 h-16 text-lg"
 onClick={handleLap}
 disabled={!isRunning}
 >
 <Flag className="mr-2 h-5 w-5"/> Lap
 </Button>
 
 <Button 
 size="lg"
 variant="outline"
 className="flex-1 min-w-32 h-16 text-lg"
 onClick={handleReset}
 disabled={time === 0}
 >
 <TimerReset className="mr-2 h-5 w-5"/> Reset
 </Button>
 </div>
 </CardContent>
 </Card>

 <Card className="flex flex-col h-[500px] md:h-auto md:min-h-[500px]">
 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
 <div className="space-y-1">
 <CardTitle>Laps</CardTitle>
 <CardDescription>{laps.length} recorded</CardDescription>
 </div>
 <Button variant="ghost"size="icon"onClick={copyLaps} disabled={laps.length === 0} title="Copy laps">
 <Copy className="h-4 w-4"/>
 </Button>
 </CardHeader>
 <CardContent className="flex-1 p-0 overflow-hidden relative">
 {laps.length === 0 ? (
 <div className="absolute inset-0 flex items-center justify-center text-muted-foreground p-6 text-center">
 No laps recorded yet. Start the timer and click Lap to record.
 </div>
 ) : (
 <ScrollArea className="h-full absolute inset-0">
 <div className="space-y-4 px-6 pb-6 pt-2">
 {laps.map((lap) => (
 <div key={lap.id} className="flex justify-between items-center py-2 border-b last:border-0">
 <div className="text-sm font-medium text-muted-foreground">
 Lap {lap.id}
 </div>
 <div className="text-right">
 <div className="font-mono font-semibold">
 +{formatTime(lap.time)}
 </div>
 <div className="font-mono text-sm text-muted-foreground">
 {formatTime(lap.overall)}
 </div>
 </div>
 </div>
 ))}
 </div>
 </ScrollArea>
 )}
 </CardContent>
 </Card>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Start Timing",
 description:"Click Start to begin the stopwatch. It counts up from 0:00.000 with millisecond precision, displayed in large, readable digits.",
 icon: Play,
 },
 {
 step:"02",
 title:"Record Laps",
 description:"Hit Lap to record a split time without stopping the clock. Each lap shows both the lap duration and the total elapsed time.",
 icon: Flag,
 },
 {
 step:"03",
 title:"Pause & Reset",
 description:"Pause at any moment to freeze the time, then resume where you left off. Reset clears all laps and returns the timer to zero.",
 icon: RotateCcw,
 },
 ]}
 badges={[
"Millisecond precision",
"Lap recording",
"Keyboard shortcuts",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Timer,
 title:"Millisecond Precision",
 description:"Times to the millisecond (1/1000 of a second) using performance.now() for high-resolution timing. Accurate for sports, lab experiments, and performance benchmarking.",
 },
 {
 icon: Flag,
 title:"Lap & Split Times",
 description:"Record unlimited lap times with a single keystroke. Each lap shows the time for that interval (split time) and the cumulative total elapsed time.",
 },
 {
 icon: BarChart3,
 title:"Lap Statistics",
 description:"After multiple laps, see your fastest lap, slowest lap, and average lap time — useful for training analysis, process timing, and performance review.",
 },
 {
 icon: Zap,
 title:"Keyboard Shortcuts",
 description:"Space bar to start/pause, L to record a lap, R to reset — operate the stopwatch without touching the mouse for minimal interference during timed activities.",
 },
 {
 icon: Play,
 title:"Unlimited Laps",
 description:"Record as many laps as needed. The lap list is scrollable with all splits preserved until you reset. Export all laps to CSV for analysis.",
 },
 {
 icon: Shield,
 title:"Client-Side & Accurate",
 description:"Uses the browser's performance.now() high-resolution timer. No server dependency — works fully offline. Your timing data is never transmitted anywhere.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Stopwatch Guide — Precision Timing for Sports, Science & Productivity</h3>
 <p>
 A stopwatch is the fundamental tool for measuring elapsed time with precision. From
 tracking athletic performance to timing lab experiments, coding benchmarks, or cooking
 intervals, understanding how to use lap timing and split times effectively can reveal
 patterns invisible to casual observation.
 </p>

 <h4 className="font-semibold">Lap Time vs Split Time — What's the Difference?</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Lap #</th>
 <th className="border p-2 text-left">Lap Time (interval)</th>
 <th className="border p-2 text-left">Split Time (cumulative)</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Lap 1","1:23.45","1:23.45"],
 ["Lap 2","1:21.87","2:45.32"],
 ["Lap 3","1:24.10","4:09.42"],
 ["Lap 4","1:19.95","5:29.37"],
 ].map(([lap, lapTime, split]) => (
 <tr key={lap} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{lap}</td>
 <td className="border p-2 font-mono text-primary text-xs">{lapTime}</td>
 <td className="border p-2 font-mono text-xs">{split}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <p className="text-xs text-muted-foreground">Lap Time = time for that interval only. Split Time = total elapsed time at that point.</p>

 <h4 className="font-semibold">Stopwatch Use Cases by Field</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Field</th>
 <th className="border p-2 text-left">What to Time</th>
 <th className="border p-2 text-left">Precision Needed</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Running / Athletics","Sprint times, lap splits","0.01 seconds"],
 ["Swimming","50m / 100m lap times","0.01 seconds"],
 ["Cooking","Cooking intervals, resting time","Seconds"],
 ["Presentations","Talk rehearsal timing","Seconds"],
 ["Software dev","Function benchmark, test runtime","Milliseconds"],
 ["Science lab","Reaction timing, experiment duration","Milliseconds"],
 ["Language learning","Timed reading or speaking drills","Seconds"],
 ["Game speed runs","Route segment times","Milliseconds"],
 ].map(([field, what, precision]) => (
 <tr key={field} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{field}</td>
 <td className="border p-2 text-xs">{what}</td>
 <td className="border p-2 text-muted-foreground text-xs">{precision}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"How accurate is a browser-based stopwatch?",
 answer:"This stopwatch uses performance.now(), which provides sub-millisecond resolution. However, browser tab throttling (when the tab is in the background) can affect accuracy for long runs. For professional sports timing or scientific measurements, use a dedicated hardware stopwatch. For most practical purposes — training, cooking, presentations — browser precision is more than sufficient.",
 },
 {
 question:"What is the difference between a lap time and a split time?",
 answer:"A lap time (interval time) is the duration of just that segment — from the previous lap press to the current one. A split time is the total cumulative elapsed time from the start to the current lap press. Example: if Lap 1 = 1:30 and Lap 2 lap time = 1:25, the Lap 2 split time is 2:55.",
 },
 {
 question:"Can I export my lap times?",
 answer:"Yes, use the copy or download button to export all recorded lap times as a CSV file. Open in Excel or Google Sheets for analysis — calculate averages, identify fastest/slowest laps, or create pace charts.",
 },
 {
 question:"Does the stopwatch continue running in the background?",
 answer:"Yes, the timer continues when you switch tabs. However, browsers throttle background tabs to save CPU, which can cause minor timing drift over long periods. For the most accurate timing, keep the stopwatch tab active and visible.",
 },
 {
 question:"Are there keyboard shortcuts for the stopwatch?",
 answer:"Yes: Spacebar starts/pauses the timer, L records a lap, R resets the timer. Keyboard shortcuts let you operate the stopwatch without disrupting your activity — essential when your hands are occupied during timed tasks.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/util/stopwatch"max={6} />
 </div>
 );
}
