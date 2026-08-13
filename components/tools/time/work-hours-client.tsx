"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Clock, Calendar, DollarSign, Copy, Sparkles, Shield, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type DayLog = {
 day: string;
 start: string;
 end: string;
 breakMins: number;
};

const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export function WorkHoursClient() {
 const [logs, setLogs] = useState<DayLog[]>(daysOfWeek.map(d => ({ day: d, start:"09:00", end:"17:00", breakMins: 60 })));
 const [overtimeThreshold, setOvertimeThreshold] = useState(40);
 const [hourlyRate, setHourlyRate] = useState(0);

 const updateLog = (day: string, field: keyof DayLog, value: any) => {
 setLogs(logs.map(log => log.day === day ? { ...log, [field]: value } : log));
 };

 const reset = () => {
 setLogs(daysOfWeek.map(d => ({ day: d, start:"09:00", end:"17:00", breakMins: 60 })));
 setOvertimeThreshold(40);
 setHourlyRate(0);
 toast.success("Reset successfully");
 };

 const parseTime = (time: string) => {
 if (!time) return 0;
 const [h, m] = time.split(":").map(Number);
 return h * 60 + m;
 };

 const calculateHours = (log: DayLog) => {
 const startMins = parseTime(log.start);
 const endMins = parseTime(log.end);
 let totalMins = endMins - startMins;
 if (totalMins < 0) totalMins += 24 * 60; // handle overnight
 const netMins = Math.max(0, totalMins - log.breakMins);
 return netMins / 60;
 };

 const totalHours = logs.reduce((acc, log) => acc + calculateHours(log), 0);
 const regularHours = Math.min(totalHours, overtimeThreshold);
 const overtimeHours = Math.max(0, totalHours - overtimeThreshold);

 const regularPay = regularHours * hourlyRate;
 const overtimePay = overtimeHours * hourlyRate * 1.5;
 const totalPay = regularPay + overtimePay;

 const generateSummary = () => {
 let summary ="Timesheet Summary\n\n";
 logs.forEach(log => {
 const hours = calculateHours(log);
 summary += log.day +":"+ log.start +"-"+ log.end +"(Break:"+ log.breakMins +"m) =>"+ hours.toFixed(2) +"hrs\n";
 });
 summary +="\nTotal Hours:"+ totalHours.toFixed(2) +"hrs";
 summary +="\nRegular Hours:"+ regularHours.toFixed(2) +"hrs";
 summary +="\nOvertime Hours:"+ overtimeHours.toFixed(2) +"hrs";
 if (hourlyRate > 0) {
 summary +="\n\nRegular Pay: $"+ regularPay.toFixed(2);
 summary +="\nOvertime Pay: $"+ overtimePay.toFixed(2);
 summary +="\nTotal Pay: $"+ totalPay.toFixed(2);
 }
 return summary;
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
 icon={Clock}
 title="Work Hours & Overtime Calculator"
 description="Calculate daily and weekly work hours including break deductions and overtime."
 actions={
 <>
 <CopyButton getText={generateSummary} label="Copy Summary"/>
 <ResetButton onClick={reset} label="Reset"/>
 </>
 }
 />
 
 <div className={"grid gap-6 md:grid-cols-3"}>
 <div className="md:col-span-2 space-y-4">
 <GlassCard>
 <CardHeader>
 <CardTitle>Timesheet</CardTitle>
 <CardDescription>Enter your daily work hours</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {logs.map((log) => (
 <div key={log.day} className="grid grid-cols-4 gap-2 items-center">
 <Label className="font-semibold">{log.day.substring(0,3)}</Label>
 <Input type="time"value={log.start} onChange={(e) => updateLog(log.day,"start", e.target.value)} />
 <Input type="time"value={log.end} onChange={(e) => updateLog(log.day,"end", e.target.value)} />
 <Input type="number"placeholder="Break(m)"value={log.breakMins} onChange={(e) => updateLog(log.day,"breakMins", Number(e.target.value) || 0)} min={0} />
 </div>
 ))}
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-4">
 <GlassCard>
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-1">
 <Label>Overtime Threshold (hrs/week)</Label>
 <Input type="number"value={overtimeThreshold} onChange={(e) => setOvertimeThreshold(Number(e.target.value) || 0)} min={0} />
 </div>
 <div className="space-y-1">
 <Label>Hourly Rate ($)</Label>
 <Input type="number"value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value) || 0)} min={0} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Summary</CardTitle>
 </CardHeader>
 <CardContent className="space-y-2">
 <div className="flex justify-between">
 <span>Total Hours:</span>
 <span className="font-bold">{totalHours.toFixed(2)}h</span>
 </div>
 <div className="flex justify-between">
 <span>Regular Hours:</span>
 <span>{regularHours.toFixed(2)}h</span>
 </div>
 <div className="flex justify-between text-orange-500">
 <span>Overtime Hours:</span>
 <span>{overtimeHours.toFixed(2)}h</span>
 </div>
 {hourlyRate > 0 && (
 <>
 <Separator className="my-2"/>
 <div className="flex justify-between">
 <span>Total Pay:</span>
 <span className="font-bold text-green-600">${totalPay.toFixed(2)}</span>
 </div>
 </>
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
          <h3>Why Use Our Work Hours & Overtime Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Work Hours & Overtime Calculator provides
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

      <RelatedTools currentToolUrl="/tools/time/work-hours" max={6} />

</div>
 );
}
