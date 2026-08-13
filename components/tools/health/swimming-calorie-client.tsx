"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Activity, Flame, Clock, Scale, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type ActivityType = "freestyle_slow" | "freestyle_fast" | "breaststroke" | "backstroke" | "butterfly" | "treading" | "water_polo" | "kayaking";
const ACTIVITY_METS: Record<ActivityType, number> = {
  freestyle_slow: 5.8,
  freestyle_fast: 9.8,
  breaststroke: 10.3,
  backstroke: 7.3,
  butterfly: 13.8,
  treading: 3.5,
  water_polo: 10.0,
  kayaking: 5.0
};
const ACTIVITY_LABELS: Record<ActivityType, string> = {
  freestyle_slow: "Freestyle / Crawl (Slow/Moderate)",
  freestyle_fast: "Freestyle / Crawl (Fast/Vigorous)",
  breaststroke: "Breaststroke",
  backstroke: "Backstroke",
  butterfly: "Butterfly",
  treading: "Treading Water",
  water_polo: "Water Polo",
  kayaking: "Kayaking"
};
export function SwimmingCalorieClient() {
  const [weight, setWeight] = useState("150");
  const [isKg, setIsKg] = useState(false);
  const [duration, setDuration] = useState("30");
  const [activity, setActivity] = useState<ActivityType>("freestyle_slow");
  const handleReset = () => {
    setWeight("150");
    setIsKg(false);
    setDuration("30");
    setActivity("freestyle_slow");
    toast.success("Reset to defaults");
  };
  const parsedWeight = parseFloat(weight) || 0;
  const parsedDuration = parseFloat(duration) || 0;
  const weightInKg = isKg ? parsedWeight : parsedWeight * 0.453592;
  const met = ACTIVITY_METS[activity];

  // Calories = MET * Weight(kg) * Time(hrs)
  const calories = met * weightInKg * (parsedDuration / 60);
  const fatBurned = calories / 3500; // rough estimate 1 lb fat = 3500 kcal

  const getReport = () => {
    return "Swimming Calories Report:\nActivity:" + ACTIVITY_LABELS[activity] + "\nWeight:" + weight + (isKg ? "kg" : "lbs") + "\nDuration:" + duration + "mins\nCalories Burned:" + calories.toFixed(1) + "kcal\nFat Burned Est.:" + fatBurned.toFixed(3) + "lbs";
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Swimming & Water Sports Calorie Calculator" description="Calculate calories and fat burned during various swimming strokes and water sports." icon={Activity} actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Activity Details</CardTitle>
 <CardDescription>Enter your physical details and workout duration.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex items-center justify-between mb-2">
 <Label>Weight Unit: {isKg ? "Kilograms (kg)" : "Pounds (lbs)"}</Label>
 <Switch checked={isKg} onCheckedChange={setIsKg} />
 </div>

 <div className="space-y-2">
 <Label>Body Weight</Label>
 <div className="relative">
 <Scale className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" className="pl-10" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Enter weight" min="1" />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Duration (Minutes)</Label>
 <div className="relative">
 <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" className="pl-10" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 30" min="1" />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Stroke / Water Sport</Label>
 <Select value={activity} onValueChange={val => setActivity(val as ActivityType)}>
 <SelectTrigger>
 <SelectValue placeholder="Select activity" />
 </SelectTrigger>
 <SelectContent>
 {Object.entries(ACTIVITY_LABELS).map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 <CardDescription>Estimated calories burned.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-2 gap-4 text-center">
 <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center">
 <Flame className="h-6 w-6 text-orange-500 mb-2" />
 <span className="text-sm text-muted-foreground">Calories Burned</span>
 <span className="text-2xl font-bold">{calories.toFixed(1)}</span>
 <span className="text-xs text-muted-foreground">kcal</span>
 </div>
 <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center">
 <Activity className="h-6 w-6 text-primary mb-2" />
 <span className="text-sm text-muted-foreground">MET Value</span>
 <span className="text-2xl font-bold">{met.toFixed(1)}</span>
 <span className="text-xs text-muted-foreground">intensity</span>
 </div>
 </div>
 
 <div className="space-y-2">
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Est. Fat Burned:</span>
 <span className="font-medium">{fatBurned.toFixed(3)} lbs</span>
 </div>
 <Separator />
 </div>

 <div className="pt-4 flex justify-end">
 <CopyButton getText={getReport} label="Copy Results" />
 </div>
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
          <h3>Why Use Our Swimming & Water Sports Calorie Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Swimming & Water Sports Calorie Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/swimming-calorie" max={6} />

    </div></div>;
}