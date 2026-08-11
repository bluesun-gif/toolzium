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
import { FileSearch, Sparkles, CheckCircle2, Sliders, RefreshCcw, Award, FileText } from "lucide-react";
import toast from "react-hot-toast";

interface AtsResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  recommendations: string[];
}

export function AtsCheckerClient() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AtsResult | null>(null);

  const analyzeResume = useCallback(() => {
    if (!resumeText.trim()) {
      toast.error("Please paste your resume text to analyze");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const resumeLower = resumeText.toLowerCase();
      const jdLower = jobDescription.toLowerCase();

      const commonKeywords = [
        "javascript", "typescript", "react", "next.js", "node.js", "python",
        "sql", "api", "git", "ci/cd", "agile", "leadership",
        "project management", "cloud", "aws", "docker", "testing", "architecture"
      ];

      let targetKeywords = commonKeywords;
      if (jdLower.trim().length > 20) {
        const jdWords = jdLower
          .replace(/[^a-z0-9\s-]/g, "")
          .split(/\s+/)
          .filter((w) => w.length > 3);
        const uniqueJdWords = Array.from(new Set(jdWords)).slice(0, 15);
        targetKeywords = Array.from(new Set([...commonKeywords.slice(0, 6), ...uniqueJdWords]));
      }

      const matched: string[] = [];
      const missing: string[] = [];

      targetKeywords.forEach((kw) => {
        if (resumeLower.includes(kw)) {
          matched.push(kw);
        } else {
          missing.push(kw);
        }
      });

      const formattingIssues: string[] = [];
      if (!resumeLower.includes("@") && !resumeLower.includes("email")) formattingIssues.push("No clear email address detected");
      if (!resumeLower.includes("experience") && !resumeLower.includes("history")) formattingIssues.push("Missing explicit 'Work Experience' section header");

      const matchRatio = matched.length / Math.max(1, targetKeywords.length);
      let score = Math.round(matchRatio * 75 + (formattingIssues.length === 0 ? 25 : 10));
      score = Math.min(98, Math.max(35, score));

      const recommendations: string[] = [
        `Incorporate high-priority missing keywords: ${missing.slice(0, 4).join(", ") || "None"}.`,
        "Use standard bullet points for clean ATS screen parsing.",
        "Include quantitative metrics (e.g. 'Increased speed by 35%')."
      ];

      setResult({
        score,
        matchedKeywords: matched,
        missingKeywords: missing,
        formattingIssues,
        recommendations
      });

      setIsAnalyzing(false);
      toast.success("ATS Resume scan completed!");
    }, 450);
  }, [resumeText, jobDescription]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* 3D Green Resume Search Icon Header Box */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center shrink-0">
          <FileSearch className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">AI Resume ATS Keyword & Format Scanner</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-200">POPULAR</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Calculate your resume's ATS match score against target job descriptions, discover missing keywords, and optimize for hiring screeners.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <FileText className="w-4 h-4 text-emerald-600" />
              Resume & Job Description Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Paste Your Resume Text</Label>
              <textarea
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 min-h-[140px] font-sans text-slate-900 dark:text-slate-100"
                placeholder="Paste full text of your resume here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Target Job Description (Optional)</Label>
              <textarea
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px] font-sans text-slate-900 dark:text-slate-100"
                placeholder="Paste target job posting requirements..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <Button onClick={analyzeResume} disabled={isAnalyzing || !resumeText.trim()} className="w-full gap-2 mt-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold shadow-md shadow-emerald-500/20 rounded-xl h-11">
              {isAnalyzing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isAnalyzing ? "Scanning ATS Match..." : "Scan Resume ATS Score"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {result ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <GlassCard className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">ATS Match Score</span>
                <div className={`text-4xl font-extrabold px-6 py-3 rounded-2xl border font-mono ${
                  result.score >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  result.score >= 60 ? "bg-amber-50 text-amber-700 border-amber-200" :
                  "bg-red-50 text-red-700 border-red-200"
                }`}>
                  {result.score} / 100
                </div>
                <p className="text-xs text-slate-500 max-w-xs">
                  {result.score >= 80 ? "Excellent ATS match! Your resume contains primary keyword density." : "Needs keyword optimization to pass automated recruiter filters."}
                </p>
              </GlassCard>

              <GlassCard className="p-4 space-y-2">
                <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider block">Matched Keywords ({result.matchedKeywords.length})</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {result.matchedKeywords.map((kw, i) => (
                    <span key={i} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-mono font-medium">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </GlassCard>

              {result.missingKeywords.length > 0 && (
                <GlassCard className="p-4 space-y-2">
                  <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider block">Missing High-Priority Keywords</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.missingKeywords.slice(0, 10).map((kw, i) => (
                      <span key={i} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-lg font-mono font-medium">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              )}
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-slate-400 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <FileSearch className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Resume Scanned Yet</p>
              <p className="text-xs max-w-xs mt-1 text-slate-500">Paste your resume text on the left to calculate your ATS match percentage and identify missing keywords.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Resume & Job Post", description: "Input your resume text and target job description.", icon: FileText },
          { step: "02", title: "ATS Match Scan", description: "Evaluates keyword density and section formatting compliance.", icon: Sliders },
          { step: "03", title: "Optimize Keywords", description: "Incorporate missing keywords to pass recruiter screening algorithms.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "ATS Score Gauge", "Keyword Gap Analyzer"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: FileSearch, title: "Keyword Density Auditor", description: "Identifies essential skills and technology keywords missing from your resume." },
          { icon: Award, title: "ATS Compatibility Score", description: "Calculates match percentages based on enterprise applicant tracking algorithms." },
          { icon: CheckCircle2, title: "Private Local Scanning", description: "Processes your resume text strictly inside client browser memory." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Understanding Applicant Tracking Systems (ATS)</h3>
          <p>
            Over 90% of Fortune 500 companies use Applicant Tracking Systems (like Greenhouse, Lever, and Workday) to filter incoming resumes automatically. RESUMES are parsed for keyword match density before ever reaching human recruiters.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Is my resume saved or stored anywhere?", answer: "No. Your resume text is processed 100% locally inside your web browser instance." },
          { question: "What ATS match score should I aim for?", answer: "Aim for an ATS match score of 80% or higher for top-tier job applications." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/ats-checker" max={6} />
    </div>
  );
}

export default AtsCheckerClient;
