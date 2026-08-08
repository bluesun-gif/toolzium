"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import toast from "react-hot-toast";

export default function PdfMergeClient() {
  const [files, setFiles] = useState<{ id: string; file: File; pagesCount?: number }[]>([]);
  const [merging, setMerging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).filter((f) => f.type === "application/pdf");
    if (selected.length === 0) {
      toast.error("Please select valid PDF files.");
      return;
    }

    const newEntries = selected.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
    }));

    setFiles((prev) => [...prev, ...newEntries]);
    toast.success(`Added ${selected.length} PDF file(s).`);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    setFiles((prev) => {
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
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: "application/pdf" });
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

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={FileText}
        title="PDF Merge Studio"
        description="Combine multiple PDF documents into a single organized PDF file. 100% client-side, fast & secure."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center space-y-3">
            <Upload className="h-10 w-10 text-primary animate-bounce" />
            <div className="text-sm font-semibold">Click to upload PDF files</div>
            <div className="text-xs text-muted-foreground">Supports multiple PDF files. Files never leave your browser.</div>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-foreground">Files to Merge ({files.length}):</div>
            <div className="space-y-2">
              {files.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl border bg-background/60 text-sm font-medium"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                    <span className="truncate">{item.file.name}</span>
                    <span className="text-xs text-muted-foreground">({(item.file.size / 1024).toFixed(1)} KB)</span>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveFile(index, "up")}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveFile(index, "down")}
                      disabled={index === files.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(item.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={mergePdfs}
                disabled={merging || files.length < 2}
                className="gap-2 font-bold h-11 px-6 shadow-md"
              >
                <Download className="h-4 w-4" />
                {merging ? "Merging PDFs..." : "Merge & Download PDF"}
              </Button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
