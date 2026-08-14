"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { cn } from "@/lib/utils";
import React, { useState, useRef, ChangeEvent } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Upload, Download, Loader2, Sparkles, Image as ImageIcon, Split, ArrowLeft, Maximize2, Instagram, Facebook, Linkedin, Youtube, Shield, Zap, Copy } from "lucide-react";
import { canvasEncode, drawWithAnchor, type FitMode, type OutFormat } from "@/lib/canvas";
const SOCIAL_PRESETS = [{
  name: "Instagram Post",
  platform: "Instagram",
  w: 1080,
  h: 1350,
  ratio: "4:5",
  icon: Instagram
}, {
  name: "Instagram Square",
  platform: "Instagram",
  w: 1080,
  h: 1080,
  ratio: "1:1",
  icon: Instagram
}, {
  name: "Facebook Post",
  platform: "Facebook",
  w: 1080,
  h: 1350,
  ratio: "4:5",
  icon: Facebook
}, {
  name: "Facebook Cover",
  platform: "Facebook",
  w: 1200,
  h: 630,
  ratio: "16:9",
  icon: Facebook
}, {
  name: "LinkedIn Post",
  platform: "LinkedIn",
  w: 1200,
  h: 627,
  ratio: "1.91:1",
  icon: Linkedin
}, {
  name: "YouTube Banner",
  platform: "YouTube",
  w: 1280,
  h: 720,
  ratio: "16:9",
  icon: Youtube
}];
const DEMO_IMAGES = [{
  name: "Fashion Model",
  url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1080&q=80"
}, {
  name: "Product Sneaker",
  url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1080&q=80"
}, {
  name: "Landscape Travel",
  url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&q=80"
}];
export default function ImageResizeClient() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [origW, setOrigW] = useState<number>(0);
  const [origH, setOrigH] = useState<number>(0);
  const [w, setW] = useState<number>(1080);
  const [h, setH] = useState<number>(1350);
  const [fit, setFit] = useState<FitMode>("stretch"); // 4-corner stretch default!
  const [fmt, setFmt] = useState<OutFormat>("webp");
  const [quality, setQuality] = useState<number>(100);
  const [activePreset, setActivePreset] = useState<string>("Instagram Post");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const loadDemoImage = (url: string, name: string) => {
    setIsProcessing(true);
    setOriginalUrl(url);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      setOrigW(img.naturalWidth || 1080);
      setOrigH(img.naturalHeight || 1350);
      renderResizedImage(url, img.naturalWidth || 1080, img.naturalHeight || 1350, w, h, fit, fmt, quality);
    };
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setOriginalUrl(url);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setOrigW(img.naturalWidth);
        setOrigH(img.naturalHeight);
        renderResizedImage(url, img.naturalWidth, img.naturalHeight, w, h, fit, fmt, quality);
      };
    }
  };
  const renderResizedImage = async (srcUrl: string, srcW: number, srcH: number, targetW: number, targetH: number, fitMode: FitMode, format: OutFormat, qVal: number) => {
    setIsProcessing(true);
    try {
      const canvas = await drawWithAnchor({
        srcUrl,
        srcW,
        srcH,
        outW: targetW,
        outH: targetH,
        fit: fitMode,
        anchor: "center",
        smoothing: "high"
      });
      const blob = await canvasEncode(canvas, format, qVal);
      const url = URL.createObjectURL(blob);
      setResizedUrl(url);
    } catch (err) {
      console.error("Resize error:", err);
      toast.error("Failed to render resized image");
    } finally {
      setIsProcessing(false);
    }
  };
  const applyPreset = (presetName: string, presetW: number, presetH: number) => {
    setActivePreset(presetName);
    setW(presetW);
    setH(presetH);
    if (originalUrl && origW && origH) {
      renderResizedImage(originalUrl, origW, origH, presetW, presetH, fit, fmt, quality);
    }
  };
  const handleSplitMove = (clientX: number) => {
    if (!splitContainerRef.current) return;
    const rect = splitContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, x / rect.width * 100));
    setSliderPos(percentage);
  };
  const handleDownload = () => {
    if (!resizedUrl) return;
    const a = document.createElement("a");
    a.href = resizedUrl;
    a.download = `toolzium-resized-${w}x${h}.${fmt}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Downloaded resized photo!");
  };
  return <div className="relative mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Social Media Photo Resizer & Aspect Ratio Studio" description="Resize photos instantly for Instagram, Facebook, LinkedIn, and YouTube with 1-click social media aspect ratio presets, 4-corner stretch, and live split comparison." />

 {/* SINGLE VIEWPORT STUDIO WORKSPACE */}
 <Card className="border border-border/80 shadow-xl bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden min-h-[500px] flex flex-col max-w-full">
 {!originalUrl ? <>
 <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
 <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2 tracking-tight">
 <Maximize2 className="h-5 w-5 text-primary shrink-0" />
 Upload Photo Studio
 </CardTitle>
 </CardHeader>

 <CardContent className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-6 max-w-full">
 <div className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-6 sm:p-10 text-center cursor-pointer transition-all duration-200 bg-muted/10 hover:bg-muted/30 group flex-1 flex flex-col items-center justify-center max-w-full" onClick={() => fileInputRef.current?.click()}>
 <div className="p-3 sm:p-4 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
 <Upload className="h-7 w-7 sm:h-8 sm:w-8" />
 </div>
 <h3 className="font-semibold text-base sm:text-lg tracking-tight">Click to upload or drag & drop photo</h3>
 <p className="text-xs sm:text-sm text-muted-foreground mt-1">
 Supports PNG, JPG, WebP up to 25MB (Full HD 100% Quality Export)
 </p>
 <Input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
 </div>

 {/* Demo Sample Cards */}
 <div className="pt-4 border-t space-y-3 max-w-full">
 <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
 <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" /> Test 1-Click Social Resize Samples:
 </span>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-full">
 {DEMO_IMAGES.map(sample => <Button key={sample.name} type="button" onClick={() => loadDemoImage(sample.url, sample.name)} className="group relative rounded-xl border bg-card hover:border-primary/50 overflow-hidden p-2 text-left transition-all duration-200 hover:shadow-md flex items-center gap-3 w-full">
 <img src={sample.url} alt={sample.name} className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover border group-hover:scale-105 transition-transform shrink-0" />
 <div className="min-w-0 flex-1">
 <p className="text-xs font-semibold truncate group-hover:text-primary transition-colors">
 {sample.name}
 </p>
 <p className="text-[10px] text-muted-foreground">1080 × 1350 (4:5)</p>
 </div>
 </Button>)}
 </div>
 </div>
 </CardContent>
 </> : <>
 {/* Studio Header Bar - 100% Responsive */}
 <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4 space-y-3 max-w-full overflow-hidden">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 max-w-full">
 <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
 <Button variant="ghost" size="sm" onClick={() => {
                  setOriginalUrl(null);
                  setResizedUrl(null);
                }} className="gap-1 text-xs text-foreground hover:text-primary hover:bg-muted/50 p-1.5 h-8">
 <ArrowLeft className="h-4 w-4" />
 Upload New
 </Button>
 <div className="flex items-center gap-2 text-xs font-semibold shrink-0">
 <Badge variant="outline" className="text-primary border-primary/30 text-[11px]">
 {w} × {h} px
 </Badge>
 <span className="text-muted-foreground text-[11px]">Fit: {fit}</span>
 </div>
 </div>

 <Button onClick={handleDownload} size="sm" className="gap-1.5 shadow-sm font-semibold h-9 w-full sm:w-auto justify-center text-primary-foreground">
 <Download className="h-4 w-4" />
 Download Photo
 </Button>
 </div>

 {/* Social Ratio Presets - Horizontally Scrollable Bar (Zero Text Cut-off) */}
 <div className="flex items-center gap-1.5 p-1.5 rounded-xl border bg-background text-xs shadow-inner overflow-x-auto max-w-full scrollbar-thin">
 {SOCIAL_PRESETS.map(preset => {
                const Icon = preset.icon;
                const isActive = activePreset === preset.name;
                return <Button key={preset.name} type="button" onClick={() => applyPreset(preset.name, preset.w, preset.h)} className={cn(`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 shrink-0 whitespace-nowrap text-xs ${isActive ? "bg-primary text-primary-foreground shadow-xs font-semibold" : "text-foreground hover:text-primary hover:bg-muted/50"}`)}>
 <Icon className="h-3.5 w-3.5 shrink-0" />
 <span>{preset.platform} ({preset.ratio})</span>
 </Button>;
              })}
 </div>
 </CardHeader>

 {/* Studio Interactive Viewport */}
 <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3 max-w-full overflow-hidden">
 {isProcessing ? <div className="py-16 text-center space-y-3 my-auto">
 <Loader2 className="h-9 w-9 animate-spin text-primary mx-auto" />
 <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Resizing 4 corners with high smoothing...</p>
 </div> : <div className="relative flex-1 flex flex-col min-h-[320px] max-h-[440px] max-w-full">
 <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-muted-foreground mb-1.5 px-1 min-w-0 max-w-full">
 <span className="shrink-0">Original ({origW}×{origH})</span>
 <span className="text-primary flex items-center gap-1 truncate max-w-[50%]">
 <Split className="h-3.5 w-3.5 shrink-0" /> <span className="hidden sm:inline">Drag Split Line to Compare</span>
 </span>
 <span className="shrink-0">Resized ({w}×{h})</span>
 </div>

 <div ref={splitContainerRef} className="relative flex-1 rounded-2xl overflow-hidden border min-h-[300px] flex items-center justify-center select-none cursor-ew-resize touch-none shadow-inner bg-[#0f172a] text-[#f8fafc]/40 max-w-full" onMouseDown={e => {
                setIsDraggingSlider(true);
                handleSplitMove(e.clientX);
              }} onMouseMove={e => {
                if (isDraggingSlider) handleSplitMove(e.clientX);
              }} onMouseUp={() => setIsDraggingSlider(false)} onMouseLeave={() => setIsDraggingSlider(false)} onTouchMove={e => {
                if (e.touches[0]) handleSplitMove(e.touches[0].clientX);
              }}>
 {/* Resized Result Layer */}
 {resizedUrl && <img src={resizedUrl} alt="Resized result" className="absolute inset-0 h-full w-full object-contain p-2 select-none pointer-events-none z-10" />}

 {/* Original Layer Clipped */}
 <div className="absolute inset-0 overflow-hidden z-20 pointer-events-none border-r-2 border-primary" style={{
                  width: `${sliderPos}%`
                }}>
 <img src={originalUrl} alt="Original" className="absolute inset-0 h-full w-full object-contain p-2 select-none max-w-none" style={{
                    width: splitContainerRef.current?.clientWidth || "100%"
                  }} />
 </div>

 {/* Split Handle */}
 <div className="absolute top-0 bottom-0 z-30 w-1 bg-primary cursor-ew-resize flex items-center justify-center shadow-lg" style={{
                  left: `${sliderPos}%`
                }}>
 <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md border-2 border-background">
 <Split className="h-3.5 w-3.5" />
 </div>
 </div>
 </div>
 </div>}

 {/* Bottom Quick Fit & Quality Bar */}
 <div className="pt-2 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs max-w-full">
 <div className="flex items-center gap-2">
 <span className="font-semibold text-muted-foreground shrink-0 text-[11px]">Fit:</span>
 <div className="flex items-center gap-1 p-1 rounded-lg border bg-background w-full sm:w-auto">
 <Button type="button" onClick={() => {
                    setFit("stretch");
                    if (originalUrl && origW && origH) renderResizedImage(originalUrl, origW, origH, w, h, "stretch", fmt, quality);
                  }} className={cn(`flex-1 sm:flex-initial px-2.5 py-1 rounded-md font-medium transition text-[11px] ${fit === "stretch" ? "bg-primary text-primary-foreground shadow-xs font-semibold" : "text-foreground hover:text-primary hover:bg-muted/50"}`)}>
 4-Corner Stretch
 </Button>
 <Button type="button" onClick={() => {
                    setFit("cover");
                    if (originalUrl && origW && origH) renderResizedImage(originalUrl, origW, origH, w, h, "cover", fmt, quality);
                  }} className={cn(`flex-1 sm:flex-initial px-2.5 py-1 rounded-md font-medium transition text-[11px] ${fit === "cover" ? "bg-primary text-primary-foreground shadow-xs font-semibold" : "text-foreground hover:text-primary hover:bg-muted/50"}`)}>
 Smart Crop
 </Button>
 </div>
 </div>

 <div className="flex items-center gap-2">
 <span className="font-semibold text-muted-foreground shrink-0 text-[11px]">Format:</span>
 <div className="flex items-center gap-1">
 {["webp", "png", "jpeg"].map(format => <Button key={format} type="button" onClick={() => {
                    setFmt(format as OutFormat);
                    if (originalUrl && origW && origH) renderResizedImage(originalUrl, origW, origH, w, h, fit, format as OutFormat, quality);
                  }} className={cn(`px-2.5 py-1 rounded-lg border text-[11px] font-semibold uppercase transition ${fmt === format ? "bg-primary text-primary-foreground shadow-xs" : "text-foreground hover:text-primary hover:bg-muted/50"}`)}>
 {format}
 </Button>)}
 </div>
 </div>
 </div>
 </CardContent>
 </>}
 </Card>
 
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
          <h3>Why Use Our Social Media Photo Resizer & Aspect Ratio Studio?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Social Media Photo Resizer & Aspect Ratio Studio provides
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

      <RelatedTools currentToolUrl="/tools/image/image-resize" max={6} />

  </div></div>;
}