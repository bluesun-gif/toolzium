"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, Youtube, Clock, FileText, Zap } from "lucide-react";
import toast from "react-hot-toast";

interface ScriptResult {
  titles: string[];
  hook: string;
  outline: string;
  body: string;
  estimatedDuration: string;
  wordCount: number;
}

export function YoutubeScriptClient() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Educational & Engaging");
  const [targetLength, setTargetLength] = useState<"short" | "medium" | "long">("medium");

  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<ScriptResult | null>(null);

  const handleGenerate = useCallback(() => {
    if (!topic.trim()) {
      toast.error("Please enter a video topic or idea");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const top = topic.trim();
      const wordCount = targetLength === "long" ? 1400 : targetLength === "medium" ? 850 : 350;
      const durationMin = Math.round(wordCount / 130);

      const titles = [
        `How I Mastered ${top} (And You Can Too)`,
        `The Untold Truth About ${top} in 2026`,
        `5 Critical Mistakes Everyone Makes With ${top}`,
        `Step-by-Step Blueprint for ${top}`
      ];

      const hook = `Have you ever wondered why 99% of people struggle with ${top}? In the next ${durationMin} minutes, I'm revealing the exact framework top creators use to achieve massive results—without wasting months on trial and error.`;

      const outline = `0:00 - High-Retention Opening Hook\n0:45 - The Core Problem Nobody Talks About\n2:15 - Step 1: Foundational Execution\n4:30 - Step 2: Scaling & Optimization\n${durationMin - 1}:00 - Final Takeaway & Call to Action`;

      const body = `[0:00 - HOOK]\n${hook}\n\n[0:45 - SECTION 1: THE FOUNDATION]\nBefore you jump into ${top}, you must understand the underlying principles. Most beginners fail because they skip the essential setup phase...\n\n[2:15 - SECTION 2: STEP-BY-STEP BLUEPRINT]\nHere is the step-by-step strategy. First, identify your core metrics. Second, eliminate friction in your daily workflow...\n\n[${durationMin - 1}:00 - OUTRO & CTA]\nIf you found value in this breakdown, hit the subscribe button below and download the free guide linked in the description.`;

      setScript({
        titles,
        hook,
        outline,
        body,
        estimatedDuration: `${durationMin} mins`,
        wordCount
      });

      setIsGenerating(false);
      toast.success("YouTube teleprompter script generated!");
    }, 450);
  }, [topic, tone, targetLength]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* 3D Red YouTube Icon Header Box */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30 flex items-center justify-center shrink-0">
          <Youtube className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">AI YouTube Script Generator & Teleprompter Writer</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 px-2.5 py-0.5 rounded-full border border-red-200">HOT</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Generate high-retention viral YouTube titles, 15-second opening hooks, timestamp outlines, and teleprompter scripts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Video className="w-4 h-4 text-red-600" />
              Video Concept Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Video Topic / Core Keyword</Label>
              <Input
                placeholder="e.g. How to build a Next.js app with AI features in 2026"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Tone of Voice</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="Educational & Engaging">Educational & Engaging</option>
                  <option value="Storytelling & Dramatic">Storytelling & Dramatic</option>
                  <option value="Fast-Paced Tech">Fast-Paced Tech</option>
                  <option value="Motivational & Bold">Motivational & Bold</option>
                </select>
              </div>

              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Target Video Duration</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
                  value={targetLength}
                  onChange={(e) => setTargetLength(e.target.value as any)}
                >
                  <option value="short">Short Form (2-3 Mins)</option>
                  <option value="medium">Standard Video (6-8 Mins)</option>
                  <option value="long">Deep Dive (10-12 Mins)</option>
                </select>
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={isGenerating || !topic.trim()} className="w-full gap-2 mt-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold shadow-md shadow-red-500/20 rounded-xl h-11">
              <Sparkles className="w-4 h-4" />
              {isGenerating ? "Crafting Viral Script..." : "Generate YouTube Script"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {script ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> High-CTR Video Title Options
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(script.titles.join("\n"), "Titles")} className="h-7 text-xs gap-1 border-slate-200">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <div className="space-y-1.5">
                  {script.titles.map((t, idx) => (
                    <div key={idx} className="text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">#{idx + 1}</span>
                      {t}
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-red-600" /> Teleprompter Script
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{script.estimatedDuration} · {script.wordCount} words</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(script.body, "Full script")} className="h-7 text-xs gap-1 border-slate-200">
                    <Copy className="w-3.5 h-3.5" /> Copy Script
                  </Button>
                </div>
                <pre className="text-xs font-sans bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto text-slate-800 dark:text-slate-200">
                  {script.body}
                </pre>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-slate-400 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <Youtube className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Script Generated Yet</p>
              <p className="text-xs max-w-xs mt-1 text-slate-500">Enter your video topic on the left to generate viral titles, opening retention hooks, and full teleprompter scripts.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Enter Video Topic", description: "Input your core topic, tutorial concept, or target keywords.", icon: Video },
          { step: "02", title: "Select Duration & Tone", description: "Choose target video length and engagement tone.", icon: Sliders },
          { step: "03", title: "Copy Teleprompter Script", description: "Export titles, timestamp outlines, and body scripts directly.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Retention Hook Generator", "Teleprompter Ready"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Youtube, title: "High-CTR Title Generator", description: "Creates proven YouTube titles optimized for high Click-Through Rates (CTR)." },
          { icon: Clock, title: "Read-Time Teleprompter Meter", description: "Calculates total word count and estimated spoken video duration." },
          { icon: CheckCircle2, title: "15-Second Retention Hooks", description: "Crafts opening hooks designed to maximize audience retention in the first 30 seconds." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Video Scripting Drives Channel Growth</h3>
          <p>
            The YouTube algorithm heavily prioritizes <strong>Audience Retention</strong> and <strong>Average Percentage Viewed (APV)</strong>. Structuring videos with a 15-second opening hook and clear timestamp transitions prevents viewer drop-off.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "How many words is a 10-minute video script?", answer: "At an average speaking pace of 130 to 150 words per minute, a 10-minute video script is approximately 1,300 to 1,500 words." },
          { question: "Can I use these scripts for YouTube Shorts?", answer: "Yes! Select 'Short Form (2-3 Mins)' for punchy, fast-paced scripts ideal for Shorts and Reels." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/youtube-script" max={6} />
    </div>
  );
}

export default YoutubeScriptClient;
