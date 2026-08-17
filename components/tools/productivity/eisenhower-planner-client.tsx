"use client";

import { cn } from "@/lib/utils";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { ArrowRightLeft, CalendarRange, CheckSquare, Download, Grid, Grid2x2, ListPlus, Plus, Trash2, TrendingUp } from"lucide-react";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import toast from"react-hot-toast";

type QuadrantType ="q1"|"q2"|"q3"|"q4";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  quadrant: QuadrantType;
}
export function EisenhowerPlannerClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTexts, setNewTaskTexts] = useState<Record<QuadrantType, string>>({
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  });
  useEffect(() => {
    const saved = localStorage.getItem("eisenhowerTasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("eisenhowerTasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (quadrant: QuadrantType) => {
    const text = newTaskTexts[quadrant].trim();
    if (!text) return;
    const newTask: Task = {
      id: Date.now().toString() + Math.random().toString(),
      text,
      completed: false,
      quadrant
    };
    setTasks([...tasks, newTask]);
    setNewTaskTexts({
      ...newTaskTexts,
      [quadrant]: ""
    });
    toast.success("Task added");
  };
  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      completed: !t.completed
    } : t));
  };
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };
  const moveTask = (id: string, newQuadrant: QuadrantType) => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      quadrant: newQuadrant
    } : t));
  };
  const clearCompleted = () => {
    const remaining = tasks.filter(t => !t.completed);
    setTasks(remaining);
    toast.success("Completed tasks cleared");
  };
  const exportTasks = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eisenhower-tasks.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Tasks exported");
  };
  const Quadrant = ({
    type,
    title,
    subtitle,
    color,
    bgClass
  }: {
    type: QuadrantType;
    title: string;
    subtitle: string;
    color: string;
    bgClass: string;
  }) => {
    const quadrantTasks = tasks.filter(t => t.quadrant === type);
    return <GlassCard className={cn("flex flex-col h-full border-t-4", color)}>
 <CardHeader className={cn("pb-2", bgClass)}>
 <div className="flex justify-between items-center">
 <div>
 <CardTitle className="text-lg">{title}</CardTitle>
 <CardDescription className="text-xs">{subtitle}</CardDescription>
 </div>
 <span className="bg-background/80 px-2 py-1 rounded text-xs font-bold">{quadrantTasks.length} tasks</span>
 </div>
 </CardHeader>
 <CardContent className="flex-1 flex flex-col pt-4 gap-4">
 <div className="flex gap-2">
 <Input placeholder="Add task..." value={newTaskTexts[type]} onChange={e => setNewTaskTexts({
            ...newTaskTexts,
            [type]: e.target.value
          })} onKeyDown={e => e.key === 'Enter' && addTask(type)} className="h-8 text-sm" />
 <Button size="sm" onClick={() => addTask(type)} className="h-8 px-2"><Plus className="h-4 w-4" /></Button>
 </div>
 
 <div className="flex-1 overflow-y-auto space-y-2 max-h-[300px] pr-1">
 {quadrantTasks.length === 0 ? <p className="text-xs text-muted-foreground italic text-center py-4">No tasks yet</p> : quadrantTasks.map(task => <div key={task.id} className={cn("flex items-start gap-2 p-2 rounded-md border text-sm group", task.completed ? "bg-muted/50" : "bg-card")}>
 <Button onClick={() => toggleTask(task.id)} className="mt-0.5 text-muted-foreground hover:text-primary shrink-0">
 {task.completed ? <CheckSquare className="h-4 w-4 text-primary" /> : <div className="h-4 w-4 border rounded-sm" />}
 </Button>
 <span className={cn("flex-1 break-words", task.completed ? "line-through text-muted-foreground" : "")}>
 {task.text}
 </span>
 <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
 <select className="text-xs bg-transparent border rounded px-1 h-6 outline-none" value={type} onChange={e => moveTask(task.id, e.target.value as QuadrantType)}>
 <option value="q1">Q1</option>
 <option value="q2">Q2</option>
 <option value="q3">Q3</option>
 <option value="q4">Q4</option>
 </select>
 <Button onClick={() => deleteTask(task.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
 <Trash2 className="h-3 w-3" />
 </Button>
 </div>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Grid} title="Eisenhower Matrix Planner" description="Organize your tasks by urgency and importance to maximize your productivity." actions={<div className="flex gap-2">
 <ActionButton onClick={clearCompleted} icon={CheckSquare} label="Clear Done" variant="outline" size="default" />
 <ActionButton onClick={exportTasks} icon={Download} label="Export" variant="outline" size="default" />
 <ResetButton onClick={() => setTasks([])} label="Clear All" />
 </div>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <Quadrant type="q1" title="Q1: DO FIRST" subtitle="Urgent & Important" color="border-red-500" bgClass="bg-red-500/10" />
 <Quadrant type="q2" title="Q2: SCHEDULE" subtitle="Not Urgent & Important" color="border-blue-500" bgClass="bg-blue-500/10" />
 <Quadrant type="q3" title="Q3: DELEGATE" subtitle="Urgent & Not Important" color="border-yellow-500" bgClass="bg-yellow-500/10" />
 <Quadrant type="q4" title="Q4: ELIMINATE" subtitle="Not Urgent & Not Important" color="border-gray-500" bgClass="bg-gray-500/10" />
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Capture",
    description:"List tasks.",
    icon: ListPlus,
  },
{
    step:"02",
    title:"Classify",
    description:"Urgent vs important.",
    icon: Grid2x2,
  },
{
    step:"03",
    title:"Plan",
    description:"Schedule and act.",
    icon: CalendarRange,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListPlus,
    title:"Capture",
    description:"All tasks.",
  },
{
    icon: Grid2x2,
    title:"Matrix",
    description:"Two axes.",
  },
{
    icon: CalendarRange,
    title:"Schedule",
    description:"Time important work.",
  },
{
    icon: TrendingUp,
    title:"Review",
    description:"Weekly check.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An Eisenhower planner pairs the matrix with scheduling, so classified tasks get time on the calendar. Classification without booking still lets important work slip. This tool closes that loop.</p>
  <p>The habit of scheduling the important box is the differentiator. The planner makes it a step, not an afterthought.</p>
  <p>Use it in reviews. The tool's value is matrix plus calendar in one flow.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Planner style?",
    answer:"Matrix with scheduling.",
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
    question:"Cadence?",
    answer:"Weekly.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default EisenhowerPlannerClient;
