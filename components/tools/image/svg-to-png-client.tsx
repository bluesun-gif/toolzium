"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FileImage, Download, Maximize2, Palette } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";

export function SvgToPngClient() {
  const [svgInput, setSvgInput] = useState("");
  const [width, setWidth] = useState<string>("800");
  const [height, setHeight] = useState<string>("800");
  const [scale, setScale] = useState("1");
  const [bgColor, setBgColor] = useState("transparent");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "image/svg+xml") {
      toast.error("Please upload a valid SVG file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSvgInput(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const updatePreview = () => {
    if (!svgInput.trim()) {
      setPreviewUrl(null);
      return;
    }

    try {
      const w = parseInt(width) || 800;
      const h = parseInt(height) || 800;
      const s = parseFloat(scale) || 1;
      
      const finalWidth = w * s;
      const finalHeight = h * s;

      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = finalWidth;
      canvas.height = finalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, finalWidth, finalHeight);
      } else {
        ctx.clearRect(0, 0, finalWidth, finalHeight);
      }

      const img = new Image();
      const svgBlob = new Blob([svgInput], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
        setPreviewUrl(canvas.toDataURL("image/png"));
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        toast.error("Invalid SVG code.");
        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (err) {
      toast.error("Failed to parse SVG.");
    }
  };

  useEffect(() => {
    updatePreview();
  }, [svgInput, width, height, scale, bgColor]);

  const handleDownload = () => {
    if (!previewUrl) {
      toast.error("No preview available to download.");
      return;
    }

    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = "converted-image.png";
    a.click();
    toast.success("Downloaded successfully!");
  };

  const handleClear = () => {
    setSvgInput("");
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={FileImage}
        title="SVG to PNG Converter"
        description="Convert SVG code or files to PNG format with customizable dimensions and backgrounds."
        actions={
          <>
            <ActionButton onClick={handleDownload} icon={Download} label="Download PNG" />
            <ResetButton onClick={handleClear} />
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Input SVG</CardTitle>
            <CardDescription>Paste SVG code or upload a file.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="svg-upload">Upload SVG File</Label>
              <Input id="svg-upload" type="file" accept=".svg" onChange={handleFileUpload} />
            </div>
            <div>
              <Label>Or Paste SVG Code</Label>
              <textarea
                className="w-full h-[300px] p-3 rounded-md border bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={svgInput}
                onChange={(e) => setSvgInput(e.target.value)}
                placeholder="<svg viewBox='0 0 100 100'>...</svg>"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <Label>Width (px)</Label>
                  <Input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
               </div>
               <div>
                  <Label>Height (px)</Label>
                  <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <Label>Scale</Label>
                  <Select value={scale} onValueChange={setScale}>
                     <SelectTrigger>
                        <SelectValue placeholder="Scale" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="1">1x</SelectItem>
                        <SelectItem value="2">2x</SelectItem>
                        <SelectItem value="3">3x</SelectItem>
                        <SelectItem value="4">4x</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div>
                  <Label>Background Color</Label>
                  <div className="flex gap-2">
                    <Input 
                        type="color" 
                        value={bgColor === "transparent" ? "#ffffff" : bgColor} 
                        onChange={(e) => setBgColor(e.target.value)}
                        disabled={bgColor === "transparent"}
                        className="w-12 h-10 p-1"
                    />
                    <Select value={bgColor === "transparent" ? "transparent" : "custom"} onValueChange={(v) => setBgColor(v === "transparent" ? "transparent" : "#ffffff")}>
                       <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Background" />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="transparent">Transparent</SelectItem>
                          <SelectItem value="custom">Custom Color</SelectItem>
                       </SelectContent>
                    </Select>
                  </div>
               </div>
            </div>

          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Live preview of your converted PNG image.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full min-h-[400px] flex items-center justify-center border-2 border-dashed rounded-md bg-muted/20 relative overflow-hidden pattern-checkerboard">
               {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="max-w-full max-h-[600px] object-contain shadow-lg" style={{ backgroundColor: bgColor === "transparent" ? undefined : bgColor }} />
               ) : (
                  <div className="text-muted-foreground flex flex-col items-center gap-2">
                     <FileImage className="w-12 h-12 opacity-20" />
                     <p>Preview will appear here</p>
                  </div>
               )}
               {/* Hidden canvas for processing */}
               <canvas ref={canvasRef} className="hidden" />
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
