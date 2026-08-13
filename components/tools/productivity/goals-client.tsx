"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Target, CheckCircle, Calendar, TrendingUp, Plus, Trash2, Shield, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type Milestone = { id: string; title: string; completed: boolean };
type Goal = { id: string; title: string; targetDate: string; category: string; milestones: Milestone[] };

const DEFAULT_GOALS: Goal[] = [
  {
    id: "g1",
    title: "Launch Toolzium Web Platform",
    targetDate: "2026-09-01",
    category: "Professional",
    milestones: [
      { id: "m1", title: "Complete UI Design DNA System", completed: true },
      { id: "m2", title: "Build 50+ Web Tools", completed: true },
      { id: "m3", title: "Deploy Production Pipeline", completed: false },
    ],
  },
  {
    id: "g2",
    title: "Run Half-Marathon (21km)",
    targetDate: "2026-10-15",
    category: "Health",
    milestones: [
      { id: "m4", title: "Train 5km 3x Weekly", completed: true },
      { id: "m5", title: "Complete 15km Long Run", completed: false },
    ],
  },
];

export function GoalsClient() {
  const [goals, setGoals] = useState<Goal[]>(DEFAULT_GOALS);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("2026-12-31");
  const [newCategory, setNewCategory] = useState("Personal");
  const [filter, setFilter] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("goalsTracker");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setGoals(parsed);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("goalsTracker", JSON.stringify(goals));
    }
  }, [goals, mounted]);

  const addGoal = () => {
    if (!newTitle.trim()) {
      toast.error("Please enter a goal title.");
      return;
    }
    const goal: Goal = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      targetDate: newDate,
      category: newCategory,
      milestones: [],
    };
    setGoals([goal, ...goals]);
    setNewTitle("");
    toast.success("Goal added!");
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
    toast.success("Goal removed.");
  };

  const addMilestone = (goalId: string, title: string) => {
    if (!title.trim()) return;
    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          return { ...g, milestones: [...g.milestones, { id: Date.now().toString(), title: title.trim(), completed: false }] };
        }
        return g;
      })
    );
    toast.success("Added milestone!");
  };

  const toggleMilestone = (goalId: string, msId: string) => {
    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          return {
            ...g,
            milestones: g.milestones.map((ms) => (ms.id === msId ? { ...ms, completed: !ms.completed } : ms)),
          };
        }
        return g;
      })
    );
  };

  const deleteMilestone = (goalId: string, msId: string) => {
    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          return { ...g, milestones: g.milestones.filter((ms) => ms.id !== msId) };
        }
        return g;
      })
    );
  };

  const clearAll = () => {
    setGoals(DEFAULT_GOALS);
    localStorage.removeItem("goalsTracker");
    toast.success("Reset goals to defaults!");
  };

  const getProgress = (g: Goal) => {
    if (g.milestones.length === 0) return 0;
    const completed = g.milestones.filter((m) => m.completed).length;
    return Math.round((completed / g.milestones.length) * 100);
  };

  const filteredGoals = filter === "All" ? goals : goals.filter((g) => g.category === filter);

  if (!mounted) return null;

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      <ToolPageHeader
        title="Interactive Goal Tracker & Milestone Planner"
        description="Set strategic long-term goals, break them down into actionable sub-milestones, and track progress percentage completion."
        icon={Target}
        actions={<ResetButton onClick={clearAll} label="Reset Goals" />}
      />

      {/* ADD GOAL FORM */}
      <GlassCard>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="w-5 h-5 text-primary" /> Create New Goal
          </CardTitle>
          <CardDescription>Specify goal title, target completion date, and category tag.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-1.5 w-full">
            <Label htmlFor="g-title" className="text-xs font-bold">Goal Title</Label>
            <Input id="g-title" placeholder="e.g. Master TypeScript..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="h-11 font-medium" />
          </div>
          <div className="w-full md:w-44 space-y-1.5">
            <Label htmlFor="g-date" className="text-xs font-semibold">Target Date</Label>
            <Input id="g-date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="h-11 text-xs" />
          </div>
          <div className="w-full md:w-44 space-y-1.5">
            <Label className="text-xs font-semibold">Category</Label>
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger className="h-11 text-xs font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Learning">Learning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addGoal} className="h-11 px-6 font-bold gap-2">
            <Plus className="w-4 h-4" /> Add Goal
          </Button>
        </CardContent>
      </GlassCard>

      {/* FILTER CONTROL */}
      <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-base text-foreground flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" /> Active Goals ({filteredGoals.length})
        </h3>
        <div className="flex items-center gap-2">
          <Label className="text-xs font-semibold text-muted-foreground">Filter Category:</Label>
          <div className="w-44">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 text-xs font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Learning">Learning</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* GOALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            progress={getProgress(goal)}
            onDelete={() => deleteGoal(goal.id)}
            onAddMilestone={(title: string) => addMilestone(goal.id, title)}
            onToggleMilestone={(msId: string) => toggleMilestone(goal.id, msId)}
            onDeleteMilestone={(msId: string) => deleteMilestone(goal.id, msId)}
          />
        ))}
        {filteredGoals.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center text-muted-foreground text-xs italic p-12 border border-dashed border-border/80 rounded-2xl">
            No goals found in this category. Create one above!
          </div>
        )}
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Set Target Goal",
            description: "Define long-term target goals with category tags and target completion dates.",
            icon: Target,
          },
          {
            step: "02",
            title: "Break Down Milestones",
            description: "Add step-by-step sub-milestones under each goal card.",
            icon: CheckCircle,
          },
          {
            step: "03",
            title: "Track Percentage Progress",
            description: "Checking off milestones updates the goal progress bar in real time.",
            icon: TrendingUp,
          },
        ]}
        badges={["Sub-Milestone Tracking", "Category Filter", "100% Free"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Target,
            title: "Sub-Milestone Decomposition",
            description: "Breaks big ambitious goals into manageable micro-tasks with completion checkmarks.",
          },
          {
            icon: TrendingUp,
            title: "Real-Time Completion Metrics",
            description: "Calculates overall goal completion percentage based on checked milestones.",
          },
          {
            icon: Shield,
            title: "Private Browser Persistence",
            description: "Saves all goals, dates, and milestones in your local browser storage.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "How is goal progress calculated?",
            answer: "Goal progress percentage equals (Completed Milestones / Total Milestones) * 100.",
          },
          {
            question: "Are my goals private?",
            answer: "Yes, all goals and target dates remain 100% confidential in your local browser.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/goals" max={6} />
    </div>
  );
}

