"use client";

import React, { useState, useEffect } from"react";
import { Target, CheckSquare, BarChart2, Download, Plus, Trash2, Edit2 } from"lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton } from"@/components/shared/action-buttons";
import { toast } from"react-hot-toast";

type KeyResult = {
 id: string;
 name: string;
 target: number;
 current: number;
 unit: string;
};

type Objective = {
 id: string;
 name: string;
 deadline: string;
 keyResults: KeyResult[];
};

export function OkrPlannerClient() {
 const [objectives, setObjectives] = useState<Objective[]>([]);
 const [loaded, setLoaded] = useState(false);

 useEffect(() => {
 const saved = localStorage.getItem("okr-planner-save");
 if (saved) {
 try {
 setObjectives(JSON.parse(saved));
 } catch (e) {
 setObjectives([]);
 }
 }
 setLoaded(true);
 }, []);

 useEffect(() => {
 if (loaded) {
 localStorage.setItem("okr-planner-save", JSON.stringify(objectives));
 }
 }, [objectives, loaded]);

 const generateId = () => Math.random().toString(36).substr(2, 9);

 const addObjective = () => {
 const newObj: Objective = {
 id: generateId(),
 name:"New Objective",
 deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
 keyResults: []
 };
 setObjectives([...objectives, newObj]);
 };

 const deleteObjective = (id: string) => {
 setObjectives(objectives.filter(o => o.id !== id));
 };

 const updateObjective = (id: string, updates: Partial<Objective>) => {
 setObjectives(objectives.map(o => o.id === id ? { ...o, ...updates } : o));
 };

 const addKeyResult = (objId: string) => {
 const newKR: KeyResult = {
 id: generateId(),
 name:"New Key Result",
 target: 100,
 current: 0,
 unit:"%"
 };
 setObjectives(objectives.map(o => o.id === objId ? { ...o, keyResults: [...o.keyResults, newKR] } : o));
 };

 const updateKeyResult = (objId: string, krId: string, updates: Partial<KeyResult>) => {
 setObjectives(objectives.map(o => {
 if (o.id === objId) {
 return {
 ...o,
 keyResults: o.keyResults.map(kr => kr.id === krId ? { ...kr, ...updates } : kr)
 };
 }
 return o;
 }));
 };

 const deleteKeyResult = (objId: string, krId: string) => {
 setObjectives(objectives.map(o => {
 if (o.id === objId) {
 return {
 ...o,
 keyResults: o.keyResults.filter(kr => kr.id !== krId)
 };
 }
 return o;
 }));
 };

 const calculateKRProgress = (kr: KeyResult) => {
 if (kr.target === 0) return 0;
 const progress = (kr.current / kr.target) * 100;
 return Math.min(Math.max(progress, 0), 100);
 };

 const calculateObjectiveProgress = (obj: Objective) => {
 if (obj.keyResults.length === 0) return 0;
 const total = obj.keyResults.reduce((acc, kr) => acc + calculateKRProgress(kr), 0);
 return total / obj.keyResults.length;
 };

 const exportData = () => {
 const data = JSON.stringify(objectives, null, 2);
 const blob = new Blob([data], { type:"application/json"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="okr-export.json";
 a.click();
 URL.revokeObjectURL(url);
 toast.success("Exported OKR Data!");
 };

 if (!loaded) return null;

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Target}
 title="OKR Planner"
 description="Structured Objectives and Key Results tracking framework for goal management."
 actions={
 <ActionButton
 onClick={exportData}
 icon={Download}
 label="Export JSON"
 variant="outline"
 />
 }
 />

 <div className="flex justify-between items-center">
 <h2 className="text-xl font-bold">Your Objectives</h2>
 <Button onClick={addObjective} className="gap-2">
 <Plus className="w-4 h-4"/> Add Objective
 </Button>
 </div>

 {objectives.length === 0 ? (
 <GlassCard className="text-center py-12 text-muted-foreground">
 No objectives found. Click"Add Objective"to start.
 </GlassCard>
 ) : (
 <div className="space-y-6">
 {objectives.map((obj) => {
 const objProgress = calculateObjectiveProgress(obj);
 
 return (
 <GlassCard key={obj.id}>
 <CardHeader className="pb-4">
 <div className="flex flex-col md:flex-row justify-between gap-4">
 <div className="space-y-2 flex-1">
 <Input
 value={obj.name}
 onChange={(e) => updateObjective(obj.id, { name: e.target.value })}
 className="text-lg font-bold h-auto py-1 px-2 border-transparent hover:border-input focus:border-input transition-colors"
 placeholder="Objective Name"
 />
 <div className="flex items-center gap-2 px-2 text-sm text-muted-foreground">
 <Label>Deadline:</Label>
 <Input
 type="date"
 value={obj.deadline}
 onChange={(e) => updateObjective(obj.id, { deadline: e.target.value })}
 className="h-7 py-0 w-auto"
 />
 </div>
 </div>
 
 <div className="flex items-center gap-4">
 <div className="text-right">
 <div className="text-sm text-muted-foreground mb-1">Progress</div>
 <div className="text-2xl font-bold">{objProgress.toFixed(0)}%</div>
 </div>
 <Button variant="ghost"size="icon"onClick={() => deleteObjective(obj.id)} className="text-destructive hover:bg-destructive/10">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 </div>
 
 <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-4">
 <div 
 className="bg-primary h-full transition-all duration-500"
 style={{ width: objProgress +"%"}}
 />
 </div>
 </CardHeader>
 
 <Separator />
 
 <CardContent className="pt-6">
 <div className="flex justify-between items-center mb-4">
 <h3 className="font-semibold flex items-center gap-2">
 <CheckSquare className="w-4 h-4 text-muted-foreground"/> Key Results
 </h3>
 <Button variant="outline"size="sm"onClick={() => addKeyResult(obj.id)}>
 <Plus className="w-3 h-3 mr-1"/> Add KR
 </Button>
 </div>
 
 <div className="space-y-4">
 {obj.keyResults.length === 0 ? (
 <p className="text-sm text-muted-foreground italic">No key results defined for this objective.</p>
 ) : (
 obj.keyResults.map((kr) => {
 const krProgress = calculateKRProgress(kr);
 
 return (
 <div key={kr.id} className="p-4 rounded-lg bg-secondary/30 border border-border flex flex-col md:flex-row gap-4 items-center">
 <div className="flex-1 w-full">
 <Input
 value={kr.name}
 onChange={(e) => updateKeyResult(obj.id, kr.id, { name: e.target.value })}
 className="font-medium bg-transparent border-transparent hover:border-input focus:border-input transition-colors mb-2"
 placeholder="Key Result Name"
 />
 <div className="flex gap-2 items-center text-sm">
 <Label className="text-xs text-muted-foreground w-16">Current:</Label>
 <Input
 type="number"
 value={kr.current}
 onChange={(e) => updateKeyResult(obj.id, kr.id, { current: parseFloat(e.target.value) || 0 })}
 className="h-8 w-24"
 />
 <Label className="text-xs text-muted-foreground w-12 text-center">Target:</Label>
 <Input
 type="number"
 value={kr.target}
 onChange={(e) => updateKeyResult(obj.id, kr.id, { target: parseFloat(e.target.value) || 0 })}
 className="h-8 w-24"
 />
 <Label className="text-xs text-muted-foreground w-10 text-center">Unit:</Label>
 <Input
 value={kr.unit}
 onChange={(e) => updateKeyResult(obj.id, kr.id, { unit: e.target.value })}
 className="h-8 w-16"
 />
 </div>
 </div>
 
 <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
 <div className="w-full md:w-32">
 <div className="flex justify-between text-xs mb-1">
 <span>{krProgress.toFixed(0)}%</span>
 </div>
 <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
 <div 
 className={"h-full transition-all duration-500"+ (krProgress >= 100 ?"bg-green-500":"bg-blue-500")}
 style={{ width: krProgress +"%"}}
 />
 </div>
 </div>
 <Button variant="ghost"size="icon"onClick={() => deleteKeyResult(obj.id, kr.id)} className="text-destructive">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 </div>
 );
 })
 )}
 </div>
 </CardContent>
 </GlassCard>
 );
 })}
 </div>
 )}
 </div>
 );
}
