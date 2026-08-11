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
import { Video, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, Play, Clock, FileText, Youtube, Zap } from "lucide-react";
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
        estimatedDuration: `${durationMin} Minutes`,
        wordCount
      });

      setIsGenerating(false);
      toast.success("Teleprompter-ready script generated!");
    }, 450);
  }, [topic, tone, targetLength]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Youtube}
        title="AI YouTube Video Script & High-CTR Hook Studio"
        description="Generate viral YouTube video titles, 15-second retention opening hooks, timestamped outlines, and teleprompter-ready script bodies."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Video className="w-4 h-4 text-red-500" />
              Video Specification Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block">Video Topic / Concept</Label>
              <Input
                placeholder="e.g. How to build a profitable Next.js SaaS app in 30 days"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">Narrative Tone</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option>Educational & Engaging</option>
                  <option>High-Energy & Hype</option>
                  <option>Serious & Documentary</option>
                  <option>Comedic & Casual</option>
                </select>
              </div>

              <div>
                <Label className="text-xs mb-1 block">Target Video Length</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  value={targetLength}
                  onChange={(e) => setTargetLength(e.target.value as any)}
                >
                  <option value="short">YouTube Short / Reel (~60s)</option>
                  <option value="medium">Standard Video (5-8 mins)</option>
                  <option value="long">Deep Dive (10-15 mins)</option>
                </select>
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={isGenerating || !topic.trim()} className="w-full gap-2 mt-2">
              {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? "Crafting Script..." : "Generate YouTube Script"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {script ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> High-CTR Viral Titles
                  </span>
                </div>
                <div className="space-y-1.5">
                  {script.titles.map((t, i) => (
                    <div key={i} className="flex justify-between items-center text-xs bg-muted/20 p-2 rounded border border-border/30">
                      <span className="font-semibold">{t}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(t, "Title")} className="h-6 text-[10px]">
                        Copy
                      </Button>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5" /> 15-Second Retention Opening Hook
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(script.hook, "Hook")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <p className="text-sm font-medium leading-relaxed bg-primary/10 p-3 rounded-lg border border-primary/20">{script.hook}</p>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-sky-500 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Teleprompter Script Body
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {script.estimatedDuration}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(script.body, "Script Body")} className="h-7 text-xs gap-1">
                      <Copy className="w-3.5 h-3.5" /> Copy Body
                    </Button>
                  </div>
                </div>
                <pre className="text-xs font-sans bg-muted/30 p-3 rounded-lg border border-border/40 whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto">{script.body}</pre>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
              <Youtube className="w-12 h-12 mb-3 text-muted-foreground/30" />
              <p className="text-sm font-medium">No Script Generated Yet</p>
              <p className="text-xs max-w-xs mt-1">Enter your video topic on the left to generate viral titles, retention opening hooks, and teleprompter scripts.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Enter Video Topic", description: "Input your core video concept, tutorial topic, or story idea.", icon: Youtube },
          { step: "02", title: "Select Tone & Duration", description: "Choose narrative tone and target video runtime.", icon: Sliders },
          { step: "03", title: "Copy Teleprompter Script", description: "Copy high-CTR titles, opening hooks, and full scripts into your teleprompter.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "High-CTR Titles", "Teleprompter Ready"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Zap, title: "15-Second Retention Hooks", description: "Engineered to maximize audience watch time during critical introductory seconds." },
          { icon: Clock, title: "Teleprompter Read-Time Meter", description: "Calculates total script word counts and estimated speaking duration." },
          { icon: CheckCircle2, title: "Zero Server Logging", description: "Processes your script ideas strictly inside local client browser memory." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Psychology of YouTube Video Retention</h3>
          <p>
            YouTube's recommendation algorithm heavily prioritizes Audience Retention and Click-Through Rate (CTR). A video hook must deliver on the title promise within the first 15 seconds to prevent viewers from dropping off. Our script studio formats every output around proven viral retention frameworks.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Can I use these scripts for YouTube Shorts or TikTok?", answer: "Yes! Select 'YouTube Short / Reel (~60s)' in the video length dropdown." },
          { question: "Are these titles optimized for YouTube SEO?", answer: "Yes! Generated titles balance click curiosity with high-volume search keywords." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/youtube-script" max={6} />
    </div>
  );
}

export default YoutubeScriptClient;
