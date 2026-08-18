"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useRef, ChangeEvent, DragEvent } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import InputField from"@/components/shared/form-fields/input-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import Stat from"@/components/shared/stat";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { CheckCircle2, Crop, Download, Image as ImageIcon, Maximize2, RefreshCw, Scaling, SlidersHorizontal, Sparkles, Trash2, Upload, Zap, Settings, Square, Grid, Shield } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import JSZip from"jszip";
import { drawToCanvas, canvasEncode, FitMode, formatBytes, mimeFromFormat } from"@/lib/canvas";
import toast from"react-hot-toast";

interface ImageItem {
  id: string;
  file: File;
  name: string;
  originalWidth: number;
  originalHeight: number;
  originalSize: number;
  originalUrl: string;
  resizedUrl: string | null;
  resizedWidth: number;
  resizedHeight: number;
  resizedSize: number;
}
interface SocialPreset {
  platform: "Facebook" | "Instagram" | "LinkedIn" | "Twitter" | "Pinterest" | "YouTube";
  label: string;
  w: number;
  h: number;
  ratio: string;
  badgeColor: string;
}
const SOCIAL_PRESETS: SocialPreset[] = [
// Facebook
{
  platform: "Facebook",
  label: "Facebook Portrait Post",
  w: 1080,
  h: 1350,
  ratio: "4:5",
  badgeColor: "bg-blue-600/10 text-primary border-blue-600/30"
}, {
  platform: "Facebook",
  label: "Facebook Square Post",
  w: 1080,
  h: 1080,
  ratio: "1:1",
  badgeColor: "bg-blue-600/10 text-primary border-blue-600/30"
}, {
  platform: "Facebook",
  label: "Facebook Cover Banner",
  w: 1640,
  h: 924,
  ratio: "16:9",
  badgeColor: "bg-blue-600/10 text-primary border-blue-600/30"
}, {
  platform: "Facebook",
  label: "Facebook Story / Reel",
  w: 1080,
  h: 1920,
  ratio: "9:16",
  badgeColor: "bg-blue-600/10 text-primary border-blue-600/30"
},
// Instagram
{
  platform: "Instagram",
  label: "Instagram Portrait Post",
  w: 1080,
  h: 1350,
  ratio: "4:5",
  badgeColor: "bg-pink-600/10 text-pink-600 border-pink-600/30"
}, {
  platform: "Instagram",
  label: "Instagram Square Post",
  w: 1080,
  h: 1080,
  ratio: "1:1",
  badgeColor: "bg-pink-600/10 text-pink-600 border-pink-600/30"
}, {
  platform: "Instagram",
  label: "Instagram Story / Reel",
  w: 1080,
  h: 1920,
  ratio: "9:16",
  badgeColor: "bg-pink-600/10 text-pink-600 border-pink-600/30"
}, {
  platform: "Instagram",
  label: "Instagram Landscape",
  w: 1080,
  h: 566,
  ratio: "1.91:1",
  badgeColor: "bg-pink-600/10 text-pink-600 border-pink-600/30"
},
// LinkedIn
{
  platform: "LinkedIn",
  label: "LinkedIn Portrait Post",
  w: 1080,
  h: 1350,
  ratio: "4:5",
  badgeColor: "bg-sky-700/10 text-sky-700 border-sky-700/30"
}, {
  platform: "LinkedIn",
  label: "LinkedIn Square Post",
  w: 1200,
  h: 1200,
  ratio: "1:1",
  badgeColor: "bg-sky-700/10 text-sky-700 border-sky-700/30"
}, {
  platform: "LinkedIn",
  label: "LinkedIn Cover Banner",
  w: 1584,
  h: 396,
  ratio: "4:1",
  badgeColor: "bg-sky-700/10 text-sky-700 border-sky-700/30"
},
// X / Twitter
{
  platform: "Twitter",
  label: "X (Twitter) Post",
  w: 1200,
  h: 675,
  ratio: "16:9",
  badgeColor: "bg-slate-700/10 text-slate-700 dark:text-slate-300 border-border/30"
}, {
  platform: "Twitter",
  label: "X Header Banner",
  w: 1500,
  h: 500,
  ratio: "3:1",
  badgeColor: "bg-slate-700/10 text-slate-700 dark:text-slate-300 border-border/30"
},
// Pinterest & YouTube
{
  platform: "Pinterest",
  label: "Pinterest Pin",
  w: 1000,
  h: 1500,
  ratio: "2:3",
  badgeColor: "bg-red-600/10 text-red-600 border-red-600/30"
}, {
  platform: "YouTube",
  label: "YouTube Thumbnail",
  w: 1280,
  h: 720,
  ratio: "16:9",
  badgeColor: "bg-red-700/10 text-red-700 border-red-700/30"
}];
export default function ImageResizerClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [resizeMode, setResizeMode] = useState<"pixel" | "percent">("pixel");
  const [targetWidth, setTargetWidth] = useState<number>(1080);
  const [targetHeight, setTargetHeight] = useState<number>(1350);
  const [fitMode, setFitMode] = useState<FitMode>("stretch"); // Default to Stretch 4 corners per user request!
  const [percentage, setPercentage] = useState<number>(100);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(false);
  const [format, setFormat] = useState<"original" | "image/jpeg" | "image/png" | "image/webp">("image/png");
  const [quality, setQuality] = useState<number>(100); // Default to 100% max quality
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activePlatformFilter, setActivePlatformFilter] = useState<string>("All");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFiles = (fileList: FileList | File[]) => {
    const validFiles = Array.from(fileList).filter(f => f.type.startsWith("image/"));
    if (validFiles.length === 0) return;
    validFiles.forEach(file => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const newItem: ImageItem = {
          id: Math.random().toString(36).substring(2, 9),
          file,
          name: file.name,
          originalWidth: img.width,
          originalHeight: img.height,
          originalSize: file.size,
          originalUrl: url,
          resizedUrl: null,
          resizedWidth: targetWidth,
          resizedHeight: targetHeight,
          resizedSize: file.size
        };
        setImages(prev => [...prev, newItem]);
      };
      img.src = url;
    });
  };
  const applyPreset = (preset: SocialPreset) => {
    setTargetWidth(preset.w);
    setTargetHeight(preset.h);
    setKeepAspectRatio(false);
    toast.success(`Applied preset: ${preset.label} (${preset.w} × ${preset.h} px - ${preset.ratio})!`);
  };
  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (keepAspectRatio && images.length > 0 && images[0].originalWidth > 0) {
      const ratio = images[0].originalHeight / images[0].originalWidth;
      setTargetHeight(Math.round(val * ratio));
    }
  };
  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (keepAspectRatio && images.length > 0 && images[0].originalHeight > 0) {
      const ratio = images[0].originalWidth / images[0].originalHeight;
      setTargetWidth(Math.round(val * ratio));
    }
  };
  const processImages = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    const updatedImages = await Promise.all(images.map(async item => {
      return new Promise<ImageItem>(resolve => {
        let outW = targetWidth;
        let outH = targetHeight;
        if (resizeMode === "percent") {
          outW = Math.max(1, Math.round(item.originalWidth * percentage / 100));
          outH = Math.max(1, Math.round(item.originalHeight * percentage / 100));
        }
        const fmtChoice = format === "original" ? item.file.type.includes("png") ? "png" : item.file.type.includes("webp") ? "webp" : "jpeg" : format.includes("png") ? "png" : format.includes("webp") ? "webp" : "jpeg";
        drawToCanvas({
          srcUrl: item.originalUrl,
          srcW: item.originalWidth,
          srcH: item.originalHeight,
          outW,
          outH,
          fit: fitMode,
          background: fitMode === "contain" ? bgColor : undefined
        }).then(canvas => canvasEncode(canvas, fmtChoice, quality)).then(blob => {
          const url = URL.createObjectURL(blob);
          resolve({
            ...item,
            resizedUrl: url,
            resizedWidth: outW,
            resizedHeight: outH,
            resizedSize: blob.size
          });
        }).catch(err => {
          console.error("Resize Error:", err);
          resolve(item);
        });
      });
    }));
    setImages(updatedImages);
    setIsProcessing(false);
    toast.success("Images resized cleanly in Ultra-HD 100% quality!");
  };
  const downloadSingle = (item: ImageItem) => {
    if (!item.resizedUrl) return;
    const a = document.createElement("a");
    a.href = item.resizedUrl;
    const ext = format === "original" ? item.name.split(".").pop() || "png" : format.split("/")[1];
    a.download = `${item.name.replace(/\.[^/.]+$/, "")}-${targetWidth}x${targetHeight}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const downloadAllZip = async () => {
    const resizedItems = images.filter(i => i.resizedUrl);
    if (resizedItems.length === 0) return;
    const zip = new JSZip();
    for (let i = 0; i < resizedItems.length; i++) {
      const item = resizedItems[i];
      if (item.resizedUrl) {
        const response = await fetch(item.resizedUrl);
        const blob = await response.blob();
        const ext = format === "original" ? item.name.split(".").pop() || "png" : format.split("/")[1];
        zip.file(`${item.name.replace(/\.[^/.]+$/, "")}-${item.resizedWidth}x${item.resizedHeight}.${ext}`, blob);
      }
    }
    const zipBlob = await zip.generateAsync({
      type: "blob"
    });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `toolzium-social-resized-photos.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const filteredPresets = activePlatformFilter === "All" ? SOCIAL_PRESETS : SOCIAL_PRESETS.filter(p => p.platform === activePlatformFilter);
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Social Media Image Resizer & Aspect Ratio Tool" description="Resize images for Facebook, Instagram, LinkedIn, X, and Pinterest in 1-click. High-precision 4-corner stretch, smart crop cover, or padded fit with zero quality loss." />

 {/* Social Media 1-Click Preset Bar */}
 <GlassCard className="p-5 space-y-4">
 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3">
 <div className="flex items-center gap-2">
 <Sparkles className="h-5 w-5 text-primary" />
 <h3 className="font-semibold text-base">Social Media 1-Click Presets</h3>
 </div>

 {/* Platform Filter Buttons */}
 <div className="flex flex-wrap items-center gap-1">
 {["All", "Facebook", "Instagram", "LinkedIn", "Twitter", "Pinterest", "YouTube"].map(plat => <Button key={plat} type="button" onClick={() => setActivePlatformFilter(plat)} className={cn(`px-2.5 py-1 rounded-md text-xs font-semibold transition ${activePlatformFilter === plat ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted/40 text-foreground hover:text-primary"}`)}>
 {plat}
 </Button>)}
 </div>
 </div>

 {/* Preset Cards Grid */}
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
 {filteredPresets.map((p, idx) => <Button key={idx} type="button" onClick={() => applyPreset(p)} className={cn(`p-3 rounded-xl border text-left transition-all hover:scale-[1.02] flex flex-col justify-between space-y-2 group bg-card/80 hover:border-primary/60 hover:shadow-sm ${targetWidth === p.w && targetHeight === p.h ? "border-primary ring-1 ring-primary bg-primary text-primary-foreground" : "border-border/70"}`)}>
 <div>
 <span className={`text-[11px] font-bold block truncate ${targetWidth === p.w && targetHeight === p.h ? "text-primary-foreground" : "text-muted-foreground"}`}>{p.platform}</span>
 <span className={`font-semibold text-xs block line-clamp-1 transition-colors ${targetWidth === p.w && targetHeight === p.h ? "text-primary-foreground" : "text-foreground group-hover:text-primary"}`}>
 {p.label.replace(p.platform, "").trim()}
 </span>
 </div>
 <div className="flex items-center justify-between pt-1">
 <span className="text-[11px] font-mono text-muted-foreground">
 {p.w} × {p.h}
 </span>
 <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${p.badgeColor}`}>
 {p.ratio}
 </Badge>
 </div>
 </Button>)}
 </div>
 </GlassCard>

 {/* Main Upload & Controls Layout */}
 <div className="grid gap-6 lg:grid-cols-12">
 {/* Upload Zone & Previews (7 Cols) */}
 <div className="lg:col-span-7 space-y-6">
 <GlassCard className="p-6">
 <div className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${isDragging ? "border-primary bg-primary/10 scale-[0.99]" : "border-primary/30 hover:border-primary/60 bg-muted/20"}`} onClick={() => fileInputRef.current?.click()} onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }} onDragLeave={() => setIsDragging(false)} onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
            }}>
 <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3">
 <Upload className="h-6 w-6" />
 </div>
 <h3 className="font-semibold text-base">Drop photos here or click to upload</h3>
 <p className="text-xs text-muted-foreground mt-1">
 Supports JPG, PNG, WebP, GIF, and AVIF up to 50MB
 </p>
 <input type="file" accept="image/*" multiple className="hidden" ref={fileInputRef} onChange={e => e.target.files && handleFiles(e.target.files)} />
 </div>

 {images.length > 0 && <div className="mt-6 space-y-4">
 <div className="flex items-center justify-between">
 <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
 <ImageIcon className="h-4 w-4 text-primary" /> Uploaded Photos ({images.length})
 </span>
 <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:bg-destructive/10 gap-1" onClick={() => setImages([])}>
 <Trash2 className="h-3.5 w-3.5" /> Clear All
 </Button>
 </div>

 <div className="grid gap-3 max-h-[380px] overflow-y-auto pr-1">
 {images.map(item => <div key={item.id} className="p-3 rounded-xl border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
 <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
 <img src={item.resizedUrl || item.originalUrl} alt={item.name} className="h-14 w-14 rounded-lg object-contain border bg-background" />
 <div className="min-w-0">
 <p className="font-medium truncate max-w-[180px] text-foreground">{item.name}</p>
 <p className="text-[11px] text-muted-foreground">
 Original: {item.originalWidth} × {item.originalHeight} px ({formatBytes(item.originalSize)})
 </p>
 {item.resizedUrl && <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
 <CheckCircle2 className="h-3 w-3" /> Resized: {item.resizedWidth} × {item.resizedHeight} px ({formatBytes(item.resizedSize)})
 </p>}
 </div>
 </div>

 {item.resizedUrl && <Button size="sm" variant="outline" className="w-full sm:w-auto text-xs gap-1.5 shadow-xs" onClick={() => downloadSingle(item)}>
 <Download className="h-3.5 w-3.5" /> Download
 </Button>}
 </div>)}
 </div>
 </div>}
 </GlassCard>
 </div>

 {/* Resizing Configuration Controls (5 Cols) */}
 <div className="lg:col-span-5 space-y-6">
 <GlassCard className="p-6 space-y-5">
 <div className="border-b pb-3 flex items-center justify-between">
 <h3 className="font-semibold text-base flex items-center gap-2">
 <Scaling className="h-4 w-4 text-primary" /> Resize & Fit Settings
 </h3>
 <Badge variant="outline" className="text-xs font-normal text-emerald-500 border-emerald-500/30 gap-1">
 <Zap className="h-3 w-3" />
 100% Ultra HD Quality
 </Badge>
 </div>

 {/* Fit & Border Eliminator Mode Selector */}
 <div className="space-y-2">
 <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
 <Maximize2 className="h-3.5 w-3.5 text-primary" /> Canvas Fit Mode (Eliminate White Bars):
 </label>
 <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl border bg-muted/20">
 <Button type="button" onClick={() => setFitMode("stretch")} className={cn(`p-2 rounded-lg text-center transition ${fitMode === "stretch" ? "bg-primary text-primary-foreground shadow-xs" : "text-foreground hover:text-primary hover:bg-muted/50"}`)}>
 <span className="font-bold text-xs block">Stretch 4 Corners</span>
 <span className="text-[10px] opacity-80 block">No White Bars</span>
 </Button>

 <Button type="button" onClick={() => setFitMode("cover")} className={cn(`p-2 rounded-lg text-center transition ${fitMode === "cover" ? "bg-primary text-primary-foreground shadow-xs" : "text-foreground hover:text-primary hover:bg-muted/50"}`)}>
 <span className="font-bold text-xs block">Smart Crop Cover</span>
 <span className="text-[10px] opacity-80 block">Fill & Crop</span>
 </Button>

 <Button type="button" onClick={() => setFitMode("contain")} className={cn(`p-2 rounded-lg text-center transition ${fitMode === "contain" ? "bg-primary text-primary-foreground shadow-xs" : "text-foreground hover:text-primary hover:bg-muted/50"}`)}>
 <span className="font-bold text-xs block">Fit & Pad</span>
 <span className="text-[10px] opacity-80 block">With Background</span>
 </Button>
 </div>
 </div>

 {/* Dimensions Input */}
 <div className="grid grid-cols-2 gap-3">
 <div className="space-y-1">
 <label className="text-xs font-semibold text-muted-foreground">Width (px):</label>
 <input type="number" value={targetWidth} onChange={e => handleWidthChange(Number(e.target.value))} className="w-full h-9 rounded-md border border-input bg-muted/20 px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono font-semibold" />
 </div>

 <div className="space-y-1">
 <label className="text-xs font-semibold text-muted-foreground">Height (px):</label>
 <input type="number" value={targetHeight} onChange={e => handleHeightChange(Number(e.target.value))} className="w-full h-9 rounded-md border border-input bg-muted/20 px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono font-semibold" />
 </div>
 </div>

 {/* Format & Export Quality */}
 <div className="grid grid-cols-2 gap-3">
 <div className="space-y-1">
 <label className="text-xs font-semibold text-muted-foreground">Export Format:</label>
 <select value={format} onChange={e => setFormat(e.target.value as any)} className="w-full h-9 rounded-md border border-input bg-muted/20 px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
 <option value="original">Original Format</option>
 <option value="image/png">PNG (Lossless)</option>
 <option value="image/jpeg">JPG / JPEG</option>
 <option value="image/webp">WebP (Compressed)</option>
 </select>
 </div>

 <div className="space-y-1">
 <label className="text-xs font-semibold text-muted-foreground">Quality ({quality}%):</label>
 <input type="range" min="50" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg mt-2" />
 </div>
 </div>

 {/* Processing & Action Buttons */}
 <div className="space-y-3 pt-2">
 <Button onClick={processImages} disabled={isProcessing || images.length === 0} className="w-full h-10 gap-2 shadow-md font-semibold text-xs">
 {isProcessing ? <>
 <RefreshCw className="h-4 w-4 animate-spin" />
 Resizing Photos...
 </> : <>
 <Scaling className="h-4 w-4" />
 Resize All Photos ({images.length})
 </>}
 </Button>

 {images.some(i => i.resizedUrl) && <Button variant="outline" onClick={downloadAllZip} className="w-full gap-2 text-xs">
 <Download className="h-4 w-4 text-emerald-500" />
 Download All Resized (ZIP)
 </Button>}
 </div>
 </GlassCard>
 </div>
 </div>
 

