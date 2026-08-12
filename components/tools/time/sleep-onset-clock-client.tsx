"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton } from"@/components/shared/action-buttons";
import { Clock, Moon, Sun, Shield } from"lucide-react";
export function SleepOnsetClockClient() {
 const [latency, setLatency] = useState("15");
 const [mode, setMode] = useState("wake");
 const [targetTime, setTargetTime] = useState("07:00");
 
 const cycleLength = 90; // minutes

 const formatTime = (date: Date) => {
 return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 };

 const calculateCycles = () => {
 const lat = parseInt(latency);
 const results = [];
 
 if (mode ==="wake") {
 const [hours, minutes] = targetTime.split(':').map(Number);
 const wakeDate = new Date();
 wakeDate.setHours(hours, minutes, 0, 0);

 for (const cycles of [6, 5, 4]) {
 const sleepDuration = cycles * cycleLength; // total minutes asleep
 const bedTime = new Date(wakeDate.getTime() - (sleepDuration + lat) * 60000);
 results.push({ cycles, time: formatTime(bedTime), isDebt: cycles < 5 });
 }
 } else {
 const bedDate = new Date(); // sleep now
 const fallAsleepDate = new Date(bedDate.getTime() + lat * 60000);

 for (const cycles of [6, 5, 4]) {
 const sleepDuration = cycles * cycleLength;
 const wakeTime = new Date(fallAsleepDate.getTime() + sleepDuration * 60000);
 results.push({ cycles, time: formatTime(wakeTime), isDebt: cycles < 5 });
 }
 }
 return results;
 };

 const cycleResults = calculateCycles();

 return (
 <div className={"space-y-6"}>
 <ToolPageHeader
 icon={Clock}
 title="Sleep Onset Latency & Bedtime Clock"
 description="Calculate optimal sleep schedules based on your REM cycles and sleep onset latency."
 actions={
 <ActionButton onClick={() => setMode(mode ==="wake"?"sleep":"wake")} icon={mode ==="wake"? Moon : Sun} label={mode ==="wake"?"Switch to Sleep Now":"Switch to Wake Target"} />
 }
 />

 <div className={"grid md:grid-cols-2 gap-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Configuration</CardTitle>
 <CardDescription>Adjust your sleep settings</CardDescription>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"space-y-2"}>
 <Label>Sleep Latency (Time to fall asleep)</Label>
 <Select value={latency} onValueChange={setLatency}>
 <SelectTrigger>
 <SelectValue placeholder="Select latency"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="5">5 Minutes</SelectItem>
 <SelectItem value="10">10 Minutes</SelectItem>
 <SelectItem value="15">15 Minutes (Average)</SelectItem>
 <SelectItem value="20">20 Minutes</SelectItem>
 <SelectItem value="30">30 Minutes</SelectItem>
 </SelectContent>
 </Select>
 </div>
 {mode ==="wake"&& (
 <div className={"space-y-2"}>
 <Label>Target Wake-up Time</Label>
 <Input type="time"value={targetTime} onChange={(e) => setTargetTime(e.target.value)} />
 </div>
 )}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>{mode ==="wake"?"Optimal Bedtimes":"Optimal Wake-up Times"}</CardTitle>
 <CardDescription>
 {mode ==="wake"
 ?"To wake up at"+ targetTime +", try to be in bed by:"
 :"If you go to bed right now, set your alarm for:"}
 </CardDescription>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"grid gap-4"}>
 {cycleResults.map((result, idx) => (
 <div key={idx} className={"flex items-center justify-between p-4 rounded-lg border bg-card"}>
 <div>
 <div className={"text-2xl font-bold text-primary"}>{result.time}</div>
 <div className={"text-sm text-muted-foreground"}>{result.cycles} Cycles ({result.cycles * 1.5} Hours)</div>
 </div>
 {result.isDebt && (
 <div className={"flex items-center gap-1 text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded-md"}>
 <Shield className={"h-3 w-3"} /> Sleep Debt Warning
 </div>
 )}
 {!result.isDebt && (
 <div className={"flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md"}>
 Ideal
 </div>
 )}
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
