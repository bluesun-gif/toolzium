"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { Moon, Sun, Clock, Calendar, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function ShiftCircadianClient() {
 const [shiftStart, setShiftStart] = useState("23:00");
 const [shiftEnd, setShiftEnd] = useState("07:00");
 const [commute, setCommute] = useState("30");
 const [sleepDur, setSleepDur] = useState("8");
 const [shiftType, setShiftType] = useState("night");

 const calculateSchedule = () => {
 if (!shiftStart || !shiftEnd || !commute || !sleepDur) return null;
 
 const parseTime = (timeStr: string) => {
 const [h, m] = timeStr.split(':').map(Number);
 const date = new Date();
 date.setHours(h, m, 0, 0);
 return date;
 };
 
 const formatTime = (date: Date) => {
 return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 };
 
 const addMinutes = (date: Date, mins: number) => {
 return new Date(date.getTime() + mins * 60000);
 };

 const sEnd = parseTime(shiftEnd);
 const sStart = parseTime(shiftStart);
 
 // Core Logic
 // Allow 1 hour wind-down after reaching home
 const sleepStart = addMinutes(sEnd, parseInt(commute) + 60); 
 const sleepEnd = addMinutes(sleepStart, parseFloat(sleepDur) * 60);
 
 // Anchor sleep: first 4 hours of primary sleep
 const anchorSleepStart = addMinutes(sleepStart, 0);
 const anchorSleepEnd = addMinutes(anchorSleepStart, 240);
 
 // Caffeine cutoff: 6 hours before primary sleep
 const caffeineCutoff = addMinutes(sleepStart, -360);
 
 // Recommended Nap Window: ~90 mins before shift starts, lasting 30 mins
 const napStart = addMinutes(sStart, -90);
 const napEnd = addMinutes(napStart, 30);
 
 return {
 sleepWindow: formatTime(sleepStart) +"-"+ formatTime(sleepEnd),
 anchorSleep: formatTime(anchorSleepStart) +"-"+ formatTime(anchorSleepEnd),
 caffeineCutoff: formatTime(caffeineCutoff),
 napWindow: formatTime(napStart) +"-"+ formatTime(napEnd),
 lightAdvice: shiftType ==="night"
 ?"Wear dark glasses during your morning commute. Maximize light exposure when waking up."
 : shiftType ==="morning"
 ?"Get bright sunlight immediately upon waking. Dim lights 2 hours before bed."
 :"Keep a consistent wake time. Maintain a dark environment during sleep."
 };
 };

 const schedule = calculateSchedule();

 const handleReset = () => {
 setShiftStart("23:00");
 setShiftEnd("07:00");
 setCommute("30");
 setSleepDur("8");
 setShiftType("night");
 toast.success("Values reset");
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader 
 icon={Moon}
 title="Shift Work Sleep Schedule & Circadian Calculator"
 description="Calculate optimal sleep & wake cycles for shift workers."
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5"/> Shift Details</CardTitle>
 <CardDescription>Enter your shift schedule and preferences</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Shift Type</Label>
 <Select value={shiftType} onValueChange={setShiftType}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="night">Night Shift</SelectItem>
 <SelectItem value="morning">Early Morning Shift</SelectItem>
 <SelectItem value="afternoon">Afternoon / Evening Shift</SelectItem>
 <SelectItem value="split">Split Shift</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Shift Start Time</Label>
 <Input type="time"value={shiftStart} onChange={(e) => setShiftStart(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Shift End Time</Label>
 <Input type="time"value={shiftEnd} onChange={(e) => setShiftEnd(e.target.value)} />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Commute Time (minutes)</Label>
 <Input type="number"value={commute} onChange={(e) => setCommute(e.target.value)} placeholder="30"/>
 </div>

 <div className="space-y-2">
 <Label>Desired Sleep Duration (hours)</Label>
 <Input type="number"step="0.5"value={sleepDur} onChange={(e) => setSleepDur(e.target.value)} placeholder="8"/>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Sun className="h-5 w-5"/> Recommended Schedule</CardTitle>
 <CardDescription>Based on circadian science recommendations</CardDescription>
 </CardHeader>
 <CardContent>
 {schedule ? (
 <div className="space-y-6">
 <div className="bg-muted p-4 rounded-lg">
 <div className="text-sm text-muted-foreground mb-1">Primary Sleep Window</div>
 <div className="text-xl font-semibold">{schedule.sleepWindow}</div>
 <div className="text-xs text-muted-foreground mt-1">Includes 1hr wind-down post-commute</div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="border p-3 rounded-md">
 <div className="text-sm font-medium mb-1">Anchor Sleep Time</div>
 <div className="text-sm">{schedule.anchorSleep}</div>
 </div>
 <div className="border p-3 rounded-md">
 <div className="text-sm font-medium mb-1">Recommended Nap Window</div>
 <div className="text-sm">{schedule.napWindow}</div>
 </div>
 <div className="border p-3 rounded-md">
 <div className="text-sm font-medium mb-1">Caffeine Cutoff Time</div>
 <div className="text-sm">{schedule.caffeineCutoff}</div>
 </div>
 </div>

 <Separator />

 <div>
 <div className="text-sm font-medium mb-2 flex items-center gap-2">
 <Calendar className="h-4 w-4"/> Light Exposure Advice
 </div>
 <p className="text-sm text-muted-foreground">{schedule.lightAdvice}</p>
 </div>
 </div>
 ) : (
 <p className="text-sm text-muted-foreground">Please fill out all fields to calculate your schedule.</p>
 )}
 </CardContent>
 </GlassCard>
 </div>
 
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
          <h3>Why Use Our Shift Work Sleep Schedule & Circadian Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Shift Work Sleep Schedule & Circadian Calculator provides
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

      <RelatedTools currentToolUrl="/tools/time/shift-circadian" max={6} />

</div>
 );
}
