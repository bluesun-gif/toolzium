"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Award, Activity, TrendingUp, Calendar } from"lucide-react";
import { ResetButton } from"@/components/shared/action-buttons";

export function HabitScoreClient() {
 const [sleep, setSleep] = useState(7);
 const [exercise, setExercise] = useState(30);
 const [water, setWater] = useState(4);
 const [meditation, setMeditation] = useState(0);

 const calculateScore = () => {
 let score = 0;
 // Sleep: up to 8 hours gets points
 score += Math.min(sleep / 8, 1) * 25;
 // Exercise: up to 60 mins gets points
 score += Math.min(exercise / 60, 1) * 25;
 // Water: up to 8 glasses gets points
 score += Math.min(water / 8, 1) * 25;
 // Meditation: up to 20 mins gets points
 score += Math.min(meditation / 20, 1) * 25;
 return Math.round(score);
 };

 const score = calculateScore();

 const reset = () => {
 setSleep(7);
 setExercise(30);
 setWater(4);
 setMeditation(0);
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Award}
 title="Habit Score Calculator"
 description="Rate your daily habits and get a wellness score."
 actions={<ResetButton onClick={reset} label="Reset"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Daily Inputs</CardTitle>
 <CardDescription>Enter your habits for today</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Sleep (hours)</Label>
 <Input type="number"min={0} max={24} value={sleep} onChange={(e) => setSleep(Number(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Exercise (minutes)</Label>
 <Input type="number"min={0} value={exercise} onChange={(e) => setExercise(Number(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Water (glasses)</Label>
 <Input type="number"min={0} value={water} onChange={(e) => setWater(Number(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Meditation/Mindfulness (minutes)</Label>
 <Input type="number"min={0} value={meditation} onChange={(e) => setMeditation(Number(e.target.value) || 0)} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Your Score</CardTitle>
 <CardDescription>Out of 100</CardDescription>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center space-y-6 min-h-[300px]">
 <div className="text-8xl font-black text-primary drop-shadow-sm">
 {score}
 </div>
 <div className="text-xl font-medium text-muted-foreground text-center">
 {score >= 80 ?"Excellent Habits! Keep it up!": 
 score >= 60 ?"Good job, but room for improvement.": 
 score >= 40 ?"Fair. Focus on building consistency.": 
"Needs work. Start small!"}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
