"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Calendar, CheckCircle2, Flame, Plus, Star, TrendingUp, Trophy } from"lucide-react";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";

import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { toast } from"react-hot-toast";
=======
import { ToolBackground } from"@/components/shared/tool-background";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Flame, Calendar, Trophy, Plus, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type Habit = {
  id: string;
  name: string;
  emoji: string;
  completions: string[];
};
export function StreaksClient() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitEmoji, setNewHabitEmoji] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("habitStreaks");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHabits(JSON.parse(saved));
    }
  }, []);
  const saveHabits = (newHabits: Habit[]) => {
    setHabits(newHabits);
    localStorage.setItem("habitStreaks", JSON.stringify(newHabits));
  };
  const addHabit = () => {
    if (!newHabitName) return;
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      emoji: newHabitEmoji || "🔥",
      completions: []
    };
    saveHabits([...habits, newHabit]);
    setNewHabitName("");
    setNewHabitEmoji("");
    toast.success("Habit added!");
  };
  const getTodayStr = () => new Date().toISOString().split("T")[0];
  const markDone = (id: string) => {
    const today = getTodayStr();
    const updated = habits.map(h => {
      if (h.id === id) {
        if (!h.completions.includes(today)) {
          const newComps = [...h.completions, today].sort();
          checkMilestone(newComps.length);
          return {
            ...h,
            completions: newComps
          };
        }
      }
      return h;
    });
    saveHabits(updated);
  };
  const checkMilestone = (count: number) => {
    const milestones = [7, 14, 21, 30, 60, 100];
    if (milestones.includes(count)) {
      toast.success(`Milestone reached: ${count} days! Keep it up! 🏆`);
    } else {
      toast.success("Marked as done!");
    }
  };
  const calculateStreak = (completions: string[]) => {
    if (completions.length === 0) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;
    const currDate = new Date(today);

    // Check if done today
    const todayStr = currDate.toISOString().split("T")[0];
    if (completions.includes(todayStr)) {
      streak++;
      currDate.setDate(currDate.getDate() - 1);
    } else {
      // If not done today, check if done yesterday
      const yest = new Date(today);
      yest.setDate(yest.getDate() - 1);
      const yestStr = yest.toISOString().split("T")[0];
      if (completions.includes(yestStr)) {
        streak++;
        currDate.setDate(currDate.getDate() - 2);
      } else {
        return 0;
      }
    }
    while (true) {
      const dateStr = currDate.toISOString().split("T")[0];
      if (completions.includes(dateStr)) {
        streak++;
        currDate.setDate(currDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };
  const calculateLongestStreak = (completions: string[]) => {
    let max = 0;
    let curr = 0;
    for (let i = 0; i < completions.length; i++) {
      if (i === 0) {
        curr = 1;
        max = 1;
        continue;
      }
      const prev = new Date(completions[i - 1]);
      const currDate = new Date(completions[i]);
      const diff = (currDate.getTime() - prev.getTime()) / (1000 * 3600 * 24);
      if (diff === 1) {
        curr++;
        if (curr > max) max = curr;
      } else {
        curr = 1;
      }
    }
    return max;
  };
  const renderHeatmap = (completions: string[]) => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split("T")[0];
      days.push(<div key={dStr} className={cn("w-3 h-3 rounded-sm", completions.includes(dStr) ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700')} title={dStr}></div>);
    }
    return <div className="flex gap-1 mt-2 flex-wrap">{days}</div>;
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Habit Streak Counter" description="Track your daily habits and build consistent streaks" icon={Flame} actions={<Button variant="outline" onClick={() => saveHabits([])}>
 Reset All
 </Button>} />

 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Add New Habit</CardTitle>
 <CardDescription>Start building a new positive habit today.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Habit Name</Label>
 <Input value={newHabitName} onChange={e => setNewHabitName(e.target.value)} placeholder="e.g. Read 10 pages" />
 </div>
 <div className="space-y-2">
 <Label>Emoji (Optional)</Label>
 <Input value={newHabitEmoji} onChange={e => setNewHabitEmoji(e.target.value)} placeholder="📚" maxLength={2} />
 </div>
 <Button className="w-full" onClick={addHabit}>
 <Plus className="w-4 h-4 mr-2" />
 Add Habit
 </Button>
 </CardContent>
 </GlassCard>

 <div className="md:col-span-2 space-y-4">
 {habits.length === 0 ? <GlassCard>
 <CardContent className="py-8 text-center text-muted-foreground">
 No habits tracked yet. Add one to start!
 </CardContent>
 </GlassCard> : habits.map(habit => <GlassCard key={habit.id}>
 <CardContent className="p-4 sm:p-6 flex flex-col gap-4">
 <div className="flex justify-between items-start">
 <div>
 <h3 className="text-xl font-bold flex items-center gap-2">
 <span>{habit.emoji}</span> {habit.name}
 </h3>
 <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
 <div className="flex items-center gap-1">
 <Flame className="w-4 h-4" /> Current: {calculateStreak(habit.completions)}
 </div>
 <div className="flex items-center gap-1">
 <Trophy className="w-4 h-4" /> Longest: {calculateLongestStreak(habit.completions)}
 </div>
 <div className="flex items-center gap-1">
 <Calendar className="w-4 h-4" /> Total: {habit.completions.length}
 </div>
 </div>
 </div>
 <Button variant={habit.completions.includes(getTodayStr()) ? "secondary" : "default"} disabled={habit.completions.includes(getTodayStr())} onClick={() => markDone(habit.id)}>
 {habit.completions.includes(getTodayStr()) ? "Done Today" : "Mark Done"}
 </Button>
 </div>
 <div>
 <div className="text-xs text-muted-foreground mb-1">Last 30 Days</div>
 {renderHeatmap(habit.completions)}
 </div>
 </CardContent>
 </GlassCard>)}
 </div>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Habit",
    description:"Name what to track.",
    icon: Flame,
  },
{
    step:"02",
    title:"Mark",
    description:"Check done each day.",
    icon: CheckCircle2,
  },
{
    step:"03",
    title:"Watch",
    description:"See the streak grow.",
    icon: TrendingUp,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Flame,
    title:"Streaks",
    description:"Consecutive days.",
  },
{
    icon: CheckCircle2,
    title:"Daily",
    description:"Quick check.",
  },
{
    icon: TrendingUp,
    title:"History",
    description:"Long view.",
  },
{
    icon: Star,
    title:"Motivate",
    description:"Don't break the chain.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A habit streak counter shows consecutive days of a behavior, leveraging the &quot;don't break the chain&quot; effect to sustain effort. Seeing the number grow is its own reward. This tool tracks and displays streaks.</p>
  <p>A missed day isn't failure; the long view matters more. The counter keeps the perspective.</p>
  <p>Use it for any habit. The tool's value is motivating, private streak tracking.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why streaks?",
    answer:"Visual momentum motivates.",
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
    question:"Missed day?",
    answer:"Restarts, keep going.",
  },
{
    question:"Use case?",
    answer:"Any habit.",
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
          <h3>Why Use Our dStr?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our dStr provides
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

      <RelatedTools currentToolUrl="/tools/productivity/streaks" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
