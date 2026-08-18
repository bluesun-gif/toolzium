"use client";

import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Button } from"@/components/ui/button";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Calendar, CalendarRange, CheckCircle2, CheckSquare, Download, ListPlus, Plus, Sparkles, Trash2, TrendingUp, Check, Grid } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";

interface Habit {
  id: string;
  name: string;
  category: string;
  days: boolean[];
}
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEFAULT_HABITS: Habit[] = [{
  id: "h1",
  name: "Morning Exercise & Stretch",
  category: "Health",
  days: [true, true, false, true, false, false, false]
}, {
  id: "h2",
  name: "Read 20 Pages of Book",
  category: "Personal",
  days: [true, true, true, true, true, false, false]
}, {
  id: "h3",
  name: "Code Review & Refactoring",
  category: "Work",
  days: [true, true, true, true, true, false, false]
}];
export function HabitPlannerClient() {
  const [habits, setHabits] = useState<Habit[]>(DEFAULT_HABITS);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitCategory, setNewHabitCategory] = useState("Health");
  const [streak, setStreak] = useState(3);
  useEffect(() => {
    const saved = localStorage.getItem("habitPlanner");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.habits) && parsed.habits.length > 0) {
          setHabits(parsed.habits);
          setStreak(parsed.streak ?? 3);
        }
      } catch (e) {}
    }
  }, []);
  const saveState = (newHabits: Habit[], newStreak: number) => {
    setHabits(newHabits);
    setStreak(newStreak);
    localStorage.setItem("habitPlanner", JSON.stringify({
      habits: newHabits,
      streak: newStreak
    }));
  };
  const addHabit = () => {
    if (!newHabitName.trim()) {
      toast.error("Habit name cannot be empty.");
      return;
    }
    const newHabits = [...habits, {
      id: Date.now().toString(),
      name: newHabitName.trim(),
      category: newHabitCategory.trim() || "General",
      days: Array(7).fill(false)
    }];
    saveState(newHabits, streak);
    setNewHabitName("");
    setNewHabitCategory("Health");
    toast.success("Added new habit!");
  };
  const toggleDay = (habitId: string, dayIndex: number) => {
    const newHabits = habits.map(h => {
      if (h.id === habitId) {
        const newDays = [...h.days];
        newDays[dayIndex] = !newDays[dayIndex];
        return {
          ...h,
          days: newDays
        };
      }
      return h;
    });
    saveState(newHabits, streak);
  };
  const deleteHabit = (id: string) => {
    const newHabits = habits.filter(h => h.id !== id);
    saveState(newHabits, streak);
    toast.success("Habit removed.");
  };
  const resetWeek = () => {
    const newHabits = habits.map(h => ({
      ...h,
      days: Array(7).fill(false)
    }));
    saveState(newHabits, streak + 1);
    toast.success("Reset week & incremented streak count!");
  };
  const calculateCompletion = (days: boolean[]) => {
    const completed = days.filter(Boolean).length;
    return Math.round(completed / 7 * 100);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

      <ToolPageHeader icon={Calendar} title="Weekly Habit & Routine Planner" description="Track your daily habits, build routines, and maintain your weekly streaks with contrast-optimized check-ins." actions={<ResetButton onClick={resetWeek} label="Reset Week & Increment Streak" />} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CONTROL PANEL */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plus className="w-5 h-5 text-primary" /> Add New Habit
              </CardTitle>
              <CardDescription>Specify habit name and category to start tracking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="habit-name">Habit Name</Label>
                <Input id="habit-name" value={newHabitName} onChange={e => setNewHabitName(e.target.value)} onKeyDown={e => e.key === "Enter" && addHabit()} placeholder="e.g. Morning Meditation..." className="h-11 font-medium" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="habit-cat">Category (Optional)</Label>
                <Input id="habit-cat" value={newHabitCategory} onChange={e => setNewHabitCategory(e.target.value)} placeholder="e.g. Health, Work, Personal" className="h-11 font-medium" />
              </div>

              <Button onClick={addHabit} className="w-full h-11 font-bold gap-2">
                <Plus className="w-4 h-4" /> Add Habit
              </Button>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-primary" /> Streak Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-bold text-sm text-foreground">Weekly Streak</span>
                </div>
                <span className="text-3xl font-black text-primary">{streak} Weeks</span>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        {/* RIGHT WEEKLY TRACKER TABLE */}
        <div className="lg:col-span-2">
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-primary" /> Weekly Habit Tracker
              </CardTitle>
              <CardDescription>Click on each day button to log completion.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[550px]">
                  <thead>
                    <tr className="border-b border-border/80 text-muted-foreground text-xs uppercase font-bold">
                      <th className="text-left py-3 px-3">Habit</th>
                      {DAYS.map(day => <th key={day} className="text-center py-3 px-1 w-12">{day}</th>)}
                      <th className="text-center py-3 px-2">Completion Rate</th>
                      <th className="py-3 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {habits.length === 0 ? <tr>
                        <td colSpan={10} className="text-center py-8 text-muted-foreground text-xs italic">
                          No habits added yet. Start by adding one on the left!
                        </td>
                      </tr> : habits.map(habit => {
                      const rate = calculateCompletion(habit.days);
                      return <tr key={habit.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                            <td className="py-3 px-3">
                              <div className="font-bold text-sm text-foreground">{habit.name}</div>
                              {habit.category && <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{habit.category}</span>}
                            </td>
                            {habit.days.map((isDone, idx) => <td key={idx} className="text-center py-3 px-1">
                                <Button onClick={() => toggleDay(habit.id, idx)} className={cn(cn("w-8 h-8 rounded-lg flex items-center justify-center transition-all mx-auto shadow-xs", isDone ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105" : "bg-muted/60 hover:bg-muted text-muted-foreground/30 border border-border/60"))} title={`Toggle ${DAYS[idx]}`}>
                                  <CheckSquare className={cn("w-4 h-4", isDone ? "text-primary-foreground" : "opacity-0")} />
                                </Button>
                              </td>)}
                            <td className="text-center py-3 px-2 font-black text-sm text-primary">
                              {rate}%
                            </td>
                            <td className="text-center py-3 px-2">
                              <Button variant="ghost" size="icon" onClick={() => deleteHabit(habit.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>;
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <GlassCard>
 <CardHeader>
 <CardTitle>Progress</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
 <div className="flex items-center gap-2">
 <Sparkles className="w-5 h-5 text-primary"/>
 <span className="font-semibold">Weekly Streak</span>
 </div>
 <span className="text-2xl font-bold">{streak}</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="md:col-span-2">
 <GlassCard>
 <CardHeader>
 <CardTitle>Weekly Tracker</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse min-w-[600px]">
 <thead>
 <tr>
 <th className="text-left py-2 px-2 border-b">Habit</th>
 {DAYS.map(day => (
 <th key={day} className="text-center py-2 px-1 border-b text-sm font-medium w-12">{day}</th>
 ))}
 <th className="text-center py-2 px-2 border-b">Rate</th>
 <th className="py-2 px-2 border-b"></th>
 </tr>
 </thead>
 <tbody>
 {habits.length === 0 ? (
 <tr>
 <td colSpan={10} className="text-center py-8 text-muted-foreground">
 No habits added yet. Start by adding one!
 </td>
 </tr>
 ) : (
 habits.map(habit => (
 <tr key={habit.id} className="border-b last:border-0 hover:bg-muted/30">
 <td className="py-3 px-2">
 <div className="font-medium">{habit.name}</div>
 {habit.category && <div className="text-xs text-muted-foreground">{habit.category}</div>}
 </td>
 {habit.days.map((isDone, idx) => (
 <td key={idx} className="text-center py-3 px-1">
 <button
 onClick={() => toggleDay(habit.id, idx)}
 className={"w-8 h-8 rounded-md flex items-center justify-center transition-colors"+ (isDone ?"bg-primary text-primary-foreground":"bg-muted hover:bg-muted/80 text-transparent")}
 >
 {isDone && <CheckSquare className="w-5 h-5"/>}
 </button>
 </td>
 ))}
 <td className="text-center py-3 px-2 font-bold">
 {calculateCompletion(habit.days)}%
 </td>
 <td className="text-center py-3 px-2">
 <button onClick={() => deleteHabit(habit.id)} className="text-red-500 hover:text-red-700 p-1 rounded">
 <Trash2 className="w-4 h-4"/>
 </button>
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>
 </div>
 </CardContent>
 </GlassCard>
 
 
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"List Habits",
    description:"Add habits to build.",
    icon: ListPlus,
  },
{
    step:"02",
    title:"Schedule",
    description:"Assign days and times.",
    icon: CalendarRange,
  },
{
    step:"03",
    title:"Track",
    description:"Check off each day.",
    icon: CheckCircle2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListPlus,
    title:"Habits",
    description:"What to build.",
  },
{
    icon: CalendarRange,
    title:"Weekly Grid",
    description:"Days and times.",
  },
{
    icon: CheckCircle2,
    title:"Check",
    description:"Daily marks.",
  },
{
    icon: TrendingUp,
    title:"Streaks",
    description:"See consistency.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A weekly habit planner schedules behaviors ahead of time so they actually happen, rather than relying on daily willpower. Assigning habits to specific days makes them appointments. This tool provides the grid and check-off.</p>
  <p>Streaks reinforce consistency; the planner shows them so missing a day is visible and recoverable. Planning weekly reduces decision fatigue.</p>
  <p>Use it Sundays for the week ahead. The tool's value is scheduled, tracked habits that become routines.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/productivity/habit-planner" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"Why weekly?",
    answer:"Plan ahead, not daily.",
  },
{
    question:"Streaks?",
    answer:"Yes, motivate continuity.",
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
    answer:"Routine building.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default HabitPlannerClient;
