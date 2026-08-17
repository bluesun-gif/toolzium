"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import { Button } from "@/components/ui/button";
import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import { Maximize2, Copy, Calculator } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const PRESETS = [{
  label: "16:9",
  w: 16,
  h: 9
}, {
  label: "4:3",
  w: 4,
  h: 3
}, {
  label: "1:1",
  w: 1,
  h: 1
}, {
  label: "21:9",
  w: 21,
  h: 9
}, {
  label: "3:2",
  w: 3,
  h: 2
}, {
  label: "9:16",
  w: 9,
  h: 16
}];
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
export default function AspectRatioClient() {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const ratio = useMemo(() => {
    if (width <= 0 || height <= 0) return {
      w: 0,
      h: 0,
      decimal: 0
    };
    const divisor = gcd(width, height);
    return {
      w: width / divisor,
      h: height / divisor,
      decimal: width / height
    };
  }, [width, height]);
  const calculatedDimension = useMemo(() => {
    if (ratio.w === 0 || ratio.h === 0) return null;
    if (targetWidth > 0) {
      return {
        type: "height",
        value: targetWidth * ratio.h / ratio.w
      };
    }
    if (targetHeight > 0) {
      return {
        type: "width",
        value: targetHeight * ratio.w / ratio.h
      };
    }
    return null;
  }, [ratio, targetWidth, targetHeight]);
  const applyPreset = (preset: typeof PRESETS[0]) => {
    setWidth(preset.w * 100);
    setHeight(preset.h * 100);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Maximize2} title="Aspect Ratio Calculator" description="Calculate aspect ratios and find matching dimensions for any width or height." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Maximize2 className="w-4 h-4 text-primary" /> Dimensions
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">Width (px)</label>
 <Input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} min={1} />
 </div>
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">Height (px)</label>
 <Input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} min={1} />
 </div>
 </div>

 <div className="p-4 bg-muted/40 rounded-lg text-center">
 <div className="text-3xl font-bold">{ratio.w}:{ratio.h}</div>
 <div className="text-sm text-muted-foreground mt-1">
 Aspect Ratio ({ratio.decimal.toFixed(3)})
 </div>
 <CopyButton getText={() => `${ratio.w}:${ratio.h}`} label="Copy Ratio" />
 </div>

 <div className="flex gap-2 flex-wrap">
 {PRESETS.map(preset => <Button key={preset.label} onClick={() => applyPreset(preset)} className="px-3 py-1 text-xs rounded-full border border-border/60 bg-background/60 hover:bg-muted/60 transition-colors">
 {preset.label}
 </Button>)}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Maximize2 className="w-4 h-4 text-primary" /> Calculate Matching Dimension
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">Target Width (px)</label>
 <Input type="number" value={targetWidth || ""} onChange={e => {
                setTargetWidth(Number(e.target.value));
                setTargetHeight(0);
              }} min={0} placeholder="Enter width" />
 </div>
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">Target Height (px)</label>
 <Input type="number" value={targetHeight || ""} onChange={e => {
                setTargetHeight(Number(e.target.value));
                setTargetWidth(0);
              }} min={0} placeholder="Enter height" />
 </div>
 </div>

 {calculatedDimension && <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">
 To maintain {ratio.w}:{ratio.h} ratio:
 </div>
 <div className="text-2xl font-bold">
 {calculatedDimension.type === "width" ? "Width" : "Height"}: {calculatedDimension.value.toFixed(2)} px
 </div>
 <CopyButton getText={() => calculatedDimension.value.toFixed(2)} label="Copy Value" />
 </div>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Dimensions",
        description: "Input your width and height to calculate the aspect ratio.",
        icon: Maximize2
      }, {
        step: "02",
        title: "View Ratio",
        description: "See the simplified ratio and decimal representation instantly.",
        icon: Copy
      }, {
        step: "03",
        title: "Calculate Match",
        description: "Enter a target dimension to find the matching width or height.",
        icon: Maximize2
      }]} badges={["100% Free", "Client-Side", "Instant"]} />

 <ToolFeatureGuides features={[{
        icon: Maximize2,
        title: "Ratio Simplification",
        description: "Automatically simplifies ratios to their lowest terms using GCD."
      }, {
        icon: Copy,
        title: "Common Presets",
        description: "Quick-select buttons for standard ratios like 16:9, 4:3, and 1:1."
      }, {
        icon: Maximize2,
        title: "Dimension Calculator",
        description: "Find matching width or height while maintaining your aspect ratio."
      }, {
        icon: Copy,
        title: "Decimal Display",
        description: "Shows both ratio format and decimal representation for precision."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Aspect ratio describes the proportional relationship between an image's width and height. It's expressed as two numbers separated by a colon (e.g., 16:9), representing how many units wide the image is for every unit of height. Understanding aspect ratios is crucial for video production, photography, web design, and display specifications.</p>
 <p>Common aspect ratios include 16:9 (widescreen video and modern displays), 4:3 (traditional TV and older monitors), 1:1 (square format popular on Instagram), and 21:9 (ultrawide displays). This calculator automatically simplifies ratios using the greatest common divisor, so 1920:1080 becomes the cleaner 16:9 representation.</p>
 <p>The dimension calculator helps you maintain aspect ratios when scaling images or videos. If you need a 16:9 video at 1280 pixels wide, the calculator instantly tells you the height should be 720 pixels. This is essential for responsive web design, video encoding, and ensuring images display correctly across different screen sizes without distortion or cropping.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "What does 16:9 mean?",
        answer: "16:9 means the width is 16 units for every 9 units of height. It's the standard widescreen format for HD video and modern displays."
      }, {
        question: "How do I maintain aspect ratio when resizing?",
        answer: "Use the calculator: enter your aspect ratio dimensions, then input either your target width or height to find the matching dimension."
      }, {
        question: "Why is my ratio showing large numbers?",
        answer: "The tool simplifies ratios automatically. If you see large numbers, try entering dimensions that share common factors, like 1920×1080 (which simplifies to 16:9)."
      }]} />
    </div>
    </div>
);
}
