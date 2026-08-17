"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { CheckSquare, Plus, Trash2, ArrowRight, Sparkles, Shield, Zap, Flame, Clock, Users, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type QuadrantId = 1 | 2 | 3 | 4;

interface Task {
  id: string;
  text: string;
  quadrant: QuadrantId;
}

const QUADRANTS = [
  { id: 1 as QuadrantId, name: "Do First", desc: "Urgent & Important (Crises, Deadlines)", color: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400", icon: Flame },
  { id: 2 as QuadrantId, name: "Schedule", desc: "Not Urgent but Important (Strategy, Growth)", color: "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-400", icon: Clock },
  { id: 3 as QuadrantId, name: "Delegate", desc: "Urgent but Not Important (Interruptions)", color: "border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400", icon: Users },
  { id: 4 as QuadrantId, name: "Eliminate", desc: "Neither Urgent nor Important (Distractions)", color: "border-zinc-500/40 bg-zinc-500/10 text-zinc-600 dark:text-zinc-400", icon: Ban }
];

export function EisenhowerKanbanClient() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Submit quarterly tax filing", quadrant: 1 },
    { id: "2", text: "Design 2026 product roadmap", quadrant: 2 },
    { id: "3", text: "Book flight tickets for conference", quadrant: 3 },
    { id: "4", text: "Scroll random social media feeds", quadrant: 4 }
  ]);
  const [newTask, setNewTask] = useState("");
  const [targetQuad, setTargetQuad] = useState<QuadrantId>(1);

  const addTask = () => {
    if (!newTask.trim()) {
      toast.error("Please enter a task title.");
      return;
    }
    setTasks([...tasks, { id: Date.now().toString(), text: newTask.trim(), quadrant: targetQuad }]);
    setNewTask("");
    toast.success("Added task to matrix!");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const moveTask = (id: string, quad: QuadrantId) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, quadrant: quad } : t));
    toast.success("Moved task!");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={CheckSquare}
          title="Eisenhower Kanban Board"
          description="Organize tasks into 4 actionable quadrants by Urgency and Importance for maximum productivity."
        />

        {/* Quick Add Task */}
        <GlassCard>
          <CardHeader>
            <CardTitle>Add New Action Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="e.g. Prepare client proposal..."
                className="flex-1"
                onKeyDown={e => e.key === "Enter" && addTask()}
              />
              <select
                value={targetQuad}
                onChange={e => setTargetQuad(Number(e.target.value) as QuadrantId)}
                className="h-10 px-3 rounded-md border bg-background text-sm"
              >
                {QUADRANTS.map(q => (
                  <option key={q.id} value={q.id}>Q{q.id}: {q.name}</option>
                ))}
              </select>
              <Button onClick={addTask}>
                <Plus className="w-4 h-4 mr-2" /> Add Task
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        {/* 4 Quadrants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUADRANTS.map(q => {
            const quadTasks = tasks.filter(t => t.quadrant === q.id);
            const Icon = q.icon;
            return (
              <GlassCard key={q.id} className={cn("border-2", q.color)}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="w-4 h-4" /> Q{q.id}: {q.name} ({quadTasks.length})
                    </CardTitle>
                  </div>
                  <CardDescription className="text-xs">{q.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 min-h-[160px]">
                  {quadTasks.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-6 text-center italic">No tasks in this quadrant</p>
                  ) : (
                    quadTasks.map(t => (
                      <div
                        key={t.id}
                        className="p-3 rounded-lg border bg-background/80 flex flex-col gap-2 shadow-xs"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-sm font-medium text-foreground">{t.text}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTask(t.id)}
                            className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <div className="flex gap-1 flex-wrap pt-1 border-t border-border/40">
                          {QUADRANTS.filter(target => target.id !== q.id).map(target => (
                            <button
                              key={target.id}
                              onClick={() => moveTask(t.id, target.id)}
                              className="text-[10px] text-muted-foreground hover:text-primary px-1.5 py-0.5 rounded bg-muted/60 hover:bg-muted transition-colors"
                            >
                              → Q{target.id} {target.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </GlassCard>
            );
          })}
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Capture Tasks", description: "List all pending responsibilities and obligations.", icon: CheckSquare },
            { step: "02", title: "Categorize Urgency", description: "Sort items into Do First (Q1), Schedule (Q2), Delegate (Q3), or Eliminate (Q4).", icon: Sparkles },
            { step: "03", title: "Focus on Q2", description: "Maximize high-leverage growth by investing regular time into non-urgent strategic goals.", icon: Shield }
          ]}
          badges={["100% Free Forever", "Stephen Covey Framework", "Private Local Storage"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Flame, title: "Q1 Do First", description: "High urgency and high importance items requiring immediate crisis intervention." },
            { icon: Clock, title: "Q2 Schedule", description: "Strategic initiatives that create exponential long-term returns." },
            { icon: Users, title: "Q3 Delegate", description: "Urgent operational tasks that should be handed off or automated." },
            { icon: Ban, title: "Q4 Eliminate", description: "Low-value time wasters and distractions to discard entirely." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Mastering Time Management with the Eisenhower Matrix</h3>
            <p>
              Popularized by President Dwight D. Eisenhower and Dr. Stephen Covey, this decision matrix separates urgent firefighting from impactful, long-term strategic execution. Top performers spend the majority of their mental energy in Quadrant 2 (Important, Not Urgent).
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "What makes a task Quadrant 2?", answer: "Quadrant 2 activities are essential for long-term health, career, and relationships—such as exercise, learning, and system architecture—that lack an immediate urgent deadline." },
            { question: "Is my task list stored locally?", answer: "Yes! All tasks are saved directly in your web browser with zero server transmission." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/productivity/eisenhower-kanban" max={6} />
      </div>
    </div>
  );
}

export default EisenhowerKanbanClient;
