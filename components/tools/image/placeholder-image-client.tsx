"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton, ResetButton, ActionButton } from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import { ImageIcon, Download, Maximize, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
const keywords = ["placeholder image", "dummy image", "placeholder img", "lorem image", "test image", "filler image", "placeholder image generator", "dummy image generator", "placeholder picture", "sample image", "blank image generator", "image placeholder online", "placeholder image maker", "Toolzium", "online tools"];
const PRESETS = [{
  label: "Avatar (150x150)",
  w: 150,
  h: 150
}, {
  label: "Ad (300x250)",
  w: 300,
  h: 250
}, {
  label: "Banner (728x90)",
  w: 728,
  h: 90
}, {
  label: "OG Image (1200x630)",
  w: 1200,
  h: 630
}, {
  label: "HD (1920x1080)",
  w: 1920,
  h: 1080
}, {
  label: "Standard (800x600)",
  w: 800,
  h: 600
}];
export default function PlaceholderImageClient() {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [bgColor, setBgColor] = useState("#cccccc");
  const [textColor, setTextColor] = useState("#666666");
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [dataUrl, setDataUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    drawCanvas();
  }, [width, height, bgColor, textColor, text, fontSize]);
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = width || 1;
    const h = height || 1;

    // Set actual canvas dimensions
    canvas.width = w;
    canvas.height = h;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    // Draw text
    const displayText = text.trim() || w + "x" + h;
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Auto scale font size if it's too big for width
    let currentFontSize = fontSize;
    const maxWidth = w * 0.9;
    ctx.font = "bold" + currentFontSize + "px sans-serif";
    while (ctx.measureText(displayText).width > maxWidth && currentFontSize > 10) {
      currentFontSize -= 2;
      ctx.font = "bold" + currentFontSize + "px sans-serif";
    }
    ctx.fillText(displayText, w / 2, h / 2);
    setDataUrl(canvas.toDataURL("image/png"));
  };
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "placeholder-" + width + "x" + height + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleReset = () => {
    setWidth(600);
    setHeight(400);
    setBgColor("#cccccc");
    setTextColor("#666666");
    setText("");
    setFontSize(48);
  };
  return <div className="relative max-w-6xl mx-auto px-4 py-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Placeholder Image Generator" description="Generate placeholder images with custom dimensions, colors, and text. Create dummy images for mockups, wireframes, and development." icon={ImageIcon} />

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
 <div className="lg:col-span-5 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Dimensions</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <InputField label="Width (px)" type="number" value={width.toString()} onChange={e => setWidth(Math.max(1, parseInt(e.target.value) || 1))} min={1} />
 <InputField label="Height (px)" type="number" value={height.toString()} onChange={e => setHeight(Math.max(1, parseInt(e.target.value) || 1))} min={1} />
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium">Presets</label>
 <div className="flex flex-wrap gap-2">
 {PRESETS.map(preset => <Badge key={preset.label} variant="secondary" className="cursor-pointer hover:bg-primary/20 transition-colors" onClick={() => {
                    setWidth(preset.w);
                    setHeight(preset.h);
                  }}>
 {preset.label}
 </Badge>)}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Appearance</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-sm font-medium">Background Color</label>
 <div className="flex gap-2">
 <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded border border-border cursor-pointer bg-transparent shrink-0" />
 <InputField value={bgColor} onChange={e => setBgColor(e.target.value)} placeholder="#cccccc" className="flex-1" />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Text Color</label>
 <div className="flex gap-2">
 <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-10 h-10 rounded border border-border cursor-pointer bg-transparent shrink-0" />
 <InputField value={textColor} onChange={e => setTextColor(e.target.value)} placeholder="#666666" className="flex-1" />
 </div>
 </div>
 </div>

 <InputField label="Custom Text (Optional)" value={text} onChange={e => setText(e.target.value)} placeholder={"e.g." + width + "x" + height} />

 <div className="space-y-2">
 <div className="flex justify-between">
 <label className="text-sm font-medium">Font Size</label>
 <span className="text-sm text-muted-foreground">{fontSize}px</span>
 </div>
 <input type="range" min="12" max="120" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} className="w-full accent-primary" />
 </div>
 </CardContent>
 </GlassCard>

 <div className="flex gap-2">
 <ResetButton onClick={handleReset} />
 </div>
 </div>

 <div className="lg:col-span-7">
 <GlassCard className="h-full flex flex-col">
 <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
 <CardTitle>Preview</CardTitle>
 <div className="flex gap-2">
 <CopyButton getText={dataUrl} label="Copy Data URL" className="h-8" />
 <ActionButton icon={Download} label="Download PNG" onClick={handleDownload} variant="default" className="h-8" />
 </div>
 </CardHeader>
 <CardContent className="flex-1 flex flex-col items-center justify-center p-6 bg-muted/20 overflow-hidden min-h-[400px]">
 <div className="relative max-w-full max-h-full overflow-auto rounded-lg border border-border shadow-sm flex items-center justify-center bg-background">
 <canvas ref={canvasRef} className="max-w-full h-auto" style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "600px",
                  objectFit: "contain"
                }} />
 </div>
 <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
 <Maximize className="w-3 h-3" />
 <span>Image is scaled for preview. Actual size: {width}x{height}px</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>
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
          <h3>Why Use Our Placeholder Image Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Placeholder Image Generator provides
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

      <RelatedTools currentToolUrl="/tools/image/placeholder-image" max={6} />

    </div></div>;
}