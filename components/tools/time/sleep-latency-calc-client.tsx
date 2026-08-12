"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { Moon, Clock, Shield } from"lucide-react";

export function SleepLatencyClient() {
 const [time, setTime] = useState("07:00");
 const [mode, setMode] = useState("wake"); // wake or sleep

 const calculateTimes = () => {
 const [hours, minutes] = time.split(":").map(Number);
 const date = new Date();
 date.setHours(hours, minutes, 0, 0);

 const sleepLatencyMs = 15 * 60 * 1000;
 const cycleMs = 90 * 60 * 1000;

 const formatTime = (d: Date) => {
 return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 };

 const results = [];
 if (mode ==="wake") {
 // Calculate bedtime (subtract cycles + latency)
 for (let cycles = 6; cycles >= 4; cycles--) {
 const bedTime = new Date(date.getTime() - (cycles * cycleMs) - sleepLatencyMs);
 results.push({
 cycles,
 hours: (cycles * 90) / 60,
 time: formatTime(bedTime),
 });
 }
 } else {
 // Calculate wake time (add latency + cycles)
 for (let cycles = 4; cycles <= 6; cycles++) {
 const wakeTime = new Date(date.getTime() + sleepLatencyMs + (cycles * cycleMs));
 results.push({
 cycles,
 hours: (cycles * 90) / 60,
 time: formatTime(wakeTime),
 });
 }
 }
 return results;
 };

 const times = calculateTimes();

 return (
 <div className="space-y-6">
 <ToolPageHeader
 title="Sleep Latency & Sleep Onset Calculator"
 description="Calculate optimal bedtimes based on sleep latency and 90-minute REM sleep cycles."
 icon={Moon}
 actions={
 <>
 <ResetButton onClick={() => { setTime("07:00"); setMode("wake"); }} label="Reset"/>
 </>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5"/> Target Time</CardTitle>
 <CardDescription>Enter your target time to get optimal {mode ==="wake"?"bedtimes":"wake times"}.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>I want to calculate my:</Label>
 <Select value={mode} onValueChange={setMode}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="wake">Bedtime (I know when I need to wake up)</SelectItem>
 <SelectItem value="sleep">Wake time (I am going to bed at)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Time</Label>
 <Input type="time"value={time} onChange={(e) => setTime(e.target.value)} />
 </div>
 
 <div className="p-4 bg-muted/50 rounded-lg border mt-4">
 <p className="text-sm">
 <strong>Diagnostic Note:</strong> This calculator assumes an average <strong>sleep latency of 15 minutes</strong> (the time it takes to fall asleep). Sleep cycles last approximately 90 minutes.
 </p>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Optimal {mode ==="wake"?"Bedtimes":"Wake Times"}</CardTitle>
 <CardDescription>Based on full 90-minute sleep cycles + 15 min to fall asleep</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {times.map((t, idx) => (
 <div key={idx} className={"p-4 rounded-lg border flex justify-between items-center"+ (idx === 1 ?"bg-primary/10 border-primary/20":"")}>
 <div>
 <div className="font-bold text-2xl">{t.time}</div>
 <div className="text-sm text-muted-foreground">{t.cycles} sleep cycles</div>
 </div>
 <div className="text-right">
 <div className={"font-semibold"+ (idx === 1 ?"text-primary":"")}>{t.hours} hours sleep</div>
 <div className="text-xs text-muted-foreground">{idx === 1 ?"Recommended":"Good"}</div>
 </div>
 </div>
 ))}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
