"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CheckSquare, Plus, Download, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";;
import { CopyButton, ActionButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

type Priority ="do-first"|"schedule"|"delegate"|"eliminate";

interface Task {
 id: string;
 title: string;
 targetTime: string;
 owner: string;
 category: string;
 priority: Priority;
 completed: boolean;
}

export function DailyPriorityActionBoardClient() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [newTaskTitle, setNewTaskTitle] = useState("");
 const [newTaskTime, setNewTaskTime] = useState("");
 const [newTaskOwner, setNewTaskOwner] = useState("");
 const [newTaskCategory, setNewTaskCategory] = useState("");
 const [newTaskPriority, setNewTaskPriority] = useState<Priority>("do-first");

 useEffect(() => {
 const saved = localStorage.getItem("dailyPriorityTasks");
 if (saved) {
 try {
 setTasks(JSON.parse(saved));
 } catch (e) {
 // ignore
 }
 }
 }, []);

 const saveTasks = (newTasks: Task[]) => {
 setTasks(newTasks);
 localStorage.setItem("dailyPriorityTasks", JSON.stringify(newTasks));
 };

 const addTask = () => {
 if (!newTaskTitle.trim()) {
 toast.error("Task title is required");
 return;
 }
 const newTask: Task = {
 id: Date.now().toString(),
 title: newTaskTitle,
 targetTime: newTaskTime,
 owner: newTaskOwner,
 category: newTaskCategory,
 priority: newTaskPriority,
 completed: false,
 };
 saveTasks([...tasks, newTask]);
 setNewTaskTitle("");
 setNewTaskTime("");
 setNewTaskOwner("");
 setNewTaskCategory("");
 toast.success("Task added");
 };

 const toggleTask = (id: string) => {
 const newTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
 saveTasks(newTasks);
 };

 const deleteTask = (id: string) => {
 const newTasks = tasks.filter(t => t.id !== id);
 saveTasks(newTasks);
 };

 const getExportMarkdown = () => {
 let md ="# Daily Priority Task Board\n\n";
 const buckets: { key: Priority, label: string }[] = [
 { key:"do-first", label:"Do First (Urgent & Important)"},
 { key:"schedule", label:"Schedule Later (Not Urgent & Important)"},
 { key:"delegate", label:"Delegate (Urgent & Not Important)"},
 { key:"eliminate", label:"Eliminate (Not Urgent & Not Important)"},
 ];

 buckets.forEach(bucket => {
 md +="##"+ bucket.label +"\n";
 const bucketTasks = tasks.filter(t => t.priority === bucket.key);
 if (bucketTasks.length === 0) {
 md +="_No tasks_\n\n";
 } else {
 bucketTasks.forEach(t => {
 md +="- ["+ (t.completed ?"x":"") +"]"+ t.title +"";
 const tags = [];
 if (t.targetTime) tags.push("Time:"+ t.targetTime);
 if (t.owner) tags.push("Owner:"+ t.owner);
 if (t.category) tags.push("Cat:"+ t.category);
 if (tags.length > 0) md +="("+ tags.join(",") +")";
 md +="\n";
 });
 md +="\n";
 }
 });
 return md;
 };

 const downloadMarkdown = () => {
 const blob = new Blob([getExportMarkdown()], { type:"text/markdown"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="priority-tasks.md";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("Exported as Markdown");
 };

 const renderBucket = (priority: Priority, title: string, colorClass: string, bgClass: string) => {
 const bucketTasks = tasks.filter(t => t.priority === priority);
 const completedCount = bucketTasks.filter(t => t.completed).length;
 const progress = bucketTasks.length === 0 ? 0 : (completedCount / bucketTasks.length) * 100;

 return (
 <GlassCard className={cn("h-full flex flex-col", bgClass)}>
 <CardHeader className="pb-2">
 <CardTitle className={cn("text-lg flex justify-between items-center", colorClass)}>
 <span>{title}</span>
 <span className="text-sm font-normal text-muted-foreground">{completedCount}/{bucketTasks.length}</span>
 </CardTitle>
 <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-2">
      <GridPattern />

 <div className={cn("h-full transition-all duration-300", colorClass.replace("text-","bg-"))} style={{ width: progress +"%"}} />
 </div>
 </CardHeader>
 <CardContent className="flex-1 overflow-auto max-h-[300px] space-y-2">
 {bucketTasks.length === 0 ? (
 <div className="text-sm text-muted-foreground text-center py-4">No tasks</div>
 ) : (
 bucketTasks.map(t => (
 <div key={t.id} className="flex items-start gap-2 bg-background/50 p-2 rounded-md border text-sm group">
 <button 
 onClick={() => toggleTask(t.id)} 
 className={cn("mt-0.5 flex-shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center", (t.completed ?"bg-primary border-primary text-primary-foreground":"border-muted-foreground"))}
 >
 {t.completed && <CheckSquare className="w-3 h-3"/>}
 </button>
 <div className="flex-1 min-w-0">
 <div className={cn("font-medium transition-all", (t.completed ?"line-through text-muted-foreground":""))}>
 {t.title}
 </div>
 <div className="flex flex-wrap gap-1 mt-1">
 {t.targetTime && <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">{t.targetTime}</span>}
 {t.owner && <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">{t.owner}</span>}
 {t.category && <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">{t.category}</span>}
 </div>
 </div>
 <button onClick={() => deleteTask(t.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity">
 <Trash2 className="w-4 h-4"/>
 </button>
 </div>
 ))
 )}
 </CardContent>
 </GlassCard>
 );
 };

 const totalTasks = tasks.length;
 const totalCompleted = tasks.filter(t => t.completed).length;
 const overallProgress = totalTasks === 0 ? 0 : Math.round((totalCompleted / totalTasks) * 100);

 return (
      <div className="relative space-y-6">
 <ToolPageHeader 
 icon={CheckSquare}
 title="Daily Priority Action Board"
 description="Organize your day using the Eisenhower Matrix method."
 actions={
 <div className="flex space-x-2">
 <CopyButton getText={getExportMarkdown} label="Copy Markdown"/>
 <ActionButton onClick={downloadMarkdown} icon={Download} label="Export"/>
 </div>
 }
 />

 <GlassCard>
 <CardContent className="pt-6">
 <div className="flex flex-col md:flex-row gap-4 items-end">
 <div className="flex-1 space-y-2 w-full">
 <Label>New Task Title</Label>
 <Input value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="What needs to be done?"onKeyDown={(e) => e.key ==="Enter"&& addTask()} />
 </div>
 <div className="w-full md:w-32 space-y-2">
 <Label>Priority</Label>
 <Select value={newTaskPriority} onValueChange={(val: Priority) => setNewTaskPriority(val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="do-first">Do First</SelectItem>
 <SelectItem value="schedule">Schedule</SelectItem>
 <SelectItem value="delegate">Delegate</SelectItem>
 <SelectItem value="eliminate">Eliminate</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="w-full md:w-24 space-y-2">
 <Label>Time</Label>
 <Input value={newTaskTime} onChange={(e) => setNewTaskTime(e.target.value)} placeholder="e.g. 10:00"/>
 </div>
 <div className="w-full md:w-24 space-y-2">
 <Label>Owner</Label>
 <Input value={newTaskOwner} onChange={(e) => setNewTaskOwner(e.target.value)} placeholder="Who?"/>
 </div>
 <div className="w-full md:w-24 space-y-2">
 <Label>Category</Label>
 <Input value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)} placeholder="Tag"/>
 </div>
 <Button onClick={addTask} className="w-full md:w-auto"><Plus className="w-4 h-4 mr-2"/> Add</Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className="flex items-center gap-4">
 <div className="flex-1">
 <div className="flex justify-between mb-1">
 <span className="text-sm font-medium">Daily Progress</span>
 <span className="text-sm text-muted-foreground">{overallProgress}%</span>
 </div>
 <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
 <div className="h-full bg-primary transition-all duration-500"style={{ width: overallProgress +"%"}} />
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {renderBucket("do-first","Do First (Urgent & Important)","text-red-500","bg-red-500/5")}
 {renderBucket("schedule","Schedule Later (Not Urgent, Important)","text-primary","bg-blue-500/5")}
 {renderBucket("delegate","Delegate (Urgent, Not Important)","text-amber-500","bg-amber-500/5")}
 {renderBucket("eliminate","Eliminate (Not Urgent, Not Important)","text-muted-foreground dark:text-gray-400","bg-gray-500/5")}
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
          <h3>Why Use Our Daily Priority Action Board?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Daily Priority Action Board provides
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

      <RelatedTools currentToolUrl="/tools/productivity/daily-priority-action-board" max={6} />

</div>
 );
}
