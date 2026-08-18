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
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Activity, Bike, Calculator, Clock, Flame, Scale } from"lucide-react";

type Unit ="lbs"|"kg";
type Intensity ="low"|"moderate"|"high"|"sprint";

const MET_VALUES: Record<Intensity, number> = {
  low: 4.8,
  // Very light to light effort (50-100 watts)
  moderate: 7.0,
  // Moderate effort (101-150 watts)
  high: 8.5,
  // Vigorous effort (151-200 watts)
  sprint: 10.5 // Very vigorous / Sprint intervals (201+ watts)
};
export function IndoorCyclingCalorieClient() {
  const [weight, setWeight] = useState("150");
  const [unit, setUnit] = useState<Unit>("lbs");
  const [duration, setDuration] = useState("45");
  const [intensity, setIntensity] = useState<Intensity>("moderate");
  const [cadence, setCadence] = useState("80");
  const w = parseFloat(weight);
  const d = parseFloat(duration);
  const rpm = parseFloat(cadence);
  const isValid = !isNaN(w) && !isNaN(d) && !isNaN(rpm) && w > 0 && d > 0;
  const weightKg = unit === "lbs" ? w * 0.453592 : w;
  const met = MET_VALUES[intensity];
  const calories = isValid ? met * 3.5 * weightKg / 200 * d : 0;
  const power = isValid ? met * weightKg * 1.16 / (0.22 * 4) : 0;
  const fatBurned = isValid ? calories / 3500 : 0;
  const handleReset = () => {
    setWeight("150");
    setUnit("lbs");
    setDuration("45");
    setIntensity("moderate");
    setCadence("80");
  };
  const getResultsText = () => {
    return "Calories Burned:" + Math.round(calories) + "kcal\n" + "Estimated Power:" + Math.round(power) + "Watts\n" + "Fat Burned:" + fatBurned.toFixed(2) + "lbs";
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Activity} title="Indoor Cycling & Spin Bike Calorie Calculator" description="Calculate calories burned during stationary spin bike and indoor cycling workouts." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Details</CardTitle>
 <CardDescription>Enter your stats and session info.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Body Weight</Label>
 <div className="flex">
 <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="rounded-r-none" />
 <Select value={unit} onValueChange={(val: Unit) => setUnit(val)}>
 <SelectTrigger className="w-[80px] rounded-l-none border-l-0"><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">lbs</SelectItem>
 <SelectItem value="kg">kg</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 <div className="space-y-2">
 <Label>Duration (mins)</Label>
 <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Resistance / Intensity Level</Label>
 <Select value={intensity} onValueChange={(val: Intensity) => setIntensity(val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="low">Low (Recovery Pace)</SelectItem>
 <SelectItem value="moderate">Moderate (Steady Aerobic)</SelectItem>
 <SelectItem value="high">High (Tempo Threshold)</SelectItem>
 <SelectItem value="sprint">Sprint Intervals (HIIT/Spin Class)</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Average Cadence (RPM)</Label>
 <Input type="number" value={cadence} onChange={e => setCadence(e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 <CardDescription>Your estimated energy expenditure.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="p-6 bg-primary/10 rounded-lg flex flex-col items-center justify-center border border-primary/20">
 <Flame className="w-12 h-12 text-primary mb-2" />
 <div className="text-4xl font-bold text-primary">{Math.round(calories)}</div>
 <div className="text-sm text-muted-foreground mt-1">Total Calories Burned (kcal)</div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-muted rounded-md text-center">
 <div className="text-2xl font-bold">{Math.round(power)} W</div>
 <div className="text-xs text-muted-foreground">Est. Power Output</div>
 </div>
 <div className="p-4 bg-muted rounded-md text-center">
 <div className="text-2xl font-bold">{MET_VALUES[intensity]}</div>
 <div className="text-xs text-muted-foreground">MET Value</div>
 </div>
 <div className="p-4 bg-muted rounded-md text-center col-span-2">
 <div className="text-2xl font-bold">{fatBurned.toFixed(3)} lbs</div>
 <div className="text-xs text-muted-foreground">Est. Fat Burned</div>
 </div>
 </div>

 <CopyButton getText={getResultsText} label="Copy Results" />
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
    title:"Set Duration",
    description:"Input ride length.",
    icon: Clock,
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
    icon: Clock,
    title:"Duration",
    description:"Longer burns more.",
  },
{
    icon: Calculator,
    title:"Burn Estimate",
    description:"Session calories.",
  },
{
    icon: Bike,
    title:"Indoor Focus",
    description:"Spin-specific.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An indoor cycling calorie calculator estimates energy burned during spin sessions, accounting for weight and duration at typical intensities. This tool gives a personalized figure to inform nutrition and training balance.</p>
  <p>Intensity drives the number; harder intervals burn more per minute. The calculator approximates this so you can compare rides and plan effort. Indoor cycling is low-impact and efficient, making it sustainable cardio.</p>
  <p>Use the estimate to balance intake, not to justify overeating. The tool's value is quantifying a convenient, joint-friendly workout's energy cost, supporting consistent training.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/indoor-cycling-calorie" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"How estimated?",
    answer:"From weight, time, intensity.",
  },
{
    question:"Accurate?",
    answer:"Approximate without a meter.",
  },
{
    question:"Versus outdoor?",
    answer:"Similar; resistance differs.",
  },
{
    question:"Track it?",
    answer:"Log to balance diet.",
  },
{
    question:"Good cardio?",
    answer:"Yes, low impact and effective.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default IndoorCyclingCalorieClient;
