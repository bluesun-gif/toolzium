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
import toast from "react-hot-toast";
import { FileText, Sparkles, RefreshCw, Briefcase, Award, User } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
interface ResumeSummaryResult {
  concise: string;
  detailed: string;
  executive: string;
}
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const inputClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";
export default function ResumeSummaryGeneratorClient() {
  const [jobTitle, setJobTitle] = useState("");
  const [years, setYears] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeSummaryResult | null>(null);
  const handleGenerate = async () => {
    if (!jobTitle.trim()) {
      toast.error("Enter your job title.");
      return;
    }
    setLoading(true);
    try {
      const prompt = `You are a professional resume writer.
Job title: ${jobTitle}
Years of experience: ${years || "Not provided"}
Key skills: ${skills || "Not provided"}

Generate 3 professional resume summaries:
1. Concise
2. Detailed
3. Executive

Return ONLY the 3 summaries separated by ||| with no labels.`;
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
            concise: parts[0],
            detailed: parts[1],
            executive: parts[2]
          });
          toast.success("Resume summaries generated.");
        } else {
          throw new Error("Invalid AI output.");
        }
      } else {
        throw new Error("API error.");
      }
    } catch {
      setResult({
        concise: `${jobTitle} with ${years || "relevant"} experience and strong skills in ${skills || "core professional areas"}.`,
        detailed: `${jobTitle} with ${years || "hands-on"} experience delivering practical results. Skilled in ${skills || "key areas relevant to the role"}, with a focus on quality, collaboration, and continuous improvement.`,
        executive: `Results-driven ${jobTitle} with ${years || "substantial"} years of experience leading initiatives, improving outcomes, and applying expertise in ${skills || "strategic and operational priorities"}. Known for combining execution strength with clear communication and long-term value creation.`
      });
      toast.error("AI offline. Loaded template fallback.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={FileText} title="Resume Summary Generator" description="Generate concise, detailed, and executive resume summaries from your experience and skills." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <User className="w-4 h-4 text-primary" /> Career Details
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Job Title</label>
 <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} className={inputClass} placeholder="e.g. Frontend Developer" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Years of Experience</label>
 <input value={years} onChange={e => setYears(e.target.value)} className={inputClass} placeholder="e.g. 5" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Key Skills</label>
 <input value={skills} onChange={e => setSkills(e.target.value)} className={inputClass} placeholder="e.g. React, TypeScript, UI performance" />
 </div>
 </div>

 <Button onClick={() => void handleGenerate()} disabled={loading} className="w-full">
 {loading ? <>
 <RefreshCw className="w-4 h-4 animate-spin" /> Generating...
 </> : <>
 <Sparkles className="w-4 h-4" /> Generate Summaries
 </>}
 </Button>
 </CardContent>
 </GlassCard>

 {result && <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Briefcase className="w-4 h-4 text-primary" /> Concise Summary
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{result.concise}</p>
 <CopyButton getText={() => result.concise} label="Copy Concise" />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <FileText className="w-4 h-4 text-primary" /> Detailed Summary
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{result.detailed}</p>
 <CopyButton getText={() => result.detailed} label="Copy Detailed" />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Award className="w-4 h-4 text-primary" /> Executive Summary
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{result.executive}</p>
 <CopyButton getText={() => result.executive} label="Copy Executive" />
 </CardContent>
 </GlassCard>
 </div>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Career Info",
        description: "Add your job title, years of experience, and key skills.",
        icon: User
      }, {
        step: "02",
        title: "Generate Summaries",
        description: "The AI creates three summary styles for different resume needs.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Copy and Customize",
        description: "Choose the best version and tailor it to the job you want.",
        icon: Briefcase
      }]} badges={["100% Free", "Resume Ready", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: Briefcase,
        title: "Concise Option",
        description: "Best for modern one-page resumes and quick scanning."
      }, {
        icon: FileText,
        title: "Detailed Option",
        description: "Adds more context and skill emphasis for broader applications."
      }, {
        icon: Award,
        title: "Executive Option",
        description: "Uses stronger leadership framing for senior-level positioning."
      }, {
        icon: User,
        title: "Skill-Based Input",
        description: "Builds the summary around the strengths you provide."
      }]}>
 <h3 className="text-lg font-semibold mb-3">Why resume summaries matter</h3>
 <p className="mb-3 text-muted-foreground">
 A resume summary is often the first thing recruiters read. It should quickly communicate who you are, what
 you are good at, and the value you bring. A strong summary can improve the chances that the rest of your
 resume gets careful attention.
 </p>
 <p className="mb-3 text-muted-foreground">
 Different applications call for different tones. A concise summary works well for compact resumes, a detailed
 summary can highlight broader experience, and an executive summary is better for senior or leadership roles.
 </p>
 <p className="text-muted-foreground">
 For the best results, customize the generated summary with measurable achievements and keywords from the job
 description. This makes it more relevant and more likely to pass both recruiter review and ATS filtering.
 </p>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Should I use the summary exactly as generated?",
        answer: "No. Use it as a draft and add your achievements, metrics, and job-specific keywords."
      }, {
        question: "Which version is best for ATS?",
        answer: "The concise or detailed version is usually safer, especially if you tailor it with relevant keywords."
      }, {
        question: "Can this help entry-level resumes?",
        answer: "Yes. Enter your target role and relevant skills or projects instead of years of experience."
      }]} />

 <RelatedTools currentToolUrl="/tools/writing/resume-summary-generator" max={6} />
 </div></div>;
}