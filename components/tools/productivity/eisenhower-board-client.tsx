"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Layout, Plus, CheckSquare, Download, Trash2, ArrowRight, Sparkles, Shield, Zap, Copy } from "lucide-react";
;
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type Task = {
  id: string;
  title: string;
  quadrant: 1 | 2 | 3 | 4;
};
const QUADRANTS = {
  1: {
    title: "Do First",
    desc: "Urgent & Important",
    color: "border-red-500/50 bg-red-500/10",
    head: "text-red-500"
  },
  2: {
    title: "Schedule",
    desc: "Not Urgent & Important",
    color: "border-blue-500/50 bg-blue-500/10",
    head: "text-primary"
  },
  3: {
    title: "Delegate",
    desc: "Urgent & Not Important",
    color: "border-yellow-500/50 bg-yellow-500/10",
    head: "text-yellow-500"
  },
  4: {
    title: "Eliminate",
    desc: "Not Urgent & Not Important",
    color: "border-gray-500/50 bg-gray-500/10",
    head: "text-muted-foreground"
  }
};
export function EisenhowerBoardClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskQuadrant, setNewTaskQuadrant] = useState<1 | 2 | 3 | 4>(1);
  useEffect(() => {
    const saved = localStorage.getItem("eisenhower-tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);
  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("eisenhower-tasks", JSON.stringify(newTasks));
  };
  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      quadrant: newTaskQuadrant
    };
    saveTasks([...tasks, newTask]);
    setNewTaskTitle("");
    toast.success("Task added");
  };
  const deleteTask = (id: string) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };
  const moveTask = (id: string, q: 1 | 2 | 3 | 4) => {
    saveTasks(tasks.map(t => t.id === id ? {
      ...t,
      quadrant: q
    } : t));
  };
  const exportBoard = () => {
    let md = "# Eisenhower Matrix\n\n";
    ([1, 2, 3, 4] as const).forEach(q => {
      md += "##" + QUADRANTS[q].title + "\n";
      const qTasks = tasks.filter(t => t.quadrant === q);
      if (qTasks.length === 0) md += "- No tasks\n";
      qTasks.forEach(t => md += "-" + t.title + "\n");
      md += "\n";
    });
    return md;
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Eisenhower Matrix Board" icon={Layout} description="Manage and prioritize your tasks using the Eisenhower Matrix." actions={<>
 <CopyButton getText={exportBoard} label="Export MD" />
 <ResetButton onClick={() => saveTasks([])} label="Clear All" />
 </>} />

 <GlassCard>
 <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-end">
 <div className="flex-1 space-y-2">
 <Label>New Task</Label>
 <Input value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} placeholder="Enter task details..." onKeyDown={e => e.key === "Enter" && addTask()} />
 </div>
 <div className="w-full md:w-48 space-y-2">
 <Label>Quadrant</Label>
 <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={newTaskQuadrant} onChange={e => setNewTaskQuadrant(Number(e.target.value) as 1 | 2 | 3 | 4)}>
 <option value={1}>Do First</option>
 <option value={2}>Schedule</option>
 <option value={3}>Delegate</option>
 <option value={4}>Eliminate</option>
 </select>
 </div>
 <Button onClick={addTask}><Plus className="w-4 h-4 mr-2" /> Add Task</Button>
 </CardContent>
 </GlassCard>

 <div className="grid md:grid-cols-2 gap-4 h-full">
 {([1, 2, 3, 4] as const).map(q => <GlassCard key={q} className={cn("border-2", QUADRANTS[q].color)}>
 <CardHeader className="py-3">
 <CardTitle className={cn("text-lg flex items-center justify-between", QUADRANTS[q].head)}>
 <span>{QUADRANTS[q].title}</span>
 <span className="text-xs font-normal opacity-70">{QUADRANTS[q].desc}</span>
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-2 min-h-[200px]">
 {tasks.filter(t => t.quadrant === q).map(task => <div key={task.id} className="bg-background/80 p-2 rounded-md border shadow-sm flex items-center justify-between group">
 <span className="text-sm">{task.title}</span>
 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
 <select className="text-xs border rounded bg-transparent p-1" value={task.quadrant} onChange={e => moveTask(task.id, Number(e.target.value) as 1 | 2 | 3 | 4)}>
 <option value={1}>Q1</option>
 <option value={2}>Q2</option>
 <option value={3}>Q3</option>
 <option value={4}>Q4</option>
 </select>
 <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => deleteTask(task.id)}>
 <Trash2 className="w-3 h-3" />
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
          <h3>Why Use Our Eisenhower Matrix Board?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Eisenhower Matrix Board provides
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

      <RelatedTools currentToolUrl="/tools/productivity/eisenhower-board" max={6} />

    </div></div>;
}