"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { FileText, Upload, Download, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { PDFDocument } from"pdf-lib";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export default function ImagePdfClient() {
 const [images, setImages] = useState<{ id: string; file: File; preview: string }[]>([]);
 const [converting, setConverting] = useState(false);

 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (!e.target.files) return;
 const selected = Array.from(e.target.files).filter((f) => f.type.startsWith("image/"));
 if (selected.length === 0) {
 toast.error("Please select valid image files (JPG, PNG, WebP).");
 return;
 }

 const newEntries = selected.map((file) => ({
 id: Math.random().toString(36).substring(7),
 file,
 preview: URL.createObjectURL(file),
 }));

 setImages((prev) => [...prev, ...newEntries]);
 toast.success(`Added ${selected.length} image(s).`);
 };

 const removeImage = (id: string) => {
 setImages((prev) => prev.filter((img) => img.id !== id));
 };

 const convertImagesToPdf = async () => {
 if (images.length === 0) return;

 setConverting(true);

 try {
 const pdfDoc = await PDFDocument.create();

 for (const item of images) {
 const buffer = await item.file.arrayBuffer();
 let image;

 if (item.file.type ==="image/png") {
 image = await pdfDoc.embedPng(buffer);
 } else {
 image = await pdfDoc.embedJpg(buffer);
 }

 const page = pdfDoc.addPage([image.width, image.height]);
 page.drawImage(image, {
 x: 0,
 y: 0,
 width: image.width,
 height: image.height,
 });
 }

 const pdfBytes = await pdfDoc.save();
 const blob = new Blob([new Uint8Array(pdfBytes)], { type:"application/pdf"});
 const url = URL.createObjectURL(blob);

 const a = document.createElement("a");
 a.href = url;
 a.download ="converted_images.pdf";
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
      <div className="relative space-y-6 max-w-4xl mx-auto px-4">
      <GridPattern />

 <ToolPageHeader
 icon={FileText}
 title="Image to PDF Converter"
 description="Convert JPG, PNG, and WebP images into a single PDF document. 100% client-side, fast & free."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
 <input
 type="file"
 accept="image/*"
 multiple
 onChange={handleImageUpload}
 className="hidden"
 id="image-pdf-upload"
 />
 <label htmlFor="image-pdf-upload"className="cursor-pointer flex flex-col items-center space-y-3">
 <Upload className="h-10 w-10 text-primary animate-bounce"/>
 <div className="text-sm font-semibold">Click to upload images (JPG, PNG, WebP)</div>
 </label>
 </div>

 {images.length > 0 && (
 <div className="space-y-4 pt-2">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {images.map((item) => (
 <div key={item.id} className="relative group border rounded-xl overflow-hidden bg-background">
 <img src={item.preview} alt={item.file.name} className="h-32 w-full object-cover"/>
 <Button
 size="sm"
 variant="destructive"
 onClick={() => removeImage(item.id)}
 className="absolute top-2 right-2 h-7 w-7 p-0 opacity-90 group-hover:opacity-100"
 >
 <Trash2 className="h-3.5 w-3.5"/>
 </Button>
 </div>
 ))}
 </div>

 <div className="flex justify-end">
 <Button
 onClick={convertImagesToPdf}
 disabled={converting}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <Download className="h-4 w-4"/>
 {converting ?"Converting Images...":"Convert & Download PDF"}
 </Button>
 </div>
 </div>
 )}
 </GlassCard>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Image to PDF Converter?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Image to PDF Converter provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/pdf/image-pdf" max={6} />

</div>
 );
}
