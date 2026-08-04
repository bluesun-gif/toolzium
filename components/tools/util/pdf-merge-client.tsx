"use client";

import React, { useState, useRef, useCallback } from "react";
import { Merge, Upload, Trash2, ArrowUp, ArrowDown, FileText, AlertCircle } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";

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
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFiles = (newFiles: FileList | File[]) => {
    setError(null);
    const validFiles = Array.from(newFiles).filter(
      (file) => file.type === "application/pdf"
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
      fileInputRef.current.value = "";
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
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged-document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("An error occurred while merging the PDFs. Some files might be encrypted or corrupted.");
    } finally {
      setIsMerging(false);
    }
  };

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
            className={"border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-colors cursor-pointer " + (isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50")}
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
                <Upload className="h-8 w-8" />
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
              <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
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
                      <FileText className="h-6 w-6" />
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
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => moveDown(index)}
                        disabled={index === files.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <ActionButton
                  icon={Merge}
                  label={isMerging ? "Merging..." : "Merge PDFs"}
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
    </div>
  );
}
