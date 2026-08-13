"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Shuffle, Copy, Trash2 } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

function getPermutations(str: string): string[] {
 if (str.length <= 1) return [str];
 const perms = new Set<string>();
 for (let i = 0; i < str.length; i++) {
 const char = str[i];
 const remaining = str.slice(0, i) + str.slice(i + 1);
 for (const perm of getPermutations(remaining)) {
 perms.add(char + perm);
 }
 }
 return Array.from(perms);
}

function getRandomShuffles(str: string, count: number): string[] {
 const shuffles = new Set<string>();
 const arr = str.split("");
 while (shuffles.size < count && shuffles.size < 100) {
 for (let i = arr.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [arr[i], arr[j]] = [arr[j], arr[i]];
 }
 shuffles.add(arr.join(""));
 }
 return Array.from(shuffles);
}

export default function AnagramSolverClient() {
 const [input, setInput] = useState("");

 const anagrams = useMemo(() => {
 const clean = input.replace(/\s+/g,"").toLowerCase();
 if (!clean) return [];
 if (clean.length <= 6) {
 return getPermutations(clean);
 }
 return getRandomShuffles(clean, 50);
 }, [input]);

 const copyAll = () => {
 if (anagrams.length === 0) return toast.error("Nothing to copy!");
 navigator.clipboard.writeText(anagrams.join(","));
 toast.success("All anagrams copied!");
 };

 const clearInput = () => {
 setInput("");
 toast.success("Cleared!");
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
 icon={Shuffle} 
 title="Anagram Solver"
 description="Generate all possible anagram rearrangements for your words and phrases instantly."
 />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Shuffle className="w-4 h-4 text-primary"/> Word Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div className="flex gap-2">
 <Input 
 value={input} 
 onChange={(e) => setInput(e.target.value)} 
 placeholder="Enter a word or phrase..."
 className="flex-1"
 />
 <Button onClick={clearInput} variant="outline"size="icon">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 
 {anagrams.length > 0 && (
 <div className="space-y-3">
 <div className="flex items-center justify-between">
 <p className="text-sm text-muted-foreground">
 Found <span className="font-bold text-foreground">{anagrams.length}</span> {anagrams.length === 1 ? 'result' : 'results'}
 {input.replace(/\s+/g,"").length > 6 &&"(showing random samples for long words)"}
 </p>
 <div className="flex gap-2">
 <CopyButton getText={() => anagrams.join(",")} label="Copy All"/>
 </div>
 </div>
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-96 overflow-y-auto p-1">
 {anagrams.map((word, i) => (
 <div key={i} className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded-lg border border-border/50 text-sm font-mono">
 <span>{word}</span>
 <button onClick={() => { navigator.clipboard.writeText(word); toast.success("Copied!"); }} className="text-muted-foreground hover:text-primary">
 <Copy className="w-3 h-3"/>
 </button>
 </div>
 ))}
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Enter Text", description:"Type any word or phrase into the input field above.", icon: Shuffle },
 { step:"02", title:"Generate", description:"Our algorithm instantly calculates all possible letter combinations.", icon: Shuffle },
 { step:"03", title:"Copy Results", description:"Browse the grid and copy individual words or the entire list.", icon: Copy }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides 
 features={[
 { icon: Shuffle, title:"Smart Permutations", description:"Calculates exact mathematical permutations for short words."},
 { icon: Shuffle, title:"Random Sampling", description:"Uses random shuffling for longer phrases to prevent browser freezing."},
 { icon: Copy, title:"Quick Copy", description:"Copy individual anagrams or the entire list with a single click."},
 { icon: Trash2, title:"Instant Clear", description:"Reset the tool and start a new word search immediately."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once. Our Anagram Solver is the perfect tool for word games like Scrabble, Words with Friends, or crossword puzzles.</p>
 <p>For words with 6 or fewer letters, the tool calculates every single mathematically possible arrangement. For longer phrases, generating millions of combinations would crash your browser, so the tool intelligently switches to a random sampling algorithm, providing you with a diverse selection of valid shuffles.</p>
 <p>Because all processing happens locally in your browser, your words are never sent to a server, ensuring complete privacy and instant results without network latency.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion 
 faqs={[
 { question:"How many anagrams can a word have?", answer:"The number of anagrams depends on the word's length and repeating letters. A 5-letter word with unique letters has 120 permutations (5!), while repeating letters reduce the total unique combinations."},
 { question:"Why does it show random samples for long words?", answer:"A 10-letter word has over 3.6 million permutations. Generating all of them would freeze your browser. The tool switches to random sampling to provide instant, useful results without crashing."},
 { question:"Does it support phrases with spaces?", answer:"Yes! The tool automatically strips spaces and punctuation, treating the entire phrase as a single pool of letters to rearrange."}
 ]} 
 />

 <RelatedTools currentToolUrl="/tools/fun/anagram-solver" max={6} />
 </div>
 );
}
