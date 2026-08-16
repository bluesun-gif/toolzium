"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { Activity, BarChart3, Calendar, Flame, Footprints, Plus, Target, TrendingUp } from"lucide-react";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, Target, Calendar, Plus, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
type StepEntry = {
  id: string;
  date: string;
  steps: number;
};
export function StepCounterClient() {
  const [entries, setEntries] = useState<StepEntry[]>([]);
  const [goal, setGoal] = useState<number>(10000);
  const [strideLength, setStrideLength] = useState<number>(0.762); // meters
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [newSteps, setNewSteps] = useState<number>(0);
  useEffect(() => {
    const saved = localStorage.getItem("step-counter-entries");
    const savedGoal = localStorage.getItem("step-counter-goal");
    const savedStride = localStorage.getItem("step-counter-stride");
    if (saved) setEntries(JSON.parse(saved));
    if (savedGoal) setGoal(Number(savedGoal));
    if (savedStride) setStrideLength(Number(savedStride));
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("step-counter-entries", JSON.stringify(entries));
      localStorage.setItem("step-counter-goal", goal.toString());
      localStorage.setItem("step-counter-stride", strideLength.toString());
    }
  }, [entries, goal, strideLength, typeof window]);
  const handleAddEntry = () => {
    if (!newDate || newSteps < 0) {
      toast.error("Please provide valid date and steps");
      return;
    }

    // Check if entry for date already exists, replace it
    const existingIndex = entries.findIndex(e => e.date === newDate);
    const newEntry = {
      id: crypto.randomUUID(),
      date: newDate,
      steps: newSteps
    };
    if (existingIndex >= 0) {
      const updated = [...entries];
      updated[existingIndex] = newEntry;
      setEntries(updated.sort((a, b) => b.date.localeCompare(a.date)));
      toast.success("Updated steps for date");
    } else {
      setEntries([...entries, newEntry].sort((a, b) => b.date.localeCompare(a.date)));
      toast.success("Added new step log");
    }
  };
  const handleClear = () => {
    if (confirm("Clear all step data?")) {
      setEntries([]);
      toast.success("Data cleared");
    }
  };
  const stats = useMemo(() => {
    if (entries.length === 0) return {
      today: 0,
      weeklyAvg: 0,
      streak: 0,
      calToday: 0,
      distToday: 0,
      progress: 0
    };
    const todayStr = new Date().toISOString().split("T")[0];
    const todayEntry = entries.find(e => e.date === todayStr);
    const todaySteps = todayEntry?.steps || 0;

    // Sort chronological for streak calculation
    const chrono = [...entries].sort((a, b) => a.date.localeCompare(b.date));
    let currentStreak = 0;
    for (let i = chrono.length - 1; i >= 0; i--) {
      if (chrono[i].steps >= goal) {
        currentStreak++;
      } else {
        break; // streak broken
      }
    }

    // Weekly Average
    const last7Days = chrono.slice(-7);
    const weeklyAvg = last7Days.length > 0 ? Math.round(last7Days.reduce((acc, curr) => acc + curr.steps, 0) / last7Days.length) : 0;

    // Roughly 0.04 calories per step
    const calToday = Math.round(todaySteps * 0.04);
    // Distance in km
    const distToday = (todaySteps * strideLength / 1000).toFixed(2);
    const progress = Math.min(100, Math.round(todaySteps / goal * 100));
    return {
      today: todaySteps,
      weeklyAvg,
      streak: currentStreak,
      calToday,
      distToday,
      progress
    };
  }, [entries, goal, strideLength]);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="Step Counter & Pedometer Log" description="Log your daily steps, track calories burned, and monitor your streaks." actions={<ResetButton onClick={handleClear} label="Clear All Data" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Activity className="w-5 h-5 text-primary" /> Today's Progress
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex flex-col items-center">
 <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-muted">
 <div className="absolute inset-0 rounded-full border-8 border-primary" style={{
                  clipPath: `polygon(0 0, 100% 0, 100% ${100 - stats.progress}%, 0 ${100 - stats.progress}%)`,
                  transform: 'rotate(-90deg)'
                }} />
 <div className="text-center z-10">
 <div className="text-2xl font-bold">{stats.today}</div>
 <div className="text-xs text-muted-foreground">/ {goal}</div>
 </div>
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-4 text-center">
 <div className="p-3 bg-secondary/30 rounded-lg">
 <div className="text-lg font-bold">{stats.calToday}</div>
 <div className="text-xs text-muted-foreground">Calories</div>
 </div>
 <div className="p-3 bg-secondary/30 rounded-lg">
 <div className="text-lg font-bold">{stats.distToday} km</div>
 <div className="text-xs text-muted-foreground">Distance</div>
 </div>
 <div className="p-3 bg-secondary/30 rounded-lg">
 <div className="text-lg font-bold">{stats.weeklyAvg}</div>
 <div className="text-xs text-muted-foreground">7d Avg</div>
 </div>
 <div className="p-3 bg-secondary/30 rounded-lg">
 <div className="text-lg font-bold text-orange-500">{stats.streak} 🔥</div>
 <div className="text-xs text-muted-foreground">Streak</div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg">Log Steps</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Steps</Label>
 <Input type="number" min="0" value={newSteps || ""} onChange={e => setNewSteps(Number(e.target.value))} />
 </div>
 </div>
 <Button onClick={handleAddEntry} className="w-full">
 <Plus className="w-4 h-4 mr-2" /> Log Steps
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="text-lg">Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Daily Step Goal</Label>
 <Input type="number" min="1000" value={goal} onChange={e => setGoal(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Stride Length (meters)</Label>
 <Input type="number" step="0.01" min="0.3" value={strideLength} onChange={e => setStrideLength(Number(e.target.value))} />
 <p className="text-xs text-muted-foreground">Average is 0.762m (76.2cm)</p>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calendar className="w-5 h-5" /> History Log
 </CardTitle>
 </CardHeader>
 <CardContent>
 {entries.length === 0 ? <div className="text-center py-8 text-muted-foreground">No step data logged yet.</div> : <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
 {entries.map(entry => <div key={entry.id} className="flex justify-between items-center p-3 rounded bg-secondary/20 border">
 <div>
 <div className="font-semibold">{entry.date}</div>
 <div className="text-xs text-muted-foreground">
 {Math.round(entry.steps * 0.04)} cal • {(entry.steps * strideLength / 1000).toFixed(2)} km
 </div>
 </div>
 <div className="flex items-center gap-3">
 <span className="font-bold">{entry.steps.toLocaleString()}</span>
 {entry.steps >= goal ? <Target className="w-4 h-4 text-green-500" /> : <Activity className="w-4 h-4 text-muted-foreground" />}
 </div>
 </div>)}
 </div>}
 </CardContent>
 </GlassCard>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Steps",
    description:"Add daily step count.",
    icon: Footprints,
  },
{
    step:"02",
    title:"Set Goal",
    description:"Choose a daily target.",
    icon: Target,
  },
{
    step:"03",
    title:"Track",
    description:"See progress and streaks.",
    icon: BarChart3,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Footprints,
    title:"Step Log",
    description:"Record daily counts.",
  },
{
    icon: Target,
    title:"Goal Based",
    description:"Common 10k target.",
  },
{
    icon: BarChart3,
    title:"Progress",
    description:"Visual to goal.",
  },
{
    icon: Flame,
    title:"Active Calories",
    description:"Estimate from steps.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A step counter turns movement into a tangible daily goal. Walking is the most accessible exercise, and counting steps makes it measurable and motivating. This tool logs counts against a target, showing progress and building streaks that sustain the habit.</p>
  <p>The 10k benchmark is common but individual; any increase from baseline helps. The calculator estimates active calories from steps and weight, connecting walking to energy balance. Visual progress keeps momentum.</p>
  <p>Use it to weave more movement into the day — errands, walks, stairs. The tool's value is making activity countable and rewarding, lowering the barrier to regular exercise.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How many steps?",
    answer:"Around 8k to 10k is common.",
  },
{
    question:"Why count?",
    answer:"Encourages daily movement.",
  },
{
    question:"Calories from steps?",
    answer:"Approximate from count and weight.",
  },
{
    question:"Device needed?",
    answer:"Phone or watch helps.",
  },
{
    question:"Miss a day?",
    answer:"Resume; consistency over time.",
  }
  ]}
/>
</div>
 );
}
=======
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
          <h3>Why Use Our Step Counter & Pedometer Log?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Step Counter & Pedometer Log provides
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

      <RelatedTools currentToolUrl="/tools/health/step-counter" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
