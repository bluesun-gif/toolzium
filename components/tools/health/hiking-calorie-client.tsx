"use client";
import { ToolBackground } from"@/components/shared/tool-background";

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
import { Activity, Flame, Compass, Scale, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
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
    const baseHours = distKm / 5 + elevM / 600;
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
    const grade = elevM / (distKm * 1000) * 100; // percentage

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
    const text = "Hiking Calorie Estimate:" + results.calories + "kcal\n" + "Distance:" + distance + "" + (unitSystem === "imperial" ? "miles" : "km") + "\n" + "Elevation:" + elevationGain + "" + (unitSystem === "imperial" ? "ft" : "m") + "\n" + "Estimated Time:" + results.hours + "hours\n" + "Recommended Hydration:" + results.hydration + "L";
    return text;
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="Hiking & Elevation Gain Calorie Calculator" description="Estimate energy expenditure during hikes based on distance, elevation gain, and pack weight." actions={<>
 <CopyButton getText={copyResults} label="Copy Results" />
 <ResetButton onClick={reset} label="Reset" />
 </>} />
 
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
 <Input type="number" min="0" value={bodyWeight || ""} onChange={e => setBodyWeight(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Pack Weight ({unitSystem === "imperial" ? "lbs" : "kg"})</Label>
 <Input type="number" min="0" value={packWeight || ""} onChange={e => setPackWeight(Number(e.target.value))} />
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Distance ({unitSystem === "imperial" ? "miles" : "km"})</Label>
 <Input type="number" min="0" step="0.1" value={distance || ""} onChange={e => setDistance(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Elevation Gain ({unitSystem === "imperial" ? "ft" : "m"})</Label>
 <Input type="number" min="0" value={elevationGain || ""} onChange={e => setElevationGain(Number(e.target.value))} />
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
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Hiking & Elevation Gain Calorie Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Hiking & Elevation Gain Calorie Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/health/hiking-calorie" max={6} />

    </div></div>;
}