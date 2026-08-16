"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import React, { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Calculator, Clock, DollarSign, TrendingDown, Users } from"lucide-react";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";

export function MeetingCostClient() {
 const [attendees, setAttendees] = useState(5);
 const [avgSalary, setAvgSalary] = useState(100000);
 const [durationMins, setDurationMins] = useState(60);
 
 const [isRunning, setIsRunning] = useState(false);
 const [elapsedSeconds, setElapsedSeconds] = useState(0);

 // Constants
 const HOURS_PER_YEAR = 2080;
 
 const hourlyRate = avgSalary / HOURS_PER_YEAR;
 const minuteRate = hourlyRate / 60;
 const secondRate = minuteRate / 60;
 
 const totalCost = (attendees * minuteRate * durationMins);
 const costPerMin = attendees * minuteRate;
 
 useEffect(() => {
 let interval: NodeJS.Timeout | undefined;
 if (isRunning) {
 interval = setInterval(() => {
 setElapsedSeconds(prev => prev + 1);
 }, 1000);
 } else {
 clearInterval(interval);
 }
 return () => clearInterval(interval);
 }, [isRunning]);

 const liveCost = attendees * secondRate * elapsedSeconds;

 const comparisons = useMemo(() => {
 return {
 coffee: Math.floor(totalCost / 4),
 netflix: Math.floor(totalCost / 15.49)
 }
 }, [totalCost]);

 return (
 <div className="space-y-6">
 <ToolPageHeader
 title="Meeting Cost Calculator"
 description="Calculate the true financial cost of your meetings."
 icon={DollarSign}
 actions={
 <></>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Meeting Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Number of Attendees</Label>
 <Input
 type="number"
 min={1}
 value={attendees}
 onChange={(e) => setAttendees(Number(e.target.value) || 0)}
 />
 </div>
 <div className="space-y-2">
 <Label>Average Annual Salary ($)</Label>
 <Input
 type="number"
 min={0}
 value={avgSalary}
 onChange={(e) => setAvgSalary(Number(e.target.value) || 0)}
 />
 </div>
 <div className="space-y-2">
 <Label>Planned Duration (minutes)</Label>
 <Input
 type="number"
 min={1}
 value={durationMins}
 onChange={(e) => setDurationMins(Number(e.target.value) || 0)}
 />
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardContent className="p-6">
 <div className="text-center">
 <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Estimated Cost</p>
 <h2 className="text-5xl font-bold text-red-500">${totalCost.toFixed(2)}</h2>
 </div>
 <Separator className="my-6"/>
 <div className="grid grid-cols-2 gap-4 text-center">
 <div>
 <p className="text-sm text-muted-foreground">Cost per Minute</p>
 <p className="text-xl font-semibold">${costPerMin.toFixed(2)}</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">Cost per Attendee</p>
 <p className="text-xl font-semibold">${(totalCost / Math.max(1, attendees)).toFixed(2)}</p>
 </div>
 </div>
 <Separator className="my-6"/>
 <div className="text-center space-y-4">
 <div>
 <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Live Cost Tracker</p>
 <h3 className="text-3xl font-mono font-bold text-orange-500">${liveCost.toFixed(4)}</h3>
 </div>
 <div className="flex justify-center gap-2">
 <Button variant={isRunning ?"destructive":"default"} onClick={() => setIsRunning(!isRunning)}>
 {isRunning ?"Stop Timer":"Start Meeting"}
 </Button>
 <Button variant="outline"onClick={() => { setIsRunning(false); setElapsedSeconds(0); }}>
 Reset
 </Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg">This meeting costs the same as:</CardTitle>
 </CardHeader>
 <CardContent className="space-y-2">
 <div className="flex items-center gap-2">
 ☕ <span><strong>{comparisons.coffee}</strong> cups of coffee ($4/each)</span>
 </div>
 <div className="flex items-center gap-2">
 📺 <span><strong>{comparisons.netflix}</strong> months of Netflix ($15.49/mo)</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Attendees",
    description:"Add count and salaries.",
    icon: Users,
  },
{
    step:"02",
    title:"Set Time",
    description:"Input duration.",
    icon: Clock,
  },
{
    step:"03",
    title:"Calculate",
    description:"See total cost.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Users,
    title:"Attendees",
    description:"Number and rates.",
  },
{
    icon: Clock,
    title:"Duration",
    description:"Meeting length.",
  },
{
    icon: Calculator,
    title:"Cost",
    description:"Total payroll cost.",
  },
{
    icon: TrendingDown,
    title:"Insight",
    description:"Encourages efficiency.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A meeting cost calculator puts a dollar figure on gathered time, often shocking teams into meeting hygiene. Multiplying attendees' hourly rates by duration reveals the real price of a recurring sync. This tool makes that visible.</p>
  <p>The number drives behavior. Seeing a one-hour meeting with ten senior staff costs thousands justifies tighter agendas and fewer attendees. Cost awareness improves efficiency.</p>
  <p>Use it to audit meeting culture. The tool's value is quantifying time so decisions about gatherings are economical.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why calculate?",
    answer:"Reveals true cost of time.",
  },
{
    question:"Salary based?",
    answer:"Uses hourly equivalents.",
  },
{
    question:"Useful?",
    answer:"Justifies shorter meetings.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Accurate?",
    answer:"Estimate from inputs.",
  }
  ]}
/>
</div>
 );
}
