"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Download, Clock, Wifi, Calculator, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
const fileUnits: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4
};
const speedUnits: Record<string, number> = {
  Kbps: 1000,
  Mbps: 1000 ** 2,
  Gbps: 1000 ** 3
};
const presets = [{
  name: "Custom",
  size: 0,
  unit: "MB"
}, {
  name: "HD Movie",
  size: 4,
  unit: "GB"
}, {
  name: "4K Movie",
  size: 15,
  unit: "GB"
}, {
  name: "AAA Game",
  size: 60,
  unit: "GB"
}, {
  name: "OS Update",
  size: 2,
  unit: "GB"
}, {
  name: "Song (MP3)",
  size: 5,
  unit: "MB"
}, {
  name: "Photo (Raw)",
  size: 25,
  unit: "MB"
}];
export function BandwidthCalcClient() {
  const [fileSize, setFileSize] = useState<number>(1);
  const [fileUnit, setFileUnit] = useState<string>("GB");
  const [speed, setSpeed] = useState<number>(100);
  const [speedUnit, setSpeedUnit] = useState<string>("Mbps");
  const [resultTimeSeconds, setResultTimeSeconds] = useState<number>(0);
  const [preset, setPreset] = useState<string>("Custom");
  useEffect(() => {
    if (fileSize > 0 && speed > 0) {
      // file size in bits
      const sizeInBits = fileSize * fileUnits[fileUnit] * 8;
      // speed in bits per second
      const speedInBps = speed * speedUnits[speedUnit];
      setResultTimeSeconds(sizeInBits / speedInBps);
    } else {
      setResultTimeSeconds(0);
    }
  }, [fileSize, fileUnit, speed, speedUnit]);
  const applyPreset = (presetName: string) => {
    setPreset(presetName);
    const p = presets.find(x => x.name === presetName);
    if (p && p.name !== "Custom") {
      setFileSize(p.size);
      setFileUnit(p.unit);
    }
  };
  const formatTime = (seconds: number) => {
    if (seconds === 0 || !isFinite(seconds)) return "0 seconds";
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const parts = [];
    if (d > 0) parts.push(`${d} days`);
    if (h > 0) parts.push(`${h} hours`);
    if (m > 0) parts.push(`${m} minutes`);
    if (s > 0 || parts.length === 0) parts.push(`${s} seconds`);
    return parts.join(",");
  };
  const getResultText = () => {
    return `File Size: ${fileSize} ${fileUnit}\nSpeed: ${speed} ${speedUnit}\nEstimated Time: ${formatTime(resultTimeSeconds)}`;
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Calculator} title="Bandwidth Calculator" description="Calculate download and upload times for file transfers over different network speeds." actions={<>
 <ResetButton onClick={() => {
          setFileSize(1);
          setFileUnit("GB");
          setSpeed(100);
          setSpeedUnit("Mbps");
          setPreset("Custom");
        }} />
 <CopyButton getText={getResultText} label="Copy Results" />
 </>} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Transfer Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Presets</Label>
 <Select value={preset} onValueChange={applyPreset}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {presets.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>File Size</Label>
 <div className="flex gap-2">
 <Input type="number" min={0} value={fileSize} onChange={e => {
                  setFileSize(Number(e.target.value) || 0);
                  setPreset("Custom");
                }} />
 <Select value={fileUnit} onValueChange={v => {
                  setFileUnit(v);
                  setPreset("Custom");
                }}>
 <SelectTrigger className="w-24">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {Object.keys(fileUnits).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Connection Speed</Label>
 <div className="flex gap-2">
 <Input type="number" min={0} value={speed} onChange={e => setSpeed(Number(e.target.value) || 0)} />
 <Select value={speedUnit} onValueChange={setSpeedUnit}>
 <SelectTrigger className="w-24">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {Object.keys(speedUnits).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Calculation Result</CardTitle>
 <CardDescription>Estimated transfer time</CardDescription>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center h-48 text-center space-y-4">
 <Clock className="w-12 h-12 text-primary" />
 <div className="text-3xl font-bold text-primary">
 {formatTime(resultTimeSeconds)}
 </div>
 <div className="text-sm text-muted-foreground">
 Based on continuous, optimal connection speed
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
          <h3>Why Use Our Bandwidth Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Bandwidth Calculator provides
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

      <RelatedTools currentToolUrl="/tools/network/bandwidth-calc" max={6} />

    </div></div>;
}