"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, Type, BarChart3, Trash2, Shield, FileText, Timer, AlignLeft, Globe, Zap } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
function formatTime(minutes: number) {
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  if (mins === 0 && secs === 0) return "0s";
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

export function ReadingTimeClient() {
  const [text, setText] = useState("");
  const [customWpm, setCustomWpm] = useState(250);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0, chars: 0, sentences: 0, paragraphs: 0, avgWordLength: 0,
        fleschKincaid: 0, slow: 0, average: 0, fast: 0, custom: 0, speaking: 0
      };
    }

    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const charCount = trimmed.length;
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
    const paragraphs = trimmed.split(/\n+/).filter(p => p.trim().length > 0).length || 1;
    
    const charsInWords = words.reduce((acc, word) => acc + word.replace(/[^a-zA-Z0-9]/g, '').length, 0);
    const avgWordLength = wordCount > 0 ? charsInWords / wordCount : 0;
    
    // Very basic syllable estimation for Flesch-Kincaid
    const countSyllables = (word: string) => {
      word = word.toLowerCase();
      if (word.length <= 3) return 1;
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const match = word.match(/[aeiouy]{1,2}/g);
      return match ? match.length : 1;
    };
    
    const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
    
    // Flesch Reading Ease
    let fleschKincaid = 0;
    if (wordCount > 0 && sentences > 0) {
      fleschKincaid = 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (totalSyllables / wordCount);
      fleschKincaid = Math.max(0, Math.min(100, fleschKincaid));
    }

    return {
      words: wordCount,
      chars: charCount,
      sentences,
      paragraphs,
      avgWordLength,
      fleschKincaid,
      slow: wordCount / 150,
      average: wordCount / 200,
      fast: wordCount / 300,
      custom: wordCount / customWpm,
      speaking: wordCount / 130, // average speaking rate
    };
  }, [text, customWpm]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        icon={BookOpen}
        title="Reading Time Calculator"
        description="Calculate reading and speaking time, word count, and text statistics."
        actions={
          <ResetButton onClick={() => setText("")} label="Clear" />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>Paste or type your text below to get instant statistics.</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle>Time Estimates</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Slow (150 WPM)</p>
                <p className="text-2xl font-bold">{formatTime(stats.slow)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Average (200 WPM)</p>
                <p className="text-2xl font-bold">{formatTime(stats.average)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Fast (300 WPM)</p>
                <p className="text-2xl font-bold">{formatTime(stats.fast)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Speaking (130 WPM)</p>
                <p className="text-2xl font-bold text-amber-500">{formatTime(stats.speaking)}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Custom Speed ({customWpm} WPM)</Label>
                <span className="font-bold">{formatTime(stats.custom)}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={customWpm}
                onChange={(e) => setCustomWpm(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle>Text Statistics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Words</p>
                <p className="text-2xl font-bold">{stats.words}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Characters</p>
                <p className="text-2xl font-bold">{stats.chars}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Sentences</p>
                <p className="text-2xl font-bold">{stats.sentences}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Paragraphs</p>
                <p className="text-2xl font-bold">{stats.paragraphs}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg Word Length</p>
                <p className="text-2xl font-bold">{stats.avgWordLength.toFixed(1)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Readability Score</p>
                <p className="text-2xl font-bold text-blue-500">{stats.fleschKincaid.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">
                  {stats.fleschKincaid > 90 ? "Very Easy" :
                   stats.fleschKincaid > 80 ? "Easy" :
                   stats.fleschKincaid > 70 ? "Fairly Easy" :
                   stats.fleschKincaid > 60 ? "Standard" :
                   stats.fleschKincaid > 50 ? "Fairly Difficult" :
                   stats.fleschKincaid > 30 ? "Difficult" : "Very Confusing"}
                </p>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Paste Your Text or Article",
            description: "Paste any article, essay, blog post, speech script, or document. The tool counts words and calculates time instantly as you type.",
            icon: FileText,
          },
          {
            step: "02",
            title: "Choose Reading Speed",
            description: "Select from preset speeds: Silent Reading (238 WPM average adult), Speed Reading (400+ WPM), Audiobook (150 WPM), or Presentation (100-130 WPM).",
            icon: Timer,
          },
          {
            step: "03",
            title: "Get Time Estimate",
            description: "Instantly see the estimated reading time in minutes and seconds. Use it to add \"X min read\" labels to your blog, estimate speech duration, or plan content length.",
            icon: Clock,
          },
        ]}
        badges={[
          "Multiple reading speeds",
          "Words per minute calculator",
          "Speech time estimator",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Clock,
            title: "Accurate Reading Time",
            description: "Uses 238 WPM as the baseline — the scientifically measured average adult silent reading speed from multiple research studies. The same method used by Medium.com.",
          },
          {
            icon: Timer,
            title: "Multiple Speed Presets",
            description: "Switch between reading modes: slow reader (150 WPM), average adult (238 WPM), fast reader (300 WPM), speed reader (450 WPM), audiobook narrator (150 WPM), speech (130 WPM).",
          },
          {
            icon: BarChart3,
            title: "Word & Character Count",
            description: "Shows total word count, character count, sentence count, and paragraph count alongside the reading time — all the metrics you need in one place.",
          },
          {
            icon: AlignLeft,
            title: "Speech Time Estimator",
            description: "Calculates how long it takes to deliver text as a speech or presentation (100-130 WPM for presentations, 150 WPM for conversational speech).",
          },
          {
            icon: Globe,
            title: "Blog & Medium \"Read Time\" Label",
            description: "Generates the exact \"X min read\" estimate that blog platforms display. Helps writers hit target read times for their content format and platform.",
          },
          {
            icon: Shield,
            title: "Private & Offline",
            description: "All calculations are client-side. Your text — which may be a draft, confidential document, or unpublished article — never leaves your browser.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Reading Speed Guide — What's Normal and How to Optimize Content Length</h3>
          <p>
            Reading speed varies widely by purpose, reader experience, and content complexity.
            Understanding reading speeds helps content creators set appropriate length targets,
            add accurate read time labels, and plan speeches and presentations effectively.
          </p>

          <h4 className="font-semibold">Reading Speed Reference by Type</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Reader / Mode</th>
                  <th className="border p-2 text-left">Speed (WPM)</th>
                  <th className="border p-2 text-left">Time for 1,000 words</th>
                  <th className="border p-2 text-left">Comprehension</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Beginning reader", "~100 WPM", "~10 minutes", "High"],
                  ["Average adult", "~238 WPM", "~4.2 minutes", "High"],
                  ["College student", "~300 WPM", "~3.3 minutes", "High"],
                  ["Speed reader", "~500 WPM", "~2 minutes", "Medium"],
                  ["Audiobook narration", "~150 WPM", "~6.7 minutes", "High"],
                  ["Presentation speech", "~100-130 WPM", "~8-10 minutes", "High"],
                  ["Conversational speech", "~130-150 WPM", "~7 minutes", "High"],
                  ["Skimming", "~600-700 WPM", "~1.5 minutes", "Low"],
                ].map(([reader, wpm, time, comp]) => (
                  <tr key={reader} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{reader}</td>
                    <td className="border p-2 text-primary font-mono text-xs">{wpm}</td>
                    <td className="border p-2 text-xs">{time}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{comp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Ideal Content Length by Format</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Content Format</th>
                  <th className="border p-2 text-left">Word Count</th>
                  <th className="border p-2 text-left">Read Time</th>
                  <th className="border p-2 text-left">Platform</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Social media caption", "20-50 words", "< 15 sec", "Instagram, Twitter"],
                  ["Email newsletter", "200-500 words", "1-2 min", "Mailchimp, Substack"],
                  ["Short blog post", "500-800 words", "2-3 min", "WordPress, Medium"],
                  ["Standard article", "1,000-1,500 words", "4-6 min", "Medium, news sites"],
                  ["Long-form guide", "2,000-4,000 words", "8-17 min", "SEO-focused blogs"],
                  ["Whitepaper / report", "5,000+ words", "20+ min", "B2B, research"],
                  ["10-min conference talk", "~1,300 words", "10 min", "TED, presentations"],
                  ["Academic abstract", "150-250 words", "< 1 min", "Journals"],
                ].map(([format, count, time, platform]) => (
                  <tr key={format} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{format}</td>
                    <td className="border p-2 text-primary text-xs">{count}</td>
                    <td className="border p-2 text-xs">{time}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{platform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "How is reading time calculated?",
            answer: "Reading time is calculated by dividing the word count by the words-per-minute (WPM) rate. The default is 238 WPM — the average adult silent reading speed based on multiple research studies. Medium.com uses the same 238 WPM baseline for its 'X min read' labels.",
          },
          {
            question: "What is the average adult reading speed?",
            answer: "238 words per minute for average adults reading silently, based on a 2019 meta-analysis of 190 studies by Brysbaert published in the Journal of Cognition. College students average ~300 WPM. Speed readers can reach 400-600 WPM with reduced comprehension. Technical content is typically read at 100-150 WPM.",
          },
          {
            question: "How long should a blog post be for SEO?",
            answer: "For competitive keywords, 1,500-3,000 words performs best. For less competitive or local topics, 800-1,200 words can rank well. The most important factor is comprehensive coverage of the topic — don't pad with filler. Google rewards depth, E-E-A-T, and user satisfaction, not raw word count.",
          },
          {
            question: "How do I calculate speech duration from word count?",
            answer: "For a presentation or conference talk: divide word count by 100-130 WPM (slower, deliberate pace). For a conversational speech or podcast: 130-150 WPM. For an audiobook-style narration: 150-160 WPM. A 10-minute talk typically requires approximately 1,000-1,300 words.",
          },
          {
            question: "Why does Medium show a different reading time than this tool?",
            answer: "Medium uses 238 WPM as its baseline but also adjusts for images (adds ~12 seconds per image for the first few, then 3 seconds each) and code blocks. This tool calculates pure text reading time. If your article has many images or code snippets, Medium's estimate may be slightly higher.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/reading-time" max={6} />
    </div>
  );
}
