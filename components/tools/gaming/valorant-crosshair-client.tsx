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
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Crosshair, Copy, Sparkles, Shield, Zap } from "lucide-react";
import toast from "react-hot-toast";

interface CrosshairPreset {
  name: string;
  code: string;
  color: string;
  thickness: number;
  length: number;
  gap: number;
}

const PRO_PRESETS: CrosshairPreset[] = [
  { name: "TenZ (Classic Cyan Dot)", code: "0;s;1;P;c;5;h;0;m;1;0t;1;0l;2;0o;2;0a;1;0f;0;1b;0;S;c;4;o;1", color: "#00ffff", thickness: 1, length: 2, gap: 2 },
  { name: "Aspas (Green Compact)", code: "0;P;c;1;h;0;0t;1;0l;4;0o;0;0a;1;0f;0;1b;0", color: "#00ff00", thickness: 1, length: 4, gap: 0 },
  { name: "Chronicle (Clean White)", code: "0;P;o;1;d;1;0b;0;1b;0", color: "#ffffff", thickness: 2, length: 2, gap: 1 },
  { name: "Boaster (Red Diamond)", code: "0;s;1;P;c;7;o;1;d;1;z;1;f;0;0t;0;0l;0;0o;0;0a;0;0f;0;1b;0", color: "#ff0055", thickness: 2, length: 3, gap: 2 }
];

export function ValorantCrosshairClient() {
  const [selectedPreset, setSelectedPreset] = useState<CrosshairPreset>(PRO_PRESETS[0]);
  const [color, setColor] = useState("#00ffff");
  const [length, setLength] = useState(2);
  const [thickness, setThickness] = useState(1);
  const [gap, setGap] = useState(2);

  const applyPreset = (preset: CrosshairPreset) => {
    setSelectedPreset(preset);
    setColor(preset.color);
    setLength(preset.length);
    setThickness(preset.thickness);
    setGap(preset.gap);
    toast.success(`Loaded ${preset.name} preset!`);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Crosshair profile code copied to clipboard!");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Crosshair}
          title="Valorant Crosshair Generator & Database"
          description="Design, test, and copy pro player crosshair profile codes directly for Riot Games' Valorant."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="md:col-span-6">
            <GlassCard>
              <CardHeader>
                <CardTitle>Custom Crosshair Tuner</CardTitle>
                <CardDescription>Adjust inner line thickness, length, and gap offsets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Pro Player Presets</Label>
                  <Select onValueChange={val => {
                    const found = PRO_PRESETS.find(p => p.name === val);
                    if (found) applyPreset(found);
                  }}>
                    <SelectTrigger><SelectValue placeholder="Select Pro Preset..." /></SelectTrigger>
                    <SelectContent>
                      {PRO_PRESETS.map(p => (
                        <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Line Length: {length}</Label>
                    <Input type="range" min="1" max="10" value={length} onChange={e => setLength(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Line Thickness: {thickness}</Label>
                    <Input type="range" min="1" max="6" value={thickness} onChange={e => setThickness(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Center Gap: {gap}</Label>
                    <Input type="range" min="0" max="10" value={gap} onChange={e => setGap(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Crosshair Color</Label>
                    <Input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-10 p-1 cursor-pointer" />
                  </div>
                </div>

                <div className="pt-2">
                  <Button onClick={() => copyCode(selectedPreset.code)} className="w-full">
                    <Copy className="w-4 h-4 mr-2" /> Copy Valorant Crosshair Code
                  </Button>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* Crosshair Live Preview */}
          <div className="md:col-span-6">
            <GlassCard className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Live Reticle Canvas</CardTitle>
                <CardDescription>Visual preview against high-contrast competitive backdrop</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-8 bg-zinc-900 rounded-xl relative min-h-[220px]">
                {/* Crosshair Simulation */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  {/* Top line */}
                  <div
                    className="absolute rounded-xs"
                    style={{
                      backgroundColor: color,
                      width: `${thickness * 2}px`,
                      height: `${length * 4}px`,
                      bottom: `calc(50% + ${gap * 2}px)`
                    }}
                  />
                  {/* Bottom line */}
                  <div
                    className="absolute rounded-xs"
                    style={{
                      backgroundColor: color,
                      width: `${thickness * 2}px`,
                      height: `${length * 4}px`,
                      top: `calc(50% + ${gap * 2}px)`
                    }}
                  />
                  {/* Left line */}
                  <div
                    className="absolute rounded-xs"
                    style={{
                      backgroundColor: color,
                      height: `${thickness * 2}px`,
                      width: `${length * 4}px`,
                      right: `calc(50% + ${gap * 2}px)`
                    }}
                  />
                  {/* Right line */}
                  <div
                    className="absolute rounded-xs"
                    style={{
                      backgroundColor: color,
                      height: `${thickness * 2}px`,
                      width: `${length * 4}px`,
                      left: `calc(50% + ${gap * 2}px)`
                    }}
                  />
                </div>
              </CardContent>
            </GlassCard>
          </div>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Select or Customize", description: "Choose a VCT champion profile or tweak thickness and gap sliders.", icon: Crosshair },
            { step: "02", title: "Copy Profile Code", description: "Click Copy to grab the official alphanumeric import string.", icon: Copy },
            { step: "03", title: "Import into Valorant", description: "In Valorant Settings → Crosshair → click Import Profile (down arrow icon) and paste.", icon: Sparkles }
          ]}
          badges={["100% Free Forever", "VCT Pro Presets", "Instant Code Import"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Crosshair, title: "VCT Pro Database", description: "Direct codes from radiant champions like TenZ, Aspas, and Chronicle." },
            { icon: Sparkles, title: "Real-Time Visualizer", description: "Preview line lengths, center dots, and contrast against dark backgrounds." },
            { icon: Copy, title: "1-Click Profile Export", description: "One-click copy formatted for Riot Games' in-game profile string parser." },
            { icon: Shield, title: "Riot TOS Safe", description: "Uses native in-game settings without third-party overlay injection." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Optimizing Crosshair Geometry for First-Shot Accuracy</h3>
            <p>
              In tactical first-person shooters like Valorant, headshot placement and crosshair clarity dictate the outcome of gunfights. High-contrast colors like cyan and green stand out clearly against standard map geometry in Ascent, Bind, and Haven.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How do I import a crosshair code into Valorant?", answer: "Open Valorant → Settings → Crosshair → Under 'Crosshair Profile', click the Import Profile icon (downward arrow) → Paste your code and click Import." },
            { question: "Can changing crosshairs improve headshot accuracy?", answer: "A cleaner, smaller crosshair obstructs less of the enemy's head model at long range, improving micro-adjustments." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/gaming/valorant-crosshair" max={6} />
      </div>
    </div>
  );
}

export default ValorantCrosshairClient;
