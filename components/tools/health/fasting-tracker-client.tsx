"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Flame, Clock, Play, History, Square } from "lucide-react";
import toast from "react-hot-toast";

type Protocol = "16:8" | "18:6" | "20:4" | "24" | "36";

export function FastingTrackerClient() {
  const [protocol, setProtocol] = useState<Protocol>("16:8");
  const [isFasting, setIsFasting] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedHours, setElapsedHours] = useState(0);

  const getTargetHours = (p: Protocol) => {
    switch (p) {
      case "16:8": return 16;
      case "18:6": return 18;
      case "20:4": return 20;
      case "24": return 24;
      case "36": return 36;
      default: return 16;
    }
  };

  useEffect(() => {
    let interval: any;
    if (isFasting && startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const diffHrs = (now - startTime) / (1000 * 60 * 60);
        setElapsedHours(diffHrs);
      }, 60000); // update every min
    }
    return () => clearInterval(interval);
  }, [isFasting, startTime]);

  const toggleFasting = () => {
    if (isFasting) {
      setIsFasting(false);
      toast.success("Fasting completed!");
    } else {
      setIsFasting(true);
      setStartTime(Date.now());
      setElapsedHours(0);
      toast.success("Fasting started!");
    }
  };

  const resetTimer = () => {
    setIsFasting(false);
    setStartTime(null);
    setElapsedHours(0);
    toast.success("Reset successful");
  };

  const getFastingState = (hours: number) => {
    if (hours < 12) return "Anabolic (Fed state)";
    if (hours < 14) return "Catabolic (Early fasting)";
    if (hours < 16) return "Fat Burning (Ketosis begins)";
    if (hours < 24) return "Ketosis (Deep fat burning)";
    return "Autophagy (Cellular repair)";
  };

  const targetHours = getTargetHours(protocol);
  const progressPercent = Math.min(100, (elapsedHours / targetHours) * 100);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Flame}
        title="Intermittent Fasting Tracker"
        description="Track your fasts, monitor your bodily states, and view history."
        actions={
          <React.Fragment>
            <ResetButton onClick={resetTimer} label="Reset" />
          </React.Fragment>
        }
      />
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-2 text-left">
              <Label>Fasting Protocol</Label>
              <Select value={protocol} onValueChange={(v) => setProtocol(v as Protocol)} disabled={isFasting}>
                <SelectTrigger>
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:8">16:8 (16h fast, 8h feed)</SelectItem>
                  <SelectItem value="18:6">18:6 (18h fast, 6h feed)</SelectItem>
                  <SelectItem value="20:4">20:4 (Warrior Diet)</SelectItem>
                  <SelectItem value="24">24h (Monk Fast)</SelectItem>
                  <SelectItem value="36">36h (Extended)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className={"w-48 h-48 mx-auto rounded-full border-8 flex items-center justify-center " + (progressPercent >= 100 ? "border-green-500" : "border-blue-500")}>
              <div className="text-center">
                <div className="text-4xl font-bold">{elapsedHours.toFixed(2)}h</div>
                <div className="text-sm text-muted-foreground">of {targetHours}h</div>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={toggleFasting} variant={isFasting ? "destructive" : "default"}>
              {isFasting ? <Square className="mr-2 w-4 h-4" /> : <Play className="mr-2 w-4 h-4" />}
              {isFasting ? "Stop Fasting" : "Start Fasting"}
            </Button>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Status & Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Current State</h3>
              <p className="text-muted-foreground">{getFastingState(elapsedHours)}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg">Summary</h3>
              <p>Target Goal: {targetHours} hours</p>
              <p>Progress: {progressPercent.toFixed(1)}%</p>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
