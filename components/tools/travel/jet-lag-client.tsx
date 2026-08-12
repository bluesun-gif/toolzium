"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { Plane, Clock, Sun, Moon, Bed } from"lucide-react";
import { cn } from"@/lib/utils";

const TIMEZONES = [
 { id:"UTC-10", name:"Hawaii (UTC-10)", offset: -10 },
 { id:"UTC-9", name:"Alaska (UTC-9)", offset: -9 },
 { id:"UTC-8", name:"Pacific Time (UTC-8)", offset: -8 },
 { id:"UTC-7", name:"Mountain Time (UTC-7)", offset: -7 },
 { id:"UTC-6", name:"Central Time (UTC-6)", offset: -6 },
 { id:"UTC-5", name:"Eastern Time (UTC-5)", offset: -5 },
 { id:"UTC-3", name:"Buenos Aires (UTC-3)", offset: -3 },
 { id:"UTC+0", name:"London (UTC+0)", offset: 0 },
 { id:"UTC+1", name:"Paris/Berlin (UTC+1)", offset: 1 },
 { id:"UTC+2", name:"Cairo/Athens (UTC+2)", offset: 2 },
 { id:"UTC+3", name:"Moscow/Istanbul (UTC+3)", offset: 3 },
 { id:"UTC+4", name:"Dubai (UTC+4)", offset: 4 },
 { id:"UTC+5.5", name:"India (UTC+5.5)", offset: 5.5 },
 { id:"UTC+7", name:"Bangkok (UTC+7)", offset: 7 },
 { id:"UTC+8", name:"Singapore/Beijing (UTC+8)", offset: 8 },
 { id:"UTC+9", name:"Tokyo/Seoul (UTC+9)", offset: 9 },
 { id:"UTC+10", name:"Sydney (UTC+10)", offset: 10 },
 { id:"UTC+12", name:"Auckland (UTC+12)", offset: 12 },
];

