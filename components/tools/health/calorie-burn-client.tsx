"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { Zap, Activity, Timer, Weight } from "lucide-react";

// List of activities with MET values
const activities = [
  { id: "walking_slow", name: "Walking (Slow, 2 mph)", met: 2.8, tip: "Great for active recovery and basic daily movement." },
  { id: "walking_brisk", name: "Walking (Brisk, 3.5 mph)", met: 4.3, tip: "Excellent for cardiovascular health." },
  { id: "running_5mph", name: "Running (5 mph)", met: 8.3, tip: "High impact, good for burning calories fast." },
  { id: "running_7mph", name: "Running (7 mph)", met: 11.5, tip: "Intense cardio workout." },
  { id: "cycling_leisure", name: "Cycling (Leisure, 10 mph)", met: 4.0, tip: "Low impact on joints." },
  { id: "cycling_vigorous", name: "Cycling (Vigorous, 14-16 mph)", met: 10.0, tip: "Builds lower body strength and endurance." },
  { id: "swimming_laps", name: "Swimming (Laps, moderate)", met: 5.8, tip: "Full body workout with zero joint impact." },
  { id: "swimming_vigorous", name: "Swimming (Vigorous)", met: 9.8, tip: "Burns serious calories and builds upper body strength." },
  { id: "yoga", name: "Yoga (Hatha)", met: 2.5, tip: "Improves flexibility and mental wellbeing." },
  { id: "dancing", name: "Dancing (Aerobic, general)", met: 7.3, tip: "Fun way to do cardio." },
  { id: "hiking", name: "Hiking (Cross country)", met: 6.0, tip: "Engages stabilizing muscles." },
  { id: "weight_training", name: "Weight Training (General)", met: 3.5, tip: "Builds muscle, which increases resting metabolic rate." },
  { id: "tennis", name: "Tennis (Singles)", met: 8.0, tip: "Improves agility and hand-eye coordination." },
  { id: "basketball", name: "Basketball (Game)", met: 8.0, tip: "Involves sprinting and jumping." },
  { id: "jump_rope", name: "Jumping Rope (Moderate)", met: 10.0, tip: "One of the most efficient calorie burners." },
];

export function CalorieBurnClient() {
  const [weight, setWeight] = useState<string>("70");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [duration, setDuration] = useState<string>("30");
  const [selectedActivityId, setSelectedActivityId] = useState<string>(activities[0].id);

  const handleReset = () => {
    setWeight("70");
    setWeightUnit("kg");
    setDuration("30");
    setSelectedActivityId(activities[0].id);
  };

  const selectedActivity = activities.find(a => a.id === selectedActivityId) || activities[0];
  
  // Calculate calories: Calories = MET * Weight(kg) * Duration(hrs)
  const weightInKg = weightUnit === "kg" ? parseFloat(weight) || 0 : (parseFloat(weight) || 0) * 0.453592;
  const durationInHours = (parseFloat(duration) || 0) / 60;
  
  const calculateCalories = (met: number) => {
    return (met * weightInKg * durationInHours).toFixed(0);
  };

  const caloriesBurned = calculateCalories(selectedActivity.met);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Zap}
        title="Calorie Burn Calculator"
        description="Estimate how many calories you burn doing different activities based on your weight and duration."
        actions={
          <ResetButton onClick={handleReset} label="Reset" />
        }
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
            <CardDescription>Enter your details to calculate calories.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Weight</Label>
              <div className="flex space-x-2">
                <Input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)}
                  min="1"
                />
                <Select value={weightUnit} onValueChange={(v: "kg"|"lbs") => setWeightUnit(v)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <Input 
                  type="number" 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Activity</Label>
              <Select value={selectedActivityId} onValueChange={setSelectedActivityId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an activity" />
                </SelectTrigger>
                <SelectContent>
                  {activities.map(act => (
                    <SelectItem key={act.id} value={act.id}>
                      {act.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Zap className="h-6 w-6" />
              Estimated Calories Burned
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6 py-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary">{caloriesBurned}</div>
              <div className="text-xl text-muted-foreground mt-2">kcal</div>
            </div>
            
            <div className="bg-background/80 p-4 rounded-lg w-full text-center space-y-2">
              <div className="font-medium text-foreground flex items-center justify-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                {selectedActivity.name}
              </div>
              <p className="text-sm text-muted-foreground">
                Tip: {selectedActivity.tip}
              </p>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle>Compare Activities</CardTitle>
          <CardDescription>See how many calories you would burn doing other activities for {duration} minutes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {activities.slice(0, 5).map(act => (
              <div key={act.id} className="p-3 rounded-md bg-secondary/50 flex flex-col items-center text-center space-y-1">
                <span className="text-xs text-muted-foreground font-medium">{act.name}</span>
                <span className="text-lg font-bold text-primary">{calculateCalories(act.met)}</span>
                <span className="text-xs text-muted-foreground">kcal</span>
              </div>
            ))}
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
