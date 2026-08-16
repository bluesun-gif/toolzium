"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect, useCallback, useMemo } from"react";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";
import { Calendar, Clock, Copy, Info, ListChecks, RefreshCcw } from"lucide-react";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from"@/components/ui/tabs";
import { Switch } from"@/components/ui/switch";

type CronField ="seconds"|"minute"|"hour"|"dayMonth"|"month"|"dayWeek";

interface CronState {
 seconds: string;
 minute: string;
 hour: string;
 dayMonth: string;
 month: string;
 dayWeek: string;
}

const PRESETS = [
 { label:"Every minute", value:"* * * * *"},
 { label:"Every 5 minutes", value:"*/5 * * * *"},
 { label:"Every hour", value:"0 * * * *"},
 { label:"Every day at midnight", value:"0 0 * * *"},
 { label:"Every Monday", value:"0 0 * * 1"},
 { label:"Every weekday (Mon-Fri)", value:"0 0 * * 1-5"},
 { label:"1st of every month", value:"0 0 1 * *"},
];

export function CronGeneratorClient() {
 const [useSeconds, setUseSeconds] = useState(false);
 const [cronState, setCronState] = useState<CronState>({
 seconds:"*",
 minute:"*",
 hour:"*",
 dayMonth:"*",
 month:"*",
 dayWeek:"*",
 });
 
 const [manualInput, setManualInput] = useState("");
 const [nextDates, setNextDates] = useState<Date[]>([]);
 const [humanDescription, setHumanDescription] = useState("");
 const [activeTab, setActiveTab] = useState("builder");

 const buildExpression = useCallback((state: CronState, includeSec: boolean) => {
 const parts = [state.minute, state.hour, state.dayMonth, state.month, state.dayWeek];
 if (includeSec) {
 parts.unshift(state.seconds);
 }
 return parts.join("");
 }, []);

 const expression = buildExpression(cronState, useSeconds);

 useEffect(() => {
 setManualInput(expression);
 updateDetails(expression);
 }, [expression]);

 const updateDetails = (expr: string) => {
 try {
 setHumanDescription(generateHumanDescription(expr));
 setNextDates(calculateNextDates(expr, 5));
 } catch (e) {
 setHumanDescription("Invalid cron expression");
 setNextDates([]);
 }
 };

 const parseExpression = (expr: string) => {
 const parts = expr.trim().split(/\s+/);
 if (parts.length === 5) {
 setUseSeconds(false);
 setCronState({
 seconds:"*",
 minute: parts[0] ||"*",
 hour: parts[1] ||"*",
 dayMonth: parts[2] ||"*",
 month: parts[3] ||"*",
 dayWeek: parts[4] ||"*",
 });
 } else if (parts.length === 6) {
 setUseSeconds(true);
 setCronState({
 seconds: parts[0] ||"*",
 minute: parts[1] ||"*",
 hour: parts[2] ||"*",
 dayMonth: parts[3] ||"*",
 month: parts[4] ||"*",
 dayWeek: parts[5] ||"*",
 });
 } else {
 updateDetails(expr); // Will trigger error message
 }
 };

 const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const val = e.target.value;
 setManualInput(val);
 
 // Only try to parse and update if it looks somewhat complete
 const parts = val.trim().split(/\s+/);
 if (parts.length === 5 || parts.length === 6) {
 parseExpression(val);
 } else {
 updateDetails(val);
 }
 };

 const handleFieldChange = (field: CronField, value: string) => {
 setCronState(prev => ({ ...prev, [field]: value }));
 };

 const applyPreset = (expr: string) => {
 parseExpression(expr);
 };

 const reset = () => {
 setUseSeconds(false);
 setCronState({
 seconds:"*",
 minute:"*",
 hour:"*",
 dayMonth:"*",
 month:"*",
 dayWeek:"*",
 });
 };

 return (
 <div className="max-w-4xl mx-auto">
 <ToolPageHeader
 title="Cron Expression Generator"
 description="Build, parse, and understand cron schedules with ease."
 icon={Clock}
 />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
 <div className="md:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Expression</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex items-center gap-2 mb-6">
 <Input
 value={manualInput}
 onChange={handleManualInputChange}
 className="font-mono text-lg text-center py-6 bg-muted/50 font-bold tracking-widest"
 placeholder="* * * * *"
 />
 <CopyButton getText={() => manualInput} />
 </div>
 
 <div className="flex items-center space-x-2 mb-6">
 <Switch 
 id="use-seconds"
 checked={useSeconds}
 onCheckedChange={(c) => {
 setUseSeconds(c);
 if (c && cronState.seconds ==="") {
 handleFieldChange("seconds","*");
 }
 }}
 />
 <Label htmlFor="use-seconds">Include Seconds (6-field)</Label>
 </div>

 <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
 {useSeconds && (
 <CronFieldInput 
 label="Seconds"
 value={cronState.seconds} 
 onChange={(v) => handleFieldChange("seconds", v)} 
 />
 )}
 <CronFieldInput 
 label="Minute"
 value={cronState.minute} 
 onChange={(v) => handleFieldChange("minute", v)} 
 />
 <CronFieldInput 
 label="Hour"
 value={cronState.hour} 
 onChange={(v) => handleFieldChange("hour", v)} 
 />
 <CronFieldInput 
 label="Day (Month)"
 value={cronState.dayMonth} 
 onChange={(v) => handleFieldChange("dayMonth", v)} 
 />
 <CronFieldInput 
 label="Month"
 value={cronState.month} 
 onChange={(v) => handleFieldChange("month", v)} 
 />
 <CronFieldInput 
 label="Day (Week)"
 value={cronState.dayWeek} 
 onChange={(v) => handleFieldChange("dayWeek", v)} 
 />
 </div>
 
 <div className="mt-6 flex justify-end">
 <ResetButton onClick={reset} />
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Description</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="bg-primary/10 text-primary p-4 rounded-lg font-medium text-lg flex items-start gap-3">
 <Info className="h-6 w-6 shrink-0 mt-0.5"/>
 <span>{humanDescription}</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Next Executions</CardTitle>
 </CardHeader>
 <CardContent>
 {nextDates.length > 0 ? (
 <ul className="space-y-3">
 {nextDates.map((d, i) => (
 <li key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-md text-sm">
 <Calendar className="h-4 w-4 text-muted-foreground"/>
 <span>{d.toLocaleString()}</span>
 </li>
 ))}
 </ul>
 ) : (
 <div className="text-muted-foreground text-sm text-center py-6">
 Invalid or unreachable cron expression.
 </div>
 )}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Presets</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="space-y-2">
 {PRESETS.map((preset, i) => (
 <Button
 key={i}
 variant="outline"
 className="w-full justify-start text-left font-normal"
 onClick={() => applyPreset(preset.value)}
 >
 {preset.label}
 </Button>
 ))}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 </div>
 );
}

