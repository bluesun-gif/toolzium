"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Activity, Plus, Trash2, Info, Sparkles, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface GlucoseRecord {
  id: string;
  value: number;
  unit: "mg/dL" | "mmol/L";
  mealContext: "fasting" | "before_meal" | "after_meal" | "bedtime";
  timestamp: string;
}

export function BloodSugarClient() {
  const [value, setValue] = useState("95");
  const [unit, setUnit] = useState<"mg/dL" | "mmol/L">("mg/dL");
  const [mealContext, setMealContext] = useState<"fasting" | "before_meal" | "after_meal" | "bedtime">("fasting");
  const [records, setRecords] = useState<GlucoseRecord[]>([
    { id: "1", value: 95, unit: "mg/dL", mealContext: "fasting", timestamp: new Date().toISOString() }
  ]);

  const getGlucoseCategory = (val: number, u: "mg/dL" | "mmol/L", ctx: string) => {
    const mgdl = u === "mmol/L" ? val * 18.0182 : val;
    if (mgdl < 70) return { label: "Low (Hypoglycemia)", color: "bg-red-500/20 text-red-700 dark:text-red-400 font-bold" };
    if (ctx === "fasting" || ctx === "before_meal") {
      if (mgdl <= 99) return { label: "Normal Fasting", color: "bg-green-500/20 text-green-700 dark:text-green-400" };
      if (mgdl <= 125) return { label: "Prediabetes Range", color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400" };
      return { label: "High (Diabetes Range)", color: "bg-red-500/20 text-red-700 dark:text-red-400 font-bold" };
    } else {
      if (mgdl <= 140) return { label: "Normal Post-Meal", color: "bg-green-500/20 text-green-700 dark:text-green-400" };
      if (mgdl <= 199) return { label: "Elevated Post-Meal", color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400" };
      return { label: "High Post-Meal", color: "bg-red-500/20 text-red-700 dark:text-red-400 font-bold" };
    }
  };

  const handleAdd = () => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      toast.error("Please enter a valid glucose number.");
      return;
    }
    const newRecord: GlucoseRecord = {
      id: Date.now().toString(),
      value: num,
      unit,
      mealContext,
      timestamp: new Date().toISOString()
    };
    setRecords([newRecord, ...records]);
    toast.success("Saved glucose reading!");
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const currentCategory = getGlucoseCategory(parseFloat(value) || 95, unit, mealContext);

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Activity}
          title="Blood Sugar & Glucose Tracker"
          description="Log fasting and post-prandial blood glucose levels in mg/dL or mmol/L with ADA diagnostic threshold indicators."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Form */}
          <div className="md:col-span-4">
            <GlassCard>
              <CardHeader>
                <CardTitle>Log Glucose Level</CardTitle>
                <CardDescription>Enter measurement details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Glucose Value ({unit})</Label>
                  <Input type="number" step="0.1" value={value} onChange={e => setValue(e.target.value)} placeholder="95" />
                </div>
                <div>
                  <Label>Unit of Measurement</Label>
                  <Select value={unit} onValueChange={(v: "mg/dL" | "mmol/L") => setUnit(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mg/dL">mg/dL (US standard)</SelectItem>
                      <SelectItem value="mmol/L">mmol/L (International)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Timing / Meal Context</Label>
                  <Select value={mealContext} onValueChange={(v: any) => setMealContext(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fasting">Fasting (Morning before food)</SelectItem>
                      <SelectItem value="before_meal">Pre-Meal</SelectItem>
                      <SelectItem value="after_meal">Post-Meal (2 Hours After)</SelectItem>
                      <SelectItem value="bedtime">Bedtime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className={cn("p-3 rounded-lg text-center font-semibold text-sm", currentCategory.color)}>
                  Category: {currentCategory.label}
                </div>
                <Button onClick={handleAdd} className="w-full">
                  <Plus className="w-4 h-4 mr-2" /> Log Reading
                </Button>
              </CardContent>
            </GlassCard>
          </div>

          {/* History */}
          <div className="md:col-span-8">
            <GlassCard className="h-full">
              <CardHeader>
                <CardTitle>Glucose Logs ({records.length})</CardTitle>
                <CardDescription>Locally saved history</CardDescription>
              </CardHeader>
              <CardContent>
                {records.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground flex flex-col items-center">
                    <Info className="h-10 w-10 mb-2 opacity-50" />
                    <p>No glucose readings recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {records.map(record => {
                      const cat = getGlucoseCategory(record.value, record.unit, record.mealContext);
                      return (
                        <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg bg-background/50">
                          <div className="flex items-center gap-4">
                            <div className={cn("px-2 py-1 text-xs font-semibold rounded-md text-center w-28", cat.color)}>
                              {cat.label}
                            </div>
                            <div>
                              <div className="font-bold text-lg">
                                {record.value} <span className="text-xs font-normal text-muted-foreground">{record.unit}</span>
                              </div>
                              <div className="text-xs text-muted-foreground capitalize">
                                {record.mealContext.replace("_", " ")} • {new Date(record.timestamp).toLocaleDateString()} {new Date(record.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(record.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </GlassCard>
          </div>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Select Units & Context", description: "Choose mg/dL or mmol/L and tag fasting vs post-meal timing.", icon: Activity },
            { step: "02", title: "Input Glucose Reading", description: "Enter readings from your continuous glucose monitor (CGM) or fingerstick meter.", icon: Sparkles },
            { step: "03", title: "Monitor ADA Ranges", description: "Instant classification helps identify prediabetes and glucose spikes.", icon: Shield }
          ]}
          badges={["100% Free Forever", "mg/dL & mmol/L Support", "Private Client-Side Storage"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Activity, title: "Dual Unit Conversion", description: "Seamlessly log in mg/dL (US) or mmol/L (UK/International) with automatic standard conversion." },
            { icon: Sparkles, title: "Context-Aware Thresholds", description: "Evaluates target ranges differently for fasting vs 2-hour post-meal windows." },
            { icon: Shield, title: "100% Private", description: "Zero server storage. Health metrics remain private on your personal device." },
            { icon: Zap, title: "Instant Analysis", description: "Instant visual feedback on normal, elevated, and hypoglycemia readings." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Monitoring Blood Glucose Levels for Metabolic Health</h3>
            <p>
              Blood glucose monitoring is an essential clinical tool for individuals managing Type 1 diabetes, Type 2 diabetes, insulin resistance, or optimizing metabolic performance. According to the American Diabetes Association (ADA), normal fasting blood sugar is between 70 to 99 mg/dL (3.9 to 5.5 mmol/L).
            </p>
            <p>
              Toolzium Blood Sugar Tracker operates 100% in your local browser, allowing you to log and review daily glucose readings with complete privacy and zero data tracking.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How do I convert between mg/dL and mmol/L?", answer: "To convert mg/dL to mmol/L, divide by 18.0182. To convert mmol/L to mg/dL, multiply by 18.0182." },
            { question: "Is my glucose data stored in the cloud?", answer: "No. All glucose logs are stored locally in your browser's memory." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/health/blood-sugar" max={6} />
      </div>
    </div>
  );
}

export default BloodSugarClient;
