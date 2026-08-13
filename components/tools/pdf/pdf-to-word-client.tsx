"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Textarea } from"@/components/ui/textarea";
import { FileText, Upload, Copy, Download, AlertTriangle, Sparkles, Shield, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export default function PdfToWordClient() {
 const [file, setFile] = useState<File | null>(null);
 const [extractedText, setExtractedText] = useState<string>("");
 const [extracting, setExtracting] = useState(false);
 const [pdfjsLoaded, setPdfjsLoaded] = useState(false);
 const [loadError, setLoadError] = useState<string | null>(null);
 const [isScanned, setIsScanned] = useState(false);

 useEffect(() => {
 // Load pdfjs from CDN (using a stable version 3.11.174)
 if (typeof window !=="undefined"&& !(window as any).pdfjsLib) {
 const script = document.createElement("script");
 script.src ="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
 script.async = true;
 document.head.appendChild(script);

 script.onload = () => {
 const globalWindow = window as any;
 if (globalWindow.pdfjsLib) {
 globalWindow.pdfjsLib.GlobalWorkerOptions.workerSrc ="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
 setPdfjsLoaded(true);
 }
 };

 script.onerror = () => {
 setLoadError("Failed to load PDF processing engine. Please check your internet connection.");
 };
 } else if (typeof window !=="undefined"&& (window as any).pdfjsLib) {
 setPdfjsLoaded(true);
 }
 }, []);

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (!e.target.files || e.target.files.length === 0) return;
 const selected = e.target.files[0];
 if (selected.type !=="application/pdf") {
 toast.error("Please select a valid PDF file.");
 return;
 }
 setFile(selected);
 setExtractedText("");
 setIsScanned(false);
 toast.success("PDF selected.");
 };

 const processPdfToText = async () => {
 if (!file) return;

 if (!pdfjsLoaded) {
 toast.error("PDF processing engine is still loading. Please wait.");
 return;
 }

 setExtracting(true);
 setIsScanned(false);

 try {
 const arrayBuffer = await file.arrayBuffer();
 const globalWindow = window as any;
 
 if (!globalWindow.pdfjsLib) {
 throw new Error("PDF Library loaded from CDN was not initialized properly.");
 }

 // Load document
 const loadingTask = globalWindow.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
 const pdf = await loadingTask.promise;
 const numPages = pdf.numPages;
 let fullText ="";
 let hasAnyText = false;

 for (let i = 1; i <= numPages; i++) {
 const page = await pdf.getPage(i);
 const textContent = await page.getTextContent();
 
 let lastY;
 let pageText ="";
 
 // Loop through text runs to reconstruct lines based on vertical transform coordinates
 for (const item of textContent.items) {
 if (lastY !== undefined && Math.abs(item.transform[5] - lastY) > 8) {
 pageText +="\n";
 }
 pageText += item.str;
 lastY = item.transform[5];
 }

 if (pageText.trim()) {
 hasAnyText = true;
 }

 fullText += `--- Page ${i} ---\n\n${pageText.trim()}\n\n`;
 }

 if (!hasAnyText) {
 setIsScanned(true);
 setExtractedText(
 `[Warning: Scanned PDF / Image-Only Document Detected]\n\n` +
 `No editable text layers could be found in"${file.name}". This PDF appears to be a scanned document or image-only file.\n\n` +
 `To convert this document, please use an OCR (Optical Character Recognition) tool to extract text from images.`
 );
 toast.error("This PDF seems to be scanned (contains no selectable text).");
 } else {
 setExtractedText(fullText.trim());
 toast.success("PDF successfully converted to editable text!");
 }
 } catch (err) {
 console.error(err);
 toast.error("Error parsing PDF file.");
 } finally {
 setExtracting(false);
 }
 };

 const copyText = () => {
 navigator.clipboard.writeText(extractedText);
 toast.success("Text copied to clipboard!");
 };

 const downloadTextFile = () => {
 const blob = new Blob([extractedText], { type:"text/plain;charset=utf-8"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download = `${file?.name.replace(".pdf","") ||"document"}.txt`;
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("Text file downloaded!");
 };

 const downloadWordFile = () => {
 // Generate simple Word-friendly HTML document structure so Word parses layout correctly
 const header = 
"<html xmlns:o='urn:schemas-microsoft-com:office:office'"+
"xmlns:w='urn:schemas-microsoft-com:office:word'"+
"xmlns='http://www.w3.org/TR/REC-html40'>"+
"<head><title>Converted Document</title><style>body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }</style></head>"+
"<body>";
 const footer ="</body></html>";
 const paragraphs = extractedText
 .split("\n")
 .map((line) => {
 if (line.startsWith("--- Page")) {
 return `<h3 style="color:#0284c7; border-bottom:1px solid #ddd; margin-top:20px;">${line}</h3>`;
 }
 return line.trim() ? `<p>${line}</p>` :"<br/>";
 })
 .join("");

 const content = header + paragraphs + footer;
 const blob = new Blob(["\ufeff"+ content], { type:"application/msword;charset=utf-8"});
 const url = URL.createObjectURL(blob);
 
 const a = document.createElement("a");
 a.href = url;
 a.download = `${file?.name.replace(".pdf","") ||"document"}.doc`;
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("Word document (.doc) downloaded!");
 };

 return (
      <div className="relative space-y-6 max-w-4xl mx-auto px-4">
      <GridPattern />

 <ToolPageHeader
 icon={FileText}
 title="PDF to Word & Editable Text Converter"
 description="Extract text content and headings from PDF documents into editable text and Word format. 100% client-side."
 />

 {loadError && (
 <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl flex items-center gap-2">
 <AlertTriangle className="h-5 w-5 flex-shrink-0"/>
 <span className="text-sm font-medium">{loadError}</span>
 </div>
 )}

 <GlassCard className="p-6 space-y-4">
 <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
 <input
 type="file"
 accept="application/pdf"
 onChange={handleFileChange}
 className="hidden"
 id="pdf-to-word-upload"
 />
 <label htmlFor="pdf-to-word-upload"className="cursor-pointer flex flex-col items-center space-y-3">
 <Upload className="h-10 w-10 text-primary animate-bounce"/>
 <div className="text-sm font-semibold">
 {file ? file.name :"Click to select a PDF file to convert to text"}
 </div>
 {file && (
 <div className="text-xs text-muted-foreground">
 {(file.size / 1024).toFixed(1)} KB
 </div>
 )}
 </label>
 </div>

 {file && !extractedText && (
 <div className="flex justify-end pt-2">
 <Button
 onClick={processPdfToText}
 disabled={extracting || !pdfjsLoaded}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 {extracting ?"Extracting Text...":"Convert PDF to Editable Text"}
 </Button>
 </div>
 )}

 {extractedText && (
 <div className="space-y-3 pt-2">
 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
 <label className="text-xs font-bold text-foreground">Extracted Editable Text:</label>
 <div className="flex flex-wrap gap-2">
 <Button size="sm"variant="outline"onClick={copyText} className="gap-1.5 text-xs">
 <Copy className="h-3.5 w-3.5"/>
 Copy Text
 </Button>
 <Button size="sm"variant="outline"onClick={downloadTextFile} className="gap-1.5 text-xs">
 <Download className="h-3.5 w-3.5"/>
 Download .TXT
 </Button>
 <Button size="sm"onClick={downloadWordFile} disabled={isScanned} className="gap-1.5 text-xs font-bold">
 <Download className="h-3.5 w-3.5"/>
 Download .DOC (Word)
 </Button>
 </div>
 </div>

 {isScanned && (
 <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-2xl flex gap-2">
 <AlertTriangle className="h-5 w-5 flex-shrink-0"/>
 <div className="text-xs space-y-1">
 <p className="font-bold">Scanned Document Detected</p>
 <p>This file does not have a selectable text layer. The extracted content contains warnings rather than document text.</p>
 </div>
 </div>
 )}

 <Textarea
 value={extractedText}
 onChange={(e) => setExtractedText(e.target.value)}
 className="min-h-[260px] font-mono text-sm leading-relaxed"
 />
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
          <h3>Why Use Our PDF to Word & Editable Text Converter?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our PDF to Word & Editable Text Converter provides
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

      <RelatedTools currentToolUrl="/tools/pdf/pdf-to-word" max={6} />

</div>
 );
}
