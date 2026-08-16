"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { CalendarRange, CheckCircle2, CheckSquare, Download, ShoppingBag, ShoppingCart, Utensils } from"lucide-react";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { toast } from"react-hot-toast";

type MealType ="Breakfast"|"Lunch"|"Dinner";
const daysOfWeek = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

interface DayMeals {
  Breakfast: string;
  Lunch: string;
  Dinner: string;
  ingredients: string;
}
type MealPlan = Record<string, DayMeals>;
const initialPlan: MealPlan = daysOfWeek.reduce((acc, day) => {
  acc[day] = {
    Breakfast: "",
    Lunch: "",
    Dinner: "",
    ingredients: ""
  };
  return acc;
}, {} as MealPlan);
const categories = ["Produce", "Dairy", "Meat", "Pantry", "Bakery", "Other"];
export function MealPrepClient() {
  const [mealPlan, setMealPlan] = useState<MealPlan>(initialPlan);
  const [groceryList, setGroceryList] = useState<{
    name: string;
    checked: boolean;
    category: string;
  }[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("mealPrepPlan");
    if (saved) {
      try {
        setMealPlan(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
    const savedGrocery = localStorage.getItem("groceryList");
    if (savedGrocery) {
      try {
        setGroceryList(JSON.parse(savedGrocery));
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("mealPrepPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);
  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
  }, [groceryList]);
  const updateMeal = (day: string, type: MealType | "ingredients", value: string) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }));
  };
  const generateGroceryList = () => {
    const items = new Set<string>();
    Object.values(mealPlan).forEach(day => {
      if (day.ingredients) {
        day.ingredients.split(",").forEach(item => {
          const trimmed = item.trim();
          if (trimmed) items.add(trimmed);
        });
      }
    });
    const newList = Array.from(items).map(name => {
      let category = "Other";
      const lower = name.toLowerCase();
      if (/(apple|banana|tomato|onion|garlic|lettuce|carrot|potato|fruit|veg|spinach|broccoli)/.test(lower)) category = "Produce";else if (/(milk|cheese|butter|yogurt|egg|cream)/.test(lower)) category = "Dairy";else if (/(chicken|beef|pork|fish|meat|salmon|tuna|turkey)/.test(lower)) category = "Meat";else if (/(bread|bun|bagel|cake|muffin|pastry)/.test(lower)) category = "Bakery";else if (/(rice|pasta|beans|oil|sauce|salt|sugar|flour|cereal|oat|spice)/.test(lower)) category = "Pantry";

      // Keep checked status if exists
      const existing = groceryList.find(x => x.name.toLowerCase() === name.toLowerCase());
      return {
        name,
        checked: existing ? existing.checked : false,
        category
      };
    });
    setGroceryList(newList);
    toast.success("Grocery list generated!");
  };
  const toggleGroceryItem = (index: number) => {
    setGroceryList(prev => {
      const copy = [...prev];
      copy[index].checked = !copy[index].checked;
      return copy;
    });
  };
  const downloadList = () => {
    if (groceryList.length === 0) {
      toast.error("Grocery list is empty!");
      return;
    }
    const text = categories.map(cat => {
      const items = groceryList.filter(item => item.category === cat);
      if (items.length === 0) return "";
      return cat + ":\n" + items.map(item => "-" + item.name + (item.checked ? "(bought)" : "")).join("\n");
    }).filter(s => s).join("\n\n");
    const blob = new Blob([text], {
      type: "text/plain"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grocery-list.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded list!");
  };
  const resetPlan = () => {
    setMealPlan(initialPlan);
    setGroceryList([]);
    toast.success("Plan reset!");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Utensils} title="Weekly Meal Prep & Grocery Planner" description="Plan your weekly meals and auto-generate a categorized grocery list." actions={<>
 <ActionButton onClick={generateGroceryList} icon={ShoppingBag} label="Generate Grocery List" />
 <ResetButton onClick={resetPlan} label="Reset Plan" />
 </>} />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2 space-y-4">
 {daysOfWeek.map(day => <GlassCard key={day}>
 <CardHeader className="py-3">
 <CardTitle className="text-lg">{day}</CardTitle>
 </CardHeader>
 <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
 <div className="space-y-2">
 <Label>Breakfast</Label>
 <Input value={mealPlan[day].Breakfast} onChange={e => updateMeal(day, "Breakfast", e.target.value)} placeholder="Oatmeal" />
 </div>
 <div className="space-y-2">
 <Label>Lunch</Label>
 <Input value={mealPlan[day].Lunch} onChange={e => updateMeal(day, "Lunch", e.target.value)} placeholder="Salad" />
 </div>
 <div className="space-y-2">
 <Label>Dinner</Label>
 <Input value={mealPlan[day].Dinner} onChange={e => updateMeal(day, "Dinner", e.target.value)} placeholder="Chicken rice" />
 </div>
 <div className="sm:col-span-3 space-y-2">
 <Label>Ingredients (comma separated)</Label>
 <Input value={mealPlan[day].ingredients} onChange={e => updateMeal(day, "ingredients", e.target.value)} placeholder="oats, milk, chicken, rice..." />
 </div>
 </CardContent>
 </GlassCard>)}
 </div>

 <div>
 <GlassCard className="sticky top-4">
 <CardHeader>
 <CardTitle className="flex justify-between items-center">
 <span>Grocery List</span>
 <ActionButton onClick={downloadList} icon={Download} label="Export" variant="outline" size="sm" />
 </CardTitle>
 <CardDescription>Generated from your ingredients</CardDescription>
 </CardHeader>
 <CardContent>
 {groceryList.length === 0 ? <p className="text-sm text-muted-foreground italic">Add ingredients and generate the list.</p> : <div className="space-y-6">
 {categories.map(cat => {
                  const items = groceryList.map((item, i) => ({
                    item,
                    i
                  })).filter(x => x.item.category === cat);
                  if (items.length === 0) return null;
                  return <div key={cat} className="space-y-2">
 <h4 className="font-semibold text-sm border-b pb-1">{cat}</h4>
 {items.map(({
                      item,
                      i
                    }) => <div key={i} className="flex items-center gap-2">
 <input type="checkbox" checked={item.checked} onChange={() => toggleGroceryItem(i)} className="w-4 h-4 rounded border-gray-300" />
 <span className={cn("text-sm", item.checked ? "line-through text-muted-foreground" : "")}>
 {item.name}
 </span>
 </div>
 ))}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Plan Meals",
    description:"Add meals per day.",
    icon: Utensils,
  },
{
    step:"02",
    title:"List Items",
    description:"Build the grocery list.",
    icon: ShoppingCart,
  },
{
    step:"03",
    title:"Shop",
    description:"Check off as you buy.",
    icon: CheckCircle2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Utensils,
    title:"Meals",
    description:"Daily plan.",
  },
{
    icon: ShoppingCart,
    title:"Grocery",
    description:"Auto list.",
  },
{
    icon: CheckCircle2,
    title:"Check",
    description:"In-cart marks.",
  },
{
    icon: CalendarRange,
    title:"Weekly",
    description:"Reusable.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A meal prep planner maps the week's meals and derives a grocery list, saving both money and daily decision fatigue. Planning ahead reduces impulse buys and takeout. This tool links meals to a checkable shopping list.</p>
  <p>The list from meals means you buy only what you need. Checking items in-store prevents doubles.</p>
  <p>Use it weekly. The tool's value is planned eating that cuts cost and stress.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why meal prep?",
    answer:"Saves time and money.",
  },
{
    question:"Grocery list?",
    answer:"Yes, from meals.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  },
{
    question:"Use case?",
    answer:"Weekly planning.",
  }
  ]}
/>
</div>
 );
 })}
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
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
          <h3>Why Use Our Weekly Meal Prep & Grocery Planner?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Weekly Meal Prep & Grocery Planner provides
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

      <RelatedTools currentToolUrl="/tools/productivity/meal-prep" max={6} />

    </div></div>;
}