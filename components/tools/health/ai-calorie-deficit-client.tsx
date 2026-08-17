"use client";

import { ModelSelector } from "@/components/shared/model-selector";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Calculator, Flame, RefreshCw, Target, TrendingDown, User, Type } from "lucide-react";
import toast from"react-hot-toast";

export default function AiCalorieDeficitClient() {
  const [currentWeight, setCurrentWeight] = useState(82);
  const [model, setModel] = useState("gpt4o");
  const [targetWeight, setTargetWeight] = useState(72);
  const [tdee, setTdee] = useState(2400);
  const [pace, setPace] = useState("500"); // 500 kcal deficit = ~0.5kg/week
  const [aiPlan, setAiPlan] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const deficit = Number(pace);
  const dailyCalories = Math.max(1200, tdee - deficit);
  const kgToLose = Math.max(0, currentWeight - targetWeight);
  const totalDeficitNeeded = kgToLose * 7700; // 7700 kcal per kg of fat
  const daysNeeded = deficit > 0 ? Math.round(totalDeficitNeeded / deficit) : 0;
  const weeksNeeded = (daysNeeded / 7).toFixed(1);
  const planFatLossWithAi = async () => {
    if (!currentWeight || !targetWeight) return;
    setLoading(true);
    try {
      const prompt = `Create a personalized fat loss strategy: Current Weight: ${currentWeight}kg, Target Weight: ${targetWeight}kg, Target Deficit: ${deficit} kcal/day (Daily Intake: ${dailyCalories} kcal), Estimated Timeline: ${weeksNeeded} weeks (${daysNeeded} days). Provide 4 bullet points analyzing safe fat loss rate, hunger management strategies, refeed days, and muscle preservation tips. No markdown asterisks.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
            model,
          type: "prose"
        })
      });
      if (!res.ok) throw new Error("AI API failed");
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAiPlan(data.results);
        toast.success("AI Fat Loss Plan generated!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI planning failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Flame} title="AI Calorie Deficit & Weight Loss Target Calculator" description="Calculate daily caloric deficit targets, estimated target weight goal dates, and generate personalized fat loss plans with live AI." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Current Weight (kg):</label>
 <Input type="number" value={currentWeight} onChange={e => setCurrentWeight(Number(e.target.value))} className="h-11 font-bold" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Target Goal Weight (kg):</label>
 <Input type="number" value={targetWeight} onChange={e => setTargetWeight(Number(e.target.value))} className="h-11 font-bold" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Estimated TDEE (Maintenance):</label>
 <Input type="number" value={tdee} onChange={e => setTdee(Number(e.target.value))} className="h-11 font-bold" />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Deficit Pace Target:</label>
 <select value={pace} onChange={e => setPace(e.target.value)} className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium">
 <option value="300">Mild Deficit (300 kcal/day ~ 0.3kg/week loss)</option>
 <option value="500">Moderate Deficit (500 kcal/day ~ 0.5kg/week loss - Recommended)</option>
 <option value="750">Aggressive Deficit (750 kcal/day ~ 0.75kg/week loss)</option>
 <option value="1000">Extreme Deficit (1000 kcal/day ~ 1kg/week loss)</option>
 </select>
 </div>

 {/* Calculated Banner */}
 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-5 rounded-2xl bg-background border text-center">
 <div>
 <span className="text-xs text-muted-foreground block font-bold uppercase tracking-wider">
 Daily Target Calories
 </span>
 <span className="text-2xl font-black text-emerald-400">{dailyCalories.toLocaleString()} kcal</span>
 </div>

 <div>
 <span className="text-xs text-muted-foreground block font-bold uppercase tracking-wider">
 Fat to Lose
 </span>
 <span className="text-2xl font-black text-cyan-400">{kgToLose} kg</span>
 </div>

 <div className="col-span-2 md:col-span-1">
 <span className="text-xs text-muted-foreground block font-bold uppercase tracking-wider">
 Estimated Duration
 </span>
 <span className="text-2xl font-black text-rose-400">{weeksNeeded} Weeks</span>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={planFatLossWithAi} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Planning Fat Loss..." : "AI Generate Personal Fat Loss Plan"}
 </Button>
 </div>
 </GlassCard>

 {/* AI Output */}
 {aiPlan.length > 0 && (
 <AiOutputDisplay
 title="AI Personal Fat Loss & Caloric Deficit Plan"
 subtitle="Refeed timing, muscle preservation, and sustainable deficit strategies"
 content={aiPlan}
 loading={loading}
 onRegenerate={planFatLossWithAi}
 variant="prose"
 />
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Metrics",
    description:"Add weight, height, age, sex.",
    icon: User,
  },
{
    step:"02",
    title:"Set Goal",
    description:"Choose weekly loss rate.",
    icon: Target,
  },
{
    step:"03",
    title:"Get Target",
    description:"See daily and weekly calorie goals.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: User,
    title:"Metric Based",
    description:"Personalized to your body.",
  },
{
    icon: Target,
    title:"Safe Rates",
    description:"Suggests sustainable deficits.",
  },
{
    icon: Calculator,
    title:"Daily Target",
    description:"Clear eat-less number.",
  },
{
    icon: TrendingDown,
    title:"Loss Preview",
    description:"Projects timeline to goal.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A calorie deficit calculator answers the central weight-loss question: how much should I eat? A deficit means consuming less than you burn, so the body taps fat stores. This tool sets a daily target from your metrics and a chosen, safe loss rate, removing the guesswork that derails most attempts.</p>
  <p>Size matters. A deficit of 300 to 700 calories below maintenance produces steady loss while preserving energy and muscle. Aggressive cuts feel productive but trigger fatigue, muscle loss, and binge cycles that undo progress. The calculator favors sustainable ranges so the change lasts.</p>
  <p>The weekly rate sets the pace. Losing about 1 percent of body weight per week is broadly sustainable; faster rates often fail. The tool projects your timeline, helping you commit to a realistic schedule instead of an unrealistic sprint. Patience here outperforms intensity.</p>
  <p>Pair the number with protein and resistance training to protect muscle, and track weight as a trend, not daily noise. The calculator gives the target; consistency hits it. Its value is a precise, personalized eat-less figure that turns vague intentions into a measurable daily plan.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a calorie deficit?",
    answer:"Eating fewer calories than you burn, forcing the body to use stored fat.",
  },
{
    question:"How big a deficit is safe?",
    answer:"Typically 300 to 700 calories below maintenance.",
  },
{
    question:"Why not cut more?",
    answer:"Large deficits cause muscle loss and rebound eating.",
  },
{
    question:"How fast can I lose?",
    answer:"About 1 percent of body weight weekly is sustainable.",
  },
{
    question:"Do I need exercise?",
    answer:"It helps but diet drives the deficit.",
  }
  ]}
/>
    </div>
    </div>
);
}
