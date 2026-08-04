"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InputField from "@/components/shared/form-fields/input-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import Stat from "@/components/shared/stat";
import { ResetButton, ActionButton } from "@/components/shared/action-buttons";
import { Button } from "@/components/ui/button";
import { Scaling, Upload, Download, RefreshCw, Trash2, Image as ImageIcon } from "lucide-react";
import JSZip from "jszip";

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

export default function ImageResizerClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [resizeMode, setResizeMode] = useState<"pixel" | "percent">("pixel");
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [percentage, setPercentage] = useState<number>(50);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);
  const [format, setFormat] = useState<"original" | "image/jpeg" | "image/png" | "image/webp">("original");
  const [quality, setQuality] = useState<number>(85);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | File[]) => {
    const validFiles = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) return;

    validFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const newItem: ImageItem = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          name: file.name,
          originalWidth: img.width,
          originalHeight: img.height,
          originalSize: file.size,
          originalUrl: url,
          resizedUrl: null,
          resizedWidth: img.width,
          resizedHeight: img.height,
          resizedSize: file.size,
        };
        setImages((prev) => [...prev, newItem]);
        if (images.length === 0) {
          setTargetWidth(img.width);
          setTargetHeight(img.height);
        }
      };
      img.src = url;
    });
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

    const updatedImages = await Promise.all(
      images.map(async (item) => {
        return new Promise<ImageItem>((resolve) => {
          const img = new Image();
          img.onload = () => {
            let outW = targetWidth;
            let outH = targetHeight;

            if (resizeMode === "percent") {
              outW = Math.max(1, Math.round((item.originalWidth * percentage) / 100));
              outH = Math.max(1, Math.round((item.originalHeight * percentage) / 100));
            } else if (keepAspectRatio) {
              const ratio = Math.min(targetWidth / item.originalWidth, targetHeight / item.originalHeight);
              outW = Math.max(1, Math.round(item.originalWidth * ratio));
              outH = Math.max(1, Math.round(item.originalHeight * ratio));
            }

            const canvas = document.createElement("canvas");
            canvas.width = outW;
            canvas.height = outH;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              resolve(item);
              return;
            }

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, outW, outH);

            const mimeType = format === "original" ? item.file.type || "image/png" : format;
            const qVal = mimeType === "image/png" ? 1 : quality / 100;

            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve(item);
                  return;
                }
                const resizedUrl = URL.createObjectURL(blob);
                resolve({
                  ...item,
                  resizedUrl,
                  resizedWidth: outW,
                  resizedHeight: outH,
                  resizedSize: blob.size,
                });
              },
              mimeType,
              qVal
            );
          };
          img.src = item.originalUrl;
        });
      })
    );

    setImages(updatedImages);
    setIsProcessing(false);
  };

  const handleDownloadSingle = (item: ImageItem) => {
    if (!item.resizedUrl) return;
    const a = document.createElement("a");
    a.href = item.resizedUrl;
    const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : format === "image/png" ? "png" : item.name.split(".").pop() || "png";
    const baseName = item.name.substring(0, item.name.lastIndexOf(".")) || item.name;
    a.download = `${baseName}_resized.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAllZip = async () => {
    const resizedItems = images.filter((img) => img.resizedUrl);
    if (resizedItems.length === 0) return;

    const zip = new JSZip();
    await Promise.all(
      resizedItems.map(async (item) => {
        const res = await fetch(item.resizedUrl!);
        const blob = await res.blob();
        const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : format === "image/png" ? "png" : item.name.split(".").pop() || "png";
        const baseName = item.name.substring(0, item.name.lastIndexOf(".")) || item.name;
        zip.file(`${baseName}_resized.${ext}`, blob);
      })
    );

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resized_images.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    images.forEach((item) => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.resizedUrl) URL.revokeObjectURL(item.resizedUrl);
    });
    setImages([]);
  };

  const formatKB = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="Image Resizer"
        description="Resize images online by pixels or percentage. Batch resize PNG, JPG, and WEBP photos instantly in your browser with zero server uploads."
        icon={Scaling}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls & Upload */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Upload Images</CardTitle>
              <CardDescription>Select one or multiple images to resize</CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragging ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">Drag and drop images here</p>
                <p className="text-xs text-muted-foreground">or click to browse from device (Bulk supported)</p>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Resize Dimensions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={resizeMode === "pixel" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setResizeMode("pixel")}
                >
                  By Pixels
                </Button>
                <Button
                  type="button"
                  variant={resizeMode === "percent" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setResizeMode("percent")}
                >
                  By Percentage
                </Button>
              </div>

              {resizeMode === "pixel" ? (
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Width (px)"
                    type="number"
                    value={targetWidth.toString()}
                    onChange={(e) => handleWidthChange(Number(e.target.value) || 0)}
                  />
                  <InputField
                    label="Height (px)"
                    type="number"
                    value={targetHeight.toString()}
                    onChange={(e) => handleHeightChange(Number(e.target.value) || 0)}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Scale Percentage</span>
                    <span>{percentage}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              )}

              {resizeMode === "pixel" && (
                <SwitchRow
                  label="Lock Aspect Ratio"
                  hint="Automatically adjust height/width proportionally"
                  checked={keepAspectRatio}
                  onCheckedChange={setKeepAspectRatio}
                />
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Output Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="original">Original Format</option>
                  <option value="image/png">PNG</option>
                  <option value="image/jpeg">JPEG / JPG</option>
                  <option value="image/webp">WEBP</option>
                </select>
              </div>

              {format !== "image/png" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Quality</span>
                    <span>{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <ActionButton
                  icon={Scaling}
                  label={isProcessing ? "Resizing..." : "Resize Images"}
                  onClick={processImages}
                  disabled={images.length === 0 || isProcessing}
                  variant="default"
                  className="flex-1"
                />
                <ResetButton onClick={handleReset} />
              </div>
            </CardContent>
          </GlassCard>
        </div>

        {/* Right Column: Preview & Results */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard className="min-h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
              <div>
                <CardTitle>Image Queue ({images.length})</CardTitle>
                <CardDescription>Preview original vs resized images</CardDescription>
              </div>
              {images.some((img) => img.resizedUrl) && (
                <ActionButton
                  icon={Download}
                  label="Download All ZIP"
                  onClick={handleDownloadAllZip}
                  variant="outline"
                  size="sm"
                />
              )}
            </CardHeader>
            <CardContent className="pt-6">
              {images.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-center text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mb-3 opacity-30" />
                  <p className="text-sm font-medium">No images uploaded yet</p>
                  <p className="text-xs">Upload images to customize width, height, and format</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {images.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border rounded-xl bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={item.resizedUrl || item.originalUrl}
                          alt={item.name}
                          className="h-16 w-16 object-contain rounded-lg border bg-background shrink-0"
                        />
                        <div className="space-y-1 min-w-0">
                          <p className="text-sm font-medium truncate max-w-[200px]">{item.name}</p>
                          <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
                            <span>
                              Original: {item.originalWidth}x{item.originalHeight} ({formatKB(item.originalSize)})
                            </span>
                          </div>
                          {item.resizedUrl && (
                            <div className="text-xs font-semibold text-emerald-500">
                              Resized: {item.resizedWidth}x{item.resizedHeight} ({formatKB(item.resizedSize)})
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-end">
                        {item.resizedUrl && (
                          <ActionButton
                            icon={Download}
                            label="Download"
                            onClick={() => handleDownloadSingle(item)}
                            size="sm"
                          />
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setImages((prev) => prev.filter((i) => i.id !== item.id))}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
