"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, GraduationCap, Loader2, Copy, RefreshCw, Edit3, BarChart2, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

export function EssayConclusionGeneratorClient() {
  const [inputMode, setInputMode] = useState<"points" | "essay">("points");
  const [thesis, setThesis] = useState("");
  const [model, setModel] = useState("gpt4o");
  const [points, setPoints] = useState("");
  const [essay, setEssay] = useState("");
  const [essayType, setEssayType] = useState("Argumentative");
  const [tone, setTone] = useState("Academic");
  const [style, setStyle] = useState("standard");
  const [wordCount, setWordCount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<string[]>([]);

  const generateConclusions = async () => {
    const hasThesis = thesis.trim();
    const hasContent = inputMode === "essay" ? essay.trim() : points.trim();
    if (!hasThesis || !hasContent) {
      toast.error(inputMode === "essay" ? "Please paste your essay and a thesis" : "Please provide a thesis and key points");
      return;
    }
    setLoading(true);
    setVariations([]);

    const sourceContext =
      inputMode === "essay"
        ? `Full essay draft:\n${essay.trim()}\n\nDerive the key arguments and thesis from the draft above unless overridden by the thesis field.`
        : `Key arguments (bullet summary):\n${points.trim()}`;

    const styleInstruction =
      style === "standard"
        ? "Restate the thesis in fresh words, synthesize the key arguments, and end with a forward-looking closing thought."
        : style === "anecdote"
        ? "Open with a vivid image or brief anecdote, then tie it back to the thesis and synthesize the argument."
        : style === "cta"
        ? "End with a powerful, specific call to action the reader should take."
        : "End with a thought-provoking question that leaves the reader reflecting.";

    const prompt = `You are an expert academic and professional writer. Write 3 distinct, high-quality conclusions.

Thesis: ${thesis.trim()}
${sourceContext}
Essay type: ${essayType}
Tone: ${tone}
Style: ${styleInstruction}
Target length per conclusion: approximately ${wordCount} words.

Requirements for every conclusion:
1. Restate the thesis in NEW words — never repeat the original phrasing.
2. Synthesize the key arguments (show how they connect; do not just list them).
3. Provide a final "So what?" — broader significance, implication, or call to action.
4. Use a ${tone.toLowerCase()} tone and the requested style.
5. Never introduce new facts, sources, or statistics not present in the source.

Return STRICTLY a JSON array of 3 strings: ["Conclusion 1","Conclusion 2","Conclusion 3"]. No markdown, no commentary outside the array.`;

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model, type: "list" }),
      });
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setVariations(data.results);
      } else if (data.raw) {
        try {
          const cleanText = data.raw.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(cleanText);
          if (Array.isArray(parsed)) setVariations(parsed);
          else setVariations([data.raw]);
        } catch {
          setVariations([data.raw]);
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate conclusions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Deterministic quality report (restatement + argument coverage + impact signal)
  const analyzeStrength = (text: string) => {
    let score = 0;
    const lower = text.toLowerCase();
    const thesisWords = (thesis.toLowerCase().match(/[a-z]{4,}/g) || []).filter((w) => !["that","this","with","from","have","will","your","their","about","because","which","would","there","these","those","should"].includes(w));
    if (thesisWords.length) {
      const hits = thesisWords.filter((w) => lower.includes(w)).length;
      score += Math.min(35, Math.round((hits / Math.min(thesisWords.length, 8)) * 35));
    }
    if (text.length > wordCount * 3.5) score += 15;
    const impact = ["therefore", "ultimately", "in conclusion", "thus", "consequently", "so what", "why this matters", "moving forward", "call to action", "imagine", "consider"];
    if (impact.some((w) => lower.includes(w))) score += 20;
    const argList = (inputMode === "essay" ? essay : points).toLowerCase().split(/[,\n•\-\*]/).map((p) => p.trim()).filter((p) => p.length > 3);
    let matched = 0;
    argList.forEach((p) => { const key = p.split(/\s+/).slice(0, 3).join(" "); if (key && lower.includes(key)) matched++; });
    score += Math.round((matched / Math.max(argList.length, 1)) * 30);
    return Math.min(100, Math.round(score));
  };

  return (
    <div className="relative max-w-6xl mx-auto space-y-8 p-4">
      <ToolBackground />
      <div className="relative z-10">
        <ToolPageHeader icon={GraduationCap} title="AI Essay Conclusion Generator" description="Craft powerful, memorable endings. Paste your full essay or key points — the AI restates your thesis, synthesizes your arguments, and lands the 'so what' in your chosen tone." />

        <div className="mb-4">
          <ModelSelector value={model} onChange={setModel} />
        </div>

        <GlassCard>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Edit3 className="w-4 h-4 text-primary" /> Essay Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="flex gap-2">
              <Button variant={inputMode === "points" ? "default" : "outline"} size="sm" onClick={() => setInputMode("points")}>Key Points</Button>
              <Button variant={inputMode === "essay" ? "default" : "outline"} size="sm" onClick={() => setInputMode("essay")}><FileText className="w-3.5 h-3.5 mr-1" />Full Essay</Button>
            </div>

            <div className="space-y-2">
              <Label>Thesis Statement</Label>
              <Input value={thesis} onChange={(e) => setThesis(e.target.value)} placeholder="e.g., Remote work significantly improves employee retention in the tech sector." />
            </div>

            {inputMode === "points" ? (
              <div className="space-y-2">
                <Label>Key Arguments (Summarize your main points)</Label>
                <textarea className={`${textareaClass} min-h-[120px]`} value={points} onChange={(e) => setPoints(e.target.value)} placeholder={`- Increased autonomy leads to higher job satisfaction.\n- Reduced commute times lower burnout rates.\n- Flexible hours allow for better work-life balance.`} />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Paste Full Essay Draft</Label>
                <textarea className={`${textareaClass} min-h-[180px]`} value={essay} onChange={(e) => setEssay(e.target.value)} placeholder="Paste your full essay or article. We'll derive the arguments and craft a conclusion that fits." />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Essay Type</Label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={essayType} onChange={(e) => setEssayType(e.target.value)}>
                  <option>Argumentative</option>
                  <option>Expository</option>
                  <option>Narrative</option>
                  <option>Persuasive</option>
                  <option>Analytical</option>
                  <option>Business</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Tone</Label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={tone} onChange={(e) => setTone(e.target.value)}>
                  <option>Academic</option>
                  <option>Persuasive</option>
                  <option>Reflective</option>
                  <option>Formal</option>
                  <option>Conversational</option>
                  <option>Inspirational</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Closing Style</Label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={style} onChange={(e) => setStyle(e.target.value)}>
                  <option value="standard">Standard (summarize + close)</option>
                  <option value="anecdote">Anecdote / Hook</option>
                  <option value="cta">Call to Action</option>
                  <option value="question">Provocative Question</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Target Length: {wordCount} words</Label>
              <input type="range" min="50" max="200" step="10" value={wordCount} onChange={(e) => setWordCount(parseInt(e.target.value))} className="w-full accent-primary mt-1" />
            </div>

            <Button onClick={generateConclusions} disabled={loading} className="w-full gap-2 text-base py-6" size="lg">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</> : <><Sparkles className="w-5 h-5" /> Generate Conclusions</>}
            </Button>
          </CardContent>
        </GlassCard>

        {variations.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {variations.map((text, idx) => {
              const score = analyzeStrength(text);
              return (
                <Card key={idx} className={cardClass}>
                  <CardHeader className={headerClass}>
                    <div className="flex justify-between items-center w-full">
                      <CardTitle className={titleClass}>Option {idx + 1}</CardTitle>
                      <div className="flex items-center gap-1 text-xs font-bold">
                        <BarChart2 className="w-3 h-3" />
                        <span className={score > 70 ? "text-green-500" : score > 40 ? "text-amber-500" : "text-red-500"}>{score}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    <div
                      className="p-4 bg-muted/30 rounded-lg border border-border/50 text-sm leading-relaxed min-h-[150px] outline-none focus:ring-2 focus:ring-primary"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newText = e.currentTarget.innerText;
                        setVariations((prev) => {
                          const next = [...prev];
                          next[idx] = newText;
                          return next;
                        });
                      }}
                    >
                      {text}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied!"); }}>
                        <Copy className="w-4 h-4" /> Copy
                      </Button>
                      <Button variant="ghost" size="sm" onClick={generateConclusions} disabled={loading}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <ToolHowItWorks steps={[
          { step: "01", title: "Input Core Elements", description: "Paste your full essay or thesis + key points. The AI stays anchored to your real argument.", icon: Edit3 },
          { step: "02", title: "Select Style", description: "Pick the essay type, tone, and closing style to match your assignment or publication.", icon: Sparkles },
          { step: "03", title: "Review & Refine", description: "Get 3 unique variations with a quality score. Edit them directly before copying.", icon: BarChart2 },
        ]} badges={["AI-Powered", "3 Variations", "Full-Essay Aware"]} />

        <ToolFeatureGuides features={[
          { icon: Sparkles, title: "Thesis-Aware Synthesis", description: "The AI restates your actual argument and weaves your points together instead of just listing them." },
          { icon: BarChart2, title: "Quality Score", description: "A deterministic report checks thesis restatement, argument coverage, and impact language — not a random number." },
          { icon: Edit3, title: "Inline Editing", description: "Click any generated text to refine it with your own voice and evidence before copying." },
          { icon: RefreshCw, title: "Multiple Variations", description: "Generate 3 distinct options across tones and closing styles to find the one that resonates." },
        ]}>
          <div className="prose dark:prose-invert max-w-none">
            <h3>Mastering the Art of the Conclusion</h3>
            <p>The conclusion is the final impression your essay leaves. It is more than a summary; it is a synthesis that demonstrates why your argument matters. A weak conclusion can undermine an otherwise strong paper, while a powerful one elevates your work to a new level of authority. By inputting your thesis and key points — or your full draft — the generator produces options that restate your central claim in fresh language, avoiding the repetitive "In conclusion" clichés that bore readers.</p>
            <h3>From Summary to Impact</h3>
            <p>Many writers struggle to move from listing arguments to showing broader significance. This tool adapts tone and structure to your genre, ensuring your ending feels earned. Use the Quality Score to confirm you have not dropped key arguments, then polish with your own voice and specific evidence.</p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={[
          { question: "Will this tool be detected as AI plagiarism?", answer: "The tool generates drafts and ideas. We strongly recommend editing the output heavily with your own voice and specific examples to ensure originality." },
          { question: "How does the Quality Score work?", answer: "It deterministically checks whether your thesis keywords reappear (restatement), how many of your key arguments are covered, and whether impact language ('therefore', 'so what', call to action) is present." },
          { question: "Can I use this for college applications?", answer: "Yes, but admissions essays need a personal voice. Use the tool to structure thoughts, then ensure the final words are authentically yours." },
          { question: "What if the AI hallucinates facts?", answer: "Conclusions should synthesize existing arguments. Always review to ensure it does not invent quotes or statistics absent from your essay — pasting the full draft helps us keep it grounded." },
        ]} />

        <RelatedTools currentToolUrl="/tools/academic/essay-conclusion-generator" max={6} />
      </div>
    </div>
  );
}
export default EssayConclusionGeneratorClient;
