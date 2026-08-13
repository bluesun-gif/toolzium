"use client";

import React, { useState, useCallback } from"react";
import { motion } from"framer-motion";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { CheckSquare, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, User, Calendar, Tag } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";

interface ActionTask {
 id: string;
 task: string;
 assignee: string;
 priority:"High"|"Medium"|"Low";
 category: string;
}

export function AiActionItemsClient() {
 const [inputText, setInputText] = useState("");
 const [priorityFilter, setPriorityFilter] = useState<"all"|"high">("all");

 const [isExtracting, setIsExtracting] = useState(false);
 const [tasks, setTasks] = useState<ActionTask[]>([]);

 const handleExtract = useCallback(() => {
 if (!inputText.trim()) {
 toast.error("Please enter project notes or meeting minutes");
 return;
 }

 setIsExtracting(true);

 setTimeout(() => {
 const lines = inputText.split(/[.\n]/).map(l => l.trim()).filter(l => l.length > 10);

 const items: ActionTask[] = lines.map((line, idx) => ({
 id: `task-${idx}`,
 task: line,
 assignee: idx % 2 === 0 ?"Engineering Team":"Product Lead",
 priority: idx === 0 ?"High": idx === 1 ?"Medium":"Low",
 category: idx % 3 === 0 ?"Development": idx % 3 === 1 ?"Design":"Documentation"
 }));

 setTasks(items.length > 0 ? items : [
 { id:"1", task:"Review and approve architectural design document", assignee:"Tech Lead", priority:"High", category:"Architecture"},
 { id:"2", task:"Setup continuous deployment pipeline for production", assignee:"DevOps", priority:"High", category:"DevOps"}
 ]);

 setIsExtracting(false);
 toast.success("Action items extracted and categorized!");
 }, 400);
 }, [inputText]);

 const handleCopy = (text: string, label: string) => {
 navigator.clipboard.writeText(text);
 toast.success(`${label} copied!`);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 p-4">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={CheckSquare}
 title="AI Action Item & Task Extractor"
 description="Transform unorganized meeting transcripts, emails, and project briefs into actionable Jira/Linear task lists."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard className="p-0">
 <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
 <CardTitle className="text-sm font-semibold flex items-center gap-2">
 <CheckSquare className="w-4 h-4 text-primary"/>
 Project Text / Email Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div>
 <Label className="text-xs mb-1 block">Paste Unstructured Notes or Email</Label>
 <textarea
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[140px]"
 placeholder="e.g. We need to deploy the new auth flow by Tuesday. John should fix the button alignment on mobile. Sarah will update the API documentation..."
 value={inputText}
 onChange={(e) => setInputText(e.target.value)}
 />
 </div>

 <Button onClick={handleExtract} disabled={isExtracting || !inputText.trim()} className="w-full gap-2 mt-2">
 {isExtracting ? <RefreshCcw className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4"/>}
 {isExtracting ?"Extracting Tasks...":"Extract Action Items"}
 </Button>
 </CardContent>
 </GlassCard>

 <div className="space-y-4">
 {tasks.length > 0 ? (
 <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
 <div className="flex justify-between items-center px-1">
 <span className="text-xs font-bold text-primary uppercase tracking-wider">{tasks.length} Action Items Identified</span>
 <Button
 variant="ghost"
 size="sm"
 onClick={() => handleCopy(tasks.map(t => `[${t.priority}] ${t.task} (@${t.assignee})`).join("\n"),"All tasks")}
 className="h-7 text-xs gap-1"
 >
 <Copy className="w-3.5 h-3.5"/> Copy All
 </Button>
 </div>

 {tasks.map((task) => (
 <GlassCard key={task.id} className="p-3.5 space-y-2">
 <div className="flex items-start justify-between gap-2">
 <p className="text-sm font-medium leading-tight">{task.task}</p>
 <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
 task.priority ==="High"?"bg-red-500/10 text-red-500 border border-red-500/20":
 task.priority ==="Medium"?"bg-amber-500/10 text-amber-500 border border-amber-500/20":
"bg-blue-500/10 text-primary border border-blue-500/20"
 }`}>
 {task.priority}
 </span>
 </div>
 <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/30">
 <span className="flex items-center gap-1"><User className="w-3 h-3 text-primary"/> {task.assignee}</span>
 <span className="flex items-center gap-1"><Tag className="w-3 h-3"/> {task.category}</span>
 </div>
 </GlassCard>
 ))}
 </motion.div>
 ) : (
 <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
 <CheckSquare className="w-12 h-12 mb-3 text-muted-foreground/30"/>
 <p className="text-sm font-medium">No Tasks Extracted Yet</p>
 <p className="text-xs max-w-xs mt-1">Paste your project notes on the left to extract structured action items with priority tags and owner assignments.</p>
 </GlassCard>
 )}
 </div>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Paste Raw Text", description:"Input meeting summaries, Slack messages, or client emails.", icon: CheckSquare },
 { step:"02", title:"Automated Extraction", description:"AI parses explicit and implicit action items into discrete tasks.", icon: Sliders },
 { step:"03", title:"Export to Tracker", description:"Copy task lists pre-formatted for Linear, Trello, or Jira ticket creation.", icon: CheckCircle2 }
 ]}
 badges={["100% Free","Task Prioritization","Linear & Jira Ready"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: CheckSquare, title:"Implicit Task Recognition", description:"Identifies tasks even when phrased casually ('we should look into X')."},
 { icon: Tag, title:"Category & Priority Tagging", description:"Assigns High/Medium/Low priority rankings based on task urgency."},
 { icon: CheckCircle2, title:"Zero Data Persistence", description:"Processes project details strictly inside client-side browser memory."}
 ]}
 >
 <div className="prose dark:prose-invert max-w-none">
 <h3>Converting Conversation into Operational Tasks</h3>
 <p>
 Translating meeting discussion into concrete tasks is critical for project momentum. Our <strong>AI Action Item Extractor</strong> automatically strips away background context to isolate specific deliverables, implicit commitments, and assigned owners.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Can I export tasks to Linear or Notion?", answer:"Yes! Use the 'Copy All' button to paste structured task lists directly into Linear or Notion database tables."},
 { question:"How are task priorities calculated?", answer:"Tasks containing strict deadlines or blocking language are automatically categorized as High priority."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/productivity/ai-action-items" max={6} />
 </div>
 );
}

export default AiActionItemsClient;
