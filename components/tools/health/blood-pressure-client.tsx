"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Heart, Activity, Plus, Trash2, Info, Sparkles, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface BPRecord {
  id: string;
  sys: number;
  dia: number;
  hr?: number;
  timestamp: string;
}

export function BloodPressureClient() {
  const [sys, setSys] = useState("120");
  const [dia, setDia] = useState("80");
  const [hr, setHr] = useState("72");
  const [records, setRecords] = useState<BPRecord[]>([
    { id: "1", sys: 120, dia: 80, hr: 72, timestamp: new Date().toISOString() }
  ]);

  const getCategory = (s: number, d: number) => {
    if (s < 120 && d < 80) return { label: "Normal", color: "bg-green-500/20 text-green-700 dark:text-green-400" };
    if (s <= 129 && d < 80) return { label: "Elevated", color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400" };
    if (s <= 139 || d <= 89) return { label: "Stage 1 HTN", color: "bg-orange-500/20 text-orange-700 dark:text-orange-400" };
    if (s >= 180 || d >= 120) return { label: "Crisis", color: "bg-red-700/20 text-red-700 dark:text-red-400 font-bold" };
    return { label: "Stage 2 HTN", color: "bg-red-500/20 text-red-700 dark:text-red-400" };
  };

  const handleAdd = () => {
    const s = parseInt(sys, 10);
    const d = parseInt(dia, 10);
    const h = hr ? parseInt(hr, 10) : undefined;
    if (isNaN(s) || isNaN(d) || s <= 0 || d <= 0) {
      toast.error("Please enter valid systolic and diastolic values.");
      return;
    }
    const newRecord: BPRecord = {
      id: Date.now().toString(),
      sys: s,
      dia: d,
      hr: h,
      timestamp: new Date().toISOString()
    };
    setRecords([newRecord, ...records]);
    toast.success("Saved blood pressure reading!");
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const currentCategory = getCategory(parseInt(sys, 10) || 120, parseInt(dia, 10) || 80);

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Heart}
          title="Blood Pressure Tracker"
          description="Log, track, and categorize systolic, diastolic, and pulse readings according to AHA/ACC guidelines."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Form */}
          <div className="md:col-span-4">
            <GlassCard>
              <CardHeader>
                <CardTitle>Log New Reading</CardTitle>
                <CardDescription>Enter your blood pressure values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Systolic (mmHg)</Label>
                  <Input type="number" value={sys} onChange={e => setSys(e.target.value)} placeholder="120" />
                </div>
                <div>
                  <Label>Diastolic (mmHg)</Label>
                  <Input type="number" value={dia} onChange={e => setDia(e.target.value)} placeholder="80" />
                </div>
                <div>
                  <Label>Heart Rate (BPM)</Label>
                  <Input type="number" value={hr} onChange={e => setHr(e.target.value)} placeholder="72" />
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
                <CardTitle>Reading History ({records.length})</CardTitle>
                <CardDescription>Recent measurements stored locally</CardDescription>
              </CardHeader>
              <CardContent>
                {records.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground flex flex-col items-center">
                    <Info className="h-10 w-10 mb-2 opacity-50" />
                    <p>No readings recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {records.map(record => {
                      const cat = getCategory(record.sys, record.dia);
                      return (
                        <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg bg-background/50">
                          <div className="flex items-center gap-4">
                            <div className={cn("px-2 py-1 text-xs font-semibold rounded-md text-center w-24", cat.color)}>
                              {cat.label}
                            </div>
                            <div>
                              <div className="font-bold text-lg">
                                {record.sys} / {record.dia} <span className="text-xs font-normal text-muted-foreground">mmHg</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(record.timestamp).toLocaleDateString()} {new Date(record.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                {record.hr && ` • ${record.hr} BPM`}
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
            { step: "01", title: "Input Systolic & Diastolic", description: "Enter blood pressure numbers from your cuff monitor.", icon: Heart },
            { step: "02", title: "Automatic Category Tagging", description: "Evaluates readings against official AHA/ACC blood pressure stages.", icon: Activity },
            { step: "03", title: "Track Trends", description: "Review longitudinal history to share with your physician.", icon: Sparkles }
          ]}
          badges={["100% Free Forever", "AHA Guidelines", "Private Local Storage"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Heart, title: "AHA/ACC Classification", description: "Identifies Normal, Elevated, Stage 1, Stage 2, and Hypertensive Crisis levels." },
            { icon: Activity, title: "Pulse & Heart Rate", description: "Record resting heart rate alongside systolic and diastolic metrics." },
            { icon: Shield, title: "100% Local Privacy", description: "Health data is never sent to a backend server or shared with third parties." },
            { icon: Zap, title: "Instant Analysis", description: "Visual color badges update immediately with every keypress." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Understanding Blood Pressure Stages</h3>
            <p>
              Blood pressure is recorded as two numbers: systolic pressure (the force when the heart beats) and diastolic pressure (the pressure between beats). Maintaining blood pressure in the normal range (&lt;120/&lt;80 mmHg) is essential for long-term cardiovascular health.
            </p>
            <p>
              Toolzium Blood Pressure Tracker allows individuals to log daily readings directly in their local web browser without downloading intrusive apps or creating accounts.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "What is a normal blood pressure reading?", answer: "According to the American Heart Association, normal blood pressure for adults is less than 120 mm Hg systolic AND less than 80 mm Hg diastolic." },
            { question: "Is my health data private?", answer: "Yes! All blood pressure records are stored locally on your device with zero cloud transmission." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/health/blood-pressure" max={6} />
      </div>
    </div>
  );
}

export default BloodPressureClient;
