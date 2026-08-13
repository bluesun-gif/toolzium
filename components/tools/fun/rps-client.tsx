"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import toast from"react-hot-toast";
import { Swords, RotateCcw } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type Choice ="rock"|"paper"|"scissors";
const CHOICES: { id: Choice, emoji: string }[] = [
 { id:"rock", emoji:"🪨"},
 { id:"paper", emoji:"📄"},
 { id:"scissors", emoji:"✂️"}
];

interface MatchResult {
 user: Choice;
 cpu: Choice;
 outcome:"win"|"lose"|"draw";
}

export default function RpsClient() {
 const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
 const [history, setHistory] = useState<MatchResult[]>([]);
 const [lastMatch, setLastMatch] = useState<MatchResult | null>(null);

 const play = (userChoice: Choice) => {
 const cpuChoice = CHOICES[Math.floor(Math.random() * 3)].id;
 let outcome:"win"|"lose"|"draw"="draw";

 if (userChoice === cpuChoice) {
 outcome ="draw";
 setScore(s => ({ ...s, draws: s.draws + 1 }));
 } else if (
 (userChoice ==="rock"&& cpuChoice ==="scissors") ||
 (userChoice ==="paper"&& cpuChoice ==="rock") ||
 (userChoice ==="scissors"&& cpuChoice ==="paper")
 ) {
 outcome ="win";
 setScore(s => ({ ...s, wins: s.wins + 1 }));
 toast.success("You Win! 🏆");
 } else {
 outcome ="lose";
 setScore(s => ({ ...s, losses: s.losses + 1 }));
 toast.error("You Lose! 💻");
 }

 const result = { user: userChoice, cpu: cpuChoice, outcome };
 setLastMatch(result);
 setHistory(h => [result, ...h].slice(0, 10));
 };

 const reset = () => {
 setScore({ wins: 0, losses: 0, draws: 0 });
 setHistory([]);
 setLastMatch(null);
 toast.success("Score reset!");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader 
 icon={Swords} 
 title="Rock Paper Scissors"
 description="Play the classic hand game against the computer."
 />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Swords className="w-4 h-4 text-primary"/> Battle Arena
 </CardTitle>
 <div className="flex gap-4 text-sm mt-2 font-bold">
 <span className="text-green-500">Wins: {score.wins}</span>
 <span className="text-red-500">Losses: {score.losses}</span>
 <span className="text-muted-foreground">Draws: {score.draws}</span>
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-8">
 {lastMatch && (
 <div className="flex items-center justify-center gap-8 text-6xl animate-in fade-in zoom-in duration-300">
 <div className="text-center">
 <p className="text-sm text-muted-foreground mb-2">You</p>
 <span>{CHOICES.find(c => c.id === lastMatch.user)?.emoji}</span>
 </div>
 <div className="text-2xl font-bold text-muted-foreground">VS</div>
 <div className="text-center">
 <p className="text-sm text-muted-foreground mb-2">CPU</p>
 <span>{CHOICES.find(c => c.id === lastMatch.cpu)?.emoji}</span>
 </div>
 </div>
 )}

 <div className="flex flex-wrap justify-center gap-4">
 {CHOICES.map(c => (
 <Button 
 key={c.id} 
 onClick={() => play(c.id)} 
 className="h-24 w-24 text-5xl flex flex-col items-center justify-center gap-2"
 variant="outline"
 >
 <span>{c.emoji}</span>
 <span className="text-xs capitalize">{c.id}</span>
 </Button>
 ))}
 </div>

 <div className="flex justify-center">
 <Button onClick={reset} variant="ghost"size="sm"className="gap-2 text-muted-foreground">
 <RotateCcw className="w-4 h-4"/> Reset Score
 </Button>
 </div>

 {history.length > 0 && (
 <div className="space-y-2">
 <h3 className="text-sm font-semibold text-muted-foreground">Recent Matches:</h3>
 <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
 {history.map((m, i) => (
 <div key={i} className={`p-2 rounded text-center text-sm border ${
 m.outcome ==="win"?"bg-green-500/10 border-green-500/30": 
 m.outcome ==="lose"?"bg-red-500/10 border-red-500/30": 
"bg-muted/50 border-border/50"
 }`}>
 {CHOICES.find(c => c.id === m.user)?.emoji} vs {CHOICES.find(c => c.id === m.cpu)?.emoji}
 </div>
 ))}
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Choose Weapon", description:"Select Rock, Paper, or Scissors.", icon: Swords },
 { step:"02", title:"CPU Picks", description:"The computer randomly selects its move simultaneously.", icon: Swords },
 { step:"03", title:"Resolve", description:"Rock beats Scissors, Scissors beats Paper, Paper beats Rock.", icon: Swords }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides 
 features={[
 { icon: Swords, title:"Visual Feedback", description:"Large emojis and animations make the battle clear."},
 { icon: Swords, title:"Match History", description:"Review your last 10 rounds to spot patterns."},
 { icon: Swords, title:"Score Tracking", description:"Persistent score counter for your current session."},
 { icon: Swords, title:"Fair RNG", description:"The CPU uses Math.random() ensuring a perfectly fair 33.3% chance for each move."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Rock Paper Scissors is a zero-sum game where the optimal strategy against a truly random opponent is to play randomly yourself (Nash Equilibrium).</p>
 <p>However, humans are notoriously bad at being random. If you can spot patterns in your opponent's psychology, you can gain an edge. Against our CPU, though, your best bet is to just have fun!</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion 
 faqs={[
 { question:"Is the computer truly random?", answer:"Yes, it uses JavaScript's built-in Math.random() which provides a uniform distribution across the three choices."},
 { question:"Can I play best of 5?", answer:"You can manually track your wins. The tool keeps a running tally and a history of your last 10 matches."},
 { question:"What if we both pick the same?", answer:"It's a draw! The round is recorded, but no points are awarded to either side."}
 ]} 
 />

 <RelatedTools currentToolUrl="/tools/fun/rps" max={6} />
 </div>
 );
}
