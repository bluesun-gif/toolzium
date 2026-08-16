"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, Plus, Trash2, ArrowUp, ArrowDown, Download, FileText, Target, CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
interface Experience {
  company: string;
  role: string;
  from: string;
  to: string;
  bullets: string[];
}
interface Education {
  institution: string;
  degree: string;
  field: string;
  from: string;
  to: string;
  gpa: string;
}
interface Skill {
  name: string;
  level: string;
}
interface Project {
  name: string;
  desc: string;
  tech: string;
  link: string;
}
interface Cert {
  name: string;
  issuer: string;
  date: string;
}
interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certs: Cert[];
}
const initialData: ResumeData = {
  personal: {
    name: "Jane Doe",
    title: "Senior Frontend Engineer",
    email: "jane@example.com",
    phone: "555-0100",
    location: "New York, NY",
    website: "janedoe.dev",
    linkedin: "linkedin.com/in/janedoe"
  },
  summary: "Passionate frontend engineer with 5+ years of experience building scalable web applications using React and TypeScript.",
  experience: [{
    company: "TechCorp",
    role: "Lead Developer",
    from: "2020",
    to: "Present",
    bullets: ["Led a team of 5 developers.", "Increased performance by 40%."]
  }],
  education: [{
    institution: "MIT",
    degree: "B.S.",
    field: "Computer Science",
    from: "2014",
    to: "2018",
    gpa: "3.9"
  }],
  skills: [{
    name: "React",
    level: "Expert"
  }, {
    name: "TypeScript",
    level: "Expert"
  }],
  projects: [{
    name: "Toolzium",
    desc: "Collection of dev tools.",
    tech: "Next.js, React",
    link: "toolzium.com"
  }],
  certs: [{
    name: "AWS Certified",
    issuer: "Amazon",
    date: "2022"
  }]
};
export function ResumeBuilderClient() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [template, setTemplate] = useState<"professional" | "modern" | "minimal">("modern");
  const [accent, setAccent] = useState("#2563eb");
  const [jobDesc, setJobDesc] = useState("");

  // ATS analysis — stolen idea from Jobscan/Enhancv (free alternative to paid $19-25/mo tools)
  const ACTION_VERBS = ["led", "built", "created", "developed", "designed", "implemented", "launched", "managed", "improved", "increased", "reduced", "optimized", "streamlined", "drove", "architected", "shipped", "owned", "scaled", "automated", "spearheaded"];
  const analysis = useMemo(() => {
    const checks: {
      label: string;
      pass: boolean;
    }[] = [];
    const p = data.personal;
    checks.push({
      label: "Contact email present",
      pass: /\S+@\S+\.\S+/.test(p.email)
    });
    checks.push({
      label: "Phone number present",
      pass: p.phone.replace(/\D/g, "").length >= 7
    });
    checks.push({
      label: "Location included",
      pass: p.location.trim().length > 0
    });
    const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
    checks.push({
      label: "Summary 30-200 words",
      pass: summaryWords >= 30 && summaryWords <= 200
    });
    const allBullets = data.experience.flatMap(e => e.bullets).filter(Boolean);
    checks.push({
      label: "At least 3 experience bullets",
      pass: allBullets.length >= 3
    });
    checks.push({
      label: "Bullets start with action verb",
      pass: allBullets.length > 0 && allBullets.filter(b => ACTION_VERBS.some(v => b.toLowerCase().startsWith(v))).length >= Math.ceil(allBullets.length / 2)
    });
    checks.push({
      label: "Education listed",
      pass: data.education.length > 0
    });
    checks.push({
      label: "At least 3 skills",
      pass: data.skills.filter(s => s.name.trim()).length >= 3
    });
    const score = Math.round(checks.filter(c => c.pass).length / checks.length * 100);
    // keyword match vs job desc
    let kwMatch = 0;
    const missing: string[] = [];
    if (jobDesc.trim()) {
      const resumeText = (data.summary + " " + allBullets.join(" ") + " " + data.skills.map(s => s.name).join(" ")).toLowerCase();
      const jdWords = Array.from(new Set(jobDesc.toLowerCase().match(/[a-z][a-z+#]{2,}/g) || [])).filter(w => w.length > 3);
      const common = jdWords.filter(w => resumeText.includes(w));
      kwMatch = Math.round(common.length / Math.max(jdWords.length, 1) * 100);
      const skillWords = jdWords.filter(w => !resumeText.includes(w)).slice(0, 8);
      missing.push(...skillWords);
    }
    return {
      checks,
      score,
      kwMatch,
      missing
    };
  }, [data, jobDesc]);
  const atsScore = analysis.score;
  const atsChecks = analysis.checks;
  const kwMatch = analysis.kwMatch;
  const missingKeywords = analysis.missing;
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  const updatePersonal = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };
  const addExp = () => setData(p => ({
    ...p,
    experience: [...p.experience, {
      company: "",
      role: "",
      from: "",
      to: "",
      bullets: [""]
    }]
  }));
  const removeExp = (i: number) => setData(p => ({
    ...p,
    experience: p.experience.filter((_, idx) => idx !== i)
  }));
  const updateExp = (i: number, field: string, value: string) => {
    setData(p => {
      const newExp = [...p.experience];
      (newExp[i] as any)[field] = value;
      return {
        ...p,
        experience: newExp
      };
    });
  };
  const addBullet = (i: number) => setData(p => {
    const n = [...p.experience];
    n[i].bullets.push("");
    return {
      ...p,
      experience: n
    };
  });
  const updateBullet = (i: number, j: number, v: string) => {
    setData(p => {
      const n = [...p.experience];
      n[i].bullets[j] = v;
      return {
        ...p,
        experience: n
      };
    });
  };
  const removeBullet = (i: number, j: number) => {
    setData(p => {
      const n = [...p.experience];
      n[i].bullets = n[i].bullets.filter((_, idx) => idx !== j);
      return {
        ...p,
        experience: n
      };
    });
  };
  const moveItem = (arrName: keyof ResumeData, index: number, dir: "up" | "down") => {
    setData(p => {
      const arr = [...(p[arrName] as any[])];
      const target = dir === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= arr.length) return p;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return {
        ...p,
        [arrName]: arr
      };
    });
  };
  const addEdu = () => setData(p => ({
    ...p,
    education: [...p.education, {
      institution: "",
      degree: "",
      field: "",
      from: "",
      to: "",
      gpa: ""
    }]
  }));
  const removeEdu = (i: number) => setData(p => ({
    ...p,
    education: p.education.filter((_, idx) => idx !== i)
  }));
  const updateEdu = (i: number, field: string, value: string) => {
    setData(p => {
      const n = [...p.education];
      (n[i] as any)[field] = value;
      return {
        ...p,
        education: n
      };
    });
  };
  const addSkill = () => setData(p => ({
    ...p,
    skills: [...p.skills, {
      name: "",
      level: "Beginner"
    }]
  }));
  const removeSkill = (i: number) => setData(p => ({
    ...p,
    skills: p.skills.filter((_, idx) => idx !== i)
  }));
  const updateSkill = (i: number, field: string, value: string) => {
    setData(p => {
      const n = [...p.skills];
      (n[i] as any)[field] = value;
      return {
        ...p,
        skills: n
      };
    });
  };
  const exportHTML = () => {
    const html = document.getElementById("resume-preview")?.innerHTML || "";
    const blob = new Blob([`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Resume</title><style>body{font-family:sans-serif;padding:40px;max-width:800px;margin:auto;}</style></head><body>${html}</body></html>`], {
      type: "text/html"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported HTML!");
  };
  const fontClass = template === "professional" ? "font-serif" : template === "minimal" ? "font-mono" : "font-sans";
  return <div className="relative max-w-7xl mx-auto space-y-8 p-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={FileText} title="Resume Builder" description="Create a professional resume with live preview and multiple templates." />

 <div className="grid lg:grid-cols-2 gap-8 mb-8">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader className={headerClass}><CardTitle className={titleClass}>Personal Info</CardTitle></CardHeader>
 <CardContent className="p-4 grid grid-cols-2 gap-4">
 <Input placeholder="Full Name" value={data.personal.name} onChange={e => updatePersonal("name", e.target.value)} className="col-span-2" />
 <Input placeholder="Job Title" value={data.personal.title} onChange={e => updatePersonal("title", e.target.value)} className="col-span-2" />
 <Input placeholder="Email" value={data.personal.email} onChange={e => updatePersonal("email", e.target.value)} />
 <Input placeholder="Phone" value={data.personal.phone} onChange={e => updatePersonal("phone", e.target.value)} />
 <Input placeholder="Location" value={data.personal.location} onChange={e => updatePersonal("location", e.target.value)} />
 <Input placeholder="Website" value={data.personal.website} onChange={e => updatePersonal("website", e.target.value)} />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}><CardTitle className={titleClass}>Summary</CardTitle></CardHeader>
 <CardContent className="p-4">
 <textarea className={textareaClass} rows={3} value={data.summary} onChange={e => setData(p => ({
                ...p,
                summary: e.target.value
              }))} />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between w-full">
 <CardTitle className={titleClass}>Experience</CardTitle>
 <Button size="sm" variant="ghost" onClick={addExp}><Plus className="h-4 w-4" /></Button>
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 {data.experience.map((exp, i) => <div key={i} className="p-3 border rounded space-y-2 bg-muted/10">
 <div className="flex gap-2">
 <Input placeholder="Company" value={exp.company} onChange={e => updateExp(i, "company", e.target.value)} className="flex-1" />
 <Input placeholder="Role" value={exp.role} onChange={e => updateExp(i, "role", e.target.value)} className="flex-1" />
 </div>
 <div className="flex gap-2">
 <Input placeholder="From" value={exp.from} onChange={e => updateExp(i, "from", e.target.value)} />
 <Input placeholder="To" value={exp.to} onChange={e => updateExp(i, "to", e.target.value)} />
 </div>
 {exp.bullets.map((b, j) => <div key={j} className="flex gap-2">
 <Input placeholder="Bullet point" value={b} onChange={e => updateBullet(i, j, e.target.value)} className="flex-1" />
 <Button size="icon" variant="ghost" onClick={() => removeBullet(i, j)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
 </div>)}
 <div className="flex justify-between">
 <Button size="sm" variant="outline" onClick={() => addBullet(i)}>Add Bullet</Button>
 <div className="flex gap-1">
 <Button size="icon" variant="ghost" onClick={() => moveItem("experience", i, "up")}><ArrowUp className="h-4 w-4" /></Button>
 <Button size="icon" variant="ghost" onClick={() => moveItem("experience", i, "down")}><ArrowDown className="h-4 w-4" /></Button>
 <Button size="icon" variant="ghost" onClick={() => removeExp(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
 </div>
 </div>
 </div>)}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between w-full">
 <CardTitle className={titleClass}>Education</CardTitle>
 <Button size="sm" variant="ghost" onClick={addEdu}><Plus className="h-4 w-4" /></Button>
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 {data.education.map((edu, i) => <div key={i} className="p-3 border rounded space-y-2 bg-muted/10">
 <Input placeholder="Institution" value={edu.institution} onChange={e => updateEdu(i, "institution", e.target.value)} />
 <div className="flex gap-2">
 <Input placeholder="Degree" value={edu.degree} onChange={e => updateEdu(i, "degree", e.target.value)} />
 <Input placeholder="Field" value={edu.field} onChange={e => updateEdu(i, "field", e.target.value)} />
 </div>
 <div className="flex gap-2">
 <Input placeholder="GPA" value={edu.gpa} onChange={e => updateEdu(i, "gpa", e.target.value)} />
 <Input placeholder="From" value={edu.from} onChange={e => updateEdu(i, "from", e.target.value)} />
 <Input placeholder="To" value={edu.to} onChange={e => updateEdu(i, "to", e.target.value)} />
 </div>
 <div className="flex justify-end gap-1">
 <Button size="icon" variant="ghost" onClick={() => removeEdu(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
 </div>
 </div>)}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between w-full">
 <CardTitle className={titleClass}>Skills</CardTitle>
 <Button size="sm" variant="ghost" onClick={addSkill}><Plus className="h-4 w-4" /></Button>
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-2">
 {data.skills.map((sk, i) => <div key={i} className="flex gap-2">
 <Input placeholder="Skill" value={sk.name} onChange={e => updateSkill(i, "name", e.target.value)} className="flex-1" />
 <select value={sk.level} onChange={e => updateSkill(i, "level", e.target.value)} className="border rounded px-2 bg-background text-sm">
 <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option>
 </select>
 <Button size="icon" variant="ghost" onClick={() => removeSkill(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
 </div>)}
 </CardContent>
 </GlassCard>
 </div>

 <div className="lg:sticky lg:top-20 self-start">
 <div className="flex gap-2 mb-4 flex-wrap">
 <Button variant={template === "professional" ? "default" : "outline"} size="sm" onClick={() => setTemplate("professional")}>Professional</Button>
 <Button variant={template === "modern" ? "default" : "outline"} size="sm" onClick={() => setTemplate("modern")}>Modern</Button>
 <Button variant={template === "minimal" ? "default" : "outline"} size="sm" onClick={() => setTemplate("minimal")}>Minimal</Button>
 <input type="color" value={accent} onChange={e => setAccent(e.target.value)} className="w-8 h-8 rounded cursor-pointer border" />
 <Button variant="outline" size="sm" onClick={exportHTML} className="ml-auto"><Download className="h-4 w-4 mr-1" /> Export HTML</Button>
 <Button variant="outline" size="sm" onClick={() => window.print()}><Copy className="h-4 w-4 mr-1" /> Print</Button>
 </div>

 <div id="resume-preview" className={`p-8 bg-background text-foreground rounded-lg shadow-xl min-h-[800px] ${fontClass} print:shadow-none`}>
 <header className="mb-6 border-b-2 pb-4" style={{
              borderColor: accent
            }}>
 <h1 className="text-3xl font-bold mb-1" style={{
                color: accent
              }}>{data.personal.name}</h1>
 <p className="text-lg text-gray-600 mb-2">{data.personal.title}</p>
 <div className="text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
 {data.personal.email && <span>{data.personal.email}</span>}
 {data.personal.phone && <span>{data.personal.phone}</span>}
 {data.personal.location && <span>{data.personal.location}</span>}
 {data.personal.website && <span>{data.personal.website}</span>}
 </div>
 </header>

 {data.summary && <section className="mb-6">
 <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{
                color: accent
              }}>Summary</h2>
 <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
 </section>}

 {data.experience.length > 0 && <section className="mb-6">
 <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{
                color: accent
              }}>Experience</h2>
 {data.experience.map((exp, i) => <div key={i} className="mb-4">
 <div className="flex justify-between font-bold text-sm">
 <span>{exp.role} <span className="font-normal text-gray-600">at {exp.company}</span></span>
 <span className="text-muted-foreground font-normal">{exp.from} - {exp.to}</span>
 </div>
 <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-1">
 {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
 </ul>
 </div>)}
 </section>}

 {data.education.length > 0 && <section className="mb-6">
 <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{
                color: accent
              }}>Education</h2>
 {data.education.map((edu, i) => <div key={i} className="mb-2">
 <div className="flex justify-between font-bold text-sm">
 <span>{edu.degree} {edu.field} <span className="font-normal text-gray-600">- {edu.institution}</span></span>
 <span className="text-muted-foreground font-normal">{edu.from} - {edu.to}</span>
 </div>
 {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
 </div>)}
 </section>}

 {data.skills.length > 0 && <section>
 <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{
                color: accent
              }}>Skills</h2>
 <div className="flex flex-wrap gap-2">
 {data.skills.map((sk, i) => <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border border-gray-200">{sk.name} ({sk.level})</span>)}
 </div>
 </section>}
 </div>
 </div>
 </div>

 {/* ATS SCORE CHECKER — stolen idea from Jobscan/Enhancv (free alternative to $19-25/mo paid tools) */}
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Target className="h-4 w-4 text-primary" /> ATS Score Checker</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div className="flex items-center gap-4">
 <div className="relative h-20 w-20 shrink-0">
 <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
 <path d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32" fill="none" stroke="currentColor" className="text-muted-foreground/20" strokeWidth="3" />
 <path d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32" fill="none" stroke="currentColor" className={atsScore >= 80 ? "text-green-500" : atsScore >= 60 ? "text-yellow-500" : "text-red-500"} strokeWidth="3" strokeDasharray={`${atsScore} 100`} strokeLinecap="round" />
 </svg>
 <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">{atsScore}</span>
 </div>
 <div className="text-sm">
 <p className="font-semibold">Applicant Tracking System Readiness</p>
 <p className="text-muted-foreground">{atsScore >= 80 ? "Strong — likely passes most ATS filters." : atsScore >= 60 ? "Decent — a few fixes will help." : "Needs work — improve before applying."}</p>
 </div>
 </div>

 <div>
 <Label className="text-xs text-muted-foreground">Tailor to a Job Description (optional)</Label>
 <textarea className={textareaClass} rows={2} placeholder="Paste a job description to see keyword match..." value={jobDesc} onChange={e => setJobDesc(e.target.value)} />
 {jobDesc.trim() && <div className="mt-2 text-sm">
 <span className="font-semibold">Keyword Match: </span>
 <span className={kwMatch >= 70 ? "text-green-500" : "text-yellow-500"}>{kwMatch}%</span>
 <div className="mt-1 flex flex-wrap gap-1">
 {missingKeywords.map(k => <span key={k} className="px-2 py-0.5 bg-destructive/10 text-destructive rounded text-xs">{k}</span>)}
 {missingKeywords.length === 0 && <span className="text-green-500 text-xs">All key terms present!</span>}
 </div>
 </div>}
 </div>

 <div className="space-y-1">
 <p className="text-xs font-semibold text-muted-foreground">Checks passed</p>
 {atsChecks.map((c, i) => <div key={i} className="flex items-center gap-2 text-sm">
 {c.pass ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
 <span className={c.pass ? "" : "text-muted-foreground"}>{c.label}</span>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Fill Details",
        description: "Enter your personal info, experience, education, and skills in the structured form.",
        icon: FileText
      }, {
        step: "02",
        title: "Customize",
        description: "Choose a template style, pick an accent color, and reorder your entries.",
        icon: Plus
      }, {
        step: "03",
        title: "Export",
        description: "Review the live preview and export your resume as HTML or print it directly.",
        icon: Download
      }]} />

 <ToolFeatureGuides features={[{
        icon: FileText,
        title: "Live Preview",
        description: "See exactly how your resume looks as you type, with instant updates to the formatted document."
      }, {
        icon: Plus,
        title: "Multiple Templates",
        description: "Switch between Professional (serif), Modern (sans-serif), and Minimal (monospace) styles."
      }, {
        icon: Download,
        title: "Custom Accent Colors",
        description: "Use the color picker to match your personal brand or apply a subtle, professional tint."
      }, {
        icon: ArrowUp,
        title: "Drag & Reorder",
        description: "Easily move experience entries up and down to prioritize your most relevant work history."
      }]}>
 <div className="prose dark:prose-invert max-w-none">
 <h2>Build Your Perfect Resume in Minutes</h2>
 <p>A well-crafted resume is your ticket to the interview. However, formatting it perfectly in Word or Google Docs can be a frustrating battle against margins, bullet points, and broken layouts. Our Resume Builder eliminates the formatting headache entirely, allowing you to focus on writing compelling content while the tool handles the typography and layout.</p>
 <p>The split-pane interface provides a seamless writing experience. As you input your work history, education, and skills on the left, a beautifully formatted resume updates instantly on the right. This live feedback loop ensures you never have to guess how a long job title or an extended bullet point will affect your page breaks.</p>
 <p>Whether you are applying to a traditional law firm or a cutting-edge tech startup, we have a template for you. The 'Professional' template uses classic serif fonts for established industries, while the 'Modern' sans-serif template is perfect for tech and creative roles. Developers will love the 'Minimal' monospace template. With customizable accent colors and one-click HTML export, you can maintain a consistent personal brand across all your job applications and easily print a crisp, clean PDF directly from your browser.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Is my data stored anywhere?",
        answer: "No. All your information is stored locally in your browser's memory. Once you close the tab, the data is cleared for your privacy."
      }, {
        question: "Can I print my resume as a PDF?",
        answer: "Yes! Simply click the Print button and select 'Save as PDF' as your printer destination in the browser dialog."
      }, {
        question: "Are these templates ATS friendly?",
        answer: "Yes. The underlying HTML structure is clean and semantic, ensuring Applicant Tracking Systems (ATS) can easily parse your text."
      }, {
        question: "How do I save my work for later?",
        answer: "Currently, you can export the HTML file to save it locally. You can later paste the content back into a text editor or use it as a reference."
      }]} />

 <RelatedTools currentToolUrl="/tools/text/resume-builder" max={6} />
 </div></div>;
}
export default ResumeBuilderClient;