"use client";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { AlertTriangle, Plus, Activity, Download, Trash2 } from"lucide-react";
import toast from"react-hot-toast";
import { cn } from"@/lib/utils";

interface Allergy {
 id: string;
 name: string;
 category: string;
 reactionType: string;
 symptoms: string;
 date: string;
}

export function AllergyTrackerClient() {
 const [allergies, setAllergies] = useState<Allergy[]>([]);
 const [name, setName] = useState("");
 const [category, setCategory] = useState("Food");
 const [reactionType, setReactionType] = useState("Mild");
 const [symptoms, setSymptoms] = useState("");
 const [date, setDate] = useState("");

 useEffect(() => {
 const saved = localStorage.getItem("toolzium_allergies");
 if (saved) {
 try {
 setAllergies(JSON.parse(saved));
 } catch (e) {
 console.error(e);
 }
 }
 setDate(new Date().toISOString().split("T")[0]);
 }, []);

 const saveToLocal = (data: Allergy[]) => {
 setAllergies(data);
 localStorage.setItem("toolzium_allergies", JSON.stringify(data));
 };

 const handleAdd = () => {
 if (!name) {
 toast.error("Please enter an allergen name");
 return;
 }
 const newAllergy: Allergy = {
 id: Math.random().toString(36).substring(7),
 name,
 category,
 reactionType,
 symptoms,
 date: date || new Date().toISOString().split("T")[0],
 };
 saveToLocal([newAllergy, ...allergies]);
 setName("");
 setSymptoms("");
 toast.success("Allergy recorded");
 };

 const handleDelete = (id: string) => {
 saveToLocal(allergies.filter(a => a.id !== id));
 toast.success("Entry deleted");
 };

 const handleReset = () => {
 if (confirm("Are you sure you want to delete all entries?")) {
 saveToLocal([]);
 toast.success("All data cleared");
 }
 };

 const handleExport = () => {
 if (allergies.length === 0) {
 toast.error("No data to export");
 return;
 }
 const text = allergies.map(a => `Allergen: ${a.name}\nCategory: ${a.category}\nReaction: ${a.reactionType}\nSymptoms: ${a.symptoms}\nDate: ${a.date}\n`).join("\n---\n\n");
 const blob = new Blob([text], { type:"text/plain"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="allergy-log.txt";
 a.click();
 URL.revokeObjectURL(url);
 toast.success("Exported to text file");
 };
 
 const getSeverityColor = (severity: string) => {
 switch (severity) {
 case"Severe": return"text-red-500 font-bold";
 case"Moderate": return"text-amber-500 font-bold";
 case"Mild": return"text-green-500 font-bold";
 default: return"";
 }
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={AlertTriangle}
 title="Allergy Tracker"
 description="Track your allergies and reactions privately in your browser."
 actions={
 <>
 <ActionButton onClick={handleExport} icon={Download} label="Export"/>
 <ResetButton onClick={handleReset} label="Clear All"/>
 </>
 }
 />
 
 <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-md text-sm">
 <strong>Disclaimer:</strong> This tool is for personal tracking only and is not a substitute for professional medical advice. Always consult a doctor for health concerns.
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Add Entry</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Allergen Name</Label>
 <Input placeholder="e.g., Peanuts, Pollen"value={name} onChange={e => setName(e.target.value)} />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Food">Food</SelectItem>
 <SelectItem value="Environmental">Environmental</SelectItem>
 <SelectItem value="Medication">Medication</SelectItem>
 <SelectItem value="Animal">Animal</SelectItem>
 <SelectItem value="Other">Other</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Severity</Label>
 <Select value={reactionType} onValueChange={setReactionType}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Mild">Mild</SelectItem>
 <SelectItem value="Moderate">Moderate</SelectItem>
 <SelectItem value="Severe">Severe</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 <div className="space-y-2">
 <Label>Symptoms</Label>
 <Input placeholder="e.g., Hives, sneezing"value={symptoms} onChange={e => setSymptoms(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date"value={date} onChange={e => setDate(e.target.value)} />
 </div>
 <Button onClick={handleAdd} className="w-full gap-2">
 <Plus className="w-4 h-4"/> Add Record
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Dashboard</CardTitle>
 <CardDescription>Summary of recorded allergies</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-center">
 <span className="text-3xl font-bold">{allergies.length}</span>
 <span className="text-sm text-muted-foreground">Total Entries</span>
 </div>
 <div className="p-4 rounded-lg bg-red-500/10 flex flex-col items-center justify-center text-center">
 <span className="text-3xl font-bold text-red-500">{allergies.filter(a => a.reactionType ==="Severe").length}</span>
 <span className="text-sm text-muted-foreground">Severe Reactions</span>
 </div>
 <div className="p-4 rounded-lg bg-blue-500/10 flex flex-col items-center justify-center text-center col-span-2">
 <span className="text-lg font-bold">
 {allergies.length > 0 
 ? Object.entries(allergies.reduce((acc, curr) => {
 acc[curr.category] = (acc[curr.category] || 0) + 1;
 return acc;
 }, {} as Record<string, number>)).sort((a,b) => b[1]-a[1])[0][0]
 :"None"
 }
 </span>
 <span className="text-sm text-muted-foreground">Most Common Category</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Log History</CardTitle>
 </CardHeader>
 <CardContent>
 {allergies.length === 0 ? (
 <div className="text-center text-muted-foreground py-8">No allergies recorded yet.</div>
 ) : (
 <div className="space-y-4">
 {allergies.map(a => (
 <div key={a.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card gap-4">
 <div>
 <h4 className="font-bold">{a.name}</h4>
 <p className="text-sm text-muted-foreground">{a.category} • {a.date}</p>
 {a.symptoms && <p className="text-sm mt-1">Symptoms: {a.symptoms}</p>}
 </div>
 <div className="flex items-center gap-4">
 <span className={cn("text-sm", getSeverityColor(a.reactionType))}>{a.reactionType}</span>
 <Button variant="ghost"size="icon"onClick={() => handleDelete(a.id)} className="text-destructive">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 );
}
