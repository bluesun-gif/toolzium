"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Layout, Plus, Download, ChevronRight, ChevronLeft } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

type Task = {
 id: string;
 title: string;
 color: string;
 column:"todo"|"inprogress"|"review"|"done";
};

export function ColoredKanbanClient() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [newTaskTitle, setNewTaskTitle] = useState("");
 const [newTaskColor, setNewTaskColor] = useState("bg-red-500");
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
 setIsClient(true);
 const saved = localStorage.getItem("kanban_tasks");
 if (saved) {
 try { setTasks(JSON.parse(saved)); } catch (e) {}
 }
 }, []);

 useEffect(() => {
 if (isClient) localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
 }, [tasks, isClient]);

 const addTask = () => {
 if (!newTaskTitle) return;
 setTasks([...tasks, { id: Math.random().toString(), title: newTaskTitle, color: newTaskColor, column:"todo"}]);
 setNewTaskTitle("");
 toast.success("Task added");
 };

 const moveTask = (id: string, col: Task["column"]) => {
 setTasks(tasks.map(t => t.id === id ? { ...t, column: col } : t));
 };

 const resetBoard = () => {
 setTasks([]);
 toast.success("Board reset");
 };

 const exportJSON = () => {
 const data = JSON.stringify(tasks, null, 2);
 const blob = new Blob([data], { type:"application/json"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="kanban.json";
 a.click();
 };

 if (!isClient) return null;

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Layout}
 title="Color-Coded Category Kanban Board"
 description="Visual Kanban task board with custom color tags & category badges."
 actions={
 <>
 <ActionButton onClick={exportJSON} icon={Download} label="Export JSON"variant="outline"size="default"/>
 <ResetButton onClick={resetBoard} label="Reset Board"/>
 </>
 }
 />

 <GlassCard>
 <CardContent className="p-4 flex gap-4 items-end flex-wrap">
 <div className="flex-1 space-y-2 min-w-[200px]">
 <Label>New Task</Label>
 <Input value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="Task title..."/>
 </div>
 <div className="w-32 space-y-2">
 <Label>Color</Label>
 <Select value={newTaskColor} onValueChange={setNewTaskColor}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="bg-red-500">Red</SelectItem>
 <SelectItem value="bg-blue-500">Blue</SelectItem>
 <SelectItem value="bg-green-500">Green</SelectItem>
 <SelectItem value="bg-yellow-500">Yellow</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <ActionButton onClick={addTask} icon={Plus} label="Add"variant="default"size="default"/>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 {["todo","inprogress","review","done"].map((col) => (
 <GlassCard key={col}>
 <CardHeader className="p-4">
 <CardTitle className="text-lg capitalize">{col}</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-2 h-[500px] overflow-auto bg-muted/50 rounded-b-xl">
 {tasks.filter(t => t.column === col).map(t => (
 <div key={t.id} className={cn("p-3 rounded-md text-white shadow-sm"+ t.color)}>
 <p>{t.title}</p>
 <div className="mt-2 flex gap-1 justify-end">
 {col !=="todo"&& <Button size="icon"variant="secondary"className="h-6 w-6"onClick={() => moveTask(t.id, col ==="done"?"review": col ==="review"?"inprogress":"todo")}><ChevronLeft className="h-3 w-3"/></Button>}
 {col !=="done"&& <Button size="icon"variant="secondary"className="h-6 w-6"onClick={() => moveTask(t.id, col ==="todo"?"inprogress": col ==="inprogress"?"review":"done")}><ChevronRight className="h-3 w-3"/></Button>}
 </div>
 </div>
 ))}
 </CardContent>
 </GlassCard>
 ))}
 </div>
 </div>
 );
}
