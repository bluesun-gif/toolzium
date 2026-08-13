"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { CircleDot, RotateCcw } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

export default function CoinFlipClient() {
 const [result, setResult] = useState<"Heads"|"Tails"| null>(null);
 const [isFlipping, setIsFlipping] = useState(false);
 const [history, setHistory] = useState<("Heads"|"Tails")[]>([]);

 const flip = () => {
 setIsFlipping(true);
 setResult(null);
 setTimeout(() => {
 const res = Math.random() < 0.5 ?"Heads":"Tails";
 setResult(res);
 setHistory(prev => ([res, ...prev].slice(0, 20) as ("Heads"|"Tails")[]));
 setIsFlipping(false);
 }, 800);
 };

 const reset = () => {
 setResult(null);
 setHistory([]);
 };

 const headsCount = history.filter(h => h ==="Heads").length;
 const tailsCount = history.filter(h => h ==="Tails").length;
 const total = history.length;
 const headsPercent = total > 0 ? (headsCount / total) * 100 : 50;

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

 <ToolPageHeader icon={CircleDot} title="Coin Flip Simulator"description="Flip a virtual coin with realistic animation and track your heads vs tails statistics."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Coin Flipper</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6 flex flex-col items-center">
 <div 
 className={`w-48 h-48 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-6xl font-bold text-yellow-900 shadow-2xl border-8 border-yellow-700 transition-transform duration-700 ${isFlipping ?"animate-spin":""}`}
 >
 {isFlipping ?"?": (result ? result[0] :"?")}
 </div>
 
 <div className="text-3xl font-bold h-10 flex items-center">
 {isFlipping ?"Flipping...": (result ||"Ready to Flip")}
 </div>

 <div className="flex gap-4">
 <Button onClick={flip} disabled={isFlipping} size="lg"className="px-8">
 Flip Coin
 </Button>
 <Button variant="outline"onClick={reset} disabled={isFlipping}>
 <RotateCcw className="w-4 h-4 mr-2"/> Reset
 </Button>
 </div>

 {total > 0 && (
 <div className="w-full max-w-md space-y-4 mt-8">
 <div className="flex justify-between text-sm font-medium">
 <span>Heads: {headsCount}</span>
 <span>Tails: {tailsCount}</span>
 </div>
 <div className="w-full h-6 bg-muted rounded-full overflow-hidden flex">
 <div className="h-full bg-blue-500 flex items-center justify-center text-xs text-white font-bold"style={{ width: `${headsPercent}%` }}>
 {headsPercent.toFixed(0)}%
 </div>
 <div className="h-full bg-red-500 flex items-center justify-center text-xs text-white font-bold"style={{ width: `${100 - headsPercent}%` }}>
 {(100 - headsPercent).toFixed(0)}%
 </div>
 </div>
 <div className="flex flex-wrap gap-2 justify-center mt-4">
 {history.map((h, i) => (
 <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${h ==="Heads"?"bg-blue-500":"bg-red-500"}`}>
 {h[0]}
 </div>
 ))}
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Click Flip", description:"Hit the flip button to trigger the virtual coin toss animation.", icon: CircleDot },
 { step:"02", title:"View Result", description:"The coin lands on either Heads or Tails, displayed prominently.", icon: CircleDot },
 { step:"03", title:"Track Stats", description:"Monitor your running history and the statistical distribution of your flips.", icon: CircleDot }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: CircleDot, title:"Realistic Animation", description:"Watch the coin spin with a smooth CSS animation before revealing the outcome."},
 { icon: CircleDot, title:"Visual History", description:"See a chronological trail of your recent flips represented by colored dots."},
 { icon: CircleDot, title:"Statistical Bar", description:"A dynamic percentage bar shows the exact ratio of heads to tails over time."},
 { icon: CircleDot, title:"Instant Reset", description:"Clear your history and start fresh with a single click of the reset button."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Flipping a coin is the universal method for resolving disputes, making random choices, or starting a sports match. Our digital simulator replicates the 50/50 probability of a physical coin toss.</p>
 <p>Over a large number of flips, you will observe the law of large numbers in action, as the percentage of heads and tails converges toward exactly 50%. This makes it an excellent educational tool for basic probability.</p>
 <p>The tool maintains a local history of your session, allowing you to track streaks and distributions without requiring an internet connection or account.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Is the coin flip truly 50/50?", answer:"Yes, the underlying algorithm generates a random decimal between 0 and 1. Anything below 0.5 is Heads, and 0.5 or above is Tails, ensuring a perfect mathematical probability."},
 { question:"Can I flip multiple coins at once?", answer:"This specific tool flips one coin at a time to maintain the visual animation. For batch randomization, try our Random Number Generator."},
 { question:"Does my history save if I refresh?", answer:"No, the history is stored in the browser's temporary memory and will be cleared upon refreshing the page to protect your privacy."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/coin-flip" max={6} />
 </div>
 );
}
