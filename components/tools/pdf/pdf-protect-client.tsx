"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Upload, Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { encryptPDF } from "@pdfsmaller/pdf-encrypt";
import toast from "react-hot-toast";

export default function PdfProtectClient() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [protecting, setProtecting] = useState(false);

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

  const protectPdf = async () => {
    if (!file || !password.trim()) {
      toast.error("Please enter a password.");
      return;
    }

    setProtecting(true);

    try {
      const buffer = await file.arrayBuffer();
      
      // Load standard PDF bytes using pdf-lib (to verify/optimize the document structure)
      const pdfDoc = await PDFDocument.load(buffer);
      const pdfBytes = await pdfDoc.save();

      // Now encrypt the PDF bytes with user password (AES-256)
      const encryptedBytes = await encryptPDF(new Uint8Array(pdfBytes), password);

      const blob = new Blob([encryptedBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `protected_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("PDF password protection applied & downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Error protecting PDF file. Make sure it is not already encrypted.");
    } finally {
      setProtecting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Lock}
        title="Protect & Lock PDF Studio"
        description="Encrypt and add password protection to sensitive PDF documents. 100% client-side, private & secure."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/40">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-protect-upload"
          />
          <label htmlFor="pdf-protect-upload" className="cursor-pointer flex flex-col items-center space-y-3">
            <Upload className="h-10 w-10 text-primary animate-bounce" />
            <div className="text-sm font-semibold">
              {file ? file.name : "Click to select a PDF file to encrypt"}
            </div>
          </label>
        </div>

        {file && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Enter Protection Password:</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set document password..."
                className="h-11 font-medium"
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={protectPdf}
                disabled={protecting || !password.trim()}
                className="gap-2 font-bold h-11 px-6 shadow-md"
              >
                <Download className="h-4 w-4" />
                {protecting ? "Encrypting PDF..." : "Protect & Download Encrypted PDF"}
              </Button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
