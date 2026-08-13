"use client";

import React, { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { Activity, TrendingUp, Target, Calendar, Plus } from"lucide-react";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";

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
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 const saved = localStorage.getItem("step-counter-entries");
 const savedGoal = localStorage.getItem("step-counter-goal");
 const savedStride = localStorage.getItem("step-counter-stride");
 if (saved) setEntries(JSON.parse(saved));
 if (savedGoal) setGoal(Number(savedGoal));
 if (savedStride) setStrideLength(Number(savedStride));
  }, []);

 useEffect(() => {
 if (mounted) {
 localStorage.setItem("step-counter-entries", JSON.stringify(entries));
 localStorage.setItem("step-counter-goal", goal.toString());
 localStorage.setItem("step-counter-stride", strideLength.toString());
 }
 }, [entries, goal, strideLength, mounted]);

 const handleAddEntry = () => {
 if (!newDate || newSteps < 0) {
 toast.error("Please provide valid date and steps");
 return;
 }
 
 // Check if entry for date already exists, replace it
 const existingIndex = entries.findIndex(e => e.date === newDate);
 const newEntry = { id: crypto.randomUUID(), date: newDate, steps: newSteps };
 
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
 if (entries.length === 0) return { today: 0, weeklyAvg: 0, streak: 0, calToday: 0, distToday: 0, progress: 0 };
 
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
 const weeklyAvg = last7Days.length > 0 
 ? Math.round(last7Days.reduce((acc, curr) => acc + curr.steps, 0) / last7Days.length)
 : 0;

 // Roughly 0.04 calories per step
 const calToday = Math.round(todaySteps * 0.04);
 // Distance in km
 const distToday = ((todaySteps * strideLength) / 1000).toFixed(2);
 
 const progress = Math.min(100, Math.round((todaySteps / goal) * 100));

 return { today: todaySteps, weeklyAvg, streak: currentStreak, calToday, distToday, progress };
 }, [entries, goal, strideLength]);
 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Activity}
 title="Step Counter & Pedometer Log"
 description="Log your daily steps, track calories burned, and monitor your streaks."
 actions={<ResetButton onClick={handleClear} label="Clear All Data"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Activity className="w-5 h-5 text-primary"/> Today's Progress
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex flex-col items-center">
 <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-muted">
 <div 
 className="absolute inset-0 rounded-full border-8 border-primary"
 style={{
 clipPath: `polygon(0 0, 100% 0, 100% ${100 - stats.progress}%, 0 ${100 - stats.progress}%)`,
 transform: 'rotate(-90deg)'
 }}
 />
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
 <Input type="date"value={newDate} onChange={e => setNewDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Steps</Label>
 <Input type="number"min="0"value={newSteps ||""} onChange={e => setNewSteps(Number(e.target.value))} />
 </div>
 </div>
 <Button onClick={handleAddEntry} className="w-full">
 <Plus className="w-4 h-4 mr-2"/> Log Steps
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
 <Input type="number"min="1000"value={goal} onChange={e => setGoal(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Stride Length (meters)</Label>
 <Input type="number"step="0.01"min="0.3"value={strideLength} onChange={e => setStrideLength(Number(e.target.value))} />
 <p className="text-xs text-muted-foreground">Average is 0.762m (76.2cm)</p>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calendar className="w-5 h-5"/> History Log
 </CardTitle>
 </CardHeader>
 <CardContent>
 {entries.length === 0 ? (
 <div className="text-center py-8 text-muted-foreground">No step data logged yet.</div>
 ) : (
 <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
 {entries.map((entry) => (
 <div key={entry.id} className="flex justify-between items-center p-3 rounded bg-secondary/20 border">
 <div>
 <div className="font-semibold">{entry.date}</div>
 <div className="text-xs text-muted-foreground">
 {Math.round(entry.steps * 0.04)} cal • {((entry.steps * strideLength) / 1000).toFixed(2)} km
 </div>
 </div>
 <div className="flex items-center gap-3">
 <span className="font-bold">{entry.steps.toLocaleString()}</span>
 {entry.steps >= goal ? (
 <Target className="w-4 h-4 text-green-500"/>
 ) : (
 <Activity className="w-4 h-4 text-muted-foreground"/>
 )}
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 );
}
