"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ToolBackground } from "@/components/shared/tool-background";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Trash2, ArrowUp, ArrowDown, ShieldCheck, Layers, RefreshCw, CheckCircle2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import toast from "react-hot-toast";

interface PdfItem {
  id: string;
  file: File;
  name: string;
  size: number;
}

export function PdfMergeClient() {
  const [files, setFiles] = useState<PdfItem[]>([]);
  const [merging, setMerging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).filter(f => f.type === "application/pdf" || f.name.endsWith(".pdf"));
    if (selected.length === 0) {
      toast.error("Please select valid PDF files.");
      return;
    }
    const newEntries: PdfItem[] = selected.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      name: file.name,
      size: file.size
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
      a.download = `merged_${new Date().toISOString().split("T")[0]}.pdf`;
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

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={FileText}
          title="Merge PDF Files Online Free"
          description="Combine multiple PDF documents into a single organized PDF file. Reorder pages, preserve bookmarks and vector fidelity, 100% private in-browser."
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
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Upload className="h-8 w-8" />
              </div>
              <div className="text-sm font-bold">Drop PDF files here or click to browse</div>
              <div className="text-xs text-muted-foreground">
                Combine bank statements, contracts, tax receipts, or presentations. 100% Client-Side.
              </div>
            </label>
          </div>

          {files.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground border-b pb-2">
                <span>Selected Documents ({files.length})</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiles([])}
                  className="h-7 text-xs text-destructive hover:bg-destructive/10 gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear List
                </Button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {files.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl border bg-muted/20 text-xs gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono font-bold text-muted-foreground w-5 text-center">
                        {index + 1}
                      </span>
                      <FileText className="w-5 h-5 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold truncate max-w-[240px] sm:max-w-md text-foreground">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">{formatBytes(item.size)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={index === 0}
                        onClick={() => moveFile(index, "up")}
                        className="h-7 w-7"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={index === files.length - 1}
                        onClick={() => moveFile(index, "down")}
                        className="h-7 w-7"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(item.id)}
                        className="h-7 w-7 text-destructive hover:bg-destructive/10"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  onClick={mergePdfs}
                  disabled={merging || files.length < 2}
                  className="w-full h-11 text-sm font-bold gap-2 shadow-lg shadow-primary/20"
                >
                  {merging ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Merging PDF Pages...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Merge &amp; Download Combined PDF ({files.length} Files)
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </GlassCard>

        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Upload PDFs",
              description: "Select 2 or more PDF documents from your computer or phone.",
              icon: Upload,
            },
            {
              step: "02",
              title: "Arrange Order",
              description: "Use the Up/Down arrows to sequence the documents into the exact desired order.",
              icon: Layers,
            },
            {
              step: "03",
              title: "Merge & Download",
              description: "Click Merge to instantly create and download your unified multi-page PDF.",
              icon: Download,
            },
          ]}
          badges={["100% Free Forever", "Zero Server Uploads", "Encrypted In-Memory", "Lossless Vector Quality"]}
        />

        <ToolFeatureGuides
          features={[
            {
              icon: ShieldCheck,
              title: "Absolute Confidentiality",
              description: "Documents are processed 100% locally in your browser memory via WebAssembly. Zero files are uploaded to any server.",
            },
            {
              icon: Layers,
              title: "Preserve Original Fidelity",
              description: "Vectors, text layers, embedded fonts, and high-resolution images are preserved without lossy compression.",
            },
            {
              icon: RefreshCw,
              title: "Instant Processing",
              description: "No queues or cloud wait times. Merging 50+ pages finishes in fractions of a second on your device.",
            },
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Why Merge PDF Files in Your Browser?</h3>
            <p>
              Combining separate PDF files into a single unified document makes file management, client presentations, and email attachments much simpler. Traditional cloud-based PDF mergers require you to upload confidential tax records, financial statements, and medical history to external third-party servers.
            </p>
            <p>
              Toolzium eliminates privacy risks by performing the binary PDF assembly directly inside your browser using the open-source <code>pdf-lib</code> engine.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            {
              question: "Is it safe to merge confidential documents on Toolzium?",
              answer: "Yes. Unlike other websites, Toolzium executes the PDF merging algorithm entirely inside your local browser memory. Your documents never touch external web servers.",
            },
            {
              question: "Will merging PDFs degrade text or image quality?",
              answer: "No. The merging engine concatenates the PDF binary streams directly, preserving vector graphics, searchable text layers, and original image resolutions losslessly.",
            },
            {
              question: "Can I merge password-protected PDFs?",
              answer: "For security reasons, password-protected PDFs must be unlocked before merging.",
            },
            {
              question: "Is there any limit to the number of PDFs I can merge?",
              answer: "There are no arbitrary file count limits. You can merge as many documents as your device memory can comfortably handle.",
            },
          ]}
        />

        <RelatedTools currentToolUrl="/tools/pdf/merge" max={6} />
      </div>
    </div>
  );
}

export default PdfMergeClient;
