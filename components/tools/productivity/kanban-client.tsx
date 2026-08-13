"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { LayoutGrid, Plus, ArrowLeft, ArrowRight, Trash2, Check, Shield, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
}
interface Column {
  id: string;
  title: string;
  color: string;
}
const DEFAULT_COLUMNS: Column[] = [{
  id: "todo",
  title: "To Do",
  color: "border-l-4 border-l-blue-500"
}, {
  id: "inprogress",
  title: "In Progress",
  color: "border-l-4 border-l-amber-500"
}, {
  id: "done",
  title: "Done",
  color: "border-l-4 border-l-emerald-500"
}];
const DEFAULT_TASKS: Task[] = [{
  id: "t1",
  title: "Design Landing Page Hero Section",
  description: "Incorporate glassmorphism cards and CTA",
  columnId: "todo"
}, {
  id: "t2",
  title: "Audit SEO Structured Data",
  description: "Verify Schema.org JSON-LD tags",
  columnId: "inprogress"
}, {
  id: "t3",
  title: "Deploy Toolzium V1 Release",
  description: "Vercel production build deployment",
  columnId: "done"
}];
export function KanbanClient() {
  const [columns, setColumns] = useState<Column[]>(DEFAULT_COLUMNS);
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const savedTasks = localStorage.getItem("kanban-tasks");
    const savedCols = localStorage.getItem("kanban-columns");
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        if (Array.isArray(parsed) && parsed.length > 0) setTasks(parsed);
      } catch (e) {}
    }
    if (savedCols) {
      try {
        const parsed = JSON.parse(savedCols);
        if (Array.isArray(parsed) && parsed.length > 0) setColumns(parsed);
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
      localStorage.setItem("kanban-columns", JSON.stringify(columns));
    }
  }, [tasks, columns]);
  const handleReset = () => {
    setColumns(DEFAULT_COLUMNS);
    setTasks(DEFAULT_TASKS);
    localStorage.removeItem("kanban-tasks");
    localStorage.removeItem("kanban-columns");
    toast.success("Kanban board reset to defaults!");
  };
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      toast.error("Task title is required.");
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim(),
      columnId: columns[0].id
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    toast.success("Added task to To Do!");
  };
  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) {
      toast.error("Column title is required.");
      return;
    }
    const newCol: Column = {
      id: `col-${Date.now()}`,
      title: newColumnTitle.trim(),
      color: "border-l-4 border-l-purple-500"
    };
    setColumns([...columns, newCol]);
    setNewColumnTitle("");
    toast.success("Added custom column!");
  };
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.success("Task deleted.");
  };
  const handleClearDone = () => {
    const doneColId = columns.find(c => c.id === "done")?.id || columns[columns.length - 1].id;
    setTasks(tasks.filter(t => t.columnId !== doneColId));
    toast.success("Cleared completed tasks!");
  };
  const moveTask = (taskId: string, direction: "left" | "right") => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
    const task = tasks[taskIndex];
    const colIndex = columns.findIndex(c => c.id === task.columnId);
    if (direction === "left" && colIndex > 0) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].columnId = columns[colIndex - 1].id;
      setTasks(updatedTasks);
    } else if (direction === "right" && colIndex < columns.length - 1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].columnId = columns[colIndex + 1].id;
      setTasks(updatedTasks);
    }
  };
  return <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

      <ToolPageHeader icon={LayoutGrid} title="Customizable Visual Kanban Board" description="Organize tasks into workflow columns (To Do, In Progress, Done), create custom columns, and move task cards across swimlanes." actions={<div className="flex gap-2">
            <ActionButton onClick={handleClearDone} icon={Check} label="Clear Completed" variant="outline" size="default" />
            <ResetButton onClick={handleReset} label="Reset Board" />
          </div>} />

      {/* INPUT CONTROLS */}
      <GlassCard>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="w-5 h-5 text-primary" /> Add Tasks & Columns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">New Task Card</h3>
              <div className="space-y-2">
                <Input value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} placeholder="Task Title..." className="h-10 text-xs font-medium" />
                <Input value={newTaskDesc} onChange={e => setNewTaskDesc(e.target.value)} placeholder="Task Description (Optional)" className="h-10 text-xs" />
                <Button className="w-full h-10 font-bold gap-2" onClick={handleAddTask}>
                  <Plus className="h-4 w-4" /> Add Task
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">New Swimlane Column</h3>
              <div className="space-y-2">
                <Input value={newColumnTitle} onChange={e => setNewColumnTitle(e.target.value)} placeholder="Column Title (e.g. Code Review)..." className="h-10 text-xs font-medium" />
                <Button className="w-full h-10 font-bold gap-2" variant="secondary" onClick={handleAddColumn}>
                  <Plus className="h-4 w-4" /> Add Column
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      {/* KANBAN BOARD SWIMLANES */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
        {columns.map((col, colIdx) => {
        const columnTasks = tasks.filter(t => t.columnId === col.id);
        return <div key={col.id} className="min-w-[280px] w-[300px] shrink-0 bg-muted/20 border border-border/60 rounded-2xl p-4 flex flex-col max-h-[70vh]">
              <div className={cn("mb-4 flex items-center justify-between pl-3 py-1", col.color)}>
                <h3 className="font-bold text-base text-foreground">{col.title}</h3>
                <span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full text-xs font-black">
                  {columnTasks.length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {columnTasks.length === 0 ? <div className="text-xs text-muted-foreground text-center py-8 italic border border-dashed border-border/60 rounded-xl">
                    No tasks in {col.title}
                  </div> : columnTasks.map(task => <div key={task.id} className="bg-background rounded-xl p-3.5 shadow-sm border border-border/60 space-y-2.5">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-xs text-foreground leading-snug break-words">{task.title}</h4>
                        <Button onClick={() => handleDeleteTask(task.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      {task.description && <p className="text-xs text-muted-foreground leading-relaxed">{task.description}</p>}

                      <div className="flex justify-between items-center pt-2 border-t border-border/40">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" disabled={colIdx === 0} onClick={() => moveTask(task.id, "left")} title="Move Left">
                          <ArrowLeft className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" disabled={colIdx === columns.length - 1} onClick={() => moveTask(task.id, "right")} title="Move Right">
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>)}
              </div>
            </div>;
      })}
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
      step: "01",
      title: "Add Task Cards",
      description: "Type task titles and optional descriptions to add them to your To Do column.",
      icon: Plus
    }, {
      step: "02",
      title: "Move Swimlane Columns",
      description: "Use left/right arrows on task cards to transition tasks between To Do, In Progress, and Done.",
      icon: LayoutGrid
    }, {
      step: "03",
      title: "Clear Completed Tasks",
      description: "Click 'Clear Completed' to purge finished tasks from your board.",
      icon: CheckCircle2
    }]} badges={["Custom Swimlane Columns", "Auto-Saved", "100% Free"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
      icon: LayoutGrid,
      title: "Custom Column Creation",
      description: "Add personalized workflow columns (e.g. Backlog, Testing, Review) dynamically."
    }, {
      icon: Check,
      title: "Batch Clear Completed Tasks",
      description: "Purge completed swimlane tasks with a single click to maintain board focus."
    }, {
      icon: Shield,
      title: "Confidential Local Storage",
      description: "Saves all tasks and custom columns locally inside your browser."
    }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
      question: "How do I move tasks between columns?",
      answer: "Click the left or right arrow buttons at the bottom of any task card to move it into adjacent swimlanes."
    }, {
      question: "Is my Kanban board saved automatically?",
      answer: "Yes, all task cards and custom column titles persist automatically in local storage."
    }]} />

      <RelatedTools currentToolUrl="/tools/productivity/kanban" max={6} />
    </div>;
}