"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Label } from"@/components/ui/label";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Clock, Dumbbell, Flame, TrendingUp, Copy } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";

const activities = [
 { name:"Running (6 mph)", met: 9.8, category:"Running"},
 { name:"Running (8 mph)", met: 11.8, category:"Running"},
 { name:"Cycling (12-14 mph)", met: 8.0, category:"Cycling"},
 { name:"Cycling (16-19 mph)", met: 12.0, category:"Cycling"},
 { name:"Swimming (freestyle, light)", met: 5.8, category:"Swimming"},
 { name:"Swimming (freestyle, vigorous)", met: 9.8, category:"Swimming"},
 { name:"Weightlifting (general)", met: 3.5, category:"Weightlifting"},
 { name:"Weightlifting (vigorous)", met: 6.0, category:"Weightlifting"},
 { name:"Walking (3 mph)", met: 3.3, category:"Walking"},
 { name:"Walking (4 mph)", met: 5.0, category:"Walking"},
 { name:"Yoga", met: 2.5, category:"Yoga"},
 { name:"Housework (general)", met: 3.5, category:"Housework"},
 { name:"Basketball (game)", met: 8.0, category:"Sports"},
 { name:"Tennis (singles)", met: 8.0, category:"Sports"},
 { name:"Soccer (competitive)", met: 10.0, category:"Sports"}
];

const foodEquivalents = [
 { name:"slice of pizza", calories: 285 },
 { name:"apple", calories: 95 },
 { name:"can of soda", calories: 150 },
 { name:"burger", calories: 500 },
 { name:"chocolate bar", calories: 210 }
];

export function CalorieActivityClient() {
  const [weight, setWeight] = useState("150");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [duration, setDuration] = useState("30");
  const [selectedActivity, setSelectedActivity] = useState(activities[0].name);
  const calculateCalories = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    if (isNaN(w) || isNaN(d) || w <= 0 || d <= 0) return 0;
    let weightKg = w;
    if (weightUnit === "lbs") weightKg = w * 0.453592;
    const activity = activities.find(a => a.name === selectedActivity);
    const met = activity ? activity.met : 1;

    // Formula: Calories = MET * Weight (kg) * Time (hours)
    return Math.round(met * weightKg * (d / 60));
  };
  const caloriesBurned = calculateCalories();
  const getFoodEquivalent = () => {
    if (caloriesBurned <= 0) return null;
    let closest = foodEquivalents[0];
    let count = caloriesBurned / closest.calories;
    for (const food of foodEquivalents) {
      const c = caloriesBurned / food.calories;
      if (c >= 1 && c < caloriesBurned / closest.calories) {
        closest = food;
        count = c;
      }
    }
    return "Equivalent to" + count.toFixed(1) + "" + closest.name + "(s)";
  };
  const handleReset = () => {
    setWeight("150");
    setWeightUnit("lbs");
    setDuration("30");
    setSelectedActivity(activities[0].name);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Activity} title="Calorie Burn Calculator" description="Calculate calories burned for physical activities based on weight and duration." actions={<>
 <CopyButton getText={() => caloriesBurned.toString() + "calories"} label="Copy Result" />
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Activity Details</CardTitle>
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
 <Label>Duration (minutes)</Label>
 <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} min="1" />
 </div>

 <div className="space-y-2">
 <Label>Activity</Label>
 <Select value={selectedActivity} onValueChange={setSelectedActivity}>
 <SelectTrigger>
 <SelectValue placeholder="Select activity" />
 </SelectTrigger>
 <SelectContent>
 {activities.map(a => <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6 flex flex-col items-center justify-center py-8">
 <div className="flex flex-col items-center">
 <Flame className="w-16 h-16 text-orange-500 mb-4" />
 <div className="text-5xl font-bold text-primary">{caloriesBurned}</div>
 <div className="text-lg text-muted-foreground mt-2">Calories Burned</div>
 </div>
 {caloriesBurned > 0 && <div className="text-center p-4 bg-muted rounded-lg w-full">
 <p className="text-sm font-medium">{getFoodEquivalent()}</p>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Pick Activity",
    description:"Select an exercise type.",
    icon: Dumbbell,
  },
{
    step:"02",
    title:"Enter Data",
    description:"Add duration and weight.",
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
    icon: Dumbbell,
    title:"Activity List",
    description:"Many exercises covered.",
  },
{
    icon: Clock,
    title:"Duration Based",
    description:"Longer burns more.",
  },
{
    icon: Calculator,
    title:"Burn Estimate",
    description:"Calories for the session.",
  },
{
    icon: TrendingUp,
    title:"Context",
    description:"Helps balance intake.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A calorie burn calculator estimates energy used during activity, useful for balancing intake and expenditure. It derives burn from metabolic equivalents (METs), your weight, and duration — standard inputs that approximate real cost. This tool covers many exercises so you can compare them and plan movement.</p>
  <p>Weight and time scale the result. Heavier bodies expend more per minute, and longer sessions naturally burn more. The calculator makes these relationships visible, helping you choose activities that fit your goals and schedule rather than guessing which workout &quot;counts&quot; most.</p>
  <p>Treat estimates as guidance. Wearables and formulas differ, so use the number to balance, not to justify overeating. Pair with a deficit target from a BMR tool for coherent planning. The calculator's value is quantifying movement's energy cost, closing the loop between eating and training.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/calorie-activity" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"How is burn estimated?",
    answer:"From MET values, weight, and time.",
  },
{
    question:"Accurate?",
    answer:"Approximate; devices vary.",
  },
{
    question:"Does weight matter?",
    answer:"Heavier bodies burn more per minute.",
  },
{
    question:"Use for diet?",
    answer:"Balance intake against burn.",
  },
{
    question:"Best exercise?",
    answer:"One you sustain consistently.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default CalorieActivityClient;
