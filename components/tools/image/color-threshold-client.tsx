"use client";

import React, { useState, useRef, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Sliders, Upload, Download, RefreshCw, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
 img.crossOrigin ="anonymous";
 img.src = imageSrc;
 img.onload = () => {
 canvas.width = img.width;
 canvas.height = img.height;
 ctx.drawImage(img, 0, 0);

 const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
 const data = imageData.data;

 let appliedThreshold = threshold;
 
 // Otsu's thresholding calculation
 if (mode ==="Otsu") {
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
 if (mode ==="Grayscale") {
 val = gray;
 } else if (mode ==="Binary"|| mode ==="Otsu") {
 val = gray >= appliedThreshold ? 255 : 0;
 } else if (mode ==="Inverted") {
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
 a.download ="thresholded-image.png";
 a.click();
 toast.success("Image downloaded!");
 };

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
 icon={Sliders}
 title="Image Color Threshold & Binarizer"
 description="Convert images to high-contrast black & white or binary."
 actions={
 <>
 <ActionButton onClick={downloadImage} icon={Download} label="Download PNG"/>
 <ResetButton onClick={() => { setImageSrc(null); setThreshold(128); }} label="Reset"/>
 </>
 }
 />

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
 <input type="file"accept="image/*"onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
 <div className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md border border-border">
 <Upload className="w-4 h-4"/>
 <span>Choose File</span>
 </div>
 </div>
 </div>
 
 <div className="w-full sm:w-1/3">
 <Label className="mb-2 block">Processing Mode</Label>
 <Select value={mode} onValueChange={(val: Mode) => setMode(val)}>
 <SelectTrigger>
 <SelectValue placeholder="Mode"/>
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
 <input 
 type="range"
 min="0"max="255"
 value={threshold} 
 onChange={(e) => setThreshold(Number(e.target.value))} 
 disabled={mode ==="Otsu"|| mode ==="Grayscale"}
 className="w-full"
 />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Preview</CardTitle>
 </CardHeader>
 <CardContent className="flex justify-center overflow-auto bg-muted/20 p-4 rounded-md">
 {imageSrc ? (
 <canvas ref={canvasRef} className="max-w-full h-auto border border-border bg-background"/>
 ) : (
 <div className="text-muted-foreground py-12 flex flex-col items-center">
 <RefreshCw className="w-8 h-8 mb-4 opacity-50"/>
 <p>Upload an image to see the preview</p>
 </div>
 )}
 </CardContent>
 </GlassCard>
 
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
          <h3>Why Use Our Image Color Threshold & Binarizer?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Image Color Threshold & Binarizer provides
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

      <RelatedTools currentToolUrl="/tools/image/color-threshold" max={6} />

</div>
 );
}