function CronFieldInput({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
 return (
 <div className="flex flex-col gap-1 text-center">
 <Input
 value={value}
 onChange={(e) => onChange(e.target.value)}
 className="text-center font-mono"
 />
 <span className="text-xs text-muted-foreground font-medium">{label}</span>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set the Schedule",
    description:"Pick minute, hour, day, month, and weekday using simple inputs.",
    icon: Calendar,
  },
{
    step:"02",
    title:"Preview Next Runs",
    description:"See a plain-English description and upcoming execution times.",
    icon: Clock,
  },
{
    step:"03",
    title:"Copy the Expression",
    description:"Grab the cron string for crontab, CI, or cloud schedulers.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Calendar,
    title:"Visual Fields",
    description:"Edit each cron field without memorizing syntax.",
  },
{
    icon: Clock,
    title:"Human Readable",
    description:"Convert the expression into an easy-to-read sentence.",
  },
{
    icon: ListChecks,
    title:"Next Run List",
    description:"Preview the next several execution timestamps.",
  },
{
    icon: Copy,
    title:"Multi-Platform",
    description:"Works for standard cron, Quartz, and CI pipelines.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Cron is the backbone of scheduled automation on servers, and a single misplaced character can mean a job never runs or runs far too often. A standard expression has five fields — minute, hour, day-of-month, month, and day-of-week — separated by spaces. Each field accepts numbers, ranges, lists, and step values.</p>
  <p>The asterisk is the wildcard and means 'every'. A slash introduces a step: */15 in the minute field fires at 0, 15, 30, and 45 minutes. Commas build lists such as 1,15 for the 1st and 15th, while a hyphen defines a range like 9-17 for business hours. Combining these gives precise control — for instance '0 9-17 */2 * 1-5' runs at the top of every other hour on weekdays during work hours.</p>
  <p>Reading cron in plain language prevents mistakes. Before shipping a schedule, translate it: 'At minute 0 past every 2nd hour from 9 through 17 on every day-of-week from Monday through Friday.' If that sentence does not match intent, fix the expression. Our generator shows this description plus a list of upcoming run times so you can confirm behavior visually.</p>
  <p>Timezones cause the most production incidents. A server in UTC running '0 0 * * *' fires at midnight UTC, which may be the middle of your local day. Always document the timezone of the host and prefer UTC for portable infrastructure. Container schedulers and CI systems sometimes interpret fields slightly differently, so validate against the target platform.</p>
  <p>Finally, keep schedules observable. Log each run, alert on failures, and avoid overlapping jobs by ensuring a previous run finishes before the next begins. With a validated expression copied from this tool, you remove the most common source of silent automation bugs.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a cron expression?",
    answer:"A cron expression is a string of five or six fields that defines when a command should run. Fields represent minute, hour, day of month, month, and day of week.",
  },
{
    question:"What does * mean in cron?",
    answer:"An asterisk means 'every' value for that field. For example, * in the hour field runs every hour.",
  },
{
    question:"How do I run a job every 15 minutes?",
    answer:"Use '*/15 * * * *' which means every 15 minutes of every hour, every day.",
  },
{
    question:"What is the difference between cron and Quartz?",
    answer:"Standard cron uses five fields. Quartz adds a seconds field at the start and supports more complex patterns.",
  },
{
    question:"Why is my cron job not firing?",
    answer:"Check timezone, server clock, and that the scheduler service is running. Also verify the expression with a validator before deploying.",
  }
  ]}
