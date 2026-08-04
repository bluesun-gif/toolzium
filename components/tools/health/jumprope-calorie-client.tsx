"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton, ActionButton } from "@/components/shared/action-buttons";
import { Activity, Flame, Clock, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

export function JumpropeCalorieClient() {
  const [weight, setWeight] = useState("150");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [duration, setDuration] = useState("15");
  const [intensity, setIntensity] = useState("moderate");
  const [workoutType, setWorkoutType] = useState("jumprope");

  // MET values mapping
  const metValues: Record<string, Record<string, number>> = {
    jumprope: {
      slow: 8.8,
      moderate: 11.8,
      fast: 12.3,
      double_unders: 14.0,
    },
    hiit: {
      tabata: 12.0,
      bodyweight: 8.0,
      kettlebell: 9.8,
      burpees: 11.0,
    }
  };

  const calculateCalories = () => {
    let weightKg = parseFloat(weight) || 0;
    if (weightUnit === "lbs") {
      weightKg = weightKg * 0.453592;
    }
    const durationMins = parseFloat(duration) || 0;
    const met = metValues[workoutType]?.[intensity] || 10;
    
    // Formula: Calories = MET * Weight (kg) * Duration (hrs)
    const caloriesBurned = met * weightKg * (durationMins / 60);
    return Math.round(caloriesBurned);
  };

  const handleReset = () => {
    setWeight("150");
    setWeightUnit("lbs");
    setDuration("15");
    setIntensity("moderate");
    setWorkoutType("jumprope");
  };

  const calories = calculateCalories();

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Activity}
        title="Jump Rope & HIIT Calculator"
        description="Calculate total calories burned during jump rope and HIIT workouts."
        actions={
          <ResetButton onClick={handleReset} label="Reset" />
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Workout Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Workout Type</Label>
              <Select value={workoutType} onValueChange={setWorkoutType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="jumprope">Jump Rope</SelectItem>
                  <SelectItem value="hiit">HIIT (High-Intensity Interval Training)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Intensity / Style</Label>
              <Select value={intensity} onValueChange={setIntensity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {workoutType === "jumprope" ? (
                    <>
                      <SelectItem value="slow">Slow ({'<'}100 jumps/min)</SelectItem>
                      <SelectItem value="moderate">Moderate (100-120 jumps/min)</SelectItem>
                      <SelectItem value="fast">Fast (120-160 jumps/min)</SelectItem>
                      <SelectItem value="double_unders">Double Unders</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="tabata">Tabata Protocol</SelectItem>
                      <SelectItem value="bodyweight">Bodyweight Circuit</SelectItem>
                      <SelectItem value="kettlebell">Kettlebell Swings</SelectItem>
                      <SelectItem value="burpees">Burpees Focus</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Body Weight</Label>
                <div className="flex">
                  <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="rounded-r-none" />
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger className="w-[80px] rounded-l-none border-l-0"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Duration (mins)</Label>
                <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Estimated calories burned</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6 h-full py-8">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Flame className="w-12 h-12" />
                <span className="text-6xl font-bold">{calories}</span>
              </div>
              <p className="text-muted-foreground text-lg">Calories Burned</p>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 text-center mt-8">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">MET Value</p>
                <p className="text-xl font-semibold">{metValues[workoutType]?.[intensity] || 10}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Calories/Min</p>
                <p className="text-xl font-semibold">
                  {parseFloat(duration) > 0 ? (calories / parseFloat(duration)).toFixed(1) : "0"}
                </p>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
