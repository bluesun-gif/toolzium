"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Layout, Plus, Download, ChevronRight, ChevronLeft, Trash2, Tag, CheckCircle2 } from"lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type Task = {
  id: string;
  title: string;
  color: "red" | "blue" | "green" | "yellow" | "purple" | "orange";
  column: "todo" | "inprogress" | "review" | "done";
};

const COLOR_CLASSES: Record<Task["color"], { bg: string; border: string; badge: string; text: string }> = {
  red: { bg: "bg-red-500/10 dark:bg-red-500/20", border: "border-red-500/40", badge: "bg-red-500 text-white", text: "text-red-950 dark:text-red-100" },
  blue: { bg: "bg-blue-500/10 dark:bg-blue-500/20", border: "border-blue-500/40", badge: "bg-blue-500 text-white", text: "text-blue-950 dark:text-blue-100" },
  green: { bg: "bg-emerald-500/10 dark:bg-emerald-500/20", border: "border-emerald-500/40", badge: "bg-emerald-500 text-white", text: "text-emerald-950 dark:text-emerald-100" },
  yellow: { bg: "bg-amber-500/10 dark:bg-amber-500/20", border: "border-amber-500/40", badge: "bg-amber-500 text-white", text: "text-amber-950 dark:text-amber-100" },
  purple: { bg: "bg-purple-500/10 dark:bg-purple-500/20", border: "border-purple-500/40", badge: "bg-purple-500 text-white", text: "text-purple-950 dark:text-purple-100" },
  orange: { bg: "bg-orange-500/10 dark:bg-orange-500/20", border: "border-orange-500/40", badge: "bg-orange-500 text-white", text: "text-orange-950 dark:text-orange-100" },
};

const DEFAULT_TASKS: Task[] = [
  { id: "1", title: "Design homepage hero layout", color: "purple", column: "todo" },
  { id: "2", title: "Review SEO schema markup", color: "green", column: "inprogress" },
  { id: "3", title: "Fix light theme contrast", color: "red", column: "review" },
  { id: "4", title: "Deploy initial release", color: "blue", column: "done" },
];

