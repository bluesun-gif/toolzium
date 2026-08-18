"use client";

import { ResetButton } from "@/components/shared/action-buttons";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { BookOpen, Calendar, ChevronLeft, ChevronRight, Heart, PenLine, Save, Sparkles, History } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import toast from"react-hot-toast";

interface Entry {
 date: string;
 items: string[];
}

const PROMPTS = [
"What made you smile today?",
"Who helped you today?",
"What are you looking forward to?",
"What's a small win you had today?",
"What's something beautiful you saw?",
"What's a challenge you're grateful for?"
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
    const filtered = currentItems.filter(i => i.trim().length > 0);
    if (filtered.length === 0) {
      toast.error("Please fill in at least one gratitude entry.");
      return;
    }
    const newEntries = {
      ...entries,
      [dateString]: filtered
    };
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
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

      <ToolPageHeader icon={Heart} title="Daily Gratitude Journal & Mindfulness Reflection" description="Reflect on 3 positive moments every day, track your daily journal streak, and cultivate long-term mindfulness." actions={<ResetButton onClick={handleReset} label="Reset Entries" />} />

      <div className="grid md:grid-cols-3 gap-6">
        {/* DAILY JOURNAL CARD */}
        <GlassCard className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/60">
            <Button variant="outline" size="icon" onClick={() => navigateDay(-1)} className="h-9 w-9">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <CardTitle className="text-base font-bold text-foreground">
                {currentDate.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </CardTitle>
              <div className="text-xs text-primary font-medium flex items-center justify-center gap-1 mt-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{prompt}</span>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={() => navigateDay(1)} disabled={currentDate.toDateString() === new Date().toDateString()} className="h-9 w-9">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-4">
              {[0, 1, 2].map(i => <div key={i} className="flex gap-3 items-center">
                  <div className="bg-primary/10 text-primary border border-primary/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                    {i + 1}
                  </div>
                  <Input placeholder="Today I am grateful for..." value={currentItems[i]} onChange={e => updateItem(i, e.target.value)} className="h-12 text-sm font-medium" />
                </div>)}
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
      <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-2">
 <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
 <div className="flex items-center gap-4">
 <Button variant="outline"size="icon"onClick={() => navigateDay(-1)}>
 <ChevronLeft className="h-4 w-4"/>
 </Button>
 <div className="text-center">
 <CardTitle>{currentDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
 <div className="text-sm text-muted-foreground flex items-center justify-center mt-1">
 <Sparkles className="h-3 w-3 mr-1"/>
 {prompt}
 </div>
 </div>
 <Button 
 variant="outline"
 size="icon"
 onClick={() => navigateDay(1)}
 disabled={currentDate.toDateString() === new Date().toDateString()}
 >
 <ChevronRight className="h-4 w-4"/>
 </Button>
 </div>
 </CardHeader>
 <CardContent className="pt-6 space-y-4">
 <div className="space-y-4">
 {[0, 1, 2].map((i) => (
 <div key={i} className="flex gap-3 items-start">
 <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
 {i + 1}
 </div>
 <Input
 placeholder={`I am grateful for...`}
 value={currentItems[i]}
 onChange={(e) => updateItem(i, e.target.value)}
 className="h-12 text-md"
 />
 </div>
 ))}
 </div>
 
 <div className="pt-4 flex justify-end">
 <Button onClick={saveEntry}>
 <Save className="h-4 w-4 mr-2"/>
 Save Entry
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-1 h-fit">
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calendar className="h-5 w-5 text-primary"/>
 Stats & History
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="bg-muted p-4 rounded-lg text-center">
 <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Current Streak</div>
 <div className="text-4xl font-bold flex items-center justify-center gap-2">
 <Sparkles className="text-yellow-500 h-8 w-8"/>
 {calculateStreak()} <span className="text-lg font-normal text-muted-foreground">days</span>
 </div>
 </div>

 <div>
 <h4 className="font-medium text-sm mb-3">Total Entries</h4>
 <div className="text-2xl font-bold">
 {Object.keys(entries).length}
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Entry",
    description:"Note what you are grateful for.",
    icon: PenLine,
  },
{
    step:"02",
    title:"Reflect",
    description:"Write a line of why.",
    icon: Heart,
  },
{
    step:"03",
    title:"Review",
    description:"Look back over time.",
    icon: BookOpen,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: PenLine,
    title:"Entry",
    description:"Daily notes.",
  },
{
    icon: Heart,
    title:"Reflect",
    description:"Why it matters.",
  },
{
    icon: BookOpen,
    title:"History",
    description:"Revisit entries.",
  },
{
    icon: Sparkles,
    title:"Mindset",
    description:"Supports wellbeing.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A gratitude journal prompts you to name what is going well, a practice linked to better mood and perspective. Writing why deepens the effect beyond a list. This tool captures entries and lets you revisit them.</p>
  <p>Consistency beats length. A brief daily note shifts attention toward the positive. The history view reinforces the habit.</p>
  <p>Use it as a wind-down ritual. The tool's value is a simple, private gratitude practice.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/productivity/gratitude" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"Benefits?",
    answer:"May lift mood and perspective.",
  },
{
    question:"Daily?",
    answer:"Consistency helps.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  },
{
    question:"Use case?",
    answer:"Evening reflection.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default GratitudeClient;
