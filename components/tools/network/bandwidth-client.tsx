"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { Calculator, Clock, Copy, Download, Gauge, HardDrive, Plus, Shield, Sparkles, Trash2, Type, Wifi, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type Unit = "KB" | "MB" | "GB" | "TB";
type FileItem = {
  id: string;
  size: number;
  unit: Unit;
  name: string;
};
const unitMultipliers: Record<Unit, number> = {
  KB: 1024 * 8,
  // bits
  MB: 1024 * 1024 * 8,
  GB: 1024 * 1024 * 1024 * 8,
  TB: 1024 * 1024 * 1024 * 1024 * 8
};
export function BandwidthClient() {
  const [bandwidthMbps, setBandwidthMbps] = useState<string>("100");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [newName, setNewName] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newUnit, setNewUnit] = useState<Unit>("MB");
  const [desiredTime, setDesiredTime] = useState("");
  const [targetSize, setTargetSize] = useState("");
  const [targetUnit, setTargetUnit] = useState<Unit>("GB");
  const addFile = () => {
    if (!newSize || isNaN(Number(newSize))) {
      toast.error("Please enter a valid size");
      return;
    }
    setFiles([...files, {
      id: Date.now().toString(),
      name: newName || `File ${files.length + 1}`,
      size: Number(newSize),
      unit: newUnit
    }]);
    setNewName("");
    setNewSize("");
  };
  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };
  const applyPreset = (size: number, unit: Unit, mbps: string) => {
    setBandwidthMbps(mbps);
    setFiles([{
      id: Date.now().toString(),
      name: "Preset Task",
      size,
      unit
    }]);
  };
  const calculateTransferTimeSeconds = (size: number, unit: Unit, mbps: number) => {
    if (mbps <= 0) return 0;
    const bits = size * unitMultipliers[unit];
    return bits / (mbps * 1_000_000);
  };
  const formatTime = (seconds: number) => {
    if (seconds === 0) return "0s";
    if (!isFinite(seconds)) return "Infinite";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);
    return parts.join("");
  };
  const totalBits = files.reduce((acc, f) => acc + f.size * unitMultipliers[f.unit], 0);
  const totalSeconds = calculateTransferTimeSeconds(1, "KB", Number(bandwidthMbps)) > 0 ? totalBits / (Number(bandwidthMbps) * 1_000_000) : 0;
  const dataPerHourBits = Number(bandwidthMbps) * 1_000_000 * 3600;
  const dataPerHourGB = dataPerHourBits / unitMultipliers["GB"];
  const reqBandwidth = Number(targetSize) * unitMultipliers[targetUnit] / (Number(desiredTime) * 1_000_000) || 0;
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Wifi} title="Bandwidth Calculator" description="Calculate transfer times and bandwidth requirements" actions={<ResetButton onClick={() => {
        setFiles([]);
        setBandwidthMbps("100");
      }} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>File Transfer Calculator</CardTitle>
 <CardDescription>Estimate time to transfer files</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Bandwidth (Mbps)</Label>
 <Input type="number" value={bandwidthMbps} onChange={e => setBandwidthMbps(e.target.value)} />
 </div>
 
 <Separator />
 <div className="space-y-2">
 <Label>Add File to Queue</Label>
 <div className="flex gap-2">
 <Input placeholder="Name (opt)" value={newName} onChange={e => setNewName(e.target.value)} className="w-1/3" />
 <Input type="number" placeholder="Size" value={newSize} onChange={e => setNewSize(e.target.value)} className="w-1/3" />
 <Select value={newUnit} onValueChange={(v: Unit) => setNewUnit(v)}>
 <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="KB">KB</SelectItem>
 <SelectItem value="MB">MB</SelectItem>
 <SelectItem value="GB">GB</SelectItem>
 <SelectItem value="TB">TB</SelectItem>
 </SelectContent>
 </Select>
 <Button onClick={addFile} variant="secondary"><Plus className="w-4 h-4" /></Button>
 </div>
 </div>

 {files.length > 0 && <div className="space-y-2 mt-4 bg-muted/30 p-4 rounded-lg">
 <h4 className="font-semibold text-sm">Queue</h4>
 {files.map(f => <div key={f.id} className="flex justify-between items-center text-sm">
 <span>{f.name} ({f.size} {f.unit})</span>
 <div className="flex gap-4 items-center">
 <span className="text-muted-foreground">{formatTime(calculateTransferTimeSeconds(f.size, f.unit, Number(bandwidthMbps)))}</span>
 <Button variant="ghost" size="icon" onClick={() => removeFile(f.id)} className="h-6 w-6"><Trash2 className="w-3 h-3" /></Button>
 </div>
 </div>)}
 <Separator className="my-2" />
 <div className="flex justify-between font-bold">
 <span>Total Time:</span>
 <span>{formatTime(totalSeconds)}</span>
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Transfer Rates</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4 text-center">
 <div className="bg-muted/30 p-3 rounded-lg">
 <div className="text-sm text-muted-foreground">Per Hour</div>
 <div className="font-semibold">{dataPerHourGB.toFixed(2)} GB</div>
 </div>
 <div className="bg-muted/30 p-3 rounded-lg">
 <div className="text-sm text-muted-foreground">Per Day</div>
 <div className="font-semibold">{(dataPerHourGB * 24).toFixed(2)} GB</div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Reverse Calculation</CardTitle>
 <CardDescription>Required bandwidth for desired time</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex gap-2">
 <Input type="number" placeholder="Size" value={targetSize} onChange={e => setTargetSize(e.target.value)} className="w-1/3" />
 <Select value={targetUnit} onValueChange={(v: Unit) => setTargetUnit(v)}>
 <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="KB">KB</SelectItem>
 <SelectItem value="MB">MB</SelectItem>
 <SelectItem value="GB">GB</SelectItem>
 <SelectItem value="TB">TB</SelectItem>
 </SelectContent>
 </Select>
 <Input type="number" placeholder="Time (s)" value={desiredTime} onChange={e => setDesiredTime(e.target.value)} className="w-1/3" />
 </div>
 {reqBandwidth > 0 && <div className="text-center p-3 bg-muted/30 rounded-lg">
 Requires: <span className="font-bold">{reqBandwidth.toFixed(2)} Mbps</span>
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Presets</CardTitle>
 </CardHeader>
 <CardContent className="flex flex-wrap gap-2">
 <Button variant="outline" size="sm" onClick={() => applyPreset(1, "TB", "1000")}>Backup 1TB (1 Gbps)</Button>
 <Button variant="outline" size="sm" onClick={() => applyPreset(7, "GB", "25")}>4K Stream (25 Mbps)</Button>
 <Button variant="outline" size="sm" onClick={() => applyPreset(1, "GB", "2")}>Video Call (2 Mbps)</Button>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Select Unit", description: "Choose your bandwidth unit — Mbps, Kbps, GB/s, or any other measurement.", icon: Gauge },
        { step: "02", title: "Enter Value", description: "Type your bandwidth value or data transfer amount into the input field.", icon: Type },
        { step: "03", title: "Get Conversion", description: "Instantly see the converted result across all bandwidth units simultaneously.", icon: Zap },
      ]} badges={["All Units", "Real-Time", "No Signup"]} />

      <ToolFeatureGuides features={[
        { icon: Gauge, title: "All Units Covered", description: "Convert between Mbps, Kbps, Gbps, MB/s, KB/s, GB/s and more in one step." },
        { icon: Zap, title: "Instant Results", description: "Conversions update in real-time as you type — no submit button needed." },
        { icon: Shield, title: "Client-Side Only", description: "All calculations run in your browser. No data ever leaves your device." },
      ]}>
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
    </div>
    </div>
);
}

export default BandwidthClient;
