"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { HeartPulse, Calendar, Clock, Heart, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function DueDateClient() {
 const [lmpDate, setLmpDate] = useState<string>(() => {
 const today = new Date();
 today.setMonth(today.getMonth() - 2);
 return today.toISOString().split('T')[0];
 });

 const {
 dueDate,
 conceptionDate,
 currentWeek,
 currentDay,
 trimester,
 daysRemaining,
 milestones
 } = useMemo(() => {
 if (!lmpDate) return { dueDate: null, conceptionDate: null, currentWeek: 0, currentDay: 0, trimester: 1, daysRemaining: 0, milestones: [] };

 const lmp = new Date(lmpDate);
 if (isNaN(lmp.getTime())) return { dueDate: null, conceptionDate: null, currentWeek: 0, currentDay: 0, trimester: 1, daysRemaining: 0, milestones: [] };

 // Naegele's rule: add 280 days
 const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
 const conception = new Date(lmp.getTime() + 14 * 24 * 60 * 60 * 1000);

 const today = new Date();
 const diffTime = today.getTime() - lmp.getTime();
 const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
 
 const weeks = Math.floor(diffDays / 7);
 const days = diffDays % 7;
 
 let curWeek = 0;
 let curDay = 0;
 let daysRem = 0;
 let trim = 1;
 
 if (diffDays >= 0 && diffDays <= 294) { 
 curWeek = weeks;
 curDay = days;
 daysRem = Math.max(0, 280 - diffDays);
 if (weeks < 13) trim = 1;
 else if (weeks < 27) trim = 2;
 else trim = 3;
 }

 const ms = [
 { name:"First Heartbeat (approx)", date: new Date(lmp.getTime() + 6 * 7 * 24 * 60 * 60 * 1000), week: 6 },
 { name:"End of First Trimester", date: new Date(lmp.getTime() + 13 * 7 * 24 * 60 * 60 * 1000), week: 13 },
 { name:"First Kick (approx)", date: new Date(lmp.getTime() + 20 * 7 * 24 * 60 * 60 * 1000), week: 20 },
 { name:"Viability", date: new Date(lmp.getTime() + 24 * 7 * 24 * 60 * 60 * 1000), week: 24 },
 { name:"Full Term", date: new Date(lmp.getTime() + 37 * 7 * 24 * 60 * 60 * 1000), week: 37 },
 { name:"Estimated Due Date", date: due, week: 40 },
 ];

 return {
 dueDate: due,
 conceptionDate: conception,
 currentWeek: curWeek,
 currentDay: curDay,
 trimester: trim,
 daysRemaining: daysRem,
 milestones: ms
 };
 }, [lmpDate]);

 const handleReset = () => {
 const today = new Date();
 today.setMonth(today.getMonth() - 2);
 setLmpDate(today.toISOString().split('T')[0]);
 };

 const formatDate = (date: Date | null) => {
 if (!date) return"";
 return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
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
 icon={HeartPulse}
 title="Pregnancy Due Date Calculator"
 description="Estimate your due date and track key milestones based on your last menstrual period."
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
 <Calendar className="h-5 w-5"/> Details
 </CardTitle>
 <CardDescription>Enter the first day of your last period</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>First Day of Last Menstrual Period (LMP)</Label>
 <Input
 type="date"
 value={lmpDate}
 onChange={(e) => setLmpDate(e.target.value)}
 />
 </div>
 
 <Separator className="my-4"/>
 
 <div className="space-y-2">
 <p className="text-sm text-muted-foreground mb-1">Estimated Conception Date:</p>
 <p className="font-medium">{formatDate(conceptionDate)}</p>
 </div>
 
 <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 text-center">
 <p className="text-sm font-medium text-primary mb-1">Estimated Due Date</p>
 <p className="text-2xl font-bold text-primary">{formatDate(dueDate)}</p>
 </div>

 <div className="text-xs text-muted-foreground pt-2">
 <strong>Disclaimer:</strong> This calculator is for informational purposes only. Only 4% of babies are born on their exact due date. Please consult your healthcare provider for medical advice.
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Clock className="h-5 w-5"/> Timeline & Progress
 </CardTitle>
 <CardDescription>Your current status and upcoming milestones</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 
 {currentWeek > 0 && currentWeek <= 42 ? (
 <div className="grid grid-cols-3 gap-2 text-center mb-6">
 <div className="bg-secondary p-2 rounded-md">
 <p className="text-xs text-muted-foreground">Current</p>
 <p className="font-bold">{currentWeek}w {currentDay}d</p>
 </div>
 <div className="bg-secondary p-2 rounded-md">
 <p className="text-xs text-muted-foreground">Trimester</p>
 <p className="font-bold">{trimester}</p>
 </div>
 <div className="bg-secondary p-2 rounded-md">
 <p className="text-xs text-muted-foreground">Days Left</p>
 <p className="font-bold">{daysRemaining}</p>
 </div>
 </div>
 ) : (
 <p className="text-sm text-muted-foreground text-center italic mb-4">Date is outside the typical pregnancy range.</p>
 )}

 <div className="space-y-4">
 <h4 className="font-semibold text-sm">Key Milestones</h4>
 <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary before:to-transparent">
 {milestones.map((m, i) => (
 <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
 <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-primary text-primary-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
 <Heart className="w-3 h-3"/>
 </div>
 <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-border bg-card shadow-sm">
 <div className="flex items-center justify-between mb-1">
 <div className="font-bold text-sm text-primary">Week {m.week}</div>
 <time className="text-xs font-medium text-muted-foreground">{m.date.toLocaleDateString()}</time>
 </div>
 <div className="text-xs text-muted-foreground">{m.name}</div>
 </div>
 </div>
 ))}
 </div>
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
          <h3>Why Use Our Pregnancy Due Date Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Pregnancy Due Date Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/due-date" max={6} />

</div>
 );
}
