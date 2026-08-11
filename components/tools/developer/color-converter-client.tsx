"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { Palette, Eye, Droplet, Zap } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(cleaned)) return null;
  const full = cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
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
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorConverterClient() {
  const [hexInput, setHexInput] = useState("#3b82f6");

  const normalizedHex = useMemo(() => {
    const cleaned = hexInput.replace("#", "").trim();
    if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(cleaned)) return null;
    const full = cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned;
    return `#${full.toLowerCase()}`;
  }, [hexInput]);

  const rgb = useMemo(() => (normalizedHex ? hexToRgb(normalizedHex) : null), [normalizedHex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null), [rgb]);

  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "Invalid HEX";
  const hslString = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "Invalid HEX";
  const hexDisplay = normalizedHex ?? "Invalid HEX";

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        icon={Palette}
        title="Color Converter"
        description="Convert colors between HEX, RGB, and HSL formats with a live visual preview."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Droplet className="w-4 h-4 text-primary" /> Color Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-4">
            <div
              className="h-40 w-full rounded-xl border border-border/60 shadow-inner transition-colors"
              style={{ backgroundColor: normalizedHex ?? "#000000" }}
            />
            <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
              <input
                type="color"
                value={normalizedHex ?? "#000000"}
                onChange={(e) => setHexInput(e.target.value)}
                className="h-12 w-16 cursor-pointer rounded-lg border border-border/70 bg-transparent"
              />
              <Input
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                placeholder="#3b82f6 or 3b82f6"
                className="font-mono"
              />
            </div>
            {!normalizedHex && (
              <p className="text-xs text-red-500">Invalid HEX value. Use 3 or 6 hex characters.</p>
            )}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Eye className="w-4 h-4 text-primary" /> Converted Values
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-4">
            <div className="space-y-3">
              <div className="rounded-lg border border-border/60 bg-background/60 p-3">
                <div className="mb-1 text-xs font-medium text-muted-foreground">HEX</div>
                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono text-sm">{hexDisplay}</code>
                  <CopyButton getText={() => hexDisplay} label="Copy" />
                </div>
              </div>
              <div className="rounded-lg border border-border/60 bg-background/60 p-3">
                <div className="mb-1 text-xs font-medium text-muted-foreground">RGB</div>
                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono text-sm">{rgbString}</code>
                  <CopyButton getText={() => rgbString} label="Copy" />
                </div>
              </div>
              <div className="rounded-lg border border-border/60 bg-background/60 p-3">
                <div className="mb-1 text-xs font-medium text-muted-foreground">HSL</div>
                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono text-sm">{hslString}</code>
                  <CopyButton getText={() => hslString} label="Copy" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Pick or Type a Color", description: "Use the native color picker or type a HEX value directly into the input field.", icon: Droplet },
          { step: "02", title: "See Live Preview", description: "The swatch updates instantly so you can verify the exact color you selected.", icon: Eye },
          { step: "03", title: "Copy Any Format", description: "Grab HEX, RGB, or HSL strings and paste them into your CSS, Tailwind config, or design tool.", icon: Palette },
        ]}
        badges={["100% Free", "Client-Side", "No Signup"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Palette, title: "Three Formats", description: "Instantly convert between HEX, RGB, and HSL — the three most common color representations." },
          { icon: Eye, title: "Live Swatch", description: "Visual feedback ensures you pick exactly the color you intend." },
          { icon: Droplet, title: "3 & 6 Digit HEX", description: "Accepts shorthand (#fff) and full (#ffffff) HEX notation automatically." },
          { icon: Zap, title: "Native Color Picker", description: "Uses the browser's built-in color input for an intuitive selection experience." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>Colors can be represented in several equivalent ways, and different tools prefer different formats. Design applications like Figma often display HEX, CSS developers use HEX or RGB, and designers working with color theory think in HSL because it separates hue, saturation, and lightness into independent axes that are easy to reason about.</p>
          <p>HEX is a compact notation where each pair of digits encodes one color channel in base 16. RGB expresses the same information as three decimal values between 0 and 255. HSL, on the other hand, describes a color by its position on the color wheel (hue, 0–360°), its intensity (saturation, 0–100%), and its brightness (lightness, 0–100%). Converting between them is purely a mathematical transform — no data is lost.</p>
          <p>In modern CSS, all three formats are fully supported. HEX remains the most popular for simple color definitions, <code>rgb()</code> is handy when you need to add an alpha channel as <code>rgba()</code>, and <code>hsl()</code> is ideal when you want to derive variations (lighter, darker, more saturated) from a base hue programmatically. This tool gives you all three so you can choose whichever best fits your workflow.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "What is the difference between HEX and RGB?", answer: "They encode the same information. HEX uses base-16 notation (#RRGGBB) while RGB uses decimal triplets (rgb(r, g, b)). #ff8800 is identical to rgb(255, 136, 0)." },
          { question: "When should I use HSL?", answer: "HSL is best when you want to generate color variations. For example, reducing lightness gives a darker shade, and changing hue rotates the color around the wheel." },
          { question: "Does this support 8-digit HEX with alpha?", answer: "This converter focuses on 6-digit HEX. For alpha support, use rgba() or hsla() functions directly in CSS." },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/developer/color-converter" max={6} />
    </div>
  );
}
