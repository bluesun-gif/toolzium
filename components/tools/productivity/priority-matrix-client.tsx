"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { LayoutGrid, Plus, Target, Trash2, CheckCircle2, Circle, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type QuadrantId = "quick-wins" | "major-projects" | "fill-ins" | "avoid";
type Task = {
  id: string;
  text: string;
  quadrant: QuadrantId;
  completed: boolean;
};
const QUADRANTS: {
  id: QuadrantId;
  title: string;
  desc: string;
  color: string;
  bg: string;
}[] = [{
  id: "quick-wins",
  title: "Quick Wins",
  desc: "High Impact, Low Effort",
  color: "text-green-500",
  bg: "bg-green-500/10 border-green-500/20"
}, {
  id: "major-projects",
  title: "Major Projects",
  desc: "High Impact, High Effort",
  color: "text-primary",
  bg: "bg-blue-500/10 border-blue-500/20"
}, {
  id: "fill-ins",
  title: "Fill-Ins",
  desc: "Low Impact, Low Effort",
  color: "text-yellow-500",
  bg: "bg-yellow-500/10 border-yellow-500/20"
}, {
  id: "avoid",
  title: "Avoid",
  desc: "Low Impact, High Effort",
  color: "text-red-500",
  bg: "bg-red-500/10 border-red-500/20"
}];
export function PriorityMatrixClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantId>("quick-wins");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("toolzium_priority_matrix");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load tasks");
      }
    }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("toolzium_priority_matrix", JSON.stringify(tasks));
    }
  }, [tasks]);
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTask.trim(),
      quadrant: selectedQuadrant,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask("");
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
  const moveTask = (id: string, newQuadrant: QuadrantId) => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      quadrant: newQuadrant
    } : t));
  };
  const clearCompleted = () => {
    const remaining = tasks.filter(t => !t.completed);
    if (remaining.length < tasks.length) {
      setTasks(remaining);
      toast.success("Completed tasks cleared");
    }
  };
  const resetAll = () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      setTasks([]);
      toast.success("Matrix reset");
    }
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={LayoutGrid} title="Priority Matrix" description="Organize your tasks by impact and effort to focus on what matters most." actions={<>
 <ActionButton onClick={clearCompleted} icon={CheckCircle2} label="Clear Completed" variant="outline" />
 <ResetButton onClick={resetAll} label="Reset Matrix" />
 </>} />

 <GlassCard>
 <CardContent className="p-6">
 <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3">
 <Input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="What needs to be done?" className="flex-1" />
 <Select value={selectedQuadrant} onValueChange={(v: QuadrantId) => setSelectedQuadrant(v)}>
 <SelectTrigger className="w-full sm:w-[200px]">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {QUADRANTS.map(q => <SelectItem key={q.id} value={q.id}>{q.title}</SelectItem>)}
 </SelectContent>
 </Select>
 <Button type="submit">
 <Plus className="w-4 h-4 mr-2" /> Add Task
 </Button>
 </form>
 </CardContent>
 </GlassCard>

 <div className="grid md:grid-cols-2 gap-4">
 {QUADRANTS.map(quadrant => {
          const quadrantTasks = tasks.filter(t => t.quadrant === quadrant.id);
          const completedCount = quadrantTasks.filter(t => t.completed).length;
          return <GlassCard key={quadrant.id} className={cn("border-2 transition-colors", quadrant.bg)}>
 <CardHeader className="pb-3">
 <div className="flex justify-between items-start">
 <div>
 <CardTitle className={cn("text-lg", quadrant.color)}>{quadrant.title}</CardTitle>
 <CardDescription className="text-xs mt-1">{quadrant.desc}</CardDescription>
 </div>
 <div className="text-xs font-medium px-2 py-1 bg-background/50 rounded-full border border-border">
 {completedCount}/{quadrantTasks.length}
 </div>
 </div>
 </CardHeader>
 <CardContent className="min-h-[200px]">
 {quadrantTasks.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50 py-8">
 <Target className="w-8 h-8 mb-2 opacity-50" />
 <p className="text-sm">No tasks</p>
 </div> : <div className="space-y-2">
 {quadrantTasks.map(task => <div key={task.id} className={cn("group flex items-center gap-3 p-3 rounded-lg bg-background/80 border border-border/50 hover:border-border transition-all", task.completed && "opacity-60")}>
 <Button onClick={() => toggleTask(task.id)} className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors">
 {task.completed ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Circle className="w-5 h-5" />}
 </Button>
 <span className={cn("flex-1 text-sm transition-all", task.completed && "line-through text-muted-foreground")}>
 {task.text}
 </span>
 
 <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
 <Select value={task.quadrant} onValueChange={(v: QuadrantId) => moveTask(task.id, v)}>
 <SelectTrigger className="w-8 h-8 p-0 flex items-center justify-center border-none shadow-none bg-transparent hover:bg-muted">
 <Target className="w-4 h-4 text-muted-foreground" />
 </SelectTrigger>
 <SelectContent align="end">
 {QUADRANTS.map(q => <SelectItem key={q.id} value={q.id}>{q.title}</SelectItem>)}
 </SelectContent>
 </Select>
 
 <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => deleteTask(task.id)}>
 <Trash2 className="w-4 h-4" />
 </Button>
 </div>
 </div>)}
 </div>}
 </CardContent>
 </GlassCard>;
        })}
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
          <h3>Why Use Our Priority Matrix?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Priority Matrix provides
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

      <RelatedTools currentToolUrl="/tools/productivity/priority-matrix" max={6} />

  </div></div>;
}