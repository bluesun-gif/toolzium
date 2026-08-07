"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Video, Sparkles, RefreshCw, Copy, Check, Tv, PlayCircle, Award, Film } from "lucide-react";

interface ScriptResult {
  titles: string[];
  hook15s: string;
  outline: { time: string; topic: string }[];
  fullScript: string;
}

export default function YoutubeScriptClient() {
  const [videoTopic, setVideoTopic] = useState<string>("How to build a SaaS startup in 30 days without coding");
  const [videoStyle, setVideoStyle] = useState<string>("Educational & Step-by-Step");
  const [targetAudience, setTargetAudience] = useState<string>("Entrepreneurs & Indie Hackers");

  const [result, setResult] = useState<ScriptResult | null>({
    titles: [
      "I Built a $10k/Mo SaaS in 30 Days (No Code Allowed)",
      "How Anyone Can Build a SaaS Application in 2026",
      "Stop Learning Code: Build Apps 10x Faster Like This",
    ],
    hook15s: "What if I told you that 80% of successful software startups built this year were created by people who don't know a single line of code? In the next 8 minutes, I'm revealing the exact 4-step framework you can use to launch your own profitable SaaS in 30 days.",
    outline: [
      { time: "0:00 - 0:15", topic: "High-CTR Pattern Interrupt Hook" },
      { time: "0:15 - 2:00", topic: "The No-Code Tech Stack Overview" },
      { time: "2:00 - 5:30", topic: "Step-by-Step MVP Architecture & DB Setup" },
      { time: "5:30 - 7:30", topic: "Monetization & First 100 Paying Users" },
      { time: "7:30 - 8:00", topic: "Outro & Call-to-Action Subscriber Push" },
    ],
    fullScript: `[INTRO - 0:00]\n(Host standing facing camera with dynamic background graphics)\n"What if I told you that 80% of successful software startups built this year were created by people who don't know code? In this video, I'm giving you the exact 4-step blueprint."\n\n[SECTION 1: THE NO-CODE STACK - 0:15]\n"First, let's break down the tech stack. Instead of spending 6 months learning React and Python, we use modern visual building tools..."\n\n[SECTION 2: DATABASE & LOGIC - 2:00]\n"Next, connect your data model. Here is how we set up tables and user authentication in 10 minutes..."`,
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleGenerateScript = () => {
    if (!videoTopic.trim()) {
      toast.error("Please enter a video topic.");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const topic = videoTopic.trim();
      setResult({
        titles: [
          `The Secret to ${topic} (Step-by-Step Blueprint)`,
          `Why Most People Fail at ${topic} (And How to Fix It)`,
          `I Tried ${topic} for 30 Days (Insane Results)`,
        ],
        hook15s: `If you're trying to master ${topic}, you're probably doing it wrong. In the next 7 minutes, I'm revealing the secret framework that top creators use to get 10x faster results.`,
        outline: [
          { time: "0:00 - 0:15", topic: "Pattern Interrupt Hook" },
          { time: "0:15 - 2:30", topic: "Core Problem Breakdown" },
          { time: "2:30 - 6:00", topic: "Step-by-Step Action Plan" },
          { time: "6:00 - 7:00", topic: "Final Takeaway & CTA" },
        ],
        fullScript: `[INTRO]\n"If you're trying to master ${topic}, stop what you're doing right now. In this video, I'm going to walk you through the proven step-by-step strategy..."\n\n[CORE STRATEGY]\n"Step 1: Focus on high-leverage execution..."`,
      });

      setIsGenerating(false);
      toast.success("Generated high-CTR YouTube script & titles!");
    }, 500);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="AI YouTube Video Script & High-CTR Hook Generator Studio"
        description="Generate viral YouTube video titles, 15-second opening hooks, video section outlines, and teleprompter-ready scripts."
      />

      {/* SINGLE VIEWPORT YOUTUBE STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Video Topic Inputs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col max-w-full min-w-0">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                <Video className="h-4 w-4 text-red-500 shrink-0" />
                Video Topic & Audience Input
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full min-w-0">
              <div className="space-y-1 max-w-full min-w-0">
                <label className="text-xs font-semibold text-muted-foreground">Video Topic or Idea:</label>
                <Textarea
                  value={videoTopic}
                  onChange={(e) => setVideoTopic(e.target.value)}
                  placeholder="e.g. How to build a tech startup..."
                  className="text-xs min-h-[110px] bg-muted/20 resize-none p-3 rounded-xl max-w-full min-w-0"
                />
              </div>

              {/* Format & Style Selectors - Stacks on Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs max-w-full min-w-0">
                <div className="space-y-1 max-w-full min-w-0">
                  <label className="font-semibold text-muted-foreground">Video Format:</label>
                  <select
                    value={videoStyle}
                    onChange={(e) => setVideoStyle(e.target.value)}
                    className="w-full bg-background border rounded-lg p-2 text-xs max-w-full min-w-0"
                  >
                    <option value="Educational & Step-by-Step">Educational Tutorial</option>
                    <option value="Storytelling & Vlog">Storytelling & Vlog</option>
                    <option value="Product & Tech Review">Tech & Product Review</option>
                    <option value="Challenge & Experiment">Challenge / Experiment</option>
                  </select>
                </div>

                <div className="space-y-1 max-w-full min-w-0">
                  <label className="font-semibold text-muted-foreground">Target Audience:</label>
                  <Input
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Beginners, Creators"
                    className="text-xs bg-muted/20 h-9 rounded-xl max-w-full min-w-0"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerateScript}
                disabled={isGenerating || !videoTopic.trim()}
                className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm mt-2 max-w-full min-w-0"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                    <span>Generating YouTube Script...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Generate Script & High-CTR Titles</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Generated YouTube Script & Hook (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col max-w-full min-w-0">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2 max-w-full min-w-0">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight truncate min-w-0">
                  <Film className="h-4 w-4 shrink-0" />
                  <span className="truncate">Teleprompter Script & Outline</span>
                </CardTitle>

                {result && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleCopyText(
                        `TITLES:\n${result.titles.join("\n")}\n\n15s HOOK:\n${result.hook15s}\n\nFULL SCRIPT:\n${result.fullScript}`,
                        "Full Script"
                      )
                    }
                    className="h-8 gap-1.5 text-xs rounded-lg shrink-0"
                  >
                    {copiedSection === "Full Script" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedSection === "Full Script" ? "Copied" : "Copy Full Script"}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full min-w-0 overflow-hidden">
              {result && (
                <div className="space-y-3 max-w-full min-w-0 overflow-y-auto max-h-[440px] pr-1">
                  {/* High CTR Titles */}
                  <div className="p-3 rounded-xl border bg-muted/20 space-y-1 max-w-full min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-red-500 flex items-center gap-1">
                      <Award className="h-3 w-3 shrink-0" /> High-CTR Video Title Options:
                    </span>
                    <ul className="space-y-1 text-xs font-semibold text-foreground">
                      {result.titles.map((t, idx) => (
                        <li key={idx} className="break-words">🔥 {t}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 15s Hook */}
                  <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 space-y-1 max-w-full min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      15-Second Attention Hook:
                    </span>
                    <p className="text-xs text-foreground/90 leading-relaxed break-words">{result.hook15s}</p>
                  </div>

                  {/* Full Script */}
                  <div className="p-3.5 rounded-xl border bg-[#0f172a] text-[#f8fafc] font-mono text-xs text-slate-100 space-y-1 max-w-full min-w-0">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-400">
                      Script Body:
                    </span>
                    <pre className="whitespace-pre-wrap break-all leading-relaxed text-slate-100">{result.fullScript}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
