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
  BookOpen, Gauge, Clock, FileText, CheckCircle2, Award,
  Sparkles, Copy, Check, Trash2, BarChart2, GraduationCap,
  Users, Layers, ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_TEXTS = [
  {
    title: "📰 Plain English Web Copy (8th Grade)",
    text: `Clear communication is the key to connecting with your audience online. When you write simple sentences with everyday words, more people understand your message. Great writers avoid jargon and get straight to the point. This helps your readers find what they need quickly and take action without getting confused or frustrated.`,
  },
  {
    title: "🎓 Academic Journal Excerpt (College Level)",
    text: `The epistemological foundations of behavioral economics challenge conventional neoclassical paradigms regarding rational utility maximization. By empirically evaluating heuristic decision-making mechanisms and systemic cognitive biases under conditions of environmental uncertainty, contemporary researchers have formulated comprehensive models of bounded rationality.`,
  },
  {
    title: "🧒 Children's Story (Elementary)",
    text: `Once upon a time, a little brown bear lived in a big green forest. Every morning, the bear woke up and went to the river to catch fish. The sun was warm, and the birds sang happy songs in the tall trees.`,
  },
];

// Helper: Syllable counter
function countWordSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, "");
  word = word.replace(/^y/, "");
  const syl = word.match(/[aeiouy]{1,2}/g);
  return syl ? syl.length : 1;
}

