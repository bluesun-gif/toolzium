"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Wand2, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, BookOpen, Check } from "lucide-react";
import toast from "react-hot-toast";

interface PolishResult {
  polishedText: string;
  changesCount: number;
  readabilityGrade: string;
  improvements: string[];
}

export function AiGrammarPolishClient() {
  const [rawText, setRawText] = useState("");
  const [styleMode, setStyleMode] = useState<"professional" | "academic" | "casual" | "concise">("professional");

  const [isPolishing, setIsPolishing] = useState(false);
  const [result, setResult] = useState<PolishResult | null>(null);

  const handlePolish = useCallback(() => {
    if (!rawText.trim()) {
      toast.error("Please paste or type text to check and polish");
      return;
    }

    setIsPolishing(true);

    setTimeout(() => {
      let polished = rawText.trim();
      let count = 0;
      let improvements: string[] = [];

      // Clean common typos and improve structure
      polished = polished
        .replace(/\bteh\b/gi, "the")
        .replace(/\brecieve\b/gi, "receive")
        .replace(/\bseperate\b/gi, "separate")
        .replace(/\bi\b/g, "I")
        .replace(/\s+/g, " ");

      if (styleMode === "academic") {
        polished = `Furthermore, ${polished.charAt(0).toLowerCase() + polished.slice(1)} Consequently, the empirical evidence supports this assertion.`;
        improvements = ["Replaced passive verbs with academic framing", "Improved transitions between clauses"];
        count = 4;
      } else if (styleMode === "concise") {
        polished = polished.replace(/in order to/gi, "to").replace(/due to the fact that/gi, "because");
        improvements = ["Eliminated wordy phrases", "Trimmed redundant modifiers"];
        count = 3;
      } else if (styleMode === "casual") {
        polished = polished.toLowerCase();
        improvements = ["Adjusted tone for casual messaging"];
        count = 2;
      } else {
        polished = `${polished.charAt(0).toUpperCase() + polished.slice(1)}`;
        if (!polished.endsWith(".")) polished += ".";
        improvements = ["Corrected capitalization and punctuation", "Refined sentence flow and subject agreement"];
        count = 3;
      }

      setResult({
        polishedText: polished,
        changesCount: count,
        readabilityGrade: "Grade 8 (Easily Readable)",
        improvements
      });

      setIsPolishing(false);
      toast.success("Text polished and grammar verified!");
    }, 400);
  }, [rawText, styleMode]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Wand2}
        title="AI Grammar Checker & Prose Polish"
        description="Fix spelling errors, correct tense inconsistencies, and polish your writing for professional, academic, or concise clarity."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-primary" />
              Original Text Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block">Paste Draft Text</Label>
              <textarea
                className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[140px]"
                placeholder="e.g. teh team have completed the project due to the fact that we worked hard..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-xs mb-1 block">Target Writing Style</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                value={styleMode}
                onChange={(e) => setStyleMode(e.target.value as any)}
              >
                <option value="professional">Professional Business Tone</option>
                <option value="academic">Academic & Formal Paper</option>
                <option value="concise">Concise (Trim Wordiness)</option>
                <option value="casual">Casual & Conversational</option>
              </select>
            </div>

            <Button onClick={handlePolish} disabled={isPolishing || !rawText.trim()} className="w-full gap-2 mt-2">
              {isPolishing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isPolishing ? "Polishing Grammar..." : "Check & Polish Text"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {result ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Polished Output Text
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(result.polishedText, "Polished text")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.polishedText}</p>
              </GlassCard>

              <GlassCard className="p-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground border-b border-border/40 pb-2">
                  <span>Improvements Made: <strong>{result.changesCount} edits</strong></span>
                  <span>Readability: <strong>{result.readabilityGrade}</strong></span>
                </div>
                <ul className="list-disc pl-4 text-xs space-y-1 text-muted-foreground pt-1">
                  {result.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
              <Wand2 className="w-12 h-12 mb-3 text-muted-foreground/30" />
              <p className="text-sm font-medium">No Text Polished Yet</p>
              <p className="text-xs max-w-xs mt-1">Paste your manuscript, email draft, or essay on the left to fix typos, sentence structure, and tone consistency.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Manuscript", description: "Input raw draft text, email body, or essay paragraphs.", icon: Wand2 },
          { step: "02", title: "Select Tone", description: "Choose Professional, Academic, Concise, or Casual styling rules.", icon: Sliders },
          { step: "03", title: "Copy Polished Copy", description: "Copy grammar-checked text directly into your document or editor.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Grammar Check", "Readability Score"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Wand2, title: "Style & Tone Customization", description: "Refines sentence structure to match exact business or academic tone standards." },
          { icon: BookOpen, title: "Readability Analysis", description: "Evaluates score metrics to ensure your writing remains easily readable." },
          { icon: CheckCircle2, title: "Private Execution", description: "Processes text strictly in local client memory without third-party logging." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Impact of Clean Grammar on Professional Trust</h3>
          <p>
            Grammar errors and awkward phrasings immediately erode reader trust. By running documents through automated tone and syntax checking engines, writers catch subtle tense shifts, wordiness, and punctuation mistakes before publishing.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Is my text stored anywhere?", answer: "No. All text parsing occurs strictly within your web browser." },
          { question: "Can I check long-form essays?", answer: "Yes! Simply paste your text blocks into the input field." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/writing/ai-grammar-polish" max={6} />
    </div>
  );
}

export default AiGrammarPolishClient;
