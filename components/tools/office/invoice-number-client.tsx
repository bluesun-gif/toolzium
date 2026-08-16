"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { ArrowRightLeft, Copy, FileText, Hash, Settings, ShieldCheck } from"lucide-react";
import { toast } from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Hash, FileText, Copy, Settings, Sparkles, Shield, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function InvoiceNumberClient() {
  const [prefix, setPrefix] = useState("INV");
  const [separator, setSeparator] = useState("-");
  const [dateFormat, setDateFormat] = useState("YYYY");
  const [padding, setPadding] = useState("3");
  const [counter, setCounter] = useState(1);
  const [batchSize, setBatchSize] = useState("10");
  const [generatedNumbers, setGeneratedNumbers] = useState<string[]>([]);
  useEffect(() => {
    const savedPrefix = localStorage.getItem("invGenPrefix");
    const savedSeparator = localStorage.getItem("invGenSeparator");
    const savedDateFormat = localStorage.getItem("invGenDateFormat");
    const savedPadding = localStorage.getItem("invGenPadding");
    const savedCounter = localStorage.getItem("invGenCounter");
    if (savedPrefix) setPrefix(savedPrefix);
    if (savedSeparator) setSeparator(savedSeparator);
    if (savedDateFormat) setDateFormat(savedDateFormat);
    if (savedPadding) setPadding(savedPadding);
    if (savedCounter) setCounter(parseInt(savedCounter, 10));
  }, []);
  useEffect(() => {
    localStorage.setItem("invGenPrefix", prefix);
    localStorage.setItem("invGenSeparator", separator);
    localStorage.setItem("invGenDateFormat", dateFormat);
    localStorage.setItem("invGenPadding", padding);
    localStorage.setItem("invGenCounter", counter.toString());
  }, [prefix, separator, dateFormat, padding, counter]);
  const generateDateStr = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    if (dateFormat === "YYYY") return year;
    if (dateFormat === "YYMM") return year.slice(-2) + month;
    return "";
  };
  const generateSingleNumber = (currentCount: number) => {
    const dateStr = generateDateStr();
    const padLen = parseInt(padding, 10) || 3;
    const numStr = currentCount.toString().padStart(padLen, "0");
    const parts = [prefix, dateStr, numStr].filter(p => p !== "");
    return parts.join(separator);
  };
  const generateBatch = () => {
    const size = parseInt(batchSize, 10) || 10;
    const numbers = [];
    for (let i = 0; i < size; i++) {
      numbers.push(generateSingleNumber(counter + i));
    }
    setGeneratedNumbers(numbers);
    setCounter(counter + size);
    toast.success(`Generated ${size} numbers`);
  };
  const handleReset = () => {
    setCounter(1);
    setGeneratedNumbers([]);
    toast.success("Counter reset to 1");
  };
  const copyAll = () => {
    const text = generatedNumbers.join("\n");
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Invoice Number Generator" description="Generate sequential invoice numbers with custom formatting and batch creation." icon={Hash} actions={<div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset Counter" />
 </div>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Settings className="w-5 h-5" />
 Settings
 </CardTitle>
 <CardDescription>Configure your invoice format</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Prefix</Label>
 <Input value={prefix} onChange={e => setPrefix(e.target.value)} placeholder="e.g. INV" />
 </div>
 <div className="space-y-2">
 <Label>Separator</Label>
 <Select value={separator} onValueChange={setSeparator}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="-">Hyphen (-)</SelectItem>
 <SelectItem value="/">Slash (/)</SelectItem>
 <SelectItem value="_">Underscore (_)</SelectItem>
 <SelectItem value="">None</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Date Format</Label>
 <Select value={dateFormat} onValueChange={setDateFormat}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="YYYY">YYYY</SelectItem>
 <SelectItem value="YYMM">YYMM</SelectItem>
 <SelectItem value="NONE">None</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Padding length</Label>
 <Select value={padding} onValueChange={setPadding}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="3">3 (e.g. 001)</SelectItem>
 <SelectItem value="4">4 (e.g. 0001)</SelectItem>
 <SelectItem value="5">5 (e.g. 00001)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <Separator />
 
 <div className="flex items-end gap-4">
 <div className="space-y-2 flex-1">
 <Label>Start Counter</Label>
 <Input type="number" min={1} value={counter} onChange={e => setCounter(parseInt(e.target.value) || 1)} />
 </div>
 <div className="space-y-2 flex-1">
 <Label>Batch Size</Label>
 <Select value={batchSize} onValueChange={setBatchSize}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="10">10</SelectItem>
 <SelectItem value="25">25</SelectItem>
 <SelectItem value="50">50</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <div className="space-y-2 pt-2">
 <Label>Preview: Next Number</Label>
 <div className="p-3 bg-muted rounded-md text-center text-lg font-mono">
 {generateSingleNumber(counter)}
 </div>
 </div>
 
 <Button onClick={generateBatch} className="w-full">
 <FileText className="w-4 h-4 mr-2" />
 Generate Batch
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <FileText className="w-5 h-5" />
 Generated Numbers
 </CardTitle>
 <CardDescription>
 {generatedNumbers.length} numbers generated
 </CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {generatedNumbers.length > 0 ? <>
 <div className="flex justify-end">
 <Button variant="outline" size="sm" onClick={copyAll}>
 <Copy className="w-4 h-4 mr-2" />
 Copy All
 </Button>
 </div>
 <div className="h-64 overflow-y-auto rounded-md border bg-muted p-4 space-y-1">
 {generatedNumbers.map((num, idx) => <div key={idx} className="font-mono text-sm p-1 hover:bg-background rounded">
 {num}
 </div>)}
 </div>
 </> : <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-md">
 <Hash className="w-8 h-8 mb-2 opacity-20" />
 <p>Generate a batch to see results</p>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Format",
    description:"Choose a numbering scheme.",
    icon: Hash,
  },
{
    step:"02",
    title:"Sequence",
    description:"Define start and increment.",
    icon: ArrowRightLeft,
  },
{
    step:"03",
    title:"Generate",
    description:"Produce the next number.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Hash,
    title:"Formats",
    description:"Prefix, date, sequence.",
  },
{
    icon: ArrowRightLeft,
    title:"Sequence",
    description:"Track the next number.",
  },
{
    icon: Copy,
    title:"Copy",
    description:"Use immediately.",
  },
{
    icon: ShieldCheck,
    title:"No Gaps",
    description:"Avoids duplicate numbers.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An invoice number generator produces consistent, non-repeating identifiers — important because duplicate or missing numbers confuse accounting and tax filings. A clear scheme (prefix plus sequence) keeps records orderly. This tool generates the next value.</p>
  <p>Format choice aids retrieval. Date-based or prefixed numbers make invoices easy to find later. The generator tracks sequence so nothing repeats.</p>
  <p>Use it as part of billing hygiene. The tool's value is clean, gap-free invoice numbering that satisfies bookkeeping and compliance.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why sequential?",
    answer:"Avoids duplicate or missing numbers.",
  },
{
    question:"Formats?",
    answer:"INV-0001, date-based, more.",
  },
{
    question:"Duplicate risk?",
    answer:"Generator prevents repeats.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Use with?",
    answer:"Any invoicing tool.",
  }
  ]}
/>
</div>
 );
}
=======
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Invoice Number Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Invoice Number Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/office/invoice-number" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
