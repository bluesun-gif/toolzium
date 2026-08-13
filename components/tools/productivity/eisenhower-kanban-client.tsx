"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout, Plus, CheckSquare, Download, Trash2, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Sparkles, Shield, Zap, Copy } from "lucide-react";
;
import { ActionButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type Priority = "DO" | "SCHEDULE" | "DELEGATE" | "ELIMINATE";
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
}
const COLUMNS: {
  id: Priority;
  title: string;
  desc: string;
  color: string;
}[] = [{
  id: "DO",
  title: "Do First",
  desc: "Urgent & Important",
  color: "border-t-4 border-t-red-500"
}, {
  id: "SCHEDULE",
  title: "Schedule",
  desc: "Not Urgent & Important",
  color: "border-t-4 border-t-blue-500"
}, {
  id: "DELEGATE",
  title: "Delegate",
  desc: "Urgent & Not Important",
  color: "border-t-4 border-t-yellow-500"
}, {
  id: "ELIMINATE",
  title: "Eliminate",
  desc: "Not Urgent & Not Important",
  color: "border-t-4 border-t-gray-500"
}];
export function EisenhowerKanbanClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("eisenhower-tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved tasks", e);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("eisenhower-tasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (priority: Priority = "DO") => {
    if (!newTaskTitle.trim()) {
      toast.error("Title is required");
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDesc,
      dueDate: newTaskDate,
      priority
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskDate("");
    toast.success("Task added");
  };
  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };
  const moveTask = (id: string, newPriority: Priority) => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      priority: newPriority
    } : t));
  };
  const exportBoard = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const node = document.createElement('a');
    node.setAttribute("href", dataStr);
    node.setAttribute("download", "eisenhower_board.json");
    document.body.appendChild(node);
    node.click();
    node.remove();
    toast.success("Board exported!");
  };
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(filterText.toLowerCase()) || t.description.toLowerCase().includes(filterText.toLowerCase()));
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Layout} title="Eisenhower Kanban Board" description="Organize your tasks using the Eisenhower Urgency/Importance matrix." actions={<div className="flex space-x-2">
 <ActionButton onClick={exportBoard} icon={Download} label="Export JSON" />
 </div>} />

 <GlassCard>
 <CardHeader>
 <CardTitle>Add New Task</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid md:grid-cols-4 gap-4 items-end">
 <div className="space-y-2">
 <Label>Task Title</Label>
 <Input placeholder="E.g., Finish report" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Description</Label>
 <Input placeholder="Optional details..." value={newTaskDesc} onChange={e => setNewTaskDesc(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Due Date</Label>
 <Input type="date" value={newTaskDate} onChange={e => setNewTaskDate(e.target.value)} />
 </div>
 <Button onClick={() => addTask("DO")} className="w-full">
 <Plus className="w-4 h-4 mr-2" /> Add Task
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className="mb-4">
 <Input placeholder="Filter tasks..." value={filterText} onChange={e => setFilterText(e.target.value)} className="max-w-md" />
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
 {COLUMNS.map(col => <div key={col.id} className={cn("bg-card rounded-xl border shadow-sm flex flex-col h-[600px] overflow-hidden", col.color)}>
 <div className="p-4 border-b bg-muted/30">
 <h3 className="font-bold text-lg">{col.title}</h3>
 <p className="text-xs text-muted-foreground">{col.desc}</p>
 </div>
 <div className="p-4 flex-1 overflow-y-auto space-y-4">
 {filteredTasks.filter(t => t.priority === col.id).map(task => <div key={task.id} className="bg-background border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
 <div className="flex justify-between items-start mb-2">
 <h4 className="font-semibold text-sm break-words flex-1 pr-2">{task.title}</h4>
 <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive flex-shrink-0" onClick={() => removeTask(task.id)}>
 <Trash2 className="h-4 w-4" />
 </Button>
 </div>
 {task.description && <p className="text-xs text-muted-foreground mb-2 break-words">{task.description}</p>}
 {task.dueDate && <p className="text-xs font-medium text-primary mb-2">Due: {task.dueDate}</p>}
 
 <div className="flex justify-between pt-2 border-t mt-2">
 <select className="text-xs bg-transparent border rounded p-1 w-full cursor-pointer" value={task.priority} onChange={e => moveTask(task.id, e.target.value as Priority)}>
 {COLUMNS.map(c => <option key={c.id} value={c.id}>Move to {c.title}</option>)}
 </select>
 </div>
 </div>)}
 {filteredTasks.filter(t => t.priority === col.id).length === 0 && <div className="text-center text-sm text-muted-foreground italic py-8">
 No tasks here
 </div>}
 </div>
 </div>)}
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
          <h3>Why Use Our Eisenhower Kanban Board?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Eisenhower Kanban Board provides
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

      <RelatedTools currentToolUrl="/tools/productivity/eisenhower-kanban" max={6} />

    </div></div>;
}