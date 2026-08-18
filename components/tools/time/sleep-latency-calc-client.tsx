"use client";

import { cn } from "@/lib/utils";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Clock, Moon, Shield, ShieldCheck } from"lucide-react";

export function SleepLatencyClient() {
  const [time, setTime] = useState("07:00");
  const [mode, setMode] = useState("wake"); // wake or sleep

  const calculateTimes = () => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    const sleepLatencyMs = 15 * 60 * 1000;
    const cycleMs = 90 * 60 * 1000;
    const formatTime = (d: Date) => {
      return d.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    };
    const results = [];
    if (mode === "wake") {
      // Calculate bedtime (subtract cycles + latency)
      for (let cycles = 6; cycles >= 4; cycles--) {
        const bedTime = new Date(date.getTime() - cycles * cycleMs - sleepLatencyMs);
        results.push({
          cycles,
          hours: cycles * 90 / 60,
          time: formatTime(bedTime)
        });
      }
    } else {
      // Calculate wake time (add latency + cycles)
      for (let cycles = 4; cycles <= 6; cycles++) {
        const wakeTime = new Date(date.getTime() + sleepLatencyMs + cycles * cycleMs);
        results.push({
          cycles,
          hours: cycles * 90 / 60,
          time: formatTime(wakeTime)
        });
      }
    }
    return results;
  };
  const times = calculateTimes();
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Sleep Latency & Sleep Onset Calculator" description="Calculate optimal bedtimes based on sleep latency and 90-minute REM sleep cycles." icon={Moon} actions={<>
 <ResetButton onClick={() => {
          setTime("07:00");
          setMode("wake");
        }} label="Reset" />
 </>} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" /> Target Time</CardTitle>
 <CardDescription>Enter your target time to get optimal {mode === "wake" ? "bedtimes" : "wake times"}.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>I want to calculate my:</Label>
 <Select value={mode} onValueChange={setMode}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="wake">Bedtime (I know when I need to wake up)</SelectItem>
 <SelectItem value="sleep">Wake time (I am going to bed at)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Time</Label>
 <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
 </div>
 
 <div className="p-4 bg-muted/50 rounded-lg border mt-4">
 <p className="text-sm">
 <strong>Diagnostic Note:</strong> This calculator assumes an average <strong>sleep latency of 15 minutes</strong> (the time it takes to fall asleep). Sleep cycles last approximately 90 minutes.
 </p>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Optimal {mode === "wake" ? "Bedtimes" : "Wake Times"}</CardTitle>
 <CardDescription>Based on full 90-minute sleep cycles + 15 min to fall asleep</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {times.map((t, idx) => <div key={idx} className={cn("p-4 rounded-lg border flex justify-between items-center", idx === 1 ? "bg-primary/10 border-primary/20" : "")}>
 <div>
 <div className="font-bold text-2xl">{t.time}</div>
 <div className="text-sm text-muted-foreground">{t.cycles} sleep cycles</div>
 </div>
 <div className="text-right">
 <div className={cn("font-semibold", idx === 1 ? "text-primary" : "")}>{t.hours} hours sleep</div>
 <div className="text-xs text-muted-foreground">{idx === 1 ? "Recommended" : "Good"}</div>
 </div>
 </div>)}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Times",
    description:"Lights-out and asleep.",
    icon: Clock,
  },
{
    step:"02",
    title:"Compute",
    description:"See onset latency.",
    icon: Calculator,
  },
{
    step:"03",
    title:"Interpret",
    description:"Understand the number.",
    icon: Activity,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Clock,
    title:"Times",
    description:"Two endpoints.",
  },
{
    icon: Calculator,
    title:"Latency",
    description:"Onset in minutes.",
  },
{
    icon: Activity,
    title:"Interpret",
    description:"What it means.",
  },
{
    icon: ShieldCheck,
    title:"Track",
    description:"Over nights.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A sleep onset calculator measures the minutes from lights-out to actually sleeping, a key insomnia signal. Consistently long onset suggests a problem worth addressing. This tool computes and interprets the figure.</p>
  <p>Tracking onset over time shows whether habits help. The number is more honest than guesswork.</p>
  <p>Use it to understand your sleep. The tool's value is a precise onset metric for self-assessment.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/time/sleep-latency-calc" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What is onset?",
    answer:"Time from lights-out to sleep.",
  },
{
    question:"Normal?",
    answer:"Under 30 min is typical.",
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
    answer:"Sleep quality.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default SleepLatencyClient;
