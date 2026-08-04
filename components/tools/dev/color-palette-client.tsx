"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { Copy, Lock, Unlock, Shuffle, Upload, Download, Code, Palette, Image as ImageIcon } from "lucide-react";

type HSL = { h: number; s: number; l: number };
type RGB = { r: number; g: number; b: number };

// Helper Functions
const hexToRgb = (hex: string): RGB => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 0, g: 0, b: 0 };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToRgb = ({ h, s, l }: HSL): RGB => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const hexToHsl = (hex: string): HSL => rgbToHsl(hexToRgb(hex));
const hslToHex = (hsl: HSL): string => rgbToHex(hslToRgb(hsl).r, hslToRgb(hsl).g, hslToRgb(hsl).b);

interface Swatch {
  hex: string;
  locked: boolean;
}

export default function ColorPaletteClient() {
  const [baseHex, setBaseHex] = useState("#3b82f6");
  const [mode, setMode] = useState<"complementary" | "analogous" | "triadic" | "tetradic" | "monochromatic" | "random">("analogous");
  const [palette, setPalette] = useState<Swatch[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const generatePalette = useCallback((hex: string, genMode: string, currentPalette: Swatch[] = []) => {
    const hsl = hexToHsl(hex);
    let newHsls: HSL[] = [];

    switch (genMode) {
      case "complementary":
        newHsls = [hsl, { ...hsl, h: (hsl.h + 180) % 360 }];
        break;
      case "analogous":
        newHsls = [
          { ...hsl, h: (hsl.h - 30 + 360) % 360 },
          { ...hsl, h: (hsl.h - 15 + 360) % 360 },
          hsl,
          { ...hsl, h: (hsl.h + 15) % 360 },
          { ...hsl, h: (hsl.h + 30) % 360 },
        ];
        break;
      case "triadic":
        newHsls = [hsl, { ...hsl, h: (hsl.h + 120) % 360 }, { ...hsl, h: (hsl.h + 240) % 360 }];
        break;
      case "tetradic":
        newHsls = [hsl, { ...hsl, h: (hsl.h + 90) % 360 }, { ...hsl, h: (hsl.h + 180) % 360 }, { ...hsl, h: (hsl.h + 270) % 360 }];
        break;
      case "monochromatic":
        newHsls = [
          { ...hsl, l: 20 },
          { ...hsl, l: 35 },
          { ...hsl, l: 50 },
          { ...hsl, l: 65 },
          { ...hsl, l: 80 },
        ];
        break;
      case "random":
        newHsls = Array.from({ length: 5 }).map(() => ({
          h: Math.floor(Math.random() * 360),
          s: Math.floor(Math.random() * 100),
          l: Math.floor(Math.random() * 100),
        }));
        break;
    }

    const newPalette = newHsls.map((h, i) => {
      const lockedColor = currentPalette[i]?.locked ? currentPalette[i] : null;
      return lockedColor || { hex: hslToHex(h), locked: false };
    });

    setPalette(newPalette);
  }, []);

  useEffect(() => {
    generatePalette(baseHex, mode, palette);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseHex, mode]); // Only trigger when baseHex or mode changes

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        generatePalette(baseHex, mode, palette);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [baseHex, mode, palette, generatePalette]);

  const toggleLock = (index: number) => {
    const newPalette = [...palette];
    newPalette[index].locked = !newPalette[index].locked;
    setPalette(newPalette);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const exportCSS = () => {
    const css = palette.map((p, i) => `--color-${i + 1}: ${p.hex};`).join("\n");
    copyToClipboard(`:root {\n${css}\n}`, "CSS Variables");
  };

  const exportJSON = () => {
    const json = JSON.stringify(palette.map((p) => p.hex), null, 2);
    copyToClipboard(json, "JSON Array");
  };

  const exportTailwind = () => {
    const tw = palette.reduce((acc, p, i) => ({ ...acc, [`color-${i + 1}`]: p.hex }), {});
    copyToClipboard(JSON.stringify(tw, null, 2), "Tailwind Config");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (event) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Scale down for faster processing
        const scale = Math.min(100 / img.width, 100 / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorCounts: Record<string, number> = {};
        
        for (let i = 0; i < imageData.length; i += 4 * 10) { // Skip pixels for speed
          const r = Math.round(imageData[i] / 10) * 10;
          const g = Math.round(imageData[i+1] / 10) * 10;
          const b = Math.round(imageData[i+2] / 10) * 10;
          const hex = rgbToHex(r, g, b);
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }
        
        const sortedColors = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([hex]) => ({ hex, locked: false }));
          
        setPalette(sortedColors.length > 0 ? sortedColors : palette);
        toast.success("Colors extracted from image!");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ToolPageHeader
        title="Color Palette Generator"
        description="Generate beautiful color palettes, extract colors from images, and export to CSS, JSON, or Tailwind."
      />

      <div className="mt-8 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Palette className="w-5 h-5"/> Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Base Color</Label>
                <div className="flex gap-2">
                  <div className="relative w-12 h-10 rounded-md overflow-hidden border">
                    <input
                      type="color"
                      value={baseHex}
                      onChange={(e) => setBaseHex(e.target.value)}
                      className="absolute inset-[-10px] w-20 h-20 cursor-pointer"
                    />
                  </div>
                  <Input
                    value={baseHex}
                    onChange={(e) => setBaseHex(e.target.value)}
                    className="flex-1 font-mono uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mode</Label>
                <select 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={mode}
                  onChange={(e) => setMode(e.target.value as any)}
                >
                  <option value="analogous">Analogous</option>
                  <option value="complementary">Complementary</option>
                  <option value="triadic">Triadic</option>
                  <option value="tetradic">Tetradic</option>
                  <option value="monochromatic">Monochromatic</option>
                  <option value="random">Random</option>
                </select>
              </div>

              <Button 
                onClick={() => generatePalette(baseHex, mode, palette)}
                className="w-full gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Generate New
              </Button>
              <p className="text-xs text-muted-foreground text-center">Press Spacebar to generate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><ImageIcon className="w-5 h-5"/> Extract</CardTitle>
            </CardHeader>
            <CardContent>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={imageInputRef}
                onChange={handleImageUpload}
              />
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => imageInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Download className="w-5 h-5"/> Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="secondary" className="w-full justify-start gap-2" onClick={exportCSS}>
                <Code className="w-4 h-4" /> CSS Variables
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-2" onClick={exportJSON}>
                <Code className="w-4 h-4" /> JSON Array
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-2" onClick={exportTailwind}>
                <Code className="w-4 h-4" /> Tailwind Config
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-9">
          <Card className="h-full">
            <CardContent className="p-0 sm:p-6 h-full flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row h-[600px] sm:h-[400px] rounded-xl overflow-hidden shadow-sm border">
                {palette.map((color, idx) => (
                  <div 
                    key={idx} 
                    className="group relative flex-1 flex sm:flex-col items-center justify-center sm:justify-end pb-0 sm:pb-6 transition-all duration-300 hover:flex-[1.2]"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                       <Button 
                        variant="ghost" 
                        size="icon" 
                        className="bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
                        onClick={() => copyToClipboard(color.hex, "Color")}
                       >
                         <Copy className="w-5 h-5" />
                       </Button>
                    </div>
                    
                    <div className="absolute top-4 right-4 sm:top-4 sm:right-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={"rounded-full h-8 w-8 " + (color.locked ? 'bg-black/30 text-white' : 'bg-black/10 text-white/70 hover:bg-black/20 hover:text-white sm:opacity-0 sm:group-hover:opacity-100')}
                        onClick={() => toggleLock(idx)}
                      >
                        {color.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="bg-white/90 dark:bg-black/70 backdrop-blur-sm p-2 sm:p-3 rounded-lg text-center shadow-lg transform translate-y-0 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all z-10 w-24 sm:w-auto ml-4 sm:ml-0">
                      <p className="font-mono font-bold text-sm sm:text-base uppercase">{color.hex}</p>
                      <p className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                        {(() => {
                          const rgb = hexToRgb(color.hex);
                          return `R:${rgb.r} G:${rgb.g} B:${rgb.b}`;
                        })()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
