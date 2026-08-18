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
import { ResetButton } from"@/components/shared/action-buttons";
import { Calculator, Clock, Flame, Moon, Shield, Target, TrendingUp } from"lucide-react";

export function SleepDebtClient() {
  const [targetSleep, setTargetSleep] = useState<number>(8);
  const [sleepData, setSleepData] = useState<number[]>([7, 7, 7, 7, 7, 7, 7]);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const handleDayChange = (index: number, val: string) => {
    const num = parseFloat(val);
    const newData = [...sleepData];
    newData[index] = isNaN(num) ? 0 : num;
    setSleepData(newData);
  };
  const handleReset = () => {
    setTargetSleep(8);
    setSleepData([7, 7, 7, 7, 7, 7, 7]);
  };
  const totalDebt = sleepData.reduce((acc, hours) => {
    const debt = targetSleep - hours;
    return acc + (debt > 0 ? debt : 0);
  }, 0);
  const totalSurplus = sleepData.reduce((acc, hours) => {
    const surplus = hours - targetSleep;
    return acc + (surplus > 0 ? surplus : 0);
  }, 0);
  const netDebt = Math.max(0, totalDebt - totalSurplus);
  let severity = "None";
  let color = "text-green-500";
  if (netDebt > 0 && netDebt <= 4) {
    severity = "Mild";
    color = "text-yellow-500";
  } else if (netDebt > 4 && netDebt <= 10) {
    severity = "Moderate";
    color = "text-orange-500";
  } else if (netDebt > 10) {
    severity = "Severe";
    color = "text-red-500";
  }
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Moon} title="Sleep Debt & Recovery Calculator" description="Calculate accumulated sleep debt over a 7-day week and recovery plan." actions={<React.Fragment>
 <ResetButton onClick={handleReset} label="Reset" />
 </React.Fragment>} />

 <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Log</CardTitle>
 <CardDescription>Enter your target and actual sleep hours.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2 mb-6">
 <Label className="text-lg font-semibold">Target Sleep per Night (Hours)</Label>
 <Input type="number" step="0.5" value={targetSleep} onChange={e => setTargetSleep(parseFloat(e.target.value) || 0)} />
 </div>
 
 <div className="space-y-3">
 {days.map((day, idx) => <div key={day} className="flex items-center justify-between gap-4">
 <Label className="w-24">{day}</Label>
 <Input type="number" step="0.5" min="0" max="24" value={sleepData[idx]} onChange={e => handleDayChange(idx, e.target.value)} className="w-32" />
 <span className="text-xs text-muted-foreground w-20 text-right">
 {targetSleep - sleepData[idx] > 0 ? "+" + (targetSleep - sleepData[idx]).toFixed(1) + "debt" : targetSleep - sleepData[idx] < 0 ? "-" + (sleepData[idx] - targetSleep).toFixed(1) + "surplus" : "Met"}
 </span>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Deficit Summary</CardTitle>
 <CardDescription>Your weekly sleep debt analysis</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex flex-col items-center justify-center py-6">
 <span className="text-4xl font-bold mb-2">{netDebt.toFixed(1)} hrs</span>
 <span className="text-sm text-muted-foreground">Total Net Sleep Debt</span>
 </div>
 <Separator />
 <div className="flex justify-between items-center py-2">
 <span className="font-medium">Severity Rating:</span>
 <span className={cn("font-bold", color)}>{severity}</span>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Recovery Plan</CardTitle>
 <CardDescription>Recommended weekend schedule</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {netDebt === 0 ? <div className="flex items-center gap-2 text-green-500">
 <Shield className="w-5 h-5" />
 <span>Great job! You have no sleep debt. Keep up the consistent schedule.</span>
 </div> : <div className="space-y-3 text-sm">
 <p>To safely recover without disrupting your circadian rhythm (internal clock):</p>
 <ul className="list-disc pl-5 space-y-2">
 <li><strong>Do not binge sleep:</strong> Limit weekend recovery sleep to max +1 to 2 hours per night above your target.</li>
 <li><strong>Napping:</strong> Take a 20-30 minute power nap in the early afternoon instead of sleeping in excessively.</li>
 <li><strong>Gradual recovery:</strong> With a debt of {netDebt.toFixed(1)} hrs, aim to add an extra 30-60 minutes of sleep each night over the next {Math.ceil(netDebt / 1)} to {Math.ceil(netDebt / 0.5)} days.</li>
 </ul>
 {severity === "Severe" && <div className="flex items-start gap-2 text-red-500 mt-4 bg-red-500/10 p-3 rounded-md">
 <Flame className="w-5 h-5 shrink-0 mt-0.5" />
 <p>Your sleep debt is severe. Consider adopting a stricter bedtime routine and prioritizing sleep consistency over the next two weeks.</p>
 </div>}
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Log Sleep",
    description:"Enter nightly hours.",
    icon: Moon,
  },
{
    step:"02",
    title:"Set Need",
    description:"Your baseline requirement.",
    icon: Target,
  },
{
    step:"03",
    title:"Compute",
    description:"See debt and recovery.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Moon,
    title:"Log",
    description:"Per-night hours.",
  },
{
    icon: Target,
    title:"Baseline",
    description:"Your need.",
  },
{
    icon: Calculator,
    title:"Debt",
    description:"Accumulated gap.",
  },
{
    icon: TrendingUp,
    title:"Recovery",
    description:"Catch-up plan.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A sleep debt calculator totals the gap between the sleep you got and what you needed, showing accumulated deficit and a catch-up path. Small nightly shortfalls compound into real impairment. This tool quantifies the debt.</p>
  <p>Recovery planning matters; the calculator suggests how extra sleep restores balance. Awareness alone motivates better habits.</p>
  <p>Use it to track rest. The tool's value is a clear picture of sleep shortfall and recovery.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/time/sleep-debt" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What is sleep debt?",
    answer:"Shortfall vs your need.",
  },
{
    question:"Recoverable?",
    answer:"Partly, with extra sleep.",
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
    answer:"Tracking rest.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default SleepDebtClient;
