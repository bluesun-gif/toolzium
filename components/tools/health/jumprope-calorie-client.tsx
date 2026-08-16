"use client";
<<<<<<< HEAD
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
import { ResetButton, ActionButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Clock, Flame, Scale } from"lucide-react";
import { cn } from"@/lib/utils";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton, ActionButton } from "@/components/shared/action-buttons";
import { Activity, Flame, Clock, Scale, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function JumpropeCalorieClient() {
  const [weight, setWeight] = useState("150");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [duration, setDuration] = useState("15");
  const [intensity, setIntensity] = useState("moderate");
  const [workoutType, setWorkoutType] = useState("jumprope");

  // MET values mapping
  const metValues: Record<string, Record<string, number>> = {
    jumprope: {
      slow: 8.8,
      moderate: 11.8,
      fast: 12.3,
      double_unders: 14.0
    },
    hiit: {
      tabata: 12.0,
      bodyweight: 8.0,
      kettlebell: 9.8,
      burpees: 11.0
    }
  };
  const calculateCalories = () => {
    let weightKg = parseFloat(weight) || 0;
    if (weightUnit === "lbs") {
      weightKg = weightKg * 0.453592;
    }
    const durationMins = parseFloat(duration) || 0;
    const met = metValues[workoutType]?.[intensity] || 10;

    // Formula: Calories = MET * Weight (kg) * Duration (hrs)
    const caloriesBurned = met * weightKg * (durationMins / 60);
    return Math.round(caloriesBurned);
  };
  const handleReset = () => {
    setWeight("150");
    setWeightUnit("lbs");
    setDuration("15");
    setIntensity("moderate");
    setWorkoutType("jumprope");
  };
  const calories = calculateCalories();
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="Jump Rope & HIIT Calculator" description="Calculate total calories burned during jump rope and HIIT workouts." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Workout Type</Label>
 <Select value={workoutType} onValueChange={setWorkoutType}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="jumprope">Jump Rope</SelectItem>
 <SelectItem value="hiit">HIIT (High-Intensity Interval Training)</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Intensity / Style</Label>
 <Select value={intensity} onValueChange={setIntensity}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {workoutType === "jumprope" ? <>
 <SelectItem value="slow">Slow ({'<'}100 jumps/min)</SelectItem>
 <SelectItem value="moderate">Moderate (100-120 jumps/min)</SelectItem>
 <SelectItem value="fast">Fast (120-160 jumps/min)</SelectItem>
 <SelectItem value="double_unders">Double Unders</SelectItem>
 </> : <>
 <SelectItem value="tabata">Tabata Protocol</SelectItem>
 <SelectItem value="bodyweight">Bodyweight Circuit</SelectItem>
 <SelectItem value="kettlebell">Kettlebell Swings</SelectItem>
 <SelectItem value="burpees">Burpees Focus</SelectItem>
 </>}
 </SelectContent>
 </Select>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Body Weight</Label>
 <div className="flex">
 <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="rounded-r-none" />
 <Select value={weightUnit} onValueChange={setWeightUnit}>
 <SelectTrigger className="w-[80px] rounded-l-none border-l-0"><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">lbs</SelectItem>
 <SelectItem value="kg">kg</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 <div className="space-y-2">
 <Label>Duration (mins)</Label>
 <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 <CardDescription>Estimated calories burned</CardDescription>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center space-y-6 h-full py-8">
 <div className="text-center space-y-2">
 <div className="flex items-center justify-center gap-2 text-primary">
 <Flame className="w-12 h-12" />
 <span className="text-6xl font-bold">{calories}</span>
 </div>
 <p className="text-muted-foreground text-lg">Calories Burned</p>
 </div>

 <div className="w-full grid grid-cols-2 gap-4 text-center mt-8">
 <div className="bg-muted p-4 rounded-lg">
 <p className="text-sm text-muted-foreground mb-1">MET Value</p>
 <p className="text-xl font-semibold">{metValues[workoutType]?.[intensity] || 10}</p>
 </div>
 <div className="bg-muted p-4 rounded-lg">
 <p className="text-sm text-muted-foreground mb-1">Calories/Min</p>
 <p className="text-xl font-semibold">
 {parseFloat(duration) > 0 ? (calories / parseFloat(duration)).toFixed(1) : "0"}
 </p>
 </div>
 </div>
 </CardContent>
 </GlassCard>
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
    description:"Short, intense sessions.",
  },
{
    icon: Calculator,
    title:"Burn Estimate",
    description:"High per minute.",
  },
{
    icon: Flame,
    title:"HIIT Ready",
    description:"Great for intervals.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A jump rope calorie calculator captures a surprisingly intense workout. Rope work is full-body and high-effort, burning a lot per minute, which makes it efficient for busy schedules. This tool estimates the cost from your weight and session time.</p>
  <p>Intensity is the draw. Short, hard sessions rival longer moderate ones for calorie burn and cardiovascular benefit. The calculator approximates this so you can slot effective training into minutes. Beginners should ramp gradually given the demand.</p>
  <p>Pair with a deficit for fat loss and log the burn to balance. The tool's value is highlighting an efficient, minimal-equipment workout's energy cost, encouraging consistent, time-efficient training.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why high burn?",
    answer:"Jumping is intense, full-body effort.",
  },
{
    question:"How estimated?",
    answer:"Weight, time, intensity.",
  },
{
    question:"Beginner friendly?",
    answer:"Start slow; it is demanding.",
  },
{
    question:"Accurate?",
    answer:"Approximate; varies by effort.",
  },
{
    question:"Use for fat loss?",
    answer:"Yes, with a deficit.",
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
          <h3>Why Use Our Jump Rope & HIIT Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Jump Rope & HIIT Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/jumprope-calorie" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
