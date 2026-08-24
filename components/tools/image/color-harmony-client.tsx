"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton, ActionButton } from "@/components/shared/action-buttons";
import { Palette, Download, Copy, RefreshCw, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

// Hex to HSL conversion
function hexToHsl(hex: string): [number, number, number] {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  const num = parseInt(c, 16);
  const r = (num >> 16) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

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

// HSL to Hex conversion
function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function ColorHarmonyClient() {
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [harmony, setHarmony] = useState("complementary");
  const [palette, setPalette] = useState<string[]>([]);

  const calculateHarmonies = useCallback(() => {
    try {
      const [h, s, l] = hexToHsl(baseColor);
      let colors: string[] = [];

      switch (harmony) {
        case "complementary":
          colors = [baseColor, hslToHex(h + 180, s, l)];
          break;
        case "analogous":
          colors = [
            hslToHex(h - 30, s, l),
            baseColor,
            hslToHex(h + 30, s, l),
            hslToHex(h + 60, s, l),
          ];
          break;
        case "triadic":
          colors = [
            baseColor,
            hslToHex(h + 120, s, l),
            hslToHex(h + 240, s, l),
          ];
          break;
        case "tetradic":
          colors = [
            baseColor,
            hslToHex(h + 90, s, l),
            hslToHex(h + 180, s, l),
            hslToHex(h + 270, s, l),
          ];
          break;
        case "split-complementary":
          colors = [
            baseColor,
            hslToHex(h + 150, s, l),
            hslToHex(h + 210, s, l),
          ];
          break;
        case "monochromatic":
          colors = [
            hslToHex(h, s, Math.max(15, l - 35)),
            hslToHex(h, s, Math.max(25, l - 15)),
            baseColor,
            hslToHex(h, s, Math.min(85, l + 15)),
            hslToHex(h, s, Math.min(95, l + 35)),
          ];
          break;
        default:
          colors = [baseColor];
      }
      setPalette(colors);
    } catch {
      // Ignore invalid colors
    }
  }, [baseColor, harmony]);

  useEffect(() => {
    calculateHarmonies();
  }, [calculateHarmonies]);

  const exportCSS = () => {
    const css = palette.map((c, i) => `  --color-harmony-${i + 1}: ${c};`).join("\n");
    const blob = new Blob([`:root {\n${css}\n}`], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `color-palette-${harmony}.css`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSS Palette variables downloaded!");
  };

  const copyAllHex = () => {
    navigator.clipboard.writeText(palette.join(", "));
    toast.success("Palette hex values copied!");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Palette}
          title="Color Palette Harmonizer & Generator"
          description="Generate authentic mathematical color wheel harmonies (Complementary, Triadic, Analogous, Tetradic, Monochromatic)."
          actions={<div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={copyAllHex} className="h-9 px-3 rounded-xl text-xs gap-1.5 cursor-pointer">
                <Copy className="h-3.5 w-3.5" /> Copy Hex
              </Button>
              <Button size="sm" onClick={exportCSS} className="h-9 px-3.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5 cursor-pointer">
                <Download className="h-3.5 w-3.5" /> Export CSS
              </Button>
            </div>
          }
        />

        <GlassCard className="p-6 rounded-3xl border-border/80 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Base Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-14 h-10 p-1 rounded-xl cursor-pointer"
                />
                <Input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 h-10 rounded-xl font-mono text-sm uppercase"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Harmony Mode</Label>
              <Select value={harmony} onValueChange={setHarmony}>
                <SelectTrigger className="h-10 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complementary">Complementary (180° opposite)</SelectItem>
                  <SelectItem value="analogous">Analogous (Adjacent ±30°)</SelectItem>
                  <SelectItem value="triadic">Triadic (120° equilateral)</SelectItem>
                  <SelectItem value="tetradic">Tetradic / Square (90° angles)</SelectItem>
                  <SelectItem value="split-complementary">Split-Complementary (150° / 210°)</SelectItem>
                  <SelectItem value="monochromatic">Monochromatic (Lightness variations)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Render Harmonized Swatches */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
              <span>Harmonized Palette Result ({palette.length} colors)</span>
              <Badge variant="outline" className="text-[11px] font-mono text-primary border-primary/40">
                Mathematical HSL Wheel
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {palette.map((color, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/80 overflow-hidden shadow-xs group hover:scale-[1.02] transition-transform"
                >
                  <div
                    className="h-28 w-full flex items-end justify-end p-2"
                    style={{ backgroundColor: color }}
                  >
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(color);
                        toast.success(`Copied ${color}`);
                      }}
                      className="p-1.5 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                      title="Copy Hex"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="p-3 bg-card text-center font-mono">
                    <p className="text-xs font-bold text-foreground">{color}</p>
                    <p className="text-[10px] text-muted-foreground pt-0.5">
                      {idx === 0 ? "Base" : `Harmonic ${idx}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Pick Your Base Color",
              description: "Choose an initial brand or UI base color via the native color picker or hex input."
            },
            {
              step: "02",
              title: "Select Color Harmony Rule",
              description: "Switch between Complementary, Analogous, Triadic, Tetradic, Split-Complementary, or Monochromatic."
            },
            {
              step: "03",
              title: "Copy Swatches or Export CSS",
              description: "1-click copy individual hex codes or download a production-ready CSS variables stylesheet."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "Color Theory Mathematics",
              description: "Precise HSL rotational calculations around the standard 360-degree color wheel."
            },
            {
              title: "1-Click CSS Export",
              description: "Generates clean CSS custom property tokens (--color-harmony-1, etc.) ready for stylesheets."
            },
            {
              title: "Privacy First",
              description: "All calculations happen instantly in memory without sending data to any external server."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "What is complementary color harmony?",
              answer: "Complementary colors are pairs of colors located directly opposite each other on the 360° color wheel (180° apart), offering the highest contrast and visual impact."
            },
            {
              question: "What is the difference between analogous and triadic palettes?",
              answer: "Analogous colors are adjacent neighbors on the wheel (±30°), creating serene and comfortable designs. Triadic colors are evenly spaced at 120° intervals, producing vibrant, high-energy palettes."
            },
            {
              question: "Can I export these colors into Figma or CSS?",
              answer: "Yes, you can copy all hex codes directly to your clipboard or download a full CSS variables file."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/image/color-harmony" />
      </div>
    </div>
  );
}

export default ColorHarmonyClient;
