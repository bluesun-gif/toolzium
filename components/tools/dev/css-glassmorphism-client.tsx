"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Layers, RefreshCw, Sparkles, Check, Palette } from "lucide-react";
import toast from "react-hot-toast";

const PRESET_COLORS = [
  { name: "White", rgb: "255, 255, 255", hex: "#ffffff" },
  { name: "Black", rgb: "0, 0, 0", hex: "#000000" },
  { name: "Purple", rgb: "147, 51, 234", hex: "#9333ea" },
  { name: "Cyan", rgb: "6, 182, 212", hex: "#06b6d4" },
  { name: "Emerald", rgb: "16, 185, 129", hex: "#10b981" },
  { name: "Rose", rgb: "244, 63, 94", hex: "#f43f5e" },
  { name: "Royal Blue", rgb: "37, 99, 235", hex: "#2563eb" },
];

const PRESET_BACKGROUNDS = [
  {
    name: "Cosmic Mesh",
    style: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "Neon Sunset",
    style: "linear-gradient(to right, #ff7e5f, #feb47b)",
  },
  {
    name: "Aurora Borealis",
    style: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
  },
  {
    name: "Deep Ocean",
    style: "linear-gradient(to right, #2b5876, #4e4376)",
  },
  {
    name: "Cyberpunk",
    style: "linear-gradient(to right, #f857a6, #ff5858)",
  },
];

