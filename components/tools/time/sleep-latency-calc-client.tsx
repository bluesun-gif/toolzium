"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { Moon, Clock, Shield, Sparkles, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
export function SleepLatencyClient() {
  const [time, setTime] = useState("07:00");
  const [mode, setMode] = useState("wake"); // wake or sleep

  const calculateTimes = () => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    const sleepLatencyMs = 15 * 60 * 1000;
    const cycleMs = 90 * 60 * 1000;
    const formatTime = (d: Date) => {
      return d.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    };
    const results = [];
    if (mode === "wake") {
      // Calculate bedtime (subtract cycles + latency)
      for (let cycles = 6; cycles >= 4; cycles--) {
        const bedTime = new Date(date.getTime() - cycles * cycleMs - sleepLatencyMs);
        results.push({
          cycles,
          hours: cycles * 90 / 60,
          time: formatTime(bedTime)
        });
      }
    } else {
      // Calculate wake time (add latency + cycles)
      for (let cycles = 4; cycles <= 6; cycles++) {
        const wakeTime = new Date(date.getTime() + sleepLatencyMs + cycles * cycleMs);
        results.push({
          cycles,
          hours: cycles * 90 / 60,
          time: formatTime(wakeTime)
        });
      }
    }
    return results;
  };
  const times = calculateTimes();
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Sleep Latency & Sleep Onset Calculator" description="Calculate optimal bedtimes based on sleep latency and 90-minute REM sleep cycles." icon={Moon} actions={<>
 <ResetButton onClick={() => {
          setTime("07:00");
          setMode("wake");
        }} label="Reset" />
 </>} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" /> Target Time</CardTitle>
 <CardDescription>Enter your target time to get optimal {mode === "wake" ? "bedtimes" : "wake times"}.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>I want to calculate my:</Label>
 <Select value={mode} onValueChange={setMode}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="wake">Bedtime (I know when I need to wake up)</SelectItem>
 <SelectItem value="sleep">Wake time (I am going to bed at)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Time</Label>
 <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
 </div>
 
 <div className="p-4 bg-muted/50 rounded-lg border mt-4">
 <p className="text-sm">
 <strong>Diagnostic Note:</strong> This calculator assumes an average <strong>sleep latency of 15 minutes</strong> (the time it takes to fall asleep). Sleep cycles last approximately 90 minutes.
 </p>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Optimal {mode === "wake" ? "Bedtimes" : "Wake Times"}</CardTitle>
 <CardDescription>Based on full 90-minute sleep cycles + 15 min to fall asleep</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {times.map((t, idx) => <div key={idx} className={cn("p-4 rounded-lg border flex justify-between items-center", idx === 1 ? "bg-primary/10 border-primary/20" : "")}>
 <div>
 <div className="font-bold text-2xl">{t.time}</div>
 <div className="text-sm text-muted-foreground">{t.cycles} sleep cycles</div>
 </div>
 <div className="text-right">
 <div className={cn("font-semibold", idx === 1 ? "text-primary" : "")}>{t.hours} hours sleep</div>
 <div className="text-xs text-muted-foreground">{idx === 1 ? "Recommended" : "Good"}</div>
 </div>
 </div>)}
 </CardContent>
 </GlassCard>
 </div>
 
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
          <h3>Why Use Our Sleep Latency & Sleep Onset Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Sleep Latency & Sleep Onset Calculator provides
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

      <RelatedTools currentToolUrl="/tools/time/sleep-latency-calc" max={6} />

    </div></div>;
}