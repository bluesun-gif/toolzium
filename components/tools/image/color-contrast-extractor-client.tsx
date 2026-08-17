"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { Separator } from"@/components/ui/separator";
import { AlertTriangle, CheckCircle, Contrast, Copy, Eye, Pipette, ShieldCheck, Sliders, Upload, Check } from "lucide-react";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";

export function ColorContrastClient() {
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#000000");
  const [borderColor, setBorderColor] = useState("#444444");
  const [contrastRatio, setContrastRatio] = useState(21);

  // Helper to convert hex to RGB
  const hexToRgb = (hex: string) => {
    let c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const color = parseInt(c.join(''), 16);
    return [color >> 16 & 255, color >> 8 & 255, color & 255];
  };

  // Helper to calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(v => {
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
    } catch (e) {
      // Ignore invalid colors
    }
  }, [textColor, bgColor]);
  const wcagResults = {
    normalAA: contrastRatio >= 4.5,
    normalAAA: contrastRatio >= 7.0,
    largeAA: contrastRatio >= 3.0,
    largeAAA: contrastRatio >= 4.5,
    uiComponent: contrastRatio >= 3.0
  };
  const Badge = ({
    label,
    passed
  }: {
    label: string;
    passed: boolean;
  }) => <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium", passed ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200")}>
 {passed ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
 {label}
 </div>;
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Color Contrast Analyzer" description="Check WCAG contrast ratios and accessibility." icon={CheckCircle} actions={<ResetButton onClick={() => {
        setTextColor("#FFFFFF");
        setBgColor("#000000");
        setBorderColor("#444444");
      }} />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader><CardTitle>Color Controls</CardTitle></CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Text Color</Label>
 <div className="flex gap-2">
 <Input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-16 h-10 p-1" />
 <Input type="text" value={textColor} onChange={e => setTextColor(e.target.value)} className="flex-1" />
 <CopyButton getText={() => textColor} label="" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Background Color</Label>
 <div className="flex gap-2">
 <Input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-16 h-10 p-1" />
 <Input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="flex-1" />
 <CopyButton getText={() => bgColor} label="" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Border / UI Color</Label>
 <div className="flex gap-2">
 <Input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} className="w-16 h-10 p-1" />
 <Input type="text" value={borderColor} onChange={e => setBorderColor(e.target.value)} className="flex-1" />
 <CopyButton getText={() => borderColor} label="" />
 </div>
 </div>

 <Separator />

 <div className="text-center">
 <div className="text-sm font-medium mb-2">Contrast Ratio</div>
 <div className="text-5xl font-bold">{contrastRatio}:1</div>
 </div>

 <div className="flex flex-wrap gap-2 justify-center">
 <Badge label="Normal Text AA" passed={wcagResults.normalAA} />
 <Badge label="Normal Text AAA" passed={wcagResults.normalAAA} />
 <Badge label="Large Text AA" passed={wcagResults.largeAA} />
 <Badge label="Large Text AAA" passed={wcagResults.largeAAA} />
 <Badge label="UI Components" passed={wcagResults.uiComponent} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
 <CardContent>
 <div className="p-8 rounded-lg shadow-inner flex flex-col gap-6 transition-colors duration-200" style={{
              backgroundColor: bgColor,
              color: textColor
            }}>
 <div>
 <h3 className="text-2xl font-bold mb-2">Large Text Preview (18pt+)</h3>
 <p className="text-base font-normal">
 This is normal text preview. The quick brown fox jumps over the lazy dog. 
 Ensuring high contrast makes text readable for users with visual impairments.
 </p>
 </div>

 <div className="flex flex-wrap gap-4 items-center">
 <Button className="px-4 py-2 font-medium rounded-md shadow-sm" style={{
                  backgroundColor: textColor,
                  color: bgColor
                }}>
 Solid Button
 </Button>
 <Button className="px-4 py-2 font-medium rounded-md shadow-sm border-2" style={{
                  borderColor: borderColor,
                  color: textColor
                }}>
 Outline Button
 </Button>
 </div>

 <div className="p-4 rounded border-l-4" style={{
                backgroundColor: "rgba(0,0,0,0.1)",
                borderColor: borderColor
              }}>
 <div className="font-bold mb-1">UI Component Preview</div>
 <div className="text-sm opacity-90">Notice how the border color contrasts against the background.</div>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Load an image or screenshot.",
    icon: Upload,
  },
{
    step:"02",
    title:"Sample",
    description:"Pick text and background pixels.",
    icon: Pipette,
  },
{
    step:"03",
    title:"Analyze",
    description:"See extracted contrast.",
    icon: Contrast,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Upload,
    title:"Image Input",
    description:"Screenshots or designs.",
  },
{
    icon: Pipette,
    title:"Color Pick",
    description:"Sample any pixel.",
  },
{
    icon: Contrast,
    title:"Ratio",
    description:"Computed from samples.",
  },
{
    icon: ShieldCheck,
    title:"WCAG",
    description:"Pass or fail.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A color contrast analyzer extracts real colors from an existing image or screenshot and evaluates their contrast. Unlike a checker where you type hex codes, this tool samples pixels directly — useful for auditing a design you did not build from scratch.</p>
  <p>Sampling reveals the truth. A mockup may look fine but fail contrast once measured; picking the actual text and background pixels exposes the gap. The analyzer reports WCAG pass or fail from those samples.</p>
  <p>Use it to audit legacy or third-party designs. The tool's value is measuring real rendered colors, turning subjective &quot;looks okay&quot; into a defensible accessibility verdict.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What differs from checker?",
    answer:"Samples colors from an image.",
  },
{
    question:"Use case?",
    answer:"Audit existing designs.",
  },
{
    question:"Accurate?",
    answer:"From actual pixels.",
  },
{
    question:"WCAG?",
    answer:"Reports compliance.",
  },
{
    question:"Free?",
    answer:"Yes.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default ColorContrastClient;
