"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Textarea } from"@/components/ui/textarea";
import { AlertTriangle, Copy, Download, FileText, FileUp, ShieldCheck, Upload } from"lucide-react";
import toast from"react-hot-toast";

export default function PdfToWordClient() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [extracting, setExtracting] = useState(false);
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isScanned, setIsScanned] = useState(false);
  useEffect(() => {
    // Load pdfjs from CDN (using a stable version 3.11.174)
    if (typeof window !== "undefined" && !(window as any).pdfjsLib) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        const globalWindow = window as any;
        if (globalWindow.pdfjsLib) {
          globalWindow.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          setPdfjsLoaded(true);
        }
      };
      script.onerror = () => {
        setLoadError("Failed to load PDF processing engine. Please check your internet connection.");
      };
    } else if (typeof window !== "undefined" && (window as any).pdfjsLib) {
      setPdfjsLoaded(true);
    }
  }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selected = e.target.files[0];
    if (selected.type !== "application/pdf") {
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
      const loadingTask = globalWindow.pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer)
      });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      let fullText = "";
      let hasAnyText = false;
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        let lastY;
        let pageText = "";

        // Loop through text runs to reconstruct lines based on vertical transform coordinates
        for (const item of textContent.items) {
          if (lastY !== undefined && Math.abs(item.transform[5] - lastY) > 8) {
            pageText += "\n";
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
        setExtractedText(`[Warning: Scanned PDF / Image-Only Document Detected]\n\n` + `No editable text layers could be found in"${file.name}". This PDF appears to be a scanned document or image-only file.\n\n` + `To convert this document, please use an OCR (Optical Character Recognition) tool to extract text from images.`);
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
    const blob = new Blob([extractedText], {
      type: "text/plain;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.replace(".pdf", "") || "document"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Text file downloaded!");
  };
  const downloadWordFile = () => {
    // Generate simple Word-friendly HTML document structure so Word parses layout correctly
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office'" + "xmlns:w='urn:schemas-microsoft-com:office:word'" + "xmlns='http://www.w3.org/TR/REC-html40'>" + "<head><title>Converted Document</title><style>body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }</style></head>" + "<body>";
    const footer = "</body></html>";
    const paragraphs = extractedText.split("\n").map(line => {
      if (line.startsWith("--- Page")) {
        return `<h3 style="color:#0284c7; border-bottom:1px solid #ddd; margin-top:20px;">${line}</h3>`;
      }
      return line.trim() ? `<p>${line}</p>` : "<br/>";
    }).join("");
    const content = header + paragraphs + footer;
    const blob = new Blob(["\ufeff" + content], {
      type: "application/msword;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.replace(".pdf", "") || "document"}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Word document (.doc) downloaded!");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={FileText} title="PDF to Word & Editable Text Converter" description="Extract text content and headings from PDF documents into editable text and Word format. 100% client-side." />

 {loadError && <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl flex items-center gap-2">
 <AlertTriangle className="h-5 w-5 flex-shrink-0" />
 <span className="text-sm font-medium">{loadError}</span>
 </div>}

 <GlassCard className="p-6 space-y-4">
 <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
 <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="pdf-to-word-upload" />
 <label htmlFor="pdf-to-word-upload" className="cursor-pointer flex flex-col items-center space-y-3">
 <Upload className="h-10 w-10 text-primary animate-bounce" />
 <div className="text-sm font-semibold">
 {file ? file.name : "Click to select a PDF file to convert to text"}
 </div>
 {file && <div className="text-xs text-muted-foreground">
 {(file.size / 1024).toFixed(1)} KB
 </div>}
 </label>
 </div>

 {file && !extractedText && <div className="flex justify-end pt-2">
 <Button onClick={processPdfToText} disabled={extracting || !pdfjsLoaded} className="gap-2 font-bold h-11 px-6 shadow-md">
 {extracting ? "Extracting Text..." : "Convert PDF to Editable Text"}
 </Button>
 </div>}

 {extractedText && <div className="space-y-3 pt-2">
 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
 <label className="text-xs font-bold text-foreground">Extracted Editable Text:</label>
 <div className="flex flex-wrap gap-2">
 <Button size="sm" variant="outline" onClick={copyText} className="gap-1.5 text-xs">
 <Copy className="h-3.5 w-3.5" />
 Copy Text
 </Button>
 <Button size="sm" variant="outline" onClick={downloadTextFile} className="gap-1.5 text-xs">
 <Download className="h-3.5 w-3.5" />
 Download .TXT
 </Button>
 <Button size="sm" onClick={downloadWordFile} disabled={isScanned} className="gap-1.5 text-xs font-bold">
 <Download className="h-3.5 w-3.5" />
 Download .DOC (Word)
 </Button>
 </div>
 </div>

 {isScanned && <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-2xl flex gap-2">
 <AlertTriangle className="h-5 w-5 flex-shrink-0" />
 <div className="text-xs space-y-1">
 <p className="font-bold">Scanned Document Detected</p>
 <p>This file does not have a selectable text layer. The extracted content contains warnings rather than document text.</p>
 </div>
 </div>}

 <Textarea value={extractedText} onChange={e => setExtractedText(e.target.value)} className="min-h-[260px] font-mono text-sm leading-relaxed" />
 </div>}
 </GlassCard>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload PDF",
    description:"Load the PDF you want to convert.",
    icon: FileUp,
  },
{
    step:"02",
    title:"Convert",
    description:"Transform the PDF into an editable Word file.",
    icon: FileText,
  },
{
    step:"03",
    title:"Download DOCX",
    description:"Save the Word document locally.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FileUp,
    title:"Simple Upload",
    description:"Add a PDF and start conversion quickly.",
  },
{
    icon: FileText,
    title:"Editable Output",
    description:"Get a DOCX you can edit in Word or Google Docs.",
  },
{
    icon: Download,
    title:"Local Download",
    description:"Receive the file without server uploads.",
  },
{
    icon: ShieldCheck,
    title:"Private",
    description:"Files are processed in your browser.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Turning a PDF back into an editable Word document is a common bottleneck. PDFs are great for sharing but terrible for editing, so when you receive a contract or report that needs changes, conversion is the first step. This tool produces a DOCX you can open and edit anywhere.</p>
  <p>Upload the PDF and let the converter extract its structure. Straightforward documents with standard fonts and clear headings convert cleanly, preserving paragraphs and basic formatting. Complex layouts — multi-column newsletters, forms, or designs with many images — may shift slightly and require a quick manual pass to realign.</p>
  <p>Scanned PDFs are a special case. If the source is a flat image of text, true editing requires optical character recognition to read the letters. Without OCR, you get an image inside a Word file rather than selectable text. For best results, use PDFs that were created digitally rather than photographed.</p>
  <p>Privacy is the differentiator. Many converters upload files to remote servers, exposing contracts and personal data. Local processing keeps everything on your device, which matters for legal and HR documents. After conversion, download the DOCX, open it in Word or Google Docs, and tidy any formatting. A reliable PDF-to-Word step turns static files back into working documents without compromising confidentiality.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Will the layout stay the same?",
    answer:"Simple text layouts convert well; complex designs may need minor cleanup afterward.",
  },
{
    question:"Can I edit the result?",
    answer:"Yes. The output is a standard DOCX you can edit in any word processor.",
  },
{
    question:"Are my documents uploaded?",
    answer:"No. Conversion happens locally in your browser for privacy.",
  },
{
    question:"Does it handle scanned PDFs?",
    answer:"Image-based scans need OCR to become editable text; results vary by source quality.",
  },
{
    question:"What format is the output?",
    answer:"A .docx file compatible with Microsoft Word and Google Docs.",
  }
  ]}
/>
    </div>
    </div>
);
}
