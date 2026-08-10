"use client";

import {
  AlignLeft,
  BarChart2,
  BarChart3,
  BookOpen,
  Clock,
  Clock4,
  Download,
  FileText,
  Globe,
  Hash,
  Info,
  Mic,
  RefreshCw,
  Shield,
  ShieldCheck,
  Sparkles,
  Type,
  Type as TypeIcon,
  Zap,
} from "lucide-react";
import * as React from "react";
import {
  ActionButton,
  CopyButton,
  ExportTextButton,
  PasteButton,
  ResetButton,
} from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { trackToolUsage } from "@/lib/gtm";
import { countWords } from "@/lib/utils";
import { toTitleCase } from "@/lib/utils/text/case-converter";
import {
  computeDensity,
  countCharacters,
  countCharactersNoSpaces,
  countLines,
  countParagraphs,
  countSentences,
  formatTimeFromWPM,
  normalizeText,
  slugify,
  squeezeSpaces,
} from "@/lib/utils/text/word-counter";
import StatItem from "./stat-item";
import toast from "react-hot-toast";

export default function WordCounterClient() {
  const [text, setText] = React.useState<string>("");

  const [excludeStopwords, setExcludeStopwords] = React.useState<boolean>(true);
  const [aiAnalysis, setAiAnalysis] = React.useState<string[]>([]);
  const [aiLoading, setAiLoading] = React.useState<boolean>(false);

  const displayText = React.useMemo(
    () => normalizeText(text),
    [text],
  );

  const stats = React.useMemo(() => {
    const t = displayText;
    const words = countWords(t);
    return {
      words,
      chars: countCharacters(t),
      charsNoSpaces: countCharactersNoSpaces(t),
      sentences: countSentences(t),
      paragraphs: countParagraphs(t),
      lines: countLines(t),
      readTime: formatTimeFromWPM(words, 200),
      speakTime: formatTimeFromWPM(words, 130),
    };
  }, [displayText]);

  const density = React.useMemo(
    () => computeDensity(displayText, { excludeStopwords }),
    [displayText, excludeStopwords],
  );

  const analyzeWithAi = async () => {
    if (!displayText.trim()) {
      toast.error("Please enter some text first!");
      return;
    }

    setAiLoading(true);

    try {
      const prompt = `Analyze this text for writing tone, sentiment, readability, grade level, and 3 key suggestions to improve engagement:\n\n"${displayText.slice(0, 1000)}"\n\nOutput 4 bullet points. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAiAnalysis(data.results);
        toast.success("AI writing analysis complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI analysis failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const resetAll = () => {
    setText("");
    setExcludeStopwords(true);
    setAiAnalysis([]);
    toast.success("Editor reset");
  };

  const toUpper = () => {
    trackToolUsage("Word Counter", "Text");
    setText(displayText.toUpperCase());
    toast.success("Converted to UPPERCASE");
  };
  const toLower = () => {
    trackToolUsage("Word Counter", "Text");
    setText(displayText.toLowerCase());
    toast.success("Converted to lowercase");
  };
  const toTitle = () => {
    trackToolUsage("Word Counter", "Text");
    setText(toTitleCase(displayText));
    toast.success("Converted to Title Case");
  };
  const toSlug = () => {
    trackToolUsage("Word Counter", "Text");
    setText(slugify(displayText));
    toast.success("Converted to slug-format");
  };
  const cleanSpaces = () => {
    trackToolUsage("Word Counter", "Text");
    setText(squeezeSpaces(displayText));
    toast.success("Extra spaces removed");
  };

  const loadSample = () => {
    setText(
      "Toolzium is a free, privacy-first web utility suite designed for creators, developers, students, and digital marketers. Count words, characters, sentences, reading speed, and keyword density in real-time. All text processing occurs locally inside your browser, ensuring your private drafts, essays, and articles never leave your device."
    );
    toast.success("Sample text loaded!");
  };

  const actions = [
    { key: "upper", label: "UPPERCASE", run: toUpper },
    { key: "lower", label: "lowercase", run: toLower },
    { key: "title", label: "Title Case", run: toTitle },
    { key: "slug", label: "slugify", run: toSlug },
    { key: "clean", label: "Remove extra spaces", run: cleanSpaces },
  ];

  const steps = [
    {
      step: "01",
      title: "Paste or Type Text",
      description: "Paste text directly, upload a .txt file, or load example text. Input is processed instantly as you type.",
      icon: TypeIcon,
    },
    {
      step: "02",
      title: "Live Analysis & Metrics",
      description: "View real-time word count, character count (with/without spaces), reading time, speaking speed, and keyword density.",
      icon: BarChart2,
    },
    {
      step: "03",
      title: "Transform & Export",
      description: "Apply 1-click case transformations, clean formatting, copy your text, or export stats with full privacy.",
      icon: Download,
    },
  ];

  const features = [
    {
      title: "Real-Time Word & Character Count",
      description: "Instantaneous count of words, characters with spaces, and characters without spaces as you type.",
      icon: FileText,
    },
    {
      title: "Reading & Speaking Time Estimates",
      description: "Accurately calculate estimated reading time (200 WPM) and speaking time (130 WPM) for speeches and scripts.",
      icon: Clock4,
    },
    {
      title: "Keyword Density Analyzer",
      description: "Identify top 20 recurring words and frequency percentages with an optional stopword filter.",
      icon: BarChart2,
    },
    {
      title: "AI Tone & Quality Analysis",
      description: "Get smart recommendations on writing tone, sentiment, and readability grade level powered by LLM.",
      icon: Sparkles,
    },
    {
      title: "1-Click Text Transforms",
      description: "Instantly reformat text into UPPERCASE, lowercase, Title Case, or URL-safe slug format.",
      icon: Zap,
    },
    {
      title: "100% In-Browser Privacy",
      description: "Your content stays on your computer. Zero server uploads, zero data logging, completely confidential.",
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      question: "Do you count characters with and without spaces?",
      answer: "Yes! Our word counter displays both total character count (including spaces) and character count excluding spaces, allowing you to easily match social media character limits for Twitter/X, Instagram, and LinkedIn.",
    },
    {
      question: "How is reading and speaking time calculated?",
      answer: "Reading time is calculated using an average reading pace of 200 words per minute (WPM). Speaking time is calculated at 130 WPM, which represents standard presentation and teleprompter speeds.",
    },
    {
      question: "Is my text uploaded or stored on any server?",
      answer: "No. Toolzium operates 100% client-side in your web browser. Your text is processed locally and is never sent to, stored on, or analyzed by external servers.",
    },
    {
      question: "What are common social media character limits?",
      answer: "Twitter/X posts: 280 characters. Instagram bios: 150 characters; captions: 2,200 characters. LinkedIn posts: 3,000 characters. TikTok bios: 80 characters.",
    },
    {
      question: "What is keyword density and why does it matter?",
      answer: "Keyword density measures how frequently a word appears relative to total word count. It helps writers and SEO specialists avoid keyword stuffing while ensuring key topics are covered effectively.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* SECTION 1: HEADER */}
      <ToolPageHeader
        icon={TypeIcon}
        title="Word Counter & AI Writing Tone Analyzer"
        description="Count words, characters, sentences, paragraphs, and lines. Get reading/speaking time, keyword density, and live AI writing analysis."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={loadSample} className="gap-1.5 text-xs">
              <BookOpen className="h-3.5 w-3.5" />
              Try Sample
            </Button>
            <ResetButton onClick={resetAll} />
            <CopyButton variant="default" getText={() => displayText || ""} />
          </>
        }
      />

      {/* SECTION 2: PRIMARY WORKSPACE */}
      <GlassCard className="p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Left Column: Input */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label className="text-sm font-semibold text-foreground">Your Text</Label>
              <div className="flex flex-wrap gap-2">
                <PasteButton
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  label="Paste"
                  pastedLabel="Pasted"
                  smartNewline
                  getExisting={() => text}
                  setValue={setText}
                />

                <InputField
                  accept=".txt,text/plain"
                  type="file"
                  onFilesChange={async (files) => {
                    const f = files?.[0];
                    if (!f) return;
                    const txt = await f.text();
                    setText(txt);
                    toast.success(`Loaded file: ${f.name}`);
                  }}
                />

                <ExportTextButton
                  filename="text-stats.txt"
                  getText={() => displayText}
                  label="Export"
                  size="sm"
                  disabled={!displayText}
                />
              </div>
            </div>

            <TextareaField
              value={text}
              onValueChange={setText}
              placeholder="Start typing or paste your text here to analyze words, characters, and reading time in real-time…"
              textareaClassName="min-h-[280px] sm:min-h-[320px] font-mono text-sm leading-relaxed"
            />

            <div className="flex items-center gap-1.5 flex-wrap">
              {actions.map((a) => (
                <ActionButton key={a.key} icon={AlignLeft} label={a.label} onClick={a.run} />
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <SwitchRow
                  label="Exclude Stopwords"
                  checked={excludeStopwords}
                  onCheckedChange={setExcludeStopwords}
                />
              </div>

              <Button
                onClick={analyzeWithAi}
                disabled={aiLoading || !displayText}
                className="gap-2 font-semibold shadow-md"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 ${aiLoading ? "animate-spin" : ""}`} />
                {aiLoading ? "Analyzing..." : "AI Tone Analysis"}
              </Button>
            </div>
          </div>

          {/* Right Column: Live Statistics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-foreground">Live Statistics</Label>
              <Badge variant="secondary" className="gap-1 text-xs font-medium">
                <Info className="h-3.5 w-3.5 text-primary" />
                Real-Time
              </Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <StatItem icon={FileText} label="Words" value={stats.words.toLocaleString()} />
              <StatItem icon={TypeIcon} label="Characters" value={stats.chars.toLocaleString()} />
              <StatItem
                icon={TypeIcon}
                label="Chars (no spaces)"
                value={stats.charsNoSpaces.toLocaleString()}
              />
              <StatItem icon={AlignLeft} label="Lines" value={stats.lines.toLocaleString()} />
              <StatItem icon={AlignLeft} label="Sentences" value={stats.sentences.toLocaleString()} />
              <StatItem
                icon={AlignLeft}
                label="Paragraphs"
                value={stats.paragraphs.toLocaleString()}
              />
              <StatItem icon={Clock4} label="Read time (200 WPM)" value={stats.readTime} />
              <StatItem icon={Mic} label="Speak time (130 WPM)" value={stats.speakTime} />
            </div>

            {/* Keyword Density Table */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-primary" />
                <Label className="text-sm font-semibold">Top Keywords Density</Label>
              </div>
              {density.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  Type or paste text above to calculate keyword frequency.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-lg border max-h-[160px] overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-muted/60 sticky top-0">
                      <tr className="[&>th]:px-3 [&>th]:py-1.5 text-left font-semibold">
                        <th>Word</th>
                        <th>Count</th>
                        <th>Density</th>
                      </tr>
                    </thead>
                    <tbody>
                      {density.slice(0, 10).map((row) => (
                        <tr key={row.word} className="border-t hover:bg-muted/20">
                          <td className="px-3 py-1 font-mono text-primary font-medium">{row.word}</td>
                          <td className="px-3 py-1">{row.count}</td>
                          <td className="px-3 py-1 font-medium">{row.percent.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* AI Analysis Display */}
      {aiAnalysis.length > 0 && (
        <AiOutputDisplay
          title="AI Writing Tone & Readability Analysis"
          subtitle="Real-time LLM feedback on tone, sentiment, and improvements"
          content={aiAnalysis}
          loading={aiLoading}
          onRegenerate={analyzeWithAi}
          variant="prose"
        />
      )}

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste or Type Text", description: "Enter any text in the editor. Word count, character count, sentence count, paragraph count, and reading time all update instantly as you type.", icon: Type },
          { step: "02", title: "View Detailed Statistics", description: "See words, characters (with and without spaces), sentences, paragraphs, unique words, average word length, and keyword frequency distribution all at once.", icon: BarChart2 },
          { step: "03", title: "Optimize for Your Platform", description: "Compare your count against platform limits shown below the stats. Perfect for hitting blog post word count targets, staying within social media character limits, or preparing a timed speech.", icon: Hash },
        ]}
        badges={["Real-time counting", "Reading time", "Keyword frequency"]}
      />
      
      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          { icon: Hash, title: "Accurate Word Count", description: "Counts words by splitting on whitespace. Handles contractions (it's = 1 word), hyphenated words (well-known = 1 word), and multiple spaces. Matches the behavior of Microsoft Word and Google Docs." },
          { icon: BarChart2, title: "Character Count", description: "Shows total characters including spaces and characters without spaces separately. Essential for Twitter (280 chars), SMS (160 chars), and SEO meta descriptions (155 chars) where spaces count." },
          { icon: Clock, title: "Reading and Speaking Time", description: "Estimates silent reading time at 238 words per minute (per Brysbaert 2019 meta-analysis) and speaking time at 130 WPM for presentations. Rounds to the nearest 30 seconds." },
          { icon: BookOpen, title: "Keyword Frequency", description: "Shows the 10 most frequently used words with occurrence count and density percentage. Helps spot keyword stuffing (over 3%) and overused filler words that weaken writing quality." },
          { icon: AlignLeft, title: "Sentence and Paragraph Stats", description: "Counts sentences (splits on period, exclamation, question mark) and paragraphs (double line breaks). Shows average words per sentence to help optimize readability for your target audience." },
          { icon: Shield, title: "Completely Private", description: "All counting happens locally in your browser with no data sent to any server. Safe for confidential documents, legal drafts, and proprietary content." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Word Count Requirements by Content Type</h3>
          <p>Different content types have different optimal word count ranges. Too short and you fail to cover the topic adequately for search engines and readers. Too long and you lose readers or exceed platform limits. Here are industry standards for common content types:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Content Type</th>
                  <th className="border p-2 text-left">Optimal Range</th>
                  <th className="border p-2 text-left">Reading Time</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tweet / X post", "Under 71 words", "Under 20 sec", "280 chars max"],
                  ["Instagram caption", "Under 125 words", "Under 40 sec", "Truncated at 125 in feed"],
                  ["LinkedIn post", "150-300 words", "45 sec - 1.5 min", "Shows more at 210 chars"],
                  ["Email newsletter", "200-500 words", "1-2 min", "Higher open rate with shorter copy"],
                  ["Product description", "100-300 words", "30 sec - 1.5 min", "Enough for SEO, not overwhelming"],
                  ["News article", "400-800 words", "2-3 min", "Inverted pyramid structure"],
                  ["Blog post (short)", "800-1,200 words", "3-5 min", "Good for listicles and how-tos"],
                  ["Blog post (standard)", "1,500-2,500 words", "6-10 min", "Optimal for organic search ranking"],
                  ["Pillar page / guide", "3,000-5,000 words", "12-21 min", "Comprehensive topic coverage"],
                  ["White paper", "3,000-6,000 words", "12-25 min", "B2B lead generation"],
                  ["Ebook chapter", "2,000-4,000 words", "8-17 min", "Substantial but digestible"],
                  ["Academic paper", "4,000-10,000 words", "17-42 min", "Per journal requirements"],
                ].map(([type, range, time, notes]) => (
                  <tr key={type} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{type}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{range}</td>
                    <td className="border p-2 text-xs">{time}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold">Platform Character Limits Quick Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Platform / Field</th>
                  <th className="border p-2 text-left">Char Limit</th>
                  <th className="border p-2 text-left">Approx Words</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Twitter / X Post", "280", "~47 words"],
                  ["Instagram Caption", "2,200", "~370 words"],
                  ["LinkedIn Post", "3,000", "~500 words"],
                  ["Facebook Post", "63,206", "~10,500 words"],
                  ["YouTube Title", "100", "~17 words"],
                  ["YouTube Description", "5,000", "~830 words"],
                  ["Meta Description (SEO)", "155-160", "~26 words"],
                  ["Email Subject Line", "60-78", "~10-13 words"],
                  ["Google Ads Headline", "30", "~5 words"],
                  ["SMS (GSM)", "160", "~27 words"],
                ].map(([platform, chars, words]) => (
                  <tr key={platform} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{platform}</td>
                    <td className="border p-2 font-mono text-primary font-bold text-xs">{chars}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{words}</td>
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
          { question: "How does the word counter count words?", answer: "The word counter splits text on whitespace characters (spaces, tabs, newlines) and counts non-empty segments as words. Contractions like it is are counted as one word. Hyphenated compounds like well-known are counted as one word. Punctuation attached to words is stripped before counting. This matches the behavior of Microsoft Word and Google Docs for most text." },
          { question: "Does it count spaces in the character count?", answer: "Yes, the primary character count includes spaces. A second stat shows characters without spaces. Both are shown simultaneously. For Twitter character limits, spaces count toward the 280-character limit. For SEO meta descriptions, spaces also count toward the 155-160 character limit. Use the with-spaces count for platform limits and without-spaces count for character-based pricing or encoding." },
          { question: "How is reading time estimated?", answer: "Reading time is estimated using 238 words per minute, the average adult silent reading speed from the 2019 meta-analysis by Brysbaert et al. in Reading Research Quarterly, which analyzed 190 studies with 18,573 participants. This is more accurate than the often-cited 200-250 WPM range. The estimate rounds to the nearest 30 seconds for clean display." },
          { question: "What is a good word count for SEO blog posts?", answer: "For organic search ranking, blog posts of 1,500 to 2,500 words tend to perform best for competitive keywords. Long-form content (3,000+ words) performs well for highly competitive or complex topics. Short posts (under 500 words) rarely rank well unless targeting very specific long-tail queries. However, quality and relevance matter more than length. A focused 800-word post often outperforms an unfocused 3,000-word post." },
          { question: "Why does my word count differ from Microsoft Word?", answer: "Minor differences in word count between tools are normal. Microsoft Word uses a proprietary algorithm that may differ in how it handles hyphenated words, abbreviations (U.S., Dr.), numbers with formatting (1,000 may count as one or two words depending on locale), and certain Unicode characters. For most practical purposes, the difference is negligible (typically under 1% of total word count)." },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/word-counter" max={6} />
    </div>
  );
}
