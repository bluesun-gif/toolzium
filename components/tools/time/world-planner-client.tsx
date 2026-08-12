"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Globe, Clock, Calendar, Copy, Plus, X } from"lucide-react";
import toast from"react-hot-toast";

type City = {
 name: string;
 offset: number; // offset in hours from UTC
};

const COMMON_CITIES: City[] = [
 { name:"UTC", offset: 0 },
 { name:"London", offset: 1 }, // approximation for demo
 { name:"New York", offset: -4 },
 { name:"San Francisco", offset: -7 },
 { name:"Tokyo", offset: 9 },
 { name:"Sydney", offset: 10 },
 { name:"Delhi", offset: 5.5 },
];

export function WorldPlannerClient() {
 const [cities, setCities] = useState<City[]>([{ name:"UTC", offset: 0 }]);
 const [selectedHourUtc, setSelectedHourUtc] = useState<number>(12); // 0-23
 const [newCityName, setNewCityName] = useState("");
 const [newCityOffset, setNewCityOffset] = useState("0");

 const addCity = () => {
 if (cities.length >= 6) {
 toast.error("Maximum 6 cities allowed");
 return;
 }
 if (!newCityName) return;
 setCities([...cities, { name: newCityName, offset: parseFloat(newCityOffset) }]);
 setNewCityName("");
 };

 const removeCity = (index: number) => {
 setCities(cities.filter((_, i) => i !== index));
 };

 const getLocalHour = (utcHour: number, offset: number) => {
 let h = (utcHour + offset) % 24;
 if (h < 0) h += 24;
 return Math.floor(h);
 };

 const getHourColor = (hour: number) => {
 if (hour >= 9 && hour < 17) return"bg-green-500"; // Working hours
 if ((hour >= 17 && hour < 22) || (hour >= 7 && hour < 9)) return"bg-yellow-500"; // Evening/Morning
 return"bg-red-500"; // Night
 };

 const formatHour = (hour: number) => {
 const ampm = hour >= 12 ? 'PM' : 'AM';
 let h = hour % 12;
 if (h === 0) h = 12;
 return h + ampm;
 };

 const getCopyText = () => {
 let text ="Proposed Meeting Times:\n";
 cities.forEach(city => {
 const lh = getLocalHour(selectedHourUtc, city.offset);
 text += city.name +":"+ formatHour(lh) +"\n";
 });
 return text;
 };

 const resetAll = () => {
 setCities([{ name:"UTC", offset: 0 }]);
 setSelectedHourUtc(12);
 toast.success("Reset to default");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Globe}
 title="World Clock & Meeting Planner"
 description="Compare times across multiple world cities to find ideal meeting slots."
 actions={
 <React.Fragment>
 <CopyButton getText={getCopyText} label="Copy Proposal"/>
 <ResetButton onClick={resetAll} label="Reset"/>
 </React.Fragment>
 }
 />
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Manage Cities (Max 6)</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex flex-wrap gap-4 items-end">
 <div className="space-y-1">
 <label className="text-sm font-medium">City Name</label>
 <Input value={newCityName} onChange={(e) => setNewCityName(e.target.value)} placeholder="e.g. Paris"className="w-40"/>
 </div>
 <div className="space-y-1">
 <label className="text-sm font-medium">UTC Offset (hours)</label>
 <Input type="number"step="0.5"value={newCityOffset} onChange={(e) => setNewCityOffset(e.target.value)} className="w-32"/>
 </div>
 <Button onClick={addCity}><Plus className="w-4 h-4 mr-2"/> Add</Button>
 </div>
 <div className="flex flex-wrap gap-2 pt-2">
 {COMMON_CITIES.map(c => (
 <Button key={c.name} variant="outline"size="sm"onClick={() => {
 if (cities.length < 6) setCities([...cities, c]);
 }}>
 + {c.name} ({c.offset > 0 ?"+":""}{c.offset})
 </Button>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Timeline</CardTitle>
 <p className="text-sm text-muted-foreground">Select an hour block to see local times. Green = Working Hours (9-5), Yellow = Morning/Evening, Red = Night</p>
 </CardHeader>
 <CardContent className="space-y-8 overflow-x-auto">
 {cities.map((city, idx) => (
 <div key={idx} className="min-w-[600px]">
 <div className="flex justify-between items-center mb-2">
 <span className="font-semibold w-32 flex items-center gap-2">
 {city.name}
 <button onClick={() => removeCity(idx)} className="text-muted-foreground hover:text-destructive">
 <X className="w-3 h-3"/>
 </button>
 </span>
 <span className="text-sm font-medium bg-secondary px-2 py-1 rounded">
 {formatHour(getLocalHour(selectedHourUtc, city.offset))}
 </span>
 </div>
 <div className="flex h-10 w-full border rounded-md overflow-hidden bg-muted relative">
 {Array.from({ length: 24 }).map((_, i) => {
 const localH = getLocalHour(i, city.offset);
 const isSelected = i === selectedHourUtc;
 return (
 <div 
 key={i} 
 onClick={() => setSelectedHourUtc(i)}
 className={"flex-1 cursor-pointer border-r border-background/20 relative group"+ getHourColor(localH) + (isSelected ?"ring-2 ring-primary ring-inset z-10 opacity-100":"opacity-70 hover:opacity-90")}
 >
 <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/90 font-medium">
 {localH}
 </div>
 </div>
 );
 })}
 </div>
 </div>
 ))}
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Selected Time Summary</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
 {cities.map((city, idx) => (
 <div key={idx} className="p-4 rounded-lg bg-secondary text-center space-y-1">
 <p className="font-medium text-sm text-muted-foreground">{city.name}</p>
 <p className="text-xl font-bold">{formatHour(getLocalHour(selectedHourUtc, city.offset))}</p>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 );
}