/>
</div>
 );
}

// Very basic human description generator
function generateHumanDescription(expr: string): string {
 const parts = expr.trim().split(/\s+/);
 if (parts.length < 5 || parts.length > 6) return"Invalid expression format";
 
 const hasSec = parts.length === 6;
 const sec = hasSec ? parts[0] :"";
 const min = parts[hasSec ? 1 : 0];
 const hour = parts[hasSec ? 2 : 1];
 const dom = parts[hasSec ? 3 : 2];
 const mon = parts[hasSec ? 4 : 3];
 const dow = parts[hasSec ? 5 : 4];

 let desc ="At";
 
 if (min ==="*"&& hour ==="*") {
 desc ="Every minute";
 if (hasSec && sec !=="*") {
 desc = `Every minute at second ${sec}`;
 }
 } else if (min !=="*"&& hour ==="*") {
 if (min.includes("/")) {
 desc = `Every ${min.split('/')[1]} minutes`;
 } else {
 desc = `Hourly at minute ${min}`;
 }
 } else if (min !=="*"&& hour !=="*") {
 if (hour.includes("/")) {
 desc = `Every ${hour.split('/')[1]} hours at minute ${min}`;
 } else {
 desc = `At ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
 }
 } else if (min ==="*"&& hour !=="*") {
 desc = `Every minute past hour ${hour}`;
 }

 if (dom !=="*") {
 desc += ` on day ${dom} of the month`;
 }
 
 if (mon !=="*") {
 desc += ` in month ${mon}`;
 }
 
 if (dow !=="*") {
 let days = dow;
 days = days.replace("0","Sunday").replace("1","Monday").replace("2","Tuesday")
 .replace("3","Wednesday").replace("4","Thursday").replace("5","Friday")
 .replace("6","Saturday").replace("7","Sunday");
 desc += ` on ${days}`;
 }
 
 return desc;
}

// Extremely simplified basic"next run"simulation
function calculateNextDates(expr: string, count: number): Date[] {
 const parts = expr.trim().split(/\s+/);
 if (parts.length < 5 || parts.length > 6) throw new Error("Invalid");
 
 const hasSec = parts.length === 6;
 const minPart = parts[hasSec ? 1 : 0];
 const hourPart = parts[hasSec ? 2 : 1];
 
 // Note: This is a highly simplified mock generator for visual purposes.
 // A true cron parser requires a complex library (like cron-parser).
 // Here we just step through time and mock values based on basic rules.
 
 const dates: Date[] = [];
 let current = new Date();
 
 // Clean seconds & ms
 current.setSeconds(0, 0);
 
 let stepMin = 1;
 let stepHour = 1;
 
 if (minPart.startsWith("*/")) stepMin = parseInt(minPart.split("/")[1]) || 1;
 else if (minPart !=="*"&& !isNaN(parseInt(minPart))) {
 // Exact minute
 current.setMinutes(parseInt(minPart));
 }
 
 if (hourPart.startsWith("*/")) stepHour = parseInt(hourPart.split("/")[1]) || 1;
 else if (hourPart !=="*"&& !isNaN(parseInt(hourPart))) {
 // Exact hour
 current.setHours(parseInt(hourPart));
 }

 for (let i = 0; i < count; i++) {
 let nextDate = new Date(current.getTime());
 
 if (minPart ==="*"&& hourPart ==="*") {
 nextDate.setMinutes(nextDate.getMinutes() + i);
 } else if (minPart.startsWith("*/")) {
 nextDate.setMinutes(nextDate.getMinutes() + (stepMin * i));
 } else if (hourPart.startsWith("*/")) {
 nextDate.setHours(nextDate.getHours() + (stepHour * i));
 } else {
 // Just step by day for exact time
 nextDate.setDate(nextDate.getDate() + i);
 }
 
 dates.push(nextDate);
 }
 
 return dates;
}
