"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { FileText, Upload, Download, RotateCw, RotateCcw, Shield, Layers, FileCheck } from"lucide-react";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { PDFDocument, degrees } from"pdf-lib";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";

export default function PdfRotateClient() {
 const [file, setFile] = useState<File | null>(null);
 const [rotationAngle, setRotationAngle] = useState<number>(90);
 const [rotating, setRotating] = useState(false);

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (!e.target.files || e.target.files.length === 0) return;
 const selected = e.target.files[0];
 if (selected.type !=="application/pdf") {
 toast.error("Please select a valid PDF file.");
 return;
 }
 setFile(selected);
 toast.success("PDF selected.");
 };

 const rotatePdf = async () => {
 if (!file) return;

 setRotating(true);

 try {
 const buffer = await file.arrayBuffer();
 const pdfDoc = await PDFDocument.load(buffer);
 const pages = pdfDoc.getPages();

 pages.forEach((page) => {
 const currentRotation = page.getRotation().angle;
 page.setRotation(degrees((currentRotation + rotationAngle) % 360));
 });

 const pdfBytes = await pdfDoc.save();
 const blob = new Blob([new Uint8Array(pdfBytes)], { type:"application/pdf"});
 const url = URL.createObjectURL(blob);

 const a = document.createElement("a");
 a.href = url;
 a.download = `rotated_${file.name}`;
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);

 toast.success(`PDF pages rotated by ${rotationAngle}° & downloaded!`);
 } catch (err) {
 console.error(err);
 toast.error("Error rotating PDF pages.");
 } finally {
 setRotating(false);
 }
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader
 icon={FileText}
 title="PDF Page Rotate Studio"
 description="Rotate PDF pages 90°, 180°, or 270° clockwise or counter-clockwise. 100% client-side."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
 <input
 type="file"
 accept="application/pdf"
 onChange={handleFileChange}
 className="hidden"
 id="pdf-rotate-upload"
 />
 <label htmlFor="pdf-rotate-upload"className="cursor-pointer flex flex-col items-center space-y-3">
 <Upload className="h-10 w-10 text-primary animate-bounce"/>
 <div className="text-sm font-semibold">
 {file ? file.name :"Click to select a PDF file to rotate"}
 </div>
 </label>
 </div>

 {file && (
 <div className="space-y-4 pt-2">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Rotation Direction & Angle:</label>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 <Button
 type="button"
 variant={rotationAngle === 90 ?"default":"outline"}
 onClick={() => setRotationAngle(90)}
 className="gap-2 font-semibold"
 >
 <RotateCw className="h-4 w-4"/>
 90° Right
 </Button>
 <Button
 type="button"
 variant={rotationAngle === 180 ?"default":"outline"}
 onClick={() => setRotationAngle(180)}
 className="gap-2 font-semibold"
 >
 <RotateCw className="h-4 w-4"/>
 180° Flip
 </Button>
 <Button
 type="button"
 variant={rotationAngle === 270 ?"default":"outline"}
 onClick={() => setRotationAngle(270)}
 className="gap-2 font-semibold"
 >
 <RotateCcw className="h-4 w-4"/>
 90° Left
 </Button>
 </div>
 </div>

 <div className="flex justify-end">
 <Button
 onClick={rotatePdf}
 disabled={rotating}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <Download className="h-4 w-4"/>
 {rotating ?"Rotating PDF...":"Rotate & Download PDF"}
 </Button>
 </div>
 </div>
 )}
 </GlassCard>

 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Upload Your PDF",
 description:"Select a PDF file from your device. All files remain securely on your device and are never uploaded to our servers.",
 icon: Upload,
 },
 {
 step:"02",
 title:"Select Rotation Angle",
 description:"Choose your desired rotation angle (90° right, 90° left, or 180°) to fix the orientation of your PDF pages.",
 icon: RotateCw,
 },
 {
 step:"03",
 title:"Rotate and Download",
 description:"Apply the rotation and instantly download your updated PDF with perfect formatting and quality retained.",
 icon: Download,
 },
 ]}
 badges={["100% Free","Instant","Lossless"]}
 />

 <ToolFeatureGuides
 features={[
 {
 title:"Multiple Rotation Options",
 description:"Rotate your PDF by 90 degrees right (clockwise), 90 degrees left (counter-clockwise), or flip it 180 degrees.",
 icon: RotateCw,
 },
 {
 title:"Entire Document Processing",
 description:"Applies the chosen rotation angle to all pages in your document simultaneously, ensuring consistent formatting.",
 icon: Layers,
 },
 {
 title:"Lossless Quality",
 description:"Your PDF is rotated without any loss in quality. Text remains searchable and images keep their original resolution.",
 icon: FileCheck,
 },
 {
 title:"100% Secure & Private",
 description:"All processing happens directly in your browser. Your sensitive documents never leave your device.",
 icon: Shield,
 },
 ]}
 >
 <h3 className="text-xl font-semibold mb-4">Fixing Scanned Document Orientation</h3>
 <p className="mb-4">
 One of the most common issues when scanning documents is ending up with pages that are sideways or upside down. Our PDF rotation tool is specifically designed to solve this problem quickly and effortlessly, right from your browser.
 </p>
 <p>
 Whether you have a single misplaced page or an entire document that was scanned in the wrong orientation, you can instantly apply a 90, 180, or 270-degree rotation. Because the tool operates entirely on your device using client-side processing, it handles even large, multi-page PDFs instantly without any upload or download wait times, ensuring your data remains completely private.
 </p>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 {
 question:"Will rotating my PDF affect its quality?",
 answer:"No, rotating your PDF with our tool is a completely lossless process. It simply updates the orientation metadata of the pages without recompressing or altering the underlying text and images.",
 },
 {
 question:"Can I rotate specific pages instead of the whole document?",
 answer:"Currently, this tool rotates all pages in the document uniformly. For page-specific rotation, stay tuned for our upcoming advanced PDF editing tools.",
 },
 {
 question:"What rotation angles are supported?",
 answer:"You can rotate your PDF by 90° clockwise (Right), 90° counter-clockwise (Left/270°), or 180° (Upside down).",
 },
 {
 question:"Can I use this tool completely offline?",
 answer:"Yes! Once the page has loaded, the PDF rotation works entirely in your browser using local resources. No internet connection is required to process your files.",
 },
 ]}
 />

 <RelatedTools currentToolUrl="/tools/pdf/pdf-rotate"/>
 </div>
 );
}
