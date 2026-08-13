"use client";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { CheckSquare, Plus, Download, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";;
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

type Quadrant ="q1"|"q2"|"q3"|"q4";

interface Task {
 id: string;
 text: string;
 quadrant: Quadrant;
 completed: boolean;
 timeEstimate: string;
}

const QUADRANTS = {
 q1: { title:"Do First (Urgent & Important)", color:"border-l-red-500", bg:"bg-red-500/10"},
 q2: { title:"Schedule (Important, Not Urgent)", color:"border-l-blue-500", bg:"bg-blue-500/10"},
 q3: { title:"Delegate (Urgent, Not Important)", color:"border-l-yellow-500", bg:"bg-yellow-500/10"},
 q4: { title:"Eliminate (Not Urgent & Not Important)", color:"border-l-gray-500", bg:"bg-gray-500/10"},
};

export function EisenhowerChecklistClient() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [newTaskText, setNewTaskText] = useState("");
 const [newTaskQuad, setNewTaskQuad] = useState<Quadrant>("q1");
 const [newTaskTime, setNewTaskTime] = useState("");
 const [filter, setFilter] = useState<Quadrant |"all">("all");
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

 const addTask = () => {
 if (!newTaskText.trim()) {
 toast.error("Task description is required");
 return;
 }
 const newTask: Task = {
 id: Date.now().toString(),
 text: newTaskText.trim(),
 quadrant: newTaskQuad,
 completed: false,
 timeEstimate: newTaskTime.trim(),
 };
 setTasks([...tasks, newTask]);
 setNewTaskText("");
 setNewTaskTime("");
 toast.success("Task added");
 };

 const toggleTask = (id: string) => {
 setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
 };

 const deleteTask = (id: string) => {
 setTasks(tasks.filter(t => t.id !== id));
 };

 const getMarkdown = () => {
 let md ="# Eisenhower Matrix Checklist\n\n";
 (Object.keys(QUADRANTS) as Quadrant[]).forEach(q => {
 md +="##"+ QUADRANTS[q].title +"\n";
 const qTasks = tasks.filter(t => t.quadrant === q);
 if (qTasks.length === 0) md +="- No tasks\n";
 qTasks.forEach(t => {
 md +="- ["+ (t.completed ?"x":"") +"]"+ t.text;
 if (t.timeEstimate) md +="("+ t.timeEstimate +")";
 md +="\n";
 });
 md +="\n";
 });
 return md;
 };

 const handleDownload = () => {
 const blob = new Blob([getMarkdown()], { type:"text/markdown"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="eisenhower-matrix.md";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("Downloaded Markdown file");
 };

 return (
 <div className={"space-y-6"}>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 title="Eisenhower Urgency Matrix Checklist"
 description="Organize tasks effectively using the Eisenhower Matrix methodology."
 icon={CheckSquare}
 actions={
 <>
 <CopyButton getText={getMarkdown} label="Copy MD"/>
 <ActionButton onClick={handleDownload} icon={Download} label="Export"/>
 <ResetButton onClick={() => setTasks([])} label="Clear All"/>
 </>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Add New Task</CardTitle>
 </CardHeader>
 <CardContent>
 <div className={"flex flex-col md:flex-row gap-4"}>
 <div className={"flex-1"}>
 <Input
 placeholder="What needs to be done?"
 value={newTaskText}
 onChange={(e) => setNewTaskText(e.target.value)}
 onKeyDown={(e) => e.key ==="Enter"&& addTask()}
 />
 </div>
 <div className={"w-full md:w-32"}>
 <Input
 placeholder="Time (e.g. 30m)"
 value={newTaskTime}
 onChange={(e) => setNewTaskTime(e.target.value)}
 onKeyDown={(e) => e.key ==="Enter"&& addTask()}
 />
 </div>
 <div className={"w-full md:w-48"}>
 <Select value={newTaskQuad} onValueChange={(val: Quadrant) => setNewTaskQuad(val)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {Object.entries(QUADRANTS).map(([k, v]) => (
 <SelectItem key={k} value={k}>{v.title}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 <Button onClick={addTask} className={"shrink-0"}><Plus className={"w-4 h-4 mr-2"} /> Add</Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={"flex flex-row items-center justify-between"}>
 <CardTitle>Task Matrix</CardTitle>
 <div className={"w-48"}>
 <Select value={filter} onValueChange={(val: any) => setFilter(val)}>
 <SelectTrigger>
 <SelectValue placeholder="Filter tasks"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="all">Show All Quadrants</SelectItem>
 {Object.entries(QUADRANTS).map(([k, v]) => (
 <SelectItem key={k} value={k}>{v.title}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 </CardHeader>
 <CardContent>
 <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
 {(Object.entries(QUADRANTS) as [Quadrant, any][]).filter(([k]) => filter ==="all"|| filter === k).map(([q, details]) => {
 const qTasks = tasks.filter(t => t.quadrant === q);
 const completed = qTasks.filter(t => t.completed).length;
 const progress = qTasks.length ? Math.round((completed / qTasks.length) * 100) : 0;
 
 return (
 <div key={q} className={"border rounded-lg overflow-hidden"}>
 <div className={cn("p-3 border-b flex justify-between items-center", details.bg)}>
 <h3 className={"font-semibold text-sm"}>{details.title}</h3>
 <span className={"text-xs text-muted-foreground"}>{completed}/{qTasks.length} ({progress}%)</span>
 </div>
 <div className={"p-0"}>
 {qTasks.length === 0 ? (
 <div className={"p-4 text-center text-sm text-muted-foreground"}>No tasks</div>
 ) : (
 <ul className={"divide-y"}>
 {qTasks.map(t => (
 <li key={t.id} className={"flex items-center p-3 gap-3 hover:bg-secondary/20 transition-colors"}>
 <input
 type="checkbox"
 checked={t.completed}
 onChange={() => toggleTask(t.id)}
 className={"w-4 h-4 rounded border-gray-300 accent-primary"}
 />
 <div className={"flex-1 min-w-0"}>
 <p className={cn("text-sm", (t.completed ?"line-through text-muted-foreground":""))}>{t.text}</p>
 {t.timeEstimate && (
 <span className={"text-xs text-muted-foreground"}>⏱ {t.timeEstimate}</span>
 )}
 </div>
 <Button variant="ghost"size="icon"className={"h-8 w-8 text-destructive opacity-50 hover:opacity-100"} onClick={() => deleteTask(t.id)}>
 <Trash2 className={"w-4 h-4"} />
 </Button>
 </li>
 ))}
 </ul>
 )}
 </div>
 </div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>
 
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
          <h3>Why Use Our Eisenhower Urgency Matrix Checklist?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Eisenhower Urgency Matrix Checklist provides
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

      <RelatedTools currentToolUrl="/tools/productivity/eisenhower-checklist" max={6} />

</div>
 );
}
