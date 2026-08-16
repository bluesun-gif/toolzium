"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Activity, Apple, CalendarDays, RefreshCw, Target, Utensils } from"lucide-react";
import toast from"react-hot-toast";

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
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated Personal Meal Plan & Portion Guide"
 subtitle="Specific ingredient portions and estimated macros per meal"
 content={results}
 loading={loading}
 onRegenerate={generateMealPlan}
 variant="cards"
 />
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Goals",
    description:"Enter calories and macro split.",
    icon: Target,
  },
{
    step:"02",
    title:"Choose Style",
    description:"Pick diet preference or restrictions.",
    icon: Utensils,
  },
{
    step:"03",
    title:"Generate",
    description:"Get a full day of meals.",
    icon: CalendarDays,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Target,
    title:"Macro Driven",
    description:"Plans to your protein, carb, fat split.",
  },
{
    icon: Utensils,
    title:"Diet Aware",
    description:"Handles vegetarian, keto, and more.",
  },
{
    icon: CalendarDays,
    title:"Daily Plan",
    description:"Breakfast through dinner mapped.",
  },
{
    icon: Apple,
    title:"Nutrition First",
    description:"Balanced, whole-food focus.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A meal planner converts calorie and macro targets into an actual day of eating, the step most people skip. Knowing you need 2000 calories means little without a structure to deliver them. This tool builds breakfast through dinner around your protein, carb, and fat split, so the math becomes meals.</p>
  <p>Macros are the framework. Protein preserves muscle during deficits; carbs fuel training; fats support hormones. The planner distributes them across the day so no single meal is unbalanced. Setting a diet style — vegetarian, keto, or standard — keeps suggestions realistic and edible rather than theoretical.</p>
  <p>The output is a template, not a prescription. Swap foods you dislike, respect allergies, and use local availability. The structure matters more than exact items; consistency with the macro targets drives results. Pair the plan with a shopping list to reduce impulsive choices.</p>
  <p>Use it weekly, not as rigid dogma. Life varies, so adapt while honoring the totals. The planner's value is removing daily decision fatigue: instead of wondering what to eat, you follow a map built from your own goals, which is far more sustainable than willpower alone.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What are macros?",
    answer:"Macronutrients: protein, carbohydrates, and fats.",
  },
{
    question:"Can it fit my diet?",
    answer:"Yes, set preferences and restrictions.",
  },
{
    question:"Is the plan exact?",
    answer:"It is a template; adjust to taste and availability.",
  },
{
    question:"How do I hit macros?",
    answer:"Distribute across meals using the targets.",
  },
{
    question:"Should I track?",
    answer:"Logging confirms you meet the plan.",
  }
  ]}
/>
</div>
 );
}
