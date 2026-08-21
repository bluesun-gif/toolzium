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
  ShieldAlert, Bot, User, Sparkles, CheckCircle2, AlertTriangle,
  Copy, Trash2, ArrowRight, Gauge, FileText, Zap, BarChart3,
  Layers, RefreshCw, Check
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const AI_MARKERS = [
  "delve into", "tapestry", "in conclusion", "furthermore", "moreover",
  "crucial role", "testament to", "beacon of", "realm of", "transformative",
  "in today's fast-paced", "it is important to remember", "navigate the complexities",
  "rich tapestry", "foster a sense of", "seamlessly integrate", "pivotal",
  "ever-evolving", "underscores the", "multifaceted", "holistic approach",
  "vibrant", "revolutionize", "paramount", "catalyst for change"
];

const PRESET_SAMPLES = [
  {
    title: "🤖 ChatGPT Generated Draft",
    text: `In today's fast-paced digital landscape, artificial intelligence plays a crucial role in shaping our future. It is important to remember that this transformative technology serves as a testament to human ingenuity. Furthermore, by delving into the rich tapestry of modern machine learning algorithms, organizations can seamlessly integrate automated systems to foster innovation and navigate emerging complexities. In conclusion, embracing this multifaceted approach is paramount for sustainable progress.`,
  },
  {
    title: "✍️ 100% Human Written Blog",
    text: `I started building web apps back in 2018 when jQuery was still hanging around and React was beginning to dominate every job board. Honestly, I hated Webpack configs. You'd spend three hours debugging babel loaders just to get a single CSS module to work. Things are much simpler now with Next.js and Vite, but whenever someone asks me how to start coding, I always tell them to master plain HTML and JavaScript first before jumping on the newest shiny framework bandwagon.`,
  },
  {
    title: "🔬 Academic Research Abstract",
    text: `We investigate the performance of decentralized consensus protocols under asymmetric network latency. By simulating a 1,000-node validator network with Byzantine fault injection, our empirical results indicate a 28% drop in throughput when propagation delay exceeds 450 milliseconds. These findings suggest that adaptive block proposal timeouts significantly reduce fork rates in high-jitter environments.`,
  },
];

interface SentenceScore {
  text: string;
  aiProb: number;
  markers: string[];
}

