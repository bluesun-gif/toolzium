"use client";

import React, { useState, useMemo } from"react";
import { Dumbbell, Target, Utensils, Copy } from"lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";

export function ProteinCalcClient() {
 const [weight, setWeight] = useState("150");
 const [weightUnit, setWeightUnit] = useState("lbs");
 const [goal, setGoal] = useState("muscle");
 
 const resetAll = () => {
 setWeight("150");
 setWeightUnit("lbs");
 setGoal("muscle");
 };

 const results = useMemo(() => {
 const w = parseFloat(weight);
 if (isNaN(w) || w <= 0) return null;
 
 // convert to lbs for calculation standard
 const weightLbs = weightUnit ==="kg"? w * 2.20462 : w;
 
 let multiplier = 0.8;
 if (goal ==="sedentary") multiplier = 0.4;
 else if (goal ==="endurance") multiplier = 0.6;
 else if (goal ==="muscle") multiplier = 0.8;
 else if (goal ==="weightloss") multiplier = 1.0;
 
 const dailyProtein = Math.round(weightLbs * multiplier);
 const calories = dailyProtein * 4;
 
 return {
 daily: dailyProtein,
 calories: calories,
 meals3: Math.round(dailyProtein / 3),
 meals4: Math.round(dailyProtein / 4),
 meals5: Math.round(dailyProtein / 5),
 };
 }, [weight, weightUnit, goal]);

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Dumbbell}
 title="Protein Intake Calculator"
 description="Calculate daily recommended protein intake based on body weight, goal, and activity level."
 actions={<ResetButton onClick={resetAll} label="Reset"/>}
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Your Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Weight</Label>
 <div className="flex gap-2">
 <Input type="number"value={weight} onChange={(e) => setWeight(e.target.value)} className="flex-1"/>
 <Select value={weightUnit} onValueChange={setWeightUnit}>
 <SelectTrigger className="w-[100px]">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="lbs">lbs</SelectItem>
 <SelectItem value="kg">kg</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Goal / Activity Level</Label>
 <Select value={goal} onValueChange={setGoal}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="sedentary">Sedentary / Light Activity</SelectItem>
 <SelectItem value="endurance">Endurance Athlete</SelectItem>
 <SelectItem value="muscle">Strength / Muscle Building</SelectItem>
 <SelectItem value="weightloss">Weight Loss / Retain Muscle</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 </CardHeader>
 <CardContent>
 {results ? (
 <div className="space-y-6">
 <div className="text-center p-6 bg-primary/10 rounded-xl">
 <div className="text-4xl font-bold text-primary">{results.daily}g</div>
 <div className="text-sm text-muted-foreground mt-1">Daily Protein Intake</div>
 <div className="text-sm mt-2 font-medium">{results.calories} calories from protein</div>
 </div>
 
 <div className="space-y-3">
 <h3 className="font-semibold flex items-center gap-2"><Utensils className="w-4 h-4"/> Per Meal Breakdown</h3>
 <div className="grid grid-cols-3 gap-2 text-center">
 <div className="bg-muted p-2 rounded-md">
 <div className="font-bold">{results.meals3}g</div>
 <div className="text-xs text-muted-foreground">3 Meals</div>
 </div>
 <div className="bg-muted p-2 rounded-md">
 <div className="font-bold">{results.meals4}g</div>
 <div className="text-xs text-muted-foreground">4 Meals</div>
 </div>
 <div className="bg-muted p-2 rounded-md">
 <div className="font-bold">{results.meals5}g</div>
 <div className="text-xs text-muted-foreground">5 Meals</div>
 </div>
 </div>
 </div>
 
 <div className="flex justify-end">
 <CopyButton getText={() =>"Daily Protein:"+ results.daily +"g ("+ results.calories +"kcal). Breakdown:"+ results.meals3 +"g/3 meals,"+ results.meals4 +"g/4 meals,"+ results.meals5 +"g/5 meals."} label="Copy Results"/>
 </div>
 </div>
 ) : (
 <div className="text-center p-6 text-muted-foreground">
 Enter valid details to see your recommended protein intake.
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
