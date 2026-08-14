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
import { FileSearch, Sparkles, CheckCircle2, Sliders, RefreshCcw, Award, FileText, History, Trash2, Lightbulb, AlertCircle, Wand2, CircleCheck, CircleX } from "lucide-react";
import toast from "react-hot-toast";

interface AtsResult {
  score: number;
  keywordMatch: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  sectionChecks: { name: string; ok: boolean }[];
  formattingIssues: string[];
  recommendations: string[];
  executiveSummary: string;
  tailoredResume?: string;
}

const STOP = new Set(["a","an","the","and","or","but","if","then","of","in","on","at","by","with","from","as","is","are","was","were","be","been","being","this","that","these","those","it","its","their","his","her","our","your","my","we","you","they","he","she","them","me","do","does","did","have","has","had","will","would","can","could","should","may","might","must","not","no","yes","to","for","per","each","both","either","neither","than","so","too","very","just","also","more","most","less","few","many","much","each","other","another","i","youre","hes","shes","its","were","theyre","thats","whats","whos","im"]);
const TECH = new Set(["javascript","typescript","python","java","c++","c#","golang","go","rust","ruby","php","swift","kotlin","scala","html","css","react","angular","vue","node","nodejs","nextjs","nuxt","express","django","flask","fastapi","spring","bootstrap","tailwind","jquery","sql","mysql","postgresql","postgres","mongodb","redis","firebase","aws","azure","gcp","cloud","kubernetes","docker","terraform","jenkins","cicd","git","github","gitlab","linux","rest","api","graphql","json","yaml","xml","webpack","vite","npm","selenium","cypress","jest","playwright","pandas","numpy","scikit","tensorflow","pytorch","opencv","nlp","llm","openai","anthropic","gemini","langchain","agile","scrum","jira","confluence","figma","seo","tableau","powerbi","excel","word","photoshop","salesforce","hubspot","zendesk","slack","kafka","rabbitmq","nginx","apache","oauth","jwt","iot","blockchain","solidity","ethereum"]);
const VERBS = new Set(["led","managed","built","developed","created","designed","implemented","launched","delivered","automated","optimized","improved","increased","grew","reduced","decreased","drove","secured","generated","exceeded","negotiated","spearheaded","orchestrated","engineered","architected","deployed","scaled","mentored","trained","analyzed","researched","strategized","executed","streamlined","modernized","transformed","partnered","collaborated","initiated","founded","produced","shipped","resolved","diagnosed","performed","conducted","presented","authored","published"]);
const WEAK = new Set(["we","need","must","senior","junior","developer","experience","experiences","knowledge","ability","year","years","work","working","worked","team","teams","skill","skills","using","use","used","strong","good","well","able","require","required","requirement","requirements","preferred","including","etc","within","across","between","with","and","or","for","the","a","an","to","of","in","on","at","by","as","is","are","was","were","you","our","their","this","that","these","those","have","has","had","will","would","can","could","should","may","might","seeking","looking"]);

