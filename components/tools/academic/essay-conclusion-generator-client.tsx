"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, GraduationCap, Loader2, Copy, RefreshCw, Edit3, BarChart2 } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
export function EssayConclusionGeneratorClient() {
  const [thesis, setThesis] = useState("");
  const [points, setPoints] = useState("");
  const [essayType, setEssayType] = useState("Argumentative");
  const [tone, setTone] = useState("Academic");
  const [wordCount, setWordCount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<string[]>([]);
  const generateConclusions = async () => {
    if (!thesis.trim() || !points.trim()) {
      toast.error("Please provide a thesis and key points");
      return;
    }
    setLoading(true);
    setVariations([]);
    const prompt = `You are an expert academic writer. Generate 3 distinct, high-quality essay conclusions based on the following inputs.
 
 Thesis: ${thesis}
 Key Arguments: ${points}
 Essay Type: ${essayType}
 Tone: ${tone}
 Target Length per conclusion: Approximately ${wordCount} words.
 
 Requirements:
 1. Restate the thesis in new words.
 2. Synthesize the key arguments (do not just list them).
 3. Provide a final"So What?"statement or call to action.
 4. Ensure the tone matches the request (${tone}).
 
 Format the output strictly as a JSON array of strings: ["Conclusion 1","Conclusion 2","Conclusion 3"]. Do not add markdown code blocks or explanations outside the array.`;
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          type: "list"
        })
      });
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setVariations(data.results);
      } else if (data.raw) {
        try {
          const cleanText = data.raw.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(cleanText);
          if (Array.isArray(parsed)) setVariations(parsed);else setVariations([data.raw]);
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
  const analyzeStrength = (text: string) => {
    let score = 0;
    const lowerText = text.toLowerCase();
    if (lowerText.includes(thesis.toLowerCase().split("")[0])) score += 20;
    if (text.length > wordCount * 4) score += 20;
    if (lowerText.includes("therefore") || lowerText.includes("ultimately") || lowerText.includes("conclusion")) score += 20;
    const pointsList = points.split(/[,\n]/).map(p => p.trim().toLowerCase());
    let matchedPoints = 0;
    pointsList.forEach(p => {
      if (p && lowerText.includes(p)) matchedPoints++;
    });
    score += matchedPoints / Math.max(pointsList.length, 1) * 40;
    return Math.min(Math.round(score), 100);
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 p-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={GraduationCap} title="AI Essay Conclusion Generator" description="Craft powerful, memorable endings for your essays. Synthesize your arguments and leave a lasting impression on your readers." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Edit3 className="w-4 h-4 text-primary" />
 Essay Parameters
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="space-y-2">
 <Label>Thesis Statement</Label>
 <Input value={thesis} onChange={e => setThesis(e.target.value)} placeholder="e.g., Remote work significantly improves employee retention in the tech sector." />
 </div>

 <div className="space-y-2">
 <Label>Key Arguments (Summarize your main points)</Label>
 <textarea className={`${textareaClass} min-h-[120px]`} value={points} onChange={e => setPoints(e.target.value)} placeholder={"- Increased autonomy leads to higher job satisfaction.\n- Reduced commute times lower burnout rates.\n- Flexible hours allow for better work-life balance."} />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div>
 <Label>Essay Type</Label>
 <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={essayType} onChange={e => setEssayType(e.target.value)}>
 <option>Argumentative</option>
 <option>Expository</option>
 <option>Narrative</option>
 <option>Persuasive</option>
 <option>Analytical</option>
 </select>
 </div>
 <div>
 <Label>Tone</Label>
 <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={tone} onChange={e => setTone(e.target.value)}>
 <option>Academic</option>
 <option>Persuasive</option>
 <option>Reflective</option>
 <option>Urgent</option>
 </select>
 </div>
 <div>
 <Label>Word Count: {wordCount}</Label>
 <input type="range" min="50" max="200" step="10" value={wordCount} onChange={e => setWordCount(parseInt(e.target.value))} className="w-full accent-primary mt-3" />
 </div>
 </div>

 <Button onClick={generateConclusions} disabled={loading} className="w-full gap-2 text-base py-6" size="lg">
 {loading ? <>
 <Loader2 className="w-5 h-5 animate-spin" /> Generating...
 </> : <>
 <Sparkles className="w-5 h-5" /> Generate Conclusions
 </>}
 </Button>
 </CardContent>
 </GlassCard>

 {variations.length > 0 && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {variations.map((text, idx) => {
          const score = analyzeStrength(text);
          return <Card key={idx} className={cardClass}>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center w-full">
 <CardTitle className={titleClass}>Option {idx + 1}</CardTitle>
 <div className="flex items-center gap-1 text-xs font-bold">
 <BarChart2 className="w-3 h-3" />
 <span className={score > 70 ? "text-green-500" : score > 40 ? "text-amber-500" : "text-red-500"}>
 {score}%
 </span>
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div className="p-4 bg-muted/30 rounded-lg border border-border/50 text-sm leading-relaxed min-h-[150px] outline-none focus:ring-2 focus:ring-primary" contentEditable suppressContentEditableWarning onBlur={e => {
                const newText = e.currentTarget.innerText;
                setVariations(prev => {
                  const next = [...prev];
                  next[idx] = newText;
                  return next;
                });
              }}>
 {text}
 </div>
 <div className="flex gap-2">
 <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => {
                  navigator.clipboard.writeText(text);
                  toast.success("Copied!");
                }}>
 <Copy className="w-4 h-4" /> Copy
 </Button>
 <Button variant="ghost" size="sm" onClick={generateConclusions} disabled={loading}>
 <RefreshCw className="w-4 h-4" />
 </Button>
 </div>
 </CardContent>
 </Card>;
        })}
 </div>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Core Elements",
        description: "Provide your thesis statement and a summary of your main arguments. This ensures the conclusion stays focused.",
        icon: Edit3
      }, {
        step: "02",
        title: "Select Style",
        description: "Choose the essay type and tone to match your assignment requirements, from formal academic to persuasive.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Review & Refine",
        description: "Get 3 unique variations. Edit them directly in the browser to fine-tune the phrasing before copying.",
        icon: BarChart2
      }]} badges={["AI-Powered", "3 Variations", "Smart Analysis"]} />

 <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Synthesizing Arguments",
        description: "The AI doesn't just repeat your points; it weaves them together to show how they support your thesis."
      }, {
        icon: BarChart2,
        title: "Strength Indicator",
        description: "Our algorithm rates each conclusion based on thesis restatement, argument coverage, and impact."
      }, {
        icon: Edit3,
        title: "Inline Editing",
        description: "Click any generated text to manually edit and refine it. The perfect blend of AI speed and human polish."
      }, {
        icon: RefreshCw,
        title: "Multiple Variations",
        description: "Never settle for the first draft. Generate 3 distinct options to find the one that resonates most."
      }]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>Mastering the Art of the Conclusion</h3>
 <p>
 The conclusion is the final impression your essay leaves on the reader. It is more than a summary; it is a synthesis that demonstrates why your argument matters. A weak conclusion can undermine an otherwise strong paper, while a powerful one can elevate your work to a new level of authority. Our AI Essay Conclusion Generator is designed to help you bridge the gap between your final body paragraph and the"So What?"moment that defines great writing. By inputting your thesis and key points, the tool generates options that restate your central claim in fresh language, avoiding the repetitive"In conclusion"clichés that bore readers.
 </p>
 <h3>From Summary to Impact</h3>
 <p>
 Many students struggle to move from simply listing their arguments to showing their broader significance. This tool is trained on high-scoring academic essays to recognize patterns of effective closure. It looks for opportunities to connect your specific topic to wider themes, suggest future implications, or issue a call to action. Whether you are writing a persuasive piece on climate policy or an analytical review of literature, the generator adapts its tone and structure to fit the genre, ensuring your ending feels earned and impactful.
 </p>
 <h3>The Role of AI in the Writing Process</h3>
 <p>
 This tool is a co-pilot, not a replacement for your own thinking. Use it to break through writer's block when you are staring at a blank page at the end of a long drafting session. Use the"Strength Indicator"to check if you have missed key arguments in your final draft. And use the inline editing feature to polish the AI's suggestions with your own voice and specific evidence from your paper. The result is a conclusion that is both structurally sound and authentically yours.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Will this tool be detected as AI plagiarism?",
        answer: "The tool generates drafts and ideas. We strongly recommend using the output as a starting point and editing it heavily with your own voice, specific examples from your essay, and unique phrasing to ensure originality."
      }, {
        question: "How does the Strength Indicator work?",
        answer: "It analyzes the text for keywords related to your thesis and main points, checks the length, and looks for transition words that signal a strong conclusion. It is a guide, not a guarantee of a grade."
      }, {
        question: "Can I use this for college applications?",
        answer: "Yes, but be careful. Admissions essays require a very personal and authentic voice. Use the tool to structure your thoughts, but ensure the final words are deeply personal to you."
      }, {
        question: "What if the AI hallucinates facts?",
        answer: "Conclusions should generally synthesize existing arguments rather than introduce new facts. However, always review the output to ensure it doesn't invent quotes or statistics not present in your original essay."
      }, {
        question: "Is there a limit to how many times I can generate?",
        answer: "No, you can generate as many variations as you need to find the perfect ending for your paper."
      }]} />

 <RelatedTools currentToolUrl="/tools/academic/essay-conclusion-generator" max={6} />
 </div></div>;
}
export default EssayConclusionGeneratorClient;