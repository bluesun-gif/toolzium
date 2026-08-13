"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { Heart, Activity, Calculator, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type ZoneInfo = {
 name: string;
 min: number;
 max: number;
 color: string;
 description: string;
};

export function HeartRateZonesClient() {
 const [age, setAge] = useState<string>("30");
 const [restingHr, setRestingHr] = useState<string>("60");
 const [customMaxHr, setCustomMaxHr] = useState<string>("");
 const [method, setMethod] = useState<"standard"|"karvonen">("karvonen");
 
 const { maxHr, zones } = useMemo(() => {
 const ageNum = parseInt(age) || 30;
 const restHrNum = parseInt(restingHr) || 60;
 
 let calculatedMaxHr = 220 - ageNum;
 if (customMaxHr && !isNaN(parseInt(customMaxHr))) {
 calculatedMaxHr = parseInt(customMaxHr);
 }
 
 const getHr = (percent: number) => {
 if (method ==="karvonen") {
 const hrr = calculatedMaxHr - restHrNum; // Heart Rate Reserve
 return Math.round(restHrNum + (hrr * percent));
 } else {
 return Math.round(calculatedMaxHr * percent);
 }
 };

 const calculatedZones: ZoneInfo[] = [
 { name:"Recovery", min: getHr(0.5), max: getHr(0.6), color:"bg-gray-400", description:"50-60%: Very light, aids recovery"},
 { name:"Fat Burn", min: getHr(0.6), max: getHr(0.7), color:"bg-blue-400", description:"60-70%: Light, builds endurance"},
 { name:"Cardio", min: getHr(0.7), max: getHr(0.8), color:"bg-green-400", description:"70-80%: Moderate, aerobic fitness"},
 { name:"Threshold", min: getHr(0.8), max: getHr(0.9), color:"bg-orange-400", description:"80-90%: Hard, increases lactate threshold"},
 { name:"Maximum", min: getHr(0.9), max: getHr(1.0), color:"bg-red-500", description:"90-100%: Very hard, peak performance"}
 ];

 return { maxHr: calculatedMaxHr, zones: calculatedZones };
 }, [age, restingHr, customMaxHr, method]);

 const handleReset = () => {
 setAge("30");
 setRestingHr("60");
 setCustomMaxHr("");
 setMethod("karvonen");
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
 icon={Heart}
 title="Heart Rate Zone Calculator"
 description="Calculate your optimal heart rate training zones using standard or Karvonen methods."
 actions={
 <>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="h-5 w-5"/> Inputs
 </CardTitle>
 <CardDescription>Enter your stats</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Age (years)</Label>
 <Input
 type="number"
 value={age}
 onChange={(e) => setAge(e.target.value)}
 min="1"
 max="120"
 />
 </div>
 
 <div className="space-y-2">
 <Label>Resting Heart Rate (BPM)</Label>
 <Input
 type="number"
 value={restingHr}
 onChange={(e) => setRestingHr(e.target.value)}
 min="30"
 max="150"
 />
 </div>

 <div className="space-y-2">
 <Label>Custom Max HR (optional)</Label>
 <Input
 type="number"
 value={customMaxHr}
 onChange={(e) => setCustomMaxHr(e.target.value)}
 placeholder="Auto-calculated if blank"
 min="100"
 max="250"
 />
 </div>

 <div className="space-y-2">
 <Label>Calculation Method</Label>
 <Select value={method} onValueChange={(val:"standard"|"karvonen") => setMethod(val)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="karvonen">Karvonen (Factors Resting HR)</SelectItem>
 <SelectItem value="standard">Standard (% of Max HR)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Activity className="h-5 w-5"/> Results
 </CardTitle>
 <CardDescription>Your Max HR: <span className="font-bold text-lg">{maxHr} BPM</span></CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-4">
 {zones.map((zone, idx) => (
 <div key={idx} className="space-y-1">
 <div className="flex justify-between text-sm font-medium">
 <span>{zone.name} ({zone.min} - {zone.max} BPM)</span>
 </div>
 <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
 <div className={cn("h-full", zone.color)} style={{ width: '100%' }}></div>
 </div>
 <p className="text-xs text-muted-foreground">{zone.description}</p>
 </div>
 ))}
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
          <h3>Why Use Our Heart Rate Zone Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Heart Rate Zone Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/heart-rate-zones" max={6} />

</div>
 );
}
