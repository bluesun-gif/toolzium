"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Activity, Flame } from "lucide-react";

const activities = [
  { name: "Running (6 mph)", met: 9.8, category: "Running" },
  { name: "Running (8 mph)", met: 11.8, category: "Running" },
  { name: "Cycling (12-14 mph)", met: 8.0, category: "Cycling" },
  { name: "Cycling (16-19 mph)", met: 12.0, category: "Cycling" },
  { name: "Swimming (freestyle, light)", met: 5.8, category: "Swimming" },
  { name: "Swimming (freestyle, vigorous)", met: 9.8, category: "Swimming" },
  { name: "Weightlifting (general)", met: 3.5, category: "Weightlifting" },
  { name: "Weightlifting (vigorous)", met: 6.0, category: "Weightlifting" },
  { name: "Walking (3 mph)", met: 3.3, category: "Walking" },
  { name: "Walking (4 mph)", met: 5.0, category: "Walking" },
  { name: "Yoga", met: 2.5, category: "Yoga" },
  { name: "Housework (general)", met: 3.5, category: "Housework" },
  { name: "Basketball (game)", met: 8.0, category: "Sports" },
  { name: "Tennis (singles)", met: 8.0, category: "Sports" },
  { name: "Soccer (competitive)", met: 10.0, category: "Sports" }
];

const foodEquivalents = [
  { name: "slice of pizza", calories: 285 },
  { name: "apple", calories: 95 },
  { name: "can of soda", calories: 150 },
  { name: "burger", calories: 500 },
  { name: "chocolate bar", calories: 210 }
];

export function CalorieActivityClient() {
  const [weight, setWeight] = useState("150");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [duration, setDuration] = useState("30");
  const [selectedActivity, setSelectedActivity] = useState(activities[0].name);

  const calculateCalories = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    if (isNaN(w) || isNaN(d) || w <= 0 || d <= 0) return 0;
    
    let weightKg = w;
    if (weightUnit === "lbs") weightKg = w * 0.453592;

    const activity = activities.find(a => a.name === selectedActivity);
    const met = activity ? activity.met : 1;

    // Formula: Calories = MET * Weight (kg) * Time (hours)
    return Math.round(met * weightKg * (d / 60));
  };

  const caloriesBurned = calculateCalories();

  const getFoodEquivalent = () => {
    if (caloriesBurned <= 0) return null;
    let closest = foodEquivalents[0];
    let count = caloriesBurned / closest.calories;
    
    for (const food of foodEquivalents) {
      const c = caloriesBurned / food.calories;
      if (c >= 1 && c < (caloriesBurned / closest.calories)) {
        closest = food;
        count = c;
      }
    }
    
    return "Equivalent to " + count.toFixed(1) + " " + closest.name + "(s)";
  };

  const handleReset = () => {
    setWeight("150");
    setWeightUnit("lbs");
    setDuration("30");
    setSelectedActivity(activities[0].name);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Activity} 
        title="Calorie Burn Calculator" 
        description="Calculate calories burned for physical activities based on weight and duration." 
        actions={
          <>
            <CopyButton getText={() => caloriesBurned.toString() + " calories"} label="Copy Result" />
            <ResetButton onClick={handleReset} label="Reset" />
          </>
        } 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Activity Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Body Weight</Label>
                <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} min="1" />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select value={weightUnit} onValueChange={setWeightUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lbs">lbs</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min="1" />
            </div>

            <div className="space-y-2">
              <Label>Activity</Label>
              <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  {activities.map((a) => (
                    <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex flex-col items-center justify-center py-8">
            <div className="flex flex-col items-center">
              <Flame className="w-16 h-16 text-orange-500 mb-4" />
              <div className="text-5xl font-bold text-primary">{caloriesBurned}</div>
              <div className="text-lg text-muted-foreground mt-2">Calories Burned</div>
            </div>
            {caloriesBurned > 0 && (
              <div className="text-center p-4 bg-muted rounded-lg w-full">
                <p className="text-sm font-medium">{getFoodEquivalent()}</p>
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
