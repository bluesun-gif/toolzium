"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Download, FileImage, FileText, ImagePlus, ShieldCheck, Trash2, Upload } from"lucide-react";
import { PDFDocument } from"pdf-lib";
import toast from"react-hot-toast";

export default function ImagePdfClient() {
  const [images, setImages] = useState<{
    id: string;
    file: File;
    preview: string;
  }[]>([]);
  const [converting, setConverting] = useState(false);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
    if (selected.length === 0) {
      toast.error("Please select valid image files (JPG, PNG, WebP).");
      return;
    }
    const newEntries = selected.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newEntries]);
    toast.success(`Added ${selected.length} image(s).`);
  };
  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };
  const convertImagesToPdf = async () => {
    if (images.length === 0) return;
    setConverting(true);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const item of images) {
        const buffer = await item.file.arrayBuffer();
        let image;
        if (item.file.type === "image/png") {
          image = await pdfDoc.embedPng(buffer);
        } else {
          image = await pdfDoc.embedJpg(buffer);
        }
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height
        });
      }
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted_images.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Images converted & downloaded as PDF!");
    } catch (err) {
      console.error(err);
      toast.error("Error converting images to PDF.");
    } finally {
      setConverting(false);
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={FileText} title="Image to PDF Converter" description="Convert JPG, PNG, and WebP images into a single PDF document. 100% client-side, fast & free." />

 <GlassCard className="p-6 space-y-4">
 <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
 <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" id="image-pdf-upload" />
 <label htmlFor="image-pdf-upload" className="cursor-pointer flex flex-col items-center space-y-3">
 <Upload className="h-10 w-10 text-primary animate-bounce" />
 <div className="text-sm font-semibold">Click to upload images (JPG, PNG, WebP)</div>
 </label>
 </div>

 {images.length > 0 && <div className="space-y-4 pt-2">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {images.map(item => <div key={item.id} className="relative group border rounded-xl overflow-hidden bg-background">
 <img src={item.preview} alt={item.file.name} className="h-32 w-full object-cover" />
 <Button size="sm" variant="destructive" onClick={() => removeImage(item.id)} className="absolute top-2 right-2 h-7 w-7 p-0 opacity-90 group-hover:opacity-100">
 <Trash2 className="h-3.5 w-3.5" />
 </Button>
 </div>)}
 </div>

 <div className="flex justify-end">
 <Button onClick={convertImagesToPdf} disabled={converting} className="gap-2 font-bold h-11 px-6 shadow-md">
 <Download className="h-4 w-4" />
 {converting ? "Converting Images..." : "Convert & Download PDF"}
 </Button>
 </div>
 </div>}
 </GlassCard>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Images",
    description:"Upload or drop images into the tool.",
    icon: ImagePlus,
  },
{
    step:"02",
    title:"Arrange & Convert",
    description:"Reorder pages and start conversion.",
    icon: FileImage,
  },
{
    step:"03",
    title:"Download",
    description:"Save the combined PDF to your device.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ImagePlus,
    title:"Batch Upload",
    description:"Combine many images into one document.",
  },
{
    icon: FileImage,
    title:"Page Order",
    description:"Drag to set the sequence of images.",
  },
{
    icon: Download,
    title:"Local Export",
    description:"Download the PDF without uploading files.",
  },
{
    icon: ShieldCheck,
    title:"Private",
    description:"Processing stays in your browser.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Converting images to PDF is a daily need for students, freelancers, and offices. Scanned documents, screenshots, and photos often need to become a single portable file for emailing or printing. This tool turns a folder of images into one PDF without sending anything to a server.</p>
  <p>Begin by gathering your images. Drag them in or use the file picker, then arrange them in the sequence you want each page to appear. Order matters for multi-page scans — a misordered document confuses readers, so take a moment to verify before converting. Most formats including JPG and PNG are supported.</p>
  <p>Privacy is the key advantage of a local converter. Online services upload your files to remote servers, which is risky for contracts, IDs, or confidential drafts. Because this tool processes everything in the browser, sensitive images never leave your device. That makes it safe for legal, medical, and financial documents.</p>
  <p>Output quality follows your source. High-resolution photos produce crisp pages but larger files; compressed screenshots keep size down at some clarity cost. After conversion, download the PDF and open it to confirm page order and readability. Whether you are submitting assignments, archiving receipts, or sharing a portfolio, a clean image-to-PDF workflow saves time and protects your data.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/pdf/image-pdf" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"Can I convert JPG to PDF?",
    answer:"Yes. JPG, PNG, and most common image formats can be combined into a PDF.",
  },
{
    question:"Are my images uploaded?",
    answer:"No. Conversion runs locally in your browser, so files stay on your device.",
  },
{
    question:"Can I reorder pages?",
    answer:"Yes. Arrange the images in the order you want before converting.",
  },
{
    question:"What size will the PDF be?",
    answer:"It depends on image resolution; high-res scans create larger files.",
  },
{
    question:"Can I make one image per page?",
    answer:"Yes, each image becomes its own page in the final PDF by default.",
  }
  ]}
/>
    </div>
    </div>
);
}
