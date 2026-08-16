"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
=======
import { ToolBackground } from"@/components/shared/tool-background";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
<<<<<<< HEAD
import { ArrowRight, ArrowRightLeft, Download, Filter, Grid2x2, Layout, LayoutDashboard, ListPlus, Plus, Trash2 } from"lucide-react";
=======
import { Layout, Plus, Filter, Download, Trash2, ArrowRight, Sparkles, Shield, Zap, Copy } from"lucide-react";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
import { ActionButton } from"@/components/shared/action-buttons";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

type Quadrant ="q1"|"q2"|"q3"|"q4";
type Task = {
 id: string;
 title: string;
 quadrant: Quadrant;
 project: string;
 dueDate: string;
};

export function EisenhowerWorkspaceClient() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [newTaskTitle, setNewTaskTitle] = useState("");
 const [newTaskQuadrant, setNewTaskQuadrant] = useState<Quadrant>("q1");
 const [newTaskProject, setNewTaskProject] = useState("");
 const [filterProject, setFilterProject] = useState("all");
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
 const saved = localStorage.getItem("eisenhower_tasks");
 if (saved) {
 try {
 setTasks(JSON.parse(saved));
 } catch (e) {
 console.error("Failed to parse tasks");
 }
 }
 setIsLoaded(true);
 }, []);

 useEffect(() => {
 if (isLoaded) {
 localStorage.setItem("eisenhower_tasks", JSON.stringify(tasks));
 }
 }, [tasks]);

 const addTask = () => {
 if (!newTaskTitle.trim()) {
 toast.error("Task title is required");
 return;
 }
 const newTask: Task = {
 id: Date.now().toString(),
 title: newTaskTitle,
 quadrant: newTaskQuadrant,
 project: newTaskProject.trim() ||"General",
 dueDate:""
 };
 setTasks([...tasks, newTask]);
 setNewTaskTitle("");
 toast.success("Task added");
 };

 const removeTask = (id: string) => {
 setTasks(tasks.filter(t => t.id !== id));
 };

 const moveTask = (id: string, newQuadrant: Quadrant) => {
 setTasks(tasks.map(t => t.id === id ? { ...t, quadrant: newQuadrant } : t));
 };

 const exportMarkdown = () => {
 let md ="# Eisenhower Matrix Tasks\n\n";
 
 const quadrants: {id: Quadrant, title: string}[] = [
 { id:"q1", title:"Do First (Urgent & Important)"},
 { id:"q2", title:"Schedule (Important, Not Urgent)"},
 { id:"q3", title:"Delegate (Urgent, Not Important)"},
 { id:"q4", title:"Eliminate (Neither)"}
 ];

 quadrants.forEach(q => {
 md +="##"+ q.title +"\n";
 const qTasks = tasks.filter(t => t.quadrant === q.id);
 if (qTasks.length === 0) md +="*No tasks*\n";
 qTasks.forEach(t => {
 md +="-"+ t.title + (t.project !=="General"?"["+ t.project +"]":"") +"\n";
 });
 md +="\n";
 });

 const blob = new Blob([md], { type:"text/markdown"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="eisenhower_matrix.md";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("Exported to Markdown");
 };

 const projects = Array.from(new Set(tasks.map(t => t.project)));
 const filteredTasks = tasks.filter(t => filterProject ==="all"|| t.project === filterProject);

 const QuadrantView = ({ id, title, colorClass }: { id: Quadrant, title: string, colorClass: string }) => {
 const qTasks = filteredTasks.filter(t => t.quadrant === id);
 return (
 <div className={"border rounded-lg p-4 flex flex-col h-full bg-card shadow-sm"}>
      <ToolBackground />

 <div className={"flex items-center justify-between mb-4"}>
 <h3 className={cn("font-semibold", colorClass)}>{title}</h3>
 <span className={"text-xs bg-muted px-2 py-1 rounded-full"}>{qTasks.length}</span>
 </div>
 <div className={"space-y-2 flex-grow overflow-y-auto max-h-[300px]"}>
 {qTasks.map(task => (
 <div key={task.id} className={"flex items-center justify-between group p-2 border rounded-md bg-background text-sm hover:border-primary transition-colors"}>
 <div className={"flex flex-col overflow-hidden"}>
 <span className={"truncate font-medium"} title={task.title}>{task.title}</span>
 <span className={"text-xs text-muted-foreground"}>{task.project}</span>
 </div>
 <div className={"flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"}>
 <Select value={task.quadrant} onValueChange={(v: Quadrant) => moveTask(task.id, v)}>
 <SelectTrigger className={"w-[80px] h-7 text-xs"}><SelectValue placeholder="Move"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="q1">Q1: Do</SelectItem>
 <SelectItem value="q2">Q2: Plan</SelectItem>
 <SelectItem value="q3">Q3: Delegate</SelectItem>
 <SelectItem value="q4">Q4: Drop</SelectItem>
 </SelectContent>
 </Select>
 <Button variant="ghost"size="icon"className={"h-7 w-7 text-destructive"} onClick={() => removeTask(task.id)}>
 <Trash2 className={"w-4 h-4"} />
 </Button>
 </div>
 </div>
 ))}
 {qTasks.length === 0 && <div className={"text-sm text-muted-foreground italic text-center py-4"}>No tasks here</div>}
 </div>
 </div>
 );
 };
 return (
 <div className={"space-y-6"}>
 <ToolPageHeader 
 icon={Layout}
 title="Eisenhower Matrix Workspace"
 description="Prioritize your tasks efficiently by organizing them into Urgency and Importance quadrants."
 actions={<ActionButton icon={Download} label="Export Markdown"onClick={exportMarkdown} />}
 />

 <GlassCard>
 <CardContent className={"pt-6"}>
 <div className={"flex flex-col md:flex-row gap-4 items-end"}>
 <div className={"flex-1 w-full space-y-2"}>
 <Label>Task Title</Label>
 <Input placeholder="Enter task..."value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} />
 </div>
 <div className={"w-full md:w-48 space-y-2"}>
 <Label>Project (Optional)</Label>
 <Input placeholder="e.g. Work, Home"value={newTaskProject} onChange={e => setNewTaskProject(e.target.value)} />
 </div>
 <div className={"w-full md:w-48 space-y-2"}>
 <Label>Quadrant</Label>
 <Select value={newTaskQuadrant} onValueChange={(v: Quadrant) => setNewTaskQuadrant(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="q1">Do First</SelectItem>
 <SelectItem value="q2">Schedule</SelectItem>
 <SelectItem value="q3">Delegate</SelectItem>
 <SelectItem value="q4">Eliminate</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <Button onClick={addTask} className={"w-full md:w-auto"}><Plus className={"w-4 h-4 mr-2"} /> Add Task</Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className={"flex justify-end items-center gap-2"}>
 <Filter className={"w-4 h-4 text-muted-foreground"} />
 <Select value={filterProject} onValueChange={setFilterProject}>
 <SelectTrigger className={"w-[200px]"}><SelectValue placeholder="Filter by Project"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="all">All Projects</SelectItem>
 {projects.map(p => (
 <SelectItem key={p} value={p}>{p}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 <div className={"grid md:grid-cols-2 gap-4 h-[600px] md:h-[700px]"}>
 <QuadrantView id="q1"title="Do First (Urgent & Important)"colorClass="text-red-500"/>
 <QuadrantView id="q2"title="Schedule (Important, Not Urgent)"colorClass="text-primary"/>
 <QuadrantView id="q3"title="Delegate (Urgent, Not Important)"colorClass="text-orange-500"/>
 <QuadrantView id="q4"title="Eliminate (Not Urgent & Not Important)"colorClass="text-muted-foreground"/>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add",
    description:"Create tasks.",
    icon: ListPlus,
  },
{
    step:"02",
    title:"Classify",
    description:"Set urgent and important.",
    icon: Grid2x2,
  },
{
    step:"03",
    title:"Manage",
    description:"Work the workspace.",
    icon: LayoutDashboard,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListPlus,
    title:"Tasks",
    description:"Capture.",
  },
{
    icon: Grid2x2,
    title:"Matrix",
    description:"Four boxes.",
  },
{
    icon: LayoutDashboard,
    title:"Workspace",
    description:"Full view.",
  },
{
    icon: ArrowRightLeft,
    title:"Move",
    description:"Re-sort.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An Eisenhower workspace is a fuller matrix environment for ongoing task management, combining capture, classification, and action in one place. It suits people who live in the method daily. This tool provides the complete view.</p>
  <p>A single workspace reduces app-switching. The matrix stays present as work flows through it.</p>
  <p>Use it as your priority hub. The tool's value is the matrix method embedded in a daily workspace.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Workspace?",
    answer:"Full-featured matrix view.",
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
    answer:"Daily management.",
  },
{
    question:"Best with?",
    answer:"Weekly triage.",
  }
  ]}
/>
=======
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our task.title?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our task.title provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/eisenhower-workspace" max={6} />

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
</div>
 );
}
