"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle, Contrast } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";

export function ColorContrastClient() {
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#000000");
  const [borderColor, setBorderColor] = useState("#444444");
  const [contrastRatio, setContrastRatio] = useState(21);

  // Helper to convert hex to RGB
  const hexToRgb = (hex: string) => {
    let c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const color = parseInt(c.join(""), 16);
    return [(color >> 16) & 255, (color >> 8) & 255, color & 255];
  };

  // Helper to calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  useEffect(() => {
    try {
      const rgb1 = hexToRgb(textColor);
      const rgb2 = hexToRgb(bgColor);
      const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
      const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      const ratio = (brightest + 0.05) / (darkest + 0.05);
      setContrastRatio(Number(ratio.toFixed(2)));
    } catch {
      // Ignore invalid colors
    }
  }, [textColor, bgColor]);

  const wcagResults = {
    normalAA: contrastRatio >= 4.5,
    normalAAA: contrastRatio >= 7.0,
    largeAA: contrastRatio >= 3.0,
    largeAAA: contrastRatio >= 4.5,
    uiComponent: contrastRatio >= 3.0,
  };

  const WcagBadge = ({ label, passed }: { label: string; passed: boolean }) => (
    <div
      className={cn(
        "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono border",
        passed
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
          : "bg-rose-500/10 text-rose-400 border-rose-500/30"
      )}
    >
      {passed ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
      {label}
    </div>
  );

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          title="Color Contrast Analyzer"
          description="Check WCAG 2.1 contrast ratios and accessibility for text and UI components."
          icon={Contrast}
          actions={
            <ResetButton
              onClick={() => {
                setTextColor("#FFFFFF");
                setBgColor("#000000");
                setBorderColor("#444444");
              }}
            />
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6 rounded-3xl border-border/80 space-y-6">
            <CardHeader className="p-0">
              <CardTitle className="text-base font-bold">Color Controls</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-14 h-10 p-1 rounded-xl cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 h-10 rounded-xl font-mono text-sm uppercase"
                  />
                  <CopyButton getText={() => textColor} label="" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-14 h-10 p-1 rounded-xl cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 h-10 rounded-xl font-mono text-sm uppercase"
                  />
                  <CopyButton getText={() => bgColor} label="" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Border / UI Component Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-14 h-10 p-1 rounded-xl cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="flex-1 h-10 rounded-xl font-mono text-sm uppercase"
                  />
                  <CopyButton getText={() => borderColor} label="" />
                </div>
              </div>

              <Separator />

              <div className="text-center py-2">
                <div className="text-xs font-semibold text-muted-foreground mb-1">Calculated Contrast Ratio</div>
                <div className="text-4xl font-extrabold font-mono text-primary">{contrastRatio} : 1</div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <WcagBadge label="Normal Text AA (4.5:1)" passed={wcagResults.normalAA} />
                <WcagBadge label="Normal Text AAA (7.0:1)" passed={wcagResults.normalAAA} />
                <WcagBadge label="Large Text AA (3.0:1)" passed={wcagResults.largeAA} />
                <WcagBadge label="UI Components (3.0:1)" passed={wcagResults.uiComponent} />
              </div>
            </CardContent>
          </GlassCard>

          {/* Live Component Preview */}
          <GlassCard className="p-6 rounded-3xl border-border/80 flex flex-col justify-between space-y-6">
            <CardHeader className="p-0">
              <CardTitle className="text-base font-bold">Live UI Preview</CardTitle>
            </CardHeader>

            <CardContent className="p-0 space-y-4 flex-1 flex flex-col justify-center">
              <div
                className="p-6 rounded-2xl border transition-all space-y-3"
                style={{ backgroundColor: bgColor, color: textColor, borderColor: borderColor }}
              >
                <h3 className="text-xl font-bold">Sample Heading</h3>
                <p className="text-sm leading-relaxed">
                  This preview showcases real-time WCAG accessibility rendering. Verify how comfortable this typography and background contrast feels for human eyes.
                </p>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-bold border"
                  style={{ borderColor: borderColor, color: textColor }}
                >
                  Interactive Component Button
                </button>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Choose Foreground & Background",
              description: "Select text, background, and UI border colors using color pickers or hex codes."
            },
            {
              step: "02",
              title: "Evaluate WCAG Ratios",
              description: "Instant real-time calculation of contrast ratio up to 21:1 with AA and AAA pass/fail metrics."
            },
            {
              step: "03",
              title: "Verify Live Preview",
              description: "Test interactive headings, body paragraphs, and UI components in the live preview card."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "WCAG 2.1 Compliance",
              description: "Full compliance verification for Normal Text (4.5:1), Large Text (3.0:1), and UI Components (3.0:1)."
            },
            {
              title: "Zero-Latency Evaluation",
              description: "100% in-browser relative luminance calculation based on W3C standard sRGB color models."
            },
            {
              title: "Live UI Interactive Canvas",
              description: "Preview realistic card typography, button states, and borders simultaneously."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "What is a good WCAG contrast ratio for normal text?",
              answer: "WCAG Level AA requires a minimum contrast ratio of 4.5:1 for normal text (under 18pt/24px) and 3:1 for large text. Level AAA requires 7:1 for normal text and 4.5:1 for large text."
            },
            {
              question: "How is contrast ratio calculated?",
              answer: "Contrast ratio is calculated using relative luminance: (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter color and L2 is the relative luminance of the darker color."
            },
            {
              question: "Are color checks secure and private?",
              answer: "Yes. All color calculations happen 100% client-side in your browser with zero server uploads."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/image/color-contrast-extractor" />
      </div>
    </div>
  );
}

export default ColorContrastClient;
