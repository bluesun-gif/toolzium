"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Download } from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";
import toast from "react-hot-toast";

export default function PdfSignFillClient() {
  const [file, setFile] = useState<File | null>(null);
  const [signatureText, setSignatureText] = useState<string>("John Doe");
  const [signingDate, setSigningDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [processing, setProcessing] = useState(false);

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

  const signPdf = async () => {
    if (!file || !signatureText.trim()) {
      toast.error("Please enter a signature name.");
      return;
    }

    setProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const pages = pdfDoc.getPages();

      if (pages.length > 0) {
        const lastPage = pages[pages.length - 1];
        lastPage.drawText(`Signed by: ${signatureText} | Date: ${signingDate}`, {
          x: 40,
          y: 40,
          size: 11,
          color: rgb(0.1, 0.3, 0.8),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `signed_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Signature stamped & PDF downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Error signing PDF file.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={FileText}
        title="Sign & Fill PDF Studio"
        description="Add digital text signatures and date stamps to contracts, agreements, and forms. 100% client-side."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-sign-upload"
          />
          <label htmlFor="pdf-sign-upload" className="cursor-pointer flex flex-col items-center space-y-3">
            <Upload className="h-10 w-10 text-primary animate-bounce" />
            <div className="text-sm font-semibold">
              {file ? file.name : "Click to select a PDF file to sign"}
            </div>
          </label>
        </div>

        {file && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground block">Signature Name / Text:</label>
                <Input
                  type="text"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  placeholder="e.g. John H. Doe"
                  className="h-11 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground block">Signing Date:</label>
                <Input
                  type="date"
                  value={signingDate}
                  onChange={(e) => setSigningDate(e.target.value)}
                  className="h-11 font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={signPdf}
                disabled={processing || !signatureText.trim()}
                className="gap-2 font-bold h-11 px-6 shadow-md"
              >
                <Download className="h-4 w-4" />
                {processing ? "Signing PDF..." : "Stamp Signature & Download PDF"}
              </Button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
