"use client";

import { useState, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
 CardDescription,
} from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { Slider } from"@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from"@/components/ui/tabs";
import { ScrollArea } from"@/components/ui/scroll-area";
import { Badge } from"@/components/ui/badge";
import {
 Dices,
 RotateCcw,
 History,
 BarChart3,
 Trash2,
 BookOpen,
 Shield,
 Shuffle,
 Hash,
 Settings2,
 Zap,
} from"lucide-react";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
// Secure random number generator (1-6)
const secureRandomDie = () => {
 const array = new Uint32Array(1);
 window.crypto.getRandomValues(array);
 return (array[0] % 6) + 1;
};

const Die = ({ value, rolling }: { value: number; rolling: boolean }) => {
 const getDots = (v: number) => {
 switch (v) {
 case 1:
 return [4];
 case 2:
 return [0, 8];
 case 3:
 return [0, 4, 8];
 case 4:
 return [0, 2, 6, 8];
 case 5:
 return [0, 2, 4, 6, 8];
 case 6:
 return [0, 2, 3, 5, 6, 8];
 default:
 return [4];
 }
 };

 const dots = getDots(value);
 const rotation = rolling ? Math.floor(Math.random() * 360) : 0;

 return (
 <div
 className="w-16 h-16 sm:w-24 sm:h-24 bg-background border-2 border-border rounded-xl shadow-md p-2 grid grid-cols-3 grid-rows-3 gap-1 transition-all duration-300"
 style={{
 transform: rolling
 ? `rotate(${rotation}deg) scale(1.1)`
 :"rotate(0deg) scale(1)",
 }}
 >
 {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
 <div
 key={i}
 className={
"rounded-full transition-colors duration-200"+
 (dots.includes(i) ?"bg-muted":"bg-transparent")
 }
 />
 ))}
 </div>
 );
};

interface RollRecord {
 id: string;
 timestamp: Date;
 values: number[];
 total: number;
}

