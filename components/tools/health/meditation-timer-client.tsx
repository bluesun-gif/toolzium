"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { BarChart3, Brain, Heart, Pause, Play, PlayCircle, Square, Timer } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

export function MeditationTimerClient() {
  const [duration, setDuration] = useState<number>(5 * 60); // in seconds
  const [timeLeft, setTimeLeft] = useState<number>(5 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [customMinutes, setCustomMinutes] = useState<string>("");
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const audioCtxRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    const savedSessions = localStorage.getItem("meditation-sessions");
    if (savedSessions) {
      setSessionsCompleted(parseInt(savedSessions, 10));
    }
  }, []);
  const playTone = (frequency: number, durationMs: number) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + durationMs / 1000);
  };
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let breathingInterval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      breathingInterval = setInterval(() => {
        setBreathingPhase(prev => {
          if (prev === "inhale") return "hold";
          if (prev === "hold") return "exhale";
          return "inhale";
        });
      }, 4000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      playTone(432, 2000); // Gentle end bell
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);
      localStorage.setItem("meditation-sessions", newSessions.toString());
      toast.success("Meditation session completed!");
    }
    return () => {
      if (interval) clearInterval(interval);
      if (breathingInterval) clearInterval(breathingInterval);
    };
  }, [isActive, timeLeft, sessionsCompleted]);
  const toggleTimer = () => {
    if (!isActive && timeLeft === duration) {
      playTone(528, 2000); // Gentle start bell
    }
    setIsActive(!isActive);
  };
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration);
    setBreathingPhase("inhale");
  };
  const handlePreset = (minutes: number) => {
    const secs = minutes * 60;
    setDuration(secs);
    setTimeLeft(secs);
    setIsActive(false);
    setBreathingPhase("inhale");
  };
  const handleCustomDuration = () => {
    const mins = parseInt(customMinutes, 10);
    if (!isNaN(mins) && mins > 0) {
      handlePreset(mins);
      setCustomMinutes("");
    } else {
      toast.error("Please enter a valid number of minutes.");
    }
  };
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Timer} title="Meditation Timer" description="A calming timer with presets and a guided breathing animation." actions={<ActionButton icon={Heart} label={`Sessions: ${sessionsCompleted}`} variant="outline" onClick={() => {}} />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Timer</CardTitle>
 <CardDescription>Select a preset or set a custom time.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex flex-wrap gap-2">
 {[1, 3, 5, 10, 15, 20, 30].map(mins => <Button key={mins} variant={duration === mins * 60 ? "default" : "outline"} onClick={() => handlePreset(mins)} disabled={isActive}>
 {mins} min
 </Button>)}
 </div>
 
 <div className="flex gap-2 items-end">
 <div className="flex-1 space-y-2">
 <Label htmlFor="custom">Custom (minutes)</Label>
 <Input id="custom" type="number" min="1" value={customMinutes} onChange={e => setCustomMinutes(e.target.value)} disabled={isActive} />
 </div>
 <Button onClick={handleCustomDuration} disabled={isActive} variant="secondary">
 Set
 </Button>
 </div>

 <Separator />
 
 <div className="text-center">
 <div className="text-6xl font-light tabular-nums tracking-tighter my-8 text-primary">
 {formatTime(timeLeft)}
 </div>
 
 <div className="flex justify-center gap-4">
 <Button size="lg" onClick={toggleTimer} className={cn("rounded-full w-16 h-16 transition-all", isActive ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-600 hover:bg-emerald-700 text-primary-foreground")}>
 {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
 </Button>
 
 <Button size="lg" variant="outline" onClick={resetTimer} className="rounded-full w-16 h-16" disabled={timeLeft === duration && !isActive}>
 <Square className="w-6 h-6" />
 </Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Breathing Guide</CardTitle>
 <CardDescription>Follow the circle to regulate your breath.</CardDescription>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center h-[350px]">
 <div className="relative w-64 h-64 flex items-center justify-center">
 <div className={cn("absolute rounded-full bg-emerald-500/20 flex items-center justify-center transition-all duration-[4000ms] ease-in-out", !isActive ? "w-32 h-32 opacity-50" : breathingPhase === "inhale" ? "w-64 h-64 opacity-100" : breathingPhase === "hold" ? "w-64 h-64 opacity-80" : "w-32 h-32 opacity-40")}>
 <div className={cn("rounded-full bg-emerald-500/40 flex items-center justify-center transition-all duration-[4000ms] ease-in-out", !isActive ? "w-24 h-24" : breathingPhase === "inhale" ? "w-48 h-48" : breathingPhase === "hold" ? "w-48 h-48" : "w-24 h-24")}>
 <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg">
 <Heart className="w-8 h-8 text-primary-foreground" />
 </div>
 </div>
 </div>
 </div>
 
 <div className="mt-8 text-xl font-medium text-muted-foreground uppercase tracking-widest h-8 transition-opacity duration-500">
 {isActive ? breathingPhase : "Ready"}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Duration",
    description:"Choose session length.",
    icon: Timer,
  },
{
    step:"02",
    title:"Start",
    description:"Begin with optional interval bells.",
    icon: PlayCircle,
  },
{
    step:"03",
    title:"Track",
    description:"Log sessions over time.",
    icon: BarChart3,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Timer,
    title:"Flexible Length",
    description:"From minutes to an hour.",
  },
{
    icon: PlayCircle,
    title:"Interval Bells",
    description:"Gentle cues.",
  },
{
    icon: BarChart3,
    title:"Streak View",
    description:"See consistency.",
  },
{
    icon: Brain,
    title:"Mindfulness",
    description:"Supports calm.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A meditation timer structures a practice that is easy to skip without prompts. By setting a duration and optional interval bells, it removes friction from starting. This tool also logs sessions, turning sporadic attempts into a visible streak.</p>
  <p>Consistency beats length. Five minutes daily outperforms an occasional long sit for building calm and focus. The timer's streak view motivates showing up, which is the real goal. Interval bells gently mark progress without breaking concentration.</p>
  <p>Pair with any style — silence, breath, or guided. The tool's value is reducing the barrier to a habit with well-documented stress and focus benefits, making regularity achievable.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/health/meditation-timer" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"How long to meditate?",
    answer:"Even five minutes helps.",
  },
{
    question:"Daily or occasional?",
    answer:"Daily builds the habit.",
  },
{
    question:"Benefits?",
    answer:"Lower stress, better focus.",
  },
{
    question:"Need silence?",
    answer:"No, guided or quiet both work.",
  },
{
    question:"Track streaks?",
    answer:"Yes, consistency matters.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default MeditationTimerClient;
