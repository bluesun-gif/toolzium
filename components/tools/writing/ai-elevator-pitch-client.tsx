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
import { Mic, Sparkles, RefreshCw, Timer, Target, MessageSquare } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
interface ElevatorPitchResult {
  pitch30: string;
  pitch60: string;
  pitch90: string;
}
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const inputClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";
export default function AiElevatorPitchClient() {
  const [idea, setIdea] = useState("");
  const [model, setModel] = useState("gpt4o");
  const [market, setMarket] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ElevatorPitchResult | null>(null);
  const handleGenerate = async () => {
    if (!idea.trim()) {
      toast.error("Enter your business idea.");
      return;
    }
    setLoading(true);
    try {
      const prompt = `You are a startup pitch coach.
Business idea: ${idea}
Target market: ${market || "Not provided"}
Unique value: ${value || "Not provided"}

Generate 3 elevator pitches:
1. 30-second pitch
2. 60-second pitch
3. 90-second pitch

Return ONLY the 3 pitches separated by ||| with no labels.`;
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
            pitch30: parts[0],
            pitch60: parts[1],
            pitch90: parts[2]
          });
          toast.success("Elevator pitches generated.");
        } else {
          throw new Error("Invalid AI output.");
        }
      } else {
        throw new Error("API error.");
      }
    } catch {
      setResult({
        pitch30: `${idea} helps ${market || "the right audience"} solve a key problem by ${value || "delivering a faster, simpler solution"}.`,
        pitch60: `${idea} is designed for ${market || "people who need a better solution"}. It addresses a real pain point by ${value || "making the process faster, clearer, and more efficient"}. The result is a practical product that saves time and improves outcomes.`,
        pitch90: `${idea} is built for ${market || "a clear target market"} that needs a more reliable and efficient way to get results. Instead of using slow or outdated methods, users benefit from ${value || "a streamlined approach that improves the core workflow"}.\n\nThe product focuses on simplicity, speed, and real-world usefulness. That makes it easier to adopt, easier to use, and more likely to become part of a daily routine.`
      });
      toast.error("AI offline. Loaded template fallback.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Mic} title="AI Elevator Pitch Generator" description="Generate 30-second, 60-second, and 90-second pitches for your business idea." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <MessageSquare className="w-4 h-4 text-primary" /> Pitch Details
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Business Idea</label>
 <textarea value={idea} onChange={e => setIdea(e.target.value)} rows={3} className={inputClass} placeholder="e.g. A marketplace for local freelance designers" />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Target Market</label>
 <input value={market} onChange={e => setMarket(e.target.value)} className={inputClass} placeholder="e.g. small businesses" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Unique Value</label>
 <input value={value} onChange={e => setValue(e.target.value)} className={inputClass} placeholder="e.g. faster hiring, lower cost" />
 </div>
 </div>

 <Button onClick={() => void handleGenerate()} disabled={loading} className="w-full">
 {loading ? <>
 <RefreshCw className="w-4 h-4 animate-spin" /> Generating...
 </> : <>
 <Sparkles className="w-4 h-4" /> Generate Pitches
 </>}
 </Button>
 </CardContent>
 </GlassCard>

 {result && <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Timer className="w-4 h-4 text-primary" /> 30-Second Pitch
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{result.pitch30}</p>
 <CopyButton getText={() => result.pitch30} label="Copy 30s" />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Target className="w-4 h-4 text-primary" /> 60-Second Pitch
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{result.pitch60}</p>
 <CopyButton getText={() => result.pitch60} label="Copy 60s" />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Mic className="w-4 h-4 text-primary" /> 90-Second Pitch
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{result.pitch90}</p>
 <CopyButton getText={() => result.pitch90} label="Copy 90s" />
 </CardContent>
 </GlassCard>
 </div>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Describe the Idea",
        description: "Enter the business concept, target market, and unique value.",
        icon: MessageSquare
      }, {
        step: "02",
        title: "Generate Pitches",
        description: "The AI creates three pitch lengths for different situations.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Practice and Use",
        description: "Copy the pitch for networking, investor meetings, or landing pages.",
        icon: Mic
      }]} badges={["100% Free", "Startup Ready", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: Mic,
        title: "Multiple Lengths",
        description: "Creates 30, 60, and 90-second versions for different contexts."
      }, {
        icon: Target,
        title: "Market-Focused",
        description: "Uses your target audience to make the pitch more specific."
      }, {
        icon: MessageSquare,
        title: "Clear Value",
        description: "Highlights the unique benefit behind the idea."
      }, {
        icon: Timer,
        title: "Fast Preparation",
        description: "Helps you prepare quickly before meetings or events."
      }]}>
 <h3 className="text-lg font-semibold mb-3">Why elevator pitches still matter</h3>
 <p className="mb-3 text-muted-foreground">
 A good elevator pitch helps you explain your idea quickly and clearly before attention is lost. Whether you are
 talking to investors, partners, customers, or collaborators, the first few sentences often decide whether the
 conversation continues.
 </p>
 <p className="mb-3 text-muted-foreground">
 Different situations require different pitch lengths. A 30-second version is ideal for quick introductions, a
 60-second version works well for networking, and a 90-second version gives you room to explain the problem,
 solution, and advantage more completely.
 </p>
 <p className="text-muted-foreground">
 Use this generator to create a strong first draft, then practice it out loud. The best pitches sound natural,
 specific, and confident rather than overly polished or generic.
 </p>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Can I use this for investor pitches?",
        answer: "Yes. It is useful for early-stage pitch drafting, though you should refine it with real metrics and proof."
      }, {
        question: "Should the pitch include numbers?",
        answer: "If you have strong metrics, yes. Numbers can make the pitch more credible and memorable."
      }, {
        question: "Can I generate pitches for non-business ideas?",
        answer: "Yes. It can also work for projects, communities, apps, and personal positioning."
      }]} />

 <RelatedTools currentToolUrl="/tools/writing/ai-elevator-pitch" max={6} />
 </div></div>;
}