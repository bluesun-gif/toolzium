"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Pipette, ImageIcon, Palette, Copy, Upload, Sparkles, Shield, Zap } from "lucide-react";
;
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type ExtractedColor = {
  hex: string;
  rgb: string;
  hsl: string;
  count: number;
};

// Simple helper to convert rgb to hex
const rgbToHex = (r: number, g: number, b: number) => "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");

// Simple helper to convert rgb to hsl
const rgbToHsl = (r: number, g: number, b: number) => {
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
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};
export function ColorExtractorClient() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      extractColors(url);
    }
  };
  const extractColors = (src: string) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", {
        willReadFrequently: true
      });
      if (!ctx) return;

      // Scale down image for faster processing
      const maxDim = 200;
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height *= maxDim / width;
          width = maxDim;
        } else {
          width *= maxDim / height;
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height).data;
      const colorMap: Record<string, {
        r: number;
        g: number;
        b: number;
        count: number;
      }> = {};

      // Quantization factor to group similar colors (higher = more grouping)
      const q = 32;
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        if (a < 128) continue; // Skip transparent pixels

        // Group colors by quantizing
        const qr = Math.floor(r / q) * q + q / 2;
        const qg = Math.floor(g / q) * q + q / 2;
        const qb = Math.floor(b / q) * q + q / 2;
        const key = `${qr},${qg},${qb}`;
        if (!colorMap[key]) {
          colorMap[key] = {
            r: Math.min(255, qr),
            g: Math.min(255, qg),
            b: Math.min(255, qb),
            count: 0
          };
        }
        colorMap[key].count++;
      }
      const sortedColors = Object.values(colorMap).sort((a, b) => b.count - a.count).slice(0, 6).map(c => {
        const r = Math.round(c.r);
        const g = Math.round(c.g);
        const b = Math.round(c.b);
        return {
          hex: rgbToHex(r, g, b),
          rgb: `rgb(${r}, ${g}, ${b})`,
          hsl: rgbToHsl(r, g, b),
          count: c.count
        };
      });
      setColors(sortedColors);
      setIsProcessing(false);
    };
    img.src = src;
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${text}`);
  };
  const cssPalette = `:root {\n${colors.map((c, i) => ` --color-${i + 1}: ${c.hex};`).join("\n")}\n}`;
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Pipette} title="Image Color Extractor" description="Upload an image to extract its dominant colors and create a color palette." actions={<ResetButton onClick={() => {
        setImageUrl(null);
        setColors([]);
      }} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Image Upload</CardTitle>
 </CardHeader>
 <CardContent>
 {!imageUrl ? <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:bg-muted/50 transition-colors relative">
 <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
 <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
 <h3 className="font-medium mb-1">Click or drag image to upload</h3>
 <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP</p>
 </div> : <div className="space-y-4">
 <div className="relative rounded-xl overflow-hidden border border-border bg-black/5 flex items-center justify-center h-[300px]">
 <img src={imageUrl} alt="Uploaded" className="max-w-full max-h-full object-contain" />
 </div>
 <div className="flex justify-center">
 <Button variant="outline" className="relative">
 <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
 <Upload className="w-4 h-4 mr-2" /> Upload Different Image
 </Button>
 </div>
 </div>}
 {/* Hidden canvas for processing */}
 <canvas ref={canvasRef} className="hidden" />
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Extracted Palette</CardTitle>
 </CardHeader>
 <CardContent>
 {isProcessing ? <div className="py-12 text-center text-muted-foreground">Extracting colors...</div> : colors.length > 0 ? <div className="space-y-6">
 {/* Palette Strip */}
 <div className="flex h-16 rounded-lg overflow-hidden shadow-sm border border-border">
 {colors.map((c, i) => <div key={i} className="flex-1 cursor-pointer transition-transform hover:scale-105 origin-center" style={{
                    backgroundColor: c.hex
                  }} onClick={() => copyToClipboard(c.hex)} title={`Copy ${c.hex}`} />)}
 </div>

 {/* Color Swatches */}
 <div className="grid gap-3">
 {colors.map((c, i) => <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card/50 hover:bg-muted/50 transition-colors">
 <div className="w-12 h-12 rounded-md shadow-sm border border-border/50 flex-shrink-0 cursor-pointer" style={{
                      backgroundColor: c.hex
                    }} onClick={() => copyToClipboard(c.hex)} />
 <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm font-mono">
 <Button onClick={() => copyToClipboard(c.hex)} className="text-left hover:text-primary truncate">{c.hex.toUpperCase()}</Button>
 <Button onClick={() => copyToClipboard(c.rgb)} className="text-left text-muted-foreground hover:text-primary truncate">{c.rgb}</Button>
 <Button onClick={() => copyToClipboard(c.hsl)} className="text-left text-muted-foreground hover:text-primary truncate">{c.hsl}</Button>
 </div>
 </div>)}
 </div>

 <Separator />

 <div>
 <div className="flex items-center justify-between mb-2">
 <Label className="text-muted-foreground block">CSS Variables</Label>
 <CopyButton getText={() => cssPalette} label="Copy CSS" />
 </div>
 <textarea readOnly value={cssPalette} className="w-full h-32 p-3 text-xs font-mono bg-muted rounded-md border border-border focus:outline-none resize-none" />
 </div>
 </div> : <div className="py-12 text-center text-muted-foreground flex flex-col items-center">
 <Palette className="w-12 h-12 mb-3 opacity-20" />
 <p>Upload an image to extract its color palette</p>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Load an image.",
    icon: Upload,
  },
{
    step:"02",
    title:"Extract",
    description:"Pull dominant colors.",
    icon: Pipette,
  },
{
    step:"03",
    title:"Copy",
    description:"Grab hex codes.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Upload,
    title:"Image Input",
    description:"Photos or graphics.",
  },
{
    icon: Pipette,
    title:"Dominant Colors",
    description:"Top palette from image.",
  },
{
    icon: Copy,
    title:"Hex Codes",
    description:"One-click copy.",
  },
{
    icon: Palette,
    title:"Palette",
    description:"Build themes fast.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An image color extractor pulls a palette from any picture, turning a photo or artwork into usable hex codes. Designers borrow palettes from inspiration; marketers match brand colors to imagery. This tool surfaces the dominant colors so you can reuse them consistently.</p>
  <p>The output is practical: copy-ready hex values you can drop into CSS or design tools. Averaging the most representative pixels yields a coherent palette rather than noise.</p>
  <p>Use it to derive themes from real visuals. The tool's value is converting an image's mood into an exact, reusable color set in seconds.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How does it work?",
    answer:"Analyzes pixel distribution.",
  },
{
    question:"Use cases?",
    answer:"Branding, theming, art.",
  },
{
    question:"How many colors?",
    answer:"Several dominant swatches.",
  },
{
    question:"Exact?",
    answer:"Representative averages.",
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
