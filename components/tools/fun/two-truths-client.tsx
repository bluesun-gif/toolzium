"use client";

import { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { HelpCircle, Check, X, Shuffle, Timer, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type FactSet = {
  id: number;
  category: string;
  truth1: string;
  truth2: string;
  lie: string;
  explanation: string;
};

const FACT_SETS: FactSet[] = [
  { id: 1, category: "Animals", truth1: "Octopuses have three hearts.", truth2: "Wombat poop is cube-shaped.", lie: "Bats are blind.", explanation: "Bats actually have decent eyesight, and some can even see UV light." },
  { id: 2, category: "Science", truth1: "Water can boil and freeze at the same time.", truth2: "Helium becomes a superfluid near absolute zero.", lie: "Lightning never strikes the same place twice.", explanation: "Lightning can and often does strike the same place multiple times, like the Empire State Building." },
  { id: 3, category: "History", truth1: "Cleopatra lived closer to the invention of the iPhone than to the building of the Great Pyramid.", truth2: "Oxford University is older than the Aztec Empire.", lie: "Napoleon Bonaparte was extremely short.", explanation: "Napoleon was actually of average height for his time (around 5'6\")." },
  { id: 4, category: "Geography", truth1: "Russia has 11 time zones.", truth2: "Canada has the most lakes of any country.", lie: "Mount Everest is the tallest mountain from base to peak.", explanation: "Mauna Kea in Hawaii is taller from base to peak, mostly being underwater." },
  { id: 5, category: "Food", truth1: "Honey never spoils.", truth2: "Peanuts are not actually nuts, they are legumes.", lie: "Fortune cookies were invented in China.", explanation: "Fortune cookies were actually invented in California by Japanese immigrants." },
  // Adding a few more to simulate variety
  { id: 6, category: "Animals", truth1: "Sloths can hold their breath longer than dolphins.", truth2: "A flock of crows is called a murder.", lie: "Bulls get angry when they see the color red.", explanation: "Bulls are red-green colorblind; they react to the movement of the cape." },
  { id: 7, category: "Science", truth1: "Bananas are radioactive.", truth2: "A day on Venus is longer than a year on Venus.", lie: "Humans only use 10% of their brains.", explanation: "We use virtually every part of the brain, and most of it is active almost all the time." }
];

const TIMER_SECONDS = 15;

export function TwoTruthsClient() {
  const [currentSet, setCurrentSet] = useState<FactSet | null>(null);
  const [statements, setStatements] = useState<{text: string, isLie: boolean, id: number}[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [played, setPlayed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState(false);

  const loadNewSet = useCallback(() => {
    const randomSet = FACT_SETS[Math.floor(Math.random() * FACT_SETS.length)];
    setCurrentSet(randomSet);
    
    // Shuffle statements
    const stmts = [
      { text: randomSet.truth1, isLie: false, id: 1 },
      { text: randomSet.truth2, isLie: false, id: 2 },
      { text: randomSet.lie, isLie: true, id: 3 }
    ];
    for (let i = stmts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [stmts[i], stmts[j]] = [stmts[j], stmts[i]];
    }
    
    setStatements(stmts);
    setSelectedId(null);
    if (timerMode) {
      setTimeLeft(TIMER_SECONDS);
      setTimerActive(true);
    }
  }, [timerMode]);

  useEffect(() => {
    loadNewSet();
  }, [loadNewSet]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerActive && timeLeft === 0) {
      setTimerActive(false);
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleTimeUp = () => {
    toast.error("Time's up!");
    setSelectedId(-1); // -1 indicates time up, reveal answer
    setPlayed(p => p + 1);
  };

  const handleGuess = (id: number, isLie: boolean) => {
    if (selectedId !== null) return;
    
    setTimerActive(false);
    setSelectedId(id);
    setPlayed(p => p + 1);
    
    if (isLie) {
      setScore(s => s + 1);
      toast.success("Correct! That's the lie.");
    } else {
      toast.error("Oops! That was a truth.");
    }
  };

  const resetGame = () => {
    setScore(0);
    setPlayed(0);
    loadNewSet();
  };

  const toggleTimerMode = () => {
    setTimerMode(!timerMode);
    loadNewSet();
  };

  const getCopyText = () => {
    if (!currentSet) return "";
    return `Can you guess the lie?
1. ${statements[0]?.text}
2. ${statements[1]?.text}
3. ${statements[2]?.text}

Category: ${currentSet.category}
`;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={HelpCircle} 
        title="Two Truths and a Lie" 
        description="Spot the lie among the facts! Play with categories and a timer."
        actions={
          <>
            <ActionButton 
              icon={Timer} 
              label={timerMode ? "Disable Timer" : "Enable Timer"} 
              onClick={toggleTimerMode} 
              variant={timerMode ? "default" : "outline"} 
            />
            <ResetButton onClick={resetGame} label="Reset Score" />
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Can you spot the lie?</CardTitle>
                <CardDescription>Category: {currentSet?.category}</CardDescription>
              </div>
              {timerMode && (
                <div className={cn(
                  "text-2xl font-bold flex items-center justify-center w-12 h-12 rounded-full border-4",
                  timeLeft <= 5 ? "border-red-500 text-red-500" : "border-primary text-primary"
                )}>
                  {timeLeft}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {statements.map((stmt) => (
                <button
                  key={stmt.id}
                  disabled={selectedId !== null}
                  onClick={() => handleGuess(stmt.id, stmt.isLie)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between",
                    selectedId === null 
                      ? "hover:border-primary/50 hover:bg-secondary/50 border-border" 
                      : (
                        stmt.isLie 
                          ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400" 
                          : (selectedId === stmt.id ? "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400" : "border-border opacity-50")
                      )
                  )}
                >
                  <span className="font-medium">{stmt.text}</span>
                  {selectedId !== null && stmt.isLie && <Check className="w-5 h-5 text-green-500" />}
                  {selectedId === stmt.id && !stmt.isLie && <X className="w-5 h-5 text-red-500" />}
                </button>
              ))}

              {selectedId !== null && (
                <div className="mt-6 p-4 bg-secondary rounded-lg animate-in fade-in slide-in-from-bottom-2">
                  <h4 className="font-bold mb-2">The Truth:</h4>
                  <p>{currentSet?.explanation}</p>
                  <div className="mt-4 flex gap-4">
                    <Button onClick={loadNewSet} className="flex-1">
                      <Shuffle className="w-4 h-4 mr-2" /> Next Round
                    </Button>
                    <CopyButton getText={getCopyText} label="Share" />
                  </div>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>

        <div>
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" /> Scoreboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <div className="text-5xl font-black text-primary">
                    {score} <span className="text-2xl text-muted-foreground">/ {played}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Correct Guesses</p>
                </div>
                <Separator />
                <div className="text-sm">
                  {played === 0 ? "Play a round to see your accuracy!" : `Accuracy: ${Math.round((score / played) * 100)}%`}
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