function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9+#.]+/g) || [])
    .map((w) => w.replace(/^[.#]+|[.#]+$/g, ""))
    .filter((w) => w.length >= 2 && !/^\d+$/.test(w) && !STOP.has(w));
}

function extractTerms(text: string): string[] {
  const toks = tokenize(text);
  const freq: Record<string, number> = {};
  toks.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
  for (let i = 0; i < toks.length - 1; i++) {
    if (WEAK.has(toks[i]) || WEAK.has(toks[i + 1])) continue;
    const b = toks[i] + " " + toks[i + 1];
    if (b.length > 5) freq[b] = (freq[b] || 0) + 2;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 24)
    .map(([t]) => t);
}

function hasWord(resumeLc: string, term: string): boolean {
  if (term.includes(" ")) return resumeLc.includes(term);
  const re = new RegExp("(^|[^a-z0-9])" + term.replace(/[.+*?^$}{()|[\]\\]/g, "\\$&") + "([^a-z0-9]|$)", "i");
  return re.test(resumeLc);
}

function detectSections(r: string): { name: string; ok: boolean }[] {
  const lc = r.toLowerCase();
  return [
    { name: "Contact info (email + phone)", ok: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(r) && /(\+?\d[\d\s().-]{7,}\d)/.test(r) },
    { name: "Professional Summary", ok: /summary|profile|objective|about me/.test(lc) },
    { name: "Work Experience", ok: /experience|employment|work history|professional background/.test(lc) },
    { name: "Education", ok: /education|degree|university|college|bachelor|master|ph\.?d|b\.?sc|m\.?sc/.test(lc) },
    { name: "Skills", ok: /skills|competencies|technologies|tech stack|expertise/.test(lc) },
    { name: "Measurable achievements", ok: /\d+%|\$\d+|\d+x|increased|reduced|improved|grew|saved/.test(lc) },
  ];
}

function formatIssues(r: string): string[] {
  const issues: string[] = [];
  const emoji = (r.match(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu) || []).length;
  if (emoji > 0) issues.push(`Found ${emoji} emoji(s). Many ATS parsers drop emoji — remove them from headers and bullets.`);
  if (r.includes("|") && r.split("\n").some((l) => (l.match(/\|/g) || []).length >= 2)) issues.push("Detected table characters (|). ATS systems flatten tables and often lose the content — use simple bullet lists.");
  if (/text box|textbox/i.test(r) || /\[\[|\]{\d}/.test(r)) issues.push("Avoid text boxes and multi-column layouts — many ATS engines cannot parse them.");
  const words = (r.match(/\S+/g) || []).length;
  if (words < 250) issues.push(`Resume is short (${words} words). Aim for 350–800 words with concrete detail.`);
  if (words > 1200) issues.push(`Resume is long (${words} words). Keep it to 1–2 pages; trim filler.`);
  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(r)) issues.push("No email detected — add a clear email in the header.");
  if (!/(\+?\d[\d\s().-]{7,}\d)/.test(r)) issues.push("No phone number detected — add one in the header.");
  if (!/\b(19|20)\d{2}\b/.test(r)) issues.push("No years detected — include employment dates (e.g. 2021–2024) so the ATS can parse your timeline.");
  if (issues.length === 0) issues.push("No major formatting red flags. Your layout looks ATS-friendly.");
  return issues;
}

function verbScore(r: string): number {
  const lines = r.split(/\n/).map((l) => l.replace(/^[\s•\-*]+/, "").trim()).filter(Boolean);
  if (!lines.length) return 0;
  let strong = 0;
  lines.forEach((l) => {
    const w = (l.split(/\s+/)[0] || "").toLowerCase().replace(/[^a-z]/g, "");
    if (VERBS.has(w)) strong++;
  });
  return Math.min(100, Math.round((strong / Math.max(6, lines.length * 0.4)) * 100));
}

const presets = [
  {
    label: "💻 Full-Stack Dev",
    role: "Senior Full-Stack Engineer",
    resume:
      "Senior Full-Stack Engineer with 6 years experience building React, Next.js, Node.js, PostgreSQL, Docker, AWS applications. Led a team of 5, improved page load speed by 40%, deployed CI/CD pipelines.",
    jd: "Looking for Senior Full-Stack Engineer with expertise in Next.js, TypeScript, PostgreSQL, CI/CD pipelines, and cloud architecture. Kubernetes and GraphQL a plus.",
  },
  {
    label: "📊 Product Manager",
    role: "Technical Product Manager",
    resume:
      "Product Manager leading cross-functional agile engineering teams, roadmap strategy, A/B testing, SQL analytics, user research. Shipped 12 features, grew retention 22%.",
    jd: "Seeking Technical Product Manager with background in SaaS, SQL, Agile sprint planning, roadmap execution, and product analytics. Stakeholder management required.",
  },
];

export function AtsCheckerClient() {
  const [resumeText, setResumeText] = useState("");
  const [model, setModel] = useState("gpt4o");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRole, setJobRole] = useState("Senior Full-Stack Engineer");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [result, setResult] = useState<AtsResult | null>(null);
  const [history, setHistory] = useState<{ id: string; jobRole: string; result: AtsResult; timestamp: string }[]>([]);

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

  const saveToHistory = (item: { id: string; jobRole: string; result: AtsResult; timestamp: string }) => {
    try {
      setHistory((prev) => {
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

  // Deterministic, verifiable scoring (mirrors how Jobscan/ResumeWorded compute match)
  const analyzeResume = useCallback(async () => {
    if (!resumeText.trim()) {
      toast.error("Please paste your resume text to analyze");
      return;
    }
    setIsAnalyzing(true);
    const rText = resumeText.trim();
    const jDesc = jobDescription.trim();
    const rLc = rText.toLowerCase();

    const terms = (jDesc ? extractTerms(jDesc) : extractTerms(rText).filter((t) => TECH.has(t) || t.includes(" "))).slice(0, 18);
    const matched: string[] = [];
    const missing: string[] = [];
    terms.forEach((t) => (hasWord(rLc, t) ? matched.push(t) : missing.push(t)));

    const total = terms.length || 1;
    const keywordMatch = Math.round((matched.length / total) * 100);

    const sections = detectSections(rText);
    const sectionScore = Math.round((sections.filter((s) => s.ok).length / sections.length) * 100);
    const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(rText);
    const hasPhone = /(\+?\d[\d\s().-]{7,}\d)/.test(rText);
    const contactScore = (hasEmail ? 50 : 0) + (hasPhone ? 50 : 0);
    const fmtIssues = formatIssues(rText);
    const formatScore = fmtIssues.length <= 1 ? 100 : fmtIssues.length <= 3 ? 70 : 45;
    const vScore = verbScore(rText);

    const score = Math.round(0.5 * keywordMatch + 0.15 * sectionScore + 0.1 * contactScore + 0.15 * formatScore + 0.1 * vScore);

    const recommendations: string[] = [];
    if (missing.length) recommendations.push(`Weave these missing keywords into your experience: ${missing.slice(0, 6).join(", ")}.`);
    if (sectionScore < 100) recommendations.push("Add the missing standard sections (Summary, Experience, Education, Skills) with clear headers.");
    if (vScore < 50) recommendations.push("Start bullet points with strong action verbs (Led, Built, Optimized, Delivered) to show impact.");
    if (fmtIssues.length > 1) recommendations.push(fmtIssues[0]);
    if (recommendations.length === 0) recommendations.push("Strong resume. Quantify more bullets with metrics to push toward 90%+.");

    let executiveSummary = `Your resume scored ${score}/100 with a ${keywordMatch}% keyword match against the ${jobRole} target. `;
    if (missing.length) executiveSummary += `Add the ${missing.length} missing keyword(s) to boost your match.`;
    else executiveSummary += `All tracked keywords are present — great alignment.`;

    const localResult: AtsResult = {
      score,
      keywordMatch,
      matchedKeywords: matched,
      missingKeywords: missing,
      sectionChecks: sections,
      formattingIssues: fmtIssues,
      recommendations,
      executiveSummary,
    };

    setResult(localResult);
    saveToHistory({ id: `ats-${Date.now()}`, jobRole, result: localResult, timestamp: new Date().toLocaleTimeString() });
    setIsAnalyzing(false);
    toast.success("ATS Resume scan completed!");
  }, [resumeText, jobDescription, jobRole]);

  const aiTailor = useCallback(async () => {
    if (!result) return;
    setIsTailoring(true);
    const miss = result.missingKeywords.length ? result.missingKeywords.join(", ") : "relevant industry keywords";
    const prompt = `Act as an expert ATS resume writer. Rewrite the resume below so it passes Applicant Tracking Systems while staying 100% truthful.
Rules:
1. Keep all real facts, names, dates, metrics exactly as given — never invent experience.
2. Naturally weave in these missing keywords where truthful: ${miss}.
3. Start bullets with strong action verbs.
4. Use standard ATS-safe headings: Summary, Experience, Education, Skills.
5. No tables, columns, or emoji. Plain text with hyphen bullets.
6. Return ONLY the rewritten resume text.

RESUME:
${resumeText.trim()}`;
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model, type: "text" }),
      });
      const data = await response.json();
      const tailored = (data.raw || "").trim();
      if (tailored) {
        setResult((prev) => (prev ? { ...prev, tailoredResume: tailored } : prev));
        toast.success("AI-tailored resume ready!");
      } else {
        toast.error("AI returned no result. Try again.");
      }
    } catch (e) {
      console.error(e);
      toast.error("AI tailoring failed. Try again.");
    } finally {
      setIsTailoring(false);
    }
  }, [result, resumeText, model]);

  const scoreColor = (s: number) => (s >= 80 ? "bg-primary/10 text-primary border-primary/30" : s >= 60 ? "bg-amber-500/10 text-amber-500 border-amber-500/30" : "bg-red-500/10 text-red-500 border-red-500/30");

  return (
    <div className="w-full min-h-screen pb-20 relative">
      <ToolBackground />
      <div className="relative z-10">
        <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
          <ToolPageHeader title="AI ATS Resume Keyword & Format Scanner" description="Get a true ATS match score against any job posting — verified keyword matching, section & formatting checks, and a one-click AI rewrite that beats screening algorithms." icon={FileSearch} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Input */}
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
                    <Lightbulb className="w-3.5 h-3.5 inline mr-1 text-amber-500" /> Quick Presets
                  </Label>
                  <div className="flex flex-wrap gap-1.5">
                    {presets.map((p, idx) => (
                      <Button key={idx} type="button" onClick={() => applyPreset(p)} className="text-xs bg-muted hover:bg-accent hover:text-accent-foreground text-muted-foreground px-3 py-1.5 rounded-full border border-border/60 transition-colors font-medium">
                        {p.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-muted-foreground block mb-1">Target Job Title / Role</Label>
                  <input type="text" value={jobRole} onChange={(e) => setJobRole(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Senior Full-Stack Engineer" />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-muted-foreground block mb-1">Paste Your Resume Text</Label>
                  <textarea className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[140px] font-sans text-foreground" placeholder="Paste full text of your resume here..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-muted-foreground block mb-1">Target Job Description (Optional but recommended)</Label>
                  <textarea className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] font-sans text-foreground" placeholder="Paste target job posting requirements..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                </div>

                <Button onClick={analyzeResume} disabled={isAnalyzing || !resumeText.trim()} className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 rounded-xl h-12 text-base">
                  {isAnalyzing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  {isAnalyzing ? "Scanning ATS Match..." : "Scan Resume ATS Score"}
                </Button>
              </div>
            </GlassCard>

            {/* Right Results */}
            <div className="flex flex-col space-y-4">
              {result ? (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <GlassCard className="p-6 flex flex-col items-center justify-center text-center space-y-3 bg-card/70 backdrop-blur-md border-border rounded-2xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">ATS Match Score</span>
                    <div className={`text-4xl font-extrabold px-6 py-3 rounded-2xl border font-mono ${scoreColor(result.score)}`}>{result.score} / 100</div>
                    <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">{result.executiveSummary}</p>
                  </GlassCard>

                  <GlassCard className="p-4 space-y-3 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                    <span className="text-xs font-extrabold text-primary uppercase tracking-wider block">Keyword Match Rate</span>
                    <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                      <span>{result.matchedKeywords?.length || 0} matched</span>
                      <span>{result.keywordMatch}%</span>
                      <span>{result.missingKeywords?.length || 0} missing</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden flex">
                      <div className="h-full bg-primary transition-all" style={{ width: `${result.keywordMatch}%` }} />
                      <div className="h-full bg-amber-500/70 transition-all" style={{ width: `${100 - result.keywordMatch}%` }} />
                    </div>
                  </GlassCard>

                  {result.sectionChecks?.length > 0 && (
                    <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                      <span className="text-xs font-extrabold text-primary uppercase tracking-wider block">Section Check</span>
                      <div className="space-y-1.5">
                        {result.sectionChecks.map((s, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            {s.ok ? <CircleCheck className="w-4 h-4 text-green-500 shrink-0" /> : <CircleX className="w-4 h-4 text-red-500 shrink-0" />}
                            <span className={s.ok ? "text-foreground" : "text-muted-foreground"}>{s.name}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}

                  <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                    <span className="text-xs font-extrabold text-primary uppercase tracking-wider block">Matched Keywords ({result.matchedKeywords.length})</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {result.matchedKeywords.map((kw, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-lg font-mono font-semibold">✓ {kw}</span>
                      ))}
                    </div>
                  </GlassCard>

                  {result.missingKeywords && result.missingKeywords.length > 0 && (
                    <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                      <span className="text-xs font-extrabold text-amber-500 uppercase tracking-wider block">Missing High-Priority Keywords</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {result.missingKeywords.slice(0, 12).map((kw, i) => (
                          <span key={i} className="text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-1 rounded-lg font-mono font-semibold">+ {kw}</span>
                        ))}
                      </div>
                    </GlassCard>
                  )}

                  {result.recommendations && result.recommendations.length > 0 && (
                    <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                      <span className="text-xs font-extrabold text-foreground uppercase tracking-wider block">Recruiter Recommendations</span>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  )}

                  {result.formattingIssues && (
                    <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                      <span className="text-xs font-extrabold text-foreground uppercase tracking-wider block">Formatting & ATS Issues</span>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {result.formattingIssues.map((iss, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{iss}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  )}

                  <GlassCard className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Wand2 className="w-4 h-4 text-primary" />
                      <span className="text-xs font-extrabold text-primary uppercase tracking-wider">AI Resume Tailoring</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Let the AI rewrite your resume to naturally include the missing keywords and strengthen weak bullets.</p>
                    <Button onClick={aiTailor} disabled={isTailoring} className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl">
                      {isTailoring ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                      {isTailoring ? "Tailoring..." : "✨ AI-Tailor My Resume"}
                    </Button>
                    {result.tailoredResume && (
                      <div className="mt-3 p-3 bg-background border border-border rounded-xl">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Tailored Resume</span>
                          <Button variant="outline" size="sm" className="h-7 text-xs px-2.5" onClick={() => { navigator.clipboard.writeText(result.tailoredResume || ""); toast.success("Copied!"); }}>Copy</Button>
                        </div>
                        <pre className="text-xs text-foreground whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">{result.tailoredResume}</pre>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              ) : (
                <GlassCard className="p-8 h-full min-h-[420px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed border-2 border-border rounded-2xl">
                  <FileSearch className="w-14 h-14 mb-3 text-muted-foreground/40" />
                  <p className="text-base font-semibold text-foreground">No Resume Scanned Yet</p>
                  <p className="text-xs max-w-xs mt-1 text-muted-foreground">Paste your resume text on the left to calculate your real ATS match percentage and identify missing keywords.</p>
                </GlassCard>
              )}
            </div>
          </div>

          {history.length > 0 && (
            <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl">
              <div className="flex justify-between items-center mb-3 border-b border-border pb-2">
                <Label className="text-base font-bold text-foreground flex items-center gap-2">
                  <History className="w-4 h-4 text-primary" /> Your ATS Scan History ({history.length})
                </Label>
                <Button variant="ghost" size="sm" onClick={clearHistory} className="h-7 text-xs text-muted-foreground hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                {history.map((item) => (
                  <div key={item.id} className="p-3 bg-muted/40 rounded-xl border border-border flex justify-between items-center text-xs">
                    <div className="truncate max-w-[75%]">
                      <span className="font-bold text-foreground truncate block">{item.jobRole}</span>
                      <span className="text-[10px] text-muted-foreground">{item.timestamp} · Score: {item.result.score}/100</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setResult(item.result)} className="h-7 text-xs px-2.5 font-semibold">Reload</Button>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          <ToolHowItWorks steps={[
            { step: "01", title: "Paste Resume & Job Post", description: "Input your resume text and target job description.", icon: FileText },
            { step: "02", title: "Verified ATS Match Scan", description: "We extract real keywords from the JD and measure exact match vs your resume, plus section & format checks.", icon: Sliders },
            { step: "03", title: "Optimize & Tailor", description: "See missing keywords, fix formatting, then one-click AI-tailor your resume to pass screening.", icon: CheckCircle2 },
          ]} badges={["100% Free", "Verified Keyword Match", "AI Resume Tailoring"]} />

          <ToolFeatureGuides features={[
            { icon: FileSearch, title: "Real Keyword Gap Analysis", description: "We extract the actual skills & phrases from the job description and tell you exactly which ones your resume is missing." },
            { icon: Award, title: "True ATS Compatibility Score", description: "A weighted score from keyword match, section completeness, contact info, formatting, and action verbs — not a vanity number." },
            { icon: Wand2, title: "One-Click AI Tailoring", description: "Rewrite your resume to include the missing keywords naturally so it sails through Applicant Tracking Systems." },
          ]}>
            <div className="prose dark:prose-invert max-w-none">
              <h3>Understanding Applicant Tracking Systems (ATS)</h3>
              <p>Over 90% of Fortune 500 companies use Applicant Tracking Systems (like Greenhouse, Lever, and Workday) to filter incoming resumes automatically. Resumes are parsed for keyword match density before ever reaching human recruiters. Our scanner measures the same signals those systems weigh most: exact keyword alignment with the posting, recognizable section headings, clean formatting, and achievement-driven language.</p>
            </div>
          </ToolFeatureGuides>

          <ToolFaqAccordion faqs={[
            { question: "Is my resume saved or stored anywhere?", answer: "No. Your resume text is processed strictly inside your web browser and sent only to our AI endpoint when you click 'AI-Tailor'." },
            { question: "What ATS match score should I aim for?", answer: "Aim for an ATS match score of 80% or higher for top-tier job applications. Our score is computed deterministically from your resume and the job description so it reflects real alignment." },
          ]} />

          <RelatedTools currentToolUrl="/tools/ai/ats-checker" max={6} />
        </div>
      </div>
    </div>
  );
}
export default AtsCheckerClient;
