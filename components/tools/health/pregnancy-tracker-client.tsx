"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { AlertTriangle, Baby, Calendar, ClipboardList, Heart, HeartPulse, ListChecks } from"lucide-react";
import toast from"react-hot-toast";

export function PregnancyTrackerClient() {
  const [lmpDate, setLmpDate] = useState("");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [trimester, setTrimester] = useState(0);
  const calculateMilestones = () => {
    if (!lmpDate) return;
    const lmp = new Date(lmpDate);
    if (isNaN(lmp.getTime())) {
      toast.error("Invalid date");
      return;
    }
    const edd = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    setDueDate(edd.toISOString().split("T")[0]);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lmp.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    setCurrentWeek(Math.min(Math.max(weeks, 0), 42));
    const remaining = Math.ceil((edd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setDaysRemaining(Math.max(remaining, 0));
    if (weeks < 14) setTrimester(1);else if (weeks < 28) setTrimester(2);else setTrimester(3);
  };
  useEffect(() => {
    calculateMilestones();
  }, [lmpDate]);
  const babySizes = ["Poppy seed", "Appleseed", "Sweet pea", "Blueberry", "Raspberry", "Green olive", "Prune", "Lime", "Plum", "Peach", "Lemon", "Apple", "Avocado", "Turnip", "Bell pepper", "Heirloom tomato", "Banana", "Carrot", "Papaya", "Grapefruit", "Cantaloupe", "Cauliflower", "Eggplant", "Squash", "Cabbage", "Coconut", "Jicama", "Pineapple", "Melon", "Romaine lettuce", "Winter squash", "Honeydew", "Swiss chard", "Rhubarb", "Watermelon", "Mini-watermelon", "Pumpkin", "Jack-o-lantern"];
  const sizeIndex = Math.max(0, currentWeek - 4);
  const currentSize = currentWeek >= 4 && currentWeek <= 41 ? babySizes[Math.min(sizeIndex, babySizes.length - 1)] : "Awaiting data";
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Heart} title="Pregnancy Tracker" description="Track your pregnancy journey, estimated due date, and baby development." actions={<ResetButton onClick={() => setLmpDate("")} label="Reset" />} />

 <GlassCard className="bg-yellow-50 border-yellow-200 text-yellow-900 mb-6">
 <CardContent className="pt-6 flex items-start gap-4">
 <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
 <p className="text-sm font-medium">
 Disclaimer: This tool provides general estimations and is NOT medical advice. Always consult your healthcare provider for medical information and care during your pregnancy.
 </p>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Basic Information</CardTitle>
 <CardDescription>Enter the first day of your Last Menstrual Period (LMP)</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>LMP Date</Label>
 <Input type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)} />
 </div>
 
 {dueDate && <div className="mt-6 space-y-4">
 <div className="p-4 bg-muted rounded-md text-center">
 <p className="text-sm text-muted-foreground mb-1">Estimated Due Date</p>
 <p className="text-2xl font-bold text-primary">{dueDate}</p>
 </div>
 
 <div className="grid grid-cols-3 gap-2 text-center">
 <div className="p-3 border rounded-md">
 <p className="text-xs text-muted-foreground">Week</p>
 <p className="font-semibold">{currentWeek}</p>
 </div>
 <div className="p-3 border rounded-md">
 <p className="text-xs text-muted-foreground">Trimester</p>
 <p className="font-semibold">{trimester}</p>
 </div>
 <div className="p-3 border rounded-md">
 <p className="text-xs text-muted-foreground">Days Left</p>
 <p className="font-semibold">{daysRemaining}</p>
 </div>
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Baby Development</CardTitle>
 <CardDescription>Current milestone insights</CardDescription>
 </CardHeader>
 <CardContent>
 {currentWeek > 0 ? <div className="space-y-6">
 <div className="flex items-center gap-4 p-4 border rounded-lg bg-primary/5">
 <Heart className="w-10 h-10 text-primary" />
 <div>
 <h4 className="font-semibold text-lg">Size Comparison</h4>
 <p className="text-sm text-muted-foreground">Your baby is about the size of a <strong className="text-foreground">{currentSize}</strong>.</p>
 </div>
 </div>
 
 <div>
 <h4 className="font-semibold mb-2 flex items-center gap-2"><ListChecks className="w-4 h-4" /> Recommended Checklists</h4>
 <ul className="text-sm space-y-2 text-muted-foreground ml-6 list-disc">
 {trimester === 1 && <React.Fragment>
 <li>Schedule first prenatal visit</li>
 <li>Start taking prenatal vitamins</li>
 <li>Rest often and stay hydrated</li>
 </React.Fragment>}
 {trimester === 2 && <React.Fragment>
 <li>Schedule anatomy scan (around 20 weeks)</li>
 <li>Consider childbirth classes</li>
 <li>Start planning the nursery</li>
 </React.Fragment>}
 {trimester === 3 && <React.Fragment>
 <li>Pack your hospital bag</li>
 <li>Install car seat</li>
 <li>Finalize birth plan</li>
 </React.Fragment>}
 </ul>
 </div>
 </div> : <div className="text-center p-8 text-muted-foreground">
 <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
 <p>Enter your LMP date to see development details.</p>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Date",
    description:"Add due date or last period.",
    icon: Calendar,
  },
{
    step:"02",
    title:"Track",
    description:"Log symptoms and milestones.",
    icon: ClipboardList,
  },
{
    step:"03",
    title:"View",
    description:"See week-by-week progress.",
    icon: Baby,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Calendar,
    title:"Date Based",
    description:"From due date or LMP.",
  },
{
    icon: ClipboardList,
    title:"Symptom Log",
    description:"Record how you feel.",
  },
{
    icon: Baby,
    title:"Week View",
    description:"Trimester milestones.",
  },
{
    icon: HeartPulse,
    title:"Health Notes",
    description:"Share with clinician.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A pregnancy tracker organizes a transformative period into a clear week-by-week view. By entering your due date or last period, it maps trimesters and milestones, helping you anticipate changes. This tool also logs symptoms, creating a record to discuss with your clinician.</p>
  <p>Logging matters. Symptoms vary widely and timing helps distinguish normal from concerning; a consistent diary improves appointments. The tracker structures this so notes are easy to keep and share, supporting better care.</p>
  <p>This is informational, not medical guidance. Confirm everything with your provider, especially any symptom that worries you. The tool's value is turning an overwhelming nine months into an organized, reassuring timeline you can follow and discuss.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does it track?",
    answer:"Weeks, symptoms, and milestones.",
  },
{
    question:"Accurate timing?",
    answer:"Estimates; ultrasound refines.",
  },
{
    question:"Log symptoms?",
    answer:"Yes, useful for appointments.",
  },
{
    question:"Medical advice?",
    answer:"No, follow your provider.",
  },
{
    question:"Weekly view?",
    answer:"Yes, shows fetal development stage.",
  }
  ]}
/>
</div>
 );
}
