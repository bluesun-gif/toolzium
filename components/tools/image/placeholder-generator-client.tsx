"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Copy, Download, RefreshCcw, Sparkles } from"lucide-react";
import toast from "react-hot-toast";

export function PlaceholderGeneratorClient() {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#ffffff");
  const [customText, setCustomText] = useState("");
  const [format, setFormat] = useState<"png" | "svg">("png");

  const displayText = customText.trim() || `${width} × ${height}`;

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="${Math.max(16, Math.min(width, height) / 10)}" font-weight="bold">${displayText}</text>
</svg>`;

  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;

  const handleDownload = () => {
    if (format === "svg") {
      const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `placeholder_${width}x${height}.svg`;
      a.click();
      toast.success("Downloaded SVG placeholder!");
      return;
    }

    // PNG Download via Canvas
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = textColor;
    const fontSize = Math.max(16, Math.min(width, height) / 10);
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(displayText, width / 2, height / 2);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `placeholder_${width}x${height}.png`;
    a.click();
    toast.success("Downloaded PNG placeholder!");
  };

  const handleCopySvg = () => {
    navigator.clipboard.writeText(svgContent);
    toast.success("SVG code copied to clipboard!");
  };

  return (
    <div className="w-full min-h-screen pb-20 relative">
      <GridPattern />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader
          icon={ImageIcon}
          title="Image Placeholder Generator Studio"
          description="Generate clean, custom image placeholders in PNG or SVG format. Custom dimensions, vibrant colors, custom labels, and instant download."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Controls */}
          <GlassCard className="p-5 flex flex-col bg-background border-border shadow-sm rounded-2xl">
            <div className="border-b border-border pb-3 mb-4">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" /> Dimensions & Style
              </Label>
            </div>

            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Width (px)</Label>
                  <Input
                    type="number"
                    min={50}
                    max={3000}
                    value={width}
                    onChange={(e) => setWidth(Math.max(50, Math.min(3000, parseInt(e.target.value) || 100)))}
                    className="bg-background border-border text-foreground font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Height (px)</Label>
                  <Input
                    type="number"
                    min={50}
                    max={3000}
                    value={height}
                    onChange={(e) => setHeight(Math.max(50, Math.min(3000, parseInt(e.target.value) || 100)))}
                    className="bg-background border-border text-foreground font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Custom Text Label (Optional)</Label>
                <Input
                  placeholder={`Default: ${width} × ${height}`}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Background Color</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded-xl border border-border cursor-pointer bg-background p-1"
                    />
                    <Input
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="font-mono text-xs bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Text Color</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-10 h-10 rounded-xl border border-border cursor-pointer bg-background p-1"
                    />
                    <Input
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="font-mono text-xs bg-background border-border text-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div className="space-y-2 pt-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Preset Sizes</Label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "Avatar 150x150", w: 150, h: 150 },
                    { label: "Banner 1200x630", w: 1200, h: 630 },
                    { label: "Card 800x450", w: 800, h: 450 },
                    { label: "Square 500x500", w: 500, h: 500 },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => { setWidth(p.w); setHeight(p.h); }}
                      className="text-xs bg-muted/60 hover:bg-primary/10 hover:text-primary text-foreground px-2.5 py-1 rounded-xl border border-border transition-all font-semibold cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleDownload}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20 gap-2"
                >
                  <Download className="w-4 h-4" /> Download {format.toUpperCase()}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopySvg}
                  className="h-12 border-border font-semibold rounded-xl gap-2"
                >
                  <Copy className="w-4 h-4" /> Copy SVG
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Preview */}
          <GlassCard className="p-5 flex flex-col items-center justify-center bg-card border-border shadow-sm rounded-2xl min-h-[380px]">
            <div className="w-full flex justify-between items-center border-b border-border pb-3 mb-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Live Placeholder Preview</span>
              <span className="text-xs font-mono text-primary font-bold">{width} × {height} px</span>
            </div>

            <div className="p-4 bg-muted/30 rounded-2xl border border-border flex items-center justify-center max-w-full overflow-hidden">
              <img
                src={svgDataUrl}
                alt="Placeholder Preview"
                className="max-h-[320px] max-w-full object-contain rounded-lg shadow-sm"
              />
            </div>
          </GlassCard>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Set Dimensions", description: "Input width and height in pixels or click a preset resolution.", icon: ImageIcon },
            { step: "02", title: "Customize Design", description: "Select background color, text color, and add custom label text.", icon: Sparkles },
            { step: "03", title: "Download or Copy", description: "Export as crisp PNG, standalone SVG image, or copy SVG code directly.", icon: Download },
          ]}
          badges={["PNG & SVG Support", "100% Free", "Instant Client-Side"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: ImageIcon, title: "Custom Dimensions", description: "Generate placeholders from 50x50 to 3000x3000 pixels instantly." },
            { icon: Sparkles, title: "Color Customization", description: "Pick any HEX background and text color to match your design prototype." },
            { icon: Download, title: "Dual Export Formats", description: "Download vector SVG files for responsive layouts or PNG images for standard mockups." },
          ]}
        >
          <div className="prose dark:prose-invert max-w-none mt-6">
            <h3>Why Image Placeholders Matter in Design Workflows</h3>
            <p>
              Image placeholders maintain layout stability, prevent Cumulative Layout Shift (CLS) during web development, and allow UX designers to prototype interfaces before final imagery is created.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Is this placeholder generator free?", answer: "Yes! Generate and download unlimited SVG/PNG placeholders free of charge." },
            { question: "Can I use these images in commercial projects?", answer: "Absolutely! All generated placeholders are royalty-free and ready for production use." },
          ]}
        />

        <RelatedTools currentToolUrl="/tools/image/placeholder-generator" max={6} />
      </div>
    </div>
  );
}

export default PlaceholderGeneratorClient;
