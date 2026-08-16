"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { CheckSquare, ChevronLeft, ChevronRight, Download, Flag, Kanban, Layout, MoveRight, Plus, StickyNote } from"lucide-react";
import { toast } from"react-hot-toast";

type Task = {
 id: string;
 title: string;
 description: string;
 category: string;
 dueDate: string;
 status:"Backlog"|"Low Priority"|"Medium Priority"|"High Priority"|"Urgent / Blocking";
};

const columns = ["Backlog","Low Priority","Medium Priority","High Priority","Urgent / Blocking"] as const;

export function PriorityKanbanClient() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [search, setSearch] = useState("");
 const [newTaskTitle, setNewTaskTitle] = useState("");
 const [newTaskDesc, setNewTaskDesc] = useState("");
 const [newTaskStatus, setNewTaskStatus] = useState<Task["status"]>("Backlog");

 useEffect(() => {
 const saved = localStorage.getItem("kanbanTasks");
 if (saved) {
 try {
 setTasks(JSON.parse(saved));
 } catch (e) {
 console.error(e);
 }
 }
 }, []);

 useEffect(() => {
 localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
 }, [tasks]);

 const addTask = () => {
 if (!newTaskTitle.trim()) {
 toast.error("Title is required");
 return;
 }
 const task: Task = {
 id: Date.now().toString(),
 title: newTaskTitle,
 description: newTaskDesc,
 category:"",
 dueDate:"",
 status: newTaskStatus
 };
 setTasks([...tasks, task]);
 setNewTaskTitle("");
 setNewTaskDesc("");
 toast.success("Task added");
 };

 const moveTask = (id: string, newStatus: Task["status"]) => {
 setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
 };

 const exportTasks = () => {
 const dataStr ="data:text/json;charset=utf-8,"+ encodeURIComponent(JSON.stringify(tasks, null, 2));
 const downloadAnchorNode = document.createElement('a');
 downloadAnchorNode.setAttribute("href", dataStr);
 downloadAnchorNode.setAttribute("download","kanban_tasks.json");
 document.body.appendChild(downloadAnchorNode);
 downloadAnchorNode.click();
 downloadAnchorNode.remove();
 };

 const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()));

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Layout}
 title="Priority Kanban Board"
 description="Organize tasks by priority with this simple kanban board."
 actions={
 <>
 <ActionButton onClick={exportTasks} icon={Download} label="Export JSON"/>
 <ResetButton onClick={() => { setTasks([]); toast.success("Board cleared"); }} label="Clear Board"/>
 </>
 }
 />
 
 <GlassCard>
 <CardContent className="pt-6 space-y-4">
 <div className="flex flex-col md:flex-row gap-4">
 <Input placeholder="Search tasks..."value={search} onChange={(e) => setSearch(e.target.value)} className="md:w-1/3"/>
 <div className="flex flex-1 gap-2">
 <Input placeholder="New task title"value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
 <Button onClick={addTask}><Plus className="w-4 h-4 mr-2"/> Add</Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
 {columns.map(col => (
 <GlassCard key={col} className="min-w-[250px] bg-muted/30">
 <CardHeader className="py-3 px-4">
 <CardTitle className="text-sm font-semibold">{col}</CardTitle>
 </CardHeader>
 <CardContent className="px-2 pb-2 space-y-2 h-[500px] overflow-y-auto">
 {filteredTasks.filter(t => t.status === col).map(task => (
 <div key={task.id} className="bg-background p-3 rounded-md shadow-sm border border-border flex flex-col gap-2">
 <span className="font-medium text-sm">{task.title}</span>
 {task.description && <span className="text-xs text-muted-foreground">{task.description}</span>}
 <div className="flex justify-between mt-2">
 <Button variant="ghost"size="icon"className="h-6 w-6"disabled={columns.indexOf(col) === 0} onClick={() => moveTask(task.id, columns[columns.indexOf(col) - 1])}>
 <ChevronLeft className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="icon"className="h-6 w-6 text-destructive"onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>
 <CheckSquare className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="icon"className="h-6 w-6"disabled={columns.indexOf(col) === columns.length - 1} onClick={() => moveTask(task.id, columns[columns.indexOf(col) + 1])}>
 <ChevronRight className="h-4 w-4"/>
 </Button>
 </div>
 </div>
 ))}
 </CardContent>
 </GlassCard>
 ))}
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Cards",
    description:"Create task cards.",
    icon: StickyNote,
  },
{
    step:"02",
    title:"Tag",
    description:"Mark priority level.",
    icon: Flag,
  },
{
    step:"03",
    title:"Flow",
    description:"Move across columns.",
    icon: MoveRight,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: StickyNote,
    title:"Cards",
    description:"Task items.",
  },
{
    icon: Flag,
    title:"Priority",
    description:"Level tags.",
  },
{
    icon: MoveRight,
    title:"Stages",
    description:"Todo, doing, done.",
  },
{
    icon: Kanban,
    title:"Board",
    description:"Drag and drop.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A priority kanban board adds urgency labels to a visual workflow so high-priority cards stand out as they move. Color or flag tags make importance visible at a glance. This tool combines status and priority.</p>
  <p>Priority plus flow prevents low-value work from crowding the board. The tags keep the important items front and center.</p>
  <p>Use it for project work. The tool's value is a priority-aware visual workflow.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Priority tags?",
    answer:"High, medium, low labels.",
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
    question:"Use case?",
    answer:"Active work.",
  },
{
    question:"Best with?",
    answer:"Weekly triage.",
  }
  ]}
/>
</div>
 );
}
