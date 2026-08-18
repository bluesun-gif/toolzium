"use client";

import { Input } from "@/components/ui/input";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useRef, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Download, RefreshCw, ShieldCheck, Sliders, SlidersHorizontal, Upload } from"lucide-react";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { toast } from"react-hot-toast";

type Mode ="Binary"|"Inverted"|"Otsu"|"Grayscale";

export function ColorThresholdClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(128);
  const [mode, setMode] = useState<Mode>("Binary");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };
  const processImage = () => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let appliedThreshold = threshold;

      // Otsu's thresholding calculation
      if (mode === "Otsu") {
        const hist = new Array(256).fill(0);
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          hist[Math.floor(gray)]++;
        }
        const total = data.length / 4;
        let sum = 0;
        for (let i = 0; i < 256; i++) sum += i * hist[i];
        let sumB = 0;
        let wB = 0;
        let wF = 0;
        let varMax = 0;
        for (let i = 0; i < 256; i++) {
          wB += hist[i];
          if (wB === 0) continue;
          wF = total - wB;
          if (wF === 0) break;
          sumB += i * hist[i];
          const mB = sumB / wB;
          const mF = (sum - sumB) / wF;
          const varBetween = wB * wF * (mB - mF) * (mB - mF);
          if (varBetween > varMax) {
            varMax = varBetween;
            appliedThreshold = i;
          }
        }
        setThreshold(appliedThreshold);
      }
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        let val = 0;
        if (mode === "Grayscale") {
          val = gray;
        } else if (mode === "Binary" || mode === "Otsu") {
          val = gray >= appliedThreshold ? 255 : 0;
        } else if (mode === "Inverted") {
          val = gray >= appliedThreshold ? 0 : 255;
        }
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      }
      ctx.putImageData(imageData, 0, 0);
    };
  };
  useEffect(() => {
    processImage();
  }, [imageSrc, threshold, mode]);
  const downloadImage = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "thresholded-image.png";
    a.click();
    toast.success("Image downloaded!");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Sliders} title="Image Color Threshold & Binarizer" description="Convert images to high-contrast black & white or binary." actions={<>
 <ActionButton onClick={downloadImage} icon={Download} label="Download PNG" />
 <ResetButton onClick={() => {
          setImageSrc(null);
          setThreshold(128);
        }} label="Reset" />
 </>} />

 <GlassCard>
 <CardHeader>
 <CardTitle>Controls</CardTitle>
 <CardDescription>Upload an image and adjust the threshold settings.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex flex-col sm:flex-row items-end gap-4">
 <div className="w-full sm:w-1/3">
 <Label className="mb-2 block">Upload Image</Label>
 <div className="relative">
 <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
 <div className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md border border-border">
 <Upload className="w-4 h-4" />
 <span>Choose File</span>
 </div>
 </div>
 </div>
 
 <div className="w-full sm:w-1/3">
 <Label className="mb-2 block">Processing Mode</Label>
 <Select value={mode} onValueChange={(val: Mode) => setMode(val)}>
 <SelectTrigger>
 <SelectValue placeholder="Mode" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="Binary">Binary B&W</SelectItem>
 <SelectItem value="Inverted">Inverted B&W</SelectItem>
 <SelectItem value="Otsu">Otsu Auto Threshold</SelectItem>
 <SelectItem value="Grayscale">Grayscale</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className="w-full sm:w-1/3 space-y-2">
 <Label>Threshold: {threshold}</Label>
 <input type="range" min="0" max="255" value={threshold} onChange={e => setThreshold(Number(e.target.value))} disabled={mode === "Otsu" || mode === "Grayscale"} className="w-full" />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Preview</CardTitle>
 </CardHeader>
 <CardContent className="flex justify-center overflow-auto bg-muted/20 p-4 rounded-md">
 {imageSrc ? <canvas ref={canvasRef} className="max-w-full h-auto border border-border bg-background" /> : <div className="text-muted-foreground py-12 flex flex-col items-center">
 <RefreshCw className="w-8 h-8 mb-4 opacity-50" />
 <p>Upload an image to see the preview</p>
 </div>}
 </CardContent>
 </GlassCard>
 
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
    title:"Set Threshold",
    description:"Choose a cutoff value.",
    icon: SlidersHorizontal,
  },
{
    step:"03",
    title:"Apply",
    description:"Binarize and export.",
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
    icon: SlidersHorizontal,
    title:"Threshold",
    description:"Tune the cutoff.",
  },
{
    icon: Download,
    title:"Export",
    description:"Black-and-white result.",
  },
{
    icon: ShieldCheck,
    title:"Privacy",
    description:"Local processing.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An image threshold tool converts a picture into a high-contrast two-tone version by a brightness cutoff. Useful for stamping, stencils, OCR prep, or graphic effects, it reduces visual noise to pure black and white. This tool lets you tune the cutoff and export.</p>
  <p>The cutoff controls detail. A higher threshold keeps more dark areas; a lower one more light. Adjusting reveals the level that best serves your purpose, whether legibility or artistic.</p>
  <p>Use it to simplify images for print or processing. The tool's value is fast, local binarization without heavy software.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/image/color-threshold" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What is thresholding?",
    answer:"Turns image to two tones by a cutoff.",
  },
{
    question:"Use case?",
    answer:"Prep for printing, OCR, art.",
  },
{
    question:"Tunable?",
    answer:"Yes, adjust the level.",
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
    </div>
);
}

export default ColorThresholdClient;
