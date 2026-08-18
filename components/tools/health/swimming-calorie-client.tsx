"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { ResetButton, CopyButton } from"@/components/shared/action-buttons";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Switch } from"@/components/ui/switch";
import { Activity, Calculator, Clock, Flame, Scale, Waves, Copy } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import toast from"react-hot-toast";

type ActivityType ="freestyle_slow"|"freestyle_fast"|"breaststroke"|"backstroke"|"butterfly"|"treading"|"water_polo"|"kayaking";

const ACTIVITY_METS: Record<ActivityType, number> = {
  freestyle_slow: 5.8,
  freestyle_fast: 9.8,
  breaststroke: 10.3,
  backstroke: 7.3,
  butterfly: 13.8,
  treading: 3.5,
  water_polo: 10.0,
  kayaking: 5.0
};
const ACTIVITY_LABELS: Record<ActivityType, string> = {
  freestyle_slow: "Freestyle / Crawl (Slow/Moderate)",
  freestyle_fast: "Freestyle / Crawl (Fast/Vigorous)",
  breaststroke: "Breaststroke",
  backstroke: "Backstroke",
  butterfly: "Butterfly",
  treading: "Treading Water",
  water_polo: "Water Polo",
  kayaking: "Kayaking"
};
export function SwimmingCalorieClient() {
  const [weight, setWeight] = useState("150");
  const [isKg, setIsKg] = useState(false);
  const [duration, setDuration] = useState("30");
  const [activity, setActivity] = useState<ActivityType>("freestyle_slow");
  const handleReset = () => {
    setWeight("150");
    setIsKg(false);
    setDuration("30");
    setActivity("freestyle_slow");
    toast.success("Reset to defaults");
  };
  const parsedWeight = parseFloat(weight) || 0;
  const parsedDuration = parseFloat(duration) || 0;
  const weightInKg = isKg ? parsedWeight : parsedWeight * 0.453592;
  const met = ACTIVITY_METS[activity];

  // Calories = MET * Weight(kg) * Time(hrs)
  const calories = met * weightInKg * (parsedDuration / 60);
  const fatBurned = calories / 3500; // rough estimate 1 lb fat = 3500 kcal

  const getReport = () => {
    return "Swimming Calories Report:\nActivity:" + ACTIVITY_LABELS[activity] + "\nWeight:" + weight + (isKg ? "kg" : "lbs") + "\nDuration:" + duration + "mins\nCalories Burned:" + calories.toFixed(1) + "kcal\nFat Burned Est.:" + fatBurned.toFixed(3) + "lbs";
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Swimming & Water Sports Calorie Calculator" description="Calculate calories and fat burned during various swimming strokes and water sports." icon={Activity} actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Activity Details</CardTitle>
 <CardDescription>Enter your physical details and workout duration.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex items-center justify-between mb-2">
 <Label>Weight Unit: {isKg ? "Kilograms (kg)" : "Pounds (lbs)"}</Label>
 <Switch checked={isKg} onCheckedChange={setIsKg} />
 </div>

 <div className="space-y-2">
 <Label>Body Weight</Label>
 <div className="relative">
 <Scale className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" className="pl-10" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Enter weight" min="1" />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Duration (Minutes)</Label>
 <div className="relative">
 <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" className="pl-10" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 30" min="1" />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Stroke / Water Sport</Label>
 <Select value={activity} onValueChange={val => setActivity(val as ActivityType)}>
 <SelectTrigger>
 <SelectValue placeholder="Select activity" />
 </SelectTrigger>
 <SelectContent>
 {Object.entries(ACTIVITY_LABELS).map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 <CardDescription>Estimated calories burned.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-2 gap-4 text-center">
 <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center">
 <Flame className="h-6 w-6 text-orange-500 mb-2" />
 <span className="text-sm text-muted-foreground">Calories Burned</span>
 <span className="text-2xl font-bold">{calories.toFixed(1)}</span>
 <span className="text-xs text-muted-foreground">kcal</span>
 </div>
 <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center">
 <Activity className="h-6 w-6 text-primary mb-2" />
 <span className="text-sm text-muted-foreground">MET Value</span>
 <span className="text-2xl font-bold">{met.toFixed(1)}</span>
 <span className="text-xs text-muted-foreground">intensity</span>
 </div>
 </div>
 
 <div className="space-y-2">
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Est. Fat Burned:</span>
 <span className="font-medium">{fatBurned.toFixed(3)} lbs</span>
 </div>
 <Separator />
 </div>

 <div className="pt-4 flex justify-end">
 <CopyButton getText={getReport} label="Copy Results" />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Weight",
    description:"Add body weight.",
    icon: Scale,
  },
{
    step:"02",
    title:"Set Stroke",
    description:"Pick stroke and duration.",
    icon: Waves,
  },
{
    step:"03",
    title:"Calculate",
    description:"See calories burned.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Scale,
    title:"Weight Based",
    description:"Personalizes burn.",
  },
{
    icon: Waves,
    title:"Stroke Aware",
    description:"Different strokes vary.",
  },
{
    icon: Calculator,
    title:"Burn Estimate",
    description:"Session cost.",
  },
{
    icon: Activity,
    title:"Full Body",
    description:"Excellent cardio.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A swimming calorie calculator accounts for a sport where stroke choice changes the cost. Butterfly is far more demanding than breaststroke; the calculator factors this with weight and duration. This tool estimates the burn so swimmers can plan training and fueling.</p>
  <p>Swimming is full-body and low-impact, ideal for many bodies and joints. The approximate cost helps balance intake and track effort across sessions. Intensity and stroke selection drive the number.</p>
  <p>Use it to quantify a superb workout. The tool's value is a stroke-aware energy estimate that makes pool time measurable and purposeful.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/swimming-calorie" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"Stroke matters?",
    answer:"Yes, butterfly burns most, breast least.",
  },
{
    question:"How estimated?",
    answer:"Weight, time, stroke intensity.",
  },
{
    question:"Accurate?",
    answer:"Approximate.",
  },
{
    question:"Great workout?",
    answer:"Yes, full-body, low impact.",
  },
{
    question:"Track it?",
    answer:"Log to balance.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default SwimmingCalorieClient;
