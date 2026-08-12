"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { Activity, Flame, Clock, Scale } from"lucide-react";

export function EllipticalCalorieClient() {
 const [weight, setWeight] = useState("150");
 const [unit, setUnit] = useState("lbs");
 const [duration, setDuration] = useState("30");
 const [effort, setEffort] = useState("moderate");
 const [incline, setIncline] = useState("0");

 const calculateResults = () => {
 const w = parseFloat(weight);
 const d = parseFloat(duration);
 const inc = parseFloat(incline);
 if (isNaN(w) || isNaN(d) || isNaN(inc) || w <= 0 || d <= 0) {
 return null;
 }

 const weightKg = unit ==="lbs"? w * 0.453592 : w;
 
 // Base MET values for elliptical
 let met = 5.0; // low
 if (effort ==="moderate") met = 7.0;
 else if (effort ==="high") met = 9.0;
 else if (effort ==="hiit") met = 11.0;

 // Adjust MET slightly for incline (rough estimate)
 met += inc * 0.1;

 // Calories = MET * 3.5 * weightKg / 200 * duration
 const caloriesBurned = (met * 3.5 * weightKg / 200) * d;
 
 // Fat burned (1 lb of fat = ~3500 calories)
 const fatBurned = caloriesBurned / 3500;

 // Rough distance estimate: moderate is ~4mph
 let mph = 3.5;
 if (effort ==="moderate") mph = 4.5;
 else if (effort ==="high") mph = 5.5;
 else if (effort ==="hiit") mph = 6.5;

 const distanceMiles = mph * (d / 60);

 return {
 calories: caloriesBurned.toFixed(0),
 met: met.toFixed(1),
 fat: fatBurned.toFixed(3),
 distance: distanceMiles.toFixed(2),
 };
 };

 const results = calculateResults();

 const handleReset = () => {
 setWeight("150");
 setUnit("lbs");
 setDuration("30");
 setEffort("moderate");
 setIncline("0");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Activity}
 title="Elliptical Trainer Calorie Calculator"
 description="Estimate calories and fat burned during an elliptical cross-trainer workout."
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Details</CardTitle>
 <CardDescription>Enter your workout and body metrics</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Weight</Label>
 <div className="flex gap-2">
 <Input
 type="number"
 min="1"
 value={weight}
 onChange={(e) => setWeight(e.target.value)}
 />
 <Select value={unit} onValueChange={setUnit}>
 <SelectTrigger className="w-[80px]">
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
 <Label>Duration (mins)</Label>
 <Input
 type="number"
 min="1"
 value={duration}
 onChange={(e) => setDuration(e.target.value)}
 />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Effort Level</Label>
 <Select value={effort} onValueChange={setEffort}>
 <SelectTrigger>
 <SelectValue placeholder="Select effort"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="low">Low Resistance (easy pace)</SelectItem>
 <SelectItem value="moderate">Moderate Resistance (steady pace)</SelectItem>
 <SelectItem value="high">High Resistance (vigorous effort)</SelectItem>
 <SelectItem value="hiit">Intense HIIT Interval</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Incline Level (approx)</Label>
 <Input
 type="number"
 min="0"
 max="20"
 value={incline}
 onChange={(e) => setIncline(e.target.value)}
 />
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Workout Results</CardTitle>
 </CardHeader>
 <CardContent>
 {results ? (
 <div className="space-y-6">
 <div className="text-center p-6 bg-primary/10 rounded-lg">
 <div className="flex justify-center mb-2">
 <Flame className="w-10 h-10 text-primary"/>
 </div>
 <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">
 Calories Burned
 </div>
 <div className="text-5xl font-bold text-foreground">
 {results.calories}
 </div>
 <div className="text-sm text-muted-foreground mt-2">
 kcal
 </div>
 </div>

 <Separator />

 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-secondary/20 rounded-md flex flex-col items-center">
 <Activity className="w-6 h-6 text-muted-foreground mb-2"/>
 <div className="text-xl font-semibold">{results.met}</div>
 <div className="text-xs text-muted-foreground">MET Value</div>
 </div>
 <div className="p-4 bg-secondary/20 rounded-md flex flex-col items-center">
 <Scale className="w-6 h-6 text-muted-foreground mb-2"/>
 <div className="text-xl font-semibold">{results.fat} lbs</div>
 <div className="text-xs text-muted-foreground">Fat Burned</div>
 </div>
 </div>
 
 <div className="p-4 bg-secondary/20 rounded-md flex flex-col items-center">
 <Clock className="w-6 h-6 text-muted-foreground mb-2"/>
 <div className="text-xl font-semibold">{results.distance} miles</div>
 <div className="text-xs text-muted-foreground">Est. Distance</div>
 </div>
 </div>
 ) : (
 <div className="h-full flex items-center justify-center min-h-[200px] text-muted-foreground">
 Enter valid values to see results.
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
