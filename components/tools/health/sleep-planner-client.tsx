"use client";

import { cn } from "@/lib/utils";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { AlarmClock, Calculator, Clock, Moon, Repeat, Sparkles, Sun } from"lucide-react";
import { ResetButton } from"@/components/shared/action-buttons";

export function SleepPlannerClient() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const [mode, setMode] = useState<"wake" | "bed">("wake");
  const calculateTimes = () => {
    const cycleLength = 90; // minutes
    const sleepLatency = 15; // minutes to fall asleep
    const results = [];
    if (mode === "wake") {
      const [hours, minutes] = wakeTime.split(":").map(Number);
      const wakeDate = new Date();
      wakeDate.setHours(hours, minutes, 0, 0);
      for (let cycles = 6; cycles >= 3; cycles--) {
        const bedTime = new Date(wakeDate.getTime() - (cycles * cycleLength + sleepLatency) * 60000);
        results.push({
          cycles,
          time: bedTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });
      }
    } else {
      const bedDate = new Date();
      bedDate.setMinutes(bedDate.getMinutes() + sleepLatency);
      for (let cycles = 3; cycles <= 6; cycles++) {
        const wakeUpTime = new Date(bedDate.getTime() + cycles * cycleLength * 60000);
        results.push({
          cycles,
          time: wakeUpTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });
      }
    }
    return results;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Moon} title="Sleep Cycle Calculator" description="Calculate optimal bedtimes based on 90-minute sleep cycles." actions={<React.Fragment>
 <ResetButton onClick={() => setWakeTime("07:00")} label="Reset" />
 </React.Fragment>} />
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Calculation Mode</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex gap-4">
 <Button variant={mode === "wake" ? "default" : "outline"} onClick={() => setMode("wake")}>I want to wake up at...</Button>
 <Button variant={mode === "bed" ? "default" : "outline"} onClick={() => setMode("bed")}>I'm going to bed now</Button>
 </div>
 
 {mode === "wake" && <div className="space-y-2">
 <Label>Wake up time</Label>
 <Input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} />
 </div>}
 
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>{mode === "wake" ? "Suggested Bedtimes" : "Suggested Wake Times"}</CardTitle>
 <CardDescription>Includes 15 minutes to fall asleep</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid gap-3">
 {calculateTimes().map((result, i) => <div key={i} className={cn("p-4 rounded-lg flex justify-between items-center", i === 1 ? "bg-primary/10 border border-primary" : "bg-muted")}>
 <div>
 <p className="font-semibold text-lg">{result.time}</p>
 <p className="text-sm text-muted-foreground">{result.cycles} cycles ({result.cycles * 1.5} hours)</p>
 </div>
 {i === 1 && <Sparkles className="h-5 w-5 text-primary" />}
 </div>)}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Bedtime",
    description:"Add when you plan to sleep.",
    icon: Moon,
  },
{
    step:"02",
    title:"Set Cycles",
    description:"Choose cycles to target.",
    icon: Repeat,
  },
{
    step:"03",
    title:"Calculate",
    description:"See optimal wake times.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Moon,
    title:"Bedtime Based",
    description:"Works forward from sleep.",
  },
{
    icon: Repeat,
    title:"Cycle Count",
    description:"Pick 4 to 6 cycles.",
  },
{
    icon: Calculator,
    title:"Wake Times",
    description:"Multiple options.",
  },
{
    icon: AlarmClock,
    title:"Plan Ahead",
    description:"Set alarms accordingly.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A sleep cycle calculator plans wake times from when you fall asleep, adding 90-minute cycle multiples. Ending a cycle rather than interrupting one reduces grogginess. This tool suggests several wake times so you can set alarms that align with your rhythm.</p>
  <p>Cycle count sets total sleep; four to six covers most adults' needs. The calculator maps these to clock times, making planning concrete instead of guessing &quot;eight hours from now.&quot;</p>
  <p>Use it to build a stable routine, the strongest predictor of good rest. The tool's value is a wake-time plan grounded in sleep architecture, helping you rise feeling alert.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/sleep-planner" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"Bedtime to wake?",
    answer:"Adds cycle multiples to bedtime.",
  },
{
    question:"How many cycles?",
    answer:"4 to 6 covers typical need.",
  },
{
    question:"Refreshed wake?",
    answer:"Ending a cycle helps.",
  },
{
    question:"Exact?",
    answer:"Estimates; varies.",
  },
{
    question:"Use nightly?",
    answer:"Yes, builds routine.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default SleepPlannerClient;
