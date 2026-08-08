"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, RotateCw, RotateCcw } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import toast from "react-hot-toast";

export default function PdfRotateClient() {
  const [file, setFile] = useState<File | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [rotating, setRotating] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selected = e.target.files[0];
    if (selected.type !== "application/pdf") {
      toast.error("Please select a valid PDF file.");
      return;
    }
    setFile(selected);
    toast.success("PDF selected.");
  };

  const rotatePdf = async () => {
    if (!file) return;

    setRotating(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotationAngle) % 360));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `rotated_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`PDF pages rotated by ${rotationAngle}° & downloaded!`);
    } catch (err) {
      console.error(err);
      toast.error("Error rotating PDF pages.");
    } finally {
      setRotating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={FileText}
        title="PDF Page Rotate Studio"
        description="Rotate PDF pages 90°, 180°, or 270° clockwise or counter-clockwise. 100% client-side."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-rotate-upload"
          />
          <label htmlFor="pdf-rotate-upload" className="cursor-pointer flex flex-col items-center space-y-3">
            <Upload className="h-10 w-10 text-primary animate-bounce" />
            <div className="text-sm font-semibold">
              {file ? file.name : "Click to select a PDF file to rotate"}
            </div>
          </label>
        </div>

        {file && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Rotation Direction & Angle:</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  type="button"
                  variant={rotationAngle === 90 ? "default" : "outline"}
                  onClick={() => setRotationAngle(90)}
                  className="gap-2 font-semibold"
                >
                  <RotateCw className="h-4 w-4" />
                  90° Right
                </Button>
                <Button
                  type="button"
                  variant={rotationAngle === 180 ? "default" : "outline"}
                  onClick={() => setRotationAngle(180)}
                  className="gap-2 font-semibold"
                >
                  <RotateCw className="h-4 w-4" />
                  180° Flip
                </Button>
                <Button
                  type="button"
                  variant={rotationAngle === 270 ? "default" : "outline"}
                  onClick={() => setRotationAngle(270)}
                  className="gap-2 font-semibold"
                >
                  <RotateCcw className="h-4 w-4" />
                  90° Left
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={rotatePdf}
                disabled={rotating}
                className="gap-2 font-bold h-11 px-6 shadow-md"
              >
                <Download className="h-4 w-4" />
                {rotating ? "Rotating PDF..." : "Rotate & Download PDF"}
              </Button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
