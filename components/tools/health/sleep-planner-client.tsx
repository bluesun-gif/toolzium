"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Moon, Sun, Clock, Sparkles } from"lucide-react";
import { ResetButton } from"@/components/shared/action-buttons";

export function SleepPlannerClient() {
 const [wakeTime, setWakeTime] = useState("07:00");
 const [mode, setMode] = useState<"wake"|"bed">("wake");

 const calculateTimes = () => {
 const cycleLength = 90; // minutes
 const sleepLatency = 15; // minutes to fall asleep
 const results = [];
 
 if (mode ==="wake") {
 const [hours, minutes] = wakeTime.split(":").map(Number);
 const wakeDate = new Date();
 wakeDate.setHours(hours, minutes, 0, 0);
 
 for (let cycles = 6; cycles >= 3; cycles--) {
 const bedTime = new Date(wakeDate.getTime() - (cycles * cycleLength + sleepLatency) * 60000);
 results.push({ cycles, time: bedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
 }
 } else {
 const bedDate = new Date();
 bedDate.setMinutes(bedDate.getMinutes() + sleepLatency);
 
 for (let cycles = 3; cycles <= 6; cycles++) {
 const wakeUpTime = new Date(bedDate.getTime() + (cycles * cycleLength) * 60000);
 results.push({ cycles, time: wakeUpTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
 }
 }
 return results;
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Moon}
 title="Sleep Cycle Calculator"
 description="Calculate optimal bedtimes based on 90-minute sleep cycles."
 actions={
 <React.Fragment>
 <ResetButton onClick={() => setWakeTime("07:00")} label="Reset"/>
 </React.Fragment>
 }
 />
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Calculation Mode</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex gap-4">
 <Button variant={mode ==="wake"?"default":"outline"} onClick={() => setMode("wake")}>I want to wake up at...</Button>
 <Button variant={mode ==="bed"?"default":"outline"} onClick={() => setMode("bed")}>I'm going to bed now</Button>
 </div>
 
 {mode ==="wake"&& (
 <div className="space-y-2">
 <Label>Wake up time</Label>
 <Input type="time"value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
 </div>
 )}
 
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>{mode ==="wake"?"Suggested Bedtimes":"Suggested Wake Times"}</CardTitle>
 <CardDescription>Includes 15 minutes to fall asleep</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid gap-3">
 {calculateTimes().map((result, i) => (
 <div key={i} className={"p-4 rounded-lg flex justify-between items-center"+ (i === 1 ?"bg-primary/10 border border-primary":"bg-muted")}>
 <div>
 <p className="font-semibold text-lg">{result.time}</p>
 <p className="text-sm text-muted-foreground">{result.cycles} cycles ({result.cycles * 1.5} hours)</p>
 </div>
 {i === 1 && <Sparkles className="h-5 w-5 text-primary"/>}
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
