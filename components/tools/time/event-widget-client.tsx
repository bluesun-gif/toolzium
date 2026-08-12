"use client";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calendar } from"lucide-react";

export function EventWidgetClient() {
 const [eventName, setEventName] = useState("My Awesome Event");
 const [targetDate, setTargetDate] = useState("");
 const [theme, setTheme] = useState("dark");
 const [glow, setGlow] = useState("blue");
 
 const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

 useEffect(() => {
 // Set default date to tomorrow
 const tomorrow = new Date();
 tomorrow.setDate(tomorrow.getDate() + 1);
 tomorrow.setHours(12, 0, 0, 0);
 // Format to YYYY-MM-DDTHH:MM for datetime-local input
 const formatted = new Date(tomorrow.getTime() - (tomorrow.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
 setTargetDate(formatted);
 }, []);

 useEffect(() => {
 if (!targetDate) return;

 const interval = setInterval(() => {
 const targetTime = new Date(targetDate).getTime();
 const now = new Date().getTime();
 const diff = targetTime - now;

 if (diff <= 0) {
 setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
 clearInterval(interval);
 } else {
 setTimeLeft({
 days: Math.floor(diff / (1000 * 60 * 60 * 24)),
 hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
 minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
 seconds: Math.floor((diff % (1000 * 60)) / 1000)
 });
 }
 }, 1000);

 return () => clearInterval(interval);
 }, [targetDate]);

 const resetForm = () => {
 setEventName("My Awesome Event");
 const tomorrow = new Date();
 tomorrow.setDate(tomorrow.getDate() + 1);
 tomorrow.setHours(12, 0, 0, 0);
 setTargetDate(new Date(tomorrow.getTime() - (tomorrow.getTimezoneOffset() * 60000)).toISOString().slice(0, 16));
 setTheme("dark");
 setGlow("blue");
 };

 const widgetStyles = {
 dark:"bg-[#0f172a] text-[#f8fafc] text-white",
 light:"bg-slate-100 text-foreground",
 blue:"bg-blue-900 text-white",
 purple:"bg-purple-900 text-white"
 };

 const glowStyles = {
 none:"",
 blue:"shadow-[0_0_15px_rgba(59,130,246,0.5)] border-blue-500",
 purple:"shadow-[0_0_15px_rgba(168,85,247,0.5)] border-primary/50",
 green:"shadow-[0_0_15px_rgba(34,197,94,0.5)] border-green-500"
 };

 const currentThemeStyle = widgetStyles[theme as keyof typeof widgetStyles];
 const currentGlowStyle = glowStyles[glow as keyof typeof glowStyles];

 const getEmbedCode = () => {
 // In a real app this would point to a specialized embed route, here we just show a conceptual iframe
 const widgetUrl ="https://toolzium.com/embed/countdown?name="+ encodeURIComponent(eventName) +"&date="+ encodeURIComponent(targetDate) +"&theme="+ theme +"&glow="+ glow;
 return"<iframe src=\""+ widgetUrl +"\"width=\"400\"height=\"200\"style=\"border:none;border-radius:12px;\"></iframe>";
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Calendar}
 title="Event Countdown Widget Creator"
 description="Design a custom countdown timer for your next big event."
 actions={
 <>
 <ResetButton onClick={resetForm} label="Reset"/>
 </>
 }
 />

 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Widget Configuration</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Event Name</Label>
 <Input value={eventName} onChange={e => setEventName(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Target Date & Time</Label>
 <Input type="datetime-local"value={targetDate} onChange={e => setTargetDate(e.target.value)} />
 </div>
 
 <div className={"grid grid-cols-2 gap-4"}>
 <div className="space-y-2">
 <Label>Theme Color</Label>
 <Select value={theme} onValueChange={setTheme}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="dark">Dark</SelectItem>
 <SelectItem value="light">Light</SelectItem>
 <SelectItem value="blue">Blue</SelectItem>
 <SelectItem value="purple">Purple</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Border Glow</Label>
 <Select value={glow} onValueChange={setGlow}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="none">None</SelectItem>
 <SelectItem value="blue">Blue Glow</SelectItem>
 <SelectItem value="purple">Purple Glow</SelectItem>
 <SelectItem value="green">Green Glow</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Widget Preview</CardTitle>
 <CardDescription>How your widget will look</CardDescription>
 </CardHeader>
 <CardContent className={"flex justify-center items-center p-8"}>
 
 <div className={"w-full max-w-sm rounded-xl p-6 border-2 transition-all duration-300"+ currentThemeStyle +""+ currentGlowStyle}>
 <h3 className={"text-xl font-bold text-center mb-6"}>{eventName ||"Event Name"}</h3>
 <div className={"flex justify-between text-center"}>
 <div className={"flex flex-col"}>
 <span className={"text-3xl font-bold font-mono"}>{timeLeft.days}</span>
 <span className={"text-xs uppercase opacity-80 mt-1"}>Days</span>
 </div>
 <span className={"text-3xl font-bold opacity-50"}>:</span>
 <div className={"flex flex-col"}>
 <span className={"text-3xl font-bold font-mono"}>{timeLeft.hours.toString().padStart(2, '0')}</span>
 <span className={"text-xs uppercase opacity-80 mt-1"}>Hours</span>
 </div>
 <span className={"text-3xl font-bold opacity-50"}>:</span>
 <div className={"flex flex-col"}>
 <span className={"text-3xl font-bold font-mono"}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
 <span className={"text-xs uppercase opacity-80 mt-1"}>Mins</span>
 </div>
 <span className={"text-3xl font-bold opacity-50"}>:</span>
 <div className={"flex flex-col"}>
 <span className={"text-3xl font-bold font-mono"}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
 <span className={"text-xs uppercase opacity-80 mt-1"}>Secs</span>
 </div>
 </div>
 </div>

 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Embed Snippet</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className={"p-4 bg-muted rounded-md font-mono text-sm break-all"}>
 {getEmbedCode()}
 </div>
 <CopyButton getText={getEmbedCode} label="Copy Embed Code"/>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 </div>
 );
}
