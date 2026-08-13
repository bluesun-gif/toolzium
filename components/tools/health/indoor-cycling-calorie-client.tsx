"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Activity, Flame, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type Unit = "lbs" | "kg";
type Intensity = "low" | "moderate" | "high" | "sprint";
const MET_VALUES: Record<Intensity, number> = {
  low: 4.8,
  // Very light to light effort (50-100 watts)
  moderate: 7.0,
  // Moderate effort (101-150 watts)
  high: 8.5,
  // Vigorous effort (151-200 watts)
  sprint: 10.5 // Very vigorous / Sprint intervals (201+ watts)
};
export function IndoorCyclingCalorieClient() {
  const [weight, setWeight] = useState("150");
  const [unit, setUnit] = useState<Unit>("lbs");
  const [duration, setDuration] = useState("45");
  const [intensity, setIntensity] = useState<Intensity>("moderate");
  const [cadence, setCadence] = useState("80");
  const w = parseFloat(weight);
  const d = parseFloat(duration);
  const rpm = parseFloat(cadence);
  const isValid = !isNaN(w) && !isNaN(d) && !isNaN(rpm) && w > 0 && d > 0;
  const weightKg = unit === "lbs" ? w * 0.453592 : w;
  const met = MET_VALUES[intensity];
  const calories = isValid ? met * 3.5 * weightKg / 200 * d : 0;
  const power = isValid ? met * weightKg * 1.16 / (0.22 * 4) : 0;
  const fatBurned = isValid ? calories / 3500 : 0;
  const handleReset = () => {
    setWeight("150");
    setUnit("lbs");
    setDuration("45");
    setIntensity("moderate");
    setCadence("80");
  };
  const getResultsText = () => {
    return "Calories Burned:" + Math.round(calories) + "kcal\n" + "Estimated Power:" + Math.round(power) + "Watts\n" + "Fat Burned:" + fatBurned.toFixed(2) + "lbs";
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="Indoor Cycling & Spin Bike Calorie Calculator" description="Calculate calories burned during stationary spin bike and indoor cycling workouts." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Details</CardTitle>
 <CardDescription>Enter your stats and session info.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Body Weight</Label>
 <div className="flex">
 <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="rounded-r-none" />
 <Select value={unit} onValueChange={(val: Unit) => setUnit(val)}>
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

 <div className="space-y-2">
 <Label>Resistance / Intensity Level</Label>
 <Select value={intensity} onValueChange={(val: Intensity) => setIntensity(val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="low">Low (Recovery Pace)</SelectItem>
 <SelectItem value="moderate">Moderate (Steady Aerobic)</SelectItem>
 <SelectItem value="high">High (Tempo Threshold)</SelectItem>
 <SelectItem value="sprint">Sprint Intervals (HIIT/Spin Class)</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Average Cadence (RPM)</Label>
 <Input type="number" value={cadence} onChange={e => setCadence(e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 <CardDescription>Your estimated energy expenditure.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="p-6 bg-primary/10 rounded-lg flex flex-col items-center justify-center border border-primary/20">
 <Flame className="w-12 h-12 text-primary mb-2" />
 <div className="text-4xl font-bold text-primary">{Math.round(calories)}</div>
 <div className="text-sm text-muted-foreground mt-1">Total Calories Burned (kcal)</div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-muted rounded-md text-center">
 <div className="text-2xl font-bold">{Math.round(power)} W</div>
 <div className="text-xs text-muted-foreground">Est. Power Output</div>
 </div>
 <div className="p-4 bg-muted rounded-md text-center">
 <div className="text-2xl font-bold">{MET_VALUES[intensity]}</div>
 <div className="text-xs text-muted-foreground">MET Value</div>
 </div>
 <div className="p-4 bg-muted rounded-md text-center col-span-2">
 <div className="text-2xl font-bold">{fatBurned.toFixed(3)} lbs</div>
 <div className="text-xs text-muted-foreground">Est. Fat Burned</div>
 </div>
 </div>

 <CopyButton getText={getResultsText} label="Copy Results" />
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
          <h3>Why Use Our Indoor Cycling & Spin Bike Calorie Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Indoor Cycling & Spin Bike Calorie Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/indoor-cycling-calorie" max={6} />

    </div></div>;
}