"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Flame, Clock, Play, History, Square, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

type Protocol ="16:8"|"18:6"|"20:4"|"24"|"36";

export function FastingTrackerClient() {
 const [protocol, setProtocol] = useState<Protocol>("16:8");
 const [isFasting, setIsFasting] = useState(false);
 const [startTime, setStartTime] = useState<number | null>(null);
 const [elapsedHours, setElapsedHours] = useState(0);

 const getTargetHours = (p: Protocol) => {
 switch (p) {
 case"16:8": return 16;
 case"18:6": return 18;
 case"20:4": return 20;
 case"24": return 24;
 case"36": return 36;
 default: return 16;
 }
 };

 useEffect(() => {
 let interval: any;
 if (isFasting && startTime) {
 interval = setInterval(() => {
 const now = Date.now();
 const diffHrs = (now - startTime) / (1000 * 60 * 60);
 setElapsedHours(diffHrs);
 }, 60000); // update every min
 }
 return () => clearInterval(interval);
 }, [isFasting, startTime]);

 const toggleFasting = () => {
 if (isFasting) {
 setIsFasting(false);
 toast.success("Fasting completed!");
 } else {
 setIsFasting(true);
 setStartTime(Date.now());
 setElapsedHours(0);
 toast.success("Fasting started!");
 }
 };

 const resetTimer = () => {
 setIsFasting(false);
 setStartTime(null);
 setElapsedHours(0);
 toast.success("Reset successful");
 };

 const getFastingState = (hours: number) => {
 if (hours < 12) return"Anabolic (Fed state)";
 if (hours < 14) return"Catabolic (Early fasting)";
 if (hours < 16) return"Fat Burning (Ketosis begins)";
 if (hours < 24) return"Ketosis (Deep fat burning)";
 return"Autophagy (Cellular repair)";
 };

 const targetHours = getTargetHours(protocol);
 const progressPercent = Math.min(100, (elapsedHours / targetHours) * 100);

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Flame}
 title="Intermittent Fasting Tracker"
 description="Track your fasts, monitor your bodily states, and view history."
 actions={
 <React.Fragment>
 <ResetButton onClick={resetTimer} label="Reset"/>
 </React.Fragment>
 }
 />
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Tracker</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6 text-center">
 <div className="space-y-2 text-left">
 <Label>Fasting Protocol</Label>
 <Select value={protocol} onValueChange={(v) => setProtocol(v as Protocol)} disabled={isFasting}>
 <SelectTrigger>
 <SelectValue placeholder="Select protocol"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="16:8">16:8 (16h fast, 8h feed)</SelectItem>
 <SelectItem value="18:6">18:6 (18h fast, 6h feed)</SelectItem>
 <SelectItem value="20:4">20:4 (Warrior Diet)</SelectItem>
 <SelectItem value="24">24h (Monk Fast)</SelectItem>
 <SelectItem value="36">36h (Extended)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className={cn("w-48 h-48 mx-auto rounded-full border-8 flex items-center justify-center", (progressPercent >= 100 ?"border-green-500":"border-blue-500"))}>
 <div className="text-center">
 <div className="text-4xl font-bold">{elapsedHours.toFixed(2)}h</div>
 <div className="text-sm text-muted-foreground">of {targetHours}h</div>
 </div>
 </div>

 <Button size="lg"className="w-full"onClick={toggleFasting} variant={isFasting ?"destructive":"default"}>
 {isFasting ? <Square className="mr-2 w-4 h-4"/> : <Play className="mr-2 w-4 h-4"/>}
 {isFasting ?"Stop Fasting":"Start Fasting"}
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Status & Info</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div>
 <h3 className="font-semibold text-lg">Current State</h3>
 <p className="text-muted-foreground">{getFastingState(elapsedHours)}</p>
 </div>
 <Separator />
 <div>
 <h3 className="font-semibold text-lg">Summary</h3>
 <p>Target Goal: {targetHours} hours</p>
 <p>Progress: {progressPercent.toFixed(1)}%</p>
 </div>
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
          <h3>Why Use Our Intermittent Fasting Tracker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Intermittent Fasting Tracker provides
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

      <RelatedTools currentToolUrl="/tools/health/fasting-tracker" max={6} />

</div>
 );
}
