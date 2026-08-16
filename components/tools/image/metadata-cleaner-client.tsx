"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Download, FileSearch, Image as ImageIcon, ShieldCheck, Trash2, Upload } from"lucide-react";
import toast from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Upload, Download, Trash2, Image as ImageIcon, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function MetadataCleanerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cleanedDataUrl, setCleanedDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreview(url);
    setCleanedDataUrl(null);
  };
  const cleanImage = () => {
    if (!file || !preview) return;
    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          // Drawing to canvas strips metadata, then converting to webp/png/jpeg
          const outFormat = file.type === "image/png" ? "image/png" : "image/jpeg";
          const quality = outFormat === "image/jpeg" ? 0.95 : undefined;
          const cleaned = canvas.toDataURL(outFormat, quality);
          setCleanedDataUrl(cleaned);
          toast.success("Image cleaned successfully!");
        } else {
          toast.error("Failed to process image.");
        }
      } catch (err) {
        toast.error("An error occurred while cleaning.");
      } finally {
        setIsProcessing(false);
      }
    };
    img.onerror = () => {
      toast.error("Failed to load image for processing.");
      setIsProcessing(false);
    };
    img.src = preview;
  };
  const handleDownload = () => {
    if (!cleanedDataUrl || !file) return;
    const a = document.createElement("a");
    a.href = cleanedDataUrl;
    const nameParts = file.name.split(".");
    const ext = nameParts.pop();
    const newName = nameParts.join(".") + "_cleaned." + ext;
    a.download = newName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Downloaded cleaned image!");
  };
  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setCleanedDataUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={ShieldCheck} title="Image Privacy & EXIF Cleaner" description="Remove hidden metadata, GPS coordinates, and camera info from your photos to protect your privacy." actions={<></>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Upload Image</CardTitle>
 <CardDescription>Select an image to analyze and clean.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className={cn("border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors", preview ? "border-primary/20 bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50")} onClick={() => fileInputRef.current?.click()}>
 <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg,image/png,image/webp" className="hidden" />
 {preview ? <div className="space-y-4">
 <div className="relative w-full max-w-[200px] mx-auto aspect-square bg-muted rounded-md overflow-hidden flex items-center justify-center">
 <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
 </div>
 <p className="text-sm font-medium">{file?.name}</p>
 <p className="text-xs text-muted-foreground">
 {(file?.size ? file.size / 1024 / 1024 : 0).toFixed(2)} MB
 </p>
 </div> : <div className="space-y-4 py-8">
 <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
 <Upload className="w-8 h-8" />
 </div>
 <div>
 <p className="font-medium">Click to select an image</p>
 <p className="text-sm text-muted-foreground mt-1">Supports JPEG, PNG, WebP</p>
 </div>
 </div>}
 </div>

 {file && <div className="flex gap-2">
 <Button className="flex-1" onClick={cleanImage} disabled={isProcessing || !!cleanedDataUrl}>
 <Trash2 className="w-4 h-4 mr-2" />
 {isProcessing ? "Cleaning..." : "Clean Metadata"}
 </Button>
 <Button variant="outline" onClick={handleReset}>
 Reset
 </Button>
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Cleaned Result</CardTitle>
 <CardDescription>Your privacy-safe image ready for sharing.</CardDescription>
 </CardHeader>
 <CardContent>
 {cleanedDataUrl ? <div className="space-y-6">
 <div className="bg-green-500/10 text-green-600 border border-green-500/20 rounded-lg p-4 flex items-start gap-3">
 <ShieldCheck className="w-5 h-5 mt-0.5" />
 <div>
 <h4 className="font-semibold">Image is Privacy Safe!</h4>
 <p className="text-sm mt-1">All hidden EXIF data, GPS coordinates, and camera identifying information has been completely stripped.</p>
 </div>
 </div>

 <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
 <img src={cleanedDataUrl} alt="Cleaned" className="max-w-full max-h-full object-contain" />
 </div>

 <Button size="lg" className="w-full" onClick={handleDownload}>
 <Download className="w-5 h-5 mr-2" />
 Download Cleaned Image
 </Button>
 </div> : <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-muted-foreground p-8 text-center space-y-4 border-2 border-dashed border-transparent">
 <ImageIcon className="w-12 h-12 opacity-20" />
 <p>Upload an image and click"Clean Metadata"to see the result here.</p>
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
    description:"Load photos.",
    icon: Upload,
  },
{
    step:"02",
    title:"Scan",
    description:"Detect embedded metadata.",
    icon: FileSearch,
  },
{
    step:"03",
    title:"Clean",
    description:"Strip and download.",
    icon: ShieldCheck,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Upload,
    title:"Photo Input",
    description:"From your device.",
  },
{
    icon: FileSearch,
    title:"Scan",
    description:"Find EXIF and GPS.",
  },
{
    icon: ShieldCheck,
    title:"Clean",
    description:"Remove all metadata.",
  },
{
    icon: Download,
    title:"Export",
    description:"Safe images.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An image metadata cleaner strips the hidden EXIF and GPS data embedded in photos before you share them. That data can reveal your location, device, and timing — information you may not intend to publish. This tool scans and removes it.</p>
  <p>Privacy is the point. A casual photo can expose where you were; stripping metadata closes that gap. Local processing means files never upload during cleaning.</p>
  <p>Use it on any photo before public sharing. The tool's value is effortless privacy protection baked into your workflow.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is removed?",
    answer:"EXIF, GPS, camera data.",
  },
{
    question:"Why clean?",
    answer:"Prevent location and device leaks.",
  },
{
    question:"Private?",
    answer:"Yes, local.",
  },
{
    question:"Reversible?",
    answer:"No, data is gone.",
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
          <h3>Why Use Our Image Privacy & EXIF Cleaner?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Image Privacy & EXIF Cleaner provides
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

      <RelatedTools currentToolUrl="/tools/image/metadata-cleaner" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
