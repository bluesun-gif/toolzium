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
import { Link2, RefreshCw, ArrowRight, Shield, Globe, Zap } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type Mode ="encode"|"decode";

export default function UrlEncoderClient() {
 const [input, setInput] = useState("");
 const [mode, setMode] = useState<Mode>("encode");

 const output = useMemo(() => {
 if (!input) return"";
 try {
 return mode ==="encode"? encodeURIComponent(input) : decodeURIComponent(input);
 } catch {
 return mode ==="encode"
 ?"⚠️ Unable to encode input."
 :"⚠️ Invalid URL-encoded string. Check for malformed % sequences.";
 }
 }, [input, mode]);

 const handleSwap = () => {
 setMode((prev) => (prev ==="encode"?"decode":"encode"));
 setInput(output.startsWith("⚠️") ?"": output);
 toast.success(`Switched to ${mode ==="encode"?"decode":"encode"} mode`);
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader
 icon={Link2}
 title="URL Encoder & Decoder"
 description="Safely encode and decode URL components for query strings, paths, and API parameters."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Link2 className="w-4 h-4 text-primary"/> Input ({mode ==="encode"?"Plain Text":"URL Encoded"})
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 rows={8}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/50"
 placeholder={mode ==="encode"?"hello world & foo=bar":"hello%20world%20%26%20foo%3Dbar"}
 />
 <div className="text-xs text-muted-foreground">{input.length} characters</div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <ArrowRight className="w-4 h-4 text-primary"/> Output
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea
 value={output}
 readOnly
 rows={8}
 className="w-full rounded-lg border border-border/70 bg-muted/30 p-3 font-mono text-sm outline-none"
 />
 <div className="flex items-center justify-between text-xs text-muted-foreground">
 <span>{output.length} characters</span>
 <CopyButton getText={() => output} label="Copy Output"/>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="flex flex-col sm:flex-row gap-3 justify-center">
 <button
 onClick={handleSwap}
 className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/70 bg-background/80 px-5 py-2.5 text-sm font-medium hover:bg-muted/40"
 >
 <RefreshCw className="w-4 h-4"/> Swap Mode & Output → Input
 </button>
 <div className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary">
 Current Mode: <span className="font-bold uppercase">{mode}</span>
 </div>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Pick Encode or Decode", description:"Select whether you need to escape a plain text string or decode an existing URL component.", icon: Link2 },
 { step:"02", title:"Paste Your Text", description:"Drop in your query value, path segment, or encoded string. Output updates instantly.", icon: RefreshCw },
 { step:"03", title:"Copy the Result", description:"Use the copied output in your API calls, browser redirects, or query parameters.", icon: ArrowRight },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Link2, title:"RFC 3986 Compliant", description:"Follows the official URI syntax specification for safe percent-encoding."},
 { icon: Shield, title:"Handles Special Chars", description:"Correctly encodes spaces, ampersands, equals signs, and other reserved URL characters."},
 { icon: Globe, title:"Unicode Support", description:"Safely encodes non-ASCII characters and emojis into valid UTF-8 percent sequences."},
 { icon: Zap, title:"Instant Feedback", description:"Live recomputation means you see the result the moment you finish typing."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>URLs follow a strict syntax defined by RFC 3986. Certain characters — such as spaces, ampersands, equals signs, question marks, and slashes — have reserved meaning inside a URL structure. If you want to include those characters as part of a value (for example, inside a query parameter like <code>?q=hello&amp;world</code>), you must percent-encode them so the URL parser does not misinterpret the structure.</p>
 <p>Percent-encoding works by replacing unsafe characters with a <code>%</code> followed by two hexadecimal digits representing the byte value. For multi-byte UTF-8 characters, each byte is encoded separately, producing sequences like <code>%E2%9C%93</code> for the checkmark symbol. The standard JavaScript functions <code>encodeURIComponent()</code> and <code>decodeURIComponent()</code> handle this conversion reliably for query parameters and path segments.</p>
 <p>A common mistake is using <code>encodeURI()</code> instead of <code>encodeURIComponent()</code>. The former leaves reserved characters like <code>/</code>, <code>?</code>, and <code>&amp;</code> untouched, which is appropriate for entire URLs but dangerous for individual parameter values. When building query strings dynamically, always use <code>encodeURIComponent()</code> for each value, or better yet, use the modern <code>URLSearchParams</code> API which handles encoding automatically.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What is the difference between encodeURI and encodeURIComponent?", answer:"encodeURI() encodes an entire URL and leaves reserved characters like / and ? alone. encodeURIComponent() encodes a single component and escapes every special character. Use the latter for query parameter values."},
 { question:"Why do spaces become %20?", answer:"In URL encoding, spaces are represented as %20 (hex 20 is the ASCII code for space). Some legacy forms use + instead, but %20 is the standard in URI syntax."},
 { question:"Can this handle emojis?", answer:"Yes. Emojis and other non-ASCII characters are converted to their UTF-8 byte sequence and each byte is percent-encoded, producing safe URL strings."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/developer/url-encoder" max={6} />
 </div>
 );
}
