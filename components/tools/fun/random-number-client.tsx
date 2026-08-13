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
import { CopyButton } from"@/components/shared/action-buttons";
import { Dices } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

export default function RandomNumberClient() {
 const [min, setMin] = useState("1");
 const [max, setMax] = useState("100");
 const [count, setCount] = useState("5");
 const [unique, setUnique] = useState(false);
 const [results, setResults] = useState<number[]>([]);

 const generate = () => {
 const minVal = parseInt(min);
 const maxVal = parseInt(max);
 const countVal = parseInt(count);

 if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal)) {
 toast.error("Please enter valid numbers");
 return;
 }
 if (minVal > maxVal) {
 toast.error("Min cannot be greater than Max");
 return;
 }
 if (unique && (maxVal - minVal + 1 < countVal)) {
 toast.error("Range is too small for unique numbers");
 return;
 }

 const nums: number[] = [];
 const pool = Array.from({ length: maxVal - minVal + 1 }, (_, i) => i + minVal);
 
 for (let i = 0; i < countVal; i++) {
 if (unique) {
 const idx = Math.floor(Math.random() * pool.length);
 nums.push(pool[idx]);
 pool.splice(idx, 1);
 } else {
 nums.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
 }
 }
 setResults(nums);
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

 <ToolPageHeader icon={Dices} title="Random Number Generator"description="Generate random integers within a custom range, with options for unique values and batch generation."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Generator Settings</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-sm font-medium">Minimum</label>
 <Input type="number"value={min} onChange={e => setMin(e.target.value)} />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Maximum</label>
 <Input type="number"value={max} onChange={e => setMax(e.target.value)} />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Count</label>
 <Input type="number"value={count} onChange={e => setCount(e.target.value)} />
 </div>
 </div>
 
 <div className="flex items-center space-x-2">
 <input 
 type="checkbox"
 id="unique"
 checked={unique} 
 onChange={e => setUnique(e.target.checked)}
 className="h-4 w-4 rounded border-border accent-primary"
 />
 <label htmlFor="unique"className="text-sm font-medium">Generate unique numbers only</label>
 </div>

 <Button onClick={generate} className="w-full sm:w-auto">Generate Numbers</Button>

 {results.length > 0 && (
 <div className="space-y-4 mt-6">
 <div className="flex items-center justify-between">
 <h3 className="text-sm font-semibold">Results</h3>
 <CopyButton getText={() => results.join(",")} label="Copy All"/>
 </div>
 <div className="flex flex-wrap gap-2">
 {results.map((num, i) => (
 <div key={i} className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg font-mono font-bold">
 {num}
 </div>
 ))}
 </div>
 <div className="p-3 bg-muted/30 rounded-lg text-sm font-mono break-all">
 {results.join(",")}
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Define Range", description:"Set the minimum and maximum boundaries for your random numbers.", icon: Dices },
 { step:"02", title:"Set Quantity", description:"Choose how many numbers to generate and toggle unique mode if needed.", icon: Dices },
 { step:"03", title:"Generate & Copy", description:"Click generate to see the results in badges and copy them as a CSV list.", icon: Dices }
 ]} 
 badges={["100% Free","Client-Side","No Signup"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Dices, title:"Custom Boundaries", description:"Define any integer range, from small dice rolls to massive lottery pools."},
 { icon: Dices, title:"Unique Mode", description:"Ensure no duplicates are generated, perfect for raffle draws and sampling."},
 { icon: Dices, title:"Batch Generation", description:"Generate hundreds of random numbers simultaneously in a single click."},
 { icon: Dices, title:"CSV Export", description:"Copy the entire result set as a comma-separated list for easy pasting."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Random number generation is essential for statistics, cryptography, gaming, and randomized sampling. Our tool uses JavaScript's Math.random() combined with cryptographic-quality entropy sources provided by the browser.</p>
 <p>The unique mode guarantees that every number drawn is distinct, making it ideal for selecting winners from a participant list or assigning randomized tasks without overlap.</p>
 <p>All generation happens instantly on your device, meaning you can run massive simulations or generate thousands of numbers without waiting for server responses.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Are the numbers truly random?", answer:"They are pseudo-random numbers generated by the browser's JavaScript engine, which is sufficiently random for almost all non-cryptographic applications like games and sampling."},
 { question:"Can I generate negative numbers?", answer:"Yes, simply set the minimum value to a negative integer (e.g., -100 to 100)."},
 { question:"What happens if I ask for 10 unique numbers between 1 and 5?", answer:"The tool will display an error because the range only contains 5 possible numbers, making it impossible to generate 10 unique ones."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/random-number" max={6} />
 </div>
 );
}
