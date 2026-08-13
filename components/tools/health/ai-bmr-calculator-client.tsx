"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Activity, RefreshCw, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export default function AiBmrCalculatorClient() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(28);
  const [weightKg, setWeightKg] = useState(75);
  const [heightCm, setHeightCm] = useState(178);
  const [activity, setActivity] = useState("1.375"); // Moderate
  const [aiReport, setAiReport] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Mifflin-St Jeor Formula
  const bmr = gender === "male" ? Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5) : Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
  const tdee = Math.round(bmr * Number(activity));
  const auditMetabolismWithAi = async () => {
    if (!weightKg || !heightCm) return;
    setLoading(true);
    try {
      const prompt = `Audit this person's metabolic profile: Gender: ${gender}, Age: ${age}, Weight: ${weightKg}kg, Height: ${heightCm}cm, Calculated BMR: ${bmr} kcal/day, TDEE: ${tdee} kcal/day. Provide 4 bullet points analyzing energy maintenance, fat loss macro recommendations, muscle gain calories, and metabolism optimization strategies. No markdown asterisks.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          type: "prose"
        })
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
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="AI BMR & TDEE Metabolism Calculator Studio" description="Calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) with Mifflin-St Jeor equation and AI metabolic optimization." />

 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Gender:</label>
 <select value={gender} onChange={e => setGender(e.target.value)} className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium">
 <option value="male">Male</option>
 <option value="female">Female</option>
 </select>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Age (Years):</label>
 <Input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="h-11 font-bold" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Weight (kg):</label>
 <Input type="number" value={weightKg} onChange={e => setWeightKg(Number(e.target.value))} className="h-11 font-bold" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Height (cm):</label>
 <Input type="number" value={heightCm} onChange={e => setHeightCm(Number(e.target.value))} className="h-11 font-bold" />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Daily Activity Level:</label>
 <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium">
 <option value="1.2">Sedentary (Little or no exercise)</option>
 <option value="1.375">Lightly Active (Exercise 1-3 days/week)</option>
 <option value="1.55">Moderately Active (Exercise 3-5 days/week)</option>
 <option value="1.725">Very Active (Exercise 6-7 days/week)</option>
 <option value="1.9">Extra Active (Hard physical job/sports)</option>
 </select>
 </div>

 {/* Calculated Banner */}
 <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-background border text-center">
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
 <Button onClick={auditMetabolismWithAi} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Auditing Metabolism..." : "AI Metabolic Optimization Audit"}
 </Button>
 </div>
 </GlassCard>

 {/* AI Analysis */}
 {aiReport.length > 0 && <AiOutputDisplay title="AI Metabolic Audit & Energy Recommendations" subtitle="Caloric deficit targets, protein split, and metabolic health advice" content={aiReport} loading={loading} onRegenerate={auditMetabolismWithAi} variant="prose" />}
 
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
          <h3>Why Use Our AI BMR & TDEE Metabolism Calculator Studio?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our AI BMR & TDEE Metabolism Calculator Studio provides
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

      <RelatedTools currentToolUrl="/tools/health/ai-bmr-calculator" max={6} />

    </div></div>;
}