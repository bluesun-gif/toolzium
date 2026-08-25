"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Video,
  Sparkles,
  Copy,
  Check,
  Download,
  Clock,
  Mic,
  Clapperboard,
  Flame,
  Layers,
  ArrowRight,
  TrendingUp,
  Share2
} from "lucide-react";
import toast from "react-hot-toast";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";

interface ScriptSection {
  title: string;
  timestamp: string;
  voiceover: string;
  visualCue: string;
}

const VIRAL_PRESETS = [
  {
    name: "🚀 $10k/Mo SaaS Blueprint",
    topic: "How to Build a $10k/Month Micro-SaaS Business in 2026",
    audience: "Aspiring Solopreneurs & Developers",
    length: "8-10 Minutes",
    tone: "High Energy & Educational"
  },
  {
    name: "🧠 Dopamine Detox & Focus",
    topic: "The 7-Day Dopamine Reset That Rewires Your Brain for Deep Work",
    audience: "Students & Busy Professionals",
    length: "10-12 Minutes",
    tone: "Scientific & Cinematic Storytelling"
  },
  {
    name: "💰 2026 Gold & Bullion Strategy",
    topic: "Why Central Banks Are Secretly Hoarding Gold in 2026",
    audience: "Personal Finance & Investors",
    length: "8-10 Minutes",
    tone: "Analytical & Urgency Driven"
  },
  {
    name: "🎬 Faceless YouTube Channel",
    topic: "How to Start an Automated Faceless YouTube Channel with AI",
    audience: "Side Hustle & Content Creators",
    length: "5-8 Minutes",
    tone: "Casual & Step-by-Step Practical"
  }
];

