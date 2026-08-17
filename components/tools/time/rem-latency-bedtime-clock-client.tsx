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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { AlarmClock, Calculator, Clock, Moon, Shield, ShieldCheck, Sun } from"lucide-react";

export function RemLatencyBedtimeClockClient() {
  const [latency, setLatency] = useState("15");
  const [targetWakeTime, setTargetWakeTime] = useState("07:00");
  const [mode, setMode] = useState<"wake" | "now">("wake");
  const [results, setResults] = useState<{
    cycles: number;
    timeStr: string;
    duration: string;
  }[]>([]);
  useEffect(() => {
    calculateTimes();
  }, [latency, targetWakeTime, mode]);
  const calculateTimes = () => {
    const latMins = parseInt(latency);
    const cycleLength = 90;
    let baseTime = new Date();
    if (mode === "wake") {
      const [hours, minutes] = targetWakeTime.split(":").map(Number);
      baseTime.setHours(hours, minutes, 0, 0);
      const newResults = [];
      for (let cycles = 6; cycles >= 4; cycles--) {
        const totalSleepTime = cycles * cycleLength;
        const totalTimeNeeded = totalSleepTime + latMins;
        const bedTime = new Date(baseTime.getTime() - totalTimeNeeded * 60000);
        newResults.push({
          cycles,
          timeStr: bedTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          duration: totalSleepTime / 60 + "hrs"
        });
      }
      setResults(newResults);
    } else {
      baseTime = new Date();
      const newResults = [];
      for (let cycles = 4; cycles <= 6; cycles++) {
        const totalSleepTime = cycles * cycleLength;
        const totalTimeNeeded = totalSleepTime + latMins;
        const wakeTime = new Date(baseTime.getTime() + totalTimeNeeded * 60000);
        newResults.push({
          cycles,
          timeStr: wakeTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          duration: totalSleepTime / 60 + "hrs"
        });
      }
      setResults(newResults.reverse());
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Clock} title="REM Sleep Cycle & Bedtime Clock" description="Calculate optimal bedtime and wake-up times based on 90-minute REM sleep cycles and sleep onset latency." />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Configuration</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex gap-4">
 <Button variant={mode === "wake" ? "default" : "outline"} className="flex-1" onClick={() => setMode("wake")}>
 <Sun className="w-4 h-4 mr-2" /> I want to wake up at
 </Button>
 <Button variant={mode === "now" ? "default" : "outline"} className="flex-1" onClick={() => setMode("now")}>
 <Moon className="w-4 h-4 mr-2" /> I am going to sleep now
 </Button>
 </div>

 {mode === "wake" && <div className="space-y-2">
 <Label>Target Wake-up Time</Label>
 <Input type="time" value={targetWakeTime} onChange={e => setTargetWakeTime(e.target.value)} />
 </div>}

 <div className="space-y-2">
 <Label>Sleep Onset Latency (Time it takes to fall asleep)</Label>
 <Select value={latency} onValueChange={setLatency}>
 <SelectTrigger>
 <SelectValue placeholder="Select latency" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="5">5 minutes (Fast)</SelectItem>
 <SelectItem value="10">10 minutes</SelectItem>
 <SelectItem value="15">15 minutes (Average)</SelectItem>
 <SelectItem value="20">20 minutes</SelectItem>
 <SelectItem value="30">30 minutes (Slow)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <Button className="w-full" onClick={calculateTimes}>
 Refresh Times
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>
 {mode === "wake" ? "Optimal Bedtimes" : "Optimal Wake Times"}
 </CardTitle>
 <CardDescription>
 Based on {latency} mins latency + 90 min cycles
 </CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {results.map((res, idx) => <div key={idx} className="p-4 border rounded-md flex items-center justify-between">
 <div>
 <div className="text-2xl font-bold text-primary">{res.timeStr}</div>
 <div className="text-sm text-muted-foreground">
 {res.cycles} cycles ({res.duration} sleep)
 </div>
 </div>
 {res.cycles === 5 || res.cycles === 6 ? <div className="flex items-center text-sm font-medium text-green-500">
 <Shield className="w-4 h-4 mr-1" /> Recommended
 </div> : null}
 </div>)}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Wake",
    description:"Enter target wake time.",
    icon: AlarmClock,
  },
{
    step:"02",
    title:"Latency",
    description:"Add fall-asleep delay.",
    icon: Moon,
  },
{
    step:"03",
    title:"Compute",
    description:"See cycle-aligned bedtimes.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: AlarmClock,
    title:"Wake",
    description:"Your target.",
  },
{
    icon: Moon,
    title:"Latency",
    description:"Time to fall asleep.",
  },
{
    icon: Calculator,
    title:"Bedtimes",
    description:"Multiple options.",
  },
{
    icon: ShieldCheck,
    title:"Fresh Wake",
    description:"Ends a cycle.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A REM bedtime clock factors in your fall-asleep latency and 90-minute cycles to suggest bedtimes that end a cycle at your wake time, so you rise refreshed. Latency shifts the math realistically. This tool computes several options.</p>
  <p>Accounting for latency avoids the common error of ignoring time-to-sleep. The result aligns with your body's rhythm.</p>
  <p>Use it to plan sleep precisely. The tool's value is latency-aware, cycle-aligned bedtimes.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Latency?",
    answer:"Minutes to fall asleep.",
  },
{
    question:"Why cycles?",
    answer:"Wake at cycle end, feel fresh.",
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
    answer:"Better sleep.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default RemLatencyBedtimeClockClient;
