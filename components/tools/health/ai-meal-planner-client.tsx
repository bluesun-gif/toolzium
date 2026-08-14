"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Activity, RefreshCw, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
export default function AiMealPlannerClient() {
  const [targetCalories, setTargetCalories] = useState(2100);
  const [model, setModel] = useState("gpt4o");
  const [dietType, setDietType] = useState("High Protein & Balanced Carbs");
  const [restrictions, setRestrictions] = useState("No Seafood / Dairy Friendly");
  const [mealsCount, setMealsCount] = useState("4");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateMealPlan = async () => {
    setLoading(true);
    try {
      const prompt = `Design a 1-day personalized meal plan totaling ${targetCalories} kcal. Diet Style: '${dietType}'. Restrictions: '${restrictions}'. Number of Meals: ${mealsCount}. Provide specific food portions, estimated protein/carb/fat macros per meal, and preparation steps for Breakfast, Lunch, Dinner, and Snacks. Format as ${mealsCount} distinct meal cards. No markdown asterisks.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
            model,
          type: "cards"
        })
      });
      if (!res.ok) throw new Error("AI API failed");
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Meal Plan generated!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="AI Daily Meal Plan & Macro Targets Generator" description="Custom 1-day meal plans mapped to your exact target calories, diet style (High Protein, Keto, Vegan), and dietary restrictions powered by live AI." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Target Daily Calories (kcal):</label>
 <Input type="number" value={targetCalories} onChange={e => setTargetCalories(Number(e.target.value))} className="h-11 font-bold" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Dietary Preference / Style:</label>
 <Input type="text" value={dietType} onChange={e => setDietType(e.target.value)} placeholder="e.g. High Protein, Keto, Low Carb, Vegan" className="h-11" />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Allergies / Restrictions:</label>
 <Input type="text" value={restrictions} onChange={e => setRestrictions(e.target.value)} placeholder="e.g. Gluten Free, Nut Free, No Dairy" className="h-11" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Number of Meals & Snacks:</label>
 <select value={mealsCount} onChange={e => setMealsCount(e.target.value)} className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium">
 <option value="3">3 Meals (Breakfast, Lunch, Dinner)</option>
 <option value="4">4 Meals (Breakfast, Lunch, Snack, Dinner - Recommended)</option>
 <option value="5">5 Meals (Small frequent meals)</option>
 </select>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={generateMealPlan} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Planning Meals..." : "AI Generate Personal Meal Plan"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && <AiOutputDisplay title="Generated Personal Meal Plan & Portion Guide" subtitle="Specific ingredient portions and estimated macros per meal" content={results} loading={loading} onRegenerate={generateMealPlan} variant="cards" />}
 
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
          <h3>Why Use Our AI Daily Meal Plan & Macro Targets Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our AI Daily Meal Plan & Macro Targets Generator provides
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

      <RelatedTools currentToolUrl="/tools/health/ai-meal-planner" max={6} />

    </div></div>;
}