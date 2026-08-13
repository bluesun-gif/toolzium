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
import { Code, RefreshCw, ArrowRight, Shield, Globe, Zap } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
type Mode = "encode" | "decode";
function encodeEntities(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function decodeEntities(str: string): string {
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10))).replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
}
export default function HtmlEntityClient() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const output = useMemo(() => {
    if (!input) return "";
    return mode === "encode" ? encodeEntities(input) : decodeEntities(input);
  }, [input, mode]);
  const handleSwap = () => {
    setMode(prev => prev === "encode" ? "decode" : "encode");
    setInput(output);
    toast.success(`Switched to ${mode === "encode" ? "decode" : "encode"} mode`);
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader icon={Code} title="HTML Entity Encoder & Decoder" description="Convert special characters to safe HTML entities and back. Prevent XSS and preserve formatting." />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Code className="w-4 h-4 text-primary" /> Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} className="w-full rounded-lg border border-border/70 bg-background/80 p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/50" placeholder={mode === "encode" ? '<script>alert("xss")</script>' : "&lt;p&gt;Hello &amp; welcome&lt;/p&gt;"} />
 <div className="text-xs text-muted-foreground">{input.length} characters</div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <ArrowRight className="w-4 h-4 text-primary" /> Output
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea value={output} readOnly rows={8} className="w-full rounded-lg border border-border/70 bg-muted/30 p-3 font-mono text-sm outline-none" />
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
      title: "Select Encode or Decode",
      description: "Choose whether to convert raw characters into HTML entities or reverse the process.",
      icon: Code
    }, {
      step: "02",
      title: "Paste Your Text",
      description: "Drop in HTML source code, user-submitted content, or encoded strings.",
      icon: RefreshCw
    }, {
      step: "03",
      title: "Copy the Result",
      description: "Use the safe output in templates, emails, or anywhere untrusted text is rendered.",
      icon: ArrowRight
    }]} badges={["100% Free", "Client-Side", "No Signup"]} />

 <ToolFeatureGuides features={[{
      icon: Code,
      title: "Five Core Entities",
      description: "Handles &, <, >, double quotes, and single quotes — the characters that break HTML structure."
    }, {
      icon: Shield,
      title: "XSS Prevention",
      description: "Escaping user input before rendering prevents cross-site scripting attacks."
    }, {
      icon: Globe,
      title: "Numeric Decoding",
      description: "Decodes both named entities and numeric references like &#169; and &#x00A9;."
    }, {
      icon: Zap,
      title: "Live Conversion",
      description: "Instant transformation as you type without any external dependencies."
    }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>HTML uses angle brackets and ampersands as structural characters. When user-supplied content contains these symbols, browsers can misinterpret them as tags or entity references, which leads to broken layouts and, more dangerously, cross-site scripting (XSS) vulnerabilities. Entity encoding replaces unsafe characters with their named or numeric equivalents so the browser renders them as literal text.</p>
 <p>The five characters that must always be escaped in HTML text content are the ampersand (<code>&amp;</code>), less-than (<code>&lt;</code>), greater-than (<code>&gt;</code>), double quote (<code>&quot;</code>), and single quote (<code>&#39;</code>). Modern frameworks like React and Vue escape these automatically when interpolating values, but when you work with server-rendered templates, email generators, or raw DOM manipulation, you must do the escaping yourself.</p>
 <p>Decoding is the reverse process and is commonly needed when reading content from HTML sources such as scraped pages, CMS exports, or legacy database fields. Beyond the five core entities, HTML supports hundreds of named entities (like <code>&amp;copy;</code>, <code>&amp;nbsp;</code>, <code>&amp;euro;</code>) and two forms of numeric references: decimal (<code>&amp;#169;</code>) and hexadecimal (<code>&amp;#xA9;</code>). This tool handles all of them in decode mode.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
      question: "Do I need to escape everything or just the five core characters?",
      answer: "For text content, escaping the five core characters is sufficient. Inside attribute values, you should also be careful with attribute delimiters. For URLs inside href/src, use URL encoding instead."
    }, {
      question: "Is HTML entity encoding enough to prevent XSS?",
      answer: "Encoding is one layer of defense. You must also validate input, use Content Security Policy headers, avoid innerHTML with user data, and sanitize rich content with libraries like DOMPurify."
    }, {
      question: "What's the difference between &apos; and &#39;?",
      answer: "&apos; is XML/XHTML but not part of HTML4. &#39; (numeric) works universally across all HTML versions and is therefore the safer choice."
    }]} />

 <RelatedTools currentToolUrl="/tools/developer/html-entity" max={6} />
 </div>;
}