"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  Image as ImageIcon, Upload, Download, Trash2, CheckCircle2,
  RefreshCw, Archive, Sparkles, Layers, Sliders, ShieldCheck, Zap
} from "lucide-react";
import JSZip from "jszip";
import toast from "react-hot-toast";

type TargetFormat = "image/png" | "image/jpeg" | "image/webp" | "image/bmp" | "image/x-icon";

interface ConvertedFile {
  id: string;
  name: string;
  originalSize: number;
  convertedSize?: number;
  originalUrl: string;
  convertedUrl?: string;
  convertedBlob?: Blob;
  targetFormat: TargetFormat;
  status: "idle" | "converting" | "done" | "error";
  width: number;
  height: number;
}

const FORMAT_OPTIONS: { label: string; value: TargetFormat; ext: string }[] = [
  { label: "PNG (.png)", value: "image/png", ext: "png" },
  { label: "JPG / JPEG (.jpg)", value: "image/jpeg", ext: "jpg" },
  { label: "WebP (.webp)", value: "image/webp", ext: "webp" },
  { label: "BMP (.bmp)", value: "image/bmp", ext: "bmp" },
  { label: "ICO Icon (.ico)", value: "image/x-icon", ext: "ico" },
];

export default function UniversalConverterClient() {
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [globalFormat, setGlobalFormat] = useState<TargetFormat>("image/webp");
  const [quality, setQuality] = useState<number>(85);
  const [maxDimension, setMaxDimension] = useState<number>(0); // 0 = original
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFilesAdded = (incomingFiles: FileList | null) => {
    if (!incomingFiles || incomingFiles.length === 0) return;

    const newFiles: ConvertedFile[] = [];

    Array.from(incomingFiles).forEach((file) => {
      if (!file.type.startsWith("image/") && !file.name.endsWith(".svg") && !file.name.endsWith(".ico")) {
        toast.error(`${file.name} is not a supported image.`);
        return;
      }

      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.name + file.size + file.lastModified
              ? { ...f, width: img.naturalWidth, height: img.naturalHeight }
              : f
          )
        );
      };
      img.src = url;

      newFiles.push({
        id: file.name + file.size + file.lastModified,
        name: file.name,
        originalSize: file.size,
        originalUrl: url,
        targetFormat: globalFormat,
        status: "idle",
        width: 0,
        height: 0,
      });
    });

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
      toast.success(`Added ${newFiles.length} image(s). Ready to convert!`);
    }
  };

  const convertSingleFile = async (item: ConvertedFile): Promise<ConvertedFile> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        let targetW = img.naturalWidth;
        let targetH = img.naturalHeight;

        if (maxDimension > 0 && (targetW > maxDimension || targetH > maxDimension)) {
          if (targetW > targetH) {
            targetH = Math.round((targetH * maxDimension) / targetW);
            targetW = maxDimension;
          } else {
            targetW = Math.round((targetW * maxDimension) / targetH);
            targetH = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve({ ...item, status: "error" });
          return;
        }

        // Fill white background for JPEG conversions from transparent PNGs
        if (item.targetFormat === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, targetW, targetH);
        }

        ctx.drawImage(img, 0, 0, targetW, targetH);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({ ...item, status: "error" });
              return;
            }
            const convertedUrl = URL.createObjectURL(blob);
            resolve({
              ...item,
              convertedBlob: blob,
              convertedUrl,
              convertedSize: blob.size,
              status: "done",
              width: targetW,
              height: targetH,
            });
          },
          item.targetFormat,
          quality / 100
        );
      };

      img.onerror = () => {
        resolve({ ...item, status: "error" });
      };

      img.src = item.originalUrl;
    });
  };

  const handleConvertAll = async () => {
    if (files.length === 0) return;
    setIsProcessingAll(true);
    toast.loading("Converting images...", { id: "convert-toast" });

    const updated = await Promise.all(
      files.map(async (file) => {
        return await convertSingleFile(file);
      })
    );

    setFiles(updated);
    setIsProcessingAll(false);
    toast.success("All images converted successfully!", { id: "convert-toast" });
  };

  const handleDownloadSingle = (file: ConvertedFile) => {
    if (!file.convertedUrl || !file.convertedBlob) return;
    const formatInfo = FORMAT_OPTIONS.find((f) => f.value === file.targetFormat);
    const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const downloadName = `${baseName}.${formatInfo?.ext || "jpg"}`;

    const a = document.createElement("a");
    a.href = file.convertedUrl;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadZip = async () => {
    const doneFiles = files.filter((f) => f.convertedBlob && f.status === "done");
    if (doneFiles.length === 0) {
      toast.error("Please convert your images before downloading ZIP.");
      return;
    }

    setIsZipping(true);
    try {
      const zip = new JSZip();
      doneFiles.forEach((file) => {
        if (!file.convertedBlob) return;
        const formatInfo = FORMAT_OPTIONS.find((f) => f.value === file.targetFormat);
        const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
        const downloadName = `${baseName}.${formatInfo?.ext || "jpg"}`;
        zip.file(downloadName, file.convertedBlob);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `toolzium-converted-images.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("ZIP archive downloaded!");
    } catch (err) {
      toast.error("Failed to generate ZIP archive.");
    } finally {
      setIsZipping(false);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleClearAll = () => {
    files.forEach((f) => {
      URL.revokeObjectURL(f.originalUrl);
      if (f.convertedUrl) URL.revokeObjectURL(f.convertedUrl);
    });
    setFiles([]);
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Header */}
        <ToolPageHeader
          title="Universal Batch Image Converter Studio"
          description="Convert between PNG, JPG, WebP, BMP, and ICO formats instantly in your browser. Batch convert multiple images, resize dimensions, and download all as a ZIP."
          icon={ImageIcon}
          badgeText="⚡ 100% In-Browser Canvas & WASM • Zero Upload Lag • Unlimited Batch"
        />

        {/* Global Conversion Settings Toolbar */}
        <GlassCard className="p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Global Batch Settings</h3>
            </div>

            {files.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All ({files.length})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Target Format */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase">Convert All Images To</Label>
              <select
                value={globalFormat}
                onChange={(e) => {
                  const val = e.target.value as TargetFormat;
                  setGlobalFormat(val);
                  setFiles((prev) => prev.map((f) => ({ ...f, targetFormat: val, status: "idle" })));
                }}
                className="w-full bg-background/80 border border-border/80 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-primary/50 outline-none"
              >
                {FORMAT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quality Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                <span className="uppercase">Output Quality</span>
                <span className="font-mono text-primary font-extrabold">{quality}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Small Size (50%)</span>
                <span>Balanced (85%)</span>
                <span>Lossless (100%)</span>
              </div>
            </div>

            {/* Max Dimension */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase">Max Resolution Constraint</Label>
              <select
                value={maxDimension}
                onChange={(e) => setMaxDimension(Number(e.target.value))}
                className="w-full bg-background/80 border border-border/80 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-primary/50 outline-none"
              >
                <option value={0}>Original Dimensions (No Resize)</option>
                <option value={3840}>4K Ultra HD (3840px max)</option>
                <option value={1920}>Full HD (1920px max - Best for Web)</option>
                <option value={1280}>HD Ready (1280px max)</option>
                <option value={800}>Compact Web Image (800px max)</option>
                <option value={512}>App Icon / Profile (512px max)</option>
              </select>
            </div>

          </div>
        </GlassCard>

        {/* Drag & Drop Upload Zone */}
        <GlassCard className="p-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFilesAdded(e.target.files)}
            multiple
            accept="image/*,.svg,.ico,.webp,.png,.jpg,.jpeg,.bmp"
            className="hidden"
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFilesAdded(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all",
              isDragging
                ? "border-primary bg-primary/10 scale-[1.01]"
                : "border-border/80 hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-sm">
              <Upload className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-foreground mb-1">
              Drag &amp; drop images here or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Supports PNG, JPG, JPEG, WebP, SVG, BMP, and ICO
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[11px] font-semibold rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Private In-Browser Execution
            </span>
          </div>
        </GlassCard>

        {/* Batch Action Bar */}
        {files.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/30 rounded-2xl border border-border/60">
            <span className="text-xs font-mono font-bold text-foreground">
              {files.length} Image(s) Queued • {files.filter((f) => f.status === "done").length} Converted
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                onClick={handleConvertAll}
                disabled={isProcessingAll}
                className="gap-2 font-bold text-xs h-9 px-4 rounded-xl shadow-md"
              >
                <RefreshCw className={cn("w-3.5 h-3.5", isProcessingAll && "animate-spin")} />
                <span>{isProcessingAll ? "Converting..." : "Convert All Images"}</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadZip}
                disabled={isZipping || files.filter((f) => f.status === "done").length === 0}
                className="gap-2 font-bold text-xs h-9 px-4 rounded-xl"
              >
                <Archive className="w-3.5 h-3.5 text-primary" />
                <span>{isZipping ? "Creating ZIP..." : "Download All (.ZIP)"}</span>
              </Button>
            </div>
          </div>
        )}

        {/* Converted Files Grid */}
        {files.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <GlassCard key={file.id} className="p-4 space-y-3 relative group">
                
                {/* Thumbnail & File Details */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-muted/50 border border-border/60 overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                    <img
                      src={file.convertedUrl || file.originalUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <p className="text-xs font-bold text-foreground truncate">{file.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      {formatFileSize(file.originalSize)}
                      {file.width > 0 && ` • ${file.width}×${file.height}px`}
                    </p>
                    {file.convertedSize && (
                      <span className="inline-block text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        ➔ {formatFileSize(file.convertedSize)} (
                        {Math.round((1 - file.convertedSize / file.originalSize) * 100)}% smaller)
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file.id)}
                    className="text-muted-foreground hover:text-destructive p-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Per-File Format Selector & Download */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/60">
                  <select
                    value={file.targetFormat}
                    onChange={(e) => {
                      const val = e.target.value as TargetFormat;
                      setFiles((prev) =>
                        prev.map((f) => (f.id === file.id ? { ...f, targetFormat: val, status: "idle" } : f))
                      );
                    }}
                    className="bg-background/80 border border-border/60 rounded-lg px-2 py-1 text-[11px] font-semibold"
                  >
                    {FORMAT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label.split(" ")[0]}
                      </option>
                    ))}
                  </select>

                  {file.status === "done" ? (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleDownloadSingle(file)}
                      className="text-xs font-bold gap-1.5 h-8 px-3 rounded-lg"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        const updated = await convertSingleFile(file);
                        setFiles((prev) => prev.map((f) => (f.id === file.id ? updated : f)));
                        toast.success("Converted!");
                      }}
                      className="text-xs font-bold gap-1.5 h-8 px-3 rounded-lg"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Convert
                    </Button>
                  )}
                </div>

              </GlassCard>
            ))}
          </div>
        )}

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Upload Images", description: "Select or drag & drop multiple PNG, JPG, WebP, SVG, or BMP files." },
            { step: "2", title: "Select Format & Quality", description: "Choose your target output format and adjust quality or resolution constraints." },
            { step: "3", title: "Download Instantly", description: "Save individual converted files or download all files packaged in a single ZIP archive." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Zero Server Uploads", description: "100% client-side HTML5 Canvas and WebAssembly execution guarantees absolute security and privacy." },
            { title: "Batch Processing & ZIP Export", description: "Convert dozens of high-resolution images in parallel and download them packaged in one click." },
            { title: "Next-Gen WebP Compression", description: "Compress legacy PNG and JPG assets into lightweight WebP format to speed up website load times by up to 70%." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "Are my photos uploaded to an external server?", answer: "No! All image conversions, canvas resizings, and ZIP packaging happen directly inside your web browser using WebAssembly. Your photos never leave your device." },
            { question: "Why should I convert my images to WebP?", answer: "WebP is Google's modern image format that provides superior lossless and lossy compression. WebP images are typically 25%–35% smaller in file size than equivalent JPEGs while retaining identical visual quality." },
            { question: "Is there a limit on file size or number of images?", answer: "Toolzium has zero artificial limits. You can convert as many images as your computer's RAM and CPU can process." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/image/universal-converter" />

      </div>
    </div>
  );
}
