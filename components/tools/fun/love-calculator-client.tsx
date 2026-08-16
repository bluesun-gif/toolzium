"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const getLoveScore = (n1: string, n2: string) => {
  const combined = (n1 + n2).toLowerCase().replace(/\s/g, "");
  if (!combined) return 0;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 101;
};
const getMessage = (score: number) => {
  if (score >= 90) return "A match made in heaven! You two are practically soulmates.";
  if (score >= 75) return "Strong connection! You have great chemistry and understanding.";
  if (score >= 50) return "There's definite potential here. Keep working on it!";
  if (score >= 25) return "It might be a bumpy road, but opposites sometimes attract.";
  return "Maybe just stick to being friends... or get a pet together instead!";
};
export default function LoveCalculatorClient() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [history, setHistory] = useState<{
    n1: string;
    n2: string;
    s: number;
  }[]>([]);
  const calculate = () => {
    if (!name1.trim() || !name2.trim()) return;
    const s = getLoveScore(name1, name2);
    setScore(s);
    setHistory(prev => [{
      n1: name1,
      n2: name2,
      s
    }, ...prev].slice(0, 5));
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Heart} title="Love Calculator" description="Find out your romantic compatibility with this highly scientific* love test." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Enter Names</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6 flex flex-col items-center">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
 <Input placeholder="Your Name" value={name1} onChange={e => setName1(e.target.value)} className="text-center text-lg" />
 <Input placeholder="Crush's Name" value={name2} onChange={e => setName2(e.target.value)} className="text-center text-lg" />
 </div>

 <Button onClick={calculate} size="lg" className="w-full max-w-md bg-pink-600 hover:bg-pink-700">
 <Heart className="w-4 h-4 mr-2 fill-white" /> Calculate Love
 </Button>

 {score !== null && <div className="w-full max-w-md mt-6 p-6 rounded-xl bg-pink-500/10 border border-pink-500/20 text-center space-y-4 animate-in fade-in zoom-in duration-500">
 <div className={`text-8xl font-bold transition-all duration-1000 ${score > 70 ? "text-pink-500 animate-pulse" : "text-muted-foreground"}`}>
 {score}%
 </div>
 <Heart className={`w-16 h-16 mx-auto ${score > 70 ? "text-pink-500 fill-pink-500 animate-bounce" : "text-muted-foreground"}`} />
 <p className="text-lg font-medium italic">{getMessage(score)}</p>
 </div>}

 {history.length > 0 && <div className="w-full max-w-md mt-8 border-t border-border/50 pt-4 space-y-2">
 <h3 className="text-sm font-semibold text-center mb-2">Recent Matches</h3>
 <div className="space-y-2 max-h-40 overflow-y-auto">
 {history.map((h, i) => <div key={i} className="flex justify-between items-center p-2 bg-muted/20 rounded-lg text-sm">
 <span>{h.n1} & {h.n2}</span>
 <span className={`font-bold ${h.s > 70 ? "text-pink-500" : "text-muted-foreground"}`}>{h.s}%</span>
 </div>)}
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Names",
        description: "Type your name and the name of your partner or crush into the fields.",
        icon: Heart
      }, {
        step: "02",
        title: "Calculate",
        description: "Hit the button to run our highly advanced* compatibility algorithm.",
        icon: Heart
      }, {
        step: "03",
        title: "View Result",
        description: "See your love percentage and a humorous summary of your romantic fate.",
        icon: Heart
      }]} badges={["100% Free", "Client-Side", "Fun"]} />

 <ToolFeatureGuides features={[{
        icon: Heart,
        title: "Deterministic Hash",
        description: "The same two names will always produce the exact same score, ensuring consistency."
      }, {
        icon: Heart,
        title: "Animated Feedback",
        description: "High scores trigger a pulsing, bouncing heart animation to celebrate the match."
      }, {
        icon: Heart,
        title: "Humorous Messages",
        description: "Custom written compatibility advice ranging from 'soulmates' to 'just friends'."
      }, {
        icon: Heart,
        title: "Match History",
        description: "Keeps track of your last 5 calculations so you can compare different pairings."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>The Love Calculator is a classic internet pastime designed for entertainment, giggles, and settling debates about celebrity crushes. While it won't replace actual relationship counseling, it's a fun way to pass the time.</p>
 <p>Our algorithm uses a deterministic string hashing function. This means that if you and your partner test your names today, and then again in ten years, the universe (and our code) will assign you the exact same compatibility percentage.</p>
 <p>Share it with friends at sleepovers or use it to jokingly test the romantic viability of your favorite fictional TV couples.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Is this scientifically accurate?",
        answer: "Absolutely not. Love is a complex human emotion. This tool uses a mathematical string hash for entertainment purposes only."
      }, {
        question: "Why do I get the same score every time?",
        answer: "The calculator is deterministic. The same input names will always generate the same hash value and resulting percentage."
      }, {
        question: "Does the order of names matter?",
        answer: "No, the algorithm combines both names symmetrically, so swapping Name 1 and Name 2 will yield the exact same result."
      }]} />

 <RelatedTools currentToolUrl="/tools/fun/love-calculator" max={6} />
 </div></div>;
}