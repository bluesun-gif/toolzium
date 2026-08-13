"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Calendar, Clock, Sparkles, Plus, Trash2, Shield, Zap, Copy } from"lucide-react";
import { ActionButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

interface EventItem {
 id: string;
 name: string;
 targetDate: string;
 color: string;
}

const PRESETS = [
 { name:"New Year", date: `${new Date().getFullYear() + 1}-01-01T00:00` },
 { name:"Christmas", date: `${new Date().getFullYear()}-12-25T00:00` },
 { name:"Halloween", date: `${new Date().getFullYear()}-10-31T00:00` },
 { name:"Valentine's Day", date: `${new Date().getFullYear() + (new Date().getMonth() > 1 ? 1 : 0)}-02-14T00:00` },
];

const COLORS = [
 { label:"Blue", value:"bg-blue-500"},
 { label:"Red", value:"bg-red-500"},
 { label:"Green", value:"bg-green-500"},
 { label:"Purple", value:"bg-purple-500"},
 { label:"Orange", value:"bg-orange-500"},
 { label:"Pink", value:"bg-pink-500"},
];

export function EventCountdownClient() {
 const [events, setEvents] = useState<EventItem[]>([]);
 const [newName, setNewName] = useState("");
 const [newDate, setNewDate] = useState("");
 const [newColor, setNewColor] = useState(COLORS[0].value);
 const [now, setNow] = useState(new Date().getTime());

 useEffect(() => {
 const saved = localStorage.getItem("event-countdowns");
 if (saved) {
 try {
 setEvents(JSON.parse(saved));
 } catch (e) {
 console.error(e);
 }
 }

 const interval = setInterval(() => {
 setNow(new Date().getTime());
 }, 1000);

 return () => clearInterval(interval);
 }, []);

 const saveEvents = (newEvents: EventItem[]) => {
 setEvents(newEvents);
 localStorage.setItem("event-countdowns", JSON.stringify(newEvents));
 };

 const addEvent = () => {
 if (!newName || !newDate) {
 toast.error("Please enter a name and date");
 return;
 }
 const newEvent: EventItem = {
 id: Math.random().toString(36).substr(2, 9),
 name: newName,
 targetDate: newDate,
 color: newColor,
 };
 saveEvents([...events, newEvent]);
 setNewName("");
 setNewDate("");
 toast.success("Event added!");
 };

 const removeEvent = (id: string) => {
 saveEvents(events.filter((e) => e.id !== id));
 toast.success("Event removed");
 };

 const loadPreset = (preset: typeof PRESETS[0]) => {
 setNewName(preset.name);
 setNewDate(preset.date);
 setNewColor(COLORS[Math.floor(Math.random() * COLORS.length)].value);
 };

 const renderCountdown = (targetDateStr: string) => {
 const target = new Date(targetDateStr).getTime();
 const diff = target - now;
 const isPast = diff < 0;
 const absDiff = Math.abs(diff);

 const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
 const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
 const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
 const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

 return (
 <div className="flex flex-col items-center">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 {isPast && <div className="text-sm font-semibold text-destructive mb-2">Event Passed</div>}
 <div className="grid grid-cols-4 gap-2 text-center w-full">
 <div className="bg-background rounded-md p-2 shadow-sm border">
 <div className="text-2xl font-bold">{days}</div>
 <div className="text-xs text-muted-foreground uppercase">Days</div>
 </div>
 <div className="bg-background rounded-md p-2 shadow-sm border">
 <div className="text-2xl font-bold">{hours}</div>
 <div className="text-xs text-muted-foreground uppercase">Hrs</div>
 </div>
 <div className="bg-background rounded-md p-2 shadow-sm border">
 <div className="text-2xl font-bold">{minutes}</div>
 <div className="text-xs text-muted-foreground uppercase">Mins</div>
 </div>
 <div className="bg-background rounded-md p-2 shadow-sm border">
 <div className="text-2xl font-bold">{seconds}</div>
 <div className="text-xs text-muted-foreground uppercase">Secs</div>
 </div>
 </div>
 {isPast && <div className="text-xs text-muted-foreground mt-2">ago</div>}
 </div>
 );
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Calendar}
 title="Event Countdown"
 description="Create and track multiple countdowns for your upcoming events and milestones."
 />

 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1 h-fit">
 <CardHeader>
 <CardTitle>Create Event</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Event Name</Label>
 <Input
 placeholder="e.g., Summer Vacation"
 value={newName}
 onChange={(e) => setNewName(e.target.value)}
 />
 </div>
 
 <div className="space-y-2">
 <Label>Date & Time</Label>
 <Input
 type="datetime-local"
 value={newDate}
 onChange={(e) => setNewDate(e.target.value)}
 />
 </div>

 <div className="space-y-2">
 <Label>Theme Color</Label>
 <Select value={newColor} onValueChange={setNewColor}>
 <SelectTrigger>
 <SelectValue placeholder="Select color"/>
 </SelectTrigger>
 <SelectContent>
 {COLORS.map((c) => (
 <SelectItem key={c.value} value={c.value}>
 <div className="flex items-center gap-2">
 <div className={cn("w-3 h-3 rounded-full", c.value)} />
 {c.label}
 </div>
 </SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 <Button onClick={addEvent} className="w-full">
 <Plus className="w-4 h-4 mr-2"/>
 Add Countdown
 </Button>

 <div className="pt-4 border-t">
 <Label className="mb-2 block">Quick Presets</Label>
 <div className="flex flex-wrap gap-2">
 {PRESETS.map((preset) => (
 <Button
 key={preset.name}
 variant="outline"
 size="sm"
 onClick={() => loadPreset(preset)}
 >
 <Sparkles className="w-3 h-3 mr-1"/>
 {preset.name}
 </Button>
 ))}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="md:col-span-2 space-y-4">
 {events.length === 0 ? (
 <GlassCard>
 <CardContent className="py-12 flex flex-col items-center justify-center text-muted-foreground">
 <Clock className="w-12 h-12 mb-4 opacity-20"/>
 <p>No active countdowns.</p>
 <p className="text-sm">Create one to get started!</p>
 </CardContent>
 </GlassCard>
 ) : (
 <div className="grid sm:grid-cols-2 gap-4">
 {events.map((event) => (
 <GlassCard key={event.id} className="overflow-hidden">
 <div className={cn("h-2 w-full", event.color)} />
 <CardHeader className="pb-2">
 <div className="flex justify-between items-start">
 <div>
 <CardTitle className="text-lg">{event.name}</CardTitle>
 <CardDescription>{new Date(event.targetDate).toLocaleString()}</CardDescription>
 </div>
 <Button
 variant="ghost"
 size="icon"
 className="text-muted-foreground hover:text-destructive -mt-2 -mr-2"
 onClick={() => removeEvent(event.id)}
 >
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 </CardHeader>
 <CardContent>
 {renderCountdown(event.targetDate)}
 </CardContent>
 </GlassCard>
 ))}
 </div>
 )}
 </div>
 </div>
 
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
          <h3>Why Use Our Event Countdown?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Event Countdown provides
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

      <RelatedTools currentToolUrl="/tools/time/event-countdown" max={6} />

</div>
 );
}
