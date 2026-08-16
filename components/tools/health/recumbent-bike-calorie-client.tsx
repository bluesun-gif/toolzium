"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Bike, Calculator, Clock, Flame, Scale } from"lucide-react";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { Activity, Flame, Clock, Scale, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function RecumbentBikeCalorieClient() {
  const [weight, setWeight] = useState("170");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [duration, setDuration] = useState("30");
  const [intensity, setIntensity] = useState("moderate");
  const [cadence, setCadence] = useState("70");
  const [calories, setCalories] = useState(0);
  const [metValue, setMetValue] = useState(0);
  const [powerWatts, setPowerWatts] = useState(0);
  const [fatBurned, setFatBurned] = useState(0);
  useEffect(() => {
    calculateCalories();
  }, [weight, weightUnit, duration, intensity, cadence]);
  const calculateCalories = () => {
    const w = parseFloat(weight) || 0;
    const d = parseFloat(duration) || 0;
    const c = parseFloat(cadence) || 70;
    let weightKg = w;
    if (weightUnit === "lbs") {
      weightKg = w * 0.453592;
    }
    let baseMet = 0;
    let baseWatts = 0;
    if (intensity === "light") {
      baseMet = 4.0;
      baseWatts = 40;
    } else if (intensity === "moderate") {
      baseMet = 5.5;
      baseWatts = 80;
    } else if (intensity === "vigorous") {
      baseMet = 7.5;
      baseWatts = 130;
    } else if (intensity === "high") {
      baseMet = 10.5;
      baseWatts = 180;
    }

    // Adjust MET slightly based on cadence if it's noticeably high or low compared to average 70
    const cadenceFactor = 1 + (c - 70) * 0.01;
    const finalMet = Math.max(1, baseMet * cadenceFactor);
    const finalWatts = Math.max(10, baseWatts * cadenceFactor);

    // Calories = MET * weight(kg) * duration(hrs)
    const durationHours = d / 60;
    const totalCals = finalMet * weightKg * durationHours;
    setMetValue(Number(finalMet.toFixed(1)));
    setPowerWatts(Math.round(finalWatts));
    setCalories(Math.round(totalCals));

    // Roughly 3500 calories per pound of fat, or 7700 per kg
    setFatBurned(Number((totalCals / 7700).toFixed(3))); // in kg roughly
  };
  const handleReset = () => {
    setWeight("170");
    setWeightUnit("lbs");
    setDuration("30");
    setIntensity("moderate");
    setCadence("70");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="Recumbent Exercise Bike Calorie Calculator" description="Calculate the calories you burn and your estimated power output on a recumbent stationary bike." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Details</CardTitle>
 <CardDescription>Enter your metrics and workout stats</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Weight</Label>
 <Input type="number" min="0" value={weight} onChange={e => setWeight(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Unit</Label>
 <Select value={weightUnit} onValueChange={setWeightUnit}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">Pounds (lbs)</SelectItem>
 <SelectItem value="kg">Kilograms (kg)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Duration (minutes)</Label>
 <div className="relative">
 <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
 <Input type="number" min="1" value={duration} onChange={e => setDuration(e.target.value)} className="pl-9" />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Intensity Level</Label>
 <Select value={intensity} onValueChange={setIntensity}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="light">Light (&lt;50 Watts, easy pedaling)</SelectItem>
 <SelectItem value="moderate">Moderate (50-100 Watts, steady)</SelectItem>
 <SelectItem value="vigorous">Vigorous (100-150 Watts, hard)</SelectItem>
 <SelectItem value="high">High Intensity (&gt;150 Watts, HIIT)</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Pedal Cadence (RPM)</Label>
 <div className="relative">
 <Activity className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
 <Input type="number" min="30" max="150" value={cadence} onChange={e => setCadence(e.target.value)} className="pl-9" />
 </div>
 <p className="text-xs text-muted-foreground mt-1">Typical cadence is 60-80 RPM</p>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard className="bg-primary/5 border-primary/20">
 <CardHeader>
 <CardTitle className="text-primary flex items-center gap-2">
 <Flame className="h-5 w-5" />
 Calories Burned
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-5xl font-bold text-center py-6 text-primary">
 {calories} <span className="text-2xl font-normal text-muted-foreground">kcal</span>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Estimates</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex justify-between items-center py-2 border-b">
 <span className="text-muted-foreground">MET Value</span>
 <span className="font-semibold text-lg">{metValue}</span>
 </div>
 <div className="flex justify-between items-center py-2 border-b">
 <span className="text-muted-foreground">Estimated Power</span>
 <span className="font-semibold text-lg">{powerWatts} Watts</span>
 </div>
 <div className="flex justify-between items-center py-2">
 <span className="text-muted-foreground">Fat Burned (est.)</span>
 <span className="font-semibold text-lg">{fatBurned} kg / {(fatBurned * 2.20462).toFixed(3)} lbs</span>
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
    description:"Input session length.",
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
    description:"Longer burns more.",
  },
{
    icon: Calculator,
    title:"Burn Estimate",
    description:"Session calories.",
  },
{
    icon: Bike,
    title:"Low Impact",
    description:"Easy on joints.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A recumbent bike calorie calculator estimates energy used on a supportive, low-impact machine. It derives burn from weight and duration at typical intensities. This tool personalizes the figure, useful for those who find upright biking uncomfortable.</p>
  <p>The recumbent position eases joints while still delivering cardio benefit, making it sustainable for many. The calculator approximates cost so you can balance intake and track training, just as with other cycling.</p>
  <p>Use the estimate to inform nutrition and consistency. The tool's value is quantifying a gentle, accessible workout's energy cost, encouraging regular movement.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How estimated?",
    answer:"Weight, time, intensity.",
  },
{
    question:"Versus upright?",
    answer:"Similar, recumbent is gentler.",
  },
{
    question:"Accurate?",
    answer:"Approximate.",
  },
{
    question:"Good for seniors?",
    answer:"Often, due to support.",
  },
{
    question:"Track it?",
    answer:"Log to balance intake.",
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
          <h3>Why Use Our Recumbent Exercise Bike Calorie Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Recumbent Exercise Bike Calorie Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/recumbent-bike-calorie" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
