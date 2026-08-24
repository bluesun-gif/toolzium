"use client";

import { Bell, Clock, Copy, Globe, Plus as PlusIcon, Shield, Sparkles, Trash2, Type, Volume2, Zap } from "lucide-react";

import { ToolBackground } from "@/components/shared/tool-background";

import { RelatedTools } from "@/components/shared/related-tools";
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

import { toast } from"react-hot-toast";

import { GridPattern } from"@/components/magicui/grid-pattern";

import { cn } from"@/lib/utils";

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

      <div className="relative space-y-6">

      <ToolBackground />

 <ToolPageHeader

 title="Timezone Alarm"

 description="Set alarms across different timezones reliably."

 icon={Clock}

 actions={<div className="flex flex-wrap items-center gap-2">

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

 <div key={alarm.id} className={cn("flex items-center justify-between rounded-lg border p-4", (alarm.active ?"bg-card":"bg-muted/50 opacity-70"))}>

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

 

 

      <ToolHowItWorks

        steps={[

          {

            step: "01",

            title: "Input Your Data",

            description: "Enter your information in the input field above and configure any options.",

            icon: Sparkles,

          },

          {

            step: "02",

            title: "Process & Generate",

            description: "The tool processes your input instantly and displays the results.",

            icon: Zap,

          },

          {

            step: "03",

            title: "Copy & Use",

            description: "Copy the output with one click and use it wherever you need.",

            icon: Copy,

          },

        ]}

        badges={["100% Free", "Instant Results", "Privacy-First"]}

      />

      <ToolFeatureGuides

        features={[

          {

            icon: Sparkles,

            title: "Lightning Fast",

            description: "Get results in milliseconds with our optimized client-side processing engine.",

          },

          {

            icon: Shield,

            title: "Completely Private",

            description: "All processing happens in your browser. Your data never leaves your device.",

          },

          {

            icon: Zap,

            title: "No Signup Required",

            description: "Use this tool instantly without creating an account or providing any personal information.",

          },

        ]}

      >

        <div className="prose dark:prose-invert max-w-none">

          <h3>Why Use Our Timezone Alarm?</h3>

          <p>

            This free online tool is designed to help you get accurate results quickly and securely.

            Whether you're a developer, designer, student, or professional, our Timezone Alarm provides

            the functionality you need without any complexity or cost.

          </p>

          <p>

            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum

            privacy and zero latency. No data is ever transmitted to external servers, making it safe

            for sensitive information.

          </p>

        </div>

      </ToolFeatureGuides>

      <ToolFaqAccordion

        faqs={[

          {

            question: "Is this tool free to use?",

            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",

          },

          {

            question: "Is my data secure?",

            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",

          },

          {

            question: "Do I need to create an account?",

            answer: "No account or registration is required. Simply open the tool and start using it immediately.",

          },

        ]}

      />
    </div>
    </div>
);
}

export default TzAlarmClient;
