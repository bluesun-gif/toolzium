"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Plus, Trash2, Shield, BookOpen, Layers, CheckCircle2 } from"lucide-react";
import { toast } from "react-hot-toast";

type Event = {
  id: string;
  title: string;
  day: number; // 0 (Mon) to 6 (Sun)
  hour: number; // 6 to 22
  duration: number; // in hours
  color: string;
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 7am to 9pm
const COLORS = [
  { value: "bg-blue-500 text-white", label: "Work (Blue)" },
  { value: "bg-emerald-500 text-white", label: "Personal (Green)" },
  { value: "bg-amber-500 text-white", label: "Health (Amber)" },
  { value: "bg-purple-500 text-white", label: "Social (Purple)" },
];

const DEFAULT_EVENTS: Event[] = [
  { id: "e1", title: "Team Weekly Standup", day: 0, hour: 9, duration: 1, color: "bg-blue-500 text-white" },
  { id: "e2", title: "Gym & Workout", day: 1, hour: 8, duration: 1, color: "bg-amber-500 text-white" },
  { id: "e3", title: "Sprint Demo Review", day: 4, hour: 15, duration: 1, color: "bg-emerald-500 text-white" },
];

export function WeeklyPlannerClient() {
  const [events, setEvents] = useState<Event[]>(DEFAULT_EVENTS);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("0");
  const [hour, setHour] = useState("9");
  const [duration, setDuration] = useState("1");
  const [color, setColor] = useState(COLORS[0].value);

  useEffect(() => {
    const saved = localStorage.getItem("weekly-planner-events");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setEvents(parsed);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("weekly-planner-events", JSON.stringify(events));
    }
  }, [events]);

  const addEvent = () => {
    if (!title.trim()) return toast.error("Please enter an event title");
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      day: parseInt(day, 10),
      hour: parseInt(hour, 10),
      duration: parseInt(duration, 10),
      color,
    };
    setEvents([...events, newEvent]);
    setTitle("");
    toast.success("Added event to weekly calendar!");
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
    toast.success("Event removed.");
  };

  const exportPlan = () => {
    let text = "Weekly Schedule Overview\n\n";
    DAYS.forEach((d, idx) => {
      const dayEvents = events.filter((e) => e.day === idx).sort((a, b) => a.hour - b.hour);
      if (dayEvents.length > 0) {
        text += `${d}:\n`;
        dayEvents.forEach((e) => {
          text += `- ${e.hour}:00 - ${e.title} (${e.duration}h)\n`;
        });
        text += "\n";
      }
    });
    return text || "No events planned for this week.";
  };

  const handleReset = () => {
    setEvents(DEFAULT_EVENTS);
    localStorage.removeItem("weekly-planner-events");
    toast.success("Reset schedule to defaults!");
  };

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      <ToolPageHeader
        icon={Calendar}
        title="Weekly Calendar & Time Blocking Planner"
        description="Organize your work week with a visual 7-day calendar grid, custom color badges, and exportable text schedules."
        actions={
          <div className="flex gap-2">
            <CopyButton getText={exportPlan} label="Export Schedule" />
            <ResetButton onClick={handleReset} label="Reset Grid" />
          </div>
        }
      />

      {/* ADD EVENT FORM */}
      <GlassCard>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="w-5 h-5 text-primary" /> Add Event / Block Time
          </CardTitle>
          <CardDescription>Schedule tasks into specific days and hourly blocks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-1.5 lg:col-span-1">
              <Label htmlFor="ev-title" className="text-xs font-bold">Event Title</Label>
              <Input
                id="ev-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Client Sync..."
                className="h-10 text-xs font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Day of Week</Label>
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger className="h-10 text-xs font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((d, i) => (
                    <SelectItem key={i} value={i.toString()}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Start Time</Label>
              <Select value={hour} onValueChange={setHour}>
                <SelectTrigger className="h-10 text-xs font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HOURS.map((h) => (
                    <SelectItem key={h} value={h.toString()}>{h}:00</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Category Color</Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger className="h-10 text-xs font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLORS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addEvent} className="h-10 font-bold gap-2">
              <Plus className="w-4 h-4" /> Add Event
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* CALENDAR GRID */}
      <GlassCard>
        <CardHeader className="pb-3 border-b border-border/60">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5 text-primary" /> 7-Day Weekly Calendar Grid
          </CardTitle>
          <CardDescription>Click any event card to remove it from your schedule.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 overflow-x-auto">
          <div className="min-w-[850px] border border-border/60 rounded-xl overflow-hidden bg-background">
            <div className="grid grid-cols-8 border-b border-border/60 bg-muted/30 text-xs font-bold text-muted-foreground uppercase">
              <div className="p-3 border-r border-border/60 text-center">Time</div>
              {DAYS.map((d) => (
                <div key={d} className="p-3 border-r border-border/60 text-center last:border-r-0">{d}</div>
              ))}
            </div>
            {HOURS.map((h) => (
              <div key={h} className="grid grid-cols-8 border-b border-border/40 last:border-b-0">
                <div className="p-2 border-r border-border/60 text-[11px] font-mono text-muted-foreground text-center flex items-center justify-center bg-muted/10">
                  {h}:00
                </div>
                {DAYS.map((_, dayIdx) => {
                  const dayEvents = events.filter((e) => e.day === dayIdx && e.hour === h);
                  return (
                    <div key={dayIdx} className="p-1 border-r border-border/40 last:border-r-0 min-h-[55px] relative">
                      {dayEvents.map((e) => (
                        <div
                          key={e.id}
                          className={cn(
                            "p-2 text-xs font-bold rounded-lg shadow-xs mb-1 cursor-pointer transition-all hover:scale-102 hover:opacity-90 flex items-center justify-between gap-1",
                            e.color
                          )}
                          onClick={() => removeEvent(e.id)}
                          title="Click to remove event"
                        >
                          <span className="truncate">{e.title}</span>
                          <Trash2 className="w-3 h-3 shrink-0 opacity-70 hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </GlassCard>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Add Time Blocks",
            description: "Pick day of week, hour slot, and category color (Work, Personal, Health, Social).",
            icon: Calendar,
          },
          {
            step: "02",
            title: "Manage Grid Schedule",
            description: "View your weekly schedule visually on a 7-day grid and click events to remove them.",
            icon: Clock,
          },
          {
            step: "03",
            title: "Export Text Summary",
            description: "Copy a structured text summary of your weekly schedule to your clipboard.",
            icon: CheckCircle2,
          },
        ]}
        badges={["7-Day Calendar Grid", "Color Category Badges", "100% Free"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Calendar,
            title: "Visual Time Blocking Grid",
            description: "Displays 7 AM - 9 PM hourly time blocks across Monday through Sunday.",
          },
          {
            icon: Clock,
            title: "Categorized Color Badges",
            description: "Assign distinct color tags for Work, Health, Personal, and Social activities.",
          },
          {
            icon: Shield,
            title: "Offline Local Storage",
            description: "Saves your weekly schedule automatically in your local browser storage.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "How do I remove an event from the calendar?",
            answer: "Simply click on any event block in the grid to instantly delete it from your schedule.",
          },
          {
            question: "Is my weekly plan saved automatically?",
            answer: "Yes, your schedule persists automatically in local browser storage.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/weekly-planner" max={6} />
    </div>
  );
}