export function ColoredKanbanClient() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskColor, setNewTaskColor] = useState<Task["color"]>("red");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("colored_kanban_tasks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setTasks(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("colored_kanban_tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (!newTaskTitle.trim()) {
      toast.error("Please enter a task title.");
      return;
    }
    setTasks([
      ...tasks,
      { id: Math.random().toString(), title: newTaskTitle.trim(), color: newTaskColor, column: "todo" },
    ]);
    setNewTaskTitle("");
    toast.success("Task added to Todo column!");
  };

  const moveTask = (id: string, col: Task["column"]) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, column: col } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast.success("Task removed");
  };

  const resetBoard = () => {
    setTasks(DEFAULT_TASKS);
    toast.success("Board reset to defaults");
  };

  const exportJSON = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kanban_tasks.json";
    a.click();
    toast.success("Exported Kanban tasks!");
  };
  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

      <ToolPageHeader
        icon={Layout}
        title="Color-Coded Category Kanban Board"
        description="Visual Kanban task board with custom color tags, priority badges, and light/dark theme contrast optimization."
        actions={
          <div className="flex gap-2">
            <ActionButton onClick={exportJSON} icon={Download} label="Export JSON" variant="outline" size="default" />
            <ResetButton onClick={resetBoard} label="Reset Board" />
          </div>
        }
      />

      {/* NEW TASK INPUT CARD */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5 text-primary" />
            Create New Task Card
          </CardTitle>
          <CardDescription>Assign title and color category tag to organize your workflow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2 min-w-[240px]">
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="e.g. Prepare Q3 presentation slides..."
                className="h-11 font-medium text-foreground"
              />
            </div>

            <div className="w-full md:w-44 space-y-2">
              <Label>Category Tag Color</Label>
              <Select value={newTaskColor} onValueChange={(val) => setNewTaskColor(val as Task["color"])}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="red">🔴 High Priority (Red)</SelectItem>
                  <SelectItem value="orange">🟠 Medium (Orange)</SelectItem>
                  <SelectItem value="yellow">🟡 Low (Yellow)</SelectItem>
                  <SelectItem value="green">🟢 Feature (Green)</SelectItem>
                  <SelectItem value="blue">🔵 Tech Debt (Blue)</SelectItem>
                  <SelectItem value="purple">🟣 Design (Purple)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={addTask} className="h-11 px-6 font-bold gap-2">
              <Plus className="h-4 w-4" /> Add Task
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* KANBAN COLUMNS BOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(
          [
            { col: "todo", title: "Todo", badge: "bg-muted text-foreground" },
            { col: "inprogress", title: "In Progress", badge: "bg-primary/20 text-primary" },
            { col: "review", title: "Review", badge: "bg-amber-500/20 text-amber-600 dark:text-amber-400" },
            { col: "done", title: "Done", badge: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" },
          ] as const
        ).map(({ col, title, badge }) => {
          const colTasks = tasks.filter((t) => t.column === col);
          return (
            <GlassCard key={col} className="flex flex-col">
              <CardHeader className="p-4 flex flex-row items-center justify-between border-b border-border/60">
                <CardTitle className="text-base font-bold text-foreground capitalize flex items-center gap-2">
                  {title}
                </CardTitle>
                <span className={cn("text-xs font-mono font-bold px-2.5 py-0.5 rounded-full", badge)}>
                  {colTasks.length}
                </span>
              </CardHeader>

              <CardContent className="p-3 space-y-3 min-h-[380px] max-h-[550px] overflow-y-auto bg-muted/20 rounded-b-xl">
                {colTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-xs text-center border border-dashed border-border/80 rounded-xl p-4">
                    <span>No tasks in {title}</span>
                  </div>
                ) : (
                  colTasks.map((t) => {
                    const colorStyle = COLOR_CLASSES[t.color] || COLOR_CLASSES.red;
                    return (
                      <div
                        key={t.id}
                        className={cn(
                          "p-3.5 rounded-xl border shadow-sm transition-all space-y-2.5",
                          colorStyle.bg,
                          colorStyle.border,
                          colorStyle.text
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold leading-snug break-words">{t.title}</p>
                          <button
                            onClick={() => deleteTask(t.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            title="Delete task"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-border/40">
                          <span
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
                              colorStyle.badge
                            )}
                          >
                            {t.color}
                          </span>

                          <div className="flex gap-1">
                            {col !== "todo" && (
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 rounded-lg bg-background/80"
                                onClick={() =>
                                  moveTask(
                                    t.id,
                                    col === "done" ? "review" : col === "review" ? "inprogress" : "todo"
                                  )
                                }
                                title="Move Left"
                              >
                                <ChevronLeft className="h-3 w-3" />
                              </Button>
                            )}
                            {col !== "done" && (
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 rounded-lg bg-background/80"
                                onClick={() =>
                                  moveTask(
                                    t.id,
                                    col === "todo" ? "inprogress" : col === "inprogress" ? "review" : "done"
                                  )
                                }
                                title="Move Right"
                              >
                                <ChevronRight className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </GlassCard>
          );
        })}
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Add Task & Tag Color",
            description: "Type your task title and select a color badge (Red for High Priority, Blue for Tech Debt, etc.).",
            icon: Tag,
          },
          {
            step: "02",
            title: "Move Across Columns",
            description: "Use left and right arrow buttons to move tasks through Todo, In Progress, Review, and Done states.",
            icon: ChevronRight,
          },
          {
            step: "03",
            title: "Auto-Saved & Exportable",
            description: "All changes save automatically to local storage and can be exported as JSON.",
            icon: CheckCircle2,
          },
        ]}
        badges={["Light & Dark Theme Contrast", "Color Tagging", "Auto-Saved"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Layout,
            title: "High Contrast Theme Engine",
            description: "Optimized font colors and translucent backgrounds to ensure 100% legibility in both light and dark mode.",
          },
          {
            icon: Tag,
            title: "Custom Category Badging",
            description: "Assign distinct color badges (Red, Orange, Yellow, Green, Blue, Purple) to categorize work streams.",
          },
          {
            icon: Download,
            title: "JSON Export & Persistence",
            description: "Export task data to JSON backup files for offline archival.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "Is my task data saved securely?",
            answer: "Yes, all tasks are stored in your browser's local storage. No data is sent to external servers.",
          },
          {
            question: "Does this Kanban board support light and dark theme mode?",
            answer: "Yes! Every color tag uses high-contrast translucent backgrounds with dark-text in light theme and light-text in dark theme.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/colored-kanban" max={6} />
    </div>
  );
}
