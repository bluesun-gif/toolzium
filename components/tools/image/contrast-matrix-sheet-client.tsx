"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Download, Plus, Trash2 } from "lucide-react";
import { CopyButton, ActionButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";

interface ColorItem {
  id: string;
  name: string;
  hex: string;
}

// Contrast calculation functions
const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const normalHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const getLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrastRatio = (hex1: string, hex2: string) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

export function ContrastMatrixSheetClient() {
  const [colors, setColors] = useState<ColorItem[]>([
    { id: "1", name: "Primary", hex: "#000000" },
    { id: "2", name: "Surface", hex: "#ffffff" },
    { id: "3", name: "Accent", hex: "#3b82f6" },
  ]);

  const addColor = () => {
    if (colors.length >= 8) {
      toast.error("Maximum 8 colors allowed");
      return;
    }
    setColors([...colors, { id: Date.now().toString(), name: "New Color", hex: "#cccccc" }]);
  };

  const removeColor = (id: string) => {
    if (colors.length <= 3) {
      toast.error("Minimum 3 colors required");
      return;
    }
    setColors(colors.filter(c => c.id !== id));
  };

  const updateColor = (id: string, field: keyof ColorItem, value: string) => {
    setColors(colors.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const getCompliance = (ratio: number) => {
    if (ratio >= 7) return { text: "AAA", class: "bg-green-500/20 text-green-700 dark:text-green-400" };
    if (ratio >= 4.5) return { text: "AA", class: "bg-green-500/20 text-green-700 dark:text-green-400" };
    if (ratio >= 3) return { text: "AA Large", class: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400" };
    return { text: "FAIL", class: "bg-red-500/20 text-red-700 dark:text-red-400" };
  };

  const getJsonExport = () => {
    const matrix: any = {};
    colors.forEach(c1 => {
      matrix[c1.name] = {};
      colors.forEach(c2 => {
        if (c1.id !== c2.id) {
          matrix[c1.name][c2.name] = parseFloat(getContrastRatio(c1.hex, c2.hex).toFixed(2));
        }
      });
    });
    return JSON.stringify({ palette: colors, contrastMatrix: matrix }, null, 2);
  };

  const getCssExport = () => {
    let css = ":root {\n";
    colors.forEach(c => {
      const name = c.name.toLowerCase().replace(/\s+/g, '-');
      css += "  --color-" + name + ": " + c.hex + ";\n";
    });
    css += "}\n";
    return css;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Palette}
        title="Contrast Compliance Color Matrix"
        description="Test your brand palette colors against each other for WCAG accessibility."
        actions={
          <div className="flex space-x-2">
            <CopyButton getText={getCssExport} label="Copy CSS" />
            <CopyButton getText={getJsonExport} label="Copy JSON" />
          </div>
        }
      />

      <GlassCard>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Color Palette</CardTitle>
            <Button variant="outline" size="sm" onClick={addColor} disabled={colors.length >= 8}>
              <Plus className="w-4 h-4 mr-1" /> Add Color
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {colors.map((color) => (
              <div key={color.id} className="flex flex-col space-y-2 p-3 bg-secondary/50 rounded-lg border">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded border shadow-sm flex-shrink-0" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <Input 
                    value={color.name} 
                    onChange={(e) => updateColor(color.id, "name", e.target.value)}
                    className="h-8 text-sm"
                    placeholder="Color Name"
                  />
                  <button 
                    onClick={() => removeColor(color.id)}
                    className="text-muted-foreground hover:text-destructive p-1"
                    disabled={colors.length <= 3}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    type="color" 
                    value={color.hex} 
                    onChange={(e) => updateColor(color.id, "hex", e.target.value)}
                    className="w-8 h-8 p-0 border-0 flex-shrink-0"
                  />
                  <Input 
                    value={color.hex.toUpperCase()} 
                    onChange={(e) => updateColor(color.id, "hex", e.target.value)}
                    className="h-8 text-sm font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </GlassCard>

      <GlassCard>
        <CardHeader>
          <CardTitle>Contrast Matrix (Text on Background)</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="p-2 border bg-muted font-medium text-left">Bg \ Text</th>
                {colors.map(c => (
                  <th key={c.id} className="p-2 border bg-muted font-medium text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-4 h-4 rounded border" style={{ backgroundColor: c.hex }} />
                      <span className="text-xs truncate w-20">{c.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map(bg => (
                <tr key={bg.id}>
                  <th className="p-2 border bg-muted font-medium text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border flex-shrink-0" style={{ backgroundColor: bg.hex }} />
                      <span className="text-xs truncate">{bg.name}</span>
                    </div>
                  </th>
                  {colors.map(fg => {
                    if (bg.id === fg.id) {
                      return <td key={fg.id} className="p-2 border bg-secondary/30 text-center text-muted-foreground text-xs">-</td>;
                    }
                    const ratio = getContrastRatio(fg.hex, bg.hex);
                    const comp = getCompliance(ratio);
                    return (
                      <td key={fg.id} className="p-2 border text-center">
                        <div 
                          className="flex flex-col items-center justify-center p-2 rounded"
                          style={{ backgroundColor: bg.hex, color: fg.hex }}
                        >
                          <span className="font-bold text-sm">Aa</span>
                          <span className="text-xs font-mono mt-1 opacity-90">{ratio.toFixed(2)}</span>
                        </div>
                        <div className={"text-[10px] font-bold mt-1 px-1 rounded inline-block " + comp.class}>
                          {comp.text}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </GlassCard>
    </div>
  );
}
