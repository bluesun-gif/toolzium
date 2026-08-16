"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Clock, Moon, Shield, ShieldCheck, TrendingUp } from"lucide-react";
import { toast } from"react-hot-toast";

export function SleepEfficiencyTrackerClient() {
 const [bedTime, setBedTime] = useState("22:00");
 const [sleepTime, setSleepTime] = useState("22:30");
 const [wakeTime, setWakeTime] = useState("06:30");
 const [outOfBedTime, setOutOfBedTime] = useState("07:00");
 const [awakenings, setAwakenings] = useState("1");
 const [awakeTimeTotal, setAwakeTimeTotal] = useState("15");
 
 useEffect(() => {
 const saved = localStorage.getItem("sleep-tracker-data");
 if (saved) {
 try {
 const data = JSON.parse(saved);
 setBedTime(data.bedTime ||"22:00");
 setSleepTime(data.sleepTime ||"22:30");
 setWakeTime(data.wakeTime ||"06:30");
 setOutOfBedTime(data.outOfBedTime ||"07:00");
 setAwakenings(data.awakenings ||"1");
 setAwakeTimeTotal(data.awakeTimeTotal ||"15");
 } catch (e) {}
 }
 }, []);

 const saveToStorage = () => {
 localStorage.setItem("sleep-tracker-data", JSON.stringify({
 bedTime, sleepTime, wakeTime, outOfBedTime, awakenings, awakeTimeTotal
 }));
 toast.success("Preferences saved!");
 };

 const handleReset = () => {
 setBedTime("22:00");
 setSleepTime("22:30");
 setWakeTime("06:30");
 setOutOfBedTime("07:00");
 setAwakenings("1");
 setAwakeTimeTotal("15");
 localStorage.removeItem("sleep-tracker-data");
 toast.success("Reset to defaults");
 };
 
 const parseTime = (timeStr: string) => {
 if (!timeStr) return 0;
 const [hours, mins] = timeStr.split(":").map(Number);
 return hours * 60 + mins;
 };
 
 const calculateDuration = (start: string, end: string) => {
 if (!start || !end) return 0;
 let s = parseTime(start);
 let e = parseTime(end);
 if (e < s) e += 24 * 60; // next day
 return e - s;
 };

 const timeInBed = calculateDuration(bedTime, outOfBedTime);
 const sleepLatency = calculateDuration(bedTime, sleepTime);
 const totalSleepTimeRaw = calculateDuration(sleepTime, wakeTime);
 const totalSleepTime = Math.max(0, totalSleepTimeRaw - Number(awakeTimeTotal));
 
 const efficiency = timeInBed > 0 ? (totalSleepTime / timeInBed) * 100 : 0;
 
 let rating ="Poor";
 let colorClass ="text-red-500";
 if (efficiency > 85) {
 rating ="Excellent";
 colorClass ="text-green-500";
 } else if (efficiency >= 80) {
 rating ="Good";
 colorClass ="text-emerald-400";
 } else if (efficiency >= 75) {
 rating ="Fair";
 colorClass ="text-yellow-500";
 }

 return (
 <div className={"space-y-6"}>
 <ToolPageHeader 
 icon={Moon} 
 title="Sleep Efficiency & Quality Tracker"
 description="Calculate your sleep efficiency percentage and clinical rating."
 actions={
 <div className={"flex space-x-2"}>
 <ResetButton onClick={handleReset} label="Reset"/>
 </div>
 }
 />
 
 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Logs</CardTitle>
 <CardDescription>Enter your times for the night</CardDescription>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"grid grid-cols-2 gap-4"}>
 <div className={"space-y-2"}>
 <Label>Time got into bed</Label>
 <Input type="time"value={bedTime} onChange={(e) => setBedTime(e.target.value)} onBlur={saveToStorage} />
 </div>
 <div className={"space-y-2"}>
 <Label>Time fell asleep</Label>
 <Input type="time"value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} onBlur={saveToStorage} />
 </div>
 <div className={"space-y-2"}>
 <Label>Wake-up time</Label>
 <Input type="time"value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} onBlur={saveToStorage} />
 </div>
 <div className={"space-y-2"}>
 <Label>Time got out of bed</Label>
 <Input type="time"value={outOfBedTime} onChange={(e) => setOutOfBedTime(e.target.value)} onBlur={saveToStorage} />
 </div>
 </div>
 
 <Separator />
 
 <div className={"grid grid-cols-2 gap-4"}>
 <div className={"space-y-2"}>
 <Label>Night awakenings (count)</Label>
 <Input type="number"min="0"value={awakenings} onChange={(e) => setAwakenings(e.target.value)} onBlur={saveToStorage} />
 </div>
 <div className={"space-y-2"}>
 <Label>Total awake time (mins)</Label>
 <Input type="number"min="0"value={awakeTimeTotal} onChange={(e) => setAwakeTimeTotal(e.target.value)} onBlur={saveToStorage} />
 </div>
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 <CardDescription>Your sleep efficiency score</CardDescription>
 </CardHeader>
 <CardContent className={"space-y-6"}>
 <div className={"flex flex-col items-center justify-center p-6 bg-secondary/20 rounded-lg"}>
 <div className={"text-5xl font-bold"+ colorClass}>{efficiency.toFixed(1)}%</div>
 <div className={"text-lg mt-2 font-medium"}>Rating: {rating}</div>
 </div>
 
 <div className={"grid grid-cols-2 gap-4 text-sm"}>
 <div className={"space-y-1 p-3 bg-card rounded border"}>
 <div className={"text-muted-foreground flex items-center gap-2"}><Clock className={"w-4 h-4"} /> Sleep Latency</div>
 <div className={"font-semibold text-lg"}>{sleepLatency} mins</div>
 </div>
 <div className={"space-y-1 p-3 bg-card rounded border"}>
 <div className={"text-muted-foreground flex items-center gap-2"}><Activity className={"w-4 h-4"} /> Total Sleep Time</div>
 <div className={"font-semibold text-lg"}>{Math.floor(totalSleepTime / 60)}h {totalSleepTime % 60}m</div>
 </div>
 </div>
 
 <div className={"space-y-2"}>
 <h4 className={"font-medium flex items-center gap-2"}><Shield className={"w-4 h-4"} /> Recommendations</h4>
 <ul className={"text-sm text-muted-foreground list-disc pl-5 space-y-1"}>
 {efficiency < 85 && <li>Limit time in bed to actual sleep time to increase efficiency.</li>}
 {sleepLatency > 20 && <li>Wind down for 30-60 minutes before bed if you struggle to fall asleep quickly.</li>}
 {Number(awakenings) > 2 && <li>Optimize bedroom environment (cool, dark, quiet) to reduce awakenings.</li>}
 {efficiency >= 85 && <li>Your sleep efficiency is optimal. Keep up the good habits!</li>}
 </ul>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Log Night",
    description:"Record times and wakes.",
    icon: Moon,
  },
{
    step:"02",
    title:"Compute",
    description:"See efficiency per night.",
    icon: Calculator,
  },
{
    step:"03",
    title:"Track",
    description:"View trends over time.",
    icon: TrendingUp,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Moon,
    title:"Log",
    description:"Nightly data.",
  },
{
    icon: Calculator,
    title:"Score",
    description:"Per-night efficiency.",
  },
{
    icon: TrendingUp,
    title:"Trends",
    description:"Over time.",
  },
{
    icon: ShieldCheck,
    title:"Quality",
    description:"Spot patterns.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A sleep efficiency tracker extends the calculator with history, logging each night's efficiency so you see whether rest quality is improving. Single nights mislead; trends reveal the truth. This tool charts the progression.</p>
  <p>Patterns emerge over weeks — caffeine timing, late screens, or stress. The tracker makes them visible.</p>
  <p>Use it as a sleep diary. The tool's value is trend-aware quality tracking.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Track vs calc?",
    answer:"Adds history and trends.",
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
    answer:"Improving sleep.",
  },
{
    question:"Score meaning?",
    answer:"Higher is better.",
  }
  ]}
/>
</div>
 );
}
