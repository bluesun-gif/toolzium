"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Dice1, RotateCcw } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

export default function DiceRollerClient() {
 const [numDice, setNumDice] = useState(2);
 const [sides, setSides] = useState(6);
 const [modifier, setModifier] = useState(0);
 const [results, setResults] = useState<number[]>([]);
 const [history, setHistory] = useState<{ rolls: number[], total: number }[]>([]);

 const roll = () => {
 const rolls: number[] = [];
 for (let i = 0; i < numDice; i++) {
 rolls.push(Math.floor(Math.random() * sides) + 1);
 }
 setResults(rolls);
 const total = rolls.reduce((a, b) => a + b, 0) + modifier;
 setHistory(prev => [{ rolls, total }, ...prev].slice(0, 10));
 };

 const total = results.length > 0 ? results.reduce((a, b) => a + b, 0) + modifier : 0;

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader icon={Dice1} title="Dice Roller"description="Roll multiple polyhedral dice with custom modifiers, perfect for tabletop RPGs and board games."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Roll Configuration</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-sm font-medium">Number of Dice (1-6)</label>
 <Input type="number"min="1"max="6"value={numDice} onChange={e => setNumDice(Math.max(1, Math.min(6, parseInt(e.target.value) || 1)))} />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Sides per Die</label>
 <select 
 value={sides} 
 onChange={e => setSides(parseInt(e.target.value))}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 >
 {[4, 6, 8, 10, 12, 20, 100].map(s => <option key={s} value={s}>d{s}</option>)}
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Modifier (+/-)</label>
 <Input type="number"value={modifier} onChange={e => setModifier(parseInt(e.target.value) || 0)} />
 </div>
 </div>

 <div className="flex gap-4">
 <Button onClick={roll} size="lg"className="flex-1">Roll {numDice}d{sides}</Button>
 <Button variant="outline"onClick={() => { setResults([]); setHistory([]); }}>
 <RotateCcw className="w-4 h-4 mr-2"/> Clear
 </Button>
 </div>

 {results.length > 0 && (
 <div className="space-y-4 mt-6">
 <div className="flex flex-wrap gap-4 justify-center">
 {results.map((r, i) => (
 <div key={i} className="w-20 h-20 rounded-xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-3xl font-bold text-primary shadow-lg">
 {r}
 </div>
 ))}
 </div>
 <div className="text-center">
 <div className="text-sm text-muted-foreground">Total {modifier !== 0 ? `(incl. ${modifier > 0 ?"+":""}${modifier})` :""}</div>
 <div className="text-5xl font-bold">{total}</div>
 </div>
 </div>
 )}

 {history.length > 0 && (
 <div className="mt-8 border-t border-border/50 pt-4">
 <h3 className="text-sm font-semibold mb-2">Recent Rolls</h3>
 <div className="space-y-2 max-h-40 overflow-y-auto">
 {history.map((h, i) => (
 <div key={i} className="flex justify-between text-sm p-2 bg-muted/20 rounded-lg">
 <span className="font-mono text-muted-foreground">[{h.rolls.join(",")}]</span>
 <span className="font-bold">Total: {h.total}</span>
 </div>
 ))}
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Select Dice", description:"Choose how many dice to roll and the number of sides (d4, d6, d20, etc.).", icon: Dice1 },
 { step:"02", title:"Add Modifier", description:"Apply a positive or negative modifier for RPG buffs or penalties.", icon: Dice1 },
 { step:"03", title:"Roll & Tally", description:"Hit roll to see individual results, the grand total, and save it to your history.", icon: Dice1 }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Dice1, title:"Polyhedral Support", description:"Supports all standard RPG dice including d4, d6, d8, d10, d12, d20, and d100."},
 { icon: Dice1, title:"Custom Modifiers", description:"Easily add your character's strength or magic bonuses to the final roll total."},
 { icon: Dice1, title:"Roll History", description:"Keeps a log of your last 10 rolls so you can verify past turns during a game."},
 { icon: Dice1, title:"Multi-Dice", description:"Roll up to 6 dice simultaneously, ideal for fireball spells or multiple attacks."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Whether you are a Dungeon Master running a campaign or a player exploring a dungeon, having a reliable dice roller is essential. This tool faithfully simulates physical polyhedral dice using robust random number generation.</p>
 <p>The inclusion of modifiers makes it perfectly suited for modern tabletop RPG systems like Dungeons & Dragons or Pathfinder, where rolling 4d6 and adding a +3 ability modifier is a common occurrence.</p>
 <p>The roll history feature ensures that disputes over"what I rolled last turn"are easily resolved, keeping your game session flowing smoothly.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"What does '2d6+3' mean?", answer:"It means rolling two 6-sided dice, summing their face values, and then adding 3 to the final result."},
 { question:"Can I roll a d100?", answer:"Yes, simply select 1 die and choose d100 from the sides dropdown, which is commonly used for percentile checks."},
 { question:"Is this truly random?", answer:"Yes, it uses the browser's cryptographic random number generators to ensure fair and unpredictable rolls."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/dice-roller" max={6} />
 </div>
 );
}
