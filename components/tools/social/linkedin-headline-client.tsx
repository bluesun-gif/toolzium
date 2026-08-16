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
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import { ModelSelector } from "@/components/shared/model-selector";
import toast from "react-hot-toast";
import { Linkedin, Sparkles, RefreshCw, Briefcase } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
export default function LinkedinHeadlineClient() {
  const [jobTitle, setJobTitle] = useState("");
  const [model, setModel] = useState("gpt4o");
  const [industry, setIndustry] = useState("");
  const [skills, setSkills] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [headlines, setHeadlines] = useState<string[]>([]);
  const handleGenerate = async () => {
    if (!jobTitle.trim()) {
      toast.error("Enter your job title.");
      return;
    }
    setLoading(true);
    try {
      const prompt = `You are a LinkedIn branding expert.
Generate 8 LinkedIn headlines for:
Job title: ${jobTitle}
Industry: ${industry || "Not provided"}
Key skills: ${skills || "Not provided"}
Career goal: ${careerGoal || "Not provided"}

Use different formulas such as value proposition, keyword-rich, achievement-focused, and question-based.
Return exactly 8 headlines, one per line, with no numbering and no extra text.`;
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
        const lines = String(data.raw).replace(/```[a-z]*\n?/gi, "").split("\n").map((line: string) => line.replace(/^[-*\d.)\s]+/, "").trim()).filter(Boolean);
        if (lines.length >= 8) {
          setHeadlines(lines.slice(0, 8));
          toast.success("LinkedIn headlines generated.");
        } else {
          throw new Error("Invalid AI output.");
        }
      } else {
        throw new Error("API error");
      }
    } catch {
      setHeadlines([`${jobTitle} | Helping teams deliver better results`, `${jobTitle} in ${industry || "your industry"} | ${skills || "Core skills"} focused`, `${jobTitle} | Turning complex problems into practical solutions`, `Experienced ${jobTitle} | ${skills || "Results-driven"} professional`, `${jobTitle} | Building value through ${skills || "expertise and execution"}`, `${jobTitle} | Focused on ${careerGoal || "long-term growth"}`, `${jobTitle} | Making ${industry || "business"} outcomes clearer, faster, stronger`, `${jobTitle} | ${skills || "Strategy, execution, and impact"}`]);
      toast.error("AI offline. Loaded template fallback.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Linkedin} title="LinkedIn Headline Generator" description="Generate 8 LinkedIn headline variants with character counts and copy buttons." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Briefcase className="w-4 h-4 text-primary" /> Career Details
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Job Title</label>
 <Input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. Product Manager" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Industry</label>
 <Input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g. SaaS" />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Key Skills</label>
 <Input value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. growth, analytics, leadership" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Career Goal</label>
 <Input value={careerGoal} onChange={e => setCareerGoal(e.target.value)} placeholder="e.g. leadership roles" />
 </div>
 </div>

 <Button onClick={() => void handleGenerate()} disabled={loading} className="w-full">
 {loading ? <>
 <RefreshCw className="w-4 h-4 animate-spin" /> Generating...
 </> : <>
 <Sparkles className="w-4 h-4" /> Generate Headlines
 </>}
 </Button>
 </CardContent>
 </GlassCard>

 {headlines.length > 0 && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 {headlines.map((headline, index) => <Card key={`${headline.slice(0, 12)}-${index}`} className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Linkedin className="w-4 h-4 text-primary" /> Headline {index + 1}
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm leading-relaxed">{headline}</p>
 <div className="flex items-center justify-between gap-3">
 <span className={`text-xs ${headline.length > 220 ? "text-red-500" : "text-muted-foreground"}`}>
 {headline.length}/220
 </span>
 <CopyButton getText={() => headline} label="Copy" />
 </div>
 </CardContent>
 </Card>)}
 </div>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Add Career Info",
        description: "Enter your role, industry, skills, and goal.",
        icon: Briefcase
      }, {
        step: "02",
        title: "Generate Headlines",
        description: "Get eight headline options with different positioning styles.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Copy and Update",
        description: "Choose the strongest headline and add it to LinkedIn.",
        icon: Linkedin
      }]} badges={["AI-Powered", "8 Variants", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: Linkedin,
        title: "LinkedIn-Optimized",
        description: "Creates headlines designed for professional visibility."
      }, {
        icon: Sparkles,
        title: "Multiple Formulas",
        description: "Uses value, keyword, achievement, and question-based angles."
      }, {
        icon: Briefcase,
        title: "Career-Focused",
        description: "Builds headlines around your role and goals."
      }, {
        icon: Linkedin,
        title: "Character Tracking",
        description: "Shows length against the common LinkedIn headline limit."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>
 Your LinkedIn headline is one of the most visible parts of your professional profile. It appears in search
 results, comments, posts, and connection requests. A clear and compelling headline can help recruiters,
 clients, and collaborators understand your value immediately.
 </p>
 <p>
 The best headlines usually do more than list a job title. They communicate specialization, value, and
 credibility. Depending on your goal, you may want a keyword-rich headline for search visibility, a
 value-proposition headline for clients, or an achievement-focused headline for job searching.
 </p>
 <p>
 Use the generated options as drafts and customize them with your strongest proof points. Specific skills,
 industries, and outcomes often perform better than generic phrases.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "What is the LinkedIn headline limit?",
        answer: "LinkedIn headlines are commonly limited to about 220 characters."
      }, {
        question: "Should I use only my job title?",
        answer: "Usually no. Adding value, keywords, or specialization often makes the headline stronger."
      }, {
        question: "Can this help freelancers?",
        answer: "Yes. Enter your service focus and target client to create more targeted headlines."
      }]} />

 <RelatedTools currentToolUrl="/tools/social/linkedin-headline" max={6} />
 </div></div>;
}