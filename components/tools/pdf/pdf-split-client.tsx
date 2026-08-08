"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import toast from "react-hot-toast";

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
    <div className="space-y-6 max-w-4xl mx-auto px-4">
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
    </div>
  );
}
