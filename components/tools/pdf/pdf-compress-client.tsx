"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { FileText, Upload, Download, Settings, Image, Shield, FileArchive } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";

const QUALITY_PRESETS = [
 { label:"Maximum (≈90%)", dpi: 150, jpegQ: 0.9 },
 { label:"High (≈70%)", dpi: 120, jpegQ: 0.75 },
 { label:"Medium (≈50%)", dpi: 96, jpegQ: 0.6 },
 { label:"Small File (≈30%)", dpi: 72, jpegQ: 0.45 },
];

export default function PdfCompressClient() {
 const [file, setFile] = useState<File | null>(null);
 const [preset, setPreset] = useState(1); // High by default
 const [compressing, setCompressing] = useState(false);
 const [stats, setStats] = useState<{ orig: number; newSize: number } | null>(null);
 const [progress, setProgress] = useState("");

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const selected = e.target.files?.[0];
 if (!selected || selected.type !=="application/pdf") {
 toast.error("Please select a valid PDF file.");
 return;
 }
 setFile(selected);
 setStats(null);
 toast.success(`"${selected.name}"selected.`);
 };

 const compressPdf = async () => {
 if (!file) return;

 setCompressing(true);
 setStats(null);

 try {
 const { dpi, jpegQ } = QUALITY_PRESETS[preset];

 // Load pdf.js via CDN
 const pdfjsLib = (await import("pdfjs-dist")).default ?? (await import("pdfjs-dist"));
 pdfjsLib.GlobalWorkerOptions.workerSrc =
 `https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.min.mjs`;

 const buffer = await file.arrayBuffer();
 const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
 const numPages = pdf.numPages;

 // We'll use pdf-lib to stitch compressed page images into a new PDF
 const { PDFDocument } = await import("pdf-lib");
 const outPdf = await PDFDocument.create();

 const scale = dpi / 96; // 96 is the base DPI

 for (let i = 1; i <= numPages; i++) {
 setProgress(`Compressing page ${i} of ${numPages}…`);

 const page = await pdf.getPage(i);
 const viewport = page.getViewport({ scale });

 const canvas = document.createElement("canvas");
 canvas.width = Math.round(viewport.width);
 canvas.height = Math.round(viewport.height);
 const ctx = canvas.getContext("2d")!;

 await page.render({ canvasContext: ctx, canvas, viewport } as any).promise;

 // Convert to compressed JPEG
 const jpegDataUrl = canvas.toDataURL("image/jpeg", jpegQ);
 const jpegResp = await fetch(jpegDataUrl);
 const jpegBuf = await jpegResp.arrayBuffer();

 // Embed in output PDF
 const img = await outPdf.embedJpg(jpegBuf);
 const rawViewport = page.getViewport({ scale: 1 });
 const pdfPage = outPdf.addPage([rawViewport.width, rawViewport.height]);
 pdfPage.drawImage(img, {
 x: 0,
 y: 0,
 width: rawViewport.width,
 height: rawViewport.height,
 });
 }

 setProgress("Saving compressed PDF…");
 const outBytes = await outPdf.save();
 const origSize = file.size;
 const newSize = outBytes.length;

 // Download
 const blob = new Blob([new Uint8Array(outBytes)], { type:"application/pdf"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download = `compressed_${file.name}`;
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);

 setStats({ orig: origSize, newSize });
 toast.success("PDF compressed & downloaded!");
 } catch (err) {
 console.error(err);
 toast.error("Error compressing PDF. Try a different file.");
 } finally {
 setCompressing(false);
 setProgress("");
 }
 };

 const { label: presetLabel } = QUALITY_PRESETS[preset];

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={FileText}
 title="PDF Compress Studio"
 description="Genuinely reduce PDF file size by re-rendering pages at optimized resolution. 100% client-side — files never leave your browser."
 />

 <GlassCard className="p-6 space-y-5">
 {/* Upload */}
 <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
 <input type="file"accept="application/pdf"onChange={handleFileChange} className="hidden"id="pdf-compress-upload"/>
 <label htmlFor="pdf-compress-upload"className="cursor-pointer flex flex-col items-center space-y-3">
 <Upload className="h-10 w-10 text-primary animate-bounce"/>
 <div className="text-sm font-semibold">
 {file ? file.name :"Click to upload a PDF to compress"}
 </div>
 {file && (
 <div className="text-xs text-muted-foreground">Original size: {(file.size / 1024).toFixed(1)} KB</div>
 )}
 </label>
 </div>

 {/* Quality preset */}
 {file && (
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Compression Quality:</label>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
 {QUALITY_PRESETS.map((p, i) => (
 <Button
 key={i}
 type="button"
 size="sm"
 variant={preset === i ?"default":"outline"}
 onClick={() => setPreset(i)}
 className="text-xs font-semibold h-9"
 >
 {p.label}
 </Button>
 ))}
 </div>
 <p className="text-xs text-muted-foreground pt-1">
 ⚠️ Compression works by re-rendering pages as images. Text will remain visible but won't be selectable in the output. Best for scanned PDFs and image-heavy documents.
 </p>
 </div>
 )}

 {/* Progress */}
 {compressing && progress && (
 <div className="text-xs font-semibold text-primary animate-pulse">{progress}</div>
 )}

 {/* Result stats */}
 {stats && (
 <div className="p-4 rounded-xl border bg-background/60 text-center space-y-1">
 <div className="text-xs font-bold text-foreground">Compression Complete!</div>
 <div className="text-sm font-bold text-primary">
 {(stats.orig / 1024).toFixed(1)} KB → {(stats.newSize / 1024).toFixed(1)} KB
 {stats.newSize < stats.orig ? (
 <span className="text-green-600 ml-2">
 (↓ {(((stats.orig - stats.newSize) / stats.orig) * 100).toFixed(1)}% saved)
 </span>
 ) : (
 <span className="text-amber-500 ml-2">(file was already optimized)</span>
 )}
 </div>
 </div>
 )}

 {/* Compress button */}
 {file && (
 <div className="flex justify-end pt-2">
 <Button
 onClick={compressPdf}
 disabled={compressing}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <Download className="h-4 w-4"/>
 {compressing ?"Compressing…": `Compress & Download (${presetLabel})`}
 </Button>
 </div>
 )}
 </GlassCard>

 <ToolHowItWorks
 steps={[
 { step:"1", title:"Upload PDF", description:"Select the PDF file you want to compress from your device.", icon: Upload },
 { step:"2", title:"Select Compression Level", description:"Choose a preset quality level to balance size reduction and image clarity.", icon: Settings },
 { step:"3", title:"Compress & Download", description:"Process the file entirely in your browser and download the optimized PDF.", icon: Download },
 ]}
 badges={["100% Free","Client-Side","Up to 90% Smaller"]}
 />

 <ToolFeatureGuides
 features={[
 { title:"Adjustable Compression Levels", description:"Choose from maximum quality to smallest file size to fit your needs.", icon: FileArchive },
 { title:"Intelligent Image Optimization", description:"Re-renders pages as optimized JPEGs to significantly reduce file bloat.", icon: Image },
 { title:"Removes Hidden Metadata", description:"Strips out unnecessary embedded fonts and metadata during the re-rendering process.", icon: FileText },
 { title:"Absolute Privacy", description:"All processing happens locally in your browser. Your confidential PDFs are never uploaded to any server.", icon: Shield },
 ]}
 >
 <p>
 Bloated PDF files are a common nuisance when trying to send email attachments or upload documents to web portals with strict file size limitations. Our PDF Compress Studio solves this problem by intelligently reducing the size of your documents without requiring you to install any bulky software.
 </p>
 <p>
 By re-rendering the pages at optimized resolutions and converting them into highly efficient JPEG formats, we can often shrink files by up to 90%. Best of all, because the compression happens entirely within your web browser, your sensitive documents remain completely private and secure. They never leave your device.
 </p>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Will I lose quality when compressing my PDF?", answer:"Compression inherently involves some loss of quality, especially for images. However, you can select the compression level that best balances file size and visual clarity for your specific needs."},
 { question:"Is there a maximum file size limit?", answer:"Since the compression happens entirely in your browser, the maximum file size depends on your device's available memory. Most modern devices can easily handle PDFs up to 50MB."},
 { question:"What kind of compression ratio can I expect?", answer:"The compression ratio varies depending on the original file. Image-heavy or scanned PDFs often see the most significant reductions, sometimes up to 90%. Text-heavy PDFs that are already optimized may see less reduction."},
 { question:"Will this help me email large PDFs?", answer:"Yes! Many email providers limit attachments to 20MB or 25MB. By compressing your PDF, you can easily fit within these limits and ensure your document reaches its destination."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/pdf/pdf-compress"/>
 </div>
 );
}
