"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useMemo } from"react";
import { Calculator, Copy, Dumbbell, Scale, Target, Utensils } from"lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";

export function ProteinCalcClient() {
  const [weight, setWeight] = useState("150");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [goal, setGoal] = useState("muscle");
  const resetAll = () => {
    setWeight("150");
    setWeightUnit("lbs");
    setGoal("muscle");
  };
  const results = useMemo(() => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return null;

    // convert to lbs for calculation standard
    const weightLbs = weightUnit === "kg" ? w * 2.20462 : w;
    let multiplier = 0.8;
    if (goal === "sedentary") multiplier = 0.4;else if (goal === "endurance") multiplier = 0.6;else if (goal === "muscle") multiplier = 0.8;else if (goal === "weightloss") multiplier = 1.0;
    const dailyProtein = Math.round(weightLbs * multiplier);
    const calories = dailyProtein * 4;
    return {
      daily: dailyProtein,
      calories: calories,
      meals3: Math.round(dailyProtein / 3),
      meals4: Math.round(dailyProtein / 4),
      meals5: Math.round(dailyProtein / 5)
    };
  }, [weight, weightUnit, goal]);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Dumbbell} title="Protein Intake Calculator" description="Calculate daily recommended protein intake based on body weight, goal, and activity level." actions={<ResetButton onClick={resetAll} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Your Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Weight</Label>
 <div className="flex gap-2">
 <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="flex-1" />
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
 <Label>Goal / Activity Level</Label>
 <Select value={goal} onValueChange={setGoal}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="sedentary">Sedentary / Light Activity</SelectItem>
 <SelectItem value="endurance">Endurance Athlete</SelectItem>
 <SelectItem value="muscle">Strength / Muscle Building</SelectItem>
 <SelectItem value="weightloss">Weight Loss / Retain Muscle</SelectItem>
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
 <div className="text-center p-6 bg-primary/10 rounded-xl">
 <div className="text-4xl font-bold text-primary">{results.daily}g</div>
 <div className="text-sm text-muted-foreground mt-1">Daily Protein Intake</div>
 <div className="text-sm mt-2 font-medium">{results.calories} calories from protein</div>
 </div>
 
 <div className="space-y-3">
 <h3 className="font-semibold flex items-center gap-2"><Utensils className="w-4 h-4" /> Per Meal Breakdown</h3>
 <div className="grid grid-cols-3 gap-2 text-center">
 <div className="bg-muted p-2 rounded-md">
 <div className="font-bold">{results.meals3}g</div>
 <div className="text-xs text-muted-foreground">3 Meals</div>
 </div>
 <div className="bg-muted p-2 rounded-md">
 <div className="font-bold">{results.meals4}g</div>
 <div className="text-xs text-muted-foreground">4 Meals</div>
 </div>
 <div className="bg-muted p-2 rounded-md">
 <div className="font-bold">{results.meals5}g</div>
 <div className="text-xs text-muted-foreground">5 Meals</div>
 </div>
 </div>
 </div>
 
 <div className="flex justify-end">
 <CopyButton getText={() => "Daily Protein:" + results.daily + "g (" + results.calories + "kcal). Breakdown:" + results.meals3 + "g/3 meals," + results.meals4 + "g/4 meals," + results.meals5 + "g/5 meals."} label="Copy Results" />
 </div>
 </div> : <div className="text-center p-6 text-muted-foreground">
 Enter valid details to see your recommended protein intake.
 </div>}
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
    title:"Set Goal",
    description:"Choose activity or goal.",
    icon: Target,
  },
{
    step:"03",
    title:"Calculate",
    description:"See daily protein target.",
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
    description:"Grams per kg of body weight.",
  },
{
    icon: Target,
    title:"Goal Aware",
    description:"Sedentary to athlete ranges.",
  },
{
    icon: Calculator,
    title:"Daily Target",
    description:"Grams per day.",
  },
{
    icon: Dumbbell,
    title:"Muscle Focus",
    description:"Higher for training.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A protein calculator sets daily intake from body weight and goal, since needs scale with mass and activity. Sedentary adults need far less than trained athletes building muscle. This tool applies per-kilogram ranges so your target is personalized, not a generic slogan.</p>
  <p>Goal drives the number. Resistance training and fat-loss phases raise needs to preserve or build muscle; the calculator reflects this. Spreading intake across meals improves utilization versus one large dose. The figure guides grocery and meal choices.</p>
  <p>Treat it as a target, not a strict rule; whole-food sources suit most. The tool's value is a precise protein number tailored to your body and ambition, supporting muscle and recovery goals.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How much protein?",
    answer:"Typically 0.8 to 2.0 g per kg by goal.",
  },
{
    question:"More for muscle?",
    answer:"Yes, resistance training raises need.",
  },
{
    question:"Too much?",
    answer:"Very high intakes offer no extra benefit.",
  },
{
    question:"Spread doses?",
    answer:"Distribute across meals for uptake.",
  },
{
    question:"Sources?",
    answer:"Meat, dairy, legumes, supplements.",
  }
  ]}
/>
</div>
 );
}
