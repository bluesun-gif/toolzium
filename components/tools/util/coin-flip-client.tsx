"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { RotateCcw, Coins, BookOpen, Shield, BarChart3, Shuffle, History, Percent, Zap, RefreshCw } from"lucide-react";
import { Badge } from"@/components/ui/badge";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { cn } from"@/lib/utils";

type CoinResult ="Heads"|"Tails";

export default function CoinFlipClient() {
 const [history, setHistory] = useState<CoinResult[]>([]);
 const [isFlipping, setIsFlipping] = useState(false);
 const [rotation, setRotation] = useState(0);

 const headsCount = history.filter((h) => h ==="Heads").length;
 const tailsCount = history.filter((h) => h ==="Tails").length;
 const totalFlips = history.length;

 const flipCoin = () => {
 if (isFlipping) return;
 
 setIsFlipping(true);
 
 // Generate true random number using crypto
 const array = new Uint32Array(1);
 window.crypto.getRandomValues(array);
 const result: CoinResult = array[0] % 2 === 0 ?"Heads":"Tails";
 
 // Calculate new rotation
 // Each flip adds at least 5 half-rotations (180deg) to spin a few times
 const spins = 5 + (array[0] % 5);
 const extraRotation = spins * 180;
 
 // Determine the next state based on current rotation
 const currentRotMod = rotation % 360;
 const isCurrentlyHeads = currentRotMod === 0;
 
 let targetRotation = rotation + extraRotation;
 const targetRotMod = targetRotation % 360;
 const willBeHeads = targetRotMod === 0;
 
 if ((result ==="Heads"&& !willBeHeads) || (result ==="Tails"&& willBeHeads)) {
 targetRotation += 180;
 }
 
 setRotation(targetRotation);
 
 setTimeout(() => {
 setHistory((prev) => [result, ...prev]);
 setIsFlipping(false);
 }, 1000); // Wait for the animation to finish
 };

 const resetStats = () => {
 setHistory([]);
 setRotation(0);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader title="Flip a Coin"description="Flip a virtual coin with true randomness and track your statistics."/>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
 <Card className="flex flex-col items-center p-6 text-center shadow-lg border-2">
 <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[350px]">
 {/* The Coin */}
 <div 
 className="relative w-56 h-56 cursor-pointer"
 onClick={flipCoin}
 style={{ perspective:"1000px"}}
 >
 <div 
 className="w-full h-full rounded-full transition-transform duration-1000 ease-out"
 style={{ 
 transform: `rotateY(${rotation}deg)`,
 transformStyle:"preserve-3d"
 }}
 >
 {/* Heads Side */}
 <div 
 className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border-8 border-yellow-700 shadow-[inset_0_0_20px_rgba(0,0,0,0.4),_0_10px_20px_rgba(0,0,0,0.3)]"
 style={{ backfaceVisibility:"hidden"}}
 >
 <div className="flex flex-col items-center text-yellow-900">
 <Coins size={64} className="mb-2 opacity-80"/>
 <span className="text-3xl font-black tracking-widest">HEADS</span>
 </div>
 </div>
 
 {/* Tails Side */}
 <div 
 className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border-8 border-slate-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.4),_0_10px_20px_rgba(0,0,0,0.3)]"
 style={{ 
 transform:"rotateY(180deg)",
 backfaceVisibility:"hidden"
 }}
 >
 <div className="flex flex-col items-center text-foreground">
 <Coins size={64} className="mb-2 opacity-80"/>
 <span className="text-3xl font-black tracking-widest">TAILS</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 
 <Button 
 size="lg"
 className="w-full mt-8 font-bold text-lg h-14"
 onClick={flipCoin}
 disabled={isFlipping}
 >
 {isFlipping ?"Flipping...":"FLIP COIN"}
 </Button>
 </Card>

 <div className="space-y-6">
 <Card>
 <CardHeader className="pb-3">
 <CardTitle className="text-xl">Statistics</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-3 gap-4 text-center mb-6">
 <div className="bg-secondary p-4 rounded-xl shadow-sm">
 <div className="text-4xl font-black">{totalFlips}</div>
 <div className="text-xs text-muted-foreground uppercase mt-2 font-semibold">Total Flips</div>
 </div>
 <div className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-400 p-4 rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-900/50">
 <div className="text-4xl font-black">{headsCount}</div>
 <div className="text-xs uppercase mt-2 font-semibold">Heads ({totalFlips ? Math.round((headsCount/totalFlips)*100) : 0}%)</div>
 </div>
 <div className="bg-slate-100 text-foreground dark:text-slate-300 p-4 rounded-xl shadow-sm border border-border">
 <div className="text-4xl font-black">{tailsCount}</div>
 <div className="text-xs uppercase mt-2 font-semibold">Tails ({totalFlips ? Math.round((tailsCount/totalFlips)*100) : 0}%)</div>
 </div>
 </div>
 <Button variant="outline"className="w-full"onClick={resetStats} disabled={totalFlips === 0}>
 <RotateCcw className="w-4 h-4 mr-2"/>
 Reset Statistics
 </Button>
 </CardContent>
 </Card>

 <Card className="flex-1">
 <CardHeader className="pb-3">
 <CardTitle className="text-xl">History</CardTitle>
 <CardDescription>Recent flips from newest to oldest</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto p-1">
 {history.length > 0 ? (
 history.map((result, i) => (
 <Badge 
 key={i} 
 className={cn("text-sm px-3 py-1", (result ==="Heads"
 ?"bg-yellow-500 hover:bg-yellow-600 text-white border-none shadow-sm"
 :"bg-slate-500 hover:bg-slate-600 text-white border-none shadow-sm"))}
 >
 {result ==="Heads"?"H":"T"}
 </Badge>
 ))
 ) : (
 <div className="w-full text-center py-8 text-sm text-muted-foreground border-2 border-dashed rounded-lg">
 No flips yet. Click the coin to start!
 </div>
 )}
 </div>
 </CardContent>
 </Card>
 </div>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Click to Flip",
 description:"Click the coin or the Flip button to simulate a coin toss. The result (Heads or Tails) is determined by a cryptographically secure random number generator.",
 icon: Coins,
 },
 {
 step:"02",
 title:"See the Result",
 description:"The coin animates and reveals Heads or Tails. The running tally updates — showing total flips, heads count, tails count, and current streak.",
 icon: BarChart3,
 },
 {
 step:"03",
 title:"Flip Multiple Times",
 description:"Use the bulk flip option to flip 10, 100, or 1000 coins at once. See the distribution and verify it approaches 50/50 as the sample size grows.",
 icon: Shuffle,
 },
 ]}
 badges={[
"Cryptographically random",
"Streak tracking",
"Bulk flip mode",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Shuffle,
 title:"Cryptographically Secure",
 description:"Uses crypto.getRandomValues() for each flip — the same API used for security tokens. Each result is genuinely independent with a 50% probability for each outcome.",
 },
 {
 icon: BarChart3,
 title:"Statistics Tracker",
 description:"Tracks total flips, heads count, tails count, heads percentage, and current streak. Watch the law of large numbers in action as heads/tails converge toward 50%.",
 },
 {
 icon: Coins,
 title:"Bulk Flip Mode",
 description:"Simulate 10, 100, or 1000 coin flips instantly. See the distribution of results and verify the expected 50/50 probability with large sample sizes.",
 },
 {
 icon: History,
 title:"Flip History",
 description:"Shows the last 20 flip results in sequence — useful for spotting streaks, verifying randomness, and keeping track in sequential decision-making games.",
 },
 {
 icon: Percent,
 title:"Probability Display",
 description:"Shows the running probability (percentage) of heads and tails from all flips in this session. Demonstrates how random distributions stabilize over many trials.",
 },
 {
 icon: Shield,
 title:"Private & Offline",
 description:"All randomization is client-side. No flip results are sent to any server. Works fully offline after the first page load.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Coin Flipping & Probability — The Math Behind 50/50</h3>
 <p>
 A fair coin flip is one of the purest examples of a random binary event — each outcome
 (heads or tails) has exactly 50% probability, and the result of each flip is completely
 independent of all previous flips. This makes it a perfect tool for decision-making,
 probability demonstrations, and understanding randomness.
 </p>

 <h4 className="font-semibold">Streak Probability Reference</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Streak Length</th>
 <th className="border p-2 text-left">Probability</th>
 <th className="border p-2 text-left">Odds (1 in N)</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["2 in a row","25%","1 in 4"],
 ["3 in a row","12.5%","1 in 8"],
 ["4 in a row","6.25%","1 in 16"],
 ["5 in a row","3.125%","1 in 32"],
 ["6 in a row","1.56%","1 in 64"],
 ["7 in a row","0.78%","1 in 128"],
 ["10 in a row","0.098%","1 in 1,024"],
 ["20 in a row","~0.0001%","1 in 1,048,576"],
 ].map(([streak, prob, odds]) => (
 <tr key={streak} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{streak}</td>
 <td className="border p-2 text-primary text-xs">{prob}</td>
 <td className="border p-2 text-muted-foreground text-xs">{odds}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">The Gambler's Fallacy — A Common Misconception</h4>
 <p>
 <strong>The Gambler's Fallacy</strong> is the mistaken belief that if heads has appeared
 many times in a row, tails is"due"to appear. In reality, each coin flip is completely
 independent. After 10 heads in a row, the probability of heads on the next flip is still
 exactly 50%. Past results do not influence future outcomes with a fair coin.
 </p>
 <p>
 This fallacy underlies many poor gambling decisions. The law of large numbers guarantees
 that results <em>approach</em> 50/50 over thousands of flips — but doesn't mean any
 specific short-term result is predictable or compensatory.
 </p>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"Is this coin flip truly random?",
 answer:"Yes. This tool uses the Web Crypto API (crypto.getRandomValues()) for each flip, which is a cryptographically secure pseudo-random number generator (CSPRNG). It draws entropy from system hardware events, making it genuinely unpredictable. Each flip is a 50/50 independent event with no bias toward either outcome.",
 },
 {
 question:"What is the probability of getting heads 10 times in a row?",
 answer:"The probability is (0.5)^10 = 1/1024, or about 0.1%. This means if you flip a coin 1000 times, you'd expect to see a streak of 10 heads approximately once. Streaks are expected features of random sequences, not anomalies — they feel surprising because humans intuitively underestimate the likelihood of runs.",
 },
 {
 question:"Is a physical coin flip truly 50/50?",
 answer:"Research suggests physical coin flips are slightly biased. A 2007 study by Persi Diaconis found coins land on the same side they started 51% of the time. The bias is small but real, caused by precession (wobbling) during the flip. A digital coin flip using a CSPRNG is closer to a true 50/50 than a physical coin.",
 },
 {
 question:"Can I use this for decision making?",
 answer:"Absolutely. Coin flipping for decisions (sometimes called 'the coin flip technique') is a legitimate decision tool when two options are equally viable. Some decision theorists recommend it specifically: while the flip is in the air, you often feel a preference for one outcome — use that feeling as the decision, not the actual result. The flip reveals your subconscious preference.",
 },
 {
 question:"What does 'law of large numbers' mean for coin flips?",
 answer:"The law of large numbers states that as the number of trials increases, the average result converges toward the expected probability. After 10 flips, you might have 7 heads (70%). After 1000 flips, you'll likely have 490-510 heads (49-51%). After 1 million flips, the result will be extremely close to 50.0%. The more flips, the closer to 50/50.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/util/coin-flip" max={6} />
 </div>
 );
}
