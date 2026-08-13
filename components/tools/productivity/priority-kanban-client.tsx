"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Layout, Plus, CheckSquare, Download, ChevronRight, ChevronLeft, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  status: "Backlog" | "Low Priority" | "Medium Priority" | "High Priority" | "Urgent / Blocking";
};
const columns = ["Backlog", "Low Priority", "Medium Priority", "High Priority", "Urgent / Blocking"] as const;
export function PriorityKanbanClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState<Task["status"]>("Backlog");
  useEffect(() => {
    const saved = localStorage.getItem("kanbanTasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = () => {
    if (!newTaskTitle.trim()) {
      toast.error("Title is required");
      return;
    }
    const task: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDesc,
      category: "",
      dueDate: "",
      status: newTaskStatus
    };
    setTasks([...tasks, task]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    toast.success("Task added");
  };
  const moveTask = (id: string, newStatus: Task["status"]) => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      status: newStatus
    } : t));
  };
  const exportTasks = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "kanban_tasks.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()));
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Layout} title="Priority Kanban Board" description="Organize tasks by priority with this simple kanban board." actions={<>
 <ActionButton onClick={exportTasks} icon={Download} label="Export JSON" />
 <ResetButton onClick={() => {
          setTasks([]);
          toast.success("Board cleared");
        }} label="Clear Board" />
 </>} />
 
 <GlassCard>
 <CardContent className="pt-6 space-y-4">
 <div className="flex flex-col md:flex-row gap-4">
 <Input placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} className="md:w-1/3" />
 <div className="flex flex-1 gap-2">
 <Input placeholder="New task title" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
 <Button onClick={addTask}><Plus className="w-4 h-4 mr-2" /> Add</Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
 {columns.map(col => <GlassCard key={col} className="min-w-[250px] bg-muted/30">
 <CardHeader className="py-3 px-4">
 <CardTitle className="text-sm font-semibold">{col}</CardTitle>
 </CardHeader>
 <CardContent className="px-2 pb-2 space-y-2 h-[500px] overflow-y-auto">
 {filteredTasks.filter(t => t.status === col).map(task => <div key={task.id} className="bg-background p-3 rounded-md shadow-sm border border-border flex flex-col gap-2">
 <span className="font-medium text-sm">{task.title}</span>
 {task.description && <span className="text-xs text-muted-foreground">{task.description}</span>}
 <div className="flex justify-between mt-2">
 <Button variant="ghost" size="icon" className="h-6 w-6" disabled={columns.indexOf(col) === 0} onClick={() => moveTask(task.id, columns[columns.indexOf(col) - 1])}>
 <ChevronLeft className="h-4 w-4" />
 </Button>
 <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>
 <CheckSquare className="h-4 w-4" />
 </Button>
 <Button variant="ghost" size="icon" className="h-6 w-6" disabled={columns.indexOf(col) === columns.length - 1} onClick={() => moveTask(task.id, columns[columns.indexOf(col) + 1])}>
 <ChevronRight className="h-4 w-4" />
 </Button>
 </div>
 </div>)}
 </CardContent>
 </GlassCard>)}
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
          <h3>Why Use Our Priority Kanban Board?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Priority Kanban Board provides
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

      <RelatedTools currentToolUrl="/tools/productivity/priority-kanban" max={6} />

    </div></div>;
}