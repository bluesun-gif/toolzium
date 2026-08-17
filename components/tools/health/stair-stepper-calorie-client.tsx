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
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Clock, Flame, Scale } from"lucide-react";
import toast from"react-hot-toast";

const INTENSITIES: Record<string, number> = {
  "light": 5.0,
  "moderate": 7.0,
  "vigorous": 9.0,
  "interval": 11.0
};
export function StairStepperCalorieClient() {
  const [weight, setWeight] = useState("150");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [duration, setDuration] = useState("30");
  const [stepRate, setStepRate] = useState("60");
  const [intensity, setIntensity] = useState("moderate");
  const [calories, setCalories] = useState("0");
  const [met, setMet] = useState("0");
  const [totalSteps, setTotalSteps] = useState("0");
  const [flights, setFlights] = useState("0");
  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    const sr = parseFloat(stepRate);
    if (isNaN(w) || isNaN(d) || isNaN(sr) || w <= 0 || d <= 0 || sr <= 0) {
      toast.error("Please enter valid numbers");
      return;
    }
    const weightKg = weightUnit === "lbs" ? w * 0.453592 : w;
    const metValue = INTENSITIES[intensity];
    const cals = metValue * 3.5 * weightKg / 200 * d;
    const steps = sr * d;
    const fl = steps / 15;
    setCalories(cals.toFixed(0));
    setMet(metValue.toFixed(1));
    setTotalSteps(steps.toFixed(0));
    setFlights(fl.toFixed(0));
  };
  const handleReset = () => {
    setWeight("150");
    setWeightUnit("lbs");
    setDuration("30");
    setStepRate("60");
    setIntensity("moderate");
    setCalories("0");
    setMet("0");
    setTotalSteps("0");
    setFlights("0");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Activity} title="Stair Stepper & StepMill Calorie Calculator" description="Calculate total calories burned on stair steppers and StepMill machines." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Details</CardTitle>
 <CardDescription>Enter your stats to calculate burn</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Body Weight</Label>
 <Input type="number" min="1" value={weight} onChange={e => setWeight(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Unit</Label>
 <Select value={weightUnit} onValueChange={setWeightUnit}>
 <SelectTrigger><SelectValue placeholder="Unit" /></SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">lbs</SelectItem>
 <SelectItem value="kg">kg</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Duration (mins)</Label>
 <Input type="number" min="1" value={duration} onChange={e => setDuration(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Step Rate (steps/min)</Label>
 <Input type="number" min="1" value={stepRate} onChange={e => setStepRate(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Workout Intensity</Label>
 <Select value={intensity} onValueChange={setIntensity}>
 <SelectTrigger><SelectValue placeholder="Intensity" /></SelectTrigger>
 <SelectContent>
 <SelectItem value="light">Light Step (easy pace)</SelectItem>
 <SelectItem value="moderate">Moderate Step (steady cardio)</SelectItem>
 <SelectItem value="vigorous">Vigorous Step (fast tempo)</SelectItem>
 <SelectItem value="interval">Interval Step (HIIT)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <ActionButton onClick={calculate} icon={Activity} label="Calculate Calories" />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 <CardDescription>Your estimated workout stats</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-secondary/50 p-4 rounded-xl text-center">
 <Flame className="w-8 h-8 mx-auto text-primary mb-2" />
 <div className="text-3xl font-bold">{calories}</div>
 <div className="text-sm text-muted-foreground">Calories Burned</div>
 </div>
 <div className="bg-secondary/50 p-4 rounded-xl text-center">
 <Scale className="w-8 h-8 mx-auto text-primary mb-2" />
 <div className="text-3xl font-bold">{met}</div>
 <div className="text-sm text-muted-foreground">MET Score</div>
 </div>
 </div>

 <Separator />

 <div className="space-y-2">
 <div className="flex justify-between items-center bg-secondary/30 p-3 rounded-lg">
 <span className="font-medium">Total Steps</span>
 <span className="font-bold text-lg">{totalSteps}</span>
 </div>
 <div className="flex justify-between items-center bg-secondary/30 p-3 rounded-lg">
 <span className="font-medium">Flights Climbed (est.)</span>
 <span className="font-bold text-lg">{flights}</span>
 </div>
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
    title:"Set Time",
    description:"Input session minutes.",
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
    description:"Machine session cost.",
  },
{
    icon: Activity,
    title:"Low Impact",
    description:"Joint-friendly cardio.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A stair stepper calorie calculator estimates burn on a controlled, low-impact machine. It derives cost from weight and duration at typical intensities. This tool personalizes the figure, useful for consistent indoor cardio.</p>
  <p>The StepMill offers steady effort without weather or terrain variables, making tracking easier. The calculator approximates cost so you can balance intake and monitor training.</p>
  <p>Use it for sustainable cardio and log the burn. The tool's value is quantifying a convenient, joint-friendly workout's energy cost, supporting regular exercise.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How estimated?",
    answer:"Weight, time, intensity.",
  },
{
    question:"Versus real stairs?",
    answer:"Similar effort, controlled.",
  },
{
    question:"Accurate?",
    answer:"Approximate.",
  },
{
    question:"Good cardio?",
    answer:"Yes, sustained effort.",
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

export default StairStepperCalorieClient;
