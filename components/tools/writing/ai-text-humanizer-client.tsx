"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Copy,
  CheckCircle2,
  RefreshCcw,
  Wand2,
  FileText,
  Smile,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const TONES = [
  { id: "casual", name: "Casual & Conversational" },
  { id: "professional", name: "Professional" },
  { id: "academic", name: "Academic" },
  { id: "friendly", name: "Friendly" },
  { id: "concise", name: "Concise" },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Paste AI Text",
    description: "Drop in the ChatGPT, Claude, or Gemini output you want to sound human.",
    icon: FileText,
  },
  {
    step: "2",
    title: "Pick a Tone",
    description: "Choose casual, professional, academic, friendly, or concise to match your audience.",
    icon: Smile,
  },
  {
    step: "3",
    title: "Humanize",
    description: "Our AI rewrites it with natural rhythm and vocabulary that bypasses detectors.",
    icon: Wand2,
  },
];

const FEATURES = [
  {
    title: "Why AI Detectors Flag Robotic Text",
    description:
      "AI detectors measure perplexity (how surprising words are) and burstiness (variation in sentence length). Model output is statistically uniform, so detectors flag it. Human writing is messy, varied, and idiomatic — our humanizer restores that texture.",
    icon: Sparkles,
  },
  {
    title: "Best Tone for Essays vs Marketing",
    description:
      "Use Academic tone for essays and research to keep formality while varying structure. Use Friendly or Casual for social posts and blogs. Professional works for emails and reports. Match the tone to where the text will be published.",
    icon: FileText,
  },
  {
    title: "Passing Turnitin and GPTZero",
    description:
      "Run the humanized draft through a detector yourself. If any section still scores 'AI', re-humanize that paragraph with a different tone or ask for a more concise version. Layering light personal anecdotes also helps.",
    icon: CheckCircle2,
  },
];

const FAQS = [
  {
    question: "Will the humanized text keep my original meaning?",
    answer:
      "Yes. The model is instructed to preserve facts, claims, and intent while only changing phrasing, structure, and rhythm.",
  },
  {
    question: "Can it bypass AI content detectors like GPTZero and Turnitin?",
    answer:
      "Humanized text is engineered to reduce AI-perplexity and burstiness signatures that detectors look for, meaning it typically passes GPTZero, Turnitin AI Writing, Originality.ai, and Writer.com. No tool guarantees 100%, but our humanizer is tuned for undetectability.",
  },
  {
    question: "How long can my input be?",
    answer:
      "You can paste essays, articles, or chapters. Very long inputs are best split into sections for the highest quality humanization.",
  },
  {
    question: "Is my text kept private?",
    answer:
      "Your input is transmitted only to the inference API for processing and is not stored on Toolzium servers. For sensitive documents, review your institution's policy before submitting.",
  },
  {
    question: "Is the AI Text Humanizer free?",
    answer:
      "Yes. Toolzium's humanizer is completely free with no word cap, no account, and no watermark.",
  },
];

async function callHumanize(prompt: string): Promise<string> {
  const res = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, type: "text" }),
  });
  const data = await res.json();
  if (!res.ok || !data.results || data.results.length === 0) {
    throw new Error(data.error || "Humanization failed. Try again.");
  }
  return data.results.join("\n");
}

export default function AiTextHumanizerClient() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("casual");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleHumanize() {
    if (!input.trim()) {
      toast.error("Paste some text to humanize first.");
      return;
    }
    setIsGenerating(true);
    setOutput("");
    const toneName = TONES.find((t) => t.id === tone)?.name || tone;
    const prompt = `You are an expert human writing editor. Rewrite the following text so it sounds completely natural, human, and undetectable by AI content detectors (GPTZero, Turnitin, Originality.ai). Use varied sentence lengths, idiomatic phrasing, and a ${toneName.toLowerCase()} tone. Preserve the original meaning, facts, and intent exactly. Return ONLY the rewritten text with no commentary, no headings, and no markdown code fences.\n\nTEXT TO HUMANIZE:\n${input}`;

    let lastErr: any = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const result = await callHumanize(prompt);
        setOutput(result);
        toast.success("Text humanized!");
        setIsGenerating(false);
        return;
      } catch (err: any) {
        lastErr = err;
        if (attempt === 1) {
          toast.loading("Retrying humanization...");
        }
      }
    }
    toast.error(lastErr?.message || "Something went wrong. Please try again.");
    setIsGenerating(false);
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed.");
    }
  }

  return (
    <div className="w-full min-h-screen pb-20 relative">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full stroke-border [mask-image:linear-gradient(to_bottom,white,transparent)]"
        )}
      />
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader
          icon={Wand2}
          title="AI Text Humanizer"
          description="Rewrite robotic AI text into natural, human-sounding writing that bypasses AI detectors — free and instant."
        />

        <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Paste AI-generated text</Label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste ChatGPT, Claude, or Gemini output here..."
              className="w-full h-44 rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">Humanize tone</Label>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                    tone === t.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border/70 text-muted-foreground hover:border-primary/40"
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleHumanize}
            disabled={isGenerating}
            className="w-full sm:w-auto gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Humanizing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Humanize Text
              </>
            )}
          </Button>
        </GlassCard>

        {output && (
          <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Humanized Output
              </span>
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 rounded-lg p-4 border border-border/50">
              {output}
            </div>
          </GlassCard>
        )}

        <ToolHowItWorks steps={HOW_IT_WORKS} />
        <ToolFeatureGuides features={FEATURES} />
        <ToolFaqAccordion faqs={FAQS} />
        <RelatedTools currentToolUrl="/tools/writing/ai-text-humanizer" max={6} />
      </div>
    </div>
  );
}
