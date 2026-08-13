"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ResetButton } from "@/components/shared/action-buttons";
import { Heart, Activity, BarChart3, AlertTriangle, Trash2, Info, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
interface BPRecord {
  id: string;
  timestamp: number;
  sys: number;
  dia: number;
  hr?: number;
}
export function BloodPressureClient() {
  const [records, setRecords] = useState<BPRecord[]>([]);
  const [sys, setSys] = useState<string>("");
  const [dia, setDia] = useState<string>("");
  const [hr, setHr] = useState<string>("");
  useEffect(() => {
    const saved = localStorage.getItem("tz_bp_records");
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);
  const saveRecords = (newRecords: BPRecord[]) => {
    setRecords(newRecords);
    localStorage.setItem("tz_bp_records", JSON.stringify(newRecords));
  };
  const handleAdd = () => {
    const s = parseInt(sys);
    const d = parseInt(dia);
    const h = parseInt(hr) || undefined;
    if (!s || !d) {
      toast.error("Please enter systolic and diastolic values");
      return;
    }
    const newRecord: BPRecord = {
      id: Math.random().toString(),
      timestamp: Date.now(),
      sys: s,
      dia: d,
      hr: h
    };
    saveRecords([newRecord, ...records]);
    setSys("");
    setDia("");
    setHr("");
    toast.success("Reading added");
  };
  const handleDelete = (id: string) => {
    saveRecords(records.filter(r => r.id !== id));
  };
  const handleClear = () => {
    if (confirm("Are you sure you want to clear all records?")) {
      saveRecords([]);
      toast.success("Records cleared");
    }
  };
  const getCategory = (sys: number, dia: number) => {
    if (sys > 180 || dia > 120) return {
      label: "Crisis",
      color: "bg-red-600 text-primary-foreground"
    };
    if (sys >= 140 || dia >= 90) return {
      label: "High Stage 2",
      color: "bg-orange-600 text-primary-foreground"
    };
    if (sys >= 130 && sys <= 139 || dia >= 80 && dia <= 89) return {
      label: "High Stage 1",
      color: "bg-orange-400 text-black"
    };
    if (sys >= 120 && sys <= 129 && dia < 80) return {
      label: "Elevated",
      color: "bg-yellow-400 text-black"
    };
    if (sys < 120 && dia < 80) return {
      label: "Normal",
      color: "bg-green-500 text-primary-foreground"
    };
    return {
      label: "Unknown",
      color: "bg-gray-400 text-primary-foreground"
    };
  };
  const calculateAverage = (count: number) => {
    const items = records.slice(0, count);
    if (items.length === 0) return null;
    const avgSys = Math.round(items.reduce((a, b) => a + b.sys, 0) / items.length);
    const avgDia = Math.round(items.reduce((a, b) => a + b.dia, 0) / items.length);
    return {
      sys: avgSys,
      dia: avgDia
    };
  };
  const avg7 = calculateAverage(7);
  const avg30 = calculateAverage(30);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Blood Pressure Tracker" description="Track and monitor your blood pressure readings over time." icon={Heart} actions={<ResetButton onClick={handleClear} label="Clear Data" />} />

 <div className="bg-muted p-4 rounded-lg flex items-start gap-3 text-sm text-muted-foreground">
 <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />
 <p>
 <strong>Disclaimer:</strong> This tool is for informational purposes
 only and is not intended to be a substitute for professional medical
 advice, diagnosis, or treatment. Always seek the advice of your
 physician.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
 <div className="md:col-span-4 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Activity className="h-5 w-5" /> New Reading
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Systolic (upper)</Label>
 <Input type="number" placeholder="120" value={sys} onChange={e => setSys(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Diastolic (lower)</Label>
 <Input type="number" placeholder="80" value={dia} onChange={e => setDia(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>
 Heart Rate (bpm){""}
 <span className="text-muted-foreground font-normal">
 (Optional)
 </span>
 </Label>
 <Input type="number" placeholder="70" value={hr} onChange={e => setHr(e.target.value)} />
 </div>
 <Button className="w-full" onClick={handleAdd}>
 Add Reading
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <BarChart3 className="h-5 w-5" /> Averages
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex justify-between items-center p-3 bg-muted rounded-md">
 <span className="text-sm font-medium">Last 7 Readings</span>
 <span className="font-bold">
 {avg7 ? `${avg7.sys}/${avg7.dia}` : "--/--"}
 </span>
 </div>
 <div className="flex justify-between items-center p-3 bg-muted rounded-md">
 <span className="text-sm font-medium">Last 30 Readings</span>
 <span className="font-bold">
 {avg30 ? `${avg30.sys}/${avg30.dia}` : "--/--"}
 </span>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="md:col-span-8">
 <GlassCard className="h-full">
 <CardHeader>
 <CardTitle>History</CardTitle>
 <CardDescription>Your saved readings</CardDescription>
 </CardHeader>
 <CardContent>
 {records.length === 0 ? <div className="text-center py-10 text-muted-foreground flex flex-col items-center">
 <Info className="h-10 w-10 mb-2 opacity-50" />
 <p>No readings recorded yet.</p>
 </div> : <div className="space-y-3">
 {records.map(record => {
                  const cat = getCategory(record.sys, record.dia);
                  const date = new Date(record.timestamp);
                  return <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
 <div className="flex items-center gap-4">
 <div className={cn("px-2 py-1 text-xs font-semibold rounded-md", cat.color, "w-24 text-center")}>
 {cat.label}
 </div>
 <div>
 <div className="font-bold text-lg">
 {record.sys} / {record.dia}{""}
 <span className="text-sm text-muted-foreground font-normal ml-1">
 mmHg
 </span>
 </div>
 <div className="text-xs text-muted-foreground flex items-center gap-2">
 {date.toLocaleString()}
 {record.hr && <span>• {record.hr} bpm</span>}
 </div>
 </div>
 </div>
 <Button variant="ghost" size="icon" onClick={() => handleDelete(record.id)}>
 <Trash2 className="h-4 w-4 text-destructive" />
 </Button>
 </div>;
                })}
 </div>}
 </CardContent>
 </GlassCard>
 </div>
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
          <h3>Why Use Our Blood Pressure Tracker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Blood Pressure Tracker provides
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

      <RelatedTools currentToolUrl="/tools/health/blood-pressure" max={6} />

    </div></div>;
}