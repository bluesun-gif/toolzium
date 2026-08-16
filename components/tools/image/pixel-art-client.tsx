"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useRef, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Brush, Download, Eraser, Grid, Grid3x3, MousePointer, Palette, Pen, Undo2 } from"lucide-react";
import { toast } from"react-hot-toast";
import { cn } from"@/lib/utils";

const PALETTES = {
  Default: ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"],
  Retro: ["#1a1c2c", "#5d275d", "#b13e53", "#ef7d57", "#ffcd75", "#a7f070", "#38b764", "#257179", "#29366f", "#3b5dc9", "#41a6f6", "#73eff7"],
  Pastel: ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#e0baff"],
  Monochrome: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF"]
};
export function PixelArtClient() {
  const [gridSize, setGridSize] = useState(16);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState<"pen" | "eraser" | "fill">("pen");
  const [showGrid, setShowGrid] = useState(true);
  const [palette, setPalette] = useState<keyof typeof PALETTES>("Retro");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<string[]>(Array(gridSize * gridSize).fill(""));
  const [history, setHistory] = useState<string[][]>([Array(gridSize * gridSize).fill("")]);
  const [historyStep, setHistoryStep] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    // Reset canvas when grid size changes
    const newPixels = Array(gridSize * gridSize).fill("");
    setPixels(newPixels);
    setHistory([newPixels]);
    setHistoryStep(0);
  }, [gridSize]);
  useEffect(() => {
    drawCanvas();
  }, [pixels, showGrid]);
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = canvas.width / gridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pixels.length; i++) {
      const x = i % gridSize * size;
      const y = Math.floor(i / gridSize) * size;
      if (pixels[i]) {
        ctx.fillStyle = pixels[i];
        ctx.fillRect(x, y, size, size);
      }
      if (showGrid) {
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, size, size);
      }
    }
  };
  const getIndexFromEvent = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return -1;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const size = canvas.width / gridSize;
    const col = Math.floor(x * scaleX / size);
    const row = Math.floor(y * scaleY / size);
    if (col >= 0 && col < gridSize && row >= 0 && row < gridSize) {
      return row * gridSize + col;
    }
    return -1;
  };
  const floodFill = (index: number, targetColor: string, newColor: string, newPixels: string[]) => {
    if (targetColor === newColor) return;
    if (newPixels[index] !== targetColor) return;
    const stack = [index];
    while (stack.length > 0) {
      const curr = stack.pop()!;
      if (newPixels[curr] === targetColor) {
        newPixels[curr] = newColor;
        const col = curr % gridSize;
        const row = Math.floor(curr / gridSize);
        if (col > 0) stack.push(curr - 1); // Left
        if (col < gridSize - 1) stack.push(curr + 1); // Right
        if (row > 0) stack.push(curr - gridSize); // Top
        if (row < gridSize - 1) stack.push(curr + gridSize); // Bottom
      }
    }
  };
  const applyTool = (index: number, updateHistory: boolean = false) => {
    if (index === -1) return;
    setPixels(prev => {
      const newPixels = [...prev];
      if (tool === "pen") {
        newPixels[index] = color;
      } else if (tool === "eraser") {
        newPixels[index] = "";
      } else if (tool === "fill") {
        floodFill(index, newPixels[index], color, newPixels);
      }
      if (updateHistory) {
        const newHistory = history.slice(0, historyStep + 1);
        newHistory.push([...newPixels]);
        setHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
      }
      return newPixels;
    });
  };
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const idx = getIndexFromEvent(e);
    applyTool(idx, tool === "fill"); // Fill is single click action
  };
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || tool === "fill") return;
    const idx = getIndexFromEvent(e);
    applyTool(idx);
  };
  const handlePointerUp = () => {
    if (isDrawing && tool !== "fill") {
      setHistory(prev => {
        const newHistory = prev.slice(0, historyStep + 1);
        newHistory.push([...pixels]);
        setHistoryStep(newHistory.length);
        return newHistory;
      });
    }
    setIsDrawing(false);
  };
  const handleUndo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setPixels(history[historyStep - 1]);
    }
  };
  const handleClear = () => {
    const empty = Array(gridSize * gridSize).fill("");
    setPixels(empty);
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(empty);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary canvas for exporting without grid lines
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1024;
    exportCanvas.height = 1024;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;
    const size = exportCanvas.width / gridSize;
    for (let i = 0; i < pixels.length; i++) {
      if (pixels[i]) {
        const x = i % gridSize * size;
        const y = Math.floor(i / gridSize) * size;
        ctx.fillStyle = pixels[i];
        ctx.fillRect(x, y, size, size);
      }
    }
    const link = document.createElement("a");
    link.download = `pixel-art-${gridSize}x${gridSize}.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
    toast.success("Image downloaded");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Grid} title="Pixel Art Creator" description="Create, edit and download your own pixel art online." actions={<ActionButton onClick={handleDownload} icon={Download} label="Export PNG" />} />

 <div className="grid md:grid-cols-4 gap-6">
 <GlassCard className="md:col-span-1 h-fit">
 <CardHeader>
 <CardTitle>Tools</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Tool</Label>
 <div className="flex gap-2">
 <Button variant={tool === "pen" ? "default" : "outline"} size="icon" onClick={() => setTool("pen")} title="Pencil">
 <Pen className="w-4 h-4" />
 </Button>
 <Button variant={tool === "eraser" ? "default" : "outline"} size="icon" onClick={() => setTool("eraser")} title="Eraser">
 <Eraser className="w-4 h-4" />
 </Button>
 <Button variant={tool === "fill" ? "default" : "outline"} size="icon" onClick={() => setTool("fill")} title="Fill Bucket">
 <MousePointer className="w-4 h-4" />
 </Button>
 </div>
 </div>

 <Separator />
 
 <div className="space-y-2">
 <Label>Color</Label>
 <div className="flex items-center gap-4">
 <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-12 h-12 p-1 bg-background border rounded cursor-pointer" />
 <span className="font-mono text-sm uppercase">{color}</span>
 </div>
 </div>
 
 <div className="space-y-2">
 <Label className="flex justify-between">
 <span>Palette</span>
 <Select value={palette} onValueChange={(v: keyof typeof PALETTES) => setPalette(v)}>
 <SelectTrigger className="w-[120px] h-7 text-xs">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {Object.keys(PALETTES).map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
 </SelectContent>
 </Select>
 </Label>
 <div className="flex flex-wrap gap-1">
 {PALETTES[palette].map(c => <Button key={c} className="w-6 h-6 rounded-sm border shadow-sm" style={{
                  backgroundColor: c
                }} onClick={() => {
                  setColor(c);
                  setTool("pen");
                }} title={c} />)}
 </div>
 </div>

 <Separator />

 <div className="space-y-2">
 <Label>Canvas Size</Label>
 <Select value={gridSize.toString()} onValueChange={v => setGridSize(parseInt(v))}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="8">8 x 8</SelectItem>
 <SelectItem value="16">16 x 16</SelectItem>
 <SelectItem value="32">32 x 32</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="flex items-center justify-between">
 <Label>Show Grid</Label>
 <Switch checked={showGrid} onCheckedChange={setShowGrid} />
 </div>

 <div className="flex gap-2">
 <Button variant="outline" className="flex-1" onClick={handleUndo} disabled={historyStep === 0}>
 <Undo2 className="w-4 h-4 mr-2" /> Undo
 </Button>
 <Button variant="destructive" className="flex-1" onClick={handleClear}>
 Clear
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-3 flex items-center justify-center p-8 bg-muted/30">
 <div className="relative bg-background shadow-lg rounded-sm overflow-hidden touch-none" style={{
            width: '100%',
            maxWidth: '512px',
            aspectRatio: '1/1'
          }}>
 <canvas ref={canvasRef} width={512} height={512} className="w-full h-full cursor-crosshair" onMouseDown={handlePointerDown} onMouseMove={handlePointerMove} onMouseUp={handlePointerUp} onMouseLeave={handlePointerUp} onTouchStart={handlePointerDown} onTouchMove={handlePointerMove} onTouchEnd={handlePointerUp} />
 </div>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Canvas",
    description:"Choose grid size.",
    icon: Grid3x3,
  },
{
    step:"02",
    title:"Draw",
    description:"Paint pixels with colors.",
    icon: Brush,
  },
{
    step:"03",
    title:"Export",
    description:"Save your sprite.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Grid3x3,
    title:"Canvas",
    description:"Pixel grid size.",
  },
{
    icon: Brush,
    title:"Paint",
    description:"Place colored pixels.",
  },
{
    icon: Download,
    title:"Export",
    description:"PNG sprite.",
  },
{
    icon: Palette,
    title:"Colors",
    description:"Limited palette.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A pixel art creator lets you paint on a grid to build retro-style sprites and icons, one colored square at a time. The constrained canvas forces clarity and charm that smooth art lacks. This tool provides the grid, brush, and palette.</p>
  <p>Limited resolution is the aesthetic. Working at small sizes yields the crisp, blocky look associated with classic games. Exporting as PNG keeps edges sharp at any scale.</p>
  <p>Use it for game assets and icons. The tool's value is approachable pixel-art creation without specialist software.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is pixel art?",
    answer:"Art made of visible square pixels.",
  },
{
    question:"Use case?",
    answer:"Games, icons, retro style.",
  },
{
    question:"Export?",
    answer:"PNG, scalable.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  }
  ]}
/>
</div>
 );
}
