"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Dices, BarChart3, Calculator, TrendingUp } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const DICE_TYPES = [
 { label:"d4", sides: 4 },
 { label:"d6", sides: 6 },
 { label:"d8", sides: 8 },
 { label:"d10", sides: 10 },
 { label:"d12", sides: 12 },
 { label:"d20", sides: 20 }
];

export default function DiceProbabilityClient() {
 const [numDice, setNumDice] = useState(2);
 const [diceIdx, setDiceIdx] = useState(1); // d6 default

 const sides = DICE_TYPES[diceIdx].sides;

 const stats = useMemo(() => {
 const minSum = numDice;
 const maxSum = numDice * sides;
 const dp: number[][] = Array(numDice + 1).fill(0).map(() => Array(maxSum + 1).fill(0));
 
 for (let i = 1; i <= sides; i++) {
 dp[1][i] = 1;
 }

 for (let i = 2; i <= numDice; i++) {
 for (let j = i; j <= i * sides; j++) {
 for (let k = 1; k <= sides; k++) {
 if (j - k >= i - 1) {
 dp[i][j] += dp[i - 1][j - k];
 }
 }
 }
 }

 const totalOutcomes = Math.pow(sides, numDice);
 const distribution = [];
 let maxProb = 0;

 for (let i = minSum; i <= maxSum; i++) {
 const ways = dp[numDice][i];
 const prob = ways / totalOutcomes;
 if (prob > maxProb) maxProb = prob;
 distribution.push({ sum: i, ways, prob });
 }

 const expectedValue = numDice * (sides + 1) / 2;
 const variance = numDice * (Math.pow(sides, 2) - 1) / 12;

 return { distribution, totalOutcomes, expectedValue, variance, maxProb, minSum, maxSum };
 }, [numDice, sides]);

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
 icon={Dices} 
 title="Dice Probability Calculator"
 description="Calculate exact probability distributions, expected values, and variances for any dice combination."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Configuration</CardTitle>
 </CardHeader>
 <CardContent className="p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm font-medium">Number of Dice (1-6)</label>
 <input 
 type="range"
 min="1"
 max="6"
 value={numDice} 
 onChange={(e) => setNumDice(parseInt(e.target.value))}
 className="w-full accent-primary"
 />
 <div className="text-center font-bold text-lg">{numDice}</div>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Dice Type</label>
 <div className="grid grid-cols-3 gap-2">
 {DICE_TYPES.map((d, idx) => (
 <button
 key={d.label}
 onClick={() => setDiceIdx(idx)}
 className={`p-2 rounded-lg border text-sm font-semibold transition-all ${
 diceIdx === idx ?"bg-primary text-primary-foreground border-primary":"bg-background border-border hover:border-primary"
 }`}
 >
 {d.label}
 </button>
 ))}
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/50">
 <div className="p-4 bg-muted/50 rounded-xl text-center">
 <p className="text-xs text-muted-foreground uppercase">Total Outcomes</p>
 <p className="text-2xl font-bold">{stats.totalOutcomes.toLocaleString()}</p>
 </div>
 <div className="p-4 bg-muted/50 rounded-xl text-center">
 <p className="text-xs text-muted-foreground uppercase">Expected Value</p>
 <p className="text-2xl font-bold">{stats.expectedValue.toFixed(2)}</p>
 </div>
 <div className="p-4 bg-muted/50 rounded-xl text-center">
 <p className="text-xs text-muted-foreground uppercase">Variance</p>
 <p className="text-2xl font-bold">{stats.variance.toFixed(2)}</p>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Probability Distribution</CardTitle>
 </CardHeader>
 <CardContent className="p-6">
 <div className="flex items-end justify-between gap-1 h-64 w-full overflow-x-auto pb-8 relative">
 {stats.distribution.map((d) => {
 const heightPercent = (d.prob / stats.maxProb) * 100;
 return (
 <div key={d.sum} className="flex flex-col items-center flex-1 min-w-[20px] group relative h-full justify-end">
 <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover text-popover-foreground text-xs p-2 rounded shadow-lg z-10 whitespace-nowrap">
 Sum: {d.sum}<br/>
 Ways: {d.ways}<br/>
 Prob: {(d.prob * 100).toFixed(2)}%
 </div>
 <div 
 className="w-full bg-primary/80 hover:bg-primary rounded-t transition-all"
 style={{ height: `${heightPercent}%` }}
 />
 <span className="absolute -bottom-6 text-xs text-muted-foreground">{d.sum}</span>
 </div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Select Dice Count", description:"Use the slider to choose how many dice you want to roll (from 1 to 6).", icon: Dices },
 { step:"02", title:"Choose Dice Type", description:"Pick your preferred dice type, from standard d6 to D&D style d20.", icon: Calculator },
 { step:"03", title:"Analyze Results", description:"View the interactive histogram and statistical breakdown instantly.", icon: BarChart3 }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Dices, title:"Multiple Dice Types", description:"Support for d4, d6, d8, d10, d12, and d20 for tabletop RPGs and statistics."},
 { icon: BarChart3, title:"Visual Histogram", description:"A dynamic bar chart visualizes the exact probability curve of your dice pool."},
 { icon: Calculator, title:"Exact Math", description:"Calculates true combinations, expected value, and variance using dynamic programming."},
 { icon: TrendingUp, title:"Hover Tooltips", description:"Hover over any bar to see the exact number of ways to roll that specific sum."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Understanding dice probability is crucial for tabletop gamers, statisticians, and game designers. When you roll multiple dice, the distribution of possible sums forms a bell curve, heavily favoring the middle numbers.</p>
 <p>This calculator uses dynamic programming to compute the exact number of ways to achieve every possible sum, rather than relying on Monte Carlo simulations. This means the percentages, expected values, and variances provided are mathematically exact.</p>
 <p>Whether you are trying to optimize your character's damage output in Dungeons & Dragons, or teaching a statistics class about the Central Limit Theorem, this tool provides instant, reliable data without requiring any server-side processing.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"How is the expected value calculated?", answer:"The expected value (mean) for 'n' dice with 's' sides is calculated using the formula: n * (s + 1) / 2."},
 { question:"Why do middle numbers have higher probabilities?", answer:"There are simply more combinations of individual dice rolls that add up to middle numbers than to extreme minimum or maximum numbers."},
 { question:"Can I use this for board game strategy?", answer:"Absolutely. Knowing the exact probability of rolling a specific sum can heavily inform risk assessment in games like Settlers of Catan or Risk."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/dice-probability" max={6} />
 </div>
 );
}
