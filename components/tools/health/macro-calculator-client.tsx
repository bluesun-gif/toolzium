"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { BarChart3, Calculator, PieChart, Salad, Target, User } from"lucide-react";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Salad, Calculator, BarChart3, Target, Sparkles, Shield, Zap, Copy } from "lucide-react";
;
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function MacroCalculatorClient() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState<number | "">(30);
  const [weight, setWeight] = useState<number | "">(70);
  const [height, setHeight] = useState<number | "">(170);
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");
  const [split, setSplit] = useState("balanced");
  const splits: Record<string, {
    p: number;
    c: number;
    f: number;
  }> = {
    balanced: {
      p: 30,
      c: 40,
      f: 30
    },
    low_carb: {
      p: 45,
      c: 25,
      f: 30
    },
    high_protein: {
      p: 40,
      c: 40,
      f: 20
    },
    keto: {
      p: 25,
      c: 5,
      f: 70
    }
  };
  const calculateTDEE = () => {
    if (!age || !weight || !height) return 0;
    // Mifflin-St Jeor
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += gender === "male" ? 5 : -161;
    return bmr * Number(activity);
  };
  const tdee = calculateTDEE();
  const getTargetCalories = () => {
    if (goal === "lose") return tdee - 500;
    if (goal === "gain") return tdee + 500;
    return tdee;
  };
  const calories = getTargetCalories();
  const currentSplit = splits[split];
  const macros = {
    protein: calories * (currentSplit.p / 100) / 4,
    carbs: calories * (currentSplit.c / 100) / 4,
    fats: calories * (currentSplit.f / 100) / 9
  };
  const handleReset = () => {
    setGender("male");
    setAge(30);
    setWeight(70);
    setHeight(170);
    setActivity("1.55");
    setGoal("maintain");
    setSplit("balanced");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Salad} title="Macro Calculator" description="Calculate your optimal macronutrient targets for your fitness goals" actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
 <GlassCard className="md:col-span-5 h-fit">
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5" /> Your Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Gender</Label>
 <Select value={gender} onValueChange={setGender}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="male">Male</SelectItem>
 <SelectItem value="female">Female</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Age (years)</Label>
 <Input type="number" value={age} onChange={e => setAge(e.target.value === "" ? "" : Number(e.target.value))} />
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Weight (kg)</Label>
 <Input type="number" value={weight} onChange={e => setWeight(e.target.value === "" ? "" : Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Height (cm)</Label>
 <Input type="number" value={height} onChange={e => setHeight(e.target.value === "" ? "" : Number(e.target.value))} />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Activity Level</Label>
 <Select value={activity} onValueChange={setActivity}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="1.2">Sedentary (little to no exercise)</SelectItem>
 <SelectItem value="1.375">Lightly Active (1-3 days/week)</SelectItem>
 <SelectItem value="1.55">Moderately Active (3-5 days/week)</SelectItem>
 <SelectItem value="1.725">Very Active (6-7 days/week)</SelectItem>
 <SelectItem value="1.9">Extra Active (physical job/training)</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <Separator className="my-4" />

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Your Goal</Label>
 <Select value={goal} onValueChange={setGoal}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="lose">Weight Loss</SelectItem>
 <SelectItem value="maintain">Maintenance</SelectItem>
 <SelectItem value="gain">Muscle Gain</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Macro Split</Label>
 <Select value={split} onValueChange={setSplit}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="balanced">Balanced (30/40/30)</SelectItem>
 <SelectItem value="low_carb">Low Carb (45/25/30)</SelectItem>
 <SelectItem value="high_protein">High Protein (40/40/20)</SelectItem>
 <SelectItem value="keto">Keto (25/5/70)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="md:col-span-7 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5" /> Your Targets</CardTitle>
 <CardDescription>Daily nutritional requirements based on your profile</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="text-center py-6 bg-primary/5 rounded-xl border mb-6">
 <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">Daily Calories</p>
 <p className="text-5xl font-bold text-primary">{Math.round(calories)} <span className="text-xl font-normal text-muted-foreground">kcal</span></p>
 </div>

 <div className="space-y-4">
 <Label>Macronutrients</Label>
 <div className="grid grid-cols-3 gap-4">
 <div className="p-4 rounded-xl border bg-card text-center">
 <p className="text-lg font-bold text-primary">{Math.round(macros.protein)}g</p>
 <p className="text-xs text-muted-foreground mt-1">Protein ({currentSplit.p}%)</p>
 </div>
 <div className="p-4 rounded-xl border bg-card text-center">
 <p className="text-lg font-bold text-green-500">{Math.round(macros.carbs)}g</p>
 <p className="text-xs text-muted-foreground mt-1">Carbs ({currentSplit.c}%)</p>
 </div>
 <div className="p-4 rounded-xl border bg-card text-center">
 <p className="text-lg font-bold text-orange-500">{Math.round(macros.fats)}g</p>
 <p className="text-xs text-muted-foreground mt-1">Fats ({currentSplit.f}%)</p>
 </div>
 </div>

 <div className="mt-8">
 <div className="h-4 w-full flex rounded-full overflow-hidden">
 <div style={{
                      width: `${currentSplit.p}%`
                    }} className="bg-blue-500" title={`Protein: ${currentSplit.p}%`} />
 <div style={{
                      width: `${currentSplit.c}%`
                    }} className="bg-green-500" title={`Carbs: ${currentSplit.c}%`} />
 <div style={{
                      width: `${currentSplit.f}%`
                    }} className="bg-orange-500" title={`Fats: ${currentSplit.f}%`} />
 </div>
 <div className="flex justify-between mt-2 text-xs text-muted-foreground px-1">
 <span>Protein</span>
 <span>Carbs</span>
 <span>Fats</span>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Stats",
    description:"Add weight, height, age, activity.",
    icon: User,
  },
{
    step:"02",
    title:"Set Split",
    description:"Choose protein, carb, fat ratio.",
    icon: PieChart,
  },
{
    step:"03",
    title:"Calculate",
    description:"See daily macro targets.",
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
    icon: PieChart,
    title:"Macro Split",
    description:"Protein, carb, fat grams.",
  },
{
    icon: Calculator,
    title:"Daily Targets",
    description:"Grams per macro.",
  },
{
    icon: Target,
    title:"Goal Aware",
    description:"Cut, maintain, bulk.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A macro calculator breaks a calorie target into protein, carbohydrate, and fat grams, the composition that drives results. Calories set the total; macros set the quality. This tool derives gram targets from your stats and a chosen split, so you eat for purpose.</p>
  <p>Prioritize protein. It preserves muscle during deficits and aids recovery during bulks, making it the anchor of any split. The calculator allocates it first, then divides remaining calories among carbs and fats based on your preference and goal. Cutting often leans higher protein.</p>
  <p>Treat outputs as starting points, refining with how your body responds. Logging confirms adherence to the split. The tool's value is translating a calorie goal into actionable gram targets, the practical language of nutrition.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What are macros?",
    answer:"Protein, carbohydrates, fats.",
  },
{
    question:"Why track them?",
    answer:"Composition matters, not just calories.",
  },
{
    question:"Protein first?",
    answer:"It preserves muscle; prioritize it.",
  },
{
    question:"Split for cutting?",
    answer:"Higher protein, moderate others.",
  },
{
    question:"Accurate?",
    answer:"Estimate; adjust to results.",
  }
  ]}
/>
</div>
 );
}
=======
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Macro Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Macro Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/health/macro-calculator" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
