"use client";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Droplets, Plus, BarChart3, RotateCcw, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function HydrationClient() {
 const [goal, setGoal] = useState(2000); // ml
 const [intake, setIntake] = useState(0);
 const [history, setHistory] = useState<Record<string, number>>({});
  
 const todayDate = new Date().toISOString().split("T")[0];

 useEffect(() => {
 const savedGoal = localStorage.getItem("tz-hydro-goal");
 const savedIntake = localStorage.getItem("tz-hydro-intake");
 const savedDate = localStorage.getItem("tz-hydro-date");
 const savedHistory = localStorage.getItem("tz-hydro-history");

 if (savedGoal) setGoal(Number(savedGoal));
 if (savedHistory) setHistory(JSON.parse(savedHistory));
 
 if (savedDate === todayDate && savedIntake) {
 setIntake(Number(savedIntake));
 } else if (savedDate !== todayDate) {
 if (savedDate && savedIntake) {
 // Save previous day to history
 const hist = savedHistory ? JSON.parse(savedHistory) : {};
 hist[savedDate] = Number(savedIntake);
 setHistory(hist);
 localStorage.setItem("tz-hydro-history", JSON.stringify(hist));
 }
 setIntake(0);
 localStorage.setItem("tz-hydro-date", todayDate);
 }
  }, [todayDate]);

 const updateIntake = (amount: number) => {
 const newIntake = Math.max(0, intake + amount);
 setIntake(newIntake);
 localStorage.setItem("tz-hydro-intake", newIntake.toString());
 localStorage.setItem("tz-hydro-date", todayDate);
 
 // Update history for today instantly
 const newHistory = { ...history, [todayDate]: newIntake };
 setHistory(newHistory);
 localStorage.setItem("tz-hydro-history", JSON.stringify(newHistory));
 };

 const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const val = Number(e.target.value) || 2000;
 setGoal(val);
 localStorage.setItem("tz-hydro-goal", val.toString());
 };

 const handleReset = () => {
 setIntake(0);
 localStorage.setItem("tz-hydro-intake","0");
 const newHistory = { ...history, [todayDate]: 0 };
 setHistory(newHistory);
 localStorage.setItem("tz-hydro-history", JSON.stringify(newHistory));
 };

 const percentage = Math.min(100, Math.round((intake / goal) * 100)) || 0;
 
 // Last 7 days history
 const historyDates = Array.from({ length: 7 }, (_, i) => {
 const d = new Date();
 d.setDate(d.getDate() - i);
 return d.toISOString().split("T")[0];
 }).reverse();
 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Droplets}
 title="Hydration Reminder"
 description="Track your daily water intake with visual progress."
 actions={<ResetButton onClick={handleReset} label="Reset Today"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex justify-between items-center">
 <span>Today's Progress</span>
 <span className="text-xl font-bold text-primary">{percentage}%</span>
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex justify-center">
 {/* Visual Water Level */}
 <div className="relative w-40 h-40 rounded-full border-4 border-muted overflow-hidden flex items-center justify-center bg-background shadow-inner">
 <div 
 className="absolute bottom-0 left-0 w-full bg-blue-400 transition-all duration-1000 ease-in-out opacity-80"
 style={{ height: `${percentage}%` }}
 />
 <div className="relative z-10 flex flex-col items-center">
 <span className="font-bold text-2xl drop-shadow-md">{intake} ml</span>
 <span className="text-xs text-muted-foreground font-medium drop-shadow-sm">/ {goal} ml</span>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-3">
 <Button variant="outline"onClick={() => updateIntake(250)} className="flex gap-2">
 <Plus className="w-4 h-4"/> 250ml Glass
 </Button>
 <Button variant="outline"onClick={() => updateIntake(330)} className="flex gap-2">
 <Plus className="w-4 h-4"/> 330ml Can
 </Button>
 <Button variant="outline"onClick={() => updateIntake(500)} className="flex gap-2">
 <Plus className="w-4 h-4"/> 500ml Bottle
 </Button>
 <Button variant="outline"onClick={() => updateIntake(1000)} className="flex gap-2">
 <Plus className="w-4 h-4"/> 1L Bottle
 </Button>
 </div>
 
 <div className="pt-2">
 <Label>Daily Goal (ml)</Label>
 <Input type="number"value={goal} onChange={handleGoalChange} className="mt-1"step={100} min={500} />
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <BarChart3 className="w-5 h-5"/> Last 7 Days
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex items-end gap-2 h-40">
 {historyDates.map(date => {
 const dayIntake = history[date] || 0;
 const dayPercent = Math.min(100, (dayIntake / goal) * 100);
 const isToday = date === todayDate;
 const dObj = new Date(date);
 const dayName = dObj.toLocaleDateString(undefined, { weekday: 'short' });
 
 return (
 <div key={date} className="flex-1 flex flex-col items-center gap-2">
 <div className="w-full bg-muted rounded-t-sm h-full flex items-end justify-center relative overflow-hidden group">
 <div 
 className={cn("w-full bg-blue-300 transition-all", isToday &&"bg-blue-500")}
 style={{ height: `${dayPercent}%` }}
 />
 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 text-white text-xs transition-opacity">
 {dayIntake}
 </div>
 </div>
 <span className={cn("text-xs", isToday &&"font-bold text-primary")}>
 {isToday ?"Today": dayName}
 </span>
 </div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Hydration Tips</CardTitle>
 </CardHeader>
 <CardContent>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li>Drink a glass of water right after waking up to jump-start your metabolism.</li>
 <li>Keep a water bottle on your desk or in your bag as a visual reminder.</li>
 <li>Drink water before, during, and after a workout.</li>
 <li>Sometimes thirst is confused with hunger; try drinking water before a snack.</li>
 </ul>
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
          <h3>Why Use Our Hydration Reminder?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Hydration Reminder provides
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

      <RelatedTools currentToolUrl="/tools/health/hydration" max={6} />

</div>
 );
}
