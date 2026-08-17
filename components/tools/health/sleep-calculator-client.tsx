"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Moon, Sun, Clock, Sparkles, Shield, Zap, Bed } from "lucide-react";
import { cn } from "@/lib/utils";

export function SleepCalculatorClient() {
  const [mode, setMode] = useState<"wake" | "sleep">("wake");
  const [targetTime, setTargetTime] = useState("07:00");
  const [fallAsleepMins, setFallAsleepMins] = useState("15");

  const calculateCycles = () => {
    const [h, m] = targetTime.split(":").map(Number);
    const targetDate = new Date();
    targetDate.setHours(h, m, 0, 0);

    const fallAsleep = parseInt(fallAsleepMins, 10) || 15;
    const cycles = [6, 5, 4, 3]; // 90 min cycles: 9h, 7.5h, 6h, 4.5h

    return cycles.map(c => {
      const cycleMins = c * 90;
      const d = new Date(targetDate);
      if (mode === "wake") {
        // Calculate bedtime when waking up at targetTime
        d.setMinutes(d.getMinutes() - (cycleMins + fallAsleep));
      } else {
        // Calculate wake time when going to bed at targetTime
        d.setMinutes(d.getMinutes() + cycleMins + fallAsleep);
      }
      const timeStr = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
      const hours = (cycleMins / 60).toFixed(1);
      const isOptimal = c === 5 || c === 6;
      return {
        cycles: c,
        time: timeStr,
        hours,
        isOptimal,
        category: c >= 5 ? "Optimal" : c === 4 ? "Acceptable" : "Minimum"
      };
    });
  };

  const results = calculateCycles();

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Moon}
          title="Sleep Cycle Calculator"
          description="Calculate the ideal bedtime or wake-up time based on natural 90-minute REM sleep cycles."
        />

        <GlassCard>
          <CardHeader>
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <CardTitle>Sleep Cycle Mode</CardTitle>
                <CardDescription>Choose whether you want to calculate when to wake up or when to fall asleep.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={mode === "wake" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMode("wake")}
                >
                  <Sun className="w-4 h-4 mr-2" /> I need to wake up at...
                </Button>
                <Button
                  variant={mode === "sleep" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMode("sleep")}
                >
                  <Moon className="w-4 h-4 mr-2" /> I am going to bed at...
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{mode === "wake" ? "Desired Wake-Up Time" : "Planned Bedtime"}</Label>
                <Input
                  type="time"
                  value={targetTime}
                  onChange={e => setTargetTime(e.target.value)}
                  className="text-lg font-mono"
                />
              </div>
              <div>
                <Label>Time to Fall Asleep (Minutes)</Label>
                <Input
                  type="number"
                  value={fallAsleepMins}
                  onChange={e => setFallAsleepMins(e.target.value)}
                  placeholder="15"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">
                {mode === "wake" ? "Recommended Bedtimes (to wake up refreshed):" : "Recommended Wake-Up Times:"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {results.map(r => (
                  <div
                    key={r.cycles}
                    className={cn(
                      "p-4 rounded-xl border flex flex-col justify-between space-y-2",
                      r.isOptimal
                        ? "bg-green-500/10 border-green-500/40 text-foreground"
                        : "bg-muted/40 border-border/60 text-muted-foreground"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider">{r.category}</span>
                      <span className="text-xs">{r.cycles} Cycles</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground font-mono">{r.time}</div>
                    <div className="text-xs">{r.hours} Hours of restorative sleep</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Select Mode", description: "Choose whether you have a fixed alarm time or are planning your bedtime.", icon: Clock },
            { step: "02", title: "Calculate 90-Min Cycles", description: "The calculator maps REM cycles backwards or forwards.", icon: Moon },
            { step: "03", title: "Wake Up Energized", description: "Waking up at the end of a sleep cycle prevents grogginess (sleep inertia).", icon: Sun }
          ]}
          badges={["100% Free Forever", "Scientific 90-Min Cycles", "Instant Local Calculation"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Moon, title: "REM Cycle Synchronization", description: "Aligns your rest schedule with biological 90-minute sleep architectures." },
            { icon: Clock, title: "Latency Offset", description: "Accounts for the average 15-minute sleep latency required to fall asleep." },
            { icon: Sun, title: "Prevent Sleep Inertia", description: "Avoid waking in the middle of deep Slow-Wave Sleep (SWS)." },
            { icon: Shield, title: "100% Private", description: "Zero server storage. Sleep calculations execute locally in your web browser." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>The Science of Ultradian Sleep Cycles</h3>
            <p>
              Human sleep is structured into repeating ultradian cycles lasting approximately 90 to 110 minutes each. A complete cycle encompasses Light Sleep (N1 &amp; N2), Deep Slow-Wave Sleep (N3), and Rapid Eye Movement (REM) sleep. Waking up in the middle of deep sleep causes severe grogginess known as sleep inertia.
            </p>
            <p>
              By synchronizing your alarm with the completion of a full 90-minute cycle, you emerge feeling refreshed and energized.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How long is a typical sleep cycle?", answer: "An average adult sleep cycle lasts approximately 90 minutes (ranging between 80 and 110 minutes)." },
            { question: "How many sleep cycles do I need per night?", answer: "Most healthy adults require 5 to 6 full cycles (7.5 to 9 hours of total sleep) each night." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/health/sleep-calculator" max={6} />
      </div>
    </div>
  );
}

export default SleepCalculatorClient;
