"use client";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Slider } from"@/components/ui/slider";
import { Clock, Globe, Plus, Trash2 } from"lucide-react";

const TIMEZONES = [
 { value:"UTC", label:"UTC"},
 { value:"America/New_York", label:"New York (EST/EDT)"},
 { value:"America/Los_Angeles", label:"Los Angeles (PST/PDT)"},
 { value:"Europe/London", label:"London (GMT/BST)"},
 { value:"Europe/Paris", label:"Paris (CET/CEST)"},
 { value:"Asia/Tokyo", label:"Tokyo (JST)"},
 { value:"Asia/Kolkata", label:"India (IST)"},
 { value:"Australia/Sydney", label:"Sydney (AEST/AEDT)"},
];

export function TimezoneCompareClient() {
 const [zones, setZones] = useState<string[]>(["UTC","America/New_York"]);
 const [selectedZone, setSelectedZone] = useState(TIMEZONES[0].value);
 const [baseTimeOffset, setBaseTimeOffset] = useState(0); // 0 to 24 hours in minutes
 
 useEffect(() => { setMounted(true); }, []);

 const addZone = () => {
 if (zones.length >= 8) return;
 if (!zones.includes(selectedZone)) {
 setZones([...zones, selectedZone]);
 }
 };

 const removeZone = (zone: string) => {
 if (zones.length > 1) {
 setZones(zones.filter(z => z !== zone));
 }
 };

 const getZoneTime = (zone: string) => { const date = new Date();
 date.setHours(0, 0, 0, 0);
 date.setMinutes(baseTimeOffset);

 const formatter = new Intl.DateTimeFormat("en-US", {
 timeZone: zone,
 hour:"2-digit",
 minute:"2-digit",
 hour12: true,
 });
 
 const parts = formatter.formatToParts(date);
 const timeStr = formatter.format(date);
 
 const hourPart = parseInt(parts.find(p => p.type ==="hour")?.value ||"0");
 const dayPeriod = parts.find(p => p.type ==="dayPeriod")?.value ||"";
 
 let hour24 = hourPart;
 if (dayPeriod.toLowerCase() ==="pm"&& hour24 < 12) hour24 += 12;
 if (dayPeriod.toLowerCase() ==="am"&& hour24 === 12) hour24 = 0;

 const isBusiness = hour24 >= 9 && hour24 < 17;
 const isDark = hour24 >= 22 || hour24 < 6;

 return { text: timeStr, isBusiness, isDark, hour24 };
 };
 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Globe}
 title="Time Zone Comparison"
 description="Compare time across multiple time zones side by side."
 actions={
 <>
 <CopyButton getText={() => zones.map(z => `${z}: ${getZoneTime(z).text}`).join("\n")} label="Copy Times"/>
 <ResetButton onClick={() => { setZones(["UTC","America/New_York"]); setBaseTimeOffset(0); }} label="Reset"/>
 </>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Add Time Zone</CardTitle>
 </CardHeader>
 <CardContent className="flex gap-4 items-center">
 <Select value={selectedZone} onValueChange={setSelectedZone}>
 <SelectTrigger className="w-[300px]"><SelectValue /></SelectTrigger>
 <SelectContent>
 {TIMEZONES.map(tz => <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>)}
 </SelectContent>
 </Select>
 <Button onClick={addZone} disabled={zones.length >= 8}><Plus className="w-4 h-4 mr-2"/> Add</Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Base Time Selector</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <Slider
 value={[baseTimeOffset]}
 min={0}
 max={24 * 60 - 15}
 step={15}
 onValueChange={(vals) => setBaseTimeOffset(vals[0])}
 />
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 {zones.map(zone => {
 const { text, isBusiness, isDark } = getZoneTime(zone);
 const label = TIMEZONES.find(t => t.value === zone)?.label || zone;
 let bgClass ="bg-muted/50";
 if (isBusiness) bgClass ="bg-green-500/20 border-green-500/50";
 else if (isDark) bgClass ="bg-muted/50 text-slate-200 border-border/50";

 return (
 <div key={zone} className={"p-4 rounded-xl border relative flex flex-col items-center justify-center space-y-2"+ (bgClass)}>
 <button 
 onClick={() => removeZone(zone)}
 className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
 >
 <Trash2 className="w-4 h-4"/>
 </button>
 <span className="text-sm font-medium text-center">{label}</span>
 <span className="text-3xl font-bold">{text}</span>
 </div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 );
}
