"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Activity, Award, Calculator, Calendar, ListChecks, SlidersHorizontal, TrendingUp } from"lucide-react";
import { ResetButton } from"@/components/shared/action-buttons";

export function HabitScoreClient() {
  const [sleep, setSleep] = useState(7);
  const [exercise, setExercise] = useState(30);
  const [water, setWater] = useState(4);
  const [meditation, setMeditation] = useState(0);
  const calculateScore = () => {
    let score = 0;
    // Sleep: up to 8 hours gets points
    score += Math.min(sleep / 8, 1) * 25;
    // Exercise: up to 60 mins gets points
    score += Math.min(exercise / 60, 1) * 25;
    // Water: up to 8 glasses gets points
    score += Math.min(water / 8, 1) * 25;
    // Meditation: up to 20 mins gets points
    score += Math.min(meditation / 20, 1) * 25;
    return Math.round(score);
  };
  const score = calculateScore();
  const reset = () => {
    setSleep(7);
    setExercise(30);
    setWater(4);
    setMeditation(0);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Award} title="Habit Score Calculator" description="Rate your daily habits and get a wellness score." actions={<ResetButton onClick={reset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Daily Inputs</CardTitle>
 <CardDescription>Enter your habits for today</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Sleep (hours)</Label>
 <Input type="number" min={0} max={24} value={sleep} onChange={e => setSleep(Number(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Exercise (minutes)</Label>
 <Input type="number" min={0} value={exercise} onChange={e => setExercise(Number(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Water (glasses)</Label>
 <Input type="number" min={0} value={water} onChange={e => setWater(Number(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Meditation/Mindfulness (minutes)</Label>
 <Input type="number" min={0} value={meditation} onChange={e => setMeditation(Number(e.target.value) || 0)} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Your Score</CardTitle>
 <CardDescription>Out of 100</CardDescription>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center space-y-6 min-h-[300px]">
 <div className="text-8xl font-black text-primary drop-shadow-sm">
 {score}
 </div>
 <div className="text-xl font-medium text-muted-foreground text-center">
 {score >= 80 ? "Excellent Habits! Keep it up!" : score >= 60 ? "Good job, but room for improvement." : score >= 40 ? "Fair. Focus on building consistency." : "Needs work. Start small!"}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"List Habits",
    description:"Add your daily habits.",
    icon: ListChecks,
  },
{
    step:"02",
    title:"Weight",
    description:"Score importance per habit.",
    icon: SlidersHorizontal,
  },
{
    step:"03",
    title:"Compute",
    description:"See your consistency score.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListChecks,
    title:"Habit List",
    description:"Track what matters.",
  },
{
    icon: SlidersHorizontal,
    title:"Weighting",
    description:"Prioritize key habits.",
  },
{
    icon: Calculator,
    title:"Score",
    description:"Single progress number.",
  },
{
    icon: TrendingUp,
    title:"Trend",
    description:"Improve over time.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A habit score calculator converts daily behaviors into a single progress metric, making consistency visible. By listing habits and weighting their importance, you get a score reflecting how well you lived your intentions today. This tool turns vague &quot;be better&quot; goals into tracked actions.</p>
  <p>Weighting is the insight. Not all habits matter equally; prioritizing the few that move your goals prevents dilution across too many. The score then reflects what truly counts, guiding focus. Small daily reps compound into large change, and the number makes that tangible.</p>
  <p>Track daily for momentum. The score rewards showing up, not perfection, which sustains motivation better than all-or-nothing thinking. The tool's value is quantifying the behaviors that actually drive your outcomes, so effort becomes measurable.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a habit score?",
    answer:"A measure of how consistently you perform chosen habits.",
  },
{
    question:"Why weight them?",
    answer:"Some habits matter more to your goals.",
  },
{
    question:"How to improve?",
    answer:"Small, daily reps compound.",
  },
{
    question:"Daily or weekly?",
    answer:"Daily tracking builds momentum.",
  },
{
    question:"Useful for goals?",
    answer:"Yes, ties actions to outcomes.",
  }
  ]}
/>
</div>
 );
}
