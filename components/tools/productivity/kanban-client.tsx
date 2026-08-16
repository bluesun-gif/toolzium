"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { ArrowLeft, ArrowRight, Check, Columns3, Kanban, LayoutGrid, MoveRight, Plus, StickyNote, Trash2 } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

interface Task {
 id: string;
 title: string;
 description: string;
 columnId: string;
}

interface Column {
 id: string;
 title: string;
 color: string;
}

const DEFAULT_COLUMNS: Column[] = [
 { id:"todo", title:"To Do", color:"border-l-4 border-l-blue-500"},
 { id:"inprogress", title:"In Progress", color:"border-l-4 border-l-amber-500"},
 { id:"done", title:"Done", color:"border-l-4 border-l-green-500"},
];

export function KanbanClient() {
 const [columns, setColumns] = useState<Column[]>(DEFAULT_COLUMNS);
 const [tasks, setTasks] = useState<Task[]>([]);
 const [isLoaded, setIsLoaded] = useState(false);
 const [newTaskTitle, setNewTaskTitle] = useState("");
 const [newTaskDesc, setNewTaskDesc] = useState("");
 const [newColumnTitle, setNewColumnTitle] = useState("");

 useEffect(() => {
 const savedTasks = localStorage.getItem("kanban-tasks");
 const savedCols = localStorage.getItem("kanban-columns");
 if (savedTasks) setTasks(JSON.parse(savedTasks));
 if (savedCols) setColumns(JSON.parse(savedCols));
 setIsLoaded(true);
 }, []);

 useEffect(() => {
 if (isLoaded) {
 localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
 localStorage.setItem("kanban-columns", JSON.stringify(columns));
 }
 }, [tasks, columns, isLoaded]);

 const handleReset = () => {
 setColumns(DEFAULT_COLUMNS);
 setTasks([]);
 toast.success("Board reset to default");
 };

 const handleAddTask = () => {
 if (!newTaskTitle.trim()) {
 toast.error("Task title is required.");
 return;
 }
 const newTask: Task = {
 id: Date.now().toString(),
 title: newTaskTitle,
 description: newTaskDesc,
 columnId: columns[0].id,
 };
 setTasks([...tasks, newTask]);
 setNewTaskTitle("");
 setNewTaskDesc("");
 toast.success("Task added");
 };

 const handleAddColumn = () => {
 if (!newColumnTitle.trim()) {
 toast.error("Column title is required.");
 return;
 }
 const newCol: Column = {
 id: `col-${Date.now()}`,
 title: newColumnTitle,
 color:"border-l-4 border-l-gray-500",
 };
 setColumns([...columns, newCol]);
 setNewColumnTitle("");
 toast.success("Column added");
 };

 const handleDeleteTask = (id: string) => {
 setTasks(tasks.filter(t => t.id !== id));
 };

 const handleClearDone = () => {
 // Attempt to clear from the last column or"done"col
 const doneColId = columns.find(c => c.id ==="done")?.id || columns[columns.length - 1].id;
 setTasks(tasks.filter(t => t.columnId !== doneColId));
 toast.success("Cleared completed tasks");
 };

 const moveTask = (taskId: string, direction:"left"|"right") => {
 const taskIndex = tasks.findIndex(t => t.id === taskId);
 if (taskIndex === -1) return;
 
 const task = tasks[taskIndex];
 const colIndex = columns.findIndex(c => c.id === task.columnId);
 
 if (direction ==="left"&& colIndex > 0) {
 const updatedTasks = [...tasks];
 updatedTasks[taskIndex].columnId = columns[colIndex - 1].id;
 setTasks(updatedTasks);
 } else if (direction ==="right"&& colIndex < columns.length - 1) {
 const updatedTasks = [...tasks];
 updatedTasks[taskIndex].columnId = columns[colIndex + 1].id;
 setTasks(updatedTasks);
 }
 };

 if (!isLoaded) return null; // Avoid hydration mismatch

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={LayoutGrid}
 title="Kanban Board"
 description="Organize your tasks visually with a customizable Kanban board."
 actions={
 <>
 <ActionButton onClick={handleClearDone} icon={Check} label="Clear Done"variant="outline"size="default"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Add Items</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="space-y-4">
 <h3 className="font-medium text-sm">New Task</h3>
 <div className="space-y-2">
 <Input
 value={newTaskTitle}
 onChange={(e) => setNewTaskTitle(e.target.value)}
 placeholder="Task Title"
 />
 <Input
 value={newTaskDesc}
 onChange={(e) => setNewTaskDesc(e.target.value)}
 placeholder="Description (optional)"
 />
 <Button className="w-full"onClick={handleAddTask}>
 <Plus className="mr-2 h-4 w-4"/> Add Task
 </Button>
 </div>
 </div>
 
 <div className="space-y-4">
 <h3 className="font-medium text-sm">New Column</h3>
 <div className="space-y-2">
 <Input
 value={newColumnTitle}
 onChange={(e) => setNewColumnTitle(e.target.value)}
 placeholder="Column Title"
 />
 <Button className="w-full"variant="secondary"onClick={handleAddColumn}>
 <Plus className="mr-2 h-4 w-4"/> Add Column
 </Button>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
 {columns.map((col, colIdx) => {
 const columnTasks = tasks.filter(t => t.columnId === col.id);
 
 return (
 <div key={col.id} className="min-w-[300px] w-[300px] shrink-0 bg-secondary/30 rounded-xl p-4 flex flex-col max-h-[70vh]">
 <div className={cn("mb-4 flex items-center justify-between pl-3", col.color)}>
 <h3 className="font-semibold text-lg">{col.title}</h3>
 <span className="bg-background px-2 py-1 rounded-full text-xs font-medium">
 {columnTasks.length}
 </span>
 </div>
 
 <div className="flex-1 overflow-y-auto space-y-3 pr-2">
 {columnTasks.length === 0 ? (
 <p className="text-sm text-muted-foreground text-center py-4 italic">No tasks</p>
 ) : (
 columnTasks.map(task => (
 <div key={task.id} className="bg-background rounded-lg p-3 shadow-sm border space-y-2">
 <div className="flex justify-between items-start gap-2">
 <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
 <button onClick={() => handleDeleteTask(task.id)} className="text-muted-foreground hover:text-destructive">
 <Trash2 className="h-4 w-4"/>
 </button>
 </div>
 {task.description && (
 <p className="text-xs text-muted-foreground">{task.description}</p>
 )}
 
 <div className="flex justify-between items-center pt-2 mt-2 border-t">
 <Button
 variant="ghost"
 size="icon"
 className="h-6 w-6"
 disabled={colIdx === 0}
 onClick={() => moveTask(task.id,"left")}
 >
 <ArrowLeft className="h-3 w-3"/>
 </Button>
 <Button
 variant="ghost"
 size="icon"
 className="h-6 w-6"
 disabled={colIdx === columns.length - 1}
 onClick={() => moveTask(task.id,"right")}
 >
 <ArrowRight className="h-3 w-3"/>
 </Button>
 </div>
 </div>
 ))
 )}
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
    title:"Columns",
    description:"Set your stages.",
    icon: Columns3,
  },
{
    step:"03",
    title:"Flow",
    description:"Drag across stages.",
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
    icon: Columns3,
    title:"Stages",
    description:"Todo, doing, done.",
  },
{
    icon: MoveRight,
    title:"Drag",
    description:"Move cards.",
  },
{
    icon: Kanban,
    title:"Board",
    description:"Visual workflow.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A kanban board visualizes work flowing through stages, making status obvious at a glance. Moving cards from to-do to done gives satisfying progress that lists lack. This tool supports custom columns and drag.</p>
  <p>Limits on work-in-progress reveal overload. The board makes bottlenecks visible so you can act.</p>
  <p>Use it for any project. The tool's value is a clear visual workflow system.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is kanban?",
    answer:"Visual work board.",
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
    answer:"Projects.",
  },
{
    question:"Best with?",
    answer:"Weekly planning.",
  }
  ]}
/>
</div>
 );
 })}
 </div>
 </div>
 );
}
