"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect, useCallback, useMemo } from"react";
import { Activity, AlertCircle, Bell, Clock, Droplet, Droplets, Flame, GlassWater, Info, Minus, Plus, RotateCcw, Scale, ThermometerSun, Calculator } from "lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { ResetButton } from"@/components/shared/action-buttons";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";

type Unit ="kg"|"lbs";
type ActivityLevel ="sedentary"|"light"|"moderate"|"active"|"very_active";
type Climate ="cold"|"temperate"|"hot";

interface HistoryData {
  date: string;
  intake: number;
  goal: number;
}
export function WaterIntakeClient() {
  // Inputs
  const [unit, setUnit] = useState<Unit>("kg");
  const [weight, setWeight] = useState<string>("70");
  const [activity, setActivity] = useState<ActivityLevel>("light");
  const [climate, setClimate] = useState<Climate>("temperate");
  const [isPregnant, setIsPregnant] = useState(false);
  const [isBreastfeeding, setIsBreastfeeding] = useState(false);
  const [isIll, setIsIll] = useState(false);

  // Tracker
  const [currentIntakeGlasses, setCurrentIntakeGlasses] = useState(0);
  const [trackerDate, setTrackerDate] = useState("");
  const GLASS_SIZE_ML = 240; // 8 oz

  // Calculate Target
  const targetMl = useMemo(() => {
    let weightKg = parseFloat(weight) || 0;
    if (unit === "lbs") {
      weightKg = weightKg * 0.453592;
    }
    if (weightKg <= 0) return 0;

    // Base: 35ml per kg
    let base = weightKg * 35;

    // Activity multiplier
    const activityMultipliers: Record<ActivityLevel, number> = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.2,
      active: 1.35,
      very_active: 1.5
    };
    base *= activityMultipliers[activity];

    // Climate multiplier
    const climateMultipliers: Record<Climate, number> = {
      cold: 1.0,
      temperate: 1.0,
      hot: 1.15
    };
    base *= climateMultipliers[climate];

    // Additional factors
    if (isPregnant) base += 300;
    if (isBreastfeeding) base += 700;
    if (isIll) base += 500;
    return Math.round(base);
  }, [weight, unit, activity, climate, isPregnant, isBreastfeeding, isIll]);
  const targetGlasses = Math.ceil(targetMl / GLASS_SIZE_ML);
  const targetLiters = (targetMl / 1000).toFixed(2);

  // Average comparison
  const averageLiters = 2.7; // general average for adults
  const differenceLiters = (parseFloat(targetLiters) - averageLiters).toFixed(1);
  const differenceGlasses = Math.ceil(parseFloat(differenceLiters) * 1000 / GLASS_SIZE_ML);

  // Schedule (assuming 8am to 8pm)
  const schedule = useMemo(() => {
    if (targetGlasses <= 0) return [];
    const times = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"];
    const glassesPerTime = Math.ceil(targetGlasses / times.length);
    let glassesLeft = targetGlasses;
    return times.map(time => {
      const glasses = Math.min(glassesLeft, glassesPerTime);
      glassesLeft -= glasses;
      return {
        time,
        glasses
      };
    });
  }, [targetGlasses]);

  // Load tracker from local storage
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem("waterIntakeDate");
    const storedIntake = localStorage.getItem("waterIntakeCount");
    if (storedDate === today && storedIntake) {
      setCurrentIntakeGlasses(parseInt(storedIntake, 10));
    } else {
      setCurrentIntakeGlasses(0);
      localStorage.setItem("waterIntakeDate", today);
      localStorage.setItem("waterIntakeCount", "0");
    }
    setTrackerDate(today);
  }, []);

  // Update local storage when intake changes
  useEffect(() => {
    if (trackerDate) {
      localStorage.setItem("waterIntakeCount", currentIntakeGlasses.toString());
    }
  }, [currentIntakeGlasses, trackerDate]);
  const handleAddGlass = () => setCurrentIntakeGlasses(prev => prev + 1);
  const handleRemoveGlass = () => setCurrentIntakeGlasses(prev => Math.max(0, prev - 1));
  const progressPercentage = Math.min(100, Math.round(currentIntakeGlasses / (targetGlasses || 1) * 100));
  const handleReset = () => {
    setWeight("70");
    setUnit("kg");
    setActivity("light");
    setClimate("temperate");
    setIsPregnant(false);
    setIsBreastfeeding(false);
    setIsIll(false);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Water Intake Calculator" description="Calculate your optimal daily hydration goal and track your intake." icon={Droplet} />

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
 {/* Input Section */}
 <div className="lg:col-span-5 flex flex-col gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg flex items-center gap-2">
 <Info className="h-5 w-5 text-muted-foreground" />
 Personal Details
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-5">
 
 <div className="space-y-2">
 <label className="text-sm font-medium">Weight</label>
 <div className="flex gap-2">
 <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="flex-1 px-3 py-2 bg-background border rounded-md" placeholder="E.g. 70" min="0" />
 <div className="flex bg-muted rounded-md p-1">
 <Button className={cn(cn("px-3 py-1 rounded-sm text-sm font-medium transition-colors", unit === "kg" ? "bg-background shadow-sm" : ""))} onClick={() => setUnit("kg")}>
 kg
 </Button>
 <Button className={cn(cn("px-3 py-1 rounded-sm text-sm font-medium transition-colors", unit === "lbs" ? "bg-background shadow-sm" : ""))} onClick={() => setUnit("lbs")}>
 lbs
 </Button>
 </div>
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium flex items-center gap-2">
 <Activity className="h-4 w-4" /> Activity Level
 </label>
 <select value={activity} onChange={e => setActivity(e.target.value as ActivityLevel)} className="w-full px-3 py-2 bg-background border rounded-md">
 <option value="sedentary">Sedentary (Little to no exercise)</option>
 <option value="light">Light (Exercise 1-3 days/wk)</option>
 <option value="moderate">Moderate (Exercise 3-5 days/wk)</option>
 <option value="active">Active (Exercise 6-7 days/wk)</option>
 <option value="very_active">Very Active (Intense daily exercise)</option>
 </select>
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium flex items-center gap-2">
 <ThermometerSun className="h-4 w-4" /> Climate
 </label>
 <select value={climate} onChange={e => setClimate(e.target.value as Climate)} className="w-full px-3 py-2 bg-background border rounded-md">
 <option value="cold">Cold</option>
 <option value="temperate">Temperate / Normal</option>
 <option value="hot">Hot & Dry / Humid</option>
 </select>
 </div>

 <div className="space-y-3 pt-2">
 <label className="text-sm font-medium flex items-center gap-2">
 <AlertCircle className="h-4 w-4" /> Additional Factors
 </label>
 <div className="flex flex-col gap-2">
 <label className="flex items-center gap-2 text-sm">
 <input type="checkbox" checked={isPregnant} onChange={e => setIsPregnant(e.target.checked)} className="rounded border-input bg-background w-4 h-4" />
 Pregnant
 </label>
 <label className="flex items-center gap-2 text-sm">
 <input type="checkbox" checked={isBreastfeeding} onChange={e => setIsBreastfeeding(e.target.checked)} className="rounded border-input bg-background w-4 h-4" />
 Breastfeeding
 </label>
 <label className="flex items-center gap-2 text-sm">
 <input type="checkbox" checked={isIll} onChange={e => setIsIll(e.target.checked)} className="rounded border-input bg-background w-4 h-4" />
 Sick (Fever / Diarrhea)
 </label>
 </div>
 </div>

 <div className="flex justify-end pt-4">
 <ResetButton onClick={handleReset} />
 </div>

 </CardContent>
 </GlassCard>
 </div>

 {/* Output Section */}
 <div className="lg:col-span-7 flex flex-col gap-6">
 <GlassCard className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
 <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-4">
 <h2 className="text-xl font-medium text-primary">Your Daily Recommendation</h2>
 
 <div className="flex items-end justify-center gap-2">
 <span className="text-6xl font-bold text-primary">{targetLiters}</span>
 <span className="text-2xl font-medium text-primary/70 /70 mb-1">Liters</span>
 </div>
 
 <div className="flex items-center gap-2 text-primary text-lg">
 <span>or</span>
 <span className="font-semibold">{targetGlasses} glasses</span>
 <span className="text-sm opacity-80">(8 oz / 240 ml)</span>
 </div>

 {differenceGlasses > 0 ? <div className="text-sm text-primary/80 /80 bg-primary/10/50 dark:bg-blue-900/40 px-3 py-1 rounded-full mt-2">
 You need about {differenceGlasses} more glasses than the general average.
 </div> : differenceGlasses < 0 ? <div className="text-sm text-primary/80 /80 bg-primary/10/50 dark:bg-blue-900/40 px-3 py-1 rounded-full mt-2">
 You need about {Math.abs(differenceGlasses)} fewer glasses than the general average.
 </div> : null}
 </CardContent>
 </GlassCard>

 {/* Tracker Section */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg flex items-center justify-between">
 <span className="flex items-center gap-2">
 <GlassWater className="h-5 w-5 text-primary" />
 Today's Tracker
 </span>
 <span className="text-sm font-normal text-muted-foreground">
 {currentIntakeGlasses} / {targetGlasses} glasses
 </span>
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 
 <div className="flex flex-col items-center gap-4">
 {/* Progress Ring */}
 <div className="relative w-40 h-40 flex items-center justify-center">
 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
 <circle className="text-muted stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
 <circle className="text-primary stroke-current transition-all duration-500 ease-in-out" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`}></circle>
 </svg>
 <div className="absolute flex flex-col items-center justify-center">
 <span className="text-3xl font-bold">{progressPercentage}%</span>
 </div>
 </div>

 <div className="flex items-center gap-6 mt-2">
 <Button onClick={handleRemoveGlass} disabled={currentIntakeGlasses <= 0} className="p-3 rounded-full bg-muted hover:bg-muted/80 disabled:opacity-50 transition-colors">
 <Minus className="h-6 w-6" />
 </Button>
 
 <div className="flex gap-1 text-primary">
 {Array.from({
                      length: Math.min(5, currentIntakeGlasses)
                    }).map((_, i) => <Droplet key={i} className="h-6 w-6 fill-current" />)}
 {currentIntakeGlasses > 5 && <span className="text-xl font-bold ml-1">+{currentIntakeGlasses - 5}</span>}
 </div>

 <Button onClick={handleAddGlass} className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-primary-foreground transition-colors shadow-sm">
 <Plus className="h-6 w-6" />
 </Button>
 </div>
 </div>

 </CardContent>
 </GlassCard>

 {/* Schedule Section */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg flex items-center gap-2">
 <Clock className="h-5 w-5 text-muted-foreground" />
 Suggested Schedule
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
 {schedule.map((item, i) => <div key={i} className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50 border">
 <span className="text-sm font-medium mb-1">{item.time}</span>
 <div className="flex items-center gap-1 text-primary">
 {item.glasses > 0 ? <>
 <GlassWater className="h-4 w-4" />
 <span className="text-sm font-semibold">x{item.glasses}</span>
 </> : <span className="text-xs text-muted-foreground">Done</span>}
 </div>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg">Tips for Staying Hydrated</CardTitle>
 </CardHeader>
 <CardContent className="text-sm space-y-2 text-muted-foreground">
 <ul className="list-disc pl-5 space-y-1">
 <li>Drink a glass of water first thing in the morning to wake up your body.</li>
 <li>Keep a reusable water bottle with you throughout the day.</li>
 <li>Eat water-rich foods like watermelon, cucumber, and oranges.</li>
 <li>Drink before you feel thirsty; thirst is a sign you're already dehydrated.</li>
 </ul>
 </CardContent>
 </GlassCard>

 </div>
 </div>
 
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
    title:"Set Factors",
    description:"Activity and climate.",
    icon: Flame,
  },
{
    step:"03",
    title:"Calculate",
    description:"See daily water target.",
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
    description:"More when active.",
  },
{
    icon: Droplets,
    title:"Daily Target",
    description:"Clear water goal.",
  },
{
    icon: Bell,
    title:"Reminders",
    description:"Prompt drinking.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A water intake calculator estimates daily needs from weight and lifestyle, then reminds you to drink. Needs rise with activity and heat; this tool personalizes the target so hydration matches your reality rather than a one-size rule.</p>
  <p>About a fifth of fluid comes from food, which standard estimates implicitly account for. The calculator sets a clear goal; reminders turn it into habit, since mild dehydration impairs focus before thirst arrives.</p>
  <p>Balance prevents both shortage and excess. The tool's value is a personalized, context-aware water target that supports steady hydration through the day.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How much?",
    answer:"Roughly 30 to 35 ml per kg.",
  },
{
    question:"More when active?",
    answer:"Yes, especially in heat.",
  },
{
    question:"From food?",
    answer:"About a fifth of intake.",
  },
{
    question:"Overdo it?",
    answer:"Unlikely but balance.",
  },
{
    question:"Signs low?",
    answer:"Thirst, dark urine.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default WaterIntakeClient;
