"use client";
import { ToolBackground } from "@/components/shared/tool-background";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dices, RotateCcw, History, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

// Pip positions for each die face (1-6) on a 3x3 grid (0-100 coordinates)
const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 25], [72, 25], [28, 50], [72, 50], [28, 75], [72, 75]],
};

function DieFace({ value, size = 72 }: { value: number; size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="rounded-xl bg-white dark:bg-zinc-100 shadow-md border border-border/60"
      role="img"
      aria-label={`Die showing ${value}`}
    >
      {PIPS[value].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={9} fill="#1f2937" />
      ))}
    </svg>
  );
}

export default function DiceRollerClient() {
  const [count, setCount] = useState(2);
  const [results, setResults] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState<{ id: string; vals: number[]; sum: number; time: string }[]>([]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("toolzium_dice_history");
        if (saved) setHistory(JSON.parse(saved));
      }
    } catch (_) {}
  }, []);

  const roll = useCallback(() => {
    setRolling(true);
    // brief animation pause for feel
    setTimeout(() => {
      const vals = Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
      setResults(vals);
      const sum = vals.reduce((a, b) => a + b, 0);
      const entry = {
        id: `roll-${Date.now()}`,
        vals,
        sum,
        time: new Date().toLocaleTimeString(),
      };
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, 20);
        try { localStorage.setItem("toolzium_dice_history", JSON.stringify(next)); } catch (_) {}
        return next;
      });
      setRolling(false);
      toast.success(`Rolled ${vals.join(", ")} (sum ${sum})`);
    }, 350);
  }, [count]);

  // roll on Space
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && (e.target as HTMLElement)?.tagName !== "INPUT") {
        e.preventDefault();
        roll();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [roll]);

  const clearHistory = () => {
    setHistory([]);
    try { localStorage.removeItem("toolzium_dice_history"); } catch (_) {}
    toast.success("History cleared");
  };

  return (
    <div className="relative max-w-6xl mx-auto space-y-8 p-4">
      <ToolBackground />

      <div className="relative z-10">
        <ToolPageHeader
          icon={Dices}
          title="Dice Roller"
          description="Roll virtual dice with crisp, visible pips. Choose 1–6 dice, roll with a click or Space, and track your recent rolls."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main roll area */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className={cardClass}>
              <div className={headerClass}>
                <CardTitle className={titleClass}><Dices className="h-4 w-4 text-primary" /> Roll Dice</CardTitle>
              </div>
              <CardContent className="p-5 space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Number of Dice</span>
                    <span className="text-sm font-bold text-primary">{count}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={6}
                    step={1}
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span><span>6</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 py-6 min-h-[120px] rounded-xl bg-muted/20">
                  {results.length > 0 ? (
                    results.map((v, i) => <DieFace key={i} value={v} size={80} />)
                  ) : (
                    <span className="text-sm text-muted-foreground">Press Roll or Space to roll the dice</span>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={roll}
                    disabled={rolling}
                    size="lg"
                    className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  >
                    {rolling ? <RotateCcw className="h-5 w-5 animate-spin" /> : <Dices className="h-5 w-5" />}
                    {rolling ? "Rolling..." : "Roll Dice"}
                  </Button>
                  <Button
                    onClick={() => setResults([])}
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-xl"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* History sidebar */}
          <div className="space-y-6">
            <GlassCard className={cardClass}>
              <div className={headerClass}>
                <div className="flex justify-between items-center w-full">
                  <CardTitle className={titleClass}><History className="h-4 w-4 text-primary" /> Recent Rolls</CardTitle>
                  {history.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearHistory} className="h-8 text-xs text-muted-foreground hover:text-red-500">Clear</Button>
                  )}
                </div>
              </div>
              <CardContent className="p-4 space-y-2 max-h-[360px] overflow-y-auto">
                {history.length > 0 ? (
                  history.map((h) => (
                    <div key={h.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/40 border border-border/40">
                      <div className="flex gap-1.5">
                        {h.vals.map((v, i) => <DieFace key={i} value={v} size={28} />)}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">sum {h.sum}</div>
                        <div className="text-[10px] text-muted-foreground/70">{h.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground text-center py-6 border-2 border-dashed border-border rounded-xl">
                    No rolls yet.
                  </div>
                )}
              </CardContent>
            </GlassCard>
          </div>
        </div>

        <ToolHowItWorks steps={[
          { step: "01", title: "Pick Dice Count", description: "Slide to choose 1 to 6 dice for your roll.", icon: Dices },
          { step: "02", title: "Roll", description: "Click Roll Dice or press the Space key to roll instantly.", icon: RotateCcw },
          { step: "03", title: "Review", description: "See clear pips on each die and your recent roll history.", icon: History },
        ]} badges={["Crisp Pips", "Space to Roll", "Local History"]} />

        <ToolFeatureGuides features={[
          { icon: Dices, title: "Visible Pips", description: "Every die face renders real, high-contrast dots (1-6) so the value is always readable at a glance." },
          { icon: Sparkles, title: "Up to 6 Dice", description: "Roll a single die or a handful at once — perfect for board games, D&D, or decisions." },
          { icon: History, title: "Roll History", description: "Your last 20 rolls are saved locally so you can settle disputes after the game." },
        ]}>
          <div className="prose dark:prose-invert max-w-none">
            <h3>Why a Clean Dice Roller Matters</h3>
            <p>
              Most online dice rollers show blank or ambiguous faces. Ours renders each die as a proper cube with clearly visible pips, so there is never any doubt what you rolled. Roll with a click or the Space bar, pick 1–6 dice, and keep a local history of every throw.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={[
          { question: "Can I roll more than two dice?", answer: "Yes — use the slider to roll anywhere from 1 to 6 dice in a single throw." },
          { question: "Does it work with the keyboard?", answer: "Absolutely. Press the Space bar anywhere on the page to roll instantly." },
          { question: "Is my roll history saved?", answer: "Your last 20 rolls are stored in your browser's local storage and persist between visits." },
        ]} />

        <RelatedTools currentToolUrl="/tools/fun/dice-roller" max={6} />
      </div>
    </div>
  );
}
