"use client";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Clock, Globe, Bell, Trash2 } from"lucide-react";
import { toast } from"react-hot-toast";

type Alarm = {
 id: string;
 time: string;
 timezone: string;
 label: string;
 active: boolean;
};

const TIMEZONES = [
"UTC",
"America/New_York",
"America/Los_Angeles",
"America/Chicago",
"Europe/London",
"Europe/Paris",
"Asia/Tokyo",
"Asia/Shanghai",
"Asia/Kolkata",
"Australia/Sydney",
"Pacific/Auckland"
];

function playAlarmSound() {
 try {
 const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
 if (!AudioContextClass) return;
 const ctx = new AudioContextClass();
 const osc = ctx.createOscillator();
 osc.type ="square";
 osc.frequency.setValueAtTime(440, ctx.currentTime);
 osc.connect(ctx.destination);
 osc.start();
 osc.stop(ctx.currentTime + 1.5);
 } catch (e) {
 console.error("Audio failed", e);
 }
}

export function TzAlarmClient() {
 const [alarms, setAlarms] = useState<Alarm[]>([]);
 const [newTime, setNewTime] = useState("08:00");
 const [newTz, setNewTz] = useState("UTC");
 const [newLabel, setNewLabel] = useState("Wake Up");
 const [now, setNow] = useState(new Date());
 
 // Load alarms from local storage
 useEffect(() => {
 const saved = localStorage.getItem("tz-alarms");
 if (saved) {
 try { setAlarms(JSON.parse(saved)); } catch (e) { console.error(e); }
 }
 }, []);

 // Save alarms
 useEffect(() => {
 localStorage.setItem("tz-alarms", JSON.stringify(alarms));
 }, [alarms]);

 // Main clock & alarm trigger
 useEffect(() => {
 const timer = setInterval(() => {
 const currentTime = new Date();
 setNow(currentTime);
 
 setAlarms(prevAlarms => {
 let changed = false;
 const nextAlarms = prevAlarms.map(a => {
 if (!a.active) return a;
 const tzTimeStr = currentTime.toLocaleTimeString("en-US", { timeZone: a.timezone, hour12: false, hour: '2-digit', minute: '2-digit' });
 
 if (tzTimeStr === a.time && currentTime.getSeconds() === 0) {
 playAlarmSound();
 toast("Alarm:"+ a.label, { duration: 10000, icon:"⏰"});
 changed = true;
 return { ...a, active: false };
 }
 return a;
 });
 return changed ? nextAlarms : prevAlarms;
 });
 }, 1000);
 return () => clearInterval(timer);
 }, []);

 const addAlarm = () => {
 const alarm: Alarm = {
 id: Date.now().toString(),
 time: newTime,
 timezone: newTz,
 label: newLabel ||"Alarm",
 active: true,
 };
 setAlarms([...alarms, alarm]);
 toast.success("Alarm added");
 };

 const toggleAlarm = (id: string, state: boolean) => {
 setAlarms(alarms.map(a => a.id === id ? { ...a, active: state } : a));
 };

 const removeAlarm = (id: string) => {
 setAlarms(alarms.filter(a => a.id !== id));
 toast.success("Alarm removed");
 };

 const snoozeAlarm = (id: string) => {
 setAlarms(alarms.map(a => {
 if (a.id === id) {
 const [hh, mm] = a.time.split(":").map(Number);
 const nextDate = new Date();
 nextDate.setHours(hh);
 nextDate.setMinutes(mm + 5);
 const snoozedTime = nextDate.toTimeString().slice(0, 5);
 toast.success("Snoozed for 5 minutes");
 return { ...a, active: true, time: snoozedTime };
 }
 return a;
 }));
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 title="Timezone Alarm"
 description="Set alarms across different timezones reliably."
 icon={Clock}
 actions={
 <div className="flex gap-2">
 <Button variant="outline"onClick={() => setAlarms([])}>Clear All</Button>
 </div>
 }
 />

 <div className={"grid gap-6 md:grid-cols-3"}>
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Add Alarm</CardTitle>
 <CardDescription>Create a new cross-timezone alert.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Time (HH:MM)</Label>
 <Input type="time"value={newTime} onChange={(e) => setNewTime(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Timezone</Label>
 <Select value={newTz} onValueChange={setNewTz}>
 <SelectTrigger>
 <SelectValue placeholder="Select timezone"/>
 </SelectTrigger>
 <SelectContent>
 {TIMEZONES.map(tz => (
 <SelectItem key={tz} value={tz}>{tz}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Label</Label>
 <Input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Meeting, Wake Up..."/>
 </div>
 <Button className="w-full"onClick={addAlarm}>
 <PlusIcon className="mr-2 h-4 w-4"/> Add Alarm
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader>
 <CardTitle>Your Alarms</CardTitle>
 <CardDescription>Manage active and upcoming alarms.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {alarms.length === 0 ? (
 <div className={"py-8 text-center text-muted-foreground"}>No alarms set.</div>
 ) : (
 <div className="space-y-4">
 {alarms.map(alarm => (
 <div key={alarm.id} className={"flex items-center justify-between rounded-lg border p-4"+ (alarm.active ?"bg-card":"bg-muted/50 opacity-70")}>
 <div className="flex flex-col">
 <span className="text-2xl font-bold">{alarm.time}</span>
 <span className="text-sm font-medium">{alarm.label}</span>
 <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
 <Globe className="h-3 w-3"/> {alarm.timezone} 
 (Currently: {now.toLocaleTimeString("en-US", { timeZone: alarm.timezone, hour12: false, hour: '2-digit', minute: '2-digit' })})
 </span>
 </div>
 <div className="flex items-center gap-4">
 <Button variant="outline"size="sm"onClick={() => snoozeAlarm(alarm.id)} disabled={alarm.active}>Snooze</Button>
 <Switch checked={alarm.active} onCheckedChange={(c) => toggleAlarm(alarm.id, c)}

<ToolHowItWorks
  steps={[
  {
    step:"01",
    title:"Pick Zone",
    description:"Target time zone.",
    icon: Globe,
  },
  {
    step:"02",
    title:"Set Time",
    description:"Alarm in that zone.",
    icon: AlarmClock,
  },
  {
    step:"03",
    title:"Confirm",
    description:"See your local equivalent.",
    icon: Clock,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
  {
    icon: Globe,
    title:"Zone",
    description:"Any region.",
  },
  {
    icon: AlarmClock,
    title:"Alarm",
    description:"In target zone.",
  },
  {
    icon: Clock,
    title:"Local",
    description:"Your equivalent.",
  },
  {
    icon: Bell,
    title:"Alert",
    description:"Notify on time.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A timezone alarm lets you set a wake or reminder in a different zone and shows your local equivalent, so you never miscalculate for an overseas event. The conversion is automatic. This tool sets and confirms.</p>
  <p>Avoiding 3am wake-ups for a noon call is the whole point. The alarm removes the risk.</p>
  <p>Use it for foreign-scheduled events. The tool's value is zone-correct alarms.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
  {
    question:"What does it do?",
    answer:"Alarms set in another zone.",
  },
  {
    question:"Shows local?",
    answer:"Yes, converts for you.",
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
    answer:"Wake for events abroad.",
  }
  ]}
/>
 />
 <Button variant="ghost"size="icon"onClick={() => removeAlarm(alarm.id)}>
 <Trash2 className="h-4 w-4 text-destructive"/>
 </Button>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
 return (
 <svg {...props} xmlns="http://www.w3.org/2000/svg"width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M5 12h14"/>
 <path d="M12 5v14"/>
 </svg>
 );
}
