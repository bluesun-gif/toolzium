"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { AlarmClock, Clock, Moon, Repeat, Shield, ShieldCheck, Sun, Calculator, Settings } from "lucide-react";
import toast from"react-hot-toast";

export function RemSleepAlarmClient() {
  const [mode, setMode] = useState("wakeup");
  const [time, setTime] = useState("07:00");
  const handleReset = () => {
    setTime("07:00");
    setMode("wakeup");
    toast.success("Reset");
  };
  const calculateTimes = () => {
    if (!time) return [];
    const [hours, minutes] = time.split(":").map(Number);
    const baseDate = new Date();
    baseDate.setHours(hours, minutes, 0, 0);
    const cycleLength = 90;
    const fallAsleepTime = 14;
    const results: {
      cycles: number;
      timeStr: string;
      duration: number;
    }[] = [];
    [6, 5, 4].forEach(cycles => {
      const targetDate = new Date(baseDate);
      if (mode === "wakeup") {
        targetDate.setMinutes(targetDate.getMinutes() - cycles * cycleLength - fallAsleepTime);
      } else {
        targetDate.setMinutes(targetDate.getMinutes() + cycles * cycleLength + fallAsleepTime);
      }
      const formatted = targetDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      results.push({
        cycles,
        timeStr: formatted,
        duration: cycles * 1.5
      });
    });
    return results;
  };
  const results = calculateTimes();
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Clock} title="REM Sleep Cycle & Wakeup Alarm Calculator" description="Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles." actions={<ResetButton onClick={handleReset} label="Reset" />} />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Settings</CardTitle>
 <CardDescription>Enter your schedule details.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>I want to calculate...</Label>
 <Select value={mode} onValueChange={setMode}>
 <SelectTrigger>
 <SelectValue placeholder="Select mode" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="wakeup">Bedtime (I know my wake-up time)</SelectItem>
 <SelectItem value="bedtime">Wake-up Time (I know my bedtime)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>{mode === "wakeup" ? "Desired Wake-up Time" : "Current Bedtime"}</Label>
 <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
 </div>
 
 <div className={"text-sm text-muted-foreground p-4 bg-secondary/50 rounded-md mt-4"}>
 Note: Calculations include a 14-minute average sleep onset latency.
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>{mode === "wakeup" ? "Optimal Bedtimes" : "Optimal Wake-up Times"}</CardTitle>
 <CardDescription>Based on 90-minute REM cycles.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {results.map((res, i) => <div key={i} className="flex justify-between items-center p-4 border rounded-md">
 <div className="flex items-center gap-3">
 {mode === "wakeup" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-amber-500" />}
 <div>
 <div className="font-bold text-lg">{res.timeStr}</div>
 <div className="text-sm text-muted-foreground">{res.cycles} cycles ({res.duration} hrs sleep)</div>
 </div>
 </div>
 {i === 1 && <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">Recommended</span>}
 </div>)}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Bed",
    description:"Enter bedtime.",
    icon: Moon,
  },
{
    step:"02",
    title:"Cycles",
    description:"Choose number of cycles.",
    icon: Repeat,
  },
{
    step:"03",
    title:"Compute",
    description:"See ideal wake times.",
    icon: AlarmClock,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Moon,
    title:"Bedtime",
    description:"When you sleep.",
  },
{
    icon: Repeat,
    title:"Cycles",
    description:"Pick 4 to 6.",
  },
{
    icon: AlarmClock,
    title:"Wake",
    description:"Suggested times.",
  },
{
    icon: ShieldCheck,
    title:"Align",
    description:"Ends a cycle.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A REM wakeup calculator works forward from bedtime across chosen 90-minute cycles to suggest wake times that land at a cycle boundary, minimizing grogginess. More cycles mean more sleep; the tool shows the trade-off. This tool computes the options.</p>
  <p>Waking at a cycle's end rather than mid-deep-sleep is the core sleep-hack. The calculator makes it precise.</p>
  <p>Use it to set your alarm smartly. The tool's value is cycle-aligned wake times for easier mornings.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How many cycles?",
    answer:"Usually 4 to 6 per night.",
  },
{
    question:"Why?",
    answer:"Wake at cycle end, less groggy.",
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
    answer:"Setting alarm.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default RemSleepAlarmClient;
