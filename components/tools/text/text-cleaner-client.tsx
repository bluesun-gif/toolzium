"use client";

import { Input } from "@/components/ui/input";

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
import { Eraser, FileInput, Settings, Sparkles, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";
export default function TextCleanerClient() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [options, setOptions] = useState({
    extraSpaces: true,
    lineBreaks: false,
    emptyLines: true,
    trimLines: false,
    htmlTags: false,
    specialChars: false
  });
  const handleClean = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to clean.");
      return;
    }
    let cleaned = text;
    if (options.htmlTags) cleaned = cleaned.replace(/<[^>]*>/g, "");
    if (options.specialChars) cleaned = cleaned.replace(/[^a-zA-Z0-9\s.,!?]/g, "");
    if (options.extraSpaces) cleaned = cleaned.replace(/[ \t]+/g, "");
    if (options.lineBreaks) cleaned = cleaned.replace(/\r?\n/g, "");
    if (options.emptyLines) cleaned = cleaned.replace(/^\s*[\r\n]/gm, "");
    if (options.trimLines) cleaned = cleaned.split("\n").map(l => l.trim()).join("\n");
    if (options.extraSpaces && !options.lineBreaks) {
      cleaned = cleaned.split("\n").map(l => l.trim()).join("\n");
    }
    setOutput(cleaned);
    toast.success("Text cleaned successfully!");
  };
  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Eraser} title="Text Cleaner" description="Remove unwanted spaces, line breaks, HTML tags, and special characters from your text instantly." />
 
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><FileInput className="w-4 h-4 text-primary" /> Raw Text</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4">
 <textarea value={text} onChange={e => setText(e.target.value)} rows={12} className={textareaClass} placeholder="Paste messy text, scraped HTML, or data with bad formatting here..." />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Settings className="w-4 h-4 text-primary" /> Cleaning Options</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {[{
                key: "extraSpaces",
                label: "Remove extra spaces"
              }, {
                key: "lineBreaks",
                label: "Remove all line breaks"
              }, {
                key: "emptyLines",
                label: "Remove empty lines"
              }, {
                key: "trimLines",
                label: "Trim whitespace per line"
              }, {
                key: "htmlTags",
                label: "Strip HTML tags"
              }, {
                key: "specialChars",
                label: "Remove special characters"
              }].map(opt => <label key={opt.key} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
 <input type="checkbox" checked={options[opt.key as keyof typeof options]} onChange={() => toggleOption(opt.key as keyof typeof options)} className="h-4 w-4 rounded border-border accent-primary" />
 {opt.label}
 </label>)}
 </div>
 <Button onClick={handleClean} className="w-full">
 <Eraser className="w-4 h-4 mr-2" /> Clean Text
 </Button>
 </CardContent>
 </GlassCard>
 </div>

 {output && <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Sparkles className="w-4 h-4 text-primary" /> Cleaned Output</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea value={output} readOnly rows={10} className={textareaClass} />
 <div className="flex justify-end">
 <CopyButton getText={() => output} label="Copy Cleaned Text" />
 </div>
 </CardContent>
 </GlassCard>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Paste Messy Text",
        description: "Input text with irregular spacing, HTML artifacts, or unwanted line breaks.",
        icon: FileInput
      }, {
        step: "02",
        title: "Select Filters",
        description: "Toggle the specific cleaning rules you want to apply to your document.",
        icon: Settings
      }, {
        step: "03",
        title: "Get Clean Data",
        description: "Click clean to process the text and copy the perfectly formatted result.",
        icon: Sparkles
      }]} badges={["100% Free", "Client-Side", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: Eraser,
        title: "HTML Stripping",
        description: "Safely removes all HTML tags while preserving the inner text content for clean reading."
      }, {
        icon: Settings,
        title: "Granular Control",
        description: "Mix and match different cleaning rules to achieve the exact format you need."
      }, {
        icon: FileInput,
        title: "Whitespace Management",
        description: "Collapses multiple spaces into one and trims trailing/leading whitespace automatically."
      }, {
        icon: Sparkles,
        title: "Data Preparation",
        description: "Ideal for cleaning scraped data, PDF exports, or copied web text before analysis."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Copying text from websites, PDF documents, or legacy software often results in messy formatting. You might encounter random line breaks in the middle of sentences, hidden HTML tags, double spaces, or strange special characters. Manually fixing these issues in a word processor is tedious and error-prone, especially for large datasets.</p>
 <p>This text cleaner acts as a programmatic filter for your strings. By applying regular expressions locally in your browser, it can strip out unwanted noise while preserving the core message. For example, web scrapers often pull in navigation elements or styling tags; the HTML stripping feature removes the markup but keeps the readable text intact.</p>
 <p>Data scientists and developers frequently use tools like this to sanitize inputs before feeding them into machine learning models or databases. Removing special characters and normalizing whitespace ensures that your text analytics, tokenization, and search indexing operate on clean, consistent data structures.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Will removing special characters delete punctuation?",
        answer: "The 'Remove special characters' filter preserves standard sentence punctuation like periods, commas, and question marks, but removes symbols like @, #, $, and emojis."
      }, {
        question: "Can I undo the cleaning process?",
        answer: "The tool does not have an undo button, but your original text remains in the left input box. You can simply adjust the options and click 'Clean Text' again."
      }, {
        question: "Does this work offline?",
        answer: "Yes. Because the text processing relies entirely on browser-based JavaScript, it works perfectly without an internet connection once the page is loaded."
      }]} />
    </div>
    </div>
);
}
