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
import { Separator } from "@/components/ui/separator";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Target, CheckSquare, BarChart2, Download, Plus, Trash2, Shield, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type KeyResult = {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
};

type Objective = {
  id: string;
  name: string;
  deadline: string;
  keyResults: KeyResult[];
};

const DEFAULT_OBJECTIVES: Objective[] = [
  {
    id: "obj-1",
    name: "Accelerate Q3 Revenue Growth",
    deadline: "2026-09-30",
    keyResults: [
      { id: "kr-1", name: "Reach $50k Monthly Recurring Revenue", target: 50000, current: 32000, unit: "$" },
      { id: "kr-2", name: "Close 25 Enterprise Deals", target: 25, current: 18, unit: "deals" },
    ],
  },
  {
    id: "obj-2",
    name: "Enhance Product Speed & Reliability",
    deadline: "2026-10-15",
    keyResults: [
      { id: "kr-3", name: "Reduce P99 Page Load Time", target: 200, current: 350, unit: "ms" },
      { id: "kr-4", name: "Achieve 99.99% Uptime", target: 100, current: 99.9, unit: "%" },
    ],
  },
];

export function OkrPlannerClient() {
  const [objectives, setObjectives] = useState<Objective[]>(DEFAULT_OBJECTIVES);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("okr-planner-save");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setObjectives(parsed);
      } catch (e) {
        setObjectives(DEFAULT_OBJECTIVES);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("okr-planner-save", JSON.stringify(objectives));
    }
  }, [objectives, mounted]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addObjective = () => {
    const newObj: Objective = {
      id: generateId(),
      name: "New Business Objective",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      keyResults: [],
    };
    setObjectives([...objectives, newObj]);
    toast.success("Added new objective!");
  };

  const deleteObjective = (id: string) => {
    setObjectives(objectives.filter((o) => o.id !== id));
    toast.success("Objective deleted.");
  };

  const updateObjective = (id: string, updates: Partial<Objective>) => {
    setObjectives(objectives.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  };

  const addKeyResult = (objId: string) => {
    const newKR: KeyResult = {
      id: generateId(),
      name: "New Key Metric Result",
      target: 100,
      current: 0,
      unit: "%",
    };
    setObjectives(
      objectives.map((o) => (o.id === objId ? { ...o, keyResults: [...o.keyResults, newKR] } : o))
    );
  };

  const updateKeyResult = (objId: string, krId: string, updates: Partial<KeyResult>) => {
    setObjectives(
      objectives.map((o) => {
        if (o.id === objId) {
          return {
            ...o,
            keyResults: o.keyResults.map((kr) => (kr.id === krId ? { ...kr, ...updates } : kr)),
          };
        }
        return o;
      })
    );
  };

  const deleteKeyResult = (objId: string, krId: string) => {
    setObjectives(
      objectives.map((o) => {
        if (o.id === objId) {
          return {
            ...o,
            keyResults: o.keyResults.filter((kr) => kr.id !== krId),
          };
        }
        return o;
      })
    );
  };

  const calculateKRProgress = (kr: KeyResult) => {
    if (kr.target === 0) return 0;
    const progress = (kr.current / kr.target) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const calculateObjectiveProgress = (obj: Objective) => {
    if (obj.keyResults.length === 0) return 0;
    const total = obj.keyResults.reduce((acc, kr) => acc + calculateKRProgress(kr), 0);
    return total / obj.keyResults.length;
  };

  const resetOkrs = () => {
    setObjectives(DEFAULT_OBJECTIVES);
    toast.success("Reset OKRs to defaults!");
  };

  const exportData = () => {
    const data = JSON.stringify(objectives, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "okr_planner.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported OKR JSON!");
  };

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
        icon={Target}
        title="OKR (Objectives & Key Results) Strategic Planner"
        description="Structured OKR goal setting framework to align team milestones, measure key metrics, and monitor quarter progress."
        actions={
          <div className="flex gap-2">
            <ActionButton onClick={exportData} icon={Download} label="Export JSON" variant="outline" />
            <ResetButton onClick={resetOkrs} label="Reset OKRs" />
          </div>
        }
      />

      {/* TOP SUMMARY ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            Active Objectives ({objectives.length})
          </h2>
          <p className="text-xs text-muted-foreground">Track key quantitative metrics against target milestones.</p>
        </div>

        <Button onClick={addObjective} className="gap-2 font-bold h-11 px-6 shadow-md">
          <Plus className="w-4 h-4" /> Add New Objective
        </Button>
      </div>

      {/* OBJECTIVES CARDS */}
      {objectives.length === 0 ? (
        <GlassCard className="text-center py-12 text-muted-foreground space-y-3">
          <Target className="w-10 h-10 mx-auto text-muted-foreground/60" />
          <p className="font-semibold text-base">No active objectives.</p>
          <Button onClick={addObjective} variant="outline" className="gap-2 font-bold">
            <Plus className="w-4 h-4" /> Create Your First Objective
          </Button>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {objectives.map((obj) => {
            const objProgress = calculateObjectiveProgress(obj);

            return (
              <GlassCard key={obj.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2 flex-1 w-full">
                      <Input
                        value={obj.name}
                        onChange={(e) => updateObjective(obj.id, { name: e.target.value })}
                        className="text-lg font-bold h-11 bg-background border-border text-foreground"
                        placeholder="Objective Title..."
                      />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Label htmlFor={`date-${obj.id}`} className="text-xs font-semibold">Target Deadline:</Label>
                        <Input
                          id={`date-${obj.id}`}
                          type="date"
                          value={obj.deadline}
                          onChange={(e) => updateObjective(obj.id, { deadline: e.target.value })}
                          className="h-8 py-0 w-36 text-xs bg-background"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Overall Progress</div>
                        <div className="text-2xl font-black text-primary">{objProgress.toFixed(0)}%</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteObjective(obj.id)}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        title="Delete Objective"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full bg-muted/60 h-2.5 rounded-full overflow-hidden mt-4">
                    <div
                      className="bg-primary h-full transition-all duration-500 rounded-full"
                      style={{ width: `${objProgress}%` }}
                    />
                  </div>
                </CardHeader>

                <Separator />

                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-primary" /> Key Results ({obj.keyResults.length})
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => addKeyResult(obj.id)} className="gap-1.5 text-xs font-bold">
                      <Plus className="w-3.5 h-3.5" /> Add Key Result
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {obj.keyResults.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic border border-dashed border-border/80 rounded-xl p-4 text-center">
                        No Key Results defined for this objective. Click &quot;Add Key Result&quot; to measure progress.
                      </p>
                    ) : (
                      obj.keyResults.map((kr) => {
                        const krProgress = calculateKRProgress(kr);

                        return (
                          <div key={kr.id} className="p-4 rounded-xl bg-muted/30 border border-border flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-1 w-full space-y-2">
                              <Input
                                value={kr.name}
                                onChange={(e) => updateKeyResult(obj.id, kr.id, { name: e.target.value })}
                                className="font-bold text-xs bg-background border-border text-foreground"
                                placeholder="Key Result Name"
                              />
                              <div className="flex flex-wrap gap-2 items-center text-xs">
                                <Label className="text-xs font-medium text-muted-foreground">Current:</Label>
                                <Input
                                  type="number"
                                  value={kr.current}
                                  onChange={(e) => updateKeyResult(obj.id, kr.id, { current: parseFloat(e.target.value) || 0 })}
                                  className="h-8 w-20 text-xs bg-background font-mono font-bold"
                                />
                                <Label className="text-xs font-medium text-muted-foreground">Target:</Label>
                                <Input
                                  type="number"
                                  value={kr.target}
                                  onChange={(e) => updateKeyResult(obj.id, kr.id, { target: parseFloat(e.target.value) || 0 })}
                                  className="h-8 w-20 text-xs bg-background font-mono font-bold"
                                />
                                <Label className="text-xs font-medium text-muted-foreground">Unit:</Label>
                                <Input
                                  value={kr.unit}
                                  onChange={(e) => updateKeyResult(obj.id, kr.id, { unit: e.target.value })}
                                  className="h-8 w-16 text-xs bg-background font-mono font-bold"
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
                              <div className="w-full md:w-36 space-y-1">
                                <div className="flex justify-between text-xs font-bold">
                                  <span>Completion</span>
                                  <span className="text-primary">{krProgress.toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                                  <div
                                    className={cn("h-full transition-all duration-500 rounded-full", krProgress >= 100 ? "bg-emerald-500" : "bg-primary")}
                                    style={{ width: `${krProgress}%` }}
                                  />
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteKeyResult(obj.id, kr.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Define Objectives",
            description: "Specify high-level qualitative goals (e.g., 'Accelerate Revenue', 'Improve UX').",
            icon: Target,
          },
          {
            step: "02",
            title: "Add Key Results",
            description: "Break down goals into measurable key result metrics with target and current values.",
            icon: CheckSquare,
          },
          {
            step: "03",
            title: "Track Quarter Progress",
            description: "Update current values to visualize real-time completion percentages across your dashboard.",
            icon: BarChart2,
          },
        ]}
        badges={["OKR Framework", "Visual Progress Bars", "100% Free"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Target,
            title: "Standard OKR Methodology",
            description: "Follows Intel & Google's proven Objectives and Key Results framework.",
          },
          {
            icon: BarChart2,
            title: "Automatic Weighted Aggregation",
            description: "Calculates overall objective completion by averaging key result percentages.",
          },
          {
            icon: Shield,
            title: "Local Storage & JSON Export",
            description: "All objectives are saved directly in your browser with offline JSON export capabilities.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What is an OKR?",
            answer: "OKR stands for Objectives and Key Results. It is a goal-setting framework used by individuals and companies to define measurable goals and track outcomes.",
          },
          {
            question: "How many Key Results should an Objective have?",
            answer: "Most productivity experts recommend 2 to 5 Key Results per Objective to maintain focus.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/okr-planner" max={6} />
    </div>
  );
}
