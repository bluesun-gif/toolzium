"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Utensils, Target, Calendar, Download, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type Meal = {
  id: string;
  name: string;
  calories: number;
};
type DayPlan = {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  snacks: Meal[];
};
export function MealPlannerClient() {
  const [goal, setGoal] = useState("Maintenance");
  const [targetCalories, setTargetCalories] = useState(2000);
  const [dayPlan, setDayPlan] = useState<DayPlan>({
    breakfast: [{
      id: "1",
      name: "Oatmeal",
      calories: 300
    }],
    lunch: [{
      id: "2",
      name: "Chicken Salad",
      calories: 500
    }],
    dinner: [{
      id: "3",
      name: "Salmon & Rice",
      calories: 700
    }],
    snacks: [{
      id: "4",
      name: "Apple",
      calories: 95
    }]
  });
  const [newItemName, setNewItemName] = useState("");
  const [newItemCalories, setNewItemCalories] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<keyof DayPlan>("breakfast");
  const calcMacros = () => {
    let p = 0,
      c = 0,
      f = 0;
    if (goal === "Weight Loss") {
      p = 0.4;
      c = 0.3;
      f = 0.3;
    } else if (goal === "Muscle Gain") {
      p = 0.3;
      c = 0.5;
      f = 0.2;
    } else {
      p = 0.3;
      c = 0.4;
      f = 0.3;
    }
    return {
      protein: Math.round(targetCalories * p / 4),
      carbs: Math.round(targetCalories * c / 4),
      fats: Math.round(targetCalories * f / 9)
    };
  };
  const macros = calcMacros();
  const getTotalCalories = () => {
    return Object.values(dayPlan).reduce((sum, meals) => {
      return sum + meals.reduce((s, meal) => s + meal.calories, 0);
    }, 0);
  };
  const addMeal = () => {
    if (!newItemName || !newItemCalories) return;
    setDayPlan(prev => ({
      ...prev,
      [selectedMealType]: [...prev[selectedMealType], {
        id: Date.now().toString(),
        name: newItemName,
        calories: Number(newItemCalories)
      }]
    }));
    setNewItemName("");
    setNewItemCalories("");
    toast.success("Meal added");
  };
  const removeMeal = (type: keyof DayPlan, id: string) => {
    setDayPlan(prev => ({
      ...prev,
      [type]: prev[type].filter(m => m.id !== id)
    }));
  };
  const getSummary = () => {
    let summary = "Meal Plan Summary\nTarget:" + targetCalories + "kcal\nGoal:" + goal + "\n\n";
    (Object.keys(dayPlan) as (keyof DayPlan)[]).forEach(type => {
      summary += type.toUpperCase() + ":\n";
      dayPlan[type].forEach(m => summary += "-" + m.name + "(" + m.calories + "kcal)\n");
    });
    summary += "\nTotal:" + getTotalCalories() + "kcal";
    return summary;
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Utensils} title="Meal Planner & Calorie Target" description="Plan weekly meals and track macronutrients." actions={<React.Fragment>
 <CopyButton getText={getSummary} label="Copy Plan" />
 <ResetButton onClick={() => setDayPlan({
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: []
        })} label="Clear Plan" />
 </React.Fragment>} />
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Settings & Targets</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Goal</Label>
 <Select value={goal} onValueChange={setGoal}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Weight Loss">Weight Loss</SelectItem>
 <SelectItem value="Maintenance">Maintenance</SelectItem>
 <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Target Daily Calories (kcal)</Label>
 <Input type="number" value={targetCalories} onChange={e => setTargetCalories(Number(e.target.value))} />
 </div>
 
 <div className="p-4 bg-muted/50 rounded-lg mt-4">
 <p className="font-semibold mb-2">Recommended Macros</p>
 <div className="grid grid-cols-3 gap-2 text-center">
 <div><p className="text-sm text-muted-foreground">Protein</p><p className="font-mono">{macros.protein}g</p></div>
 <div><p className="text-sm text-muted-foreground">Carbs</p><p className="font-mono">{macros.carbs}g</p></div>
 <div><p className="text-sm text-muted-foreground">Fats</p><p className="font-mono">{macros.fats}g</p></div>
 </div>
 </div>
 
 <div className="p-4 bg-primary/10 rounded-lg">
 <p className="font-semibold flex justify-between">
 <span>Current Total:</span>
 <span className={getTotalCalories() > targetCalories ? "text-destructive" : "text-primary"}>{getTotalCalories()} / {targetCalories} kcal</span>
 </p>
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Add Meal</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Meal Type</Label>
 <Select value={selectedMealType} onValueChange={(v: keyof DayPlan) => setSelectedMealType(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="breakfast">Breakfast</SelectItem>
 <SelectItem value="lunch">Lunch</SelectItem>
 <SelectItem value="dinner">Dinner</SelectItem>
 <SelectItem value="snacks">Snacks</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Food Name</Label>
 <Input value={newItemName} onChange={e => setNewItemName(e.target.value)} placeholder="e.g. Banana" />
 </div>
 <div className="space-y-2">
 <Label>Calories</Label>
 <Input type="number" value={newItemCalories} onChange={e => setNewItemCalories(e.target.value)} placeholder="e.g. 105" />
 </div>
 <ActionButton onClick={addMeal} icon={Utensils} label="Add to Plan" className="w-full" />
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Daily Plan</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 {(Object.keys(dayPlan) as (keyof DayPlan)[]).map(type => <div key={type} className="p-4 border rounded-lg space-y-3">
 <h3 className="font-semibold capitalize border-b pb-2">{type}</h3>
 {dayPlan[type].map(meal => <div key={meal.id} className="flex justify-between items-center bg-muted/30 p-2 rounded">
 <div>
 <p className="text-sm font-medium">{meal.name}</p>
 <p className="text-xs text-muted-foreground">{meal.calories} kcal</p>
 </div>
 <Button onClick={() => removeMeal(type, meal.id)} className="text-destructive text-xs px-2 py-1 hover:bg-destructive/10 rounded">X</Button>
 </div>)}
 {dayPlan[type].length === 0 && <p className="text-sm text-muted-foreground italic">No items</p>}
 </div>)}
 </div>
 </CardContent>
 </GlassCard>
 
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
          <h3>Why Use Our Meal Planner & Calorie Target?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Meal Planner & Calorie Target provides
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

      <RelatedTools currentToolUrl="/tools/health/meal-planner" max={6} />

  </div></div>;
}