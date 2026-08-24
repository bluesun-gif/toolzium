"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { FileText, Plus, Copy, Printer, Trash, Sparkles, Shield, Zap, ListChecks, Download, Clock, Scale } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { RelatedTools } from "@/components/shared/related-tools";
interface QuoteItem {
  id: string;
  desc: string;
  qty: number;
  rate: number;
  tax: number;
}
export function QuoteGeneratorClient() {
  const [quoteNo, setQuoteNo] = useState("QT-0001");
  const [quoteDate, setQuoteDate] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [provider, setProvider] = useState("");
  const [client, setClient] = useState("");
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [notes, setNotes] = useState("");
  const handleAddItem = () => {
    setItems([...items, {
      id: Date.now().toString(),
      desc: "",
      qty: 1,
      rate: 0,
      tax: 0
    }]);
  };
  const updateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(items.map(i => i.id === id ? {
      ...i,
      [field]: value
    } : i));
  };
  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const taxTotal = items.reduce((acc, item) => acc + item.qty * item.rate * (item.tax / 100), 0);
  const total = subtotal + taxTotal;
  const handleReset = () => {
    setQuoteNo("QT-0001");
    setQuoteDate("");
    setValidUntil("");
    setProvider("");
    setClient("");
    setItems([]);
    setNotes("");
    toast.success("Quote reset");
  };
  const getQuoteText = () => {
    let text = "QUOTE #" + quoteNo + "\n";
    text += "Date:" + quoteDate + "| Valid Until:" + validUntil + "\n\n";
    text += "From:\n" + provider + "\n\n";
    text += "To:\n" + client + "\n\n";
    text += "Items:\n";
    items.forEach(item => {
      text += "-" + item.desc + ":" + item.qty + "x $" + item.rate + "(Tax:" + item.tax + "%)\n";
    });
    text += "\nSubtotal: $" + subtotal.toFixed(2) + "\n";
    text += "Tax: $" + taxTotal.toFixed(2) + "\n";
    text += "Total: $" + total.toFixed(2) + "\n\n";
    text += "Notes:\n" + notes;
    return text;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={FileText} title="Price Quotation Generator" description="Create formal business estimates and quotes" actions={<div className="flex flex-wrap items-center gap-2">
 <CopyButton getText={getQuoteText} label="Copy Quote" />
 <ResetButton onClick={handleReset} label="Reset" />
 </div>} />
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Quote #</Label>
 <Input value={quoteNo} onChange={e => setQuoteNo(e.target.value)} placeholder="QT-0001" />
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date" value={quoteDate} onChange={e => setQuoteDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Valid Until</Label>
 <Input type="date" value={validUntil} onChange={e => setValidUntil(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Provider Details</Label>
 <textarea className={"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"} value={provider} onChange={e => setProvider(e.target.value)} placeholder="Your Company Name&#10;Address..." />
 </div>
 <div className="space-y-2">
 <Label>Client Details</Label>
 <textarea className={"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"} value={client} onChange={e => setClient(e.target.value)} placeholder="Client Name&#10;Address..." />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Items & Notes</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-4">
 {items.map((item, index) => <div key={item.id} className="flex flex-col space-y-2 p-4 border rounded-md relative">
 <div className="flex justify-between items-center">
 <Label>Item {index + 1}</Label>
 <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
 <Trash className="w-4 h-4 text-red-500" />
 </Button>
 </div>
 <Input value={item.desc} onChange={e => updateItem(item.id, "desc", e.target.value)} placeholder="Description" />
 <div className="grid grid-cols-3 gap-2">
 <div>
 <Label className="text-xs">Qty</Label>
 <Input type="number" value={item.qty} onChange={e => updateItem(item.id, "qty", parseFloat(e.target.value) || 0)} />
 </div>
 <div>
 <Label className="text-xs">Rate ($)</Label>
 <Input type="number" value={item.rate} onChange={e => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)} />
 </div>
 <div>
 <Label className="text-xs">Tax (%)</Label>
 <Input type="number" value={item.tax} onChange={e => updateItem(item.id, "tax", parseFloat(e.target.value) || 0)} />
 </div>
 </div>
 </div>)}
 <Button onClick={handleAddItem} variant="outline" className="w-full">
 <Plus className="w-4 h-4 mr-2" /> Add Item
 </Button>
 </div>
 <Separator />
 <div className="space-y-2">
 <Label>Terms / Notes</Label>
 <textarea className={"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Payment terms, delivery schedule..." />
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Summary</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex justify-end">
 <div className="w-full md:w-1/3 space-y-2">
 <div className="flex justify-between">
 <span>Subtotal:</span>
 <span>${subtotal.toFixed(2)}</span>
 </div>
 <div className="flex justify-between">
 <span>Tax Amount:</span>
 <span>${taxTotal.toFixed(2)}</span>
 </div>
 <Separator />
 <div className="flex justify-between font-bold text-lg">
 <span>Total:</span>
 <span>${total.toFixed(2)}</span>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 

<ToolHowItWorks
  steps={[
  {
    step:"01",
    title:"Enter Items",
    description:"Add products or services.",
    icon: ListChecks,
  },
  {
    step:"02",
    title:"Set Pricing",
    description:"Rates, tax, validity.",
    icon: Scale,
  },
  {
    step:"03",
    title:"Generate",
    description:"Produce the quote.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
  {
    icon: ListChecks,
    title:"Line Items",
    description:"What you offer.",
  },
  {
    icon: Scale,
    title:"Pricing",
    description:"Rates and tax.",
  },
  {
    icon: Download,
    title:"Export",
    description:"Send to client.",
  },
  {
    icon: Clock,
    title:"Validity",
    description:"Quote expiration.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A price quotation generator produces the estimate you send before a client commits, detailing scope and cost. Clear quotes win work and prevent later disputes about what was agreed. This tool compiles line items and pricing.</p>
  <p>Validity dates protect you from stale pricing. The quote sets expectations; acceptance then triggers a formal invoice.</p>
  <p>Use it for every bid. The tool's value is a professional, clear quote that converts prospects efficiently.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
  {
    question:"What is a quote?",
    answer:"Estimated price for requested work.",
  },
  {
    question:"Set validity?",
    answer:"Yes, expires after a date.",
  },
  {
    question:"Free?",
    answer:"Yes.",
  },
  {
    question:"Becomes invoice?",
    answer:"On acceptance, invoice follows.",
  },
  {
    question:"Export?",
    answer:"Downloadable.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default QuoteGeneratorClient;
