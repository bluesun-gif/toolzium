"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { FileText, Eye, Download, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export function ResumeBuilderClient() {
  const [personal, setPersonal] = useState({ name: "", email: "", phone: "", linkedin: "", website: "", summary: "" });
  const [experience, setExperience] = useState([{ company: "", role: "", dates: "", bullets: "" }]);
  const [education, setEducation] = useState([{ school: "", degree: "", dates: "", details: "" }]);
  const [skills, setSkills] = useState("");

  const generateMarkdown = () => {
    let md = "";
    if (personal.name) md += `# ${personal.name}\n\n`;
    const contact = [personal.email, personal.phone, personal.linkedin, personal.website].filter(Boolean).join(" | ");
    if (contact) md += `${contact}\n\n`;
    if (personal.summary) md += `## Summary\n${personal.summary}\n\n`;
    
    if (experience.some(e => e.company || e.role)) {
      md += `## Experience\n\n`;
      experience.forEach(e => {
        if (e.company || e.role) {
          md += `### ${e.role ? e.role + " at " : ""}${e.company}\n`;
          if (e.dates) md += `*${e.dates}*\n\n`;
          if (e.bullets) {
            e.bullets.split("\n").filter(b => b.trim()).forEach(b => {
              md += `- ${b}\n`;
            });
            md += "\n";
          }
        }
      });
    }

    if (education.some(e => e.school || e.degree)) {
      md += `## Education\n\n`;
      education.forEach(e => {
        if (e.school || e.degree) {
          md += `### ${e.degree ? e.degree + ", " : ""}${e.school}\n`;
          if (e.dates) md += `*${e.dates}*\n\n`;
          if (e.details) md += `${e.details}\n\n`;
        }
      });
    }

    if (skills) {
      md += `## Skills\n\n`;
      md += skills.split(",").map(s => s.trim()).filter(Boolean).join(", ") + "\n";
    }

    return md;
  };

  const handleDownload = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Resume downloaded successfully!");
  };

  const handleReset = () => {
    setPersonal({ name: "", email: "", phone: "", linkedin: "", website: "", summary: "" });
    setExperience([{ company: "", role: "", dates: "", bullets: "" }]);
    setEducation([{ school: "", degree: "", dates: "", details: "" }]);
    setSkills("");
    toast.success("Reset all fields");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={FileText}
        title="Markdown Resume Builder"
        description="Build a professional resume in markdown format with live preview."
        actions={
          <>
            <ActionButton onClick={handleDownload} icon={Download} label="Download .md" />
            <CopyButton getText={generateMarkdown} label="Copy MD" />
            <ResetButton onClick={handleReset} label="Reset" />
          </>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Resume Details</CardTitle>
            <CardDescription>Enter your information below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 h-[800px] overflow-y-auto pr-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Personal Info</h3>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={personal.name} onChange={e => setPersonal({...personal, name: e.target.value})} placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={personal.email} onChange={e => setPersonal({...personal, email: e.target.value})} placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} placeholder="(555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Professional Summary</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={personal.summary} 
                  onChange={e => setPersonal({...personal, summary: e.target.value})} 
                  placeholder="Brief summary..." 
                />
              </div>
            </div>

            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Experience</h3>
                <Button variant="outline" size="sm" onClick={() => setExperience([...experience, { company: "", role: "", dates: "", bullets: "" }])}>
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
              {experience.map((exp, idx) => (
                <div key={idx} className="p-4 border rounded-md space-y-3 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-destructive" onClick={() => setExperience(experience.filter((_, i) => i !== idx))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input value={exp.company} onChange={e => { const newExp = [...experience]; newExp[idx].company = e.target.value; setExperience(newExp); }} placeholder="Acme Corp" />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input value={exp.role} onChange={e => { const newExp = [...experience]; newExp[idx].role = e.target.value; setExperience(newExp); }} placeholder="Software Engineer" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Dates</Label>
                    <Input value={exp.dates} onChange={e => { const newExp = [...experience]; newExp[idx].dates = e.target.value; setExperience(newExp); }} placeholder="Jan 2020 - Present" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bullets (One per line)</Label>
                    <textarea 
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      value={exp.bullets} 
                      onChange={e => { const newExp = [...experience]; newExp[idx].bullets = e.target.value; setExperience(newExp); }} 
                      placeholder="Developed key features..." 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Education</h3>
                <Button variant="outline" size="sm" onClick={() => setEducation([...education, { school: "", degree: "", dates: "", details: "" }])}>
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 border rounded-md space-y-3 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-destructive" onClick={() => setEducation(education.filter((_, i) => i !== idx))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>School</Label>
                      <Input value={edu.school} onChange={e => { const newEdu = [...education]; newEdu[idx].school = e.target.value; setEducation(newEdu); }} placeholder="University of Tech" />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input value={edu.degree} onChange={e => { const newEdu = [...education]; newEdu[idx].degree = e.target.value; setEducation(newEdu); }} placeholder="BS Computer Science" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Dates</Label>
                    <Input value={edu.dates} onChange={e => { const newEdu = [...education]; newEdu[idx].dates = e.target.value; setEducation(newEdu); }} placeholder="2016 - 2020" />
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Skills</h3>
              <div className="space-y-2">
                <Label>Comma separated skills</Label>
                <textarea 
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={skills} 
                  onChange={e => setSkills(e.target.value)} 
                  placeholder="JavaScript, React, Node.js" 
                />
              </div>
            </div>

          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" /> Live Preview</CardTitle>
            <CardDescription>Markdown output</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="p-4 rounded-lg bg-muted text-sm overflow-auto h-[800px] whitespace-pre-wrap font-mono">
              {generateMarkdown() || "Your markdown will appear here..."}
            </pre>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
