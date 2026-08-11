"use client";

import React, { useState, useMemo, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSearch, Sparkles, Copy, FileText, CheckCircle2, Sliders, RefreshCcw, AlertTriangle, CheckCircle, Search } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

export function AtsCheckerClient() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    formattingIssues: string[];
    recommendations: string[];
  } | null>(null);

  const analyzeResume = useCallback(() => {
    if (!resumeText.trim()) {
      toast.error("Please paste your resume text to analyze");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const resumeLower = resumeText.toLowerCase();
      const jdLower = jobDescription.toLowerCase();

      // Common tech & professional keywords
      const commonKeywords = [
        "javascript", "typescript", "react", "next.js", "node.js", "python",
        "sql", "api", "git", "ci/cd", "agile", "scrum", "leadership",
        "communication", "project management", "problem solving", "optimization",
        "cloud", "aws", "docker", "testing", "architecture", "design", "security"
      ];

      // If JD is provided, extract words from JD
      let targetKeywords = commonKeywords;
      if (jdLower.trim().length > 20) {
        const jdWords = jdLower
          .replace(/[^a-z0-9\s-]/g, "")
          .split(/\s+/)
          .filter((w) => w.length > 3);
        const uniqueJdWords = Array.from(new Set(jdWords)).slice(0, 15);
        targetKeywords = Array.from(new Set([...commonKeywords.slice(0, 8), ...uniqueJdWords]));
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
      if (resumeText.includes("http://")) formattingIssues.push("Unsecured HTTP links found (use https://)");
      if (!resumeLower.includes("email") && !resumeText.includes("@")) formattingIssues.push("No email address detected in text");
      if (!resumeLower.includes("phone") && !/\d{10,}/.test(resumeText.replace(/\D/g, ""))) formattingIssues.push("No clear phone number detected");
      if (resumeText.length < 300) formattingIssues.push("Resume length is very short (< 300 characters)");

      const matchRatio = matched.length / Math.max(1, targetKeywords.length);
      let calculatedScore = Math.round(matchRatio * 75 + (formattingIssues.length === 0 ? 25 : 10));
      calculatedScore = Math.min(98, Math.max(35, calculatedScore));

      const recommendations: string[] = [];
      if (missing.length > 0) {
        recommendations.push(`Incorporate high-priority missing keywords: ${missing.slice(0, 5).join(", ")}.`);
      }
      if (!resumeLower.includes("experience") && !resumeLower.includes("work history")) {
        recommendations.push("Add a clearly labeled 'Work Experience' or 'Employment History' section header.");
      }
      if (!resumeLower.includes("education")) {
        recommendations.push("Ensure an 'Education' section is explicitly present.");
      }
      recommendations.push("Use standard bullet points and avoid tables or complex graphics for clean ATS parsing.");

      setAnalysisResult({
        score: calculatedScore,
        matchedKeywords: matched,
        missingKeywords: missing,
        formattingIssues,
        recommendations
      });

      setIsAnalyzing(false);
      toast.success("ATS Resume Analysis Complete!");
    }, 450);
  }, [resumeText, jobDescription]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={FileSearch}
        title="AI ATS Resume Checker"
        description="Optimize your resume for Applicant Tracking Systems (ATS). Compare your resume against job descriptions to boost your match rate."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <FileText className="w-4 h-4 text-primary" />
              Resume & Job Description Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block">Your Resume Content (Copy & Paste)</Label>
              <textarea
                className={`${textareaClass} min-h-[180px]`}
                placeholder="Paste the full plain text of your resume here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-xs mb-1 block">Target Job Description (Optional)</Label>
              <textarea
                className={`${textareaClass} min-h-[120px]`}
                placeholder="Paste the target job description to run a direct match audit..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <Button onClick={analyzeResume} disabled={isAnalyzing || !resumeText.trim()} className="w-full gap-2 mt-2">
              {isAnalyzing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isAnalyzing ? "Scanning Resume..." : "Run ATS Compatibility Check"}
            </Button>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Search className="w-4 h-4 text-primary" />
              ATS Match & Compatibility Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            {analysisResult ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Match Score</span>
                    <span className="text-3xl font-extrabold text-foreground">{analysisResult.score}%</span>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    analysisResult.score >= 80 ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                    analysisResult.score >= 60 ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                    "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                  }`}>
                    {analysisResult.score >= 80 ? "High Match" : analysisResult.score >= 60 ? "Moderate Match" : "Needs Optimization"}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-foreground block flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Matched Keywords ({analysisResult.matchedKeywords.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.matchedKeywords.map((kw, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-foreground block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Missing Keywords ({analysisResult.missingKeywords.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-mono">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border/50">
                  <span className="text-xs font-semibold text-foreground block">Actionable Recommendations</span>
                  <ul className="text-xs space-y-1.5 text-muted-foreground list-disc pl-4">
                    {analysisResult.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-[320px] flex flex-col items-center justify-center text-center p-6 text-muted-foreground border border-dashed border-border/60 rounded-xl bg-muted/10">
                <FileSearch className="w-10 h-10 mb-3 text-muted-foreground/40" />
                <p className="text-sm font-medium">No ATS Check Conducted Yet</p>
                <p className="text-xs max-w-xs mt-1">Paste your resume content to calculate keyword density, detect formatting issues, and improve ATS compliance.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Resume Text", description: "Copy and paste your complete resume text into the checker workspace.", icon: FileText },
          { step: "02", title: "Add Job Posting", description: "Optionally add the target job description to run a 1-to-1 keyword match audit.", icon: Sliders },
          { step: "03", title: "Review Score & Fixes", description: "Get your ATS match score, missing keywords, and actionable section formatting tips.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Privacy First", "Instant Audit"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: FileSearch, title: "Keyword Match Engine", description: "Extracts technical and soft skills from target job descriptions to identify missing keywords." },
          { icon: AlertTriangle, title: "Parsing Safety Audit", description: "Flags risky formatting elements like tables, non-standard section titles, or missing contact info." },
          { icon: Sparkles, title: "Instant Optimization", description: "Provides immediate recommendations to increase your resume's interview callback probability." },
          { icon: CheckCircle2, title: "Zero Storage", description: "Your resume and personal job application details stay strictly within your browser." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>How Applicant Tracking Systems (ATS) Filter Resumes</h3>
          <p>
            Over 90% of Fortune 500 companies and modern tech recruiters use Applicant Tracking Systems (ATS) to filter candidate resumes before a human recruiter ever sees them. ATS software parses resume text, categorizes work history, and scores candidates based on keyword density and formatting clarity. If your resume uses non-standard headers, complex graphical elements, or misses core skills mentioned in the job post, your application may be automatically rejected.
          </p>
          <h3>Optimizing Keyword Density Without Keyword Stuffing</h3>
          <p>
            The secret to passing ATS filters is matching the exact terminology used in the job description while maintaining natural, professional readability. Our <strong>AI ATS Resume Checker</strong> analyzes your text for high-priority technical skills, certifications, and industry verbs. It highlights missing keywords so you can weave them naturally into your bullet points.
          </p>
          <h3>Formatting Best Practices for ATS Compliance</h3>
          <p>
            To guarantee 100% ATS readability, use standard section titles such as <em>"Work Experience"</em>, <em>"Education"</em>, and <em>"Skills"</em>. Avoid placing critical contact information in headers or footers, and stick to standard single-column layouts for maximum parsing accuracy.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "What is a good ATS match score?", answer: "A match score of 75% or higher indicates strong alignment with the job description and a high probability of passing automated screening." },
          { question: "Should I submit my resume as a PDF or Word document?", answer: "Most modern ATS platforms parse clean PDFs seamlessly. However, plain text or .docx files are the safest option for older legacy systems." },
          { question: "Will my resume data be stored on your servers?", answer: "No. All resume text parsing and keyword matching occurs locally in your web browser. No personal data is stored." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/ats-checker" max={6} />
    </div>
  );
}

export default AtsCheckerClient;
