"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Flame, Target, Calendar, AlertTriangle, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function CalorieDeficitClient() {
 const [currentWeight, setCurrentWeight] = useState("200");
 const [goalWeight, setGoalWeight] = useState("180");
 const [heightCm, setHeightCm] = useState("180");
 const [age, setAge] = useState("30");
 const [gender, setGender] = useState("male");
 const [activity, setActivity] = useState("1.2");
 const [dailyTarget, setDailyTarget] = useState("1800");
 
 const [result, setResult] = useState<any>(null);

 const calculate = () => {
 const w = parseFloat(currentWeight);
 const g = parseFloat(goalWeight);
 const h = parseFloat(heightCm);
 const a = parseFloat(age);
 const intake = parseFloat(dailyTarget);
 const act = parseFloat(activity);

 if (!w || !g || !h || !a || !intake) {
 toast.error("Please fill in all fields");
 return;
 }

 let bmrLbs = (10 * w * 0.453592) + (6.25 * h) - (5 * a);
 if (gender ==="male") bmrLbs += 5;
 else bmrLbs -= 161;
 
 const tdee = bmrLbs * act;
 const deficit = tdee - intake;
 const weeklyLossLbs = (deficit * 7) / 3500;
 
 if (w <= g) {
 toast.error("Current weight must be greater than goal weight.");
 return;
 }
 
 if (deficit <= 0) {
 toast.error("You are not in a calorie deficit.");
 return;
 }
 
 const totalLbsToLose = w - g;
 const weeksToGoal = totalLbsToLose / weeklyLossLbs;
 
 const date = new Date();
 date.setDate(date.getDate() + weeksToGoal * 7);
 
 setResult({
 bmr: Math.round(bmrLbs),
 tdee: Math.round(tdee),
 deficit: Math.round(deficit),
 weeklyLoss: weeklyLossLbs.toFixed(2),
 date: date.toLocaleDateString(),
 warning: weeklyLossLbs > 2
 });
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader icon={Flame} title="Calorie Deficit Estimator"description="Calculate your estimated target date to reach your goal weight based on daily calorie deficit."actions={
 <React.Fragment>
 <ResetButton onClick={() => setResult(null)} label="Clear"/>
 <ActionButton onClick={calculate} icon={Target} label="Calculate"/>
 </React.Fragment>
 } />
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <GlassCard>
 <CardHeader>
 <CardTitle>Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Current Weight (lbs)</Label>
 <Input type="number"value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Goal Weight (lbs)</Label>
 <Input type="number"value={goalWeight} onChange={e => setGoalWeight(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Height (cm)</Label>
 <Input type="number"value={heightCm} onChange={e => setHeightCm(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Age</Label>
 <Input type="number"value={age} onChange={e => setAge(e.target.value)} />
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Gender</Label>
 <Select value={gender} onValueChange={setGender}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="male">Male</SelectItem>
 <SelectItem value="female">Female</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Activity Level</Label>
 <Select value={activity} onValueChange={setActivity}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="1.2">Sedentary (1.2)</SelectItem>
 <SelectItem value="1.375">Light Activity (1.375)</SelectItem>
 <SelectItem value="1.55">Moderate Activity (1.55)</SelectItem>
 <SelectItem value="1.725">Active (1.725)</SelectItem>
 <SelectItem value="1.9">Very Active (1.9)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Daily Calorie Target</Label>
 <Input type="number"value={dailyTarget} onChange={e => setDailyTarget(e.target.value)} />
 </div>
 
 <Button onClick={calculate} className="w-full">Calculate</Button>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Estimation</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 {result ? (
 <div className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-1">
 <Label className="text-muted-foreground">BMR</Label>
 <div className="text-xl font-bold">{result.bmr} kcal</div>
 </div>
 <div className="space-y-1">
 <Label className="text-muted-foreground">TDEE</Label>
 <div className="text-xl font-bold">{result.tdee} kcal</div>
 </div>
 <div className="space-y-1">
 <Label className="text-muted-foreground">Daily Deficit</Label>
 <div className="text-xl font-bold">{result.deficit} kcal</div>
 </div>
 <div className="space-y-1">
 <Label className="text-muted-foreground">Weekly Loss</Label>
 <div className="text-xl font-bold">{result.weeklyLoss} lbs</div>
 </div>
 </div>
 
 <Separator />
 
 <div className="text-center space-y-2">
 <Label className="text-muted-foreground">Estimated Goal Date</Label>
 <div className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
 <Calendar className="w-6 h-6"/> {result.date}
 </div>
 </div>
 
 {result.warning && (
 <div className={"flex items-center gap-2 p-3 text-sm text-yellow-800 bg-yellow-100 rounded-md dark:bg-yellow-900/30 dark:text-yellow-200"}>
 <AlertTriangle className="w-5 h-5 flex-shrink-0"/>
 Losing more than 2 lbs per week is generally not recommended.
 </div>
 )}
 </div>
 ) : (
 <div className="text-center text-muted-foreground py-8">
 Fill in the details and calculate to see your estimation.
 </div>
 )}
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
          <h3>Why Use Our Calorie Deficit Estimator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Calorie Deficit Estimator provides
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

      <RelatedTools currentToolUrl="/tools/health/calorie-deficit" max={6} />

</div>
 );
}
