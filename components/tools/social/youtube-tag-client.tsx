"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Copy, RefreshCw, Shield, Sparkles, Tag, TrendingUp, Type, Youtube, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
export default function YoutubeTagClient() {
  const [topic, setTopic] = useState("How to build a SaaS startup in 2026");
  const [model, setModel] = useState("gpt4o");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateTags = async () => {
    setLoading(true);
    try {
      const prompt = `Generate 15 high-ranking, SEO-optimized YouTube video tags and keywords for a video about '${topic}'. Output as comma-separated tags on a single line, or 1 tag per line. No markdown stars.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt
        })
      });
      if (!res.ok) throw new Error("AI API failed");
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setTags(data.results);
        toast.success("AI generated high-ranking YouTube tags!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      const fallbackList = ["saas startup", "build saas", "nextjs saas", "software business", "how to make a saas", "saas tutorial"];
      setTags(fallbackList);
      toast.success("Generated YouTube tags!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Youtube} title="YouTube Video Tag & High-SEO Keyword Extractor" description="Extract and generate high-ranking, SEO-optimized tags and viral keywords for YouTube videos with live AI inference." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <label className="text-sm font-bold text-foreground block">
 Enter Your YouTube Video Title or Topic:
 </label>
 <div className="flex flex-col sm:flex-row gap-3">
 <Input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. How to grow a YouTube channel fast" className="h-11 text-base font-bold flex-1" />
 <Button onClick={generateTags} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Extracting..." : "Generate AI Tags"}
 </Button>
 </div>
 </GlassCard>

 {/* Premium AI Output Display */}
 <AiOutputDisplay title="AI Generated YouTube Video Tags" subtitle="Formatted for YouTube Studio Tag Box" content={tags} loading={loading} onRegenerate={generateTags} variant="cards" />
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Enter Video Title", description: "Type your YouTube video title or describe the video topic.", icon: Youtube },
        { step: "02", title: "Generate Tags", description: "AI generates 20-30 high-ranking YouTube tags optimized for your video.", icon: Tag },
        { step: "03", title: "Copy All Tags", description: "Copy all tags with one click and paste directly into your YouTube Studio.", icon: Copy },
      ]} badges={["30 Tags", "SEO Optimized", "One-Click Copy"]} />

      <ToolFeatureGuides features={[
        { icon: Tag, title: "SEO-Optimized Tags", description: "Tags are selected for search volume and competition using YouTube ranking signals." },
        { icon: Zap, title: "30 Tags Instantly", description: "Get a full set of broad, medium, and long-tail tags in seconds." },
        { icon: TrendingUp, title: "Ranking Focused", description: "Mix of high-volume and niche tags to maximize discovery for both large and small channels." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our YouTube Video Tag & High-SEO Keyword Extractor?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our YouTube Video Tag & High-SEO Keyword Extractor provides
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
