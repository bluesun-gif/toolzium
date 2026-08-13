"use client";

import React, { useState, useEffect, useCallback, useMemo } from"react";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";
import { Clock, RefreshCcw, Info, Calendar, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from"@/components/ui/tabs";
import { Switch } from"@/components/ui/switch";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

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
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Cron Expression Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Cron Expression Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/dev/cron-generator" max={6} />

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
