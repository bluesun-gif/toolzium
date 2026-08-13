"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useRef, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PenTool, Upload, Download, Undo2, Square, Circle, MoveRight, Type, Eraser, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type DrawTool = "rectangle" | "circle" | "arrow" | "freehand" | "text" | "blur";
interface DrawAction {
  tool: DrawTool;
  color: string;
  lineWidth: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  text?: string;
  points?: {
    x: number;
    y: number;
  }[];
}
export function AnnotatorClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<DrawTool>("rectangle");
  const [color, setColor] = useState("#ef4444");
  const [lineWidth, setLineWidth] = useState(4);
  const [textInput, setTextInput] = useState("Annotation");
  const [history, setHistory] = useState<DrawAction[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentAction, setCurrentAction] = useState<DrawAction | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      if (typeof event.target?.result === 'string') {
        setImageSrc(event.target.result);
        setHistory([]);
      }
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      redrawCanvas();
    };
    img.src = imageSrc;
  }, [imageSrc]);
  useEffect(() => {
    if (imageRef.current) {
      redrawCanvas();
    }
  }, [history, currentAction]);
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imageRef.current;
    if (!canvas || !ctx || !img) return;
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear & draw base image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Draw history
    history.forEach(action => drawAction(ctx, action));

    // Draw current action
    if (currentAction) {
      drawAction(ctx, currentAction);
    }
  };
  const drawAction = (ctx: CanvasRenderingContext2D, action: DrawAction) => {
    ctx.strokeStyle = action.color;
    ctx.fillStyle = action.color;
    ctx.lineWidth = action.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    if (action.tool === "rectangle") {
      ctx.rect(action.startX, action.startY, action.endX - action.startX, action.endY - action.startY);
      ctx.stroke();
    } else if (action.tool === "circle") {
      const radius = Math.sqrt(Math.pow(action.endX - action.startX, 2) + Math.pow(action.endY - action.startY, 2));
      ctx.arc(action.startX, action.startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (action.tool === "arrow") {
      const headlen = 15;
      const dx = action.endX - action.startX;
      const dy = action.endY - action.startY;
      const angle = Math.atan2(dy, dx);
      ctx.moveTo(action.startX, action.startY);
      ctx.lineTo(action.endX, action.endY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(action.endX, action.endY);
      ctx.lineTo(action.endX - headlen * Math.cos(angle - Math.PI / 6), action.endY - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(action.endX - headlen * Math.cos(angle + Math.PI / 6), action.endY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.lineTo(action.endX, action.endY);
      ctx.fill();
    } else if (action.tool === "freehand" && action.points) {
      if (action.points.length > 0) {
        ctx.moveTo(action.points[0].x, action.points[0].y);
        for (let i = 1; i < action.points.length; i++) {
          ctx.lineTo(action.points[i].x, action.points[i].y);
        }
        ctx.stroke();
      }
    } else if (action.tool === "text" && action.text) {
      ctx.font = action.lineWidth * 6 + "px Arial";
      ctx.fillText(action.text, action.endX, action.endY);
    } else if (action.tool === "blur") {
      // Simulate blur with semi-transparent rectangle
      ctx.fillStyle = action.color + "80"; // 50% opacity
      ctx.fillRect(action.startX, action.startY, action.endX - action.startX, action.endY - action.startY);
    }
  };
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return {
      x: 0,
      y: 0
    };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };
  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!imageRef.current) return;
    const {
      x,
      y
    } = getCoordinates(e);
    setIsDrawing(true);
    if (activeTool === "text") {
      const newAction: DrawAction = {
        tool: "text",
        color,
        lineWidth,
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        text: textInput
      };
      setHistory([...history, newAction]);
      setIsDrawing(false);
      return;
    }
    setCurrentAction({
      tool: activeTool,
      color,
      lineWidth,
      startX: x,
      startY: y,
      endX: x,
      endY: y,
      points: activeTool === "freehand" ? [{
        x,
        y
      }] : undefined
    });
  };
  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAction) return;
    const {
      x,
      y
    } = getCoordinates(e);
    if (activeTool === "freehand" && currentAction.points) {
      setCurrentAction({
        ...currentAction,
        endX: x,
        endY: y,
        points: [...currentAction.points, {
          x,
          y
        }]
      });
    } else {
      setCurrentAction({
        ...currentAction,
        endX: x,
        endY: y
      });
    }
  };
  const handlePointerUp = () => {
    if (!isDrawing || !currentAction) return;
    setIsDrawing(false);
    setHistory([...history, currentAction]);
    setCurrentAction(null);
  };
  const undo = () => {
    if (history.length > 0) {
      setHistory(history.slice(0, -1));
    }
  };
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "annotated-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const toolClass = (tool: DrawTool) => cn("h-10 w-10 p-0", activeTool === tool ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80");
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={PenTool} title="Screenshot Annotator" description="Add shapes, arrows, text, and highlights to your images before sharing." actions={<>
 <Button variant="outline" onClick={undo} disabled={history.length === 0}>
 <Undo2 className="w-4 h-4 mr-2" /> Undo
 </Button>
 <Button onClick={downloadImage} disabled={!imageSrc}>
 <Download className="w-4 h-4 mr-2" /> Download
 </Button>
 </>} />

 <div className="grid lg:grid-cols-4 gap-6">
 <GlassCard className="lg:col-span-1 h-fit">
 <CardHeader>
 <CardTitle>Tools</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-3">
 <Label>Image</Label>
 <Input type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer" />
 </div>
 
 <Separator />
 
 <div className="space-y-3">
 <Label>Drawing Tool</Label>
 <div className="flex flex-wrap gap-2">
 <Button variant="outline" className={toolClass("rectangle")} onClick={() => setActiveTool("rectangle")} title="Rectangle">
 <Square className="w-4 h-4" />
 </Button>
 <Button variant="outline" className={toolClass("circle")} onClick={() => setActiveTool("circle")} title="Circle">
 <Circle className="w-4 h-4" />
 </Button>
 <Button variant="outline" className={toolClass("arrow")} onClick={() => setActiveTool("arrow")} title="Arrow">
 <MoveRight className="w-4 h-4" />
 </Button>
 <Button variant="outline" className={toolClass("freehand")} onClick={() => setActiveTool("freehand")} title="Freehand">
 <PenTool className="w-4 h-4" />
 </Button>
 <Button variant="outline" className={toolClass("blur")} onClick={() => setActiveTool("blur")} title="Highlight Box">
 <Eraser className="w-4 h-4" />
 </Button>
 <Button variant="outline" className={toolClass("text")} onClick={() => setActiveTool("text")} title="Text">
 <Type className="w-4 h-4" />
 </Button>
 </div>
 </div>
 
 {activeTool === "text" && <div className="space-y-3 animate-in fade-in zoom-in slide-in-from-top-2">
 <Label>Text Content</Label>
 <Input value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Click on image to place" />
 </div>}
 
 <Separator />
 
 <div className="space-y-3">
 <Label>Color</Label>
 <div className="flex items-center gap-3">
 <Input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-12 h-10 p-1 cursor-pointer" />
 <div className="flex gap-1 flex-wrap">
 {["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#000000", "#ffffff"].map(c => <div key={c} className="w-6 h-6 rounded-full cursor-pointer border shadow-sm" style={{
                    backgroundColor: c
                  }} onClick={() => setColor(c)} />)}
 </div>
 </div>
 </div>
 
 <div className="space-y-3">
 <Label>Size ({lineWidth}px)</Label>
 <input type="range" min="1" max="20" value={lineWidth} onChange={e => setLineWidth(parseInt(e.target.value))} className="w-full" />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="lg:col-span-3 min-h-[500px] flex flex-col">
 <CardContent className="flex-1 p-0 overflow-hidden relative rounded-b-xl flex items-center justify-center bg-muted/30">
 {!imageSrc ? <div className="text-center p-12 text-muted-foreground flex flex-col items-center justify-center h-full">
 <Upload className="w-16 h-16 mb-4 opacity-20" />
 <h3 className="text-lg font-medium mb-2 text-foreground">Upload an image to start</h3>
 <p className="max-w-md text-sm">Select an image using the button on the left to begin annotating.</p>
 </div> : <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
 <canvas ref={canvasRef} onMouseDown={handlePointerDown} onMouseMove={handlePointerMove} onMouseUp={handlePointerUp} onMouseLeave={handlePointerUp} onTouchStart={handlePointerDown} onTouchMove={handlePointerMove} onTouchEnd={handlePointerUp} className={cn("max-w-full shadow-lg border rounded-sm", activeTool === "text" ? "cursor-text" : "cursor-crosshair")} style={{
                maxHeight: "80vh",
                objectFit: "contain"
              }} />
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
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
          <h3>Why Use Our Screenshot Annotator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Screenshot Annotator provides
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

      <RelatedTools currentToolUrl="/tools/image/annotator" max={6} />

    </div></div>;
}