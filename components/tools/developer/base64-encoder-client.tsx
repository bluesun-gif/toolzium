"use client";
import { Button } from"@/components/ui/button";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { Binary, RefreshCw, ArrowRight, Lock, Zap, Shield } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
type Mode = "encode" | "decode";
export default function Base64EncoderClient() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const output = useMemo(() => {
    if (!input) return "";
    try {
      if (mode === "encode") {
        return btoa(unescape(encodeURIComponent(input)));
      } else {
        return decodeURIComponent(escape(atob(input)));
      }
    } catch {
      return mode === "encode" ? "⚠️ Unable to encode input. Check for unsupported characters." : "⚠️ Invalid Base64 string. Please check your input.";
    }
  }, [input, mode]);
  const handleSwap = () => {
    setMode(prev => prev === "encode" ? "decode" : "encode");
    setInput(output.startsWith("⚠️") ? "" : output);
    toast.success(`Switched to ${mode === "encode" ? "decode" : "encode"} mode`);
  };
  const handleClear = () => {
    setInput("");
    toast.success("Cleared");
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader icon={Binary} title="Base64 Encoder & Decoder" description="Encode text to Base64 or decode Base64 strings instantly in your browser. No data leaves your device." />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Binary className="w-4 h-4 text-primary" /> Input ({mode === "encode" ? "Plain Text" : "Base64"})
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea value={input} onChange={e => setInput(e.target.value)} rows={10} className="w-full rounded-lg border border-border/70 bg-background/80 p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/50" placeholder={mode === "encode" ? "Paste plain text to encode..." : "Paste Base64 string to decode..."} />
 <div className="flex items-center justify-between text-xs text-muted-foreground">
 <span>{input.length} characters</span>
 <Button onClick={handleClear} className="hover:text-primary">Clear</Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <ArrowRight className="w-4 h-4 text-primary" /> Output ({mode === "encode" ? "Base64" : "Plain Text"})
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea value={output} readOnly rows={10} className="w-full rounded-lg border border-border/70 bg-muted/30 p-3 font-mono text-sm outline-none" />
 <div className="flex items-center justify-between text-xs text-muted-foreground">
 <span>{output.length} characters</span>
 <CopyButton getText={() => output} label="Copy Output" />
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="flex flex-col sm:flex-row gap-3 justify-center">
 <Button onClick={handleSwap} className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/70 bg-background/80 px-5 py-2.5 text-sm font-medium hover:bg-muted/40">
 <RefreshCw className="w-4 h-4" /> Swap Mode & Output → Input
 </Button>
 <div className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary">
 Current Mode: <span className="font-bold uppercase">{mode}</span>
 </div>
 </div>

 <ToolHowItWorks steps={[{
      step: "01",
      title: "Choose Mode",
      description: "Select whether you want to encode plain text to Base64 or decode an existing Base64 string.",
      icon: Binary
    }, {
      step: "02",
      title: "Paste Your Data",
      description: "Drop your text into the input box. Conversion happens instantly as you type.",
      icon: RefreshCw
    }, {
      step: "03",
      title: "Copy Result",
      description: "Copy the encoded or decoded output with a single click and use it anywhere.",
      icon: ArrowRight
    }]} badges={["100% Free", "Client-Side", "No Signup"]} />

 <ToolFeatureGuides features={[{
      icon: Binary,
      title: "UTF-8 Safe",
      description: "Correctly handles multibyte Unicode characters, emojis, and non-ASCII text without corruption."
    }, {
      icon: Lock,
      title: "Private by Default",
      description: "All encoding and decoding runs entirely in your browser. Nothing is ever sent to a server."
    }, {
      icon: Zap,
      title: "Instant Conversion",
      description: "Output updates live as you type thanks to reactive memoized computation."
    }, {
      icon: Shield,
      title: "Error Handling",
      description: "Invalid Base64 input is detected and flagged immediately without crashing the interface."
    }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Base64 is one of the most widely used binary-to-text encoding schemes on the modern web. Originally designed to safely transmit binary data over media that only handle text, it remains essential today for embedding images in CSS and HTML, transmitting credentials in HTTP Basic Authentication, encoding binary attachments in JSON payloads, and safely storing byte sequences in text-only databases.</p>
 <p>The encoding process works by grouping input bytes into blocks of three (24 bits) and splitting them into four 6-bit groups. Each 6-bit value (0–63) is mapped to a character from a standardized 64-character alphabet consisting of A–Z, a–z, 0–9, plus (+), and slash (/). When the input length is not divisible by three, padding characters (=) are appended to maintain alignment. This predictable structure makes Base64 both reliable and easy to implement across programming languages.</p>
 <p>One important caveat is that Base64 increases data size by approximately 33%, since every three bytes of input produce four bytes of output. It is therefore an encoding scheme, not a compression technique. For this reason, it should never be used as a substitute for encryption — Base64 provides zero security and can be trivially reversed by anyone with access to the encoded string. When confidentiality matters, always combine Base64 with genuine cryptographic algorithms such as AES or RSA before transmission.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
      question: "Is Base64 encoding the same as encryption?",
      answer: "No. Base64 is an encoding scheme, not encryption. It can be trivially reversed by anyone. Never use it to protect sensitive data."
    }, {
      question: "Why does my decoded output look garbled?",
      answer: "This usually happens with non-ASCII characters. Our tool uses UTF-8 safe encoding and decoding to handle Unicode and emojis correctly."
    }, {
      question: "Can I encode files like images?",
      answer: "This tool handles text input. For binary files like images, you would first need to convert the file bytes to a Base64 string, which is commonly done with FileReader in the browser."
    }, {
      question: "Is my data safe?",
      answer: "Yes. All processing happens locally in your browser using the native btoa() and atob() functions. No data is transmitted to any server."
    }]} />

 <RelatedTools currentToolUrl="/tools/developer/base64-encoder" max={6} />
 </div>;
}