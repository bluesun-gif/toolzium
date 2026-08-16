"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { CheckCircle, FileText, ScanSearch, Search, Target, Wand2 } from"lucide-react";
import toast from"react-hot-toast";

const WEAK_WORDS = ["responsible for","team player","hard worker","detail-oriented","synergy","think outside the box","go-to person","results-driven"];

export function ResumeAnalyzerClient() {
 const [text, setText] = useState("");

 const stats = useMemo(() => {
 const words = text.trim().split(/\s+/).filter(w => w.length > 0);
 const wordCount = words.length;
 const bulletPoints = (text.match(/^[•\-\*]/gm) || []).length;
 
 let weakWordMatches: string[] = [];
 const lowerText = text.toLowerCase();
 WEAK_WORDS.forEach(word => {
 if (lowerText.includes(word)) {
 weakWordMatches.push(word);
 }
 });

 const hasEducation = /education|university|college|degree/i.test(text);
 const hasExperience = /experience|work history|employment/i.test(text);
 const hasSkills = /skills|technologies|proficiencies/i.test(text);

 return {
 wordCount,
 bulletPoints,
 weakWordMatches,
 sections: { hasEducation, hasExperience, hasSkills }
 };
 }, [text]);

 const reportText = `Resume Analysis:
Word Count: ${stats.wordCount}
Bullet Points: ${stats.bulletPoints}
Weak Words Found: ${stats.weakWordMatches.length > 0 ? stats.weakWordMatches.join(",") :"None"}
`;

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={FileText}
 title="Resume Analyzer"
 description="Paste your resume text for quick feedback on length, keywords, and structure."
 actions={<ResetButton onClick={() => setText("")} label="Reset"/>}
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard className="flex flex-col h-full">
 <CardHeader>
 <CardTitle>Resume Text</CardTitle>
 <CardDescription>Paste your resume contents below</CardDescription>
 </CardHeader>
 <CardContent className="flex-grow flex flex-col">
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 placeholder="Paste resume here..."
 className="w-full flex-grow min-h-[300px] p-4 rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
 />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row justify-between items-start">
 <div>
 <CardTitle className="flex items-center gap-2"><Search className="w-5 h-5"/> Analysis</CardTitle>
 <CardDescription>Metrics and suggestions</CardDescription>
 </div>
 <CopyButton getText={() => reportText} label="Copy Report"/>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-muted/50 p-4 rounded-lg text-center">
 <div className="text-3xl font-bold text-primary">{stats.wordCount}</div>
 <div className="text-sm text-muted-foreground">Words</div>
 <div className="text-xs mt-1">
 {stats.wordCount < 300 ?"Too short": stats.wordCount > 700 ?"Might be too long":"Optimal (400-700)"}
 </div>
 </div>
 <div className="bg-muted/50 p-4 rounded-lg text-center">
 <div className="text-3xl font-bold text-primary">{stats.bulletPoints}</div>
 <div className="text-sm text-muted-foreground">Bullet Points</div>
 </div>
 </div>

 <div>
 <h4 className="font-semibold flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-green-500"/> Section Check</h4>
 <ul className="text-sm space-y-1">
 <li className="flex justify-between">Experience <span>{stats.sections.hasExperience ?"✅ Found":"❌ Missing"}</span></li>
 <li className="flex justify-between">Education <span>{stats.sections.hasEducation ?"✅ Found":"❌ Missing"}</span></li>
 <li className="flex justify-between">Skills <span>{stats.sections.hasSkills ?"✅ Found":"❌ Missing"}</span></li>
 </ul>
 </div>

 <div>
 <h4 className="font-semibold text-orange-500 mb-2">Weak/Overused Words</h4>
 {stats.weakWordMatches.length > 0 ? (
 <div className="flex flex-wrap gap-2">
 {stats.weakWordMatches.map(w => (
 <span key={w} className="px-2 py-1 bg-orange-500/10 text-orange-500 rounded text-xs font-medium">
 {w}
 </span>
 ))}
 </div>
 ) : (
 <p className="text-sm text-muted-foreground">Good job! No common cliché words found.</p>
 )}
 </div>
 
 <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
 <h4 className="font-semibold text-primary mb-1 text-sm">ATS Tip</h4>
 <p className="text-xs text-muted-foreground">Ensure your section headers are standard (Experience, Education, Skills) and avoid tables or complex formatting which can confuse ATS systems.</p>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Paste Resume",
    description:"Add your resume text.",
    icon: FileText,
  },
{
    step:"02",
    title:"Set Target",
    description:"Enter a job description.",
    icon: Target,
  },
{
    step:"03",
    title:"Analyze",
    description:"See match and gaps.",
    icon: ScanSearch,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FileText,
    title:"Resume Input",
    description:"Your content.",
  },
{
    icon: Target,
    title:"Job Match",
    description:"Compare to role.",
  },
{
    icon: ScanSearch,
    title:"Analysis",
    description:"Keywords and gaps.",
  },
{
    icon: Wand2,
    title:"Tips",
    description:"Improvement suggestions.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A resume analyzer compares your resume to a target job, surfacing keyword gaps and weak sections that hurt applicant-tracking screening. Tailoring to the role improves callback rates. This tool scores the match and suggests fixes.</p>
  <p>Keyword alignment matters because many employers filter electronically. The analyzer reveals missing terms so you can incorporate them naturally.</p>
  <p>Use it per application. The tool's value is data-driven resume tuning that increases relevance to each role.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does it do?",
    answer:"Scores resume against a job.",
  },
{
    question:"Keyword match?",
    answer:"Yes, highlights missing terms.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Guarantee interviews?",
    answer:"No, advisory only.",
  },
{
    question:"Private?",
    answer:"Local.",
  }
  ]}
/>
</div>
 );
}
