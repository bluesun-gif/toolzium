"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { Droplet, Plus, CheckCircle } from"lucide-react";
import { toast } from"react-hot-toast";

export function HydrationTrackerClient() {
 const [goal, setGoal] = useState<number>(2000);
 const [current, setCurrent] = useState<number>(0);
 
 useEffect(() => {
 const savedGoal = localStorage.getItem("hydrationGoal");
 const savedCurrent = localStorage.getItem("hydrationCurrent");
 const lastDate = localStorage.getItem("hydrationDate");
 const today = new Date().toDateString();
 
 if (savedGoal) setGoal(Number(savedGoal));
 if (lastDate === today && savedCurrent) {
 setCurrent(Number(savedCurrent));
 } else {
 localStorage.setItem("hydrationDate", today);
 setCurrent(0);
 }
 }, []);

 const updateCurrent = (val: number) => {
 const newVal = Math.max(0, current + val);
 setCurrent(newVal);
 localStorage.setItem("hydrationCurrent", String(newVal));
 if (newVal >= goal && current < goal) {
 toast.success("Goal reached! Great job staying hydrated.");
 }
 };

 const handleSetGoal = (val: string) => {
 const num = Number(val);
 if (!isNaN(num) && num > 0) {
 setGoal(num);
 localStorage.setItem("hydrationGoal", String(num));
 }
 };

 const percentage = Math.min(100, Math.round((current / goal) * 100));

 const handleReset = () => {
 setCurrent(0);
 localStorage.setItem("hydrationCurrent","0");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 title="Hydration & Daily Water Tracker"
 description="Track your water intake and achieve your daily hydration goals."
 icon={Droplet}
 actions={
 <div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset Day"/>
 </div>
 }
 />
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Settings & Tracking</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Daily Goal (ml)</Label>
 <Input type="number"value={goal} onChange={(e) => handleSetGoal(e.target.value)} />
 </div>
 
 <div className="pt-4 space-y-2">
 <Label>Quick Add</Label>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
 <Button variant="outline"onClick={() => updateCurrent(250)} className="w-full flex items-center justify-center gap-1">
 <Plus className="w-4 h-4"/> 250ml
 </Button>
 <Button variant="outline"onClick={() => updateCurrent(500)} className="w-full flex items-center justify-center gap-1">
 <Plus className="w-4 h-4"/> 500ml
 </Button>
 <Button variant="outline"onClick={() => updateCurrent(750)} className="w-full flex items-center justify-center gap-1">
 <Plus className="w-4 h-4"/> 750ml
 </Button>
 <Button variant="outline"onClick={() => updateCurrent(1000)} className="w-full flex items-center justify-center gap-1">
 <Plus className="w-4 h-4"/> 1L
 </Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Progress</CardTitle>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center space-y-6">
 <div className="relative w-40 h-40 rounded-full border-4 border-primary/20 overflow-hidden flex items-center justify-center bg-card">
 <div 
 className={"absolute bottom-0 w-full bg-blue-500/50 transition-all duration-1000 ease-out"}
 style={{ height: percentage +"%"}}
 />
 <div className="relative z-10 flex flex-col items-center">
 <span className="text-3xl font-bold">{percentage}%</span>
 <span className="text-sm text-muted-foreground">{current} / {goal} ml</span>
 </div>
 </div>
 {percentage >= 100 && (
 <div className="flex items-center gap-2 text-green-500 font-semibold">
 <CheckCircle className="w-5 h-5"/> Goal Achieved
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
