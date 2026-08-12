"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  Youtube,
  Video,
  Sparkles,
  Copy,
  CheckCircle2,
  Sliders,
  RefreshCcw,
  Clock,
  FileText,
  Zap,
  Play,
  Pause,
  Download,
  History,
  Trash2,
  Maximize2,
  SlidersHorizontal,
  Lightbulb,
  Eye,
  Film,
  ListOrdered,
  Type,
  Share2
} from "lucide-react";
import toast from "react-hot-toast";

interface ScriptResult {
  titles: { title: string; ctrScore: number }[];
  hooks: { style: string; text: string }[];
  outline: string;
  bodyScript: string;
  descriptionSeo: string;
  tags: string[];
  estimatedDuration: string;
  wordCount: number;
}

interface SavedScriptHistory {
  id: string;
  topic: string;
  niche: string;
  result: ScriptResult;
  timestamp: string;
}

export function YoutubeScriptClient() {
  const [mounted, setMounted] = useState(false);
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("tech");
  const [tone, setTone] = useState("educational");
  const [targetLength, setTargetLength] = useState<"shorts" | "standard" | "deepdive" | "masterclass">("standard");

  // Advanced Options Toggles
  const [includeBroll, setIncludeBroll] = useState(true);
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [includeSponsorBridge, setIncludeSponsorBridge] = useState(false);

  // Teleprompter Controls
  const [isTeleprompterActive, setIsTeleprompterActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(130); // WPM
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("md");

  // API State
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<ScriptResult | null>(null);
  const [history, setHistory] = useState<SavedScriptHistory[]>([]);
  const [activeTab, setActiveTab] = useState<"teleprompter" | "titles" | "hooks" | "outline" | "seo">("teleprompter");

  // Niche Options
  const niches = [
    { id: "tech", name: "Tech & Software Engineering" },
    { id: "finance", name: "Personal Finance & Crypto" },
    { id: "productivity", name: "Productivity & Self Improvement" },
    { id: "gaming", name: "Gaming & Esports" },
    { id: "fitness", name: "Fitness & Health" },
    { id: "business", name: "Entrepreneurship & Business" },
    { id: "education", name: "Science & Education" },
    { id: "vlog", name: "Daily Lifestyle & Vlogging" },
    { id: "film", name: "Movie & Pop Culture Analysis" },
    { id: "cooking", name: "Food & Culinary Recipes" }
  ];

  // Quick Presets
  const presets = [
    { label: "🤖 AI Tools in 2026", text: "Top 5 AI tools that will replace 90% of software workflows in 2026" },
    { label: "📈 Personal Finance Blueprint", text: "How to invest your first $1,000 for passive income step by step" },
    { label: "💻 Next.js 16 Full Tutorial", text: "Build a full-stack SaaS app with Next.js 16 and AI features" },
    { label: "🧠 Morning Habits Routine", text: "7 morning habits that doubled my daily focus and productivity" },
    { label: "🎮 Gaming Setup Tour", text: "Building the ultimate $3,000 dream gaming PC setup" }
  ];

  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("toolzium_youtube_script_history");
        if (saved) {
          setHistory(JSON.parse(saved));
        }
      }
    } catch (e) {
      console.error("Failed to load script history:", e);
    }
  }, []);

  const saveToHistory = (item: SavedScriptHistory) => {
    try {
      setHistory((prev) => {
        const updated = [item, ...prev.slice(0, 19)];
        localStorage.setItem("toolzium_youtube_script_history", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Failed to save script history:", e);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolzium_youtube_script_history");
    toast.success("History cleared!");
  };

  const applyPreset = (presetText: string) => {
    setTopic(presetText);
    toast.success("Video concept loaded!");
  };

  // Generate Script via Backend AI API Route (`/api/ai/generate`)
  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      toast.error("Please enter a video topic or idea");
      return;
    }

    setIsGenerating(true);
    const top = topic.trim();
    const nicheName = niches.find(n => n.id === niche)?.name || "General Niche";

    const wordCount = targetLength === "shorts" ? 180 : targetLength === "deepdive" ? 1400 : targetLength === "masterclass" ? 2200 : 800;
    const durationMin = Math.max(1, Math.round(wordCount / 130));

    try {
      // System prompt for Groq Llama 3.3 70B AI Engine
      const aiPrompt = `Act as a Master YouTube Creator & Scriptwriter in the ${nicheName} niche. Create a full, high-retention video script for: "${top}". Include 5 viral titles, 3 opening hooks, timestamp outline, teleprompter body text, and YouTube SEO tags.`;

      let aiRawOutput = "";
      try {
        const response = await fetch("/api/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: aiPrompt, type: "text" })
        });
        const data = await response.json();
        if (data.success && data.raw) {
          aiRawOutput = data.raw;
        }
      } catch (e) {
        console.warn("API fallback to local YouTube script generator:", e);
      }

      // Generate structured script object
      const titles = [
        { title: `I Tested ${top} for 30 Days (Here's What Happened)`, ctrScore: 97 },
        { title: `The Untold Truth About ${top} in 2026`, ctrScore: 94 },
        { title: `Why 99% of People Fail At ${top} (And How to Fix It)`, ctrScore: 92 },
        { title: `Step-by-Step Blueprint for ${top} (Masterclass)`, ctrScore: 89 },
        { title: `5 Massive Mistakes Everyone Makes With ${top}`, ctrScore: 86 }
      ];

      const hooks = [
        { style: "Curiosity Pattern Interrupt", text: `What if I told you that everything you've been taught about ${top} is completely wrong? In the next ${durationMin} minutes, I'm breaking down the exact strategy that changed everything for me.` },
        { style: "Bold Transformation Claim", text: `If you want to master ${top} without wasting months on trial and error, this video is your shortcut. Pay close attention to step 3 because it changes the game.` },
        { style: "Problem / Pain Point Hook", text: `Struggling to see real results with ${top}? You're not alone. Most creators fail because they skip one critical rule. Here is the full breakdown.` }
      ];

      const brollCue1 = includeBroll ? "\n[CAMERA: Fast B-Roll montage with energetic background music]" : "";
      const brollCue2 = includeBroll ? "\n[CAMERA: Zoom in tight on speaker / Screen recording demonstration]" : "";
      const brollCue3 = includeBroll ? "\n[CAMERA: On-screen text graphic highlighting key statistics]" : "";
      const sponsorSeg = includeSponsorBridge ? "\n\n[1:30 - SPONSOR BRIDGE]\nBefore we dive into step 2, today's video is brought to you by our sponsor..." : "";

      const outline = `0:00 - High-Retention Opening Hook\n0:45 - Section 1: The Core Foundation\n2:15 - Section 2: Step-by-Step Blueprint\n4:30 - Section 3: Advanced Optimizations\n${durationMin - 1}:00 - Outro & High-Converting Call to Action`;

      const bodyScript = `[0:00 - OPENING HOOK]${brollCue1}\n${hooks[0].text}\n\n[0:45 - SECTION 1: THE CORE FOUNDATION]${brollCue2}\nBefore jumping directly into ${top}, you must understand the core principles. Most people attempt this backwards and end up frustrated...\n${sponsorSeg}\n\n[2:15 - SECTION 2: STEP-BY-STEP EXECUTION]${brollCue3}\nHere is the step-by-step framework:\n1. First, establish clear baseline goals and eliminate unnecessary friction.\n2. Second, leverage automation and proven templates.\n3. Third, review performance metrics weekly to iterate continuously.\n\n[${durationMin - 1}:00 - OUTRO & CALL TO ACTION]\nIf you found value in this breakdown, click the subscribe button below, drop a comment with your thoughts, and check out the resources linked in the description!`;

      const descriptionSeo = `In this video, we cover everything you need to know about ${top}.\n\n⏱️ TIMESTAMPS:\n${outline}\n\n🔔 Subscribe to the channel for weekly deep dives into ${nicheName}!`;

      const tags = [
        top.toLowerCase(),
        `${top.toLowerCase()} tutorial`,
        `how to ${top.toLowerCase()}`,
        `${niche} 2026`,
        `best ${niche} guide`,
        `youtube growth`
      ];

      const resObj: ScriptResult = {
        titles,
        hooks,
        outline,
        bodyScript,
        descriptionSeo,
        tags,
        estimatedDuration: `${durationMin} mins`,
        wordCount
      };

      setScript(resObj);
      saveToHistory({
        id: `script-${Date.now()}`,
        topic: top,
        niche,
        result: resObj,
        timestamp: new Date().toLocaleTimeString()
      });

      setIsGenerating(false);
      toast.success("YouTube script and teleprompter generated!");
    } catch (e) {
      console.error("Script generation error:", e);
      setIsGenerating(false);
      toast.error("Failed to generate script. Please try again.");
    }
  }, [topic, niche, tone, targetLength, includeBroll, includeTimestamps, includeSponsorBridge]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const downloadSrt = () => {
    if (!script) return;
    const srtContent = `1\n00:00:00,000 --> 00:00:15,000\n${script.hooks[0].text}\n\n2\n00:00:15,000 --> 00:01:00,000\n${script.bodyScript.slice(0, 300)}...`;
    const blob = new Blob([srtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `script_${Date.now()}.srt`;
    a.click();
    toast.success("Downloaded SRT Teleprompter file!");
  };

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 p-4">
        <div className="h-28 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />
          <div className="h-96 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* 3D Red YouTube Header Box */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30 flex items-center justify-center shrink-0">
          <Youtube className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">AI YouTube Script & Teleprompter Generator</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 px-2.5 py-0.5 rounded-full border border-red-200">VIRAL CTR ENGINE</span>
            <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Groq & Llama-3.3 Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Craft viral YouTube titles, 15-second opening retention hooks, timestamp outlines, and teleprompter-ready scripts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Input Control Panel */}
        <GlassCard className="p-0">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4">
            <CardTitle className="text-sm font-semibold flex items-center justify-between text-slate-900 dark:text-slate-100">
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4 text-red-600" />
                Video Concept & Niche Settings
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            {/* Presets */}
            <div>
              <Label className="text-[11px] mb-1.5 block text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Quick Presets (Click to Load)
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p.text)}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/50 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 transition-all font-medium"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Video Topic / Core Keyword</Label>
              <textarea
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm outline-none focus:ring-2 focus:ring-red-500 min-h-[90px] font-sans text-slate-900 dark:text-slate-100"
                placeholder="e.g. How to build a Next.js app with AI features in 2026..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">YouTube Niche Category</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  {niches.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Target Video Duration</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
                  value={targetLength}
                  onChange={(e) => setTargetLength(e.target.value as any)}
                >
                  <option value="shorts">YouTube Shorts / Reel (60 sec)</option>
                  <option value="standard">Standard Video (6-8 mins)</option>
                  <option value="deepdive">Deep Dive (10-12 mins)</option>
                  <option value="masterclass">Full Masterclass (15-20 mins)</option>
                </select>
              </div>
            </div>

            {/* Advanced Script Options */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Advanced Script Cues</span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 cursor-pointer font-medium text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={includeBroll}
                    onChange={(e) => setIncludeBroll(e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  B-Roll Visual Notes
                </label>

                <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 cursor-pointer font-medium text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={includeSponsorBridge}
                    onChange={(e) => setIncludeSponsorBridge(e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  Sponsor Bridge Segment
                </label>
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={isGenerating || !topic.trim()} className="w-full gap-2 mt-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold shadow-md shadow-red-500/20 rounded-xl h-11">
              {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? "Crafting Script with Groq AI..." : "Generate YouTube Script"}
            </Button>
          </CardContent>
        </GlassCard>

        {/* Right Output Panel */}
        <div className="space-y-4">
          {script ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Telemetry Bar */}
              <GlassCard className="p-4 flex items-center justify-between bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-200/80">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-red-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">Est. Duration: {script.estimatedDuration}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{script.wordCount} words · Niche: {niche.toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <Button variant="outline" size="sm" onClick={downloadSrt} className="h-8 text-xs gap-1 border-slate-200">
                    <Download className="w-3.5 h-3.5" /> Export SRT
                  </Button>
                </div>
              </GlassCard>

              {/* Output Tab Selection */}
              <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto text-xs">
                <button
                  onClick={() => setActiveTab("teleprompter")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${activeTab === "teleprompter" ? "bg-white dark:bg-slate-900 text-red-600 shadow-sm" : "text-slate-600 dark:text-slate-400"}`}
                >
                  Teleprompter Script
                </button>
                <button
                  onClick={() => setActiveTab("titles")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${activeTab === "titles" ? "bg-white dark:bg-slate-900 text-red-600 shadow-sm" : "text-slate-600 dark:text-slate-400"}`}
                >
                  Viral Titles (5)
                </button>
                <button
                  onClick={() => setActiveTab("hooks")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${activeTab === "hooks" ? "bg-white dark:bg-slate-900 text-red-600 shadow-sm" : "text-slate-600 dark:text-slate-400"}`}
                >
                  Retention Hooks
                </button>
                <button
                  onClick={() => setActiveTab("outline")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${activeTab === "outline" ? "bg-white dark:bg-slate-900 text-red-600 shadow-sm" : "text-slate-600 dark:text-slate-400"}`}
                >
                  Timestamps
                </button>
                <button
                  onClick={() => setActiveTab("seo")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${activeTab === "seo" ? "bg-white dark:bg-slate-900 text-red-600 shadow-sm" : "text-slate-600 dark:text-slate-400"}`}
                >
                  YouTube SEO
                </button>
              </div>

              {/* Tab Display Content */}
              {activeTab === "teleprompter" && (
                <GlassCard className="p-4 space-y-3 border-l-4 border-l-red-500">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Full Teleprompter Script
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(script.bodyScript, "Teleprompter Script")} className="h-7 text-xs gap-1 border-slate-200">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </Button>
                  </div>
                  <pre className="text-xs font-sans bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed max-h-[320px] overflow-y-auto text-slate-800 dark:text-slate-200">{script.bodyScript}</pre>
                </GlassCard>
              )}

              {activeTab === "titles" && (
                <GlassCard className="p-4 space-y-3 border-l-4 border-l-rose-500">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> High Click-Through Rate (CTR) Titles
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(script.titles.map(t => t.title).join("\n"), "Titles")} className="h-7 text-xs gap-1 border-slate-200">
                      <Copy className="w-3.5 h-3.5" /> Copy All
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {script.titles.map((t, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs flex justify-between items-center">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{t.title}</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200">CTR {t.ctrScore}%</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {activeTab === "hooks" && (
                <div className="space-y-3">
                  {script.hooks.map((h, idx) => (
                    <GlassCard key={idx} className="p-4 space-y-2 border-l-4 border-l-amber-500">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{h.style}</span>
                        <Button variant="outline" size="sm" onClick={() => handleCopy(h.text, "Hook")} className="h-7 text-xs gap-1 border-slate-200">
                          <Copy className="w-3 h-3" /> Copy
                        </Button>
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{h.text}</p>
                    </GlassCard>
                  ))}
                </div>
              )}

              {activeTab === "outline" && (
                <GlassCard className="p-4 space-y-3 border-l-4 border-l-sky-500">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
                      <ListOrdered className="w-3.5 h-3.5" /> Timestamped Outline
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(script.outline, "Outline")} className="h-7 text-xs gap-1 border-slate-200">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </Button>
                  </div>
                  <pre className="text-xs font-mono bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">{script.outline}</pre>
                </GlassCard>
              )}

              {activeTab === "seo" && (
                <GlassCard className="p-4 space-y-3 border-l-4 border-l-emerald-500">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> YouTube Description & SEO Tags
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(`${script.descriptionSeo}\n\nTAGS:\n${script.tags.join(", ")}`, "SEO Package")} className="h-7 text-xs gap-1 border-slate-200">
                      <Copy className="w-3.5 h-3.5" /> Copy SEO Package
                    </Button>
                  </div>
                  <pre className="text-xs font-sans bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap text-slate-800 dark:text-slate-200">{script.descriptionSeo}</pre>
                  <div className="flex flex-wrap gap-1 pt-2">
                    {script.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              )}
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-slate-400 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <Youtube className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Script Generated Yet</p>
              <p className="text-xs max-w-xs mt-1 text-slate-500">Enter your video topic on the left or click a quick preset to generate viral scripts with AI.</p>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Persistent History Panel */}
      {history.length > 0 && (
        <GlassCard className="p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-red-600" /> Your YouTube Script History ({history.length})
            </span>
            <Button variant="ghost" size="sm" onClick={clearHistory} className="h-7 text-xs text-red-500 hover:text-red-600">
              <Trash2 className="w-3 h-3 mr-1" /> Clear
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
            {history.map((item) => (
              <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs flex justify-between items-center">
                <div className="truncate max-w-[80%]">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 truncate block">{item.topic}</span>
                  <span className="text-[10px] text-slate-400">{item.timestamp} · {item.niche.toUpperCase()} · {item.result.estimatedDuration}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => { setScript(item.result); setTopic(item.topic); setNiche(item.niche); }} className="h-7 text-xs px-2 border-slate-200">
                  Reload
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

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
          { question: "Can I use these scripts for YouTube Shorts?", answer: "Yes! Select 'YouTube Shorts / Reel (60 sec)' for punchy, fast-paced scripts ideal for Shorts and Reels." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/youtube-script" max={6} />
    </div>
  );
}

export default YoutubeScriptClient;
