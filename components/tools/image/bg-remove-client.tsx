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
  Eye,
  SlidersHorizontal,
  Zap,
  Cpu,
} from "lucide-react";
import { removeBackground } from "@imgly/background-removal";

export default function BgRemoveClient() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");
  const [bgPreviewColor, setBgPreviewColor] = useState<string>("transparent");
  const [tolerance, setTolerance] = useState<number>(30);
  const [mode, setMode] = useState<"ai" | "instant">("ai");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

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
        if (mode === "ai") {
          processAiRemoval(file);
        } else {
          processInstantRemoval(img, tolerance);
        }
      };
    }
  };

  const processAiRemoval = async (fileToProcess?: File) => {
    const targetFile = fileToProcess || imageFile;
    if (!targetFile) return;

    setIsProcessing(true);
    setProgressPercent(10);
    setProgressMsg("Loading AI Vision Neural Weights (~4MB)...");

    setTimeout(() => {
      resultCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    try {
      const imageBlob = await removeBackground(targetFile, {
        model: "isnet_quint8", // Quantized fast 4MB ISNet neural model
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
              setProgressMsg(`Segmenting portrait & refining hair edges (${calculated}%)...`);
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
    }, 200);
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <ToolPageHeader
        title="AI Background Remover"
        description="Remove image backgrounds automatically with HD AI neural segmentation. Perfect cutouts for portraits, products, and graphics."
      />

      {/* Main Upload Zone */}
      <Card className="border border-border/80 shadow-md bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-xl">
            <span className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Image
            </span>
            <Badge variant="secondary" className="gap-1 font-normal text-primary bg-primary/10">
              <Cpu className="h-3.5 w-3.5" />
              Neural Segmentation AI
            </Badge>
          </CardTitle>
          <CardDescription>
            Supports PNG, JPG, and WebP up to 25MB.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Selector */}
          <div className="flex items-center justify-between p-2 rounded-xl border bg-muted/20">
            <span className="text-xs font-semibold text-muted-foreground ml-2">Engine Mode:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setMode("ai")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  mode === "ai"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                HD Neural AI (Portraits & People)
              </button>
              <button
                type="button"
                onClick={() => setMode("instant")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  mode === "instant"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                Instant Color Threshold
              </button>
            </div>
          </div>

          <div
            className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 bg-muted/20 hover:bg-muted/40 group"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="p-4 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg">Click to upload or drag & drop image</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Portraits, product photos, graphics, and logos work best
            </p>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          {originalUrl && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border bg-muted/30">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={originalUrl}
                  alt="Original preview"
                  className="h-14 w-14 rounded-lg object-cover border"
                />
                <div className="min-w-0">
                  <p className="font-medium truncate text-sm">{imageFile?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(imageFile?.size ? (imageFile.size / 1024 / 1024).toFixed(2) : 0)} MB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  size="sm"
                >
                  Change Image
                </Button>
                <Button
                  onClick={() => {
                    if (mode === "ai") {
                      processAiRemoval();
                    } else if (imageElementRef.current) {
                      processInstantRemoval(imageElementRef.current, tolerance);
                    }
                  }}
                  disabled={isProcessing}
                  size="sm"
                  className="gap-1.5 shadow-sm"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Remove Background
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results & Live Side-by-Side Showcase */}
      <div ref={resultCardRef} className="space-y-6">
        {isProcessing && (
          <Card className="border border-primary/30 bg-card/60 backdrop-blur shadow-md">
            <CardContent className="py-10 text-center space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
              <div className="space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">{progressMsg || "Processing image..."}</span>
                  <span className="text-primary">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2.5" />
              </div>
            </CardContent>
          </Card>
        )}

        {(resultUrl || originalUrl) && !isProcessing && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Original Image Card */}
            <Card className="border bg-card/60 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  Original Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-xl overflow-hidden border bg-black/5 dark:bg-white/5 min-h-[280px] flex items-center justify-center">
                  <img
                    src={originalUrl!}
                    alt="Original Image"
                    className="max-h-[360px] w-full object-contain p-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Transparent Output Result Card */}
            <Card className="border border-primary/40 bg-card/60 backdrop-blur shadow-md">
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    Background Removed Result
                  </CardTitle>
                </div>
                {resultUrl && (
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 gap-1 text-xs font-semibold">
                    <Sparkles className="h-3 w-3" />
                    HD Cutout Ready
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {resultUrl ? (
                  <>
                    {mode === "instant" && (
                      <div className="p-3 rounded-lg border bg-muted/20 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                            <SlidersHorizontal className="h-3.5 w-3.5 text-primary" /> Removal Sensitivity: {tolerance}%
                          </span>
                          <span className="text-[11px] text-muted-foreground">Adjust threshold</span>
                        </div>
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
                          className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
                        />
                      </div>
                    )}

                    {/* Background Preview Customization */}
                    <div className="flex items-center justify-between text-xs border rounded-lg p-2 bg-muted/20">
                      <span className="font-medium text-muted-foreground flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5" /> Preview Backdrop:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setBgPreviewColor("transparent")}
                          className={`px-2 py-1 rounded text-[11px] font-medium border transition ${
                            bgPreviewColor === "transparent" ? "border-primary bg-primary/10 text-primary" : "border-transparent text-muted-foreground"
                          }`}
                        >
                          Grid
                        </button>
                        <button
                          type="button"
                          onClick={() => setBgPreviewColor("#ffffff")}
                          className={`px-2 py-1 rounded text-[11px] font-medium border transition ${
                            bgPreviewColor === "#ffffff" ? "border-primary bg-primary/10 text-primary" : "border-transparent text-muted-foreground"
                          }`}
                        >
                          White
                        </button>
                        <button
                          type="button"
                          onClick={() => setBgPreviewColor("#000000")}
                          className={`px-2 py-1 rounded text-[11px] font-medium border transition ${
                            bgPreviewColor === "#000000" ? "border-primary bg-primary/10 text-primary" : "border-transparent text-muted-foreground"
                          }`}
                        >
                          Black
                        </button>
                      </div>
                    </div>

                    <div
                      className="relative rounded-xl overflow-hidden border min-h-[280px] flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: bgPreviewColor === "transparent" ? "transparent" : bgPreviewColor,
                      }}
                    >
                      {bgPreviewColor === "transparent" && (
                        <div className="absolute inset-0 pointer-events-none custom-checkerboard" />
                      )}
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
                      <img
                        src={resultUrl}
                        alt="Background removed result"
                        className="max-h-[360px] w-full object-contain p-2 relative z-10"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Button onClick={handleDownload} className="w-full sm:flex-1 gap-2 shadow-md">
                        <Download className="h-4 w-4" />
                        Download Transparent PNG
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (mode === "ai") {
                            processAiRemoval();
                          } else if (imageElementRef.current) {
                            processInstantRemoval(imageElementRef.current, tolerance);
                          }
                        }}
                        className="w-full sm:w-auto gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Re-process
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="min-h-[280px] rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-2">
                    <Layers className="h-8 w-8 opacity-40" />
                    <p className="text-sm font-medium">No transparent result generated yet</p>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      Click &quot;Remove Background&quot; above to process image.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