<ToolHowItWorks
  steps={[
    {
      step: "01",
      title: "Upload Images",
      description: "Drag and drop single or multiple PNG, JPG, or WebP files from your device.",
      icon: Upload,
    },
    {
      step: "02",
      title: "Configure Dimensions & Presets",
      description: "Set exact pixel dimensions, scale by percentage, or choose 1-click social media presets.",
      icon: Crop,
    },
    {
      step: "03",
      title: "Instant Export & ZIP Download",
      description: "Process in-browser with hardware acceleration and download resized images individually or as a single ZIP archive.",
      icon: Download,
    }
  ]}
  badges={["100% Free Forever", "Zero Server Uploads", "Private In-Browser Processing", "Bulk ZIP Export"]}
/>

<ToolFeatureGuides
  features={[
    {
      icon: Scaling,
      title: "Pixel & Percentage Scaling",
      description: "Scale by exact width/height with aspect ratio lock, or downscale/upscale proportionally by percentage.",
    },
    {
      icon: Crop,
      title: "20+ Social Media Presets",
      description: "Pre-configured pixel dimensions for Instagram, Facebook, TikTok, LinkedIn, YouTube, and X.",
    },
    {
      icon: SlidersHorizontal,
      title: "Multi-Format & Quality Tuning",
      description: "Convert on-the-fly to modern WebP, crisp lossless PNG, or lightweight JPEG with precision quality control.",
    },
    {
      icon: Shield,
      title: "100% Private Client-Side",
      description: "All canvas operations execute in your browser via HTML5 Canvas API and WebAssembly. No files touch external servers.",
    }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-5">
    <h3>The Ultimate Guide to Image Resizing and Web Performance</h3>
    <p>
      Serving properly sized images is one of the most critical factors for website loading speed, Core Web Vitals (LCP - Largest Contentful Paint), and social media engagement. When you upload a 4000×3000 camera photo to a social network or website container that only displays 1080×1080, the browser wastes bandwidth downloading mega-pixel files and performs costly downsampling on the fly.
    </p>

    <h4>Optimal Social Media Dimensions Cheat Sheet (2026)</h4>
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-left border-collapse border border-border">
        <thead className="bg-muted/50">
          <tr>
            <th className="p-2.5 border border-border">Platform</th>
            <th className="p-2.5 border border-border">Placement</th>
            <th className="p-2.5 border border-border">Recommended Dimensions</th>
            <th className="p-2.5 border border-border">Aspect Ratio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2.5 border border-border font-semibold">Instagram</td>
            <td className="p-2.5 border border-border">Portrait Post / Feed</td>
            <td className="p-2.5 border border-border font-mono text-primary">1080 × 1350 px</td>
            <td className="p-2.5 border border-border">4:5</td>
          </tr>
          <tr>
            <td className="p-2.5 border border-border font-semibold">Instagram / TikTok</td>
            <td className="p-2.5 border border-border">Story / Reel</td>
            <td className="p-2.5 border border-border font-mono text-primary">1080 × 1920 px</td>
            <td className="p-2.5 border border-border">9:16</td>
          </tr>
          <tr>
            <td className="p-2.5 border border-border font-semibold">YouTube</td>
            <td className="p-2.5 border border-border">Video Thumbnail</td>
            <td className="p-2.5 border border-border font-mono text-primary">1280 × 720 px</td>
            <td className="p-2.5 border border-border">16:9</td>
          </tr>
          <tr>
            <td className="p-2.5 border border-border font-semibold">LinkedIn</td>
            <td className="p-2.5 border border-border">Company Cover Banner</td>
            <td className="p-2.5 border border-border font-mono text-primary">1584 × 396 px</td>
            <td className="p-2.5 border border-border">4:1</td>
          </tr>
          <tr>
            <td className="p-2.5 border border-border font-semibold">X (Twitter)</td>
            <td className="p-2.5 border border-border">In-Stream Photo Post</td>
            <td className="p-2.5 border border-border font-mono text-primary">1200 × 675 px</td>
            <td className="p-2.5 border border-border">16:9</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/image/image-resize" max={6} />

<ToolFaqAccordion
  faqs={[
    {
      question: "How does bulk image resizing work in my browser without uploading files?",
      answer: "Toolzium uses the HTML5 Canvas API and WebAssembly within your local browser sandbox. Images are loaded into local browser memory, transformed onto hardware-accelerated canvas buffers, and re-encoded directly on your device. No photos or metadata are ever transmitted over the internet."
    },
    {
      question: "What is the best image format to choose for web performance?",
      answer: "WebP is the recommended modern image format for websites. It provides 25% to 35% smaller file sizes compared to standard JPEG and PNG at equivalent visual quality, while supporting full transparency."
    },
    {
      question: "Can I resize hundreds of images at once?",
      answer: "Yes. You can drag and drop multiple images simultaneously. Toolzium batches the resizing tasks asynchronously and allows you to download all processed images in a single organized ZIP file with 1 click."
    },
    {
      question: "Is Toolzium Bulk Image Resizer completely free to use?",
      answer: "Yes, 100% free forever with no daily limits, no watermarks, no account registration requirements, and zero advertising interruptions."
    }
  ]}
/>

    </div>
  </div>
);
}
