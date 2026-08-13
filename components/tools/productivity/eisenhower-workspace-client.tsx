"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Layout, Plus, Filter, Download, Trash2, ArrowRight } from"lucide-react";
import { ActionButton } from"@/components/shared/action-buttons";
import { toast } from"react-hot-toast";

type Quadrant ="q1"|"q2"|"q3"|"q4";
type Task = {
 id: string;
 title: string;
 quadrant: Quadrant;
 project: string;
 dueDate: string;
};

export function EisenhowerWorkspaceClient() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [newTaskTitle, setNewTaskTitle] = useState("");
 const [newTaskQuadrant, setNewTaskQuadrant] = useState<Quadrant>("q1");
 const [newTaskProject, setNewTaskProject] = useState("");
 const [filterProject, setFilterProject] = useState("all");
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
 const saved = localStorage.getItem("eisenhower_tasks");
 if (saved) {
 try {
 setTasks(JSON.parse(saved));
 } catch (e) {
 console.error("Failed to parse tasks");
 }
 }
 setIsLoaded(true);
 }, []);

 useEffect(() => {
 if (isLoaded) {
 localStorage.setItem("eisenhower_tasks", JSON.stringify(tasks));
 }
 }, [tasks]);

 const addTask = () => {
 if (!newTaskTitle.trim()) {
 toast.error("Task title is required");
 return;
 }
 const newTask: Task = {
 id: Date.now().toString(),
 title: newTaskTitle,
 quadrant: newTaskQuadrant,
 project: newTaskProject.trim() ||"General",
 dueDate:""
 };
 setTasks([...tasks, newTask]);
 setNewTaskTitle("");
 toast.success("Task added");
 };

 const removeTask = (id: string) => {
 setTasks(tasks.filter(t => t.id !== id));
 };

 const moveTask = (id: string, newQuadrant: Quadrant) => {
 setTasks(tasks.map(t => t.id === id ? { ...t, quadrant: newQuadrant } : t));
 };

 const exportMarkdown = () => {
 let md ="# Eisenhower Matrix Tasks\n\n";
 
 const quadrants: {id: Quadrant, title: string}[] = [
 { id:"q1", title:"Do First (Urgent & Important)"},
 { id:"q2", title:"Schedule (Important, Not Urgent)"},
 { id:"q3", title:"Delegate (Urgent, Not Important)"},
 { id:"q4", title:"Eliminate (Neither)"}
 ];

 quadrants.forEach(q => {
 md +="##"+ q.title +"\n";
 const qTasks = tasks.filter(t => t.quadrant === q.id);
 if (qTasks.length === 0) md +="*No tasks*\n";
 qTasks.forEach(t => {
 md +="-"+ t.title + (t.project !=="General"?"["+ t.project +"]":"") +"\n";
 });
 md +="\n";
 });

 const blob = new Blob([md], { type:"text/markdown"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="eisenhower_matrix.md";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("Exported to Markdown");
 };

 const projects = Array.from(new Set(tasks.map(t => t.project)));
 const filteredTasks = tasks.filter(t => filterProject ==="all"|| t.project === filterProject);

 const QuadrantView = ({ id, title, colorClass }: { id: Quadrant, title: string, colorClass: string }) => {
 const qTasks = filteredTasks.filter(t => t.quadrant === id);
 return (
 <div className={"border rounded-lg p-4 flex flex-col h-full bg-card shadow-sm"}>
 <div className={"flex items-center justify-between mb-4"}>
 <h3 className={"font-semibold"+ colorClass}>{title}</h3>
 <span className={"text-xs bg-muted px-2 py-1 rounded-full"}>{qTasks.length}</span>
 </div>
 <div className={"space-y-2 flex-grow overflow-y-auto max-h-[300px]"}>
 {qTasks.map(task => (
 <div key={task.id} className={"flex items-center justify-between group p-2 border rounded-md bg-background text-sm hover:border-primary transition-colors"}>
 <div className={"flex flex-col overflow-hidden"}>
 <span className={"truncate font-medium"} title={task.title}>{task.title}</span>
 <span className={"text-xs text-muted-foreground"}>{task.project}</span>
 </div>
 <div className={"flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"}>
 <Select value={task.quadrant} onValueChange={(v: Quadrant) => moveTask(task.id, v)}>
 <SelectTrigger className={"w-[80px] h-7 text-xs"}><SelectValue placeholder="Move"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="q1">Q1: Do</SelectItem>
 <SelectItem value="q2">Q2: Plan</SelectItem>
 <SelectItem value="q3">Q3: Delegate</SelectItem>
 <SelectItem value="q4">Q4: Drop</SelectItem>
 </SelectContent>
 </Select>
 <Button variant="ghost"size="icon"className={"h-7 w-7 text-destructive"} onClick={() => removeTask(task.id)}>
 <Trash2 className={"w-4 h-4"} />
 </Button>
 </div>
 </div>
 ))}
 {qTasks.length === 0 && <div className={"text-sm text-muted-foreground italic text-center py-4"}>No tasks here</div>}
 </div>
 </div>
 );
 };
 return (
 <div className={"space-y-6"}>
 <ToolPageHeader 
 icon={Layout}
 title="Eisenhower Matrix Workspace"
 description="Prioritize your tasks efficiently by organizing them into Urgency and Importance quadrants."
 actions={<ActionButton icon={Download} label="Export Markdown"onClick={exportMarkdown} />}
 />

 <GlassCard>
 <CardContent className={"pt-6"}>
 <div className={"flex flex-col md:flex-row gap-4 items-end"}>
 <div className={"flex-1 w-full space-y-2"}>
 <Label>Task Title</Label>
 <Input placeholder="Enter task..."value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} />
 </div>
 <div className={"w-full md:w-48 space-y-2"}>
 <Label>Project (Optional)</Label>
 <Input placeholder="e.g. Work, Home"value={newTaskProject} onChange={e => setNewTaskProject(e.target.value)} />
 </div>
 <div className={"w-full md:w-48 space-y-2"}>
 <Label>Quadrant</Label>
 <Select value={newTaskQuadrant} onValueChange={(v: Quadrant) => setNewTaskQuadrant(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="q1">Do First</SelectItem>
 <SelectItem value="q2">Schedule</SelectItem>
 <SelectItem value="q3">Delegate</SelectItem>
 <SelectItem value="q4">Eliminate</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <Button onClick={addTask} className={"w-full md:w-auto"}><Plus className={"w-4 h-4 mr-2"} /> Add Task</Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className={"flex justify-end items-center gap-2"}>
 <Filter className={"w-4 h-4 text-muted-foreground"} />
 <Select value={filterProject} onValueChange={setFilterProject}>
 <SelectTrigger className={"w-[200px]"}><SelectValue placeholder="Filter by Project"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="all">All Projects</SelectItem>
 {projects.map(p => (
 <SelectItem key={p} value={p}>{p}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 <div className={"grid md:grid-cols-2 gap-4 h-[600px] md:h-[700px]"}>
 <QuadrantView id="q1"title="Do First (Urgent & Important)"colorClass="text-red-500"/>
 <QuadrantView id="q2"title="Schedule (Important, Not Urgent)"colorClass="text-primary"/>
 <QuadrantView id="q3"title="Delegate (Urgent, Not Important)"colorClass="text-orange-500"/>
 <QuadrantView id="q4"title="Eliminate (Not Urgent & Not Important)"colorClass="text-muted-foreground"/>
 </div>
 </div>
 );
}
