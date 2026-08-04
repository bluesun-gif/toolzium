"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { BarChart3, Plus, Calendar, Copy, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

type TaskStatus = "Not Started" | "In Progress" | "Complete";

interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
  status: TaskStatus;
}

export function TimelineClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskStart, setNewTaskStart] = useState("");
  const [newTaskEnd, setNewTaskEnd] = useState("");
  const [newTaskColor, setNewTaskColor] = useState("#3b82f6");
  
  useEffect(() => {
    const saved = localStorage.getItem("timeline-tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse timeline tasks");
      }
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("timeline-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTaskName || !newTaskStart || !newTaskEnd) return;
    
    if (new Date(newTaskStart) > new Date(newTaskEnd)) {
      alert("Start date must be before end date");
      return;
    }
    
    const newTask: Task = {
      id: Date.now().toString(),
      name: newTaskName,
      startDate: newTaskStart,
      endDate: newTaskEnd,
      color: newTaskColor,
      status: "Not Started"
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskName("");
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };
  
  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };
  
  const moveTask = (index: number, direction: 1 | -1) => {
    if (index + direction < 0 || index + direction >= tasks.length) return;
    const newTasks = [...tasks];
    const temp = newTasks[index];
    newTasks[index] = newTasks[index + direction];
    newTasks[index + direction] = temp;
    setTasks(newTasks);
  };
  
  // Timeline calculations
  const allDates = tasks.flatMap(t => [new Date(t.startDate).getTime(), new Date(t.endDate).getTime()]);
  const minDate = allDates.length ? new Date(Math.min(...allDates)) : new Date();
  const maxDate = allDates.length ? new Date(Math.max(...allDates)) : new Date();
  
  // Add some padding
  minDate.setDate(minDate.getDate() - 2);
  maxDate.setDate(maxDate.getDate() + 2);
  
  const totalDays = Math.max(1, Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)));
  
  const getTaskStyle = (task: Task) => {
    const start = new Date(task.startDate).getTime();
    const end = new Date(task.endDate).getTime();
    
    const leftPercent = ((start - minDate.getTime()) / (maxDate.getTime() - minDate.getTime())) * 100;
    const widthPercent = Math.max(1, ((end - start) / (maxDate.getTime() - minDate.getTime())) * 100);
    
    return {
      left: leftPercent + "%",
      width: widthPercent + "%",
      backgroundColor: task.color
    };
  };

  const completedTasks = tasks.filter(t => t.status === "Complete").length;
  const progressPercentage = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;
  
  const getSummaryText = () => {
    if (tasks.length === 0) return "No tasks to summarize.";
    let summary = "Project Timeline Summary\n";
    summary += "Progress: " + progressPercentage + "%\n\n";
    tasks.forEach(t => {
      summary += "- " + t.name + " (" + t.status + "): " + t.startDate + " to " + t.endDate + "\n";
    });
    return summary;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={BarChart3}
        title="Project Timeline"
        description="Visualize and manage your project tasks in a Gantt-style timeline."
        actions={
          <CopyButton getText={getSummaryText} label="Copy Summary" />
        }
      />

      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle>Add Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Task Name</Label>
              <Input 
                value={newTaskName} 
                onChange={e => setNewTaskName(e.target.value)} 
                placeholder="e.g. Design Phase"
              />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input 
                type="date"
                value={newTaskStart} 
                onChange={e => setNewTaskStart(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input 
                type="date"
                value={newTaskEnd} 
                onChange={e => setNewTaskEnd(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="color"
                  value={newTaskColor} 
                  onChange={e => setNewTaskColor(e.target.value)} 
                  className="w-12 h-10 p-1"
                />
                <span className="text-sm text-muted-foreground uppercase">{newTaskColor}</span>
              </div>
            </div>
            <Button onClick={addTask} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <Label>Project Overview</Label>
              <div className="text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Total Tasks:</span>
                  <span className="font-medium">{tasks.length}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{totalDays} days</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Completion:</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No tasks added yet.</p>
                <p className="text-sm">Add a task on the left to see the timeline.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative border rounded-lg p-4 overflow-x-auto min-h-[300px]">
                  {/* Grid Lines */}
                  <div className="absolute inset-y-0 left-4 right-4 flex justify-between pointer-events-none opacity-20">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-px h-full bg-border" />
                    ))}
                  </div>
                  
                  {/* Header Dates */}
                  <div className="flex justify-between text-xs text-muted-foreground mb-4 relative z-10">
                    <span>{minDate.toLocaleDateString()}</span>
                    <span>{maxDate.toLocaleDateString()}</span>
                  </div>
                  
                  {/* Timeline Bars */}
                  <div className="space-y-4 relative z-10">
                    {tasks.map(task => (
                      <div key={task.id} className="relative h-8 group">
                        <div 
                          className="absolute h-full rounded-md shadow-sm transition-all duration-300 flex items-center px-2 text-xs text-white font-medium overflow-hidden whitespace-nowrap"
                          style={getTaskStyle(task)}
                          title={task.name + " (" + task.startDate + " to " + task.endDate + ")"}
                        >
                          {task.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Task List</h3>
                  {tasks.map((task, index) => (
                    <div key={task.id} className="flex flex-wrap items-center gap-3 p-3 bg-card border rounded-lg text-sm hover:bg-accent/5 transition-colors">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: task.color }}
                      />
                      <div className="flex-1 font-medium min-w-[120px]">{task.name}</div>
                      <div className="text-muted-foreground text-xs min-w-[150px]">
                        {task.startDate} to {task.endDate}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-auto">
                        <Select 
                          value={task.status} 
                          onValueChange={(val: TaskStatus) => updateTaskStatus(task.id, val)}
                        >
                          <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Not Started">Not Started</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <div className="flex flex-col gap-0.5">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-4 w-6 p-0"
                            onClick={() => moveTask(index, -1)}
                            disabled={index === 0}
                          >
                            <ArrowUp className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-4 w-6 p-0"
                            onClick={() => moveTask(index, 1)}
                            disabled={index === tasks.length - 1}
                          >
                            <ArrowDown className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => removeTask(task.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
