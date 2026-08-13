"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, ArrowRightLeft, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { CopyButton } from "@/components/shared/action-buttons";
import { Separator } from "@/components/ui/separator";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function DateFormatterClient() {
  const [inputDate, setInputDate] = useState<string>("");
  const [parsedDate, setParsedDate] = useState<Date | null>(null);
  useEffect(() => {
    setParsedDate(new Date());
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputDate(val);
    if (!val) {
      setParsedDate(new Date());
      return;
    }

    // Attempt to parse
    const num = Number(val);
    let d = new Date(val);
    if (!isNaN(num) && val.trim() !== "") {
      // Could be unix timestamp (ms or s)
      if (val.length <= 10) d = new Date(num * 1000);else d = new Date(num);
    }
    if (!isNaN(d.getTime())) {
      setParsedDate(d);
    } else {
      setParsedDate(null);
    }
  };
  const getFormats = (d: Date) => {
    return [{
      name: "ISO 8601",
      value: d.toISOString()
    }, {
      name: "UTC String",
      value: d.toUTCString()
    }, {
      name: "Local String",
      value: d.toLocaleString()
    }, {
      name: "Unix Timestamp (Seconds)",
      value: Math.floor(d.getTime() / 1000).toString()
    }, {
      name: "Unix Timestamp (Milliseconds)",
      value: d.getTime().toString()
    }, {
      name: "RFC 2822",
      value: d.toString()
    }, {
      name: "Date String",
      value: d.toDateString()
    }, {
      name: "Time String",
      value: d.toTimeString()
    }, {
      name: "US Format",
      value: new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long'
      }).format(d)
    }, {
      name: "UK Format",
      value: new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full',
        timeStyle: 'long'
      }).format(d)
    }, {
      name: "Japan Format",
      value: new Intl.DateTimeFormat('ja-JP', {
        dateStyle: 'full',
        timeStyle: 'long'
      }).format(d)
    }, {
      name: "Germany Format",
      value: new Intl.DateTimeFormat('de-DE', {
        dateStyle: 'full',
        timeStyle: 'long'
      }).format(d)
    }, {
      name: "Short Date (US)",
      value: new Intl.DateTimeFormat('en-US').format(d)
    }, {
      name: "Short Date (UK)",
      value: new Intl.DateTimeFormat('en-GB').format(d)
    }, {
      name: "YYYY-MM-DD",
      value: d.toISOString().split('T')[0]
    }];
  };
  const getExtraInfo = (d: Date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d.getTime() - start.getTime() + (start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const dCopy = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = dCopy.getUTCDay() || 7;
    dCopy.setUTCDate(dCopy.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(dCopy.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((dCopy.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    const offsetHours = Math.floor(Math.abs(d.getTimezoneOffset()) / 60);
    const offsetMinutes = Math.abs(d.getTimezoneOffset()) % 60;
    const offsetString = `${d.getTimezoneOffset() > 0 ? '-' : '+'}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;
    return [{
      label: "Day of Week",
      value: days[d.getDay()]
    }, {
      label: "Day of Year",
      value: dayOfYear.toString()
    }, {
      label: "Week Number",
      value: weekNo.toString()
    }, {
      label: "Timezone Offset",
      value: `UTC ${offsetString}`
    }];
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Date Formatter" description="Convert dates between different formats effortlessly." icon={Calendar} />
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Input Date</CardTitle>
 <CardDescription>Enter a date string, ISO format, or Unix timestamp. Leave empty for the current time.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-col md:flex-row gap-4">
 <div className="flex-1 space-y-2">
 <Label>Text Input</Label>
 <Input value={inputDate} onChange={handleInputChange} placeholder="e.g. 2024-01-01, 1704067200, or 'Oct 31, 2023'" />
 </div>
 <div className="flex-1 space-y-2">
 <Label>Date/Time Picker</Label>
 <Input type="datetime-local" value={parsedDate ? new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""} onChange={e => {
                if (e.target.value) {
                  const d = new Date(e.target.value);
                  setInputDate(d.toLocaleString());
                  setParsedDate(d);
                }
              }} />
 </div>
 </div>
 {!parsedDate && inputDate && <p className="text-destructive text-sm mt-2 font-medium">Invalid date format</p>}
 </CardContent>
 </GlassCard>

 {parsedDate && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2 space-y-4">
 <h3 className="text-lg font-semibold flex items-center gap-2"><ArrowRightLeft className="w-5 h-5" /> Formats</h3>
 <div className="grid gap-3">
 {getFormats(parsedDate).map((fmt, idx) => <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-card/50 gap-2">
 <div className="truncate pr-4">
 <p className="text-xs text-muted-foreground font-medium mb-0.5">{fmt.name}</p>
 <p className="font-mono text-sm truncate">{fmt.value}</p>
 </div>
 <CopyButton getText={() => fmt.value} label="Copy" />
 </div>)}
 </div>
 </div>
 
 <div className="space-y-4">
 <h3 className="text-lg font-semibold flex items-center gap-2"><Clock className="w-5 h-5" /> Details</h3>
 <GlassCard>
 <CardContent className="p-4 space-y-4">
 {getExtraInfo(parsedDate).map((info, idx) => <div key={idx}>
 <p className="text-sm text-muted-foreground">{info.label}</p>
 <p className="font-medium text-lg">{info.value}</p>
 {idx < 3 && <Separator className="my-3" />}
 </div>)}
 </CardContent>
 </GlassCard>
 </div>
 </div>}
 
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
          <h3>Why Use Our Date Formatter?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Date Formatter provides
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

      <RelatedTools currentToolUrl="/tools/time/date-formatter" max={6} />

    </div></div>;
}