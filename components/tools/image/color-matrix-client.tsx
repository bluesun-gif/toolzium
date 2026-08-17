"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { CheckCircle2, XCircle, Plus, Trash2, Shield, Eye, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface ColorItem {
  id: string;
  name: string;
  hex: string;
}

function getLuminance(hex: string): number {
  const rgb = hex.replace("#", "").match(/.{1,2}/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0];
  const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrast(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function ColorMatrixClient() {
  const [colors, setColors] = useState<ColorItem[]>([
    { id: "1", name: "Dark Slate", hex: "#0f172a" },
    { id: "2", name: "Pure White", hex: "#ffffff" },
    { id: "3", name: "Primary Blue", hex: "#2563eb" },
    { id: "4", name: "Muted Gray", hex: "#64748b" }
  ]);
  const [newName, setNewName] = useState("");
  const [newHex, setNewHex] = useState("#10b981");

  const addColor = () => {
    if (!newName.trim()) {
      toast.error("Enter color name.");
      return;
    }
    setColors([...colors, { id: Date.now().toString(), name: newName.trim(), hex: newHex }]);
    setNewName("");
    toast.success("Added color token!");
  };

  const removeColor = (id: string) => {
    if (colors.length <= 2) {
      toast.error("Must have at least 2 colors to compare.");
      return;
    }
    setColors(colors.filter(c => c.id !== id));
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Eye}
          title="Color Palette Matrix Generator"
          description="Evaluate color combinations against WCAG 2.2 AA and AAA accessibility standards in a multi-token matrix."
        />

        {/* Add Color Card */}
        <GlassCard>
          <CardHeader>
            <CardTitle>Palette Color Tokens</CardTitle>
            <CardDescription>Add the design tokens used across your UI background and text elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[180px]">
                <Input placeholder="Token Name (e.g. Card Bg)" value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Input type="color" value={newHex} onChange={e => setNewHex(e.target.value)} className="w-12 h-10 p-1 cursor-pointer" />
                <Input value={newHex} onChange={e => setNewHex(e.target.value)} className="w-28 font-mono" />
              </div>
              <Button onClick={addColor}>
                <Plus className="w-4 h-4 mr-2" /> Add Color
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {colors.map(c => (
                <div key={c.id} className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border bg-background/60 text-xs">
                  <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: c.hex }} />
                  <span className="font-semibold">{c.name}</span>
                  <span className="font-mono text-muted-foreground">{c.hex}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeColor(c.id)} className="h-5 w-5 ml-1 text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>

        {/* Matrix Table */}
        <GlassCard>
          <CardHeader>
            <CardTitle>Cross-Comparison Matrix</CardTitle>
            <CardDescription>Rows represent Backgrounds, Columns represent Text/Foregrounds</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-muted/40">
                  <th className="p-3 text-left border-b font-medium">BG \ Text</th>
                  {colors.map(fg => (
                    <th key={fg.id} className="p-3 text-center border-b font-medium">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: fg.hex }} />
                        <span>{fg.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {colors.map(bg => (
                  <tr key={bg.id} className="hover:bg-muted/20">
                    <td className="p-3 font-semibold border-b">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: bg.hex }} />
                        <span>{bg.name}</span>
                      </div>
                    </td>
                    {colors.map(fg => {
                      if (bg.id === fg.id) {
                        return (
                          <td key={fg.id} className="p-3 text-center border-b text-muted-foreground/40 font-mono">
                            -
                          </td>
                        );
                      }
                      const ratio = getContrast(bg.hex, fg.hex);
                      const passAA = ratio >= 4.5;
                      const passAAA = ratio >= 7.0;

                      return (
                        <td key={fg.id} className="p-2 text-center border-b">
                          <div
                            className="p-2 rounded-md font-medium flex flex-col items-center justify-center transition-all border"
                            style={{ backgroundColor: bg.hex, color: fg.hex, borderColor: passAA ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)" }}
                          >
                            <span className="font-bold text-sm font-mono">{ratio.toFixed(2)}:1</span>
                            <span className="text-[10px] mt-0.5 opacity-90">
                              {passAAA ? "AAA Pass" : passAA ? "AA Pass" : "Fail"}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </GlassCard>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Add Palette Tokens", description: "Enter all brand and surface color HEX codes.", icon: Eye },
            { step: "02", title: "Evaluate Cross Matrix", description: "Grid automatically calculates contrast ratios between every background and text pairing.", icon: Sparkles },
            { step: "03", title: "Ensure WCAG Compliance", description: "Verify that body text pairs score at least 4.5:1 (AA) and large text scores 3.0:1.", icon: Shield }
          ]}
          badges={["WCAG 2.2 Standard", "AA & AAA Testing", "100% Free Forever"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Eye, title: "Multi-Token Cross Matrix", description: "Test up to dozens of background and foreground pairs simultaneously." },
            { icon: Shield, title: "WCAG 2.2 Standard Compliant", description: "Calculates precise relative luminance following W3C formulas." },
            { icon: Sparkles, title: "Live Preview Rendering", description: "Displays simulated text against real background token swatches." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Designing for Universal Accessibility (WCAG 2.2)</h3>
            <p>
              Under W3C Web Content Accessibility Guidelines (WCAG 2.2), standard body copy must achieve a minimum contrast ratio of 4.5:1 against its background surface to satisfy Level AA. For Level AAA, a minimum ratio of 7.0:1 is required.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "What is the difference between AA and AAA contrast?", answer: "WCAG Level AA requires a 4.5:1 ratio for standard text and 3:1 for large text (18pt+). Level AAA requires a 7:1 ratio for normal text and 4.5:1 for large text." },
            { question: "Is this calculation performed locally?", answer: "Yes, all relative luminance and contrast ratios are calculated mathematically inside your browser." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/image/color-matrix" max={6} />
      </div>
    </div>
  );
}

export default ColorMatrixClient;
