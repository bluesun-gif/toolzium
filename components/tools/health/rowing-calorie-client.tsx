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
import { Label } from"@/components/ui/label";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Clock, Flame, Scale } from"lucide-react";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Activity, Flame, Clock, Scale, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function RowingCalorieClient() {
  const [weight, setWeight] = useState("70");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [duration, setDuration] = useState("30");
  const [intensity, setIntensity] = useState("Moderate");
  const handleReset = () => {
    setWeight("70");
    setWeightUnit("kg");
    setDuration("30");
    setIntensity("Moderate");
  };
  const calculateResults = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    if (isNaN(w) || isNaN(d) || w <= 0 || d <= 0) {
      return {
        calories: 0,
        met: 0,
        watts: "0",
        split: "0:00",
        fat: 0
      };
    }
    const weightKg = weightUnit === "lbs" ? w * 0.453592 : w;
    let met = 7.0; // default moderate
    let watts = "100-150";
    let split = "2:00-2:30";
    switch (intensity) {
      case "Light":
        met = 4.8;
        watts = "<100";
        split = ">2:30";
        break;
      case "Moderate":
        met = 7.0;
        watts = "100-150";
        split = "2:00-2:30";
        break;
      case "Vigorous":
        met = 8.5;
        watts = "150-200";
        split = "1:45-2:00";
        break;
      case "Very Vigorous":
        met = 12.0;
        watts = ">200";
        split = "<1:45";
        break;
    }

    // Calories = METs * weight (kg) * duration (hours)
    const calories = met * weightKg * (d / 60);
    const fatGrams = calories * 0.6 / 9; // very rough estimate assuming 60% fat burn

    return {
      calories: calories.toFixed(1),
      met: met.toFixed(1),
      watts,
      split,
      fat: fatGrams.toFixed(1)
    };
  };
  const results = calculateResults();
  const copyResults = () => {
    return "Rowing Workout:" + duration + "mins at" + intensity + "intensity\n" + "Calories Burned:" + results.calories + "kcal\n" + "Average Split:" + results.split + "/500m";
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="Rowing Machine & Ergometer Calorie Calculator" description="Calculate your calories burned, average split pace, and power output during an ergometer workout." actions={<ResetButton onClick={handleReset} label="Reset Fields" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Details</CardTitle>
 <CardDescription>Enter your stats to estimate calories.</CardDescription>
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
 <SelectItem value="kg">kg</SelectItem>
 <SelectItem value="lbs">lbs</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Duration (Minutes)</Label>
 <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} min="1" />
 </div>

 <div className="space-y-2">
 <Label>Workout Intensity</Label>
 <Select value={intensity} onValueChange={setIntensity}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Light">Light (&lt;100 Watts)</SelectItem>
 <SelectItem value="Moderate">Moderate (100-150 Watts)</SelectItem>
 <SelectItem value="Vigorous">Vigorous (150-200 Watts)</SelectItem>
 <SelectItem value="Very Vigorous">Very Vigorous (&gt;200 Watts)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center justify-between">
 <span>Results</span>
 <CopyButton getText={copyResults} label="Copy Data" />
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-muted p-4 rounded-xl flex flex-col items-center text-center">
 <Flame className="w-8 h-8 text-orange-500 mb-2" />
 <span className="text-sm text-muted-foreground">Calories</span>
 <span className="text-2xl font-bold">{results.calories}</span>
 </div>
 <div className="bg-muted p-4 rounded-xl flex flex-col items-center text-center">
 <Clock className="w-8 h-8 text-primary mb-2" />
 <span className="text-sm text-muted-foreground">Avg Split (/500m)</span>
 <span className="text-2xl font-bold">{results.split}</span>
 </div>
 <div className="bg-muted p-4 rounded-xl flex flex-col items-center text-center">
 <Activity className="w-8 h-8 text-green-500 mb-2" />
 <span className="text-sm text-muted-foreground">Est. Watts</span>
 <span className="text-2xl font-bold">{results.watts} W</span>
 </div>
 <div className="bg-muted p-4 rounded-xl flex flex-col items-center text-center">
 <Scale className="w-8 h-8 text-primary mb-2" />
 <span className="text-sm text-muted-foreground">Fat Burned (g)</span>
 <span className="text-2xl font-bold">{results.fat}</span>
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
    title:"Enter Weight",
    description:"Add body weight.",
    icon: Scale,
  },
{
    step:"02",
    title:"Set Time",
    description:"Input rowing duration.",
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
    description:"Longer rows burn more.",
  },
{
    icon: Calculator,
    title:"Burn Estimate",
    description:"Full-body session cost.",
  },
{
    icon: Activity,
    title:"Full Body",
    description:"Engages many muscles.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A rowing calorie calculator captures a uniquely efficient, full-body workout. Rowing engages legs, core, and arms, so per-minute burn is high. This tool estimates cost from weight and duration, helping you value the session.</p>
  <p>Intensity scales the number; hard intervals burn far more than easy rows. The calculator approximates this so you can plan training and fueling. Rowing is low-impact yet powerful, making it sustainable cardio.</p>
  <p>Pair with a deficit for fat loss and log the burn. The tool's value is quantifying a time-efficient, joint-friendly workout's energy cost, supporting consistent training.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why high burn?",
    answer:"Rowing is full-body effort.",
  },
{
    question:"How estimated?",
    answer:"Weight, time, intensity.",
  },
{
    question:"Accurate?",
    answer:"Approximate; monitors vary.",
  },
{
    question:"Good cardio?",
    answer:"Yes, efficient and low impact.",
  },
{
    question:"Track it?",
    answer:"Log to balance diet.",
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
          <h3>Why Use Our Rowing Machine & Ergometer Calorie Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Rowing Machine & Ergometer Calorie Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/rowing-calorie" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
