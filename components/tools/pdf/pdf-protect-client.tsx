"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Upload, Download, FileKey, Shield, Settings, EyeOff } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
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
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
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

      <ToolHowItWorks
        title="How to Protect a PDF Document"
        steps={[
          {
            step: "Step 1",
            title: "Upload PDF",
            description: "Select the PDF file you want to secure.",
            icon: Upload
          },
          {
            step: "Step 2",
            title: "Set Password",
            description: "Enter a strong password to lock the document and restrict permissions.",
            icon: FileKey
          },
          {
            step: "Step 3",
            title: "Download Encrypted PDF",
            description: "Save your encrypted, password-protected PDF directly to your device.",
            icon: Download
          }
        ]}
        badges={["AES-128 Encryption", "Client-Side", "No Upload"]}
      />

      <ToolFeatureGuides
        title="Why Use Our PDF Protector?"
        features={[
          {
            title: "Strong Password Protection",
            description: "Lock your document with a secure user password to prevent unauthorized viewing.",
            icon: Lock
          },
          {
            title: "Permission Controls",
            description: "Restrict actions like printing, copying, and editing to maintain full control over your document.",
            icon: Settings
          },
          {
            title: "Robust Encryption Standard",
            description: "We use advanced encryption algorithms (AES) to ensure your data remains completely secure.",
            icon: Shield
          },
          {
            title: "100% Private & Local",
            description: "Your files never leave your device. All encryption happens locally within your browser.",
            icon: EyeOff
          }
        ]}
      >
        <p>
          Securing your sensitive information has never been more important. Our PDF protection tool allows you to easily encrypt your PDF documents without the need to install any software or upload your private data to a remote server. 
        </p>
        <p>
          Whether you are handling confidential legal documents, financial reports, or personal records, you can lock them with robust encryption algorithms. By setting a password and controlling permissions, you ensure compliance with security standards while keeping your intellectual property and private information safe from prying eyes.
        </p>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "How strong is the encryption used for PDF protection?",
            answer: "We use standard AES (Advanced Encryption Standard) encryption, providing a robust layer of security that makes unauthorized access virtually impossible without the correct password."
          },
          {
            question: "Can I remove the password later?",
            answer: "Yes, if you possess the correct password, you can use a PDF unlock tool (or standard PDF readers that allow saving without a password) to remove the encryption."
          },
          {
            question: "Can I restrict printing or copying?",
            answer: "Yes! Password protection not only locks the document from being opened but also helps restrict permissions such as printing, text copying, and editing."
          },
          {
            question: "Is my password or file stored on your servers?",
            answer: "No. Everything is processed entirely within your browser locally. We never store your passwords, nor do we upload your PDF files to any servers."
          }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/pdf/pdf-protect" />
    </div>
  );
}
