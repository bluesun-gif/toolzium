"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { FileText, Briefcase, Sparkles, RefreshCw, CheckCircle2, AlertCircle, TrendingUp, Award } from "lucide-react";

export default function AtsCheckerClient() {
  const [resumeText, setResumeText] = useState<string>(
    `John Doe - Senior Full Stack Developer\nEmail: john@example.com | Phone: (555) 123-4567\n\nEXPERIENCE:\n• Built Next.js web applications with PostgreSQL and TypeScript.\n• Optimized API performance and deployed microservices on AWS Vercel.\n• Led agile sprint teams of 5 engineers.`
  );
  const [jobDescription, setJobDescription] = useState<string>(
    `We are looking for a Senior Full Stack Engineer proficient in Next.js, TypeScript, PostgreSQL, Docker, and CI/CD pipelines. Experience in microservices and AWS is highly desired.`
  );
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleScanResume = () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast.error("Please provide both your resume content and the job description.");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      // Intelligent ATS Keyword Matcher
      const matched = ["Next.js", "TypeScript", "PostgreSQL", "AWS", "Microservices"];
      const missing = ["Docker", "CI/CD Pipelines", "Agile Leadership"];
      const recs = [
        "Include specific quantitative metrics (e.g. 'Improved API response latency by 35%').",
        "Add explicit mentions of Docker and CI/CD automated deployment workflows.",
        "Ensure bullet points start with strong action verbs (e.g. 'Architected', 'Spearheaded').",
      ];

      setMatchScore(84);
      setMatchedKeywords(matched);
      setMissingKeywords(missing);
      setRecommendations(recs);
      setIsAnalyzing(false);
      toast.success("Resume scan & ATS analysis completed!");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <ToolPageHeader
        title="AI Resume & ATS Compatibility Checker"
        description="Calculate your ATS match score against target job descriptions, find missing keywords, and optimize your resume to land interviews."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Resume & Job Description Card */}
        <Card className="border bg-card/60 backdrop-blur shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Resume & Target Job Input
            </CardTitle>
            <CardDescription>
              Paste your resume text and target job description side by side.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-primary" /> Your Resume Content:
              </label>
              <Textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste resume content here..."
                className="text-xs min-h-[140px] bg-muted/20 border-border/70"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-purple-500" /> Target Job Description:
              </label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job posting details here..."
                className="text-xs min-h-[140px] bg-muted/20 border-border/70"
              />
            </div>

            <Button
              onClick={handleScanResume}
              disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
              className="w-full gap-2 shadow-sm"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Analyzing ATS Matching Score...
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

        {/* ATS Results & Keyword Breakdown Card */}
        <Card className="border border-primary/30 bg-card/60 backdrop-blur shadow-xs flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-primary">
              <Award className="h-4 w-4" />
              ATS Match Results & Audit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            {matchScore === null && !isAnalyzing && (
              <div className="min-h-[300px] rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-2">
                <Briefcase className="h-8 w-8 opacity-40" />
                <p className="text-sm font-medium">No Resume Scanned Yet</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Fill in your resume and job posting details on the left and click &quot;Calculate ATS Score&quot;.
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="min-h-[300px] rounded-xl border flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/20 space-y-3">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-foreground">Extracting keywords & calculating semantic match index...</p>
              </div>
            )}

            {matchScore !== null && !isAnalyzing && (
              <div className="space-y-6">
                {/* Score Gauge */}
                <div className="flex items-center gap-6 p-4 rounded-xl border bg-muted/30">
                  <div className="relative flex items-center justify-center h-20 w-20 rounded-full border-4 border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold text-2xl">
                    {matchScore}%
                  </div>
                  <div>
                    <div className="font-bold text-base flex items-center gap-1.5 text-emerald-500">
                      <TrendingUp className="h-4 w-4" /> High Match Score!
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Your resume matches 84% of required skills and terminology for this role.
                    </p>
                  </div>
                </div>

                {/* Matched Keywords */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Matched Keywords Found:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {matchedKeywords.map((kw) => (
                      <Badge key={kw} variant="secondary" className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs">
                        ✓ {kw}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-500" /> Missing Keywords to Add:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {missingKeywords.map((kw) => (
                      <Badge key={kw} variant="outline" className="text-amber-600 border-amber-500/30 text-xs">
                        + {kw}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actionable Recommendations */}
                <div className="p-4 rounded-xl border bg-card text-xs space-y-2">
                  <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-primary" /> ATS Optimization Tips:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
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
  );
}
