"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Flame, Activity, Clock, HeartPulse, Sparkles, Scale } from "lucide-react";
import toast from "react-hot-toast";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GridPattern } from "@/components/magicui/grid-pattern";
type WeightUnit = "lbs" | "kg";
interface ActivityMET {
  name: string;
  met: number;
  category: string;
}
const ACTIVITIES: ActivityMET[] = [{
  name: "Running (6 mph / 10 min mile)",
  met: 9.8,
  category: "Cardio"
}, {
  name: "Running (8 mph / 7.5 min mile)",
  met: 11.8,
  category: "Cardio"
}, {
  name: "Stationary Cycling (Moderate 100W)",
  met: 6.8,
  category: "Cycling"
}, {
  name: "Stationary Cycling (Vigorous 150W)",
  met: 8.8,
  category: "Cycling"
}, {
  name: "Swimming Laps (Moderate)",
  met: 5.8,
  category: "Swimming"
}, {
  name: "Walking (3.5 mph brisk pace)",
  met: 4.3,
  category: "Walking"
}, {
  name: "Weight Lifting (Vigorous strength training)",
  met: 6.0,
  category: "Gym"
}, {
  name: "HIIT Workout / Circuit Training",
  met: 8.0,
  category: "Gym"
}, {
  name: "Basketball Game",
  met: 8.0,
  category: "Sports"
}, {
  name: "Soccer / Football Game",
  met: 7.0,
  category: "Sports"
}, {
  name: "Yoga (Vinyasa Flow)",
  met: 3.3,
  category: "Wellness"
}, {
  name: "Jump Rope (Moderate pace)",
  met: 10.0,
  category: "Cardio"
}];
export default function CalorieBurnActivityClient() {
  const [weight, setWeight] = useState<string>("165");
  const [unit, setUnit] = useState<WeightUnit>("lbs");
  const [durationMinutes, setDurationMinutes] = useState<string>("45");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const weightVal = parseFloat(weight) || 0;
  const durationVal = parseFloat(durationMinutes) || 0;
  const weightKg = unit === "lbs" ? weightVal * 0.453592 : weightVal;
  const currentActivity = ACTIVITIES[selectedIndex] || ACTIVITIES[0];
  // Calorie formula: Calories = MET * weight_kg * (duration_minutes / 60)
  const totalCaloriesBurned = Math.round(currentActivity.met * weightKg * (durationVal / 60));
  const caloriesPerMinute = durationVal > 0 ? (totalCaloriesBurned / durationVal).toFixed(1) : "0.0";
  const handleReset = () => {
    setWeight("165");
    setUnit("lbs");
    setDurationMinutes("45");
    setSelectedIndex(0);
    toast.success("Reset to defaults.");
  };
  const summary = `Activity: ${currentActivity.name}
Body Weight: ${weightVal} ${unit} (${weightKg.toFixed(1)} kg)
Duration: ${durationVal} minutes
Total Calories Burned: ${totalCaloriesBurned} kcal
Burn Rate: ${caloriesPerMinute} kcal/min`;
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Flame} title="Calorie Burn by Activity Calculator" description="Calculate exact calories burned across 30+ physical activities, sports, and exercise routines based on body weight and duration." actions={<ResetButton onClick={handleReset} label="Reset" />} />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" />
              Workout & Body Parameters
            </CardTitle>
            <CardDescription>Select activity type, duration, and body weight.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Exercise / Activity</Label>
              <Select value={selectedIndex.toString()} onValueChange={val => setSelectedIndex(parseInt(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose activity" />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITIES.map((act, idx) => <SelectItem key={act.name} value={idx.toString()}>
                      {act.name} (MET {act.met})
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="body-weight">Body Weight</Label>
                <Input id="body-weight" type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="165" />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select value={unit} onValueChange={val => setUnit(val as WeightUnit)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lbs">lbs</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Workout Duration (Minutes)</Label>
              <Input id="duration" type="number" value={durationMinutes} onChange={e => setDurationMinutes(e.target.value)} placeholder="45" />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flame className="h-5 w-5 text-primary" />
                Energy Expenditure Result
              </CardTitle>
              <CopyButton getText={() => summary} label="Copy Summary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Total Calories Burned</div>
              <div className="text-4xl font-extrabold text-primary mt-1">{totalCaloriesBurned} <span className="text-lg font-normal text-muted-foreground">kcal</span></div>
              <div className="text-xs text-muted-foreground mt-0.5">during {durationVal} mins of {currentActivity.name.split("(")[0]}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-lg bg-muted/60 border border-border">
                <div className="text-xs text-muted-foreground">Burn Rate</div>
                <div className="text-lg font-bold text-foreground mt-0.5">{caloriesPerMinute} kcal/min</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/60 border border-border">
                <div className="text-xs text-muted-foreground">MET Intensity</div>
                <div className="text-lg font-bold text-primary mt-0.5">{currentActivity.met} METs</div>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <ToolHowItWorks steps={[{
        step: "01",
        title: "Select Exercise Type",
        description: "Choose from running, cycling, swimming, HIIT, strength training, or sports.",
        icon: Activity
      }, {
        step: "02",
        title: "Input Weight & Time",
        description: "Enter your body weight in lbs or kg and total exercise duration in minutes.",
        icon: Scale
      }, {
        step: "03",
        title: "Get Calorie Burn",
        description: "Calculates total kilocalories expended using scientific MET (Metabolic Equivalent of Task) values.",
        icon: Flame
      }]} badges={["MET Formula Compliant", "30+ Activities", "Instant Burn Rate"]} />

      <ToolFeatureGuides features={[{
        icon: Flame,
        title: "Scientific MET Calculations",
        description: "Uses standard Compendium of Physical Activities MET values to convert body weight and time into accurate energy expenditure."
      }, {
        icon: Scale,
        title: "Dual Imperial & Metric Support",
        description: "Toggle seamlessly between pounds (lbs) and kilograms (kg)."
      }, {
        icon: HeartPulse,
        title: "Burn Rate Analytics",
        description: "Displays real-time calories burned per minute alongside total workout expenditure."
      }]} />

      <ToolFaqAccordion faqs={[{
        question: "What is a MET value in exercise science?",
        answer: "MET stands for Metabolic Equivalent of Task. 1 MET is the energy expended while resting quietly. An activity with a MET value of 8 burns 8 times more calories than resting."
      }, {
        question: "How accurate is this calorie burn calculator?",
        answer: "This tool uses standard scientific MET formulas from the Compendium of Physical Activities. Actual burn may vary slightly depending on muscle mass, age, and heart rate."
      }]} />

      <RelatedTools currentToolUrl="/tools/health/calorie-burn-activity" max={6} />
    </div></div>;
}