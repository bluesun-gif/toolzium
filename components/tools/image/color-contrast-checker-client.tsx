"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { CheckCircle, AlertTriangle, RefreshCw, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function hexToRgb(hex: string) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r: number, g: number, b: number) {
  let a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1: string, hex2: string) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

export function ColorContrastClient() {
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [ratio, setRatio] = useState(21);

  useEffect(() => {
    const r = getContrastRatio(fgColor, bgColor);
    setRatio(r);
  }, [fgColor, bgColor]);

  const swapColors = () => {
    const temp = fgColor;
    setFgColor(bgColor);
    setBgColor(temp);
  };

  const formatRatio = (r: number) => {
    return (Math.round(r * 100) / 100).toFixed(2);
  };

  const getPassStatus = (target: number) => {
    return ratio >= target ? { pass: true, text: "Pass", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" } 
                         : { pass: false, text: "Fail", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" };
  };

  const normalAA = getPassStatus(4.5);
  const normalAAA = getPassStatus(7.0);
  const largeAA = getPassStatus(3.0);
  const largeAAA = getPassStatus(4.5);
  const uiAA = getPassStatus(3.0);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Eye}
        title="Color Contrast Checker"
        description="Ensure your color combinations meet WCAG 2.1 accessibility guidelines."
        actions={
          <>
            <ActionButton onClick={swapColors} icon={RefreshCw} label="Swap Colors" />
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Color Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Foreground (Text)</Label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={fgColor} 
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <Input 
                      value={fgColor} 
                      onChange={(e) => setFgColor(e.target.value)}
                      className="flex-1 uppercase font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Background</Label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={bgColor} 
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <Input 
                      value={bgColor} 
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 uppercase font-mono"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={swapColors} variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" /> Swap Colors
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contrast Ratio</h3>
                <div className="text-4xl font-bold">{formatRatio(ratio)}:1</div>
              </div>
              <div className={"w-16 h-16 rounded-full flex items-center justify-center " + (ratio >= 4.5 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
                {ratio >= 4.5 ? <CheckCircle className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>WCAG Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={"p-4 rounded-lg border flex flex-col gap-2 " + normalAA.bg}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Normal Text</span>
                    <span className={"font-bold uppercase " + normalAA.color}>{normalAA.text}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">WCAG AA (4.5:1)</span>
                </div>
                <div className={"p-4 rounded-lg border flex flex-col gap-2 " + normalAAA.bg}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Normal Text</span>
                    <span className={"font-bold uppercase " + normalAAA.color}>{normalAAA.text}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">WCAG AAA (7:1)</span>
                </div>
                <div className={"p-4 rounded-lg border flex flex-col gap-2 " + largeAA.bg}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Large Text</span>
                    <span className={"font-bold uppercase " + largeAA.color}>{largeAA.text}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">WCAG AA (3:1)</span>
                </div>
                <div className={"p-4 rounded-lg border flex flex-col gap-2 " + largeAAA.bg}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Large Text</span>
                    <span className={"font-bold uppercase " + largeAAA.color}>{largeAAA.text}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">WCAG AAA (4.5:1)</span>
                </div>
              </div>
              <div className={"p-4 rounded-lg border flex flex-col gap-2 " + uiAA.bg}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">UI Components & Graphics</span>
                  <span className={"font-bold uppercase " + uiAA.color}>{uiAA.text}</span>
                </div>
                <span className="text-xs text-muted-foreground">WCAG AA (3:1)</span>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your colors look in practice.</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="p-8 rounded-lg border overflow-hidden transition-colors"
            style={{ backgroundColor: bgColor }}
          >
            <div style={{ color: fgColor }} className="space-y-4">
              <h2 className="text-3xl font-bold">This is Large Text (18pt+ or 14pt+ bold)</h2>
              <p className="text-base">
                This is normal text. Color contrast is an important aspect of web accessibility. Good contrast makes reading text easier for people with visual impairments, and it helps everyone when they are in situations with poor lighting or glare on their screens.
              </p>
              <div className="pt-4 flex gap-4">
                <button 
                  className="px-4 py-2 rounded font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: fgColor, color: bgColor }}
                >
                  Primary Button
                </button>
                <button 
                  className="px-4 py-2 rounded font-medium border-2 transition-opacity hover:opacity-90"
                  style={{ borderColor: fgColor, color: fgColor, backgroundColor: "transparent" }}
                >
                  Secondary Button
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
