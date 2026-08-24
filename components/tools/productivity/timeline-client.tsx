"use client";

import toast from "react-hot-toast";
import { ResetButton } from "@/components/shared/action-buttons";
import { Badge } from "@/components/ui/badge";

import { ToolBackground } from "@/components/shared/tool-background";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Separator } from"@/components/ui/separator";
import { ActionButton, CopyButton } from"@/components/shared/action-buttons";
import { ArrowDown, ArrowUp, BarChart3, Calendar, CalendarRange, Copy, Flag, GanttChart, GitCommitVertical, Plus, Trash2, Grid } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from"@/lib/utils";

type TaskStatus ="Not Started"|"In Progress"|"Complete";

interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
  status: TaskStatus;
}
const DEFAULT_TASKS: Task[] = [{
  id: "1",
  name: "Requirements & Discovery",
  startDate: "2026-08-01",
  endDate: "2026-08-07",
  color: "#3b82f6",
  status: "Complete"
}, {
  id: "2",
  name: "UI & UX Design Phase",
  startDate: "2026-08-05",
  endDate: "2026-08-15",
  color: "#ec4899",
  status: "In Progress"
}, {
  id: "3",
  name: "Backend API Integration",
  startDate: "2026-08-12",
  endDate: "2026-08-25",
  color: "#10b981",
  status: "In Progress"
}, {
  id: "4",
  name: "QA & Deployment",
  startDate: "2026-08-20",
  endDate: "2026-08-30",
  color: "#f59e0b",
  status: "Not Started"
}];
export function TimelineClient() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskStart, setNewTaskStart] = useState("2026-08-15");
  const [newTaskEnd, setNewTaskEnd] = useState("2026-08-28");
  const [newTaskColor, setNewTaskColor] = useState("#3b82f6");
  useEffect(() => {
    const saved = localStorage.getItem("timeline-tasks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setTasks(parsed);
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("timeline-tasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = () => {
    if (!newTaskName.trim() || !newTaskStart || !newTaskEnd) {
      toast.error("Please enter task name, start date, and end date.");
      return;
    }
    if (new Date(newTaskStart) > new Date(newTaskEnd)) {
      toast.error("Start date must be before end date.");
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(),
      name: newTaskName.trim(),
      startDate: newTaskStart,
      endDate: newTaskEnd,
      color: newTaskColor,
      status: "Not Started"
    };
    setTasks([...tasks, newTask]);
    setNewTaskName("");
    toast.success("Task added to timeline!");
  };
  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.success("Task removed.");
  };
  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      status
    } : t));
  };
  const moveTask = (index: number, direction: 1 | -1) => {
    if (index + direction < 0 || index + direction >= tasks.length) return;
    const newTasks = [...tasks];
    const temp = newTasks[index];
    newTasks[index] = newTasks[index + direction];
    newTasks[index + direction] = temp;
    setTasks(newTasks);
  };
  const handleReset = () => {
    setTasks(DEFAULT_TASKS);
    toast.success("Reset timeline to defaults!");
  };

  // Timeline calculations
  const allDates = tasks.flatMap(t => [new Date(t.startDate).getTime(), new Date(t.endDate).getTime()]);
  const minDate = allDates.length ? new Date(Math.min(...allDates)) : new Date();
  const maxDate = allDates.length ? new Date(Math.max(...allDates)) : new Date();
  minDate.setDate(minDate.getDate() - 2);
  maxDate.setDate(maxDate.getDate() + 2);
  const totalDays = Math.max(1, Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)));
  const getTaskStyle = (task: Task) => {
    const start = new Date(task.startDate).getTime();
    const end = new Date(task.endDate).getTime();
    const leftPercent = (start - minDate.getTime()) / (maxDate.getTime() - minDate.getTime()) * 100;
    const widthPercent = Math.max(1.5, (end - start) / (maxDate.getTime() - minDate.getTime()) * 100);
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`,
      backgroundColor: task.color
    };
  };
  const completedTasks = tasks.filter(t => t.status === "Complete").length;
  const progressPercentage = tasks.length ? Math.round(completedTasks / tasks.length * 100) : 0;
  const getSummaryText = () => {
    if (tasks.length === 0) return "No tasks to summarize.";
    let summary = "Project Timeline Summary\n";
    summary += `Progress: ${progressPercentage}%\n\n`;
    tasks.forEach(t => {
      summary += `- ${t.name} (${t.status}): ${t.startDate} to ${t.endDate}\n`;
    });
    return summary;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

      <ToolPageHeader icon={BarChart3} title="Project Timeline & Gantt Chart Studio" description="Visualize and manage your project tasks in an interactive Gantt-style timeline with progress tracking." actions={<div className="flex flex-wrap items-center gap-2">
            <CopyButton getText={getSummaryText} label="Copy Summary" />
            <ResetButton onClick={handleReset} label="Reset Timeline" />
          </div>} />

      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT ADD TASK FORM */}
        <GlassCard className="md:col-span-1 space-y-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="w-5 h-5 text-primary" /> Add Timeline Task
            </CardTitle>
            <CardDescription>Specify task duration and color badge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="t-name">Task Name</Label>
              <Input id="t-name" value={newTaskName} onChange={e => setNewTaskName(e.target.value)} placeholder="e.g. Design Phase..." className="h-11 font-medium" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-start">Start Date</Label>
              <Input id="t-start" type="date" value={newTaskStart} onChange={e => setNewTaskStart(e.target.value)} className="h-11 text-xs" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-end">End Date</Label>
              <Input id="t-end" type="date" value={newTaskEnd} onChange={e => setNewTaskEnd(e.target.value)} className="h-11 text-xs" />
            </div>
            <div className="space-y-2">
              <Label>Color Badge</Label>
              <div className="flex items-center gap-3">
                <Input type="color" value={newTaskColor} onChange={e => setNewTaskColor(e.target.value)} className="w-12 h-10 p-1 cursor-pointer" />
                <span className="text-xs font-mono font-bold uppercase text-foreground">{newTaskColor}</span>
              </div>
            </div>
            <Button onClick={addTask} className="w-full h-11 font-bold gap-2">
              <Plus className="w-4 h-4" /> Add Task to Timeline
            </Button>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Project Metrics</Label>
              <div className="text-xs space-y-1.5 p-3 rounded-xl bg-muted/20 border border-border/60">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Tasks:</span>
                  <span className="font-bold text-foreground">{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project Duration:</span>
                  <span className="font-bold text-foreground">{totalDays} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completion Rate:</span>
                  <span className="font-bold text-primary">{progressPercentage}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader>
 <CardTitle>Timeline</CardTitle>
 </CardHeader>
 <CardContent>
 {tasks.length === 0 ? (
 <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
 <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50"/>
 <p>No tasks added yet.</p>
 <p className="text-sm">Add a task on the left to see the timeline.</p>
 </div>
 ) : (
 <div className="space-y-6">
 <div className="relative border rounded-lg p-4 overflow-x-auto min-h-[300px]">
 {/* Grid Lines */}
 <div className="absolute inset-y-0 left-4 right-4 flex justify-between pointer-events-none opacity-20">
 {Array.from({ length: 5 }).map((_, i) => (
 <div key={i} className="w-px h-full bg-border"/>
 ))}
 </div>
 
 {/* Header Dates */}
 <div className="flex justify-between text-xs text-muted-foreground mb-4 relative z-10">
 <span>{minDate.toLocaleDateString()}</span>
 <span>{maxDate.toLocaleDateString()}</span>
 </div>
 
 {/* Timeline Bars */}
 <div className="space-y-4 relative z-10">
 {tasks.map(task => (
 <div key={task.id} className="relative h-8 group">
 <div 
 className="absolute h-full rounded-md shadow-sm transition-all duration-300 flex items-center px-2 text-xs text-white font-medium overflow-hidden whitespace-nowrap"
 style={getTaskStyle(task)}
 title={task.name +"("+ task.startDate +"to"+ task.endDate +")"}
 >
 {task.name}
 </div>
 </div>
 ))}
 </div>
 </div>
 
 <Separator />
 
 <div className="space-y-3">
 <h3 className="font-medium text-sm">Task List</h3>
 {tasks.map((task, index) => (
 <div key={task.id} className="flex flex-wrap items-center gap-3 p-3 bg-card border rounded-lg text-sm hover:bg-accent/5 transition-colors">
 <div 
 className="w-3 h-3 rounded-full flex-shrink-0"
 style={{ backgroundColor: task.color }}
 />
 <div className="flex-1 font-medium min-w-[120px]">{task.name}</div>
 <div className="text-muted-foreground text-xs min-w-[150px]">
 {task.startDate} to {task.endDate}
 </div>
 
 <div className="flex items-center gap-2 ml-auto">
 <Select 
 value={task.status} 
 onValueChange={(val: TaskStatus) => updateTaskStatus(task.id, val)}
 >
 <SelectTrigger className="w-[130px] h-8 text-xs">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="Not Started">Not Started</SelectItem>
 <SelectItem value="In Progress">In Progress</SelectItem>
 <SelectItem value="Complete">Complete</SelectItem>
 </SelectContent>
 </Select>
 
 <div className="flex flex-col gap-0.5">
 <Button 
 variant="ghost"
 size="icon"
 className="h-4 w-6 p-0"
 onClick={() => moveTask(index, -1)}
 disabled={index === 0}
 >
 <ArrowUp className="w-3 h-3"/>
 </Button>
 <Button 
 variant="ghost"
 size="icon"
 className="h-4 w-6 p-0"
 onClick={() => moveTask(index, 1)}
 disabled={index === tasks.length - 1}
 >
 <ArrowDown className="w-3 h-3"/>
 </Button>
 </div>
 
 <Button 
 variant="ghost"
 size="icon"
 className="h-8 w-8 text-destructive hover:bg-destructive/10"
 onClick={() => removeTask(task.id)}
 >
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Milestones",
    description:"List key dates.",
    icon: Flag,
  },
{
    step:"02",
    title:"Sequence",
    description:"Order and link phases.",
    icon: GitCommitVertical,
  },
{
    step:"03",
    title:"View",
    description:"See the timeline.",
    icon: GanttChart,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Flag,
    title:"Milestones",
    description:"Key points.",
  },
{
    icon: GitCommitVertical,
    title:"Sequence",
    description:"Ordered phases.",
  },
{
    icon: GanttChart,
    title:"Timeline",
    description:"Visual span.",
  },
{
    icon: CalendarRange,
    title:"Dates",
    description:"Schedule view.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A project timeline lays milestones and phases along a date axis so dependencies and deadlines are obvious. Visual schedules surface clashes a list hides. This tool builds and displays the timeline.</p>
  <p>Sequencing phases reveals what must finish before the next starts. The timeline makes critical paths visible.</p>
  <p>Use it for any project. The tool's value is a clear, visual schedule that aids planning and status.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/productivity/timeline" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What is it?",
    answer:"Visual project schedule.",
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
    answer:"Planning, status.",
  },
{
    question:"Export?",
    answer:"Review on screen.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default TimelineClient;
