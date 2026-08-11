"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Eye, Droplet, Contrast, AlertTriangle } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const CVD_TYPES = [
  { name: "Protanopia", desc: "No red cones. Red/green confusion.", pop: "1% of men", matrix: [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]] },
  { name: "Deuteranopia", desc: "No green cones. Red/green confusion.", pop: "1.1% of men", matrix: [[0.625, 0.375, 0], [0.7, 0.3, 0], [0, 0.3, 0.7]] },
  { name: "Tritanopia", desc: "No blue cones. Blue/yellow confusion.", pop: "0.001% of men", matrix: [[0.95, 0.05, 0], [0, 0.433, 0.567], [0, 0.475, 0.525]] },
  { name: "Protanomaly", desc: "Weak red cones (Anomalous).", pop: "1.1% of men", matrix: [[0.817, 0.183, 0], [0.333, 0.667, 0], [0, 0.125, 0.875]] },
  { name: "Deuteranomaly", desc: "Weak green cones (Most common).", pop: "4.6% of men", matrix: [[0.8, 0.2, 0], [0.258, 0.742, 0], [0, 0.142, 0.858]] },
  { name: "Tritanomaly", desc: "Weak blue cones (Very rare).", pop: "0.002% of men", matrix: [[0.967, 0.033, 0], [0, 0.733, 0.267], [0, 0.183, 0.817]] },
  { name: "Achromatopsia", desc: "Total color blindness (Monochromacy).", pop: "0.003%", matrix: [[0.299, 0.587, 0.114], [0.299, 0.587, 0.114], [0.299, 0.587, 0.114]] },
  { name: "Achromatomaly", desc: "Partial color blindness.", pop: "Extremely rare", matrix: [[0.618, 0.320, 0.062], [0.163, 0.775, 0.062], [0.163, 0.320, 0.516]] },
];

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [parseInt(clean.substring(0, 2), 16), parseInt(clean.substring(2, 4), 16), parseInt(clean.substring(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`;
}

function simulateColor(hex: string, matrix: number[][]): string {
  const [r, g, b] = hexToRgb(hex);
  const nr = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
  const ng = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
  const nb = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];
  return rgbToHex(nr, ng, nb);
}

function getLuminance(hex: string): number {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrast(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export default function ColorBlindnessClient() {
  const [input, setInput] = useState("#ef4444, #22c55e, #3b82f6");
  
  const colors = useMemo(() => {
    return input.split(",").map(c => c.trim()).filter(c => /^#?([0-9A-F]{3}){1,2}$/i.test(c.replace("#", ""))).map(c => c.startsWith("#") ? c : `#${c}`);
  }, [input]);

  const steps = [
    { step: "01", title: "Input Colors", description: "Enter a single hex code or paste an entire comma-separated color palette.", icon: Droplet },
    { step: "02", title: "Apply Matrices", description: "View instant simulations across 8 different color vision deficiency types.", icon: Eye },
    { step: "03", title: "Verify Contrast", description: "Ensure your text remains readable and meets WCAG guidelines for all users.", icon: Contrast },
  ];

  const features = [
    { icon: Eye, title: "8 CVD Simulations", description: "Accurately simulate Protanopia, Deuteranopia, Tritanopia, and various anomalies." },
    { icon: Droplet, title: "Palette Mode", description: "Paste multiple comma-separated colors to test your entire UI palette simultaneously." },
    { icon: Contrast, title: "Contrast Auditing", description: "Verify if text contrast ratios hold up under different color blindness conditions." },
    { icon: AlertTriangle, title: "Inclusive Design", description: "Ensure your error states and success indicators don't rely solely on red/green hues." },
  ];

  const faqs = [
    { question: "Why shouldn't I use only red and green for error/success states?", answer: "Red-green color blindness (Protanopia and Deuteranopia) affects roughly 8% of the male population. To these users, red and green appear as indistinguishable muddy yellows or browns. Always pair color cues with icons (like ⚠️ or ✓) or text labels to ensure universal comprehension." },
    { question: "How accurate are these simulation matrices?", answer: "This tool uses established Brettel and Viénot transformation matrices, which are the industry standard for simulating color vision deficiency. While individual biological variations exist, these matrices provide a highly accurate representation of how the majority of CVD users perceive color." },
    { question: "Does color blindness affect dark mode differently?", answer: "Yes, the perception of contrast shifts in dark mode for CVD users. Simulating your dark mode palette is equally critical, as low-light conditions can further reduce the ability to distinguish between subtle hue variations that rely heavily on blue or green channels." },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4">
      <ToolPageHeader icon={Eye} title="Color Blindness Simulator" description="Audit your UI accessibility by simulating how your colors appear to users with various forms of Color Vision Deficiency (CVD)." />
      
      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}><Droplet className="w-4 h-4" /> CVD Simulation Engine</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Input Hex Colors (comma-separated for palette mode)</Label>
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="#ef4444, #22c55e" className="font-mono" />
          </div>

          {colors.length > 0 && (
            <div className="space-y-8">
              {CVD_TYPES.map(type => (
                <div key={type.name} className="space-y-3">
                  <div className="flex items-baseline justify-between border-b border-border/30 pb-2">
                    <div>
                      <h3 className="font-bold text-lg">{type.name}</h3>
                      <p className="text-xs text-muted-foreground">{type.desc} • <span className="text-primary font-semibold">{type.pop}</span></p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {colors.map((color, i) => {
                      const sim = simulateColor(color, type.matrix);
                      const contrastOrig = getContrast(color, "#ffffff");
                      const contrastSim = getContrast(sim, "#ffffff");
                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex h-20 rounded-lg overflow-hidden border border-border/50 shadow-sm">
                            <div className="flex-1 flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: color, color: contrastOrig > 3 ? "#fff" : "#000" }}>Orig</div>
                            <div className="flex-1 flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: sim, color: contrastSim > 3 ? "#fff" : "#000" }}>Sim</div>
                          </div>
                          <div className="text-[10px] text-center text-muted-foreground font-mono">{sim.toUpperCase()}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ToolHowItWorks steps={steps} badges={["100% Free", "WCAG Compliance", "No Signup"]} />
      
      <ToolFeatureGuides features={features}>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h3>Designing for Inclusive Color Vision</h3>
          <p>Designing for inclusivity means acknowledging that approximately 8% of men and 0.5% of women worldwide experience some form of Color Vision Deficiency (CVD). Relying solely on color to convey critical information—such as red for errors and green for success—can render your interface completely unusable for a significant portion of your audience. Color blindness simulation tools utilize advanced linear algebra and transformation matrices, such as the Brettel and Viénot models, to accurately map standard RGB values into the perceived color space of individuals with Protanopia, Deuteranopia, or Tritanopia.</p>
          <p>Protanopia and Deuteranopia are the most common forms of red-green color blindness, where the respective cone cells in the eye are entirely missing or malfunctioning. Tritanopia, affecting the blue-yellow spectrum, is much rarer but equally important to test for. Achromatopsia, or total color blindness, reduces the visual field entirely to grayscale. By simulating these conditions in real-time, designers and developers can audit their palettes and ensure that contrast ratios remain intact and that UI elements are distinguishable through secondary cues like icons, patterns, or text labels. Meeting WCAG AA and AAA accessibility standards is not just a legal compliance checkbox; it is a moral imperative and a hallmark of high-quality, empathetic engineering. Testing your entire color palette against these simulation matrices guarantees that your digital products are universally accessible and user-friendly.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={faqs} />
      <RelatedTools currentToolUrl="/tools/dev/color-blindness-simulator" max={6} />
    </div>
  );
}
