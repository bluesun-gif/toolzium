"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Layout, Plus, CheckSquare, Download, Trash2, ArrowRightLeft, Sparkles, Shield, Zap, Copy } from "lucide-react";
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
  quadrant: string;
  completed: boolean;
  category: string;
};
const QUADRANTS = [{
  id: "q1",
  title: "Do First",
  description: "Urgent & Important"
}, {
  id: "q2",
  title: "Schedule",
  description: "Not Urgent & Important"
}, {
  id: "q3",
  title: "Delegate",
  description: "Urgent & Not Important"
}, {
  id: "q4",
  title: "Eliminate",
  description: "Not Urgent & Not Important"
}];
export function PriorityQuadrantBoardClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("general");
  const [selectedQuadrant, setSelectedQuadrant] = useState("q1");
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>(["general", "work", "personal"]);
  useEffect(() => {
    const saved = localStorage.getItem("priorityQuadrantTasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse tasks");
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("priorityQuadrantTasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      quadrant: selectedQuadrant,
      completed: false,
      category: newTaskCategory
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
    if (!categories.includes(newTaskCategory)) {
      setCategories([...categories, newTaskCategory]);
    }
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
  const exportMarkdown = () => {
    let md = "# Priority Quadrant Tasks\n\n";
    QUADRANTS.forEach(q => {
      md += "##" + q.title + "(" + q.description + ")\n";
      const qTasks = tasks.filter(t => t.quadrant === q.id);
      if (qTasks.length === 0) {
        md += "No tasks in this quadrant.\n";
      }
      qTasks.forEach(t => {
        md += "- [" + (t.completed ? "x" : "") + "]" + t.text + "*(Category:" + t.category + ")*\n";
      });
      md += "\n";
    });
    const blob = new Blob([md], {
      type: "text/markdown"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "priority-quadrant-tasks.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Exported to Markdown");
  };
  const resetBoard = () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
      toast.success("Board cleared");
    }
  };
  const filteredTasks = filterCategory === "all" ? tasks : tasks.filter(t => t.category === filterCategory);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Layout} title="Priority Quadrant Action Board" description="Organize tasks using the Eisenhower Matrix." actions={<>
 <ActionButton onClick={exportMarkdown} icon={Download} label="Export MD" />
 <ResetButton onClick={resetBoard} label="Clear Board" />
 </>} />

 <GlassCard>
 <CardHeader>
 <CardTitle>Add Task</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex flex-col md:flex-row gap-4 items-end">
 <div className="flex-1 space-y-2 w-full">
 <Label>Task</Label>
 <Input value={newTaskText} onChange={e => setNewTaskText(e.target.value)} placeholder="What needs to be done?" onKeyDown={e => e.key === "Enter" && addTask()} />
 </div>
 <div className="w-full md:w-48 space-y-2">
 <Label>Category</Label>
 <Input value={newTaskCategory} onChange={e => setNewTaskCategory(e.target.value)} placeholder="e.g. work" />
 </div>
 <div className="w-full md:w-48 space-y-2">
 <Label>Quadrant</Label>
 <Select value={selectedQuadrant} onValueChange={setSelectedQuadrant}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {QUADRANTS.map(q => <SelectItem key={q.id} value={q.id}>{q.title}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <Button onClick={addTask} className="w-full md:w-auto"><Plus className="w-4 h-4 mr-2" /> Add</Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className="flex items-center gap-4">
 <Label>Filter by Category:</Label>
 <Select value={filterCategory} onValueChange={setFilterCategory}>
 <SelectTrigger className="w-48">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="all">All Categories</SelectItem>
 {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>

 <div className="grid md:grid-cols-2 gap-4">
 {QUADRANTS.map(q => {
          let headerClass = "flex justify-between items-center p-3 rounded-t-lg";
          if (q.id === "q1") headerClass += "bg-red-500/20 text-red-700 dark:text-red-300";else if (q.id === "q2") headerClass += "bg-blue-500/20 text-primary";else if (q.id === "q3") headerClass += "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300";else headerClass += "bg-gray-500/20 text-gray-700 dark:text-gray-300";
          return <GlassCard key={q.id} className="flex flex-col h-[400px]">
 <div className={headerClass}>
 <div>
 <h3 className="font-bold">{q.title}</h3>
 <p className="text-xs opacity-80">{q.description}</p>
 </div>
 </div>
 <CardContent className="flex-1 overflow-y-auto p-4 space-y-2 bg-background/50">
 {filteredTasks.filter(t => t.quadrant === q.id).map(task => <div key={task.id} className="flex items-center gap-2 p-2 bg-card rounded-md border shadow-sm group">
 <Button onClick={() => toggleTask(task.id)} className="text-muted-foreground hover:text-primary">
 {task.completed ? <CheckSquare className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 border-2 rounded-sm" />}
 </Button>
 <div className={cn("flex-1 text-sm", task.completed ? "line-through text-muted-foreground" : "")}>
 {task.text}
 <span className="ml-2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">{task.category}</span>
 </div>
 
 <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
 <Select value={task.quadrant} onValueChange={val => moveTask(task.id, val)}>
 <SelectTrigger className="w-8 h-8 p-0 flex items-center justify-center border-none bg-transparent hover:bg-muted">
 <ArrowRightLeft className="w-4 h-4" />
 </SelectTrigger>
 <SelectContent>
 {QUADRANTS.map(mq => <SelectItem key={mq.id} value={mq.id}>{mq.title}</SelectItem>)}
 </SelectContent>
 </Select>
 <Button onClick={() => deleteTask(task.id)} className="p-1.5 text-muted-foreground hover:text-destructive rounded-md hover:bg-muted">
 <Trash2 className="w-4 h-4" />
 </Button>
 </div>
 </div>)}
 {filteredTasks.filter(t => t.quadrant === q.id).length === 0 && <div className="text-center text-muted-foreground text-sm mt-8 opacity-50">No tasks</div>}
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
          <h3>Why Use Our Priority Quadrant Action Board?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Priority Quadrant Action Board provides
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

      <RelatedTools currentToolUrl="/tools/productivity/priority-quadrant-board" max={6} />

  </div></div>;
}