"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus, Trash2, CheckCircle2, Circle, Trophy, Target, TrendingUp, Shield, BookOpen, Layers } from "lucide-react";
import { ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Habit {
  id: string;
  name: string;
  emoji: string;
  frequency: "daily" | "weekly";
  completedDates: string[]; // YYYY-MM-DD format
  createdAt: string;
}

const PRESET_SUGGESTIONS = [
  { name: "Exercise", emoji: "🏃" },
  { name: "Read Books", emoji: "📚" },
  { name: "Meditation", emoji: "🧘" },
  { name: "Drink Water", emoji: "💧" },
  { name: "Daily Journal", emoji: "📝" },
  { name: "Code Review", emoji: "🧠" },
];

const DEFAULT_HABITS: Habit[] = [
  { id: "h1", name: "Morning Exercise", emoji: "🏃", frequency: "daily", completedDates: [], createdAt: "2026-08-01" },
  { id: "h2", name: "Read 20 Pages", emoji: "📚", frequency: "daily", completedDates: [], createdAt: "2026-08-01" },
];

export function HabitTrackerClient() {
  const [habits, setHabits] = useState<Habit[]>(DEFAULT_HABITS);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitEmoji, setNewHabitEmoji] = useState("✨");
  const [newHabitFrequency, setNewHabitFrequency] = useState<"daily" | "weekly">("daily");
  const [mounted, setMounted] = useState(false);

  const getTodayString = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - offset * 60 * 1000);
    return localToday.toISOString().split("T")[0];
  };

  const todayStr = getTodayString();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("toolzium-habit-tracker");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setHabits(parsed);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("toolzium-habit-tracker", JSON.stringify(habits));
    }
  }, [habits]);

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) {
      toast.error("Please enter a habit name.");
      return;
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName.trim(),
      emoji: newHabitEmoji || "✨",
      frequency: newHabitFrequency,
      completedDates: [todayStr],
      createdAt: todayStr,
    };

    setHabits([...habits, newHabit]);
    setNewHabitName("");
    setNewHabitEmoji("✨");
    toast.success("Added new habit!");
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id));
    toast.success("Habit removed.");
  };

  const toggleHabit = (habitId: string, date: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(date);
          return {
            ...habit,
            completedDates: isCompleted
              ? habit.completedDates.filter((d) => d !== date)
              : [...habit.completedDates, date].sort(),
          };
        }
        return habit;
      })
    );
  };

  const calculateStreaks = useCallback(
    (completedDates: string[]) => {
      let currentStreak = 0;
      let bestStreak = 0;
      let tempStreak = 0;

      if (completedDates.length === 0) return { currentStreak: 0, bestStreak: 0 };

      const dateSet = new Set(completedDates);
      const dates = [...completedDates].sort();
      if (dates.length === 0) return { currentStreak: 0, bestStreak: 0 };

      let currentDate = new Date(dates[0]);
      const endDate = new Date(todayStr);

      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split("T")[0];
        if (dateSet.has(dateStr)) {
          tempStreak++;
          bestStreak = Math.max(bestStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (dateSet.has(todayStr) || dateSet.has(yesterdayStr)) {
        currentStreak = tempStreak;
      } else {
        currentStreak = 0;
      }

      return { currentStreak, bestStreak };
    },
    [todayStr]
  );

  const getRecentDays = () => {
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const displayStr = d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" });
      days.push({ dateStr, displayStr, isToday: i === 0 });
    }
    return days;
  };

  const recentDays = useMemo(() => getRecentDays(), []);

  const overallProgress = useMemo(() => {
    if (habits.length === 0) return 0;
    const completedToday = habits.filter((h) => h.completedDates.includes(todayStr)).length;
    return Math.round((completedToday / habits.length) * 100);
  }, [habits, todayStr]);

  const handleReset = () => {
    setHabits(DEFAULT_HABITS);
    localStorage.removeItem("toolzium-habit-tracker");
    toast.success("Reset habits!");
  };
  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      <ToolPageHeader
        title="Daily Habit & Routine Streak Tracker"
        description="Build positive routines, check off 14-day completion grids, and monitor current and all-time best streaks."
        icon={CalendarDays}
        actions={<ResetButton onClick={handleReset} label="Reset Habits" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ADD HABIT FORM */}
        <GlassCard className="md:col-span-1 space-y-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="h-5 w-5 text-primary" /> Add New Habit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={addHabit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="h-name" className="text-xs font-bold">Habit Name & Emoji</Label>
                <div className="flex gap-2">
                  <Input
                    className="w-12 h-11 px-0 text-center rounded-xl font-bold"
                    value={newHabitEmoji}
                    onChange={(e) => setNewHabitEmoji(e.target.value)}
                    maxLength={2}
                    placeholder="✨"
                  />
                  <Input
                    id="h-name"
                    className="flex-1 h-11 font-medium text-foreground"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    placeholder="e.g. Morning Walk..."
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground">Quick Suggestions</Label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_SUGGESTIONS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setNewHabitName(preset.name);
                        setNewHabitEmoji(preset.emoji);
                      }}
                      className="text-xs bg-muted/60 hover:bg-primary hover:text-white px-2.5 py-1 rounded-full transition-colors font-medium"
                    >
                      {preset.emoji} {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full h-11 font-bold gap-2">
                <Plus className="h-4 w-4" /> Add Habit to Tracker
              </Button>
            </form>

            <Separator className="my-4" />

            <div className="flex flex-col items-center p-4 bg-muted/20 border border-border/60 rounded-2xl">
              <span className="text-xs font-bold text-muted-foreground uppercase mb-2">Today&apos;s Goal Progress</span>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/40" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * overallProgress) / 100}
                    className="text-primary transition-all duration-500 ease-in-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-black text-primary">{overallProgress}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        {/* HABIT GRID CARD */}
        <GlassCard className="md:col-span-2 space-y-4">
          <CardHeader className="pb-3 border-b border-border/60">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" /> 14-Day Habit Check-In Matrix
            </CardTitle>
            <CardDescription>Click any day tile to log or toggle completion.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 overflow-x-auto">
            {habits.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-xs italic">
                No habits added yet. Start by creating a habit on the left!
              </div>
            ) : (
              <div className="min-w-[650px]">
                <div className="grid grid-cols-[200px_1fr] gap-4 mb-3 px-2">
                  <div className="font-bold text-xs text-muted-foreground uppercase">Habit Title</div>
                  <div className="grid grid-cols-14 gap-1">
                    {recentDays.map((day) => (
                      <div
                        key={day.dateStr}
                        className={cn(
                          "text-[9px] font-bold text-center uppercase tracking-tighter leading-tight",
                          day.isToday ? "text-primary font-black scale-110" : "text-muted-foreground"
                        )}
                      >
                        {day.displayStr.split(" ")[0]}
                        <br />
                        {day.displayStr.split(" ")[1]}
                      </div>
                    ))}
                  </div>
                </div>

                {habits.map((habit) => {
                  const { currentStreak, bestStreak } = calculateStreaks(habit.completedDates);

                  return (
                    <div key={habit.id} className="grid grid-cols-[200px_1fr] gap-4 py-3 border-t border-border/60 group items-center px-2">
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-lg shrink-0">{habit.emoji}</span>
                          <span className="font-bold text-sm text-foreground truncate">{habit.name}</span>
                          <button
                            onClick={() => deleteHabit(habit.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-muted-foreground hover:text-destructive p-1"
                            title="Delete habit"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground">
                          <span className="flex items-center gap-1 text-primary" title="Current Streak">
                            <TrendingUp className="h-3.5 w-3.5" /> {currentStreak}d
                          </span>
                          <span className="flex items-center gap-1 text-amber-500" title="Best Streak">
                            <Trophy className="h-3.5 w-3.5" /> {bestStreak}d
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-14 gap-1 items-center">
                        {recentDays.map((day) => {
                          const isCompleted = habit.completedDates.includes(day.dateStr);
                          return (
                            <button
                              key={day.dateStr}
                              onClick={() => toggleHabit(habit.id, day.dateStr)}
                              className={cn(
                                "aspect-square rounded-lg flex items-center justify-center transition-all shadow-xs",
                                isCompleted
                                  ? "bg-emerald-500 text-white shadow-emerald-500/20 scale-105"
                                  : "bg-muted/50 hover:bg-muted text-muted-foreground/30 border border-border/40"
                              )}
                              title={`${habit.name} on ${day.displayStr}`}
                            >
                              {isCompleted ? <CheckCircle2 className="h-4 w-4 text-white" /> : <Circle className="h-3 h-3 opacity-30" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Define Daily Habits",
            description: "Add habit titles and assign custom emoji badges.",
            icon: CalendarDays,
          },
          {
            step: "02",
            title: "Check Off Daily Tiles",
            description: "Click the 14-day calendar grid tiles to log daily completion.",
            icon: CheckCircle2,
          },
          {
            step: "03",
            title: "Build Consecutive Streaks",
            description: "Watch your current and all-time best streak numbers grow over time.",
            icon: Trophy,
          },
        ]}
        badges={["14-Day Grid View", "Current & Best Streaks", "100% Free"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: CalendarDays,
            title: "14-Day Visual Grid Matrix",
            description: "Monitors daily check-ins over a rolling 14-day historical window.",
          },
          {
            icon: Trophy,
            title: "Streak Counter Engine",
            description: "Calculates active consecutive day streaks and all-time personal bests.",
          },
          {
            icon: Shield,
            title: "Private Browser Persistence",
            description: "Saves habit check-ins securely in your local browser storage.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "How are streaks calculated?",
            answer: "Streaks count consecutive days where you checked off a habit. Missing a day resets the active streak counter.",
          },
          {
            question: "Is my habit data saved online?",
            answer: "No, all habit entries remain strictly in your local browser storage.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/habit-tracker" max={6} />
    </div>
  );
}
