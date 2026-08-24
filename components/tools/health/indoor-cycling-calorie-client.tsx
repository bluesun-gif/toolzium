"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ResetButton } from "@/components/shared/action-buttons";
import {
  Activity,
  Bike,
  Flame,
  Zap,
  Heart,
  Download,
  Copy,
  Sparkles,
  Gauge,
  Wand2,
  Apple,
  Droplets,
  Loader2,
  TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";

type WeightUnit = "lbs" | "kg";
type WorkoutMode = "indoor" | "outdoor";
type IntensityLevel = "recovery" | "moderate" | "tempo" | "hiit" | "sprint";

interface IntensityConfig {
  name: string;
  met: number;
  wattsEstimate: number;
  hrZone: string;
  fatPercent: number;
}

const INTENSITY_CONFIG: Record<IntensityLevel, IntensityConfig> = {
  recovery: {
    name: "Light / Active Recovery (50–100W)",
    met: 4.8,
    wattsEstimate: 1.2,
    hrZone: "Zone 1: Active Recovery (50–60% HRmax)",
    fatPercent: 0.70
  },
  moderate: {
    name: "Moderate Aerobic / Base Spin (100–160W)",
    met: 7.0,
    wattsEstimate: 2.0,
    hrZone: "Zone 2: Endurance & Fat Burn (60–70% HRmax)",
    fatPercent: 0.55
  },
  tempo: {
    name: "Vigorous Tempo / Threshold (160–220W)",
    met: 8.8,
    wattsEstimate: 2.8,
    hrZone: "Zone 3/4: Aerobic & Lactate Threshold (70–85% HRmax)",
    fatPercent: 0.35
  },
  hiit: {
    name: "Spin Class HIIT Intervals (220–280W)",
    met: 10.5,
    wattsEstimate: 3.6,
    hrZone: "Zone 4/5: Anaerobic Threshold (85–95% HRmax)",
    fatPercent: 0.20
  },
  sprint: {
    name: "All-Out Sprint Intervals (300W+)",
    met: 12.5,
    wattsEstimate: 4.5,
    hrZone: "Zone 5: Maximum VO2 Peak (95–100% HRmax)",
    fatPercent: 0.10
  }
};

interface AiCoachFeedback {
  coachingTip?: string;
  postRideNutrition?: string;
  fatBurnInsight?: string;
  weeklyProgression?: string;
}

export function IndoorCyclingCalorieClient() {
  const [mode, setMode] = useState<WorkoutMode>("indoor");
  const [weight, setWeight] = useState<string>("160");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lbs");
  const [durationMins, setDurationMins] = useState<number>(45);
  const [intensity, setIntensity] = useState<IntensityLevel>("moderate");
  const [cadenceRpm, setCadenceRpm] = useState<number>(85);
  const [distanceKm, setDistanceKm] = useState<string>("15");

  // Groq AI Coach State
  const [aiCoach, setAiCoach] = useState<AiCoachFeedback | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Calculations
  const weightKg = useMemo(() => {
    const w = parseFloat(weight) || 70;
    return weightUnit === "lbs" ? w * 0.453592 : w;
  }, [weight, weightUnit]);

  const metrics = useMemo(() => {
    const config = INTENSITY_CONFIG[intensity];
    const hours = durationMins / 60;

    // MET Formula: (MET * 3.5 * weightKg / 200) * minutes
    const caloriesTotal = (config.met * 3.5 * weightKg / 200) * durationMins;
    const avgWatts = Math.round(config.wattsEstimate * weightKg * (cadenceRpm / 80));
    const totalKilojoules = Math.round((avgWatts * (durationMins * 60)) / 1000);

    const fatCalories = caloriesTotal * config.fatPercent;
    const carbCalories = caloriesTotal * (1 - config.fatPercent);
    const fatGrams = Math.round(fatCalories / 9);
    const carbGrams = Math.round(carbCalories / 4);

    const pizzaSlices = (caloriesTotal / 285).toFixed(1);
    const bananas = (caloriesTotal / 105).toFixed(1);

    return {
      caloriesTotal: Math.round(caloriesTotal),
      caloriesPerHour: Math.round(caloriesTotal / hours),
      avgWatts,
      totalKilojoules,
      fatGrams,
      carbGrams,
      pizzaSlices,
      bananas,
      hrZone: config.hrZone
    };
  }, [weightKg, durationMins, intensity, cadenceRpm]);

  // Fetch Groq AI Sports Physiologist Analysis
  const fetchAiCoach = useCallback(async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/cycling-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          durationMins,
          intensity,
          weightKg: Math.round(weightKg),
          caloriesTotal: metrics.caloriesTotal,
          avgWatts: metrics.avgWatts,
          cadenceRpm,
          mode,
          distanceKm: parseFloat(distanceKm) || 15
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiCoach(data.data);
      }
    } catch (err) {
      console.error("AI Coach Error:", err);
    } finally {
      setIsAiLoading(false);
    }
  }, [durationMins, intensity, weightKg, metrics.caloriesTotal, metrics.avgWatts, cadenceRpm, mode, distanceKm]);

  // Trigger initial AI Coach once metrics are computed
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAiCoach();
    }, 500);
    return () => clearTimeout(timer);
  }, [durationMins, intensity, weightUnit, weight, fetchAiCoach]);

  // Query Match Presets
  const applyPreset = (mins: number, inten: IntensityLevel, dist: string, rpm: number) => {
    setDurationMins(mins);
    setIntensity(inten);
    setDistanceKm(dist);
    setCadenceRpm(rpm);
    toast.success(`Preset Applied: ${mins}m ${inten.toUpperCase()}`);
  };

  const handleReset = () => {
    setMode("indoor");
    setWeight("160");
    setWeightUnit("lbs");
    setDurationMins(45);
    setIntensity("moderate");
    setCadenceRpm(85);
    setDistanceKm("15");
    toast.success("Reset to standard defaults");
  };

  const copySummary = () => {
    const text =
      `🚴 Toolzium Cycling Workout Summary:\n` +
      `• Duration: ${durationMins} minutes (${mode.toUpperCase()})\n` +
      `• Intensity: ${INTENSITY_CONFIG[intensity].name}\n` +
      `• Total Calories Burned: ${metrics.caloriesTotal} kcal (${metrics.caloriesPerHour} kcal/hr)\n` +
      `• Avg Power Output: ~${metrics.avgWatts} Watts (${metrics.totalKilojoules} kJ work)\n` +
      `• Substrate Burn: ${metrics.fatGrams}g Fat | ${metrics.carbGrams}g Carbs\n` +
      `• Target Heart Rate: ${metrics.hrZone}\n` +
      `• Calculated via Toolzium: https://toolzium.com/tools/health/indoor-cycling-calorie`;
    navigator.clipboard.writeText(text);
    toast.success("Workout summary copied to clipboard!");
  };

  const exportCSV = () => {
    const csvContent =
      "Metric,Value\n" +
      `Workout Mode,${mode}\n` +
      `Duration (mins),${durationMins}\n` +
      `Intensity Level,${intensity}\n` +
      `Cadence (RPM),${cadenceRpm}\n` +
      `Body Weight (${weightUnit}),${weight}\n` +
      `Total Calories (kcal),${metrics.caloriesTotal}\n` +
      `Calories Per Hour (kcal/hr),${metrics.caloriesPerHour}\n` +
      `Estimated Avg Power (Watts),${metrics.avgWatts}\n` +
      `Total Work (kJ),${metrics.totalKilojoules}\n` +
      `Fat Burned (grams),${metrics.fatGrams}\n` +
      `Carbs Burned (grams),${metrics.carbGrams}\n` +
      `Heart Rate Zone,${metrics.hrZone}\n`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cycling-workout-${durationMins}m-${metrics.caloriesTotal}kcal.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("CSV workout log downloaded!");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Bike}
          title="Indoor Cycling, Spin Bike & Outdoor Calorie Calculator"
          description="Calculate exact calories burned, average mechanical watts, fat oxidation grams, and heart rate training zones for 10-min, 15-min, 1-hour, or distance-based bike rides with Groq AI coaching."
          actions={
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={copySummary}
                className="h-10 sm:h-9 px-3.5 rounded-xl text-xs font-semibold gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
              >
                <Copy className="h-4 w-4 shrink-0" />
                <span>Copy Summary</span>
              </Button>
              <Button
                size="sm"
                onClick={exportCSV}
                className="h-10 sm:h-9 px-4 rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5 cursor-pointer w-full sm:w-auto justify-center shadow-md hover:shadow-primary/25"
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>Export CSV</span>
              </Button>
              <ResetButton onClick={handleReset} label="Reset" />
            </div>
          }
        />

        {/* Search Query Target Presets Card */}
        <GlassCard className="p-4 sm:p-5 rounded-3xl border-border/80 space-y-3 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                Popular Search Benchmarks (One-Click):
              </span>
            </div>

            {/* Mode Toggle */}
            <div className="grid grid-cols-2 gap-1.5 bg-muted/40 p-1 rounded-2xl border border-border/60 w-full sm:w-auto">
              <button
                onClick={() => setMode("indoor")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                  mode === "indoor" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🏋️ Stationary Spin
              </button>
              <button
                onClick={() => setMode("outdoor")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                  mode === "outdoor" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🛣️ Outdoor Road
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
            <button
              onClick={() => applyPreset(10, "hiit", "4", 95)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                durationMins === 10 && intensity === "hiit"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/80 border-border hover:border-primary/50 text-foreground"
              }`}
            >
              ⚡ 10-Min Quick HIIT (~110 kcal)
            </button>
            <button
              onClick={() => applyPreset(15, "tempo", "6", 90)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                durationMins === 15 && intensity === "tempo"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/80 border-border hover:border-primary/50 text-foreground"
              }`}
            >
              ⏱️ 15-Min Power Spin (~165 kcal)
            </button>
            <button
              onClick={() => applyPreset(40, "moderate", "15", 85)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                durationMins === 40 && distanceKm === "15"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/80 border-border hover:border-primary/50 text-foreground"
              }`}
            >
              🗺️ 15 km Distance Ride (~380 kcal)
            </button>
            <button
              onClick={() => applyPreset(60, "moderate", "25", 85)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                durationMins === 60 && intensity === "moderate"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/80 border-border hover:border-primary/50 text-foreground"
              }`}
            >
              🏆 1-Hour Endurance Spin (~620 kcal)
            </button>
            <button
              onClick={() => applyPreset(60, "hiit", "28", 95)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                durationMins === 60 && intensity === "hiit"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/80 border-border hover:border-primary/50 text-foreground"
              }`}
            >
              🔥 1-Hour Pro Spin Class (~850 kcal)
            </button>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Form */}
          <div className="lg:col-span-6 space-y-5">
            <GlassCard className="p-5 sm:p-6 rounded-3xl border-border/80 space-y-5 shadow-sm">
              <CardHeader className="p-0">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-primary" /> Workout Parameters
                </CardTitle>
                <CardDescription className="text-xs">
                  Enter your physical stats and resistance profile for clinical-grade MET calculations.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 space-y-4">
                {/* Weight Input */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Body Weight</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="h-11 rounded-xl font-mono text-sm font-bold flex-1 bg-background/80 border-border"
                      placeholder="160"
                    />
                    <Select value={weightUnit} onValueChange={(val: WeightUnit) => setWeightUnit(val)}>
                      <SelectTrigger className="w-24 h-11 rounded-xl font-bold bg-background/80 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lbs">lbs</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Duration Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold">Workout Duration</Label>
                    <span className="text-xs font-mono font-bold text-primary">{durationMins} Minutes</span>
                  </div>
                  <Slider
                    value={[durationMins]}
                    min={5}
                    max={180}
                    step={5}
                    onValueChange={(vals) => setDurationMins(vals[0])}
                    className="cursor-pointer"
                  />
                </div>

                {/* Intensity Select */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Intensity & Resistance Level</Label>
                  <Select value={intensity} onValueChange={(val: IntensityLevel) => setIntensity(val)}>
                    <SelectTrigger className="h-11 rounded-xl text-xs font-semibold bg-background/80 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recovery">Zone 1: Light Recovery (50–100 Watts)</SelectItem>
                      <SelectItem value="moderate">Zone 2: Moderate Aerobic / Fat Burn (100–160 Watts)</SelectItem>
                      <SelectItem value="tempo">Zone 3/4: High Tempo / Lactate Threshold (160–220 Watts)</SelectItem>
                      <SelectItem value="hiit">Zone 4/5: Spin Class HIIT Intervals (220–280 Watts)</SelectItem>
                      <SelectItem value="sprint">Zone 5: All-Out Sprint Intervals (300+ Watts)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cadence RPM Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold">Pedal Cadence (RPM)</Label>
                    <span className="text-xs font-mono font-bold text-purple-400">{cadenceRpm} RPM</span>
                  </div>
                  <Slider
                    value={[cadenceRpm]}
                    min={50}
                    max={130}
                    step={5}
                    onValueChange={(vals) => setCadenceRpm(vals[0])}
                    className="cursor-pointer"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Standard endurance spinning cadence is 80–95 RPM; climb resistance is 60–75 RPM.
                  </p>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* Results Dashboard */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Calorie Hero Card */}
            <GlassCard className="p-5 sm:p-6 rounded-3xl border-primary/30 bg-primary/5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Total Energy Expenditure
                </span>
                <Badge variant="outline" className="text-[11px] font-mono text-primary border-primary/40">
                  {metrics.caloriesPerHour} kcal / hr
                </Badge>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-black font-mono text-primary tracking-tight">
                  {metrics.caloriesTotal}
                </span>
                <span className="text-xl font-bold text-foreground">kcal</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-card border border-border/60">
                  <p className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-amber-400" /> Avg Power
                  </p>
                  <p className="text-lg font-bold font-mono text-foreground mt-0.5">~{metrics.avgWatts} W</p>
                  <p className="text-[10px] text-muted-foreground">{metrics.totalKilojoules} kJ total work</p>
                </div>

                <div className="p-3 rounded-2xl bg-card border border-border/60">
                  <p className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 text-rose-400" /> Fat Burned
                  </p>
                  <p className="text-lg font-bold font-mono text-rose-400 mt-0.5">{metrics.fatGrams} g</p>
                  <p className="text-[10px] text-muted-foreground">Lipid oxidation</p>
                </div>

                <div className="p-3 rounded-2xl bg-card border border-border/60 col-span-2 sm:col-span-1">
                  <p className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5 text-emerald-400" /> Glycogen
                  </p>
                  <p className="text-lg font-bold font-mono text-emerald-400 mt-0.5">{metrics.carbGrams} g</p>
                  <p className="text-[10px] text-muted-foreground">Carbs utilized</p>
                </div>
              </div>
            </GlassCard>

            {/* Physiological Training Zone Card */}
            <GlassCard className="p-5 rounded-3xl border-border/80 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Heart className="h-4 w-4 text-rose-500" /> Heart Rate Training Target
              </div>
              <div className="p-3 rounded-2xl bg-muted/30 border border-border/40 font-mono text-xs font-bold text-foreground">
                {metrics.hrZone}
              </div>

              {/* Energy Equivalent Strip */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 flex-wrap gap-2">
                <span>🍕 ~{metrics.pizzaSlices} Pizza Slices</span>
                <span>🍌 ~{metrics.bananas} Bananas</span>
                <span>⚡ {metrics.totalKilojoules} kJ Mechanical Work</span>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* 🤖 Groq AI Sports Physiologist & Recovery Coach */}
        <GlassCard className="p-5 sm:p-6 rounded-3xl border-purple-500/30 bg-gradient-to-r from-purple-500/5 via-card/90 to-primary/5 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <h4 className="text-sm font-bold flex items-center gap-2 text-foreground tracking-tight">
                <Wand2 className="h-4 w-4 text-purple-400" /> Groq AI Sports Physiologist & Recovery Coach
              </h4>
              <p className="text-xs text-muted-foreground">
                Clinical post-ride recovery window, hydration target, and power-to-weight coaching.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={fetchAiCoach}
              disabled={isAiLoading}
              className="text-xs h-8 px-3 rounded-xl gap-1.5 border-purple-400/40 text-purple-400"
            >
              {isAiLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              Re-analyze Session
            </Button>
          </div>

          {aiCoach ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-card/80 border border-border/70 space-y-1.5">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Power & Cadence Coaching
                </span>
                <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                  {aiCoach.coachingTip}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card/80 border border-border/70 space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Apple className="h-3 w-3" /> Post-Ride Recovery Fuel
                </span>
                <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                  {aiCoach.postRideNutrition}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card/80 border border-border/70 space-y-1.5">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Next Ride Progression
                </span>
                <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                  {aiCoach.weeklyProgression}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-muted/20 border border-border/40 animate-pulse text-center text-xs text-muted-foreground">
              Synthesizing sports physiology recovery metrics...
            </div>
          )}
        </GlassCard>

        {/* Structured How It Works, Features & SEO Target FAQs */}
        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Input Weight & Session Time",
              description: "Enter your body weight (lbs or kg) and choose your target duration from 10 mins to 2 hours."
            },
            {
              step: "02",
              title: "Select Intensity & Cadence",
              description: "Choose your spin resistance (Recovery, Moderate Base, Tempo, or HIIT intervals) and pedal RPM."
            },
            {
              step: "03",
              title: "Get Full Metabolic Breakdown",
              description: "Instantly view total kcal, calories per hour, estimated mechanical watts, fat oxidation in grams, and export CSV."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "Clinical MET Formula",
              description: "Utilizes the Compendium of Physical Activities MET database for accurate stationary and outdoor cycling calculations."
            },
            {
              title: "Mechanical Wattage & kJ Estimator",
              description: "Computes direct flywheel resistance power output and total mechanical work in kilojoules (kJ)."
            },
            {
              title: "Groq AI Sports Physiologist",
              description: "Automated analysis of carbohydrate/protein recovery grams, electrolyte hydration volume, and power progression."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "How many calories does 1 hour of indoor cycling burn?",
              answer: "On average, a 1-hour stationary spin bike workout burns between 500 and 850 calories (kcal). Moderate aerobic cycling burns around 500–600 kcal/hr, while vigorous HIIT spin class intervals burn 700–900+ kcal/hr depending on your body weight and flywheel resistance."
            },
            {
              question: "How many calories do you burn cycling 10 km or 15 km?",
              answer: "Cycling 15 km at a moderate pace (20–25 km/h) takes roughly 35 to 45 minutes and burns approximately 320 to 480 calories for a 160 lb (72 kg) rider. Cycling 10 km burns around 210 to 320 calories."
            },
            {
              question: "How many calories does a 10-minute or 15-minute quick cycle burn?",
              answer: "A 10-minute high-intensity spin interval burns approximately 80 to 140 calories, while a 15-minute workout burns 120 to 200 calories. Short HIIT sessions also trigger Excess Post-Exercise Oxygen Consumption (EPOC), burning extra calories for hours post-workout."
            },
            {
              question: "Is indoor stationary spinning better for fat loss than outdoor cycling?",
              answer: "Both are fantastic. Stationary spin bikes provide constant cadence and resistance without traffic interruptions, coasting, or stoplights, resulting in a consistent high calorie burn per minute."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/health/indoor-cycling-calorie" />
      </div>
    </div>
  );
}

export default IndoorCyclingCalorieClient;
