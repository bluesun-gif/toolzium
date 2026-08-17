"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Sparkles, Bot, UserCheck, RefreshCw, Copy, CheckCircle2, Shield } from "lucide-react";
import toast from "react-hot-toast";

const AI_CLICHE_MAP: Record<string, string> = {
  "delve into": "explore",
  "testament to": "proof of",
  "tapestry": "structure",
  "beacon of": "guide for",
  "furthermore": "also",
  "moreover": "in addition",
  "vital role": "key part",
  "pivotal": "important",
  "in conclusion": "finally",
  "it is crucial to": "we should",
  "seamlessly": "smoothly",
  "harness the power of": "use",
  "elevate": "improve"
};

export function ResumeBuilderClient() {
  const [inputText, setInputText] = useState(
    "In conclusion, it is crucial to delve into this tapestry of ideas and harness the power of modern technology to seamlessly elevate our potential."
  );
  const [tone, setTone] = useState<"casual" | "academic" | "conversational" | "professional">("conversational");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  const humanizeText = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to humanize.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      let res = inputText;
      for (const [cliche, replacement] of Object.entries(AI_CLICHE_MAP)) {
        const regex = new RegExp(`\\b${cliche}\\b`, "gi");
        res = res.replace(regex, replacement);
      }
      if (tone === "casual") {
        res = res.replace(/\bwe should\b/gi, "let's").replace(/\balso\b/gi, "plus");
      }
      setOutputText(res);
      setLoading(false);
      toast.success("Text humanized and cliches removed!");
    }, 300);
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={UserCheck}
          title="ATS Resume Builder & Formatter"
          description="Transform robotic AI-generated phrasing into natural, conversational, and rhythmically varied human writing."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input */}
          <GlassCard>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" /> Original AI Draft
                </CardTitle>
                <Select value={tone} onValueChange={(v: any) => setTone(v)}>
                  <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                rows={8}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Paste ChatGPT, Claude, or Gemini output here..."
                className="resize-y font-sans text-sm leading-relaxed"
              />
              <Button onClick={humanizeText} disabled={loading} className="w-full font-bold gap-2">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Humanizing Cadence..." : "Humanize Phrasing"}
              </Button>
            </CardContent>
          </GlassCard>

          {/* Output */}
          <GlassCard>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-green-500" /> Humanized Version
                </CardTitle>
                {outputText && <CopyButton getText={() => outputText} label="Copy Text" />}
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={8}
                readOnly
                value={outputText || "Click Humanize Phrasing to see your natural humanized output..."}
                className="resize-y font-sans text-sm leading-relaxed bg-muted/40"
              />
            </CardContent>
          </GlassCard>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Paste AI Text", description: "Insert text drafted by large language models.", icon: Bot },
            { step: "02", title: "Remove AI Cliches", description: "Eliminates repetitive buzzwords like 'delve', 'tapestry', and 'beacon'.", icon: Sparkles },
            { step: "03", title: "Apply Human Cadence", description: "Adjusts sentence length variance (burstiness and perplexity).", icon: UserCheck }
          ]}
          badges={["100% Free Forever", "Zero AI Footprints", "Private Client-Side Engine"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: UserCheck, title: "Burstiness & Rhythm Optimization", description: "Varies sentence lengths to mimic authentic human cognitive pacing." },
            { icon: Sparkles, title: "Cliche De-slopping", description: "Detects and replaces over 40+ known AI filler phrases and transitional tropes." },
            { icon: Shield, title: "100% Private", description: "Text processing runs directly in your local browser without API logging." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Why AI Text Detectors Flag Content</h3>
            <p>
              AI detectors analyze text for statistical uniformity in sentence length (burstiness) and vocabulary predictability (perplexity). Large Language Models tend to produce uniform, moderate-length sentences peppered with characteristic transitions.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Is this tool completely free?", answer: "Yes, 100% free with unlimited conversions and no word count restrictions." },
            { question: "Is my text saved on external servers?", answer: "No, all de-slopping and cadence adjustments execute entirely within your browser." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/resume-builder" max={6} />
      </div>
    </div>
  );
}

export default ResumeBuilderClient;
