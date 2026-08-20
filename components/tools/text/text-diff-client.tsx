"use client";

import React, { useState, useMemo, useCallback } from "react";
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
  GitCompare, ArrowRightLeft, Copy, Check, Trash2, Columns2,
  Rows, Sparkles, FileCode, CheckCircle2, AlertCircle, Info, RefreshCw
} from "lucide-react";
import toast from "react-hot-toast";

// Myers Diff / Character-level LCS algorithm
interface DiffPart {
  value: string;
  added?: boolean;
  removed?: boolean;
}

function diffChars(text1: string, text2: string): DiffPart[] {
  const s1 = text1;
  const s2 = text2;
  const n = s1.length;
  const m = s2.length;

  // Build LCS matrix
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build diff parts
  let i = n;
  let j = m;
  const parts: DiffPart[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && s1[i - 1] === s2[j - 1]) {
      parts.unshift({ value: s1[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      parts.unshift({ value: s2[j - 1], added: true });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      parts.unshift({ value: s1[i - 1], removed: true });
      i--;
    }
  }

  // Merge consecutive parts of the same type
  const merged: DiffPart[] = [];
  for (const part of parts) {
    const last = merged[merged.length - 1];
    if (last && Boolean(last.added) === Boolean(part.added) && Boolean(last.removed) === Boolean(part.removed)) {
      last.value += part.value;
    } else {
      merged.push({ ...part });
    }
  }

  return merged;
}

interface LineDiff {
  originalLineNum?: number;
  modifiedLineNum?: number;
  type: "equal" | "add" | "remove" | "modify";
  leftText?: string;
  rightText?: string;
  charDiff?: DiffPart[];
}

const SAMPLE_DIFFS = [
  {
    title: "URL Typo Fix",
    text1: "https://toolzium.com/tools/text/emoji-picke",
    text2: "https://toolzium.com/tools/text/emoji-picker",
  },
  {
    title: "Code Refactor",
    text1: `function calculateTotal(price, tax) {
  const subtotal = price * 1.0;
  return subtotal + (subtotal * tax);
}`,
    text2: `function calculateTotal(price, taxRate = 0.08) {
  const subtotal = Number(price);
  return Number((subtotal * (1 + taxRate)).toFixed(2));
}`,
  },
  {
    title: "Document Revision",
    text1: "The quick brown fox jumps over the lazy dog in the sunny park.",
    text2: "The fast golden fox leaped over the sleepy dog in the quiet park.",
  },
];

export default function TextDiffClient() {
  const [text1, setText1] = useState(SAMPLE_DIFFS[0].text1);
  const [text2, setText2] = useState(SAMPLE_DIFFS[0].text2);
  const [viewMode, setViewMode] = useState<"split" | "unified">("unified");
  const [granularity, setGranularity] = useState<"char" | "line">("char");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [copied, setCopied] = useState(false);

  // Compute line-by-line and character-level differences
  const diffLines = useMemo<LineDiff[]>(() => {
    let t1 = text1;
    let t2 = text2;

    if (ignoreWhitespace) {
      t1 = t1.replace(/[ \t]+/g, " ");
      t2 = t2.replace(/[ \t]+/g, " ");
    }

    const lines1 = t1.split("\n");
    const lines2 = t2.split("\n");
    const maxLen = Math.max(lines1.length, lines2.length);
    const result: LineDiff[] = [];

    let leftNum = 1;
    let rightNum = 1;

    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i] ?? null;
      const l2 = lines2[i] ?? null;

      const compare1 = l1 !== null && ignoreCase ? l1.toLowerCase() : l1;
      const compare2 = l2 !== null && ignoreCase ? l2.toLowerCase() : l2;

      if (l1 !== null && l2 !== null) {
        if (compare1 === compare2) {
          result.push({
            originalLineNum: leftNum++,
            modifiedLineNum: rightNum++,
            type: "equal",
            leftText: l1,
            rightText: l2,
          });
        } else {
          // Line is modified: compute exact character diff
          const parts = granularity === "char" ? diffChars(l1, l2) : [];
          result.push({
            originalLineNum: leftNum++,
            modifiedLineNum: rightNum++,
            type: "modify",
            leftText: l1,
            rightText: l2,
            charDiff: parts,
          });
        }
      } else if (l1 !== null && l2 === null) {
        result.push({
          originalLineNum: leftNum++,
          type: "remove",
          leftText: l1,
        });
      } else if (l1 === null && l2 !== null) {
        result.push({
          modifiedLineNum: rightNum++,
          type: "add",
          rightText: l2,
        });
      }
    }

    return result;
  }, [text1, text2, granularity, ignoreCase, ignoreWhitespace]);

  // Statistics Summary
  const stats = useMemo(() => {
    let addedCount = 0;
    let removedCount = 0;
    let modifiedCount = 0;
    let equalCount = 0;

    for (const line of diffLines) {
      if (line.type === "add") addedCount++;
      else if (line.type === "remove") removedCount++;
      else if (line.type === "modify") modifiedCount++;
      else equalCount++;
    }

    const totalLines = diffLines.length || 1;
    const similarity = Math.max(
      0,
      Math.min(100, Math.round((equalCount / totalLines) * 100))
    );

    return { addedCount, removedCount, modifiedCount, equalCount, similarity };
  }, [diffLines]);

  const handleSwap = () => {
    const prev1 = text1;
    setText1(text2);
    setText2(prev1);
  };

  const handleCopyUnified = () => {
    const output = diffLines
      .map((d) => {
        if (d.type === "equal") return ` ${d.leftText}`;
        if (d.type === "remove") return `-${d.leftText}`;
        if (d.type === "add") return `+${d.rightText}`;
        return `-${d.leftText}\n+${d.rightText}`;
      })
      .join("\n");

    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Unified diff copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText1("");
    setText2("");
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Text Diff Viewer & Character Comparison Studio"
          description="Compare two texts side-by-side or unified with character-level difference highlighting, line numbers, word-by-word tracking, and instant patch export."
          icon={GitCompare}
          badgeText="🔍 Character-Level Precise Highlighting • Side-by-Side & Unified"
        />

        {/* Top Controls: Preset Chips & Settings Bar */}
        <GlassCard className="p-4 sm:p-5 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
            {/* Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-semibold">Try Example:</span>
              {SAMPLE_DIFFS.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setText1(sample.text1);
                    setText2(sample.text2);
                  }}
                  className="text-[11px] bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground px-2.5 py-1 rounded-lg border border-border/60 transition-all cursor-pointer font-medium"
                >
                  {sample.title}
                </button>
              ))}
            </div>

            {/* View Mode & Swap Buttons */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-muted/40 p-1 rounded-xl border border-border/60">
                <button
                  type="button"
                  onClick={() => setViewMode("unified")}
                  className={cn(
                    "px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
                    viewMode === "unified"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Rows className="w-3.5 h-3.5" /> Unified View
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("split")}
                  className={cn(
                    "px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
                    viewMode === "split"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Columns2 className="w-3.5 h-3.5" /> Side-by-Side
                </button>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSwap}
                className="h-8 text-xs font-semibold gap-1 rounded-xl"
                title="Swap Original and Modified"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" /> Swap
              </Button>
            </div>
          </div>

          {/* Granularity & Options Checkboxes */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={granularity === "char"}
                  onChange={(e) => setGranularity(e.target.checked ? "char" : "line")}
                  className="rounded border-border accent-primary h-4 w-4"
                />
                <span>Character-Level Highlighting</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-muted-foreground hover:text-foreground">
                <input
                  type="checkbox"
                  checked={ignoreCase}
                  onChange={(e) => setIgnoreCase(e.target.checked)}
                  className="rounded border-border accent-primary h-4 w-4"
                />
                <span>Ignore Case</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-muted-foreground hover:text-foreground">
                <input
                  type="checkbox"
                  checked={ignoreWhitespace}
                  onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                  className="rounded border-border accent-primary h-4 w-4"
                />
                <span>Ignore Whitespace</span>
              </label>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 font-mono font-bold text-xs">
              <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                +{stats.addedCount} Added
              </span>
              <span className="text-red-500 bg-red-500/10 px-2 py-0.5 rounded-md">
                -{stats.removedCount} Removed
              </span>
              <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                ~{stats.modifiedCount} Modified
              </span>
              <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                {stats.similarity}% Match
              </span>
            </div>
          </div>

        </GlassCard>

        {/* Input Text Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Original Text (Left) */}
          <GlassCard className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground pb-1 border-b border-border/40">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Original Text (Before)
              </span>
              <span className="font-mono text-[11px]">{text1.length} chars</span>
            </div>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Paste original text here..."
              rows={6}
              className="w-full bg-transparent text-foreground text-xs sm:text-sm font-mono outline-none resize-y min-h-[140px] leading-relaxed"
            />
          </GlassCard>

          {/* Modified Text (Right) */}
          <GlassCard className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground pb-1 border-b border-border/40">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Modified Text (After)
              </span>
              <span className="font-mono text-[11px]">{text2.length} chars</span>
            </div>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Paste modified text here..."
              rows={6}
              className="w-full bg-transparent text-foreground text-xs sm:text-sm font-mono outline-none resize-y min-h-[140px] leading-relaxed"
            />
          </GlassCard>

        </div>

        {/* Diff Output Display */}
        <GlassCard className="p-5 sm:p-6 space-y-4">
          
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                {viewMode === "unified" ? "Unified Difference View" : "Side-by-Side Difference View"}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyUnified}
                className="h-8 text-xs font-semibold gap-1.5 rounded-xl"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied Diff!" : "Copy Unified Diff"}</span>
              </Button>
            </div>
          </div>

          {/* Unified View */}
          {viewMode === "unified" && (
            <div className="font-mono text-xs sm:text-sm border border-border/80 rounded-xl overflow-x-auto bg-background/90 divide-y divide-border/30">
              {diffLines.map((line, idx) => {
                if (line.type === "equal") {
                  return (
                    <div key={idx} className="flex items-stretch hover:bg-muted/10">
                      <span className="w-12 py-1.5 px-2 text-right select-none text-[11px] text-muted-foreground border-r border-border/30 bg-muted/20">
                        {line.originalLineNum}
                      </span>
                      <span className="w-12 py-1.5 px-2 text-right select-none text-[11px] text-muted-foreground border-r border-border/30 bg-muted/20">
                        {line.modifiedLineNum}
                      </span>
                      <span className="w-6 py-1.5 text-center text-muted-foreground select-none"> </span>
                      <span className="py-1.5 px-3 flex-1 whitespace-pre-wrap text-foreground">
                        {line.leftText}
                      </span>
                    </div>
                  );
                }

                if (line.type === "modify") {
                  return (
                    <div key={idx} className="divide-y divide-border/20">
                      {/* Left Removed line with character highlighting */}
                      <div className="flex items-stretch bg-red-500/10 hover:bg-red-500/15">
                        <span className="w-12 py-1.5 px-2 text-right select-none text-[11px] text-red-400 border-r border-red-500/20 bg-red-500/20">
                          {line.originalLineNum}
                        </span>
                        <span className="w-12 py-1.5 px-2 text-right select-none text-[11px] text-muted-foreground/40 border-r border-border/30 bg-muted/20">
                          -
                        </span>
                        <span className="w-6 py-1.5 text-center text-red-500 font-bold select-none">-</span>
                        <span className="py-1.5 px-3 flex-1 whitespace-pre-wrap text-red-300">
                          {line.charDiff && line.charDiff.length > 0 ? (
                            line.charDiff.map((part, pIdx) => {
                              if (part.added) return null;
                              if (part.removed) {
                                return (
                                  <span
                                    key={pIdx}
                                    className="bg-red-600/40 text-red-200 font-bold px-0.5 rounded underline decoration-red-400"
                                  >
                                    {part.value}
                                  </span>
                                );
                              }
                              return <span key={pIdx}>{part.value}</span>;
                            })
                          ) : (
                            line.leftText
                          )}
                        </span>
                      </div>

                      {/* Right Added line with character highlighting */}
                      <div className="flex items-stretch bg-emerald-500/10 hover:bg-emerald-500/15">
                        <span className="w-12 py-1.5 px-2 text-right select-none text-[11px] text-muted-foreground/40 border-r border-border/30 bg-muted/20">
                          -
                        </span>
                        <span className="w-12 py-1.5 px-2 text-right select-none text-[11px] text-emerald-400 border-r border-emerald-500/20 bg-emerald-500/20">
                          {line.modifiedLineNum}
                        </span>
                        <span className="w-6 py-1.5 text-center text-emerald-500 font-bold select-none">+</span>
                        <span className="py-1.5 px-3 flex-1 whitespace-pre-wrap text-emerald-300 font-medium">
                          {line.charDiff && line.charDiff.length > 0 ? (
                            line.charDiff.map((part, pIdx) => {
                              if (part.removed) return null;
                              if (part.added) {
                                return (
                                  <span
                                    key={pIdx}
                                    className="bg-emerald-600/40 text-emerald-100 font-extrabold px-0.5 rounded shadow-sm"
                                  >
                                    {part.value}
                                  </span>
                                );
                              }
                              return <span key={pIdx}>{part.value}</span>;
                            })
                          ) : (
                            line.rightText
                          )}
                        </span>
                      </div>
                    </div>
                  );
                }

                if (line.type === "remove") {
                  return (
                    <div key={idx} className="flex items-stretch bg-red-500/10 hover:bg-red-500/15">
                      <span className="w-12 py-1.5 px-2 text-right select-none text-[11px] text-red-400 border-r border-red-500/20 bg-red-500/20">
                        {line.originalLineNum}
                      </span>
                      <span className="w-12 py-1.5 px-2 text-right select-none text-[11px] text-muted-foreground/40 border-r border-border/30 bg-muted/20">
                        -
                      </span>
                      <span className="w-6 py-1.5 text-center text-red-500 font-bold select-none">-</span>
                      <span className="py-1.5 px-3 flex-1 whitespace-pre-wrap text-red-300">
                        {line.leftText}
                      </span>
                    </div>
                  );
                }

                if (line.type === "add") {
                  return (
                    <div key={idx} className="flex items-stretch bg-emerald-500/10 hover:bg-emerald-500/15">
                      <span className="w-12 py-1.5 px-2 text-right select-none text-[11px] text-muted-foreground/40 border-r border-border/30 bg-muted/20">
                        -
                      </span>
                      <span className="w-12 py-1.5 px-2 text-right select-none text-[11px] text-emerald-400 border-r border-emerald-500/20 bg-emerald-500/20">
                        {line.modifiedLineNum}
                      </span>
                      <span className="w-6 py-1.5 text-center text-emerald-500 font-bold select-none">+</span>
                      <span className="py-1.5 px-3 flex-1 whitespace-pre-wrap text-emerald-300 font-medium">
                        {line.rightText}
                      </span>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}

          {/* Side-by-Side (Split) View */}
          {viewMode === "split" && (
            <div className="grid grid-cols-1 md:grid-cols-2 border border-border/80 rounded-xl overflow-hidden font-mono text-xs sm:text-sm bg-background/90 divide-y md:divide-y-0 md:divide-x divide-border/40">
              
              {/* Left Column (Original) */}
              <div className="divide-y divide-border/20">
                <div className="p-2 text-xs font-bold text-muted-foreground bg-muted/30 text-center border-b border-border/40">
                  Original
                </div>
                {diffLines.map((line, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-stretch min-h-[30px]",
                      line.type === "remove" || line.type === "modify"
                        ? "bg-red-500/10 text-red-300"
                        : "text-foreground"
                    )}
                  >
                    <span className="w-10 py-1 px-2 text-right select-none text-[11px] text-muted-foreground border-r border-border/30 bg-muted/20">
                      {line.originalLineNum ?? ""}
                    </span>
                    <span className="py-1 px-2.5 flex-1 whitespace-pre-wrap">
                      {line.type === "modify" && line.charDiff ? (
                        line.charDiff.map((p, pIdx) => {
                          if (p.added) return null;
                          if (p.removed) {
                            return (
                              <span key={pIdx} className="bg-red-600/40 text-red-200 font-bold px-0.5 rounded">
                                {p.value}
                              </span>
                            );
                          }
                          return <span key={pIdx}>{p.value}</span>;
                        })
                      ) : (
                        line.leftText ?? ""
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right Column (Modified) */}
              <div className="divide-y divide-border/20">
                <div className="p-2 text-xs font-bold text-muted-foreground bg-muted/30 text-center border-b border-border/40">
                  Modified
                </div>
                {diffLines.map((line, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-stretch min-h-[30px]",
                      line.type === "add" || line.type === "modify"
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "text-foreground"
                    )}
                  >
                    <span className="w-10 py-1 px-2 text-right select-none text-[11px] text-muted-foreground border-r border-border/30 bg-muted/20">
                      {line.modifiedLineNum ?? ""}
                    </span>
                    <span className="py-1 px-2.5 flex-1 whitespace-pre-wrap">
                      {line.type === "modify" && line.charDiff ? (
                        line.charDiff.map((p, pIdx) => {
                          if (p.removed) return null;
                          if (p.added) {
                            return (
                              <span key={pIdx} className="bg-emerald-600/40 text-emerald-100 font-extrabold px-0.5 rounded">
                                {p.value}
                              </span>
                            );
                          }
                          return <span key={pIdx}>{p.value}</span>;
                        })
                      ) : (
                        line.rightText ?? ""
                      )}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Share & Embed Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
            <span className="text-xs text-muted-foreground font-mono">
              Similarity: {stats.similarity}% • {diffLines.length} Total Lines
            </span>

            <div className="flex items-center gap-2">
              <ShareResultButton
                toolTitle="Text Diff Viewer"
                resultTitle="Diff Comparison Analysis"
                resultSummary={`Compared texts with ${stats.similarity}% similarity, +${stats.addedCount} additions, -${stats.removedCount} deletions.`}
                resultMetrics={[
                  { label: "Similarity", value: `${stats.similarity}%` },
                  { label: "Added", value: `+${stats.addedCount}` },
                  { label: "Removed", value: `-${stats.removedCount}` },
                  { label: "Modified", value: `~${stats.modifiedCount}` },
                ]}
              />
              <EmbedButton toolPath="/tools/text/text-diff" toolTitle="Text Diff Viewer" />
            </div>
          </div>

        </GlassCard>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Paste Both Texts", description: "Paste your original text on the left and revised version on the right (URLs, code snippets, or articles)." },
            { step: "2", title: "Instant Character Highlighting", description: "Our Myers LCS engine pinpoints exact character and word-level modifications in dark green and red." },
            { step: "3", title: "Toggle View & Export", description: "Switch seamlessly between Split (Side-by-Side) and Unified view, or copy the standard patch format." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Exact Character-Level Diffing", description: "Highlights the exact missing letter (e.g. 'emoji-picke' vs 'emoji-picker') without obscuring the entire line." },
            { title: "Side-by-Side & Unified Modes", description: "Toggle between GitHub-style dual column comparison and unified patch inspection." },
            { title: "Custom Diff Rules", description: "Optionally ignore case differences or whitespace changes for clean structural analysis." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "How does character-level diffing work?", answer: "Instead of just marking whole lines as added or deleted, our algorithm runs Longest Common Subsequence (LCS) character tokenization to highlight the exact modified characters." },
            { question: "Can I compare code files and markdown documents?", answer: "Yes! The diff viewer handles JavaScript, TypeScript, Python, HTML/CSS, JSON, SQL, and plain prose documents seamlessly." },
            { question: "Is my text uploaded to a server?", answer: "No. All text comparison happens 100% locally in your browser memory with zero data transmission." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/text-diff" />

      </div>
    </div>
  );
}
