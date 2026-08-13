"use client";

import React, { useState, useRef, DragEvent, ChangeEvent, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import TextareaField from"@/components/shared/form-fields/textarea-field";
import { ScanText, Upload, Image as ImageIcon, Loader2, Cpu, ShieldCheck, Zap, Layers, RefreshCw, FileText } from"lucide-react";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { cn } from"@/lib/utils";

export default function ImageToTextClient() {
 const [imageSrc, setImageSrc] = useState<string | null>(null);
 const [text, setText] = useState<string>("");
 const [isDragging, setIsDragging] = useState<boolean>(false);
 const [isProcessing, setIsProcessing] = useState<boolean>(false);
 const [progress, setProgress] = useState<number>(0);
 const [status, setStatus] = useState<string>("");
 const [isTesseractReady, setIsTesseractReady] = useState<boolean>(false);
 const fileInputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
 const scriptId ="tesseract-script";
 if (document.getElementById(scriptId)) {
 setIsTesseractReady(true);
 return;
 }

 const script = document.createElement("script");
 script.id = scriptId;
 script.src ="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
 script.async = true;
 script.onload = () => setIsTesseractReady(true);
 document.head.appendChild(script);

 return () => {
 // Clean up optional if we want, but generally fine to leave loaded
 };
 }, []);

 const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
 e.preventDefault();
 setIsDragging(true);
 };

 const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
 e.preventDefault();
 setIsDragging(false);
 };

 const extractText = async (imageUrl: string) => {
 const tesseract = (window as any).Tesseract;
 if (!isTesseractReady || !tesseract) {
 alert("OCR library is not ready yet. Please try again in a moment.");
 return;
 }

 setIsProcessing(true);
 setText("");
 setProgress(0);
 setStatus("Initializing...");

 try {
 const result = await tesseract.recognize(
 imageUrl,
"eng",
 {
 logger: (m: any) => {
 if (m.status ==="recognizing text") {
 setProgress(Math.round(m.progress * 100));
 setStatus("Extracting text...");
 } else {
 setStatus(m.status);
 }
 }
 }
 );
 
 setText(result.data.text);
 } catch (error) {
 console.error("OCR Error:", error);
 alert("Failed to extract text from the image.");
 } finally {
 setIsProcessing(false);
 setStatus("");
 setProgress(0);
 }
 };

 const processFile = (file: File) => {
 if (!file.type.startsWith("image/")) {
 alert("Please upload a valid image file.");
 return;
 }

 const reader = new FileReader();
 reader.onload = (event) => {
 if (event.target && event.target.result) {
 const url = event.target.result as string;
 setImageSrc(url);
 extractText(url);
 }
 };
 reader.readAsDataURL(file);
 };

 const handleDrop = (e: DragEvent<HTMLDivElement>) => {
 e.preventDefault();
 setIsDragging(false);

 if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
 processFile(e.dataTransfer.files[0]);
 }
 };

 const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
 if (e.target.files && e.target.files.length > 0) {
 processFile(e.target.files[0]);
 }
 };

 const triggerFileInput = () => {
 if (fileInputRef.current) {
 fileInputRef.current.click();
 }
 };

 const handleReset = () => {
 setImageSrc(null);
 setText("");
 setIsProcessing(false);
 setProgress(0);
 setStatus("");
 if (fileInputRef.current) {
 fileInputRef.current.value ="";
 }
 };

 return (
 <div className="max-w-6xl mx-auto">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 title="Image to Text (OCR)"
 description="Extract text from images using OCR. Upload PNG, JPG, or WEBP images and convert to editable text. Free online image to text converter."
 icon={ScanText}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Image Input</CardTitle>
 <CardDescription>Upload an image to extract text from.</CardDescription>
 </CardHeader>
 <CardContent>
 <input
 type="file"
 ref={fileInputRef}
 onChange={handleFileChange}
 accept="image/png, image/jpeg, image/webp, image/bmp"
 className="hidden"
 />
 
 {!imageSrc ? (
 <div
 className={cn("border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors", (isDragging ?"border-primary bg-primary/10":"border-border hover:bg-muted/50"))}
 onDragOver={handleDragOver}
 onDragLeave={handleDragLeave}
 onDrop={handleDrop}
 onClick={triggerFileInput}
 >
 <Upload className="h-12 w-12 text-muted-foreground mb-4"/>
 <p className="text-sm font-medium mb-1">Drag and drop your image here</p>
 <p className="text-xs text-muted-foreground mb-4">or click to browse files</p>
 <p className="text-xs text-muted-foreground">Supports PNG, JPG, WEBP, BMP</p>
 {!isTesseractReady && (
 <p className="text-xs text-amber-500 mt-2">Loading OCR engine...</p>
 )}
 </div>
 ) : (
 <div className="space-y-4">
 <div className="border rounded-lg overflow-hidden bg-muted/30 relative flex items-center justify-center min-h-[300px]">
 <img src={imageSrc} alt="Uploaded preview"className="max-w-full max-h-[400px] object-contain"/>
 
 {isProcessing && (
 <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
 <Loader2 className="h-12 w-12 text-primary animate-spin mb-4"/>
 <p className="text-lg font-semibold mb-2">Extracting Text...</p>
 <p className="text-sm text-muted-foreground mb-4 capitalize">{status}</p>
 
 <div className="w-full max-w-xs h-2 bg-muted rounded-full overflow-hidden">
 <div 
 className="h-full bg-primary transition-all duration-300"
 style={{ width: progress +"%"}}
 ></div>
 </div>
 <p className="text-xs mt-2 font-medium">{progress}%</p>
 </div>
 )}
 </div>
 
 <div className="flex justify-center">
 <Button 
 variant="outline"
 onClick={triggerFileInput} 
 className="w-full"
 disabled={isProcessing}
 >
 <ImageIcon className="mr-2 h-4 w-4"/>
 Replace Image
 </Button>
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Extracted Text</CardTitle>
 <CardDescription>View and edit the extracted text.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <TextareaField
 label="Text Content"
 value={text}
 onChange={(e) => setText(e.target.value)}
 placeholder={
 isProcessing 
 ?"Extracting text..."
 : imageSrc 
 ?"Extracted text will appear here. You can also type or edit..."
 :"Upload an image first..."
 }
 rows={16}
 disabled={!imageSrc || isProcessing}
 />
 
 <div className="flex flex-wrap gap-2 justify-end">
 <ResetButton onClick={handleReset} disabled={(!imageSrc && !text) || isProcessing} />
 <CopyButton getText={text} disabled={!text || isProcessing} />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>

 {/* ─── How It Works ─── */}
 <ToolHowItWorks
 steps={[
 { step:"1", title:"Upload Image", description:"Select, drag, or paste any PNG, JPG, WEBP, or BMP image containing printed or typed text."},
 { step:"2", title:"Extract Text (OCR)", description:"The Tesseract.js engine processes the image directly in your browser using local WebAssembly. Progress will show in real time."},
 { step:"3", title:"Edit & Export", description:"Your extracted text displays in an editable text field. Edit the content or copy it to your clipboard with one click."},
 ]}
 badges={[
"No Registration",
"100% Client-Side",
"Zero File Uploads",
"Free Forever",
 ]}
 />

 {/* ─── Feature Guides + SEO Content ─── */}
 <ToolFeatureGuides
 features={[
 { icon: Cpu, title:"Tesseract.js Engine", description:"Harnesses the power of Google's open-source Tesseract OCR, compiled to high-speed WebAssembly for browser execution."},
 { icon: ShieldCheck, title:"Private & Secure", description:"Your documents are never sent over the web. All text extraction runs offline inside your browser environment."},
 { icon: Zap, title:"Instant Extraction", description:"Processes receipts, screenshots, and simple documents within seconds, extracting text with near-instant rendering."},
 { icon: Layers, title:"Interactive Editing", description:"Instantly edit or adjust extracted text directly inside the tool window to fix minor typos or format outputs."},
 { icon: RefreshCw, title:"Auto OCR Loading", description:"The library loads lazily on page visit, ensuring fast initial page loads without locking browser threads."},
 { icon: FileText, title:"Format Independence", description:"Accurately parses text layouts from standard screenshots, document scans, printed receipts, and mobile snaps."},
 ]}
 >
 <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
 <h3 className="text-xl font-semibold text-foreground">How Tesseract.js OCR Works</h3>
 <p>
 Optical Character Recognition (OCR) is the process of translating visual letters and symbols from an image into computer-readable digital text. This tool utilizes <strong>Tesseract.js</strong>, a Javascript port of Google&apos;s legendary Tesseract OCR engine, which is compiled to WebAssembly (WASM) to achieve native speed inside web browsers.
 </p>
 <p>
 The engine functions by analyzing the image grid, performing image binarization (turning colors to pure black and white), separating lines, finding words, and comparing character geometries against a pre-trained statistical neural network database.
 </p>
 
 <h4 className="text-base font-semibold text-foreground">Tesseract OCR Processing Modes</h4>
 <table className="w-full border-collapse text-xs border border-border rounded-lg overflow-hidden">
 <thead className="bg-muted text-foreground">
 <tr>
 <th className="border border-border p-2 text-left">Processing Engine</th>
 <th className="border border-border p-2 text-left">Internal Technology</th>
 <th className="border border-border p-2 text-left">Ideal Input Type</th>
 <th className="border border-border p-2 text-left">Relative Accuracy</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-border p-2 font-medium">Legacy Engine</td>
 <td className="border border-border p-2">Character pattern matching</td>
 <td className="border border-border p-2">Monospace, typewriter text</td>
 <td className="border border-border p-2 text-red-500">Low-Moderate</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">LSTM Engine</td>
 <td className="border border-border p-2">Long Short-Term Memory neural nets</td>
 <td className="border border-border p-2">Standard books, printed documents</td>
 <td className="border border-border p-2 text-green-600">Very High</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Combined Mode</td>
 <td className="border border-border p-2">Legacy fallback + LSTM analysis</td>
 <td className="border border-border p-2">Mixed font documents</td>
 <td className="border border-border p-2 text-green-500">High</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">WASM Threaded</td>
 <td className="border border-border p-2">Multi-threaded WebAssembly execution</td>
 <td className="border border-border p-2">Large batch documents</td>
 <td className="border border-border p-2 text-green-600">Maximum speed</td>
 </tr>
 </tbody>
 </table>

 <h3 className="text-xl font-semibold text-foreground">OCR vs AI Text Extraction</h3>
 <p>
 While standard OCR engines like Tesseract map pixel patterns directly to character models, modern large language models (LLMs) perform vision-based AI text extraction. OCR is extremely fast, private (runs offline), and free of API subscription costs. It is ideal for extracting lists, tabular text, structured forms, and simple notes. AI-based text extraction is better suited for sloppy handwriting or highly distorted images, but it requires uploading your files to external cloud servers, raising security concerns.
 </p>

 <h3 className="text-xl font-semibold text-foreground">OCR Accuracy Tips</h3>
 <p>
 To get the highest accuracy out of the OCR engine, follow these recommendations:
 </p>
 <ul className="list-disc pl-5 space-y-2">
 <li><strong>Maximize Resolution</strong> — Use images where the text is crisp and clear. A resolution of 150 to 300 DPI is standard. If the text looks pixelated to your eyes, the OCR engine will likely misidentify characters.</li>
 <li><strong>Increase Contrast</strong> — Clean, black text on a solid white background yields the highest accuracy. If you upload a colored image, try increasing its contrast before scanning.</li>
 <li><strong>Keep it Horizontal</strong> — Make sure the lines of text are not rotated. Tesseract extracts text line-by-line, and vertical tilt or diagonal layouts will confuse the line segmenter.</li>
 <li><strong>Select Simple Fonts</strong> — Standard serif and sans-serif fonts (like Arial, Times New Roman, and Helvetica) scan perfectly. Handwritten notes or highly stylized script fonts will have low accuracy.</li>
 </ul>

 <h3 className="text-xl font-semibold text-foreground">Supported Languages &amp; Formats</h3>
 <p>
 Tesseract can be configured to read text in over 100 languages. Here are typical character mapping capabilities:
 </p>
 <table className="w-full border-collapse text-xs border border-border rounded-lg overflow-hidden">
 <thead className="bg-muted text-foreground">
 <tr>
 <th className="border border-border p-2 text-left">Language</th>
 <th className="border border-border p-2 text-left">Tesseract Code</th>
 <th className="border border-border p-2 text-left">Character Set Support</th>
 <th className="border border-border p-2 text-left">Example</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-border p-2 font-medium">English</td>
 <td className="border border-border p-2"><code>eng</code></td>
 <td className="border border-border p-2">Latin characters, standard digits</td>
 <td className="border border-border p-2">Hello World 123</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Bengali</td>
 <td className="border border-border p-2"><code>ben</code></td>
 <td className="border border-border p-2">Bengali alphabet &amp; numerals</td>
 <td className="border border-border p-2">হ্যালো ওয়ার্ল্ড ১২৩</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Spanish</td>
 <td className="border border-border p-2"><code>spa</code></td>
 <td className="border border-border p-2">Latin + accents (á, é, í, ó, ú, ñ)</td>
 <td className="border border-border p-2">Hola Mundo</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">French</td>
 <td className="border border-border p-2"><code>fra</code></td>
 <td className="border border-border p-2">Latin + diacritics (ç, é, è, à)</td>
 <td className="border border-border p-2">Bonjour le monde</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">German</td>
 <td className="border border-border p-2"><code>deu</code></td>
 <td className="border border-border p-2">Latin + umlauts (ä, ö, ü, ß)</td>
 <td className="border border-border p-2">Hallo Welt</td>
 </tr>
 </tbody>
 </table>

 <h3 className="text-xl font-semibold text-foreground">Common Use Cases</h3>
 <ul className="list-disc pl-5 space-y-1">
 <li><strong>Digitizing Receipts</strong> — Scan receipts or invoices to extract prices, dates, and store details into spreadsheet rows.</li>
 <li><strong>Screenshot Transcription</strong> — Copy text snippets directly from screenshots when copy-paste is disabled on a webpage.</li>
 <li><strong>Document Archiving</strong> — Convert scanned PDF pages or physical letters into editable TXT files.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* ─── FAQ ─── */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"How does Tesseract.js OCR extract text?",
 answer:"Tesseract.js loads compiled WebAssembly binaries of the Google Tesseract OCR engine directly into your browser. When you load an image, it analyzes patterns of dark and light pixels, identifies characters based on pre-trained language models, and outputs them as digital text.",
 },
 {
 question:"Which image formats are supported for OCR?",
 answer:"The tool supports PNG, JPG, JPEG, WEBP, and BMP. High-contrast images with clean borders process best.",
 },
 {
 question:"Are my images uploaded to external servers?",
 answer:"No, all OCR computations happen entirely inside your browser tab on your device. We do not transmit or store your images or extracted text on any server, keeping your sensitive documents completely private.",
 },
 {
 question:"What languages can the OCR engine read?",
 answer:"This version is optimized for English, but the core Tesseract.js library supports over 100 languages. Keep the text clean, well-lit, and in high resolution for maximum character recognition accuracy.",
 },
 {
 question:"Why is some text extracted incorrectly?",
 answer:"OCR accuracy depends highly on image quality. Low resolution, fuzzy text, complex cursive fonts, and dark shadows can interfere with the engine's ability to map characters. Ensure your image has good lighting and high contrast for best results.",
 },
 ]}
 />

 <RelatedTools currentToolUrl="/tools/image/image-to-text" max={6} />
 </div>
 );
 }
