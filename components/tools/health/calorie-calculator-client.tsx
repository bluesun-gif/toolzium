"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Activity, Calculator, RotateCcw, Target, TrendingUp, User } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type Gender ="male"|"female";
type Unit ="metric"|"imperial";

const ACTIVITY_MULTIPLIERS = {
 sedentary: 1.2,
 light: 1.375,
 moderate: 1.55,
 active: 1.725,
 extra: 1.9,
};

type ActivityLevel = keyof typeof ACTIVITY_MULTIPLIERS;

interface Macros {
 protein: number;
 carbs: number;
 fat: number;
}

interface GoalResult {
 calories: number;
 macros: Macros;
 title: string;
 description: string;
}

interface Results {
 bmr: number;
 tdee: number;
 loss: GoalResult;
 maintain: GoalResult;
 gain: GoalResult;
}

export default function CalorieCalculatorClient() {
 const [unit, setUnit] = useState<Unit>("metric");
 const [gender, setGender] = useState<Gender>("male");
 const [age, setAge] = useState<string>("");
 const [heightMetric, setHeightMetric] = useState<string>("");
 const [weightMetric, setWeightMetric] = useState<string>("");
 const [heightFt, setHeightFt] = useState<string>("");
 const [heightIn, setHeightIn] = useState<string>("");
 const [weightLbs, setWeightLbs] = useState<string>("");
 const [activity, setActivity] = useState<ActivityLevel>("sedentary");
 const [results, setResults] = useState<Results | null>(null);

 const calculateMacros = (calories: number, type:"loss"|"maintain"|"gain"): Macros => {
 let pPercent, cPercent, fPercent;
 if (type ==="loss") {
 pPercent = 0.4; cPercent = 0.3; fPercent = 0.3;
 } else if (type ==="maintain") {
 pPercent = 0.3; cPercent = 0.4; fPercent = 0.3;
 } else {
 pPercent = 0.3; cPercent = 0.45; fPercent = 0.25;
 }

 return {
 protein: Math.round((calories * pPercent) / 4),
 carbs: Math.round((calories * cPercent) / 4),
 fat: Math.round((calories * fPercent) / 9),
 };
 };

 const handleCalculate = (e: React.FormEvent) => {
 e.preventDefault();

 let h = 0;
 let w = 0;
 const a = parseInt(age);

 if (isNaN(a) || a <= 0 || a > 120) {
 toast.error("Please enter a valid age (1-120).");
 return;
 }

 if (unit ==="metric") {
 h = parseFloat(heightMetric);
 w = parseFloat(weightMetric);
 } else {
 const ft = parseFloat(heightFt) || 0;
 const inch = parseFloat(heightIn) || 0;
 h = (ft * 30.48) + (inch * 2.54);
 w = parseFloat(weightLbs) * 0.453592;
 }

 if (isNaN(h) || h <= 0 || isNaN(w) || w <= 0) {
 toast.error("Please enter valid height and weight values.");
 return;
 }

 // Mifflin-St Jeor
 let bmr = (10 * w) + (6.25 * h) - (5 * a);
 bmr += gender ==="male"? 5 : -161;
 bmr = Math.round(bmr);

 const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[activity]);

 setResults({
 bmr,
 tdee,
 loss: {
 title:"Weight Loss",
 description:"-500 cal/day (-1 lb/week)",
 calories: tdee - 500,
 macros: calculateMacros(tdee - 500,"loss")
 },
 maintain: {
 title:"Maintenance",
 description:"Maintain current weight",
 calories: tdee,
 macros: calculateMacros(tdee,"maintain")
 },
 gain: {
 title:"Weight Gain",
 description:"+500 cal/day (+1 lb/week)",
 calories: tdee + 500,
 macros: calculateMacros(tdee + 500,"gain")
 }
 });
 
 toast.success("Calories calculated successfully!");
 };

 const handleReset = () => {
 setAge("");
 setHeightMetric("");
 setWeightMetric("");
 setHeightFt("");
 setHeightIn("");
 setWeightLbs("");
 setResults(null);
 };

 const MacroBar = ({ macros, calories }: { macros: Macros, calories: number }) => {
 const pWidth = (macros.protein * 4 / calories) * 100;
 const cWidth = (macros.carbs * 4 / calories) * 100;
 const fWidth = (macros.fat * 9 / calories) * 100;
 
 return (
      <div className="relative mt-4 space-y-2">
      <ToolBackground />

 <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
 <div style={{ width: `\${pWidth}%` }} className="bg-blue-500"/>
 <div style={{ width: `\${cWidth}%` }} className="bg-green-500"/>
 <div style={{ width: `\${fWidth}%` }} className="bg-orange-500"/>
 </div>
 <div className="flex justify-between text-xs text-muted-foreground">
 <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-blue-500"/> Protein: {macros.protein}g</span>
 <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-green-500"/> Carbs: {macros.carbs}g</span>
 <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-orange-500"/> Fat: {macros.fat}g</span>
 </div>
 </div>
 );
 };

 return (
 <div className="mx-auto max-w-5xl px-4 py-8">
 <ToolPageHeader
 title="Calorie Calculator"
 description="Calculate your daily calorie needs and macronutrient breakdown for weight loss, maintenance, or gain."
 />

 <div className="mt-8 grid gap-8 md:grid-cols-2">
 {/* Form Card */}
 <Card className="dark:bg-zinc-900/30">
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="h-5 w-5 text-primary"/>
 Calculator Settings
 </CardTitle>
 </CardHeader>
 <CardContent>
 <form onSubmit={handleCalculate} className="space-y-6">
 {/* Unit Toggle */}
 <div className="flex rounded-md border border-input p-1">
 <Button type="button"variant={unit ==="metric"?"secondary":"ghost"} className="flex-1 rounded-sm h-8"onClick={() => setUnit("metric")}>Metric</Button>
 <Button type="button"variant={unit ==="imperial"?"secondary":"ghost"} className="flex-1 rounded-sm h-8"onClick={() => setUnit("imperial")}>Imperial</Button>
 </div>

 {/* Gender */}
 <div className="space-y-3">
 <Label>Gender</Label>
 <div className="flex gap-4">
 <Button type="button"variant={gender ==="male"?"default":"outline"} className="flex-1"onClick={() => setGender("male")}>Male</Button>
 <Button type="button"variant={gender ==="female"?"default":"outline"} className="flex-1"onClick={() => setGender("female")}>Female</Button>
 </div>
 </div>

 {/* Age */}
 <div className="space-y-3">
 <Label htmlFor="age">Age (years)</Label>
 <Input id="age"type="number"placeholder="e.g. 30"value={age} onChange={(e) => setAge(e.target.value)} required min="1"max="120"/>
 </div>

 {/* Height & Weight */}
 <div className="grid gap-4 sm:grid-cols-2">
 <div className="space-y-3">
 <Label>Height</Label>
 {unit ==="metric"? (
 <div className="relative">
 <Input type="number"placeholder="cm"value={heightMetric} onChange={(e) => setHeightMetric(e.target.value)} required min="1"/>
 <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">cm</span>
 </div>
 ) : (
 <div className="flex gap-2">
 <Input type="number"placeholder="ft"value={heightFt} onChange={(e) => setHeightFt(e.target.value)} required min="1"/>
 <Input type="number"placeholder="in"value={heightIn} onChange={(e) => setHeightIn(e.target.value)} required min="0"max="11"/>
 </div>
 )}
 </div>
 <div className="space-y-3">
 <Label>Weight</Label>
 {unit ==="metric"? (
 <div className="relative">
 <Input type="number"placeholder="kg"value={weightMetric} onChange={(e) => setWeightMetric(e.target.value)} required min="1"/>
 <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">kg</span>
 </div>
 ) : (
 <div className="relative">
 <Input type="number"placeholder="lbs"value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} required min="1"/>
 <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">lbs</span>
 </div>
 )}
 </div>
 </div>

 {/* Activity Level */}
 <div className="space-y-3">
 <Label>Activity Level</Label>
 <Select value={activity} onValueChange={(v: ActivityLevel) => setActivity(v)}>
 <SelectTrigger>
 <SelectValue placeholder="Select activity level"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="sedentary">Sedentary (office job, little to no exercise)</SelectItem>
 <SelectItem value="light">Lightly Active (light exercise 1-3 days/week)</SelectItem>
 <SelectItem value="moderate">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
 <SelectItem value="active">Very Active (hard exercise 6-7 days/week)</SelectItem>
 <SelectItem value="extra">Extra Active (athlete, very hard exercise)</SelectItem>
 </SelectContent>
 </Select>
 </div>

 {/* Actions */}
 <div className="flex gap-4 pt-2">
 <Button type="submit"className="flex-1">Calculate</Button>
 <Button type="button"variant="outline"onClick={handleReset}><RotateCcw className="h-4 w-4"/></Button>
 </div>
 </form>
 </CardContent>
 </Card>

 {/* Results Section */}
 <div className="space-y-6">
 {results ? (
 <>
 <Card className="dark:bg-zinc-900/30 border-primary/20">
 <CardHeader className="pb-4">
 <CardTitle className="text-xl">Your Maintenance Calories (TDEE)</CardTitle>
 <CardDescription>The amount of calories needed to maintain your current weight.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-col items-center justify-center py-4 text-center">
 <div className="text-5xl font-bold text-primary">{results.tdee}</div>
 <div className="mt-2 text-sm text-muted-foreground">Calories / Day</div>
 <div className="mt-4 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md">
 Basal Metabolic Rate (BMR): <span className="font-semibold text-foreground">{results.bmr}</span> kcal
 </div>
 </div>
 </CardContent>
 </Card>

 <div className="grid gap-4">
 {[results.loss, results.maintain, results.gain].map((goal, idx) => (
 <Card key={idx} className="dark:bg-zinc-900/30">
 <CardHeader className="pb-3 pt-4">
 <div className="flex items-center justify-between">
 <div>
 <CardTitle className="text-lg">{goal.title}</CardTitle>
 <CardDescription>{goal.description}</CardDescription>
 </div>
 <div className="text-xl font-bold">{goal.calories} <span className="text-sm font-normal text-muted-foreground">kcal</span></div>
 </div>
 </CardHeader>
 <CardContent className="pb-4 pt-0">
 <MacroBar macros={goal.macros} calories={goal.calories} />
 </CardContent>
 </Card>
 ))}
 </div>
 </>
 ) : (
 <Card className="flex h-full min-h-[400px] flex-col items-center justify-center border-dashed dark:bg-zinc-900/10 text-center p-6">
 <div className="rounded-full bg-primary/10 p-4 mb-4">
 <Activity className="h-8 w-8 text-primary"/>
 </div>
 <h3 className="text-lg font-semibold mb-2">Awaiting Input</h3>
 <p className="text-sm text-muted-foreground max-w-xs">Fill out the form and click Calculate to see your daily calorie needs and macronutrient breakdown.</p>
 </Card>
 )}
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Stats",
    description:"Add age, sex, height, weight.",
    icon: User,
  },
{
    step:"02",
    title:"Set Goal",
    description:"Maintain, lose, or gain.",
    icon: Target,
  },
{
    step:"03",
    title:"Calculate",
    description:"See daily calorie target.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: User,
    title:"Personalized",
    description:"From your body data.",
  },
{
    icon: Target,
    title:"Goal Modes",
    description:"Cut, maintain, bulk.",
  },
{
    icon: Calculator,
    title:"Daily Target",
    description:"Clear eat number.",
  },
{
    icon: TrendingUp,
    title:"Adaptive",
    description:"Adjust as you progress.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A calorie calculator converts your body and goal into a daily eating target, the cornerstone of any nutrition plan. It estimates energy expenditure from your stats, then adjusts for maintain, lose, or gain. This tool delivers a single, personalized number that removes the ambiguity sabotaging most diets.</p>
  <p>Goal mode sets direction. Maintenance matches expenditure; a deficit drives fat loss; a surplus supports muscle gain. The calculator applies a sensible adjustment so the target is achievable, not extreme. Starting from your real expenditure beats copying someone else's plan.</p>
  <p>Refine with feedback. Bodies differ, so if weight stalls, nudge intake and recheck trends. Pair the target with logging to confirm adherence. The tool's value is a defensible daily calorie number tailored to you, replacing vague eating rules with a measurable plan.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How is target set?",
    answer:"TDEE adjusted by goal.",
  },
{
    question:"What is maintenance?",
    answer:"Calories matching TDEE.",
  },
{
    question:"Lose or gain?",
    answer:"Deficit or surplus vs TDEE.",
  },
{
    question:"Accurate?",
    answer:"Estimate; refine with results.",
  },
{
    question:"Track intake?",
    answer:"Logging confirms adherence.",
  }
  ]}
/>
</div>
 );
}
