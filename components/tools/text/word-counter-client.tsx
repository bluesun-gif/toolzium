"use client";

import { AlignLeft, BarChart2, Clock4, FileText, Info, Mic, Type as TypeIcon, Sparkles, RefreshCw } from "lucide-react";
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
  };

  const toUpper = () => {
    trackToolUsage("Word Counter", "Text");
    setText(displayText.toUpperCase());
  };
  const toLower = () => {
    trackToolUsage("Word Counter", "Text");
    setText(displayText.toLowerCase());
  };
  const toTitle = () => {
    trackToolUsage("Word Counter", "Text");
    setText(toTitleCase(displayText));
  };
  const toSlug = () => {
    trackToolUsage("Word Counter", "Text");
    setText(slugify(displayText));
  };
  const cleanSpaces = () => {
    trackToolUsage("Word Counter", "Text");
    setText(squeezeSpaces(displayText));
  };

  const actions = [
    { key: "upper", label: "UPPERCASE", run: toUpper },
    { key: "lower", label: "lowercase", run: toLower },
    { key: "title", label: "Title Case", run: toTitle },
    { key: "slug", label: "slugify", run: toSlug },
    { key: "clean", label: "Remove extra spaces & blank lines", run: cleanSpaces },
  ];

  return (
    <>
      {/* Header */}
      <ToolPageHeader
        icon={TypeIcon}
        title="Word Counter & AI Writing Tone Analyzer"
        description="Count words, characters, sentences, paragraphs, and lines. Get reading/speaking time, keyword density, and live AI writing analysis."
        actions={
          <>
            <ResetButton onClick={resetAll} />
            <CopyButton variant="default" getText={() => displayText || ""} />
          </>
        }
      />

      {/* Settings */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="text-base">Settings</CardTitle>
          <CardDescription>Live cleanup & density options.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <SwitchRow
            label="Live clean-up"
            hint="Collapse extra spaces and blank lines automatically."
            checked={liveClean}
            onCheckedChange={setLiveClean}
          />
          <SwitchRow
            label="Exclude stopwords"
            hint="Ignore common words in keyword density."
            checked={excludeStopwords}
            onCheckedChange={setExcludeStopwords}
          />
        </CardContent>
      </GlassCard>

      <Separator />

      {/* Editor & Stats */}
      <section className="grid gap-4 md:grid-cols-2">
        <GlassCard className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label className="text-sm font-medium">Your Text</Label>
            <div className="flex flex-wrap gap-2">
              <PasteButton
                variant="outline"
                size="sm"
                className="gap-2"
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
                }}
              />

              <ExportTextButton
                filename="text.txt"
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
            placeholder="Start typing or paste your text here…"
            textareaClassName="min-h-[260px]"
          />

          <div className="flex items-center gap-2 flex-wrap">
            {actions.map((a) => (
              <ActionButton key={a.key} icon={AlignLeft} label={a.label} onClick={a.run} />
            ))}
          </div>

          <div className="pt-3 flex justify-end">
            <Button
              onClick={analyzeWithAi}
              disabled={aiLoading || !displayText}
              className="gap-2 font-bold shadow-md"
            >
              <RefreshCw className={`h-4 w-4 ${aiLoading ? "animate-spin" : ""}`} />
              {aiLoading ? "AI Analyzing Text..." : "AI Writing Tone & Quality Analysis"}
            </Button>
          </div>
        </GlassCard>

        {/* Stats */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Statistics</Label>
            <Badge variant="secondary" className="gap-1">
              <Info className="h-3.5 w-3.5" />
              Live
            </Badge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
            <StatItem icon={Clock4} label="Read time (200 wpm)" value={stats.readTime} />
            <StatItem icon={Mic} label="Speak time (130 wpm)" value={stats.speakTime} />
          </div>
        </GlassCard>
      </section>

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

      {/* Density table */}
      <section>
        <GlassCard className="p-5">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <Label className="text-sm font-medium">Keyword Density (Top 20)</Label>
          </div>
          {density.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Type some text to see keyword frequency.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="[&>th]:px-3 [&>th]:py-2 text-left">
                    <th>Word</th>
                    <th>Count</th>
                    <th>Percent</th>
                  </tr>
                </thead>
                <tbody>
                  {density.map((row) => (
                    <tr key={row.word} className="border-t">
                      <td className="px-3 py-1.5 font-mono">{row.word}</td>
                      <td className="px-3 py-1.5">{row.count}</td>
                      <td className="px-3 py-1.5">{row.percent.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>
      </section>
    </>
  );
}
