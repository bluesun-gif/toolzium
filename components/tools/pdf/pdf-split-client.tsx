"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Download, SplitSquareHorizontal, Shield, Settings2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import toast from "react-hot-toast";

import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

export default function PdfSplitClient() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageRange, setPageRange] = useState<string>("1");
  const [splitting, setSplitting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selected = e.target.files[0];
    if (selected.type !== "application/pdf") {
      toast.error("Please select a valid PDF file.");
      return;
    }

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const count = pdf.getPageCount();
      setFile(selected);
      setTotalPages(count);
      setPageRange(`1-${count}`);
      toast.success(`PDF loaded (${count} pages).`);
    } catch (err) {
      toast.error("Failed to read PDF file.");
    }
  };

  const splitPdf = async () => {
    if (!file || totalPages === 0) return;

    setSplitting(true);

    try {
      const buffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(buffer);
      const newPdf = await PDFDocument.create();

      // Parse range e.g. "1-3, 5"
      const pagesToExtract: number[] = [];
      const parts = pageRange.split(",");

      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes("-")) {
          const [startStr, endStr] = trimmed.split("-");
          const start = Math.max(1, parseInt(startStr, 10));
          const end = Math.min(totalPages, parseInt(endStr, 10));
          for (let i = start; i <= end; i++) {
            pagesToExtract.push(i - 1);
          }
        } else {
          const p = parseInt(trimmed, 10);
          if (p >= 1 && p <= totalPages) {
            pagesToExtract.push(p - 1);
          }
        }
      }

      if (pagesToExtract.length === 0) {
        toast.error("No valid pages selected.");
        setSplitting(false);
        return;
      }

      const copied = await newPdf.copyPages(srcPdf, pagesToExtract);
      copied.forEach((page) => newPdf.addPage(page));

      const newPdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(newPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `extracted_pages_${pageRange.replace(/\s+/g, "")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("PDF pages extracted & downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Error splitting PDF.");
    } finally {
      setSplitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        icon={FileText}
        title="PDF Split & Extract Studio"
        description="Extract specific pages or page ranges from any PDF document. 100% client-side, private & secure."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-split-upload"
          />
          <label htmlFor="pdf-split-upload" className="cursor-pointer flex flex-col items-center space-y-3">
            <Upload className="h-10 w-10 text-primary animate-bounce" />
            <div className="text-sm font-semibold">
              {file ? file.name : "Click to select a PDF file to split"}
            </div>
            {totalPages > 0 && (
              <div className="text-xs text-primary font-bold">Total Pages: {totalPages}</div>
            )}
          </label>
        </div>

        {file && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">
                Pages to Extract (e.g., "1-3, 5" or "2, 4, 6"):
              </label>
              <Input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="e.g. 1-3, 5"
                className="h-11 font-medium"
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={splitPdf}
                disabled={splitting || !file}
                className="gap-2 font-bold h-11 px-6 shadow-md"
              >
                <Download className="h-4 w-4" />
                {splitting ? "Extracting Pages..." : "Extract & Download Selected Pages"}
              </Button>
            </div>
          </div>
        )}
      </GlassCard>

      <ToolHowItWorks
        title="How to Split and Extract PDF Pages"
        badges={["100% Free", "Client-Side Privacy", "Page Selection"]}
        steps={[
          {
            step: "Step 1",
            title: "Upload Your PDF",
            description: "Select the PDF file you want to split or extract pages from. Your file never leaves your device.",
            icon: Upload,
          },
          {
            step: "Step 2",
            title: "Select Pages or Ranges",
            description: "Enter the specific page numbers or page ranges you want to extract (e.g., '1-3, 5').",
            icon: Settings2,
          },
          {
            step: "Step 3",
            title: "Download New File",
            description: "Click extract to instantly generate and download a new PDF containing only your selected pages.",
            icon: Download,
          },
        ]}
      />

      <ToolFeatureGuides
        features={[
          {
            title: "Custom Page Ranges",
            description: "Easily extract contiguous page ranges using simple notation like '2-5'. Perfect for grabbing specific chapters or sections.",
            icon: SplitSquareHorizontal,
          },
          {
            title: "Single Page Extraction",
            description: "Need just one or a few scattered pages? Extract individual pages by separating them with commas like '1, 4, 7'.",
            icon: FileText,
          },
          {
            title: "100% Private Processing",
            description: "Your PDFs are processed entirely in your browser. We never upload your sensitive documents to any external servers.",
            icon: Shield,
          },
        ]}
      >
        <h3 className="text-xl font-bold mb-4">Mastering PDF Page Splitting</h3>
        <p className="text-muted-foreground mb-4">
          Dealing with massive, multi-hundred page PDF documents can be a nightmare when you only need a few specific pages to share with a colleague or submit for a project. PDF splitting is a critical workflow tool for professionals, students, and anyone dealing with digital documents. Our tool makes this process seamless and secure.
        </p>
        <p className="text-muted-foreground">
          By utilizing a client-side approach, we ensure that your sensitive invoices, legal contracts, and personal records never touch an external server. You can mix and match single pages and ranges effortlessly, creating tailored documents that contain exactly the information you need and nothing you don't.
        </p>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "How do I split by a specific page range?",
            answer: "Simply enter the start and end page numbers separated by a hyphen in the input field. For example, entering '5-10' will extract pages 5 through 10 and combine them into a single new PDF document.",
          },
          {
            question: "Can I extract multiple single pages at once?",
            answer: "Yes! You can extract individual pages by listing them separated by commas. For example, entering '1, 3, 5' will pull out those specific pages and merge them into a new file.",
          },
          {
            question: "Will extracting pages reduce the quality of my PDF?",
            answer: "No, our extraction process preserves the exact quality, resolution, and formatting of the original pages. The newly generated PDF will be visually identical to the source pages.",
          },
          {
            question: "Are my files uploaded to your servers for processing?",
            answer: "Absolutely not. The entire splitting and extraction process happens locally within your web browser using JavaScript. Your files are never uploaded, stored, or processed on our servers, ensuring complete privacy.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/pdf/pdf-split" />
    </div>
  );
}
