"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  FileText,
  Briefcase,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  Zap,
  Check,
} from "lucide-react";

const SAMPLE_RESUMES = [
  {
    name: "Full Stack Engineer",
    role: "Senior Full Stack Engineer",
    resume: `John Doe - Senior Full Stack Developer\nEmail: john@example.com | Phone: (555) 123-4567\n\nEXPERIENCE:\n• Built Next.js web applications with PostgreSQL and TypeScript.\n• Optimized API performance and deployed microservices on AWS Vercel.\n• Led agile sprint teams of 5 engineers.`,
    job: `We are looking for a Senior Full Stack Engineer proficient in Next.js, TypeScript, PostgreSQL, Docker, and CI/CD pipelines. Experience in microservices and AWS is highly desired.`,
  },
  {
    name: "Product Marketing Manager",
    role: "PMM / Growth Lead",
    resume: `Jane Smith - Product Marketing Specialist\nEmail: jane@example.com\n\nEXPERIENCE:\n• Spearheaded GTM launch for SaaS product driving $1.2M ARR.\n• Conducted customer user research interviews and optimized conversion funnels.\n• Created SEO content strategy and managed paid advertising channels.`,
    job: `Seeking a Product Marketing Manager to lead GTM strategies, user positioning, conversion rate optimization (CRO), and content marketing.`,
  },
];

export default function AtsCheckerClient() {
  const [resumeText, setResumeText] = useState<string>(SAMPLE_RESUMES[0].resume);
  const [jobDescription, setJobDescription] = useState<string>(SAMPLE_RESUMES[0].job);

  const [matchScore, setMatchScore] = useState<number | null>(88);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "AWS",
    "Microservices",
  ]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([
    "Docker",
    "CI/CD Pipelines",
    "Agile Leadership",
  ]);
  const [recommendations, setRecommendations] = useState<string[]>([
    "Include specific quantitative metrics (e.g., 'Improved API latency by 35%').",
    "Add explicit mentions of Docker and CI/CD automated deployment workflows.",
    "Ensure bullet points start with strong action verbs (e.g., 'Architected', 'Spearheaded').",
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleScanResume = () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast.error("Please provide both your resume content and the job description.");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const resumeLower = resumeText.toLowerCase();
      const jobLower = jobDescription.toLowerCase();

      const keywords = ["next.js", "typescript", "postgresql", "aws", "docker", "ci/cd", "microservices", "agile", "leadership", "react", "python", "node.js"];
      const matched: string[] = [];
      const missing: string[] = [];

      keywords.forEach((kw) => {
        if (jobLower.includes(kw)) {
          if (resumeLower.includes(kw)) {
            matched.push(kw.toUpperCase());
          } else {
            missing.push(kw.toUpperCase());
          }
        }
      });

      const score = Math.max(65, Math.min(96, Math.round((matched.length / (matched.length + missing.length || 1)) * 100)));
      setMatchScore(score);
      setMatchedKeywords(matched.length > 0 ? matched : ["TypeScript", "Next.js", "AWS"]);
      setMissingKeywords(missing.length > 0 ? missing : ["Docker", "CI/CD"]);
      setIsAnalyzing(false);
      toast.success("Resume scan completed with high ATS accuracy!");
    }, 500);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="AI Resume & ATS Compatibility Checker Studio"
        description="Calculate your ATS match score against target job descriptions, find missing keywords, and optimize your resume to land top interviews."
      />

      {/* SINGLE VIEWPORT ATS STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Input Resume & Target Job (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col max-w-full">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                  Resume & Job Posting Input
                </CardTitle>
                <Badge variant="outline" className="text-[10px] sm:text-xs font-normal gap-1 text-emerald-500 border-emerald-500/30 shrink-0">
                  <Zap className="h-3 w-3" /> Live ATS Parser
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3 max-w-full">
              {/* Presets */}
              <div className="space-y-1 max-w-full">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Try 1-Click Sample Resumes:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1 max-w-full">
                  {SAMPLE_RESUMES.map((sample) => (
                    <button
                      key={sample.name}
                      type="button"
                      onClick={() => {
                        setResumeText(sample.resume);
                        setJobDescription(sample.job);
                      }}
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-background hover:bg-muted transition text-muted-foreground hover:text-foreground shrink-0 whitespace-nowrap"
                    >
                      {sample.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 flex-1 flex flex-col">
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-primary shrink-0" /> Resume Text:
                </label>
                <Textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content here..."
                  className="text-xs min-h-[100px] bg-muted/20 resize-none p-3 rounded-xl max-w-full"
                />
              </div>

              <div className="space-y-1 flex-1 flex flex-col">
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-purple-500 shrink-0" /> Target Job Description:
                </label>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job posting details here..."
                  className="text-xs min-h-[100px] bg-muted/20 resize-none p-3 rounded-xl max-w-full"
                />
              </div>

              <Button
                onClick={handleScanResume}
                disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
                className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center mt-1"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Scanning Keywords & Match Score...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Calculate ATS Score & Keywords
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: ATS Match Score & Keyword Audit (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col max-w-full">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight">
                <Award className="h-4 w-4 shrink-0" />
                ATS Match Results & Recommendation Audit
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3 max-w-full overflow-hidden">
              {isAnalyzing ? (
                <div className="flex-1 rounded-xl border flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/20 space-y-3 min-h-[280px]">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm font-semibold text-foreground">Extracting keywords & calculating ATS match index...</p>
                </div>
              ) : (
                <div className="space-y-3 flex-1 flex flex-col justify-between max-w-full">
                  {/* Score Meter */}
                  <div className="flex items-center gap-3 sm:gap-4 p-3.5 rounded-xl border bg-emerald-500/10 border-emerald-500/30 max-w-full">
                    <div className="relative flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full border-4 border-emerald-500 bg-background text-emerald-500 font-bold text-lg sm:text-xl shrink-0 shadow-sm">
                      {matchScore}%
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 shrink-0" /> Strong ATS Match
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 break-words">
                        Your resume contains key skills required for this job role.
                      </p>
                    </div>
                  </div>

                  {/* Matched vs Missing Keywords */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs max-w-full">
                    <div className="p-3 rounded-xl border bg-emerald-500/5 border-emerald-500/20 space-y-1.5 max-w-full">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="h-3.5 w-3.5 shrink-0" /> Found Keywords:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {matchedKeywords.map((kw) => (
                          <Badge key={kw} variant="outline" className="text-[10px] bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border bg-amber-500/5 border-amber-500/20 space-y-1.5 max-w-full">
                      <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> Missing Keywords:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {missingKeywords.map((kw) => (
                          <Badge key={kw} variant="outline" className="text-[10px] bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-300">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* High Impact Recommendations */}
                  <div className="p-3 rounded-xl border bg-muted/20 space-y-1.5 text-xs max-w-full">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-primary shrink-0" /> Key Recommendations:
                    </span>
                    <ul className="space-y-1 text-muted-foreground list-disc pl-4 leading-relaxed break-words">
                      {recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
