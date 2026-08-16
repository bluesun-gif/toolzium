"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useRef, ChangeEvent } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Switch } from"@/components/ui/switch";
import { Slider } from"@/components/ui/slider";
import toast from"react-hot-toast";
import { ArrowDown, ArrowUp, Download, FileText, ShieldCheck, Trash2, Upload } from"lucide-react";
import jsPDF from"jspdf";

interface PdfImage {
  id: string;
  file: File;
  url: string;
  name: string;
}
export default function ImageToPdfClient() {
  const [images, setImages] = useState<PdfImage[]>([]);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [margin, setMargin] = useState(10);
  const [fitToPage, setFitToPage] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(7),
        file,
        url: URL.createObjectURL(file),
        name: file.name
      }));
      setImages(prev => [...prev, ...newFiles]);
    }
  };
  const moveImage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0 || direction === 'down' && index === images.length - 1) return;
    const newImages = [...images];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
    setImages(newImages);
  };
  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };
  const generatePDF = async () => {
    if (images.length === 0) {
      toast.error("Please add at least one image.");
      return;
    }
    try {
      const doc = new jsPDF({
        orientation,
        unit: 'mm',
        format: pageSize
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;
      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage();
        const img = new Image();
        img.src = images[i].url;
        await new Promise(resolve => {
          img.onload = resolve;
        });
        let finalWidth = img.width;
        let finalHeight = img.height;
        let x = margin;
        let y = margin;
        if (fitToPage) {
          const ratio = Math.min(contentWidth / img.width, contentHeight / img.height);
          finalWidth = img.width * ratio;
          finalHeight = img.height * ratio;
          x = margin + (contentWidth - finalWidth) / 2;
          y = margin + (contentHeight - finalHeight) / 2;
        } else {
          // Convert pixels to mm roughly
          finalWidth = img.width * 0.264583;
          finalHeight = img.height * 0.264583;
          if (finalWidth > contentWidth) finalWidth = contentWidth;
          if (finalHeight > contentHeight) finalHeight = contentHeight;
        }
        doc.addImage(images[i].url, 'JPEG', x, y, finalWidth, finalHeight);
      }
      doc.save("generated-document.pdf");
      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF.");
    }
  };
  return <div className="relative mx-auto max-w-5xl px-4 py-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Image to PDF Converter" description="Convert multiple images into a single PDF document securely in your browser." />
 <div className="mt-8 grid gap-8 md:grid-cols-2">
 <Card className="dark:bg-zinc-900/30">
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-8 text-center cursor-pointer hover:border-zinc-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
 <Upload className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
 <p className="text-zinc-600 dark:text-zinc-400">
 Click or drag & drop images here
 </p>
 <Input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Page Size</Label>
 <Select value={pageSize} onValueChange={setPageSize}>
 <SelectTrigger>
 <SelectValue placeholder="Select size" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="a4">A4</SelectItem>
 <SelectItem value="letter">Letter</SelectItem>
 <SelectItem value="legal">Legal</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Orientation</Label>
 <Select value={orientation} onValueChange={(val: any) => setOrientation(val)}>
 <SelectTrigger>
 <SelectValue placeholder="Select orientation" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="portrait">Portrait</SelectItem>
 <SelectItem value="landscape">Landscape</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-4">
 <div className="flex justify-between">
 <Label>Margin: {margin}mm</Label>
 </div>
 <Slider value={[margin]} onValueChange={val => setMargin(val[0])} max={50} min={0} step={1} />
 </div>

 <div className="flex items-center space-x-2">
 <Switch id="fit-page" checked={fitToPage} onCheckedChange={setFitToPage} />
 <Label htmlFor="fit-page">Fit image to page</Label>
 </div>

 <Button onClick={generatePDF} className="w-full" disabled={images.length === 0}>
 Generate PDF
 </Button>
 </CardContent>
 </Card>

 <Card className="dark:bg-zinc-900/30">
 <CardHeader>
 <CardTitle>Images ({images.length})</CardTitle>
 </CardHeader>
 <CardContent>
 {images.length === 0 ? <div className="text-center text-zinc-500 py-8">No images uploaded yet.</div> : <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
 {images.map((img, index) => <div key={img.id} className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border dark:border-zinc-700 flex items-center justify-between">
 <div className="flex items-center gap-3 overflow-hidden">
 <img src={img.url} alt={img.name} className="h-12 w-12 object-cover rounded" />
 <p className="font-medium text-sm truncate w-32 md:w-48">{img.name}</p>
 </div>
 <div className="flex items-center gap-1">
 <Button variant="ghost" size="icon" onClick={() => moveImage(index, 'up')} disabled={index === 0}>
 <ArrowUp className="h-4 w-4" />
 </Button>
 <Button variant="ghost" size="icon" onClick={() => moveImage(index, 'down')} disabled={index === images.length - 1}>
 <ArrowDown className="h-4 w-4" />
 </Button>
 <Button variant="ghost" size="icon" onClick={() => removeImage(img.id)}>
 <Trash2 className="h-4 w-4 text-red-500" />
 </Button>
 </div>
 </div>)}
 </div>}
 </CardContent>
 </Card>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Add one or more images.",
    icon: Upload,
  },
{
    step:"02",
    title:"Arrange",
    description:"Order and set page size.",
    icon: FileText,
  },
{
    step:"03",
    title:"Convert",
    description:"Build and download PDF.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Upload,
    title:"Multi Image",
    description:"Combine several.",
  },
{
    icon: FileText,
    title:"Page Options",
    description:"Size and order.",
  },
{
    icon: Download,
    title:"Export",
    description:"Single PDF.",
  },
{
    icon: ShieldCheck,
    title:"Privacy",
    description:"Local conversion.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An image to PDF converter assembles photos or scans into a single portable document — ideal for submitting receipts, forms, or portfolios. Combining images into one file is far easier to share than a zip of pictures. This tool orders them, sets page size, and exports.</p>
  <p>Local conversion protects privacy; documents never leave your device. Page-size and order controls ensure the result matches what a recipient expects.</p>
  <p>Use it to package images for sharing or submission. The tool's value is a clean, single PDF from any set of images, processed privately.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Many images?",
    answer:"Yes, merged into one PDF.",
  },
{
    question:"Order?",
    answer:"Drag to rearrange.",
  },
{
    question:"Page size?",
    answer:"A4, letter, custom.",
  },
{
    question:"Private?",
    answer:"Yes, no upload.",
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
