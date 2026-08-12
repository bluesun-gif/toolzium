"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Target, Plus, CheckSquare, Download, Trash2 } from"lucide-react";
import toast from"react-hot-toast";

type Category ="Work"|"Health"|"Personal"|"Finance";

interface Task {
 id: string;
 text: string;
 completed: boolean;
}

interface Goal {
 id: string;
 title: string;
 category: Category;
 tasks: Task[];
}

export function WeeklyGoalsClient() {
 const [goals, setGoals] = useState<Goal[]>([]);
 const [newGoalTitle, setNewGoalTitle] = useState("");
 const [newGoalCategory, setNewGoalCategory] = useState<Category>("Work");
 const [newTaskTexts, setNewTaskTexts] = useState<Record<string, string>>({});

 useEffect(() => {
 const saved = localStorage.getItem("weeklyGoals");
 if (saved) {
 try {
 setGoals(JSON.parse(saved));
 } catch (e) {
 // ignore
 }
 }
 }, []);

 useEffect(() => {
 localStorage.setItem("weeklyGoals", JSON.stringify(goals));
 }, [goals]);

 const addGoal = () => {
 if (!newGoalTitle.trim()) {
 toast.error("Goal title cannot be empty");
 return;
 }
 if (goals.length >= 3) {
 toast.error("You can only have up to 3 primary weekly goals.");
 return;
 }
 const newGoal: Goal = {
 id: Date.now().toString(),
 title: newGoalTitle.trim(),
 category: newGoalCategory,
 tasks: [],
 };
 setGoals([...goals, newGoal]);
 setNewGoalTitle("");
 toast.success("Goal added");
 };

 const removeGoal = (id: string) => {
 setGoals(goals.filter(g => g.id !== id));
 toast.success("Goal removed");
 };

 const addTask = (goalId: string) => {
 const text = newTaskTexts[goalId]?.trim();
 if (!text) return;
 
 setGoals(goals.map(g => {
 if (g.id === goalId) {
 return {
 ...g,
 tasks: [...g.tasks, { id: Date.now().toString(), text, completed: false }]
 };
 }
 return g;
 }));
 
 setNewTaskTexts({ ...newTaskTexts, [goalId]:""});
 };

 const toggleTask = (goalId: string, taskId: string) => {
 setGoals(goals.map(g => {
 if (g.id === goalId) {
 return {
 ...g,
 tasks: g.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
 };
 }
 return g;
 }));
 };

 const removeTask = (goalId: string, taskId: string) => {
 setGoals(goals.map(g => {
 if (g.id === goalId) {
 return { ...g, tasks: g.tasks.filter(t => t.id !== taskId) };
 }
 return g;
 }));
 };

 const getProgress = (goal: Goal) => {
 if (goal.tasks.length === 0) return 0;
 const completed = goal.tasks.filter(t => t.completed).length;
 return Math.round((completed / goal.tasks.length) * 100);
 };

 const handleExport = () => {
 let content ="Weekly Goals & Milestones Plan\n\n";
 goals.forEach((g, i) => {
 content +="Goal"+ (i + 1) +":"+ g.title +"["+ g.category +"]\n";
 content +="Progress:"+ getProgress(g) +"%\n";
 if (g.tasks.length > 0) {
 g.tasks.forEach(t => {
 content +=""+ (t.completed ?"[X]":"[ ]") +""+ t.text +"\n";
 });
 } else {
 content +="No tasks added yet.\n";
 }
 content +="\n";
 });

 const blob = new Blob([content], { type:"text/plain"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="weekly-plan.txt";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 toast.success("Plan exported");
 };

 const handleReset = () => {
 if (confirm("Are you sure you want to clear all goals?")) {
 setGoals([]);
 toast.success("Goals cleared");
 }
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Target}
 title="Weekly Goals & Milestone Planner"
 description="Set your primary focus for the week and break it down into daily actionable tasks."
 actions={
 <>
 <ActionButton onClick={handleExport} icon={Download} label="Export Plan"/>
 <ResetButton onClick={handleReset} />
 </>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Add New Weekly Goal (Max 3)</CardTitle>
 <CardDescription>Focus on what matters most this week.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-col sm:flex-row gap-4">
 <div className="flex-1 space-y-2">
 <Label>Goal Title</Label>
 <Input
 value={newGoalTitle}
 onChange={(e) => setNewGoalTitle(e.target.value)}
 placeholder="e.g. Launch new feature, Run 20km, Read a book..."
 disabled={goals.length >= 3}
 onKeyDown={(e) => {
 if (e.key ==="Enter") addGoal();
 }}
 />
 </div>
 <div className="w-full sm:w-48 space-y-2">
 <Label>Category</Label>
 <Select
 value={newGoalCategory}
 onValueChange={(v: Category) => setNewGoalCategory(v)}
 disabled={goals.length >= 3}
 >
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="Work">Work</SelectItem>
 <SelectItem value="Health">Health</SelectItem>
 <SelectItem value="Personal">Personal</SelectItem>
 <SelectItem value="Finance">Finance</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="flex items-end">
 <Button onClick={addGoal} disabled={goals.length >= 3} className="w-full sm:w-auto">
 <Plus className="w-4 h-4 mr-2"/>
 Add Goal
 </Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
 {goals.map((goal) => {
 const progress = getProgress(goal);
 const categoryColors = {
 Work:"bg-blue-500/10 text-primary border-blue-500/20",
 Health:"bg-green-500/10 text-green-600 border-green-500/20",
 Personal:"bg-purple-500/10 text-primary border-primary/50/20",
 Finance:"bg-amber-500/10 text-amber-600 border-amber-500/20",
 };

 return (
 <GlassCard key={goal.id} className="flex flex-col h-full">
 <CardHeader className="pb-3">
 <div className="flex justify-between items-start">
 <div>
 <span className={"inline-block px-2 py-1 text-xs font-medium rounded-full border mb-2"+ categoryColors[goal.category]}>
 {goal.category}
 </span>
 <CardTitle className="text-xl leading-tight">{goal.title}</CardTitle>
 </div>
 <Button variant="ghost"size="icon"className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"onClick={() => removeGoal(goal.id)}>
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 </CardHeader>
 <CardContent className="flex-1 flex flex-col pt-0 space-y-4">
 <div className="space-y-1">
 <div className="flex justify-between text-xs text-muted-foreground">
 <span>Progress</span>
 <span>{progress}%</span>
 </div>
 <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
 <div 
 className="h-full bg-primary transition-all duration-300"
 style={{ width: progress +"%"}}
 />
 </div>
 </div>

 <Separator />

 <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
 {goal.tasks.length === 0 ? (
 <p className="text-sm text-muted-foreground text-center py-4">No tasks added yet. Break down your goal!</p>
 ) : (
 goal.tasks.map((task) => (
 <div key={task.id} className="flex items-start gap-2 group">
 <button 
 onClick={() => toggleTask(goal.id, task.id)}
 className={"mt-0.5 shrink-0 transition-colors"+ (task.completed ?"text-primary":"text-muted-foreground hover:text-foreground")}
 >
 <CheckSquare className="w-5 h-5"/>
 </button>
 <span className={"text-sm flex-1 break-words"+ (task.completed ?"line-through text-muted-foreground":"")}>
 {task.text}
 </span>
 <Button 
 variant="ghost"
 size="icon"
 className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
 onClick={() => removeTask(goal.id, task.id)}
 >
 <Trash2 className="w-3 h-3"/>
 </Button>
 </div>
 ))
 )}
 </div>

 <div className="flex gap-2 pt-2 mt-auto">
 <Input
 placeholder="Add a milestone/task..."
 value={newTaskTexts[goal.id] ||""}
 onChange={(e) => setNewTaskTexts({ ...newTaskTexts, [goal.id]: e.target.value })}
 onKeyDown={(e) => {
 if (e.key ==="Enter") addTask(goal.id);
 }}
 className="h-9"
 />
 <Button size="icon"className="h-9 w-9 shrink-0"onClick={() => addTask(goal.id)}>
 <Plus className="w-4 h-4"/>
 </Button>
 </div>
 </CardContent>
 </GlassCard>
 );
 })}
 {goals.length === 0 && (
 <div className="col-span-full py-12 text-center text-muted-foreground">
 <Target className="w-12 h-12 mx-auto mb-4 opacity-20"/>
 <p>No goals set for this week yet. Start by adding one above!</p>
 </div>
 )}
 </div>
 </div>
 );
}