export default function YoutubeScriptGeneratorClient() {
  const [topic, setTopic] = useState(VIRAL_PRESETS[0].topic);
  const [model, setModel] = useState("gpt4o");
  const [targetAudience, setTargetAudience] = useState(VIRAL_PRESETS[0].audience);
  const [videoLength, setVideoLength] = useState(VIRAL_PRESETS[0].length);
  const [tone, setTone] = useState(VIRAL_PRESETS[0].tone);
  const [sections, setSections] = useState<ScriptSection[]>([]);
  const [fullScriptRaw, setFullScriptRaw] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const applyPreset = (preset: typeof VIRAL_PRESETS[0]) => {
    setTopic(preset.topic);
    setTargetAudience(preset.audience);
    setVideoLength(preset.length);
    setTone(preset.tone);
    toast.success(`Loaded preset: ${preset.name}`);
  };

  const generateScript = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a video topic");
      return;
    }
    setLoading(true);
    setSections([]);

    try {
      const prompt = `You are a YouTube viral retention strategist (MrBeast, Ali Abdaal, MagnatesMedia standard).
Create a complete high-retention script for:
- Video Topic: "${topic}"
- Target Audience: "${targetAudience}"
- Target Length: "${videoLength}"
- Tone/Style: "${tone}"

Return STRICT JSON ONLY as an array of 4 distinct sections:
[
  {
    "title": "5-Second Curiosity Hook & Title Callback",
    "timestamp": "0:00 - 0:30",
    "voiceover": "Exact spoken narration hook designed to stop scrolling...",
    "visualCue": "Fast-paced B-roll, sound effect, and on-screen motion text directions..."
  },
  {
    "title": "The Stakes & Retention Bridge",
    "timestamp": "0:30 - 1:30",
    "voiceover": "Explains the high stakes, common mistake, and why they must watch till the end...",
    "visualCue": "Cinematic visual transition, split screen, or graph animation..."
  },
  {
    "title": "Core Value Delivery & Step-by-Step Breakdown",
    "timestamp": "1:30 - 7:30",
    "voiceover": "Concrete step 1, step 2, step 3 actionable insights with actionable frameworks...",
    "visualCue": "Screen recording, kinetic typography, b-roll footage overlays..."
  },
  {
    "title": "High-Converting Climax & End Screen CTA Loop",
    "timestamp": "7:30 - 8:30+",
    "voiceover": "Compelling call to action that loops into the next recommended video...",
    "visualCue": "End screen card placement, animated subscribe trigger, clean outro..."
  }
]
Raw JSON array only. No markdown formatting.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model,
          type: "json"
        })
      });

      if (!res.ok) throw new Error("AI generation failed");
      const data = await res.json();
      const rawText = data.raw || (Array.isArray(data.results) ? data.results.join("\n") : "");
      setFullScriptRaw(rawText);

      // Clean JSON parsing
      const cleaned = rawText
        .replace(/<think>[\s\S]*?<\/think>/gi, "")
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const startIdx = cleaned.indexOf("[");
      const endIdx = cleaned.lastIndexOf("]");

      if (startIdx !== -1 && endIdx !== -1) {
        const parsed = JSON.parse(cleaned.slice(startIdx, endIdx + 1));
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSections(parsed);
          toast.success("Viral YouTube script generated!");
          return;
        }
      }

      // Fallback if model returned unstructured lines
      const fallbackSections: ScriptSection[] = [
        {
          title: "Viral Hook & Intro",
          timestamp: "0:00 - 0:45",
          voiceover: cleaned.slice(0, 300) || `Stop wasting time on outdated methods for ${topic}. Here is the exact blueprint that changes everything.`,
          visualCue: "Kinetic typography, fast zooms, punchy SFX intro."
        },
        {
          title: "Core Blueprint & Framework",
          timestamp: "0:45 - 6:00",
          voiceover: cleaned.slice(300, 900) || `To master ${topic}, follow these three non-negotiable principles...`,
          visualCue: "Step-by-step on-screen graphic with animated highlights."
        },
        {
          title: "Outro & Video Loop CTA",
          timestamp: "6:00 - 8:00",
          voiceover: `If you found value in this ${topic} masterclass, tap the video on screen right now to see the next step.`,
          visualCue: "End screen cards with related video pointing gesture."
        }
      ];
      setSections(fallbackSections);
      toast.success("Script generated!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to generate script. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copySection = async (sec: ScriptSection, index: number) => {
    const text = `[${sec.title} (${sec.timestamp})]\n\nVISUAL CUE:\n${sec.visualCue}\n\nVOICEOVER / SPOKEN NARRATION:\n${sec.voiceover}`;
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success(`Copied Section ${index + 1}`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyFullScript = async () => {
    let full = `# YouTube Script: ${topic}\n`;
    full += `Audience: ${targetAudience} | Length: ${videoLength} | Style: ${tone}\n\n---\n\n`;

    sections.forEach((sec, idx) => {
      full += `## Section ${idx + 1}: ${sec.title} (${sec.timestamp})\n`;
      full += `**Visual Directive**: ${sec.visualCue}\n\n`;
      full += `**Voiceover**:\n${sec.voiceover}\n\n---\n\n`;
    });

    await navigator.clipboard.writeText(full);
    setCopiedAll(true);
    toast.success("Full formatted script copied to clipboard!");
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const downloadScript = () => {
    let full = `YOUTUBE VIDEO SCRIPT & OUTLINE\nTopic: ${topic}\nAudience: ${targetAudience}\nLength: ${videoLength}\n\n========================================\n\n`;

    sections.forEach((sec, idx) => {
      full += `[SECTION ${idx + 1}: ${sec.title.toUpperCase()} (${sec.timestamp})]\n`;
      full += `VISUAL / B-ROLL CUES:\n${sec.visualCue}\n\n`;
      full += `VOICEOVER / SCRIPT:\n${sec.voiceover}\n\n----------------------------------------\n\n`;
    });

    const blob = new Blob([full], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `youtube-script-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded script file!");
  };

  const totalWords = sections.reduce((acc, s) => acc + (s.voiceover?.split(/\s+/).length || 0), 0);
  const estimatedReadMins = (totalWords / 140).toFixed(1);

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Video}
          title="AI YouTube Video Script & Outline Generator"
          description="Generate viral 5-second curiosity hooks, B-roll cues, retention bridges, and high-CTR outro calls to action using multi-provider AI."
        />

        {/* 1-Click Viral Presets Row */}
        <div className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur-md p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <Flame className="h-4 w-4 text-amber-500" />
            <span>1-Click High-Retention Presets</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {VIRAL_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p)}
                className="text-left p-2.5 rounded-xl border border-border/60 bg-background/50 hover:bg-primary/10 hover:border-primary/40 transition-all text-xs font-semibold truncate cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Card */}
        <GlassCard className="p-6 space-y-5 rounded-3xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Clapperboard className="h-4 w-4 text-primary" />
                Script Generation Studio
              </h3>
              <p className="text-xs text-muted-foreground">
                Synthesizes MrBeast & Ali Abdaal level pacing and retention hooks
              </p>
            </div>
            <ModelSelector value={model} onChange={setModel} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">
              Video Topic / Target Search Title:
            </label>
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 7 Insane AI Tools That Will Replace Programmers in 2026"
              className="h-11 font-medium rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Target Audience:</label>
              <Input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="h-11 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Target Video Length:</label>
              <select
                value={videoLength}
                onChange={(e) => setVideoLength(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border bg-background text-xs font-medium cursor-pointer"
              >
                <option value="3-5 Minutes">3-5 Minutes (Quick Guide / Short Form)</option>
                <option value="8-10 Minutes">8-10 Minutes (Mid-Length Standard - Highest Ad RPM)</option>
                <option value="15+ Minutes">15+ Minutes (Deep Dive Masterclass / Documentary)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Video Tone & Style:</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border bg-background text-xs font-medium cursor-pointer"
              >
                <option value="High Energy & Educational">High Energy & Educational</option>
                <option value="Cinematic & Storytelling">Cinematic & Storytelling</option>
                <option value="Analytical & Urgency Driven">Analytical & Urgency Driven</option>
                <option value="Casual & Conversational">Casual & Conversational</option>
              </select>
            </div>
          </div>

          <Button
            onClick={generateScript}
            disabled={loading}
            className="w-full h-12 rounded-2xl text-sm font-bold bg-primary text-primary-foreground gap-2 cursor-pointer shadow-lg shadow-primary/20 hover:scale-101 active:scale-99 transition-all"
          >
            {loading ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>Synthesizing Viral Script & Hooks...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Full YouTube Script & Outline</span>
              </>
            )}
          </Button>
        </GlassCard>

        {/* Results Studio Display */}
        {sections.length > 0 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-400">
            {/* Header Teleprompter & Word Count Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-4 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-foreground">
                  <Mic className="h-4 w-4 text-primary" />
                  <span>Total Words: {totalWords}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Est. Read Time: ~{estimatedReadMins} mins (at 140 WPM)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyFullScript}
                  className="flex-1 sm:flex-initial h-9 rounded-xl text-xs font-bold gap-1.5 border-border/80 cursor-pointer"
                >
                  {copiedAll ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedAll ? "Copied All" : "Copy Full Script"}</span>
                </Button>
                <Button
                  size="sm"
                  onClick={downloadScript}
                  className="flex-1 sm:flex-initial h-9 rounded-xl text-xs font-bold gap-1.5 bg-primary text-primary-foreground cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download .txt</span>
                </Button>
              </div>
            </div>

            {/* Script Breakdown Cards */}
            <div className="space-y-4">
              {sections.map((sec, idx) => (
                <GlassCard key={idx} className="p-5 space-y-3 rounded-2xl border-border/80">
                  <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs font-black">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-foreground">{sec.title}</h4>
                      <span className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-mono text-muted-foreground">
                        {sec.timestamp}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copySection(sec, idx)}
                      className="h-8 px-2.5 rounded-lg text-xs font-semibold gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {copiedIndex === idx ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedIndex === idx ? "Copied" : "Copy"}</span>
                    </Button>
                  </div>

                  {/* Visual Cue Directive Box */}
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-600 dark:text-amber-400 leading-relaxed font-medium">
                    <span className="font-bold block mb-1">🎬 Visual & B-Roll Cue:</span>
                    {sec.visualCue}
                  </div>

                  {/* Voiceover Teleprompter Box */}
                  <div className="rounded-xl border border-border/60 bg-muted/40 p-4 text-xs sm:text-sm leading-relaxed text-foreground whitespace-pre-wrap font-sans">
                    <span className="font-bold text-xs text-muted-foreground block mb-1.5 uppercase tracking-wider">
                      🎙️ Spoken Voiceover Narration:
                    </span>
                    {sec.voiceover}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        <ToolHowItWorks
          steps={[
            {
              step: "1",
              title: "Choose Topic or Viral Preset",
              description: "Enter your video topic or select one of our curated high-retention creator templates."
            },
            {
              step: "2",
              title: "Synthesize Structured Outline",
              description: "Multi-provider AI generates a 4-act structure with curiosity hooks, retention bridges, and value delivery."
            },
            {
              step: "3",
              title: "Export Teleprompter Script & B-Roll Cues",
              description: "Copy individual sections directly into your teleprompter or download the complete production brief."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "5-Second Retention Hooks",
              description: "Never lose viewers in the first 10 seconds. Generates pattern-interrupting opening lines that maximize audience retention."
            },
            {
              title: "Kinetic B-Roll & SFX Directives",
              description: "Includes concrete editing cues for transitions, motion graphics, and audio pacing so video editors know exactly what to cut."
            },
            {
              title: "Teleprompter Speaking Pacer",
              description: "Calculates precise reading times based on 140 WPM so your 8-minute or 10-minute video fits YouTube midroll monetization benchmarks."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "How long should a high-performing YouTube video script be?",
              answer: "For optimal ad revenue and viewer retention, 8 to 12 minutes (~1,100 to 1,600 words) is the global YouTube benchmark, allowing seamless midroll ads without dragging pacing."
            },
            {
              question: "Can I use these scripts for Faceless AI Channels?",
              answer: "Yes. Every generated script includes both spoken narration (ready to paste into ElevenLabs or text-to-speech) and precise visual B-roll cues (ready to search on Storyblocks or generate in Midjourney/Veo)."
            },
            {
              question: "Is this tool 100% free with no signups?",
              answer: "Yes. Toolzium provides unlimited YouTube script generations powered by our zero-downtime multi-provider AI gateway."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/social/youtube-script-generator" />
      </div>
    </div>
  );
}