export function JetLagClient() {
 const [departureTz, setDepartureTz] = useState<string>("UTC-5");
 const [arrivalTz, setArrivalTz] = useState<string>("UTC+0");
 
 const [tzDiff, setTzDiff] = useState<number>(0);
 const [direction, setDirection] = useState<string>("none");
 const [severity, setSeverity] = useState<string>("none");
 const [recoveryDays, setRecoveryDays] = useState<number>(0);

 useEffect(() => {
 const dep = TIMEZONES.find(t => t.id === departureTz)?.offset ?? 0;
 const arr = TIMEZONES.find(t => t.id === arrivalTz)?.offset ?? 0;
 
 // Calculate difference (shortest path around the world)
 let rawDiff = arr - dep;
 
 // Normalize to -12 to +12
 if (rawDiff > 12) rawDiff -= 24;
 if (rawDiff < -12) rawDiff += 24;
 
 const absDiff = Math.abs(rawDiff);
 setTzDiff(absDiff);
 
 if (rawDiff > 0) {
 setDirection("east");
 } else if (rawDiff < 0) {
 setDirection("west");
 } else {
 setDirection("none");
 }
 
 setRecoveryDays(Math.ceil(absDiff / 1.5));
 
 if (absDiff === 0) setSeverity("None");
 else if (absDiff <= 3) setSeverity("Mild");
 else if (absDiff <= 6) setSeverity("Moderate");
 else setSeverity("Severe");
 
 }, [departureTz, arrivalTz]);

 const handleReset = () => {
 setDepartureTz("UTC-5");
 setArrivalTz("UTC+0");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Plane}
 title="Jet Lag Calculator"
 description="Estimate jet lag severity, timezone differences, and get personalized recovery tips based on your travel direction."
 actions={
 <ResetButton onClick={handleReset} label="Reset"/>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Plane className="w-5 h-5 text-primary"/>
 Travel Details
 </CardTitle>
 <CardDescription>Select your departure and arrival timezones</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Departure Timezone</Label>
 <Select value={departureTz} onValueChange={setDepartureTz}>
 <SelectTrigger>
 <SelectValue placeholder="Select departure"/>
 </SelectTrigger>
 <SelectContent>
 {TIMEZONES.map(tz => (
 <SelectItem key={tz.id} value={tz.id}>{tz.name}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Arrival Timezone</Label>
 <Select value={arrivalTz} onValueChange={setArrivalTz}>
 <SelectTrigger>
 <SelectValue placeholder="Select arrival"/>
 </SelectTrigger>
 <SelectContent>
 {TIMEZONES.map(tz => (
 <SelectItem key={tz.id} value={tz.id}>{tz.name}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 
 <Separator />
 
 <div className="grid grid-cols-2 gap-4 text-center">
 <div className="bg-muted p-4 rounded-lg">
 <p className="text-sm text-muted-foreground mb-1">Time Difference</p>
 <p className="text-2xl font-bold">{tzDiff} hours</p>
 </div>
 <div className="bg-muted p-4 rounded-lg">
 <p className="text-sm text-muted-foreground mb-1">Direction</p>
 <p className="text-2xl font-bold capitalize">{direction}</p>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Clock className="w-5 h-5 text-primary"/>
 Impact & Recovery
 </CardTitle>
 <CardDescription>Estimated severity and recovery time</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex gap-4">
 <div className="flex-1 bg-primary/10 p-4 rounded-lg border border-primary/20 text-center">
 <p className="text-sm font-medium text-muted-foreground mb-1">Severity</p>
 <h3 className={cn(
"text-xl font-bold",
 severity ==="None"?"text-green-500":
 severity ==="Mild"?"text-primary":
 severity ==="Moderate"?"text-orange-500":"text-destructive"
 )}>{severity}</h3>
 </div>
 <div className="flex-1 bg-primary/10 p-4 rounded-lg border border-primary/20 text-center">
 <p className="text-sm font-medium text-muted-foreground mb-1">Recovery Time</p>
 <h3 className="text-xl font-bold text-primary">{recoveryDays} {recoveryDays === 1 ? 'day' : 'days'}</h3>
 </div>
 </div>

 <div className="space-y-4">
 <h4 className="font-semibold flex items-center gap-2 border-b pb-2">
 <Bed className="w-4 h-4"/> Recovery Tips
 </h4>
 
 {tzDiff === 0 ? (
 <p className="text-muted-foreground text-sm">No significant timezone change. Jet lag is unlikely!</p>
 ) : (
 <ul className="space-y-3">
 <li className="flex items-start gap-3 text-sm">
 <Sun className="w-4 h-4 text-orange-500 mt-0.5 shrink-0"/>
 <div>
 <p className="font-medium">Light Exposure</p>
 <p className="text-muted-foreground">
 {direction === 'east' 
 ?"Seek morning light and avoid afternoon/evening light to advance your body clock."
 :"Seek evening light and avoid early morning light to delay your body clock."}
 </p>
 </div>
 </li>
 <li className="flex items-start gap-3 text-sm">
 <Moon className="w-4 h-4 text-primary mt-0.5 shrink-0"/>
 <div>
 <p className="font-medium">Sleep Schedule</p>
 <p className="text-muted-foreground">
 {direction === 'east'
 ?"Try to go to bed earlier a few days before your flight."
 :"Try to stay up a bit later a few days before your flight."}
 </p>
 </div>
 </li>
 <li className="flex items-start gap-3 text-sm">
 <Clock className="w-4 h-4 text-green-500 mt-0.5 shrink-0"/>
 <div>
 <p className="font-medium">Meals & Hydration</p>
 <p className="text-muted-foreground">
 Switch to destination meal times immediately. Stay hydrated during the flight and avoid excessive caffeine or alcohol.
 </p>
 </div>
 </li>
 </ul>
 )}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
