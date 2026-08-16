"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

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
import { AlertTriangle, BarChart3, Clock, Eye, Monitor, PieChart, Plus, Smartphone, Trash2 } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

type DeviceType ="phone"|"tablet"|"laptop"|"tv"|"gaming";
type AppCategory ="social media"|"work"|"entertainment"|"education";

interface Session {
 id: string;
 device: DeviceType;
 category: AppCategory;
 durationMins: number;
}

export function ScreenTimeClient() {
 const [sessions, setSessions] = useState<Session[]>([]);
 const [device, setDevice] = useState<DeviceType>("phone");
 const [category, setCategory] = useState<AppCategory>("social media");
 const [duration, setDuration] = useState<string>("60");

 useEffect(() => {
 const saved = localStorage.getItem("screen-time-sessions");
 if (saved) {
 try {
 setSessions(JSON.parse(saved));
 } catch (e) {
 // ignore
 }
 }
 }, []);

 const saveSessions = (newSessions: Session[]) => {
 setSessions(newSessions);
 localStorage.setItem("screen-time-sessions", JSON.stringify(newSessions));
 };

 const addSession = () => {
 const mins = parseInt(duration, 10);
 if (isNaN(mins) || mins <= 0) {
 toast.error("Please enter a valid duration");
 return;
 }
 const newSession: Session = {
 id: Math.random().toString(36).substring(2, 9),
 device,
 category,
 durationMins: mins
 };
 saveSessions([...sessions, newSession]);
 toast.success("Session added");
 setDuration("");
 };

 const removeSession = (id: string) => {
 saveSessions(sessions.filter(s => s.id !== id));
 };

 const clearAll = () => {
 if (confirm("Clear all tracked sessions?")) {
 saveSessions([]);
 }
 };

 const totalMinutes = sessions.reduce((acc, s) => acc + s.durationMins, 0);
 const totalHours = (totalMinutes / 60).toFixed(1);

 const deviceBreakdown = sessions.reduce((acc, s) => {
 acc[s.device] = (acc[s.device] || 0) + s.durationMins;
 return acc;
 }, {} as Record<string, number>);

 const categoryBreakdown = sessions.reduce((acc, s) => {
 acc[s.category] = (acc[s.category] || 0) + s.durationMins;
 return acc;
 }, {} as Record<string, number>);

 return (
 <div className="space-y-6 max-w-4xl mx-auto">
 <ToolPageHeader
 icon={Monitor}
 title="Screen Time Calculator"
 description="Track and analyze your daily screen time."
 actions={
 <ResetButton onClick={clearAll} label="Clear All"/>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Add Session</CardTitle>
 <CardDescription>Log your screen time usage.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Device Type</Label>
 <Select value={device} onValueChange={(val) => setDevice(val as DeviceType)}>
 <SelectTrigger>
 <SelectValue placeholder="Select device"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="phone">Phone</SelectItem>
 <SelectItem value="tablet">Tablet</SelectItem>
 <SelectItem value="laptop">Laptop / PC</SelectItem>
 <SelectItem value="tv">TV</SelectItem>
 <SelectItem value="gaming">Console</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>App Category</Label>
 <Select value={category} onValueChange={(val) => setCategory(val as AppCategory)}>
 <SelectTrigger>
 <SelectValue placeholder="Select category"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="social media">Social Media</SelectItem>
 <SelectItem value="work">Work / Productivity</SelectItem>
 <SelectItem value="entertainment">Entertainment</SelectItem>
 <SelectItem value="education">Education</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Duration (minutes)</Label>
 <Input
 type="number"
 min="1"
 value={duration}
 onChange={(e) => setDuration(e.target.value)}
 placeholder="e.g. 60"
 />
 </div>

 <Button onClick={addSession} className="w-full">
 <Plus className="w-4 h-4 mr-2"/> Add Session
 </Button>

 <Separator className="my-4"/>
 <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
 <Label>Logged Sessions</Label>
 {sessions.length === 0 ? (
 <div className="text-sm text-muted-foreground italic">No sessions logged yet.</div>
 ) : (
 sessions.map(s => (
 <div key={s.id} className="flex items-center justify-between p-2 rounded bg-secondary/30 text-sm">
 <div>
 <span className="capitalize font-medium">{s.device}</span> - <span className="capitalize text-muted-foreground">{s.category}</span>
 </div>
 <div className="flex items-center gap-2">
 <span className="font-medium">{s.durationMins}m</span>
 <Button variant="ghost"size="icon"className="h-6 w-6 text-destructive"onClick={() => removeSession(s.id)}>
 <Trash2 className="w-3 h-3"/>
 </Button>
 </div>
 </div>
 ))
 )}
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <BarChart3 className="w-5 h-5 text-primary"/>
 Analysis
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
 <div className="text-sm font-medium text-primary uppercase tracking-wider mb-1">Total Screen Time</div>
 <div className="text-4xl font-bold">{totalHours} <span className="text-xl text-muted-foreground font-normal">hrs</span></div>
 <div className="text-sm text-muted-foreground mt-1">({totalMinutes} minutes)</div>
 </div>

 {sessions.length > 0 && (
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label className="text-xs text-muted-foreground uppercase">By Device</Label>
 <div className="space-y-1">
 {Object.entries(deviceBreakdown).map(([dev, mins]) => (
 <div key={dev} className="flex justify-between text-sm">
 <span className="capitalize">{dev}</span>
 <span className="font-medium">{(mins as number / 60).toFixed(1)}h</span>
 </div>
 ))}
 </div>
 </div>
 <div className="space-y-2">
 <Label className="text-xs text-muted-foreground uppercase">By Category</Label>
 <div className="space-y-1">
 {Object.entries(categoryBreakdown).map(([cat, mins]) => (
 <div key={cat} className="flex justify-between text-sm">
 <span className="capitalize truncate max-w-[80px]"title={cat}>{cat}</span>
 <span className="font-medium">{(mins as number / 60).toFixed(1)}h</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <GlassCard className={totalMinutes > 360 ?"border-amber-500/50":""}>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <AlertTriangle className={cn("w-5 h-5", totalMinutes > 360 ?"text-amber-500":"text-muted-foreground")} />
 Health Tips
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-3 text-sm">
 <div className="p-3 bg-secondary/40 rounded border border-border/50">
 <strong className="block mb-1">20-20-20 Rule</strong>
 Every 20 minutes, look at something 20 feet away for 20 seconds to prevent eye strain.
 </div>
 
 {totalMinutes > 360 ? (
 <div className="p-3 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded border border-amber-500/20">
 <strong className="block mb-1">High Screen Time Detected</strong>
 You have logged over 6 hours of screen time. Consider taking extended breaks, stretching, or going for a walk.
 </div>
 ) : (
 <div className="p-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded border border-emerald-500/20">
 <strong className="block mb-1">Looking Good!</strong>
 Try to maintain regular breaks and avoid screens 1 hour before bedtime for optimal health.
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Hours",
    description:"Add daily screen use.",
    icon: Smartphone,
  },
{
    step:"02",
    title:"Categorize",
    description:"Split work, social, leisure.",
    icon: PieChart,
  },
{
    step:"03",
    title:"Analyze",
    description:"See weekly totals.",
    icon: BarChart3,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Smartphone,
    title:"Hour Log",
    description:"Track daily use.",
  },
{
    icon: PieChart,
    title:"Category Split",
    description:"Where time goes.",
  },
{
    icon: BarChart3,
    title:"Weekly View",
    description:"Totals and trends.",
  },
{
    icon: Eye,
    title:"Awareness",
    description:"Prompts balance.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A screen time calculator brings awareness to a habit most underestimate. By logging hours and categorizing them, you see where time actually goes — often surprising amounts in passive scrolling. This tool totals daily and weekly use, making the invisible visible.</p>
  <p>Categorization is the insight. Separating work from leisure reveals whether &quot;I'm busy&quot; is productive or recreational. The weekly view shows trends, helping you set realistic boundaries rather than vague intentions to &quot;use less.&quot;</p>
  <p>Awareness drives change. Noticing a 30-hour leisure week motivates small shifts — breaks, device-free meals, earlier bedtimes. The tool's value is honest measurement, the first step to a healthier digital balance.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why track screen time?",
    answer:"Awareness helps set boundaries.",
  },
{
    question:"Healthy amount?",
    answer:"Varies; balance matters most.",
  },
{
    question:"Work counts?",
    answer:"Yes, but separate from leisure.",
  },
{
    question:"Reduce it?",
    answer:"Set app limits and breaks.",
  },
{
    question:"Sleep impact?",
    answer:"Screens before bed can hurt rest.",
  }
  ]}
/>
</div>
 );
}
