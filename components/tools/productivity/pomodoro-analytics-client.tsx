"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect, useRef, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { BarChart2, BarChart3, CheckCircle, CheckCircle2, Pause, Play, Settings, Square, Timer, TrendingUp } from"lucide-react";
import toast from"react-hot-toast";

type SessionType ="work"|"shortBreak"|"longBreak";

type LogEntry = {
 id: string;
 date: string;
 duration: number; // in minutes
 task: string;
 type: SessionType;
};

export function PomodoroAnalyticsClient() {
 const [durations, setDurations] = useState({
 work: 25,
 shortBreak: 5,
 longBreak: 15,
 });
 const [currentMode, setCurrentMode] = useState<SessionType>("work");
 const [timeLeft, setTimeLeft] = useState(durations.work * 60);
 const [isRunning, setIsRunning] = useState(false);
 const [currentTask, setCurrentTask] = useState("");
 const [logs, setLogs] = useState<LogEntry[]>([]);
 
 const timerRef = useRef<NodeJS.Timeout | null>(null);

 useEffect(() => {
 const savedLogs = localStorage.getItem("pomodoroLogs");
 if (savedLogs) {
 try {
 setLogs(JSON.parse(savedLogs));
 } catch (e) {
 // ignore
 }
 }
 }, []);

 const saveLog = (log: LogEntry) => {
 const updated = [log, ...logs];
 setLogs(updated);
 localStorage.setItem("pomodoroLogs", JSON.stringify(updated));
 };

 const playChime = () => {
 try {
 const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
 const osc = ctx.createOscillator();
 const gain = ctx.createGain();
 osc.connect(gain);
 gain.connect(ctx.destination);
 osc.type ="sine";
 osc.frequency.setValueAtTime(880, ctx.currentTime);
 gain.gain.setValueAtTime(1, ctx.currentTime);
 gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
 osc.start(ctx.currentTime);
 osc.stop(ctx.currentTime + 1.5);
 } catch (e) {
 console.error("Audio not supported");
 }
 };

 useEffect(() => {
 if (isRunning) {
 timerRef.current = setInterval(() => {
 setTimeLeft((prev) => {
 if (prev <= 1) {
 clearInterval(timerRef.current!);
 setIsRunning(false);
 playChime();
 toast.success("Timer completed!");
 
 if (currentMode ==="work") {
 saveLog({
 id: Date.now().toString(),
 date: new Date().toISOString(),
 duration: durations.work,
 task: currentTask ||"Untitled Task",
 type:"work",
 });
 }
 return 0;
 }
 return prev - 1;
 });
 }, 1000);
 } else if (timerRef.current) {
 clearInterval(timerRef.current);
 }
 return () => {
 if (timerRef.current) clearInterval(timerRef.current);
 };
 }, [isRunning, currentMode, currentTask, durations.work]);

 const toggleTimer = () => setIsRunning(!isRunning);

 const resetTimer = () => {
 setIsRunning(false);
 setTimeLeft(durations[currentMode] * 60);
 };

 const changeMode = (mode: SessionType) => {
 setIsRunning(false);
 setCurrentMode(mode);
 setTimeLeft(durations[mode] * 60);
 };

 const updateDuration = (mode: SessionType, val: number) => {
 if (isNaN(val) || val < 1) return;
 setDurations((prev) => ({ ...prev, [mode]: val }));
 if (currentMode === mode && !isRunning) {
 setTimeLeft(val * 60);
 }
 };

 const formatTime = (seconds: number) => {
 const m = Math.floor(seconds / 60);
 const s = seconds % 60;
 return (m < 10 ?"0":"") + m +":"+ (s < 10 ?"0":"") + s;
 };

 const todayStats = useMemo(() => {
 const today = new Date().toDateString();
 let totalMins = 0;
 let sessions = 0;
 logs.forEach((log) => {
 if (new Date(log.date).toDateString() === today && log.type ==="work") {
 totalMins += log.duration;
 sessions++;
 }
 });
 return { totalMins, sessions };
 }, [logs]);

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Timer}
 title="Pomodoro Tracker & Log"
 description="Enhance productivity with a customizable timer and daily task logging."
 actions={<></>}
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <GlassCard className="lg:col-span-2">
 <CardHeader>
 <CardTitle>Timer</CardTitle>
 </CardHeader>
 <CardContent className="flex flex-col items-center">
 <div className="flex space-x-2 mb-8 bg-muted p-1 rounded-lg">
 <Button 
 variant={currentMode ==="work"?"default":"ghost"}
 onClick={() => changeMode("work")}
 size="sm"
 >
 Work
 </Button>
 <Button 
 variant={currentMode ==="shortBreak"?"default":"ghost"}
 onClick={() => changeMode("shortBreak")}
 size="sm"
 >
 Short Break
 </Button>
 <Button 
 variant={currentMode ==="longBreak"?"default":"ghost"}
 onClick={() => changeMode("longBreak")}
 size="sm"
 >
 Long Break
 </Button>
 </div>

 <div className="text-8xl font-bold tabular-nums mb-8 text-primary tracking-tighter">
 {formatTime(timeLeft)}
 </div>

 <div className="w-full max-w-sm space-y-4 mb-8">
 <div className="space-y-2">
 <label className="text-sm font-medium">What are you working on?</label>
 <Input 
 placeholder="e.g. Studying, Coding, Writing..."
 value={currentTask}
 onChange={(e) => setCurrentTask(e.target.value)}
 disabled={isRunning}
 />
 </div>
 </div>

 <div className="flex gap-4">
 <Button 
 size="lg"
 onClick={toggleTimer}
 className={"w-32"+ (isRunning ?"bg-orange-500 hover:bg-orange-600":"")}
 >
 {isRunning ? (
 <><Pause className="mr-2 h-5 w-5"/> Pause</>
 ) : (
 <><Play className="mr-2 h-5 w-5"/> Start</>
 )}
 </Button>
 <Button 
 size="lg"
 variant="outline"
 onClick={resetTimer}
 >
 <Square className="mr-2 h-5 w-5"/> Reset
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Settings className="h-5 w-5"/> Settings
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <label className="text-sm font-medium">Work Duration (min)</label>
 <Input 
 type="number"
 value={durations.work} 
 onChange={(e) => updateDuration("work", parseInt(e.target.value))}
 disabled={isRunning}
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Short Break (min)</label>
 <Input 
 type="number"
 value={durations.shortBreak} 
 onChange={(e) => updateDuration("shortBreak", parseInt(e.target.value))}
 disabled={isRunning}
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Long Break (min)</label>
 <Input 
 type="number"
 value={durations.longBreak} 
 onChange={(e) => updateDuration("longBreak", parseInt(e.target.value))}
 disabled={isRunning}
 />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <BarChart2 className="h-5 w-5"/> Today's Stats
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-primary/10 p-4 rounded-lg text-center">
 <div className="text-3xl font-bold text-primary">{todayStats.totalMins}</div>
 <div className="text-xs text-muted-foreground uppercase mt-1">Focus Mins</div>
 </div>
 <div className="bg-primary/10 p-4 rounded-lg text-center">
 <div className="text-3xl font-bold text-primary">{todayStats.sessions}</div>
 <div className="text-xs text-muted-foreground uppercase mt-1">Sessions</div>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <CheckCircle className="h-5 w-5"/> Activity Log
 </CardTitle>
 <CardDescription>Recent completed work sessions</CardDescription>
 </CardHeader>
 <CardContent>
 {logs.length === 0 ? (
 <div className="text-center py-8 text-muted-foreground">
 No sessions recorded yet. Complete a work timer to see logs here.
 </div>
 ) : (
 <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
 {logs.map((log) => (
 <div key={log.id} className="flex justify-between items-center p-3 border rounded-lg bg-card">
 <div>
 <div className="font-medium">{log.task}</div>
 <div className="text-xs text-muted-foreground">
 {new Date(log.date).toLocaleString()}
 </div>
 </div>
 <div className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
 {log.duration} min
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </GlassCard>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Start Session",
    description:"Begin a focus interval.",
    icon: Timer,
  },
{
    step:"02",
    title:"Log",
    description:"Auto-record completed blocks.",
    icon: BarChart3,
  },
{
    step:"03",
    title:"Review",
    description:"See your focus trends.",
    icon: TrendingUp,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Timer,
    title:"Intervals",
    description:"Standard 25/5 blocks.",
  },
{
    icon: BarChart3,
    title:"Log",
    description:"History of sessions.",
  },
{
    icon: TrendingUp,
    title:"Analytics",
    description:"Focus over time.",
  },
{
    icon: CheckCircle2,
    title:"Consistency",
    description:"Daily totals.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A Pomodoro tracker logs your focus intervals so you can see how much deep work you actually complete, not just intend. The technique's value is in repetition; the tracker makes the repetition visible. This tool records sessions and charts trends.</p>
  <p>Trends reveal when you focus best and where time leaks. The analytics turn vague &quot;I worked hard&quot; into measured minutes.</p>
  <p>Use it through your workday. The tool's value is quantified focus that guides better scheduling.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does it track?",
    answer:"Completed focus intervals and minutes.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  },
{
    question:"Use case?",
    answer:"Deep work measurement.",
  },
{
    question:"Export?",
    answer:"Review your log.",
  }
  ]}
/>
</div>
 );
}
