"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { HelpCircle, Shuffle, ThumbsUp, ThumbsDown, History } from "lucide-react";
import { toast } from "react-hot-toast";

const DILEMMAS = [
  { id: 1, category: "funny", opt1: "Always have to say everything on your mind", opt2: "Never be able to speak again" },
  { id: 2, category: "funny", opt1: "Have a permanently annoying high-pitched voice", opt2: "Only be able to whisper" },
  { id: 3, category: "gross", opt1: "Eat a handful of hair", opt2: "Lick a public telephone" },
  { id: 4, category: "impossible", opt1: "Stop world hunger", opt2: "Achieve world peace" },
  { id: 5, category: "philosophical", opt1: "Know the history of every object you touch", opt2: "Be able to talk to animals" },
  { id: 6, category: "funny", opt1: "Always feel like you need to sneeze but can't", opt2: "Hiccup for 5 minutes every hour" },
  { id: 7, category: "impossible", opt1: "Go back to the past and meet your ancestors", opt2: "Go to the future and meet your great-grandchildren" },
  { id: 8, category: "gross", opt1: "Never be able to wear deodorant", opt2: "Never be able to brush your teeth" },
  { id: 9, category: "philosophical", opt1: "Live forever but stay your current age", opt2: "Live to be 100 but age normally" },
  { id: 10, category: "funny", opt1: "Have spaghetti for hair", opt2: "Sweat mayonnaise" },
  { id: 11, category: "funny", opt1: "Have fingers as long as your legs", opt2: "Have legs as short as your fingers" },
  { id: 12, category: "philosophical", opt1: "Find true love today", opt2: "Win the lottery next year" },
  { id: 13, category: "impossible", opt1: "Be able to fly at 10 mph", opt2: "Be able to turn invisible but only when your eyes are closed" },
  { id: 14, category: "gross", opt1: "Eat a rotten egg", opt2: "Drink a glass of sour milk" },
  { id: 15, category: "funny", opt1: "Always have to skip everywhere you go", opt2: "Always have to run everywhere you go" },
  { id: 16, category: "funny", opt1: "Have a unibrow", opt2: "Have no eyebrows at all" },
  { id: 17, category: "philosophical", opt1: "Be the smartest person in the world", opt2: "Be the richest person in the world" },
  { id: 18, category: "impossible", opt1: "Never have to sleep again", opt2: "Never have to eat again" },
  { id: 19, category: "funny", opt1: "Only be able to listen to Nickelback for the rest of your life", opt2: "Only be able to watch Twilight for the rest of your life" },
  { id: 20, category: "gross", opt1: "Swim in a pool of raw eggs", opt2: "Swim in a pool of expired milk" }
];

type Choice = {
  dilemma: typeof DILEMMAS[0];
  picked: 1 | 2;
  stats: { p1: number, p2: number };
};

export function WouldYouRatherClient() {
  const [currentDilemma, setCurrentDilemma] = useState(DILEMMAS[Math.floor(Math.random() * DILEMMAS.length)]);
  const [history, setHistory] = useState<Choice[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [currentStats, setCurrentStats] = useState({ p1: 50, p2: 50 });

  useEffect(() => {
    const saved = localStorage.getItem("wyr-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) { }
    }
  }, []);

  const saveHistory = (newHistory: Choice[]) => {
    setHistory(newHistory);
    localStorage.setItem("wyr-history", JSON.stringify(newHistory));
  };

  const handleNext = () => {
    let next;
    do {
      next = DILEMMAS[Math.floor(Math.random() * DILEMMAS.length)];
    } while (next.id === currentDilemma.id && DILEMMAS.length > 1);
    setCurrentDilemma(next);
    setShowStats(false);
  };

  const handleChoice = (choice: 1 | 2) => {
    if (showStats) return;
    const p1 = Math.floor(Math.random() * 80) + 10;
    const p2 = 100 - p1;
    setCurrentStats({ p1, p2 });
    setShowStats(true);
    
    const newChoice: Choice = {
      dilemma: currentDilemma,
      picked: choice,
      stats: { p1, p2 }
    };
    saveHistory([newChoice, ...history].slice(0, 50));
    toast.success("Choice recorded!");
  };

  const clearHistory = () => {
    saveHistory([]);
    toast.success("History cleared");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={HelpCircle}
        title="Would You Rather"
        description="Faced with two difficult choices, which one will you pick?"
        actions={
          <>
            <ActionButton onClick={handleNext} icon={Shuffle} label="Skip" variant="outline" />
            <ResetButton onClick={clearHistory} label="Clear History" />
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard 
          className={cn("cursor-pointer transition-all hover:ring-2 hover:ring-primary", showStats && "pointer-events-none")}
          onClick={() => handleChoice(1)}
        >
          <CardHeader>
            <CardTitle className="text-xl text-center">Would You Rather...</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[200px] text-center space-y-4">
            <p className="text-2xl font-bold">{currentDilemma.opt1}</p>
            {showStats && (
              <div className="text-xl text-primary font-semibold animate-in fade-in zoom-in">
                {currentStats.p1}% chose this
              </div>
            )}
          </CardContent>
        </GlassCard>

        <GlassCard 
          className={cn("cursor-pointer transition-all hover:ring-2 hover:ring-primary", showStats && "pointer-events-none")}
          onClick={() => handleChoice(2)}
        >
          <CardHeader>
            <CardTitle className="text-xl text-center">Or...</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[200px] text-center space-y-4">
            <p className="text-2xl font-bold">{currentDilemma.opt2}</p>
            {showStats && (
              <div className="text-xl text-primary font-semibold animate-in fade-in zoom-in">
                {currentStats.p2}% chose this
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>

      {showStats && (
        <div className="flex justify-center mt-6">
          <ActionButton onClick={handleNext} icon={Shuffle} label="Next Dilemma" variant="default" size="lg" />
        </div>
      )}

      {history.length > 0 && (
        <>
          <Separator />
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Your Choices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {history.map((h, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/50 text-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-xs uppercase text-muted-foreground">{h.dilemma.category}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={cn("p-2 rounded", h.picked === 1 ? "bg-primary/20 font-bold" : "text-muted-foreground opacity-70")}>
                        {h.dilemma.opt1} ({h.stats.p1}%)
                      </div>
                      <div className={cn("p-2 rounded", h.picked === 2 ? "bg-primary/20 font-bold" : "text-muted-foreground opacity-70")}>
                        {h.dilemma.opt2} ({h.stats.p2}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </GlassCard>
        </>
      )}
    </div>
  );
}
