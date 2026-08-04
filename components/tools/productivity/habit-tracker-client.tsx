"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Plus, Trash2, CheckCircle2, Circle, Trophy, Target, TrendingUp } from "lucide-react";
import { ResetButton } from "@/components/shared/action-buttons";

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
  { name: "Read", emoji: "📚" },
  { name: "Meditate", emoji: "🧘" },
  { name: "Drink Water", emoji: "💧" },
  { name: "Journal", emoji: "📝" },
  { name: "Learn", emoji: "🧠" },
];

export function HabitTrackerClient() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitEmoji, setNewHabitEmoji] = useState("✨");
  const [newHabitFrequency, setNewHabitFrequency] = useState<"daily" | "weekly">("daily");
  const [isLoaded, setIsLoaded] = useState(false);

  const getTodayString = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset*60*1000));
    return localToday.toISOString().split('T')[0];
  };

  const todayStr = getTodayString();

  useEffect(() => {
    const saved = localStorage.getItem("toolzium-habit-tracker");
    if (saved) {
      try {
        setHabits(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse habits", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("toolzium-habit-tracker", JSON.stringify(habits));
    }
  }, [habits, isLoaded]);

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName.trim(),
      emoji: newHabitEmoji,
      frequency: newHabitFrequency,
      completedDates: [],
      createdAt: todayStr,
    };

    setHabits([...habits, newHabit]);
    setNewHabitName("");
    setNewHabitEmoji("✨");
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const toggleHabit = (habitId: string, date: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: isCompleted 
            ? habit.completedDates.filter(d => d !== date)
            : [...habit.completedDates, date].sort()
        };
      }
      return habit;
    }));
  };

  const calculateStreaks = useCallback((completedDates: string[]) => {
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;
    
    if (completedDates.length === 0) return { currentStreak: 0, bestStreak: 0 };

    // Convert dates to a Set for O(1) lookup
    const dateSet = new Set(completedDates);
    
    // Find earliest and latest dates
    const dates = [...completedDates].sort();
    if (dates.length === 0) return { currentStreak: 0, bestStreak: 0 };
    
    let currentDate = new Date(dates[0]);
    const endDate = new Date(todayStr);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (dateSet.has(dateStr)) {
        tempStreak++;
        bestStreak = Math.max(bestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Check if the current streak is still active (completed today or yesterday)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (dateSet.has(todayStr)) {
      currentStreak = tempStreak;
    } else if (dateSet.has(yesterdayStr)) {
      currentStreak = tempStreak;
    } else {
      currentStreak = 0;
    }

    return { currentStreak, bestStreak };
  }, [todayStr]);

  const getRecentDays = () => {
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const displayStr = d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
      days.push({ dateStr, displayStr, isToday: i === 0 });
    }
    return days;
  };

  const recentDays = useMemo(() => getRecentDays(), []);

  const overallProgress = useMemo(() => {
    if (habits.length === 0) return 0;
    const completedToday = habits.filter(h => h.completedDates.includes(todayStr)).length;
    return Math.round((completedToday / habits.length) * 100);
  }, [habits, todayStr]);

  if (!isLoaded) return null;

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Habit Tracker"
        description="Build good habits, track your daily progress, and maintain streaks."
        icon={CalendarDays}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle>Add New Habit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={addHabit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Habit Name</label>
                <div className="flex gap-2">
                  <input
                    className="w-12 h-10 px-0 text-center rounded-md border border-input bg-background"
                    value={newHabitEmoji}
                    onChange={(e) => setNewHabitEmoji(e.target.value)}
                    maxLength={2}
                    placeholder="✨"
                  />
                  <input
                    className="flex-1 h-10 px-3 rounded-md border border-input bg-background"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    placeholder="e.g. Read 10 pages"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Suggestions</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_SUGGESTIONS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setNewHabitName(preset.name);
                        setNewHabitEmoji(preset.emoji);
                      }}
                      className="text-xs bg-muted hover:bg-primary hover:text-primary-foreground px-2 py-1 rounded-full transition-colors"
                    >
                      {preset.emoji} {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground h-10 rounded-md hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4" /> Add Habit
              </button>
            </form>

            <Separator className="my-4" />
            
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium mb-2">Today's Progress</span>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-muted"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${251.2}`}
                    strokeDashoffset={`${251.2 - (251.2 * overallProgress) / 100}`}
                    className="text-primary transition-all duration-500 ease-in-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{overallProgress}%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <ResetButton onClick={() => {
                if(confirm("Are you sure you want to delete all habits?")) {
                  setHabits([]);
                }
              }} />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" /> Your Habits
            </CardTitle>
          </CardHeader>
          <CardContent>
            {habits.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>No habits added yet.</p>
                <p className="text-sm mt-1">Add your first habit to start tracking!</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="overflow-x-auto pb-4">
                  <div className="min-w-[600px]">
                    <div className="grid grid-cols-[200px_1fr] gap-4 mb-2">
                      <div className="font-semibold text-sm text-muted-foreground">Habit</div>
                      <div className="grid grid-cols-14 gap-1">
                        {recentDays.map((day, i) => (
                          <div key={day.dateStr} className={"text-[10px] text-center " + (day.isToday ? 'font-bold text-primary' : 'text-muted-foreground')}>
                            {day.displayStr.split(' ')[0]}<br/>{day.displayStr.split(' ')[1]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {habits.map((habit) => {
                      const { currentStreak, bestStreak } = calculateStreaks(habit.completedDates);
                      
                      return (
                        <div key={habit.id} className="grid grid-cols-[200px_1fr] gap-4 py-3 border-t border-border group items-center">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{habit.emoji}</span>
                              <span className="font-medium truncate" title={habit.name}>{habit.name}</span>
                              <button 
                                onClick={() => deleteHabit(habit.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-destructive hover:bg-destructive/10 p-1 rounded"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1" title="Current Streak"><TrendingUp className="h-3 w-3"/> {currentStreak}</span>
                              <span className="flex items-center gap-1" title="Best Streak"><Trophy className="h-3 w-3"/> {bestStreak}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-14 gap-1 items-center">
                            {recentDays.map((day) => {
                              const isCompleted = habit.completedDates.includes(day.dateStr);
                              return (
                                <button
                                  key={day.dateStr}
                                  onClick={() => toggleHabit(habit.id, day.dateStr)}
                                  className={"aspect-square rounded flex items-center justify-center transition-all " + (isCompleted 
                                      ? 'bg-green-500/20 text-green-600 hover:bg-green-500/30' 
                                      : 'bg-muted hover:bg-muted/80 text-muted-foreground/30')}
                                  title={`${habit.name} on ${day.displayStr}`}
                                >
                                  {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
