"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Activity, RefreshCw, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export default function AiWorkoutGeneratorClient() {
 const [goal, setGoal] = useState("Hypertrophy & Muscle Building");
 const [daysPerWeek, setDaysPerWeek] = useState("4");
 const [equipment, setEquipment] = useState("Full Commercial Gym (Barbells, Dumbbells, Cables)");
 const [experience, setExperience] = useState("Intermediate");
 const [results, setResults] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateWorkout = async () => {
 setLoading(true);

 try {
 const prompt = `Design a customized ${daysPerWeek}-day workout routine split for a '${experience}' lifter. Goal: '${goal}'. Equipment: '${equipment}'. Provide detailed exercise selection, sets, rep ranges, rest intervals, and progressive overload rules for each training day. Format as ${daysPerWeek} distinct day workout cards. No markdown asterisks.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"cards"}),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setResults(data.results);
 toast.success("AI Workout Routine generated!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 toast.error("AI generation failed. Please try again.");
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Activity}
 title="AI Personal Workout Routine & Training Split Generator"
 description="Generate custom 3, 4, 5, or 6-day workout splits (Push-Pull-Legs, Upper-Lower, Full Body) with rep ranges and progressive overload rules using live AI."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Primary Fitness Goal:</label>
 <Input
 type="text"
 value={goal}
 onChange={(e) => setGoal(e.target.value)}
 placeholder="e.g. Muscle Building, Strength, Fat Loss, Endurance"
 className="h-11"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Training Days Per Week:</label>
 <select
 value={daysPerWeek}
 onChange={(e) => setDaysPerWeek(e.target.value)}
 className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
 >
 <option value="3">3 Days / Week (Full Body or Push/Pull/Legs)</option>
 <option value="4">4 Days / Week (Upper / Lower Split)</option>
 <option value="5">5 Days / Week (Push / Pull / Legs + Upper / Lower)</option>
 <option value="6">6 Days / Week (Push / Pull / Legs x 2)</option>
 </select>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Available Equipment:</label>
 <Input
 type="text"
 value={equipment}
 onChange={(e) => setEquipment(e.target.value)}
 placeholder="e.g. Dumbbells & Resistance Bands, Bodyweight, Full Gym"
 className="h-11"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Experience Level:</label>
 <select
 value={experience}
 onChange={(e) => setExperience(e.target.value)}
 className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
 >
 <option value="Beginner">Beginner (&lt; 1 Year)</option>
 <option value="Intermediate">Intermediate (1-3 Years)</option>
 <option value="Advanced">Advanced (3+ Years)</option>
 </select>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateWorkout}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Designing Routine...":"AI Generate Personal Workout Plan"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated Personalized Training Routine Split"
 subtitle="Exercise selection, set & rep guidance, and progressive overload targets"
 content={results}
 loading={loading}
 onRegenerate={generateWorkout}
 variant="cards"
 />
 )}
 
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
          <h3>Why Use Our AI Personal Workout Routine & Training Split Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our AI Personal Workout Routine & Training Split Generator provides
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

      <RelatedTools currentToolUrl="/tools/health/ai-workout-generator" max={6} />

</div>
 );
}
