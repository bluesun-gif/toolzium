"use client";

import { cn } from "@/lib/utils";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Switch } from"@/components/ui/switch";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Flame, TrendingUp, User } from"lucide-react";

export function BmrCalculatorClient() {
  const [age, setAge] = useState<string>("25");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isMetric, setIsMetric] = useState<boolean>(true);
  const [weight, setWeight] = useState<string>("70");
  const [heightCm, setHeightCm] = useState<string>("175");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("9");
  const [equation, setEquation] = useState<"mifflin" | "harris">("mifflin");
  const bmr = useMemo(() => {
    const ageNum = parseFloat(age);
    let weightKg = parseFloat(weight);
    let heightCmNum = parseFloat(heightCm);
    if (!isMetric) {
      weightKg = parseFloat(weight) * 0.453592;
      heightCmNum = (parseFloat(heightFt) * 12 + (parseFloat(heightIn) || 0)) * 2.54;
    }
    if (!ageNum || !weightKg || !heightCmNum) return null;
    if (equation === "mifflin") {
      if (gender === "male") {
        return 10 * weightKg + 6.25 * heightCmNum - 5 * ageNum + 5;
      } else {
        return 10 * weightKg + 6.25 * heightCmNum - 5 * ageNum - 161;
      }
    } else {
      if (gender === "male") {
        return 88.362 + 13.397 * weightKg + 4.799 * heightCmNum - 5.677 * ageNum;
      } else {
        return 447.593 + 9.247 * weightKg + 3.098 * heightCmNum - 4.33 * ageNum;
      }
    }
  }, [age, gender, isMetric, weight, heightCm, heightFt, heightIn, equation]);
  const reset = () => {
    setAge("25");
    setGender("male");
    setIsMetric(true);
    setWeight("70");
    setHeightCm("175");
    setHeightFt("5");
    setHeightIn("9");
    setEquation("mifflin");
  };
  const bmrValue = bmr ? Math.round(bmr) : 0;
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Calculator} title="BMR Calculator" description="Calculate your Basal Metabolic Rate and daily calorie needs." actions={<ResetButton onClick={reset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Your Details</CardTitle>
 <CardDescription>Enter your physical details</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex items-center justify-between">
 <Label>Unit System</Label>
 <div className="flex items-center gap-2">
 <span className={cn("text-sm", !isMetric ? "font-bold" : "text-muted-foreground")}>Imperial</span>
 <Switch checked={isMetric} onCheckedChange={setIsMetric} />
 <span className={cn("text-sm", isMetric ? "font-bold" : "text-muted-foreground")}>Metric</span>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Age (years)</Label>
 <Input type="number" value={age} onChange={e => setAge(e.target.value)} min="15" max="100" />
 </div>
 <div className="space-y-2">
 <Label>Gender</Label>
 <Select value={gender} onValueChange={(v: "male" | "female") => setGender(v)}>
 <SelectTrigger>
 <SelectValue placeholder="Gender" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="male">Male</SelectItem>
 <SelectItem value="female">Female</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Weight ({isMetric ? "kg" : "lbs"})</Label>
 <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
 </div>

 {isMetric ? <div className="space-y-2">
 <Label>Height (cm)</Label>
 <Input type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
 </div> : <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Height (ft)</Label>
 <Input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Height (in)</Label>
 <Input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
 </div>
 </div>}

 <div className="space-y-2">
 <Label>Equation</Label>
 <Select value={equation} onValueChange={(v: "mifflin" | "harris") => setEquation(v)}>
 <SelectTrigger>
 <SelectValue placeholder="Equation" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="mifflin">Mifflin-St Jeor</SelectItem>
 <SelectItem value="harris">Harris-Benedict</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Flame className="w-5 h-5 text-orange-500" /> BMR Result</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-center py-6">
 <div className="text-5xl font-bold text-primary">{bmrValue > 0 ? bmrValue : "---"}</div>
 <div className="text-muted-foreground mt-2">Calories / Day</div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Daily Needs by Activity Level</CardTitle>
 </CardHeader>
 <CardContent>
 {bmrValue > 0 ? <div className="space-y-3">
 <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
 <span className="font-medium">Sedentary (Little/no exercise)</span>
 <span>{Math.round(bmrValue * 1.2)} kcal</span>
 </div>
 <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
 <span className="font-medium">Lightly Active (1-3 days/week)</span>
 <span>{Math.round(bmrValue * 1.375)} kcal</span>
 </div>
 <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
 <span className="font-medium">Moderately Active (3-5 days/week)</span>
 <span>{Math.round(bmrValue * 1.55)} kcal</span>
 </div>
 <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
 <span className="font-medium">Very Active (6-7 days/week)</span>
 <span>{Math.round(bmrValue * 1.725)} kcal</span>
 </div>
 <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
 <span className="font-medium">Extra Active (Physical job)</span>
 <span>{Math.round(bmrValue * 1.9)} kcal</span>
 </div>
 </div> : <div className="text-center py-6 text-muted-foreground">
 Enter your details to see calorie needs
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Metrics",
    description:"Add age, sex, height, weight.",
    icon: User,
  },
{
    step:"02",
    title:"Calculate",
    description:"See resting calorie burn.",
    icon: Calculator,
  },
{
    step:"03",
    title:"Apply",
    description:"Use it as your baseline.",
    icon: TrendingUp,
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
    icon: Calculator,
    title:"Resting Burn",
    description:"Calories at complete rest.",
  },
{
    icon: TrendingUp,
    title:"Baseline",
    description:"Foundation for diet planning.",
  },
{
    icon: Activity,
    title:"Next Step",
    description:"Add activity for TDEE.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A BMR calculator reveals the calories your body burns at rest just to stay alive — breathing, circulation, cell repair. It is the metabolic floor beneath every diet decision. This tool estimates it from age, sex, height, and weight using standard formulas, giving you a baseline before layering in activity.</p>
  <p>BMR is the anchor. Eating at or below it risks fatigue and muscle loss; eating above, with activity added, supports goals. Knowing BMR prevents the error of setting intake off an arbitrary number. The calculator provides the personalized floor so your plan starts from biology, not guesswork.</p>
  <p>Treat it as an estimate. Real metabolism varies with genetics and composition, so refine using results over time. Pair BMR with an activity multiplier to get TDEE, then adjust intake accordingly. The tool's value is grounding nutrition in your actual resting burn, the first number worth knowing.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/bmr-calculator" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"BMR vs TDEE?",
    answer:"BMR is rest only; TDEE adds activity.",
  },
{
    question:"Why know BMR?",
    answer:"It is the floor your intake should exceed.",
  },
{
    question:"Accurate?",
    answer:"Formula estimate with individual variance.",
  },
{
    question:"Can I eat at BMR?",
    answer:"That is very low; add activity needs.",
  },
{
    question:"How to use it?",
    answer:"Set diet relative to BMR plus movement.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default BmrCalculatorClient;