const DiceRollerClient = () => {
 const [numDice, setNumDice] = useState<number>(2);
 const [dice, setDice] = useState<number[]>([1, 1]);
 const [isRolling, setIsRolling] = useState(false);
 const [history, setHistory] = useState<RollRecord[]>([]);

 // Initialize dice when number of dice changes
 useEffect(() => {
 if (dice.length !== numDice) {
 const newDice = Array(numDice)
 .fill(1)
 .map((_, i) => dice[i] || 1);
 setDice(newDice);
 }
 }, [numDice, dice]);

 const rollDice = useCallback(() => {
 if (isRolling) return;

 setIsRolling(true);

 // Simulate rolling animation
 const rollInterval = setInterval(() => {
 setDice(
 Array(numDice)
 .fill(0)
 .map(() => Math.floor(Math.random() * 6) + 1),
 );
 }, 50);

 setTimeout(() => {
 clearInterval(rollInterval);
 const finalValues = Array(numDice)
 .fill(0)
 .map(() => secureRandomDie());
 setDice(finalValues);
 setIsRolling(false);

 setHistory((prev) => [
 {
 id: crypto.randomUUID(),
 timestamp: new Date(),
 values: finalValues,
 total: finalValues.reduce((a, b) => a + b, 0),
 },
 ...prev,
 ]);
 }, 600);
 }, [numDice, isRolling]);

 const clearHistory = () => setHistory([]);

 // Statistics
 const totalRolls = history.length;
 const allRolledValues = history.flatMap((h) => h.values);
 const totalSum = allRolledValues.reduce((a, b) => a + b, 0);
 const average =
 totalRolls > 0 ? (totalSum / allRolledValues.length).toFixed(2) :"0.00";

 const distribution = [1, 2, 3, 4, 5, 6].map((val) => ({
 value: val,
 count: allRolledValues.filter((v) => v === val).length,
 }));
 const maxCount = Math.max(...distribution.map((d) => d.count), 1);

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader
 title="Dice Roller"
 description="Roll virtual dice online with realistic faces, tracking, and statistics. Supports up to 6 dice simultaneously."
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <Card className="lg:col-span-2">
 <CardHeader>
 <CardTitle>Roll Dice</CardTitle>
 <CardDescription>
 Click the button or press Space to roll
 </CardDescription>
 </CardHeader>
 <CardContent className="space-y-8">
 <div className="space-y-4">
 <div className="flex justify-between items-center">
 <Label>Number of Dice: {numDice}</Label>
 </div>
 <Slider
 value={[numDice]}
 min={1}
 max={6}
 step={1}
 onValueChange={(val) => setNumDice(val[0])}
 disabled={isRolling}
 />
 </div>

 <div className="min-h-[250px] flex items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-100">
 <div className="flex flex-wrap justify-center gap-6">
 {dice.map((val, idx) => (
 <Die key={idx} value={val} rolling={isRolling} />
 ))}
 </div>
 </div>

 <div className="flex justify-center flex-col items-center gap-4">
 <Button
 size="lg"
 onClick={rollDice}
 disabled={isRolling}
 className="w-full sm:w-auto min-w-[200px] text-lg h-14"
 >
 {isRolling ? (
 <RotateCcw className="mr-2 h-6 w-6 animate-spin"/>
 ) : (
 <Dices className="mr-2 h-6 w-6"/>
 )}
 {isRolling ?"Rolling...":"Roll Dice"}
 </Button>

 {!isRolling && history.length > 0 && (
 <div className="text-center">
 <p className="text-sm text-muted-foreground">Total</p>
 <p className="text-4xl font-bold text-foreground">
 {history[0].total}
 </p>
 </div>
 )}
 </div>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Details</CardTitle>
 </CardHeader>
 <CardContent>
 <Tabs defaultValue="history">
 <TabsList className="grid w-full grid-cols-2">
 <TabsTrigger value="history">
 <History className="w-4 h-4 mr-2"/> History
 </TabsTrigger>
 <TabsTrigger value="stats">
 <BarChart3 className="w-4 h-4 mr-2"/> Stats
 </TabsTrigger>
 </TabsList>

 <TabsContent value="history"className="space-y-4 pt-4">
 <div className="flex justify-between items-center mb-2">
 <span className="text-sm font-medium text-muted-foreground">
 Recent Rolls
 </span>
 {history.length > 0 && (
 <Button variant="ghost"size="sm"onClick={clearHistory}>
 <Trash2 className="w-4 h-4 mr-2"/> Clear
 </Button>
 )}
 </div>
 <ScrollArea className="h-[350px] pr-4">
 {history.length === 0 ? (
 <div className="text-center text-muted-foreground text-sm py-10">
 No rolls yet
 </div>
 ) : (
 <div className="space-y-3">
 {history.map((record) => (
 <div
 key={record.id}
 className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100"
 >
 <div className="flex gap-2">
 {record.values.map((v, i) => (
 <Badge
 key={i}
 variant="outline"
 className="w-6 h-6 p-0 flex items-center justify-center bg-background"
 >
 {v}
 </Badge>
 ))}
 </div>
 <div className="flex flex-col items-end">
 <span className="font-bold">
 Sum: {record.total}
 </span>
 <span className="text-xs text-muted-foreground">
 {record.timestamp.toLocaleTimeString()}
 </span>
 </div>
 </div>
 ))}
 </div>
 )}
 </ScrollArea>
 </TabsContent>

 <TabsContent value="stats"className="space-y-6 pt-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-slate-50 rounded-lg text-center">
 <div className="text-xs text-muted-foreground mb-1">
 Total Rolls
 </div>
 <div className="text-2xl font-bold">{totalRolls}</div>
 </div>
 <div className="p-4 bg-slate-50 rounded-lg text-center">
 <div className="text-xs text-muted-foreground mb-1">
 Average Face
 </div>
 <div className="text-2xl font-bold">{average}</div>
 </div>
 </div>

 <div className="space-y-3">
 <Label>Face Distribution</Label>
 <div className="space-y-2">
 {distribution.map((d) => (
 <div key={d.value} className="flex items-center gap-3">
 <div className="w-4 text-sm font-medium">{d.value}</div>
 <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
 <div
 className="h-full bg-muted rounded-full transition-all duration-500"
 style={{
 width: `${totalRolls > 0 ? (d.count / maxCount) * 100 : 0}%`,
 }}
 />
 </div>
 <div className="w-8 text-right text-sm text-muted-foreground">
 {d.count}
 </div>
 </div>
 ))}
 </div>
 </div>
 </TabsContent>
 </Tabs>
 </CardContent>
 </Card>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Choose Your Dice",
 description:
"Select the type of die: d4, d6, d8, d10, d12, d20, d100, or custom-sided. Add a modifier (+2, -1) for RPG combat calculations.",
 icon: Settings2,
 },
 {
 step:"02",
 title:"Set Number of Dice",
 description:
"Roll 1 to 20 dice at once. Rolling 2d6 for Monopoly or 4d6 drop-lowest for D&D stats — all supported with one click.",
 icon: Hash,
 },
 {
 step:"03",
 title:"See Results",
 description:
"Each die shows its individual result with an animated roll. See the sum total, breakdown per die, and a full roll history you can reference during gameplay.",
 icon: BarChart3,
 },
 ]}
 badges={["d4 through d100","Multi-dice rolls","RPG modifiers"]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Dices,
 title:"All Standard Dice Types",
 description:
"Supports d4, d6, d8, d10, d12, d20, and d100 (percentile) — the standard tabletop RPG dice set. Plus custom dice with any number of sides.",
 },
 {
 icon: Hash,
 title:"Multi-Dice & Modifiers",
 description:
"Roll multiple dice simultaneously (e.g., 3d8+5 for D&D damage). Modifiers are added after rolling and displayed clearly in the result breakdown.",
 },
 {
 icon: Shuffle,
 title:"Cryptographically Secure",
 description:
"Uses crypto.getRandomValues() for each die roll — genuinely random, not predictable. Each face has an equal probability regardless of previous results.",
 },
 {
 icon: History,
 title:"Roll History",
 description:
"Tracks all previous rolls in the current session. Review the history to settle disputes, verify rolls, or analyze luck patterns during a gaming session.",
 },
 {
 icon: BarChart3,
 title:"Statistics & Probability",
 description:
"Shows the probability distribution for your dice configuration — so you know that rolling 2d6 has a 16.7% chance of 7, but only 2.8% chance of 2 or 12.",
 },
 {
 icon: Shield,
 title:"Private & Offline",
 description:
"All dice rolls are computed in your browser. No roll data is sent anywhere — safe for private gaming sessions and offline play.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">
 Dice Guide — Types, Probability, and RPG Notation
 </h3>
 <p>
 Tabletop roleplaying games (TTRPGs) like Dungeons & Dragons use a
 set of polyhedral dice to determine outcomes. Each die type has
 different probability characteristics. Understanding dice notation
 (XdY+Z) and probability distributions helps you make better
 decisions during gameplay.
 </p>

 <h4 className="font-semibold">Standard Dice Reference</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Die</th>
 <th className="border p-2 text-left">Sides</th>
 <th className="border p-2 text-left">Range</th>
 <th className="border p-2 text-left">Common Use</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["d4","4","1-4","Dagger damage (D&D), healing spell"],
 [
"d6",
"6",
"1-6",
"Board games, sword damage, fireball dice",
 ],
 ["d8","8","1-8","Longsword, cure wounds"],
 ["d10","10","1-10","Heavy crossbow, certain spells"],
 ["d12","12","1-12","Greataxe damage, barbarian hit die"],
 [
"d20",
"20",
"1-20",
"Attack rolls, saving throws, ability checks",
 ],
 [
"d100",
"100",
"1-100",
"Percentile rolls, wild magic, random tables",
 ],
 ].map(([die, sides, range, use]) => (
 <tr key={die} className="odd:bg-muted/20">
 <td className="border p-2 font-mono text-primary font-bold text-xs">
 {die}
 </td>
 <td className="border p-2 text-xs">{sides}</td>
 <td className="border p-2 font-mono text-xs">{range}</td>
 <td className="border p-2 text-muted-foreground text-xs">
 {use}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Dice Notation — Reading XdY+Z</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Notation</th>
 <th className="border p-2 text-left">Meaning</th>
 <th className="border p-2 text-left">Range</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["1d6","Roll one 6-sided die","1-6"],
 ["2d6","Roll two 6-sided dice, sum them","2-12"],
 ["3d8+5","Roll three d8s, add 5 to total","8-29"],
 [
"4d6 drop lowest",
"Roll 4d6, drop the lowest (D&D stat gen)",
"3-18",
 ],
 ["1d20+3","Roll d20, add proficiency/stat modifier","4-23"],
 ["2d10×10","Roll 2d10, multiply by 10 (gold)","20-200"],
 ].map(([notation, meaning, range]) => (
 <tr key={notation} className="odd:bg-muted/20">
 <td className="border p-2 font-mono text-primary text-xs">
 {notation}
 </td>
 <td className="border p-2 text-xs">{meaning}</td>
 <td className="border p-2 font-mono text-xs">{range}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"What dice do I need for D&D?",
 answer:
"A standard D&D dice set contains: d4, d6, d8, d10, d10 (percentile, marked 00-90), d12, and d20. That's 7 dice total (the d10 and percentile d10 work together for d100 rolls). Many players buy multiple d6s for spells like fireball (8d6) and extra d20s for advantage rolls.",
 },
 {
 question:"What is the most common roll on 2d6?",
 answer:
"7 is the most common result when rolling 2d6, with a probability of 6/36 = 16.7%. This is because there are 6 combinations that total 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). This is why 7 is the key number in Craps and why the sum of opposite faces on a d6 always equals 7.",
 },
 {
 question:"How does 4d6 drop lowest work for D&D character stats?",
 answer:
"Roll four 6-sided dice (4d6), remove the lowest die result, and sum the remaining three. This method gives an average result of approximately 12.24 (vs. 10.5 for 3d6), creating slightly heroic characters. Repeat 6 times and assign results to the 6 ability scores (STR, DEX, CON, INT, WIS, CHA).",
 },
 {
 question:"What is a percentile dice roll?",
 answer:
"A percentile roll (d100) uses two d10s: one for tens (00, 10, 20...90) and one for units (0-9). Together they produce 1-100. Some games use a single d100. Percentile rolls are used for random tables, wild magic surges, and any situation where you need a percentage-based outcome.",
 },
 {
 question:"Are digital dice rolls truly random?",
 answer:
"This tool uses crypto.getRandomValues() — a cryptographically secure random number generator. Each face has an equal probability with no predictable pattern. However, for official tournament play, most organizations require physical dice to prevent disputes. Digital dice are perfect for casual gaming, solo play, online games, and situations where physical dice aren't available.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/util/dice-roller"max={6} />
 </div>
 );
};

export default DiceRollerClient;
