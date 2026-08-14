"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useRef, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import RelatedTools from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Crop, Download, RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Upload, RefreshCcw, ZoomIn, Move, Sparkles, CheckCircle2, Maximize2, Shield, Zap, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
interface CropBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
const PRESETS = [{
  label: "1:1 Square (Instagram / Avatar)",
  value: 1
}, {
  label: "16:9 Landscape (YouTube / Banner)",
  value: 16 / 9
}, {
  label: "9:16 Portrait (TikTok / Reels / Story)",
  value: 9 / 16
}, {
  label: "4:5 Portrait (Instagram Feed)",
  value: 4 / 5
}, {
  label: "3:2 Classic Photo",
  value: 3 / 2
}, {
  label: "21:9 Ultrawide Banner",
  value: 21 / 9
}, {
  label: "Custom / Freeform",
  value: 0
}];
export function AspectCropperClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [ratio, setRatio] = useState<number>(1);

  // Crop box in canvas-display coordinates
  const [cropBox, setCropBox] = useState<CropBox>({
    x: 50,
    y: 50,
    width: 200,
    height: 200
  });

  // Transform states
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [exportFormat, setExportFormat] = useState<"png" | "jpeg" | "webp">("png");

  // Interaction tracking state
  const [interactionState, setInteractionState] = useState<{
    type: "move" | "resize-tl" | "resize-tr" | "resize-bl" | "resize-br" | "resize-t" | "resize-b" | "resize-l" | "resize-r" | null;
    startX: number;
    startY: number;
    initialCrop: CropBox;
  }>({
    type: null,
    startX: 0,
    startY: 0,
    initialCrop: cropBox
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize image on upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const src = event.target?.result as string;
        const img = new window.Image();
        img.onload = () => {
          imgRef.current = img;
          setImageDimensions({
            width: img.width,
            height: img.height
          });
          setImageSrc(src);
          setRotation(0);
          setFlipH(false);
          setFlipV(false);
          setZoom(1);

          // Default initial crop centered
          const initialW = Math.min(250, img.width);
          const initialH = ratio > 0 ? initialW / ratio : initialW;
          setCropBox({
            x: 20,
            y: 20,
            width: Math.round(initialW),
            height: Math.round(initialH)
          });
          toast.success("Image loaded successfully!");
        };
        img.src = src;
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw main preview canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Available container width
    const containerW = containerRef.current?.clientWidth || 600;
    const displayScale = Math.min(containerW / img.width, 500 / img.height, 1);
    const displayW = Math.round(img.width * displayScale);
    const displayH = Math.round(img.height * displayScale);
    canvas.width = displayW;
    canvas.height = displayH;
    ctx.save();
    ctx.clearRect(0, 0, displayW, displayH);

    // Apply rotation & flip transformations
    ctx.translate(displayW / 2, displayH / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.scale(flipH ? -1 * zoom : 1 * zoom, flipV ? -1 * zoom : 1 * zoom);
    ctx.drawImage(img, -displayW / 2, -displayH / 2, displayW, displayH);
    ctx.restore();

    // Draw dark translucent overlay over uncropped canvas
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.fillRect(0, 0, displayW, displayH);

    // Clear and redraw the clean cropped image portion
    ctx.save();
    ctx.beginPath();
    ctx.rect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
    ctx.clip();
    ctx.translate(displayW / 2, displayH / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.scale(flipH ? -1 * zoom : 1 * zoom, flipV ? -1 * zoom : 1 * zoom);
    ctx.drawImage(img, -displayW / 2, -displayH / 2, displayW, displayH);
    ctx.restore();

    // Draw Rule of Thirds grid lines inside crop box
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;
    const thirdW = cropBox.width / 3;
    const thirdH = cropBox.height / 3;

    // Vertical third lines
    ctx.beginPath();
    ctx.moveTo(cropBox.x + thirdW, cropBox.y);
    ctx.lineTo(cropBox.x + thirdW, cropBox.y + cropBox.height);
    ctx.moveTo(cropBox.x + thirdW * 2, cropBox.y);
    ctx.lineTo(cropBox.x + thirdW * 2, cropBox.y + cropBox.height);

    // Horizontal third lines
    ctx.moveTo(cropBox.x, cropBox.y + thirdH);
    ctx.lineTo(cropBox.x + cropBox.width, cropBox.y + thirdH);
    ctx.moveTo(cropBox.x, cropBox.y + thirdH * 2);
    ctx.lineTo(cropBox.x + cropBox.width, cropBox.y + thirdH * 2);
    ctx.stroke();

    // Crop box outline
    ctx.strokeStyle = "#3b82f6"; // Primary blue
    ctx.lineWidth = 2.5;
    ctx.strokeRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
  }, [cropBox, rotation, flipH, flipV, zoom]);
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Adjust cropbox when ratio preset changes
  const handlePresetChange = (newRatioVal: number) => {
    setRatio(newRatioVal);
    if (newRatioVal > 0) {
      setCropBox(prev => {
        let newH = Math.round(prev.width / newRatioVal);
        const canvasH = canvasRef.current?.height || 400;
        let newW = prev.width;
        if (prev.y + newH > canvasH) {
          newH = canvasH - prev.y;
          newW = Math.round(newH * newRatioVal);
        }
        return {
          ...prev,
          width: Math.max(30, newW),
          height: Math.max(30, newH)
        };
      });
    }
  };

  // Start Move or Resize interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, type: "move" | "resize-tl" | "resize-tr" | "resize-bl" | "resize-br" | "resize-t" | "resize-b" | "resize-l" | "resize-r") => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setInteractionState({
      type,
      startX: e.clientX,
      startY: e.clientY,
      initialCrop: {
        ...cropBox
      }
    });
  };

  // Dynamic Pointer Movement logic
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactionState.type || !canvasRef.current) return;
    const deltaX = e.clientX - interactionState.startX;
    const deltaY = e.clientY - interactionState.startY;
    const canvasW = canvasRef.current.width;
    const canvasH = canvasRef.current.height;
    const initial = interactionState.initialCrop;
    if (interactionState.type === "move") {
      const newX = Math.max(0, Math.min(canvasW - initial.width, initial.x + deltaX));
      const newY = Math.max(0, Math.min(canvasH - initial.height, initial.y + deltaY));
      setCropBox(prev => ({
        ...prev,
        x: newX,
        y: newY
      }));
    } else {
      let newX = initial.x;
      let newY = initial.y;
      let newW = initial.width;
      let newH = initial.height;

      // Handle corner and edge resize logic
      if (interactionState.type.includes("r")) {
        newW = Math.max(30, Math.min(canvasW - initial.x, initial.width + deltaX));
      }
      if (interactionState.type.includes("l")) {
        const possibleW = initial.width - deltaX;
        if (possibleW >= 30 && initial.x + deltaX >= 0) {
          newX = initial.x + deltaX;
          newW = possibleW;
        }
      }
      if (interactionState.type.includes("b")) {
        newH = Math.max(30, Math.min(canvasH - initial.y, initial.height + deltaY));
      }
      if (interactionState.type.includes("t")) {
        const possibleH = initial.height - deltaY;
        if (possibleH >= 30 && initial.y + deltaY >= 0) {
          newY = initial.y + deltaY;
          newH = possibleH;
        }
      }

      // Enforce selected aspect ratio if ratio preset > 0
      if (ratio > 0) {
        newH = Math.round(newW / ratio);
        if (newY + newH > canvasH) {
          newH = canvasH - newY;
          newW = Math.round(newH * ratio);
        }
      }
      setCropBox({
        x: Math.round(newX),
        y: Math.round(newY),
        width: Math.round(newW),
        height: Math.round(newH)
      });
    }
  };
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (interactionState.type) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe release fallback
      }
      setInteractionState({
        type: null,
        startX: 0,
        startY: 0,
        initialCrop: cropBox
      });
    }
  };

  // Render high-res cropped export canvas and trigger file download
  const handleDownloadCrop = () => {
    if (!imgRef.current || !canvasRef.current) return;
    const img = imgRef.current;
    const displayCanvas = canvasRef.current;

    // Calculate scale factor between full image resolution and displayed canvas
    const scaleX = img.width / displayCanvas.width;
    const scaleY = img.height / displayCanvas.height;
    const sourceX = cropBox.x * scaleX;
    const sourceY = cropBox.y * scaleY;
    const sourceW = cropBox.width * scaleX;
    const sourceH = cropBox.height * scaleY;

    // Offscreen export canvas
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = Math.round(sourceW);
    exportCanvas.height = Math.round(sourceH);
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.translate(exportCanvas.width / 2, exportCanvas.height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.scale(flipH ? -1 * zoom : 1 * zoom, flipV ? -1 * zoom : 1 * zoom);
    ctx.drawImage(img, sourceX, sourceY, sourceW, sourceH, -exportCanvas.width / 2, -exportCanvas.height / 2, exportCanvas.width, exportCanvas.height);
    ctx.restore();
    const mimeType = exportFormat === "png" ? "image/png" : exportFormat === "jpeg" ? "image/jpeg" : "image/webp";
    const dataUrl = exportCanvas.toDataURL(mimeType, 0.95);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `cropped-image-${cropBox.width}x${cropBox.height}.${exportFormat}`;
    link.click();
    toast.success(`Cropped image saved as ${exportFormat.toUpperCase()}!`);
  };
  const handleResetCrop = () => {
    if (!canvasRef.current) return;
    const cW = canvasRef.current.width;
    const cH = canvasRef.current.height;
    const defW = Math.min(250, cW);
    const defH = ratio > 0 ? defW / ratio : defW;
    setCropBox({
      x: Math.round((cW - defW) / 2),
      y: Math.round((cH - defH) / 2),
      width: Math.round(defW),
      height: Math.round(defH)
    });
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setZoom(1);
    toast.success("Crop box reset to center.");
  };
  return <div className="w-full min-h-screen pb-20 relative"><ToolBackground /><div className="relative z-10">
      

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader title="Image Aspect Ratio Cropper" description="Crop images to exact aspect ratios for social media, YouTube, Instagram, and web design with live interactive canvas controls." icon={Crop} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-6 bg-card/70 backdrop-blur-md border-border space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Cropper Controls
                </h3>
              </div>

              {/* Upload Input */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Upload Image
                </Label>
                <Label htmlFor="img-crop-upload" className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-6 h-6 text-primary mb-1.5" />
                  <span className="text-xs font-semibold text-foreground">Click to upload photo</span>
                  <span className="text-[10px] text-muted-foreground">PNG, JPG, WEBP supported</span>
                  <input id="img-crop-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </Label>
              </div>

              {/* Aspect Ratio Presets */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Aspect Ratio Preset
                </Label>
                <Select value={ratio.toString()} onValueChange={val => handlePresetChange(parseFloat(val))}>
                  <SelectTrigger className="bg-background border-border text-foreground font-medium text-xs h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESETS.map(p => <SelectItem key={p.value} value={p.value.toString()} className="text-xs">
                        {p.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Dimension Adjustments */}
              {imageSrc && <div className="space-y-4 pt-4 border-t border-border/60">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[11px] text-muted-foreground">Width (px)</Label>
                      <Input type="number" value={cropBox.width} onChange={e => {
                      const val = Math.max(30, parseInt(e.target.value) || 30);
                      setCropBox(prev => ({
                        ...prev,
                        width: val,
                        height: ratio > 0 ? Math.round(val / ratio) : prev.height
                      }));
                    }} className="h-9 text-xs bg-background border-border" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] text-muted-foreground">Height (px)</Label>
                      <Input type="number" value={cropBox.height} onChange={e => {
                      const val = Math.max(30, parseInt(e.target.value) || 30);
                      setCropBox(prev => ({
                        ...prev,
                        height: val,
                        width: ratio > 0 ? Math.round(val * ratio) : prev.width
                      }));
                    }} className="h-9 text-xs bg-background border-border" />
                    </div>
                  </div>

                  {/* Zoom Control */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-muted-foreground flex items-center gap-1">
                        <ZoomIn className="w-3.5 h-3.5 text-primary" /> Zoom
                      </span>
                      <span className="font-mono text-foreground">{Math.round(zoom * 100)}%</span>
                    </div>
                    <Slider value={[zoom]} min={0.5} max={3} step={0.05} onValueChange={val => setZoom(val[0])} />
                  </div>

                  {/* Rotation & Flip Controls */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground">Transforms</Label>
                    <div className="grid grid-cols-4 gap-2">
                      <Button variant="outline" size="icon" title="Rotate Left 90°" onClick={() => setRotation(prev => (prev - 90) % 360)} className="h-9 w-full bg-background border-border">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" title="Rotate Right 90°" onClick={() => setRotation(prev => (prev + 90) % 360)} className="h-9 w-full bg-background border-border">
                        <RotateCw className="w-4 h-4" />
                      </Button>
                      <Button variant={flipH ? "default" : "outline"} size="icon" title="Flip Horizontal" onClick={() => setFlipH(!flipH)} className="h-9 w-full bg-background border-border">
                        <FlipHorizontal className="w-4 h-4" />
                      </Button>
                      <Button variant={flipV ? "default" : "outline"} size="icon" title="Flip Vertical" onClick={() => setFlipV(!flipV)} className="h-9 w-full bg-background border-border">
                        <FlipVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Format & Export Actions */}
                  <div className="space-y-2 pt-2">
                    <Label className="text-xs font-semibold text-muted-foreground">Export Format</Label>
                    <Select value={exportFormat} onValueChange={(val: "png" | "jpeg" | "webp") => setExportFormat(val)}>
                      <SelectTrigger className="bg-background border-border text-foreground font-medium text-xs h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG (Lossless)</SelectItem>
                        <SelectItem value="jpeg">JPEG (Compact)</SelectItem>
                        <SelectItem value="webp">WebP (Modern Web)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Button onClick={handleDownloadCrop} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-10 gap-2 shadow-lg shadow-primary/20">
                      <Download className="w-4 h-4" /> Download Cropped Image
                    </Button>
                    <Button variant="outline" onClick={handleResetCrop} className="w-full h-9 gap-2 text-xs border-border text-foreground hover:text-primary hover:bg-muted/50">
                      <RefreshCcw className="w-3.5 h-3.5" /> Reset Crop Box
                    </Button>
                  </div>
                </div>}
            </GlassCard>
          </div>

          {/* Interactive Cropper Canvas Workspace */}
          <div className="lg:col-span-3">
            <GlassCard className="p-6 bg-card/70 backdrop-blur-md border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div>
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-primary" /> Interactive Cropper Canvas
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Drag inside box to move. Drag corners or edges to resize.
                  </p>
                </div>
                {imageDimensions && <div className="text-[11px] font-mono bg-muted/60 text-muted-foreground px-2.5 py-1 rounded-md border border-border shrink-0">
                    Source: {imageDimensions.width} × {imageDimensions.height} px
                  </div>}
              </div>

              <div ref={containerRef} className="bg-muted/40 min-h-[460px] rounded-xl flex items-center justify-center p-4 overflow-hidden border border-border relative select-none">
                {imageSrc ? <div className="relative inline-block" onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
                    {/* Rendered Canvas */}
                    <canvas ref={canvasRef} className="block rounded-lg shadow-md" />

                    {/* Interactive HTML Overlay Grab Handles */}
                    <div className="absolute inset-0 pointer-events-auto" style={{
                    width: canvasRef.current?.width || 0,
                    height: canvasRef.current?.height || 0
                  }}>
                      {/* Crop Box Body Draggable Container */}
                      <div onPointerDown={e => handlePointerDown(e, "move")} style={{
                      left: `${cropBox.x}px`,
                      top: `${cropBox.y}px`,
                      width: `${cropBox.width}px`,
                      height: `${cropBox.height}px`
                    }} className="absolute cursor-move border-2 border-primary group">
                        {/* Drag Label Overlay */}
                        <div className="absolute top-2 left-2 bg-black/75 text-primary-foreground text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur border border-white/20 pointer-events-none flex items-center gap-1">
                          <Move className="w-3 h-3 text-primary" />
                          {cropBox.width} × {cropBox.height} px
                        </div>

                        {/* Corner Resize Handles */}
                        {/* Top-Left */}
                        <div onPointerDown={e => handlePointerDown(e, "resize-tl")} className="absolute -top-2 -left-2 w-4 h-4 bg-primary border-2 border-white rounded-full cursor-nwse-resize hover:scale-125 transition-transform" />
                        {/* Top-Right */}
                        <div onPointerDown={e => handlePointerDown(e, "resize-tr")} className="absolute -top-2 -right-2 w-4 h-4 bg-primary border-2 border-white rounded-full cursor-nesw-resize hover:scale-125 transition-transform" />
                        {/* Bottom-Left */}
                        <div onPointerDown={e => handlePointerDown(e, "resize-bl")} className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary border-2 border-white rounded-full cursor-nesw-resize hover:scale-125 transition-transform" />
                        {/* Bottom-Right */}
                        <div onPointerDown={e => handlePointerDown(e, "resize-br")} className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary border-2 border-white rounded-full cursor-nwse-resize hover:scale-125 transition-transform" />

                        {/* Edge Resize Handles */}
                        {/* Top Edge */}
                        <div onPointerDown={e => handlePointerDown(e, "resize-t")} className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-primary border border-white rounded-sm cursor-ns-resize" />
                        {/* Bottom Edge */}
                        <div onPointerDown={e => handlePointerDown(e, "resize-b")} className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-primary border border-white rounded-sm cursor-ns-resize" />
                        {/* Left Edge */}
                        <div onPointerDown={e => handlePointerDown(e, "resize-l")} className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-6 bg-primary border border-white rounded-sm cursor-ew-resize" />
                        {/* Right Edge */}
                        <div onPointerDown={e => handlePointerDown(e, "resize-r")} className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2 h-6 bg-primary border border-white rounded-sm cursor-ew-resize" />
                      </div>
                    </div>
                  </div> : <div className="text-center text-muted-foreground flex flex-col items-center py-16 space-y-3">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Crop className="w-10 h-10 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground">No Image Uploaded</p>
                      <p className="text-xs">Upload an image on the left controls panel to launch the interactive cropper.</p>
                    </div>
                  </div>}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Feature & FAQ Content */}
        <ToolHowItWorks steps={[{
          step: "01",
          title: "Upload Image",
          description: "Select any PNG, JPG, or WebP photo from your computer or phone."
        }, {
          step: "02",
          title: "Select Aspect Ratio",
          description: "Choose a preset (1:1, 16:9, 9:16, 4:5, 3:2, 21:9) or custom freeform cropping."
        }, {
          step: "03",
          title: "Interactive Canvas Drag",
          description: "Drag the crop box anywhere or pull corner grab handles to adjust crop dimensions."
        }, {
          step: "04",
          title: "Export High-Res Image",
          description: "Click Download Cropped Image to export your cropped photo in PNG, JPEG, or WebP."
        }]} />

        <ToolFeatureGuides features={[{
          title: "Social Media Preset Dimensions",
          description: "Presets automatically crop to 1:1 Square (Instagram/Avatar), 16:9 Landscape (YouTube), 9:16 Story/Reels, 4:5 Feed, 3:2 Photo, and 21:9 Ultrawide."
        }, {
          title: "100% Client-Side Privacy",
          description: "Your photos and images are processed entirely inside your local web browser using HTML5 Canvas. Zero uploads to external servers."
        }]} />

        <RelatedTools currentToolUrl="/tools/image/aspect-cropper" />
      </div>
    
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

    </div></div>;
}
export default AspectCropperClient;