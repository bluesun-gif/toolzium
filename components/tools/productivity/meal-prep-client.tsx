"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { ShoppingBag, Utensils, CheckSquare, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

type MealType = "Breakfast" | "Lunch" | "Dinner";
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface DayMeals {
  Breakfast: string;
  Lunch: string;
  Dinner: string;
  ingredients: string;
}

type MealPlan = Record<string, DayMeals>;

const initialPlan: MealPlan = daysOfWeek.reduce((acc, day) => {
  acc[day] = { Breakfast: "", Lunch: "", Dinner: "", ingredients: "" };
  return acc;
}, {} as MealPlan);

const categories = ["Produce", "Dairy", "Meat", "Pantry", "Bakery", "Other"];

export function MealPrepClient() {
  const [mealPlan, setMealPlan] = useState<MealPlan>(initialPlan);
  const [groceryList, setGroceryList] = useState<{ name: string; checked: boolean; category: string }[]>([]);

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
      if (/(apple|banana|tomato|onion|garlic|lettuce|carrot|potato|fruit|veg|spinach|broccoli)/.test(lower)) category = "Produce";
      else if (/(milk|cheese|butter|yogurt|egg|cream)/.test(lower)) category = "Dairy";
      else if (/(chicken|beef|pork|fish|meat|salmon|tuna|turkey)/.test(lower)) category = "Meat";
      else if (/(bread|bun|bagel|cake|muffin|pastry)/.test(lower)) category = "Bakery";
      else if (/(rice|pasta|beans|oil|sauce|salt|sugar|flour|cereal|oat|spice)/.test(lower)) category = "Pantry";

      // Keep checked status if exists
      const existing = groceryList.find(x => x.name.toLowerCase() === name.toLowerCase());
      return { name, checked: existing ? existing.checked : false, category };
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
      return cat + ":\n" + items.map(item => "- " + item.name + (item.checked ? " (bought)" : "")).join("\n");
    }).filter(s => s).join("\n\n");

    const blob = new Blob([text], { type: "text/plain" });
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

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Utensils}
        title="Weekly Meal Prep & Grocery Planner"
        description="Plan your weekly meals and auto-generate a categorized grocery list."
        actions={
          <>
            <ActionButton onClick={generateGroceryList} icon={ShoppingBag} label="Generate Grocery List" />
            <ResetButton onClick={resetPlan} label="Reset Plan" />
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {daysOfWeek.map(day => (
            <GlassCard key={day}>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">{day}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
                <div className="space-y-2">
                  <Label>Breakfast</Label>
                  <Input value={mealPlan[day].Breakfast} onChange={(e) => updateMeal(day, "Breakfast", e.target.value)} placeholder="Oatmeal" />
                </div>
                <div className="space-y-2">
                  <Label>Lunch</Label>
                  <Input value={mealPlan[day].Lunch} onChange={(e) => updateMeal(day, "Lunch", e.target.value)} placeholder="Salad" />
                </div>
                <div className="space-y-2">
                  <Label>Dinner</Label>
                  <Input value={mealPlan[day].Dinner} onChange={(e) => updateMeal(day, "Dinner", e.target.value)} placeholder="Chicken rice" />
                </div>
                <div className="sm:col-span-3 space-y-2">
                  <Label>Ingredients (comma separated)</Label>
                  <Input value={mealPlan[day].ingredients} onChange={(e) => updateMeal(day, "ingredients", e.target.value)} placeholder="oats, milk, chicken, rice..." />
                </div>
              </CardContent>
            </GlassCard>
          ))}
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
              {groceryList.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">Add ingredients and generate the list.</p>
              ) : (
                <div className="space-y-6">
                  {categories.map(cat => {
                    const items = groceryList.map((item, i) => ({ item, i })).filter(x => x.item.category === cat);
                    if (items.length === 0) return null;
                    return (
                      <div key={cat} className="space-y-2">
                        <h4 className="font-semibold text-sm border-b pb-1">{cat}</h4>
                        {items.map(({ item, i }) => (
                          <div key={i} className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={item.checked} 
                              onChange={() => toggleGroceryItem(i)}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className={"text-sm " + (item.checked ? "line-through text-muted-foreground" : "")}>
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
