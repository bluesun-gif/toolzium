"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { Timer, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import toast from "react-hot-toast";

type Mode = "focus" | "break";

export function FocusTimerClient() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<Mode>("focus");
  const [customMinutes, setCustomMinutes] = useState("25");
  const [ambientSound, setAmbientSound] = useState(false);
  
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      toast.success(mode === "focus" ? "Focus session complete! Take a break." : "Break over! Ready to focus?");
      if (mode === "focus") {
        setSessionsCompleted(s => {
          const newS = s + 1;
          localStorage.setItem("focusTimer_sessions", newS.toString());
          return newS;
        });
        const currentCustom = parseInt(customMinutes) || 25;
        setTotalFocusTime(t => {
          const newT = t + currentCustom;
          localStorage.setItem("focusTimer_total", newT.toString());
          return newT;
        });
        setMode("break");
        setTimeLeft(5 * 60); // 5 min break
      } else {
        setMode("focus");
        setTimeLeft((parseInt(customMinutes) || 25) * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, customMinutes]);

  useEffect(() => {
    const s = localStorage.getItem("focusTimer_sessions");
    const t = localStorage.getItem("focusTimer_total");
    if (s) setSessionsCompleted(parseInt(s));
    if (t) setTotalFocusTime(parseInt(t));
  }, []);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft((parseInt(customMinutes) || 25) * 60);
    setMode("focus");
  };

  const setPreset = (minutes: number) => {
    setIsActive(false);
    setCustomMinutes(minutes.toString());
    setTimeLeft(minutes * 60);
    setMode("focus");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Timer}
        title="Focus Timer"
        description="Distraction-free focus timer with customizable sessions"
        actions={<ResetButton onClick={() => { setSessionsCompleted(0); setTotalFocusTime(0); localStorage.removeItem("focusTimer_sessions"); localStorage.removeItem("focusTimer_total"); }} label="Reset Stats" />}
      />

      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle>{mode === "focus" ? "Focus Session" : "Break Time"}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className={cn("text-8xl font-bold font-mono tracking-tighter mb-8", mode === "break" ? "text-green-500" : "text-primary")}>
              {formatTime(timeLeft)}
            </div>
            
            <div className="flex gap-4 mb-8">
              <Button size="lg" className="w-32 h-14 text-lg" onClick={toggleTimer} variant={isActive ? "secondary" : "default"}>
                {isActive ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
                {isActive ? "Pause" : "Start"}
              </Button>
              <Button size="lg" variant="outline" className="h-14 w-14 p-0" onClick={resetTimer}>
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex items-center space-x-2 bg-muted/30 px-4 py-2 rounded-full">
              <Switch id="ambient" checked={ambientSound} onCheckedChange={setAmbientSound} />
              <Label htmlFor="ambient" className="flex items-center cursor-pointer">
                {ambientSound ? <Volume2 className="w-4 h-4 mr-2 text-muted-foreground" /> : <VolumeX className="w-4 h-4 mr-2 text-muted-foreground" />}
                Ambient Sound {ambientSound ? "On" : "Off"}
              </Label>
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Presets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setPreset(90)}>Deep Work (90 min)</Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setPreset(25)}>Pomodoro (25 min)</Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setPreset(15)}>Short Sprint (15 min)</Button>
              <div className="flex gap-2 pt-2">
                <Input type="number" value={customMinutes} onChange={(e) => setCustomMinutes(e.target.value)} placeholder="Min" />
                <Button variant="secondary" onClick={() => setPreset(parseInt(customMinutes) || 25)}>Set</Button>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Today's Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center bg-muted/30 p-3 rounded-lg">
                <span className="text-muted-foreground">Sessions</span>
                <span className="font-bold text-xl">{sessionsCompleted}</span>
              </div>
              <div className="flex justify-between items-center bg-muted/30 p-3 rounded-lg">
                <span className="text-muted-foreground">Focus Time</span>
                <span className="font-bold text-xl">{totalFocusTime} min</span>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