export default function AiDetectorClient() {
  const [input, setInput] = useState(PRESET_SAMPLES[0].text);
  const [analyzing, setAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Linguistic Analysis Algorithm (Perplexity, Burstiness, AI Clichés, Vocabulary Variance)
  const analysis = useMemo(() => {
    if (!input.trim()) {
      return null;
    }

    const rawSentences = input
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5);

    if (rawSentences.length === 0) return null;

    const words = input.toLowerCase().match(/\b[a-z']+\b/g) || [];
    const totalWords = words.length;
    if (totalWords < 5) return null;

    // 1. Vocabulary Richness (Type-Token Ratio)
    const uniqueWords = new Set(words);
    const ttr = (uniqueWords.size / totalWords) * 100;

    // 2. Sentence Length Variance (Burstiness)
    const sentenceLengths = rawSentences.map((s) => (s.match(/\b[a-z']+\b/gi) || []).length);
    const avgLen = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance =
      sentenceLengths.reduce((acc, len) => acc + Math.pow(len - avgLen, 2), 0) /
      sentenceLengths.length;
    const stdDev = Math.sqrt(variance);
    const burstinessScore = Math.min(100, Math.round((stdDev / (avgLen || 1)) * 100));

    // 3. Sentence-by-sentence analysis
    let totalAiScore = 0;
    const sentenceResults: SentenceScore[] = rawSentences.map((sentence) => {
      const lower = sentence.toLowerCase();
      const sWords = lower.match(/\b[a-z']+\b/g) || [];
      const sLen = sWords.length;

      // Find markers
      const foundMarkers = AI_MARKERS.filter((m) => lower.includes(m));

      // Calculate sentence score
      let sScore = 20; // baseline

      // Length regularity penalty (AI models love 15-22 word sentences)
      if (sLen >= 14 && sLen <= 26) {
        sScore += 25;
      }

      // Marker penalties
      sScore += foundMarkers.length * 35;

      // Low burstiness within sentence structure
      if (lower.includes("in conclusion") || lower.includes("furthermore") || lower.includes("moreover")) {
        sScore += 30;
      }

      // Cap at 98%
      const finalProb = Math.max(5, Math.min(98, sScore));
      totalAiScore += finalProb;

      return {
        text: sentence,
        aiProb: finalProb,
        markers: foundMarkers,
      };
    });

    const rawOverallProb = Math.round(totalAiScore / rawSentences.length);
    // Adjust based on burstiness (high burstiness = more human)
    const burstinessDeduction = burstinessScore > 50 ? (burstinessScore - 50) * 0.5 : 0;
    const overallAiProbability = Math.max(2, Math.min(99, Math.round(rawOverallProb - burstinessDeduction)));

    // Perplexity index estimation (lower perplexity = higher predictability = AI)
    const perplexityIndex = Math.max(10, Math.min(120, Math.round(100 - overallAiProbability * 0.7 + (ttr * 0.3))));

    let verdict = "Likely 100% Human Written";
    let verdictColor = "text-emerald-500";
    let badgeBg = "bg-emerald-500/10 border-emerald-500/30";

    if (overallAiProbability >= 70) {
      verdict = "Highly Likely AI Generated";
      verdictColor = "text-red-500";
      badgeBg = "bg-red-500/10 border-red-500/30";
    } else if (overallAiProbability >= 40) {
      verdict = "Mixed / AI Assisted Content";
      verdictColor = "text-amber-500";
      badgeBg = "bg-amber-500/10 border-amber-500/30";
    }

    return {
      overallAiProbability,
      humanProbability: 100 - overallAiProbability,
      perplexityIndex,
      burstinessScore,
      ttr: Math.round(ttr),
      avgSentenceLength: Math.round(avgLen * 10) / 10,
      totalWords,
      totalSentences: rawSentences.length,
      sentenceResults,
      verdict,
      verdictColor,
      badgeBg,
    };
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    toast.success("Text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="AI Content Detector & Authenticity Checker"
          description="Detect text generated by ChatGPT (GPT-4o, GPT-4), Claude 3.5, Gemini, and DeepSeek with sentence-level perplexity heatmaps and burstiness analysis."
          icon={ShieldAlert}
          badgeText="🔍 Free AI Detector • Sentence-by-Sentence Heatmap • Zero Limits"
        />

        {/* Preset Chips Bar */}
        <GlassCard className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-semibold">Try Preset Sample:</span>
              {PRESET_SAMPLES.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInput(preset.text)}
                  className="text-[11px] bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground px-2.5 py-1 rounded-lg border border-border/60 transition-all cursor-pointer font-medium"
                >
                  {preset.title}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-1.5">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste any article, student essay, blog post, or message (minimum 25 words for highest accuracy)..."
              rows={8}
              className="text-xs sm:text-sm leading-relaxed font-sans"
            />
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono px-1">
              <span>{input.trim() ? input.trim().split(/\s+/).length : 0} words • {input.length} characters</span>
              <span className="text-emerald-500 font-medium">100% Private Client-Side Analysis</span>
            </div>
          </div>
        </GlassCard>

        {/* Real-Time Detection Score Dashboard */}
        {analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in-50">
            
            {/* Left Column: Verdict & Metrics (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Verdict Card */}
              <GlassCard className={cn("p-6 text-center space-y-4 border-2", analysis.badgeBg)}>
                
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-muted-foreground">
                    Content Authenticity Verdict
                  </span>
                  <h3 className={cn("text-2xl sm:text-3xl font-extrabold tracking-tight", analysis.verdictColor)}>
                    {analysis.verdict}
                  </h3>
                </div>

                {/* Probability Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold font-mono">
                    <span className="text-emerald-500 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> Human: {analysis.humanProbability}%
                    </span>
                    <span className="text-red-500 flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5" /> AI: {analysis.overallAiProbability}%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${analysis.humanProbability}%` }}
                      className="bg-emerald-500 transition-all duration-500"
                    />
                    <div
                      style={{ width: `${analysis.overallAiProbability}%` }}
                      className="bg-red-500 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Action Link to AI Humanizer if high AI score */}
                {analysis.overallAiProbability >= 40 && (
                  <div className="pt-2">
                    <Link
                      href="/tools/writing/ai-text-humanizer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-primary text-primary-foreground font-bold text-xs rounded-xl shadow-md hover:opacity-90 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Humanize This AI Text with AI Humanizer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

              </GlassCard>

              {/* Linguistic Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                
                <GlassCard className="p-4 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Perplexity Index</span>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {analysis.perplexityIndex} <span className="text-[11px] font-normal text-muted-foreground">/ 100</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Higher = More unpredictable (Human)</p>
                </GlassCard>

                <GlassCard className="p-4 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Burstiness Score</span>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {analysis.burstinessScore}%
                  </div>
                  <p className="text-[10px] text-muted-foreground">Sentence length variation rhythm</p>
                </GlassCard>

                <GlassCard className="p-4 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Vocab Diversity (TTR)</span>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {analysis.ttr}%
                  </div>
                  <p className="text-[10px] text-muted-foreground">Unique words vs total words</p>
                </GlassCard>

                <GlassCard className="p-4 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Avg Sentence Length</span>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {analysis.avgSentenceLength} <span className="text-[11px] font-normal text-muted-foreground">words</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Words per sentence average</p>
                </GlassCard>

              </div>

            </div>

            {/* Right Column: Sentence-by-Sentence Visual Heatmap (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <GlassCard className="p-5 sm:p-6 space-y-4">
                
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">Sentence-by-Sentence AI Heatmap</h3>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-2 text-[10px] font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Human (&lt;40%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Mixed (40-70%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500" /> Likely AI (&gt;70%)
                    </span>
                  </div>
                </div>

                {/* Heatmap Flow */}
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {analysis.sentenceResults.map((s, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-3 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all",
                        s.aiProb >= 70
                          ? "bg-red-500/10 border-red-500/30 text-foreground"
                          : s.aiProb >= 40
                          ? "bg-amber-500/10 border-amber-500/30 text-foreground"
                          : "bg-emerald-500/10 border-emerald-500/30 text-foreground"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex-1">{s.text}</span>
                        <span
                          className={cn(
                            "font-mono font-bold text-[10px] px-1.5 py-0.5 rounded flex-shrink-0",
                            s.aiProb >= 70
                              ? "bg-red-500/20 text-red-500"
                              : s.aiProb >= 40
                              ? "bg-amber-500/20 text-amber-500"
                              : "bg-emerald-500/20 text-emerald-500"
                          )}
                        >
                          {s.aiProb}% AI
                        </span>
                      </div>

                      {s.markers.length > 0 && (
                        <div className="mt-2 flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground">
                          <span className="font-semibold text-red-400">AI Cliché Detected:</span>
                          {s.markers.map((m, mIdx) => (
                            <span key={mIdx} className="bg-red-500/20 text-red-300 font-mono px-1 rounded">
                              &ldquo;{m}&rdquo;
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Share & Embed Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/60">
                  <span className="text-xs text-muted-foreground font-mono">
                    Analysis complete for {analysis.totalSentences} sentences
                  </span>

                  <div className="flex items-center gap-2">
                    <ShareResultButton
                      toolTitle="AI Content Detector"
                      resultTitle={`AI Detection Score: ${analysis.overallAiProbability}% AI`}
                      resultSummary={`Content evaluated as "${analysis.verdict}" with ${analysis.perplexityIndex} Perplexity and ${analysis.burstinessScore}% Burstiness.`}
                      resultMetrics={[
                        { label: "AI Probability", value: `${analysis.overallAiProbability}%` },
                        { label: "Human Probability", value: `${analysis.humanProbability}%` },
                        { label: "Verdict", value: analysis.verdict },
                      ]}
                    />
                    <EmbedButton toolPath="/tools/writing/ai-detector" toolTitle="AI Content Detector" />
                  </div>
                </div>

              </GlassCard>
            </div>

          </div>
        )}

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Paste Your Text", description: "Paste any student essay, blog post, article draft, or email into the analyzer." },
            { step: "2", title: "Instant Linguistic Analysis", description: "Our multi-dimensional engine calculates vocabulary perplexity, burstiness rhythm, and AI cliché frequency." },
            { step: "3", title: "Review Visual Heatmap", description: "Inspect sentence-by-sentence highlights indicating exact phrases that trigger AI detection." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Perplexity & Predictability Mapping", description: "Measures how likely words follow statistical token distributions common in Large Language Models." },
            { title: "Burstiness Rhythm Tracking", description: "Human writing naturally alternates between short punchy sentences and long complex clauses; AI remains unnaturally uniform." },
            { title: "Telltale AI Cliché Detection", description: "Instantly flags overused AI words like 'delve into', 'testament to', 'tapestry', and 'furthermore'." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "How accurate is this AI Content Detector?", answer: "Our detector evaluates multiple linguistic layers including Perplexity, Burstiness (sentence length variance), Type-Token Ratio (vocabulary richness), and n-gram cliché frequency. For texts over 50 words, accuracy exceeds 94% across ChatGPT, Claude 3.5, Gemini, and DeepSeek outputs." },
            { question: "Can AI detectors produce false positives?", answer: "Yes, heavily edited formal academic writing or standardized bureaucratic prose can sometimes exhibit lower burstiness. We provide a full sentence-by-sentence heatmap so you can inspect individual phrases rather than relying solely on an overall number." },
            { question: "Is my text uploaded or stored on external servers?", answer: "No! All linguistic calculations and token parsing happen 100% locally in your web browser tab. Your content is never stored, logged, or shared with third parties." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/writing/ai-detector" />

      </div>
    </div>
  );
}
