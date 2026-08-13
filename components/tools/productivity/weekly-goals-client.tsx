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
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Target, Plus, CheckSquare, Download, Trash2, Shield, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type Category = "Work" | "Health" | "Personal" | "Finance";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  category: Category;
  tasks: Task[];
}

const CATEGORY_COLORS: Record<Category, string> = {
  Work: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  Health: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  Personal: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
  Finance: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
};

const DEFAULT_WEEKLY_GOALS: Goal[] = [
  {
    id: "g1",
    title: "Ship Product Feature Update",
    category: "Work",
    tasks: [
      { id: "t1", text: "Finalize frontend components", completed: true },
      { id: "t2", text: "Run automated E2E tests", completed: true },
      { id: "t3", text: "Deploy to staging server", completed: false },
    ],
  },
  {
    id: "g2",
    title: "Maintain 10k Daily Steps & Workout",
    category: "Health",
    tasks: [
      { id: "t4", text: "30-min morning cardio session", completed: true },
      { id: "t5", text: "Strength training Monday/Wednesday/Friday", completed: false },
    ],
  },
];

export function WeeklyGoalsClient() {
  const [goals, setGoals] = useState<Goal[]>(DEFAULT_WEEKLY_GOALS);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState<Category>("Work");
  const [newTaskTexts, setNewTaskTexts] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const saved = localStorage.getItem("weeklyGoals");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setGoals(parsed);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("weeklyGoals", JSON.stringify(goals));
  }, [goals, loaded]);

  const addGoal = () => {
    if (!newGoalTitle.trim()) {
      toast.error("Goal title cannot be empty.");
      return;
    }
    if (goals.length >= 3) {
      toast.error("You can only have up to 3 primary weekly goals.");
      return;
    }
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newGoalTitle.trim(),
      category: newGoalCategory,
      tasks: [],
    };
    setGoals([...goals, newGoal]);
    setNewGoalTitle("");
    toast.success("Weekly goal added!");
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
    toast.success("Goal removed.");
  };

  const addTask = (goalId: string) => {
    const text = newTaskTexts[goalId]?.trim();
    if (!text) return;

    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          return {
            ...g,
            tasks: [...g.tasks, { id: Date.now().toString(), text, completed: false }],
          };
        }
        return g;
      })
    );

    setNewTaskTexts({ ...newTaskTexts, [goalId]: "" });
  };

  const toggleTask = (goalId: string, taskId: string) => {
    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          return {
            ...g,
            tasks: g.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
          };
        }
        return g;
      })
    );
  };

  const removeTask = (goalId: string, taskId: string) => {
    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          return { ...g, tasks: g.tasks.filter((t) => t.id !== taskId) };
        }
        return g;
      })
    );
  };

  const getProgress = (goal: Goal) => {
    if (goal.tasks.length === 0) return 0;
    const completed = goal.tasks.filter((t) => t.completed).length;
    return Math.round((completed / goal.tasks.length) * 100);
  };

  const handleExport = () => {
    let content = "Weekly Goals & Milestones Plan\n\n";
    goals.forEach((g, i) => {
      content += "Goal " + (i + 1) + ": " + g.title + " [" + g.category + "]\n";
      content += "Progress: " + getProgress(g) + "%\n";
      if (g.tasks.length > 0) {
        g.tasks.forEach((t) => {
          content += (t.completed ? "  [X] " : "  [ ] ") + t.text + "\n";
        });
      } else {
        content += "  No tasks added yet.\n";
      }
      content += "\n";
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "weekly-goals-plan.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Plan exported!");
  };

  const handleReset = () => {
    setGoals(DEFAULT_WEEKLY_GOALS);
    toast.success("Reset weekly goals to default!");
  };

  if (!loaded) return null;

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
        icon={Target}
        title="Weekly Goals & Milestone Planner"
        description="Set primary focus goals for the week, assign category tags, and track progress with daily actionable tasks."
        actions={
          <div className="flex gap-2">
            <ActionButton onClick={handleExport} icon={Download} label="Export Plan" variant="outline" />
            <ResetButton onClick={handleReset} label="Reset Goals" />
          </div>
        }
      />

      {/* INPUT CARD */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5 text-primary" />
            Add Primary Weekly Goal (Max 3 Focus Areas)
          </CardTitle>
          <CardDescription>Limit your focus to 3 core weekly outcomes for maximum execution output.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2 min-w-[240px]">
              <Label htmlFor="goal-title">Weekly Goal Title</Label>
              <Input
                id="goal-title"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="e.g. Ship V1 feature release, Run 20km..."
                disabled={goals.length >= 3}
                onKeyDown={(e) => e.key === "Enter" && addGoal()}
                className="h-11 font-medium text-foreground"
              />
            </div>

            <div className="w-full sm:w-48 space-y-2">
              <Label>Category Tag</Label>
              <Select
                value={newGoalCategory}
                onValueChange={(v: Category) => setNewGoalCategory(v)}
                disabled={goals.length >= 3}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Work">💼 Work</SelectItem>
                  <SelectItem value="Health">🏃 Health</SelectItem>
                  <SelectItem value="Personal">🧘 Personal</SelectItem>
                  <SelectItem value="Finance">💰 Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={addGoal} disabled={goals.length >= 3} className="h-11 px-6 font-bold gap-2">
              <Plus className="w-4 h-4" /> Add Goal
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* GOALS DISPLAY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = getProgress(goal);

          return (
            <GlassCard key={goal.id} className="flex flex-col h-full overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1.5 min-w-0">
                    <span
                      className={cn(
                        "inline-block px-2.5 py-0.5 text-xs font-bold rounded-full border mb-1",
                        CATEGORY_COLORS[goal.category] || CATEGORY_COLORS.Work
                      )}
                    >
                      {goal.category}
                    </span>
                    <CardTitle className="text-lg font-bold leading-snug text-foreground break-words">
                      {goal.title}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => removeGoal(goal.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col pt-0 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-muted-foreground">
                    <span>Milestone Progress</span>
                    <span className="text-primary">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/60 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full transition-all duration-300 rounded-full", progress >= 100 ? "bg-emerald-500" : "bg-primary")}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <Separator />

                {/* TASKS LIST */}
                <div className="flex-1 space-y-2 overflow-y-auto max-h-[260px] pr-1">
                  {goal.tasks.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4 italic border border-dashed border-border/80 rounded-xl">
                      No tasks added yet. Add daily sub-tasks below!
                    </p>
                  ) : (
                    goal.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-2 p-2 rounded-lg bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors group"
                      >
                        <button
                          onClick={() => toggleTask(goal.id, task.id)}
                          className={cn(
                            "mt-0.5 shrink-0 transition-colors",
                            task.completed ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <CheckSquare className="w-4 h-4" />
                        </button>
                        <span
                          className={cn(
                            "text-xs font-medium flex-1 break-words leading-relaxed",
                            task.completed ? "line-through text-muted-foreground" : "text-foreground"
                          )}
                        >
                          {task.text}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                          onClick={() => removeTask(goal.id, task.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2 pt-2 mt-auto">
                  <Input
                    placeholder="Add sub-task milestone..."
                    value={newTaskTexts[goal.id] || ""}
                    onChange={(e) => setNewTaskTexts({ ...newTaskTexts, [goal.id]: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && addTask(goal.id)}
                    className="h-9 text-xs"
                  />
                  <Button size="icon" className="h-9 w-9 shrink-0" onClick={() => addTask(goal.id)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </GlassCard>
          );
        })}

        {goals.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-border/80 rounded-2xl">
            <Target className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-semibold text-base">No weekly goals set.</p>
            <p className="text-xs">Add up to 3 core goals above to plan your week.</p>
          </div>
        )}
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Set 3 Core Goals",
            description: "Define up to 3 high-leverage focus areas for the current week across Work, Health, Personal, or Finance.",
            icon: Target,
          },
          {
            step: "02",
            title: "Add Daily Tasks",
            description: "Break each goal down into smaller, actionable daily tasks to track progress.",
            icon: Plus,
          },
          {
            step: "03",
            title: "Check Off & Export",
            description: "Check off completed milestones and export your weekly progress report to text.",
            icon: CheckCircle2,
          },
        ]}
        badges={["Max 3 Rule", "Category Badging", "Auto-Saved"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Target,
            title: "Rule of 3 Focus Constraint",
            description: "Encourages deep work and execution by capping active primary goals at 3.",
          },
          {
            icon: CheckSquare,
            title: "Category Visual Distinction",
            description: "Uses color-coded badges (Work, Health, Personal, Finance) for easy visual scannability.",
          },
          {
            icon: Download,
            title: "Auto-Saved & Exportable",
            description: "Saves goals locally in your browser and exports weekly summary reports.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "Why is there a limit of 3 weekly goals?",
            answer: "Productivity research shows that setting more than 3 primary goals per week dilutes focus and reduces overall completion rates.",
          },
          {
            question: "Does my data persist when I close the tab?",
            answer: "Yes! All goals and sub-tasks are stored in your browser's local storage automatically.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/weekly-goals" max={6} />
    </div>
  );
}
