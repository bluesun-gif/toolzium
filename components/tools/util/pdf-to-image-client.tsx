"use client";

import React, { useState, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Separator } from"@/components/ui/separator";
import { ResetButton, ActionButton } from"@/components/shared/action-buttons";
import { FileImage, UploadCloud, Download, AlertCircle, FileType, Image as ImageIcon, Settings } from"lucide-react";
import { useDropzone } from"react-dropzone";

interface PdfPageInfo {
 pageNumber: number;
 dataUrl: string;
 width: number;
 height: number;
}

export default function PdfToImageClient() {
 const [file, setFile] = useState<File | null>(null);
 const [pages, setPages] = useState<PdfPageInfo[]>([]);
 const [isConverting, setIsConverting] = useState(false);
 const [progress, setProgress] = useState(0);
 const [format, setFormat] = useState<"image/png"|"image/jpeg">("image/jpeg");
 const [dpi, setDpi] = useState<number>(150);
 const [error, setError] = useState<string | null>(null);
 const [pdfjsLoaded, setPdfjsLoaded] = useState(false);

 useEffect(() => {
 // Load pdfjs from CDN
 if (typeof window !=="undefined"&& !(window as unknown as { pdfjsLib?: unknown }).pdfjsLib) {
 const script = document.createElement("script");
 script.src ="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
 script.async = true;
 document.head.appendChild(script);

 script.onload = () => {
 const globalWindow = window as unknown as { pdfjsLib?: { GlobalWorkerOptions: { workerSrc: string } } };
 if (globalWindow.pdfjsLib) {
 globalWindow.pdfjsLib.GlobalWorkerOptions.workerSrc ="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
 setPdfjsLoaded(true);
 }
 };
 
 script.onerror = () => {
 setError("Failed to load PDF processing engine. Please check your internet connection.");
 };
 } else if (typeof window !=="undefined"&& (window as unknown as { pdfjsLib?: unknown }).pdfjsLib) {
 setPdfjsLoaded(true);
 }
 }, []);

 const onDrop = useCallback((acceptedFiles: File[]) => {
 const selectedFile = acceptedFiles[0];
 if (selectedFile && selectedFile.type ==="application/pdf") {
 setFile(selectedFile);
 setPages([]);
 setProgress(0);
 setError(null);
 } else {
 setError("Please select a valid PDF file.");
 }
 }, []);

 const { getRootProps, getInputProps, isDragActive } = useDropzone({
 onDrop,
 accept: {"application/pdf": [".pdf"] },
 maxFiles: 1,
 });

 const handleConvert = async () => {
 if (!file) return;

 if (!pdfjsLoaded) {
 setError("PDF engine is still loading. Please wait a moment.");
 return;
 }

 setIsConverting(true);
 setProgress(0);
 setError(null);
 setPages([]);

 try {
 const arrayBuffer = await file.arrayBuffer();
 const globalWindow = window as unknown as { 
 pdfjsLib?: { 
 getDocument: (args: Uint8Array) => { promise: Promise<unknown> } 
 } 
 };
 
 if (!globalWindow.pdfjsLib) {
 throw new Error("PDF Library not available");
 }

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const loadingTask = globalWindow.pdfjsLib.getDocument(new Uint8Array(arrayBuffer));
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const pdf = (await loadingTask.promise) as any;
 const numPages = pdf.numPages as number;
 const convertedPages: PdfPageInfo[] = [];

 for (let i = 1; i <= numPages; i++) {
 const page = await pdf.getPage(i);
 const scale = dpi / 72; // Default PDF point size is 72 DPI
 const viewport = page.getViewport({ scale });

 const canvas = document.createElement("canvas");
 const context = canvas.getContext("2d");
 
 if (!context) continue;

 canvas.width = viewport.width;
 canvas.height = viewport.height;

 // Draw white background for JPGs
 if (format ==="image/jpeg") {
 context.fillStyle ="#ffffff";
 context.fillRect(0, 0, canvas.width, canvas.height);
 }

 await page.render({
 canvasContext: context,
 viewport: viewport,
 }).promise;

 const dataUrl = canvas.toDataURL(format, 1.0);
 
 convertedPages.push({
 pageNumber: i,
 dataUrl,
 width: viewport.width,
 height: viewport.height,
 });

 setProgress(Math.round((i / numPages) * 100));
 }

 setPages(convertedPages);
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 } catch (err: any) {
 console.error(err);
 setError("Error processing PDF:"+ (err.message || String(err)));
 } finally {
 setIsConverting(false);
 }
 };

 const handleDownloadZip = async () => {
 if (pages.length === 0) return;

 try {
 // Dynamic import for JSZip
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const JSZip = ((await import("jszip")) as any).default;
 const zip = new JSZip();

 const ext = format ==="image/jpeg"?"jpg":"png";
 
 pages.forEach((page) => {
 const base64Data = page.dataUrl.split(",")[1];
 zip.file(`page-${page.pageNumber}.${ext}`, base64Data, { base64: true });
 });

 const content = await zip.generateAsync({ type:"blob"});
 const url = URL.createObjectURL(content);
 const a = document.createElement("a");
 a.href = url;
 a.download = `${file?.name.replace(".pdf","") ||"pdf"}-images.zip`;
 a.click();
 URL.revokeObjectURL(url);
 } catch (e) {
 console.warn("JSZip missing, falling back to individual downloads", e);
 pages.forEach((page) => handleDownloadPage(page));
 }
 };

 const handleDownloadPage = (page: PdfPageInfo) => {
 const ext = format ==="image/jpeg"?"jpg":"png";
 const a = document.createElement("a");
 a.href = page.dataUrl;
 a.download = `${file?.name.replace(".pdf","") ||"pdf"}-page-${page.pageNumber}.${ext}`;
 a.click();
 };

 const resetAll = () => {
 setFile(null);
 setPages([]);
 setProgress(0);
 setError(null);
 };

 return (
 <div className="container mx-auto max-w-5xl py-8">
 <ToolPageHeader
 title="PDF to Image"
 description="Convert PDF pages to high-quality JPG or PNG images directly in your browser."
 icon={FileImage}
 />

 <div className="mt-8 grid gap-6 md:grid-cols-3">
 <div className="md:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Settings className="h-5 w-5"/> Settings
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-3">
 <label className="text-sm font-medium">Output Format</label>
 <div className="flex gap-2">
 <Button
 variant={format ==="image/jpeg"?"default":"outline"}
 className="flex-1"
 onClick={() => setFormat("image/jpeg")}
 >
 JPG
 </Button>
 <Button
 variant={format ==="image/png"?"default":"outline"}
 className="flex-1"
 onClick={() => setFormat("image/png")}
 >
 PNG
 </Button>
 </div>
 </div>

 <div className="space-y-3">
 <label className="text-sm font-medium flex justify-between">
 <span>Image Quality (DPI)</span>
 <span className="text-muted-foreground">{dpi} DPI</span>
 </label>
 <div className="flex gap-2">
 {[72, 150, 300].map((val) => (
 <Button
 key={val}
 variant={dpi === val ?"default":"outline"}
 className="flex-1 text-xs"
 onClick={() => setDpi(val)}
 >
 {val}
 </Button>
 ))}
 </div>
 <p className="text-xs text-muted-foreground mt-1">
 Higher DPI means better quality but larger file size.
 </p>
 </div>
 </CardContent>
 </GlassCard>

 {file && (
 <GlassCard>
 <CardContent className="pt-6">
 <div className="flex flex-col items-center text-center space-y-2">
 <FileType className="h-10 w-10 text-primary mb-2"/>
 <p className="font-medium text-sm truncate w-full px-2"title={file.name}>
 {file.name}
 </p>
 <p className="text-xs text-muted-foreground">
 {(file.size / 1024 / 1024).toFixed(2)} MB
 </p>
 </div>
 
 <Separator className="my-4"/>
 
 <div className="flex gap-2">
 <Button 
 className="flex-1"
 onClick={handleConvert}
 disabled={isConverting || !pdfjsLoaded}
 >
 {isConverting ? `Converting (${progress}%)` :"Convert to Images"}
 </Button>
 <ResetButton onClick={resetAll} />
 </div>
 </CardContent>
 </GlassCard>
 )}
 </div>

 <div className="md:col-span-2 space-y-6">
 {error && (
 <div className="p-4 bg-destructive/10 text-destructive rounded-lg flex items-start gap-3 border border-destructive/20">
 <AlertCircle className="h-5 w-5 shrink-0 mt-0.5"/>
 <div className="text-sm">{error}</div>
 </div>
 )}

 {!file ? (
 <div
 {...getRootProps()}
 className={"border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[400px]"+ (isDragActive ?"border-primary bg-primary/5":"border-muted-foreground/25 hover:border-primary/50")}
 >
 <input {...getInputProps()} />
 <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
 <UploadCloud className="h-10 w-10 text-primary"/>
 </div>
 <h3 className="text-xl font-semibold mb-2">Upload your PDF</h3>
 <p className="text-muted-foreground max-w-sm mb-6">
 Drag and drop a PDF file here, or click to select from your device.
 </p>
 <Button>Select PDF File</Button>
 </div>
 ) : (
 <GlassCard className="min-h-[400px]">
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Converted Pages</CardTitle>
 <CardDescription>
 {pages.length > 0 ? `${pages.length} pages converted` :"Click convert to see images"}
 </CardDescription>
 </div>
 {pages.length > 0 && (
 <ActionButton
 onClick={handleDownloadZip}
 icon={Download}
 label="Download ZIP"
 />
 )}
 </CardHeader>
 <CardContent>
 {pages.length > 0 ? (
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
 {pages.map((page) => (
 <div key={page.pageNumber} className="group relative border rounded-lg overflow-hidden bg-muted/30">
 <div className="aspect-[1/1.4] relative flex items-center justify-center p-2">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img 
 src={page.dataUrl} 
 alt={`Page ${page.pageNumber}`}
 className="max-w-full max-h-full object-contain shadow-sm bg-background"
 />
 </div>
 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
 <Button 
 size="sm"
 variant="secondary"
 onClick={() => handleDownloadPage(page)}
 className="gap-2"
 >
 <Download className="h-4 w-4"/> Download
 </Button>
 </div>
 <div className="absolute top-2 left-2">
 <Badge variant="secondary"className="bg-background/80 backdrop-blur">
 Page {page.pageNumber}
 </Badge>
 </div>
 </div>
 ))}
 </div>
 ) : (
 <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground space-y-4">
 <ImageIcon className="h-16 w-16 opacity-20"/>
 {isConverting ? (
 <div className="space-y-4 w-full max-w-xs">
 <p className="text-center">Processing PDF...</p>
 <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
 <div 
 className="h-full bg-primary transition-all duration-300"
 style={{ width: `${progress}%` }}
 />
 </div>
 <p className="text-center text-xs">{progress}%</p>
 </div>
 ) : (
 <p>Ready to extract images from your PDF</p>
 )}
 </div>
 )}
 </CardContent>
 </GlassCard>
 )}
 </div>
 </div>
 </div>
 );
}
