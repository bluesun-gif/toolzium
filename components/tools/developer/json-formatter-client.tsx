"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Braces, Check, XCircle, Sparkles, Shield, Zap, AlignLeft } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type Mode ="format"|"minify";

export default function JsonFormatterClient() {
 const [input, setInput] = useState("");
 const [mode, setMode] = useState<Mode>("format");
 const [indent, setIndent] = useState<2 | 4>(2);

 const { output, error } = useMemo(() => {
 if (!input.trim()) return { output:"", error: null };
 try {
 const parsed = JSON.parse(input);
 const formatted =
 mode ==="format"? JSON.stringify(parsed, null, indent) : JSON.stringify(parsed);
 return { output: formatted, error: null };
 } catch (e) {
 const msg = e instanceof Error ? e.message :"Invalid JSON";
 return { output:"", error: msg };
 }
 }, [input, mode, indent]);

 const handleSample = () => {
 setInput('{"user":{"id":1,"name":"Jane","tags":["dev","admin"],"active":true},"meta":{"version":"1.0.0"}}');
 toast.success("Sample loaded");
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader
 icon={Braces}
 title="JSON Formatter & Validator"
 description="Format, minify, and validate JSON data instantly. Perfect for debugging API responses and config files."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <AlignLeft className="w-4 h-4 text-primary"/> Raw JSON Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 rows={12}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/50"
 placeholder='Paste JSON here, e.g. {"key":"value"}'
 />
 <div className="flex items-center justify-between text-xs">
 <button onClick={handleSample} className="text-primary hover:underline">Load sample</button>
 <span className="text-muted-foreground">{input.length} chars</span>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 {error ? <XCircle className="w-4 h-4 text-red-500"/> : <Check className="w-4 h-4 text-green-500"/>}
 {error ?"Invalid JSON":"Valid JSON Output"}
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 {error ? (
 <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500 font-mono">
 {error}
 </div>
 ) : (
 <>
 <textarea
 value={output}
 readOnly
 rows={12}
 className="w-full rounded-lg border border-border/70 bg-muted/30 p-3 font-mono text-sm outline-none"
 />
 <div className="flex items-center justify-between text-xs text-muted-foreground">
 <span>{output.length} chars</span>
 <CopyButton getText={() => output} label="Copy Output"/>
 </div>
 </>
 )}
 </CardContent>
 </GlassCard>
 </div>

 <div className="flex flex-wrap items-center justify-center gap-3">
 <div className="inline-flex overflow-hidden rounded-lg border border-border/70">
 <button
 onClick={() => setMode("format")}
 className={`px-4 py-2 text-sm font-medium ${mode ==="format"?"bg-primary text-primary-foreground":"bg-background/80 hover:bg-muted/40"}`}
 >
 Format
 </button>
 <button
 onClick={() => setMode("minify")}
 className={`px-4 py-2 text-sm font-medium ${mode ==="minify"?"bg-primary text-primary-foreground":"bg-background/80 hover:bg-muted/40"}`}
 >
 Minify
 </button>
 </div>
 {mode ==="format"&& (
 <div className="inline-flex overflow-hidden rounded-lg border border-border/70">
 <button
 onClick={() => setIndent(2)}
 className={`px-4 py-2 text-sm font-medium ${indent === 2 ?"bg-primary text-primary-foreground":"bg-background/80 hover:bg-muted/40"}`}
 >
 2-space
 </button>
 <button
 onClick={() => setIndent(4)}
 className={`px-4 py-2 text-sm font-medium ${indent === 4 ?"bg-primary text-primary-foreground":"bg-background/80 hover:bg-muted/40"}`}
 >
 4-space
 </button>
 </div>
 )}
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Paste JSON", description:"Drop any JSON string, API response, or config file into the input area.", icon: AlignLeft },
 { step:"02", title:"Validate Automatically", description:"The parser instantly checks syntax and highlights errors if the input is malformed.", icon: Check },
 { step:"03", title:"Format or Minify", description:"Choose readable formatting with indentation or compact minification for production use.", icon: Sparkles },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Braces, title:"Strict Validation", description:"Catches missing commas, trailing commas, unquoted keys, and other common JSON syntax errors."},
 { icon: Sparkles, title:"Pretty Print", description:"Rebuilds JSON with consistent indentation for easier reading and code review."},
 { icon: Shield, title:"Private Processing", description:"Everything happens locally in your browser. Your API keys and data never leave your device."},
 { icon: Zap, title:"Instant Feedback", description:"Errors and output update in real time as you type, no button clicks required."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web. Despite its simplicity, raw JSON output from APIs is often minified into a single long line to save bandwidth, making it extremely difficult to read during debugging. This formatter bridges the gap by parsing the input with the native <code>JSON.parse()</code> function and rebuilding it with clean indentation.</p>
 <p>Validation is just as important as formatting. A single misplaced comma, a missing quote, or a trailing comma after the last element will cause JSON parsing to fail in strict environments. This tool uses the browser&apos;s built-in parser, which follows the official ECMA-404 specification exactly, so you get accurate error messages that match what your backend or frontend code will actually see.</p>
 <p>When shipping JSON to production — for example, as a configuration file, a <code>package.json</code>, or a static API response — minification can reduce file size significantly. Removing whitespace and newlines typically cuts 20–40% from the payload, which adds up across thousands of requests. Use the minify mode before committing JSON files to version control to keep your repository lean.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Why is my JSON marked as invalid?", answer:"Common issues include trailing commas, single quotes instead of double quotes, unquoted keys, or comments. JSON does not support comments; use JSONC-aware tools if you need them."},
 { question:"Does this support large files?", answer:"Yes, but very large JSON (10+ MB) may slow down the browser. For huge files, consider streaming parsers or splitting the data."},
 { question:"Can it handle JSON5 or relaxed JSON?", answer:"No. This tool uses strict ECMA-404 JSON. Features like comments, trailing commas, and unquoted keys will be flagged as errors."},
 { question:"Is my data uploaded anywhere?", answer:"No. Parsing and formatting happen entirely in your browser using the native JSON API. Nothing is transmitted."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/developer/json-formatter" max={6} />
 </div>
 );
}
