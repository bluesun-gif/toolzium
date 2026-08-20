"use client";

import React, { useState, useMemo, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  FileText, Download, Copy, Check, Sparkles, Printer, Plus,
  Trash2, Briefcase, GraduationCap, Award, Code2, User,
  CheckCircle2, AlertCircle, Eye, RefreshCw
} from "lucide-react";
import toast from "react-hot-toast";

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  year: string;
  gpa: string;
}

const DEFAULT_EXPERIENCE: Experience[] = [
  {
    id: "1",
    role: "Senior Full Stack Engineer",
    company: "NextGen Cloud Systems",
    location: "San Francisco, CA",
    startDate: "2023",
    endDate: "Present",
    bullets:
      "• Architected scalable microservices using Next.js, Node.js, and PostgreSQL, reducing latency by 42%.\n• Spearheaded AI agent integrations that automated customer workflows for 50,000+ daily active users.\n• Mentored 6 junior engineers and established CI/CD automated test pipelines with 98% coverage.",
  },
  {
    id: "2",
    role: "Frontend Software Developer",
    company: "Apex Digital Labs",
    location: "Austin, TX",
    startDate: "2021",
    endDate: "2023",
    bullets:
      "• Built responsive React & TypeScript UI components adhering to strict WCAG 2.1 AA accessibility standards.\n• Optimized Webpack and Vite bundle sizes by 35%, boosting Google Core Web Vitals to 99/100.",
  },
];

const DEFAULT_EDUCATION: Education[] = [
  {
    id: "1",
    degree: "B.S. in Computer Science",
    school: "University of California, Berkeley",
    location: "Berkeley, CA",
    year: "2017 – 2021",
    gpa: "3.85 / 4.0",
  },
];

