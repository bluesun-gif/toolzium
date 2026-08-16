"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useRef, useEffect, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Code, Copy, Download, Image as ImageIcon, SlidersHorizontal, Terminal, Upload } from"lucide-react";
import toast from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useRef, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Code, Upload, Download, Image as ImageIcon, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
const PALETTES = {
  Standard: "@%#*+=-:.",
  Minimal: "@#.=",
  Detailed: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'."
};
type ColorMode = "monochrome" | "color";
type PaletteType = "Standard" | "Minimal" | "Detailed" | "Custom";
interface AsciiChar {
  char: string;
  color: string;
}
export function ImageAsciiClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [widthChars, setWidthChars] = useState(80);
  const [paletteType, setPaletteType] = useState<PaletteType>("Standard");
  const [customPalette, setCustomPalette] = useState("@%#*+=-:.");
  const [invert, setInvert] = useState(false);
  const [colorMode, setColorMode] = useState<ColorMode>("monochrome");
  const [asciiResult, setAsciiResult] = useState<AsciiChar[][] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = event => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const getActivePalette = () => {
    if (paletteType === "Custom") return customPalette;
    return PALETTES[paletteType as keyof typeof PALETTES];
  };
  const generateAscii = useCallback(() => {
    if (!imageSrc || !canvasRef.current) return;
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const charsPerLine = Math.min(Math.max(widthChars, 10), 300);
      const ratio = img.height / img.width;
      // Characters are usually roughly twice as tall as they are wide in monospace fonts
      const fontRatio = 0.5;
      const heightChars = Math.floor(charsPerLine * ratio * fontRatio);
      canvas.width = charsPerLine;
      canvas.height = heightChars;
      ctx.drawImage(img, 0, 0, charsPerLine, heightChars);
      const imageData = ctx.getImageData(0, 0, charsPerLine, heightChars);
      const pixels = imageData.data;
      const palette = getActivePalette();
      const pLen = palette.length;
      if (pLen === 0) {
        toast.error("Palette cannot be empty");
        setIsProcessing(false);
        return;
      }
      const asciiMap: AsciiChar[][] = [];
      for (let y = 0; y < heightChars; y++) {
        const row: AsciiChar[] = [];
        for (let x = 0; x < charsPerLine; x++) {
          const offset = (y * charsPerLine + x) * 4;
          const r = pixels[offset];
          const g = pixels[offset + 1];
          const b = pixels[offset + 2];
          const a = pixels[offset + 3];

          // Calculate brightness (0-255)
          // Using standard luminance formula
          let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

          // Handle transparency (treat as white/background)
          if (a < 255) {
            brightness = brightness * (a / 255) + 255 * (1 - a / 255);
          }
          if (invert) {
            brightness = 255 - brightness;
          }

          // Map brightness to character index
          const charIdx = Math.floor(brightness / 255 * (pLen - 1));
          row.push({
            char: palette[charIdx],
            color: colorMode === "color" ? "rgb(" + r + "," + g + "," + b + ")" : "inherit"
          });
        }
        asciiMap.push(row);
      }
      setAsciiResult(asciiMap);
      setIsProcessing(false);
    };
    img.src = imageSrc;
  }, [imageSrc, widthChars, paletteType, customPalette, invert, colorMode]);
  useEffect(() => {
    if (imageSrc) {
      const timeoutId = setTimeout(() => {
        generateAscii();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [generateAscii, imageSrc]);
  const getPlainTextAscii = () => {
    if (!asciiResult) return "";
    return asciiResult.map(row => row.map(cell => cell.char).join("")).join("\n");
  };
  const getHtmlAscii = () => {
    if (!asciiResult) return "";
    const htmlLines = asciiResult.map(row => {
      const lineChars = row.map(cell => {
        if (colorMode === "color") {
          return "<span style='color:" + cell.color + "'>" + (cell.char === "" ? "&nbsp;" : cell.char) + "</span>";
        }
        return cell.char === "" ? "&nbsp;" : cell.char;
      });
      return lineChars.join("");
    });
    return "<pre style='font-family: monospace; font-size: 10px; line-height: 10px; background: #000; color: #fff; padding: 10px;'>" + htmlLines.join("<br/>") + "</pre>";
  };
  const downloadHtml = () => {
    if (!asciiResult) return;
    const html = getHtmlAscii();
    const fullHtml = "<!DOCTYPE html><html><head><title>ASCII Art</title></head><body style='background:#000; display:flex; justify-content:center; padding:20px;'>" + html + "</body></html>";
    const blob = new Blob([fullHtml], {
      type: "text/html"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-art.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("HTML downloaded");
  };
  const downloadText = () => {
    if (!asciiResult) return;
    const text = getPlainTextAscii();
    const blob = new Blob([text], {
      type: "text/plain"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-art.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Text downloaded");
  };
  const handleReset = () => {
    setImageSrc(null);
    setAsciiResult(null);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Code} title="Image to ASCII Art Generator" description="Convert your images into text-based ASCII art." actions={<>
 {asciiResult && <>
 <ActionButton onClick={downloadText} icon={Download} label="TXT" />
 {colorMode === "color" && <ActionButton onClick={downloadHtml} icon={Download} label="HTML" />}
 <CopyButton getText={getPlainTextAscii} label="Copy Text" />
 </>}
 <ResetButton onClick={handleReset} />
 </>} />

 <canvas ref={canvasRef} className="hidden" />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 {!imageSrc ? <div className="space-y-2">
 <Label>Upload Image</Label>
 <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer relative">
 <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
 <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
 <p className="text-sm font-medium">Click or drag image here</p>
 </div>
 </div> : <div className="space-y-2">
 <Label>Current Image</Label>
 <div className="relative rounded-lg overflow-hidden border">
 <img src={imageSrc} alt="Preview" className="w-full h-32 object-cover" />
 <Button size="sm" variant="destructive" className="absolute top-2 right-2 h-8" onClick={() => setImageSrc(null)}>
 Remove
 </Button>
 </div>
 </div>}

 <Separator />

 <div className="space-y-4">
 <div className="space-y-2">
 <Label>Width (Characters)</Label>
 <div className="flex gap-4 items-center">
 <Input type="range" min="10" max="200" value={widthChars} onChange={e => setWidthChars(parseInt(e.target.value))} className="flex-1" />
 <span className="text-sm font-mono w-12 text-right">{widthChars}</span>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Character Palette</Label>
 <Select value={paletteType} onValueChange={(v: PaletteType) => setPaletteType(v)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="Standard">Standard</SelectItem>
 <SelectItem value="Minimal">Minimal</SelectItem>
 <SelectItem value="Detailed">Detailed</SelectItem>
 <SelectItem value="Custom">Custom</SelectItem>
 </SelectContent>
 </Select>
 </div>

 {paletteType === "Custom" && <div className="space-y-2">
 <Label>Custom Characters (Dark to Light)</Label>
 <Input value={customPalette} onChange={e => setCustomPalette(e.target.value)} placeholder="e.g. @#%*+=-:." className="font-mono" />
 </div>}

 <div className="flex items-center justify-between">
 <Label htmlFor="invert-toggle" className="cursor-pointer">Invert Brightness</Label>
 <Switch id="invert-toggle" checked={invert} onCheckedChange={setInvert} />
 </div>

 <div className="flex items-center justify-between">
 <Label htmlFor="color-toggle" className="cursor-pointer">Color Mode (HTML)</Label>
 <Switch id="color-toggle" checked={colorMode === "color"} onCheckedChange={c => setColorMode(c ? "color" : "monochrome")} />
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="lg:col-span-2">
 <GlassCard className="h-full flex flex-col">
 <CardHeader className="pb-3 flex-row items-center justify-between">
 <CardTitle>Result</CardTitle>
 {isProcessing && <span className="text-xs text-muted-foreground animate-pulse">Processing...</span>}
 </CardHeader>
 <CardContent className="flex-1 min-h-[400px]">
 {asciiResult ? <div className="w-full h-full overflow-auto bg-black rounded-lg border p-4 custom-scrollbar">
 <pre className="font-mono whitespace-pre text-[8px] leading-[8px] sm:text-[10px] sm:leading-[10px] select-all w-max" style={{
                  color: colorMode === "monochrome" ? "#fff" : undefined
                }}>
 {asciiResult.map((row, rIdx) => <div key={rIdx} className="flex">
 {row.map((cell, cIdx) => <span key={cIdx} style={{
                      color: colorMode === "color" ? cell.color : "inherit"
                    }}>
 {cell.char}
 </span>)}
 </div>)}
 </pre>
 </div> : <div className="w-full h-full min-h-[400px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground/50">
 <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
 <p>Upload an image to see ASCII art here</p>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Load an image.",
    icon: Upload,
  },
{
    step:"02",
    title:"Convert",
    description:"Map pixels to characters.",
    icon: Terminal,
  },
{
    step:"03",
    title:"Copy",
    description:"Grab the ASCII art.",
    icon: Copy,
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
    icon: Terminal,
    title:"ASCII",
    description:"Text-based rendering.",
  },
{
    icon: Copy,
    title:"Copy",
    description:"Plain text output.",
  },
{
    icon: SlidersHorizontal,
    title:"Tunable",
    description:"Density and chars.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An image to ASCII generator converts a picture into text characters, where darker pixels become denser symbols. The result is shareable as plain text — perfect for terminals, code comments, or novel posts. This tool maps pixels to a character ramp.</p>
  <p>Tunable density controls fidelity. A finer charset yields recognizable detail; a sparse one gives a sketchy look. Adjusting lets you match the aesthetic you want.</p>
  <p>Use it for creative text-based art. The tool's value is turning any image into portable, copy-paste ASCII in seconds.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is ASCII art?",
    answer:"Image rendered in text characters.",
  },
{
    question:"Use case?",
    answer:"Fun, terminals, comments.",
  },
{
    question:"Adjustable?",
    answer:"Yes, detail and charset.",
  },
{
    question:"Private?",
    answer:"Local processing.",
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
          <h3>Why Use Our Image to ASCII Art Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Image to ASCII Art Generator provides
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

      <RelatedTools currentToolUrl="/tools/image/image-ascii" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
