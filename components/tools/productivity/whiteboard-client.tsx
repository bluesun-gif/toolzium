"use client";

import React, { useRef, useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Pencil, Square, Circle, Minus, Eraser, Undo2, Redo2, Download, Trash2, Palette, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type ToolType = "pen" | "rectangle" | "circle" | "line" | "eraser";
const COLORS = ["#000000", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899", "#ffffff"];
export default function WhiteboardClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<ToolType>("pen");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);

  // For shapes drawing
  const [startPos, setStartPos] = useState({
    x: 0,
    y: 0
  });
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);

  // History for undo/redo
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set actual canvas resolution to match display size for crisp drawing
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();

      // Only resize if different to avoid clearing canvas on minor window resizes
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        // Save current canvas content
        const ctx = canvas.getContext("2d");
        let imageData;
        if (canvas.width > 0 && canvas.height > 0 && ctx) {
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
        canvas.width = rect.width;
        canvas.height = rect.height || 500;
        if (ctx) {
          ctx.fillStyle = "white"; // Or handle dark mode differently
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          if (imageData) {
            ctx.putImageData(imageData, 0, 0);
          } else {
            saveState(); // Save initial blank state
          }
        }
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const saveState = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Remove future history if we're branching
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(data);

    // Keep max 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryStep(prev => prev + 1);
    }
    setHistory(newHistory);
  };
  const undo = () => {
    if (historyStep <= 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const newStep = historyStep - 1;
    ctx.putImageData(history[newStep], 0, 0);
    setHistoryStep(newStep);
  };
  const redo = () => {
    if (historyStep >= history.length - 1) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const newStep = historyStep + 1;
    ctx.putImageData(history[newStep], 0, 0);
    setHistoryStep(newStep);
  };
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return {
      x: 0,
      y: 0
    };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    e.preventDefault(); // Prevent scrolling on touch
    setIsDrawing(true);
    const coords = getCoordinates(e);
    setStartPos(coords);

    // Save snapshot for shapes preview
    setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;

    // Draw dot on click for pen/eraser
    if (tool === "pen" || tool === "eraser") {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !snapshot) return;
    e.preventDefault(); // Prevent scrolling on touch
    const coords = getCoordinates(e);

    // For shapes, we need to clear and redraw from snapshot
    if (tool !== "pen" && tool !== "eraser") {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = color;
    }
    if (tool === "pen" || tool === "eraser") {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (tool === "rectangle") {
      ctx.strokeRect(startPos.x, startPos.y, coords.x - startPos.x, coords.y - startPos.y);
    } else if (tool === "circle") {
      ctx.beginPath();
      const radius = Math.sqrt(Math.pow(coords.x - startPos.x, 2) + Math.pow(coords.y - startPos.y, 2));
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (tool === "line") {
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };
  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };
  const clearCanvas = () => {
    if (!window.confirm("Are you sure you want to clear the entire whiteboard?")) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };
  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "whiteboard-" + Date.now() + ".png";
    link.click();
    toast.success("Image downloaded!");
  };
  return <div className="relative mx-auto max-w-5xl px-4 py-8 flex flex-col h-[calc(100vh-80px)]">
      <GridPattern />

 <ToolPageHeader title="Online Whiteboard" description="A simple, fast whiteboard for sketching, diagrams, and brainstorming." />

 <Card className="mt-6 flex flex-col flex-1 border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl min-h-[500px]">
 
 {/* Toolbar */}
 <div className="flex flex-wrap items-center gap-2 border-b bg-zinc-50 dark:bg-zinc-950 p-3">
 
 {/* Tools */}
 <div className="flex items-center gap-1 bg-background dark:bg-zinc-900 rounded-md border p-1 shadow-sm">
 <Button variant={tool === "pen" ? "default" : "ghost"} size="icon" onClick={() => setTool("pen")} title="Pen">
 <Pencil className="h-4 w-4" />
 </Button>
 <Button variant={tool === "line" ? "default" : "ghost"} size="icon" onClick={() => setTool("line")} title="Line">
 <Minus className="h-4 w-4" />
 </Button>
 <Button variant={tool === "rectangle" ? "default" : "ghost"} size="icon" onClick={() => setTool("rectangle")} title="Rectangle">
 <Square className="h-4 w-4" />
 </Button>
 <Button variant={tool === "circle" ? "default" : "ghost"} size="icon" onClick={() => setTool("circle")} title="Circle">
 <Circle className="h-4 w-4" />
 </Button>
 <Button variant={tool === "eraser" ? "default" : "ghost"} size="icon" onClick={() => setTool("eraser")} title="Eraser">
 <Eraser className="h-4 w-4" />
 </Button>
 </div>

 <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

 {/* Color Picker */}
 <Popover>
 <PopoverTrigger asChild>
 <Button variant="outline" className="gap-2 shrink-0">
 <div className="w-4 h-4 rounded-full border shadow-sm" style={{
                backgroundColor: color
              }} />
 <span className="hidden sm:inline">Color</span>
 </Button>
 </PopoverTrigger>
 <PopoverContent className="w-64 p-3" align="start">
 <div className="space-y-3">
 <div className="font-medium text-sm">Preset Colors</div>
 <div className="flex flex-wrap gap-2">
 {COLORS.map(c => <Button key={c} className={cn(cn("w-8 h-8 rounded-full border-2 \\" + (color === c ? 'border-primary ring-2 ring-primary/30' : 'border-transparent hover:scale-110') + "transition-all"))} style={{
                  backgroundColor: c,
                  border: c === '#ffffff' ? '1px solid #e5e7eb' : ''
                }} onClick={() => setColor(c)} />)}
 </div>
 <div className="pt-2 border-t flex items-center gap-2">
 <Palette className="w-4 h-4 text-muted-foreground" />
 <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-8 cursor-pointer rounded-sm" />
 </div>
 </div>
 </PopoverContent>
 </Popover>

 {/* Brush Size */}
 <div className="flex items-center gap-3 bg-background dark:bg-zinc-900 rounded-md border px-3 py-2 shadow-sm shrink-0 flex-1 sm:flex-none sm:w-48">
 <div className="rounded-full bg-foreground shrink-0" style={{
            width: brushSize,
            height: brushSize,
            minWidth: '4px',
            minHeight: '4px'
          }} />
 <Slider value={[brushSize]} min={1} max={30} step={1} onValueChange={([val]) => setBrushSize(val)} className="flex-1" />
 <span className="text-xs text-muted-foreground w-4 text-right">{brushSize}</span>
 </div>

 <div className="flex-1" />

 {/* Actions */}
 <div className="flex items-center gap-1">
 <Button variant="ghost" size="icon" onClick={undo} disabled={historyStep <= 0} title="Undo">
 <Undo2 className="h-4 w-4" />
 </Button>
 <Button variant="ghost" size="icon" onClick={redo} disabled={historyStep >= history.length - 1} title="Redo">
 <Redo2 className="h-4 w-4" />
 </Button>
 
 <div className="h-6 w-px bg-border mx-1" />
 
 <Button variant="ghost" size="icon" onClick={clearCanvas} title="Clear Canvas" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
 <Trash2 className="h-4 w-4" />
 </Button>
 <Button variant="default" size="sm" onClick={downloadCanvas} className="gap-2 ml-1">
 <Download className="h-4 w-4" /> <span className="hidden sm:inline">Export PNG</span>
 </Button>
 </div>
 </div>

 {/* Canvas Area */}
 <div ref={containerRef} className="flex-1 w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative" style={{
        touchAction: 'none'
      }} // Prevent browser handling of touch
      >
 <canvas ref={canvasRef} className="absolute top-0 left-0 bg-background cursor-crosshair shadow-inner" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} onTouchCancel={stopDrawing} />
 </div>
 </Card>
 
      <ToolHowItWorks steps={[{
      step: "01",
      title: "Input Your Data",
      description: "Enter your information in the input field above and configure any options.",
      icon: Sparkles
    }, {
      step: "02",
      title: "Process & Generate",
      description: "The tool processes your input instantly and displays the results.",
      icon: Zap
    }, {
      step: "03",
      title: "Copy & Use",
      description: "Copy the output with one click and use it wherever you need.",
      icon: Copy
    }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
      icon: Sparkles,
      title: "Lightning Fast",
      description: "Get results in milliseconds with our optimized client-side processing engine."
    }, {
      icon: Shield,
      title: "Completely Private",
      description: "All processing happens in your browser. Your data never leaves your device."
    }, {
      icon: Zap,
      title: "No Signup Required",
      description: "Use this tool instantly without creating an account or providing any personal information."
    }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Online Whiteboard?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Online Whiteboard provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
      question: "Is this tool free to use?",
      answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
    }, {
      question: "Is my data secure?",
      answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
    }, {
      question: "Do I need to create an account?",
      answer: "No account or registration is required. Simply open the tool and start using it immediately."
    }]} />

      <RelatedTools currentToolUrl="/tools/productivity/whiteboard" max={6} />

  </div>;
}