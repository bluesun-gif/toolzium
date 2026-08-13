"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Trash2, ArrowUp, ArrowDown, ArrowUpDown, FileDown, ShieldCheck, Layers } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
export default function PdfMergeClient() {
  const [files, setFiles] = useState<{
    id: string;
    file: File;
    pagesCount?: number;
  }[]>([]);
  const [merging, setMerging] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).filter(f => f.type === "application/pdf");
    if (selected.length === 0) {
      toast.error("Please select valid PDF files.");
      return;
    }
    const newEntries = selected.map(file => ({
      id: Math.random().toString(36).substring(7),
      file
    }));
    setFiles(prev => [...prev, ...newEntries]);
    toast.success(`Added ${selected.length} PDF file(s).`);
  };
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };
  const moveFile = (index: number, direction: "up" | "down") => {
    setFiles(prev => {
      const copy = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };
  const mergePdfs = async () => {
    if (files.length < 2) {
      toast.error("Please add at least 2 PDF files to merge.");
      return;
    }
    setMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], {
        type: "application/pdf"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged_document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("PDFs merged & downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to merge PDFs. Ensure files are unencrypted.");
    } finally {
      setMerging(false);
    }
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={FileText} title="PDF Merge Studio" description="Combine multiple PDF documents into a single organized PDF file. 100% client-side, fast & secure." />

 <GlassCard className="p-6 space-y-4">
 <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
 <input type="file" accept="application/pdf" multiple onChange={handleFileChange} className="hidden" id="pdf-upload" />
 <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center space-y-3">
 <Upload className="h-10 w-10 text-primary animate-bounce" />
 <div className="text-sm font-semibold">Click to upload PDF files</div>
 <div className="text-xs text-muted-foreground">Supports multiple PDF files. Files never leave your browser.</div>
 </label>
 </div>

 {files.length > 0 && <div className="space-y-2 pt-2">
 <div className="text-xs font-bold text-foreground">Files to Merge ({files.length}):</div>
 <div className="space-y-2">
 {files.map((item, index) => <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border bg-background/60 text-sm font-medium">
 <div className="flex items-center space-x-3 truncate">
 <FileText className="h-5 w-5 text-primary shrink-0" />
 <span className="truncate">{item.file.name}</span>
 <span className="text-xs text-muted-foreground">({(item.file.size / 1024).toFixed(1)} KB)</span>
 </div>

 <div className="flex items-center space-x-1 shrink-0">
 <Button size="sm" variant="ghost" onClick={() => moveFile(index, "up")} disabled={index === 0} className="h-8 w-8 p-0">
 <ArrowUp className="h-4 w-4" />
 </Button>
 <Button size="sm" variant="ghost" onClick={() => moveFile(index, "down")} disabled={index === files.length - 1} className="h-8 w-8 p-0">
 <ArrowDown className="h-4 w-4" />
 </Button>
 <Button size="sm" variant="ghost" onClick={() => removeFile(item.id)} className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
 <Trash2 className="h-4 w-4" />
 </Button>
 </div>
 </div>)}
 </div>

 <div className="flex justify-end pt-4">
 <Button onClick={mergePdfs} disabled={merging || files.length < 2} className="gap-2 font-bold h-11 px-6 shadow-md">
 <Download className="h-4 w-4" />
 {merging ? "Merging PDFs..." : "Merge & Download PDF"}
 </Button>
 </div>
 </div>}
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "Step 1",
        title: "Upload PDFs",
        description: "Select multiple PDF files into the tool.",
        icon: Upload
      }, {
        step: "Step 2",
        title: "Arrange Order",
        description: "Reorder your files using the up and down arrows.",
        icon: ArrowUpDown
      }, {
        step: "Step 3",
        title: "Download",
        description: "Click merge and download your single PDF file instantly.",
        icon: FileDown
      }]} badges={["100% Free", "Client-Side Privacy", "No File Limits"]} />

 <ToolFeatureGuides features={[{
        title: "Drag and Drop Reordering",
        description: "Easily rearrange your PDF documents before merging.",
        icon: ArrowUpDown
      }, {
        title: "Local Browser Processing",
        description: "Files are processed directly in your browser ensuring maximum privacy.",
        icon: ShieldCheck
      }, {
        title: "Multi-Format Support",
        description: "Merge any standard PDF versions with no restrictive limits.",
        icon: Layers
      }]}>
 <p>Merging PDFs is an essential workflow tool for students, professionals, and businesses alike. Combining multiple documents such as invoices, reports, or chapters into a single file makes sharing and storage significantly more manageable.</p>
 <p>Our PDF merge tool executes all processing locally on your device, meaning your sensitive documents are never uploaded to our servers. This ensures 100% privacy and blazing fast performance, regardless of how many files you need to combine.</p>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Is there a file size limit?",
        answer: "Since all processing happens locally in your browser, the only limit is your device's memory. There are no artificial limits imposed by our tool."
      }, {
        question: "How do I change the page order?",
        answer: "You can reorder the PDF files using the up and down arrows next to each file. The merged PDF will follow the top-to-bottom sequence you set."
      }, {
        question: "Can I merge password-protected PDFs?",
        answer: "Currently, our tool requires PDFs to be unencrypted before merging. You'll need to remove passwords from your files first."
      }, {
        question: "Are my files uploaded to any server?",
        answer: "No, absolutely not. All PDF processing is performed securely on your own device."
      }]} />

 <RelatedTools currentToolUrl="/tools/pdf/pdf-merge" />
 </div></div>;
}