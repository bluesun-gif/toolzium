"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { ResetButton } from"@/components/shared/action-buttons";
import { AlarmClock, Calculator, Clock, Moon, Shield, ShieldCheck, Sun } from"lucide-react";
import { cn } from"@/lib/utils";

export function RemBedtimeClockClient() {
  const [time, setTime] = useState("07:00");
  const [isWakeUp, setIsWakeUp] = useState(true);
  const calculateTimes = () => {
    if (!time) return [];
    const [hours, minutes] = time.split(":").map(Number);
    const baseDate = new Date();
    baseDate.setHours(hours, minutes, 0, 0);
    const fallAsleepDelay = 14 * 60000;
    const cycleDuration = 90 * 60000;
    const cyclesToCalc = [6, 5, 4];
    return cyclesToCalc.map(cycles => {
      let targetTime;
      if (isWakeUp) {
        targetTime = new Date(baseDate.getTime() - cycles * cycleDuration - fallAsleepDelay);
      } else {
        targetTime = new Date(baseDate.getTime() + cycles * cycleDuration + fallAsleepDelay);
      }
      return {
        cycles,
        hours: cycles * 1.5,
        time: targetTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
    });
  };
  const results = calculateTimes();
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Clock} title="REM Sleep Cycle & Bedtime Alarm Clock" description="Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles." actions={<React.Fragment>
 <ResetButton onClick={() => setTime("07:00")} label="Reset" />
 </React.Fragment>} />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Settings</CardTitle>
 <CardDescription>Include 14-min average sleep onset latency</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex items-center space-x-4">
 <Label className={cn(isWakeUp ? "text-muted-foreground" : "font-bold")}>Bedtime</Label>
 <Switch checked={isWakeUp} onCheckedChange={setIsWakeUp} />
 <Label className={cn(!isWakeUp ? "text-muted-foreground" : "font-bold")}>Wake-up time</Label>
 </div>
 
 <div className="space-y-2">
 <Label>{isWakeUp ? "I want to wake up at" : "I am going to bed at"}</Label>
 <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>{isWakeUp ? "Optimal Bedtimes" : "Optimal Wake Times"}</CardTitle>
 <CardDescription>Based on 90-minute sleep cycles</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {results.map((res, i) => <div key={i} className="p-4 bg-muted rounded-md border flex justify-between items-center">
 <div>
 <div className="font-bold text-xl">{res.time}</div>
 <div className="text-sm text-muted-foreground">{res.cycles + "cycles (" + res.hours + "hrs)"}</div>
 </div>
 {isWakeUp ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-amber-500" />}
 </div>)}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Wake",
    description:"Enter wake time.",
    icon: AlarmClock,
  },
{
    step:"02",
    title:"Cycle Length",
    description:"Use ~90-minute cycles.",
    icon: Moon,
  },
{
    step:"03",
    title:"Compute",
    description:"See ideal bedtimes.",
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
    title:"Cycles",
    description:"90-min sleeps.",
  },
{
    icon: Calculator,
    title:"Bedtimes",
    description:"Multiple options.",
  },
{
    icon: ShieldCheck,
    title:"Wake Fresh",
    description:"Align to cycle end.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A REM bedtime calculator works backward from your wake time using ~90-minute sleep cycles, suggesting bedtimes that end a cycle so you wake refreshed rather than mid-deep-sleep. Multiple options give flexibility. This tool computes them.</p>
  <p>Waking at a cycle boundary reduces grogginess. The calculator turns sleep science into a simple schedule.</p>
  <p>Use it to plan sleep. The tool's value is cycle-aligned bedtimes for easier mornings.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is REM?",
    answer:"A sleep stage in 90-min cycles.",
  },
{
    question:"Why align?",
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
    answer:"Better mornings.",
  }
  ]}
/>
</div>
 );
}
