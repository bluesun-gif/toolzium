"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { FileText, Plus, Copy, Printer, Trash, Sparkles, Shield, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
 setItems([...items, { id: Date.now().toString(), desc:"", qty: 1, rate: 0, tax: 0 }]);
 };

 const updateItem = (id: string, field: keyof QuoteItem, value: any) => {
 setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
 };

 const removeItem = (id: string) => {
 setItems(items.filter(i => i.id !== id));
 };

 const subtotal = items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
 const taxTotal = items.reduce((acc, item) => acc + (item.qty * item.rate * (item.tax / 100)), 0);
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
 let text ="QUOTE #"+ quoteNo +"\n";
 text +="Date:"+ quoteDate +"| Valid Until:"+ validUntil +"\n\n";
 text +="From:\n"+ provider +"\n\n";
 text +="To:\n"+ client +"\n\n";
 text +="Items:\n";
 items.forEach(item => {
 text +="-"+ item.desc +":"+ item.qty +"x $"+ item.rate +"(Tax:"+ item.tax +"%)\n";
 });
 text +="\nSubtotal: $"+ subtotal.toFixed(2) +"\n";
 text +="Tax: $"+ taxTotal.toFixed(2) +"\n";
 text +="Total: $"+ total.toFixed(2) +"\n\n";
 text +="Notes:\n"+ notes;
 return text;
 };

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={FileText}
 title="Price Quotation Generator"
 description="Create formal business estimates and quotes"
 actions={
 <div className="flex space-x-2">
 <CopyButton getText={getQuoteText} label="Copy Quote"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </div>
 }
 />
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Quote #</Label>
 <Input value={quoteNo} onChange={(e) => setQuoteNo(e.target.value)} placeholder="QT-0001"/>
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date"value={quoteDate} onChange={(e) => setQuoteDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Valid Until</Label>
 <Input type="date"value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Provider Details</Label>
 <textarea 
 className={"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
 value={provider} onChange={(e) => setProvider(e.target.value)} placeholder="Your Company Name&#10;Address..."
 />
 </div>
 <div className="space-y-2">
 <Label>Client Details</Label>
 <textarea 
 className={"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
 value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client Name&#10;Address..."
 />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Items & Notes</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-4">
 {items.map((item, index) => (
 <div key={item.id} className="flex flex-col space-y-2 p-4 border rounded-md relative">
 <div className="flex justify-between items-center">
 <Label>Item {index + 1}</Label>
 <Button variant="ghost"size="sm"onClick={() => removeItem(item.id)}>
 <Trash className="w-4 h-4 text-red-500"/>
 </Button>
 </div>
 <Input value={item.desc} onChange={(e) => updateItem(item.id,"desc", e.target.value)} placeholder="Description"/>
 <div className="grid grid-cols-3 gap-2">
 <div>
 <Label className="text-xs">Qty</Label>
 <Input type="number"value={item.qty} onChange={(e) => updateItem(item.id,"qty", parseFloat(e.target.value) || 0)} />
 </div>
 <div>
 <Label className="text-xs">Rate ($)</Label>
 <Input type="number"value={item.rate} onChange={(e) => updateItem(item.id,"rate", parseFloat(e.target.value) || 0)} />
 </div>
 <div>
 <Label className="text-xs">Tax (%)</Label>
 <Input type="number"value={item.tax} onChange={(e) => updateItem(item.id,"tax", parseFloat(e.target.value) || 0)} />
 </div>
 </div>
 </div>
 ))}
 <Button onClick={handleAddItem} variant="outline"className="w-full">
 <Plus className="w-4 h-4 mr-2"/> Add Item
 </Button>
 </div>
 <Separator />
 <div className="space-y-2">
 <Label>Terms / Notes</Label>
 <textarea 
 className={"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
 value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Payment terms, delivery schedule..."
 />
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
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Price Quotation Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Price Quotation Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/office/quote-generator" max={6} />

</div>
 );
}
