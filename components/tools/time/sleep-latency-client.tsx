"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Moon, AlarmClock, Heart, Clock, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function SleepLatencyClient() {
 const [bedTime, setBedTime] = useState("22:00");
 const [latency, setLatency] = useState("15");
 const [sleepDuration, setSleepDuration] = useState("7.5");
 
 const [alarmTime, setAlarmTime] = useState("");
 const [healthStatus, setHealthStatus] = useState("");

 useEffect(() => {
 calculateAlarm();
 assessHealth();
 }, [bedTime, latency, sleepDuration]);

 const calculateAlarm = () => {
 if (!bedTime || !latency || !sleepDuration) return;
 
 const [hours, minutes] = bedTime.split(':').map(Number);
 const date = new Date();
 date.setHours(hours, minutes, 0, 0);
 
 // Add latency
 date.setMinutes(date.getMinutes() + Number(latency));
 
 // Add sleep duration (hours to minutes)
 date.setMinutes(date.getMinutes() + (Number(sleepDuration) * 60));
 
 const alarmHours = date.getHours().toString().padStart(2, '0');
 const alarmMinutes = date.getMinutes().toString().padStart(2, '0');
 setAlarmTime(alarmHours +":"+ alarmMinutes);
 };

 const assessHealth = () => {
 const lat = Number(latency);
 if (lat < 5) {
 setHealthStatus("Excessive sleepiness - You fall asleep very quickly, which may indicate sleep deprivation.");
 } else if (lat >= 10 && lat <= 20) {
 setHealthStatus("Normal - Healthy sleep latency.");
 } else if (lat > 30) {
 setHealthStatus("Sleep onset insomnia - It takes longer than usual to fall asleep.");
 } else {
 setHealthStatus("Slightly abnormal - Falling asleep taking"+ lat +"minutes.");
 }
 };

 const handleReset = () => {
 setBedTime("22:00");
 setLatency("15");
 setSleepDuration("7.5");
 };

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Moon}
 title="Sleep Latency & Alarm Clock"
 description="Sleep latency & sleep efficiency analyzer with custom alarm calculator."
 actions={
 <ResetButton onClick={handleReset} label="Reset"/>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Sleep Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Time You Enter Bed</Label>
 <Input type="time"value={bedTime} onChange={(e) => setBedTime(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Average Time to Fall Asleep (Latency in minutes)</Label>
 <Input type="number"min="0"value={latency} onChange={(e) => setLatency(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Desired Total Sleep Duration</Label>
 <Select value={sleepDuration} onValueChange={setSleepDuration}>
 <SelectTrigger>
 <SelectValue placeholder="Select duration"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="4.5">4.5 hours (3 cycles)</SelectItem>
 <SelectItem value="6">6.0 hours (4 cycles)</SelectItem>
 <SelectItem value="7.5">7.5 hours (5 cycles)</SelectItem>
 <SelectItem value="9">9.0 hours (6 cycles)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <AlarmClock className="w-5 h-5 text-primary"/>
 Calculated Alarm Time
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-4xl font-bold text-center py-6 text-primary">
 {alarmTime ||"--:--"}
 </div>
 <p className="text-sm text-center text-muted-foreground">
 Set your alarm for this time to complete your sleep cycles.
 </p>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Heart className="w-5 h-5 text-red-500"/>
 Health Status
 </CardTitle>
 </CardHeader>
 <CardContent>
 <p className="text-md font-medium">
 {healthStatus}
 </p>
 </CardContent>
 </GlassCard>
 </div>
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
          <h3>Why Use Our Sleep Latency & Alarm Clock?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Sleep Latency & Alarm Clock provides
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

      <RelatedTools currentToolUrl="/tools/time/sleep-latency" max={6} />

</div>
 );
}
