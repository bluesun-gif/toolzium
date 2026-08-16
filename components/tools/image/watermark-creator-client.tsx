"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { BadgeCheck, Download, Image as ImageIcon, RefreshCw, ShieldCheck, Text, Upload } from"lucide-react";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import toast from"react-hot-toast";

type WatermarkType ="text"|"image";
type Position ="top-left"|"top-right"|"center"|"bottom-left"|"bottom-right"|"tiled";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Image as ImageIcon, Text, Download, RefreshCw, Upload, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type WatermarkType = "text" | "image";
type Position = "top-left" | "top-right" | "center" | "bottom-left" | "bottom-right" | "tiled";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function WatermarkCreatorClient() {
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [watermarkType, setWatermarkType] = useState<WatermarkType>("text");
  const [watermarkText, setWatermarkText] = useState("© Toolzium");
  const [watermarkImage, setWatermarkImage] = useState<string | null>(null);
  const [position, setPosition] = useState<Position>("bottom-right");
  const [opacity, setOpacity] = useState(50);
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#ffffff");
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const handleBaseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      setBaseImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleWatermarkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      setWatermarkImage(event.target?.result as string);
      setWatermarkType("image");
    };
    reader.readAsDataURL(file);
  };
  const renderCanvas = () => {
    if (!baseImage || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = opacity / 100;
      if (watermarkType === "text" && watermarkText) {
        ctx.font = fontSize + "px sans-serif";
        ctx.fillStyle = color;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        if (position === "tiled") {
          const textMetrics = ctx.measureText(watermarkText);
          const tw = textMetrics.width + 50;
          const th = fontSize + 50;
          for (let y = th / 2; y < canvas.height + th; y += th) {
            for (let x = tw / 2; x < canvas.width + tw; x += tw) {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(rotation * Math.PI / 180);
              ctx.fillText(watermarkText, 0, 0);
              ctx.restore();
            }
          }
        } else {
          drawSingleText(ctx, canvas.width, canvas.height);
        }
      } else if (watermarkType === "image" && watermarkImage) {
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.onload = () => {
          if (position === "tiled") {
            const w = logo.width * (fontSize / 100);
            const h = logo.height * (fontSize / 100);
            for (let y = 0; y < canvas.height; y += h + 50) {
              for (let x = 0; x < canvas.width; x += w + 50) {
                ctx.save();
                ctx.translate(x + w / 2, y + h / 2);
                ctx.rotate(rotation * Math.PI / 180);
                ctx.drawImage(logo, -w / 2, -h / 2, w, h);
                ctx.restore();
              }
            }
          } else {
            drawSingleImage(ctx, logo, canvas.width, canvas.height);
          }
        };
        logo.src = watermarkImage;
      }
      ctx.globalAlpha = 1.0;
    };
    img.src = baseImage;
  };
  const drawSingleText = (ctx: CanvasRenderingContext2D, cw: number, ch: number) => {
    let x = cw / 2;
    let y = ch / 2;
    const padding = 20 + fontSize / 2;
    switch (position) {
      case "top-left":
        x = padding;
        y = padding;
        ctx.textAlign = "left";
        break;
      case "top-right":
        x = cw - padding;
        y = padding;
        ctx.textAlign = "right";
        break;
      case "center":
        break;
      case "bottom-left":
        x = padding;
        y = ch - padding;
        ctx.textAlign = "left";
        break;
      case "bottom-right":
        x = cw - padding;
        y = ch - padding;
        ctx.textAlign = "right";
        break;
    }
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.fillText(watermarkText, 0, 0);
    ctx.restore();
  };
  const drawSingleImage = (ctx: CanvasRenderingContext2D, logo: HTMLImageElement, cw: number, ch: number) => {
    const scale = fontSize / 100;
    const w = logo.width * scale;
    const h = logo.height * scale;
    const padding = 20;
    let x = cw / 2;
    let y = ch / 2;
    switch (position) {
      case "top-left":
        x = padding + w / 2;
        y = padding + h / 2;
        break;
      case "top-right":
        x = cw - padding - w / 2;
        y = padding + h / 2;
        break;
      case "center":
        break;
      case "bottom-left":
        x = padding + w / 2;
        y = ch - padding - h / 2;
        break;
      case "bottom-right":
        x = cw - padding - w / 2;
        y = ch - padding - h / 2;
        break;
    }
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.drawImage(logo, -w / 2, -h / 2, w, h);
    ctx.restore();
  };
  useEffect(() => {
    if (baseImage) {
      setTimeout(renderCanvas, 50);
    }
  }, [baseImage, watermarkType, watermarkText, watermarkImage, position, opacity, fontSize, color, rotation]);
  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "watermarked-image.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    toast.success("Image downloaded");
  };
  const resetAll = () => {
    setBaseImage(null);
    setWatermarkImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (logoInputRef.current) logoInputRef.current.value = "";
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={ImageIcon} title="Image Watermark Creator" description="Protect your photos by adding custom text or image watermarks." actions={<div className="flex gap-2">
 <ResetButton onClick={resetAll} label="Reset All" />
 <ActionButton onClick={downloadImage} icon={Download} label="Download" variant="default" size="default" />
 </div>} />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Base Image</CardTitle>
 </CardHeader>
 <CardContent>
 <Button onClick={() => fileInputRef.current?.click()} className="w-full flex gap-2">
 <Upload className="h-4 w-4" /> Upload Image
 </Button>
 <input type="file" accept="image/*" ref={fileInputRef} onChange={handleBaseImageUpload} className="hidden" />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Watermark Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex gap-2 mb-4">
 <Button variant={watermarkType === "text" ? "default" : "outline"} className="flex-1" onClick={() => setWatermarkType("text")}>
 <Text className="h-4 w-4 mr-2" /> Text
 </Button>
 <Button variant={watermarkType === "image" ? "default" : "outline"} className="flex-1" onClick={() => setWatermarkType("image")}>
 <ImageIcon className="h-4 w-4 mr-2" /> Logo
 </Button>
 </div>

 {watermarkType === "text" ? <>
 <div className="space-y-2">
 <Label>Watermark Text</Label>
 <Input value={watermarkText} onChange={e => setWatermarkText(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Color</Label>
 <div className="flex gap-2">
 <Input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-12 p-1" />
 <Input value={color} onChange={e => setColor(e.target.value)} className="flex-1" />
 </div>
 </div>
 </> : <div className="space-y-2">
 <Label>Logo Image</Label>
 <Button onClick={() => logoInputRef.current?.click()} variant="outline" className="w-full flex gap-2">
 <Upload className="h-4 w-4" /> Upload Logo
 </Button>
 <input type="file" accept="image/*" ref={logoInputRef} onChange={handleWatermarkImageUpload} className="hidden" />
 </div>}

 <div className="space-y-2">
 <Label>Position</Label>
 <Select value={position} onValueChange={(val: Position) => setPosition(val)}>
 <SelectTrigger>
 <SelectValue placeholder="Select position" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="top-left">Top Left</SelectItem>
 <SelectItem value="top-right">Top Right</SelectItem>
 <SelectItem value="center">Center</SelectItem>
 <SelectItem value="bottom-left">Bottom Left</SelectItem>
 <SelectItem value="bottom-right">Bottom Right</SelectItem>
 <SelectItem value="tiled">Tiled Pattern</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Opacity: {opacity}%</Label>
 <Input type="range" min="0" max="100" value={opacity} onChange={e => setOpacity(parseInt(e.target.value))} />
 </div>

 <div className="space-y-2">
 <Label>{watermarkType === "text" ? "Font Size" : "Scale"}: {fontSize}</Label>
 <Input type="range" min="10" max="200" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} />
 </div>

 <div className="space-y-2">
 <Label>Rotation: {rotation}°</Label>
 <Input type="range" min="-180" max="180" value={rotation} onChange={e => setRotation(parseInt(e.target.value))} />
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard className="lg:col-span-2">
 <CardHeader>
 <CardTitle>Preview</CardTitle>
 <CardDescription>Changes apply automatically</CardDescription>
 </CardHeader>
 <CardContent className="flex justify-center bg-secondary/30 rounded-lg p-4 min-h-[400px] overflow-auto">
 {baseImage ? <canvas ref={canvasRef} className="max-w-full h-auto max-h-[70vh] border rounded shadow-sm object-contain" /> : <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
 <ImageIcon className="h-12 w-12 opacity-50" />
 <p>Upload a base image to see preview</p>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Load the image.",
    icon: Upload,
  },
{
    step:"02",
    title:"Design",
    description:"Craft a watermark style.",
    icon: BadgeCheck,
  },
{
    step:"03",
    title:"Apply",
    description:"Apply and download.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Upload,
    title:"Image Input",
    description:"From your device.",
  },
{
    icon: BadgeCheck,
    title:"Style",
    description:"Text, logo, tiled.",
  },
{
    icon: Download,
    title:"Export",
    description:"Protected result.",
  },
{
    icon: ShieldCheck,
    title:"Privacy",
    description:"Local processing.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An image watermark creator builds and applies ownership marks, including tiled patterns that are harder to crop out. A single corner logo is easy to remove; a subtle tiled watermark protects more thoroughly. This tool offers both styles.</p>
  <p>Style and opacity balance protection with presentation. You can mark images strongly for public previews yet keep finals clean. Local processing safeguards unpublished work.</p>
  <p>Use it to protect shareable images. The tool's value is flexible, private watermarking suited to different exposure levels.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Tiled option?",
    answer:"Yes, repeat across the image.",
  },
{
    question:"Why watermark?",
    answer:"Ownership and deterrence.",
  },
{
    question:"Opacity?",
    answer:"Adjustable.",
  },
{
    question:"Private?",
    answer:"Yes.",
  },
{
    question:"Free?",
    answer:"Yes.",
  }
  ]}
/>
</div>
 );
}
=======
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
          <h3>Why Use Our Image Watermark Creator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Image Watermark Creator provides
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

      <RelatedTools currentToolUrl="/tools/image/watermark-creator" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
