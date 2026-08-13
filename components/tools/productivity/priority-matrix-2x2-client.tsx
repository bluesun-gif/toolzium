"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Grid, Plus, Download, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";;
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

type Task = {
 id: string;
 title: string;
 impact: number;
 effort: number;
 quadrant: string;
};

export function PriorityMatrixClient() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [title, setTitle] = useState("");
 const [impact, setImpact] = useState(5);
 const [effort, setEffort] = useState(5);

 useEffect(() => {
 const saved = localStorage.getItem("priorityMatrixTasks");
 if (saved) {
 try {
 setTasks(JSON.parse(saved));
 } catch (e) {
 console.error(e);
 }
 }
 }, []);

 useEffect(() => {
 localStorage.setItem("priorityMatrixTasks", JSON.stringify(tasks));
 }, [tasks]);

 const getQuadrant = (imp: number, eff: number) => {
 if (imp >= 5 && eff < 5) return"Quick Wins";
 if (imp >= 5 && eff >= 5) return"Major Projects";
 if (imp < 5 && eff < 5) return"Fill-ins";
 return"Thankless Tasks";
 };

 const addTask = () => {
 if (!title.trim()) {
 toast.error("Please enter a task title");
 return;
 }
 const newTask: Task = {
 id: Date.now().toString(),
 title,
 impact,
 effort,
 quadrant: getQuadrant(impact, effort)
 };
 setTasks([...tasks, newTask]);
 setTitle("");
 setImpact(5);
 setEffort(5);
 toast.success("Task added");
 };

 const removeTask = (id: string) => {
 setTasks(tasks.filter(t => t.id !== id));
 };

 const exportTasks = () => {
 const dataStr ="data:text/json;charset=utf-8,"+ encodeURIComponent(JSON.stringify(tasks, null, 2));
 const dlAnchorElem = document.createElement("a");
 dlAnchorElem.setAttribute("href", dataStr);
 dlAnchorElem.setAttribute("download","priority-matrix-tasks.json");
 dlAnchorElem.click();
 toast.success("Exported tasks to JSON");
 };

 const clearTasks = () => {
 if (confirm("Are you sure you want to clear all tasks?")) {
 setTasks([]);
 toast.success("Tasks cleared");
 }
 };

 const quadrants = [
 { name:"Quick Wins", desc:"High Impact, Low Effort. Do it now.", colorClass:"bg-green-100 dark:bg-green-900/30 border-green-300"},
 { name:"Major Projects", desc:"High Impact, High Effort. Plan it.", colorClass:"bg-primary/10 dark:bg-blue-900/30 border-blue-300"},
 { name:"Fill-ins", desc:"Low Impact, Low Effort. Do it later.", colorClass:"bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300"},
 { name:"Thankless Tasks", desc:"Low Impact, High Effort. Delegate or drop.", colorClass:"bg-red-100 dark:bg-red-900/30 border-red-300"}
 ];

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Grid}
 title="Priority Matrix 2x2 Task Tracker"
 description="Organize tasks using an Impact vs Effort Matrix."
 actions={
 <>
 <ActionButton onClick={exportTasks} icon={Download} label="Export JSON"/>
 <ResetButton onClick={clearTasks} label="Clear All"/>
 </>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Add Task</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Task Title</Label>
 <Input 
 value={title} 
 onChange={(e) => setTitle(e.target.value)}
 placeholder="E.g. Redesign homepage"
 onKeyDown={(e) => e.key ==="Enter"&& addTask()}
 />
 </div>
 <div className="space-y-2">
 <Label className="flex justify-between">
 <span>Impact (1-10)</span>
 <span>{impact}</span>
 </Label>
 <input 
 type="range"
 min="1"max="10"
 value={impact} 
 onChange={(e) => setImpact(Number(e.target.value))}
 className="w-full"
 />
 </div>
 <div className="space-y-2">
 <Label className="flex justify-between">
 <span>Effort (1-10)</span>
 <span>{effort}</span>
 </Label>
 <input 
 type="range"
 min="1"max="10"
 value={effort} 
 onChange={(e) => setEffort(Number(e.target.value))}
 className="w-full"
 />
 </div>
 <Button onClick={addTask} className="w-full">
 <Plus className="w-4 h-4 mr-2"/> Add Task
 </Button>
 </CardContent>
 </GlassCard>

 <div className="md:col-span-3">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
 {quadrants.map(q => {
 const qTasks = tasks.filter(t => t.quadrant === q.name);
 return (
 <div key={q.name} className={cn("rounded-xl border p-4 flex flex-col gap-3 min-h-[250px]", q.colorClass)}>
 <div>
 <h3 className="font-bold text-lg">{q.name}</h3>
 <p className="text-xs opacity-70">{q.desc}</p>
 </div>
 <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
 {qTasks.map(t => (
 <div key={t.id} className="bg-background/80 backdrop-blur-sm p-3 rounded-lg border shadow-sm flex items-start justify-between gap-2 group">
 <div className="flex-1 min-w-0">
 <p className="font-medium text-sm truncate">{t.title}</p>
 <p className="text-[10px] text-muted-foreground mt-1">Impact: {t.impact} | Effort: {t.effort}</p>
 </div>
 <button 
 onClick={() => removeTask(t.id)}
 className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
 >
 <Trash2 className="w-4 h-4"/>
 </button>
 </div>
 ))}
 {qTasks.length === 0 && (
 <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm italic opacity-50">
 No tasks
 </div>
 )}
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Priority Matrix 2x2 Task Tracker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Priority Matrix 2x2 Task Tracker provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/priority-matrix-2x2" max={6} />

</div>
 );
}
