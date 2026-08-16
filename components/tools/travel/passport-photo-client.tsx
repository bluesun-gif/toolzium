"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useRef, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Crop, Download, Grid, Upload, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
const PASSPORT_SIZES = {
  "US": {
    name: "US/US Visa (2x2 inch / 51x51mm)",
    width: 600,
    height: 600,
    label: "51x51mm"
  },
  "UK": {
    name: "UK/EU/Schengen (35x45mm)",
    width: 413,
    height: 531,
    label: "35x45mm"
  },
  "AU": {
    name: "Australia/NZ (35x45mm)",
    width: 413,
    height: 531,
    label: "35x45mm"
  },
  "IN": {
    name: "India (51x51mm)",
    width: 600,
    height: 600,
    label: "51x51mm"
  },
  "CN": {
    name: "China (33x48mm)",
    width: 390,
    height: 567,
    label: "33x48mm"
  }
};
type StandardKey = keyof typeof PASSPORT_SIZES;
export function PassportPhotoClient() {
  const [standard, setStandard] = useState<StandardKey>("US");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setScale(1);
      setPosition({
        x: 0,
        y: 0
      });
    }
  };
  const handleReset = () => {
    setImageSrc(null);
    setScale(1);
    setPosition({
      x: 0,
      y: 0
    });
  };
  const currentSize = PASSPORT_SIZES[standard];
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const generateOutput = (type: "single" | "grid") => {
    if (!imageSrc) {
      toast.error("Please upload an image first.");
      return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // 1. Render cropped single photo
      const singleCanvas = document.createElement('canvas');
      singleCanvas.width = currentSize.width;
      singleCanvas.height = currentSize.height;
      const sCtx = singleCanvas.getContext('2d');
      if (sCtx) {
        sCtx.fillStyle = '#ffffff';
        sCtx.fillRect(0, 0, singleCanvas.width, singleCanvas.height);
        const drawScale = scale;
        const cw = singleCanvas.width;
        const ch = singleCanvas.height;
        const imgW = img.width * drawScale;
        const imgH = img.height * drawScale;
        sCtx.drawImage(img, (cw - imgW) / 2 + position.x, (ch - imgH) / 2 + position.y, imgW, imgH);
      }
      if (type === "single") {
        downloadCanvas(singleCanvas, "passport_photo.jpg");
      } else {
        // 4x6 print grid (1200x1800 px roughly for 300dpi)
        canvas.width = 1800; // 6 inches
        canvas.height = 1200; // 4 inches
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid (e.g., 2 rows, 3 columns)
        const cols = 3;
        const rows = 2;
        const gap = 50;
        const startX = (canvas.width - (currentSize.width * cols + gap * (cols - 1))) / 2;
        const startY = (canvas.height - (currentSize.height * rows + gap * (rows - 1))) / 2;
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            ctx.drawImage(singleCanvas, startX + j * (currentSize.width + gap), startY + i * (currentSize.height + gap));
            // draw subtle border for cutting
            ctx.strokeStyle = '#cccccc';
            ctx.lineWidth = 2;
            ctx.strokeRect(startX + j * (currentSize.width + gap), startY + i * (currentSize.height + gap), currentSize.width, currentSize.height);
          }
        }
        downloadCanvas(canvas, "passport_photo_grid_4x6.jpg");
      }
    };
    img.src = imageSrc;
  };
  const downloadCanvas = (cvs: HTMLCanvasElement, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = cvs.toDataURL("image/jpeg", 0.9);
    link.click();
    toast.success("Downloaded successfully!");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={ImageIcon} title="Passport Photo Crop & Grid" description="Format photos for passport & visa applications. Prepare a 4x6 print sheet." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid md:grid-cols-12 gap-6">
 <GlassCard className="md:col-span-4 h-fit">
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Select Standard</Label>
 <Select value={standard} onValueChange={(val: StandardKey) => setStandard(val)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {Object.entries(PASSPORT_SIZES).map(([key, val]) => <SelectItem key={key} value={key}>{val.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Upload Photo</Label>
 <div className="relative">
 <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
 <Button variant="outline" className="w-full">
 <Upload className="w-4 h-4 mr-2" /> Select Image
 </Button>
 </div>
 </div>

 {imageSrc && <div className="space-y-4">
 <div className="space-y-2">
 <Label>Zoom</Label>
 <input type="range" min="0.1" max="3" step="0.01" value={scale} onChange={e => setScale(parseFloat(e.target.value))} className="w-full" />
 </div>

 <div className="space-y-2 pt-4">
 <Button onClick={() => generateOutput("single")} className="w-full" variant="secondary">
 <Download className="w-4 h-4 mr-2" /> Download Single ({currentSize.label})
 </Button>
 <Button onClick={() => generateOutput("grid")} className="w-full">
 <Grid className="w-4 h-4 mr-2" /> Download 4x6 Print Grid
 </Button>
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-8">
 <CardHeader>
 <CardTitle>Editor</CardTitle>
 <CardDescription>Drag to pan, use slider to zoom. Align face with guides.</CardDescription>
 </CardHeader>
 <CardContent className="flex justify-center items-center p-4 bg-black/5 rounded-lg overflow-hidden min-h-[500px]">
 {!imageSrc ? <div className="text-center text-muted-foreground">
 <Crop className="w-12 h-12 mx-auto mb-2 opacity-50" />
 <p>Upload a photo to begin</p>
 </div> : <div ref={containerRef} className="relative bg-background shadow-xl overflow-hidden cursor-move" style={{
              width: currentSize.width / 1.5,
              height: currentSize.height / 1.5,
              maxWidth: '100%',
              aspectRatio: currentSize.width / currentSize.height
            }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp}>
 <img src={imageSrc} alt="Editor" className="absolute pointer-events-none" style={{
                transform: "translate(-50%, -50%) scale(" + scale + ") translate(" + position.x + "px," + position.y + "px)",
                left: "50%",
                top: "50%",
                transformOrigin: "center"
              }} />
 
 {/* Guidelines Overlay */}
 <div className="absolute inset-0 pointer-events-none border-2 border-primary/50">
 {/* Center lines */}
 <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-red-500/50" />
 
 {/* Head height guideline (approx top 10% to 15%) */}
 <div className="absolute top-[10%] left-0 right-0 border-t border-dashed border-red-500/80">
 <span className="text-[10px] text-red-500 bg-background/80 px-1 absolute -top-4 left-2">Top of Head</span>
 </div>
 
 {/* Eye level guideline (approx 45% from top) */}
 <div className="absolute top-[45%] left-0 right-0 border-t border-dashed border-red-500/80">
 <span className="text-[10px] text-red-500 bg-background/80 px-1 absolute -top-4 left-2">Eye Level</span>
 </div>

 {/* Chin guideline (approx 80% from top) */}
 <div className="absolute top-[80%] left-0 right-0 border-t border-dashed border-red-500/80">
 <span className="text-[10px] text-red-500 bg-background/80 px-1 absolute -top-4 left-2">Chin</span>
 </div>
 
 {/* Safe zone overlay */}
 <div className="absolute inset-x-8 top-[10%] bottom-[10%] border border-green-500/30 rounded-[50px] mix-blend-difference" />
 </div>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
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
          <h3>Why Use Our Passport Photo Crop & Grid?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Passport Photo Crop & Grid provides
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

      <RelatedTools currentToolUrl="/tools/travel/passport-photo" max={6} />

    </div></div>;
}