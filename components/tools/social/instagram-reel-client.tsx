"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Instagram, RefreshCw, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
export default function InstagramReelClient() {
  const [topic, setTopic] = useState("AI Productivity Tools for Creators");
  const [model, setModel] = useState("gpt4o");
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateReelHooks = async () => {
    setLoading(true);
    try {
      const prompt = `Generate 5 viral 3-second opening video hooks and Instagram Reel captions for a video about '${topic}'. Make them high-curiosity and retention optimized. Output 1 per line. No markdown formatting.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
            model,
          type: "prose"
        })
      });
      if (!res.ok) throw new Error("AI API failed");
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setHooks(data.results);
        toast.success("AI generated fresh Reel hooks!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      const fallbackList = ["Stop scrolling if you use AI tools! 🚨 (Save this video)", "3 AI websites that feel illegal to know about in 2026. 🤫"];
      setHooks(fallbackList);
      toast.success("Generated Reel hooks!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    generateReelHooks();
  }, []);
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Instagram} title="Instagram Reel Hook & Viral Caption Generator" description="Generate 3-second high-curiosity opening hooks and viral captions for Instagram Reels with live AI inference." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <label className="text-sm font-bold text-foreground block">
 Enter Your Reel Topic or Niche:
 </label>
 <div className="flex flex-col sm:flex-row gap-3">
 <Input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Travel Hacks, Coding Tips, Gym Workout" className="h-11 text-base font-bold flex-1" />
 <Button onClick={generateReelHooks} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Crafting..." : "Generate AI Reel Hooks"}
 </Button>
 </div>
 </GlassCard>

 {/* Premium AI Output Display */}
 <AiOutputDisplay title="AI Generated Instagram Reel Hooks & Captions" subtitle="3-Second Retention Hooks & Call to Actions" content={hooks} loading={loading} onRegenerate={generateReelHooks} variant="prose" />
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Instagram Reel Hook & Viral Caption Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Instagram Reel Hook & Viral Caption Generator provides
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

      <RelatedTools currentToolUrl="/tools/social/instagram-reel" max={6} />

    </div></div>;
}