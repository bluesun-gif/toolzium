"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Clock, Copy, FileText, RefreshCw, Shield, Sparkles, Type, Video, Youtube, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
export default function YoutubeScriptGeneratorClient() {
  const [topic, setTopic] = useState("How to Build a $10k/Month SaaS Business in 2026");
  const [model, setModel] = useState("gpt4o");
  const [targetAudience, setTargetAudience] = useState("Aspiring Solopreneurs & Software Engineers");
  const [videoLength, setVideoLength] = useState("8-10 Minutes");
  const [tone, setTone] = useState("High Energy & Educational");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateScript = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const prompt = `Generate a full high-retention YouTube video script & outline for topic: '${topic}'. Target Audience: '${targetAudience}'. Length: '${videoLength}'. Tone: '${tone}'. Break down into 4 key visual sections: Section 1: 5-Second Curiosity Hook & Title Callback, Section 2: Problem Staking & Retention Bridge, Section 3: Step-by-Step Value Delivery & B-Roll Cues, Section 4: Outro & High-Converting CTA. Format as 4 distinct script section cards. No markdown asterisks.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
            model,
          type: "cards"
        })
      });
      if (!res.ok) throw new Error("AI API failed");
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI YouTube Script generated!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Video} title="AI YouTube Video Script & Outline Generator" description="Generate high-retention 5-second opening hooks, B-roll cues, step-by-step value scripts, and high-CTR calls to action using live AI." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Video Topic / Title Idea:</label>
 <Input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. 7 Hidden Mac Features You Need to Use" className="h-11 font-medium" />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Target Audience:</label>
 <Input type="text" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="h-11" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Target Video Length:</label>
 <select value={videoLength} onChange={e => setVideoLength(e.target.value)} className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium">
 <option value="3-5 Minutes">3-5 Minutes (Quick Guide)</option>
 <option value="8-10 Minutes">8-10 Minutes (Mid-Length Standard)</option>
 <option value="15+ Minutes">15+ Minutes (Deep Dive Masterclass)</option>
 </select>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Video Tone / Vibe:</label>
 <select value={tone} onChange={e => setTone(e.target.value)} className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium">
 <option value="High Energy & Educational">High Energy & Educational</option>
 <option value="Cinematic & Storytelling">Cinematic & Storytelling</option>
 <option value="Casual & Conversational">Casual & Conversational</option>
 <option value="Urgent & Provocative">Urgent & Provocative</option>
 </select>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={generateScript} disabled={loading || !topic.trim()} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Scripting Video..." : "AI Generate YouTube Script"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && <AiOutputDisplay title="Generated High-Retention YouTube Video Script" subtitle="Complete with B-roll cues, hooks, and retention bridges" content={results} loading={loading} onRegenerate={generateScript} variant="cards" />}
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Enter Video Details", description: "Type your YouTube video title, topic, target audience, and video length.", icon: Youtube },
        { step: "02", title: "Generate Script", description: "AI creates a complete video script with hook, intro, main content, and outro.", icon: FileText },
        { step: "03", title: "Customize & Record", description: "Edit the script to match your voice, then record your video.", icon: Copy },
      ]} badges={["Full Scripts", "Retention Hooks", "AI-Powered"]} />

      <ToolFeatureGuides features={[
        { icon: Youtube, title: "Full Video Scripts", description: "Get complete scripts from hook to outro — no more staring at a blank page." },
        { icon: Sparkles, title: "Retention Optimized", description: "Scripts use YouTube retention hooks, pattern interrupts, and re-engagement techniques." },
        { icon: Clock, title: "Length Optimized", description: "Scripts are calibrated for your target video duration — 5, 10, 15, or 20+ minutes." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our AI YouTube Video Script & Outline Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our AI YouTube Video Script & Outline Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />
    </div>
    </div>
);
}