export default function ResumeBuilderClient() {
  const [fullName, setFullName] = useState("Alex Johnson");
  const [jobTitle, setJobTitle] = useState("Senior Full-Stack Software Engineer");
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [location, setLocation] = useState("San Francisco, CA");
  const [website, setWebsite] = useState("https://alexjohnson.dev");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/alexjohnson");
  const [github, setGithub] = useState("github.com/alexjohnson");
  const [summary, setSummary] = useState(
    "Results-driven Senior Full-Stack Engineer with 5+ years of experience architecting high-concurrency web applications, microservices, and AI-powered interfaces. Proven track record of boosting system performance, mentoring engineering teams, and shipping production-grade platforms."
  );
  const [skills, setSkills] = useState(
    "TypeScript, React, Next.js, Node.js, Python, PostgreSQL, Redis, Docker, Kubernetes, AWS, GraphQL, Tailwind CSS, CI/CD"
  );
  const [experiences, setExperiences] = useState<Experience[]>(DEFAULT_EXPERIENCE);
  const [education, setEducation] = useState<Education[]>(DEFAULT_EDUCATION);
  const [copied, setCopied] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  // ATS Optimization Score Calculation
  const atsScore = useMemo(() => {
    let score = 0;
    if (fullName.trim()) score += 15;
    if (email.trim() && phone.trim()) score += 15;
    if (summary.length > 50) score += 20;
    if (experiences.length > 0) score += 25;
    if (education.length > 0) score += 15;
    if (skills.split(",").length >= 5) score += 10;
    return Math.min(score, 100);
  }, [fullName, email, phone, summary, experiences, education, skills]);

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "Software Engineer",
        company: "Company Name",
        location: "City, State",
        startDate: "2022",
        endDate: "2024",
        bullets: "• Led development of core features.\n• Improved performance and reliability.",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        degree: "Bachelor of Science",
        school: "University Name",
        location: "City, State",
        year: "2020",
        gpa: "3.8",
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setEducation((prev) => prev.filter((e) => e.id !== id));
  };

  const generateMarkdown = () => {
    return `# ${fullName}
**${jobTitle}**
📧 ${email} | 📞 ${phone} | 📍 ${location}
🌐 ${website} | 💼 ${linkedin} | 💻 ${github}

---

## 🎯 Professional Summary
${summary}

---

## 🛠️ Technical Skills
${skills}

---

## 💼 Work Experience
${experiences
  .map(
    (exp) => `### ${exp.role} — ${exp.company}
*${exp.location} | ${exp.startDate} – ${exp.endDate}*
${exp.bullets}`
  )
  .join("\n\n")}

---

## 🎓 Education
${education
  .map(
    (edu) => `### ${edu.degree} — ${edu.school}
*${edu.location} | ${edu.year} ${edu.gpa ? `| GPA: ${edu.gpa}` : ""}*`
  )
  .join("\n\n")}
`;
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdown();
    navigator.clipboard.writeText(md);
    setCopied(true);
    toast.success("Resume copied as formatted Markdown!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fullName.toLowerCase().replace(/\s+/g, "_")}_resume.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded resume as .md!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="ATS Resume Builder & Markdown Formatter"
          description="Create clean, keyword-optimized, ATS-compliant resumes with real-time live preview, instant PDF printing, and Markdown export."
          icon={FileText}
          badgeText="📄 100% ATS-Compliant • Instant Live Preview"
        />

        {/* ATS Score & Action Header */}
        <GlassCard className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-500 text-lg">
              {atsScore}%
            </div>
            <div>
              <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <span>ATS Readiness Score</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                Optimized layout, standard headers, and parsable font metrics.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyMarkdown}
              className="rounded-xl text-xs font-semibold gap-1.5 h-9"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Markdown"}</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadMarkdown}
              className="rounded-xl text-xs font-semibold gap-1.5 h-9"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .MD</span>
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handlePrint}
              className="rounded-xl text-xs font-bold gap-1.5 h-9 bg-primary text-primary-foreground shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </Button>
          </div>
        </GlassCard>

        {/* Two Column Layout: Editor (Left) & Real-Time ATS Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Editor Form (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Contact Information */}
            <GlassCard className="p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <User className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Contact & Personal Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Full Name</Label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-9 text-xs" />
                </div>
                <div>
                  <Label className="text-xs">Target Job Title</Label>
                  <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="h-9 text-xs" />
                </div>
                <div>
                  <Label className="text-xs">Email Address</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-9 text-xs" />
                </div>
                <div>
                  <Label className="text-xs">Phone Number</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-9 text-xs" />
                </div>
                <div>
                  <Label className="text-xs">Location (City, State)</Label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} className="h-9 text-xs" />
                </div>
                <div>
                  <Label className="text-xs">LinkedIn URL</Label>
                  <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="h-9 text-xs" />
                </div>
                <div>
                  <Label className="text-xs">GitHub / Portfolio</Label>
                  <Input value={github} onChange={(e) => setGithub(e.target.value)} className="h-9 text-xs" />
                </div>
                <div>
                  <Label className="text-xs">Personal Website</Label>
                  <Input value={website} onChange={(e) => setWebsite(e.target.value)} className="h-9 text-xs" />
                </div>
              </div>
            </GlassCard>

            {/* Professional Summary */}
            <GlassCard className="p-5 space-y-3">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Professional Summary</h3>
              </div>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                className="text-xs leading-relaxed"
                placeholder="Brief 2-3 sentence overview of your career achievements and domain expertise..."
              />
            </GlassCard>

            {/* Technical Skills */}
            <GlassCard className="p-5 space-y-3">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <Code2 className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Skills & Competencies</h3>
              </div>
              <Input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="text-xs h-9"
                placeholder="Comma separated skills (e.g. React, Node.js, Python, AWS, SQL)..."
              />
            </GlassCard>

            {/* Work Experience */}
            <GlassCard className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Work Experience</h3>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addExperience} className="text-xs h-8 gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Job
                </Button>
              </div>

              {experiences.map((exp, index) => (
                <div key={exp.id} className="p-3 bg-muted/20 rounded-xl border border-border/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Position #{index + 1}</span>
                    {experiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="text-muted-foreground hover:text-destructive text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Job Title"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[index].role = e.target.value;
                        setExperiences(updated);
                      }}
                      className="h-8 text-xs"
                    />
                    <Input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[index].company = e.target.value;
                        setExperiences(updated);
                      }}
                      className="h-8 text-xs"
                    />
                    <Input
                      placeholder="Location"
                      value={exp.location}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[index].location = e.target.value;
                        setExperiences(updated);
                      }}
                      className="h-8 text-xs"
                    />
                    <div className="flex gap-1">
                      <Input
                        placeholder="Start"
                        value={exp.startDate}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[index].startDate = e.target.value;
                          setExperiences(updated);
                        }}
                        className="h-8 text-xs"
                      />
                      <Input
                        placeholder="End"
                        value={exp.endDate}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[index].endDate = e.target.value;
                          setExperiences(updated);
                        }}
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>

                  <Textarea
                    placeholder="Bullet points (Start with action verbs: Led, Developed, Optimized)..."
                    value={exp.bullets}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[index].bullets = e.target.value;
                      setExperiences(updated);
                    }}
                    rows={3}
                    className="text-xs leading-relaxed"
                  />
                </div>
              ))}
            </GlassCard>

            {/* Education */}
            <GlassCard className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Education</h3>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addEducation} className="text-xs h-8 gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Degree
                </Button>
              </div>

              {education.map((edu, index) => (
                <div key={edu.id} className="p-3 bg-muted/20 rounded-xl border border-border/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Degree #{index + 1}</span>
                    {education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="text-muted-foreground hover:text-destructive text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Degree / Major"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[index].degree = e.target.value;
                        setEducation(updated);
                      }}
                      className="h-8 text-xs"
                    />
                    <Input
                      placeholder="University / College"
                      value={edu.school}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[index].school = e.target.value;
                        setEducation(updated);
                      }}
                      className="h-8 text-xs"
                    />
                    <Input
                      placeholder="Graduation Year"
                      value={edu.year}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[index].year = e.target.value;
                        setEducation(updated);
                      }}
                      className="h-8 text-xs"
                    />
                    <Input
                      placeholder="GPA (optional)"
                      value={edu.gpa}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[index].gpa = e.target.value;
                        setEducation(updated);
                      }}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              ))}
            </GlassCard>

          </div>

          {/* Real-Time Clean ATS Resume Preview (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="sticky top-20 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground px-1">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-primary" /> Live ATS Document Preview
                </span>
                <span className="text-[11px] font-mono">Standard 8.5 x 11 Layout</span>
              </div>

              {/* Printable ATS Document Box */}
              <div
                ref={previewRef}
                className="bg-white text-gray-900 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-200 font-sans text-xs leading-relaxed print:m-0 print:p-0 print:border-none print:shadow-none"
                style={{ minHeight: "800px" }}
              >
                {/* Header */}
                <div className="border-b-2 border-gray-900 pb-3 text-center space-y-1">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 uppercase">
                    {fullName || "Your Full Name"}
                  </h1>
                  <div className="text-xs font-semibold text-gray-700">
                    {jobTitle}
                  </div>
                  <div className="text-[11px] text-gray-600 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 pt-1">
                    {email && <span>{email}</span>}
                    {phone && <span>• {phone}</span>}
                    {location && <span>• {location}</span>}
                    {linkedin && <span>• {linkedin}</span>}
                    {github && <span>• {github}</span>}
                  </div>
                </div>

                {/* Summary */}
                {summary && (
                  <div className="mt-4 space-y-1">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5">
                      Professional Summary
                    </h2>
                    <p className="text-[11px] text-gray-700 text-justify pt-1">{summary}</p>
                  </div>
                )}

                {/* Skills */}
                {skills && (
                  <div className="mt-4 space-y-1">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5">
                      Core Competencies & Technologies
                    </h2>
                    <p className="text-[11px] text-gray-700 pt-1 font-mono">{skills}</p>
                  </div>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5">
                      Professional Experience
                    </h2>
                    {experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex items-center justify-between font-bold text-gray-900">
                          <span>{exp.role}</span>
                          <span className="text-[11px] font-normal text-gray-600 font-mono">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-gray-700 italic">
                          <span>{exp.company}</span>
                          <span>{exp.location}</span>
                        </div>
                        <div className="text-[11px] text-gray-700 whitespace-pre-wrap pl-1 pt-0.5">
                          {exp.bullets}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5">
                      Education & Credentials
                    </h2>
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-0.5">
                        <div className="flex items-center justify-between font-bold text-gray-900">
                          <span>{edu.degree}</span>
                          <span className="text-[11px] font-normal text-gray-600 font-mono">{edu.year}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-gray-700 italic">
                          <span>{edu.school} — {edu.location}</span>
                          {edu.gpa && <span>GPA: {edu.gpa}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Share & Embed Bar */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">100% In-Browser Private Generation</span>
                <div className="flex items-center gap-2">
                  <ShareResultButton
                    toolTitle="ATS Resume Builder"
                    resultTitle={`${fullName} - Resume`}
                    resultSummary={`ATS-compliant resume for ${jobTitle} with ${atsScore}% readiness score.`}
                    resultMetrics={[
                      { label: "ATS Score", value: `${atsScore}%` },
                      { label: "Jobs Listed", value: experiences.length },
                      { label: "Format", value: "Markdown / PDF" },
                    ]}
                  />
                  <EmbedButton toolPath="/tools/text/resume-builder" toolTitle="ATS Resume Builder" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Fill in Details", description: "Enter your contact details, professional summary, experience bullets, and skills." },
            { step: "2", title: "Instant ATS Preview", description: "View your formatted resume side-by-side with industry-standard typography and hierarchy." },
            { step: "3", title: "Print or Export", description: "Download formatted Markdown, copy plain text, or print directly to high-resolution PDF." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "ATS-Friendly Typography", description: "Standard linear header tags and plain formatting guarantee 100% parseability by Workday, Greenhouse, and Taleo." },
            { title: "Live Markdown Synchronization", description: "Export clean GitHub Flavored Markdown compatible with modern developer portfolios." },
            { title: "Zero Server Storage", description: "All resume data stays securely in your browser session with total privacy." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "What makes a resume ATS-compliant?", answer: "An ATS (Applicant Tracking System) friendly resume avoids complex tables, graphical columns, icons, and text boxes that confuse parsing algorithms. This tool uses clean single-column hierarchy with standardized headers." },
            { question: "Can I print directly to PDF?", answer: "Yes! Click 'Print / Save PDF' and select 'Save as PDF' as your printer destination to download a crisp vector PDF document." },
            { question: "Is my personal resume data stored on your servers?", answer: "No. Everything runs 100% locally in your web browser. Your resume is never uploaded, saved to a database, or shared." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/resume-builder" />

      </div>
    </div>
  );
}
