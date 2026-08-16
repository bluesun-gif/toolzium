"use client";
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
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, CheckSquare, Download, Grid2x2, Kanban, Layout, MoveRight, Plus, StickyNote, Trash2 } from"lucide-react";
import { ActionButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";

type Priority ="DO"|"SCHEDULE"|"DELEGATE"|"ELIMINATE";

interface Task {
 id: string;
 title: string;
 description: string;
 dueDate: string;
 priority: Priority;
}

const COLUMNS: { id: Priority; title: string; desc: string; color: string }[] = [
 { id:"DO", title:"Do First", desc:"Urgent & Important", color:"border-t-4 border-t-red-500"},
 { id:"SCHEDULE", title:"Schedule", desc:"Not Urgent & Important", color:"border-t-4 border-t-blue-500"},
 { id:"DELEGATE", title:"Delegate", desc:"Urgent & Not Important", color:"border-t-4 border-t-yellow-500"},
 { id:"ELIMINATE", title:"Eliminate", desc:"Not Urgent & Not Important", color:"border-t-4 border-t-gray-500"}
];

export function EisenhowerKanbanClient() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [newTaskTitle, setNewTaskTitle] = useState("");
 const [newTaskDesc, setNewTaskDesc] = useState("");
 const [newTaskDate, setNewTaskDate] = useState("");
 const [filterText, setFilterText] = useState("");

 useEffect(() => {
 const saved = localStorage.getItem("eisenhower-tasks");
 if (saved) {
 try {
 setTasks(JSON.parse(saved));
 } catch (e) {
 console.error("Failed to parse saved tasks", e);
 }
 }
 }, []);

 useEffect(() => {
 localStorage.setItem("eisenhower-tasks", JSON.stringify(tasks));
 }, [tasks]);

 const addTask = (priority: Priority ="DO") => {
 if (!newTaskTitle.trim()) {
 toast.error("Title is required");
 return;
 }
 const newTask: Task = {
 id: Date.now().toString(),
 title: newTaskTitle,
 description: newTaskDesc,
 dueDate: newTaskDate,
 priority
 };
 setTasks([...tasks, newTask]);
 setNewTaskTitle("");
 setNewTaskDesc("");
 setNewTaskDate("");
 toast.success("Task added");
 };

 const removeTask = (id: string) => {
 setTasks(tasks.filter(t => t.id !== id));
 };

 const moveTask = (id: string, newPriority: Priority) => {
 setTasks(tasks.map(t => t.id === id ? { ...t, priority: newPriority } : t));
 };

 const exportBoard = () => {
 const dataStr ="data:text/json;charset=utf-8,"+ encodeURIComponent(JSON.stringify(tasks, null, 2));
 const node = document.createElement('a');
 node.setAttribute("href", dataStr);
 node.setAttribute("download","eisenhower_board.json");
 document.body.appendChild(node);
 node.click();
 node.remove();
 toast.success("Board exported!");
 };

 const filteredTasks = tasks.filter(t => 
 t.title.toLowerCase().includes(filterText.toLowerCase()) || 
 t.description.toLowerCase().includes(filterText.toLowerCase())
 );

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Layout}
 title="Eisenhower Kanban Board"
 description="Organize your tasks using the Eisenhower Urgency/Importance matrix."
 actions={
 <div className="flex space-x-2">
 <ActionButton onClick={exportBoard} icon={Download} label="Export JSON"/>
 </div>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Add New Task</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid md:grid-cols-4 gap-4 items-end">
 <div className="space-y-2">
 <Label>Task Title</Label>
 <Input placeholder="E.g., Finish report"value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Description</Label>
 <Input placeholder="Optional details..."value={newTaskDesc} onChange={e => setNewTaskDesc(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Due Date</Label>
 <Input type="date"value={newTaskDate} onChange={e => setNewTaskDate(e.target.value)} />
 </div>
 <Button onClick={() => addTask("DO")} className="w-full">
 <Plus className="w-4 h-4 mr-2"/> Add Task
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className="mb-4">
 <Input 
 placeholder="Filter tasks..."
 value={filterText} 
 onChange={e => setFilterText(e.target.value)}
 className="max-w-md"
 />
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
 {COLUMNS.map(col => (
 <div key={col.id} className={"bg-card rounded-xl border shadow-sm flex flex-col h-[600px] overflow-hidden"+ col.color}>
 <div className="p-4 border-b bg-muted/30">
 <h3 className="font-bold text-lg">{col.title}</h3>
 <p className="text-xs text-muted-foreground">{col.desc}</p>
 </div>
 <div className="p-4 flex-1 overflow-y-auto space-y-4">
 {filteredTasks.filter(t => t.priority === col.id).map(task => (
 <div key={task.id} className="bg-background border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
 <div className="flex justify-between items-start mb-2">
 <h4 className="font-semibold text-sm break-words flex-1 pr-2">{task.title}</h4>
 <Button variant="ghost"size="icon"className="h-6 w-6 text-destructive flex-shrink-0"onClick={() => removeTask(task.id)}>
 <Trash2 className="h-4 w-4"/>
 </Button>
 </div>
 {task.description && <p className="text-xs text-muted-foreground mb-2 break-words">{task.description}</p>}
 {task.dueDate && <p className="text-xs font-medium text-primary mb-2">Due: {task.dueDate}</p>}
 
 <div className="flex justify-between pt-2 border-t mt-2">
 <select 
 className="text-xs bg-transparent border rounded p-1 w-full cursor-pointer"
 value={task.priority}
 onChange={(e) => moveTask(task.id, e.target.value as Priority)}
 >
 {COLUMNS.map(c => (
 <option key={c.id} value={c.id}>Move to {c.title}</option>
 ))}
 </select>
 </div>
 </div>
 ))}
 {filteredTasks.filter(t => t.priority === col.id).length === 0 && (
 <div className="text-center text-sm text-muted-foreground italic py-8">
 No tasks here
 </div>
 )}
 </div>
 </div>
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
    description:"Mark urgent and important.",
    icon: Grid2x2,
  },
{
    step:"03",
    title:"Flow",
    description:"Move across stages.",
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
    icon: Grid2x2,
    title:"Tags",
    description:"Matrix dimensions.",
  },
{
    icon: MoveRight,
    title:"Stages",
    description:"Flow columns.",
  },
{
    icon: Kanban,
    title:"Board",
    description:"Drag and drop.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An Eisenhower kanban board combines visual workflow with priority tags, so cards flow across stages while carrying urgent-important classification. You see both status and importance at once. This tool merges the two methods.</p>
  <p>Flow plus priority prevents the common failure of doing low-value work that happens to be visible. The board keeps importance in view.</p>
  <p>Use it for active project work. The tool's value is status and priority in one visual system.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Board + matrix?",
    answer:"Visual flow with priority tags.",
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
    answer:"Ongoing work.",
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
