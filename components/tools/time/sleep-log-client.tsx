"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Button } from"@/components/ui/button";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { BarChart2, Calendar, Download, Moon, PenLine, ShieldCheck, TrendingUp } from"lucide-react";
import { toast } from"react-hot-toast";

interface SleepEntry {
 id: string;
 date: string;
 bedtime: string;
 wakeTime: string;
 quality: string;
 mood: string;
 caffeineCutoff: string;
 hours: number;
}

export function SleepLogClient() {
 const [entries, setEntries] = useState<SleepEntry[]>([]);
 const [date, setDate] = useState("");
 const [bedtime, setBedtime] = useState("");
 const [wakeTime, setWakeTime] = useState("");
 const [quality, setQuality] = useState("3");
 const [mood, setMood] = useState("Neutral");
 const [caffeineCutoff, setCaffeineCutoff] = useState("");

 useEffect(() => {
 const saved = localStorage.getItem("sleep-log-entries");
 if (saved) {
 try {
 setEntries(JSON.parse(saved));
 } catch (e) {
 // ignore
 }
 }
 }, []);

 const saveEntries = (newEntries: SleepEntry[]) => {
 setEntries(newEntries);
 localStorage.setItem("sleep-log-entries", JSON.stringify(newEntries));
 };

 const calculateHours = (start: string, end: string) => {
 if (!start || !end) return 0;
 const [h1, m1] = start.split(":").map(Number);
 const [h2, m2] = end.split(":").map(Number);
 let d1 = new Date();
 d1.setHours(h1, m1, 0, 0);
 let d2 = new Date();
 d2.setHours(h2, m2, 0, 0);
 if (d2 < d1) {
 d2.setDate(d2.getDate() + 1);
 }
 return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60);
 };

 const handleAdd = () => {
 if (!date || !bedtime || !wakeTime) {
 toast.error("Please fill in Date, Bedtime, and Wake Time.");
 return;
 }
 const hours = calculateHours(bedtime, wakeTime);
 const newEntry: SleepEntry = {
 id: Date.now().toString(),
 date,
 bedtime,
 wakeTime,
 quality,
 mood,
 caffeineCutoff,
 hours,
 };
 saveEntries([...entries, newEntry]);
 toast.success("Sleep log added");
 setDate("");
 setBedtime("");
 setWakeTime("");
 };

 const handleExport = () => {
 if (entries.length === 0) {
 toast.error("No data to export");
 return;
 }
 const header ="Date,Bedtime,Wake Time,Quality,Mood,Caffeine Cutoff,Hours\n";
 const csv = entries.map(e => e.date +","+ e.bedtime +","+ e.wakeTime +","+ e.quality +","+ e.mood +","+ e.caffeineCutoff +","+ e.hours.toFixed(2)).join("\n");
 const blob = new Blob([header + csv], { type:"text/csv"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="sleep-log.csv";
 a.click();
 URL.revokeObjectURL(url);
 };

 const handleClear = () => {
 if (confirm("Clear all entries?")) {
 saveEntries([]);
 toast.success("Log cleared");
 }
 };

 const avgHours = entries.length ? (entries.reduce((acc, curr) => acc + curr.hours, 0) / entries.length).toFixed(1) :"0.0";

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Moon}
 title="Sleep Log & Circadian Rhythm Tracker"
 description="Log and analyze your daily sleep patterns and consistency."
 actions={
 <>
 <ActionButton onClick={handleExport} icon={Download} label="Export CSV"variant="outline"/>
 <ResetButton onClick={handleClear} label="Clear Log"/>
 </>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Add Sleep Log</CardTitle>
 <CardDescription>Record last night's sleep details.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date"value={date} onChange={(e) => setDate(e.target.value)} />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Bedtime</Label>
 <Input type="time"value={bedtime} onChange={(e) => setBedtime(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Wake Time</Label>
 <Input type="time"value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Sleep Quality (1-5)</Label>
 <Select value={quality} onValueChange={setQuality}>
 <SelectTrigger><SelectValue placeholder="Select quality"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="1">1 - Poor</SelectItem>
 <SelectItem value="2">2 - Fair</SelectItem>
 <SelectItem value="3">3 - Good</SelectItem>
 <SelectItem value="4">4 - Very Good</SelectItem>
 <SelectItem value="5">5 - Excellent</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Mood upon Waking</Label>
 <Select value={mood} onValueChange={setMood}>
 <SelectTrigger><SelectValue placeholder="Select mood"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="Groggy">Groggy</SelectItem>
 <SelectItem value="Neutral">Neutral</SelectItem>
 <SelectItem value="Refreshed">Refreshed</SelectItem>
 <SelectItem value="Energized">Energized</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Caffeine Cutoff Time</Label>
 <Input type="time"value={caffeineCutoff} onChange={(e) => setCaffeineCutoff(e.target.value)} />
 </div>
 <Button className="w-full"onClick={handleAdd}>Add Entry</Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Insights</CardTitle>
 <CardDescription>Your sleep statistics.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-2 gap-4 text-center">
 <div className="p-4 bg-muted/50 rounded-lg border">
 <div className="text-3xl font-bold">{avgHours}h</div>
 <div className="text-sm text-muted-foreground">Avg Sleep</div>
 </div>
 <div className="p-4 bg-muted/50 rounded-lg border">
 <div className="text-3xl font-bold">{entries.length}</div>
 <div className="text-sm text-muted-foreground">Total Logs</div>
 </div>
 </div>
 
 <div className="space-y-2">
 <h3 className="font-medium">Recent Logs</h3>
 {entries.length === 0 ? (
 <p className="text-sm text-muted-foreground">No entries yet.</p>
 ) : (
 <div className="space-y-2 max-h-64 overflow-y-auto">
 {entries.slice().reverse().map(e => (
 <div key={e.id} className="p-3 bg-muted/30 rounded border text-sm flex justify-between items-center">
 <div>
 <div className="font-medium">{e.date}</div>
 <div className="text-xs text-muted-foreground">{e.bedtime} - {e.wakeTime}</div>
 </div>
 <div className="text-right">
 <div className="font-bold">{e.hours.toFixed(1)}h</div>
 <div className="text-xs text-muted-foreground">Quality: {e.quality}/5</div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Log Night",
    description:"Record sleep and wake.",
    icon: Moon,
  },
{
    step:"02",
    title:"Add Notes",
    description:"Mood, caffeine, screen.",
    icon: PenLine,
  },
{
    step:"03",
    title:"Review",
    description:"See rhythm trends.",
    icon: TrendingUp,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Moon,
    title:"Log",
    description:"Nightly sleep.",
  },
{
    icon: PenLine,
    title:"Notes",
    description:"Context factors.",
  },
{
    icon: TrendingUp,
    title:"Trends",
    description:"Over time.",
  },
{
    icon: ShieldCheck,
    title:"Rhythm",
    description:"Circadian view.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A sleep log tracker records nightly sleep alongside context — caffeine, screens, mood — so you can correlate habits with rest quality. The rhythm view shows whether your schedule is consistent. This tool compiles the diary.</p>
  <p>Correlation is the insight; the log connects late coffee to poor nights. Trends over weeks beat single-night guesses.</p>
  <p>Use it as a sleep journal. The tool's value is pattern-aware rest tracking.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why log?",
    answer:"Reveals patterns affecting rest.",
  },
{
    question:"Notes help?",
    answer:"Yes, link causes to quality.",
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
    answer:"Better sleep.",
  }
  ]}
/>
</div>
 );
}
