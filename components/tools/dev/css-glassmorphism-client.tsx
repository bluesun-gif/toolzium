"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Layers, Sliders, RefreshCw } from "lucide-react";

export function CssGlassmorphismClient() {
  const [blur, setBlur] = useState<number>(10);
  const [opacity, setOpacity] = useState<number>(20);
  const [saturation, setSaturation] = useState<number>(150);
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [borderOpacity, setBorderOpacity] = useState<number>(10);
  const [shadowBlur, setShadowBlur] = useState<number>(30);
  const [glassColor, setGlassColor] = useState<string>("white");
  const [bgId, setBgId] = useState<number>(1);

  const backgrounds = [
    "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
    "linear-gradient(45deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
    "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
    "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
  ];

  const handleReset = () => {
    setBlur(10);
    setOpacity(20);
    setSaturation(150);
    setBorderWidth(1);
    setBorderOpacity(10);
    setShadowBlur(30);
    setGlassColor("white");
  };

  const changeBg = () => {
    setBgId((prev) => (prev + 1) % backgrounds.length);
  };

  const getRgb = () => {
    return glassColor === "white" ? "255, 255, 255" : glassColor === "black" ? "0, 0, 0" : "255, 255, 255"; // simple fallback
  };

  const getCss = () => {
    const bgColor = "rgba(" + getRgb() + ", " + (opacity / 100).toFixed(2) + ")";
    const borderColor = "rgba(" + getRgb() + ", " + (borderOpacity / 100).toFixed(2) + ")";
    return "background: " + bgColor + ";\n" +
           "border-radius: 16px;\n" +
           "box-shadow: 0 4px " + shadowBlur + "px rgba(0, 0, 0, 0.1);\n" +
           "backdrop-filter: blur(" + blur + "px) saturate(" + saturation + "%);\n" +
           "-webkit-backdrop-filter: blur(" + blur + "px) saturate(" + saturation + "%);\n" +
           "border: " + borderWidth + "px solid " + borderColor + ";";
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Layers}
        title="CSS Glassmorphism Generator"
        description="Visual CSS Glassmorphism generator with customizable blur, transparency, and background styles."
        actions={
          <>
            <ActionButton onClick={changeBg} icon={RefreshCw} label="Change Background" />
            <ResetButton onClick={handleReset} label="Reset Defaults" />
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Glass Controls</CardTitle>
            <CardDescription>Adjust the properties of the glass element.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Glass Color</Label>
              <Select value={glassColor} onValueChange={setGlassColor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Blur: {blur}px</Label>
              <input type="range" min="0" max="50" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>Opacity: {opacity}%</Label>
              <input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>Saturation: {saturation}%</Label>
              <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>Border Width: {borderWidth}px</Label>
              <input type="range" min="0" max="5" value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))} className="w-full" />
            </div>
            
            <div className="space-y-2">
              <Label>Border Opacity: {borderOpacity}%</Label>
              <input type="range" min="0" max="100" value={borderOpacity} onChange={(e) => setBorderOpacity(Number(e.target.value))} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>Shadow Blur: {shadowBlur}px</Label>
              <input type="range" min="0" max="100" value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="w-full" />
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="w-full h-64 rounded-xl flex items-center justify-center p-6 relative overflow-hidden" 
                style={{ background: backgrounds[bgId] }}
              >
                <div 
                  className="w-full max-w-sm h-40 flex flex-col items-center justify-center text-center p-6"
                  style={{
                    background: "rgba(" + getRgb() + ", " + (opacity / 100) + ")",
                    borderRadius: "16px",
                    boxShadow: "0 4px " + shadowBlur + "px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(" + blur + "px) saturate(" + saturation + "%)",
                    WebkitBackdropFilter: "blur(" + blur + "px) saturate(" + saturation + "%)",
                    border: borderWidth + "px solid rgba(" + getRgb() + ", " + (borderOpacity / 100) + ")"
                  }}
                >
                  <h3 className={"text-xl font-bold mb-2 " + (glassColor === "white" ? "text-slate-800" : "text-white")}>Glassmorphism</h3>
                  <p className={"text-sm " + (glassColor === "white" ? "text-slate-700" : "text-slate-300")}>This is a live preview of your generated glass panel.</p>
                </div>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>CSS Code</span>
                <CopyButton getText={getCss} label="Copy CSS" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm text-foreground">
                {getCss()}
              </pre>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
