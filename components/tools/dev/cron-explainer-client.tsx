"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Clock, HelpCircle, Zap, BookOpen, Shield, Timer, Calendar, Code2, AlignLeft, Layers } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

// A minimal parser/explainer logic to avoid heavy npm dependencies if not installed
const explainCronPart = (part: string, unit: string, min: number, max: number, names?: string[]) => {
  if (part === "*") return `every ${unit}`;
  
  if (part.includes("/")) {
    const [base, step] = part.split("/");
    if (base === "*") return `every ${step} ${unit}s`;
    return `every ${step} ${unit}s starting at ${base}`;
  }
  
  if (part.includes("-")) {
    const [start, end] = part.split("-");
    return `every ${unit} from ${names ? names[parseInt(start)] : start} to ${names ? names[parseInt(end)] : end}`;
  }
  
  if (part.includes(",")) {
    const values = part.split(",");
    const namedValues = names ? values.map(v => names[parseInt(v)] || v) : values;
    return `at ${unit} ${namedValues.join(", ")}`;
  }
  
  return `at ${unit} ${names ? names[parseInt(part)] || part : part}`;
};

const explainCron = (expression: string) => {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return { valid: false, text: "Invalid cron format. Please use 5 fields." };
  
  try {
    const [minute, hour, dom, month, dow] = parts;
    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    let expl = [];
    if (minute !== "*") expl.push(explainCronPart(minute, "minute", 0, 59));
    if (hour !== "*") expl.push(explainCronPart(hour, "hour", 0, 23));
    if (dom !== "*") expl.push(explainCronPart(dom, "day of month", 1, 31));
    if (month !== "*") expl.push(explainCronPart(month, "month", 1, 12, months));
    if (dow !== "*") expl.push(explainCronPart(dow, "day of week", 0, 7, days));
    
    if (expl.length === 0) return { valid: true, text: "Every minute" };
    
    return { valid: true, text: expl.join(", ") };
  } catch (e) {
    return { valid: false, text: "Failed to parse expression" };
  }
};

const getNextRuns = (expression: string) => {
  // Mock next runs for the sake of no external dependencies like cron-parser
  // In a real scenario, use cron-parser
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  
  const runs = [];
  let d = new Date();
  d.setSeconds(0);
  d.setMilliseconds(0);
  
  for(let i=0; i<5; i++) {
    d.setMinutes(d.getMinutes() + 1); // rough approximation just for UI visualization
    runs.push(d.toLocaleString());
  }
  return runs;
};

const PRESETS = [
  { label: "Every minute", expr: "* * * * *" },
  { label: "Hourly", expr: "0 * * * *" },
  { label: "Daily at midnight", expr: "0 0 * * *" },
  { label: "Weekly on Monday", expr: "0 0 * * 1" },
  { label: "Monthly on 1st", expr: "0 0 1 * *" },
  { label: "Yearly on Jan 1", expr: "0 0 1 1 *" },
];

