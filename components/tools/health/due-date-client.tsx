"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { Baby, Calculator, Calendar, Clock, Heart, HeartPulse, Settings2 } from"lucide-react";

export function DueDateClient() {
 const [lmpDate, setLmpDate] = useState<string>(() => {
 const today = new Date();
 today.setMonth(today.getMonth() - 2);
 return today.toISOString().split('T')[0];
 });

 const {
 dueDate,
 conceptionDate,
 currentWeek,
 currentDay,
 trimester,
 daysRemaining,
 milestones
 } = useMemo(() => {
 if (!lmpDate) return { dueDate: null, conceptionDate: null, currentWeek: 0, currentDay: 0, trimester: 1, daysRemaining: 0, milestones: [] };

 const lmp = new Date(lmpDate);
 if (isNaN(lmp.getTime())) return { dueDate: null, conceptionDate: null, currentWeek: 0, currentDay: 0, trimester: 1, daysRemaining: 0, milestones: [] };

 // Naegele's rule: add 280 days
 const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
 const conception = new Date(lmp.getTime() + 14 * 24 * 60 * 60 * 1000);

 const today = new Date();
 const diffTime = today.getTime() - lmp.getTime();
 const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
 
 const weeks = Math.floor(diffDays / 7);
 const days = diffDays % 7;
 
 let curWeek = 0;
 let curDay = 0;
 let daysRem = 0;
 let trim = 1;
 
 if (diffDays >= 0 && diffDays <= 294) { 
 curWeek = weeks;
 curDay = days;
 daysRem = Math.max(0, 280 - diffDays);
 if (weeks < 13) trim = 1;
 else if (weeks < 27) trim = 2;
 else trim = 3;
 }

 const ms = [
 { name:"First Heartbeat (approx)", date: new Date(lmp.getTime() + 6 * 7 * 24 * 60 * 60 * 1000), week: 6 },
 { name:"End of First Trimester", date: new Date(lmp.getTime() + 13 * 7 * 24 * 60 * 60 * 1000), week: 13 },
 { name:"First Kick (approx)", date: new Date(lmp.getTime() + 20 * 7 * 24 * 60 * 60 * 1000), week: 20 },
 { name:"Viability", date: new Date(lmp.getTime() + 24 * 7 * 24 * 60 * 60 * 1000), week: 24 },
 { name:"Full Term", date: new Date(lmp.getTime() + 37 * 7 * 24 * 60 * 60 * 1000), week: 37 },
 { name:"Estimated Due Date", date: due, week: 40 },
 ];

 return {
 dueDate: due,
 conceptionDate: conception,
 currentWeek: curWeek,
 currentDay: curDay,
 trimester: trim,
 daysRemaining: daysRem,
 milestones: ms
 };
 }, [lmpDate]);

 const handleReset = () => {
 const today = new Date();
 today.setMonth(today.getMonth() - 2);
 setLmpDate(today.toISOString().split('T')[0]);
 };

 const formatDate = (date: Date | null) => {
 if (!date) return"";
 return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={HeartPulse}
 title="Pregnancy Due Date Calculator"
 description="Estimate your due date and track key milestones based on your last menstrual period."
 actions={
 <>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calendar className="h-5 w-5"/> Details
 </CardTitle>
 <CardDescription>Enter the first day of your last period</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>First Day of Last Menstrual Period (LMP)</Label>
 <Input
 type="date"
 value={lmpDate}
 onChange={(e) => setLmpDate(e.target.value)}
 />
 </div>
 
 <Separator className="my-4"/>
 
 <div className="space-y-2">
 <p className="text-sm text-muted-foreground mb-1">Estimated Conception Date:</p>
 <p className="font-medium">{formatDate(conceptionDate)}</p>
 </div>
 
 <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 text-center">
 <p className="text-sm font-medium text-primary mb-1">Estimated Due Date</p>
 <p className="text-2xl font-bold text-primary">{formatDate(dueDate)}</p>
 </div>

 <div className="text-xs text-muted-foreground pt-2">
 <strong>Disclaimer:</strong> This calculator is for informational purposes only. Only 4% of babies are born on their exact due date. Please consult your healthcare provider for medical advice.
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Clock className="h-5 w-5"/> Timeline & Progress
 </CardTitle>
 <CardDescription>Your current status and upcoming milestones</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 
 {currentWeek > 0 && currentWeek <= 42 ? (
 <div className="grid grid-cols-3 gap-2 text-center mb-6">
 <div className="bg-secondary p-2 rounded-md">
 <p className="text-xs text-muted-foreground">Current</p>
 <p className="font-bold">{currentWeek}w {currentDay}d</p>
 </div>
 <div className="bg-secondary p-2 rounded-md">
 <p className="text-xs text-muted-foreground">Trimester</p>
 <p className="font-bold">{trimester}</p>
 </div>
 <div className="bg-secondary p-2 rounded-md">
 <p className="text-xs text-muted-foreground">Days Left</p>
 <p className="font-bold">{daysRemaining}</p>
 </div>
 </div>
 ) : (
 <p className="text-sm text-muted-foreground text-center italic mb-4">Date is outside the typical pregnancy range.</p>
 )}

 <div className="space-y-4">
 <h4 className="font-semibold text-sm">Key Milestones</h4>
 <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary before:to-transparent">
 {milestones.map((m, i) => (
 <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
 <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-primary text-primary-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
 <Heart className="w-3 h-3"/>
 </div>
 <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-border bg-card shadow-sm">
 <div className="flex items-center justify-between mb-1">
 <div className="font-bold text-sm text-primary">Week {m.week}</div>
 <time className="text-xs font-medium text-muted-foreground">{m.date.toLocaleDateString()}</time>
 </div>
 <div className="text-xs text-muted-foreground">{m.name}</div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter LMP",
    description:"Add last menstrual period date.",
    icon: Calendar,
  },
{
    step:"02",
    title:"Adjust",
    description:"Account for cycle length if needed.",
    icon: Settings2,
  },
{
    step:"03",
    title:"Calculate",
    description:"See estimated due date.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Calendar,
    title:"LMP Based",
    description:"Standard obstetric method.",
  },
{
    icon: Settings2,
    title:"Cycle Aware",
    description:"Adjusts for irregular lengths.",
  },
{
    icon: Calculator,
    title:"Date Estimate",
    description:"Approximate delivery window.",
  },
{
    icon: Baby,
    title:"Trimester View",
    description:"Shows pregnancy stages.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A due date calculator estimates delivery timing from the last menstrual period, the standard obstetric starting point. Pregnancy is counted as about 40 weeks from LMP, not from conception, which occurs roughly two weeks later. This tool adds that span to your date, giving an approximate due window.</p>
  <p>Cycle length matters. The 40-week rule assumes a 28-day cycle; longer or shorter cycles shift ovulation and the true date. The calculator can adjust for this, improving the estimate. Still, only about 5 percent of babies arrive exactly on the date, so treat it as a range.</p>
  <p>This supports, not replaces, prenatal care. Ultrasound dating refines the estimate, especially with irregular cycles. The tool's value is a quick, personalized expectation you can discuss with your provider, grounding the pregnancy timeline in a clear number.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How is due date estimated?",
    answer:"About 40 weeks from the last menstrual period.",
  },
{
    question:"Accurate?",
    answer:"An estimate; actual birth varies by weeks.",
  },
{
    question:"What if cycles are irregular?",
    answer:"Ultrasound dating is more precise.",
  },
{
    question:"Why 40 weeks?",
    answer:"Counted from LMP, not conception.",
  },
{
    question:"Medical use?",
    answer:"Confirm with your clinician.",
  }
  ]}
/>
</div>
 );
}
