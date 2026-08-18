"use client";

import { Input } from "@/components/ui/input";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Code, ArrowRightLeft, Copy, Replace, Shield, FileText, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
type FormatType = "html" | "url" | "js" | "json" | "csv" | "sql" | "base64" | "unicode";
export default function StringEscapeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<FormatType>("html");
  const [direction, setDirection] = useState<"escape" | "unescape">("escape");
  const escapeHTML = (str: string) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const unescapeHTML = (str: string) => str.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  const processString = useCallback((str: string, fmt: FormatType, dir: "escape" | "unescape") => {
    if (!str) return "";
    try {
      if (fmt === "html") return dir === "escape" ? escapeHTML(str) : unescapeHTML(str);
      if (fmt === "url") return dir === "escape" ? encodeURIComponent(str) : decodeURIComponent(str);
      if (fmt === "js" || fmt === "json") {
        if (dir === "escape") return JSON.stringify(str).slice(1, -1);
        return JSON.parse('"' + str.replace(/"/g, '\\"') + '"');
      }
      if (fmt === "csv") {
        if (dir === "escape") return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str.replace(/"/g, '""')}"` : str;
        return str.startsWith('"') && str.endsWith('"') ? str.slice(1, -1).replace(/""/g, '"') : str;
      }
      if (fmt === "sql") return dir === "escape" ? str.replace(/'/g, "''") : str.replace(/''/g, "'");
      if (fmt === "base64") {
        if (dir === "escape") return btoa(unescape(encodeURIComponent(str)));
        return decodeURIComponent(escape(atob(str)));
      }
      if (fmt === "unicode") {
        if (dir === "escape") return Array.from(str).map(c => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`).join('');
        return str.replace(/\\u([\d\w]{4})/gi, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
      }
    } catch (e) {
      return "Error processing string (check format/syntax)";
    }
    return str;
  }, []);
  useEffect(() => {
    setOutput(processString(input, format, direction));
  }, [input, format, direction, processString]);
  const swap = () => {
    setInput(output);
    setDirection(d => d === "escape" ? "unescape" : "escape");
  };
  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Output copied!");
  };
  const formats: {
    id: FormatType;
    label: string;
  }[] = [{
    id: "html",
    label: "HTML"
  }, {
    id: "url",
    label: "URL"
  }, {
    id: "js",
    label: "JavaScript"
  }, {
    id: "json",
    label: "JSON"
  }, {
    id: "csv",
    label: "CSV"
  }, {
    id: "sql",
    label: "SQL"
  }, {
    id: "base64",
    label: "Base64"
  }, {
    id: "unicode",
    label: "Unicode"
  }];
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Code} title="String Escape & Unescape Tool" description="Encode and decode strings for HTML, URL, JavaScript, JSON, CSV, SQL, Base64, and Unicode formats instantly." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Shield className="w-4 h-4 text-primary" /> Format & Direction
 </CardTitle>
 </CardHeader>
 <CardContent className="p-5 space-y-4">
 <div className="flex flex-wrap gap-2">
 {formats.map(f => <Button key={f.id} variant={format === f.id ? "default" : "outline"} size="sm" className="text-xs font-semibold" onClick={() => setFormat(f.id)}>
 {f.label}
 </Button>)}
 </div>
 <div className="flex gap-2">
 <Button variant={direction === "escape" ? "default" : "outline"} className="flex-1 text-xs font-semibold" onClick={() => setDirection("escape")}>
 Escape →
 </Button>
 <Button variant="ghost" size="icon" onClick={swap}>
 <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
 </Button>
 <Button variant={direction === "unescape" ? "default" : "outline"} className="flex-1 text-xs font-semibold" onClick={() => setDirection("unescape")}>
 ← Unescape
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center w-full">
 <CardTitle className={titleClass}>Input</CardTitle>
 <span className="text-xs text-muted-foreground font-mono">{input.length} chars | {new Blob([input]).size} bytes</span>
 </div>
 </CardHeader>
 <CardContent className="p-5">
 <textarea value={input} onChange={e => setInput(e.target.value)} className={cn(textareaClass, "min-h-[250px]")} placeholder="Enter string to process..." />
 <Button variant="outline" size="sm" className="mt-3 w-full text-xs font-semibold" onClick={() => setInput("")}>
 Clear Input
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center w-full">
 <CardTitle className={titleClass}>Output</CardTitle>
 <span className="text-xs text-muted-foreground font-mono">{output.length} chars | {new Blob([output]).size} bytes</span>
 </div>
 </CardHeader>
 <CardContent className="p-5">
 <textarea value={output} readOnly className={cn(textareaClass, "min-h-[250px] bg-muted/30")} placeholder="Output will appear here..." />
 <Button size="sm" className="mt-3 w-full text-xs font-semibold" onClick={copyOutput}>
 <Copy className="w-4 h-4 mr-2" /> Copy Output
 </Button>
 </CardContent>
 </GlassCard>
 </div>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Select Format",
        description: "Choose the target context like HTML, URL, JSON, or Base64 from the quick-select tabs.",
        icon: FileText
      }, {
        step: "02",
        title: "Choose Direction",
        description: "Toggle between escaping (encoding) or unescaping (decoding) your input string.",
        icon: ArrowRightLeft
      }, {
        step: "03",
        title: "Real-Time Output",
        description: "Watch the output update instantly on every keystroke. Copy the result with one click.",
        icon: Copy
      }]} badges={["Real-Time Processing", "8 Formats Supported", "100% Secure"]} />

 <ToolFeatureGuides features={[{
        icon: Shield,
        title: "XSS Prevention (HTML)",
        description: "Safely encode user-generated content to prevent Cross-Site Scripting vulnerabilities by escaping dangerous characters."
      }, {
        icon: Globe,
        title: "URL Safety",
        description: "Encode special characters for safe transmission in query parameters and URI paths using standard percent-encoding."
      }, {
        icon: Code,
        title: "Developer Serialization",
        description: "Perfect for generating safe JSON payloads, JavaScript string literals, and CSV exports directly in the browser."
      }, {
        icon: Replace,
        title: "Bidirectional Swap",
        description: "Instantly flip input and output and reverse the operation direction for rapid decoding and testing workflows."
      }]}>
 <div className="prose max-w-none dark:prose-invert">
 <h3 className="text-xl font-bold mb-4">The Critical Role of String Escaping in Web Security</h3>
 <p className="text-muted-foreground mb-4">
 String escaping and encoding are fundamental operations in software development, acting as the bridge between raw data and the specific contexts in which that data is interpreted. When data moves between environments—such as from a database to an HTML page, or from a form input to a URL parameter—characters that hold special meaning in the target environment must be"escaped"to prevent syntax errors or, worse, severe security vulnerabilities.
 </p>
 <p className="text-muted-foreground mb-4">
 The most prominent example is Cross-Site Scripting (XSS). If a user inputs <code className="text-primary"><script>alert(1)</script></code> into a comment field, and that string is rendered directly into HTML without escaping, the browser will execute the malicious script. By converting the angle brackets into HTML entities (<code className="text-primary">&amp;lt;</code> and <code className="text-primary">&amp;gt;</code>), the browser renders them as harmless text. Similarly, URL encoding ensures that spaces, ampersands, and slashes do not break the structure of an HTTP request.
 </p>
 <p className="text-muted-foreground">
 This tool provides a unified, real-time workspace for handling these transformations across eight common formats. Because all processing occurs locally within your browser's JavaScript engine, sensitive data like API keys, personal information, or proprietary code snippets never leave your machine. Whether you are formatting a SQL query to prevent injection attacks, generating Unicode escape sequences for internationalization, or simply decoding a Base64 payload, this utility ensures accuracy and security in every transformation.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "What is the difference between HTML escaping and URL encoding?",
        answer: "HTML escaping converts characters that have special meaning in HTML (like <, >, &) into entities to prevent code execution. URL encoding converts characters that are invalid in URLs (like spaces, ?, #) into percent-encoded hex values (like %20) to ensure the URL is parsed correctly by servers."
      }, {
        question: "Is my data safe when using this tool?",
        answer: "Yes, absolutely. This tool operates 100% client-side. Your strings are processed locally by your browser's JavaScript engine and are never transmitted over the internet to any external server."
      }, {
        question: "How does the CSV escaping work?",
        answer: "CSV escaping ensures that strings containing commas, newlines, or double quotes do not break the CSV structure. It wraps the string in double quotes and escapes any internal double quotes by doubling them (e.g., \"becomes \"\"), which is the standard RFC 4180 CSV format."
      }]} />
    </div>
    </div>
);
}
