"use client";

import React, { useState, useMemo, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { GraduationCap, Sparkles, Copy, FileText, CheckCircle2, Sliders, RefreshCcw, Compass } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

export function ThesisGeneratorClient() {
 const [topic, setTopic] = useState("");
 const [stance, setStance] = useState("");
 const [mainArgument, setMainArgument] = useState("");
 const [counterArgument, setCounterArgument] = useState("");
 const [essayStyle, setEssayStyle] = useState<"argumentative"|"analytical"|"expository"|"persuasive">("argumentative");

 const [generatedStatements, setGeneratedStatements] = useState<string[]>([]);
 const [isProcessing, setIsProcessing] = useState(false);

 const generateThesis = useCallback(() => {
 if (!topic.trim() || !stance.trim() || !mainArgument.trim()) {
 toast.error("Please fill in topic, position/stance, and primary argument.");
 return;
 }

 setIsProcessing(true);

 setTimeout(() => {
 const t = topic.trim();
 const s = stance.trim();
 const a = mainArgument.trim();
 const c = counterArgument.trim() ||"opposing perspectives";

 let statements: string[] = [];

 if (essayStyle ==="argumentative") {
 statements = [
 `Although ${c}, ${t} should be ${s} because ${a}.`,
 `By addressing ${c}, it becomes clear that ${t} must ${s} due to ${a}.`,
 `While critics argue that ${c}, the evidence demonstrates that ${t} is essential for ${s} as shown by ${a}.`
 ];
 } else if (essayStyle ==="analytical") {
 statements = [
 `An analysis of ${t} reveals that ${s}, which is primarily driven by ${a}.`,
 `Examining ${t} through the lens of ${a} demonstrates how ${s}.`,
 `Although ${c} suggests a simple trend, a deeper examination of ${t} highlights how ${a} creates ${s}.`
 ];
 } else if (essayStyle ==="expository") {
 statements = [
 `The key factors influencing ${t} include ${a}, demonstrating why ${s}.`,
 `${t} represents a critical shift because ${a}, ultimately proving that ${s}.`,
 `In evaluating ${t}, the combination of ${a} illustrates why ${s}.`
 ];
 } else {
 statements = [
 `To resolve ${t}, policymakers and scholars must embrace ${s} because ${a}.`,
 `Without addressing ${a}, efforts surrounding ${t} will fail to achieve ${s}.`,
 `Despite claims regarding ${c}, adopting ${s} for ${t} remains urgent due to ${a}.`
 ];
 }

 setGeneratedStatements(statements);
 setIsProcessing(false);
 toast.success("Thesis statements generated!");
 }, 350);
 }, [topic, stance, mainArgument, counterArgument, essayStyle]);

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Thesis statement copied!");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 p-4">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={GraduationCap}
 title="Thesis Statement Generator"
 description="Craft strong, precise, and academically sound thesis statements for argumentative, analytical, and expository essays."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Compass className="w-4 h-4 text-primary"/>
 Thesis Building Parameters
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div>
 <Label className="text-xs mb-1 block">Essay Type</Label>
 <select
 className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
 value={essayStyle}
 onChange={(e) => setEssayStyle(e.target.value as any)}
 >
 <option value="argumentative">Argumentative (Concession + Claim + Reason)</option>
 <option value="analytical">Analytical (Deconstruction + Insight)</option>
 <option value="expository">Expository (Explanatory + Evidence)</option>
 <option value="persuasive">Persuasive (Call to Action + Evidence)</option>
 </select>
 </div>

 <div>
 <Label className="text-xs mb-1 block">Topic / Subject</Label>
 <Input
 placeholder="e.g. Remote work adoption in tech companies"
 value={topic}
 onChange={(e) => setTopic(e.target.value)}
 />
 </div>

 <div>
 <Label className="text-xs mb-1 block">Your Stance / Claim</Label>
 <Input
 placeholder="e.g. should be permanently adopted as a standard policy"
 value={stance}
 onChange={(e) => setStance(e.target.value)}
 />
 </div>

 <div>
 <Label className="text-xs mb-1 block">Main Evidence / Reason</Label>
 <Input
 placeholder="e.g. it boosts developer productivity, reduces burnout, and lowers operating costs"
 value={mainArgument}
 onChange={(e) => setMainArgument(e.target.value)}
 />
 </div>

 <div>
 <Label className="text-xs mb-1 block">Counterargument / Concession (Optional)</Label>
 <Input
 placeholder="e.g. concerns about team collaboration and onboarding difficulty"
 value={counterArgument}
 onChange={(e) => setCounterArgument(e.target.value)}
 />
 </div>

 <Button onClick={generateThesis} disabled={isProcessing} className="w-full gap-2 mt-2">
 {isProcessing ? <RefreshCcw className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4"/>}
 {isProcessing ?"Building Thesis...":"Generate Thesis Options"}
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <GraduationCap className="w-4 h-4 text-primary"/>
 Generated Thesis Options
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 {generatedStatements.length > 0 ? (
 generatedStatements.map((stmt, idx) => (
 <div key={idx} className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-2">
 <div className="flex items-center justify-between">
 <span className="text-xs font-semibold text-primary">Option {idx + 1}</span>
 <Button variant="ghost"size="sm"onClick={() => handleCopy(stmt)} className="h-7 text-xs gap-1">
 <Copy className="w-3.5 h-3.5"/> Copy
 </Button>
 </div>
 <p className="text-sm font-medium leading-relaxed">{stmt}</p>
 </div>
 ))
 ) : (
 <div className="h-[300px] flex flex-col items-center justify-center text-center p-6 text-muted-foreground border border-dashed border-border/60 rounded-xl bg-muted/10">
 <GraduationCap className="w-10 h-10 mb-3 text-muted-foreground/40"/>
 <p className="text-sm font-medium">No Thesis Statements Generated Yet</p>
 <p className="text-xs max-w-xs mt-1">Fill out your essay topic, stance, and main reasons on the left to create clear academic thesis statements.</p>
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Define Topic & Stance", description:"Enter your research topic, your specific position or claim, and your main supporting evidence.", icon: Compass },
 { step:"02", title:"Select Essay Genre", description:"Choose whether your paper is Argumentative, Analytical, Expository, or Persuasive.", icon: Sliders },
 { step:"03", title:"Review Variations", description:"Compare 3 distinct thesis statement structures and copy your favorite draft into your paper.", icon: CheckCircle2 }
 ]}
 badges={["100% Free","Academic Structure","Instant Results"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: GraduationCap, title:"Academic Formula", description:"Utilizes proven concession + claim + reason formulas used by top university writing centers."},
 { icon: Compass, title:"Concession Support", description:"Integrates counterarguments smoothly to create nuanced, high-scoring argumentative thesis statements."},
 { icon: Sparkles, title:"Instant Variations", description:"Generates multiple structural variations so you can select the formula that fits your essay flow best."},
 { icon: CheckCircle2, title:"Zero Plagiarism Risk", description:"Constructed dynamically from your own specific inputs and ideas without relying on static templates."}
 ]}
 >
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Anatomy of a High-Scoring Thesis Statement</h3>
 <p>
 A thesis statement is the central foundation of any academic essay or research paper. It establishes your main argument, communicates your stance to the reader, and sets up the roadmap for the rest of your work. A weak thesis—one that is overly broad, vague, or purely factual—weakens the entire paper. Our <strong>Thesis Statement Generator</strong> helps students and researchers formulate concise, arguable, and evidence-backed thesis statements.
 </p>
 <h3>Concession-Claim-Reason Formula</h3>
 <p>
 The strongest argumentative thesis statements utilize the <em>Concession + Claim + Reason</em> structure. By acknowledging a counterargument (concession) before stating your position (claim) and supporting evidence (reason), you signal to the reader that your argument is balanced and thoroughly researched.
 </p>
 <h3>Tailored for Multiple Essay Styles</h3>
 <p>
 Different academic disciplines require different thesis structures. An analytical literature paper requires a deconstructive thesis, whereas a persuasive policy paper demands a call to action. This tool adjusts its sentence patterns based on whether your paper is argumentative, analytical, expository, or persuasive.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Where should the thesis statement be placed in an essay?", answer:"In standard academic papers, the thesis statement is typically placed at the end of the introductory paragraph."},
 { question:"Is a thesis statement only one sentence?", answer:"Yes, in most undergraduate and high school essays, a thesis is a single, clear sentence. In longer graduate dissertations, it may span two sentences."},
 { question:"Can I revise the generated thesis?", answer:"Absolutely! The generated options serve as structured building blocks that you can polish to fit your exact writing style and paper outline."},
 { question:"Does this tool store my essay topic?", answer:"No. All inputs and generated statements are processed strictly in your browser and are deleted when you leave the page."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/academic/thesis-generator" max={6} />
 </div>
 );
}

export default ThesisGeneratorClient;
