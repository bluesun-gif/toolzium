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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/shared/action-buttons";
import { ModelSelector } from "@/components/shared/model-selector";
import toast from "react-hot-toast";
import { Repeat, Sparkles, RefreshCw, FileText, PenTool, Copy, Type } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
type ParaphraseStyle = "Standard" | "Fluency" | "Formal" | "Creative" | "Shorten" | "Expand";
const STYLES: { id: ParaphraseStyle; hint: string }[] = [
  { id: "Standard", hint: "Balanced rewrite, natural phrasing" },
  { id: "Fluency", hint: "Smoothest, most readable version" },
  { id: "Formal", hint: "Professional, polished tone" },
  { id: "Creative", hint: "Vivid, engaging wording" },
  { id: "Shorten", hint: "Condense while keeping meaning" },
  { id: "Expand", hint: "Elaborate with more detail" },
];
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const inputClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";
export default function AiParaphraserClient() {
  const [text, setText] = useState("");
  const [model, setModel] = useState("gpt4o");
  const [style, setStyle] = useState<ParaphraseStyle>("Standard");
  const [creativity, setCreativity] = useState<number[]>([50]);
  const [humanize, setHumanize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paraphrased, setParaphrased] = useState("");
  const handleParaphrase = async () => {
    if (!text.trim()) {
      toast.error("Paste some text first.");
      return;
    }
    setLoading(true);
    try {
      const creativeNote = creativity[0] > 70 ? "Use highly varied vocabulary and sentence structures (synonym richness high)." : creativity[0] < 30 ? "Make minimal word changes, keep structure close to original." : "Balance synonym variety with natural phrasing.";
      const humanNote = humanize ? "Rewrite to sound naturally human-written, avoid robotic or AI-typical phrasing." : "";
      const prompt = `You are a professional rewriting assistant.
Rewrite the following text in a ${style} style while preserving the original meaning.
${creativeNote}
${humanNote}
Return EXACTLY in this format:
PARAPHRASED:
...

Text:
${text}`;
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
        const raw = String(data.raw);
        const startIndex = raw.indexOf("PARAPHRASED:");
        const output = startIndex === -1 ? raw.trim() : raw.slice(startIndex + "PARAPHRASED:".length).replace(/```[a-z]*\n?/gi, "").trim();
        if (!output) {
          throw new Error("Invalid AI output.");
        }
        setParaphrased(output);
        toast.success("Text paraphrased.");
      } else {
        throw new Error("API error.");
      }
    } catch {
      setParaphrased(text);
      toast.error("AI offline. Returned original text.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Repeat} title="AI Paraphraser" description="Rewrite text in Formal, Casual, Academic, or Creative style while keeping the original meaning." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <FileText className="w-4 h-4 text-primary" /> Text to Paraphrase
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Mode</label>
 <select value={style} onChange={e => setStyle(e.target.value as ParaphraseStyle)} className={inputClass}>
 {STYLES.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
 </select>
 <p className="text-[11px] text-muted-foreground/70">{STYLES.find(s => s.id === style)?.hint}</p>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <label className="text-xs font-medium text-muted-foreground">Creativity (synonym strength)</label>
 <span className="text-xs font-bold text-primary">{creativity[0]}%</span>
 </div>
 <Slider value={creativity} onValueChange={setCreativity} max={100} step={1} className="py-2" />
 </div>

 <label className="flex items-center justify-between cursor-pointer">
 <span className="text-xs font-medium text-muted-foreground">AI Humanizer (natural tone)</span>
 <Switch checked={humanize} onCheckedChange={setHumanize} className="data-[state=checked]:bg-primary" />
 </label>

 <textarea value={text} onChange={e => setText(e.target.value)} rows={8} className={inputClass} placeholder="Paste the text you want to rewrite..." />

 <Button onClick={() => void handleParaphrase()} disabled={loading} className="w-full">
 {loading ? <>
 <RefreshCw className="w-4 h-4 animate-spin" /> Rewriting...
 </> : <>
 <Sparkles className="w-4 h-4" /> Paraphrase Text
 </>}
 </Button>
 </CardContent>
 </GlassCard>

 {paraphrased && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <FileText className="w-4 h-4 text-primary" /> Original Text
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{text}</p>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <PenTool className="w-4 h-4 text-primary" /> Paraphrased Text
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{paraphrased}</p>
 <CopyButton getText={() => paraphrased} label="Copy Paraphrased Text" />
 </CardContent>
 </GlassCard>
 </div>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Paste Text",
        description: "Add the sentence, paragraph, or passage you want to rewrite.",
        icon: FileText
      }, {
        step: "02",
        title: "Choose Style",
        description: "Select Formal, Casual, Academic, or Creative rewriting.",
        icon: PenTool
      }, {
        step: "03",
        title: "Copy Output",
        description: "Get the rewritten version and use it where needed.",
        icon: Repeat
      }]} badges={["100% Free", "Multiple Styles", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: Repeat,
        title: "Meaning Preservation",
        description: "Rewrites text while keeping the original message intact."
      }, {
        icon: PenTool,
        title: "Style Control",
        description: "Choose the tone that best fits your use case."
      }, {
        icon: FileText,
        title: "Fast Rewriting",
        description: "Quickly generates an alternative version of your text."
      }, {
        icon: Sparkles,
        title: "Writing Support",
        description: "Useful for improving phrasing and avoiding repetitive wording."
      }]}>
 <h3 className="text-lg font-semibold mb-3">Why paraphrasing helps</h3>
 <p className="mb-3 text-muted-foreground">
 Paraphrasing is useful when you want to express the same idea in a clearer, fresher, or more appropriate way.
 It can help improve readability, adjust tone, and reduce repetition in your writing.
 </p>
 <p className="mb-3 text-muted-foreground">
 Different contexts require different styles. A formal tone works better for business communication, an
 academic tone is better for research-oriented writing, a casual tone works for social content, and a creative
 tone can make marketing copy more engaging.
 </p>
 <p className="text-muted-foreground">
 Always review the paraphrased output before publishing. This is especially important for academic, legal, or
 sensitive professional content where precision matters.
 </p>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Can this pass plagiarism checks?",
        answer: "The tool rewrites text, but you should always verify originality and use paraphrasing responsibly."
      }, {
        question: "Which style is best for essays?",
        answer: "Academic is usually the safest starting point, but you should match your institution's tone."
      }, {
        question: "Can it paraphrase long text?",
        answer: "Yes, though very long passages may work better when broken into smaller sections."
      }]} />
    </div>
    </div>
);
}
