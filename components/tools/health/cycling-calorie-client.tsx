"use client";

import { ToolBackground } from "@/components/shared/tool-background";
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
import { Activity, BarChart3, Bike, Calculator, Clock, Flame, Scale, TrendingUp, Copy } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";

export function CyclingCalorieClient() {
  const [weight, setWeight] = useState("150");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [duration, setDuration] = useState("60");
  const [intensity, setIntensity] = useState("Moderate (10-12 mph)");
  const [terrain, setTerrain] = useState("Flat");
  const getMetValue = () => {
    let met = 4;
    switch (intensity) {
      case "Leisure (<10 mph)":
        met = 4.0;
        break;
      case "Moderate (10-12 mph)":
        met = 6.8;
        break;
      case "Vigorous (12-14 mph)":
        met = 8.0;
        break;
      case "Racing (14-16 mph)":
        met = 10.0;
        break;
      case "Racing (16-19 mph)":
        met = 12.0;
        break;
      case "Racing (>20 mph)":
        met = 15.8;
        break;
      case "Mountain Biking":
        met = 8.5;
        break;
      case "Stationary Bike":
        met = 7.0;
        break;
    }
    if (terrain === "Hilly") met *= 1.2;
    if (terrain === "Steep Uphill") met *= 1.5;
    return met;
  };
  const calculateResults = () => {
    const weightVal = parseFloat(weight) || 0;
    const durationVal = parseFloat(duration) || 0;
    if (weightVal <= 0 || durationVal <= 0) return null;
    const weightKg = weightUnit === "lbs" ? weightVal * 0.453592 : weightVal;
    const met = getMetValue();
    const calories = met * weightKg * (durationVal / 60);
    const fatBurned = calories / 7700; // rough estimate kg

    // Average power estimation: Power = Calories / (duration/60) * 0.28
    const power = calories / (durationVal / 60) * 0.28;
    return {
      calories: Math.round(calories),
      power: Math.round(power),
      met: met.toFixed(1),
      fatBurned: weightUnit === "lbs" ? (fatBurned * 2.20462).toFixed(2) + "lbs" : fatBurned.toFixed(2) + "kg"
    };
  };
  const results = calculateResults();
  const getCopyText = () => {
    if (!results) return "";
    return "Cycling Results:" + results.calories + "Calories Burned, Estimated Power:" + results.power + "Watts, Duration:" + duration + "mins.";
  };
  const handleReset = () => {
    setWeight("150");
    setDuration("60");
    setIntensity("Moderate (10-12 mph)");
    setTerrain("Flat");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Activity} title="Cycling & Biking Calorie & Power Calculator" description="Calculate calories burned and estimated mechanical power output during your cycling sessions." actions={<div className="flex flex-wrap items-center gap-2">
 <ResetButton onClick={handleReset} label="Reset" />
 <CopyButton getText={getCopyText} label="Copy Results" />
 </div>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Session Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Body Weight</Label>
 <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} min="1" />
 </div>
 <div className="space-y-2">
 <Label>Unit</Label>
 <Select value={weightUnit} onValueChange={setWeightUnit}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">lbs</SelectItem>
 <SelectItem value="kg">kg</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Duration (minutes)</Label>
 <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} min="1" />
 </div>

 <div className="space-y-2">
 <Label>Intensity Level</Label>
 <Select value={intensity} onValueChange={setIntensity}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Leisure (<10 mph)">Leisure (&lt;10 mph)</SelectItem>
 <SelectItem value="Moderate (10-12 mph)">Moderate (10-12 mph)</SelectItem>
 <SelectItem value="Vigorous (12-14 mph)">Vigorous (12-14 mph)</SelectItem>
 <SelectItem value="Racing (14-16 mph)">Racing (14-16 mph)</SelectItem>
 <SelectItem value="Racing (16-19 mph)">Racing (16-19 mph)</SelectItem>
 <SelectItem value="Racing (>20 mph)">Racing (&gt;20 mph)</SelectItem>
 <SelectItem value="Mountain Biking">Mountain Biking</SelectItem>
 <SelectItem value="Stationary Bike">Stationary Bike</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Terrain / Gradient</Label>
 <Select value={terrain} onValueChange={setTerrain}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Flat">Flat</SelectItem>
 <SelectItem value="Hilly">Hilly</SelectItem>
 <SelectItem value="Steep Uphill">Steep Uphill</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 </CardHeader>
 <CardContent>
 {results ? <div className="space-y-6">
 <div className="p-6 bg-primary/10 rounded-xl text-center space-y-2">
 <Flame className="w-8 h-8 text-primary mx-auto mb-2" />
 <div className="text-4xl font-bold text-primary">{results.calories}</div>
 <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Calories Burned</div>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-muted rounded-lg text-center space-y-1">
 <Activity className="w-5 h-5 mx-auto text-primary mb-1" />
 <div className="text-2xl font-bold">{results.power} W</div>
 <div className="text-xs text-muted-foreground uppercase">Est. Power</div>
 </div>
 <div className="p-4 bg-muted rounded-lg text-center space-y-1">
 <Clock className="w-5 h-5 mx-auto text-orange-500 mb-1" />
 <div className="text-2xl font-bold">{results.met}</div>
 <div className="text-xs text-muted-foreground uppercase">MET Value</div>
 </div>
 </div>
 
 <div className="p-4 bg-muted rounded-lg text-center space-y-1">
 <Scale className="w-5 h-5 mx-auto text-green-500 mb-1" />
 <div className="text-xl font-bold">{results.fatBurned}</div>
 <div className="text-xs text-muted-foreground uppercase">Est. Fat Burned</div>
 </div>
 </div> : <div className="text-center text-muted-foreground p-8">
 Please enter valid weight and duration to see results.
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Ride",
    description:"Add duration, weight, intensity.",
    icon: Bike,
  },
{
    step:"02",
    title:"Calculate",
    description:"See calories and power estimate.",
    icon: Calculator,
  },
{
    step:"03",
    title:"Analyze",
    description:"Compare effort levels.",
    icon: BarChart3,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Bike,
    title:"Cycling Focus",
    description:"Tailored to riding.",
  },
{
    icon: Calculator,
    title:"Burn & Power",
    description:"Estimates both metrics.",
  },
{
    icon: BarChart3,
    title:"Effort Compare",
    description:"See intensity effects.",
  },
{
    icon: TrendingUp,
    title:"Training Aid",
    description:"Plan rides by goal.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A cycling calorie and power calculator helps riders quantify training. It estimates energy burned from weight, duration, and intensity, and approximates power output, a key cycling metric. This tool tailors results to riding so cyclists can plan sessions and understand effort.</p>
  <p>Intensity drives the number. Hard climbs burn far more than easy spins; the calculator shows this so you can target rides to goals — endurance, fat burn, or intensity. Power estimates add a training dimension even without a meter, guiding progression.</p>
  <p>Pair with nutrition to fuel and recover. The tool's value is making cycling's cost and output tangible, turning rides into measurable training inputs rather than vague exercise.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/cycling-calorie" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"How is burn estimated?",
    answer:"From weight, time, and intensity.",
  },
{
    question:"What is power?",
    answer:"Watts produced; estimate from effort.",
  },
{
    question:"Indoor vs outdoor?",
    answer:"Both; resistance differs.",
  },
{
    question:"Accurate?",
    answer:"Approximate without a meter.",
  },
{
    question:"Use for fitness?",
    answer:"Yes, balance with nutrition.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default CyclingCalorieClient;
