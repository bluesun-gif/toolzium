"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { RectangleHorizontal, Image as ImageIcon, Maximize, Copy, Sparkles, Shield, Zap } from"lucide-react";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

const presets = [
 { label:"16:9 (Widescreen)", w: 16, h: 9 },
 { label:"4:3 (Standard)", w: 4, h: 3 },
 { label:"1:1 (Square)", w: 1, h: 1 },
 { label:"21:9 (Ultrawide)", w: 21, h: 9 },
 { label:"9:16 (Mobile/Stories)", w: 9, h: 16 },
 { label:"3:2 (Photography)", w: 3, h: 2 },
];

const socialPresets = [
 { label:"Instagram Post (Square)", w: 1080, h: 1080 },
 { label:"Instagram Portrait", w: 1080, h: 1350 },
 { label:"Instagram/FB Story", w: 1080, h: 1920 },
 { label:"Twitter Post", w: 1200, h: 675 },
 { label:"YouTube Thumbnail", w: 1280, h: 720 },
 { label:"Facebook Cover", w: 820, h: 312 },
];

export function AspectRatioClient() {
 const [ratioW, setRatioW] = useState<number |"">(16);
 const [ratioH, setRatioH] = useState<number |"">(9);
 const [dimW, setDimW] = useState<number |"">(1920);
 const [dimH, setDimH] = useState<number |"">(1080);

 const calculateRatioFromDims = (w: number, h: number) => {
 if (w && h) {
 const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
 const d = gcd(w, h);
 setRatioW(w / d);
 setRatioH(h / d);
 }
 };

 const handleRatioWChange = (val: string) => {
 const num = val ===""?"": Number(val);
 setRatioW(num);
 if (num && ratioH && dimW) {
 setDimH(Math.round((dimW as number) / num * (ratioH as number)));
 }
 };

 const handleRatioHChange = (val: string) => {
 const num = val ===""?"": Number(val);
 setRatioH(num);
 if (num && ratioW && dimW) {
 setDimH(Math.round((dimW as number) / (ratioW as number) * num));
 }
 };

 const handleDimWChange = (val: string) => {
 const num = val ===""?"": Number(val);
 setDimW(num);
 if (num && ratioW && ratioH) {
 setDimH(Math.round(num / (ratioW as number) * (ratioH as number)));
 } else if (num && dimH && !ratioW && !ratioH) {
 calculateRatioFromDims(num, dimH as number);
 }
 };

 const handleDimHChange = (val: string) => {
 const num = val ===""?"": Number(val);
 setDimH(num);
 if (num && ratioW && ratioH) {
 setDimW(Math.round(num / (ratioH as number) * (ratioW as number)));
 } else if (num && dimW && !ratioW && !ratioH) {
 calculateRatioFromDims(dimW as number, num);
 }
 };

 const applyPreset = (w: number, h: number) => {
 setRatioW(w);
 setRatioH(h);
 if (dimW) {
 setDimH(Math.round((dimW as number) / w * h));
 } else if (dimH) {
 setDimW(Math.round((dimH as number) / h * w));
 } else {
 setDimW(w * 100);
 setDimH(h * 100);
 }
 };

 const applySocialPreset = (w: number, h: number) => {
 setDimW(w);
 setDimH(h);
 calculateRatioFromDims(w, h);
 };

 const handleReset = () => {
 setRatioW("");
 setRatioH("");
 setDimW("");
 setDimH("");
 };

 const previewRatio = ratioW && ratioH ? `${ratioW} / ${ratioH}` : (dimW && dimH ? `${dimW} / ${dimH}` :"16 / 9");
 
 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader 
 icon={RectangleHorizontal} 
 title="Aspect Ratio Calculator"
 description="Calculate aspect ratios for images and video, resize with proportions, and find common social media sizes."
 actions={
 <ResetButton onClick={handleReset} label="Reset"/>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Calculator</CardTitle>
 <CardDescription>Enter ratio or dimensions</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-4">
 <Label>Ratio (W : H)</Label>
 <div className="flex items-center space-x-4">
 <Input 
 type="number"
 value={ratioW} 
 onChange={(e) => handleRatioWChange(e.target.value)} 
 placeholder="e.g. 16"
 />
 <span className="text-xl font-bold text-muted-foreground">:</span>
 <Input 
 type="number"
 value={ratioH} 
 onChange={(e) => handleRatioHChange(e.target.value)} 
 placeholder="e.g. 9"
 />
 </div>
 </div>

 <Separator />

 <div className="space-y-4">
 <div className="flex justify-between items-center">
 <Label>Dimensions (W × H)</Label>
 {(dimW && dimH) ? (
 <CopyButton getText={() => `${dimW}x${dimH}`} label="Copy"/>
 ) : null}
 </div>
 <div className="flex items-center space-x-4">
 <Input 
 type="number"
 value={dimW} 
 onChange={(e) => handleDimWChange(e.target.value)} 
 placeholder="Width"
 />
 <span className="text-xl font-bold text-muted-foreground">×</span>
 <Input 
 type="number"
 value={dimH} 
 onChange={(e) => handleDimHChange(e.target.value)} 
 placeholder="Height"
 />
 </div>
 </div>

 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Visual Preview</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="w-full h-48 bg-muted/50 border rounded-md flex items-center justify-center p-4">
 <div 
 className="bg-primary/20 border-2 border-primary rounded-sm transition-all duration-300 flex items-center justify-center overflow-hidden text-primary font-medium shadow-sm"
 style={{ 
 aspectRatio: previewRatio,
 maxHeight: '100%',
 maxWidth: '100%',
 width: (ratioW && ratioH) && ratioW > ratioH ? '100%' : 'auto',
 height: (ratioW && ratioH) && ratioH >= ratioW ? '100%' : 'auto'
 }}
 >
 {ratioW && ratioH ? `${ratioW}:${ratioH}` : (dimW && dimH ? `${dimW}x${dimH}` :"16:9")}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Presets</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Common Ratios</Label>
 <div className="flex flex-wrap gap-2">
 {presets.map((preset) => (
 <Button 
 key={preset.label} 
 variant="outline"
 size="sm"
 onClick={() => applyPreset(preset.w, preset.h)}
 >
 {preset.label}
 </Button>
 ))}
 </div>
 </div>

 <div className="space-y-2">
 <Label>Social Media Sizes</Label>
 <Select onValueChange={(val) => {
 const p = socialPresets.find(p => p.label === val);
 if (p) applySocialPreset(p.w, p.h);
 }}>
 <SelectTrigger>
 <SelectValue placeholder="Select platform size..."/>
 </SelectTrigger>
 <SelectContent>
 {socialPresets.map((preset) => (
 <SelectItem key={preset.label} value={preset.label}>
 {preset.label} ({preset.w}x{preset.h})
 </SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Aspect Ratio Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Aspect Ratio Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/image/aspect-ratio" max={6} />

</div>
 );
}
