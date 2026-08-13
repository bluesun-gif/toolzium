"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Plane, Clock, Globe, ArrowRight, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

const timezones = [
 { label:"UTC (London, Lisbon)", value: 0 },
 { label:"UTC+1 (Paris, Berlin, Rome)", value: 1 },
 { label:"UTC+2 (Athens, Cairo)", value: 2 },
 { label:"UTC+3 (Moscow, Istanbul)", value: 3 },
 { label:"UTC+4 (Dubai)", value: 4 },
 { label:"UTC+5:30 (New Delhi)", value: 5.5 },
 { label:"UTC+7 (Bangkok, Jakarta)", value: 7 },
 { label:"UTC+8 (Singapore, Beijing)", value: 8 },
 { label:"UTC+9 (Tokyo, Seoul)", value: 9 },
 { label:"UTC+10 (Sydney)", value: 10 },
 { label:"UTC+12 (Auckland)", value: 12 },
 { label:"UTC-5 (New York, Toronto)", value: -5 },
 { label:"UTC-6 (Chicago, Mexico City)", value: -6 },
 { label:"UTC-7 (Denver)", value: -7 },
 { label:"UTC-8 (Los Angeles, Vancouver)", value: -8 },
 { label:"UTC-9 (Anchorage)", value: -9 },
 { label:"UTC-10 (Honolulu)", value: -10 }
];

export function FlightDurationClient() {
 const [depDate, setDepDate] = useState("");
 const [depTime, setDepTime] = useState("");
 const [depTz, setDepTz] = useState("0");
 
 const [arrDate, setArrDate] = useState("");
 const [arrTime, setArrTime] = useState("");
 const [arrTz, setArrTz] = useState("0");

 const reset = () => {
 setDepDate(""); setDepTime(""); setDepTz("0");
 setArrDate(""); setArrTime(""); setArrTz("0");
 toast.success("Reset successfully");
 };

 const calculate = () => {
 if (!depDate || !depTime || !arrDate || !arrTime) return null;
 try {
 // Calculate times in UTC
 const depDateObj = new Date(depDate +"T"+ depTime);
 const arrDateObj = new Date(arrDate +"T"+ arrTime);
 
 const depOffsetMs = parseFloat(depTz) * 60 * 60 * 1000;
 const arrOffsetMs = parseFloat(arrTz) * 60 * 60 * 1000;

 const depUtc = depDateObj.getTime() - depOffsetMs;
 const arrUtc = arrDateObj.getTime() - arrOffsetMs;

 const diffMs = arrUtc - depUtc;
 if (diffMs < 0) return null; // Invalid

 const hours = Math.floor(diffMs / (1000 * 60 * 60));
 const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
 const tzDiff = parseFloat(arrTz) - parseFloat(depTz);

 return { hours, minutes, tzDiff };
 } catch {
 return null;
 }
 };

 const res = calculate();
 
 const generateSummary = () => {
 if (!res) return"No valid calculation yet.";
 return"Flight Duration:"+ res.hours +"h"+ res.minutes +"m\nTime Zone Diff:"+ (res.tzDiff > 0 ?"+":"") + res.tzDiff +"hours.";
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
 icon={Plane}
 title="Flight Duration Calculator"
 description="Calculate actual flight duration accounting for time zone shifts."
 actions={
 <>
 <CopyButton getText={generateSummary} label="Copy Summary"/>
 <ResetButton onClick={reset} label="Reset"/>
 </>
 }
 />

 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Departure</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-1">
 <Label>Date</Label>
 <Input type="date"value={depDate} onChange={(e) => setDepDate(e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label>Time (Local)</Label>
 <Input type="time"value={depTime} onChange={(e) => setDepTime(e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label>Time Zone</Label>
 <Select value={depTz} onValueChange={setDepTz}>
 <SelectTrigger><SelectValue placeholder="Select Time Zone"/></SelectTrigger>
 <SelectContent>
 {timezones.map(tz => (
 <SelectItem key={tz.value} value={tz.value.toString()}>{tz.label}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Arrival</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-1">
 <Label>Date</Label>
 <Input type="date"value={arrDate} onChange={(e) => setArrDate(e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label>Time (Local)</Label>
 <Input type="time"value={arrTime} onChange={(e) => setArrTime(e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label>Time Zone</Label>
 <Select value={arrTz} onValueChange={setArrTz}>
 <SelectTrigger><SelectValue placeholder="Select Time Zone"/></SelectTrigger>
 <SelectContent>
 {timezones.map(tz => (
 <SelectItem key={tz.value} value={tz.value.toString()}>{tz.label}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <div className="md:col-span-2">
 <GlassCard>
 <CardHeader>
 <CardTitle>Flight Details</CardTitle>
 </CardHeader>
 <CardContent>
 {res ? (
 <div className="space-y-4 text-center">
 <div className="text-4xl font-bold flex justify-center items-center gap-2">
 <Clock className="h-8 w-8 text-primary"/>
 {res.hours}h {res.minutes}m
 </div>
 <p className="text-muted-foreground">Actual Flight Duration</p>
 <Separator />
 <div className="flex justify-around items-center pt-2">
 <div>
 <p className="text-sm text-muted-foreground">Time Zone Diff</p>
 <p className="text-lg font-semibold">{res.tzDiff > 0 ?"+":""}{res.tzDiff} hrs</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">Jet Lag Rating</p>
 <p className="text-lg font-semibold text-orange-500">
 {Math.abs(res.tzDiff) > 6 ?"Severe": Math.abs(res.tzDiff) > 3 ?"Moderate":"Mild"}
 </p>
 </div>
 </div>
 </div>
 ) : (
 <div className="text-center text-muted-foreground py-8">
 Enter complete departure and arrival details to see duration.
 </div>
 )}
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
          <h3>Why Use Our Flight Duration Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Flight Duration Calculator provides
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

      <RelatedTools currentToolUrl="/tools/travel/flight-duration" max={6} />

</div>
 );
}
