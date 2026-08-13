"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Button } from"@/components/ui/button";
import { ResetButton } from"@/components/shared/action-buttons";
import { LayoutGrid, Plus, Check, ArrowRight, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type Task = {
 id: string;
 text: string;
 quadrant: 1 | 2 | 3 | 4;
 completed: boolean;
};

export function EisenhowerMatrixClient() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [newTaskText, setNewTaskText] = useState("");
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
 const saved = localStorage.getItem("eisenhower-tasks");
 if (saved) {
 try {
 setTasks(JSON.parse(saved));
 } catch (e) {
 console.error(e);
 }
 }
 setIsLoaded(true);
 }, []);

 useEffect(() => {
 if (isLoaded) {
 localStorage.setItem("eisenhower-tasks", JSON.stringify(tasks));
 }
 }, [tasks]);

 const addTask = (quadrant: 1 | 2 | 3 | 4 = 1) => {
 if (!newTaskText.trim()) {
 toast.error("Task description cannot be empty");
 return;
 }
 const newTask: Task = {
 id: crypto.randomUUID(),
 text: newTaskText.trim(),
 quadrant,
 completed: false,
 };
 setTasks((prev) => [...prev, newTask]);
 setNewTaskText("");
 toast.success("Task added");
 };

 const toggleTask = (id: string) => {
 setTasks((prev) =>
 prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
 );
 };

 const deleteTask = (id: string) => {
 setTasks((prev) => prev.filter((t) => t.id !== id));
 };

 const moveTask = (id: string, quadrant: 1 | 2 | 3 | 4) => {
 setTasks((prev) =>
 prev.map((t) => (t.id === id ? { ...t, quadrant } : t))
 );
 };

 const resetTasks = () => {
 if (window.confirm("Are you sure you want to delete all tasks?")) {
 setTasks([]);
 toast.success("Tasks reset");
 }
 };

 const quadrants = [
 { id: 1, name:"Do First", desc:"Urgent & Important", color:"border-red-500 bg-red-500/10"},
 { id: 2, name:"Schedule", desc:"Not Urgent, Important", color:"border-yellow-500 bg-yellow-500/10"},
 { id: 3, name:"Delegate", desc:"Urgent, Not Important", color:"border-blue-500 bg-blue-500/10"},
 { id: 4, name:"Eliminate", desc:"Not Urgent, Not Important", color:"border-gray-500 bg-gray-500/10"},
 ] as const;

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={LayoutGrid}
 title="Eisenhower Matrix"
 description="Prioritize your tasks by urgency and importance."
 actions={<ResetButton onClick={resetTasks} label="Reset Tasks"/>}
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Add Task</CardTitle>
 <CardDescription>Enter a new task and add it to the first quadrant. You can move it later.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-col sm:flex-row gap-4">
 <Input
 placeholder="E.g., Finish project proposal..."
 value={newTaskText}
 onChange={(e) => setNewTaskText(e.target.value)}
 onKeyDown={(e) => {
 if (e.key ==="Enter") addTask(1);
 }}
 className="flex-1"
 />
 <Button onClick={() => addTask(1)}>
 <Plus className="h-4 w-4 mr-2"/>
 Add Task
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {quadrants.map((q) => {
 const qTasks = tasks.filter((t) => t.quadrant === q.id);
 return (
 <GlassCard key={q.id} className={cn("border-t-4", q.color.split("")[0])}>
 <CardHeader className="pb-2">
 <CardTitle className="flex justify-between items-center text-lg">
 {q.name}
 <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-1 rounded-full">
 {qTasks.length} {qTasks.length === 1 ?"task":"tasks"}
 </span>
 </CardTitle>
 <CardDescription>{q.desc}</CardDescription>
 </CardHeader>
 <CardContent className="space-y-3">
 {qTasks.length === 0 ? (
 <p className="text-sm text-muted-foreground italic text-center py-4">No tasks in this quadrant.</p>
 ) : (
 qTasks.map((t) => (
 <div
 key={t.id}
 className={cn(
"flex flex-col gap-2 p-3 rounded-md border",
 t.completed ?"opacity-60 bg-muted/50":"bg-card"
 )}
 >
 <div className="flex items-start justify-between gap-2">
 <div className="flex items-start gap-2 flex-1">
 <Button
 variant="ghost"
 size="icon"
 className="h-6 w-6 mt-0.5 shrink-0"
 onClick={() => toggleTask(t.id)}
 >
 <Check className={cn("h-4 w-4", t.completed ?"text-green-500":"text-muted-foreground")} />
 </Button>
 <span className={cn("text-sm break-all", t.completed &&"line-through")}>
 {t.text}
 </span>
 </div>
 <Button
 variant="ghost"
 size="icon"
 className="h-6 w-6 text-destructive shrink-0 hover:text-destructive hover:bg-destructive/10"
 onClick={() => deleteTask(t.id)}
 >
 <Trash2 className="h-4 w-4"/>
 </Button>
 </div>
 <div className="flex gap-1 justify-end pl-8">
 {quadrants.map((mq) => (
 mq.id !== q.id && (
 <Button
 key={mq.id}
 variant="outline"
 size="sm"
 className="h-6 text-[10px] px-2 py-0"
 onClick={() => moveTask(t.id, mq.id as 1|2|3|4)}
 >
 Move to {mq.name}
 </Button>
 )
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
          <h3>Why Use Our Eisenhower Matrix?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Eisenhower Matrix provides
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

      <RelatedTools currentToolUrl="/tools/productivity/eisenhower-matrix" max={6} />

</div>
 );
}
