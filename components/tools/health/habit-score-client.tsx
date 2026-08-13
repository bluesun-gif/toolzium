"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Award, Activity, TrendingUp, Calendar, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { ResetButton } from"@/components/shared/action-buttons";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
 icon={Award}
 title="Habit Score Calculator"
 description="Rate your daily habits and get a wellness score."
 actions={<ResetButton onClick={reset} label="Reset"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Daily Inputs</CardTitle>
 <CardDescription>Enter your habits for today</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Sleep (hours)</Label>
 <Input type="number"min={0} max={24} value={sleep} onChange={(e) => setSleep(Number(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Exercise (minutes)</Label>
 <Input type="number"min={0} value={exercise} onChange={(e) => setExercise(Number(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Water (glasses)</Label>
 <Input type="number"min={0} value={water} onChange={(e) => setWater(Number(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Meditation/Mindfulness (minutes)</Label>
 <Input type="number"min={0} value={meditation} onChange={(e) => setMeditation(Number(e.target.value) || 0)} />
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
 {score >= 80 ?"Excellent Habits! Keep it up!": 
 score >= 60 ?"Good job, but room for improvement.": 
 score >= 40 ?"Fair. Focus on building consistency.": 
"Needs work. Start small!"}
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
          <h3>Why Use Our Habit Score Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Habit Score Calculator provides
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

      <RelatedTools currentToolUrl="/tools/health/habit-score" max={6} />

</div>
 );
}
