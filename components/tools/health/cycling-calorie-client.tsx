"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Flame, Clock, Scale, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function CyclingCalorieClient() {
  const [weight, setWeight] = useState("150");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [duration, setDuration] = useState("60");
  const [intensity, setIntensity] = useState("Moderate (10-12 mph)");
  const [terrain, setTerrain] = useState("Flat");
  const getMetValue = () => {
    let met = 4;
    switch (intensity) {
      case "Leisure (<10 mph)":
        met = 4.0;
        break;
      case "Moderate (10-12 mph)":
        met = 6.8;
        break;
      case "Vigorous (12-14 mph)":
        met = 8.0;
        break;
      case "Racing (14-16 mph)":
        met = 10.0;
        break;
      case "Racing (16-19 mph)":
        met = 12.0;
        break;
      case "Racing (>20 mph)":
        met = 15.8;
        break;
      case "Mountain Biking":
        met = 8.5;
        break;
      case "Stationary Bike":
        met = 7.0;
        break;
    }
    if (terrain === "Hilly") met *= 1.2;
    if (terrain === "Steep Uphill") met *= 1.5;
    return met;
  };
  const calculateResults = () => {
    const weightVal = parseFloat(weight) || 0;
    const durationVal = parseFloat(duration) || 0;
    if (weightVal <= 0 || durationVal <= 0) return null;
    const weightKg = weightUnit === "lbs" ? weightVal * 0.453592 : weightVal;
    const met = getMetValue();
    const calories = met * weightKg * (durationVal / 60);
    const fatBurned = calories / 7700; // rough estimate kg

    // Average power estimation: Power = Calories / (duration/60) * 0.28
    const power = calories / (durationVal / 60) * 0.28;
    return {
      calories: Math.round(calories),
      power: Math.round(power),
      met: met.toFixed(1),
      fatBurned: weightUnit === "lbs" ? (fatBurned * 2.20462).toFixed(2) + "lbs" : fatBurned.toFixed(2) + "kg"
    };
  };
  const results = calculateResults();
  const getCopyText = () => {
    if (!results) return "";
    return "Cycling Results:" + results.calories + "Calories Burned, Estimated Power:" + results.power + "Watts, Duration:" + duration + "mins.";
  };
  const handleReset = () => {
    setWeight("150");
    setDuration("60");
    setIntensity("Moderate (10-12 mph)");
    setTerrain("Flat");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="Cycling & Biking Calorie & Power Calculator" description="Calculate calories burned and estimated mechanical power output during your cycling sessions." actions={<div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset" />
 <CopyButton getText={getCopyText} label="Copy Results" />
 </div>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Session Details</CardTitle>
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
 <Label>Intensity Level</Label>
 <Select value={intensity} onValueChange={setIntensity}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Leisure (<10 mph)">Leisure (&lt;10 mph)</SelectItem>
 <SelectItem value="Moderate (10-12 mph)">Moderate (10-12 mph)</SelectItem>
 <SelectItem value="Vigorous (12-14 mph)">Vigorous (12-14 mph)</SelectItem>
 <SelectItem value="Racing (14-16 mph)">Racing (14-16 mph)</SelectItem>
 <SelectItem value="Racing (16-19 mph)">Racing (16-19 mph)</SelectItem>
 <SelectItem value="Racing (>20 mph)">Racing (&gt;20 mph)</SelectItem>
 <SelectItem value="Mountain Biking">Mountain Biking</SelectItem>
 <SelectItem value="Stationary Bike">Stationary Bike</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Terrain / Gradient</Label>
 <Select value={terrain} onValueChange={setTerrain}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Flat">Flat</SelectItem>
 <SelectItem value="Hilly">Hilly</SelectItem>
 <SelectItem value="Steep Uphill">Steep Uphill</SelectItem>
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
 <div className="p-6 bg-primary/10 rounded-xl text-center space-y-2">
 <Flame className="w-8 h-8 text-primary mx-auto mb-2" />
 <div className="text-4xl font-bold text-primary">{results.calories}</div>
 <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Calories Burned</div>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-muted rounded-lg text-center space-y-1">
 <Activity className="w-5 h-5 mx-auto text-primary mb-1" />
 <div className="text-2xl font-bold">{results.power} W</div>
 <div className="text-xs text-muted-foreground uppercase">Est. Power</div>
 </div>
 <div className="p-4 bg-muted rounded-lg text-center space-y-1">
 <Clock className="w-5 h-5 mx-auto text-orange-500 mb-1" />
 <div className="text-2xl font-bold">{results.met}</div>
 <div className="text-xs text-muted-foreground uppercase">MET Value</div>
 </div>
 </div>
 
 <div className="p-4 bg-muted rounded-lg text-center space-y-1">
 <Scale className="w-5 h-5 mx-auto text-green-500 mb-1" />
 <div className="text-xl font-bold">{results.fatBurned}</div>
 <div className="text-xs text-muted-foreground uppercase">Est. Fat Burned</div>
 </div>
 </div> : <div className="text-center text-muted-foreground p-8">
 Please enter valid weight and duration to see results.
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
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
          <h3>Why Use Our Cycling & Biking Calorie & Power Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Cycling & Biking Calorie & Power Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/cycling-calorie" max={6} />

    </div></div>;
}