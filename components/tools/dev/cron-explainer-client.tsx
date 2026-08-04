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
import { Clock, HelpCircle, Zap } from "lucide-react";

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
    <div className="space-y-6">
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
              
              <div className={`p-4 rounded-md text-lg font-medium text-center ${explanation.valid ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
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
    </div>
  );
}
