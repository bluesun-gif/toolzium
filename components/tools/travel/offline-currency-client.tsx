"use client";
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
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Calculator, Globe, Table as TableIcon, Save, ArrowRightLeft, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
const COMMON_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR"];
const QUICK_AMOUNTS = [1, 5, 10, 20, 50, 100, 500, 1000];
const TIP_PERCENTAGES = [10, 15, 18, 20];
export function OfflineCurrencyClient() {
  const [homeCurrency, setHomeCurrency] = useState("USD");
  const [destCurrency, setDestCurrency] = useState("EUR");
  const [rate, setRate] = useState<number>(0.92);
  const [amount, setAmount] = useState<string>("100");
  const [isReversed, setIsReversed] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("offline-currency-rate");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHomeCurrency(parsed.home);
        setDestCurrency(parsed.dest);
        setRate(parsed.rate);
      } catch (e) {}
    }
  }, []);
  const saveRate = () => {
    localStorage.setItem("offline-currency-rate", JSON.stringify({
      home: homeCurrency,
      dest: destCurrency,
      rate
    }));
    toast.success("Rate saved offline!");
  };
  const reset = () => {
    setAmount("100");
    setIsReversed(false);
  };
  const numAmount = parseFloat(amount) || 0;
  const fromCurrency = isReversed ? destCurrency : homeCurrency;
  const toCurrency = isReversed ? homeCurrency : destCurrency;
  const currentRate = isReversed ? 1 / rate : rate;
  const result = (numAmount * currentRate).toFixed(2);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Calculator} title="Offline Currency Calculator" description="Calculate exchanges offline using custom rates." actions={<>
 <Button variant="outline" size="sm" onClick={saveRate}><Save className="w-4 h-4 mr-2" /> Save Rate</Button>
 <ResetButton onClick={reset} label="Reset" />
 </>} />

 <div className="grid gap-6 md:grid-cols-2">
 <GlassCard>
 <CardHeader>
 <CardTitle>Exchange Setup</CardTitle>
 <CardDescription>Set currencies and exchange rate.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
 <div className="space-y-2">
 <Label>Home Currency</Label>
 <Input value={homeCurrency} onChange={e => setHomeCurrency(e.target.value.toUpperCase())} placeholder="USD" maxLength={3} />
 </div>
 <div className="pb-2">
 <Button variant="ghost" size="icon" onClick={() => setIsReversed(!isReversed)}><ArrowRightLeft className="w-4 h-4" /></Button>
 </div>
 <div className="space-y-2">
 <Label>Destination Currency</Label>
 <Input value={destCurrency} onChange={e => setDestCurrency(e.target.value.toUpperCase())} placeholder="EUR" maxLength={3} />
 </div>
 </div>

 <div className="space-y-2 pt-2">
 <Label>Exchange Rate (1 {homeCurrency} = ? {destCurrency})</Label>
 <Input type="number" value={rate} onChange={e => setRate(parseFloat(e.target.value) || 0)} step="0.01" />
 </div>

 <Separator className="my-4" />

 <div className="space-y-4">
 <Label>Amount ({fromCurrency})</Label>
 <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="text-2xl h-14 font-bold" />
 
 <div className="p-4 bg-primary/10 rounded-lg text-center">
 <div className="text-sm text-muted-foreground">Converted Amount</div>
 <div className="text-4xl font-bold text-primary">
 {result} {toCurrency}
 </div>
 </div>
 </div>

 {isReversed && <div className="space-y-2 pt-4">
 <Label>Tip Calculator (on {fromCurrency} {numAmount})</Label>
 <div className="grid grid-cols-4 gap-2">
 {TIP_PERCENTAGES.map(tip => <div key={tip} className="p-2 bg-muted rounded text-center text-sm">
 <div>{tip}%</div>
 <div className="font-bold">{(numAmount * tip / 100).toFixed(2)}</div>
 </div>)}
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <TableIcon className="h-5 w-5" />
 Quick Reference
 </CardTitle>
 <CardDescription>Cheat sheet for fast conversions.</CardDescription>
 </CardHeader>
 <CardContent>
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b">
 <th className="py-2 text-left">{fromCurrency}</th>
 <th className="py-2 text-right">{toCurrency}</th>
 </tr>
 </thead>
 <tbody>
 {QUICK_AMOUNTS.map(amt => <tr key={amt} className="border-b last:border-0 hover:bg-muted/50">
 <td className="py-3 font-medium">{amt}</td>
 <td className="py-3 text-right">{(amt * currentRate).toFixed(2)}</td>
 </tr>)}
 </tbody>
 </table>
 </CardContent>
 </GlassCard>
 </div>
 
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
          <h3>Why Use Our Offline Currency Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Offline Currency Calculator provides
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

      <RelatedTools currentToolUrl="/tools/travel/offline-currency" max={6} />

    </div></div>;
}