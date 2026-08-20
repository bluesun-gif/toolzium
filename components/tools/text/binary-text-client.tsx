"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  Binary, ArrowRightLeft, Copy, Check, Trash2, Download,
  Sparkles, Table, Code2, RefreshCw, ChevronDown
} from "lucide-react";
import toast from "react-hot-toast";

function textToBinary(text: string, delimiter: string = " "): string {
  if (!text) return "";
  const bytes: string[] = [];
  const encoder = new TextEncoder();
  const uint8 = encoder.encode(text);
  for (let i = 0; i < uint8.length; i++) {
    bytes.push(uint8[i].toString(2).padStart(8, "0"));
  }
  return bytes.join(delimiter);
}

function binaryToText(binStr: string): string {
  if (!binStr) return "";
  // Strip non-binary characters (keep only 0 and 1, plus spaces)
  const cleaned = binStr.trim();
  
  let chunks: string[] = [];
  if (cleaned.includes(" ") || cleaned.includes(",") || cleaned.includes("-")) {
    chunks = cleaned.split(/[\s,\-]+/).filter(Boolean);
  } else {
    // Unspaced continuous binary string: chunk every 8 bits
    const raw = cleaned.replace(/[^01]/g, "");
    for (let i = 0; i < raw.length; i += 8) {
      const chunk = raw.slice(i, i + 8);
      if (chunk.length === 8) {
        chunks.push(chunk);
      }
    }
  }

  const bytes = chunks
    .map((chunk) => {
      const parsed = parseInt(chunk, 2);
      return isNaN(parsed) ? null : parsed;
    })
    .filter((n): n is number => n !== null);

  if (bytes.length === 0) return "";
  try {
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(bytes));
  } catch (e) {
    return bytes.map((b) => String.fromCharCode(b)).join("");
  }
}

const SAMPLE_TEXTS = [
  "love",
  "Hello World",
  "Toolzium 2026",
  "Binary Code",
];

