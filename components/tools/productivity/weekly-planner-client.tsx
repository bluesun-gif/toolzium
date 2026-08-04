"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Plus, Download, ChevronLeft, ChevronRight } from "lucide-react";
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
const HOURS = Array.from({ length: 17 }, (_, i) => i + 6);
const COLORS = [
  { value: "bg-blue-500", label: "Work" },
  { value: "bg-green-500", label: "Personal" },
  { value: "bg-orange-500", label: "Health" },
  { value: "bg-purple-500", label: "Social" },
];

export function WeeklyPlannerClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("0");
  const [hour, setHour] = useState("9");
  const [duration, setDuration] = useState("1");
  const [color, setColor] = useState(COLORS[0].value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("weekly-planner-events");
    if (saved) {
      try { setEvents(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("weekly-planner-events", JSON.stringify(events));
    }
  }, [events, mounted]);

  const addEvent = () => {
    if (!title) return toast.error("Please enter a title");
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      day: parseInt(day),
      hour: parseInt(hour),
      duration: parseInt(duration),
      color,
    };
    setEvents([...events, newEvent]);
    setTitle("");
    toast.success("Event added");
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const exportPlan = () => {
    let text = "Weekly Plan\n\n";
    DAYS.forEach((d, idx) => {
      const dayEvents = events.filter(e => e.day === idx).sort((a, b) => a.hour - b.hour);
      if (dayEvents.length > 0) {
        text += `${d}:\n`;
        dayEvents.forEach(e => {
          text += `- ${e.hour}:00 - ${e.title} (${e.duration}h)\n`;
        });
        text += "\n";
      }
    });
    return text || "No events planned.";
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Calendar}
        title="Weekly Planner"
        description="Plan your week with a visual calendar grid."
        actions={
          <>
            <CopyButton getText={exportPlan} label="Export Text" />
            <ResetButton onClick={() => setEvents([])} label="Clear All" />
          </>
        }
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Add Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" />
            </div>
            <div className="space-y-2">
              <Label>Day</Label>
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DAYS.map((d, i) => <SelectItem key={i} value={i.toString()}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Select value={hour} onValueChange={setHour}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {HOURS.map(h => <SelectItem key={h} value={h.toString()}>{h}:00</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {COLORS.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addEvent}><Plus className="w-4 h-4 mr-2" /> Add</Button>
          </div>
        </CardContent>
      </GlassCard>

      <GlassCard>
        <CardHeader>
          <CardTitle>Calendar Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px] border rounded-lg">
              <div className="grid grid-cols-8 border-b">
                <div className="p-2 border-r font-medium text-center bg-muted/50">Time</div>
                {DAYS.map(d => (
                  <div key={d} className="p-2 border-r font-medium text-center bg-muted/50 last:border-r-0">{d}</div>
                ))}
              </div>
              {HOURS.map(h => (
                <div key={h} className="grid grid-cols-8 border-b last:border-b-0">
                  <div className="p-2 border-r text-xs text-muted-foreground text-center flex items-center justify-center">
                    {h}:00
                  </div>
                  {DAYS.map((_, dayIdx) => {
                    const dayEvents = events.filter(e => e.day === dayIdx && e.hour === h);
                    return (
                      <div key={dayIdx} className="p-1 border-r last:border-r-0 min-h-[60px] relative">
                        {dayEvents.map(e => (
                          <div
                            key={e.id}
                            className={cn("p-1 text-xs text-white rounded mb-1 cursor-pointer truncate", e.color)}
                            onClick={() => removeEvent(e.id)}
                            title="Click to remove"
                          >
                            {e.title}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