function GoalCard({ goal, progress, onDelete, onAddMilestone, onToggleMilestone, onDeleteMilestone }: any) {
  const [msTitle, setMsTitle] = useState("");

  const handleAdd = () => {
    if (!msTitle.trim()) return;
    onAddMilestone(msTitle);
    setMsTitle("");
  };

  return (
    <GlassCard>
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-base text-foreground leading-tight">{goal.title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
              <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase">
                {goal.category}
              </span>
              {goal.targetDate && (
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5" /> {goal.targetDate}
                </span>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-muted-foreground hover:text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="w-3.5 h-3.5 text-primary" /> Completion Progress
            </span>
            <span className="text-primary font-black">{progress}%</span>
          </div>
          <div className="h-2 bg-muted/60 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Separator />

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {goal.milestones.map((ms: any) => (
            <div key={ms.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/20 border border-border/40 group text-xs">
              <button onClick={() => onToggleMilestone(ms.id)} className="shrink-0">
                <CheckCircle className={cn("w-4 h-4 transition-colors", ms.completed ? "text-emerald-500" : "text-muted-foreground/40")} />
              </button>
              <span className={cn("flex-1 font-medium transition-all", ms.completed ? "line-through text-muted-foreground" : "text-foreground")}>
                {ms.title}
              </span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-destructive" onClick={() => onDeleteMilestone(ms.id)}>
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {goal.milestones.length === 0 && <p className="text-xs text-muted-foreground text-center italic py-2">No sub-milestones yet.</p>}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Add sub-milestone task..."
            value={msTitle}
            onChange={(e) => setMsTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="h-9 text-xs font-medium"
          />
          <Button size="sm" className="h-9 px-3 font-bold" onClick={handleAdd}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </GlassCard>
  );
}
