"use client";

import {
  AlignLeft,
  BarChart2,
  Clock4,
  FileText,
  Info,
  Mic,
  Type as TypeIcon,
  Sparkles,
  RefreshCw,
  Zap,
  ShieldCheck,
  Download,
  Copy,
  BookOpen,
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
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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

  const [liveClean, setLiveClean] = React.useState<boolean>(false);
  const [excludeStopwords, setExcludeStopwords] = React.useState<boolean>(true);
  const [aiAnalysis, setAiAnalysis] = React.useState<string[]>([]);
  const [aiLoading, setAiLoading] = React.useState<boolean>(false);

  const displayText = React.useMemo(
    () => (liveClean ? squeezeSpaces(normalizeText(text)) : normalizeText(text)),
    [text, liveClean],
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
    setLiveClean(false);
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
    <>
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
        title="How to Use the Free Word Counter"
        subtitle="Analyze document length, character limits, and reading speed in 3 simple steps."
        steps={steps}
      />

      {/* SECTION 4: FEATURE HIGHLIGHTS & DEEP SEO GUIDE */}
      <ToolFeatureGuides features={features}>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">
            Complete Character Limit Guide for Writers & Marketers
          </h3>
          <p>
            Whether you are writing an academic essay, drafting a viral social media post, or optimizing blog posts for search engines, monitoring your word count and character count is essential. Toolzium’s free Word Counter provides real-time counts for words, characters (with and without spaces), sentences, lines, and paragraphs.
          </p>

          <h4 className="text-base font-semibold text-foreground pt-2">Popular Social Media Character Limits (2026):</h4>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Twitter / X:</strong> 280 characters per tweet (25,000 for Premium subscribers).</li>
            <li><strong>Instagram Bio:</strong> 150 characters. <strong>Caption:</strong> 2,200 characters.</li>
            <li><strong>LinkedIn Post:</strong> 3,000 characters. <strong>Article Title:</strong> 100 characters.</li>
            <li><strong>TikTok Bio:</strong> 80 characters. <strong>Video Description:</strong> 4,000 characters.</li>
            <li><strong>Meta Title (SEO):</strong> 50–60 characters (approx. 580 pixels).</li>
            <li><strong>Meta Description (SEO):</strong> 150–160 characters (approx. 990 pixels).</li>
          </ul>

          <h4 className="text-base font-semibold text-foreground pt-2">How Reading and Speaking Time are Calculated:</h4>
          <p>
            Standard reading time estimates are calculated using an average reading speed of <strong>200 words per minute (WPM)</strong>. For speechwriting, podcasts, YouTube scripts, and teleprompters, speaking speed is calculated at <strong>130 WPM</strong>. This helps presenters time their delivery accurately before stepping on stage or recording.
          </p>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ & RELATED TOOLS */}
      <ToolFaqAccordion faqs={faqs} />

      <RelatedTools currentToolUrl="/tools/text/word-counter" max={6} />
    </>
  );
}
