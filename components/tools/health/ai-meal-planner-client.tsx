"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Activity, RefreshCw } from"lucide-react";
import toast from"react-hot-toast";

export default function AiMealPlannerClient() {
 const [targetCalories, setTargetCalories] = useState(2100);
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
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"cards"}),
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

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Activity}
 title="AI Daily Meal Plan & Macro Targets Generator"
 description="Custom 1-day meal plans mapped to your exact target calories, diet style (High Protein, Keto, Vegan), and dietary restrictions powered by live AI."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Target Daily Calories (kcal):</label>
 <Input
 type="number"
 value={targetCalories}
 onChange={(e) => setTargetCalories(Number(e.target.value))}
 className="h-11 font-bold"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Dietary Preference / Style:</label>
 <Input
 type="text"
 value={dietType}
 onChange={(e) => setDietType(e.target.value)}
 placeholder="e.g. High Protein, Keto, Low Carb, Vegan"
 className="h-11"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Allergies / Restrictions:</label>
 <Input
 type="text"
 value={restrictions}
 onChange={(e) => setRestrictions(e.target.value)}
 placeholder="e.g. Gluten Free, Nut Free, No Dairy"
 className="h-11"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Number of Meals & Snacks:</label>
 <select
 value={mealsCount}
 onChange={(e) => setMealsCount(e.target.value)}
 className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
 >
 <option value="3">3 Meals (Breakfast, Lunch, Dinner)</option>
 <option value="4">4 Meals (Breakfast, Lunch, Snack, Dinner - Recommended)</option>
 <option value="5">5 Meals (Small frequent meals)</option>
 </select>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateMealPlan}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Planning Meals...":"AI Generate Personal Meal Plan"}
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
 </div>
 );
}
