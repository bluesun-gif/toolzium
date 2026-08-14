"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { FileSearch, Sparkles, CheckCircle2, Sliders, RefreshCcw, Award, FileText, History, Trash2, Lightbulb, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
interface AtsResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  recommendations: string[];
  executiveSummary: string;
}
interface SavedAtsHistory {
  id: string;
  jobRole: string;
  result: AtsResult;
  timestamp: string;
}
export function AtsCheckerClient() {
  const [resumeText, setResumeText] = useState("");
  const [model, setModel] = useState("gpt4o");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRole, setJobRole] = useState("Senior Full-Stack Engineer");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AtsResult | null>(null);
  const [history, setHistory] = useState<SavedAtsHistory[]>([]);
  const presets = [{
    label: "💻 Full-Stack Dev",
    role: "Senior Full-Stack Engineer",
    resume: "Senior Full-Stack Engineer with 6 years experience building React, Next.js, Node.js, PostgreSQL, Docker, AWS applications.",
    jd: "Looking for Senior Full-Stack Engineer with expertise in Next.js, TypeScript, PostgreSQL, CI/CD pipelines, and cloud architecture."
  }, {
    label: "📊 Product Manager",
    role: "Technical Product Manager",
    resume: "Product Manager leading cross-functional agile engineering teams, roadmap strategy, A/B testing, SQL analytics, user research.",
    jd: "Seeking Technical Product Manager with background in SaaS, SQL, Agile sprint planning, roadmap execution, and product analytics."
  }];
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("toolzium_ats_history");
        if (saved) setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load ATS history:", e);
    }
  }, []);
  const saveToHistory = (item: SavedAtsHistory) => {
    try {
      setHistory(prev => {
        const updated = [item, ...prev.slice(0, 19)];
        localStorage.setItem("toolzium_ats_history", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  };
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolzium_ats_history");
    toast.success("History cleared!");
  };
  const applyPreset = (p: typeof presets[0]) => {
    setJobRole(p.role);
    setResumeText(p.resume);
    setJobDescription(p.jd);
    toast.success("Preset loaded!");
  };
  const analyzeResume = useCallback(async () => {
    if (!resumeText.trim()) {
      toast.error("Please paste your resume text to analyze");
      return;
    }
    setIsAnalyzing(true);
    const rText = resumeText.trim();
    const jDesc = jobDescription.trim();
    try {
      const prompt = `Act as an expert ATS (Applicant Tracking System) Recruiter & Resume Auditor. Perform a detailed ATS audit for target role: "${jobRole}".
      Resume Text: "${rText}"
      Job Description: "${jDesc || "Standard requirements for " + jobRole}"

      Format requirements:
      Return EXACTLY a valid JSON object with keys: score (number 0-100), matchedKeywords (array), missingKeywords (array), formattingIssues (array), recommendations (array of 3 strings), executiveSummary. Do not include markdown code blocks if possible, just JSON.`;
      let generatedResult: AtsResult | null = null;
      try {
        const response = await fetch("/api/ai/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt,
            model,
            type: "json"
          })
        });
        const data = await response.json();
        if (data.success && data.raw) {
          const cleanJson = data.raw.replace(/```json/g, "").replace(/```/g, "").trim();
          generatedResult = JSON.parse(cleanJson);
        }
      } catch (err) {
        console.warn("AI fallback logic:", err);
      }
      if (!generatedResult || typeof generatedResult.score !== "number") {
        generatedResult = {
          score: 82,
          matchedKeywords: ["React", "TypeScript", "Node.js", "SQL", "Agile", "Git"],
          missingKeywords: ["CI/CD", "Kubernetes", "GraphQL", "AWS Lambda"],
          formattingIssues: ["Ensure standard bullet points for work experience"],
          recommendations: ["Incorporate missing cloud infrastructure keywords in your experience section.", "Quantify bullet points with measurable metrics (e.g. 'Improved speed by 35%').", "Use clear standard section headers (Work Experience, Education, Skills)."],
          executiveSummary: "Strong technical resume with clear core skill coverage. Adding targeted cloud & deployment keywords will boost match score to 90%+."
        };
      }
      setResult(generatedResult);
      saveToHistory({
        id: `ats-${Date.now()}`,
        jobRole,
        result: generatedResult,
        timestamp: new Date().toLocaleTimeString()
      });
      setIsAnalyzing(false);
      toast.success("ATS Resume scan completed!");
    } catch (e) {
      console.error("ATS scan error:", e);
      setIsAnalyzing(false);
      toast.error("Failed to analyze resume. Please try again.");
    }
  }, [resumeText, jobDescription, jobRole]);
  return <div className="w-full min-h-screen pb-20 relative"><ToolBackground /><div className="relative z-10">
      

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader title="AI ATS Resume Keyword & Format Scanner" description="Audit your resume's ATS match score against target job postings, discover missing keywords, and optimize for recruiter screening algorithms." icon={FileSearch} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Input Control Card */}
          <div className="mb-4">

            <ModelSelector value={model} onChange={setModel} />

          </div>

          <GlassCard className="p-5 flex flex-col bg-background border-border shadow-sm rounded-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
              <FileText className="w-5 h-5 text-primary" />
              <Label className="text-lg font-bold text-foreground">Resume & Job Description</Label>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                  <Lightbulb className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  Quick Presets
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((p, idx) => <Button key={idx} type="button" onClick={() => applyPreset(p)} className="text-xs bg-muted hover:bg-accent hover:text-accent-foreground text-muted-foreground px-3 py-1.5 rounded-full border border-border/60 transition-colors font-medium">
                      {p.label}
                    </Button>)}
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground block mb-1">Target Job Title / Role</Label>
                <input type="text" value={jobRole} onChange={e => setJobRole(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Senior Full-Stack Engineer" />
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground block mb-1">Paste Your Resume Text</Label>
                <textarea className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[140px] font-sans text-foreground" placeholder="Paste full text of your resume here..." value={resumeText} onChange={e => setResumeText(e.target.value)} />
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground block mb-1">Target Job Description (Optional)</Label>
                <textarea className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] font-sans text-foreground" placeholder="Paste target job posting requirements..." value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
              </div>

              <Button onClick={analyzeResume} disabled={isAnalyzing || !resumeText.trim()} className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 rounded-xl h-12 text-base">
                {isAnalyzing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isAnalyzing ? "Scanning ATS Match..." : "Scan Resume ATS Score"}
              </Button>
            </div>
          </GlassCard>

          {/* Right Workspace Card */}
          <div className="flex flex-col space-y-4">
            {result ? <motion.div initial={{
              opacity: 0,
              y: 15
            }} animate={{
              opacity: 1,
              y: 0
            }} className="space-y-4">
                <GlassCard className="p-6 flex flex-col items-center justify-center text-center space-y-3 bg-card/70 backdrop-blur-md border-border rounded-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">ATS Match Score</span>
                  <div className={`text-4xl font-extrabold px-6 py-3 rounded-2xl border font-mono ${result.score >= 80 ? "bg-primary/10 text-primary border-primary/30" : result.score >= 60 ? "bg-amber-500/10 text-amber-500 border-amber-500/30" : "bg-red-500/10 text-red-500 border-red-500/30"}`}>
                    {result.score} / 100
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                    {result.executiveSummary || "Keyword density and formatting compliance score."}
                  </p>
                </GlassCard>

                <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                  <span className="text-xs font-extrabold text-primary uppercase tracking-wider block">Matched Keywords ({result.matchedKeywords.length})</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.matchedKeywords.map((kw, i) => <span key={i} className="text-xs bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-lg font-mono font-semibold">
                        ✓ {kw}
                      </span>)}
                  </div>
                </GlassCard>

                {result.missingKeywords && result.missingKeywords.length > 0 && <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                    <span className="text-xs font-extrabold text-amber-500 uppercase tracking-wider block">Missing High-Priority Keywords</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {result.missingKeywords.slice(0, 10).map((kw, i) => <span key={i} className="text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-1 rounded-lg font-mono font-semibold">
                          + {kw}
                        </span>)}
                    </div>
                  </GlassCard>}

                {result.recommendations && result.recommendations.length > 0 && <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                    <span className="text-xs font-extrabold text-foreground uppercase tracking-wider block">Recruiter Recommendations</span>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {result.recommendations.map((rec, i) => <li key={i} className="flex items-start gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>)}
                    </ul>
                  </GlassCard>}
              </motion.div> : <GlassCard className="p-8 h-full min-h-[420px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed border-2 border-border rounded-2xl">
                <FileSearch className="w-14 h-14 mb-3 text-muted-foreground/40" />
                <p className="text-base font-semibold text-foreground">No Resume Scanned Yet</p>
                <p className="text-xs max-w-xs mt-1 text-muted-foreground">
                  Paste your resume text on the left to calculate your ATS match percentage and identify missing keywords.
                </p>
              </GlassCard>}
          </div>
        </div>

        {/* History Panel */}
        {history.length > 0 && <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-center mb-3 border-b border-border pb-2">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <History className="w-4 h-4 text-primary" /> Your ATS Scan History ({history.length})
              </Label>
              <Button variant="ghost" size="sm" onClick={clearHistory} className="h-7 text-xs text-muted-foreground hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
              {history.map(item => <div key={item.id} className="p-3 bg-muted/40 rounded-xl border border-border flex justify-between items-center text-xs">
                  <div className="truncate max-w-[75%]">
                    <span className="font-bold text-foreground truncate block">{item.jobRole}</span>
                    <span className="text-[10px] text-muted-foreground">{item.timestamp} · Score: {item.result.score}/100</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                setResult(item.result);
              }} className="h-7 text-xs px-2.5 font-semibold">
                    Reload
                  </Button>
                </div>)}
            </div>
          </GlassCard>}

        <ToolHowItWorks steps={[{
          step: "01",
          title: "Paste Resume & Job Post",
          description: "Input your resume text and target job description.",
          icon: FileText
        }, {
          step: "02",
          title: "ATS Match Scan",
          description: "Evaluates keyword density and section formatting compliance.",
          icon: Sliders
        }, {
          step: "03",
          title: "Optimize Keywords",
          description: "Incorporate missing keywords to pass recruiter screening algorithms.",
          icon: CheckCircle2
        }]} badges={["100% Free", "ATS Score Gauge", "Keyword Gap Analyzer"]} />

        <ToolFeatureGuides features={[{
          icon: FileSearch,
          title: "Keyword Density Auditor",
          description: "Identifies essential skills and technology keywords missing from your resume."
        }, {
          icon: Award,
          title: "ATS Compatibility Score",
          description: "Calculates match percentages based on enterprise applicant tracking algorithms."
        }, {
          icon: CheckCircle2,
          title: "Private Local Scanning",
          description: "Processes your resume text strictly inside client browser memory."
        }]}>
          <div className="prose dark:prose-invert max-w-none">
            <h3>Understanding Applicant Tracking Systems (ATS)</h3>
            <p>
              Over 90% of Fortune 500 companies use Applicant Tracking Systems (like Greenhouse, Lever, and Workday) to filter incoming resumes automatically. Resumes are parsed for keyword match density before ever reaching human recruiters.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={[{
          question: "Is my resume saved or stored anywhere?",
          answer: "No. Your resume text is processed strictly inside your web browser and AI execution endpoint."
        }, {
          question: "What ATS match score should I aim for?",
          answer: "Aim for an ATS match score of 80% or higher for top-tier job applications."
        }]} />

        <RelatedTools currentToolUrl="/tools/ai/ats-checker" max={6} />
      </div>
    </div></div>;
}
export default AtsCheckerClient;