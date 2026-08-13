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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Sun, Heart, Shuffle, Plus, Moon, Sparkles, Shield, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const AFFIRMATIONS = [
  "I am capable of achieving my biggest goals.",
  "I choose peace, positivity, and gratitude today.",
  "My potential is limitless and growing every day.",
  "I attract abundance and meaningful success.",
  "I am worthy of respect, happiness, and peace.",
  "Every challenge is an opportunity to learn and evolve.",
  "I trust my intuition and inner clarity.",
  "I radiate positive, calm energy to everyone around me.",
  "My mind is clear, focused, and resilient.",
  "I overcome obstacles with calm confidence.",
  "I forgive myself for past mistakes and move forward.",
  "I am proud of the progress I make every day.",
  "My health, vitality, and energy are improving daily.",
  "I surround myself with supportive and uplifting people.",
  "I am doing my best, and that is more than enough.",
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
      newFavs = favorites.filter((f) => f !== aff);
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
        icon={Sun}
        title="Daily Positive Affirmations & Mindset Studio"
        description="Start your morning or end your evening with positive affirmations, custom self-belief cards, and ambient mindset themes."
        actions={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-muted/60 border border-border/60">
              <Sun className={cn("w-4 h-4", isMorningMode ? "text-amber-500" : "text-muted-foreground")} />
              <Switch checked={!isMorningMode} onCheckedChange={(c) => setIsMorningMode(!c)} />
              <Moon className={cn("w-4 h-4", !isMorningMode ? "text-primary" : "text-muted-foreground")} />
            </div>
            <ResetButton onClick={handleReset} label="Reset Favorites" />
          </div>
        }
      />

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
              {currentAffirmations.map((aff, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-6 rounded-2xl border transition-all relative group shadow-sm flex flex-col justify-between min-h-[100px]",
                    isMorningMode
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100"
                      : "bg-indigo-500/10 border-indigo-500/30 text-indigo-950 dark:text-indigo-100"
                  )}
                >
                  <p className="text-base font-bold leading-relaxed">{aff}</p>
                  <div className="flex items-center justify-end gap-2 pt-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-background/20"
                      onClick={() => toggleFavorite(aff)}
                    >
                      <Heart className={cn("w-4 h-4", favorites.includes(aff) && "fill-current text-rose-500")} />
                    </Button>
                    <CopyButton getText={() => aff} label="" className="h-8 w-8 hover:bg-background/20" />
                  </div>
                </div>
              ))}
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
                <Input
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="e.g. I handle high pressure with calm confidence..."
                  className="h-11 font-medium"
                />
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
              {favorites.length === 0 ? (
                <p className="text-muted-foreground text-xs italic border border-dashed border-border/80 p-6 rounded-xl text-center">
                  No favorites saved yet. Click the heart icon on any card to save it.
                </p>
              ) : (
                <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {favorites.map((fav, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between p-3 bg-muted/20 border border-border/60 rounded-xl text-xs font-semibold text-foreground"
                    >
                      <span className="flex-1 mr-2">{fav}</span>
                      <Button variant="ghost" size="icon" onClick={() => toggleFavorite(fav)} className="h-7 w-7 text-muted-foreground hover:text-rose-500">
                        <Heart className="w-4 h-4 fill-current text-rose-500" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Morning / Evening Theme",
            description: "Toggle between Morning Sun and Evening Moon theme modes for appropriate ambient warmth.",
            icon: Sun,
          },
          {
            step: "02",
            title: "Shuffle & Favorite",
            description: "Click Shuffle for new positive mantras, and click the Heart icon to bookmark your favorites.",
            icon: Heart,
          },
          {
            step: "03",
            title: "Write Custom Mantras",
            description: "Type your personal affirmations into the creator box to build a tailored self-belief library.",
            icon: Plus,
          },
        ]}
        badges={["Morning & Evening Themes", "Custom Mantras", "Favorites Storage"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Sun,
            title: "Ambient Theme Modes",
            description: "Features tailored warm amber and deep indigo theme palettes designed for morning and evening routines.",
          },
          {
            icon: Heart,
            title: "Personal Affirmation Library",
            description: "Saves your favorited and custom created affirmations locally for daily reflection.",
          },
          {
            icon: Shield,
            title: "100% Private & Free",
            description: "Runs completely in your local browser without registration or external tracking.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "How often are affirmations updated?",
            answer: "Click the Shuffle button to generate 3 new randomized positive affirmation cards anytime.",
          },
          {
            question: "Where are my favorite affirmations stored?",
            answer: "All favorited and custom created affirmations are stored in your browser's local storage.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/affirmations" max={6} />
    </div>
  );
}
