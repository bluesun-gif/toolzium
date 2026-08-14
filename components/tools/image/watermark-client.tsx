"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useRef, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Type, ImageIcon, Download, Settings, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function WatermarkClient() {
  const [images, setImages] = useState<{
    url: string;
    file: File;
  }[]>([]);
  const [text, setText] = useState("© Toolzium");
  const [opacity, setOpacity] = useState(50);
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState("center"); // top-left, top-center, etc.
  const [tiled, setTiled] = useState(false);
  const [angle, setAngle] = useState(-45);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => ({
        url: URL.createObjectURL(file),
        file
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  };
  const resetTool = () => {
    setImages([]);
    setText("© Toolzium");
    setOpacity(50);
    setTiled(false);
  };
  const drawWatermark = () => {
    if (images.length === 0 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.src = images[0].url;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = color;
      ctx.font = `bold ${fontSize}px Arial`;
      if (tiled) {
        ctx.rotate(angle * Math.PI / 180);
        const textWidth = ctx.measureText(text).width;
        // Approximation for tiled coverage
        for (let x = -canvas.width * 2; x < canvas.width * 2; x += textWidth + 50) {
          for (let y = -canvas.height * 2; y < canvas.height * 2; y += fontSize * 3) {
            ctx.fillText(text, x, y);
          }
        }
      } else {
        ctx.textAlign = position.includes("left") ? "left" : position.includes("right") ? "right" : "center";
        ctx.textBaseline = position.includes("top") ? "top" : position.includes("bottom") ? "bottom" : "middle";
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        if (position.includes("left")) x = 20;
        if (position.includes("right")) x = canvas.width - 20;
        if (position.includes("top")) y = 20;
        if (position.includes("bottom")) y = canvas.height - 20;
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.fillText(text, 0, 0);
      }
    };
  };
  useEffect(() => {
    drawWatermark();
  }, [images, text, opacity, fontSize, color, position, tiled, angle]);
  const downloadImage = () => {
    if (!canvasRef.current || images.length === 0) return;
    const link = document.createElement("a");
    link.download = `watermarked_${images[0].file.name}`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Type} title="Image Watermark Tool" description="Add customizable text watermarks to your images to protect your content." actions={<ResetButton onClick={resetTool} label="Reset" />} />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5" /> Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Upload Images</Label>
 <Input type="file" accept="image/*" multiple onChange={handleImageUpload} />
 </div>
 
 <div className="space-y-2">
 <Label>Watermark Text</Label>
 <Input value={text} onChange={e => setText(e.target.value)} />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Opacity</Label>
 <span className="text-xs text-muted-foreground">{opacity}%</span>
 </div>
 <Input type="range" min="0" max="100" value={opacity} onChange={e => setOpacity(Number(e.target.value))} />
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Font Size</Label>
 <Input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Color</Label>
 <Input type="color" className="h-10 p-1 w-full" value={color} onChange={e => setColor(e.target.value)} />
 </div>
 </div>

 <div className="flex items-center justify-between">
 <Label>Tiled Watermark</Label>
 <Switch checked={tiled} onCheckedChange={setTiled} />
 </div>

 {!tiled && <div className="space-y-2">
 <Label>Position</Label>
 <div className="grid grid-cols-3 gap-2 mt-2">
 {["top-left", "top-center", "top-right", "center-left", "center", "center-right", "bottom-left", "bottom-center", "bottom-right"].map(pos => <Button key={pos} variant={position === pos ? "default" : "outline"} size="sm" className="h-8 p-0" onClick={() => setPosition(pos)} title={pos}>
 <div className={cn("w-2 h-2 rounded-full", position === pos ? "bg-primary-foreground" : "bg-muted-foreground")} />
 </Button>)}
 </div>
 </div>}

 <div className="space-y-2">
 <Label>Angle (°)</Label>
 <Input type="number" value={angle} onChange={e => setAngle(Number(e.target.value))} />
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <CardTitle className="flex items-center gap-2"><ImageIcon className="w-5 h-5" /> Preview</CardTitle>
 {images.length > 0 && <ActionButton icon={Download} label="Download" onClick={downloadImage} />}
 </CardHeader>
 <CardContent>
 {images.length === 0 ? <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
 <p className="text-muted-foreground text-sm flex flex-col items-center gap-2">
 <ImageIcon className="w-8 h-8 opacity-50" />
 Upload an image to see preview
 </p>
 </div> : <div className="flex justify-center overflow-hidden bg-muted/10 rounded-lg">
 <canvas ref={canvasRef} className="max-w-full h-auto max-h-[600px] object-contain" />
 </div>}
 </CardContent>
 </GlassCard>
 </div>
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
          <h3>Why Use Our Image Watermark Tool?</h3>
          <p>
            This free online tool is designed to help you protect your images quickly and securely.
            Whether you're a photographer, designer, content creator, or business, our watermark tool provides
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

      <RelatedTools currentToolUrl="/tools/image/watermark" max={6} />

    </div></div>;
}