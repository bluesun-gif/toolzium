"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { CheckSquare, Plus, Filter, Download, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Trash2, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type Task = {
  id: string;
  text: string;
  completed: boolean;
  quadrant: string;
};
const QUADRANTS = [{
  id: "q1",
  title: "Do First",
  desc: "Urgent & Important"
}, {
  id: "q2",
  title: "Schedule",
  desc: "Not Urgent & Important"
}, {
  id: "q3",
  title: "Delegate",
  desc: "Urgent & Not Important"
}, {
  id: "q4",
  title: "Eliminate",
  desc: "Not Urgent & Not Important"
}];
export function EisenhowerListClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTexts, setNewTaskTexts] = useState<Record<string, string>>({
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  });
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const saved = localStorage.getItem("toolzium_eisenhower");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("toolzium_eisenhower", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (quadrant: string) => {
    const text = newTaskTexts[quadrant]?.trim();
    if (!text) return;
    const newTask: Task = {
      id: Date.now().toString(),
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
  const moveTask = (id: string, newQuadrant: string) => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      quadrant: newQuadrant
    } : t));
  };
  const exportText = () => {
    let result = "# Eisenhower Matrix Tasks\n\n";
    QUADRANTS.forEach(q => {
      result += "##" + q.title + "(" + q.desc + ")\n";
      const qTasks = tasks.filter(t => t.quadrant === q.id);
      qTasks.forEach(t => {
        result += "- [" + (t.completed ? "x" : "") + "]" + t.text + "\n";
      });
      if (qTasks.length === 0) result += "- No tasks\n";
      result += "\n";
    });
    return result;
  };
  const getFilteredQuadrants = () => filter === "all" ? QUADRANTS : QUADRANTS.filter(q => q.id === filter);
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount === 0 ? 0 : Math.round(completedCount / totalCount * 100);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Eisenhower Matrix Planner" description="Prioritize tasks using the Do, Schedule, Delegate, and Eliminate method." icon={CheckSquare} actions={<>
 <CopyButton getText={exportText} label="Copy MD" />
 <ActionButton onClick={() => {
          const blob = new Blob([exportText()], {
            type: "text/markdown"
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "eisenhower-tasks.md";
          link.click();
        }} icon={Download} label="Export File" />
 </>} />

 <GlassCard>
 <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
 <div className="flex-1 w-full">
 <div className="flex justify-between mb-1">
 <span className="text-sm font-medium">Progress</span>
 <span className="text-sm font-medium">{completedCount} / {totalCount} ({progress}%)</span>
 </div>
 <div className="w-full bg-secondary rounded-full h-2.5">
 <div className="bg-primary h-2.5 rounded-full" style={{
                width: progress + "%"
              }}></div>
 </div>
 </div>
 <div className="flex gap-2">
 <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">All</Button>
 {QUADRANTS.map(q => <Button key={q.id} variant={filter === q.id ? "default" : "outline"} onClick={() => setFilter(q.id)} size="sm" className="hidden md:inline-flex">
 {q.title}
 </Button>)}
 </div>
 </CardContent>
 </GlassCard>

 <div className={cn("grid gap-6", filter === "all" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
 {getFilteredQuadrants().map(q => {
          const qTasks = tasks.filter(t => t.quadrant === q.id);
          return <GlassCard key={q.id}>
 <CardHeader className="pb-3">
 <CardTitle className="flex justify-between items-center">
 <span>{q.title}</span>
 <span className="text-sm font-normal text-muted-foreground">{qTasks.length} tasks</span>
 </CardTitle>
 <CardDescription>{q.desc}</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex gap-2">
 <Input placeholder="Add task..." value={newTaskTexts[q.id]} onChange={e => setNewTaskTexts({
                  ...newTaskTexts,
                  [q.id]: e.target.value
                })} onKeyDown={e => e.key === "Enter" && addTask(q.id)} />
 <Button onClick={() => addTask(q.id)} size="icon"><Plus className="h-4 w-4" /></Button>
 </div>
 <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
 {qTasks.map(task => <div key={task.id} className="flex items-center gap-2 p-2 border rounded-md group hover:bg-secondary/50">
 <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="w-4 h-4" />
 <span className={cn("flex-1 text-sm", task.completed ? "line-through text-muted-foreground" : "")}>{task.text}</span>
 <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
 <select value="" onChange={e => {
                      if (e.target.value) moveTask(task.id, e.target.value);
                    }} className="h-8 w-8 text-xs border rounded bg-transparent px-1 cursor-pointer">
 <option value="" disabled>Mv</option>
 {QUADRANTS.map(quad => quad.id !== q.id && <option key={quad.id} value={quad.id}>{quad.title}</option>)}
 </select>
 <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteTask(task.id)}>
 <Trash2 className="h-4 w-4" />
 </Button>
 </div>
 </div>)}
 {qTasks.length === 0 && <p className="text-xs text-center text-muted-foreground py-4">No tasks in this quadrant.</p>}
 </div>
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
          <h3>Why Use Our Eisenhower Matrix Planner?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Eisenhower Matrix Planner provides
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

      <RelatedTools currentToolUrl="/tools/productivity/eisenhower-list" max={6} />

    </div></div>;
}