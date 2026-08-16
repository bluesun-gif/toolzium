"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Puzzle, Timer, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const COMPOUND_WORDS = [{
  w1: "Sun",
  w2: "flower"
}, {
  w1: "Rain",
  w2: "bow"
}, {
  w1: "Star",
  w2: "fish"
}, {
  w1: "Butter",
  w2: "fly"
}, {
  w1: "Water",
  w2: "melon"
}, {
  w1: "Snow",
  w2: "man"
}, {
  w1: "Fire",
  w2: "fly"
}, {
  w1: "Bed",
  w2: "room"
}, {
  w1: "Tooth",
  w2: "brush"
}, {
  w1: "Foot",
  w2: "ball"
}, {
  w1: "Pan",
  w2: "cake"
}, {
  w1: "Cup",
  w2: "cake"
}, {
  w1: "Arm",
  w2: "chair"
}, {
  w1: "Book",
  w2: "worm"
}, {
  w1: "Eye",
  w2: "brow"
}, {
  w1: "Key",
  w2: "board"
}, {
  w1: "Sun",
  w2: "glass"
}, {
  w1: "Mail",
  w2: "box"
}, {
  w1: "Sand",
  w2: "castle"
}, {
  w1: "Straw",
  w2: "berry"
}];
export default function CompoundWordsClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const currentWord = COMPOUND_WORDS[currentIndex];
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  useEffect(() => {
    const wrongOptions = COMPOUND_WORDS.filter((_, idx) => idx !== currentIndex).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.w2);
    const allOptions = [...wrongOptions, currentWord.w2].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setSelected(null);
    setShowResult(false);
  }, [currentIndex, currentWord.w2]);
  const handleSelect = (opt: string) => {
    if (showResult) return;
    setSelected(opt);
    setShowResult(true);
    if (opt === currentWord.w2) {
      setScore(s => s + 1);
      toast.success("Correct!");
    } else {
      toast.error(`Wrong! The word is ${currentWord.w1}${currentWord.w2}.`);
    }
  };
  const handleNext = () => {
    if (currentIndex < COMPOUND_WORDS.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsPlaying(false);
    }
  };
  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setTime(0);
    setIsPlaying(true);
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Puzzle} title="Compound Words Game" description="Match the missing half of the compound word in this fast-paced vocabulary puzzle." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center">
 <CardTitle className={titleClass}>Round {currentIndex + 1} / {COMPOUND_WORDS.length}</CardTitle>
 <div className="flex gap-4 text-sm font-medium text-muted-foreground">
 <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {time}s</span>
 <span>Score: {score}</span>
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-6 space-y-8 text-center">
 {isPlaying ? <>
 <div className="flex items-center justify-center gap-4 text-4xl sm:text-6xl font-bold">
 <span className="text-primary">{currentWord.w1}</span>
 <span className="text-muted-foreground">+</span>
 <span className="text-muted-foreground/50">?</span>
 </div>
 <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
 {options.map((opt, idx) => {
                let btnClass = "p-4 rounded-xl border text-lg font-semibold transition-all";
                if (showResult) {
                  if (opt === currentWord.w2) btnClass += "bg-green-500/20 border-green-500 text-green-700 dark:text-green-400";else if (opt === selected) btnClass += "bg-red-500/20 border-red-500 text-red-700 dark:text-red-400";else btnClass += "bg-muted border-border opacity-50";
                } else {
                  btnClass += "bg-background border-border hover:border-primary hover:bg-primary/5";
                }
                return <Button key={idx} className={cn(btnClass)} onClick={() => handleSelect(opt)} disabled={showResult}>
 {opt}
 </Button>;
              })}
 </div>
 {showResult && <Button onClick={handleNext} className="w-full max-w-xs mx-auto">
 {currentIndex < COMPOUND_WORDS.length - 1 ? "Next Word" : "Finish Game"}
 </Button>}
 </> : <div className="space-y-4 py-8">
 <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
 <h2 className="text-2xl font-bold">Game Complete!</h2>
 <p className="text-lg text-muted-foreground">You scored {score} / {COMPOUND_WORDS.length} in {time} seconds.</p>
 <Button onClick={restart} className="gap-2">
 <RotateCcw className="w-4 h-4" /> Play Again
 </Button>
 </div>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Read the First Half",
        description: "Look at the first half of the compound word displayed on the screen.",
        icon: Puzzle
      }, {
        step: "02",
        title: "Choose the Match",
        description: "Select the correct second half from the four available options.",
        icon: CheckCircle2
      }, {
        step: "03",
        title: "Beat the Clock",
        description: "Answer quickly to build your score and complete all 20 rounds.",
        icon: Timer
      }]} badges={["100% Free", "Client-Side", "Fun"]} />

 <ToolFeatureGuides features={[{
        icon: Puzzle,
        title: "20+ Word Pairs",
        description: "A diverse collection of common English compound words to test your vocabulary."
      }, {
        icon: Timer,
        title: "Timed Challenges",
        description: "A live timer tracks your speed, adding a competitive edge to the learning experience."
      }, {
        icon: CheckCircle2,
        title: "Instant Validation",
        description: "Immediately see if your choice was correct and learn the full compound word."
      }, {
        icon: RotateCcw,
        title: "Replayability",
        description: "Shuffle the options and play again to improve your reaction time and memory."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Compound words are formed when two or more words are joined together to create a new word that has an entirely new meaning. For example,"sun"and"flower"combine to make"sunflower".</p>
 <p>This Compound Words Game is an excellent educational tool for students, ESL learners, and anyone looking to sharpen their linguistic skills. By forcing you to quickly associate word halves, the game strengthens neural pathways related to vocabulary retrieval and pattern recognition.</p>
 <p>The clean, distraction-free interface ensures that players of all ages can focus entirely on the puzzle. It is a perfect brain-break activity for classrooms or a fun way for parents to engage with their children at home.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "What is a compound word?",
        answer: "A compound word is created when two or more individual words are combined to form a new word with its own distinct meaning (e.g., rain + bow = rainbow)."
      }, {
        question: "Is this game suitable for children?",
        answer: "Yes! The game features common, everyday words and is highly beneficial for children developing their reading and vocabulary skills."
      }, {
        question: "Are the options randomized?",
        answer: "Yes, every time you play or move to a new question, the four multiple-choice options are shuffled to prevent memorization of positions."
      }]} />

 <RelatedTools currentToolUrl="/tools/fun/compound-words" max={6} />
 </div></div>;
}