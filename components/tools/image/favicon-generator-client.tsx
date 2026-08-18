"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useRef, ChangeEvent } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import TextareaField from"@/components/shared/form-fields/textarea-field";
import { ResetButton, ActionButton, CopyButton } from"@/components/shared/action-buttons";
import { Button } from"@/components/ui/button";
import { Code2, Copy, Download, Image, Image as ImageIcon, Layers, Smartphone, Upload, Grid } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import JSZip from"jszip";

interface IconSize {
  name: string;
  filename: string;
  size: number;
  dataUrl: string | null;
}
const ICON_SPECS = [{
  name: "Standard Favicon (16x16)",
  filename: "favicon-16x16.png",
  size: 16
}, {
  name: "Standard Favicon (32x32)",
  filename: "favicon-32x32.png",
  size: 32
}, {
  name: "High-DPI Favicon (48x48)",
  filename: "favicon-48x48.png",
  size: 48
}, {
  name: "Apple Touch Icon (180x180)",
  filename: "apple-touch-icon.png",
  size: 180
}, {
  name: "Android Chrome (192x192)",
  filename: "android-chrome-192x192.png",
  size: 192
}, {
  name: "Android Chrome (512x512)",
  filename: "android-chrome-512x512.png",
  size: 512
}];
export default function FaviconGeneratorClient() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [icons, setIcons] = useState<IconSize[]>(ICON_SPECS.map(spec => ({
    ...spec,
    dataUrl: null
  })));
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSourceImage(url);
    generateFavicons(url);
  };
  const generateFavicons = (srcUrl: string) => {
    setIsProcessing(true);
    const img = new (window as any).Image();
    img.onload = () => {
      const generated = ICON_SPECS.map(spec => {
        const canvas = document.createElement("canvas");
        canvas.width = spec.size;
        canvas.height = spec.size;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, spec.size, spec.size);
          return {
            ...spec,
            dataUrl: canvas.toDataURL("image/png")
          };
        }
        return {
          ...spec,
          dataUrl: null
        };
      });
      setIcons(generated);
      setIsProcessing(false);
    };
    img.src = srcUrl;
  };
  const handleDownloadZip = async () => {
    const zip = new JSZip();
    icons.forEach(icon => {
      if (icon.dataUrl) {
        const base64Data = icon.dataUrl.replace(/^data:image\/png;base64,/, "");
        zip.file(icon.filename, base64Data, {
          base64: true
        });
      }
    });
    const htmlCode = htmlHeadSnippet;
    zip.file("head_tags.html", htmlCode);
    const zipBlob = await zip.generateAsync({
      type: "blob"
    });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicon_pack.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleReset = () => {
    if (sourceImage) URL.revokeObjectURL(sourceImage);
    setSourceImage(null);
    setIcons(ICON_SPECS.map(spec => ({
      ...spec,
      dataUrl: null
    })));
  };
  const htmlHeadSnippet = `<!-- Favicon HTML Tags -->
<link rel="icon"type="image/png"sizes="16x16"href="/favicon-16x16.png">
<link rel="icon"type="image/png"sizes="32x32"href="/favicon-32x32.png">
<link rel="icon"type="image/png"sizes="48x48"href="/favicon-48x48.png">
<link rel="apple-touch-icon"sizes="180x180"href="/apple-touch-icon.png">
<link rel="icon"type="image/png"sizes="192x192"href="/android-chrome-192x192.png">
<link rel="icon"type="image/png"sizes="512x512"href="/android-chrome-512x512.png">`;
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Favicon & App Icon Generator" description="Convert your logo or image into website favicons, Apple Touch icons, and Android PWA icons. Download complete icon zip packages with ready-to-paste HTML code." icon={Layers} />

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 {/* Left Column: Upload & Options */}
 <div className="lg:col-span-5 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Source Image</CardTitle>
 <CardDescription>Upload a square PNG, JPG, or WEBP logo (at least 512x512 recommended)</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileChange} />
 {!sourceImage ? <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer border-border hover:bg-muted/50 transition-colors" onClick={() => fileInputRef.current?.click()}>
 <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
 <p className="text-sm font-medium mb-1">Click to upload logo image</p>
 <p className="text-xs text-muted-foreground">PNG, JPG, SVG, WEBP supported</p>
 </div> : <div className="space-y-4 text-center">
 <div className="p-4 border rounded-xl bg-muted/20 inline-block">
 <img src={sourceImage} alt="Source logo" className="h-32 w-32 object-contain mx-auto rounded-lg shadow-sm" />
 </div>
 <div className="flex gap-2 justify-center">
 <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
 Replace Image
 </Button>
 <ResetButton onClick={handleReset} />
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 {sourceImage && <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <CardTitle className="flex items-center gap-2">
 <Code2 className="h-5 w-5" /> HTML Head Snippet
 </CardTitle>
 <CopyButton getText={htmlHeadSnippet} />
 </CardHeader>
 <CardContent>
 <TextareaField value={htmlHeadSnippet} readOnly rows={7} className="font-mono text-xs" />
 </CardContent>
 </GlassCard>}
 </div>

 {/* Right Column: Generated Icons Grid */}
 <div className="lg:col-span-7 space-y-6">
 <GlassCard className="min-h-[400px]">
 <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
 <div>
 <CardTitle>Generated Favicon Package</CardTitle>
 <CardDescription>Multi-size icons for browser tabs, bookmarks, and mobile apps</CardDescription>
 </div>
 {icons.some(i => i.dataUrl) && <ActionButton icon={Download} label="Download All ZIP" onClick={handleDownloadZip} variant="default" />}
 </CardHeader>
 <CardContent className="pt-6">
 {!sourceImage ? <div className="flex flex-col items-center justify-center min-h-[300px] text-center text-muted-foreground">
 <ImageIcon className="h-12 w-12 mb-3 opacity-30" />
 <p className="text-sm font-medium">Upload a logo to generate your favicon package</p>
 </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {icons.map(icon => <div key={icon.filename} className="p-4 border rounded-xl bg-muted/20 flex items-center justify-between gap-4">
 <div className="flex items-center gap-3">
 {icon.dataUrl ? <img src={icon.dataUrl} alt={icon.name} className="h-10 w-10 object-contain p-1 border rounded bg-background shrink-0" /> : <div className="h-10 w-10 border rounded bg-muted animate-pulse shrink-0" />}
 <div>
 <p className="text-sm font-semibold">{icon.name}</p>
 <p className="text-xs text-muted-foreground font-mono">{icon.filename}</p>
 </div>
 </div>

 {icon.dataUrl && <a href={icon.dataUrl} download={icon.filename} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-muted text-foreground transition-colors" title={`Download ${icon.filename}`}>
 <Download className="h-4 w-4" />
 </a>}
 </div>)}
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Load a logo or image.",
    icon: Upload,
  },
{
    step:"02",
    title:"Generate",
    description:"Build all icon variants.",
    icon: Image,
  },
{
    step:"03",
    title:"Download",
    description:"Export the set.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Upload,
    title:"Source",
    description:"Logo or picture.",
  },
{
    icon: Image,
    title:"Variants",
    description:"Favicon and app icons.",
  },
{
    icon: Download,
    title:"Export",
    description:"Ready package.",
  },
{
    icon: Smartphone,
    title:"App Ready",
    description:"Mobile icon sizes.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A favicon and app icon generator produces the complete icon family a modern product needs — browser tabs, bookmarks, and home-screen app icons across devices. Manually creating each size is error-prone; this tool generates them from one source.</p>
  <p>Covering both web and mobile ensures consistent branding everywhere the product appears. The exported package drops straight into a project.</p>
  <p>Use it to brand a site or app uniformly. The tool's value is a full, correctly sized icon set from a single upload.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/image/favicon-generator" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"Favicon vs app?",
    answer:"Different sizes for each use.",
  },
{
    question:"Sizes?",
    answer:"Covers web and mobile.",
  },
{
    question:"Format?",
    answer:"ICO and PNG.",
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
    </div>
);
}
