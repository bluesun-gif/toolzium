"use client";
<<<<<<< HEAD
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

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Timer, CheckCircle, BarChart2, Settings, Play, Pause, Square, Shield, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
type SessionType = "work" | "shortBreak" | "longBreak";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
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
    longBreak: 15
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
        const parsed = JSON.parse(savedLogs);
        if (Array.isArray(parsed)) setLogs(parsed);
      } catch (e) {}
    }
  }, []);
  const saveLog = (log: LogEntry) => {
    const updated = [log, ...logs];
    setLogs(updated);
    localStorage.setItem("pomodoroLogs", JSON.stringify(updated));
  };
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as {
        webkitAudioContext: typeof AudioContext;
      }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {}
  };
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsRunning(false);
            playChime();
            toast.success("Timer completed!");
            if (currentMode === "work") {
              saveLog({
                id: Date.now().toString(),
                date: new Date().toISOString(),
                duration: durations.work,
                task: currentTask || "Untitled Focus Task",
                type: "work"
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
    setDurations(prev => ({
      ...prev,
      [mode]: val
    }));
    if (currentMode === mode && !isRunning) {
      setTimeLeft(val * 60);
    }
  };
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };
  const todayStats = useMemo(() => {
    const today = new Date().toDateString();
    let totalMins = 0;
    let sessions = 0;
    logs.forEach(log => {
      if (new Date(log.date).toDateString() === today && log.type === "work") {
        totalMins += log.duration;
        sessions++;
      }
    });
    return {
      totalMins,
      sessions
    };
  }, [logs]);
  const handleResetAll = () => {
    setIsRunning(false);
    setLogs([]);
    localStorage.removeItem("pomodoroLogs");
    setTimeLeft(durations.work * 60);
    toast.success("Reset Pomodoro logs & timer!");
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Timer} title="Pomodoro Focus Timer & Work Session Analytics" description="Enhance focus productivity with a customizable Pomodoro timer, audio chimes, task logging, and daily session analytics." actions={<ResetButton onClick={handleResetAll} label="Reset Logs" />} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TIMER MAIN CARD */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Timer className="h-5 w-5 text-primary" /> Active Session Timer
            </CardTitle>
            <CardDescription>Select mode, input active task, and start your focus sprint.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-6 space-y-6">
            <div className="flex space-x-2 bg-muted/60 p-1.5 rounded-xl border border-border/60">
              <Button variant={currentMode === "work" ? "default" : "ghost"} onClick={() => changeMode("work")} size="sm" className="font-bold text-xs">
                💼 Work ({durations.work}m)
              </Button>
              <Button variant={currentMode === "shortBreak" ? "default" : "ghost"} onClick={() => changeMode("shortBreak")} size="sm" className="font-bold text-xs">
                ☕ Short Break ({durations.shortBreak}m)
              </Button>
              <Button variant={currentMode === "longBreak" ? "default" : "ghost"} onClick={() => changeMode("longBreak")} size="sm" className="font-bold text-xs">
                🌴 Long Break ({durations.longBreak}m)
              </Button>
            </div>

            <div className="text-7xl sm:text-8xl font-black tabular-nums text-primary tracking-tighter select-none my-4">
              {formatTime(timeLeft)}
            </div>

            <div className="w-full max-w-md space-y-2">
              <Label htmlFor="current-task">What are you working on?</Label>
              <Input id="current-task" placeholder="e.g. Writing documentation, Coding API..." value={currentTask} onChange={e => setCurrentTask(e.target.value)} disabled={isRunning} className="h-11 font-medium text-foreground text-center" />
            </div>

            <div className="flex gap-4 pt-2">
              <Button size="lg" onClick={toggleTimer} className={cn("w-36 font-bold h-12 text-base shadow-md gap-2", isRunning ? "bg-amber-500 hover:bg-amber-600 text-primary-foreground" : "bg-primary text-primary-foreground")}>
                {isRunning ? <>
                    <Pause className="h-5 w-5" /> Pause
                  </> : <>
                    <Play className="h-5 w-5" /> Start
                  </>}
              </Button>
              <Button size="lg" variant="outline" onClick={resetTimer} className="h-12 font-bold gap-2">
                <Square className="h-4 w-4" /> Reset
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        {/* SETTINGS & STATS */}
        <div className="space-y-6">
          <GlassCard>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <Settings className="h-4 w-4 text-primary" /> Timer Durations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="w-dur" className="text-xs">Work (Minutes)</Label>
                <Input id="w-dur" type="number" value={durations.work} onChange={e => updateDuration("work", parseInt(e.target.value))} disabled={isRunning} className="h-9 text-xs font-mono font-bold" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="sb-dur" className="text-xs">Short Break (Minutes)</Label>
                <Input id="sb-dur" type="number" value={durations.shortBreak} onChange={e => updateDuration("shortBreak", parseInt(e.target.value))} disabled={isRunning} className="h-9 text-xs font-mono font-bold" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lb-dur" className="text-xs">Long Break (Minutes)</Label>
                <Input id="lb-dur" type="number" value={durations.longBreak} onChange={e => updateDuration("longBreak", parseInt(e.target.value))} disabled={isRunning} className="h-9 text-xs font-mono font-bold" />
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <BarChart2 className="h-4 w-4 text-primary" /> Today&apos;s Focus Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-primary/10 border border-primary/20 p-3.5 rounded-xl text-center">
                  <div className="text-2xl font-black text-primary">{todayStats.totalMins}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Focus Mins</div>
                </div>
                <div className="bg-primary/10 border border-primary/20 p-3.5 rounded-xl text-center">
                  <div className="text-2xl font-black text-primary">{todayStats.sessions}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Completed</div>
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* ACTIVITY LOG CARD */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="h-5 w-5 text-primary" /> Focus Session History
          </CardTitle>
          <CardDescription>Recent completed work sessions and task timestamps.</CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? <div className="text-center py-8 text-muted-foreground text-xs italic border border-dashed border-border/80 rounded-xl">
              No sessions recorded today yet. Complete a Pomodoro timer sprint to record logs automatically.
            </div> : <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {logs.map(log => <div key={log.id} className="flex justify-between items-center p-3 rounded-xl border border-border/60 bg-muted/20">
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-foreground truncate">{log.task}</div>
                    <div className="text-[11px] text-muted-foreground">{new Date(log.date).toLocaleString()}</div>
                  </div>
                  <span className="text-xs font-black bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full shrink-0">
                    {log.duration} mins
                  </span>
                </div>)}
            </div>}
        </CardContent>
      </GlassCard>

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Set Focus Task",
        description: "Enter what you are working on and select standard 25-minute Pomodoro or custom durations.",
        icon: Timer
      }, {
        step: "02",
        title: "Sprint & Audio Chime",
        description: "Click Start. An audio chime signals when your work sprint or break session ends.",
        icon: Play
      }, {
        step: "03",
        title: "Track Daily Minutes",
        description: "Completed sessions log automatically into your daily focus minutes analytics.",
        icon: BarChart2
      }]} badges={["Pomodoro Method", "Audio Chimes", "Task Logs"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Timer,
        title: "Customizable Sprint Durations",
        description: "Configure work, short break, and long break durations to match your personal focus rhythm."
      }, {
        icon: BarChart2,
        title: "Daily Focus Analytics",
        description: "Calculates total focus minutes and completed sessions logged throughout the day."
      }, {
        icon: Shield,
        title: "100% Client-Side & Private",
        description: "Saves session history locally in your browser without requiring external account logins."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "What is the Pomodoro Technique?",
        answer: "The Pomodoro Technique is a time management method that breaks work into 25-minute focus intervals separated by short 5-minute breaks."
      }, {
        question: "Does the timer play an alert sound when finished?",
        answer: "Yes! A gentle Web Audio chime plays when the countdown reaches 0:00."
      }]} />

<<<<<<< HEAD
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
=======
      <RelatedTools currentToolUrl="/tools/productivity/pomodoro-analytics" max={6} />
    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
