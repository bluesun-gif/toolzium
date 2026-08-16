"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { Bell, CheckCircle, Droplet, Droplets, GlassWater, PieChart, Plus } from"lucide-react";
import { toast } from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { Droplet, Plus, CheckCircle, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function HydrationTrackerClient() {
  const [goal, setGoal] = useState<number>(2000);
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    const savedGoal = localStorage.getItem("hydrationGoal");
    const savedCurrent = localStorage.getItem("hydrationCurrent");
    const lastDate = localStorage.getItem("hydrationDate");
    const today = new Date().toDateString();
    if (savedGoal) setGoal(Number(savedGoal));
    if (lastDate === today && savedCurrent) {
      setCurrent(Number(savedCurrent));
    } else {
      localStorage.setItem("hydrationDate", today);
      setCurrent(0);
    }
  }, []);
  const updateCurrent = (val: number) => {
    const newVal = Math.max(0, current + val);
    setCurrent(newVal);
    localStorage.setItem("hydrationCurrent", String(newVal));
    if (newVal >= goal && current < goal) {
      toast.success("Goal reached! Great job staying hydrated.");
    }
  };
  const handleSetGoal = (val: string) => {
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      setGoal(num);
      localStorage.setItem("hydrationGoal", String(num));
    }
  };
  const percentage = Math.min(100, Math.round(current / goal * 100));
  const handleReset = () => {
    setCurrent(0);
    localStorage.setItem("hydrationCurrent", "0");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Hydration & Daily Water Tracker" description="Track your water intake and achieve your daily hydration goals." icon={Droplet} actions={<div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset Day" />
 </div>} />
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Settings & Tracking</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Daily Goal (ml)</Label>
 <Input type="number" value={goal} onChange={e => handleSetGoal(e.target.value)} />
 </div>
 
 <div className="pt-4 space-y-2">
 <Label>Quick Add</Label>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
 <Button variant="outline" onClick={() => updateCurrent(250)} className="w-full flex items-center justify-center gap-1">
 <Plus className="w-4 h-4" /> 250ml
 </Button>
 <Button variant="outline" onClick={() => updateCurrent(500)} className="w-full flex items-center justify-center gap-1">
 <Plus className="w-4 h-4" /> 500ml
 </Button>
 <Button variant="outline" onClick={() => updateCurrent(750)} className="w-full flex items-center justify-center gap-1">
 <Plus className="w-4 h-4" /> 750ml
 </Button>
 <Button variant="outline" onClick={() => updateCurrent(1000)} className="w-full flex items-center justify-center gap-1">
 <Plus className="w-4 h-4" /> 1L
 </Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Progress</CardTitle>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center space-y-6">
 <div className="relative w-40 h-40 rounded-full border-4 border-primary/20 overflow-hidden flex items-center justify-center bg-card">
 <div className={"absolute bottom-0 w-full bg-blue-500/50 transition-all duration-1000 ease-out"} style={{
                height: percentage + "%"
              }} />
 <div className="relative z-10 flex flex-col items-center">
 <span className="text-3xl font-bold">{percentage}%</span>
 <span className="text-sm text-muted-foreground">{current} / {goal} ml</span>
 </div>
 </div>
 {percentage >= 100 && <div className="flex items-center gap-2 text-green-500 font-semibold">
 <CheckCircle className="w-5 h-5" /> Goal Achieved
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Goal",
    description:"Enter your daily target.",
    icon: Droplets,
  },
{
    step:"02",
    title:"Log Drinks",
    description:"Record each glass or bottle.",
    icon: GlassWater,
  },
{
    step:"03",
    title:"Monitor",
    description:"See progress to goal.",
    icon: PieChart,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Droplets,
    title:"Goal Based",
    description:"Your personal target.",
  },
{
    icon: GlassWater,
    title:"Quick Log",
    description:"Tap to add a drink.",
  },
{
    icon: PieChart,
    title:"Progress",
    description:"Visual fill to goal.",
  },
{
    icon: Bell,
    title:"Reminders",
    description:"Prompt regular sips.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A hydration tracker turns a vague &quot;drink more water&quot; into a measured daily habit. By setting a personalized goal and logging each drink, you see progress fill toward target. This tool makes hydration visible, which is what sustains it.</p>
  <p>Logging is the mechanism. Quick taps after each glass build an accurate picture, revealing patterns like afternoon slumps where intake lags. The visual progress bar motivates completion better than an abstract recommendation.</p>
  <p>Use it alongside activity; sweaty sessions raise needs. The tool's value is accountability: a simple, tracked target that keeps hydration consistent, supporting focus and energy throughout the day.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why track water?",
    answer:"Consistency supports energy and focus.",
  },
{
    question:"How much?",
    answer:"Weight and activity based.",
  },
{
    question:"Coffee counts?",
    answer:"Mildly; water is primary.",
  },
{
    question:"Signs of low?",
    answer:"Thirst, headache, dark urine.",
  },
{
    question:"Overdo it?",
    answer:"Unlikely but balance.",
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
          <h3>Why Use Our Hydration & Daily Water Tracker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Hydration & Daily Water Tracker provides
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

      <RelatedTools currentToolUrl="/tools/health/hydration-tracker" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
