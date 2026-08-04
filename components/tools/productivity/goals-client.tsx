"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { Target, CheckCircle, Calendar, TrendingUp, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

type Milestone = { id: string; title: string; completed: boolean };
type Goal = { id: string; title: string; targetDate: string; category: string; milestones: Milestone[] };

export function GoalsClient() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newCategory, setNewCategory] = useState("Personal");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("goalsTracker");
    if (saved) {
      try {
        setGoals(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("goalsTracker", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!newTitle) return;
    const goal: Goal = {
      id: Date.now().toString(),
      title: newTitle,
      targetDate: newDate,
      category: newCategory,
      milestones: []
    };
    setGoals([...goals, goal]);
    setNewTitle("");
    setNewDate("");
    toast.success("Goal added");
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
    toast.success("Goal removed");
  };

  const addMilestone = (goalId: string, title: string) => {
    if (!title) return;
    setGoals(goals.map(g => {
      if (g.id === goalId) {
        return { ...g, milestones: [...g.milestones, { id: Date.now().toString(), title, completed: false }] };
      }
      return g;
    }));
  };

  const toggleMilestone = (goalId: string, msId: string) => {
    setGoals(goals.map(g => {
      if (g.id === goalId) {
        return {
          ...g,
          milestones: g.milestones.map(ms => ms.id === msId ? { ...ms, completed: !ms.completed } : ms)
        };
      }
      return g;
    }));
  };

  const deleteMilestone = (goalId: string, msId: string) => {
    setGoals(goals.map(g => {
      if (g.id === goalId) {
        return { ...g, milestones: g.milestones.filter(ms => ms.id !== msId) };
      }
      return g;
    }));
  };

  const clearAll = () => {
    if (confirm("Clear all goals?")) {
      setGoals([]);
      toast.success("All goals cleared");
    }
  };

  const getProgress = (g: Goal) => {
    if (g.milestones.length === 0) return 0;
    const completed = g.milestones.filter(m => m.completed).length;
    return Math.round((completed / g.milestones.length) * 100);
  };

  const filteredGoals = filter === "All" ? goals : goals.filter(g => g.category === filter);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Goal Tracker"
        description="Set and track goals with milestones to monitor your progress."
        icon={Target}
        actions={
          <div className="flex gap-2">
            <ResetButton onClick={clearAll} label="Clear All" />
          </div>
        }
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input placeholder="Goal Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          </div>
          <div className="w-full md:w-48">
            <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
          </div>
          <div className="w-full md:w-48">
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Learning">Learning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addGoal}><Plus className="w-4 h-4 mr-2"/> Add Goal</Button>
        </CardContent>
      </GlassCard>

      <div className="flex justify-end items-center mb-4 gap-2">
        <Label>Filter Category:</Label>
        <div className="w-48">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Financial">Financial</SelectItem>
              <SelectItem value="Learning">Learning</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGoals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            progress={getProgress(goal)}
            onDelete={() => deleteGoal(goal.id)}
            onAddMilestone={(title: string) => addMilestone(goal.id, title)}
            onToggleMilestone={(msId: string) => toggleMilestone(goal.id, msId)}
            onDeleteMilestone={(msId: string) => deleteMilestone(goal.id, msId)}
          />
        ))}
        {filteredGoals.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            No goals found. Create one above!
          </div>
        )}
      </div>
    </div>
  );
}

function GoalCard({ goal, progress, onDelete, onAddMilestone, onToggleMilestone, onDeleteMilestone }: any) {
  const [msTitle, setMsTitle] = useState("");

  const handleAdd = () => {
    onAddMilestone(msTitle);
    setMsTitle("");
  };

  return (
    <GlassCard>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{goal.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span className="bg-muted px-2 py-1 rounded text-xs">{goal.category}</span>
              {goal.targetDate && (
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {goal.targetDate}</span>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onDelete}><Trash2 className="w-4 h-4 text-red-500" /></Button>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4"/> Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Separator />

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {goal.milestones.map((ms: any) => (
            <div key={ms.id} className="flex items-center gap-2 group">
              <button onClick={() => onToggleMilestone(ms.id)}>
                <CheckCircle className={`w-5 h-5 ${ms.completed ? "text-green-500" : "text-muted-foreground"}`} />
              </button>
              <span className={`flex-1 text-sm ${ms.completed ? "line-through text-muted-foreground" : ""}`}>{ms.title}</span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => onDeleteMilestone(ms.id)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
          {goal.milestones.length === 0 && <p className="text-xs text-muted-foreground text-center">No milestones yet</p>}
        </div>

        <div className="flex gap-2">
          <Input 
            placeholder="Add milestone" 
            value={msTitle} 
            onChange={e => setMsTitle(e.target.value)} 
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            className="h-8 text-sm"
          />
          <Button size="sm" className="h-8" onClick={handleAdd}><Plus className="w-4 h-4"/></Button>
        </div>
      </CardContent>
    </GlassCard>
  );
}
