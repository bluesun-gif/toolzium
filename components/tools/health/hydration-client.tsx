"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { BarChart3, Bell, Droplets, Flame, Plus, RotateCcw, Scale } from"lucide-react";
import { ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";

export function HydrationClient() {
 const [goal, setGoal] = useState(2000); // ml
 const [intake, setIntake] = useState(0);
 const [history, setHistory] = useState<Record<string, number>>({});
 const [mounted, setMounted] = useState(false);
 
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
 setMounted(true);
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

 if (!mounted) return null;

 return (
 <div className="space-y-6">
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
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Weight",
    description:"Add body weight.",
    icon: Scale,
  },
{
    step:"02",
    title:"Set Activity",
    description:"Factor exercise and climate.",
    icon: Flame,
  },
{
    step:"03",
    title:"Get Target",
    description:"See daily water goal.",
    icon: Droplets,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Scale,
    title:"Weight Based",
    description:"Personalizes need.",
  },
{
    icon: Flame,
    title:"Activity Factor",
    description:"More when active or hot.",
  },
{
    icon: Droplets,
    title:"Daily Goal",
    description:"Clear water target.",
  },
{
    icon: Bell,
    title:"Reminders",
    description:"Prompts to drink.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A hydration tool estimates daily water needs from body weight and lifestyle, then reminds you to drink. Needs scale with mass and rise with exercise or heat. This tool personalizes the target so you hydrate appropriately rather than following a generic rule.</p>
  <p>Context adjusts the number. Active days and warm climates demand more; the calculator factors this so the goal reflects reality. About a fifth of intake comes from food, which the estimate implicitly accounts for in standard formulas.</p>
  <p>Reminders turn knowledge into habit. Mild dehydration impairs focus and energy before thirst signals, so prompts help. The tool's value is a personalized, context-aware water target that supports consistent hydration.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How much water?",
    answer:"Roughly 30 to 35 ml per kg of body weight.",
  },
{
    question:"More when active?",
    answer:"Yes, especially in heat.",
  },
{
    question:"Food counts?",
    answer:"About 20 percent comes from food.",
  },
{
    question:"Overhydrate risk?",
    answer:"Rare but possible; balance.",
  },
{
    question:"Signs of low?",
    answer:"Thirst, dark urine, fatigue.",
  }
  ]}
/>
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
 </div>
 );
}
