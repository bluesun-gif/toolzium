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
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { List, Wand2, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
export default function TextToListClient() {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState<"comma" | "newline" | "semicolon" | "custom">("comma");
  const [customDelimiter, setCustomDelimiter] = useState("");
  const [outputFormat, setOutputFormat] = useState<"numbered" | "bullet" | "html" | "json">("numbered");
  const [output, setOutput] = useState("");
  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter some text to convert");
      return;
    }
    let items: string[];
    switch (delimiter) {
      case "comma":
        items = input.split(",").map(s => s.trim()).filter(Boolean);
        break;
      case "newline":
        items = input.split("\n").map(s => s.trim()).filter(Boolean);
        break;
      case "semicolon":
        items = input.split(";").map(s => s.trim()).filter(Boolean);
        break;
      case "custom":
        if (!customDelimiter) {
          toast.error("Please specify a custom delimiter");
          return;
        }
        items = input.split(customDelimiter).map(s => s.trim()).filter(Boolean);
        break;
      default:
        items = [input];
    }
    let result = "";
    switch (outputFormat) {
      case "numbered":
        result = items.map((item, i) => `${i + 1}. ${item}`).join("\n");
        break;
      case "bullet":
        result = items.map(item => `• ${item}`).join("\n");
        break;
      case "html":
        result = `<ul>\n${items.map(item => ` <li>${item}</li>`).join("\n")}\n</ul>`;
        break;
      case "json":
        result = JSON.stringify(items, null, 2);
        break;
    }
    setOutput(result);
    toast.success(`Converted ${items.length} items`);
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={List} title="Text to List Converter" description="Convert comma-separated, newline, or custom-delimited text into formatted lists." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <List className="w-4 h-4 text-primary" /> Input Text
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50" placeholder="Enter text separated by commas, newlines, or your custom delimiter..." />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">Delimiter</label>
 <select value={delimiter} onChange={e => setDelimiter(e.target.value as any)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50">
 <option value="comma">Comma (,)</option>
 <option value="newline">Newline</option>
 <option value="semicolon">Semicolon (;)</option>
 <option value="custom">Custom</option>
 </select>
 {delimiter === "custom" && <Input value={customDelimiter} onChange={e => setCustomDelimiter(e.target.value)} placeholder="Enter custom delimiter" className="mt-2" />}
 </div>

 <div>
 <label className="text-xs font-medium text-muted-foreground mb-2 block">Output Format</label>
 <select value={outputFormat} onChange={e => setOutputFormat(e.target.value as any)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50">
 <option value="numbered">Numbered List</option>
 <option value="bullet">Bullet List</option>
 <option value="html">HTML (ul/li)</option>
 <option value="json">JSON Array</option>
 </select>
 </div>
 </div>

 <Button onClick={handleConvert} className="w-full">
 <Wand2 className="w-4 h-4 mr-2" /> Convert to List
 </Button>
 </CardContent>
 </GlassCard>

 {output && <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Copy className="w-4 h-4 text-primary" /> Output
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <textarea value={output} readOnly rows={10} className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm font-mono outline-none focus:ring-2 focus:ring-primary/50" />
 <CopyButton getText={() => output} label="Copy Output" />
 </CardContent>
 </GlassCard>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Text",
        description: "Paste or type text separated by commas, newlines, or your chosen delimiter.",
        icon: List
      }, {
        step: "02",
        title: "Choose Settings",
        description: "Select the delimiter type and desired output format for your list.",
        icon: Wand2
      }, {
        step: "03",
        title: "Convert & Copy",
        description: "Click convert to generate your formatted list and copy it instantly.",
        icon: Copy
      }]} badges={["100% Free", "Client-Side", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: List,
        title: "Multiple Delimiters",
        description: "Supports comma, newline, semicolon, and custom delimiters for maximum flexibility."
      }, {
        icon: Wand2,
        title: "Four Output Formats",
        description: "Choose from numbered lists, bullet lists, HTML ul/li, or JSON arrays."
      }, {
        icon: Copy,
        title: "Instant Conversion",
        description: "Process and format your text in milliseconds with one click."
      }, {
        icon: List,
        title: "Smart Parsing",
        description: "Automatically trims whitespace and filters empty entries from your list."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Converting raw text into structured lists is a common task in data preparation, documentation, and content creation. Whether you're organizing a comma-separated list of tags into bullet points for a blog post, converting newline-separated items into an HTML list for a webpage, or transforming data into JSON for an API, this tool streamlines the process.</p>
 <p>The tool intelligently parses your input based on the selected delimiter, automatically trimming whitespace and filtering out empty entries. This means"apple, banana, , orange"becomes three clean items rather than four with an empty entry. The numbered and bullet list formats are perfect for documents and presentations, while HTML output works directly in web development.</p>
 <p>JSON array output is particularly useful for developers working with APIs or configuration files. Instead of manually formatting arrays, you can paste your data and get properly formatted JSON instantly. The custom delimiter option handles specialized formats like pipe-separated values (|) or tab-separated data, making this tool versatile enough for any text-to-list conversion need.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "What if my text has inconsistent spacing?",
        answer: "The tool automatically trims whitespace from each item, so 'apple , banana,orange' all become clean entries."
      }, {
        question: "Can I use multiple character delimiters?",
        answer: "Yes, the custom delimiter option accepts any string, including multi-character sequences like '||' or '::'."
      }, {
        question: "Does it handle empty entries?",
        answer: "Yes, empty entries created by consecutive delimiters are automatically filtered out."
      }]} />

 <RelatedTools currentToolUrl="/tools/text/text-to-list" max={6} />
 </div></div>;
}