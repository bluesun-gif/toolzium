"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Activity, Calculator, ChevronsUp, Clock, Flame, Scale, TrendingUp } from"lucide-react";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";

// MET Values for different intensities
const INTENSITIES = {
 slow: { label:"Slow Step Climbing (<50 steps/min)", met: 4.0, stepsPerMin: 40 },
 moderate: { label:"Moderate Pace (50-80 steps/min)", met: 8.8, stepsPerMin: 65 },
 fast: { label:"Fast Pace (80-120 steps/min)", met: 14.0, stepsPerMin: 100 },
 pack: { label:"Carrying Weight / Pack (e.g., 10-20lbs)", met: 9.0, stepsPerMin: 60 },
};

const STEPS_PER_FLIGHT = 16;
const FEET_PER_FLIGHT = 10;
const METERS_PER_FLIGHT = 3;

export function StairClimbingCalorieClient() {
 const [weight, setWeight] = useState("150");
 const [weightUnit, setWeightUnit] = useState("lbs");
 const [inputType, setInputType] = useState("duration"); //"duration"or"flights"
 const [duration, setDuration] = useState("30");
 const [flights, setFlights] = useState("50");
 const [intensity, setIntensity] = useState("moderate");
 
 const [results, setResults] = useState({
 calories: 0,
 met: 0,
 totalSteps: 0,
 elevationFt: 0,
 elevationM: 0,
 });

 const calculate = () => {
 const w = parseFloat(weight);
 if (isNaN(w) || w <= 0) return;
 
 // Weight in kg
 const weightKg = weightUnit ==="lbs"? w * 0.453592 : w;
 
 const selectedIntensity = INTENSITIES[intensity as keyof typeof INTENSITIES];
 let timeInMins = 0;
 let computedSteps = 0;
 let computedFlights = 0;

 if (inputType ==="duration") {
 timeInMins = parseFloat(duration);
 if (isNaN(timeInMins) || timeInMins <= 0) return;
 computedSteps = timeInMins * selectedIntensity.stepsPerMin;
 computedFlights = computedSteps / STEPS_PER_FLIGHT;
 } else {
 computedFlights = parseFloat(flights);
 if (isNaN(computedFlights) || computedFlights <= 0) return;
 computedSteps = computedFlights * STEPS_PER_FLIGHT;
 timeInMins = computedSteps / selectedIntensity.stepsPerMin;
 }

 const metValue = selectedIntensity.met;
 // Calories = MET * weight(kg) * time(hours)
 const caloriesBurned = metValue * weightKg * (timeInMins / 60);

 setResults({
 calories: caloriesBurned,
 met: metValue,
 totalSteps: computedSteps,
 elevationFt: computedFlights * FEET_PER_FLIGHT,
 elevationM: computedFlights * METERS_PER_FLIGHT,
 });
 };

 useEffect(() => {
 calculate();
 }, [weight, weightUnit, inputType, duration, flights, intensity]);

 const handleReset = () => {
 setWeight("150");
 setWeightUnit("lbs");
 setInputType("duration");
 setDuration("30");
 setFlights("50");
 setIntensity("moderate");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Activity}
 title="Stair Climbing Calorie Calculator"
 description="Estimate calories burned during your step workout or stairmaster session based on intensity and duration."
 actions={
 <ResetButton onClick={handleReset} label="Reset"/>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Body Weight</Label>
 <div className="flex gap-2">
 <Input
 type="number"
 value={weight}
 onChange={(e) => setWeight(e.target.value)}
 placeholder="e.g. 150"
 className="flex-1"
 />
 <Select value={weightUnit} onValueChange={setWeightUnit}>
 <SelectTrigger className="w-[100px]">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">lbs</SelectItem>
 <SelectItem value="kg">kg</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Intensity Level</Label>
 <Select value={intensity} onValueChange={setIntensity}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {Object.entries(INTENSITIES).map(([key, val]) => (
 <SelectItem key={key} value={key}>{val.label}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Measurement Type</Label>
 <Select value={inputType} onValueChange={setInputType}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="duration">By Duration (Minutes)</SelectItem>
 <SelectItem value="flights">By Total Flights of Stairs</SelectItem>
 </SelectContent>
 </Select>
 </div>

 {inputType ==="duration"? (
 <div className="space-y-2">
 <Label>Duration (Minutes)</Label>
 <Input
 type="number"
 value={duration}
 onChange={(e) => setDuration(e.target.value)}
 placeholder="e.g. 30"
 />
 </div>
 ) : (
 <div className="space-y-2">
 <Label>Total Flights (1 flight = 16 steps)</Label>
 <Input
 type="number"
 value={flights}
 onChange={(e) => setFlights(e.target.value)}
 placeholder="e.g. 50"
 />
 </div>
 )}
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard className="bg-primary/5 border-primary/20">
 <CardHeader>
 <CardTitle className="text-xl">Workout Results</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 
 <div className="flex items-center gap-4 p-4 bg-background rounded-lg border">
 <div className="p-3 bg-orange-500/10 rounded-full text-orange-500">
 <Flame className="w-8 h-8"/>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">Calories Burned</p>
 <p className="text-3xl font-bold">{Math.round(results.calories).toLocaleString()} kcal</p>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-background rounded-lg border">
 <div className="flex items-center gap-2 mb-2 text-muted-foreground">
 <Activity className="w-4 h-4"/>
 <span className="text-sm font-medium">MET Value</span>
 </div>
 <p className="text-xl font-bold">{results.met.toFixed(1)}</p>
 </div>
 
 <div className="p-4 bg-background rounded-lg border">
 <div className="flex items-center gap-2 mb-2 text-muted-foreground">
 <Clock className="w-4 h-4"/>
 <span className="text-sm font-medium">Total Steps</span>
 </div>
 <p className="text-xl font-bold">{Math.round(results.totalSteps).toLocaleString()}</p>
 </div>
 </div>

 <div className="p-4 bg-background rounded-lg border">
 <p className="text-sm text-muted-foreground mb-1">Estimated Elevation Gain</p>
 <p className="text-lg font-semibold">
 {Math.round(results.elevationFt).toLocaleString()} ft <span className="text-muted-foreground text-sm font-normal">({Math.round(results.elevationM).toLocaleString()} m)</span>
 </p>
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
    title:"Set Floors",
    description:"Input flights or steps.",
    icon: ChevronsUp,
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
    icon: ChevronsUp,
    title:"Floor Aware",
    description:"Vertical work counted.",
  },
{
    icon: Calculator,
    title:"Burn Estimate",
    description:"Cost of climbing.",
  },
{
    icon: TrendingUp,
    title:"Daily Boost",
    description:"Small sessions add up.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A stair climbing calorie calculator captures the surprising cost of going vertical. Climbing against gravity burns notably more than walking flat, making stairs an efficient mini-workout. This tool estimates the burn from weight and steps, encouraging everyday movement.</p>
  <p>Small sessions accumulate. Taking stairs routinely adds meaningful weekly activity without a gym. The calculator quantifies this so the effort feels worthwhile and trackable.</p>
  <p>Pair with a deficit for fat loss. The tool's value is highlighting an easy, free activity's energy cost, nudging more movement into daily life.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why high burn?",
    answer:"Vertical movement is demanding.",
  },
{
    question:"How estimated?",
    answer:"Weight, steps, intensity.",
  },
{
    question:"Accurate?",
    answer:"Approximate.",
  },
{
    question:"Daily stairs?",
    answer:"Great low-effort activity.",
  },
{
    question:"Track it?",
    answer:"Log to accumulate.",
  }
  ]}
/>
</div>
 );
}
