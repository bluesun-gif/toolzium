"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useRef, useEffect, ChangeEvent } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import InputField from"@/components/shared/form-fields/input-field";
import TextareaField from"@/components/shared/form-fields/textarea-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import Stat from"@/components/shared/stat";
import { ResetButton, ActionButton, CopyButton } from"@/components/shared/action-buttons";
import { Button } from"@/components/ui/button";
import { Copy, Download, FileCode, Image, Image as ImageIcon, Ruler, Upload } from"lucide-react";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InputField from "@/components/shared/form-fields/input-field";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import Stat from "@/components/shared/stat";
import { ResetButton, ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { Button } from "@/components/ui/button";
import { FileCode, Upload, Download, Copy, Image as ImageIcon, Sparkles, Shield, Zap } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export default function SvgToPngClient() {
  const [svgInput, setSvgInput] = useState<string>("");
  const [scale, setScale] = useState<number>(2);
  const [width, setWidth] = useState<number>(512);
  const [height, setHeight] = useState<number>(512);
  const [useCustomSize, setUseCustomSize] = useState<boolean>(false);
  const [transparentBg, setTransparentBg] = useState<boolean>(true);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) setSvgInput(content);
    };
    reader.readAsText(file);
  };
  useEffect(() => {
    if (!svgInput.trim()) {
      setPngDataUrl(null);
      return;
    }
    setIsProcessing(true);
    const timer = setTimeout(() => {
      renderSvgToCanvas();
    }, 150);
    return () => clearTimeout(timer);
  }, [svgInput, scale, width, height, useCustomSize, transparentBg, bgColor]);
  const renderSvgToCanvas = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgInput, "image/svg+xml");
      const svgEl = doc.querySelector("svg");
      if (!svgEl) {
        setPngDataUrl(null);
        setIsProcessing(false);
        return;
      }
      let nativeW = parseFloat(svgEl.getAttribute("width") || "0");
      let nativeH = parseFloat(svgEl.getAttribute("height") || "0");
      if (!nativeW || !nativeH) {
        const viewBox = svgEl.getAttribute("viewBox");
        if (viewBox) {
          const parts = viewBox.split(/[\s,]+/).map(parseFloat);
          if (parts.length === 4) {
            nativeW = parts[2];
            nativeH = parts[3];
          }
        }
      }
      const baseW = useCustomSize ? width : nativeW || 512;
      const baseH = useCustomSize ? height : nativeH || 512;
      const finalW = Math.max(1, Math.round(baseW * scale));
      const finalH = Math.max(1, Math.round(baseH * scale));
      const svgBlob = new Blob([svgInput], {
        type: "image/svg+xml;charset=utf-8"
      });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = finalW;
        canvas.height = finalH;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          if (!transparentBg) {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, finalW, finalH);
          }
          ctx.drawImage(img, 0, 0, finalW, finalH);
          setPngDataUrl(canvas.toDataURL("image/png"));
        }
        URL.revokeObjectURL(url);
        setIsProcessing(false);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        setPngDataUrl(null);
        setIsProcessing(false);
      };
      img.src = url;
    } catch {
      setPngDataUrl(null);
      setIsProcessing(false);
    }
  };
  const handleDownload = () => {
    if (!pngDataUrl) return;
    const a = document.createElement("a");
    a.href = pngDataUrl;
    a.download = "vector_image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleReset = () => {
    setSvgInput("");
    setPngDataUrl(null);
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="SVG to PNG Converter" description="Convert SVG code or SVG files to high-resolution PNG images. Export sharp vector graphics at 1x, 2x, 4x, or 8x HD quality with custom transparent background." icon={FileCode} />

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 {/* Left: Input & Options */}
 <div className="lg:col-span-6 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>SVG Source</CardTitle>
 <CardDescription>Upload an SVG file or paste raw SVG code</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <input type="file" ref={fileInputRef} accept=".svg,image/svg+xml" className="hidden" onChange={handleFileChange} />
 <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"}`} onDragOver={e => {
                e.preventDefault();
                setIsDragging(true);
              }} onDragLeave={() => setIsDragging(false)} onDrop={e => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = evt => {
                    if (evt.target?.result) setSvgInput(evt.target.result as string);
                  };
                  reader.readAsText(file);
                }
              }} onClick={() => fileInputRef.current?.click()}>
 <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
 <p className="text-sm font-medium">Click to upload .SVG file</p>
 <p className="text-xs text-muted-foreground">or drag and drop here</p>
 </div>

 <TextareaField label="Raw SVG Markup" value={svgInput} onChange={e => setSvgInput(e.target.value)} placeholder='<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 100 100">...</svg>' rows={6} />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Export Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <label className="text-sm font-medium">Resolution Multiplier</label>
 <div className="grid grid-cols-4 gap-2">
 {[1, 2, 4, 8].map(s => <Button key={s} type="button" variant={scale === s ? "default" : "outline"} size="sm" onClick={() => setScale(s)}>
 {s}x {s === 8 ? "Ultra HD" : s === 4 ? "HD" : ""}
 </Button>)}
 </div>
 </div>

 <SwitchRow label="Custom Dimensions" hint="Override native SVG width & height" checked={useCustomSize} onCheckedChange={setUseCustomSize} />

 {useCustomSize && <div className="grid grid-cols-2 gap-4">
 <InputField label="Width (px)" type="number" value={width.toString()} onChange={e => setWidth(Number(e.target.value) || 0)} />
 <InputField label="Height (px)" type="number" value={height.toString()} onChange={e => setHeight(Number(e.target.value) || 0)} />
 </div>}

 <SwitchRow label="Transparent Background" hint="Keep vector transparency or choose background color" checked={transparentBg} onCheckedChange={setTransparentBg} />

 {!transparentBg && <div className="space-y-2">
 <label className="text-sm font-medium">Background Color</label>
 <div className="flex gap-3 items-center">
 <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="h-10 w-14 rounded-md border border-input cursor-pointer bg-background" />
 <InputField value={bgColor} onChange={e => setBgColor(e.target.value)} placeholder="#ffffff" />
 </div>
 </div>}

 <div className="flex gap-3 pt-2">
 <ResetButton onClick={handleReset} />
 </div>
 </CardContent>
 </GlassCard>
 </div>

 {/* Right: PNG Render & Download */}
 <div className="lg:col-span-6 space-y-6">
 <GlassCard className="h-full flex flex-col">
 <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
 <div>
 <CardTitle>PNG Output</CardTitle>
 <CardDescription>High-resolution raster export</CardDescription>
 </div>
 {pngDataUrl && <div className="flex gap-2">
 <CopyButton getText={pngDataUrl} label="Copy Data URL" />
 <ActionButton icon={Download} label="Download PNG" onClick={handleDownload} variant="default" />
 </div>}
 </CardHeader>
 <CardContent className="flex-1 flex flex-col items-center justify-center p-6 min-h-[400px]">
 {!pngDataUrl ? <div className="text-center text-muted-foreground space-y-2">
 <ImageIcon className="h-12 w-12 mx-auto opacity-30" />
 <p className="text-sm font-medium">
 {isProcessing ? "Rendering PNG..." : "Upload or paste SVG code to see preview"}
 </p>
 </div> : <div className="space-y-4 w-full text-center">
 <div className="p-6 rounded-xl border flex items-center justify-center max-h-[450px] overflow-auto shadow-inner" style={{
                  backgroundImage: transparentBg ? "radial-gradient(#ccc 1px, transparent 1px)" : "none",
                  backgroundColor: transparentBg ? "transparent" : bgColor,
                  backgroundSize: "16px 16px"
                }}>
 <img src={pngDataUrl} alt="Rendered PNG" className="max-w-full max-h-[400px] object-contain shadow-md rounded-md" />
 </div>
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
    description:"Load an SVG file.",
    icon: Upload,
  },
{
    step:"02",
    title:"Set Size",
    description:"Choose export dimensions.",
    icon: Ruler,
  },
{
    step:"03",
    title:"Convert",
    description:"Render and download PNG.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Upload,
    title:"SVG Input",
    description:"Vector file.",
  },
{
    icon: Ruler,
    title:"Dimensions",
    description:"Any export size.",
  },
{
    icon: Download,
    title:"Export",
    description:"Raster PNG.",
  },
{
    icon: Image,
    title:"Quality",
    description:"Crisp at scale.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An SVG to PNG converter rasterizes vector graphics into widely compatible PNGs. SVGs are great for the web but some contexts — older editors, certain prints — need raster formats. This tool renders the vector at your chosen size and exports.</p>
  <p>Rendering at scale keeps edges crisp; unlike upscaling a low-res photo, vector conversion stays sharp. Setting dimensions controls the output resolution.</p>
  <p>Use it when a PNG is required. The tool's value is clean, sized raster output from any SVG.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why convert?",
    answer:"PNG works where SVG does not.",
  },
{
    question:"Quality?",
    answer:"Renders sharp at chosen size.",
  },
{
    question:"Size?",
    answer:"Set any dimensions.",
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
          <h3>Why Use Our SVG to PNG Converter?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our SVG to PNG Converter provides
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

      <RelatedTools currentToolUrl="/tools/image/svg-to-png" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
