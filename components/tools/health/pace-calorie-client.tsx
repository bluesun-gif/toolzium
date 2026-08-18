"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Flame, Gauge, Scale, Timer, TrendingUp } from"lucide-react";

export function PaceCalorieClient() {
  const [weight, setWeight] = useState<number>(150);
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs");
  const [distance, setDistance] = useState<number>(3);
  const [distanceUnit, setDistanceUnit] = useState<"miles" | "km">("miles");
  const [runPace, setRunPace] = useState<number>(9); // min/mile
  const [walkPace, setWalkPace] = useState<number>(20); // min/mile

  // Calculations
  const weightKg = weightUnit === "lbs" ? weight * 0.453592 : weight;

  // Speed in mph
  const runSpeedMph = distanceUnit === "miles" ? 60 / runPace : 60 / runPace * 0.621371;
  const walkSpeedMph = distanceUnit === "miles" ? 60 / walkPace : 60 / walkPace * 0.621371;

  // Approximate MET values
  const getRunMET = (mph: number) => {
    if (mph < 5) return 8; // jogging
    if (mph <= 6) return 9.8; // 10 min/mile
    if (mph <= 7) return 11.0; // 8.5 min/mile
    if (mph <= 8) return 11.8; // 7.5 min/mile
    return 12.8; // > 8 mph
  };
  const getWalkMET = (mph: number) => {
    if (mph < 3) return 3.0; // slow
    if (mph <= 3.5) return 3.8; // brisk
    if (mph <= 4) return 5.0; // fast
    return 6.3; // very fast
  };
  const runMET = getRunMET(runSpeedMph);
  const walkMET = getWalkMET(walkSpeedMph);

  // Time in hours
  const runTimeHours = runPace * distance / 60;
  const walkTimeHours = walkPace * distance / 60;

  // Calories = MET × weight(kg) × time(hrs)
  const runCalories = runMET * weightKg * runTimeHours;
  const walkCalories = walkMET * weightKg * walkTimeHours;
  const handleReset = () => {
    setWeight(150);
    setDistance(3);
    setRunPace(9);
    setWalkPace(20);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Activity} title={"Pace & Calorie Calculator"} description={"Compare calories burned running vs walking the same distance."} actions={<ResetButton onClick={handleReset} label={"Reset"} />} />

 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center space-x-2"}>
 <Scale className={"w-5 h-5"} />
 <span>{"Input Parameters"}</span>
 </CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"grid grid-cols-2 gap-4"}>
 <div className={"space-y-2"}>
 <Label>{"Body Weight"}</Label>
 <Input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} min="1" />
 </div>
 <div className={"space-y-2"}>
 <Label>{"Unit"}</Label>
 <Select value={weightUnit} onValueChange={(v: "lbs" | "kg") => setWeightUnit(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">{"lbs"}</SelectItem>
 <SelectItem value="kg">{"kg"}</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className={"grid grid-cols-2 gap-4"}>
 <div className={"space-y-2"}>
 <Label>{"Distance"}</Label>
 <Input type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} min="0.1" step="0.1" />
 </div>
 <div className={"space-y-2"}>
 <Label>{"Unit"}</Label>
 <Select value={distanceUnit} onValueChange={(v: "miles" | "km") => setDistanceUnit(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="miles">{"Miles"}</SelectItem>
 <SelectItem value="km">{"Kilometers"}</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className={"space-y-2"}>
 <Label>{"Running Pace (min/" + distanceUnit + ")"}</Label>
 <Input type="number" value={runPace} onChange={e => setRunPace(Number(e.target.value))} min="4" max="30" step="0.5" />
 </div>

 <div className={"space-y-2"}>
 <Label>{"Walking Pace (min/" + distanceUnit + ")"}</Label>
 <Input type="number" value={walkPace} onChange={e => setWalkPace(Number(e.target.value))} min="10" max="60" step="0.5" />
 </div>
 </CardContent>
 </GlassCard>

 <div className={"space-y-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center space-x-2"}>
 <Flame className={"w-5 h-5"} />
 <span>{"Results"}</span>
 </CardTitle>
 </CardHeader>
 <CardContent className={"space-y-6"}>
 <div className={"grid grid-cols-2 gap-4"}>
 <div className={"p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center"}>
 <div className={"text-sm text-muted-foreground mb-1"}>{"Running Calories"}</div>
 <div className={"text-3xl font-bold text-primary"}>{Math.round(runCalories)}</div>
 <div className={"text-xs mt-2"}>{(runTimeHours * 60).toFixed(1) + "mins"}</div>
 </div>
 <div className={"p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center"}>
 <div className={"text-sm text-muted-foreground mb-1"}>{"Walking Calories"}</div>
 <div className={"text-3xl font-bold text-green-600 dark:text-green-400"}>{Math.round(walkCalories)}</div>
 <div className={"text-xs mt-2"}>{(walkTimeHours * 60).toFixed(1) + "mins"}</div>
 </div>
 </div>
 <div className={"p-4 bg-slate-50 rounded-lg"}>
 <h4 className={"font-semibold mb-2 flex items-center"}>
 <Timer className={"w-4 h-4 mr-2"} />
 {"Time Saved"}
 </h4>
 <p>{"Running saves you" + ((walkTimeHours - runTimeHours) * 60).toFixed(1) + "minutes compared to walking the same distance."}</p>
 </div>
 </CardContent>
 </GlassCard>
 </div>
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
    title:"Set Pace",
    description:"Input speed or duration.",
    icon: Gauge,
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
    icon: Gauge,
    title:"Pace Aware",
    description:"Faster pace burns more.",
  },
{
    icon: Calculator,
    title:"Burn Estimate",
    description:"Calories for the session.",
  },
{
    icon: TrendingUp,
    title:"Training Aid",
    description:"Plan intensity.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A pace calorie calculator estimates burn from speed, weight, and duration, useful for runners and walkers. Faster paces burn more per minute, so the same route at higher speed costs more energy. This tool personalizes that estimate.</p>
  <p>Pace and duration together define the session's cost. The calculator reflects how intensity scales burn, helping you plan training and fueling. Whether walking or running, the number informs balance with intake.</p>
  <p>Use it to quantify cardio effort. The tool's value is a pace-aware energy estimate that makes training load and nutrition planning precise.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/pace-calorie" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"How estimated?",
    answer:"From weight, pace, time.",
  },
{
    question:"Pace matters?",
    answer:"Faster effort burns more per minute.",
  },
{
    question:"Accurate?",
    answer:"Approximate; devices vary.",
  },
{
    question:"Walking or running?",
    answer:"Both; intensity sets burn.",
  },
{
    question:"Track it?",
    answer:"Log to balance intake.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default PaceCalorieClient;
