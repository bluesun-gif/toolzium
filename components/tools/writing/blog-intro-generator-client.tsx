"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/action-buttons";
import { ModelSelector } from "@/components/shared/model-selector";
import toast from "react-hot-toast";
import { Newspaper, Sparkles, RefreshCw, HelpCircle, BarChart3, BookOpen } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
interface BlogIntroResult {
  question: string;
  statistic: string;
  story: string;
}
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const inputClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";
export default function BlogIntroGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [model, setModel] = useState("gpt4o");
  const [audience, setAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BlogIntroResult | null>(null);
  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Enter a blog topic.");
      return;
    }
    setLoading(true);
    try {
      const prompt = `You are a professional content writer.
Blog topic: ${topic}
Target audience: ${audience || "general readers"}

Generate 3 blog intro paragraphs:
1. Question hook
2. Statistic hook
3. Story hook

Return ONLY the 3 intros separated by ||| with no labels.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt
        })
      });
      const data = await res.json();
      if (data.success && data.raw) {
        const parts = String(data.raw).replace(/```[a-z]*\n?/gi, "").split("|||").map((item: string) => item.trim()).filter(Boolean);
        if (parts.length >= 3) {
          setResult({
            question: parts[0],
            statistic: parts[1],
            story: parts[2]
          });
          toast.success("Blog intros generated.");
        } else {
          throw new Error("Invalid AI output.");
        }
      } else {
        throw new Error("API error.");
      }
    } catch {
      setResult({
        question: `Have you ever wondered how ${topic} can actually work in real life? Many people are curious about it, but few get clear, practical answers. In this post, we break it down step by step.`,
        statistic: `Recent interest in ${topic} continues to grow, and for good reason. More people are looking for better ways to understand and use it effectively. This guide explains what matters most.`,
        story: `When I first started learning about ${topic}, I made almost every mistake possible. But those mistakes taught me valuable lessons that can save you time and effort. Here is what I wish I had known earlier.`
      });
      toast.error("AI offline. Loaded template fallback.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Newspaper} title="Blog Intro Generator" description="Generate 3 blog introductions with question, statistic, and story hooks." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <BookOpen className="w-4 h-4 text-primary" /> Blog Details
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Blog Topic</label>
 <input value={topic} onChange={e => setTopic(e.target.value)} className={inputClass} placeholder="e.g. remote work productivity" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Target Audience</label>
 <input value={audience} onChange={e => setAudience(e.target.value)} className={inputClass} placeholder="e.g. startup founders" />
 </div>
 </div>

 <Button onClick={() => void handleGenerate()} disabled={loading} className="w-full">
 {loading ? <>
 <RefreshCw className="w-4 h-4 animate-spin" /> Generating...
 </> : <>
 <Sparkles className="w-4 h-4" /> Generate Intros
 </>}
 </Button>
 </CardContent>
 </GlassCard>

 {result && <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <HelpCircle className="w-4 h-4 text-primary" /> Question Hook
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{result.question}</p>
 <CopyButton getText={() => result.question} label="Copy Question Intro" />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <BarChart3 className="w-4 h-4 text-primary" /> Statistic Hook
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{result.statistic}</p>
 <CopyButton getText={() => result.statistic} label="Copy Statistic Intro" />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Newspaper className="w-4 h-4 text-primary" /> Story Hook
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{result.story}</p>
 <CopyButton getText={() => result.story} label="Copy Story Intro" />
 </CardContent>
 </GlassCard>
 </div>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Topic",
        description: "Add your blog topic and the audience you are writing for.",
        icon: BookOpen
      }, {
        step: "02",
        title: "Generate Hooks",
        description: "The AI creates three intro styles using different hook strategies.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Choose and Edit",
        description: "Pick the strongest intro and refine it to match your voice.",
        icon: Newspaper
      }]} badges={["100% Free", "3 Hook Types", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: HelpCircle,
        title: "Question Hook",
        description: "Starts with a question that draws the reader in immediately."
      }, {
        icon: BarChart3,
        title: "Statistic Hook",
        description: "Uses data-style framing to create interest and authority."
      }, {
        icon: Newspaper,
        title: "Story Hook",
        description: "Opens with a narrative angle that feels personal and relatable."
      }, {
        icon: BookOpen,
        title: "Audience Targeting",
        description: "Adapts the intro based on the readers you want to attract."
      }]}>
 <h3 className="text-lg font-semibold mb-3">Why blog intros matter</h3>
 <p className="mb-3 text-muted-foreground">
 The first paragraph of a blog post often decides whether readers stay or leave. A strong intro creates
 curiosity, sets expectations, and makes the reader feel the article is worth their time.
 </p>
 <p className="mb-3 text-muted-foreground">
 Different hooks work for different topics. Question hooks invite participation, statistic hooks build
 credibility, and story hooks create emotional connection. Testing multiple intros can help you find the most
 engaging opening.
 </p>
 <p className="text-muted-foreground">
 Use the generated intros as starting points. Add your own examples, proof, and voice to make the opening more
 authentic and more aligned with your brand.
 </p>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Can I use these intros for SEO articles?",
        answer: "Yes. Just make sure the final intro matches the search intent and includes the main keyword naturally."
      }, {
        question: "Which hook type works best?",
        answer: "It depends on the topic. Question hooks work well for guides, statistics for data-driven posts, and stories for personal or persuasive content."
      }, {
        question: "Should I edit the output?",
        answer: "Yes. Always adjust the intro to match your tone, facts, and article structure."
      }]} />

 <RelatedTools currentToolUrl="/tools/writing/blog-intro-generator" max={6} />
 </div></div>;
}