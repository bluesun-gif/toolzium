"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Download, Image as ImageIcon, Palette, RefreshCw, Type, Upload } from"lucide-react";
import toast from"react-hot-toast";

const PRESET_TEMPLATES = [
 {
 name:"Classic Grid",
 url:"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
 },
 {
 name:"Minimalist Background",
 url:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
 },
 {
 name:"Vintage Texture",
 url:"https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=600&auto=format&fit=crop&q=80",
 },
 {
 name:"Vibrant Gradient",
 url:"https://images.unsplash.com/photo-1618005198143-e5283b519a7f?w=600&auto=format&fit=crop&q=80",
 },
];

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, RefreshCw, Type, Image as ImageIcon, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
const PRESET_TEMPLATES = [{
  name: "Classic Grid",
  url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80"
}, {
  name: "Minimalist Background",
  url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
}, {
  name: "Vintage Texture",
  url: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=600&auto=format&fit=crop&q=80"
}, {
  name: "Vibrant Gradient",
  url: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?w=600&auto=format&fit=crop&q=80"
}];
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export default function MemeGeneratorClient() {
  const [topText, setTopText] = useState("WHEN THE CODE");
  const [bottomText, setBottomText] = useState("COMPILES ON FIRST TRY");
  const [fontSize, setFontSize] = useState<number>(36);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState<number>(5);
  const [imageSrc, setImageSrc] = useState<string>(PRESET_TEMPLATES[0].url);
  const [uppercase, setUppercase] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Redraw canvas whenever parameters change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      // Calculate layout matching image aspect ratio
      const maxWidth = 600;
      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Draw original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Setup typography style
      ctx.font = `bold ${fontSize}px Impact, Arial, sans-serif`;
      ctx.fillStyle = textColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      // Draw Top Text
      const topTextContent = uppercase ? topText.toUpperCase() : topText;
      if (topTextContent) {
        wrapText(ctx, topTextContent, canvas.width / 2, 20, canvas.width - 40, fontSize * 1.2);
      }

      // Draw Bottom Text
      ctx.textBaseline = "bottom";
      const bottomTextContent = uppercase ? bottomText.toUpperCase() : bottomText;
      if (bottomTextContent) {
        const lines = getLines(ctx, bottomTextContent, canvas.width - 40);
        const startY = canvas.height - 20 - (lines.length - 1) * fontSize * 1.2;
        ctx.textBaseline = "top";
        lines.forEach((line, index) => {
          ctx.strokeText(line, canvas.width / 2, startY + index * fontSize * 1.2);
          ctx.fillText(line, canvas.width / 2, startY + index * fontSize * 1.2);
        });
      }
    };
  }, [topText, bottomText, fontSize, textColor, strokeColor, strokeWidth, imageSrc, uppercase]);

  // Wrap text algorithm for multiple lines
  const getLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split("");
    const lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + "" + word).width;
      if (width < maxWidth) {
        currentLine += "" + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const lines = getLines(ctx, text, maxWidth);
    lines.forEach((line, index) => {
      ctx.strokeText(line, x, y + index * lineHeight);
      ctx.fillText(line, x, y + index * lineHeight);
    });
  };
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageSrc(reader.result);
        toast.success("Image uploaded successfully!");
      }
    };
    reader.readAsDataURL(file);
  };
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `meme-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Meme downloaded successfully!");
    } catch (err) {
      toast.error("Failed to export image. Try uploading a local photo.");
    }
  };
  const handleReset = () => {
    setTopText("WHEN THE CODE");
    setBottomText("COMPILES ON FIRST TRY");
    setFontSize(36);
    setTextColor("#FFFFFF");
    setStrokeColor("#000000");
    setStrokeWidth(5);
    setImageSrc(PRESET_TEMPLATES[0].url);
    setUppercase(true);
    toast.success("Settings reset");
  };
  return <div className="relative mx-auto max-w-5xl px-4 py-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Meme Generator" description="Create custom memes instantly in your browser. Upload your own image, edit texts, customize fonts, and download watermark-free memes." />

 <div className="mt-8 grid gap-8 md:grid-cols-2">
 {/* Canvas Preview Column */}
 <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl border p-6 min-h-[400px]">
 <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-md border bg-card" />
 <p className="text-xs text-muted-foreground mt-4 text-center">
 Canvas preview updates in real-time. Drag-drop not supported, adjust texts using configuration panels.
 </p>
 </div>

 {/* Configurations Column */}
 <div className="space-y-6">
 <Card>
 <CardHeader>
 <CardTitle className="text-lg flex items-center gap-2">
 <ImageIcon className="h-5 w-5 text-primary" />
 1. Select Image
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 {/* Presets */}
 <div className="space-y-2">
 <Label>Choose Template Preset</Label>
 <div className="grid grid-cols-4 gap-2">
 {PRESET_TEMPLATES.map((tpl, idx) => <Button key={idx} onClick={() => setImageSrc(tpl.url)} className={cn(cn("relative aspect-video rounded-md overflow-hidden border-2 transition", imageSrc === tpl.url ? "border-primary scale-95" : "border-transparent hover:border-muted-foreground"))}>
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img src={tpl.url} alt={tpl.name} className="w-full h-full object-cover" />
 </Button>)}
 </div>
 </div>

 {/* Upload */}
 <div className="space-y-2 pt-2">
 <Label>Or Upload Custom Photo</Label>
 <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
 <Button variant="outline" className="w-full flex gap-2" onClick={handleUploadClick}>
 <Upload className="h-4 w-4" />
 Upload Photo (JPG, PNG, WebP)
 </Button>
 </div>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle className="text-lg flex items-center gap-2">
 <Type className="h-5 w-5 text-primary" />
 2. Customize Meme Text
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 {/* Top Text */}
 <div className="space-y-2">
 <Label htmlFor="top-text-input">Top Text</Label>
 <Input id="top-text-input" value={topText} onChange={e => setTopText(e.target.value)} placeholder="TOP CAPTION" />
 </div>

 {/* Bottom Text */}
 <div className="space-y-2">
 <Label htmlFor="bottom-text-input">Bottom Text</Label>
 <Input id="bottom-text-input" value={bottomText} onChange={e => setBottomText(e.target.value)} placeholder="BOTTOM CAPTION" />
 </div>

 {/* Style controls grid */}
 <div className="grid grid-cols-2 gap-4 pt-2">
 <div className="space-y-2">
 <Label htmlFor="font-slider">Font Size: {fontSize}px</Label>
 <input type="range" id="font-slider" min="16" max="64" step="1" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>
 <div className="space-y-2">
 <Label htmlFor="stroke-slider">Border Width: {strokeWidth}px</Label>
 <input type="range" id="stroke-slider" min="0" max="10" step="1" value={strokeWidth} onChange={e => setStrokeWidth(parseInt(e.target.value))} className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>
 </div>

 <div className="grid grid-cols-3 gap-2 pt-2">
 <div>
 <Label htmlFor="text-color-input">Text Color</Label>
 <div className="flex gap-2 items-center mt-1">
 <input type="color" id="text-color-input" value={textColor} onChange={e => setTextColor(e.target.value)} className="h-8 w-12 rounded cursor-pointer border" />
 </div>
 </div>
 <div>
 <Label htmlFor="stroke-color-input">Border Color</Label>
 <div className="flex gap-2 items-center mt-1">
 <input type="color" id="stroke-color-input" value={strokeColor} onChange={e => setStrokeColor(e.target.value)} className="h-8 w-12 rounded cursor-pointer border" />
 </div>
 </div>
 <div className="flex items-end">
 <Button variant="outline" className="w-full text-xs h-9" onClick={() => setUppercase(!uppercase)}>
 {uppercase ? "Capitalized" : "Normal Case"}
 </Button>
 </div>
 </div>

 {/* Actions */}
 <div className="flex gap-2 pt-4">
 <Button className="flex-1" onClick={handleDownload}>
 <Download className="mr-2 h-4 w-4" />
 Download Meme
 </Button>
 <Button variant="outline" onClick={handleReset}>
 <RefreshCw className="mr-2 h-4 w-4" />
 Reset
 </Button>
 </div>
 </CardContent>
 </Card>
 </div>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Load a background image.",
    icon: Upload,
  },
{
    step:"02",
    title:"Add Text",
    description:"Place top and bottom captions.",
    icon: Type,
  },
{
    step:"03",
    title:"Export",
    description:"Save your meme.",
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
    description:"Any picture.",
  },
{
    icon: Type,
    title:"Captions",
    description:"Classic top and bottom.",
  },
{
    icon: Download,
    title:"Export",
    description:"Share-ready image.",
  },
{
    icon: Palette,
    title:"Styling",
    description:"Font and color options.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A meme generator adds the classic top-and-bottom caption format to any image, turning a photo into shareable humor. The format is instantly recognizable, which is what makes memes spread. This tool places your text, styles it, and exports.</p>
  <p>Styling controls keep captions legible on busy images — bold fonts and outlines against any background. Custom uploads mean the joke can attach to anything.</p>
  <p>Use it for quick social humor. The tool's value is fast, styled meme creation without design software.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Text style?",
    answer:"Bold impact font, classic look.",
  },
{
    question:"Custom image?",
    answer:"Yes, upload your own.",
  },
{
    question:"Export?",
    answer:"PNG download.",
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
          <h3>Why Use Our Meme Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Meme Generator provides
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

      <RelatedTools currentToolUrl="/tools/image/meme-generator" max={6} />

  </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