export function CssGlassmorphismClient() {
  const [blur, setBlur] = useState<number>(12);
  const [opacity, setOpacity] = useState<number>(25);
  const [saturation, setSaturation] = useState<number>(140);
  const [borderWidth, setBorderWidth] = useState<number>(2);
  const [borderOpacity, setBorderOpacity] = useState<number>(40);
  const [shadowBlur, setShadowBlur] = useState<number>(30);
  const [borderRadius, setBorderRadius] = useState<number>(20);
  
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [bgIndex, setBgIndex] = useState<number>(0);

  const handleReset = () => {
    setBlur(12);
    setOpacity(25);
    setSaturation(140);
    setBorderWidth(2);
    setBorderOpacity(40);
    setShadowBlur(30);
    setBorderRadius(20);
    setSelectedColor(PRESET_COLORS[0]);
    toast.success("Reset Glassmorphism to default values");
  };

  const cycleBackground = () => {
    setBgIndex((prev) => (prev + 1) % PRESET_BACKGROUNDS.length);
  };

  const getCssCode = () => {
    const bgAlpha = (opacity / 100).toFixed(2);
    const borderAlpha = (borderOpacity / 100).toFixed(2);
    const rgbStr = selectedColor.rgb;

    return `/* Glassmorphism Generated CSS */
background: rgba(${rgbStr}, ${bgAlpha});
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border-radius: ${borderRadius}px;
border: ${borderWidth}px solid rgba(${rgbStr}, ${borderAlpha});
box-shadow: 0 8px ${shadowBlur}px 0 rgba(0, 0, 0, 0.25);`;
  };

  // Compute live inline styles for the preview glass card
  const glassStyle: React.CSSProperties = {
    background: `rgba(${selectedColor.rgb}, ${opacity / 100})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    borderRadius: `${borderRadius}px`,
    border: `${borderWidth}px solid rgba(${selectedColor.rgb}, ${borderOpacity / 100})`,
    boxShadow: `0 8px ${shadowBlur}px 0 rgba(0, 0, 0, 0.25)`,
    transition: "all 0.15s ease-out",
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4">
      <ToolPageHeader
        icon={Layers}
        title="CSS Glassmorphism Studio Generator"
        description="Create modern frosted glass UI elements with real-time blur, transparency, border, and saturation controls."
        actions={
          <>
            <ActionButton onClick={cycleBackground} icon={RefreshCw} label="Change Background" />
            <ResetButton onClick={handleReset} label="Reset Defaults" />
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <GlassCard className="lg:col-span-6 p-5 space-y-5">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Glass Controls
            </h2>
            <Badge variant="outline" className="text-[11px] font-mono">
              Live Responsive
            </Badge>
          </div>

          {/* Color Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-primary" /> Glass Tint Color
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    selectedColor.name === c.name
                      ? "border-primary bg-primary/10 text-primary shadow-xs"
                      : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-black/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                  {selectedColor.name === c.name && <Check className="h-3 w-3 ml-0.5" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {/* Blur Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-foreground">Backdrop Blur</span>
                <span className="font-mono text-primary font-bold">{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Opacity Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-foreground">Glass Transparency (Opacity)</span>
                <span className="font-mono text-primary font-bold">{opacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Saturation Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-foreground">Saturation Boost</span>
                <span className="font-mono text-primary font-bold">{saturation}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Border Width Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-foreground">Border Width</span>
                <span className="font-mono text-primary font-bold">{borderWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={borderWidth}
                onChange={(e) => setBorderWidth(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Border Opacity Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-foreground">Border Transparency</span>
                <span className="font-mono text-primary font-bold">{borderOpacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={borderOpacity}
                onChange={(e) => setBorderOpacity(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Border Radius Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-foreground">Border Radius (Corner Roundness)</span>
                <span className="font-mono text-primary font-bold">{borderRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Shadow Blur Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-foreground">Elevation Shadow</span>
                <span className="font-mono text-primary font-bold">{shadowBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={shadowBlur}
                onChange={(e) => setShadowBlur(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        </GlassCard>

        {/* Live Preview & Code Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Live Preview Card */}
          <GlassCard className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-foreground">Live Interactive Canvas</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={cycleBackground}
                className="text-xs gap-1.5 h-8 text-primary"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Theme: {PRESET_BACKGROUNDS[bgIndex].name}
              </Button>
            </div>

            {/* Canvas Viewport with Floating Shapes behind the Glass Element */}
            <div
              className="w-full h-72 rounded-2xl relative overflow-hidden flex items-center justify-center p-6 transition-all duration-300 shadow-inner"
              style={{ background: PRESET_BACKGROUNDS[bgIndex].style }}
            >
              {/* Vibrant Floating Background Circles for Backdrop Blur Contrast */}
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-white/40 blur-sm animate-pulse" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-yellow-300/40 blur-sm" />
              <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-cyan-300/50" />

              {/* The Glassmorphism Target Card */}
              <div
                className="relative z-10 w-full max-w-sm p-6 flex flex-col items-center justify-center text-center space-y-2 select-none"
                style={glassStyle}
              >
                <h3
                  className={`text-xl font-extrabold tracking-tight ${
                    selectedColor.name === "White" || selectedColor.name === "Cyan"
                      ? "text-slate-900"
                      : "text-white"
                  }`}
                >
                  Glassmorphism
                </h3>
                <p
                  className={`text-xs font-medium ${
                    selectedColor.name === "White" || selectedColor.name === "Cyan"
                      ? "text-slate-700"
                      : "text-slate-200"
                  }`}
                >
                  Live preview of your frosted glass card with <strong>{blur}px</strong> blur and <strong>{opacity}%</strong> transparency.
                </p>
                <Badge
                  variant="outline"
                  className={`text-[10px] mt-2 ${
                    selectedColor.name === "White" || selectedColor.name === "Cyan"
                      ? "bg-slate-900/10 border-slate-900/30 text-slate-900"
                      : "bg-white/20 border-white/40 text-white"
                  }`}
                >
                  ✓ Real-time CSS Render
                </Badge>
              </div>
            </div>
          </GlassCard>

          {/* Generated CSS Code Card */}
          <GlassCard className="p-5 space-y-3">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-foreground">Generated CSS Code</h2>
              <CopyButton getText={getCssCode} label="Copy CSS Code" />
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 shadow-xs">
              {getCssCode()}
            </pre>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
