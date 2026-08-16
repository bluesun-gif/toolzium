"use client";
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
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { Activity, ArrowRightLeft, Clock, Moon, Shield, ShieldCheck, Sun } from"lucide-react";
import toast from"react-hot-toast";

export function RemSleepClockClient() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const [bedTimes, setBedTimes] = useState<{
    cycles: number;
    time: string;
    isOptimal: boolean;
  }[]>([]);
  const [wakeUpTimes, setWakeUpTimes] = useState<{
    cycles: number;
    time: string;
    isOptimal: boolean;
  }[]>([]);
  const SLEEP_LATENCY = 14; // minutes
  const CYCLE_LENGTH = 90; // minutes

  const calculateBedTimes = () => {
    if (!wakeTime) return;
    const [hours, minutes] = wakeTime.split(":").map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(hours, minutes, 0, 0);
    const times = [];
    for (let cycles = 6; cycles >= 4; cycles--) {
      const totalMinutes = cycles * CYCLE_LENGTH + SLEEP_LATENCY;
      const bedDate = new Date(wakeDate.getTime() - totalMinutes * 60000);
      times.push({
        cycles,
        time: bedDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isOptimal: cycles === 5 || cycles === 6
      });
    }
    setBedTimes(times);
    setWakeUpTimes([]);
  };
  const calculateWakeUpTimes = () => {
    const now = new Date();
    const times = [];
    for (let cycles = 4; cycles <= 6; cycles++) {
      const totalMinutes = cycles * CYCLE_LENGTH + SLEEP_LATENCY;
      const wakeDate = new Date(now.getTime() + totalMinutes * 60000);
      times.push({
        cycles,
        time: wakeDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isOptimal: cycles === 5 || cycles === 6
      });
    }
    setWakeUpTimes(times.reverse());
    setBedTimes([]);
  };
  const handleReset = () => {
    setWakeTime("07:00");
    setBedTimes([]);
    setWakeUpTimes([]);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Moon} title="REM Sleep Cycle Clock" description="Calculate optimal sleep & wake times based on 90-minute REM sleep cycles." actions={<ResetButton onClick={handleReset} label="Reset" />} />
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>I want to wake up at...</CardTitle>
 <CardDescription>Find the best time to go to bed</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Wake up time</Label>
 <Input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} />
 </div>
 <Button className="w-full" onClick={calculateBedTimes}>
 <Clock className="mr-2 h-4 w-4" /> Calculate Bedtimes
 </Button>
 
 {bedTimes.length > 0 && <div className="mt-6 space-y-4">
 <h4 className="font-semibold text-sm">Suggested Bedtimes (including 14 min to fall asleep):</h4>
 <div className="grid gap-3">
 {bedTimes.map((item, i) => <div key={i} className={cn("p-4 border rounded-md flex justify-between items-center", item.isOptimal ? "bg-primary/10 border-primary" : "bg-muted")}>
 <div>
 <div className="font-bold text-lg">{item.time}</div>
 <div className="text-sm text-muted-foreground">{item.cycles} Cycles ({item.cycles * 1.5} Hours)</div>
 </div>
 {item.isOptimal && <span className="text-xs font-bold text-primary">RECOMMENDED</span>}
 </div>)}
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>I am going to sleep now</CardTitle>
 <CardDescription>Find the best time to wake up</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <Button className="w-full" variant="secondary" onClick={calculateWakeUpTimes}>
 <Sun className="mr-2 h-4 w-4" /> Sleep Now
 </Button>
 
 {wakeUpTimes.length > 0 && <div className="mt-6 space-y-4">
 <h4 className="font-semibold text-sm">Suggested Wake-up Times:</h4>
 <div className="grid gap-3">
 {wakeUpTimes.map((item, i) => <div key={i} className={cn("p-4 border rounded-md flex justify-between items-center", item.isOptimal ? "bg-primary/10 border-primary" : "bg-muted")}>
 <div>
 <div className="font-bold text-lg">{item.time}</div>
 <div className="text-sm text-muted-foreground">{item.cycles} Cycles ({item.cycles * 1.5} Hours)</div>
 </div>
 {item.isOptimal && <span className="text-xs font-bold text-primary">RECOMMENDED</span>}
 </div>)}
 </div>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Time",
    description:"Bedtime or wake time.",
    icon: Clock,
  },
{
    step:"02",
    title:"Direction",
    description:"Compute the other end.",
    icon: ArrowRightLeft,
  },
{
    step:"03",
    title:"View",
    description:"See the cycle map.",
    icon: Activity,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Clock,
    title:"Input",
    description:"Either endpoint.",
  },
{
    icon: ArrowRightLeft,
    title:"Both Ways",
    description:"Bed to wake or reverse.",
  },
{
    icon: Activity,
    title:"Cycle Map",
    description:"Visual rhythm.",
  },
{
    icon: ShieldCheck,
    title:"Align",
    description:"Cycle-aware.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A REM sleep clock maps your night in 90-minute cycles from whichever end you provide, showing where cycle boundaries fall. Whether you set bedtime or wake time, it computes the partner. This tool visualizes the rhythm.</p>
  <p>Seeing the boundaries helps you pick a wake that avoids deep sleep. The clock turns the science into a simple schedule.</p>
  <p>Use it for any sleep plan. The tool's value is a two-way, cycle-aware sleep map.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Bed or wake?",
    answer:"Enter either, get the other.",
  },
{
    question:"Why cycles?",
    answer:"Align to feel fresh.",
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
    answer:"Sleep planning.",
  }
  ]}
/>
</div>
 );
}
