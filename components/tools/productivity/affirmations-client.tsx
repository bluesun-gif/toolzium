"use client";

import { ResetButton } from "@/components/shared/action-buttons";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Switch } from"@/components/ui/switch";
import { Label } from"@/components/ui/label";
import { CopyButton } from"@/components/shared/action-buttons";
import { BookOpen, Heart, Moon, PenLine, Plus, Shuffle, Sparkles, Sun } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

const AFFIRMATIONS = [
"I am capable of achieving my goals.",
"I choose to be happy and grateful today.",
"My potential is limitless.",
"I attract abundance into my life.",
"I am worthy of love and respect.",
"Every day is a new opportunity to grow.",
"I trust my intuition and inner wisdom.",
"I radiate positive energy.",
"My mind is clear, focused, and calm.",
"I am resilient and can overcome any challenge.",
"I forgive myself and others easily.",
"I am proud of who I am becoming.",
"My body is healthy and full of energy.",
"I surround myself with supportive people.",
"I am doing my best, and that is enough.",
];

export function AffirmationsClient() {
  const [currentAffirmations, setCurrentAffirmations] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [isMorningMode, setIsMorningMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const savedFavs = localStorage.getItem("affirmationsFavorites");
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {}
    }
    generateAffirmations();
  }, []);
  const generateAffirmations = () => {
    const shuffled = [...AFFIRMATIONS].sort(() => 0.5 - Math.random());
    setCurrentAffirmations(shuffled.slice(0, 3));
    toast.success("Generated new affirmations!");
  };
  const toggleFavorite = (aff: string) => {
    let newFavs;
    if (favorites.includes(aff)) {
      newFavs = favorites.filter(f => f !== aff);
      toast.success("Removed from favorites.");
    } else {
      newFavs = [...favorites, aff];
      toast.success("Saved to favorites!");
    }
    setFavorites(newFavs);
    localStorage.setItem("affirmationsFavorites", JSON.stringify(newFavs));
  };
  const addCustomAffirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) {
      toast.error("Please enter your affirmation.");
      return;
    }
    const newAff = customInput.trim();
    const newFavs = [...favorites, newAff];
    setFavorites(newFavs);
    localStorage.setItem("affirmationsFavorites", JSON.stringify(newFavs));
    setCustomInput("");
    toast.success("Custom affirmation added to favorites!");
  };
  const handleReset = () => {
    setFavorites([]);
    localStorage.removeItem("affirmationsFavorites");
    generateAffirmations();
    toast.success("Reset favorites!");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

      <ToolPageHeader icon={Sun} title="Daily Positive Affirmations & Mindset Studio" description="Start your morning or end your evening with positive affirmations, custom self-belief cards, and ambient mindset themes." actions={<div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-muted/60 border border-border/60">
              <Sun className={cn("w-4 h-4", isMorningMode ? "text-amber-500" : "text-muted-foreground")} />
              <Switch checked={!isMorningMode} onCheckedChange={c => setIsMorningMode(!c)} />
              <Moon className={cn("w-4 h-4", !isMorningMode ? "text-primary" : "text-muted-foreground")} />
            </div>
            <ResetButton onClick={handleReset} label="Reset Favorites" />
          </div>} />

      <div className="grid md:grid-cols-2 gap-6">
        {/* TODAY'S AFFIRMATION CARDS */}
        <div className="space-y-6">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-primary" /> Today&apos;s Mindset Cards
                </CardTitle>
                <CardDescription>Click shuffle for a fresh set of positive reminders.</CardDescription>
              </div>
              <Button variant="outline" size="icon" onClick={generateAffirmations} className="h-9 w-9">
                <Shuffle className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentAffirmations.map((aff, i) => <div key={i} className={cn("p-6 rounded-2xl border transition-all relative group shadow-sm flex flex-col justify-between min-h-[100px]", isMorningMode ? "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100" : "bg-indigo-500/10 border-indigo-500/30 text-indigo-950 dark:text-indigo-100")}>
                  <p className="text-base font-bold leading-relaxed">{aff}</p>
                  <div className="flex items-center justify-end gap-2 pt-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background/20" onClick={() => toggleFavorite(aff)}>
                      <Heart className={cn("w-4 h-4", favorites.includes(aff) && "fill-current text-rose-500")} />
                    </Button>
                    <CopyButton getText={() => aff} label="" className="h-8 w-8 hover:bg-background/20" />
                  </div>
                </div>)}
            </CardContent>
          </GlassCard>
        </div>

        {/* CREATE CUSTOM & FAVORITES */}
        <div className="space-y-6">
          <GlassCard>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plus className="w-5 h-5 text-primary" /> Create Personal Affirmation
              </CardTitle>
              <CardDescription>Add custom mantras to your saved favorites list.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={addCustomAffirmation} className="flex gap-2">
                <Input value={customInput} onChange={e => setCustomInput(e.target.value)} placeholder="e.g. I handle high pressure with calm confidence..." className="h-11 font-medium" />
                <Button type="submit" className="h-11 px-5 font-bold gap-2">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </form>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="w-5 h-5 text-rose-500" /> Saved Favorites ({favorites.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {favorites.length === 0 ? <p className="text-muted-foreground text-xs italic border border-dashed border-border/80 p-6 rounded-xl text-center">
                  No favorites saved yet. Click the heart icon on any card to save it.
                </p> : <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {favorites.map((fav, i) => <li key={i} className="flex items-center justify-between p-3 bg-muted/20 border border-border/60 rounded-xl text-xs font-semibold text-foreground">
                      <span className="flex-1 mr-2">{fav}</span>
                      <Button variant="ghost" size="icon" onClick={() => toggleFavorite(fav)} className="h-7 w-7 text-muted-foreground hover:text-rose-500">
                        <Heart className="w-4 h-4 fill-current text-rose-500" />
                      </Button>
                    </li>)}
                </ul>}
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <GlassCard>
 <CardHeader>
 <CardTitle>Favorites</CardTitle>
 <CardDescription>Your saved affirmations ({favorites.length})</CardDescription>
 </CardHeader>
 <CardContent>
 {favorites.length === 0 ? (
 <p className="text-muted-foreground text-sm">No favorites yet. Click the heart icon on an affirmation to save it.</p>
 ) : (
 <ul className="space-y-2 max-h-[300px] overflow-y-auto">
 {favorites.map((fav, i) => (
 <li key={i} className="flex items-center justify-between p-3 bg-muted rounded-md text-sm">
 <span className="flex-1 mr-2">{fav}</span>
 <Button variant="ghost"size="icon"onClick={() => toggleFavorite(fav)} className="h-6 w-6">
 <Heart className="w-4 h-4 fill-current text-red-500"/>
 </Button>
 </li>
 ))}
 </ul>
 )}
 </CardContent>
 </GlassCard>
 
 
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Choose Theme",
    description:"Pick a focus area.",
    icon: Heart,
  },
{
    step:"02",
    title:"Read",
    description:"Review daily affirmations.",
    icon: BookOpen,
  },
{
    step:"03",
    title:"Reflect",
    description:"Note how you feel.",
    icon: PenLine,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Heart,
    title:"Themes",
    description:"Confidence, calm, focus.",
  },
{
    icon: BookOpen,
    title:"Daily Set",
    description:"Fresh each day.",
  },
{
    icon: PenLine,
    title:"Reflect",
    description:"Track mood.",
  },
{
    icon: Sparkles,
    title:"Positive",
    description:"Supports mindset.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A daily affirmations tool offers positive statements to reinforce a constructive mindset. Repeated regularly, affirmations can steady focus and confidence. This tool delivers a themed set each day with space to reflect.</p>
  <p>Consistency matters more than intensity. A brief daily practice beats occasional long sessions. Reflection ties the statements to real feeling, deepening the effect.</p>
  <p>Use it as a small daily ritual. The tool's value is a simple, private prompt for a steadier mindset.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/productivity/affirmations" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What are affirmations?",
    answer:"Positive statements repeated to shift mindset.",
  },
{
    question:"Do they work?",
    answer:"May support confidence and focus.",
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
  }
  ]}
/>
    </div>
    </div>
);
}

export default AffirmationsClient;
