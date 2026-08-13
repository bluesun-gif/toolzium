"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { Scissors, FileText, Settings, Check } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";
export default function WhitespaceRemoverClient() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const processText = (mode: string) => {
    if (!text) {
      toast.error("Please enter some text first.");
      return;
    }
    let result = text;
    switch (mode) {
      case "all":
        result = text.replace(/\s+/g, "");
        break;
      case "collapse":
        result = text.replace(/[ \t]+/g, "");
        break;
      case "trim":
        result = text.split("\n").map(line => line.trim()).join("\n");
        break;
      case "leading":
        result = text.split("\n").map(line => line.replace(/^\s+/, "")).join("\n");
        break;
      case "trailing":
        result = text.split("\n").map(line => line.replace(/\s+$/, "")).join("\n");
        break;
    }
    setOutput(result);
    toast.success(`Applied: ${mode} whitespace removal`);
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Scissors} title="Whitespace Remover" description="Strip, collapse, or trim unwanted spaces, tabs, and line breaks from your text data." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><FileText className="w-4 h-4 text-primary" /> Input Text</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <textarea value={text} onChange={e => setText(e.target.value)} rows={8} className={textareaClass} placeholder="Paste text with irregular spacing, indentation, or trailing spaces..." />
 <div className="flex flex-wrap gap-2">
 <Button variant="outline" size="sm" onClick={() => processText("all")}>Remove All Spaces</Button>
 <Button variant="outline" size="sm" onClick={() => processText("collapse")}>Collapse Multiple Spaces</Button>
 <Button variant="outline" size="sm" onClick={() => processText("trim")}>Trim Every Line</Button>
 <Button variant="outline" size="sm" onClick={() => processText("leading")}>Remove Leading Spaces</Button>
 <Button variant="outline" size="sm" onClick={() => processText("trailing")}>Remove Trailing Spaces</Button>
 </div>
 </CardContent>
 </GlassCard>

 {output && <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Check className="w-4 h-4 text-primary" /> Cleaned Output</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea value={output} readOnly rows={8} className={textareaClass} />
 <div className="flex justify-end">
 <CopyButton getText={() => output} label="Copy Result" />
 </div>
 </CardContent>
 </GlassCard>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Paste Messy Text",
        description: "Input text containing extra spaces, bad indentation, or trailing whitespace.",
        icon: FileText
      }, {
        step: "02",
        title: "Select Action",
        description: "Choose the specific whitespace manipulation you want to apply.",
        icon: Settings
      }, {
        step: "03",
        title: "Copy Clean Data",
        description: "Grab the perfectly formatted text and use it in your code or document.",
        icon: Check
      }]} badges={["100% Free", "Client-Side", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: Scissors,
        title: "Total Removal",
        description: "Strip every single space, tab, and newline to create a continuous string of characters."
      }, {
        icon: Settings,
        title: "Smart Collapse",
        description: "Convert sequences of multiple spaces or tabs into a single, clean space."
      }, {
        icon: FileText,
        title: "Line Trimming",
        description: "Remove invisible trailing spaces at the end of lines that often cause linting errors."
      }, {
        icon: Check,
        title: "Code Formatting",
        description: "Perfect for fixing indentation issues when copying code snippets from PDFs or websites."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Invisible characters like spaces, tabs, and carriage returns are a frequent source of bugs in programming and data processing. Trailing whitespace at the end of a line can cause strict linters to fail, break CSV parsing, or cause authentication tokens to be rejected by APIs. This tool provides surgical precision for removing these hidden characters.</p>
 <p>When copying code from tutorials, PDF textbooks, or formatted websites, you often inherit strange indentation or non-breaking spaces that break your IDE's syntax highlighting. The"Collapse Multiple Spaces"and"Trim Every Line"functions quickly normalize this text so it can be safely pasted into your codebase without triggering compiler warnings.</p>
 <p>For data analysts, removing all whitespace is useful when comparing two strings that should be identical but differ only in formatting, or when preparing data for systems that do not accept spaces in identifiers. The ability to target only leading or trailing spaces ensures you don't accidentally destroy the internal structure of sentences or data payloads.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Will 'Remove All Spaces' delete line breaks?",
        answer: "Yes, the 'Remove All Spaces' function targets all whitespace characters, including spaces, tabs, and newline breaks, merging everything into one long string."
      }, {
        question: "Does this handle tabs?",
        answer: "Yes, tabs are treated as whitespace. The collapse function will convert tabs and multiple spaces into a single standard space character."
      }, {
        question: "Can I fix copied code indentation with this?",
        answer: "Yes. Using 'Remove Leading Spaces' will strip all indentation, allowing you to re-indent the code cleanly using your own IDE's formatting tools."
      }]} />

 <RelatedTools currentToolUrl="/tools/text/whitespace-remover" max={6} />
 </div></div>;
}