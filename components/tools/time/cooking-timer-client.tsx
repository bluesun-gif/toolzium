"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Timer, Plus, Play, Pause, Square, BellRing, X, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type TimerState = "running" | "paused" | "stopped" | "done";
interface CookingTimer {
  id: string;
  label: string;
  durationSeconds: number;
  remainingSeconds: number;
  state: TimerState;
  color: string;
}
const PRESETS = [{
  label: "Boiled Egg",
  duration: 7 * 60
}, {
  label: "Pasta",
  duration: 10 * 60
}, {
  label: "Rice",
  duration: 20 * 60
}, {
  label: "Chicken",
  duration: 45 * 60
}, {
  label: "Roast",
  duration: 120 * 60
}];
const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"];
export function CookingTimerClient() {
  const [timers, setTimers] = useState<CookingTimer[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [newMinutes, setNewMinutes] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => prev.map(t => {
        if (t.state === "running") {
          const nextRemaining = t.remainingSeconds - 1;
          if (nextRemaining <= 0) {
            playBeep();
            return {
              ...t,
              remainingSeconds: 0,
              state: "done"
            };
          }
          return {
            ...t,
            remainingSeconds: nextRemaining
          };
        }
        return t;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const playBeep = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.5);
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.error(e);
    }
  };
  const addTimer = (label: string, durationSeconds: number) => {
    if (timers.length >= 6) {
      toast.error("Maximum 6 timers allowed");
      return;
    }
    const color = COLORS[timers.length % COLORS.length];
    setTimers([...timers, {
      id: Math.random().toString(36).substring(2, 9),
      label,
      durationSeconds,
      remainingSeconds: durationSeconds,
      state: "running",
      color
    }]);
  };
  const handleCustomAdd = () => {
    const mins = parseInt(newMinutes);
    if (!newLabel || isNaN(mins) || mins <= 0) {
      toast.error("Please enter a valid label and duration");
      return;
    }
    addTimer(newLabel, mins * 60);
    setNewLabel("");
    setNewMinutes("");
  };
  const updateTimerState = (id: string, newState: TimerState) => {
    setTimers(timers.map(t => {
      if (t.id === id) {
        if (newState === "stopped") {
          return {
            ...t,
            state: newState,
            remainingSeconds: t.durationSeconds
          };
        }
        return {
          ...t,
          state: newState
        };
      }
      return t;
    }));
  };
  const removeTimer = (id: string) => {
    setTimers(timers.filter(t => t.id !== id));
  };
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  return <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader icon={Timer} title="Cooking Timer" description="Run multiple kitchen timers simultaneously." actions={<ResetButton onClick={() => setTimers([])} label="Clear All" />} />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <GlassCard className="lg:col-span-1">
 <CardHeader>
 <CardTitle>Add Timer</CardTitle>
 <CardDescription>Choose preset or custom</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Presets</Label>
 <div className="flex flex-wrap gap-2">
 {PRESETS.map(p => <Button key={p.label} variant="outline" size="sm" onClick={() => addTimer(p.label, p.duration)}>
 {p.label}
 </Button>)}
 </div>
 </div>
 
 <div className="space-y-4 pt-4 border-t">
 <Label>Custom Timer</Label>
 <div className="space-y-2">
 <Label className="text-xs">Label</Label>
 <Input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="e.g. Potatoes" />
 </div>
 <div className="space-y-2">
 <Label className="text-xs">Duration (minutes)</Label>
 <Input type="number" value={newMinutes} onChange={e => setNewMinutes(e.target.value)} placeholder="e.g. 15" min="1" />
 </div>
 <ActionButton onClick={handleCustomAdd} icon={Plus} label="Add Custom Timer" className="w-full" />
 </div>
 </CardContent>
 </GlassCard>

 <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
 {timers.length === 0 ? <div className="col-span-full h-40 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl">
 No active timers. Add one to begin.
 </div> : timers.map(t => <GlassCard key={t.id} className={cn("relative overflow-hidden", t.state === "done" ? "animate-pulse border-red-500 bg-red-500/10" : "")}>
 <div className="absolute top-0 left-0 w-full h-1" style={{
            backgroundColor: t.color
          }} />
 <CardContent className="p-6">
 <div className="flex justify-between items-start mb-4">
 <div className="font-semibold text-lg">{t.label}</div>
 <Button onClick={() => removeTimer(t.id)} className="text-muted-foreground hover:text-foreground">
 <X className="w-4 h-4" />
 </Button>
 </div>
 
 <div className="text-4xl font-mono text-center mb-6" style={{
              color: t.state === "done" ? "#ef4444" : "inherit"
            }}>
 {formatTime(t.remainingSeconds)}
 </div>
 
 <div className="flex justify-center gap-2">
 {t.state === "running" ? <Button variant="outline" size="icon" onClick={() => updateTimerState(t.id, "paused")}>
 <Pause className="w-4 h-4" />
 </Button> : <Button variant="outline" size="icon" onClick={() => updateTimerState(t.id, "running")} disabled={t.state === "done"}>
 <Play className="w-4 h-4" />
 </Button>}
 <Button variant="outline" size="icon" onClick={() => updateTimerState(t.id, "stopped")}>
 <Square className="w-4 h-4" />
 </Button>
 {t.state === "done" && <Button variant="default" size="icon" onClick={() => updateTimerState(t.id, "stopped")}>
 <BellRing className="w-4 h-4" />
 </Button>}
 </div>
 </CardContent>
 </GlassCard>)}
 </div>
 </div>
 
      <ToolHowItWorks steps={[{
      step: "01",
      title: "Input Your Data",
      description: "Enter your information in the input field above and configure any options.",
      icon: Sparkles
    }, {
      step: "02",
      title: "Process & Generate",
      description: "The tool processes your input instantly and displays the results.",
      icon: Zap
    }, {
      step: "03",
      title: "Copy & Use",
      description: "Copy the output with one click and use it wherever you need.",
      icon: Copy
    }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
      icon: Sparkles,
      title: "Lightning Fast",
      description: "Get results in milliseconds with our optimized client-side processing engine."
    }, {
      icon: Shield,
      title: "Completely Private",
      description: "All processing happens in your browser. Your data never leaves your device."
    }, {
      icon: Zap,
      title: "No Signup Required",
      description: "Use this tool instantly without creating an account or providing any personal information."
    }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Cooking Timer?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Cooking Timer provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
      question: "Is this tool free to use?",
      answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
    }, {
      question: "Is my data secure?",
      answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
    }, {
      question: "Do I need to create an account?",
      answer: "No account or registration is required. Simply open the tool and start using it immediately."
    }]} />

      <RelatedTools currentToolUrl="/tools/time/cooking-timer" max={6} />

  </div>;
}