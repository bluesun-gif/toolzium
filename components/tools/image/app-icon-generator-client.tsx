"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Slider } from "@/components/ui/slider";
import {
  Smartphone,
  Download,
  Upload,
  Sparkles,
  Layers,
  Monitor,
  Check,
  RotateCcw,
  Palette,
  Eye,
  FileArchive,
  Copy,
} from "lucide-react";
import toast from "react-hot-toast";
import JSZip from "jszip";

const COLOR_PRESETS = [
  { label: "iOS Blue", bg: "linear-gradient(135deg, #007AFF, #00C6FF)" },
  { label: "Sunset Glow", bg: "linear-gradient(135deg, #FF512F, #DD2476)" },
  { label: "Emerald Cyber", bg: "linear-gradient(135deg, #11998e, #38ef7d)" },
  { label: "Neon Purple", bg: "linear-gradient(135deg, #8E2DE2, #4A00E0)" },
  { label: "Midnight Dark", bg: "linear-gradient(135deg, #1f1c2c, #928DAB)" },
  { label: "Pure Pitch", bg: "#090d16" },
  { label: "Clean White", bg: "#ffffff" },
];

export default function AppIconGeneratorClient() {
  const [appName, setAppName] = useState("Toolzium");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [padding, setPadding] = useState(15);
  const [borderRadius, setBorderRadius] = useState(22);
  const [bgStyle, setBgStyle] = useState(COLOR_PRESETS[0].bg);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"ios" | "android" | "web" | "mac">("ios");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default initial icon SVG drawing if none uploaded
  useEffect(() => {
    if (!imageSrc) {
      const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
        <path d="M50 15L85 35V65L50 85L15 65V35L50 15Z" stroke="white" stroke-width="6" fill="rgba(255,255,255,0.15)"/>
        <circle cx="50" cy="50" r="14" fill="white"/>
        <path d="M50 22V36M50 64V78M23 40L35 47M65 63L77 70M77 40L65 47M35 63L23 70" stroke="white" stroke-width="4" stroke-linecap="round"/>
      </svg>`;
      const blob = new Blob([defaultSvg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    }
  }, [imageSrc]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, SVG, WebP)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageSrc(event.target.result as string);
        toast.success("Image uploaded successfully!");
      }
    };
    reader.readAsDataURL(file);
  };

  const renderIconToCanvas = useCallback((
    size: number,
    targetRadiusPercent: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context failed"));

      // 1. Draw rounded clip or background
      const r = (size * targetRadiusPercent) / 100;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, r);
      ctx.clip();

      // 2. Background
      if (bgStyle.startsWith("linear-gradient")) {
        // Parse simple 135deg linear gradient
        const match = bgStyle.match(/#[0-9a-fA-F]{6}|rgba?\([^)]+\)/g);
        if (match && match.length >= 2) {
          const grad = ctx.createLinearGradient(0, 0, size, size);
          grad.addColorStop(0, match[0]);
          grad.addColorStop(1, match[1]);
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = "#007AFF";
        }
      } else {
        ctx.fillStyle = bgStyle;
      }
      ctx.fillRect(0, 0, size, size);

      // 3. Foreground Image
      if (imageSrc) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const pad = (size * padding) / 100;
          const drawSize = size - pad * 2;
          ctx.drawImage(img, pad, pad, drawSize, drawSize);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Blob generation failed"));
          }, "image/png");
        };
        img.onerror = () => reject(new Error("Image render failed"));
        img.src = imageSrc;
      } else {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Blob generation failed"));
        }, "image/png");
      }
    });
  }, [bgStyle, imageSrc, padding]);

  const handleDownloadZip = async () => {
    setIsGenerating(true);
    toast.loading("Generating full multi-platform app icon pack...", { id: "zip-gen" });

    try {
      const zip = new JSZip();

      // 1. iOS App Store & Device Assets
      const iosFolder = zip.folder("ios/AppIcon.appiconset");
      const iosSizes = [
        { name: "AppIcon-1024.png", size: 1024, radius: 0 },
        { name: "AppIcon-180.png", size: 180, radius: 0 },
        { name: "AppIcon-120.png", size: 120, radius: 0 },
        { name: "AppIcon-87.png", size: 87, radius: 0 },
        { name: "AppIcon-60.png", size: 60, radius: 0 },
        { name: "AppIcon-40.png", size: 40, radius: 0 },
      ];

      for (const item of iosSizes) {
        const blob = await renderIconToCanvas(item.size, item.radius);
        iosFolder?.file(item.name, blob);
      }

      // iOS Contents.json for Xcode
      const contentsJson = {
        images: [
          { size: "20x20", idiom: "iphone", filename: "AppIcon-40.png", scale: "2x" },
          { size: "20x20", idiom: "iphone", filename: "AppIcon-60.png", scale: "3x" },
          { size: "29x29", idiom: "iphone", filename: "AppIcon-60.png", scale: "2x" },
          { size: "29x29", idiom: "iphone", filename: "AppIcon-87.png", scale: "3x" },
          { size: "40x40", idiom: "iphone", filename: "AppIcon-80.png", scale: "2x" },
          { size: "40x40", idiom: "iphone", filename: "AppIcon-120.png", scale: "3x" },
          { size: "60x60", idiom: "iphone", filename: "AppIcon-120.png", scale: "2x" },
          { size: "60x60", idiom: "iphone", filename: "AppIcon-180.png", scale: "3x" },
          { size: "1024x1024", idiom: "ios-marketing", filename: "AppIcon-1024.png", scale: "1x" },
        ],
        info: { version: 1, author: "Toolzium Icon Studio" },
      };
      iosFolder?.file("Contents.json", JSON.stringify(contentsJson, null, 2));

      // 2. Android Mipmap Folders
      const androidFolder = zip.folder("android");
      const androidSizes = [
        { folder: "mipmap-mdpi", size: 48 },
        { folder: "mipmap-hdpi", size: 72 },
        { folder: "mipmap-xhdpi", size: 96 },
        { folder: "mipmap-xxhdpi", size: 144 },
        { folder: "mipmap-xxxhdpi", size: 192 },
      ];

      for (const item of androidSizes) {
        const blobSquare = await renderIconToCanvas(item.size, borderRadius);
        const blobRound = await renderIconToCanvas(item.size, 50);
        const sub = androidFolder?.folder(item.folder);
        sub?.file("ic_launcher.png", blobSquare);
        sub?.file("ic_launcher_round.png", blobRound);
      }

      // Play Store 512x512
      const playStoreBlob = await renderIconToCanvas(512, 0);
      androidFolder?.file("playstore-icon.png", playStoreBlob);

      // 3. Web & Favicons
      const webFolder = zip.folder("web-favicons");
      const webSizes = [
        { name: "favicon-16x16.png", size: 16, radius: borderRadius },
        { name: "favicon-32x32.png", size: 32, radius: borderRadius },
        { name: "apple-touch-icon.png", size: 180, radius: borderRadius },
        { name: "android-chrome-192x192.png", size: 192, radius: borderRadius },
        { name: "android-chrome-512x512.png", size: 512, radius: borderRadius },
      ];

      for (const item of webSizes) {
        const blob = await renderIconToCanvas(item.size, item.radius);
        webFolder?.file(item.name, blob);
      }

      // Web Manifest
      const manifest = {
        name: appName,
        short_name: appName,
        icons: [
          { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        theme_color: "#007AFF",
        background_color: "#ffffff",
        display: "standalone",
      };
      webFolder?.file("site.webmanifest", JSON.stringify(manifest, null, 2));

      // HTML Head Snippet
      const htmlSnippet = `<!-- Favicons & App Icons generated by Toolzium.com -->\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n<link rel="manifest" href="/site.webmanifest">\n<meta name="theme-color" content="#007AFF">`;
      webFolder?.file("html_head_tags.html", htmlSnippet);

      // Export ZIP
      const zipContent = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipContent);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${appName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-app-icons.zip`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Complete App Icon Pack downloaded!", { id: "zip-gen" });
    } catch {
      toast.error("Failed to generate icon pack", { id: "zip-gen" });
    } finally {
      setIsGenerating(false);
    }
  };

  const htmlHeadCode = `<!-- Toolzium App Icons & Favicon Head Tags -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#007AFF">`;

  const handleCopyHtml = async () => {
    await navigator.clipboard.writeText(htmlHeadCode);
    setCopiedCode(true);
    toast.success("HTML tags copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <ToolPageHeader
        title="In-Browser Multi-Platform App Icon & Favicon Studio"
        description="Generate complete, production-ready icon asset bundles for iOS (Xcode), Android (Google Play), Web (Favicons & PWA), and macOS in 1 click."
        icon={Smartphone}
      />

      <canvas ref={canvasRef} className="hidden" />

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Upload & Base Settings Card */}
          <GlassCard className="p-5 rounded-2xl border-border/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-primary" /> Icon Configuration
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPadding(15);
                  setBorderRadius(22);
                  setBgStyle(COLOR_PRESETS[0].bg);
                  setAppName("Toolzium");
                }}
                className="h-6 px-2 text-[11px] text-muted-foreground"
              >
                <RotateCcw className="h-3 w-3 mr-1" /> Reset
              </Button>
            </div>

            {/* App Name Input */}
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                App / Brand Name
              </label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="My App"
                className="w-full h-9 rounded-xl border border-border/80 bg-background px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Upload Button */}
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Upload Icon / Logo (PNG, SVG, JPG)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-10 rounded-xl font-semibold border-dashed border-border/80 hover:border-primary/50 cursor-pointer gap-2"
              >
                <Upload className="h-4 w-4 text-primary" />
                Upload Custom Image or SVG
              </Button>
            </div>

            {/* Padding Slider */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Logo Padding / Scale</span>
                <span className="text-foreground">{padding}%</span>
              </div>
              <Slider
                value={[padding]}
                min={0}
                max={40}
                step={1}
                onValueChange={(vals) => setPadding(vals[0])}
                className="cursor-pointer"
              />
            </div>

            {/* Corner Radius Slider */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Corner Radius (Squircle)</span>
                <span className="text-foreground">{borderRadius}%</span>
              </div>
              <Slider
                value={[borderRadius]}
                min={0}
                max={50}
                step={1}
                onValueChange={(vals) => setBorderRadius(vals[0])}
                className="cursor-pointer"
              />
            </div>

            {/* Background Color Presets */}
            <div className="space-y-2 pt-1">
              <label className="block text-[11px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-primary" /> Background Palette
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setBgStyle(p.bg)}
                    title={p.label}
                    className="w-7 h-7 rounded-lg border border-border/80 transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
                    style={{ background: p.bg }}
                  />
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Export Action Card */}
          <GlassCard className="p-5 rounded-2xl border-border/80 space-y-3 bg-primary/5">
            <Button
              onClick={handleDownloadZip}
              disabled={isGenerating}
              className="w-full h-12 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-md cursor-pointer gap-2"
            >
              {isGenerating ? (
                <Sparkles className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isGenerating ? "Building ZIP Bundle..." : "Download Full App Icon Pack (.ZIP)"}
            </Button>
            <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-green-500" /> iOS (Xcode)
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-green-500" /> Android Mipmap
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-green-500" /> Web Favicons
              </span>
            </div>
          </GlassCard>
        </div>

        {/* Live Device Previews (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Platform Tab Buttons */}
          <div className="flex items-center gap-2 border-b border-border/60 pb-2">
            {[
              { id: "ios", label: "iPhone Home Screen", icon: Smartphone },
              { id: "android", label: "Android Pixel", icon: Smartphone },
              { id: "web", label: "Browser Tab & Web", icon: Monitor },
              { id: "mac", label: "macOS Dock", icon: Monitor },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <Button
                  key={t.id}
                  variant={activeTab === t.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(t.id as typeof activeTab)}
                  className={`h-8 rounded-xl text-xs font-semibold gap-1.5 cursor-pointer ${
                    activeTab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </Button>
              );
            })}
          </div>

          {/* Preview Container Frame */}
          <GlassCard className="p-6 rounded-3xl border-border/80 flex flex-col items-center justify-center min-h-[380px] bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-md relative overflow-hidden">
            {/* iOS Preview */}
            {activeTab === "ios" && (
              <div className="flex flex-col items-center space-y-3">
                <div
                  className="w-28 h-28 flex items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-300 border border-white/20"
                  style={{
                    background: bgStyle,
                    borderRadius: `${borderRadius}%`,
                  }}
                >
                  {imageSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageSrc}
                      alt="Icon Preview"
                      style={{
                        padding: `${padding}%`,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>
                <span className="text-xs font-semibold text-foreground tracking-wide">
                  {appName}
                </span>
                <Badge variant="outline" className="text-[10px] mt-2 font-mono">
                  iOS 18 Squircle (1024×1024 @3x)
                </Badge>
              </div>
            )}

            {/* Android Preview */}
            {activeTab === "android" && (
              <div className="flex items-center gap-8">
                {/* Adaptive Round */}
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl border border-white/20 overflow-hidden"
                    style={{ background: bgStyle }}
                  >
                    {imageSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imageSrc}
                        alt="Round"
                        style={{ padding: `${padding + 5}%`, width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-muted-foreground">Adaptive Round</span>
                </div>

                {/* Android Squircle */}
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl border border-white/20 overflow-hidden"
                    style={{ background: bgStyle }}
                  >
                    {imageSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imageSrc}
                        alt="Squircle"
                        style={{ padding: `${padding}%`, width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-muted-foreground">Android Standard</span>
                </div>
              </div>
            )}

            {/* Web Browser Tab Preview */}
            {activeTab === "web" && (
              <div className="w-full max-w-md space-y-4">
                {/* Browser Tab Mockup */}
                <div className="rounded-xl border border-border/80 bg-background/80 overflow-hidden shadow-lg">
                  <div className="h-8 bg-muted/60 flex items-center px-3 gap-2 border-b border-border/60">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    {/* Active Tab */}
                    <div className="h-6 px-2.5 rounded-t-lg bg-card flex items-center gap-1.5 text-[11px] font-medium text-foreground shadow-sm">
                      <div
                        className="w-3.5 h-3.5 rounded-sm overflow-hidden shrink-0 flex items-center justify-center"
                        style={{ background: bgStyle }}
                      >
                        {imageSrc && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={imageSrc} alt="Favicon" className="w-full h-full object-contain" />
                        )}
                      </div>
                      <span className="truncate max-w-[120px]">{appName} — Online</span>
                    </div>
                  </div>
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    16×16 & 32×32 Favicon Preview
                  </div>
                </div>
              </div>
            )}

            {/* macOS Dock Preview */}
            {activeTab === "mac" && (
              <div className="flex flex-col items-center space-y-3">
                <div
                  className="w-28 h-28 flex items-center justify-center shadow-2xl relative overflow-hidden border border-white/25"
                  style={{
                    background: bgStyle,
                    borderRadius: "22.5%",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                  }}
                >
                  {imageSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageSrc}
                      alt="Mac Icon"
                      style={{ padding: `${padding}%`, width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  )}
                </div>
                <span className="text-xs font-semibold text-foreground tracking-wide">
                  {appName}
                </span>
                <Badge variant="outline" className="text-[10px] font-mono">
                  macOS Sonoma Dock Icon (512×512)
                </Badge>
              </div>
            )}
          </GlassCard>

          {/* HTML Meta Code Copy Box */}
          <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileArchive className="h-4 w-4 text-primary" /> HTML Head Code Snippet
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyHtml}
                className="h-7 px-2.5 rounded-lg text-xs font-semibold border-border/80 cursor-pointer gap-1"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedCode ? "Copied" : "Copy Code"}
              </Button>
            </div>
            <pre className="p-3 rounded-xl bg-muted/40 font-mono text-[11px] text-muted-foreground overflow-x-auto">
              {htmlHeadCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
