"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Button } from"@/components/ui/button";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Calendar, CheckSquare, Sparkles, Download, Plus, Trash2 } from"lucide-react";

interface Habit {
 id: string;
 name: string;
 category: string;
 days: boolean[];
}

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export function HabitPlannerClient() {
 const [habits, setHabits] = useState<Habit[]>([]);
 const [newHabitName, setNewHabitName] = useState("");
 const [newHabitCategory, setNewHabitCategory] = useState("");
 const [streak, setStreak] = useState(0);

 useEffect(() => {
 const saved = localStorage.getItem("habitPlanner");
 if (saved) {
 try {
 const parsed = JSON.parse(saved);
 setHabits(parsed.habits || []);
 setStreak(parsed.streak || 0);
 } catch (e) {}
 }
 }, []);

 const saveState = (newHabits: Habit[], newStreak: number) => {
 setHabits(newHabits);
 setStreak(newStreak);
 localStorage.setItem("habitPlanner", JSON.stringify({ habits: newHabits, streak: newStreak }));
 };

 const addHabit = () => {
 if (!newHabitName.trim()) return;
 const newHabits = [...habits, { id: Date.now().toString(), name: newHabitName, category: newHabitCategory, days: Array(7).fill(false) }];
 saveState(newHabits, streak);
 setNewHabitName("");
 setNewHabitCategory("");
 };

 const toggleDay = (habitId: string, dayIndex: number) => {
 const newHabits = habits.map(h => {
 if (h.id === habitId) {
 const newDays = [...h.days];
 newDays[dayIndex] = !newDays[dayIndex];
 return { ...h, days: newDays };
 }
 return h;
 });
 saveState(newHabits, streak);
 };

 const deleteHabit = (id: string) => {
 const newHabits = habits.filter(h => h.id !== id);
 saveState(newHabits, streak);
 };

 const resetWeek = () => {
 const newHabits = habits.map(h => ({ ...h, days: Array(7).fill(false) }));
 saveState(newHabits, streak + 1);
 };

 const calculateCompletion = (days: boolean[]) => {
 const completed = days.filter(Boolean).length;
 return Math.round((completed / 7) * 100);
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Calendar}
 title="Weekly Habit & Routine Planner"
 description="Track your daily habits, build routines, and maintain your weekly streaks."
 actions={
 <ResetButton onClick={resetWeek} label="Reset Week & Increment Streak"/>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Add Habit</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div>
 <label className="text-sm font-medium mb-1 block">Habit Name</label>
 <Input value={newHabitName} onChange={e => setNewHabitName(e.target.value)} placeholder="e.g. Morning Jog"/>
 </div>
 <div>
 <label className="text-sm font-medium mb-1 block">Category</label>
 <Input value={newHabitCategory} onChange={e => setNewHabitCategory(e.target.value)} placeholder="e.g. Health, Work"/>
 </div>
 <Button onClick={addHabit} className="w-full">
 <Plus className="w-4 h-4 mr-2"/> Add Habit
 </Button>
 </CardContent>
 </GlassCard>

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
 </div>
 </div>
 </div>
 );
}
