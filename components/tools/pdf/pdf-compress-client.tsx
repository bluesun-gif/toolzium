"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download } from "lucide-react";
import toast from "react-hot-toast";

const QUALITY_PRESETS = [
  { label: "Maximum (≈90%)", dpi: 150, jpegQ: 0.9 },
  { label: "High (≈70%)", dpi: 120, jpegQ: 0.75 },
  { label: "Medium (≈50%)", dpi: 96, jpegQ: 0.6 },
  { label: "Small File (≈30%)", dpi: 72, jpegQ: 0.45 },
];

export default function PdfCompressClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState(1); // High by default
  const [compressing, setCompressing] = useState(false);
  const [stats, setStats] = useState<{ orig: number; newSize: number } | null>(null);
  const [progress, setProgress] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected || selected.type !== "application/pdf") {
      toast.error("Please select a valid PDF file.");
      return;
    }
    setFile(selected);
    setStats(null);
    toast.success(`"${selected.name}" selected.`);
  };

  const compressPdf = async () => {
    if (!file) return;

    setCompressing(true);
    setStats(null);

    try {
      const { dpi, jpegQ } = QUALITY_PRESETS[preset];

      // Load pdf.js via CDN
      const pdfjsLib = (await import("pdfjs-dist")).default ?? (await import("pdfjs-dist"));
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.min.mjs`;

      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const numPages = pdf.numPages;

      // We'll use pdf-lib to stitch compressed page images into a new PDF
      const { PDFDocument } = await import("pdf-lib");
      const outPdf = await PDFDocument.create();

      const scale = dpi / 96; // 96 is the base DPI

      for (let i = 1; i <= numPages; i++) {
        setProgress(`Compressing page ${i} of ${numPages}…`);

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        const ctx = canvas.getContext("2d")!;

        await page.render({ canvasContext: ctx, canvas, viewport } as any).promise;

        // Convert to compressed JPEG
        const jpegDataUrl = canvas.toDataURL("image/jpeg", jpegQ);
        const jpegResp = await fetch(jpegDataUrl);
        const jpegBuf = await jpegResp.arrayBuffer();

        // Embed in output PDF
        const img = await outPdf.embedJpg(jpegBuf);
        const rawViewport = page.getViewport({ scale: 1 });
        const pdfPage = outPdf.addPage([rawViewport.width, rawViewport.height]);
        pdfPage.drawImage(img, {
          x: 0,
          y: 0,
          width: rawViewport.width,
          height: rawViewport.height,
        });
      }

      setProgress("Saving compressed PDF…");
      const outBytes = await outPdf.save();
      const origSize = file.size;
      const newSize = outBytes.length;

      // Download
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStats({ orig: origSize, newSize });
      toast.success("PDF compressed & downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Error compressing PDF. Try a different file.");
    } finally {
      setCompressing(false);
      setProgress("");
    }
  };

  const { label: presetLabel } = QUALITY_PRESETS[preset];

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={FileText}
        title="PDF Compress Studio"
        description="Genuinely reduce PDF file size by re-rendering pages at optimized resolution. 100% client-side — files never leave your browser."
      />

      <GlassCard className="p-6 space-y-5">
        {/* Upload */}
        <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="pdf-compress-upload" />
          <label htmlFor="pdf-compress-upload" className="cursor-pointer flex flex-col items-center space-y-3">
            <Upload className="h-10 w-10 text-primary animate-bounce" />
            <div className="text-sm font-semibold">
              {file ? file.name : "Click to upload a PDF to compress"}
            </div>
            {file && (
              <div className="text-xs text-muted-foreground">Original size: {(file.size / 1024).toFixed(1)} KB</div>
            )}
          </label>
        </div>

        {/* Quality preset */}
        {file && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Compression Quality:</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {QUALITY_PRESETS.map((p, i) => (
                <Button
                  key={i}
                  type="button"
                  size="sm"
                  variant={preset === i ? "default" : "outline"}
                  onClick={() => setPreset(i)}
                  className="text-xs font-semibold h-9"
                >
                  {p.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              ⚠️ Compression works by re-rendering pages as images. Text will remain visible but won't be selectable in the output. Best for scanned PDFs and image-heavy documents.
            </p>
          </div>
        )}

        {/* Progress */}
        {compressing && progress && (
          <div className="text-xs font-semibold text-primary animate-pulse">{progress}</div>
        )}

        {/* Result stats */}
        {stats && (
          <div className="p-4 rounded-xl border bg-background/60 text-center space-y-1">
            <div className="text-xs font-bold text-foreground">Compression Complete!</div>
            <div className="text-sm font-bold text-primary">
              {(stats.orig / 1024).toFixed(1)} KB → {(stats.newSize / 1024).toFixed(1)} KB
              {stats.newSize < stats.orig ? (
                <span className="text-green-600 ml-2">
                  (↓ {(((stats.orig - stats.newSize) / stats.orig) * 100).toFixed(1)}% saved)
                </span>
              ) : (
                <span className="text-amber-500 ml-2">(file was already optimized)</span>
              )}
            </div>
          </div>
        )}

        {/* Compress button */}
        {file && (
          <div className="flex justify-end pt-2">
            <Button
              onClick={compressPdf}
              disabled={compressing}
              className="gap-2 font-bold h-11 px-6 shadow-md"
            >
              <Download className="h-4 w-4" />
              {compressing ? "Compressing…" : `Compress & Download (${presetLabel})`}
            </Button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
