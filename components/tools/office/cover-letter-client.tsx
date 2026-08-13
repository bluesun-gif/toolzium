"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { FileText, Eye, Copy, Download, Sparkles, Shield, Zap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function CoverLetterClient() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    hiringManager: "",
    opening: "",
    skills: "",
    experience: "",
    closing: ""
  });
  const [template, setTemplate] = useState("formal");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const generateLetter = () => {
    const {
      name,
      email,
      phone,
      companyName,
      jobTitle,
      hiringManager,
      opening,
      skills,
      experience,
      closing
    } = details;
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const manager = hiringManager || "Hiring Manager";
    let content = "";
    if (template === "formal") {
      content = `${name || "[Your Name]"}
${email || "[Your Email]"} | ${phone || "[Your Phone]"}

${date}

${manager}
${companyName || "[Company Name]"}

Dear ${manager},

I am writing to express my strong interest in the ${jobTitle || "[Job Title]"} position at ${companyName || "[Company Name]"}. ${opening || "[Opening paragraph explaining why you are interested in the role and company.]"}

${skills || "[Paragraph highlighting your relevant skills and qualifications.]"}

${experience || "[Paragraph detailing your key achievements and past experience.]"}

${closing || "[Closing paragraph expressing enthusiasm for an interview.]"}

Sincerely,

${name || "[Your Name]"}`;
    } else if (template === "modern") {
      content = `${date}

To: ${manager}, ${companyName || "[Company Name]"}
From: ${name || "[Your Name]"}
Subject: Application for ${jobTitle || "[Job Title]"}

Hello ${manager},

${opening || "[Opening paragraph]"}

Here's what I bring to the table:
${skills || "[Skills paragraph]"}

Some of my recent wins include:
${experience || "[Experience paragraph]"}

${closing || "[Closing paragraph]"}

Best,
${name || "[Your Name]"}
${email || "[Your Email]"} | ${phone || "[Your Phone]"}`;
    } else if (template === "creative") {
      content = `Hi ${manager} and the team at ${companyName || "[Company Name]"},

I'm ${name || "[Your Name]"} and I'd love to be your next ${jobTitle || "[Job Title]"}.

${opening || "[Opening paragraph]"}

My toolbox:
${skills || "[Skills paragraph]"}

My track record:
${experience || "[Experience paragraph]"}

${closing || "[Closing paragraph]"}

Cheers,
${name || "[Your Name]"}
Contact: ${email || "[Email]"} | ${phone || "[Phone]"}`;
    }
    return content;
  };
  const handleReset = () => {
    setDetails({
      name: "",
      email: "",
      phone: "",
      companyName: "",
      jobTitle: "",
      hiringManager: "",
      opening: "",
      skills: "",
      experience: "",
      closing: ""
    });
    setTemplate("formal");
  };
  const handleDownload = () => {
    const text = generateLetter();
    const blob = new Blob([text], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cover_Letter_${details.name ? details.name.replace(/\s+/g, '_') : 'Draft'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={FileText} title="Cover Letter Builder" description="Build professional cover letters with customizable templates and live preview." actions={<>
 <ActionButton onClick={handleDownload} icon={Download} label="Download .txt" />
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />
 
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Details</CardTitle>
 <CardDescription>Enter your information and letter contents.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Your Name</Label>
 <Input name="name" value={details.name} onChange={handleInputChange} placeholder="John Doe" />
 </div>
 <div className="space-y-2">
 <Label>Email</Label>
 <Input name="email" value={details.email} onChange={handleInputChange} placeholder="john@example.com" />
 </div>
 <div className="space-y-2">
 <Label>Phone</Label>
 <Input name="phone" value={details.phone} onChange={handleInputChange} placeholder="(555) 123-4567" />
 </div>
 <div className="space-y-2">
 <Label>Template</Label>
 <Select value={template} onValueChange={setTemplate}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="formal">Formal</SelectItem>
 <SelectItem value="modern">Modern</SelectItem>
 <SelectItem value="creative">Creative</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <Separator />
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Company Name</Label>
 <Input name="companyName" value={details.companyName} onChange={handleInputChange} placeholder="Acme Corp" />
 </div>
 <div className="space-y-2">
 <Label>Job Title</Label>
 <Input name="jobTitle" value={details.jobTitle} onChange={handleInputChange} placeholder="Software Engineer" />
 </div>
 <div className="space-y-2 col-span-2">
 <Label>Hiring Manager Name (optional)</Label>
 <Input name="hiringManager" value={details.hiringManager} onChange={handleInputChange} placeholder="Jane Smith" />
 </div>
 </div>

 <Separator />
 
 <div className="space-y-4">
 <div className="space-y-2">
 <Label>Opening</Label>
 <Textarea name="opening" value={details.opening} onChange={handleInputChange} placeholder="Why you are interested in this role..." rows={2} />
 </div>
 <div className="space-y-2">
 <Label>Skills</Label>
 <Textarea name="skills" value={details.skills} onChange={handleInputChange} placeholder="Your relevant skills..." rows={2} />
 </div>
 <div className="space-y-2">
 <Label>Experience & Achievements</Label>
 <Textarea name="experience" value={details.experience} onChange={handleInputChange} placeholder="Your key achievements..." rows={2} />
 </div>
 <div className="space-y-2">
 <Label>Closing</Label>
 <Textarea name="closing" value={details.closing} onChange={handleInputChange} placeholder="Concluding thoughts..." rows={2} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle className="flex items-center gap-2">
 <Eye className="w-5 h-5" /> Live Preview
 </CardTitle>
 <CardDescription>Preview of your generated cover letter.</CardDescription>
 </div>
 <CopyButton getText={generateLetter} label="Copy Letter" />
 </CardHeader>
 <CardContent>
 <div className="bg-muted/30 p-6 rounded-md whitespace-pre-wrap font-serif text-sm min-h-[500px] border">
 {generateLetter()}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Cover Letter Builder?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Cover Letter Builder provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/office/cover-letter" max={6} />

    </div></div>;
}