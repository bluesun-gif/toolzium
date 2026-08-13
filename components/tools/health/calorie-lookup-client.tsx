"use client";

import React, { useState, useMemo, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Button } from"@/components/ui/button";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Utensils, Search, Plus, RotateCcw, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type FoodItem = {
 id: string;
 name: string;
 category: string;
 serving: string;
 calories: number;
 protein: number;
 carbs: number;
 fat: number;
};

// Generate some sample data
const FOOD_DB: FoodItem[] = [
 { id:"1", name:"Apple", category:"Fruits", serving:"1 medium (182g)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
 { id:"2", name:"Banana", category:"Fruits", serving:"1 medium (118g)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
 { id:"3", name:"Chicken Breast", category:"Protein", serving:"100g cooked", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
 { id:"4", name:"Salmon", category:"Protein", serving:"100g cooked", calories: 206, protein: 22, carbs: 0, fat: 13 },
 { id:"5", name:"Brown Rice", category:"Grains", serving:"1 cup cooked (195g)", calories: 216, protein: 5, carbs: 45, fat: 1.8 },
 { id:"6", name:"Broccoli", category:"Vegetables", serving:"1 cup chopped (91g)", calories: 31, protein: 2.5, carbs: 6, fat: 0.3 },
 { id:"7", name:"Greek Yogurt", category:"Dairy", serving:"1 cup (245g)", calories: 100, protein: 17, carbs: 6, fat: 0.7 },
 { id:"8", name:"Almonds", category:"Snacks", serving:"1 oz (28g)", calories: 164, protein: 6, carbs: 6, fat: 14 },
 { id:"9", name:"Oatmeal", category:"Grains", serving:"1 cup cooked (234g)", calories: 158, protein: 6, carbs: 27, fat: 3.2 },
 { id:"10", name:"Egg", category:"Protein", serving:"1 large (50g)", calories: 72, protein: 6.3, carbs: 0.4, fat: 4.8 },
 { id:"11", name:"Avocado", category:"Fruits", serving:"1/2 medium (100g)", calories: 160, protein: 2, carbs: 9, fat: 15 },
 { id:"12", name:"Whole Milk", category:"Dairy", serving:"1 cup (244g)", calories: 149, protein: 8, carbs: 12, fat: 8 },
];

export function CalorieLookupClient() {
 const [search, setSearch] = useState("");
 const [sortBy, setSortBy] = useState<"name"|"calories"|"protein"|"carbs"|"fat">("name");
 const [mealPlan, setMealPlan] = useState<(FoodItem & { instanceId: string })[]>([]);

 useEffect(() => {
 const saved = localStorage.getItem("toolzium_meal_plan");
 if (saved) {
 try { setMealPlan(JSON.parse(saved)); } catch (e) {}
 }
 }, []);

 useEffect(() => {
 localStorage.setItem("toolzium_meal_plan", JSON.stringify(mealPlan));
 }, [mealPlan]);

 const filteredFoods = useMemo(() => {
 let result = FOOD_DB;
 if (search) {
 const s = search.toLowerCase();
 result = result.filter(f => f.name.toLowerCase().includes(s) || f.category.toLowerCase().includes(s));
 }
 return result.sort((a, b) => {
 if (sortBy ==="name") return a.name.localeCompare(b.name);
 return b[sortBy] - a[sortBy];
 });
 }, [search, sortBy]);

 const totals = useMemo(() => {
 return mealPlan.reduce((acc, item) => ({
 calories: acc.calories + item.calories,
 protein: acc.protein + item.protein,
 carbs: acc.carbs + item.carbs,
 fat: acc.fat + item.fat
 }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
 }, [mealPlan]);

 const addToPlan = (food: FoodItem) => {
 setMealPlan([...mealPlan, { ...food, instanceId: Math.random().toString(36).substring(7) }]);
 toast.success(`Added ${food.name}`);
 };

 const removeFromPlan = (instanceId: string) => {
 setMealPlan(mealPlan.filter(i => i.instanceId !== instanceId));
 };

 const getMealSummaryText = () => {
 let text ="Daily Meal Summary:\n\n";
 mealPlan.forEach(f => {
 text += `- ${f.name} (${f.serving}): ${f.calories} kcal, ${f.protein}g P, ${f.carbs}g C, ${f.fat}g F\n`;
 });
 text += `\nTotal: ${totals.calories.toFixed(0)} kcal | Protein: ${totals.protein.toFixed(1)}g | Carbs: ${totals.carbs.toFixed(1)}g | Fat: ${totals.fat.toFixed(1)}g`;
 return text;
 };

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Utensils}
 title="Calorie Lookup & Meal Planner"
 description="Search common foods and build your daily meal plan to track macros."
 actions={
 <>
 <CopyButton getText={getMealSummaryText} label="Copy Summary"/>
 <ResetButton onClick={() => setMealPlan([])} label="Clear Log"/>
 </>
 }
 />

 <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
 <div className="lg:col-span-3 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Food Database</CardTitle>
 <CardDescription>Search and sort foods to add to your plan.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex gap-4 flex-col sm:flex-row">
 <div className="relative flex-1">
 <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground"/>
 <Input
 placeholder="Search foods..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="pl-9"
 />
 </div>
 <div className="w-full sm:w-[180px]">
 <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
 <SelectTrigger>
 <SelectValue placeholder="Sort by"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="name">Name (A-Z)</SelectItem>
 <SelectItem value="calories">Highest Calories</SelectItem>
 <SelectItem value="protein">Highest Protein</SelectItem>
 <SelectItem value="carbs">Highest Carbs</SelectItem>
 <SelectItem value="fat">Highest Fat</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
 {filteredFoods.map(food => (
 <div key={food.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-transparent transition-colors gap-3">
 <div className="flex-1">
 <div className="font-medium">{food.name}</div>
 <div className="text-xs text-muted-foreground">{food.serving} • {food.category}</div>
 <div className="flex gap-3 text-xs mt-1 font-mono">
 <span className="text-orange-500 font-semibold">{food.calories} kcal</span>
 <span className="text-primary">{food.protein}g P</span>
 <span className="text-green-500">{food.carbs}g C</span>
 <span className="text-yellow-500">{food.fat}g F</span>
 </div>
 </div>
 <Button variant="outline"size="sm"onClick={() => addToPlan(food)}>
 <Plus className="w-4 h-4 mr-1"/> Add
 </Button>
 </div>
 ))}
 {filteredFoods.length === 0 && (
 <div className="text-center py-8 text-muted-foreground">No foods found matching"{search}"</div>
 )}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Daily Log</CardTitle>
 <CardDescription>Your current meal plan totals.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-muted/30 rounded-lg text-center border">
 <div className="text-sm text-muted-foreground mb-1">Calories</div>
 <div className="text-2xl font-bold text-orange-500">{totals.calories.toFixed(0)}</div>
 </div>
 <div className="p-4 bg-muted/30 rounded-lg text-center border">
 <div className="text-sm text-muted-foreground mb-1">Protein</div>
 <div className="text-2xl font-bold text-primary">{totals.protein.toFixed(1)}g</div>
 </div>
 <div className="p-4 bg-muted/30 rounded-lg text-center border">
 <div className="text-sm text-muted-foreground mb-1">Carbs</div>
 <div className="text-2xl font-bold text-green-500">{totals.carbs.toFixed(1)}g</div>
 </div>
 <div className="p-4 bg-muted/30 rounded-lg text-center border">
 <div className="text-sm text-muted-foreground mb-1">Fat</div>
 <div className="text-2xl font-bold text-yellow-500">{totals.fat.toFixed(1)}g</div>
 </div>
 </div>
 
 <Separator />

 <div>
 <h4 className="font-semibold mb-3 text-sm">Items ({mealPlan.length})</h4>
 <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
 {mealPlan.map((item) => (
 <div key={item.instanceId} className="flex items-center justify-between p-2 rounded bg-muted/20 border text-sm">
 <div className="truncate flex-1">
 <span className="font-medium">{item.name}</span>
 <span className="text-muted-foreground text-xs ml-2">{item.calories} cal</span>
 </div>
 <Button variant="ghost"size="icon"className="h-6 w-6 text-muted-foreground hover:text-destructive"onClick={() => removeFromPlan(item.instanceId)}>
 <Trash2 className="w-3.5 h-3.5"/>
 </Button>
 </div>
 ))}
 {mealPlan.length === 0 && (
 <div className="text-center py-4 text-muted-foreground text-sm">No items added yet.</div>
 )}
 </div>
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
          <h3>Why Use Our Calorie Lookup & Meal Planner?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Calorie Lookup & Meal Planner provides
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

      <RelatedTools currentToolUrl="/tools/health/calorie-lookup" max={6} />

</div>
 );
}
