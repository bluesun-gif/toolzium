"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Award, BedDouble, Calendar, Lightbulb, LineChart, Moon, Star, TrendingUp, History } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import toast from"react-hot-toast";

type LogEntry = {
  date: string;
  duration: number;
  score: number;
};
export function SleepQualityClient() {
  const [bedtime, setBedtime] = useState("22:30");
  const [waketime, setWaketime] = useState("06:30");
  const [interruptions, setInterruptions] = useState("0");
  const [fallAsleepTime, setFallAsleepTime] = useState("20");
  const [caffeine, setCaffeine] = useState("1");
  const [screenTime, setScreenTime] = useState("30");
  const [exercise, setExercise] = useState(true);
  const [results, setResults] = useState<{
    durationHours: number;
    efficiency: number;
    score: number;
    tips: string[];
  } | null>(null);
  const [history, setHistory] = useState<LogEntry[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("sleepLogs");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        // Handle parse error
      }
    }
  }, []);
  const calculateSleep = () => {
    let bedDate = new Date(`2000-01-01T${bedtime}`);
    let wakeDate = new Date(`2000-01-01T${waketime}`);
    if (wakeDate < bedDate) {
      wakeDate.setDate(wakeDate.getDate() + 1);
    }
    const timeInBedMs = wakeDate.getTime() - bedDate.getTime();
    const timeInBedMin = timeInBedMs / (1000 * 60);
    const fallAsleepMin = parseInt(fallAsleepTime) || 0;
    const interruptCount = parseInt(interruptions) || 0;

    // Estimate awake time during interruptions (approx 15 mins per interruption)
    const awakeMin = fallAsleepMin + interruptCount * 15;
    const timeAsleepMin = Math.max(0, timeInBedMin - awakeMin);
    const durationHours = parseFloat((timeAsleepMin / 60).toFixed(1));
    const efficiency = Math.min(100, Math.max(0, Math.round(timeAsleepMin / timeInBedMin * 100)));

    // Calculate Score
    let score = 100;

    // Duration penalty
    if (durationHours < 7) score -= (7 - durationHours) * 10;
    if (durationHours > 9) score -= (durationHours - 9) * 5;

    // Efficiency penalty
    if (efficiency < 85) score -= 85 - efficiency;

    // Habits penalty
    const cafCups = parseInt(caffeine) || 0;
    if (cafCups > 2) score -= (cafCups - 2) * 2;
    const screenMin = parseInt(screenTime) || 0;
    if (screenMin > 30) score -= screenMin / 30 * 2;
    if (!exercise) score -= 5;
    score = Math.min(100, Math.max(0, Math.round(score)));

    // Generate tips
    let tips = [];
    if (durationHours < 7) tips.push("Try to get at least 7-8 hours of sleep.");
    if (fallAsleepMin > 30) tips.push("You're taking a while to fall asleep. Try a relaxing pre-bed routine.");
    if (interruptCount > 1) tips.push("Minimize awakenings by keeping your room cool, dark, and quiet.");
    if (screenMin > 30) tips.push("Reduce screen time before bed. The blue light affects melatonin production.");
    if (cafCups > 2) tips.push("Cut back on caffeine, especially in the afternoon/evening.");
    if (!exercise) tips.push("Regular physical activity can significantly improve sleep quality.");
    if (tips.length === 0) tips.push("Great job! Keep up the good sleep habits.");
    setResults({
      durationHours,
      efficiency,
      score,
      tips
    });
  };
  const handleLog = () => {
    if (!results) return;
    const newLog = {
      date: new Date().toLocaleDateString(),
      duration: results.durationHours,
      score: results.score
    };
    const updatedHistory = [newLog, ...history].slice(0, 7); // keep last 7 days
    setHistory(updatedHistory);
    localStorage.setItem("sleepLogs", JSON.stringify(updatedHistory));
    toast.success("Sleep logged successfully!");
  };
  const handleReset = () => {
    setBedtime("22:30");
    setWaketime("06:30");
    setInterruptions("0");
    setFallAsleepTime("20");
    setCaffeine("1");
    setScreenTime("30");
    setExercise(true);
    setResults(null);
  };
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("sleepLogs");
    toast.success("History cleared");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Moon} title="Sleep Quality Analyzer" description="Analyze your sleep patterns, calculate efficiency, and get a sleep score." actions={<ResetButton onClick={handleReset} label="Reset" />} />
 
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Data</CardTitle>
 <CardDescription>Enter your sleep details for last night.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Bedtime</Label>
 <Input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Wake Time</Label>
 <Input type="time" value={waketime} onChange={e => setWaketime(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Time to Fall Asleep (min)</Label>
 <Input type="number" min="0" value={fallAsleepTime} onChange={e => setFallAsleepTime(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Interruptions (# of times)</Label>
 <Input type="number" min="0" value={interruptions} onChange={e => setInterruptions(e.target.value)} />
 </div>
 </div>
 
 <Separator />
 <h4 className="text-sm font-medium">Habits (Previous Day)</h4>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Caffeine Intake (cups)</Label>
 <Input type="number" min="0" value={caffeine} onChange={e => setCaffeine(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Screen Time before bed (min)</Label>
 <Input type="number" min="0" value={screenTime} onChange={e => setScreenTime(e.target.value)} />
 </div>
 <div className="space-y-2 flex flex-col justify-center">
 <Label className="mb-2">Exercised?</Label>
 <div className="flex items-center space-x-2">
 <Switch checked={exercise} onCheckedChange={setExercise} />
 <span className="text-sm">{exercise ? "Yes" : "No"}</span>
 </div>
 </div>
 </div>
 
 <Button onClick={calculateSleep} className="w-full mt-4">Analyze Sleep</Button>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Award className="w-5 h-5" /> Results
 </CardTitle>
 </CardHeader>
 <CardContent>
 {results ? <div className="space-y-6">
 <div className="grid grid-cols-3 gap-4 text-center">
 <div className="p-4 bg-muted/30 rounded-lg border">
 <div className="text-2xl font-bold text-primary">{results.score}</div>
 <div className="text-xs text-muted-foreground">Sleep Score</div>
 </div>
 <div className="p-4 bg-muted/30 rounded-lg border">
 <div className="text-2xl font-bold">{results.durationHours}h</div>
 <div className="text-xs text-muted-foreground">Duration</div>
 </div>
 <div className="p-4 bg-muted/30 rounded-lg border">
 <div className="text-2xl font-bold">{results.efficiency}%</div>
 <div className="text-xs text-muted-foreground">Efficiency</div>
 </div>
 </div>
 
 <div>
 <h4 className="font-semibold mb-2">Recommendations</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 {results.tips.map((tip, i) => <li key={i}>{tip}</li>)}
 </ul>
 </div>
 
 <Button variant="outline" className="w-full" onClick={handleLog}>Log This Sleep</Button>
 </div> : <div className="text-center py-8 text-muted-foreground text-sm">
 Enter your details and click Analyze Sleep to see your results.
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <CardTitle className="flex items-center gap-2">
 <Calendar className="w-5 h-5" /> Recent Logs
 </CardTitle>
 {history.length > 0 && <Button variant="ghost" size="sm" onClick={clearHistory} className="h-8">Clear</Button>}
 </CardHeader>
 <CardContent>
 {history.length > 0 ? <div className="space-y-3">
 {history.map((log, i) => <div key={i} className="flex justify-between items-center text-sm p-2 rounded-md bg-muted/30 border">
 <span className="font-medium">{log.date}</span>
 <div className="flex gap-4">
 <span className="text-muted-foreground">{log.duration}h</span>
 <span className={log.score >= 80 ? "text-green-500 font-bold" : log.score >= 60 ? "text-yellow-500 font-bold" : "text-red-500 font-bold"}>
 Score: {log.score}
 </span>
 </div>
 </div>)}
 </div> : <div className="text-center py-4 text-muted-foreground text-sm">
 No sleep logs yet.
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Log Factors",
    description:"Enter duration, awakenings, feel.",
    icon: BedDouble,
  },
{
    step:"02",
    title:"Rate",
    description:"Score your sleep quality.",
    icon: Star,
  },
{
    step:"03",
    title:"Review",
    description:"Spot patterns over time.",
    icon: LineChart,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: BedDouble,
    title:"Factor Log",
    description:"Duration and disruptions.",
  },
{
    icon: Star,
    title:"Quality Score",
    description:"Simple rating.",
  },
{
    icon: LineChart,
    title:"Trends",
    description:"See what helps.",
  },
{
    icon: Lightbulb,
    title:"Tips",
    description:"Improvement suggestions.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A sleep quality analyzer looks beyond hours to how restorative sleep is. Duration alone misleads; fragmented or late sleep feels poor despite length. This tool logs duration, awakenings, and a quality rating, revealing patterns behind good and bad nights.</p>
  <p>Environment and consistency drive quality. Dark, cool rooms and regular timing help more than chasing extra hours at erratic times. The analyzer's trends show which habits correlate with better rest, guiding changes.</p>
  <p>Persistent poor sleep warrants professional review. The tool's value is making restfulness measurable, so you can act on causes rather than just counting hours.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/sleep-quality" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What affects quality?",
    answer:"Duration, consistency, environment.",
  },
{
    question:"Track it?",
    answer:"Yes, patterns reveal causes.",
  },
{
    question:"Score meaning?",
    answer:"Self-rating of restfulness.",
  },
{
    question:"Improve it?",
    answer:"Dark, cool, consistent schedule.",
  },
{
    question:"Medical?",
    answer:"Persistent issues deserve review.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default SleepQualityClient;
