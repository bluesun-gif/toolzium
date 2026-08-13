"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Activity, Flame, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
const activities = [{
  name: "Running (6 mph)",
  met: 9.8,
  category: "Running"
}, {
  name: "Running (8 mph)",
  met: 11.8,
  category: "Running"
}, {
  name: "Cycling (12-14 mph)",
  met: 8.0,
  category: "Cycling"
}, {
  name: "Cycling (16-19 mph)",
  met: 12.0,
  category: "Cycling"
}, {
  name: "Swimming (freestyle, light)",
  met: 5.8,
  category: "Swimming"
}, {
  name: "Swimming (freestyle, vigorous)",
  met: 9.8,
  category: "Swimming"
}, {
  name: "Weightlifting (general)",
  met: 3.5,
  category: "Weightlifting"
}, {
  name: "Weightlifting (vigorous)",
  met: 6.0,
  category: "Weightlifting"
}, {
  name: "Walking (3 mph)",
  met: 3.3,
  category: "Walking"
}, {
  name: "Walking (4 mph)",
  met: 5.0,
  category: "Walking"
}, {
  name: "Yoga",
  met: 2.5,
  category: "Yoga"
}, {
  name: "Housework (general)",
  met: 3.5,
  category: "Housework"
}, {
  name: "Basketball (game)",
  met: 8.0,
  category: "Sports"
}, {
  name: "Tennis (singles)",
  met: 8.0,
  category: "Sports"
}, {
  name: "Soccer (competitive)",
  met: 10.0,
  category: "Sports"
}];
const foodEquivalents = [{
  name: "slice of pizza",
  calories: 285
}, {
  name: "apple",
  calories: 95
}, {
  name: "can of soda",
  calories: 150
}, {
  name: "burger",
  calories: 500
}, {
  name: "chocolate bar",
  calories: 210
}];
export function CalorieActivityClient() {
  const [weight, setWeight] = useState("150");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [duration, setDuration] = useState("30");
  const [selectedActivity, setSelectedActivity] = useState(activities[0].name);
  const calculateCalories = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    if (isNaN(w) || isNaN(d) || w <= 0 || d <= 0) return 0;
    let weightKg = w;
    if (weightUnit === "lbs") weightKg = w * 0.453592;
    const activity = activities.find(a => a.name === selectedActivity);
    const met = activity ? activity.met : 1;

    // Formula: Calories = MET * Weight (kg) * Time (hours)
    return Math.round(met * weightKg * (d / 60));
  };
  const caloriesBurned = calculateCalories();
  const getFoodEquivalent = () => {
    if (caloriesBurned <= 0) return null;
    let closest = foodEquivalents[0];
    let count = caloriesBurned / closest.calories;
    for (const food of foodEquivalents) {
      const c = caloriesBurned / food.calories;
      if (c >= 1 && c < caloriesBurned / closest.calories) {
        closest = food;
        count = c;
      }
    }
    return "Equivalent to" + count.toFixed(1) + "" + closest.name + "(s)";
  };
  const handleReset = () => {
    setWeight("150");
    setWeightUnit("lbs");
    setDuration("30");
    setSelectedActivity(activities[0].name);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="Calorie Burn Calculator" description="Calculate calories burned for physical activities based on weight and duration." actions={<>
 <CopyButton getText={() => caloriesBurned.toString() + "calories"} label="Copy Result" />
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Activity Details</CardTitle>
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
 <SelectTrigger>
 <SelectValue placeholder="Unit" />
 </SelectTrigger>
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
 <Label>Activity</Label>
 <Select value={selectedActivity} onValueChange={setSelectedActivity}>
 <SelectTrigger>
 <SelectValue placeholder="Select activity" />
 </SelectTrigger>
 <SelectContent>
 {activities.map(a => <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6 flex flex-col items-center justify-center py-8">
 <div className="flex flex-col items-center">
 <Flame className="w-16 h-16 text-orange-500 mb-4" />
 <div className="text-5xl font-bold text-primary">{caloriesBurned}</div>
 <div className="text-lg text-muted-foreground mt-2">Calories Burned</div>
 </div>
 {caloriesBurned > 0 && <div className="text-center p-4 bg-muted rounded-lg w-full">
 <p className="text-sm font-medium">{getFoodEquivalent()}</p>
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

      <RelatedTools currentToolUrl="/tools/health/calorie-activity" max={6} />

    </div></div>;
}