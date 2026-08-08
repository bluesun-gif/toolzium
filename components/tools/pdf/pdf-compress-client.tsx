"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import toast from "react-hot-toast";

export default function PdfCompressClient() {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [savedStats, setSavedStats] = useState<{ orig: number; newSize: number } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selected = e.target.files[0];
    if (selected.type !== "application/pdf") {
      toast.error("Please select a valid PDF file.");
      return;
    }
    setFile(selected);
    setSavedStats(null);
    toast.success("PDF file selected.");
  };

  const compressPdf = async () => {
    if (!file) return;

    setCompressing(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);

      // Re-encode PDF structure
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });

      setSavedStats({
        orig: file.size,
        newSize: pdfBytes.length,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("PDF compressed & downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Error compressing PDF.");
    } finally {
      setCompressing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={FileText}
        title="PDF Compress Studio"
        description="Reduce PDF file size for email attachments and uploads. 100% client-side, fast & confidential."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-compress-upload"
          />
          <label htmlFor="pdf-compress-upload" className="cursor-pointer flex flex-col items-center space-y-3">
            <Upload className="h-10 w-10 text-primary animate-bounce" />
            <div className="text-sm font-semibold">
              {file ? file.name : "Click to upload a PDF file to compress"}
            </div>
            {file && (
              <div className="text-xs text-muted-foreground">Original size: {(file.size / 1024).toFixed(1)} KB</div>
            )}
          </label>
        </div>

        {savedStats && (
          <div className="p-4 rounded-xl border bg-background/60 text-center space-y-1">
            <div className="text-xs font-bold text-foreground">Compression Complete!</div>
            <div className="text-sm text-primary font-bold">
              Reduced from {(savedStats.orig / 1024).toFixed(1)} KB to {(savedStats.newSize / 1024).toFixed(1)} KB (
              {(((savedStats.orig - savedStats.newSize) / savedStats.orig) * 100).toFixed(1)}% savings)
            </div>
          </div>
        )}

        {file && (
          <div className="flex justify-end pt-2">
            <Button
              onClick={compressPdf}
              disabled={compressing}
              className="gap-2 font-bold h-11 px-6 shadow-md"
            >
              <Download className="h-4 w-4" />
              {compressing ? "Compressing PDF..." : "Compress & Download PDF"}
            </Button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
