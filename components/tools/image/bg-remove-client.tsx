"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  Upload,
  Download,
  Loader2,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  Layers,
  Wand2,
  SlidersHorizontal,
  Zap,
  Split,
  Palette,
  ArrowRight,
  User,
  ShoppingBag,
  Sparkle,
  ArrowLeft,
} from "lucide-react";
import { removeBackground } from "@imgly/background-removal";

const SAMPLE_IMAGES = [
  {
    name: "Portrait Model",
    category: "Portrait",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    icon: User,
  },
  {
    name: "Product Sneaker",
    category: "E-Commerce",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    icon: ShoppingBag,
  },
  {
    name: "Studio Camera",
    category: "Graphics",
    url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    icon: Sparkle,
  },
];

export default function BgRemoveClient() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");
  const [bgPreviewColor, setBgPreviewColor] = useState<string>("transparent");
  const [tolerance, setTolerance] = useState<number>(30);
  const [mode, setMode] = useState<"ai" | "instant">("instant");

  // High-taste interactive features
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [viewMode, setViewMode] = useState<"split" | "side">("split");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  const loadSampleImage = async (sampleUrl: string, sampleName: string) => {
    setIsProcessing(true);
    setProgressPercent(10);
    setProgressMsg(`Loading ${sampleName}...`);
    setOriginalUrl(sampleUrl);
    setResultUrl(null);

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = sampleUrl;
      img.onload = () => {
        imageElementRef.current = img;
        if (mode === "instant") {
          processInstantRemoval(img, tolerance);
        } else {
          fetch(sampleUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], `${sampleName.toLowerCase().replace(/\s+/g, "-")}.jpg`, { type: "image/jpeg" });
              setImageFile(file);
              processAiRemoval(file);
            })
            .catch(() => {
              processInstantRemoval(img, tolerance);
            });
        }
      };
    } catch (err) {
      console.error("Failed to load sample:", err);
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file (PNG, JPG, WebP).");
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setOriginalUrl(url);
      setResultUrl(null);
      setProgressPercent(0);
      setProgressMsg("");

      const img = new Image();
      img.src = url;
      img.onload = () => {
        imageElementRef.current = img;
        if (mode === "instant") {
          processInstantRemoval(img, tolerance);
        } else {
          processAiRemoval(file);
        }
      };
    }
  };

  const processAiRemoval = async (fileToProcess?: File) => {
    const targetFile = fileToProcess || imageFile;
    if (!targetFile) return;

    setIsProcessing(true);
    setProgressPercent(10);
    setProgressMsg("Initializing Neural ISNet U2-Net Model...");

    try {
      const imageBlob = await removeBackground(targetFile, {
        model: "isnet_fp16",
        publicPath: "https://staticimgly.com/@imgly/background-removal-data/1.5.6/dist/",
        progress: (key: string, current: number, total: number) => {
          let calculated = 15;
          if (total > 0) {
            const ratio = current / total;
            if (key.includes("fetch") || key.includes("model")) {
              calculated = Math.min(65, Math.round(15 + ratio * 50));
              setProgressMsg(`Downloading AI Vision weights (${calculated}%)...`);
            } else if (key.includes("compute") || key.includes("inference")) {
              calculated = Math.min(95, Math.round(65 + ratio * 30));
              setProgressMsg(`Refining hair & portrait edges (${calculated}%)...`);
            } else {
              calculated = Math.min(90, Math.round(20 + ratio * 70));
              setProgressMsg(`Processing neural tensor (${calculated}%)...`);
            }
          }
          setProgressPercent(calculated);
        },
      });

      setProgressPercent(99);
      setProgressMsg("Finalizing HD transparent PNG...");

      const url = URL.createObjectURL(imageBlob);
      setResultUrl(url);
      setProgressPercent(100);
      setProgressMsg("Complete!");
      toast.success("Background removed cleanly with HD AI Precision!");
    } catch (err) {
      console.warn("AI Model error, falling back to instant removal:", err);
      if (imageElementRef.current) {
        processInstantRemoval(imageElementRef.current, tolerance);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const processInstantRemoval = (imgElement: HTMLImageElement, currentTolerance: number) => {
    setIsProcessing(true);
    setProgressPercent(20);
    setProgressMsg("Analyzing background color threshold...");

    setTimeout(() => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const width = imgElement.naturalWidth || imgElement.width || 800;
        const height = imgElement.naturalHeight || imgElement.height || 600;
        canvas.width = width;
        canvas.height = height;

        if (!ctx) {
          setIsProcessing(false);
          return;
        }

        ctx.drawImage(imgElement, 0, 0);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        const bgR = data[0];
        const bgG = data[1];
        const bgB = data[2];

        const tolVal = currentTolerance * 2.5;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const diff = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);

          if (diff < tolVal) {
            const alpha = Math.max(0, Math.min(255, (diff / tolVal) * 255));
            data[i + 3] = Math.round(alpha);
          }
        }

        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setResultUrl(url);
            setProgressPercent(100);
            setProgressMsg("Complete!");
            setIsProcessing(false);
          } else {
            setIsProcessing(false);
          }
        }, "image/png");
      } catch (err) {
        console.error("Instant Removal Error:", err);
        setIsProcessing(false);
      }
    }, 150);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setImageFile(file);
        const url = URL.createObjectURL(file);
        setOriginalUrl(url);
        setResultUrl(null);
        if (mode === "ai") {
          processAiRemoval(file);
        } else {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            imageElementRef.current = img;
            processInstantRemoval(img, tolerance);
          };
        }
      } else {
        toast.error("Please drop an image file.");
      }
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `toolzium-nobg-${imageFile?.name.replace(/\.[^/.]+$/, "") || "image"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSplitMove = (clientX: number) => {
    if (!splitContainerRef.current) return;
    const rect = splitContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const resetToUpload = () => {
    setImageFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setIsProcessing(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <ToolPageHeader
        title="AI Background Remover Studio"
        description="Remove image backgrounds instantly with high-precision thresholding or HD Neural AI segmentation. Complete with interactive comparison slider and studio backdrop presets."
      />

      {/* SINGLE VIEWPORT WORKSPACE CARD */}
      <Card className="border border-border/80 shadow-xl bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden min-h-[520px] flex flex-col">
        {/* State A: Image Upload Box & Sample Cards (When no image is loaded) */}
        {!originalUrl && (
          <>
            <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2 tracking-tight">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Image Studio
                </CardTitle>

                {/* Engine Selector Pills */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl border bg-background/80 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setMode("instant")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      mode === "instant"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Zap className="h-3.5 w-3.5" />
                    Instant Color Threshold
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("ai")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      mode === "ai"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    HD Neural AI
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div
                className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 bg-muted/10 hover:bg-muted/30 group flex-1 flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="p-4 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg tracking-tight">Click to upload or drag & drop image</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports PNG, JPG, and WebP up to 25MB (Portraits, Products, Logos)
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>

              {/* 1-Click Sample Test Cards */}
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Test 1-Click Interactive Studio Samples:
                  </span>
                  <span className="text-[11px] text-muted-foreground">Click any card to try instantly</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {SAMPLE_IMAGES.map((sample) => (
                    <button
                      key={sample.name}
                      type="button"
                      onClick={() => loadSampleImage(sample.url, sample.name)}
                      disabled={isProcessing}
                      className="group relative rounded-xl border bg-card hover:border-primary/50 overflow-hidden p-2 text-left transition-all duration-200 hover:shadow-md flex items-center gap-3"
                    >
                      <img
                        src={sample.url}
                        alt={sample.name}
                        className="h-12 w-12 rounded-lg object-cover border group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0 flex-1 hidden sm:block">
                        <p className="text-xs font-semibold truncate group-hover:text-primary transition-colors">
                          {sample.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{sample.category}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all ml-auto shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* State B: Single-Viewport Live Studio (Replaces upload box in-place when image is loaded!) */}
        {originalUrl && (
          <>
            {/* Studio Header Bar */}
            <CardHeader className="border-b border-border/40 bg-muted/20 pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetToUpload}
                    className="gap-1 text-xs text-muted-foreground hover:text-foreground p-1.5 h-8"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Upload New
                  </Button>
                  <div className="h-4 w-px bg-border hidden md:block" />
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="font-semibold text-sm truncate max-w-[200px]">
                      {imageFile?.name || "Sample Image"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* View Mode Pills */}
                  <div className="flex items-center gap-1 p-1 rounded-lg border bg-background/80 text-xs">
                    <button
                      type="button"
                      onClick={() => setViewMode("split")}
                      className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                        viewMode === "split"
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Split className="h-3 w-3" />
                      Split Compare
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("side")}
                      className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                        viewMode === "side"
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Layers className="h-3 w-3" />
                      Side-by-Side
                    </button>
                  </div>

                  {/* Primary Download Button Right in Header */}
                  {resultUrl && (
                    <Button onClick={handleDownload} size="sm" className="gap-1.5 shadow-sm font-semibold">
                      <Download className="h-4 w-4" />
                      Download PNG
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            {/* Studio Main Focal Viewport (No scrolling required!) */}
            <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
              {isProcessing ? (
                <div className="py-20 text-center space-y-4 my-auto">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                  <div className="space-y-2 max-w-md mx-auto">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-muted-foreground">{progressMsg || "Processing image..."}</span>
                      <span className="text-primary">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2.5" />
                  </div>
                </div>
              ) : (
                <>
                  {/* View Mode 1: Interactive Split Comparison Slider (Main Screen Focal Point) */}
                  {viewMode === "split" && resultUrl && (
                    <div className="relative flex-1 flex flex-col min-h-[360px] max-h-[460px]">
                      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-1.5 px-1">
                        <span>Original Image</span>
                        <span className="text-primary flex items-center gap-1">
                          <Split className="h-3.5 w-3.5" /> Drag Split Line to Compare Cutout
                        </span>
                        <span>Transparent Cutout</span>
                      </div>

                      <div
                        ref={splitContainerRef}
                        className="relative flex-1 rounded-2xl overflow-hidden border min-h-[340px] flex items-center justify-center select-none cursor-ew-resize touch-none shadow-inner"
                        style={{
                          backgroundColor: bgPreviewColor === "transparent" ? "transparent" : bgPreviewColor,
                        }}
                        onMouseDown={(e) => {
                          setIsDraggingSlider(true);
                          handleSplitMove(e.clientX);
                        }}
                        onMouseMove={(e) => {
                          if (isDraggingSlider) handleSplitMove(e.clientX);
                        }}
                        onMouseUp={() => setIsDraggingSlider(false)}
                        onMouseLeave={() => setIsDraggingSlider(false)}
                        onTouchMove={(e) => handleSplitMove(e.touches[0].clientX)}
                      >
                        {bgPreviewColor === "transparent" && (
                          <div className="absolute inset-0 pointer-events-none custom-checkerboard" />
                        )}

                        {/* Result (Transparent) Layer */}
                        <img
                          src={resultUrl}
                          alt="Cutout result"
                          className="absolute inset-0 h-full w-full object-contain p-3 select-none pointer-events-none z-10"
                        />

                        {/* Original Image Clipped Layer */}
                        <div
                          className="absolute inset-0 overflow-hidden z-20 pointer-events-none border-r-2 border-primary"
                          style={{ width: `${sliderPos}%` }}
                        >
                          <img
                            src={originalUrl}
                            alt="Original image"
                            className="absolute inset-0 h-full w-full object-contain p-3 select-none max-w-none"
                            style={{ width: splitContainerRef.current?.clientWidth || "100%" }}
                          />
                        </div>

                        {/* Drag Handle Divider */}
                        <div
                          className="absolute top-0 bottom-0 z-30 w-1 bg-primary cursor-ew-resize flex items-center justify-center shadow-lg"
                          style={{ left: `${sliderPos}%` }}
                        >
                          <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md border-2 border-background">
                            <Split className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View Mode 2: Side-by-Side View */}
                  {viewMode === "side" && resultUrl && (
                    <div className="grid gap-4 md:grid-cols-2 flex-1 min-h-[340px]">
                      <div className="space-y-1.5 flex flex-col">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                          <ImageIcon className="h-3.5 w-3.5" /> Original Image
                        </p>
                        <div className="relative flex-1 rounded-xl overflow-hidden border bg-black/5 dark:bg-white/5 flex items-center justify-center">
                          <img
                            src={originalUrl}
                            alt="Original"
                            className="max-h-[340px] w-full object-contain p-2"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 flex flex-col">
                        <p className="text-xs font-semibold text-primary flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Transparent Result
                        </p>
                        <div
                          className="relative flex-1 rounded-xl overflow-hidden border flex items-center justify-center transition-colors"
                          style={{
                            backgroundColor: bgPreviewColor === "transparent" ? "transparent" : bgPreviewColor,
                          }}
                        >
                          {bgPreviewColor === "transparent" && (
                            <div className="absolute inset-0 pointer-events-none custom-checkerboard" />
                          )}
                          <img
                            src={resultUrl}
                            alt="Transparent result"
                            className="max-h-[340px] w-full object-contain p-2 relative z-10"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Studio Palette & Sensitivity Bar */}
                  <div className="pt-2 border-t flex flex-col md:flex-row items-center justify-between gap-3">
                    {/* Backdrop Presets */}
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-semibold text-muted-foreground flex items-center gap-1 shrink-0">
                        <Palette className="h-3.5 w-3.5 text-primary" /> Backdrop:
                      </span>
                      {[
                        { name: "Grid", color: "transparent" },
                        { name: "White", color: "#ffffff" },
                        { name: "Dark", color: "#0f172a" },
                        { name: "Emerald", color: "#ecfdf5" },
                        { name: "Blue", color: "#eff6ff" },
                        { name: "Rose", color: "#fff1f2" },
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setBgPreviewColor(preset.color)}
                          className={`px-2 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            bgPreviewColor === preset.color
                              ? "border-primary bg-primary/10 text-primary shadow-xs"
                              : "border-transparent bg-background/60 hover:bg-background text-muted-foreground"
                          }`}
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full border shadow-xs"
                            style={{
                              backgroundColor: preset.color === "transparent" ? "#ffffff" : preset.color,
                              backgroundImage: preset.color === "transparent" ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%)" : "none",
                              backgroundSize: "6px 6px"
                            }}
                          />
                          {preset.name}
                        </button>
                      ))}
                    </div>

                    {/* Instant Mode Sensitivity Slider (Inline) */}
                    {mode === "instant" && (
                      <div className="flex items-center gap-2 text-xs border rounded-lg px-3 py-1 bg-muted/20 w-full md:w-auto">
                        <span className="text-muted-foreground font-semibold shrink-0">Tolerance: {tolerance}%</span>
                        <input
                          type="range"
                          min="10"
                          max="80"
                          value={tolerance}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setTolerance(val);
                            if (imageElementRef.current) {
                              processInstantRemoval(imageElementRef.current, val);
                            }
                          }}
                          className="w-24 accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </>
        )}
      </Card>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-checkerboard {
          background-image: linear-gradient(45deg, rgba(0,0,0,0.06) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(0,0,0,0.06) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.06) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.06) 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
      `}} />
    </div>
  );
}
