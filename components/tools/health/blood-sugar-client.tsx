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
import { Activity, Plus, Filter, Download, Trash2 } from"lucide-react";
import { cn } from"@/lib/utils";

interface Entry {
 id: string;
 reading: number;
 unit: string;
 timing: string;
 notes: string;
 timestamp: number;
}

export function BloodSugarClient() {
 const [entries, setEntries] = useState<Entry[]>([]);
 const [reading, setReading] = useState("");
 const [unit, setUnit] = useState("mg/dL");
 const [timing, setTiming] = useState("Fasting");
 const [notes, setNotes] = useState("");
 const [filterTiming, setFilterTiming] = useState("All");

 useEffect(() => {
 const saved = localStorage.getItem("blood-sugar-entries");
 if (saved) {
 try {
 setEntries(JSON.parse(saved));
 } catch (e) {}
 }
 }, []);

 useEffect(() => {
 localStorage.setItem("blood-sugar-entries", JSON.stringify(entries));
 }, [entries]);

 const handleAdd = () => {
 const val = parseFloat(reading);
 if (isNaN(val) || val <= 0) return;
 const newEntry: Entry = {
 id: Math.random().toString(36).substr(2, 9),
 reading: val,
 unit,
 timing,
 notes,
 timestamp: Date.now()
 };
 setEntries([newEntry, ...entries]);
 setReading("");
 setNotes("");
 };

 const removeEntry = (id: string) => {
 setEntries(entries.filter(e => e.id !== id));
 };

 const clearAll = () => {
 if (confirm("Clear all entries?")) {
 setEntries([]);
 }
 };

 const getStatus = (val: number, currentUnit: string) => {
 const mgdl = currentUnit ==="mmol/L"? val * 18 : val;
 if (mgdl < 70) return { label:"Low", color:"text-red-500"};
 if (mgdl <= 99) return { label:"Normal", color:"text-green-500"};
 if (mgdl <= 125) return { label:"Pre-diabetes", color:"text-yellow-500"};
 return { label:"High", color:"text-red-500"};
 };

 const filteredEntries = filterTiming ==="All"? entries : entries.filter(e => e.timing === filterTiming);

 const exportCSV = () => {
 let csv ="Date,Time,Reading,Unit,Timing,Status,Notes\n";
 filteredEntries.forEach(e => {
 const d = new Date(e.timestamp);
 const status = getStatus(e.reading, e.unit).label;
 csv += d.toLocaleDateString() +","+ d.toLocaleTimeString() +","+ e.reading +","+ e.unit +","+ e.timing +","+ status +","+ e.notes.replace(/,/g,"") +"\n";
 });
 const blob = new Blob([csv], { type:"text/csv"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="blood_sugar_log.csv";
 a.click();
 URL.revokeObjectURL(url);
 };

 const avgReading = filteredEntries.length > 0 
 ? (filteredEntries.reduce((acc, curr) => {
 let mgdl = curr.unit ==="mmol/L"? curr.reading * 18 : curr.reading;
 return acc + mgdl;
 }, 0) / filteredEntries.length).toFixed(1)
 : 0;

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Activity}
 title="Blood Sugar Tracker"
 description="Log your blood glucose levels and track your history. (Not medical advice)"
 actions={
 <>
 <ActionButton icon={Download} label="Export CSV"onClick={exportCSV} />
 <ResetButton onClick={clearAll} label="Clear Log"/>
 </>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Add Entry</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Reading</Label>
 <div className="flex gap-2">
 <Input type="number"step="0.1"value={reading} onChange={(e) => setReading(e.target.value)} placeholder="e.g. 95"/>
 <Select value={unit} onValueChange={setUnit}>
 <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="mg/dL">mg/dL</SelectItem>
 <SelectItem value="mmol/L">mmol/L</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 <div className="space-y-2">
 <Label>Timing</Label>
 <Select value={timing} onValueChange={setTiming}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Fasting">Fasting</SelectItem>
 <SelectItem value="Before Meal">Before Meal</SelectItem>
 <SelectItem value="After Meal">After Meal</SelectItem>
 <SelectItem value="Bedtime">Bedtime</SelectItem>
 <SelectItem value="Random">Random</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Notes (Optional)</Label>
 <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How you felt, food eaten, etc."/>
 </div>
 <Button className="w-full mt-4"onClick={handleAdd}>
 <Plus className="w-4 h-4 mr-2"/> Add Log
 </Button>
 <p className="text-xs text-muted-foreground mt-4 italic text-center">
 Disclaimer: This tool is for informational purposes only and not medical advice.
 </p>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader className="flex flex-row justify-between items-center pb-2">
 <div>
 <CardTitle>History & Averages</CardTitle>
 <CardDescription>
 Avg: {avgReading} mg/dL {filteredEntries.length > 0 &&"("+ filteredEntries.length +"entries)"}
 </CardDescription>
 </div>
 <div className="flex items-center gap-2">
 <Filter className="w-4 h-4 text-muted-foreground"/>
 <Select value={filterTiming} onValueChange={setFilterTiming}>
 <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="All">All Timings</SelectItem>
 <SelectItem value="Fasting">Fasting</SelectItem>
 <SelectItem value="Before Meal">Before Meal</SelectItem>
 <SelectItem value="After Meal">After Meal</SelectItem>
 <SelectItem value="Bedtime">Bedtime</SelectItem>
 <SelectItem value="Random">Random</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardHeader>
 <CardContent>
 {filteredEntries.length === 0 ? (
 <div className="text-center py-10 text-muted-foreground">No entries found.</div>
 ) : (
 <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
 {filteredEntries.map(entry => {
 const status = getStatus(entry.reading, entry.unit);
 const d = new Date(entry.timestamp);
 return (
 <div key={entry.id} className="flex justify-between items-center p-3 rounded-lg border bg-card/50">
 <div>
 <div className="flex items-baseline gap-2">
 <span className="text-lg font-bold">{entry.reading}</span>
 <span className="text-sm text-muted-foreground">{entry.unit}</span>
 <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full bg-accent", status.color)}>
 {status.label}
 </span>
 </div>
 <div className="text-xs text-muted-foreground mt-1">
 {d.toLocaleString()} • {entry.timing} {entry.notes &&"•"+ entry.notes}
 </div>
 </div>
 <Button variant="ghost"size="sm"onClick={() => removeEntry(entry.id)} className="text-destructive h-8 w-8 p-0">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 );
 })}
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
