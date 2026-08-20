"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  ClipboardCheck, Copy, Check, Trash2, Download, Sparkles,
  RefreshCw, ShieldCheck, Eraser, Link2, EyeOff, Scissors
} from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_DIRTY_TEXT = `   “Hello   World!”   This text has   weird   spaces.   

Visit https://example.com/product?utm_source=facebook&utm_medium=cpc&gclid=12345&ref=affiliate_99 for details.

<p>Here is some <b>HTML formatting</b> &amp; zero-width​ spaces.​</p>

   • Point 1 with trailing spaces      
   • Point 2 with multiple line breaks


`;

export default function ClipboardCleanerClient() {
  const [inputText, setInputText] = useState(SAMPLE_DIRTY_TEXT);
  const [stripExtraSpaces, setStripExtraSpaces] = useState(true);
  const [stripEmptyLines, setStripEmptyLines] = useState(true);
  const [stripHtml, setStripHtml] = useState(true);
  const [stripTrackingUrls, setStripTrackingUrls] = useState(true);
  const [stripInvisibleChars, setStripInvisibleChars] = useState(true);
  const [normalizeQuotes, setNormalizeQuotes] = useState(true);
  const [copied, setCopied] = useState(false);

  // Sanitize & Clean Pipeline
  const cleanedText = useMemo(() => {
    if (!inputText) return "";
    let res = inputText;

    // 1. Remove Zero-Width and invisible characters
    if (stripInvisibleChars) {
      res = res.replace(/[\u200B-\u200D\uFEFF\u00A0]/g, " ");
    }

    // 2. Normalize smart quotes and apostrophes
    if (normalizeQuotes) {
      res = res
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2013\u2014]/g, "-");
    }

    // 3. Strip HTML Tags
    if (stripHtml) {
      res = res.replace(/<[^>]*>/g, "");
      res = res
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    }

    // 4. Strip Tracking Parameters from URLs
    if (stripTrackingUrls) {
      res = res.replace(/(https?:\/\/[^\s]+)/g, (url) => {
        try {
          const parsed = new URL(url);
          const trackingParams = [
            "utm_source", "utm_medium", "utm_campaign", "utm_term",
            "utm_content", "gclid", "fbclid", "msclkid", "ref", "ref_src",
            "mc_cid", "mc_eid", "_ga"
          ];
          trackingParams.forEach((param) => parsed.searchParams.delete(param));
          return parsed.toString();
        } catch (e) {
          return url;
        }
      });
    }

    // 5. Strip extra spaces per line
    if (stripExtraSpaces) {
      res = res
        .split("\n")
        .map((line) => line.trim().replace(/[ \t]+/g, " "))
        .join("\n");
    }

    // 6. Strip redundant empty blank lines
    if (stripEmptyLines) {
      res = res.replace(/\n{3,}/g, "\n\n").trim();
    }

    return res.trim();
  }, [
    inputText,
    stripExtraSpaces,
    stripEmptyLines,
    stripHtml,
    stripTrackingUrls,
    stripInvisibleChars,
    normalizeQuotes,
  ]);

  const readFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        toast.success("Pasted text from clipboard!");
      } else {
        toast.error("Clipboard is empty.");
      }
    } catch (e) {
      toast.error("Clipboard read permission denied. Please paste manually.");
    }
  };

  const handleCopyCleaned = () => {
    if (!cleanedText) return;
    navigator.clipboard.writeText(cleanedText);
    setCopied(true);
    toast.success("Cleaned text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!cleanedText) return;
    const blob = new Blob([cleanedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sanitized-clipboard.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded sanitized text!");
  };

  const charsSaved = Math.max(0, inputText.length - cleanedText.length);

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Clipboard Cleaner & Text Sanitizer"
          description="Instantly sanitize messy text by removing unwanted HTML tags, tracking URL parameters, trailing whitespace, smart quotes, and invisible zero-width characters."
          icon={ClipboardCheck}
          badgeText="🧹 1-Click Clipboard Sanitizer • Zero-Width Character Removal"
        />

        {/* Cleaning Options Checkboxes */}
        <GlassCard className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-border/60 pb-2">
            <Eraser className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-foreground">Sanitization Filters & Rules</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer p-2 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors">
              <input
                type="checkbox"
                checked={stripExtraSpaces}
                onChange={(e) => setStripExtraSpaces(e.target.checked)}
                className="rounded border-border accent-primary h-4 w-4"
              />
              <span>Collapse multiple spaces & trim</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-2 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors">
              <input
                type="checkbox"
                checked={stripEmptyLines}
                onChange={(e) => setStripEmptyLines(e.target.checked)}
                className="rounded border-border accent-primary h-4 w-4"
              />
              <span>Remove duplicate blank lines</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-2 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors">
              <input
                type="checkbox"
                checked={stripHtml}
                onChange={(e) => setStripHtml(e.target.checked)}
                className="rounded border-border accent-primary h-4 w-4"
              />
              <span>Strip HTML tags & entities</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-2 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors">
              <input
                type="checkbox"
                checked={stripTrackingUrls}
                onChange={(e) => setStripTrackingUrls(e.target.checked)}
                className="rounded border-border accent-primary h-4 w-4"
              />
              <span>Clean tracking UTM / gclid links</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-2 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors">
              <input
                type="checkbox"
                checked={stripInvisibleChars}
                onChange={(e) => setStripInvisibleChars(e.target.checked)}
                className="rounded border-border accent-primary h-4 w-4"
              />
              <span>Remove zero-width characters</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-2 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors">
              <input
                type="checkbox"
                checked={normalizeQuotes}
                onChange={(e) => setNormalizeQuotes(e.target.checked)}
                className="rounded border-border accent-primary h-4 w-4"
              />
              <span>Normalize smart quotes (“” ➔ &quot;&quot;)</span>
            </label>
          </div>
        </GlassCard>

        {/* Dual Input/Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Raw Dirty Text (Left) */}
          <GlassCard className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground pb-1 border-b border-border/40">
              <span className="font-bold text-foreground">Dirty Raw Text</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={readFromClipboard}
                  className="h-7 text-xs text-primary font-semibold hover:bg-primary/10"
                >
                  <ClipboardCheck className="w-3.5 h-3.5 mr-1" /> Paste Clipboard
                </Button>
                {inputText && (
                  <button
                    type="button"
                    onClick={() => setInputText("")}
                    className="text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste messy text, rich text clippings, or URLs here..."
              rows={9}
              className="w-full bg-transparent text-foreground text-xs sm:text-sm font-mono outline-none resize-y min-h-[200px] leading-relaxed"
            />

            <div className="text-[11px] text-muted-foreground font-mono pt-1 text-right">
              {inputText.length} characters • {inputText.split("\n").length} lines
            </div>
          </GlassCard>

          {/* Clean Sanitized Text (Right) */}
          <GlassCard className="p-4 space-y-2 border-primary/20 bg-primary/5">
            <div className="flex items-center justify-between text-xs text-muted-foreground pb-1 border-b border-border/40">
              <span className="font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Sanitized Clean Text
              </span>
              
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCleaned}
                  disabled={!cleanedText}
                  className="h-7 text-xs font-semibold gap-1 text-muted-foreground hover:text-foreground"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Clean"}</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  disabled={!cleanedText}
                  className="h-7 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  title="Download .TXT"
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 py-1 text-foreground font-mono text-xs sm:text-sm font-medium whitespace-pre-wrap select-all leading-relaxed min-h-[200px] break-words">
              {cleanedText || <span className="text-muted-foreground font-normal italic">Clean output will appear here...</span>}
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-1 border-t border-border/40">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {charsSaved > 0 ? `-${charsSaved} junk chars removed` : "Cleaned"}
              </span>
              <span>{cleanedText.length} characters</span>
            </div>
          </GlassCard>

        </div>

        {/* Share & Embed Bar */}
        <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            100% Client-Side Privacy • Zero Clipboard History Logged
          </span>
          <div className="flex items-center gap-2">
            <ShareResultButton
              toolTitle="Clipboard Cleaner"
              resultTitle="Clipboard Text Sanitized"
              resultSummary={`Removed ${charsSaved} unwanted formatting characters.`}
              resultMetrics={[
                { label: "Original Length", value: `${inputText.length} chars` },
                { label: "Clean Length", value: `${cleanedText.length} chars` },
                { label: "Junk Saved", value: `${charsSaved} chars` },
              ]}
            />
            <EmbedButton toolPath="/tools/util/clipboard-cleaner" toolTitle="Clipboard Cleaner" />
          </div>
        </GlassCard>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Paste or Read Clipboard", description: "Paste messy text from web pages, PDFs, Word docs, or emails." },
            { step: "2", title: "Automatic Sanitization", description: "Instantly strips HTML, tracking parameters, double spaces, and invisible characters." },
            { step: "3", title: "1-Click Copy Clean Text", description: "Copy pure unformatted text back to your clipboard ready for clean pasting." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Strip URL Tracking Queries", description: "Removes annoying 'utm_source', 'gclid', and referral tags from links inside pasted text." },
            { title: "Zero-Width Character Removal", description: "Deletes invisible Unicode characters that break database queries and code compilers." },
            { title: "Smart Quote Normalization", description: "Converts curly typographic quotes and em-dashes into standard ASCII characters." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "What are zero-width characters?", answer: "Zero-width characters (like U+200B and U+FEFF) are invisible Unicode characters often copied accidentally from formatted web pages that cause syntax errors in code or database corruption." },
            { question: "Does this tool store my copied text?", answer: "No. All text processing occurs strictly in your browser memory. Your text never leaves your device." },
            { question: "Can I remove HTML formatting from copied website text?", answer: "Yes! The HTML tag filter strips out all <p>, <div>, <span>, and formatting tags to leave pure plain text." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/util/clipboard-cleaner" />

      </div>
    </div>
  );
}
