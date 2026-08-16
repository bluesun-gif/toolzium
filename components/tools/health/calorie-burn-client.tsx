"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calculator, Dumbbell, Flame, Scale, Timer, Weight, Zap } from"lucide-react";
=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { Zap, Activity, Timer, Weight, Sparkles, Shield, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

// List of activities with MET values
const activities = [{
  id: "walking_slow",
  name: "Walking (Slow, 2 mph)",
  met: 2.8,
  tip: "Great for active recovery and basic daily movement."
}, {
  id: "walking_brisk",
  name: "Walking (Brisk, 3.5 mph)",
  met: 4.3,
  tip: "Excellent for cardiovascular health."
}, {
  id: "running_5mph",
  name: "Running (5 mph)",
  met: 8.3,
  tip: "High impact, good for burning calories fast."
}, {
  id: "running_7mph",
  name: "Running (7 mph)",
  met: 11.5,
  tip: "Intense cardio workout."
}, {
  id: "cycling_leisure",
  name: "Cycling (Leisure, 10 mph)",
  met: 4.0,
  tip: "Low impact on joints."
}, {
  id: "cycling_vigorous",
  name: "Cycling (Vigorous, 14-16 mph)",
  met: 10.0,
  tip: "Builds lower body strength and endurance."
}, {
  id: "swimming_laps",
  name: "Swimming (Laps, moderate)",
  met: 5.8,
  tip: "Full body workout with zero joint impact."
}, {
  id: "swimming_vigorous",
  name: "Swimming (Vigorous)",
  met: 9.8,
  tip: "Burns serious calories and builds upper body strength."
}, {
  id: "yoga",
  name: "Yoga (Hatha)",
  met: 2.5,
  tip: "Improves flexibility and mental wellbeing."
}, {
  id: "dancing",
  name: "Dancing (Aerobic, general)",
  met: 7.3,
  tip: "Fun way to do cardio."
}, {
  id: "hiking",
  name: "Hiking (Cross country)",
  met: 6.0,
  tip: "Engages stabilizing muscles."
}, {
  id: "weight_training",
  name: "Weight Training (General)",
  met: 3.5,
  tip: "Builds muscle, which increases resting metabolic rate."
}, {
  id: "tennis",
  name: "Tennis (Singles)",
  met: 8.0,
  tip: "Improves agility and hand-eye coordination."
}, {
  id: "basketball",
  name: "Basketball (Game)",
  met: 8.0,
  tip: "Involves sprinting and jumping."
}, {
  id: "jump_rope",
  name: "Jumping Rope (Moderate)",
  met: 10.0,
  tip: "One of the most efficient calorie burners."
}];
export function CalorieBurnClient() {
  const [weight, setWeight] = useState<string>("70");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [duration, setDuration] = useState<string>("30");
  const [selectedActivityId, setSelectedActivityId] = useState<string>(activities[0].id);
  const handleReset = () => {
    setWeight("70");
    setWeightUnit("kg");
    setDuration("30");
    setSelectedActivityId(activities[0].id);
  };
  const selectedActivity = activities.find(a => a.id === selectedActivityId) || activities[0];

  // Calculate calories: Calories = MET * Weight(kg) * Duration(hrs)
  const weightInKg = weightUnit === "kg" ? parseFloat(weight) || 0 : (parseFloat(weight) || 0) * 0.453592;
  const durationInHours = (parseFloat(duration) || 0) / 60;
  const calculateCalories = (met: number) => {
    return (met * weightInKg * durationInHours).toFixed(0);
  };
  const caloriesBurned = calculateCalories(selectedActivity.met);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Zap} title="Calorie Burn Calculator" description="Estimate how many calories you burn doing different activities based on your weight and duration." actions={<ResetButton onClick={handleReset} label="Reset" />} />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Input Parameters</CardTitle>
 <CardDescription>Enter your details to calculate calories.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Weight</Label>
 <div className="flex space-x-2">
 <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} min="1" />
 <Select value={weightUnit} onValueChange={(v: "kg" | "lbs") => setWeightUnit(v)}>
 <SelectTrigger className="w-24">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="kg">kg</SelectItem>
 <SelectItem value="lbs">lbs</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Duration (minutes)</Label>
 <div className="flex items-center gap-2">
 <Timer className="h-4 w-4 text-muted-foreground" />
 <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} min="1" />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Activity</Label>
 <Select value={selectedActivityId} onValueChange={setSelectedActivityId}>
 <SelectTrigger>
 <SelectValue placeholder="Select an activity" />
 </SelectTrigger>
 <SelectContent>
 {activities.map(act => <SelectItem key={act.id} value={act.id}>
 {act.name}
 </SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="bg-primary/5 border-primary/20">
 <CardHeader>
 <CardTitle className="flex items-center gap-2 text-primary">
 <Zap className="h-6 w-6" />
 Estimated Calories Burned
 </CardTitle>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center space-y-6 py-8">
 <div className="text-center">
 <div className="text-6xl font-bold text-primary">{caloriesBurned}</div>
 <div className="text-xl text-muted-foreground mt-2">kcal</div>
 </div>
 
 <div className="bg-background/80 p-4 rounded-lg w-full text-center space-y-2">
 <div className="font-medium text-foreground flex items-center justify-center gap-2">
 <Activity className="h-4 w-4 text-primary" />
 {selectedActivity.name}
 </div>
 <p className="text-sm text-muted-foreground">
 Tip: {selectedActivity.tip}
 </p>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Compare Activities</CardTitle>
 <CardDescription>See how many calories you would burn doing other activities for {duration} minutes.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
 {activities.slice(0, 5).map(act => <div key={act.id} className="p-3 rounded-md bg-secondary/50 flex flex-col items-center text-center space-y-1">
 <span className="text-xs text-muted-foreground font-medium">{act.name}</span>
 <span className="text-lg font-bold text-primary">{calculateCalories(act.met)}</span>
 <span className="text-xs text-muted-foreground">kcal</span>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Choose Exercise",
    description:"Select from the list.",
    icon: Dumbbell,
  },
{
    step:"02",
    title:"Add Weight & Time",
    description:"Input your stats.",
    icon: Scale,
  },
{
    step:"03",
    title:"See Burn",
    description:"Get estimated calories.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Dumbbell,
    title:"Exercise Library",
    description:"Broad coverage.",
  },
{
    icon: Scale,
    title:"Weight Aware",
    description:"Personalizes the result.",
  },
{
    icon: Calculator,
    title:"Result",
    description:"Calories for the workout.",
  },
{
    icon: Flame,
    title:"Energy View",
    description:"Makes burn tangible.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A calorie burn calculator makes exercise's energy cost concrete. By combining activity type, your weight, and duration, it estimates calories used, helping you understand movement's role in your overall balance. This tool simplifies that math across many exercises so comparison is easy.</p>
  <p>Three factors dominate. Intensity sets the rate, duration sets the total, and body weight scales both. The calculator surfaces these so you grasp why a heavy, long session burns more than a light, short one. That understanding helps you plan realistically.</p>
  <p>Use the estimate to inform, not to overcompensate. A hard workout does not license a large binge; balance matters. Log burns alongside intake for a weekly picture. The tool's value is translating effort into a number you can weigh against food, closing the energy-balance loop.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What drives burn?",
    answer:"Intensity, duration, and body weight.",
  },
{
    question:"Why estimate?",
    answer:"To balance diet and activity.",
  },
{
    question:"Accurate?",
    answer:"Approximate; useful for trends.",
  },
{
    question:"High or low intensity?",
    answer:"Both burn; pick sustainable.",
  },
{
    question:"Track it?",
    answer:"Log to see weekly totals.",
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
          <h3>Why Use Our Calorie Burn Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Calorie Burn Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/calorie-burn" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
