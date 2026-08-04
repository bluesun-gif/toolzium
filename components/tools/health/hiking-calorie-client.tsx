"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Activity, Flame, Compass, Scale } from "lucide-react";
import { toast } from "react-hot-toast";

export function HikingCalorieClient() {
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");
  const [bodyWeight, setBodyWeight] = useState(170);
  const [packWeight, setPackWeight] = useState(15);
  const [distance, setDistance] = useState(5);
  const [elevationGain, setElevationGain] = useState(1000);
  const [terrain, setTerrain] = useState("dirt");

  const results = useMemo(() => {
    const isImperial = unitSystem === "imperial";
    
    const weightKg = isImperial ? bodyWeight * 0.453592 : bodyWeight;
    const packKg = isImperial ? packWeight * 0.453592 : packWeight;
    const totalWeightKg = weightKg + packKg;
    
    const distKm = isImperial ? distance * 1.60934 : distance;
    const elevM = isImperial ? elevationGain * 0.3048 : elevationGain;
    
    // Base time estimation using Naismith's Rule (approx 5km/hr + 1 hour per 600m ascent)
    const baseHours = (distKm / 5) + (elevM / 600);
    const hours = Math.max(0.1, baseHours);
    
    // Terrain multiplier
    let terrainMult = 1.0;
    if (terrain === "paved") terrainMult = 0.9;
    if (terrain === "dirt") terrainMult = 1.0;
    if (terrain === "rough") terrainMult = 1.2;
    if (terrain === "snow") terrainMult = 1.4;

    // Pandolf equation simplified for calories
    const speed = distKm / hours; // km/h
    const speedMs = speed * 0.277778; // m/s
    const grade = (elevM / (distKm * 1000)) * 100; // percentage
    
    let met = 4.3; // Base hiking MET
    if (grade > 0) met += grade * 0.5;
    if (packKg > 5) met += 0.5;
    if (packKg > 15) met += 1.0;
    met *= terrainMult;
    
    const caloriesBurned = Math.round(met * totalWeightKg * hours);
    const hydrationLiters = hours * 0.5 * terrainMult;
    
    const avgPaceMinutes = hours * 60 / distance;

    return {
      calories: caloriesBurned,
      met: met.toFixed(1),
      hours: hours.toFixed(1),
      pace: avgPaceMinutes.toFixed(1),
      hydration: hydrationLiters.toFixed(1)
    };
  }, [unitSystem, bodyWeight, packWeight, distance, elevationGain, terrain]);

  const toggleUnitSystem = (checked: boolean) => {
    const newSystem = checked ? "metric" : "imperial";
    setUnitSystem(newSystem);
    if (newSystem === "metric") {
      setBodyWeight(Math.round(bodyWeight * 0.453592));
      setPackWeight(Math.round(packWeight * 0.453592));
      setDistance(Math.round(distance * 1.60934 * 10) / 10);
      setElevationGain(Math.round(elevationGain * 0.3048));
    } else {
      setBodyWeight(Math.round(bodyWeight / 0.453592));
      setPackWeight(Math.round(packWeight / 0.453592));
      setDistance(Math.round(distance / 1.60934 * 10) / 10);
      setElevationGain(Math.round(elevationGain / 0.3048));
    }
  };

  const reset = () => {
    setUnitSystem("imperial");
    setBodyWeight(170);
    setPackWeight(15);
    setDistance(5);
    setElevationGain(1000);
    setTerrain("dirt");
    toast.success("Reset to defaults");
  };

  const copyResults = () => {
    const text = "Hiking Calorie Estimate: " + results.calories + " kcal\n" +
      "Distance: " + distance + " " + (unitSystem === "imperial" ? "miles" : "km") + "\n" +
      "Elevation: " + elevationGain + " " + (unitSystem === "imperial" ? "ft" : "m") + "\n" +
      "Estimated Time: " + results.hours + " hours\n" +
      "Recommended Hydration: " + results.hydration + " L";
    return text;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Activity}
        title="Hiking & Elevation Gain Calorie Calculator"
        description="Estimate energy expenditure during hikes based on distance, elevation gain, and pack weight."
        actions={
          <>
            <CopyButton getText={copyResults} label="Copy Results" />
            <ResetButton onClick={reset} label="Reset" />
          </>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2"><Compass className="h-5 w-5" /> Hike Details</CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <Label>Imperial</Label>
                <Switch checked={unitSystem === "metric"} onCheckedChange={toggleUnitSystem} />
                <Label>Metric</Label>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Body Weight ({unitSystem === "imperial" ? "lbs" : "kg"})</Label>
                <Input type="number" min="0" value={bodyWeight || ""} onChange={(e) => setBodyWeight(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Pack Weight ({unitSystem === "imperial" ? "lbs" : "kg"})</Label>
                <Input type="number" min="0" value={packWeight || ""} onChange={(e) => setPackWeight(Number(e.target.value))} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Distance ({unitSystem === "imperial" ? "miles" : "km"})</Label>
                <Input type="number" min="0" step="0.1" value={distance || ""} onChange={(e) => setDistance(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Elevation Gain ({unitSystem === "imperial" ? "ft" : "m"})</Label>
                <Input type="number" min="0" value={elevationGain || ""} onChange={(e) => setElevationGain(Number(e.target.value))} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Terrain Difficulty</Label>
              <Select value={terrain} onValueChange={setTerrain}>
                <SelectTrigger><SelectValue placeholder="Terrain type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="paved">Paved / Smooth</SelectItem>
                  <SelectItem value="dirt">Dirt Trail</SelectItem>
                  <SelectItem value="rough">Rough / Cross-country</SelectItem>
                  <SelectItem value="snow">Snow / Sand / Mud</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>
        
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Flame className="h-5 w-5 text-orange-500" /> Estimated Results</CardTitle>
            <CardDescription>Based on Pandolf equation and Naismith's rule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center p-6 bg-primary/10 rounded-lg border border-primary/20">
              <span className="text-sm font-medium text-muted-foreground mb-1">Total Calories Burned</span>
              <span className="text-5xl font-bold text-primary">{results.calories.toLocaleString()}</span>
              <span className="text-sm font-medium text-muted-foreground mt-1">kcal</span>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Est. Time</span>
                <p className="text-xl font-semibold">{results.hours} hrs</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Avg Pace</span>
                <p className="text-xl font-semibold">{results.pace} min/{unitSystem === "imperial" ? "mi" : "km"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Intensity (METs)</span>
                <p className="text-xl font-semibold">{results.met}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Hydration Need</span>
                <p className="text-xl font-semibold">{results.hydration} Liters</p>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
