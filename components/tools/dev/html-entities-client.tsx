"use client";

import React, { useState, useMemo, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Code, Copy, RotateCcw, ArrowRightLeft } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

interface Entity {
  char: string;
  name: string;
  dec: string;
  hex: string;
}

const commonEntities: Entity[] = [
  { char: "&", name: "&amp;", dec: "&#38;", hex: "&#x26;" },
  { char: "<", name: "&lt;", dec: "&#60;", hex: "&#x3C;" },
  { char: ">", name: "&gt;", dec: "&#62;", hex: "&#x3E;" },
  { char: '"', name: "&quot;", dec: "&#34;", hex: "&#x22;" },
  { char: "'", name: "&apos;", dec: "&#39;", hex: "&#x27;" },
  { char: " ", name: "&nbsp;", dec: "&#160;", hex: "&#xA0;" },
  { char: "©", name: "&copy;", dec: "&#169;", hex: "&#xA9;" },
  { char: "®", name: "&reg;", dec: "&#174;", hex: "&#xAE;" },
  { char: "™", name: "&trade;", dec: "&#8482;", hex: "&#x2122;" },
  { char: "€", name: "&euro;", dec: "&#8364;", hex: "&#x20AC;" },
  { char: "£", name: "&pound;", dec: "&#163;", hex: "&#xA3;" },
  { char: "¥", name: "&yen;", dec: "&#165;", hex: "&#xA5;" },
  { char: "¢", name: "&cent;", dec: "&#162;", hex: "&#xA2;" },
  { char: "§", name: "&sect;", dec: "&#167;", hex: "&#xA7;" },
  { char: "¶", name: "&para;", dec: "&#182;", hex: "&#xB6;" },
  { char: "†", name: "&dagger;", dec: "&#8224;", hex: "&#x2020;" },
  { char: "‡", name: "&Dagger;", dec: "&#8225;", hex: "&#x2021;" },
  { char: "•", name: "&bull;", dec: "&#8226;", hex: "&#x2022;" },
  { char: "…", name: "&hellip;", dec: "&#8230;", hex: "&#x2026;" },
  { char: "‰", name: "&permil;", dec: "&#8240;", hex: "&#x2030;" },
  { char: "′", name: "&prime;", dec: "&#8242;", hex: "&#x2032;" },
  { char: "″", name: "&Prime;", dec: "&#8243;", hex: "&#x2033;" },
  { char: "‹", name: "&lsaquo;", dec: "&#8249;", hex: "&#x2039;" },
  { char: "›", name: "&rsaquo;", dec: "&#8250;", hex: "&#x203A;" },
  { char: "‾", name: "&oline;", dec: "&#8254;", hex: "&#x203E;" },
  { char: "⁄", name: "&frasl;", dec: "&#8260;", hex: "&#x2044;" },
  { char: "←", name: "&larr;", dec: "&#8592;", hex: "&#x2190;" },
  { char: "↑", name: "&uarr;", dec: "&#8593;", hex: "&#x2191;" },
  { char: "→", name: "&rarr;", dec: "&#8594;", hex: "&#x2192;" },
  { char: "↓", name: "&darr;", dec: "&#8595;", hex: "&#x2193;" },
  { char: "↔", name: "&harr;", dec: "&#8596;", hex: "&#x2194;" },
  { char: "⇐", name: "&lArr;", dec: "&#8656;", hex: "&#x21D0;" },
  { char: "⇑", name: "&uArr;", dec: "&#8657;", hex: "&#x21D1;" },
  { char: "⇒", name: "&rArr;", dec: "&#8658;", hex: "&#x21D2;" },
  { char: "⇓", name: "&dArr;", dec: "&#8659;", hex: "&#x21D3;" },
  { char: "⇔", name: "&hArr;", dec: "&#8660;", hex: "&#x21D4;" },
  { char: "∀", name: "&forall;", dec: "&#8704;", hex: "&#x2200;" },
  { char: "∂", name: "&part;", dec: "&#8706;", hex: "&#x2202;" },
  { char: "∃", name: "&exist;", dec: "&#8707;", hex: "&#x2203;" },
  { char: "∅", name: "&empty;", dec: "&#8709;", hex: "&#x2205;" },
  { char: "∇", name: "&nabla;", dec: "&#8711;", hex: "&#x2207;" },
  { char: "∈", name: "&isin;", dec: "&#8712;", hex: "&#x2208;" },
  { char: "∉", name: "&notin;", dec: "&#8713;", hex: "&#x2209;" },
  { char: "∋", name: "&ni;", dec: "&#8715;", hex: "&#x220B;" },
  { char: "∏", name: "&prod;", dec: "&#8719;", hex: "&#x220F;" },
  { char: "∑", name: "&sum;", dec: "&#8721;", hex: "&#x2211;" },
  { char: "−", name: "&minus;", dec: "&#8722;", hex: "&#x2212;" },
  { char: "∗", name: "&lowast;", dec: "&#8727;", hex: "&#x2217;" },
  { char: "√", name: "&radic;", dec: "&#8730;", hex: "&#x221A;" },
  { char: "∝", name: "&prop;", dec: "&#8733;", hex: "&#x221D;" }
];

