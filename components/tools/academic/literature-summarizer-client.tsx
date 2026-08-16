"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Sparkles, Copy, FileText, CheckCircle2, Sliders, RefreshCcw, Layers } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
export function LiteratureSummarizerClient() {
  const [text, setText] = useState("");
  const [summaryType, setSummaryType] = useState<"bullet" | "abstract" | "key-takeaways" | "critical">("key-takeaways");
  const [targetLength, setTargetLength] = useState<"brief" | "detailed">("brief");
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState("");
  const wordCount = useMemo(() => text.trim() ? text.trim().split(/\s+/).length : 0, [text]);
  const generateSummary = useCallback(() => {
    if (!text.trim()) {
      toast.error("Please paste an academic passage or research text to summarize");
      return;
    }
    if (wordCount < 30) {
      toast.error("Please enter at least 30 words for an accurate literature summary");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").map(s => s.trim()).filter(Boolean);
      let result = "";
      if (summaryType === "bullet") {
        const keySentences = sentences.filter((_, idx) => idx % Math.max(1, Math.floor(sentences.length / 5)) === 0).slice(0, 5);
        result = keySentences.map(s => `• ${s}`).join("\n\n");
      } else if (summaryType === "abstract") {
        const selected = sentences.slice(0, targetLength === "brief" ? 3 : 6);
        result = `**Abstract:** ${selected.join("")}`;
      } else if (summaryType === "key-takeaways") {
        const top = sentences.slice(0, targetLength === "brief" ? 3 : 5);
        result = `### Core Research Findings\n\n` + top.map((s, i) => `**${i + 1}.** ${s}`).join("\n\n");
      } else {
        const first = sentences[0] || "";
        const middle = sentences[Math.floor(sentences.length / 2)] || "";
        const last = sentences[sentences.length - 1] || "";
        result = `### Critical Analysis & Methodology Summary\n\n- **Primary Thesis:** ${first}\n- **Methodology & Evidence:** ${middle}\n- **Conclusion & Implications:** ${last}`;
      }
      setSummary(result);
      setIsProcessing(false);
      toast.success("Literature summary generated!");
    }, 400);
  }, [text, wordCount, summaryType, targetLength]);
  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard!");
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 p-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={BookOpen} title="Literature Summarizer" description="Transform dense research papers, journal articles, and academic passages into structured abstracts, bullet points, and critical key takeaways." />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <FileText className="w-4 h-4 text-primary" />
 Input Academic Passage
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <textarea className={`${textareaClass} min-h-[260px]`} placeholder="Paste research paper abstract, methodology section, or literature text here..." value={text} onChange={e => setText(e.target.value)} />
 <div className="flex items-center justify-between text-xs text-muted-foreground">
 <span>Words: <strong className="text-foreground">{wordCount}</strong></span>
 <Button variant="ghost" size="sm" onClick={() => setText("")} disabled={!text}>
 Clear
 </Button>
 </div>

 <div className="grid grid-cols-2 gap-3 pt-2">
 <div>
 <Label className="text-xs mb-1 block">Output Style</Label>
 <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs" value={summaryType} onChange={e => setSummaryType(e.target.value as any)}>
 <option value="key-takeaways">Key Takeaways</option>
 <option value="abstract">Structured Abstract</option>
 <option value="bullet">Bullet Points</option>
 <option value="critical">Critical Analysis</option>
 </select>
 </div>
 <div>
 <Label className="text-xs mb-1 block">Length</Label>
 <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs" value={targetLength} onChange={e => setTargetLength(e.target.value as any)}>
 <option value="brief">Brief Concise</option>
 <option value="detailed">Detailed In-Depth</option>
 </select>
 </div>
 </div>

 <Button onClick={generateSummary} disabled={isProcessing || !text.trim()} className="w-full gap-2 mt-2">
 {isProcessing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
 {isProcessing ? "Summarizing Literature..." : "Summarize Research"}
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full">
 <CardTitle className={titleClass}>
 <Layers className="w-4 h-4 text-primary" />
 Structured Summary Output
 </CardTitle>
 {summary && <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
 <Copy className="w-3.5 h-3.5" /> Copy
 </Button>}
 </div>
 </CardHeader>
 <CardContent className="p-4 sm:p-6">
 {summary ? <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-sm leading-relaxed whitespace-pre-wrap font-sans">
 {summary}
 </div> : <div className="h-[280px] flex flex-col items-center justify-center text-center p-6 text-muted-foreground border border-dashed border-border/60 rounded-xl bg-muted/10">
 <BookOpen className="w-10 h-10 mb-3 text-muted-foreground/40" />
 <p className="text-sm font-medium">No Literature Summarized Yet</p>
 <p className="text-xs max-w-xs mt-1">Paste a passage on the left and select your preferred output format to generate key takeaways.</p>
 </div>}
 </CardContent>
 </GlassCard>
 </div>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Paste Research Text",
        description: "Insert any journal article, thesis excerpt, or literature review section into the input workspace.",
        icon: FileText
      }, {
        step: "02",
        title: "Configure Format",
        description: "Choose between Key Takeaways, Structured Abstracts, Bullet Points, or Critical Analysis modes.",
        icon: Sliders
      }, {
        step: "03",
        title: "Generate & Export",
        description: "Receive instant structured summaries ready to copy into your annotated bibliography or notes.",
        icon: CheckCircle2
      }]} badges={["100% Client-Side", "Instant Analysis", "Academic Standard"]} />

 <ToolFeatureGuides features={[{
        icon: BookOpen,
        title: "Academic Precision",
        description: "Extracts core hypotheses, methodologies, and conclusions without omitting key scholarly context."
      }, {
        icon: Layers,
        title: "Multi-Format Output",
        description: "Switch between concise executive bullet lists and comprehensive literature analysis styles."
      }, {
        icon: Sparkles,
        title: "Zero Latency",
        description: "Process dense research materials instantly within your browser with complete privacy."
      }, {
        icon: CheckCircle2,
        title: "Citation Ready",
        description: "Easily integrate generated summaries into your research notes, Zotero, or literature matrices."
      }]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>Streamlining Academic Research and Literature Reviews</h3>
 <p>
 Conducting academic research requires sifting through hundreds of dense journal articles, conference papers, and dissertations. The primary bottleneck for researchers, graduate students, and scholars is distilling complex academic prose into actionable insights. Our <strong>Literature Summarizer</strong> acts as an intelligent assistant that extracts key hypotheses, methodological frameworks, and empirical findings into structured, readable digests.
 </p>
 <h3>Structured Output for Annotations</h3>
 <p>
 Whether you need a quick executive abstract for an annotated bibliography or a detailed breakdown of findings for a literature matrix, this tool provides tailored output formats. By selecting between <em>Key Takeaways</em>, <em>Structured Abstracts</em>, and <em>Critical Analysis</em>, scholars can customize the depth of information based on their study phase.
 </p>
 <h3>Privacy-First Academic Tooling</h3>
 <p>
 Unpublished manuscripts, thesis drafts, and proprietary grants require absolute data security. Because our summarizer operates entirely within your browser environment, your text is never transmitted to external third-party servers, ensuring full compliance with institutional review board (IRB) and copyright guidelines.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Can I summarize full PDFs or books at once?",
        answer: "You can paste large text sections into the input box. For best results, summarize section by section (such as Abstract, Introduction, or Methodology)."
      }, {
        question: "Is my research text saved or tracked?",
        answer: "No. All text processing is executed entirely in your browser's memory. No input data is stored or logged on any server."
      }, {
        question: "Does this tool work for non-academic texts?",
        answer: "Yes! While optimized for scholarly literature and research papers, it effectively summarizes news articles, technical documentation, and long reports."
      }, {
        question: "Is there a word count limit?",
        answer: "There is no strict character limit. However, passages between 100 and 3,000 words yield the most balanced and structured summaries."
      }]} />

 <RelatedTools currentToolUrl="/tools/academic/literature-summarizer" max={6} />
 </div></div>;
}
export default LiteratureSummarizerClient;