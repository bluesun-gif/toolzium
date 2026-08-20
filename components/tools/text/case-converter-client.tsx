"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ToolBackground } from "@/components/shared/tool-background";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/shared/action-buttons";
import {
  Type,
  AlignLeft,
  CheckCircle2,
  Copy,
  Download,
  Trash2,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  Code,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";

const MINOR_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "en", "for", "if", "in", "of", "on", "or", "the", "to", "v", "via", "vs"
]);

export function CaseConverterClient() {
  const [text, setText] = useState("");
  const [lastAction, setLastAction] = useState<string>("UPPERCASE");

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? (text.match(/[.!?]+(?:\s+|$)/g) || []).length || (text.trim().length > 0 ? 1 : 0) : 0;
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
    const readingTimeSec = Math.ceil((words / 200) * 60);

    return {
      chars,
      charsNoSpaces,
      words,
      sentences,
      lines,
      readingTimeSec,
    };
  }, [text]);

  const transformCase = (type: string) => {
    if (!text.trim()) {
      toast.error("Please enter some text first.");
      return;
    }

    let result = "";
    switch (type) {
      case "upper":
        result = text.toUpperCase();
        setLastAction("UPPERCASE");
        break;
      case "lower":
        result = text.toLowerCase();
        setLastAction("lowercase");
        break;
      case "sentence":
        result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
        setLastAction("Sentence case");
        break;
      case "title":
        result = text
          .toLowerCase()
          .split(/\s+/)
          .map((word, idx, arr) => {
            if (idx === 0 || idx === arr.length - 1 || !MINOR_WORDS.has(word)) {
              return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;
          })
          .join(" ");
        setLastAction("Title Case (AP Style)");
        break;
      case "capitalized":
        result = text.replace(/\b\w/g, (c) => c.toUpperCase());
        setLastAction("Capitalized Words");
        break;
      case "camel":
        result = text
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/[\s_-]+/g, "");
        setLastAction("camelCase");
        break;
      case "pascal":
        result = text
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
          .replace(/[\s_-]+/g, "");
        setLastAction("PascalCase");
        break;
      case "snake":
        result = text
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s-]+/g, "_")
          .toLowerCase();
        setLastAction("snake_case");
        break;
      case "constant":
        result = text
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s-]+/g, "_")
          .toUpperCase();
        setLastAction("CONSTANT_CASE");
        break;
      case "kebab":
        result = text
          .trim()
          .replace(/[^\w\s_]/g, "")
          .replace(/[\s_]+/g, "-")
          .toLowerCase();
        setLastAction("kebab-case");
        break;
      case "dot":
        result = text
          .trim()
          .replace(/[^\w\s]/g, "")
          .replace(/[\s_-]+/g, ".")
          .toLowerCase();
        setLastAction("dot.case");
        break;
      case "alternating":
        result = text
          .split("")
          .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
          .join("");
        setLastAction("aLtErNaTiNg cAsE");
        break;
      case "inverse":
        result = text
          .split("")
          .map((char) =>
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
        setLastAction("Inverse Case");
        break;
      case "clean-spaces":
        result = text.replace(/[ \t]+/g, " ").replace(/^\s+|\s+$/gm, "");
        setLastAction("Cleaned Extra Spaces");
        break;
      case "remove-empty":
        result = text
          .split(/\r\n|\r|\n/)
          .filter((line) => line.trim().length > 0)
          .join("\n");
        setLastAction("Removed Empty Lines");
        break;
    }

    setText(result);
    toast.success(`Converted to ${lastAction}!`);
  };

  const copyToClipboard = () => {
    if (!text.trim()) {
      toast.error("Nothing to copy.");
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const downloadText = () => {
    if (!text.trim()) {
      toast.error("Nothing to download.");
      return;
    }
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `text_${lastAction.toLowerCase().replace(/[\s_()]+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded .txt file!");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Type}
          title="Universal Case Converter & Text Formatter"
          description="Convert text into UPPERCASE, lowercase, Title Case (AP / Chicago), Sentence case, camelCase, snake_case, and kebab-case instantly with live word & character statistics."
        />

        {/* Live Metrics Header Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <GlassCard className="p-3 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase block">Characters</span>
            <span className="text-xl font-bold text-foreground">{stats.chars}</span>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase block">Chars (No Spaces)</span>
            <span className="text-xl font-bold text-foreground">{stats.charsNoSpaces}</span>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase block">Words</span>
            <span className="text-xl font-bold text-primary">{stats.words}</span>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase block">Sentences</span>
            <span className="text-xl font-bold text-foreground">{stats.sentences}</span>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase block">Lines</span>
            <span className="text-xl font-bold text-foreground">{stats.lines}</span>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase block">Reading Time</span>
            <span className="text-xl font-bold text-foreground">
              {stats.readingTimeSec < 60 ? `${stats.readingTimeSec}s` : `${Math.ceil(stats.readingTimeSec / 60)}m`}
            </span>
          </GlassCard>
        </div>

        {/* Main Transformation Studio */}
        <GlassCard className="p-6 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3">
            <div className="flex items-center gap-2">
              <AlignLeft className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-base">Text Editor &amp; Formatter</h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8 gap-1.5 text-xs font-semibold">
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadText} className="h-8 gap-1.5 text-xs font-semibold">
                <Download className="w-3.5 h-3.5" /> Download .TXT
              </Button>
              <ShareResultButton
                toolTitle="Case Converter"
                resultTitle={`${stats.words} Words Converted to ${lastAction}`}
                resultSummary={`Formatted text: "${text.slice(0, 50)}..."`}
                resultMetrics={[
                  { label: "Transformation", value: lastAction },
                  { label: "Words", value: stats.words },
                  { label: "Characters", value: stats.chars },
                  { label: "Lines", value: stats.lines },
                ]}
                variant="secondary"
                size="sm"
                className="h-8"
              />
              <EmbedButton
                toolPath="/tools/text/case-converter"
                toolTitle="Case Converter"
                size="sm"
                className="h-8"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setText("")}
                className="h-8 gap-1.5 text-xs text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </Button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="w-full rounded-xl border border-border/80 bg-background/80 p-4 text-sm font-sans outline-none focus:ring-2 focus:ring-primary/50 resize-y leading-relaxed shadow-inner"
            placeholder="Type or paste your text here to convert case instantly..."
          />

          {/* Standard & Writing Cases */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
              Writing &amp; Editorial Formats
            </span>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => transformCase("sentence")} className="text-xs font-medium">
                Sentence case
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("title")} className="text-xs font-medium">
                Title Case (AP Style)
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("capitalized")} className="text-xs font-medium">
                Capitalized Case
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("upper")} className="text-xs font-medium">
                UPPERCASE
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("lower")} className="text-xs font-medium">
                lowercase
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("alternating")} className="text-xs font-medium">
                aLtErNaTiNg cAsE
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("inverse")} className="text-xs font-medium">
                iNVERSE cASE
              </Button>
            </div>
          </div>

          {/* Developer & Programming Conventions */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-primary" /> Developer &amp; Code Naming Conventions
            </span>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => transformCase("camel")} className="text-xs font-mono font-medium">
                camelCase
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("pascal")} className="text-xs font-mono font-medium">
                PascalCase
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("snake")} className="text-xs font-mono font-medium">
                snake_case
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("constant")} className="text-xs font-mono font-medium">
                CONSTANT_CASE
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("kebab")} className="text-xs font-mono font-medium">
                kebab-case (Slug)
              </Button>
              <Button variant="outline" size="sm" onClick={() => transformCase("dot")} className="text-xs font-mono font-medium">
                dot.case
              </Button>
            </div>
          </div>

          {/* Space & Line Cleaners */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
              Clean Up &amp; Formatting
            </span>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => transformCase("clean-spaces")} className="text-xs">
                Remove Extra Spaces
              </Button>
              <Button variant="secondary" size="sm" onClick={() => transformCase("remove-empty")} className="text-xs">
                Remove Empty Lines
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* 5-Section Educational & SEO Architecture */}
        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Paste or Type Text",
              description: "Paste your raw copy, essays, headings, or developer code identifiers.",
              icon: AlignLeft,
            },
            {
              step: "02",
              title: "Choose Casing Style",
              description: "Select from 12+ styles including AP Title Case, camelCase, snake_case, and Sentence case.",
              icon: Sparkles,
            },
            {
              step: "03",
              title: "Copy or Download",
              description: "Instantly copy formatted text to your clipboard or export as a clean .TXT document.",
              icon: Download,
            },
          ]}
          badges={["100% Free Forever", "Instant Zero-Latency", "12+ Casing Formats", "AP & Chicago Guidelines"]}
        />

        <ToolFeatureGuides
          features={[
            {
              icon: Type,
              title: "AP & Chicago Title Casing",
              description: "Automatically keeps articles, conjunctions, and prepositions lowercase according to standard editorial guidelines.",
            },
            {
              icon: Code,
              title: "Developer Variable Formatter",
              description: "Cleanly convert phrases into camelCase, PascalCase, snake_case, and URL kebab-case slugs.",
            },
            {
              icon: SlidersHorizontal,
              title: "Live Text Analytics",
              description: "Real-time character, word, sentence, line, and estimated reading time counts.",
            },
            {
              icon: ShieldCheck,
              title: "100% Client-Side Privacy",
              description: "All text transformation runs strictly inside your local browser memory. Zero data is logged or sent over the network.",
            },
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-5">
            <h3>The Comprehensive Guide to Text Casing &amp; Naming Conventions</h3>
            <p>
              Text casing determines how words and sentences are capitalized for readability, editorial styling, and computer programming syntax.
            </p>

            <h4>Editorial &amp; Writing Styles</h4>
            <ul>
              <li><strong>Sentence case:</strong> Capitalizes only the first letter of each sentence and proper nouns. Recommended for modern user interfaces and European editorial styles.</li>
              <li><strong>Title Case (AP / Chicago):</strong> Capitalizes the first and last words, plus all nouns, verbs, adjectives, and adverbs. Keeps minor prepositions (e.g., &quot;in&quot;, &quot;on&quot;, &quot;of&quot;, &quot;to&quot;) and conjunctions (&quot;and&quot;, &quot;but&quot;, &quot;or&quot;) in lowercase.</li>
              <li><strong>UPPERCASE:</strong> Converts every letter to uppercase. Frequently used for acronyms, legal disclaimers, and urgent warning banners.</li>
            </ul>

            <h4>Developer Casing Conventions Cheat Sheet</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-2.5 border border-border">Convention</th>
                    <th className="p-2.5 border border-border">Example</th>
                    <th className="p-2.5 border border-border">Common Use Cases</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2.5 border border-border font-mono font-semibold">camelCase</td>
                    <td className="p-2.5 border border-border font-mono text-primary">userProfileData</td>
                    <td className="p-2.5 border border-border">JavaScript / TypeScript variables, functions, JSON keys</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-border font-mono font-semibold">PascalCase</td>
                    <td className="p-2.5 border border-border font-mono text-primary">UserProfileData</td>
                    <td className="p-2.5 border border-border">React components, TypeScript classes, C# / Java classes</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-border font-mono font-semibold">snake_case</td>
                    <td className="p-2.5 border border-border font-mono text-primary">user_profile_data</td>
                    <td className="p-2.5 border border-border">Python variables, PostgreSQL database column names</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-border font-mono font-semibold">CONSTANT_CASE</td>
                    <td className="p-2.5 border border-border font-mono text-primary">USER_PROFILE_DATA</td>
                    <td className="p-2.5 border border-border">Global configuration constants, environment variables</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-border font-mono font-semibold">kebab-case</td>
                    <td className="p-2.5 border border-border font-mono text-primary">user-profile-data</td>
                    <td className="p-2.5 border border-border">URL slugs, CSS class names, HTML attributes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            {
              question: "What words should not be capitalized in Title Case?",
              answer: "According to AP and Chicago Manual of Style guidelines, short prepositions (e.g., in, on, at, by, to, of, for, via) and coordinating conjunctions (and, but, or, nor, for, so, yet) should remain lowercase unless they are the first or last word of the title.",
            },
            {
              question: "What is the difference between camelCase and PascalCase?",
              answer: "camelCase starts with a lowercase letter for the first word followed by uppercase letters for subsequent words (e.g., myVariableName), whereas PascalCase capitalizes the first letter of every single word (e.g., MyVariableName).",
            },
            {
              question: "Can I convert thousands of words or entire articles at once?",
              answer: "Yes. Toolzium processes large text blocks instantly using client-side JavaScript regex with zero lag and no character limits.",
            },
            {
              question: "Is my text data private and secure?",
              answer: "Yes, 100% private. Your text is processed entirely in your local browser sandbox and is never saved or transmitted over the internet.",
            },
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/case-converter" max={6} />
      </div>
    </div>
  );
}

export default CaseConverterClient;
