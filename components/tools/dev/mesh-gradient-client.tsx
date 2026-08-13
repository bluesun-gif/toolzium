"use client";
import { cn } from"@/lib/utils";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, Palette, Shuffle, Download, Layers, Code } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
interface MeshPoint {
  id: number;
  color: string;
  x: number;
  y: number;
}
const PRESETS = [{
  name: "Dreamy",
  points: [{
    color: "#ff9a9e",
    x: 20,
    y: 20
  }, {
    color: "#fecfef",
    x: 80,
    y: 30
  }, {
    color: "#fdfbfb",
    x: 50,
    y: 80
  }, {
    color: "#a18cd1",
    x: 10,
    y: 90
  }]
}, {
  name: "Sunset Mesh",
  points: [{
    color: "#ff0844",
    x: 10,
    y: 10
  }, {
    color: "#ffb199",
    x: 80,
    y: 20
  }, {
    color: "#ffd200",
    x: 40,
    y: 90
  }, {
    color: "#f6d365",
    x: 90,
    y: 80
  }]
}, {
  name: "Ocean Depth",
  points: [{
    color: "#2E3192",
    x: 0,
    y: 0
  }, {
    color: "#1BFFFF",
    x: 100,
    y: 100
  }, {
    color: "#004FF9",
    x: 50,
    y: 50
  }, {
    color: "#FFF94C",
    x: 80,
    y: 20
  }]
}, {
  name: "Northern Lights",
  points: [{
    color: "#43cea2",
    x: 10,
    y: 80
  }, {
    color: "#185a9d",
    x: 90,
    y: 20
  }, {
    color: "#00c6ff",
    x: 50,
    y: 50
  }, {
    color: "#764ba2",
    x: 20,
    y: 10
  }]
}, {
  name: "Cotton Candy",
  points: [{
    color: "#fbc2eb",
    x: 30,
    y: 30
  }, {
    color: "#a6c1ee",
    x: 70,
    y: 70
  }, {
    color: "#f6d365",
    x: 80,
    y: 20
  }, {
    color: "#ffecd2",
    x: 20,
    y: 80
  }]
}, {
  name: "Emerald Forest",
  points: [{
    color: "#134E5E",
    x: 10,
    y: 10
  }, {
    color: "#71B280",
    x: 80,
    y: 80
  }, {
    color: "#0f9b0f",
    x: 40,
    y: 60
  }, {
    color: "#e6dada",
    x: 90,
    y: 10
  }]
}, {
  name: "Midnight",
  points: [{
    color: "#232526",
    x: 20,
    y: 20
  }, {
    color: "#414345",
    x: 80,
    y: 80
  }, {
    color: "#000046",
    x: 50,
    y: 50
  }, {
    color: "#1CB5E0",
    x: 90,
    y: 10
  }]
}, {
  name: "Peach",
  points: [{
    color: "#ED4264",
    x: 10,
    y: 90
  }, {
    color: "#FFEDBC",
    x: 90,
    y: 10
  }, {
    color: "#ff9966",
    x: 50,
    y: 50
  }, {
    color: "#ff5e62",
    x: 20,
    y: 20
  }]
}];
const SIZES = [{
  label: "Square",
  w: 800,
  h: 800
}, {
  label: "Landscape",
  w: 1280,
  h: 720
}, {
  label: "Portrait",
  w: 720,
  h: 1280
}, {
  label: "Wide",
  w: 1680,
  h: 720
}];
export function MeshGradientClient() {
  const [points, setPoints] = useState<MeshPoint[]>(PRESETS[0].points.map((p, i) => ({
    ...p,
    id: i
  })));
  const [blur, setBlur] = useState<number>(50);
  const [sizeIdx, setSizeIdx] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"css" | "svg">("css");
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  const updatePoint = (id: number, field: keyof MeshPoint, value: string | number) => {
    setPoints(prev => prev.map(p => p.id === id ? {
      ...p,
      [field]: value
    } : p));
  };
  const randomize = () => {
    const colors = ["#ff9a9e", "#fecfef", "#a18cd1", "#fbc2eb", "#a6c1ee", "#ff0844", "#ffb199", "#43cea2", "#185a9d", "#00c6ff", "#764ba2"];
    const newPoints: MeshPoint[] = Array.from({
      length: 4
    }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100)
    }));
    setPoints(newPoints);
    toast.success("Randomized gradient!");
  };
  const cssOutput = useMemo(() => {
    const gradients = points.map(p => `radial-gradient(at ${p.x}% ${p.y}%, ${p.color} 0px, transparent 50%)`).join(",\n");
    return `background-color: ${points[0]?.color || "#000000"};\nbackground-image: \n ${gradients};\nbackground-size: cover;\nfilter: blur(${blur}px);`;
  }, [points, blur]);
  const svgOutput = useMemo(() => {
    const w = SIZES[sizeIdx].w;
    const h = SIZES[sizeIdx].h;
    const defs = points.map((p, i) => `
 <radialGradient id="g${i}"cx="${p.x}%"cy="${p.y}%"r="50%">
 <stop offset="0%"stop-color="${p.color}"stop-opacity="1"/>
 <stop offset="100%"stop-color="${p.color}"stop-opacity="0"/>
 </radialGradient>`).join("");
    const rects = points.map((p, i) => `<rect width="100%"height="100%"fill="url(#g${i})"/>`).join("\n");
    return `<svg xmlns="http://www.w3.org/2000/svg"width="${w}"height="${h}"viewBox="0 0 ${w} ${h}">
 <defs>${defs}
 <filter id="blur"><feGaussianBlur stdDeviation="${blur}"/></filter>
 </defs>
 <g filter="url(#blur)">
 ${rects}
 </g>
</svg>`;
  }, [points, blur, sizeIdx]);
  const exportPng = () => {
    const svgString = svgOutput;
    const blob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = SIZES[sizeIdx].w;
      canvas.height = SIZES[sizeIdx].h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = "mesh-gradient.png";
        a.click();
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
    toast.success("Exported PNG!");
  };
  return <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

 <ToolPageHeader icon={Palette} title="Mesh Gradient Generator" description="Design beautiful multi-point color blending mesh gradients for backgrounds, exportable as CSS, SVG, or PNG." />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <Card className={`${cardClass} lg:col-span-1`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Layers className="w-4 h-4" /> Controls & Points
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-5">
 <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
 {points.map(p => <div key={p.id} className="p-3 rounded-lg bg-muted/30 border border-border/50 space-y-2">
 <div className="flex items-center gap-2">
 <input type="color" value={p.color} onChange={e => updatePoint(p.id, "color", e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
 <span className="text-xs font-mono flex-1">{p.color}</span>
 </div>
 <div className="grid grid-cols-2 gap-2">
 <div>
 <Label className="text-[10px] text-muted-foreground">X ({p.x}%)</Label>
 <input type="range" min="0" max="100" value={p.x} onChange={e => updatePoint(p.id, "x", parseInt(e.target.value))} className="w-full" />
 </div>
 <div>
 <Label className="text-[10px] text-muted-foreground">Y ({p.y}%)</Label>
 <input type="range" min="0" max="100" value={p.y} onChange={e => updatePoint(p.id, "y", parseInt(e.target.value))} className="w-full" />
 </div>
 </div>
 </div>)}
 </div>

 <div className="space-y-2">
 <Label className="text-xs">Mesh Blur / Intensity ({blur}px)</Label>
 <input type="range" min="0" max="100" value={blur} onChange={e => setBlur(parseInt(e.target.value))} className="w-full" />
 </div>

 <div className="space-y-2">
 <Label className="text-xs">Canvas Size</Label>
 <div className="grid grid-cols-2 gap-2">
 {SIZES.map((s, i) => <Button key={s.label} variant={i === sizeIdx ? "default" : "outline"} size="sm" onClick={() => setSizeIdx(i)} className="text-xs">
 {s.label}
 </Button>)}
 </div>
 </div>

 <div className="space-y-2">
 <Label className="text-xs">Presets</Label>
 <div className="grid grid-cols-4 gap-2">
 {PRESETS.map((p, i) => <Button key={p.name} onClick={() => setPoints(p.points.map((pt, idx) => ({
                ...pt,
                id: idx
              })))} className="h-8 rounded border border-border/50 hover:scale-105 transition-transform" style={{
                background: `linear-gradient(45deg, ${p.points[0].color}, ${p.points[1].color})`
              }} title={p.name} />)}
 </div>
 </div>

 <Button variant="secondary" className="w-full" onClick={randomize}>
 <Shuffle className="w-4 h-4 mr-2" /> Randomize
 </Button>
 </CardContent>
 </Card>

 <Card className={`${cardClass} lg:col-span-2 flex flex-col`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Palette className="w-4 h-4" /> Live Preview
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 flex-1 flex flex-col gap-4">
 <div className="w-full rounded-xl border border-border/50 shadow-inner" style={{
            aspectRatio: `${SIZES[sizeIdx].w} / ${SIZES[sizeIdx].h}`,
            backgroundColor: points[0]?.color || "#000",
            backgroundImage: points.map(p => `radial-gradient(at ${p.x}% ${p.y}%, ${p.color} 0px, transparent 50%)`).join(","),
            backgroundSize: "cover",
            filter: `blur(${blur}px)`
          }} />

 <div className="flex border-b border-border/50">
 <Button className={cn(`px-4 py-2 text-sm font-medium ${activeTab === "css" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`)} onClick={() => setActiveTab("css")}>
 CSS Output
 </Button>
 <Button className={cn(`px-4 py-2 text-sm font-medium ${activeTab === "svg" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`)} onClick={() => setActiveTab("svg")}>
 SVG Output
 </Button>
 </div>

 <div className="relative flex-1 min-h-[150px]">
 <pre className={`${textareaClass} h-full overflow-auto whitespace-pre-wrap`}>{activeTab === "css" ? cssOutput : svgOutput}</pre>
 <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => handleCopy(activeTab === "css" ? cssOutput : svgOutput)}>
 <Copy className="w-4 h-4" />
 </Button>
 </div>

 <Button onClick={exportPng} className="w-full">
 <Download className="w-4 h-4 mr-2" /> Export as PNG ({SIZES[sizeIdx].w}x{SIZES[sizeIdx].h})
 </Button>
 </CardContent>
 </Card>
 </div>

 <ToolHowItWorks steps={[{
      step: "01",
      title: "Define Color Points",
      description: "Add up to 6 color points and position them across the X/Y axis using the interactive sliders.",
      icon: Layers
    }, {
      step: "02",
      title: "Adjust Blur & Size",
      description: "Control the mesh intensity with the blur slider and select your target canvas aspect ratio.",
      icon: Palette
    }, {
      step: "03",
      title: "Export Code or PNG",
      description: "Copy the generated CSS/SVG directly to your project, or download a high-resolution PNG asset.",
      icon: Download
    }]} badges={["100% Free", "Client-Side Privacy", "No Signup"]} />

 <ToolFeatureGuides features={[{
      icon: Layers,
      title: "Multi-Point Radial Blending",
      description: "Layer multiple radial gradients to create complex, organic mesh transitions impossible with standard linear gradients."
    }, {
      icon: Code,
      title: "Production-Ready CSS",
      description: "Outputs clean, cross-browser compatible CSS utilizing standard radial-gradient syntax and backdrop filters."
    }, {
      icon: Palette,
      title: "Curated Presets",
      description: "Jumpstart your design with 8 professionally curated color palettes inspired by modern UI trends."
    }, {
      icon: Download,
      title: "Vector & Raster Export",
      description: "Export infinitely scalable SVG code for web, or high-DPI PNG files via client-side canvas rendering."
    }]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Art of Mesh Gradients in Modern UI</h3>
 <p>Mesh gradients have become a staple in contemporary web design, offering a vibrant, fluid alternative to flat colors and static images. Unlike traditional linear gradients that transition between two points, mesh gradients utilize multiple overlapping radial gradients to create complex, organic color blending that mimics natural light and fluid dynamics.</p>
 <p>Creating these effects manually in design software can be tedious, and translating them to CSS often requires complex layering. This generator bridges the gap by providing a visual, interactive canvas where designers can manipulate individual color nodes in real-time. The underlying engine computes the exact CSS <code>radial-gradient</code> layering required to reproduce the effect natively in the browser, ensuring zero performance overhead compared to heavy raster images.</p>
 <h3>Implementation Best Practices</h3>
 <ul>
 <li><strong>Performance:</strong> While CSS filters like <code>blur()</code> are hardware-accelerated, applying them to massive DOM elements can cause repaint issues. Use the exported SVG for static backgrounds to eliminate runtime filter calculations.</li>
 <li><strong>Accessibility:</strong> Ensure sufficient contrast between your mesh background and foreground text. Use the 'Midnight' or 'Ocean Depth' presets for dark mode interfaces where white text requires deep, saturated backgrounds.</li>
 <li><strong>Animation:</strong> The generated CSS can be easily animated using CSS keyframes on the <code>background-position</code> or <code>background-size</code> properties to create subtle, breathing background effects.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
      question: "Is the generated CSS compatible with all browsers?",
      answer: "Yes. The output uses standard radial-gradient syntax which is supported by all modern browsers (Chrome, Firefox, Safari, Edge). The blur effect uses the standard CSS filter property."
    }, {
      question: "How does the PNG export work without a server?",
      answer: "We utilize the HTML5 Canvas API. The tool generates an SVG string, loads it into an invisible Image object, draws it onto a canvas at your selected resolution, and extracts the PNG data URL locally."
    }, {
      question: "Can I use these gradients for commercial projects?",
      answer: "Absolutely. All gradients generated using this tool are entirely yours and can be used in personal, commercial, or client projects without attribution."
    }, {
      question: "Why does my CSS look sharp instead of blended?",
      answer: "Ensure you have included the 'filter: blur(Xpx)' property in your CSS. The blur is what softens the hard edges of the radial gradients into a smooth mesh."
    }]} />

 <RelatedTools currentToolUrl="/tools/dev/mesh-gradient" max={6} />
 </div>;
}
export default MeshGradientClient;