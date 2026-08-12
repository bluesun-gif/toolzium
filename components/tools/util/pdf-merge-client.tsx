"use client";

import React, { useState, useRef, useCallback } from"react";
import { Merge, Upload, Trash2, ArrowUp, ArrowDown, FileText, AlertCircle, Shield, Zap, FileOutput, MousePointer2, Settings, Lock } from"lucide-react";
import { PDFDocument } from"pdf-lib";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import toast from"react-hot-toast";

interface PdfFile {
 id: string;
 file: File;
 name: string;
 size: number;
}

export default function PdfMergeClient() {
 const [files, setFiles] = useState<PdfFile[]>([]);
 const [isMerging, setIsMerging] = useState(false);
 const [isDragging, setIsDragging] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);

 const formatSize = (bytes: number) => {
 if (bytes === 0) return"0 B";
 const k = 1024;
 const sizes = ["B","KB","MB","GB"];
 const i = Math.floor(Math.log(bytes) / Math.log(k));
 return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +""+ sizes[i];
 };

 const handleFiles = (newFiles: FileList | File[]) => {
 setError(null);
 const validFiles = Array.from(newFiles).filter(
 (file) => file.type ==="application/pdf"
 );

 if (validFiles.length !== newFiles.length) {
 setError("Some files were skipped because they are not PDF documents.");
 }

 const newPdfFiles: PdfFile[] = validFiles.map((file) => ({
 id: Math.random().toString(36).substring(7) + Date.now(),
 file,
 name: file.name,
 size: file.size,
 }));

 setFiles((prev) => [...prev, ...newPdfFiles]);
 };

 const handleDragOver = useCallback((e: React.DragEvent) => {
 e.preventDefault();
 setIsDragging(true);
 }, []);

 const handleDragLeave = useCallback((e: React.DragEvent) => {
 e.preventDefault();
 setIsDragging(false);
 }, []);

 const handleDrop = useCallback((e: React.DragEvent) => {
 e.preventDefault();
 setIsDragging(false);
 if (e.dataTransfer.files) {
 handleFiles(e.dataTransfer.files);
 }
 }, []);

 const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files) {
 handleFiles(e.target.files);
 }
 // Reset input so the same files can be selected again if needed
 if (fileInputRef.current) {
 fileInputRef.current.value ="";
 }
 };

 const moveUp = (index: number) => {
 if (index === 0) return;
 setFiles((prev) => {
 const newFiles = [...prev];
 const temp = newFiles[index - 1];
 newFiles[index - 1] = newFiles[index];
 newFiles[index] = temp;
 return newFiles;
 });
 };

 const moveDown = (index: number) => {
 if (index === files.length - 1) return;
 setFiles((prev) => {
 const newFiles = [...prev];
 const temp = newFiles[index + 1];
 newFiles[index + 1] = newFiles[index];
 newFiles[index] = temp;
 return newFiles;
 });
 };

 const removeFile = (id: string) => {
 setFiles((prev) => prev.filter((file) => file.id !== id));
 };

 const resetAll = () => {
 setFiles([]);
 setError(null);
 toast.success("PDF Merge reset!");
 };

 const mergePdfs = async () => {
 if (files.length < 2) {
 setError("Please add at least 2 PDF files to merge.");
 return;
 }

 setIsMerging(true);
 setError(null);

 try {
 const mergedPdf = await PDFDocument.create();

 for (const pdfFile of files) {
 const arrayBuffer = await pdfFile.file.arrayBuffer();
 const pdf = await PDFDocument.load(arrayBuffer);
 const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
 
 copiedPages.forEach((page) => {
 mergedPdf.addPage(page);
 });
 }

 const mergedPdfBytes = await mergedPdf.save();
 const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type:"application/pdf"});
 const url = URL.createObjectURL(blob);
 
 const a = document.createElement("a");
 a.href = url;
 a.download ="merged-document.pdf";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("PDFs merged successfully! Downloading...");
 } catch (err) {
 console.error(err);
 const errorMsg ="An error occurred while merging the PDFs. Some files might be encrypted or corrupted.";
 setError(errorMsg);
 toast.error(errorMsg);
 } finally {
 setIsMerging(false);
 }
 };

 const steps = [
 {
 step:"Step 1",
 title:"Upload PDFs",
 description:"Drag and drop or browse to select the PDF files you want to merge.",
 },
 {
 step:"Step 2",
 title:"Arrange Order",
 description:"Use the up and down arrows to rearrange the files in your desired order.",
 },
 {
 step:"Step 3",
 title:"Merge & Download",
 description:"Click the Merge PDFs button to combine them and download the result instantly.",
 },
 ];

 const features = [
 {
 title:"100% Client-Side Processing",
 description:"All processing happens in your browser. Your files never leave your device.",
 icon: Shield,
 },
 {
 title:"Fast & Efficient",
 description:"Instant merging using advanced web technologies without server roundtrips.",
 icon: Zap,
 },
 {
 title:"Preserves Quality",
 description:"Retains the original document layout, images, and vector graphics.",
 icon: FileOutput,
 },
 {
 title:"Easy Reordering",
 description:"Simple drag and drop or click interface to reorder your documents.",
 icon: MousePointer2,
 },
 {
 title:"No Limitations",
 description:"Merge as many PDF files as your device memory can handle.",
 icon: Settings,
 },
 {
 title:"Secure & Private",
 description:"No data is uploaded, stored, or analyzed on our servers.",
 icon: Lock,
 },
 ];

 const faqs = [
 {
 question:"How many PDF files can I merge?",
 answer:"There is no hard limit on the number of PDF files you can merge. However, the performance and limit depend on your computer's RAM and browser memory since all processing runs client-side.",
 },
 {
 question:"Are my files uploaded to a server?",
 answer:"No. All PDF merging is executed locally in your browser using JavaScript. Your documents never leave your device, ensuring complete privacy.",
 },
 {
 question:"Can I reorder the pages or files?",
 answer:"Yes, you can easily change the order of the uploaded PDF files using the up and down arrow buttons next to each file name before clicking the Merge button.",
 },
 {
 question:"Does merging PDFs lose document quality?",
 answer:"No. The merging process copies the vector graphics, text formatting, layout, and images from the source PDFs directly, retaining 100% of the original document quality.",
 },
 {
 question:"What should I do if my PDF fails to merge?",
 answer:"Ensure the files are not password-protected, encrypted, or corrupted. Protected PDFs must be decrypted before they can be merged. Try uploading them again.",
 },
 ];

 return (
 <div className="max-w-4xl mx-auto space-y-8">
 <ToolPageHeader
 title="PDF Merge"
 description="Merge multiple PDF files into one document quickly and securely in your browser."
 icon={Merge}
 />

 <GlassCard>
 <CardContent className="p-6 space-y-6">
 <div
 className={"border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-colors cursor-pointer"+ (isDragging ?"border-primary bg-primary/5":"border-muted-foreground/25 hover:border-primary/50")}
 onDragOver={handleDragOver}
 onDragLeave={handleDragLeave}
 onDrop={handleDrop}
 onClick={() => fileInputRef.current?.click()}
 >
 <input
 type="file"
 ref={fileInputRef}
 className="hidden"
 accept=".pdf"
 multiple
 onChange={handleFileInput}
 />
 <div className="flex flex-col items-center gap-4">
 <div className="p-4 rounded-full bg-primary/10 text-primary">
 <Upload className="h-8 w-8"/>
 </div>
 <div>
 <h3 className="text-lg font-medium mb-1">Upload PDF Files</h3>
 <p className="text-sm text-muted-foreground">
 Drag and drop your files here, or click to browse
 </p>
 </div>
 </div>
 </div>

 {error && (
 <div className="p-4 bg-destructive/10 text-destructive rounded-lg flex items-start gap-3">
 <AlertCircle className="h-5 w-5 mt-0.5 shrink-0"/>
 <p className="text-sm">{error}</p>
 </div>
 )}

 {files.length > 0 && (
 <div className="space-y-4">
 <h3 className="font-medium flex items-center justify-between">
 <span>Selected Files ({files.length})</span>
 <span className="text-sm text-muted-foreground font-normal">
 Total size: {formatSize(files.reduce((acc, f) => acc + f.size, 0))}
 </span>
 </h3>
 
 <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
 {files.map((file, index) => (
 <div
 key={file.id}
 className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border group"
 >
 <div className="text-primary shrink-0">
 <FileText className="h-6 w-6"/>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium truncate">{file.name}</p>
 <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
 </div>
 <div className="flex items-center gap-1 shrink-0">
 <Button
 variant="ghost"
 size="icon"
 className="h-8 w-8"
 onClick={() => moveUp(index)}
 disabled={index === 0}
 >
 <ArrowUp className="h-4 w-4"/>
 </Button>
 <Button
 variant="ghost"
 size="icon"
 className="h-8 w-8"
 onClick={() => moveDown(index)}
 disabled={index === files.length - 1}
 >
 <ArrowDown className="h-4 w-4"/>
 </Button>
 <Button
 variant="ghost"
 size="icon"
 className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
 onClick={() => removeFile(file.id)}
 >
 <Trash2 className="h-4 w-4"/>
 </Button>
 </div>
 </div>
 ))}
 </div>

 <div className="flex flex-col sm:flex-row gap-3 pt-4">
 <ActionButton
 icon={Merge}
 label={isMerging ?"Merging...":"Merge PDFs"}
 onClick={mergePdfs}
 disabled={files.length < 2 || isMerging}
 className="flex-1"
 />
 <ResetButton onClick={resetAll} />
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={steps} />

 <ToolFeatureGuides features={features}>
 <div className="space-y-6 text-muted-foreground">
 <div>
 <h3 className="text-xl font-semibold text-foreground mb-2">What Is a PDF?</h3>
 <p className="mb-4">
 The <strong>Portable Document Format (PDF)</strong>, created by Adobe in 1993 and later standardized as ISO 32000, is the universal standard for document distribution. It preserves layouts, fonts, images, and vector graphics consistently across all devices, operating systems, and screen sizes.
 </p>
 </div>

 <div>
 <h3 className="text-xl font-semibold text-foreground mb-2">Client-Side vs Server-Side PDF Processing</h3>
 <p className="mb-4">
 Toolzium processes your PDFs entirely <strong>client-side</strong> using <code>pdf-lib</code> in JavaScript within your browser. This offers critical privacy advantages: your files are <strong>never uploaded to a remote server</strong>, completely eliminating data leak risks and reducing wait times for file transfers.
 </p>
 </div>

 <div>
 <h3 className="text-xl font-semibold text-foreground mb-2">When Do You Need to Merge PDFs?</h3>
 <ul className="list-disc pl-6 space-y-2 mb-4">
 <li><strong>Business Reports:</strong> Combining monthly reports from different departments into a master document.</li>
 <li><strong>Tax Files:</strong> Assembling various tax receipts, W-2s, and forms into a single submission file.</li>
 <li><strong>Scanned Documents:</strong> Merging multiple single-page scans into one continuous digital book.</li>
 <li><strong>Digital Portfolios:</strong> Consolidating art, design, or writing samples into one easily shareable file.</li>
 </ul>
 </div>

 <div>
 <h3 className="text-xl font-semibold text-foreground mb-2">Reference Table: PDF Tools & Operations</h3>
 <div className="overflow-x-auto mb-4">
 <table className="w-full text-sm text-left border-collapse border border-border">
 <thead className="bg-muted text-foreground">
 <tr>
 <th className="border border-border p-2">Operation</th>
 <th className="border border-border p-2">Use Case</th>
 <th className="border border-border p-2">Privacy Level</th>
 <th className="border border-border p-2">Processing Speed</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-border p-2 font-medium">Merge</td>
 <td className="border border-border p-2">Combine multiple files into one</td>
 <td className="border border-border p-2 text-green-600">High (Client-side)</td>
 <td className="border border-border p-2">Very Fast</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Split</td>
 <td className="border border-border p-2">Extract specific pages</td>
 <td className="border border-border p-2 text-green-600">High (Client-side)</td>
 <td className="border border-border p-2">Very Fast</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Compress</td>
 <td className="border border-border p-2">Reduce file size for email</td>
 <td className="border border-border p-2 text-yellow-600">Medium (Often Server-side)</td>
 <td className="border border-border p-2">Moderate</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">To-Image</td>
 <td className="border border-border p-2">Convert PDF to JPG/PNG</td>
 <td className="border border-border p-2 text-green-600">High (Client-side)</td>
 <td className="border border-border p-2">Fast</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <div>
 <h3 className="text-xl font-semibold text-foreground mb-2">PDF Compression & Optimization</h3>
 <p className="mb-4">
 Text in a PDF takes up very little space because it uses embedded fonts and vector graphics. However, high-resolution images can dramatically increase file size. When you merge multiple PDFs that contain large images, the resulting file will be a combination of all their sizes. For massive files, you may need a separate compression tool to optimize the images.
 </p>
 </div>

 <div>
 <h3 className="text-xl font-semibold text-foreground mb-2">PDF Accessibility Standards</h3>
 <p>
 When creating or merging PDFs, it is important to consider accessibility. <strong>Tagged PDFs</strong> include hidden structured data (like headings, lists, and alt text for images) that allow screen readers to accurately read the document for visually impaired users. Retaining these tags during merging is crucial for maintaining compliance with accessibility standards like WCAG.
 </p>
 </div>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
 
 <RelatedTools currentToolUrl="/tools/util/pdf-merge"max={6} />
 </div>
 );
}
