"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

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
import { Apple, Calculator, Plus, RotateCcw, Search, Trash2, Utensils } from"lucide-react";
import { toast } from"react-hot-toast";

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
    step:"01",
    title:"Search Food",
    description:"Find an item's calories.",
    icon: Search,
  },
{
    step:"02",
    title:"Add to Plan",
    description:"Build a meal around it.",
    icon: Utensils,
  },
{
    step:"03",
    title:"Sum",
    description:"See total meal calories.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Search,
    title:"Food Database",
    description:"Quick calorie lookup.",
  },
{
    icon: Utensils,
    title:"Meal Build",
    description:"Assemble balanced plates.",
  },
{
    icon: Calculator,
    title:"Totals",
    description:"Sum per meal or day.",
  },
{
    icon: Apple,
    title:"Nutrition",
    description:"Supports planning.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A calorie lookup and meal planner pairs knowledge with structure. Knowing a food's energy value is the first step; assembling foods into a target-meeting meal is the second. This tool lets you search calories and build plates, so intention becomes a concrete plan rather than a hope.</p>
  <p>Awareness changes behavior. Simply looking up values surfaces hidden calories in dressings, drinks, and snacks that derail diets. The planner then totals a meal, showing whether it fits your daily target. This closes the loop between knowing and doing.</p>
  <p>Use it to pre-plan, not just log after eating. Building tomorrow's meals within your calorie budget prevents impulsive overeating. The tool's value is combining a food reference with a builder, making adherence practical and visible.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why look up calories?",
    answer:"Awareness drives better choices.",
  },
{
    question:"Accurate?",
    answer:"Database values vary; brands differ.",
  },
{
    question:"Plan meals?",
    answer:"Combine foods to hit targets.",
  },
{
    question:"Track daily?",
    answer:"Sum meals for a total.",
  },
{
    question:"Use with deficit?",
    answer:"Yes, stay under target.",
  }
  ]}
/>
</div>
 );
}
