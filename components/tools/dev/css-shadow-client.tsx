"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Box, Layers, Copy, Plus, Trash2, Sliders, Code, Sun, Moon } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
interface ShadowLayer {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}
const PRESETS: Record<string, ShadowLayer[]> = {
  "Soft": [{
    id: "1",
    x: 0,
    y: 4,
    blur: 6,
    spread: -1,
    color: "#000000",
    opacity: 0.1,
    inset: false
  }, {
    id: "2",
    x: 0,
    y: 2,
    blur: 4,
    spread: -2,
    color: "#000000",
    opacity: 0.1,
    inset: false
  }],
  "Hard": [{
    id: "1",
    x: 8,
    y: 8,
    blur: 0,
    spread: 0,
    color: "#000000",
    opacity: 1,
    inset: false
  }],
  "Neon Glow": [{
    id: "1",
    x: 0,
    y: 0,
    blur: 15,
    spread: 5,
    color: "#0ea5e9",
    opacity: 0.8,
    inset: false
  }, {
    id: "2",
    x: 0,
    y: 0,
    blur: 30,
    spread: 10,
    color: "#0ea5e9",
    opacity: 0.4,
    inset: false
  }],
  "Neumorphism": [{
    id: "1",
    x: -8,
    y: -8,
    blur: 16,
    spread: 0,
    color: "#ffffff",
    opacity: 0.8,
    inset: false
  }, {
    id: "2",
    x: 8,
    y: 8,
    blur: 16,
    spread: 0,
    color: "#000000",
    opacity: 0.15,
    inset: false
  }],
  "Layered": [{
    id: "1",
    x: 0,
    y: 1,
    blur: 2,
    spread: 0,
    color: "#000000",
    opacity: 0.05,
    inset: false
  }, {
    id: "2",
    x: 0,
    y: 4,
    blur: 8,
    spread: -2,
    color: "#000000",
    opacity: 0.1,
    inset: false
  }, {
    id: "3",
    x: 0,
    y: 16,
    blur: 24,
    spread: -8,
    color: "#000000",
    opacity: 0.15,
    inset: false
  }],
  "Inner Shadow": [{
    id: "1",
    x: 0,
    y: 4,
    blur: 8,
    spread: 0,
    color: "#000000",
    opacity: 0.2,
    inset: true
  }]
};
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
export default function CssShadowClient() {
  const [layers, setLayers] = useState<ShadowLayer[]>(PRESETS["Soft"]);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [boxColor, setBoxColor] = useState("#f8fafc");
  const [radius, setRadius] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const cssString = useMemo(() => {
    return layers.map(l => `${l.inset ? "inset" : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${hexToRgba(l.color, l.opacity)}`).join(",");
  }, [layers]);
  const updateLayer = (id: string, field: keyof ShadowLayer, value: any) => {
    setLayers(prev => prev.map(l => l.id === id ? {
      ...l,
      [field]: value
    } : l));
  };
  const addLayer = () => {
    setLayers(prev => [...prev, {
      id: Date.now().toString(),
      x: 0,
      y: 4,
      blur: 8,
      spread: 0,
      color: "#000000",
      opacity: 0.1,
      inset: false
    }]);
  };
  const removeLayer = (id: string) => {
    setLayers(prev => prev.filter(l => l.id !== id));
  };
  const moveLayer = (index: number, dir: number) => {
    const next = [...layers];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setLayers(next);
  };
  const applyPreset = (name: string) => {
    setLayers(PRESETS[name]);
    toast.success(`Applied ${name} preset`);
  };
  const copyCSS = () => {
    navigator.clipboard.writeText(`box-shadow: ${cssString};`);
    toast.success("CSS copied to clipboard");
  };
  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    setBgColor(next ? "#0f172a" : "#ffffff");
    setBoxColor(next ? "#1e293b" : "#f8fafc");
  };
  const steps = [{
    step: "01",
    title: "Add Layers",
    description: "Stack multiple shadow layers to create complex, realistic UI depth effects.",
    icon: Layers
  }, {
    step: "02",
    title: "Tune Parameters",
    description: "Adjust X/Y offsets, blur, spread, and opacity for each individual layer.",
    icon: Sliders
  }, {
    step: "03",
    title: "Copy CSS",
    description: "Grab the generated box-shadow code and paste it directly into your stylesheet.",
    icon: Code
  }];
  const features = [{
    icon: Layers,
    title: "Multi-Layer Stacking",
    description: "Combine unlimited shadow layers to achieve complex material and neumorphic designs."
  }, {
    icon: Sliders,
    title: "Precision Controls",
    description: "Fine-tune X/Y offsets, blur radius, spread, and opacity with pixel-perfect accuracy."
  }, {
    icon: Box,
    title: "Live Preview",
    description: "Instantly visualize your shadows against custom backgrounds and border radii."
  }, {
    icon: Code,
    title: "One-Click Export",
    description: "Copy clean, minified CSS code directly to your clipboard for immediate use."
  }];
  const faqs = [{
    question: "How do I create a realistic Material Design shadow?",
    answer: "Material design relies on layered shadows to simulate physical elevation. Use the 'Layered' preset, which combines a tight, dark shadow for immediate contact depth with a wider, highly transparent shadow to simulate ambient light occlusion."
  }, {
    question: "What is the difference between blur and spread?",
    answer: "Blur determines how soft or diffused the shadow edge appears, while spread expands or contracts the overall size of the shadow before the blur is applied. Negative spread values are excellent for creating tight, subtle inset shadows."
  }, {
    question: "Can I use inset shadows for pressed button states?",
    answer: "Absolutely. Inset shadows simulate light being blocked inside an element, creating the illusion that the surface has been pushed down. Combine a subtle dark inset shadow with a slight downward translation for a highly tactile active state."
  }];
  return <div className="relative max-w-6xl mx-auto space-y-8 pb-12 px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Box} title="CSS Box Shadow Generator" description="Design complex, multi-layered CSS box shadows with live preview, presets, and instant code export." />
 
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Sliders className="w-4 h-4" /> Shadow Layers</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
 <div className="flex flex-wrap gap-2 mb-4">
 {Object.keys(PRESETS).map(p => <Button key={p} variant="outline" size="sm" onClick={() => applyPreset(p)}>{p}</Button>)}
 </div>
 
 {layers.map((layer, i) => <Card key={layer.id} className="border border-border/50">
 <CardContent className="p-4 space-y-3">
 <div className="flex items-center justify-between">
 <span className="text-xs font-bold text-muted-foreground">Layer {i + 1}</span>
 <div className="flex gap-1">
 <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveLayer(i, -1)} disabled={i === 0}>↑</Button>
 <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveLayer(i, 1)} disabled={i === layers.length - 1}>↓</Button>
 <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeLayer(layer.id)}><Trash2 className="w-3 h-3" /></Button>
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-3">
 <div className="space-y-1">
 <Label className="text-[10px]">X Offset ({layer.x}px)</Label>
 <Input type="range" min="-50" max="50" value={layer.x} onChange={e => updateLayer(layer.id, "x", +e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label className="text-[10px]">Y Offset ({layer.y}px)</Label>
 <Input type="range" min="-50" max="50" value={layer.y} onChange={e => updateLayer(layer.id, "y", +e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label className="text-[10px]">Blur ({layer.blur}px)</Label>
 <Input type="range" min="0" max="100" value={layer.blur} onChange={e => updateLayer(layer.id, "blur", +e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label className="text-[10px]">Spread ({layer.spread}px)</Label>
 <Input type="range" min="-50" max="50" value={layer.spread} onChange={e => updateLayer(layer.id, "spread", +e.target.value)} />
 </div>
 </div>

 <div className="flex items-center gap-3">
 <div className="space-y-1 flex-1">
 <Label className="text-[10px]">Opacity ({layer.opacity})</Label>
 <Input type="range" min="0" max="1" step="0.05" value={layer.opacity} onChange={e => updateLayer(layer.id, "opacity", +e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label className="text-[10px]">Color</Label>
 <Input type="color" value={layer.color} onChange={e => updateLayer(layer.id, "color", e.target.value)} className="w-10 h-8 p-0.5 rounded cursor-pointer" />
 </div>
 </div>

 <label className="flex items-center gap-2 text-xs cursor-pointer">
 <input type="checkbox" checked={layer.inset} onChange={e => updateLayer(layer.id, "inset", e.target.checked)} className="rounded border-border" />
 Inset Shadow
 </label>
 </CardContent>
 </Card>)}
 <Button variant="outline" className="w-full" onClick={addLayer}><Plus className="w-4 h-4 mr-2" /> Add Layer</Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Box className="w-4 h-4" /> Live Preview</CardTitle>
 </CardHeader>
 <CardContent className="p-6 space-y-6 flex flex-col items-center justify-center min-h-[400px]" style={{
            backgroundColor: bgColor
          }}>
 <div className="w-48 h-48 transition-all duration-300" style={{
              backgroundColor: boxColor,
              borderRadius: `${radius}px`,
              boxShadow: cssString
            }} />
 
 <div className="w-full space-y-3 mt-6 pt-6 border-t border-border/30">
 <div className="flex items-center justify-between">
 <Label className="text-xs">Border Radius ({radius}px)</Label>
 <Button variant="ghost" size="sm" onClick={toggleTheme}>{darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</Button>
 </div>
 <Input type="range" min="0" max="100" value={radius} onChange={e => setRadius(+e.target.value)} />
 
 <div className="grid grid-cols-2 gap-3">
 <div className="space-y-1">
 <Label className="text-[10px]">Box Color</Label>
 <Input type="color" value={boxColor} onChange={e => setBoxColor(e.target.value)} className="w-full h-8 p-0.5 rounded cursor-pointer" />
 </div>
 <div className="space-y-1">
 <Label className="text-[10px]">Background</Label>
 <Input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-8 p-0.5 rounded cursor-pointer" />
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full font-mono">
 <CardTitle className={titleClass}><Code className="w-4 h-4" /> Generated CSS</CardTitle>
 <Button size="sm" onClick={copyCSS}><Copy className="w-3 h-3 mr-2" /> Copy</Button>
 </div>
 </CardHeader>
 <CardContent className="p-4">
 <pre className={textareaClass}>box-shadow: {cssString};</pre>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={steps} badges={["100% Free", "Client-Side Privacy", "No Signup"]} />
 
 <ToolFeatureGuides features={features}>
 <div className="prose prose-sm dark:prose-invert max-w-none">
 <h3>The Art and Science of CSS Depth</h3>
 <p>Box shadows are the unsung heroes of modern UI design, providing the depth, elevation, and spatial hierarchy that transform flat layouts into immersive, tactile experiences. In the evolution of design trends, we have moved from the heavy gradients of skeuomorphism to the flat design era, and now into a nuanced middle ground characterized by subtle layering, neumorphism, and glassmorphism. Mastering the CSS `box-shadow` property allows developers to create sophisticated visual cues that indicate interactivity, focus states, and modal overlays.</p>
 <p>A professional shadow is rarely a single layer. Enterprise-grade interfaces often stack multiple shadow layers with varying offsets, blurs, and opacities to mimic real-world lighting. For instance, a"soft"material design shadow might combine a tight, dark shadow for immediate depth with a wider, highly transparent shadow for ambient occlusion. Conversely,"neon glow"effects utilize zero offset with high blur and vibrant colors to create a cyberpunk or futuristic aesthetic. Neumorphism relies on a combination of inset and outset shadows matching the background color to create the illusion of extruded plastic. Managing these complex, multi-layered CSS strings manually is error-prone and tedious. A visual CSS box shadow generator empowers developers to tweak X/Y coordinates, spread, and blur radii in real-time, instantly previewing the results against different border radii and backgrounds before exporting the clean, minified CSS code directly into their stylesheets.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
 <RelatedTools currentToolUrl="/tools/dev/css-box-shadow-generator" max={6} />
 </div></div>;
}