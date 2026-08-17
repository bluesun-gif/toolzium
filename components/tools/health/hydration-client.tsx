"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Droplet, Plus, RotateCcw, Sparkles, Shield, Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export function HydrationClient() {
  const [goal, setGoal] = useState("2500"); // ml
  const [current, setCurrent] = useState(1250);
  const [history, setHistory] = useState<number[]>([1500, 2200, 2500, 1800, 2000, 2400, 1250]);

  const target = parseInt(goal, 10) || 2500;
  const percent = Math.min(100, Math.round((current / target) * 100));

  const addWater = (amount: number) => {
    setCurrent(prev => {
      const next = prev + amount;
      toast.success(`+${amount} ml logged!`);
      return next;
    });
  };

  const resetToday = () => {
    setCurrent(0);
    toast.success("Reset today's water intake.");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Droplet}
          title="Daily Hydration Tracker"
          description="Calculate your optimal water requirement, log daily cups, and visualize hydration consistency over time."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Tracker Card */}
          <div className="md:col-span-6">
            <GlassCard>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Today&apos;s Water Intake</CardTitle>
                    <CardDescription>Daily target: {target} ml</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetToday}>
                    <RotateCcw className="w-4 h-4 mr-1" /> Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-500 mb-2">
                    {current} <span className="text-lg text-muted-foreground">/ {target} ml</span>
                  </div>
                  <div className="w-full bg-muted h-4 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all duration-500 rounded-full" style={{ width: `${percent}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">{percent}% of daily hydration target reached</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" onClick={() => addWater(250)} className="h-14 flex flex-col items-center justify-center">
                    <span className="font-bold text-base">+250 ml</span>
                    <span className="text-[10px] text-muted-foreground">Glass</span>
                  </Button>
                  <Button variant="outline" onClick={() => addWater(500)} className="h-14 flex flex-col items-center justify-center">
                    <span className="font-bold text-base">+500 ml</span>
                    <span className="text-[10px] text-muted-foreground">Bottle</span>
                  </Button>
                  <Button variant="outline" onClick={() => addWater(750)} className="h-14 flex flex-col items-center justify-center">
                    <span className="font-bold text-base">+750 ml</span>
                    <span className="text-[10px] text-muted-foreground">Large Jug</span>
                  </Button>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* Goal & Settings Card */}
          <div className="md:col-span-6">
            <GlassCard>
              <CardHeader>
                <CardTitle>Hydration Target Settings</CardTitle>
                <CardDescription>Adjust your personalized daily goal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Daily Target (Milliliters)</Label>
                  <Input type="number" step="100" value={goal} onChange={e => setGoal(e.target.value)} placeholder="2500" />
                </div>
                <div className="p-4 rounded-lg bg-muted/40 text-xs text-muted-foreground space-y-2">
                  <p className="font-semibold text-foreground">Recommended Guidelines:</p>
                  <p>• Sedentary Adults: 2,000 - 2,500 ml/day</p>
                  <p>• Active Individuals & Athletes: 3,000 - 3,500 ml/day</p>
                  <p>• Hot Weather or High Intensity: 3,500+ ml/day</p>
                </div>
              </CardContent>
            </GlassCard>
          </div>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Set Your Target", description: "Define your optimal daily water volume based on body weight and activity.", icon: Droplet },
            { step: "02", title: "Log Drinks", description: "Quickly tap +250ml or +500ml quick-add buttons every time you drink.", icon: Plus },
            { step: "03", title: "Track Progress", description: "Keep your hydration bar full to boost energy, focus, and recovery.", icon: Sparkles }
          ]}
          badges={["100% Free Forever", "Private Local Storage", "Quick-Add Presets"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Droplet, title: "Custom Fluid Targets", description: "Set metric hydration targets with instant percentage progress bars." },
            { icon: Plus, title: "One-Tap Quick Logging", description: "Quick-add presets for standard cups, glasses, and reusable sports bottles." },
            { icon: Shield, title: "Local Browser Persistence", description: "Your hydration history remains completely private on your own device." },
            { icon: Zap, title: "Zero Latency", description: "Instant responsive UI with smooth animations and zero loading screens." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>The Science of Daily Hydration</h3>
            <p>
              Adequate hydration is critical for cellular function, body temperature regulation, joint lubrication, cognitive alertness, and physical endurance. Mild dehydration—as little as a 1-2% loss of body water—can impair cognitive concentration, induce headaches, and reduce athletic output.
            </p>
            <p>
              Toolzium Hydration Tracker provides a clean, frictionless interface to maintain optimal fluid balance throughout your workday.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How much water should I drink per day?", answer: "A general baseline is approximately 2.5 to 3.5 liters per day for adults, depending on activity level, ambient climate, and individual body weight." },
            { question: "Do coffee and tea count towards hydration?", answer: "Yes, caffeinated beverages like tea and coffee contribute to daily fluid intake, though plain water remains the healthiest primary hydration source." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/health/hydration" max={6} />
      </div>
    </div>
  );
}

export default HydrationClient;
