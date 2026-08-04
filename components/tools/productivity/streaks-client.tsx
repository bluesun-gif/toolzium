"use client";
import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Flame, Calendar, Trophy, Plus } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

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
          return { ...h, completions: newComps };
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
    today.setHours(0,0,0,0);
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
          const prev = new Date(completions[i-1]);
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
  }

  const renderHeatmap = (completions: string[]) => {
      const days = [];
      const today = new Date();
      for (let i = 29; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const dStr = d.toISOString().split("T")[0];
          days.push(
              <div key={dStr} className={"w-3 h-3 rounded-sm " + (completions.includes(dStr) ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700')} title={dStr}></div>
          );
      }
      return <div className="flex gap-1 mt-2 flex-wrap">{days}</div>;
  }

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Habit Streak Counter"
        description="Track your daily habits and build consistent streaks"
        icon={Flame}
        actions={
          <Button variant="outline" onClick={() => saveHabits([])}>
            Reset All
          </Button>
        }
      />

      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle>Add New Habit</CardTitle>
            <CardDescription>Start building a new positive habit today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Habit Name</Label>
              <Input
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="e.g. Read 10 pages"
              />
            </div>
            <div className="space-y-2">
              <Label>Emoji (Optional)</Label>
              <Input
                value={newHabitEmoji}
                onChange={(e) => setNewHabitEmoji(e.target.value)}
                placeholder="📚"
                maxLength={2}
              />
            </div>
            <Button className="w-full" onClick={addHabit}>
              <Plus className="w-4 h-4 mr-2" />
              Add Habit
            </Button>
          </CardContent>
        </GlassCard>

        <div className="md:col-span-2 space-y-4">
          {habits.length === 0 ? (
            <GlassCard>
                <CardContent className="py-8 text-center text-muted-foreground">
                    No habits tracked yet. Add one to start!
                </CardContent>
            </GlassCard>
          ) : (
            habits.map(habit => (
              <GlassCard key={habit.id}>
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
                        <Button 
                            variant={habit.completions.includes(getTodayStr()) ? "secondary" : "default"}
                            disabled={habit.completions.includes(getTodayStr())}
                            onClick={() => markDone(habit.id)}
                        >
                            {habit.completions.includes(getTodayStr()) ? "Done Today" : "Mark Done"}
                        </Button>
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground mb-1">Last 30 Days</div>
                        {renderHeatmap(habit.completions)}
                    </div>
                </CardContent>
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
