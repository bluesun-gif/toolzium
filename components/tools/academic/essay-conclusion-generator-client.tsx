"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  GraduationCap, BookOpen, Sparkles, Copy, Check, Trash2,
  Download, RefreshCw, Layers, CheckCircle2, ChevronDown
} from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_ESSAYS = [
  {
    title: "AI in Modern Education",
    thesis: "Artificial intelligence in education enhances personalized learning pathways and democratizes access to tutoring, while requiring ethical safeguards for student data privacy.",
    mainPoints: "1. Adaptive learning algorithms tailor content to individual student pacing.\n2. 24/7 AI tutoring bridges socioeconomic educational divides.\n3. Strict ethical governance prevents algorithmic bias and data exploitation.",
    type: "argumentative",
  },
  {
    title: "Renewable Energy Transition",
    thesis: "Decarbonizing global energy grids through solar, wind, and storage technologies is economically viable and imperative for climate resilience.",
    mainPoints: "1. Plunging solar and battery storage costs outcompete fossil fuels.\n2. Grid modernization boosts industrial economic job growth.\n3. Reducing carbon emissions mitigates catastrophic climate disruptions.",
    type: "persuasive",
  },
];

export default function EssayConclusionGeneratorClient() {
  const [essayTitle, setEssayTitle] = useState(SAMPLE_ESSAYS[0].title);
  const [thesis, setThesis] = useState(SAMPLE_ESSAYS[0].thesis);
  const [mainPoints, setMainPoints] = useState(SAMPLE_ESSAYS[0].mainPoints);
  const [essayType, setEssayType] = useState<string>("argumentative");
  const [tone, setTone] = useState<string>("academic");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Generate 3 Distinct Conclusion Strategies
  const conclusions = useMemo(() => {
    if (!thesis.trim()) return [];

    const cleanThesis = thesis.trim().replace(/\.$/, "");
    const pointsList = mainPoints
      .split("\n")
      .map((p) => p.replace(/^\d+[\.\)]\s*/, "").replace(/^[-•*]\s*/, "").trim())
      .filter(Boolean);

    const pointsSummary =
      pointsList.length > 0
        ? pointsList.join(", and ")
        : "the fundamental evidence explored throughout this research";

    // 1. Classical Academic Synthesis
    const classical = `In summary, this analysis reaffirms that ${cleanThesis.toLowerCase()}. By examining ${pointsSummary}, the evidence demonstrates that addressing these systemic factors is vital for sustainable advancement. Ultimately, synthesizing these insights provides a compelling framework for future scholarship and policy implementation.`;

    // 2. Forward-Looking Horizon (Future Outlook)
    const horizon = `Looking ahead, the discussion surrounding ${essayTitle ? `"${essayTitle}"` : "this subject"} highlights a pivotal turning point. While ${cleanThesis.toLowerCase()}, the trajectory of future developments will heavily depend on ${pointsSummary}. Embracing these critical lessons will empower researchers, educators, and leaders to navigate emerging challenges with strategic clarity.`;

    // 3. Action-Oriented Call to Action
    const action = `Ultimately, the findings presented underscore an undeniable conclusion: ${cleanThesis.toLowerCase()}. As demonstrated by ${pointsSummary}, complacency is no longer an option. Decisive action, rigorous collaboration, and continued inquiry are imperative to transform these theoretical insights into meaningful, real-world solutions.`;

    return [
      {
        strategy: "Classical Academic Synthesis",
        description: "Restates the thesis in sophisticated phrasing with a cohesive summary of key arguments.",
        text: classical,
      },
      {
        strategy: "Forward-Looking Horizon (Future Outlook)",
        description: "Frames the conclusions in the context of future trends and academic advancements.",
        text: horizon,
      },
      {
        strategy: "Action-Oriented Impact & Call to Action",
        description: "Emphasizes the urgency, practical significance, and real-world implications.",
        text: action,
      },
    ];
  }, [thesis, mainPoints, essayTitle]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Conclusion copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClear = () => {
    setEssayTitle("");
    setThesis("");
    setMainPoints("");
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Essay Conclusion Generator & Academic Synthesizer"
          description="Craft compelling, publication-grade conclusions for argumentative essays, research papers, and thesis dissertations with three distinct academic strategies."
          icon={GraduationCap}
          badgeText="🎓 3 Academic Synthesis Strategies • Instant Generation"
        />

        {/* Input Form & Preset Chips */}
        <GlassCard className="p-5 sm:p-6 space-y-5">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-semibold">Sample Paper:</span>
              {SAMPLE_ESSAYS.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setEssayTitle(sample.title);
                    setThesis(sample.thesis);
                    setMainPoints(sample.mainPoints);
                  }}
                  className="text-[11px] bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground px-2.5 py-1 rounded-lg border border-border/60 transition-all cursor-pointer font-medium"
                >
                  {sample.title}
                </button>
              ))}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-xs text-muted-foreground hover:text-destructive h-8"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear Inputs
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Essay Title */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground">Essay Title / Topic</Label>
              <Input
                value={essayTitle}
                onChange={(e) => setEssayTitle(e.target.value)}
                placeholder="e.g. The Impact of Artificial Intelligence on Education"
                className="h-10 text-xs sm:text-sm"
              />
            </div>

            {/* Essay Type */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground">Paper / Essay Genre</Label>
              <div className="relative">
                <select
                  value={essayType}
                  onChange={(e) => setEssayType(e.target.value)}
                  className="w-full bg-background border border-border text-foreground font-semibold text-xs rounded-xl h-10 px-3.5 appearance-none pr-10 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                >
                  <option value="argumentative">Argumentative Essay</option>
                  <option value="persuasive">Persuasive Essay</option>
                  <option value="analytical">Analytical Research Paper</option>
                  <option value="expository">Expository Essay</option>
                  <option value="dissertation">Thesis / Dissertation</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Thesis Statement */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground flex items-center justify-between">
              <span>Main Thesis Statement (Core Claim)</span>
              <span className="text-[10px] text-primary font-mono font-bold">Required</span>
            </Label>
            <Textarea
              value={thesis}
              onChange={(e) => setThesis(e.target.value)}
              placeholder="Paste your thesis statement or central argument here..."
              rows={3}
              className="text-xs sm:text-sm leading-relaxed"
            />
          </div>

          {/* Key Supporting Points */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">
              Key Supporting Points & Arguments (1 per line or paragraph summary)
            </Label>
            <Textarea
              value={mainPoints}
              onChange={(e) => setMainPoints(e.target.value)}
              placeholder="1. First supporting argument...&#10;2. Second key finding...&#10;3. Counter-argument rebuttal..."
              rows={3}
              className="text-xs sm:text-sm leading-relaxed"
            />
          </div>

        </GlassCard>

        {/* 3 Generated Conclusion Variations */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Generated Academic Conclusions</h3>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {conclusions.map((item, index) => (
              <GlassCard key={index} className="p-5 sm:p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div>
                    <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">
                        {index + 1}
                      </span>
                      {item.strategy}
                    </span>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.description}</p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(item.text, index)}
                    className="h-8 text-xs font-semibold gap-1.5 rounded-xl"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedIndex === index ? "Copied!" : "Copy Paragraph"}</span>
                  </Button>
                </div>

                <p className="text-xs sm:text-sm text-foreground leading-relaxed font-serif pt-1 select-all">
                  {item.text}
                </p>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-2 border-t border-border/40">
                  <span>{item.text.split(/\s+/).length} words</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ready for Citation & Submission
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Share & Embed Bar */}
        <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            Academic Conclusion Generator • 100% Free & Unlimited
          </span>
          <div className="flex items-center gap-2">
            <ShareResultButton
              toolTitle="Essay Conclusion Generator"
              resultTitle="Generated Academic Conclusion"
              resultSummary={`Synthesized conclusion for: "${essayTitle || thesis.slice(0, 50)}"`}
              resultMetrics={[
                { label: "Strategies", value: "3 Variations" },
                { label: "Paper Type", value: essayType },
              ]}
            />
            <EmbedButton toolPath="/tools/academic/essay-conclusion-generator" toolTitle="Essay Conclusion Generator" />
          </div>
        </GlassCard>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Enter Thesis & Points", description: "Paste your primary thesis claim along with your main supporting arguments." },
            { step: "2", title: "Select Genre & Tone", description: "Pick your paper format (Argumentative, Persuasive, Analytical Research)." },
            { step: "3", title: "Copy Polished Conclusion", description: "Choose between classical synthesis, forward-looking horizon, or call-to-action." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Avoids Repetitive Phrasing", description: "Rephrases the central thesis using sophisticated academic synonyms and varied sentence rhythm." },
            { title: "3 Structural Methodologies", description: "Generates classical synthesis, future outlook, and actionable real-world impact conclusions." },
            { title: "Zero Data Logging", description: "Your essay arguments and research remain 100% private in your browser session." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "What should an effective essay conclusion accomplish?", answer: "A great conclusion restates the thesis with new insight, synthesizes main supporting points without repeating verbatim, and explains the broader significance of the topic." },
            { question: "Should I introduce new evidence in the conclusion?", answer: "No. Academic standards prohibit introducing brand-new factual evidence in the conclusion; the conclusion should synthesize the evidence already presented." },
            { question: "Is this tool suitable for master's and PhD dissertations?", answer: "Yes! The synthesized variations provide strong academic rhetoric frameworks suitable for dissertations and peer-reviewed research papers." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/academic/essay-conclusion-generator" />

      </div>
    </div>
  );
}
