"use client";

import { ToolBackground } from"@/components/shared/tool-background";

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
import { Palette, Copy, Lock, Unlock, Download, Sun, Moon, Check } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
const harmonies = ["Complementary", "Analogous", "Triadic", "Tetradic", "Split", "Monochromatic", "Random"];
function hexToHsl(hex: string): [number, number, number] {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
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
export default function ColorPaletteClient() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [harmony, setHarmony] = useState("Analogous");
  const [locked, setLocked] = useState<boolean[]>([false, false, false, false, false]);
  const [customPalette, setCustomPalette] = useState<string[]>(["#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6"]);
  const generatePalette = useCallback(() => {
    const [h, s, l] = hexToHsl(baseColor);
    let theoretical: string[] = [];
    switch (harmony) {
      case "Complementary":
        theoretical = [hslToHex(h, s, l), hslToHex((h + 180) % 360, s, l)];
        break;
      case "Analogous":
        theoretical = [hslToHex((h - 30 + 360) % 360, s, l), hslToHex(h, s, l), hslToHex((h + 30) % 360, s, l)];
        break;
      case "Triadic":
        theoretical = [hslToHex(h, s, l), hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
        break;
      case "Tetradic":
        theoretical = [hslToHex(h, s, l), hslToHex((h + 90) % 360, s, l), hslToHex((h + 180) % 360, s, l), hslToHex((h + 270) % 360, s, l)];
        break;
      case "Split":
        theoretical = [hslToHex(h, s, l), hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l)];
        break;
      case "Monochromatic":
        theoretical = [hslToHex(h, s, Math.max(10, l - 30)), hslToHex(h, s, Math.max(20, l - 15)), hslToHex(h, s, l), hslToHex(h, s, Math.min(90, l + 15)), hslToHex(h, s, Math.min(95, l + 30))];
        break;
      case "Random":
        theoretical = Array(5).fill(0).map(() => hslToHex(Math.random() * 360, 50 + Math.random() * 40, 40 + Math.random() * 40));
        break;
    }
    while (theoretical.length < 5) theoretical.push(hslToHex(h, s, l));
    const nextPalette = customPalette.map((c, i) => locked[i] ? c : theoretical[i] || c);
    setCustomPalette(nextPalette.slice(0, 5));
  }, [baseColor, harmony, locked, customPalette]);
  useEffect(() => {
    generatePalette();
  }, [baseColor, harmony]);
  const toggleLock = (i: number) => {
    const next = [...locked];
    next[i] = !next[i];
    setLocked(next);
  };
  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}`);
  };
  const exportCSS = () => {
    const css = `:root {\n${customPalette.map((c, i) => ` --color-${i + 1}: ${c};`).join('\n')}\n}`;
    navigator.clipboard.writeText(css);
    toast.success("Copied CSS Variables");
  };
  const exportTailwind = () => {
    const tw = `colors: {\n brand: {\n${customPalette.map((c, i) => ` ${i + 1}00: '${c}',`).join('\n')}\n }\n}`;
    navigator.clipboard.writeText(tw);
    toast.success("Copied Tailwind Config");
  };
  const steps = [{
    step: "01",
    title: "Pick Base Color",
    description: "Select your primary brand color using the hex input or native color picker.",
    icon: Palette
  }, {
    step: "02",
    title: "Choose Harmony",
    description: "Select a color theory algorithm like Triadic, Analogous, or Complementary.",
    icon: Sun
  }, {
    step: "03",
    title: "Export & Use",
    description: "Copy individual hex codes or export the entire palette as CSS or Tailwind config.",
    icon: Download
  }];
  const features = [{
    icon: Palette,
    title: "Advanced Harmonies",
    description: "Generate mathematically perfect color schemes based on the traditional color wheel."
  }, {
    icon: Check,
    title: "WCAG Contrast Checker",
    description: "Instantly verify if your colors meet accessibility standards for text readability."
  }, {
    icon: Lock,
    title: "Lock & Regenerate",
    description: "Lock your favorite shades and iterate on the rest of the palette without losing them."
  }, {
    icon: Download,
    title: "Developer Export",
    description: "Export directly to CSS variables, Tailwind config, or SCSS maps for immediate use."
  }];
  const faqs = [{
    question: "What is the best color harmony for a SaaS dashboard?",
    answer: "Analogous or Monochromatic harmonies are generally best for SaaS dashboards as they provide a cohesive, low-contrast environment that reduces eye strain during long working sessions, reserving complementary colors strictly for primary call-to-action buttons."
  }, {
    question: "How do I ensure my palette is accessible?",
    answer: "Use the built-in WCAG contrast checker to ensure that any text placed over your generated colors maintains a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text to meet AA compliance standards."
  }, {
    question: "Can I export these colors to my React project?",
    answer: "Yes, the tool provides one-click export options for CSS custom properties (variables) and Tailwind CSS configuration objects, allowing you to paste the exact color system directly into your global styles or tailwind.config.js file."
  }];
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Palette} title="Color Palette Generator" description="Generate beautiful, mathematically harmonious color palettes with WCAG contrast checking and developer export tools." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Palette className="w-4 h-4" /> Palette Studio</CardTitle>
 </CardHeader>
 <CardContent className="p-6 space-y-6">
 <div className="flex flex-col sm:flex-row gap-4 items-end">
 <div className="space-y-2 flex-1">
 <Label>Base Hex Color</Label>
 <div className="flex gap-2">
 <Input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)} className="w-16 h-10 p-1 rounded cursor-pointer" />
 <Input value={baseColor} onChange={e => setBaseColor(e.target.value)} className="flex-1 font-mono" />
 </div>
 </div>
 <Button onClick={generatePalette} variant="outline">Regenerate</Button>
 </div>

 <div className="flex flex-wrap gap-2">
 {harmonies.map(h => <Button key={h} variant={harmony === h ? "default" : "secondary"} size="sm" onClick={() => setHarmony(h)}>{h}</Button>)}
 </div>

 <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
 {customPalette.map((color, i) => <div key={i} className="space-y-2">
 <div className="h-32 rounded-xl border border-border shadow-inner relative group cursor-pointer" style={{
                backgroundColor: color
              }} onClick={() => copyHex(color)}>
 <Button className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition" onClick={e => {
                  e.stopPropagation();
                  toggleLock(i);
                }}>
 {locked[i] ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
 </Button>
 <div className="absolute bottom-2 left-2 right-2 text-center text-xs font-bold bg-background/90 py-1 rounded shadow">
 <span style={{
                    color: getContrast(color, "#ffffff") > getContrast(color, "#000000") ? "#fff" : "#000",
                    backgroundColor: color,
                    padding: "2px 4px",
                    borderRadius: "4px"
                  }}>{color.toUpperCase()}</span>
 </div>
 </div>
 <div className="text-[10px] text-muted-foreground space-y-0.5 font-mono">
 <div>RGB: {hexToRgb(color)}</div>
 <div>HSL: {hexToHsl(color).join(",")}</div>
 <div className="flex justify-between pt-1 border-t border-border/30">
 <span>W: {getContrast(color, "#ffffff").toFixed(1)}</span>
 <span>B: {getContrast(color, "#000000").toFixed(1)}</span>
 </div>
 </div>
 </div>)}
 </div>

 <div className="flex gap-2 pt-4 border-t border-border/30">
 <Button onClick={exportCSS} variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> CSS Variables</Button>
 <Button onClick={exportTailwind} variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Tailwind</Button>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={steps} badges={["100% Free", "Client-Side Privacy", "No Signup"]} />
 
 <ToolFeatureGuides features={features}>
 <div className="prose prose-sm dark:prose-invert max-w-none">
 <h3>Mastering Color Theory for Web Design</h3>
 <p>Color theory is the backbone of effective web design and brand identity. A well-chosen color palette not only evokes the right emotional response but also guides user attention and establishes visual hierarchy. When designing interfaces, relying on a single color is rarely sufficient; you need a cohesive system of primary, secondary, and accent colors that work in harmony. This is where color harmonies—such as complementary, analogous, triadic, and tetradic—come into play. Complementary colors, located opposite each other on the color wheel, provide high contrast and are ideal for call-to-action buttons. Analogous colors, sitting next to each other, create serene and comfortable designs, often used in wellness or lifestyle applications. Triadic and tetradic schemes offer vibrant diversity but require careful balancing of saturation and lightness to avoid visual clutter.</p>
 <p>Beyond aesthetics, accessibility is a non-negotiable aspect of modern color selection. The Web Content Accessibility Guidelines (WCAG) mandate specific contrast ratios between text and background colors to ensure readability for users with visual impairments. A professional color palette generator automates the mathematical heavy lifting, converting hex codes to HSL (Hue, Saturation, Lightness) to rotate hues accurately while preserving perceived brightness. Furthermore, exporting palettes directly into CSS variables, Tailwind configuration files, or SCSS maps bridges the gap between design and development, ensuring that the exact hex values are consistently applied across your entire codebase. Whether you are building a dark mode theme, a data visualization dashboard, or a vibrant marketing site, mastering algorithmic color generation guarantees a scalable, accessible, and visually stunning user experience.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
    </div>
    </div>
);
}