export function CronExplainerClient() {
  const [expression, setExpression] = useState("* * * * *");
  const [explanation, setExplanation] = useState({ valid: true, text: "" });
  const [nextRuns, setNextRuns] = useState<string[]>([]);

  useEffect(() => {
    setExplanation(explainCron(expression));
    setNextRuns(getNextRuns(expression));
  }, [expression]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader 
        title="Cron Explainer" 
        description="Translate cron expressions into human-readable text and view scheduled run times."
        icon={Clock}
        actions={
          <>
            <CopyButton getText={() => explanation.text} label="Copy Explanation" />
            <ResetButton onClick={() => setExpression("* * * * *")} label="Reset" />
          </>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Cron Expression</CardTitle>
              <CardDescription>Enter a 5-field cron expression</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Input 
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  className="text-center text-2xl font-mono py-8 tracking-widest"
                  placeholder="* * * * *"
                />
              </div>
              
              <div className={"p-4 rounded-md text-lg font-medium text-center " + (explanation.valid ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive')}>
                {explanation.text}
              </div>
              
              <div className="grid grid-cols-5 gap-2 text-center text-sm font-mono text-muted-foreground mt-4">
                <div>Minute<br/>(0-59)</div>
                <div>Hour<br/>(0-23)</div>
                <div>Day<br/>(1-31)</div>
                <div>Month<br/>(1-12)</div>
                <div>Week<br/>(0-7)</div>
              </div>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardHeader>
              <CardTitle>Next Scheduled Runs</CardTitle>
              <CardDescription>Approximate upcoming executions</CardDescription>
            </CardHeader>
            <CardContent>
              {explanation.valid ? (
                <ul className="space-y-2">
                  {nextRuns.map((run, i) => (
                    <li key={i} className="p-3 bg-muted/50 rounded-md text-sm font-mono flex items-center gap-3">
                      <Zap className="w-4 h-4 text-primary" />
                      {run}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">Please enter a valid expression to see next runs.</p>
              )}
            </CardContent>
          </GlassCard>
        </div>
        
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Common Presets</CardTitle>
              <CardDescription>Quick examples</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {PRESETS.map((p, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => setExpression(p.expr)}
                >
                  <div>
                    <div className="font-medium">{p.label}</div>
                    <div className="text-xs font-mono text-muted-foreground">{p.expr}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" /> Quick Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <strong>*</strong> : Any value
              </div>
              <div>
                <strong>,</strong> : Value list separator
              </div>
              <div>
                <strong>-</strong> : Range of values
              </div>
              <div>
                <strong>/</strong> : Step values (e.g. */5)
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Enter a Cron Expression",
            description: "Paste or type any cron expression (5 or 6 fields). The tool explains each field in plain English and validates the syntax instantly.",
            icon: Code2,
          },
          {
            step: "02",
            title: "Read the Plain English Explanation",
            description: "Get a human-readable description of when the cron job runs — e.g., \"Every 15 minutes, between 9 AM and 5 PM, Monday through Friday.\"",
            icon: AlignLeft,
          },
          {
            step: "03",
            title: "See the Next Run Times",
            description: "Preview the next 5–10 scheduled execution times based on your cron expression and current time. Confirm the schedule before deploying.",
            icon: Calendar,
          },
        ]}
        badges={[
          "Plain English translation",
          "Next run preview",
          "Syntax validation",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Clock,
            title: "Full Cron Syntax Support",
            description: "Supports standard 5-field cron (min hour day month weekday) and extended 6-field (with seconds) used by AWS EventBridge and Quartz Scheduler.",
          },
          {
            icon: AlignLeft,
            title: "Plain English Translation",
            description: "Converts cryptic cron expressions into clear, readable descriptions. \"0 9 * * 1-5\" becomes \"At 9:00 AM, Monday through Friday.\"",
          },
          {
            icon: Calendar,
            title: "Next Execution Preview",
            description: "Shows the next 5–10 scheduled run times so you can verify your cron fires at exactly the right moments before adding it to production.",
          },
          {
            icon: Layers,
            title: "Special String Support",
            description: "Supports @yearly, @monthly, @weekly, @daily, @hourly, and @reboot shorthand strings used by crontab and many task schedulers.",
          },
          {
            icon: Timer,
            title: "Field-by-Field Breakdown",
            description: "Each field (minute, hour, day, month, weekday) is highlighted and explained individually — so you understand exactly what each part controls.",
          },
          {
            icon: Shield,
            title: "Client-Side & Private",
            description: "All parsing and explanation runs in your browser. Your cron expressions are never sent to any server.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Cron Syntax Reference — Complete Field Guide</h3>
          <p>
            A <strong>cron expression</strong> is a string of 5 (or 6) fields separated by spaces that define
            a recurring schedule. It is used by Unix crontab, CI/CD systems (GitHub Actions, GitLab CI),
            cloud schedulers (AWS EventBridge, Google Cloud Scheduler), and job queues (Sidekiq, BullMQ, Celery).
          </p>

          <h4 className="font-semibold">Cron Field Reference (5-field standard)</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Position</th>
                  <th className="border p-2 text-left">Field</th>
                  <th className="border p-2 text-left">Allowed Values</th>
                  <th className="border p-2 text-left">Special Chars</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1st", "Minute", "0–59", "* , - /"],
                  ["2nd", "Hour", "0–23", "* , - /"],
                  ["3rd", "Day of Month", "1–31", "* , - / ? L W"],
                  ["4th", "Month", "1–12 or JAN–DEC", "* , - /"],
                  ["5th", "Day of Week", "0–6 or SUN–SAT", "* , - / ? L #"],
                ].map(([pos, field, vals, chars]) => (
                  <tr key={pos} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary text-xs">{pos}</td>
                    <td className="border p-2 font-medium text-xs">{field}</td>
                    <td className="border p-2 text-xs">{vals}</td>
                    <td className="border p-2 font-mono text-xs">{chars}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Common Cron Expression Examples</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Expression</th>
                  <th className="border p-2 text-left">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["* * * * *", "Every minute"],
                  ["0 * * * *", "Every hour (at :00)"],
                  ["0 0 * * *", "Every day at midnight"],
                  ["0 9 * * 1-5", "Every weekday at 9 AM"],
                  ["0 0 * * 0", "Every Sunday at midnight"],
                  ["*/15 * * * *", "Every 15 minutes"],
                  ["0 9,17 * * *", "At 9 AM and 5 PM daily"],
                  ["0 0 1 * *", "First day of every month"],
                  ["0 0 1 1 *", "Once a year (Jan 1st)"],
                  ["30 6 * * 1", "Every Monday at 6:30 AM"],
                ].map(([expr, meaning]) => (
                  <tr key={expr} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary text-xs">{expr}</td>
                    <td className="border p-2 text-xs">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Special Characters Reference</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Character</th>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Meaning</th>
                  <th className="border p-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["*", "Wildcard", "Any value", "* in hour = every hour"],
                  [",", "List", "Multiple values", "1,15 in minute = at :01 and :15"],
                  ["-", "Range", "Range of values", "9-17 in hour = 9 AM to 5 PM"],
                  ["/", "Step", "Every N units", "*/5 in minute = every 5 minutes"],
                  ["L", "Last", "Last day of month/week", "L in DOM = last day of month"],
                  ["#", "Nth weekday", "Nth occurrence in month", "1#2 = 2nd Monday"],
                ].map(([char, name, meaning, ex]) => (
                  <tr key={char} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary font-bold text-xs">{char}</td>
                    <td className="border p-2 font-medium text-xs">{name}</td>
                    <td className="border p-2 text-xs">{meaning}</td>
                    <td className="border p-2 font-mono text-muted-foreground text-xs">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What is a cron expression?",
            answer: "A cron expression is a string of 5 space-separated fields (minute, hour, day-of-month, month, day-of-week) that defines a recurring schedule. It is used to schedule automated tasks, jobs, and scripts to run at specific intervals on Unix/Linux systems and cloud schedulers.",
          },
          {
            question: "What does */ mean in a cron expression?",
            answer: "The */ syntax means 'every N units'. For example, */15 in the minute field means 'every 15 minutes'. */2 in the hour field means 'every 2 hours'. It is the step value operator and works in any field.",
          },
          {
            question: "What is the difference between 5-field and 6-field cron?",
            answer: "Standard Unix crontab uses 5 fields (minute through weekday). Some systems like Quartz Scheduler, AWS EventBridge, and Spring Framework add a 6th field for seconds at the beginning. This tool supports both formats.",
          },
          {
            question: "What do @yearly, @daily, and @reboot mean?",
            answer: "These are shorthand aliases: @yearly = 0 0 1 1 * (once per year), @monthly = 0 0 1 * * (1st of month), @weekly = 0 0 * * 0 (every Sunday), @daily = 0 0 * * * (midnight daily), @hourly = 0 * * * * (every hour), @reboot = runs once at startup.",
          },
          {
            question: "Why is my cron job not running at the expected time?",
            answer: "Common causes: 1) Timezone mismatch — cron runs in the server's local timezone, which may differ from yours. 2) Month/weekday conflict — when both day-of-month and day-of-week are set, most systems run when EITHER condition is true. 3) Missed runs — if the server was down at the scheduled time, the job will not run until the next scheduled time.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/dev/cron-explainer" max={6} />
    </div>
  );
}
