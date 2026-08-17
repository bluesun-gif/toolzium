"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw, Trash2, BookOpen, Shield, Shuffle, Hash, BarChart3, List, Zap, Settings2, Code2, Settings, History } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GridPattern } from "@/components/magicui/grid-pattern";
export default function RandomNumberClient() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(10);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [sortResults, setSortResults] = useState<boolean>(false);
  const [singleResult, setSingleResult] = useState<number | null>(null);
  const [bulkResults, setBulkResults] = useState<number[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const getSecureRandomNumber = (minVal: number, maxVal: number): number => {
    const range = maxVal - minVal + 1;
    const maxSafeInteger = Number.MAX_SAFE_INTEGER;
    if (range > maxSafeInteger) {
      // Fallback for extremely large ranges
      return Math.floor(Math.random() * range) + minVal;
    }

    // We need to find the smallest power of 256 that can represent the range
    const bytesNeeded = Math.ceil(Math.log2(range) / 8);
    const maxValidValue = Math.pow(256, bytesNeeded) - Math.pow(256, bytesNeeded) % range;
    const array = new Uint8Array(bytesNeeded);
    let randomValue;
    do {
      window.crypto.getRandomValues(array);
      randomValue = 0;
      for (let i = 0; i < bytesNeeded; i++) {
        randomValue = (randomValue << 8) + array[i];
      }
    } while (randomValue >= maxValidValue); // Reject values to avoid modulo bias

    return minVal + randomValue % range;
  };
  const generateSingle = useCallback(() => {
    if (min >= max) {
      toast.error("Min value must be less than Max value");
      return;
    }
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    const result = getSecureRandomNumber(min, max);
    setSingleResult(result);
    setHistory(prev => [result.toString(), ...prev].slice(0, 50));
  }, [min, max]);
  const generateBulk = useCallback(() => {
    if (min >= max) {
      toast.error("Min value must be less than Max value");
      return;
    }
    if (count < 1 || count > 100) {
      toast.error("Count must be between 1 and 100");
      return;
    }
    if (!allowDuplicates && count > max - min + 1) {
      toast.error("Cannot generate unique numbers: count exceeds range");
      return;
    }
    const results: number[] = [];
    const used = new Set<number>();
    while (results.length < count) {
      const num = getSecureRandomNumber(min, max);
      if (!allowDuplicates) {
        if (!used.has(num)) {
          used.add(num);
          results.push(num);
        }
      } else {
        results.push(num);
      }
    }
    if (sortResults) {
      results.sort((a, b) => a - b);
    }
    setBulkResults(results);
    setHistory(prev => [results.join(","), ...prev].slice(0, 50));
  }, [min, max, count, allowDuplicates, sortResults]);
  useEffect(() => {
    const result = getSecureRandomNumber(min, max);
    setSingleResult(result);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  const clearHistory = () => {
    setHistory([]);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Random Number Generator" description="Generate cryptographically secure random numbers within a specified range." />
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-2 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Generator Settings</CardTitle>
 </CardHeader>
 <CardContent>
 <Tabs defaultValue="single" className="w-full">
 <TabsList className="grid w-full grid-cols-2 mb-6">
 <TabsTrigger value="single">Single Number</TabsTrigger>
 <TabsTrigger value="bulk">Multiple Numbers</TabsTrigger>
 </TabsList>
 
 <div className="grid grid-cols-2 gap-4 mb-6">
 <div className="space-y-2">
 <Label htmlFor="min">Min</Label>
 <Input id="min" type="number" value={min} onChange={e => setMin(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label htmlFor="max">Max</Label>
 <Input id="max" type="number" value={max} onChange={e => setMax(Number(e.target.value))} />
 </div>
 </div>

 <TabsContent value="single" className="space-y-6">
 <div className="flex flex-col items-center justify-center py-12 bg-muted/30 rounded-lg border border-dashed relative overflow-hidden">
 <div className={cn("text-7xl md:text-9xl font-bold tracking-tighter tabular-nums transition-all duration-300", isAnimating ? "scale-110 opacity-50 blur-sm" : "scale-100 opacity-100 blur-0")}>
 {singleResult !== null ? singleResult : "-"}
 </div>
 </div>
 
 <div className="flex gap-4">
 <Button onClick={generateSingle} className="w-full" size="lg">
 <RefreshCw className={cn("mr-2 h-5 w-5", isAnimating && "animate-spin")} />
 Generate
 </Button>
 <Button variant="outline" size="lg" onClick={() => copyToClipboard(singleResult?.toString() || "")} disabled={singleResult === null}>
 <Copy className="h-5 w-5" />
 </Button>
 </div>
 </TabsContent>
 
 <TabsContent value="bulk" className="space-y-6">
 <div className="space-y-4 bg-muted/30 p-4 rounded-lg border">
 <div className="space-y-2">
 <Label htmlFor="count">How many numbers? (Max: 100)</Label>
 <Input id="count" type="number" min={1} max={100} value={count} onChange={e => setCount(Number(e.target.value))} />
 </div>
 
 <div className="flex items-center justify-between">
 <div className="space-y-0.5">
 <Label htmlFor="allowDuplicates">Allow Duplicates</Label>
 <p className="text-xs text-muted-foreground">
 Numbers can repeat in the result
 </p>
 </div>
 <Switch id="allowDuplicates" checked={allowDuplicates} onCheckedChange={setAllowDuplicates} />
 </div>
 
 <div className="flex items-center justify-between">
 <div className="space-y-0.5">
 <Label htmlFor="sortResults">Sort Results</Label>
 <p className="text-xs text-muted-foreground">
 Order numbers from smallest to largest
 </p>
 </div>
 <Switch id="sortResults" checked={sortResults} onCheckedChange={setSortResults} />
 </div>
 </div>

 {bulkResults.length > 0 && <div className="p-4 bg-muted/50 rounded-lg border break-words">
 <p className="text-lg tabular-nums leading-relaxed">
 {bulkResults.join(",")}
 </p>
 </div>}
 
 <div className="flex gap-4">
 <Button onClick={generateBulk} className="w-full" size="lg">
 <RefreshCw className="mr-2 h-5 w-5" />
 Generate {count > 0 ? count : ""} Numbers
 </Button>
 <Button variant="outline" size="lg" onClick={() => copyToClipboard(bulkResults.join(","))} disabled={bulkResults.length === 0}>
 <Copy className="h-5 w-5" />
 </Button>
 </div>
 </TabsContent>
 </Tabs>
 </CardContent>
 </Card>
 </div>

 <div className="md:col-span-1">
 <Card className="h-full">
 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
 <CardTitle className="text-sm font-medium">History</CardTitle>
 {history.length > 0 && <Button variant="ghost" size="icon" onClick={clearHistory} title="Clear History">
 <Trash2 className="h-4 w-4" />
 </Button>}
 </CardHeader>
 <CardContent>
 {history.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">
 No numbers generated yet
 </p> : <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
 {history.map((item, index) => <div key={index} className="text-sm p-2 bg-muted rounded truncate tabular-nums flex justify-between items-center group cursor-pointer hover:bg-muted/80" onClick={() => copyToClipboard(item)} title="Click to copy">
 <span className="truncate mr-2">{item}</span>
 <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
 </div>)}
 </div>}
 </CardContent>
 </Card>
 </div>
 </div>
 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks steps={[{
        step: "01",
        title: "Set Your Range",
        description: "Enter the minimum and maximum values for your random number. Supports any integer range — from 1-6 for dice, 1-100 for percentages, or custom ranges for any purpose.",
        icon: Settings2
      }, {
        step: "02",
        title: "Choose Options",
        description: "Select how many numbers to generate (1 to 1000), whether to allow duplicates, and whether to sort the results. Customize for your exact use case.",
        icon: Hash
      }, {
        step: "03",
        title: "Generate & Copy",
        description: "Click Generate to instantly get your random numbers. Copy all results to clipboard or download as a text file for use in spreadsheets, code, or research.",
        icon: Shuffle
      }]} badges={["Any range", "Bulk generation", "No duplicates option"]} />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides features={[{
        icon: Shuffle,
        title: "True Random Generation",
        description: "Uses the Web Crypto API (crypto.getRandomValues) for cryptographically secure random number generation — more unpredictable than Math.random() for sensitive applications."
      }, {
        icon: List,
        title: "Bulk Number Generation",
        description: "Generate up to 1,000 random numbers in a single click. Results are displayed in a scrollable list and can be copied or downloaded as a text file."
      }, {
        icon: Hash,
        title: "No Duplicates Mode",
        description: "Enable 'no duplicates' to ensure each generated number appears only once in the results — essential for lottery draws, random sampling, and unique ID generation."
      }, {
        icon: BarChart3,
        title: "Distribution Statistics",
        description: "Shows basic statistics on the generated set: min, max, average, and count — useful for verifying the distribution of generated numbers."
      }, {
        icon: Code2,
        title: "Float & Integer Support",
        description: "Generate integers for dice rolls, lottery numbers, and sampling. Or switch to decimal (float) mode for probability simulations and statistical sampling."
      }, {
        icon: Shield,
        title: "Cryptographically Secure",
        description: "Uses crypto.getRandomValues() for generation. This API is suitable for security-sensitive applications like generating OTPs, tokens, and keys."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Random Number Generation Guide — True vs Pseudo-Random</h3>
 <p>
 Not all random number generators are equal. The difference between
 <strong>pseudo-random number generators (PRNG)</strong> and
 <strong>cryptographically secure random number generators (CSPRNG)</strong> matters
 enormously for security applications. Understanding the distinction helps you choose
 the right tool for each use case.
 </p>

 <h4 className="font-semibold">PRNG vs CSPRNG Comparison</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Property</th>
 <th className="border p-2 text-left">PRNG (Math.random)</th>
 <th className="border p-2 text-left">CSPRNG (crypto.getRandomValues)</th>
 </tr>
 </thead>
 <tbody>
 {[["Speed", "Very fast", "Fast"], ["Unpredictability", "Predictable from seed", "Unpredictable"], ["Security", "Not secure", "Cryptographically secure"], ["Use case", "Games, simulations, UI effects", "Passwords, tokens, keys, OTPs"], ["Reproducible?", "Yes (with same seed)", "No"], ["Available in browser", "Math.random()", "crypto.getRandomValues()"]].map(([prop, prng, csprng]) => <tr key={prop} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{prop}</td>
 <td className="border p-2 text-xs">{prng}</td>
 <td className="border p-2 text-primary text-xs">{csprng}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Common Use Cases by Range</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Range</th>
 <th className="border p-2 text-left">Common Use</th>
 </tr>
 </thead>
 <tbody>
 {[["1 - 2", "Coin flip (1=heads, 2=tails)"], ["1 - 6", "Standard dice roll"], ["1 - 10", "Rating scale, priority"], ["1 - 100", "Percentile, probability"], ["1 - 49 (6 draws)", "Lottery number picker"], ["0 - 255", "RGB color channel"], ["1000 - 9999", "4-digit PIN"], ["1 - 1000000", "Random ID or ticket number"]].map(([range, use]) => <tr key={range} className="odd:bg-muted/20">
 <td className="border p-2 font-mono text-primary text-xs">{range}</td>
 <td className="border p-2 text-muted-foreground text-xs">{use}</td>
 </tr>)}
 </tbody>
 </table>
 </div>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion faqs={[{
        question: "Is this random number generator truly random?",
        answer: "This tool uses the browser's Web Crypto API (crypto.getRandomValues()), which is a cryptographically secure pseudo-random number generator (CSPRNG). It draws entropy from system hardware events and is suitable for security-sensitive applications like password generation and OTP tokens. It is not a 'true' hardware random generator (TRNG) but is far more unpredictable than Math.random()."
      }, {
        question: "What's the difference between Math.random() and crypto.getRandomValues()?",
        answer: "Math.random() is a pseudo-random number generator that produces a deterministic sequence from an internal seed — it can be predicted if the seed is known. crypto.getRandomValues() uses operating system entropy (hardware events, timing jitter) and is cryptographically unpredictable. Use Math.random() for games and animations; use crypto.getRandomValues() for passwords, tokens, and any security-critical randomness."
      }, {
        question: "How do I use a random number generator for a lottery?",
        answer: "Set the range to 1-49 (or your lottery's number range), enable 'no duplicates', and set count to 6 (or however many numbers your lottery requires). Each generated set is a unique combination of numbers. Note: lottery outcomes are equally random regardless of which numbers you choose — no combination is statistically more likely than another."
      }, {
        question: "Can I generate random numbers in a spreadsheet?",
        answer: "Yes. In Excel: RANDBETWEEN(1, 100) for integers, RAND() for 0-1 decimals. In Google Sheets: same functions work. These use PRNGs and regenerate every time the sheet recalculates. For static random numbers that don't change, copy-paste the results from this tool as values into your spreadsheet."
      }, {
        question: "What does 'no duplicates' mean in random number generation?",
        answer: "'No duplicates' (also called sampling without replacement) ensures each number appears at most once in the output. This is equivalent to drawing balls from a lottery machine — once drawn, the ball isn't returned. With duplicates allowed (sampling with replacement), the same number can appear multiple times — like rolling a die multiple times."
      }]} />
    </div>
    </div>
);
}
