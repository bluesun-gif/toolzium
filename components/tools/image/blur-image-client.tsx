"use client";

import { useState, useRef, useEffect, MouseEvent } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ShieldAlert, Upload, Download, EyeOff, X, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type Mode ="blur"|"pixelate";
type Rect = { x: number; y: number; w: number; h: number };

export function BlurImageClient() {
 const [image, setImage] = useState<HTMLImageElement | null>(null);
 const [imageName, setImageName] = useState("");
 const [mode, setMode] = useState<Mode>("blur");
 const [strength, setStrength] = useState(10);
 const [selections, setSelections] = useState<Rect[]>([]);
 const [isDrawing, setIsDrawing] = useState(false);
 const [startPos, setStartPos] = useState({ x: 0, y: 0 });
 const [currentRect, setCurrentRect] = useState<Rect | null>(null);
 
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const containerRef = useRef<HTMLDivElement>(null);

 const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;
 
 setImageName(file.name);
 const reader = new FileReader();
 reader.onload = (event) => {
 const img = new Image();
 img.onload = () => {
 setImage(img);
 setSelections([]);
 setCurrentRect(null);
 };
 img.src = event.target?.result as string;
 };
 reader.readAsDataURL(file);
 };

 const drawCanvas = () => {
 const canvas = canvasRef.current;
 if (!canvas || !image) return;
 
 const ctx = canvas.getContext("2d");
 if (!ctx) return;

 const maxWidth = containerRef.current?.clientWidth || 800;
 let scale = 1;
 if (image.width > maxWidth) {
 scale = maxWidth / image.width;
 }
 
 canvas.width = image.width * scale;
 canvas.height = image.height * scale;
 
 ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

 const allRects = [...selections, ...(currentRect ? [currentRect] : [])];
 
 allRects.forEach(rect => {
 if (rect.w === 0 || rect.h === 0) return;
 
 const rx = Math.min(rect.x, rect.x + rect.w);
 const ry = Math.min(rect.y, rect.y + rect.h);
 const rw = Math.abs(rect.w);
 const rh = Math.abs(rect.h);
 
 const imgData = ctx.getImageData(rx, ry, rw, rh);
 
 const offCanvas = document.createElement('canvas');
 offCanvas.width = rw;
 offCanvas.height = rh;
 const offCtx = offCanvas.getContext('2d');
 if (offCtx) {
 offCtx.putImageData(imgData, 0, 0);
 
 ctx.save();
 ctx.beginPath();
 ctx.rect(rx, ry, rw, rh);
 ctx.clip();
 
 if (mode ==="blur") {
 ctx.filter ="blur("+ strength +"px)";
 ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
 } else if (mode ==="pixelate") {
 const pixelSize = Math.max(2, strength * 2);
 const scaledW = rw / pixelSize;
 const scaledH = rh / pixelSize;
 
 const tmpCanvas = document.createElement('canvas');
 tmpCanvas.width = scaledW;
 tmpCanvas.height = scaledH;
 const tmpCtx = tmpCanvas.getContext('2d');
 if (tmpCtx) {
 tmpCtx.drawImage(offCanvas, 0, 0, scaledW, scaledH);
 ctx.imageSmoothingEnabled = false;
 ctx.drawImage(tmpCanvas, rx, ry, rw, rh);
 }
 }
 ctx.restore();
 }
 });
 };

 useEffect(() => {
 drawCanvas();
 }, [image, selections, currentRect, mode, strength]);

 const getCanvasPos = (e: MouseEvent<HTMLCanvasElement>) => {
 const canvas = canvasRef.current;
 if (!canvas) return { x: 0, y: 0 };
 const rect = canvas.getBoundingClientRect();
 const scaleX = canvas.width / rect.width;
 const scaleY = canvas.height / rect.height;
 return {
 x: (e.clientX - rect.left) * scaleX,
 y: (e.clientY - rect.top) * scaleY
 };
 };

 const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
 if (!image) return;
 const pos = getCanvasPos(e);
 setIsDrawing(true);
 setStartPos(pos);
 setCurrentRect({ x: pos.x, y: pos.y, w: 0, h: 0 });
 };

 const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
 if (!isDrawing || !image) return;
 const pos = getCanvasPos(e);
 setCurrentRect({
 x: startPos.x,
 y: startPos.y,
 w: pos.x - startPos.x,
 h: pos.y - startPos.y
 });
 };

 const handleMouseUp = () => {
 if (!isDrawing) return;
 setIsDrawing(false);
 if (currentRect && Math.abs(currentRect.w) > 5 && Math.abs(currentRect.h) > 5) {
 setSelections([...selections, currentRect]);
 }
 setCurrentRect(null);
 };

 const downloadImage = () => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 
 const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
 const link = document.createElement("a");
 link.href = dataUrl;
 link.download ="sanitized_"+ (imageName ||"image.jpg");
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 toast.success("Image downloaded!");
 };

 const clearImage = () => {
 setImage(null);
 setSelections([]);
 setImageName("");
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={ShieldAlert}
 title="Image Area Blur & Anonymizer"
 description="Hide sensitive information by blurring or pixelating regions of an image before sharing."
 actions={
 <div className="flex space-x-2">
 {image && <ResetButton onClick={() => setSelections([])} label="Clear Selections"/>}
 {image && <ActionButton onClick={downloadImage} icon={Download} label="Download"/>}
 </div>
 }
 />

 <div className="grid md:grid-cols-4 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 {!image ? (
 <div className="space-y-2">
 <Label>Upload Image</Label>
 <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors"onClick={() => document.getElementById("file-upload")?.click()}>
 <Upload className="w-8 h-8 text-muted-foreground mb-2"/>
 <p className="text-sm font-medium">Click to upload</p>
 <p className="text-xs text-muted-foreground">JPEG, PNG, WebP</p>
 <input id="file-upload"type="file"accept="image/*"className="hidden"onChange={handleFileUpload} />
 </div>
 </div>
 ) : (
 <Button variant="outline"className="w-full"onClick={clearImage}>
 <X className="w-4 h-4 mr-2"/> Change Image
 </Button>
 )}

 <div className="space-y-2 pt-4">
 <Label>Censor Mode</Label>
 <Select value={mode} onValueChange={(v: Mode) => setMode(v)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="blur">Gaussian Blur</SelectItem>
 <SelectItem value="pixelate">Pixelate</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Strength / Size</Label>
 <span className="text-xs text-muted-foreground">{strength}</span>
 </div>
 <input 
 type="range"
 min="2"
 max="50"
 value={strength} 
 onChange={e => setStrength(Number(e.target.value))}
 className="w-full"
 />
 </div>
 
 <div className="bg-muted p-3 rounded-lg text-xs flex items-start mt-4">
 <EyeOff className="w-4 h-4 mr-2 shrink-0 mt-0.5"/>
 <p>Click and drag on the image to draw a rectangle over the area you want to hide.</p>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-3">
 <CardContent className="p-6">
 <div ref={containerRef} className="w-full overflow-hidden flex items-center justify-center bg-muted/20 border rounded-lg min-h-[400px]">
 {!image ? (
 <div className="text-center text-muted-foreground p-12">
 <ShieldAlert className="w-12 h-12 mx-auto mb-4 opacity-50"/>
 <h3 className="text-lg font-medium mb-1">No image uploaded</h3>
 <p className="text-sm">Upload an image from the sidebar to get started.</p>
 </div>
 ) : (
 <canvas
 ref={canvasRef}
 onMouseDown={handleMouseDown}
 onMouseMove={handleMouseMove}
 onMouseUp={handleMouseUp}
 onMouseLeave={handleMouseUp}
 className="max-w-full cursor-crosshair shadow-sm"
 style={{ touchAction:"none"}}
 />
 )}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Image Area Blur & Anonymizer?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Image Area Blur & Anonymizer provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/image/blur-image" max={6} />

</div>
 );
}
