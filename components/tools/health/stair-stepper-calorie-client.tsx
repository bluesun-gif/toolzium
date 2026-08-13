"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Activity, Flame, Clock, Scale, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

const INTENSITIES: Record<string, number> = {
"light": 5.0,
"moderate": 7.0,
"vigorous": 9.0,
"interval": 11.0,
};

export function StairStepperCalorieClient() {
 const [weight, setWeight] = useState("150");
 const [weightUnit, setWeightUnit] = useState("lbs");
 const [duration, setDuration] = useState("30");
 const [stepRate, setStepRate] = useState("60");
 const [intensity, setIntensity] = useState("moderate");
 
 const [calories, setCalories] = useState("0");
 const [met, setMet] = useState("0");
 const [totalSteps, setTotalSteps] = useState("0");
 const [flights, setFlights] = useState("0");

 const calculate = () => {
 const w = parseFloat(weight);
 const d = parseFloat(duration);
 const sr = parseFloat(stepRate);
 
 if (isNaN(w) || isNaN(d) || isNaN(sr) || w <= 0 || d <= 0 || sr <= 0) {
 toast.error("Please enter valid numbers");
 return;
 }

 const weightKg = weightUnit ==="lbs"? w * 0.453592 : w;
 const metValue = INTENSITIES[intensity];
 const cals = (metValue * 3.5 * weightKg / 200) * d;
 const steps = sr * d;
 const fl = steps / 15;

 setCalories(cals.toFixed(0));
 setMet(metValue.toFixed(1));
 setTotalSteps(steps.toFixed(0));
 setFlights(fl.toFixed(0));
 };

 const handleReset = () => {
 setWeight("150");
 setWeightUnit("lbs");
 setDuration("30");
 setStepRate("60");
 setIntensity("moderate");
 setCalories("0");
 setMet("0");
 setTotalSteps("0");
 setFlights("0");
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Activity}
 title="Stair Stepper & StepMill Calorie Calculator"
 description="Calculate total calories burned on stair steppers and StepMill machines."
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Details</CardTitle>
 <CardDescription>Enter your stats to calculate burn</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Body Weight</Label>
 <Input type="number"min="1"value={weight} onChange={(e) => setWeight(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Unit</Label>
 <Select value={weightUnit} onValueChange={setWeightUnit}>
 <SelectTrigger><SelectValue placeholder="Unit"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">lbs</SelectItem>
 <SelectItem value="kg">kg</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Duration (mins)</Label>
 <Input type="number"min="1"value={duration} onChange={(e) => setDuration(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Step Rate (steps/min)</Label>
 <Input type="number"min="1"value={stepRate} onChange={(e) => setStepRate(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Workout Intensity</Label>
 <Select value={intensity} onValueChange={setIntensity}>
 <SelectTrigger><SelectValue placeholder="Intensity"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="light">Light Step (easy pace)</SelectItem>
 <SelectItem value="moderate">Moderate Step (steady cardio)</SelectItem>
 <SelectItem value="vigorous">Vigorous Step (fast tempo)</SelectItem>
 <SelectItem value="interval">Interval Step (HIIT)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <ActionButton onClick={calculate} icon={Activity} label="Calculate Calories"/>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 <CardDescription>Your estimated workout stats</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-secondary/50 p-4 rounded-xl text-center">
 <Flame className="w-8 h-8 mx-auto text-primary mb-2"/>
 <div className="text-3xl font-bold">{calories}</div>
 <div className="text-sm text-muted-foreground">Calories Burned</div>
 </div>
 <div className="bg-secondary/50 p-4 rounded-xl text-center">
 <Scale className="w-8 h-8 mx-auto text-primary mb-2"/>
 <div className="text-3xl font-bold">{met}</div>
 <div className="text-sm text-muted-foreground">MET Score</div>
 </div>
 </div>

 <Separator />

 <div className="space-y-2">
 <div className="flex justify-between items-center bg-secondary/30 p-3 rounded-lg">
 <span className="font-medium">Total Steps</span>
 <span className="font-bold text-lg">{totalSteps}</span>
 </div>
 <div className="flex justify-between items-center bg-secondary/30 p-3 rounded-lg">
 <span className="font-medium">Flights Climbed (est.)</span>
 <span className="font-bold text-lg">{flights}</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Stair Stepper & StepMill Calorie Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Stair Stepper & StepMill Calorie Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/health/stair-stepper-calorie" max={6} />

</div>
 );
}