export default function ReadabilityScoreClient() {
  const [text, setText] = useState(SAMPLE_TEXTS[0].text);
  const [copied, setCopied] = useState(false);

  // Compute all 6 Readability Indices and Text Statistics
  const stats = useMemo(() => {
    if (!text.trim()) return null;

    const cleanText = text.trim();
    const words = cleanText.match(/\b[a-zA-Z0-9'-]+\b/g) || [];
    const totalWords = words.length;
    if (totalWords === 0) return null;

    const sentences = cleanText
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const totalSentences = Math.max(1, sentences.length);

    const paragraphs = cleanText
      .split(/\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    const totalParagraphs = Math.max(1, paragraphs.length);

    const charactersWithSpaces = cleanText.length;
    const charactersNoSpaces = cleanText.replace(/\s+/g, "").length;
    const letters = (cleanText.match(/[a-zA-Z]/g) || []).length;

    // Syllables and Complex Words (3+ syllables)
    let totalSyllables = 0;
    let complexWords = 0;
    let monosyllableWords = 0;

    words.forEach((w) => {
      const syl = countWordSyllables(w);
      totalSyllables += syl;
      if (syl >= 3) complexWords++;
      if (syl === 1) monosyllableWords++;
    });

    const avgSentenceLength = totalWords / totalSentences;
    const avgSyllablesPerWord = totalSyllables / totalWords;
    const complexWordPercent = (complexWords / totalWords) * 100;

    // 1. Flesch Reading Ease (0-100)
    // Formula: 206.835 - (1.015 * ASL) - (84.6 * ASW)
    const fleschEaseRaw = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
    const fleschReadingEase = Math.max(0, Math.min(100, Math.round(fleschEaseRaw * 10) / 10));

    // 2. Flesch-Kincaid Grade Level
    // Formula: (0.39 * ASL) + (11.8 * ASW) - 15.59
    const fkGrade = Math.max(0, Math.round((0.39 * avgSentenceLength + 11.8 * avgSyllablesPerWord - 15.59) * 10) / 10);

    // 3. Gunning Fog Index
    // Formula: 0.4 * (ASL + complexWordPercent)
    const gunningFog = Math.max(0, Math.round(0.4 * (avgSentenceLength + complexWordPercent) * 10) / 10);

    // 4. Coleman-Liau Index
    // Formula: 0.0588 * L - 0.296 * S - 15.8 (L = letters per 100 words, S = sentences per 100 words)
    const L = (letters / totalWords) * 100;
    const S = (totalSentences / totalWords) * 100;
    const colemanLiau = Math.max(0, Math.round((0.0588 * L - 0.296 * S - 15.8) * 10) / 10);

    // 5. SMOG Index (Simple Measure of Gobbledygook)
    // Formula: 1.0430 * sqrt(complexWords * (30 / totalSentences)) + 3.1291
    const smog = Math.max(0, Math.round((1.043 * Math.sqrt(complexWords * (30 / totalSentences)) + 3.1291) * 10) / 10);

    // 6. Automated Readability Index (ARI)
    // Formula: 4.71 * (charactersNoSpaces / totalWords) + 0.5 * (totalWords / totalSentences) - 21.43
    const ari = Math.max(0, Math.round((4.71 * (charactersNoSpaces / totalWords) + 0.5 * avgSentenceLength - 21.43) * 10) / 10);

    // Qualitative Rating for Flesch Reading Ease
    let easeLevel = "Standard / Plain English";
    let audience = "General Public (8th – 9th Grade)";
    let easeColor = "text-emerald-500";
    let badgeBg = "bg-emerald-500/10 border-emerald-500/30";

    if (fleschReadingEase >= 90) {
      easeLevel = "Very Easy to Read";
      audience = "5th Grade (Children & Beginners)";
      easeColor = "text-emerald-400";
      badgeBg = "bg-emerald-500/10 border-emerald-500/30";
    } else if (fleschReadingEase >= 70) {
      easeLevel = "Fairly Easy to Read";
      audience = "7th Grade (Middle School)";
      easeColor = "text-emerald-500";
      badgeBg = "bg-emerald-500/10 border-emerald-500/30";
    } else if (fleschReadingEase >= 60) {
      easeLevel = "Standard / Plain English";
      audience = "8th – 9th Grade (Optimal Web Copy)";
      easeColor = "text-primary";
      badgeBg = "bg-primary/10 border-primary/30";
    } else if (fleschReadingEase >= 50) {
      easeLevel = "Fairly Difficult";
      audience = "10th – 12th Grade (High School)";
      easeColor = "text-amber-500";
      badgeBg = "bg-amber-500/10 border-amber-500/30";
    } else if (fleschReadingEase >= 30) {
      easeLevel = "Difficult";
      audience = "College Level / Undergraduates";
      easeColor = "text-orange-500";
      badgeBg = "bg-orange-500/10 border-orange-500/30";
    } else {
      easeLevel = "Very Confusing / Academic";
      audience = "Graduate / Academic Specialists";
      easeColor = "text-red-500";
      badgeBg = "bg-red-500/10 border-red-500/30";
    }

    // Time calculations
    const readingTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));
    const speakingTimeMinutes = Math.max(1, Math.ceil(totalWords / 130));

    return {
      fleschReadingEase,
      fkGrade,
      gunningFog,
      colemanLiau,
      smog,
      ari,
      easeLevel,
      audience,
      easeColor,
      badgeBg,
      totalWords,
      totalSentences,
      totalParagraphs,
      totalSyllables,
      complexWords,
      monosyllableWords,
      avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
      avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
      charactersWithSpaces,
      charactersNoSpaces,
      readingTimeMinutes,
      speakingTimeMinutes,
    };
  }, [text]);

  const handleCopyReport = () => {
    if (!stats) return;
    const report = `📊 READABILITY REPORT (Toolzium.com)
----------------------------------------
• Flesch Reading Ease: ${stats.fleschReadingEase} / 100 (${stats.easeLevel})
• Flesch-Kincaid Grade: Grade ${stats.fkGrade}
• Gunning Fog Index: ${stats.gunningFog}
• Coleman-Liau Index: ${stats.colemanLiau}
• SMOG Index: ${stats.smog}
• Target Audience: ${stats.audience}
----------------------------------------
• Word Count: ${stats.totalWords}
• Sentence Count: ${stats.totalSentences}
• Avg Sentence Length: ${stats.avgSentenceLength} words
• Estimated Reading Time: ~${stats.readingTimeMinutes} min`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    toast.success("Readability report copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Flesch-Kincaid Readability Score & Grade Level Analyzer"
          description="Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, Coleman-Liau, and SMOG indices to optimize copy for search engines and your target audience."
          icon={BookOpen}
          badgeText="📈 6 Industry Readability Formulas • Instant Text Analysis"
        />

        {/* Preset Chips Bar */}
        <GlassCard className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-semibold">Try Example:</span>
              {SAMPLE_TEXTS.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setText(sample.text)}
                  className="text-[11px] bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground px-2.5 py-1 rounded-lg border border-border/60 transition-all cursor-pointer font-medium"
                >
                  {sample.title}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setText("")}
              className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>

          {/* Text Area */}
          <div className="space-y-1.5">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here to analyze its reading level, sentence complexity, and target audience..."
              rows={8}
              className="text-xs sm:text-sm leading-relaxed"
            />
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono px-1">
              <span>{text.trim() ? text.trim().split(/\s+/).length : 0} words • {text.length} characters</span>
              <span className="text-emerald-500 font-medium">100% In-Browser Instant Calculation</span>
            </div>
          </div>
        </GlassCard>

        {/* Readability Dashboard */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in-50">
            
            {/* Primary Score Hero Card (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <GlassCard className={cn("p-6 text-center space-y-4 border-2", stats.badgeBg)}>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-muted-foreground">
                  Flesch Reading Ease Score
                </span>

                <div className="flex items-baseline justify-center gap-1">
                  <span className={cn("text-5xl sm:text-6xl font-extrabold font-mono tracking-tight", stats.easeColor)}>
                    {stats.fleschReadingEase}
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">/ 100</span>
                </div>

                <div className="space-y-1">
                  <div className={cn("text-lg font-bold", stats.easeColor)}>
                    {stats.easeLevel}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 font-medium">
                    <Users className="w-3.5 h-3.5" /> Target: {stats.audience}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    style={{ width: `${stats.fleschReadingEase}%` }}
                    className="h-full bg-primary transition-all duration-500"
                  />
                </div>

                {/* Copy Full Report Button */}
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyReport}
                    className="w-full text-xs font-semibold gap-1.5 h-9 rounded-xl"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Report Copied!" : "Copy Full Readability Report"}</span>
                  </Button>
                </div>
              </GlassCard>

              {/* Time Estimates */}
              <div className="grid grid-cols-2 gap-3">
                <GlassCard className="p-4 space-y-1 text-center">
                  <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Silent Reading Time</span>
                  <div className="text-lg font-bold font-mono text-foreground">
                    ~{stats.readingTimeMinutes} min
                  </div>
                  <p className="text-[10px] text-muted-foreground">Based on 200 WPM</p>
                </GlassCard>

                <GlassCard className="p-4 space-y-1 text-center">
                  <FileText className="w-4 h-4 text-primary mx-auto mb-1" />
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Speaking Time</span>
                  <div className="text-lg font-bold font-mono text-foreground">
                    ~{stats.speakingTimeMinutes} min
                  </div>
                  <p className="text-[10px] text-muted-foreground">Based on 130 WPM</p>
                </GlassCard>
              </div>

            </div>

            {/* 5 Other Readability Indices & Text Stats (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Indices Grid */}
              <GlassCard className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Standard Academic Grade Level Formulas</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  
                  <div className="p-3 bg-muted/20 rounded-xl border border-border/60 space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Flesch-Kincaid</span>
                    <div className="text-lg font-extrabold font-mono text-primary">
                      Grade {stats.fkGrade}
                    </div>
                    <p className="text-[10px] text-muted-foreground">US School Grade</p>
                  </div>

                  <div className="p-3 bg-muted/20 rounded-xl border border-border/60 space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Gunning Fog</span>
                    <div className="text-lg font-extrabold font-mono text-primary">
                      {stats.gunningFog}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Formal Education Yrs</p>
                  </div>

                  <div className="p-3 bg-muted/20 rounded-xl border border-border/60 space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Coleman-Liau</span>
                    <div className="text-lg font-extrabold font-mono text-primary">
                      Grade {stats.colemanLiau}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Character-Based Index</p>
                  </div>

                  <div className="p-3 bg-muted/20 rounded-xl border border-border/60 space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">SMOG Index</span>
                    <div className="text-lg font-extrabold font-mono text-primary">
                      {stats.smog}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Years to Comprehend</p>
                  </div>

                  <div className="p-3 bg-muted/20 rounded-xl border border-border/60 space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Auto Readability (ARI)</span>
                    <div className="text-lg font-extrabold font-mono text-primary">
                      {stats.ari}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Grade Level Gauge</p>
                  </div>

                  <div className="p-3 bg-muted/20 rounded-xl border border-border/60 space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Complex Words (3+ Syl)</span>
                    <div className="text-lg font-extrabold font-mono text-foreground">
                      {stats.complexWords} <span className="text-[10px] font-normal text-muted-foreground">({Math.round((stats.complexWords / stats.totalWords) * 100)}%)</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Hard Words Count</p>
                  </div>

                </div>
              </GlassCard>

              {/* Text Anatomy Grid */}
              <GlassCard className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                  <Layers className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Text Anatomy & Syllable Metrics</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                  <div className="p-2.5 bg-muted/20 rounded-xl border border-border/50">
                    <span className="text-[10px] font-sans text-muted-foreground uppercase font-semibold">Total Words</span>
                    <div className="text-base font-bold text-foreground">{stats.totalWords}</div>
                  </div>

                  <div className="p-2.5 bg-muted/20 rounded-xl border border-border/50">
                    <span className="text-[10px] font-sans text-muted-foreground uppercase font-semibold">Sentences</span>
                    <div className="text-base font-bold text-foreground">{stats.totalSentences}</div>
                  </div>

                  <div className="p-2.5 bg-muted/20 rounded-xl border border-border/50">
                    <span className="text-[10px] font-sans text-muted-foreground uppercase font-semibold">Avg Words/Sentence</span>
                    <div className="text-base font-bold text-foreground">{stats.avgSentenceLength}</div>
                  </div>

                  <div className="p-2.5 bg-muted/20 rounded-xl border border-border/50">
                    <span className="text-[10px] font-sans text-muted-foreground uppercase font-semibold">Avg Syllables/Word</span>
                    <div className="text-base font-bold text-foreground">{stats.avgSyllablesPerWord}</div>
                  </div>
                </div>

                {/* Share & Embed Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
                  <span className="text-xs text-muted-foreground font-mono">
                    Grade {stats.fkGrade} • {stats.fleschReadingEase}/100 Reading Ease
                  </span>

                  <div className="flex items-center gap-2">
                    <ShareResultButton
                      toolTitle="Readability Score Analyzer"
                      resultTitle={`Readability Score: ${stats.fleschReadingEase}/100`}
                      resultSummary={`Content graded at ${stats.fkGrade}th grade level (${stats.easeLevel}) with Toolzium.`}
                      resultMetrics={[
                        { label: "Reading Ease", value: `${stats.fleschReadingEase}/100` },
                        { label: "Grade Level", value: `Grade ${stats.fkGrade}` },
                        { label: "Audience", value: stats.audience },
                      ]}
                    />
                    <EmbedButton toolPath="/tools/text/readability-score" toolTitle="Readability Score Analyzer" />
                  </div>
                </div>

              </GlassCard>

            </div>

          </div>
        )}

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Input Content", description: "Paste your blog draft, newsletter, school paper, or product documentation." },
            { step: "2", title: "Calculate 6 Formulas", description: "Our engine evaluates word lengths, syllable counts, and sentence complexity across 6 formulas." },
            { step: "3", title: "Refine for SEO & Readability", description: "Aim for a Flesch Reading Ease score of 60–70 (8th grade) to maximize organic search rankings." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "6 Global Readability Formulas", description: "Calculates Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, Coleman-Liau, SMOG, and ARI." },
            { title: "Syllable & Complex Word Counter", description: "Identifies hard 3+ syllable vocabulary words that inflate reading difficulty." },
            { title: "Reading & Speaking Time Estimates", description: "Calculates accurate pacing for keynote presentations, video voiceovers, and blog posts." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "What is a good Flesch Reading Ease score for SEO?", answer: "For search engine optimization (SEO) and general online audiences, aim for a score between 60 and 70 (approx. 8th-grade level). Content in this range is easy for 85% of readers to comprehend quickly, improving time on page and reducing bounce rates." },
            { question: "How does the Flesch-Kincaid Grade Level formula work?", answer: "The Flesch-Kincaid formula calculates US school grade levels based on the average sentence length (words per sentence) and average word length (syllables per word). A score of 8.0 means an eighth-grader can understand the text." },
            { question: "Why do complex words increase the Gunning Fog Index?", answer: "The Gunning Fog Index specifically measures complex words containing three or more syllables. Higher concentrations of polysyllabic words require more years of formal education to understand." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/readability-score" />

      </div>
    </div>
  );
}