export default function BinaryTextClient() {
  const [mode, setMode] = useState<"text-to-binary" | "binary-to-text">("text-to-binary");
  const [input, setInput] = useState<string>("love");
  const [delimiter, setDelimiter] = useState<string>(" ");
  const [copied, setCopied] = useState<boolean>(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    return mode === "text-to-binary" ? textToBinary(input, delimiter) : binaryToText(input);
  }, [input, mode, delimiter]);

  // Secondary format calculations (Hex, Decimal, Base64)
  const secondaryFormats = useMemo(() => {
    const plain = mode === "text-to-binary" ? input : output;
    if (!plain) return null;

    const encoder = new TextEncoder();
    const bytes = Array.from(encoder.encode(plain));

    const hex = bytes.map((b) => b.toString(16).padStart(2, "0").toUpperCase()).join(" ");
    const decimal = bytes.map((b) => b.toString(10)).join(" ");
    const octal = bytes.map((b) => b.toString(8).padStart(3, "0")).join(" ");
    const base64 = typeof window !== "undefined" ? btoa(unescape(encodeURIComponent(plain))) : "";

    return { hex, decimal, octal, base64 };
  }, [input, output, mode]);

  const handleSwapMode = () => {
    const nextMode = mode === "text-to-binary" ? "binary-to-text" : "text-to-binary";
    setMode(nextMode);
    setInput(output);
    toast.success(`Switched to ${nextMode === "text-to-binary" ? "Text to Binary" : "Binary to Text"}`);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Output copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Binary to Text & Text to Binary Converter"
          description="Convert plain text strings into 8-bit binary, Hex, Decimal, and ASCII codes, and seamlessly decode binary numbers back to human-readable text."
          icon={Binary}
          badgeText="🔢 Two-Way 8-Bit Binary & Hex Converter"
        />

        {/* Mode Selector Pill */}
        <div className="flex items-center gap-2 p-1.5 bg-muted/40 rounded-2xl border border-border/60 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setMode("text-to-binary")}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
              mode === "text-to-binary"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            <span>Text ➔ Binary</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("binary-to-text")}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
              mode === "binary-to-text"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            <span>Binary ➔ Text</span>
          </button>
        </div>

        {/* Main Studio */}
        <GlassCard className="p-5 sm:p-6 space-y-5">
          
          {/* Sample Chips & Delimiter Setting */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-semibold">Sample:</span>
              {SAMPLE_TEXTS.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (mode === "text-to-binary") {
                      setInput(sample);
                    } else {
                      setInput(textToBinary(sample, delimiter));
                    }
                  }}
                  className="text-[11px] bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground px-2.5 py-0.5 rounded-md border border-border/60 transition-all cursor-pointer font-mono"
                >
                  {sample}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {mode === "text-to-binary" && (
                <div className="flex items-center gap-2 text-xs">
                  <Label className="text-[11px] text-muted-foreground font-semibold">Byte Separator:</Label>
                  <select
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className="bg-background border border-border text-foreground font-bold text-xs rounded-lg h-8 px-2 outline-none cursor-pointer"
                  >
                    <option value=" ">Space (Standard)</option>
                    <option value="">None (Continuous)</option>
                    <option value=", ">Comma</option>
                    <option value="-">Dash</option>
                  </select>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSwapMode}
                className="text-xs font-semibold gap-1.5 h-8 rounded-xl"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Swap Direction</span>
              </Button>
            </div>
          </div>

          {/* Two-Column Input/Output Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Input Card */}
            <div className="flex flex-col space-y-2 rounded-2xl border border-border/80 bg-background/60 p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-1 border-b border-border/40">
                <span className="font-bold text-foreground">
                  {mode === "text-to-binary" ? "Plain Text Input" : "Binary Code Input (0s and 1s)"}
                </span>
                {input && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "text-to-binary"
                    ? "Type plain text to convert to binary (e.g. love)..."
                    : "Paste binary code (e.g. 01101100 01101111 01110110 01100101 or continuous 0110110001101111)..."
                }
                rows={7}
                className="w-full bg-transparent text-foreground text-sm sm:text-base font-mono outline-none resize-y min-h-[160px] leading-relaxed"
              />

              <div className="text-[11px] text-muted-foreground font-mono pt-1 text-right">
                {input.length} characters
              </div>
            </div>

            {/* Output Card */}
            <div className="flex flex-col space-y-2 rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-1 border-b border-border/40">
                <span className="font-bold text-primary">
                  {mode === "text-to-binary" ? "Binary (Base-2) Output" : "Decoded Text Output"}
                </span>

                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!output.trim()}
                    className="h-8 text-xs font-semibold gap-1 text-muted-foreground hover:text-foreground"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
              </div>

              <div className="flex-1 py-1 text-foreground font-mono text-sm sm:text-base font-semibold whitespace-pre-wrap select-all leading-relaxed min-h-[160px] break-all">
                {output || <span className="text-muted-foreground font-normal italic">Output will appear here...</span>}
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> UTF-8 Byte Stream
                </span>
                <span>{output.length} characters</span>
              </div>
            </div>

          </div>

          {/* Multi-Format Simultaneous Representations */}
          {secondaryFormats && (
            <div className="space-y-3 pt-3 border-t border-border/60">
              <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-primary" /> Alternate Encodings & Representations:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                {/* Hex */}
                <div className="p-3 bg-muted/20 border border-border/60 rounded-xl space-y-1">
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase">Hexadecimal (Base-16)</div>
                  <div className="font-bold text-foreground break-all select-all">{secondaryFormats.hex}</div>
                </div>

                {/* Decimal */}
                <div className="p-3 bg-muted/20 border border-border/60 rounded-xl space-y-1">
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase">Decimal (ASCII Codes)</div>
                  <div className="font-bold text-foreground break-all select-all">{secondaryFormats.decimal}</div>
                </div>

                {/* Octal */}
                <div className="p-3 bg-muted/20 border border-border/60 rounded-xl space-y-1">
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase">Octal (Base-8)</div>
                  <div className="font-bold text-foreground break-all select-all">{secondaryFormats.octal}</div>
                </div>

                {/* Base64 */}
                <div className="p-3 bg-muted/20 border border-border/60 rounded-xl space-y-1">
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase">Base64 String</div>
                  <div className="font-bold text-primary break-all select-all">{secondaryFormats.base64}</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
            <span className="text-xs text-muted-foreground">100% Client-Side UTF-8 Binary Parsing</span>
            <div className="flex items-center gap-2">
              <ShareResultButton
                toolTitle="Binary Text Converter"
                resultTitle="Binary Text Conversion"
                resultSummary={`Converted "${input.slice(0, 40)}" with Binary Text Studio.`}
                resultMetrics={[
                  { label: "Mode", value: mode === "text-to-binary" ? "Text to Binary" : "Binary to Text" },
                  { label: "Length", value: `${output.length} chars` },
                ]}
              />
              <EmbedButton toolPath="/tools/text/binary-text" toolTitle="Binary Text Converter" />
            </div>
          </div>

        </GlassCard>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Input Text or Binary", description: "Type plain words or paste raw binary numbers (formatted with or without spaces)." },
            { step: "2", title: "Two-Way Instant Conversion", description: "Our engine maps ASCII/UTF-8 bytes into 8-bit octets or reconstructs characters in real-time." },
            { step: "3", title: "View All Formats & Copy", description: "Instantly copy binary, hex, decimal, or base64 with a single click." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Smart Unspaced Chunking", description: "Decodes continuous unspaced binary strings (e.g. 0110110001101111) without error." },
            { title: "Multi-Base Simultaneous Views", description: "View binary, hexadecimal, decimal byte values, and Base64 all at once." },
            { title: "Full UTF-8 & Emoji Support", description: "Seamlessly converts multi-byte Unicode characters, accented letters, and emojis." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "Why do binary numbers use 8 digits (bits)?", answer: "Standard ASCII and UTF-8 encoding represent characters using 8 bits (1 byte), ranging from 00000000 (0) to 11111111 (255)." },
            { question: "Can this tool decode binary strings without spaces?", answer: "Yes! If you paste continuous binary numbers like '0110110001101111', our engine automatically chunks them into 8-bit bytes to decode correctly." },
            { question: "What is the binary representation of 'love'?", answer: "'love' is represented in binary as: '01101100 01101111 01110110 01100101' (l=108, o=111, v=118, e=101)." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/binary-text" />

      </div>
    </div>
  );
}
