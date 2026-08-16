"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { Banknote, Calculator, CalendarDays, Clock, Download, Scale } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { Clock, CalendarDays, Calculator, Banknote, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
type DayEntry = {
  day: string;
  start: string;
  end: string;
  breakMins: string;
};
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const defaultEntries: DayEntry[] = DAYS.map(day => ({
  day,
  start: "",
  end: "",
  breakMins: ""
}));
export function TimesheetClient() {
  const [entries, setEntries] = useState<DayEntry[]>(defaultEntries);
  const [hourlyRate, setHourlyRate] = useState<string>("");
  useEffect(() => {
    const saved = localStorage.getItem("toolzium_timesheet");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.entries) setEntries(parsed.entries);
        if (parsed.hourlyRate) setHourlyRate(parsed.hourlyRate);
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("toolzium_timesheet", JSON.stringify({
      entries,
      hourlyRate
    }));
  }, [entries, hourlyRate]);
  const updateEntry = (index: number, field: keyof DayEntry, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      [field]: value
    };
    setEntries(newEntries);
  };
  const clearAll = () => {
    if (confirm("Are you sure you want to reset the timesheet?")) {
      setEntries(defaultEntries);
      setHourlyRate("");
      toast.success("Timesheet reset");
    }
  };
  const calcDailyHours = (entry: DayEntry) => {
    if (!entry.start || !entry.end) return 0;
    const [startH, startM] = entry.start.split(":").map(Number);
    const [endH, endM] = entry.end.split(":").map(Number);
    let startTotal = startH * 60 + startM;
    let endTotal = endH * 60 + endM;
    if (endTotal < startTotal) {
      endTotal += 24 * 60;
    }
    let diff = endTotal - startTotal;
    if (entry.breakMins) {
      diff -= Number(entry.breakMins);
    }
    return Math.max(0, diff / 60);
  };
  const totals = useMemo(() => {
    let totalHours = 0;
    const dailyHours = entries.map(calcDailyHours);
    totalHours = dailyHours.reduce((sum, h) => sum + h, 0);
    const regularHours = Math.min(40, totalHours);
    const overtimeHours = Math.max(0, totalHours - 40);
    const rate = Number(hourlyRate) || 0;
    const regularPay = regularHours * rate;
    const overtimePay = overtimeHours * rate * 1.5;
    const totalPay = regularPay + overtimePay;
    return {
      totalHours,
      regularHours,
      overtimeHours,
      totalPay,
      dailyHours
    };
  }, [entries, hourlyRate]);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Clock} title="Timesheet Calculator" description="Calculate weekly work hours, track overtime, and estimate gross pay." actions={<ResetButton onClick={clearAll} label="Reset Timesheet" />} />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <CalendarDays className="w-5 h-5 text-primary" />
 Weekly Timesheet
 </CardTitle>
 <CardDescription>Enter your start and end times for each day.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="overflow-x-auto">
 <table className="w-full min-w-[600px] text-sm text-left">
 <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-lg">
 <tr>
 <th className="px-4 py-3 rounded-tl-lg">Day</th>
 <th className="px-4 py-3">Start Time</th>
 <th className="px-4 py-3">End Time</th>
 <th className="px-4 py-3">Break (mins)</th>
 <th className="px-4 py-3 text-right rounded-tr-lg">Total Hours</th>
 </tr>
 </thead>
 <tbody>
 {entries.map((entry, idx) => <tr key={entry.day} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
 <td className="px-4 py-3 font-medium">{entry.day}</td>
 <td className="px-4 py-3">
 <Input type="time" className="w-[130px] h-9" value={entry.start} onChange={e => updateEntry(idx, "start", e.target.value)} />
 </td>
 <td className="px-4 py-3">
 <Input type="time" className="w-[130px] h-9" value={entry.end} onChange={e => updateEntry(idx, "end", e.target.value)} />
 </td>
 <td className="px-4 py-3">
 <Input type="number" min="0" placeholder="0" className="w-[100px] h-9" value={entry.breakMins} onChange={e => updateEntry(idx, "breakMins", e.target.value)} />
 </td>
 <td className="px-4 py-3 text-right font-medium">
 {totals.dailyHours[idx] > 0 ? totals.dailyHours[idx].toFixed(2) + "h" : "-"}
 </td>
 </tr>)}
 </tbody>
 </table>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="w-5 h-5 text-primary" />
 Summary
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-4">
 <div className="flex justify-between items-center py-2 border-b">
 <span className="text-muted-foreground">Regular Hours</span>
 <span className="font-medium">{totals.regularHours.toFixed(2)}h</span>
 </div>
 <div className="flex justify-between items-center py-2 border-b">
 <span className="text-muted-foreground">Overtime Hours</span>
 <span className="font-medium text-amber-500">{totals.overtimeHours.toFixed(2)}h</span>
 </div>
 <div className="flex justify-between items-center py-2 bg-primary/10 rounded-lg px-3">
 <span className="font-bold">Total Hours</span>
 <span className="font-bold text-primary text-lg">{totals.totalHours.toFixed(2)}h</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Banknote className="w-5 h-5 text-primary" />
 Pay Estimate
 </CardTitle>
 <CardDescription>Optional: Calculate gross pay</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Hourly Rate ($)</Label>
 <div className="relative">
 <span className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground">$</span>
 <Input type="number" min="0" placeholder="0.00" className="pl-9" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} />
 </div>
 </div>

 {Number(hourlyRate) > 0 && <div className="space-y-2 pt-4 border-t">
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">Regular Pay</span>
 <span>${(totals.regularHours * Number(hourlyRate)).toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">Overtime Pay (1.5x)</span>
 <span>${(totals.overtimeHours * Number(hourlyRate) * 1.5).toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center pt-2 mt-2 border-t font-bold">
 <span>Estimated Gross</span>
 <span className="text-lg text-green-500">${totals.totalPay.toFixed(2)}</span>
 </div>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Hours",
    description:"Log time per day or task.",
    icon: Clock,
  },
{
    step:"02",
    title:"Set Rate",
    description:"Add hourly rate.",
    icon: Scale,
  },
{
    step:"03",
    title:"Calculate",
    description:"See total pay.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Clock,
    title:"Hours",
    description:"Per day or task.",
  },
{
    icon: Scale,
    title:"Rate",
    description:"Hourly amount.",
  },
{
    icon: Calculator,
    title:"Totals",
    description:"Pay computed.",
  },
{
    icon: Download,
    title:"Export",
    description:"For invoicing.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A timesheet calculator converts logged hours and rates into accurate pay, essential for freelancers and payroll. Manual totals invite errors that cost money. This tool computes the sum from structured entries.</p>
  <p>Task-level tracking improves billing clarity and client trust. Export lets you roll the timesheet into an invoice.</p>
  <p>Use it for every billing period. The tool's value is error-free time-based pay calculation.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does it do?",
    answer:"Computes pay from hours and rate.",
  },
{
    question:"Track tasks?",
    answer:"Yes, per task.",
  },
{
    question:"Export?",
    answer:"Yes, for billing.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Overtime?",
    answer:"Set rates accordingly.",
  }
  ]}
/>
</div>
 );
}
=======
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Timesheet Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Timesheet Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/office/timesheet" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
