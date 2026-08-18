"use client";

import { ToolBackground } from "@/components/shared/tool-background";

import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";

import ToolFeatureGuides from"@/components/shared/tool-feature-guides";

import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";

import ToolPageHeader from"@/components/shared/tool-page-header";

import { GlassCard } from"@/components/ui/glass-card";

import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";

import { Button } from"@/components/ui/button";

import { Input } from"@/components/ui/input";

import { Label } from"@/components/ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";

import { Calendar, CalendarRange, CheckSquare, Download, Grid2x2, Plus, Target, Trash2, TrendingUp } from"lucide-react";

import toast from"react-hot-toast";

import { GridPattern } from"@/components/magicui/grid-pattern";

import { cn } from"@/lib/utils";

type Task = { id: string; title: string; bucket: string; date: string; hours: string; owner: string; completed: boolean };

export function EisenhowerGoalsClient() {

 const [tasks, setTasks] = useState<Task[]>([]);

 const [newTask, setNewTask] = useState({ title:"", bucket:"do_now", date:"", hours:"", owner:""});

 useEffect(() => {

 const saved = localStorage.getItem("eisenhowerTasks");

 if (saved) setTasks(JSON.parse(saved));

 }, []);

 const saveTasks = (t: Task[]) => {

 setTasks(t);

 localStorage.setItem("eisenhowerTasks", JSON.stringify(t));

 };

 const addTask = () => {

 if (!newTask.title) {

 toast.error("Task title is required");

 return;

 }

 const t: Task = { ...newTask, id: Date.now().toString(), completed: false };

 saveTasks([...tasks, t]);

 setNewTask({ title:"", bucket:"do_now", date:"", hours:"", owner:""});

 toast.success("Task added");

 };

 const toggleTask = (id: string) => {

 saveTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

 };

 const deleteTask = (id: string) => {

 saveTasks(tasks.filter(t => t.id !== id));

 };

 const exportTasks = () => {

 let md ="# Eisenhower Goals\n\n";

 ["do_now","schedule","delegate","delete"].forEach(bucket => {

 md +="##"+ bucket.replace("_","").toUpperCase() +"\n";

 tasks.filter(t => t.bucket === bucket).forEach(t => {

 md +="- ["+ (t.completed ?"x":"") +"]"+ t.title + (t.owner ?"(Owner:"+ t.owner +")":"") + (t.date ?"(Due:"+ t.date +")":"") +"\n";

 });

 md +="\n";

 });

 const blob = new Blob([md], { type:"text/markdown"});

 const url = URL.createObjectURL(blob);

 const a = document.createElement("a");

 a.href = url;

 a.download ="eisenhower-goals.md";

 a.click();

 URL.revokeObjectURL(url);

 };

 const BucketCol = ({ id, title, description, colorClass }: { id: string, title: string, description: string, colorClass: string }) => {

 const bucketTasks = tasks.filter(t => t.bucket === id);

 return (

 <div className={cn("flex flex-col h-full rounded-xl border-2 p-4", colorClass)}>

      <ToolBackground />

 <div className="mb-4">

 <h3 className="text-lg font-bold">{title}</h3>

 <p className="text-xs opacity-80">{description}</p>

 </div>

 <div className="flex-1 space-y-2 overflow-y-auto min-h-[200px]">

 {bucketTasks.map(t => (

 <div key={t.id} className="flex items-start gap-2 p-2 bg-background/50 backdrop-blur rounded shadow-sm">

 <input type="checkbox"checked={t.completed} onChange={() => toggleTask(t.id)} className="mt-1"/>

 <div className={cn("flex-1 text-sm", (t.completed ?"line-through opacity-50":""))}>

 <div className="font-medium">{t.title}</div>

 <div className="text-xs flex gap-2 mt-1">

 {t.date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {t.date}</span>}

 {t.owner && <span className="flex items-center gap-1">👤 {t.owner}</span>}

 {t.hours && <span>⏳ {t.hours}h</span>}

 </div>

 </div>

 <Button variant="ghost"size="icon"className="h-6 w-6 text-red-500"onClick={() => deleteTask(t.id)}>

 <Trash2 className="w-3 h-3"/>

 </Button>

 </div>

 ))}

 {bucketTasks.length === 0 && <div className="text-center text-sm opacity-50 py-4">No tasks</div>}

 </div>

 </div>

 );

 };

 return (

      <div className="relative space-y-6">

 <ToolPageHeader

 title="Eisenhower Planner"

 description="Map goals to 4 actionable buckets."

 icon={CheckSquare}

 actions={

 <Button variant="outline"onClick={exportTasks}>

 <Download className="w-4 h-4 mr-2"/> Export MD

 </Button>

 }

 />

 <GlassCard>

 <CardContent className="p-6">

 <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

 <div className="space-y-2 md:col-span-2">

 <Label>Task Title</Label>

 <Input value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} placeholder="What needs to be done?"/>

 </div>

 <div className="space-y-2">

 <Label>Bucket</Label>

 <Select value={newTask.bucket} onValueChange={v => setNewTask({...newTask, bucket: v})}>

 <SelectTrigger><SelectValue /></SelectTrigger>

 <SelectContent>

 <SelectItem value="do_now">Do Now (Urgent/Important)</SelectItem>

 <SelectItem value="schedule">Schedule (Not Urgent/Important)</SelectItem>

 <SelectItem value="delegate">Delegate (Urgent/Not Important)</SelectItem>

 <SelectItem value="delete">Delete (Not Urgent/Not Important)</SelectItem>

 </SelectContent>

 </Select>

 </div>

 <div className="space-y-2">

 <Label>Due Date</Label>

 <Input type="date"value={newTask.date} onChange={e => setNewTask({...newTask, date: e.target.value})} />

 </div>

 <div className="space-y-2">

 <Label>Owner / Est. Hrs</Label>

 <div className="flex gap-2">

 <Input value={newTask.owner} onChange={e => setNewTask({...newTask, owner: e.target.value})} placeholder="Who?"className="w-full"/>

 <Input type="number"value={newTask.hours} onChange={e => setNewTask({...newTask, hours: e.target.value})} placeholder="Hrs"className="w-20"/>

 </div>

 </div>

 <div className="md:col-span-5 flex justify-end">

 <Button onClick={addTask}><Plus className="w-4 h-4 mr-2"/> Add Task</Button>

 </div>

 </div>

 </CardContent>

 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">

 <BucketCol id="do_now"title="Do Now"description="Urgent & Important"colorClass="bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300"/>

 <BucketCol id="schedule"title="Schedule"description="Not Urgent & Important"colorClass="bg-blue-500/10 border-blue-500/30 text-primary"/>

 <BucketCol id="delegate"title="Delegate"description="Urgent & Not Important"colorClass="bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-300"/>

 <BucketCol id="delete"title="Delete"description="Not Urgent & Not Important"colorClass="bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300"/>

 

 

<ToolHowItWorks

  steps={[

{

    step:"01",

    title:"Add Goals",

    description:"List objectives.",

    icon: Target,

  },

{

    step:"02",

    title:"Classify",

    description:"Urgent vs important.",

    icon: Grid2x2,

  },

{

    step:"03",

    title:"Plan",

    description:"Schedule the important.",

    icon: CalendarRange,

  }

  ]}

  badges={["Free Forever","No Signup","Instant Results"]}

/>

<ToolFeatureGuides

  features={[

{

    icon: Target,

    title:"Goals",

    description:"Your objectives.",

  },

{

    icon: Grid2x2,

    title:"Matrix",

    description:"Two dimensions.",

  },

{

    icon: CalendarRange,

    title:"Schedule",

    description:"Time the important.",

  },

{

    icon: TrendingUp,

    title:"Progress",

    description:"Track movement.",

  }

  ]}

>

  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">

  <p>An Eisenhower planner applies the matrix to goals, not just tasks, so meaningful objectives get scheduled instead of perpetually postponed. Important-but-not-urgent goals die without a date. This tool classifies and schedules them.</p>

  <p>The discipline is booking important work. The planner turns &quot;someday&quot; into calendar entries, making progress likely.</p>

  <p>Use it in planning sessions. The tool's value is protecting long-term goals from daily urgency.</p>

  </div>

</ToolFeatureGuides>

<ToolFaqAccordion

  faqs={[

{

    question:"Goals vs tasks?",

    answer:"Goals are bigger outcomes.",

  },

{

    question:"Schedule important?",

    answer:"Yes, or it gets skipped.",

  },

{

    question:"Free?",

    answer:"Yes.",

  },

{

    question:"Private?",

    answer:"Local.",

  },

{

    question:"Use with?",

    answer:"Weekly review.",

  }

  ]}

/>
    </div>
    </div>
);
}

export default EisenhowerGoalsClient;
