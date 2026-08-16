"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useRef, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Download, Image as ImageIcon, Palette, Pipette, RefreshCw, ShieldCheck, Upload } from"lucide-react";
import toast from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useRef, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Palette, Upload, Download, RefreshCw, Image as ImageIcon, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function ColorSwapperClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [sourceColor, setSourceColor] = useState<string>("#ff0000");
  const [targetColor, setTargetColor] = useState<string>("#00ff00");
  const [tolerance, setTolerance] = useState<number>(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultSrc, setResultSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setResultSrc(null);
  };
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {
      r: 0,
      g: 0,
      b: 0
    };
  };
  const colorDistance = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) => {
    return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2));
  };
  const processImage = () => {
    if (!imageSrc || !canvasRef.current) return;
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const sRgb = hexToRgb(sourceColor);
      const tRgb = hexToRgb(targetColor);
      const maxDist = tolerance / 100 * 441.67; // sqrt(255^2 * 3) is ~441.67

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a === 0) continue;
        const dist = colorDistance(r, g, b, sRgb.r, sRgb.g, sRgb.b);
        if (dist <= maxDist) {
          // simple replacement, in a real tool you might blend based on distance
          data[i] = tRgb.r;
          data[i + 1] = tRgb.g;
          data[i + 2] = tRgb.b;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      setResultSrc(canvas.toDataURL("image/png"));
      setIsProcessing(false);
      toast.success("Image recolored!");
    };
    img.src = imageSrc;
  };
  const handleDownload = () => {
    if (!resultSrc) return;
    const a = document.createElement("a");
    a.href = resultSrc;
    a.download = "recolored.png";
    a.click();
  };
  const handleReset = () => {
    setImageSrc(null);
    setResultSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Palette} title="Image Color Swapper" description="Swap specific colors in your images locally in your browser." actions={<ResetButton onClick={handleReset} label="Reset Image" />} />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1 h-fit">
 <CardHeader>
 <CardTitle>Controls</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Upload Image</Label>
 <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => fileInputRef.current?.click()}>
 <Upload className="w-8 h-8 text-muted-foreground mb-2" />
 <span className="text-sm font-medium">Click to browse</span>
 </div>
 <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
 </div>

 <div className="space-y-4 pt-4 border-t">
 <div className="space-y-2">
 <Label>Source Color (to replace)</Label>
 <div className="flex gap-2">
 <Input type="color" value={sourceColor} onChange={e => setSourceColor(e.target.value)} className="w-12 p-1 h-10" />
 <Input type="text" value={sourceColor} onChange={e => setSourceColor(e.target.value)} className="flex-1 uppercase font-mono" />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Target Color (replacement)</Label>
 <div className="flex gap-2">
 <Input type="color" value={targetColor} onChange={e => setTargetColor(e.target.value)} className="w-12 p-1 h-10" />
 <Input type="text" value={targetColor} onChange={e => setTargetColor(e.target.value)} className="flex-1 uppercase font-mono" />
 </div>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Tolerance: {tolerance}%</Label>
 </div>
 <input type="range" min="0" max="100" value={tolerance} onChange={e => setTolerance(parseInt(e.target.value))} className="w-full accent-primary" />
 </div>
 </div>

 <Button className="w-full" onClick={processImage} disabled={!imageSrc || isProcessing}>
 {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
 Process Image
 </Button>
 
 {resultSrc && <Button className="w-full" variant="outline" onClick={handleDownload}>
 <Download className="w-4 h-4 mr-2" /> Download Result
 </Button>}
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader>
 <CardTitle>Preview</CardTitle>
 <CardDescription>Original vs Recolored</CardDescription>
 </CardHeader>
 <CardContent>
 {!imageSrc ? <div className="aspect-video bg-muted/20 rounded-xl flex flex-col items-center justify-center text-muted-foreground border border-dashed">
 <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
 <p>Upload an image to start</p>
 </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label className="text-muted-foreground text-xs uppercase tracking-wider">Original</Label>
 <img src={imageSrc} alt="Original" className="w-full rounded-lg shadow-sm border max-h-[400px] object-contain bg-muted/20" />
 </div>
 <div className="space-y-2">
 <Label className="text-muted-foreground text-xs uppercase tracking-wider">Recolored</Label>
 {resultSrc ? <img src={resultSrc} alt="Result" className="w-full rounded-lg shadow-sm border max-h-[400px] object-contain bg-muted/20" /> : <div className="w-full h-full min-h-[200px] rounded-lg shadow-sm border flex items-center justify-center bg-muted/10 text-muted-foreground text-sm">
 Waiting to process...
 </div>}
 </div>
 </div>}
 {/* Hidden canvas for processing */}
 <canvas ref={canvasRef} className="hidden" />
 </CardContent>
 </GlassCard>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Load the image.",
    icon: Upload,
  },
{
    step:"02",
    title:"Select",
    description:"Pick source and target colors.",
    icon: Pipette,
  },
{
    step:"03",
    title:"Swap",
    description:"Replace and export.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Upload,
    title:"Image Input",
    description:"From your device.",
  },
{
    icon: Pipette,
    title:"Color Pick",
    description:"Choose what to change.",
  },
{
    icon: Download,
    title:"Export",
    description:"Save swapped image.",
  },
{
    icon: ShieldCheck,
    title:"Privacy",
    description:"Local processing.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An image color swapper replaces a chosen color throughout a picture — handy for recoloring a product mockup, a logo variant, or a themed graphic without redrawing it. This tool samples the source color, swaps in a target, and exports the result.</p>
  <p>Pixel matching does the work; similar shades are caught so the change looks natural rather than patchy. Local processing keeps images private.</p>
  <p>Use it for quick recolors and A/B variants. The tool's value is editing color across an image in one action instead of manual selection.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does it do?",
    answer:"Replaces one color with another.",
  },
{
    question:"Precise?",
    answer:"Matches similar pixels.",
  },
{
    question:"Use case?",
    answer:"Recolor products, themes.",
  },
{
    question:"Private?",
    answer:"Yes, browser only.",
  },
{
    question:"Free?",
    answer:"Yes.",
  }
  ]}
/>
</div>
 );
}
=======
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Image Color Swapper?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Image Color Swapper provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/image/color-swapper" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
