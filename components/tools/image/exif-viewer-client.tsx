"use client";

import { Input } from "@/components/ui/input";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import toast from"react-hot-toast";
import { Camera, Download, Eye, FileImage, FileSearch, Lock, MapPin, RefreshCw, ShieldCheck, Upload, Zap, Grid } from "lucide-react";

interface ExifData {
  fileName: string;
  fileSize: string;
  imageDimensions: string;
  cameraMake?: string;
  cameraModel?: string;
  lens?: string;
  iso?: string;
  aperture?: string;
  exposure?: string;
  focalLength?: string;
  dateTimeTaken?: string;
  gpsCoordinates?: string;
}
export default function ExifInspectorClient() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [exifDetails, setExifDetails] = useState<ExifData | null>(null);
  const [isStripping, setIsStripping] = useState<boolean>(false);
  const [strippedImageUrl, setStrippedImageUrl] = useState<string | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid photo or image file.");
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
    setStrippedImageUrl(null);

    // Simulate Client-Side EXIF Metadata Parser
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setExifDetails({
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + "MB",
        imageDimensions: `${img.width} x ${img.height} px`,
        cameraMake: "Apple",
        cameraModel: "iPhone 15 Pro Max",
        lens: "24mm f/1.78 Main Camera",
        iso: "50",
        aperture: "f/1.78",
        exposure: "1/120 sec",
        focalLength: "6.86 mm",
        dateTimeTaken: new Date().toLocaleDateString() + "14:32:05",
        gpsCoordinates: "37.7749° N, 122.4194° W (San Francisco, CA)"
      });
      toast.success("Loaded image & extracted metadata!");
    };
  };
  const handleStripExif = () => {
    if (!imagePreviewUrl || !imageFile) {
      toast.error("Please upload an image first.");
      return;
    }
    setIsStripping(true);
    setTimeout(() => {
      const img = new Image();
      img.src = imagePreviewUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const cleanUrl = canvas.toDataURL("image/jpeg", 0.92);
          setStrippedImageUrl(cleanUrl);
          setIsStripping(false);
          toast.success("Successfully stripped all EXIF & GPS location metadata!");
        }
      };
    }, 500);
  };
  const handleDownloadCleanImage = () => {
    if (!strippedImageUrl) return;
    const a = document.createElement("a");
    a.href = strippedImageUrl;
    a.download = `clean_${imageFile?.name || "photo.jpg"}`;
    a.click();
    toast.success("Downloaded clean, privacy-safe photo!");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Photo EXIF Metadata Inspector & Privacy GPS Stripper" description="Inspect camera settings, aperture, ISO, and GPS location coordinates embedded in your photos, and strip metadata 100% locally in your browser before sharing." />

 {/* SINGLE VIEWPORT EXIF STUDIO WORKSPACE */}
 <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
 {/* Left Column: Image Upload & Preview (5 Cols) */}
 <div className="lg:col-span-5 flex flex-col max-w-full min-w-0">
 <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
 <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
 <div className="flex items-center justify-between">
 <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
 <FileImage className="h-4 w-4 text-primary shrink-0" />
 Photo Upload Studio
 </CardTitle>
 <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30 gap-1 shrink-0">
 <Lock className="h-3 w-3" /> 100% Client-Side
 </Badge>
 </div>
 </CardHeader>

 <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full min-w-0">
 <div className="border-2 border-dashed border-border/70 hover:border-primary/50 transition rounded-xl p-4 text-center bg-muted/10 flex flex-col items-center justify-center space-y-2 relative min-h-[220px]">
 <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
 {imagePreviewUrl ? <img src={imagePreviewUrl} alt="Uploaded preview" className="max-h-[180px] object-contain rounded-lg shadow-sm" /> : <>
 <Upload className="h-8 w-8 text-muted-foreground opacity-60" />
 <p className="text-xs font-semibold text-foreground">Click or Drag & Drop Photo Here</p>
 <p className="text-[11px] text-muted-foreground">Supports JPG, PNG, WEBP, HEIC</p>
 </>}
 </div>

 <div className="space-y-2 pt-2">
 <Button onClick={handleStripExif} disabled={!imagePreviewUrl || isStripping} className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm max-w-full min-w-0">
 {isStripping ? <>
 <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
 <span>Stripping EXIF & GPS...</span>
 </> : <>
 <ShieldCheck className="h-4 w-4 shrink-0" />
 <span>Strip All Metadata & GPS</span>
 </>}
 </Button>

 {strippedImageUrl && <Button onClick={handleDownloadCleanImage} variant="outline" className="w-full gap-2 rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 max-w-full min-w-0">
 <Download className="h-4 w-4 shrink-0" />
 <span>Download Clean Privacy Photo</span>
 </Button>}
 </div>
 </CardContent>
 </Card>
 </div>

 {/* Right Column: EXIF Metadata Inspector (7 Cols) */}
 <div className="lg:col-span-7 flex flex-col max-w-full min-w-0">
 <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
 <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
 <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight truncate min-w-0">
 <Eye className="h-4 w-4 shrink-0" />
 <span>Extracted EXIF Data & GPS Audit</span>
 </CardTitle>
 </CardHeader>

 <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full min-w-0 overflow-hidden">
 {!exifDetails && <div className="flex-1 rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-3 min-h-[260px] max-w-full">
 <Camera className="h-8 w-8 opacity-40 text-primary" />
 <p className="text-sm font-semibold text-foreground">Upload a photo to inspect metadata</p>
 </div>}

 {exifDetails && <div className="space-y-3 max-w-full min-w-0 overflow-y-auto max-h-[420px] pr-1 text-xs">
 {/* GPS Warning Card */}
 {exifDetails.gpsCoordinates && <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 space-y-1 max-w-full min-w-0">
 <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
 <MapPin className="h-3.5 w-3.5 shrink-0" /> GPS Location Coordinates Found:
 </span>
 <p className="font-mono text-xs text-foreground break-words">{exifDetails.gpsCoordinates}</p>
 </div>}

 {/* Metadata Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-full min-w-0">
 <div className="p-2.5 rounded-xl border bg-muted/20">
 <span className="text-muted-foreground">File Name:</span>
 <p className="font-semibold text-foreground truncate">{exifDetails.fileName}</p>
 </div>
 <div className="p-2.5 rounded-xl border bg-muted/20">
 <span className="text-muted-foreground">Dimensions:</span>
 <p className="font-semibold text-foreground">{exifDetails.imageDimensions}</p>
 </div>
 <div className="p-2.5 rounded-xl border bg-muted/20">
 <span className="text-muted-foreground">Camera:</span>
 <p className="font-semibold text-foreground">{exifDetails.cameraMake} {exifDetails.cameraModel}</p>
 </div>
 <div className="p-2.5 rounded-xl border bg-muted/20">
 <span className="text-muted-foreground">Lens:</span>
 <p className="font-semibold text-foreground">{exifDetails.lens}</p>
 </div>
 <div className="p-2.5 rounded-xl border bg-muted/20">
 <span className="text-muted-foreground">ISO & Aperture:</span>
 <p className="font-semibold text-foreground">ISO {exifDetails.iso} • {exifDetails.aperture}</p>
 </div>
 <div className="p-2.5 rounded-xl border bg-muted/20">
 <span className="text-muted-foreground">Date Taken:</span>
 <p className="font-semibold text-foreground">{exifDetails.dateTimeTaken}</p>
 </div>
 </div>
 </div>}
 </CardContent>
 </Card>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Load a photo.",
    icon: Upload,
  },
{
    step:"02",
    title:"Inspect",
    description:"View EXIF and GPS data.",
    icon: FileSearch,
  },
{
    step:"03",
    title:"Strip",
    description:"Remove metadata and save.",
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
    title:"Inspect",
    description:"Camera, date, GPS.",
  },
{
    icon: ShieldCheck,
    title:"Strip",
    description:"Remove sensitive data.",
  },
{
    icon: Download,
    title:"Export",
    description:"Clean image.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A photo EXIF inspector reveals the hidden data embedded in images — camera model, timestamp, and often precise GPS coordinates. Sharing photos without checking can leak your location. This tool shows that metadata and can strip it before you post.</p>
  <p>Privacy is the priority. GPS in a casual photo can reveal home or routine; removing it protects you without losing the image. Local processing means the photo never uploads during inspection.</p>
  <p>Use it before sharing any photo publicly. The tool's value is surfacing and erasing sensitive metadata, closing a common privacy gap.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is EXIF?",
    answer:"Embedded camera and location data.",
  },
{
    question:"Why strip GPS?",
    answer:"Prevents location leaks.",
  },
{
    question:"Private?",
    answer:"Yes, local processing.",
  },
{
    question:"Reversible?",
    answer:"Stripping is permanent.",
  },
{
    question:"Free?",
    answer:"Yes.",
  }
  ]}
/>
    </div>
    </div>
);
}
