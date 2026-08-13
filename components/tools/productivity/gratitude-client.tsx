"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Heart, Calendar, Sparkles, ChevronLeft, ChevronRight, Save, Shield, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const PROMPTS = [
  "What made you smile today?",
  "Who helped or supported you recently?",
  "What is a small personal win you experienced?",
  "What is something beautiful you observed in nature?",
  "What is a challenge that taught you a valuable lesson?",
  "What comfort or blessing do you often take for granted?",
];

export function GratitudeClient() {
  const [entries, setEntries] = useState<Record<string, string[]>>({});
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentItems, setCurrentItems] = useState<string[]>(["", "", ""]);
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("tz_gratitude_entries");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const dateString = currentDate.toISOString().split("T")[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (entries[dateString]) {
        const savedItems = [...entries[dateString]];
        while (savedItems.length < 3) savedItems.push("");
        setCurrentItems(savedItems.slice(0, 3));
      } else {
        setCurrentItems(["", "", ""]);
      }
      setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    }
  }, [currentDate, entries, dateString]);

  const saveEntry = () => {
    const filtered = currentItems.filter((i) => i.trim().length > 0);
    if (filtered.length === 0) {
      toast.error("Please fill in at least one gratitude entry.");
      return;
    }

    const newEntries = { ...entries, [dateString]: filtered };
    setEntries(newEntries);
    localStorage.setItem("tz_gratitude_entries", JSON.stringify(newEntries));
    toast.success("Gratitude journal entry saved!");
  };

  const navigateDay = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...currentItems];
    newItems[index] = value;
    setCurrentItems(newItems);
  };

  const calculateStreak = () => {
    let streak = 0;
    const d = new Date();
    let ds = d.toISOString().split("T")[0];

    if (!entries[ds]) {
      d.setDate(d.getDate() - 1);
      ds = d.toISOString().split("T")[0];
    }

    while (entries[ds] && entries[ds].length > 0) {
      streak++;
      d.setDate(d.getDate() - 1);
      ds = d.toISOString().split("T")[0];
    }
    return streak;
  };

  const handleReset = () => {
    setEntries({});
    localStorage.removeItem("tz_gratitude_entries");
    setCurrentItems(["", "", ""]);
    toast.success("Reset journal entries!");
  };
  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
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
        title="Daily Gratitude Journal & Mindfulness Reflection"
        description="Reflect on 3 positive moments every day, track your daily journal streak, and cultivate long-term mindfulness."
        actions={<ResetButton onClick={handleReset} label="Reset Entries" />}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {/* DAILY JOURNAL CARD */}
        <GlassCard className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/60">
            <Button variant="outline" size="icon" onClick={() => navigateDay(-1)} className="h-9 w-9">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <CardTitle className="text-base font-bold text-foreground">
                {currentDate.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </CardTitle>
              <div className="text-xs text-primary font-medium flex items-center justify-center gap-1 mt-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{prompt}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDay(1)}
              disabled={currentDate.toDateString() === new Date().toDateString()}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="bg-primary/10 text-primary border border-primary/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                    {i + 1}
                  </div>
                  <Input
                    placeholder="Today I am grateful for..."
                    value={currentItems[i]}
                    onChange={(e) => updateItem(i, e.target.value)}
                    className="h-12 text-sm font-medium"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <Button onClick={saveEntry} className="h-11 px-6 font-bold gap-2">
                <Save className="h-4 w-4" /> Save Journal Entry
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        {/* STREAK & STATS */}
        <GlassCard className="md:col-span-1 h-fit space-y-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" /> Journal Stats & Streak
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 p-5 rounded-2xl text-center">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Current Reflection Streak</div>
              <div className="text-4xl font-black text-primary flex items-center justify-center gap-2">
                <Sparkles className="text-amber-500 h-7 w-7" />
                {calculateStreak()} <span className="text-sm font-bold text-muted-foreground">Days</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center">
              <h4 className="font-bold text-xs text-muted-foreground uppercase">Total Saved Reflections</h4>
              <div className="text-3xl font-black text-foreground mt-1">{Object.keys(entries).length}</div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Read Daily Reflection Prompt",
            description: "Reflect on inspirational daily mindfulness prompts.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Write 3 Gratitude Points",
            description: "List 3 things, people, or moments you feel grateful for today.",
            icon: Heart,
          },
          {
            step: "03",
            title: "Build Journal Streak",
            description: "Save daily reflections to maintain your consecutive journal streak.",
            icon: CheckCircle2,
          },
        ]}
        badges={["3-Point Gratitude", "Reflection Streaks", "100% Private"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Heart,
            title: "Daily Mindfulness Reflection",
            description: "Encourages positive mental health through daily 3-point gratitude logging.",
          },
          {
            icon: Sparkles,
            title: "Automatic Streak Counter",
            description: "Tracks consecutive days of saved gratitude journal reflections.",
          },
          {
            icon: Shield,
            title: "Private Browser Storage",
            description: "Saves entries strictly in your local browser storage for maximum privacy.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "Can I view past gratitude entries?",
            answer: "Yes, use the left and right arrow buttons at the top of the journal card to navigate through past calendar dates.",
          },
          {
            question: "Are my personal journal entries stored online?",
            answer: "No, all entries remain stored 100% privately inside your local browser storage.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/gratitude" max={6} />
    </div>
  );
}
