"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Activity, ArrowLeftRight, Download, Zap, Sparkles, Shield, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type Unit = {
  id: string;
  name: string;
  multiplier: number;
  isByte: boolean;
};
const UNITS: Unit[] = [{
  id: "bps",
  name: "Bits per second (bps)",
  multiplier: 1,
  isByte: false
}, {
  id: "kbps",
  name: "Kilobits per second (Kbps)",
  multiplier: 1000,
  isByte: false
}, {
  id: "mbps",
  name: "Megabits per second (Mbps)",
  multiplier: 1000000,
  isByte: false
}, {
  id: "gbps",
  name: "Gigabits per second (Gbps)",
  multiplier: 1000000000,
  isByte: false
}, {
  id: "tbps",
  name: "Terabits per second (Tbps)",
  multiplier: 1000000000000,
  isByte: false
}, {
  id: "Bps",
  name: "Bytes per second (B/s)",
  multiplier: 8,
  isByte: true
}, {
  id: "KBps",
  name: "Kilobytes per second (KB/s)",
  multiplier: 8000,
  isByte: true
}, {
  id: "MBps",
  name: "Megabytes per second (MB/s)",
  multiplier: 8000000,
  isByte: true
}, {
  id: "GBps",
  name: "Gigabytes per second (GB/s)",
  multiplier: 8000000000,
  isByte: true
}];
const PRESETS = [{
  name: "Dial-up",
  value: 56,
  unit: "kbps"
}, {
  name: "DSL",
  value: 25,
  unit: "mbps"
}, {
  name: "Cable",
  value: 100,
  unit: "mbps"
}, {
  name: "5G",
  value: 500,
  unit: "mbps"
}, {
  name: "Fiber",
  value: 1,
  unit: "gbps"
}];
const FILES = [{
  name: "MP3 Song (5MB)",
  bytes: 5 * 1000000
}, {
  name: "Small App (100MB)",
  bytes: 100 * 1000000
}, {
  name: "HD Movie (1GB)",
  bytes: 1 * 1000000000
}, {
  name: "Large Game (50GB)",
  bytes: 50 * 1000000000
}];
export function SpeedConverterClient() {
  const [inputValue, setInputValue] = useState<string>("100");
  const [inputUnit, setInputUnit] = useState<string>("mbps");
  const [baseBps, setBaseBps] = useState<number>(100000000);
  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setBaseBps(0);
      return;
    }
    const unitObj = UNITS.find(u => u.id === inputUnit);
    if (unitObj) {
      setBaseBps(val * unitObj.multiplier);
    }
  }, [inputValue, inputUnit]);
  const handlePreset = (preset: typeof PRESETS[0]) => {
    setInputValue(preset.value.toString());
    setInputUnit(preset.unit);
  };
  const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || seconds <= 0) return "Instant";
    if (seconds < 1) return "< 1 second";
    if (seconds < 60) return `${Math.ceil(seconds)} seconds`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.ceil(seconds % 60);
    if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Activity} title="Network Speed Converter" description="Convert bandwidth speeds and estimate download times for common file sizes." />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Input Speed</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex flex-col sm:flex-row gap-4">
 <div className="flex-1 space-y-2">
 <Label>Speed</Label>
 <Input type="number" min="0" step="any" value={inputValue} onChange={e => setInputValue(e.target.value)} />
 </div>
 <div className="flex-1 space-y-2">
 <Label>Unit</Label>
 <Select value={inputUnit} onValueChange={setInputUnit}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {UNITS.map(u => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Common Presets</Label>
 <div className="flex flex-wrap gap-2">
 {PRESETS.map(p => <Button key={p.name} variant="outline" size="sm" onClick={() => handlePreset(p)}>
 {p.name}
 </Button>)}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Download className="h-5 w-5 text-primary" /> Download Time Estimates
 </CardTitle>
 <CardDescription>Based on {inputValue} {UNITS.find(u => u.id === inputUnit)?.id}</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="space-y-4">
 {baseBps > 0 ? FILES.map(file => {
                  const downloadSeconds = file.bytes * 8 / baseBps;
                  return <div key={file.name} className="flex justify-between items-center p-3 bg-muted rounded-md">
 <span className="font-medium">{file.name}</span>
 <span className="text-primary font-semibold">{formatTime(downloadSeconds)}</span>
 </div>;
                }) : <p className="text-muted-foreground text-sm">Enter a valid speed greater than 0 to see estimates.</p>}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <ArrowLeftRight className="h-5 w-5 text-primary" /> Conversions
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="space-y-6">
 <div>
 <h3 className="font-semibold mb-3 border-b pb-2 flex items-center gap-2">
 <Zap className="h-4 w-4" /> Bits (Network Speed)
 </h3>
 <div className="space-y-2">
 {UNITS.filter(u => !u.isByte).map(u => <div key={u.id} className="flex justify-between items-center py-1">
 <span className="text-sm text-muted-foreground">{u.name}</span>
 <span className="font-mono font-medium">
 {baseBps > 0 ? (baseBps / u.multiplier).toLocaleString(undefined, {
                        maximumFractionDigits: 6
                      }) : 0}
 </span>
 </div>)}
 </div>
 </div>
 
 <div>
 <h3 className="font-semibold mb-3 border-b pb-2 flex items-center gap-2">
 <Download className="h-4 w-4" /> Bytes (Download Speed)
 </h3>
 <div className="space-y-2">
 {UNITS.filter(u => u.isByte).map(u => <div key={u.id} className="flex justify-between items-center py-1">
 <span className="text-sm text-muted-foreground">{u.name}</span>
 <span className="font-mono font-medium text-primary">
 {baseBps > 0 ? (baseBps / u.multiplier).toLocaleString(undefined, {
                        maximumFractionDigits: 6
                      }) : 0}
 </span>
 </div>)}
 </div>
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
          <h3>Why Use Our Network Speed Converter?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Network Speed Converter provides
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

      <RelatedTools currentToolUrl="/tools/network/speed-converter" max={6} />

    </div></div>;
}