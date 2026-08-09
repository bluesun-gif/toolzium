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
          {
            step: "01",
            title: "Paste or Type Text",
            description: "Paste your article, essay, email, social post, or any text. The word count and all statistics update in real time as you type — no button to press.",
            icon: FileText,
          },
          {
            step: "02",
            title: "See All Counts",
            description: "Instantly see word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time — all calculated live.",
            icon: BarChart3,
          },
          {
            step: "03",
            title: "Use for Any Platform",
            description: "Compare your count against social media limits (Twitter 280, Instagram 2200), academic minimums, or SEO targets. Paste in and check before you publish.",
            icon: Globe,
          },
        ]}
        badges={[
          "Live word count",
          "Character count",
          "Reading time",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: FileText,
            title: "Accurate Word Count",
            description: "Counts words by splitting on whitespace and punctuation boundaries. Handles hyphenated words, contractions, numbers, and URLs correctly.",
          },
          {
            icon: Hash,
            title: "Character Count",
            description: "Shows both total characters (including spaces) and characters without spaces. Social platforms count spaces — use the 'with spaces' number for character limit checks.",
          },
          {
            icon: AlignLeft,
            title: "Sentence & Paragraph Count",
            description: "Counts sentences by detecting sentence-ending punctuation and paragraphs by blank line separation. Use average sentence length to assess writing complexity.",
          },
          {
            icon: Clock,
            title: "Reading Time",
            description: "Estimates reading time at 238 words per minute (average adult reading speed) and speaking time at 130 WPM. Displayed in minutes and seconds.",
          },
          {
            icon: Type,
            title: "Unique Word Count",
            description: "Counts distinct vocabulary words used in your text. A high ratio of unique words to total words indicates vocabulary diversity and writing quality.",
          },
          {
            icon: Shield,
            title: "Private & Offline",
            description: "All counting happens in your browser. Your text — which may be a draft, confidential document, or private note — never leaves your device.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Word Count Guide — Targets for Every Content Type</h3>
          <p>
            Word count requirements vary dramatically by content type and platform. Whether you're
            writing for SEO, social media, academic requirements, or professional communication,
            knowing the right target length helps you hit your goals efficiently.
          </p>

          <h4 className="font-semibold">Content Length Reference by Type</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Content Type</th>
                  <th className="border p-2 text-left">Word Count</th>
                  <th className="border p-2 text-left">Read Time</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tweet/X post", "< 40 words", "< 15 sec", "280 character limit"],
                  ["Email subject line", "6-10 words", "< 5 sec", "Preview cut-off at ~60 chars"],
                  ["Email body", "75-150 words", "< 1 min", "Ideal for response rate"],
                  ["Instagram caption", "< 300 words", "< 2 min", "2,200 char limit; first 125 shown"],
                  ["Short blog post", "500-800 words", "2-3 min", "News, quick tips"],
                  ["Standard article", "1,000-2,000 words", "4-8 min", "Most blog posts"],
                  ["Long-form SEO content", "2,000-4,000 words", "8-17 min", "Competitive keywords"],
                  ["Academic essay", "1,500-5,000 words", "6-21 min", "Varies by assignment"],
                  ["10-min speech", "~1,300 words", "10 min", "At 130 WPM"],
                  ["Novel chapter", "2,000-5,000 words", "8-21 min", "Industry standard"],
                ].map(([type, count, time, notes]) => (
                  <tr key={type} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{type}</td>
                    <td className="border p-2 text-primary text-xs">{count}</td>
                    <td className="border p-2 text-xs">{time}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Social Media Character Limits</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Platform</th>
                  <th className="border p-2 text-left">Post Limit</th>
                  <th className="border p-2 text-left">Bio Limit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["X (Twitter)", "280 characters", "160 characters"],
                  ["Instagram", "2,200 characters", "150 characters"],
                  ["Facebook", "63,206 characters", "101 characters"],
                  ["LinkedIn", "3,000 characters", "2,600 characters"],
                  ["TikTok", "2,200 characters", "80 characters"],
                  ["YouTube", "5,000 characters", "1,000 characters"],
                ].map(([platform, post, bio]) => (
                  <tr key={platform} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{platform}</td>
                    <td className="border p-2 text-primary text-xs">{post}</td>
                    <td className="border p-2 text-xs">{bio}</td>
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
            question: "How does word count work?",
            answer: "Words are counted by splitting text on whitespace boundaries. Most counters count sequences of non-whitespace characters as words — so 'hello-world' counts as 1 word (or sometimes 2, depending on the tool). Numbers, URLs, and hyphenated terms all count as single words. This tool uses the same method as Microsoft Word.",
          },
          {
            question: "What is the difference between character count with and without spaces?",
            answer: "Character count with spaces counts every character including spaces, tabs, and newlines. Without spaces counts only visible characters. For social media limits (Twitter, Instagram), use the 'with spaces' count since those platforms count spaces. For SMS or text limits, check which counting method the platform uses.",
          },
          {
            question: "How many words should a blog post be for SEO?",
            answer: "For competitive keywords, aim for 1,500-3,000 words. For informational queries with less competition, 800-1,200 words can rank well. Quality matters more than quantity — cover the topic comprehensively, answer user intent completely, and avoid padding with filler content just to hit a word count target.",
          },
          {
            question: "How many words per minute do people read?",
            answer: "The average adult reads approximately 238 words per minute silently (based on a 2019 meta-analysis of 190 studies). College students average ~300 WPM. Speed readers reach 400-600 WPM with reduced comprehension. For speech, the average conversational pace is 130-150 WPM; presentations are typically 100-120 WPM.",
          },
          {
            question: "Is my text stored or sent anywhere?",
            answer: "No. All word counting runs entirely in your browser using JavaScript. Your text is processed locally and never sent to any server. This makes the tool safe for drafts, confidential documents, private writing, and sensitive content.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/word-counter" max={6} />
    </div>
  );
}
