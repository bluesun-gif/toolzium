"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ArrowRightLeft, CheckCircle2, CheckSquare, Download, Grid2x2, ListPlus, Plus } from"lucide-react";
import toast from"react-hot-toast";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";

type Task = {
  id: string;
  title: string;
  owner: string;
  time: string;
  urgency: number;
  importance: number;
  quadrant: "do" | "schedule" | "delegate" | "eliminate";
};
export function PriorityActionPlannerClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [time, setTime] = useState("");
  const [urgency, setUrgency] = useState<number>(3);
  const [importance, setImportance] = useState<number>(3);
  useEffect(() => {
    const saved = localStorage.getItem("priorityPlannerTasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("priorityPlannerTasks", JSON.stringify(tasks));
  }, [tasks]);
  const determineQuadrant = (u: number, i: number): Task["quadrant"] => {
    if (u >= 3 && i >= 3) return "do";
    if (u < 3 && i >= 3) return "schedule";
    if (u >= 3 && i < 3) return "delegate";
    return "eliminate";
  };
  const addTask = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      owner,
      time,
      urgency,
      importance,
      quadrant: determineQuadrant(urgency, importance)
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setOwner("");
    setTime("");
    toast.success("Task added");
  };
  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };
  const exportMarkdown = () => {
    let md = "# Priority Matrix Action Planner\n\n";
    const quadrants: Record<Task["quadrant"], string> = {
      do: "Do Today (Urgent & Important)",
      schedule: "Schedule (Not Urgent & Important)",
      delegate: "Delegate (Urgent & Not Important)",
      eliminate: "Eliminate (Not Urgent & Not Important)"
    };
    (Object.keys(quadrants) as Task["quadrant"][]).forEach(q => {
      md += "##" + quadrants[q] + "\n";
      const qTasks = tasks.filter(t => t.quadrant === q);
      if (qTasks.length === 0) {
        md += "- No tasks\n";
      } else {
        qTasks.forEach(t => {
          md += "- [ ]" + t.title + (t.owner ? "(@" + t.owner + ")" : "") + (t.time ? "[" + t.time + "]" : "") + "\n";
        });
      }
      md += "\n";
    });
    return md;
  };
  const downloadMarkdown = () => {
    const md = exportMarkdown();
    const blob = new Blob([md], {
      type: "text/markdown"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "priority-plan.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded plan");
  };
  const renderQuadrant = (q: Task["quadrant"], title: string, colorClass: string) => {
    const qTasks = tasks.filter(t => t.quadrant === q);
    return <div className={cn("p-4 rounded-xl border", colorClass)}>
      <ToolBackground />

 <h3 className="font-semibold mb-3 flex items-center gap-2">
 {title} <span className="text-xs bg-background/50 px-2 py-0.5 rounded-full">{qTasks.length}</span>
 </h3>
 <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
 {qTasks.map(t => <div key={t.id} className="bg-background/80 p-3 rounded-lg border text-sm flex justify-between group">
 <div>
 <p className="font-medium">{t.title}</p>
 <div className="text-xs text-muted-foreground mt-1 flex gap-2">
 {t.owner && <span>👤 {t.owner}</span>}
 {t.time && <span>⏱️ {t.time}</span>}
 </div>
 </div>
 <Button onClick={() => removeTask(t.id)} className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity">✕</Button>
 </div>)}
 {qTasks.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">No tasks</p>}
 </div>
 </div>;
  };
  return <div className="relative space-y-6">
 <ToolPageHeader icon={CheckSquare} title="Priority Matrix Action Planner" description="Eisenhower Priority Matrix planner. Organize tasks by urgency and importance." actions={<>
 <ActionButton onClick={downloadMarkdown} icon={Download} label="Export MD" />
 <ResetButton onClick={() => setTasks([])} label="Clear All" />
 </>} />

 <div className="grid lg:grid-cols-3 gap-6">
 <GlassCard className="lg:col-span-1">
 <CardHeader>
 <CardTitle>Add Task</CardTitle>
 <CardDescription>Scores (1-5) determine quadrant</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Task Title</Label>
 <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to be done?" />
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Owner (Opt)</Label>
 <Input value={owner} onChange={e => setOwner(e.target.value)} placeholder="Who?" />
 </div>
 <div className="space-y-2">
 <Label>Time (Opt)</Label>
 <Input value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 30m" />
 </div>
 </div>

 <div className="space-y-2 pt-2">
 <div className="flex justify-between">
 <Label>Urgency (1=Low, 5=High)</Label>
 <span className="text-sm font-bold text-primary">{urgency}</span>
 </div>
 <input type="range" min="1" max="5" value={urgency} onChange={e => setUrgency(Number(e.target.value))} className="w-full accent-primary" />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Importance (1=Low, 5=High)</Label>
 <span className="text-sm font-bold text-primary">{importance}</span>
 </div>
 <input type="range" min="1" max="5" value={importance} onChange={e => setImportance(Number(e.target.value))} className="w-full accent-primary" />
 </div>

 <Button onClick={addTask} className="w-full mt-4">
 <Plus className="w-4 h-4 mr-2" /> Add Task
 </Button>
 </CardContent>
 </GlassCard>

 <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
 {renderQuadrant("do", "Do Today (Urgent, Important)", "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400")}
 {renderQuadrant("schedule", "Schedule (Not Urgent, Important)", "bg-blue-500/10 border-blue-500/20 text-primary")}
 {renderQuadrant("delegate", "Delegate (Urgent, Not Important)", "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400")}
 {renderQuadrant("eliminate", "Eliminate (Not Urgent, Not Important)", "bg-stone-500/10 border-stone-500/20 text-stone-700 dark:text-stone-400")}
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Tasks",
    description:"List what needs doing.",
    icon: ListPlus,
  },
{
    step:"02",
    title:"Prioritize",
    description:"Sort by impact and effort.",
    icon: Grid2x2,
  },
{
    step:"03",
    title:"Act",
    description:"Work top priorities.",
    icon: CheckCircle2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListPlus,
    title:"Tasks",
    description:"Capture all.",
  },
{
    icon: Grid2x2,
    title:"Matrix",
    description:"Impact by effort.",
  },
{
    icon: CheckCircle2,
    title:"Act",
    description:"On the vital few.",
  },
{
    icon: ArrowRightLeft,
    title:"Re-sort",
    description:"Adjust easily.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A priority action planner sorts tasks by impact and effort so you spend energy where it matters, not just where it is easy. High-impact, low-effort items are quick wins; the matrix surfaces them. This tool helps you act on the vital few.</p>
  <p>Effort-aware planning prevents burnout from low-value grind. The planner makes the trade-off explicit before you commit.</p>
  <p>Use it in planning sessions. The tool's value is effort-aware prioritization that protects your best energy.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Matrix basis?",
    answer:"Impact versus effort.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  },
{
    question:"Use case?",
    answer:"Planning.",
  },
{
    question:"Best with?",
    answer:"Weekly review.",
  }
  ]}
/>
</div>
 );
}
