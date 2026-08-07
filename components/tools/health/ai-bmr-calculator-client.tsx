"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Activity, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AiBmrCalculatorClient() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(28);
  const [weightKg, setWeightKg] = useState(75);
  const [heightCm, setHeightCm] = useState(178);
  const [activity, setActivity] = useState("1.375"); // Moderate
  const [aiReport, setAiReport] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Mifflin-St Jeor Formula
  const bmr = gender === "male"
    ? Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5)
    : Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);

  const tdee = Math.round(bmr * Number(activity));

  const auditMetabolismWithAi = async () => {
    if (!weightKg || !heightCm) return;

    setLoading(true);

    try {
      const prompt = `Audit this person's metabolic profile: Gender: ${gender}, Age: ${age}, Weight: ${weightKg}kg, Height: ${heightCm}cm, Calculated BMR: ${bmr} kcal/day, TDEE: ${tdee} kcal/day. Provide 4 bullet points analyzing energy maintenance, fat loss macro recommendations, muscle gain calories, and metabolism optimization strategies. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAiReport(data.results);
        toast.success("AI Metabolic audit complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI audit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Activity}
        title="AI BMR & TDEE Metabolism Calculator Studio"
        description="Calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) with Mifflin-St Jeor equation and AI metabolic optimization."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Age (Years):</label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="h-11 font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Weight (kg):</label>
            <Input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="h-11 font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Height (cm):</label>
            <Input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="h-11 font-bold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Daily Activity Level:</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
          >
            <option value="1.2">Sedentary (Little or no exercise)</option>
            <option value="1.375">Lightly Active (Exercise 1-3 days/week)</option>
            <option value="1.55">Moderately Active (Exercise 3-5 days/week)</option>
            <option value="1.725">Very Active (Exercise 6-7 days/week)</option>
            <option value="1.9">Extra Active (Hard physical job/sports)</option>
          </select>
        </div>

        {/* Calculated Banner */}
        <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-950 border text-center">
          <div>
            <span className="text-xs text-muted-foreground block font-bold uppercase tracking-wider">
              Basal Metabolic Rate (BMR)
            </span>
            <span className="text-2xl font-black text-cyan-400">{bmr.toLocaleString()} kcal/day</span>
          </div>

          <div>
            <span className="text-xs text-muted-foreground block font-bold uppercase tracking-wider">
              Daily Maintenance (TDEE)
            </span>
            <span className="text-2xl font-black text-emerald-400">{tdee.toLocaleString()} kcal/day</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={auditMetabolismWithAi}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Auditing Metabolism..." : "AI Metabolic Optimization Audit"}
          </Button>
        </div>
      </GlassCard>

      {/* AI Analysis */}
      {aiReport.length > 0 && (
        <AiOutputDisplay
          title="AI Metabolic Audit & Energy Recommendations"
          subtitle="Caloric deficit targets, protein split, and metabolic health advice"
          content={aiReport}
          loading={loading}
          onRegenerate={auditMetabolismWithAi}
          variant="prose"
        />
      )}
    </div>
  );
}
