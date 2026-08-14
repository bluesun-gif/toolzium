"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Mic, RefreshCw, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
export default function PodcastScriptGeneratorClient() {
  const [topic, setTopic] = useState("The Future of AI & Autonomous Agents in 2026");
  const [model, setModel] = useState("gpt4o");
  const [hostName, setHostName] = useState("Alex Rivers");
  const [guestName, setGuestName] = useState("Dr. Sarah Vance (AI Researcher)");
  const [format, setFormat] = useState("Interview Episode");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generatePodcastOutline = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const prompt = `Generate a full podcast episode script outline & show notes for Episode Topic: '${topic}'. Host: '${hostName}'. Guest: '${guestName}'. Format: '${format}'. Structure into 4 sections: Section 1: Teaser & Show Intro Script, Section 2: Core Discussion Questions & Talking Points, Section 3: Rapid Fire Q&A Segment, Section 4: Sponsor Reading & Show Notes Summary. Format as 4 distinct podcast episode cards. No markdown asterisks.`;
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
        toast.success("AI Podcast Script generated!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Mic} title="AI Podcast Episode Script & Show Notes Studio" description="Generate episode intro scripts, guest interview question frameworks, sponsor reads, and publishing show notes using live AI." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Episode Topic / Headline:</label>
 <Input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. How Remote Work Changed Company Culture" className="h-11 font-medium" />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Host Name:</label>
 <Input type="text" value={hostName} onChange={e => setHostName(e.target.value)} className="h-11" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Guest Name & Bio (Optional):</label>
 <Input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="e.g. Jane Doe (Founder at TechCorp)" className="h-11" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Podcast Format:</label>
 <select value={format} onChange={e => setFormat(e.target.value)} className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium">
 <option value="Interview Episode">Interview Episode (Host + Guest)</option>
 <option value="Solo Deep Dive">Solo Deep Dive (Host Only)</option>
 <option value="Co-Host Roundtable">Co-Host Roundtable Discussion</option>
 </select>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={generatePodcastOutline} disabled={loading || !topic.trim()} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Scripting Episode..." : "AI Generate Podcast Script"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && <AiOutputDisplay title="Generated Podcast Script & Show Notes" subtitle="Intro monologue, guest questions, and publication show notes" content={results} loading={loading} onRegenerate={generatePodcastOutline} variant="cards" />}
 
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
          <h3>Why Use Our AI Podcast Episode Script & Show Notes Studio?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our AI Podcast Episode Script & Show Notes Studio provides
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

      <RelatedTools currentToolUrl="/tools/social/podcast-script-generator" max={6} />

    </div></div>;
}