"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Flame, Timer, Scale, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function PaceCalorieClient() {
 const [weight, setWeight] = useState<number>(150);
 const [weightUnit, setWeightUnit] = useState<"lbs"|"kg">("lbs");
 const [distance, setDistance] = useState<number>(3);
 const [distanceUnit, setDistanceUnit] = useState<"miles"|"km">("miles");
 const [runPace, setRunPace] = useState<number>(9); // min/mile
 const [walkPace, setWalkPace] = useState<number>(20); // min/mile

 // Calculations
 const weightKg = weightUnit ==="lbs"? weight * 0.453592 : weight;
 
 // Speed in mph
 const runSpeedMph = distanceUnit ==="miles"? 60 / runPace : (60 / runPace) * 0.621371;
 const walkSpeedMph = distanceUnit ==="miles"? 60 / walkPace : (60 / walkPace) * 0.621371;

 // Approximate MET values
 const getRunMET = (mph: number) => {
 if (mph < 5) return 8; // jogging
 if (mph <= 6) return 9.8; // 10 min/mile
 if (mph <= 7) return 11.0; // 8.5 min/mile
 if (mph <= 8) return 11.8; // 7.5 min/mile
 return 12.8; // > 8 mph
 };
 
 const getWalkMET = (mph: number) => {
 if (mph < 3) return 3.0; // slow
 if (mph <= 3.5) return 3.8; // brisk
 if (mph <= 4) return 5.0; // fast
 return 6.3; // very fast
 };

 const runMET = getRunMET(runSpeedMph);
 const walkMET = getWalkMET(walkSpeedMph);

 // Time in hours
 const runTimeHours = (runPace * distance) / 60;
 const walkTimeHours = (walkPace * distance) / 60;

 // Calories = MET × weight(kg) × time(hrs)
 const runCalories = runMET * weightKg * runTimeHours;
 const walkCalories = walkMET * weightKg * walkTimeHours;

 const handleReset = () => {
 setWeight(150);
 setDistance(3);
 setRunPace(9);
 setWalkPace(20);
 };

 return (
 <div className={"space-y-6"}>
      <GridPattern />

 <ToolPageHeader
 icon={Activity}
 title={"Pace & Calorie Calculator"}
 description={"Compare calories burned running vs walking the same distance."}
 actions={<ResetButton onClick={handleReset} label={"Reset"} />}
 />

 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center space-x-2"}>
 <Scale className={"w-5 h-5"} />
 <span>{"Input Parameters"}</span>
 </CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"grid grid-cols-2 gap-4"}>
 <div className={"space-y-2"}>
 <Label>{"Body Weight"}</Label>
 <Input type="number"value={weight} onChange={(e) => setWeight(Number(e.target.value))} min="1"/>
 </div>
 <div className={"space-y-2"}>
 <Label>{"Unit"}</Label>
 <Select value={weightUnit} onValueChange={(v:"lbs"|"kg") => setWeightUnit(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">{"lbs"}</SelectItem>
 <SelectItem value="kg">{"kg"}</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className={"grid grid-cols-2 gap-4"}>
 <div className={"space-y-2"}>
 <Label>{"Distance"}</Label>
 <Input type="number"value={distance} onChange={(e) => setDistance(Number(e.target.value))} min="0.1"step="0.1"/>
 </div>
 <div className={"space-y-2"}>
 <Label>{"Unit"}</Label>
 <Select value={distanceUnit} onValueChange={(v:"miles"|"km") => setDistanceUnit(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="miles">{"Miles"}</SelectItem>
 <SelectItem value="km">{"Kilometers"}</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className={"space-y-2"}>
 <Label>{"Running Pace (min/"+ distanceUnit +")"}</Label>
 <Input type="number"value={runPace} onChange={(e) => setRunPace(Number(e.target.value))} min="4"max="30"step="0.5"/>
 </div>

 <div className={"space-y-2"}>
 <Label>{"Walking Pace (min/"+ distanceUnit +")"}</Label>
 <Input type="number"value={walkPace} onChange={(e) => setWalkPace(Number(e.target.value))} min="10"max="60"step="0.5"/>
 </div>
 </CardContent>
 </GlassCard>

 <div className={"space-y-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center space-x-2"}>
 <Flame className={"w-5 h-5"} />
 <span>{"Results"}</span>
 </CardTitle>
 </CardHeader>
 <CardContent className={"space-y-6"}>
 <div className={"grid grid-cols-2 gap-4"}>
 <div className={"p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center"}>
 <div className={"text-sm text-muted-foreground mb-1"}>{"Running Calories"}</div>
 <div className={"text-3xl font-bold text-primary"}>{Math.round(runCalories)}</div>
 <div className={"text-xs mt-2"}>{(runTimeHours * 60).toFixed(1) +"mins"}</div>
 </div>
 <div className={"p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center"}>
 <div className={"text-sm text-muted-foreground mb-1"}>{"Walking Calories"}</div>
 <div className={"text-3xl font-bold text-green-600 dark:text-green-400"}>{Math.round(walkCalories)}</div>
 <div className={"text-xs mt-2"}>{(walkTimeHours * 60).toFixed(1) +"mins"}</div>
 </div>
 </div>
 <div className={"p-4 bg-slate-50 rounded-lg"}>
 <h4 className={"font-semibold mb-2 flex items-center"}>
 <Timer className={"w-4 h-4 mr-2"} />
 {"Time Saved"}
 </h4>
 <p>{"Running saves you"+ ((walkTimeHours - runTimeHours) * 60).toFixed(1) +"minutes compared to walking the same distance."}</p>
 </div>
 </CardContent>
 </GlassCard>
 </div>
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
          <h3>Why Use Our "Pace & Calorie Calculator"?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our "Pace & Calorie Calculator" provides
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

      <RelatedTools currentToolUrl="/tools/health/pace-calorie" max={6} />

</div>
 );
}