export default function HtmlEntitiesClient() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [options, setOptions] = useState({
    named: true,
    decimal: false,
    hex: false,
  });

  const encodeText = useCallback(
    (text: string): string => {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = text.charCodeAt(i);

        // Standard printable ASCII that doesn't strictly require encoding (except & < > " ')
        if (code >= 32 && code <= 126 && !['&', '<', '>', '"', "'"].includes(char)) {
          result += char;
          continue;
        }

        if (options.named) {
          const entity = commonEntities.find((e) => e.char === char);
          if (entity) {
            result += entity.name;
            continue;
          }
        }
        
        if (options.hex) {
          result += `&#x${code.toString(16).toUpperCase()};`;
        } else if (options.decimal || (!options.named && !options.hex)) {
          result += `&#${code};`;
        } else {
          result += char;
        }
      }
      return result;
    },
    [options]
  );

  const decodeText = useCallback((text: string): string => {
    let result = text;

    // Map for named entities
    const namedEntityMap: { [key: string]: string } = {};
    commonEntities.forEach((e) => {
      namedEntityMap[e.name] = e.char;
    });

    // Decode named entities (&amp; -> &)
    result = result.replace(/&([a-zA-Z]+);/g, (match, entityName) => {
      const fullEntity = `&${entityName};`;
      return namedEntityMap[fullEntity] || match;
    });

    // Decode decimal entities (&#38; -> &)
    result = result.replace(/&#(\d+);/g, (match, dec) => {
      const code = parseInt(dec, 10);
      return String.fromCharCode(code);
    });

    // Decode hex entities (&#x26; -> &)
    result = result.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
      const code = parseInt(hex, 16);
      return String.fromCharCode(code);
    });

    return result;
  }, []);

  // Compute output directly via useMemo to avoid state syncing anti-patterns
  const output = useMemo(() => {
    if (!input) return "";
    return mode === "encode" ? encodeText(input) : decodeText(input);
  }, [input, mode, encodeText, decodeText]);

  const swap = () => {
    setInput(output);
    setMode(mode === "encode" ? "decode" : "encode");
    toast.success("Input and output swapped & mode flipped");
  };

  const clearAll = () => {
    setInput("");
    toast.success("Cleared");
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        icon={Code}
        title="HTML Entities Encoder/Decoder"
        description="Convert special characters to HTML entities and back with support for named, decimal, and hex formats"
      />

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Code className="w-4 h-4 text-primary" />
            Conversion Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "encode" ? "default" : "outline"}
              onClick={() => setMode("encode")}
              className="flex-1 text-xs font-semibold"
            >
              Encode Text
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              onClick={() => setMode("decode")}
              className="flex-1 text-xs font-semibold"
            >
              Decode Entities
            </Button>
          </div>

          {mode === "encode" && (
            <div className="space-y-2 p-3 bg-muted/30 rounded-lg border border-border/50">
              <Label className="text-xs font-bold uppercase tracking-wider text-foreground">Output Format Priority</Label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.named}
                    onChange={(e) => setOptions((prev) => ({ ...prev, named: e.target.checked }))}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm">Named (&amp;lt;)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.decimal}
                    onChange={(e) => setOptions((prev) => ({ ...prev, decimal: e.target.checked, hex: false }))}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm">Decimal (&#60;)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.hex}
                    onChange={(e) => setOptions((prev) => ({ ...prev, hex: e.target.checked, decimal: false }))}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm">Hex (&#x3C;)</span>
                </label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Code className="w-4 h-4 text-primary" />
              Input ({mode === "encode" ? "Raw Text" : "HTML Entities"})
            </CardTitle>
            <div className="text-xs text-muted-foreground font-mono">{input.length} chars</div>
          </CardHeader>
          <CardContent className="p-4">
            <textarea
              className={textareaClass}
              rows={10}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode (e.g., <div class='test'>)" : "Enter HTML to decode (e.g., &lt;div&gt;)"}
            />
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Code className="w-4 h-4 text-primary" />
              Output
            </CardTitle>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-mono">{output.length} chars</span>
              <button
                onClick={copyOutput}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <textarea
              className={textareaClass}
              rows={10}
              value={output}
              readOnly
              placeholder="Output will appear here in real-time..."
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3 justify-center">
        <Button onClick={swap} variant="outline" className="gap-2 text-xs font-semibold">
          <ArrowRightLeft className="w-4 h-4" /> Swap & Flip Mode
        </Button>
        <Button onClick={clearAll} variant="outline" className="gap-2 text-xs font-semibold">
          <RotateCcw className="w-4 h-4" /> Clear
        </Button>
      </div>

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Code className="w-4 h-4 text-primary" />
            Common HTML Entities Reference (Click to copy)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {commonEntities.map((entity, idx) => (
              <div
                key={idx}
                className="p-3 bg-muted/30 rounded-lg border border-border/40 hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer group text-center"
                onClick={() => {
                  navigator.clipboard.writeText(entity.name);
                  toast.success(`Copied ${entity.name}`);
                }}
              >
                <div className="text-2xl mb-1 text-foreground">{entity.char}</div>
                <div className="text-[10px] font-mono text-primary font-bold group-hover:underline truncate">
                  {entity.name}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 font-mono">
                  {entity.dec}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Select Mode", description: "Choose to encode raw text or decode existing HTML entities", icon: Code },
          { step: "02", title: "Configure Format", description: "Pick named, decimal, or hexadecimal output for encoding", icon: Code },
          { step: "03", title: "Real-Time Output", description: "Watch the conversion happen instantly with every keystroke", icon: Copy },
        ]}
        badges={["Zero Latency", "XSS Prevention", "50+ Reference"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Code, title: "Bidirectional Engine", description: "Seamlessly encode text to entities or decode entities back to text" },
          { icon: Code, title: "Format Granularity", description: "Toggle between named, decimal, and hexadecimal numeric formats" },
          { icon: Code, title: "Instant Computation", description: "Powered by React useMemo for zero-latency, real-time previews" },
          { icon: Code, title: "Typographic Library", description: "Quick-access clickable grid of 50+ common HTML entities" },
        ]}
      >
        <div className="prose max-w-none dark:prose-invert">
          <h3>The Backbone of Safe Web Typography and Security</h3>
          <p>HTML entities are the backbone of safe and accurate text rendering on the web. Whenever you need to display reserved characters like <code>&lt;</code>, <code>&gt;</code>, or <code>&amp;</code> as literal text rather than executable markup, entities are strictly required. Our encoder/decoder handles this translation automatically, supporting all three standard entity formats defined by the W3C: named entities (like <code>&amp;lt;</code>), decimal numeric entities (like <code>&amp;#60;</code>), and hexadecimal numeric entities (like <code>&amp;#x3C;</code>).</p>

          <h3>Cross-Site Scripting (XSS) Prevention</h3>
          <p>Security is a major factor in entity encoding. Failing to properly encode user-generated content before rendering it in the DOM is the primary vector for Cross-Site Scripting (XSS) attacks. By converting dangerous characters into their safe entity equivalents, you ensure that browsers treat them as literal text rather than executable HTML. This client-side encoder allows developers to quickly sanitize snippets, test payload vectors, and verify that their frontend frameworks are correctly escaping dangerous characters without needing to spin up a backend testing environment or rely on external APIs.</p>

          <h3>Advanced Decoding Engine</h3>
          <p>Decoding is equally critical when working with scraped data, legacy databases, or RSS feeds where text arrives heavily encoded. Our decoding algorithm utilizes a multi-pass regular expression engine to accurately capture and resolve named aliases, base-15 decimals, and base-16 hexadecimals simultaneously. It gracefully handles malformed entities by leaving them intact, preventing data corruption during the sanitization pipeline.</p>

          <h3>A Typographic Reference Tool</h3>
          <p>Beyond basic conversion, this tool serves as a comprehensive typographic reference. The interactive grid below provides quick access to currency symbols, mathematical operators, directional arrows, and punctuation marks (like em-dashes and ellipses) that are notoriously difficult to type on standard keyboards. Simply click any card to copy the exact named entity directly to your clipboard, streamlining your workflow when building email templates, CMS interfaces, or internationalized web applications.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "What is the difference between Named, Decimal, and Hex entities?",
            answer: "Named entities use human-readable aliases (e.g., &copy; for ©). Decimal entities use the base-10 Unicode code point (e.g., &#169;). Hexadecimal entities use the base-16 Unicode code point (e.g., &#xA9;). All three render exactly the same in the browser, but named entities are generally preferred for readability, while numeric entities are required for characters that don't have a named alias.",
          },
          {
            question: "Do I need to encode every single character?",
            answer: "No. Standard alphanumeric characters (A-Z, 0-9) do not need encoding. You only strictly need to encode the 5 reserved HTML characters: & (ampersand), < (less than), > (greater than), \" (double quote), and ' (single quote). However, encoding extended Unicode characters ensures they render correctly regardless of the document's character encoding settings.",
          },
          {
            question: "Is this tool safe for sensitive data?",
            answer: "Absolutely. This tool operates 100% client-side using JavaScript in your browser. Your text, code snippets, and sensitive data are never transmitted over the internet or stored on any server. It is completely safe to paste proprietary code, payloads, or sensitive strings for sanitization.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/dev/html-entities" max={6} />
    </div>
  );
}
