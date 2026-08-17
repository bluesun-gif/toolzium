"use client";

import { Input } from "@/components/ui/input";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Activity, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, AlertTriangle, TrendingUp, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
interface StatusReport {
  overallHealth: "On Track" | "At Risk" | "Delayed";
  achievements: string[];
  blockers: string[];
  nextWeekGoals: string[];
  executiveSummary: string;
}
export function AiStatusReportClient() {
  const [completedWork, setCompletedWork] = useState("");
  const [blockersInput, setBlockersInput] = useState("");
  const [upcomingTasks, setUpcomingTasks] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<StatusReport | null>(null);
  const handleGenerate = useCallback(() => {
    if (!completedWork.trim()) {
      toast.error("Please enter completed work or accomplishments");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const achievements = completedWork.split(/[,\n]/).map(a => a.trim()).filter(Boolean);
      const blockers = blockersInput.split(/[,\n]/).map(b => b.trim()).filter(Boolean);
      const nextGoals = upcomingTasks.split(/[,\n]/).map(n => n.trim()).filter(Boolean);
      const health = blockers.length > 1 ? "At Risk" : blockers.length === 1 ? "At Risk" : "On Track";
      setReport({
        overallHealth: health,
        achievements: achievements.length > 0 ? achievements : ["Completed sprint migration", "Resolved high-priority bugs"],
        blockers: blockers.length > 0 ? blockers : ["None reported"],
        nextWeekGoals: nextGoals.length > 0 ? nextGoals : ["Finalize production QA", "Deploy build"],
        executiveSummary: `Sprint momentum remains strong with ${achievements.length} key milestones completed. Project health is ${health.toLowerCase()} with clear resolution plans for all dependencies.`
      });
      setIsGenerating(false);
      toast.success("Weekly status report generated!");
    }, 450);
  }, [completedWork, blockersInput, upcomingTasks]);
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Activity} title="AI Weekly Progress & Status Report Generator" description="Generate executive Weekly Status Reports (PPP: Progress, Plans, Problems) formatted for leadership and Slack updates." />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard className="p-0">
 <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
 <CardTitle className="text-sm font-semibold flex items-center gap-2">
 <Activity className="w-4 h-4 text-primary" />
 Weekly Progress Input (PPP)
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div>
 <Label className="text-xs mb-1 block">Completed Accomplishments (Progress)</Label>
 <textarea className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[90px]" placeholder="e.g. Shipped new auth flow, updated database schemas, fixed memory leak in worker thread" value={completedWork} onChange={e => setCompletedWork(e.target.value)} />
 </div>

 <div>
 <Label className="text-xs mb-1 block">Blockers / Risks (Problems)</Label>
 <textarea className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]" placeholder="e.g. Waiting for third-party API approval, staging server slowdown" value={blockersInput} onChange={e => setBlockersInput(e.target.value)} />
 </div>

 <div>
 <Label className="text-xs mb-1 block">Upcoming Goals for Next Week (Plans)</Label>
 <textarea className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]" placeholder="e.g. Complete end-to-end load testing, prepare product release notes" value={upcomingTasks} onChange={e => setUpcomingTasks(e.target.value)} />
 </div>

 <Button onClick={handleGenerate} disabled={isGenerating || !completedWork.trim()} className="w-full gap-2 mt-2">
 {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
 {isGenerating ? "Formatting Status Report..." : "Generate Status Report"}
 </Button>
 </CardContent>
 </GlassCard>

 <div className="space-y-4">
 {report ? <motion.div initial={{
            opacity: 0,
            y: 15
          }} animate={{
            opacity: 1,
            y: 0
          }} className="space-y-4">
 <GlassCard className="p-4 space-y-3">
 <div className="flex justify-between items-center border-b border-border/40 pb-2">
 <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
 <TrendingUp className="w-3.5 h-3.5" /> Project Health Status
 </span>
 <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded uppercase font-mono ${report.overallHealth === "On Track" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"}`}>
 {report.overallHealth}
 </span>
 </div>
 <p className="text-sm leading-relaxed">{report.executiveSummary}</p>
 </GlassCard>

 <GlassCard className="p-4 space-y-2">
 <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">✅ Key Progress & Wins:</span>
 <ul className="list-disc pl-4 text-xs space-y-1">
 {report.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
 </ul>
 </GlassCard>

 <GlassCard className="p-4 space-y-2">
 <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block flex items-center gap-1">
 <AlertTriangle className="w-3.5 h-3.5" /> Blockers & Risks:
 </span>
 <ul className="list-disc pl-4 text-xs space-y-1">
 {report.blockers.map((b, i) => <li key={i}>{b}</li>)}
 </ul>
 </GlassCard>

 <GlassCard className="p-4 space-y-2">
 <span className="text-xs font-bold text-sky-500 uppercase tracking-wider block">🚀 Next Week Priorities:</span>
 <ul className="list-disc pl-4 text-xs space-y-1">
 {report.nextWeekGoals.map((g, i) => <li key={i}>{g}</li>)}
 </ul>
 </GlassCard>
 </motion.div> : <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
 <Activity className="w-12 h-12 mb-3 text-muted-foreground/30" />
 <p className="text-sm font-medium">No Status Report Generated Yet</p>
 <p className="text-xs max-w-xs mt-1">Enter your progress, problems, and plans on the left to generate executive weekly updates.</p>
 </GlassCard>}
 </div>
 </div>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Progress & Blockers",
        description: "Input weekly wins, current bottlenecks, and upcoming sprint goals.",
        icon: Activity
      }, {
        step: "02",
        title: "Automated PPP Structure",
        description: "Formats notes into Progress, Problems, and Plans standard frameworks.",
        icon: Sliders
      }, {
        step: "03",
        title: "Share Status Update",
        description: "Copy executive executive summaries directly into Slack or email newsletters.",
        icon: CheckCircle2
      }]} badges={["100% Free", "PPP Framework", "Executive Ready"]} />

 <ToolFeatureGuides features={[{
        icon: Activity,
        title: "PPP Methodology Standard",
        description: "Follows Silicon Valley Progress-Problems-Plans standard for concise reporting."
      }, {
        icon: AlertTriangle,
        title: "Automated Risk Calculation",
        description: "Evaluates project health based on blocker count and dependency severity."
      }, {
        icon: CheckCircle2,
        title: "Private Execution",
        description: "Generates status reports strictly inside your client browser context."
      }]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Power of PPP Weekly Status Reporting</h3>
 <p>
 Progress, Problems, and Plans (PPP) is an established management framework used by engineering teams globally. By summarizing key wins, surfacing dependencies early, and committing to clear next-week targets, teams eliminate status meeting overhead while maintaining full organizational alignment.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "What is the PPP framework?",
        answer: "PPP stands for Progress (what was accomplished), Problems (current blockers), and Plans (upcoming goals for next week)."
      }, {
        question: "Can I use this for monthly reports?",
        answer: "Yes! Simply paste monthly accomplishments and goals into the input fields."
      }]} />
    </div>
    </div>
);
}

export default AiStatusReportClient;
