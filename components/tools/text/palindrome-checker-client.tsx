"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RotateCcw, CheckCircle2, XCircle, Check, Type } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
export default function PalindromeCheckerClient() {
  const [input, setInput] = useState("");
  const {
    isPalindrome,
    cleaned,
    reversed
  } = useMemo(() => {
    const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, "");
    const reversed = cleaned.split("").reverse().join("");
    const isPalindrome = cleaned.length > 0 && cleaned === reversed;
    return {
      isPalindrome,
      cleaned,
      reversed
    };
  }, [input]);
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={RotateCcw} title="Palindrome Checker" description="Check if your text is a palindrome — reads the same forwards and backwards." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <RotateCcw className="w-4 h-4 text-primary" /> Input Text
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to check (e.g., 'A man, a plan, a canal: Panama')" />

 {input && <div className="space-y-3">
 <div className={`p-4 rounded-lg border-2 ${isPalindrome ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}>
 <div className="flex items-center gap-3">
 {isPalindrome ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
 <span className={`font-semibold ${isPalindrome ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
 {isPalindrome ? "Yes, this is a palindrome!" : "No, this is not a palindrome."}
 </span>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 <div className="p-3 bg-muted/40 rounded-lg">
 <div className="text-xs text-muted-foreground mb-1">Cleaned String</div>
 <div className="font-mono text-sm break-all">{cleaned || "—"}</div>
 </div>
 <div className="p-3 bg-muted/40 rounded-lg">
 <div className="text-xs text-muted-foreground mb-1">Reversed</div>
 <div className="font-mono text-sm break-all">{reversed || "—"}</div>
 </div>
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Text",
        description: "Type any word, phrase, or sentence you want to check.",
        icon: RotateCcw
      }, {
        step: "02",
        title: "Automatic Analysis",
        description: "The tool removes spaces, punctuation, and converts to lowercase for fair comparison.",
        icon: CheckCircle2
      }, {
        step: "03",
        title: "View Results",
        description: "See instantly whether your text is a palindrome with visual confirmation.",
        icon: CheckCircle2
      }]} badges={["100% Free", "Client-Side", "Instant"]} />

 <ToolFeatureGuides features={[{
        icon: RotateCcw,
        title: "Smart Normalization",
        description: "Automatically removes spaces, punctuation, and converts to lowercase for accurate comparison."
      }, {
        icon: CheckCircle2,
        title: "Real-Time Checking",
        description: "Results update instantly as you type without needing to click a button."
      }, {
        icon: RotateCcw,
        title: "Visual Comparison",
        description: "Shows the cleaned string and its reverse side-by-side for transparency."
      }, {
        icon: CheckCircle2,
        title: "Phrase Support",
        description: "Works with single words, phrases, and full sentences including punctuation."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>A palindrome is a word, phrase, number, or sequence that reads the same forwards and backwards. Classic examples include"racecar","madam", and"level". Palindromic phrases like"A man, a plan, a canal: Panama"ignore spaces, punctuation, and capitalization to reveal the underlying symmetry.</p>
 <p>This checker normalizes your input by converting everything to lowercase and removing all non-alphanumeric characters before comparison. This means"Was it a car or a cat I saw?"correctly identifies as a palindrome because the cleaned version"wasitacaroracatisaw"matches its reverse exactly.</p>
 <p>Palindromes appear throughout language, mathematics, and computer science. In programming, palindrome detection is a common algorithmic exercise that teaches string manipulation and comparison techniques. They also appear in DNA sequences, number theory (palindromic primes), and recreational mathematics. This tool makes it easy to verify palindromes for educational purposes, puzzle solving, or just satisfying curiosity about word patterns.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Does it handle spaces and punctuation?",
        answer: "Yes, the checker automatically removes all spaces, punctuation, and special characters, and converts to lowercase for accurate comparison."
      }, {
        question: "Can I check numbers?",
        answer: "Yes, numbers work too. For example, 12321 is a numeric palindrome."
      }, {
        question: "What about case sensitivity?",
        answer: "The tool ignores case, so 'Racecar' and 'racecar' are both recognized as palindromes."
      }]} />
    </div>
    </div>
);
}
