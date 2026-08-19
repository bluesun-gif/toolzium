"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { AlertTriangle, ArrowLeftRight, Calculator, Copy, DollarSign, Scale, Shield, Sparkles, Table, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function ExchangeFeesClient() {
  const [amount, setAmount] = useState("1000");
  const [midMarketRate, setMidMarketRate] = useState("1.10");
  const [offeredRate, setOfferedRate] = useState("1.05");
  const [fixedFee, setFixedFee] = useState("5.00");
  const [result, setResult] = useState<{
    markupPercent: number;
    markupLost: number;
    totalLost: number;
    effectiveRate: number;
  } | null>(null);
  const calculate = () => {
    const amt = parseFloat(amount);
    const mid = parseFloat(midMarketRate);
    const off = parseFloat(offeredRate);
    const fee = parseFloat(fixedFee) || 0;
    if (isNaN(amt) || isNaN(mid) || isNaN(off)) {
      toast.error("Please enter valid numbers.");
      return;
    }
    const actualReceived = amt * off - fee;
    const markupLost = amt * (mid - off);
    const markupPercent = (mid - off) / mid * 100;
    const totalLost = markupLost + fee;
    let effectiveRate = 0;
    if (amt > 0) {
      effectiveRate = actualReceived / amt;
    }
    setResult({
      markupPercent,
      markupLost,
      totalLost,
      effectiveRate
    });
  };
  const handleReset = () => {
    setAmount("1000");
    setMidMarketRate("1.10");
    setOfferedRate("1.05");
    setFixedFee("5.00");
    setResult(null);
    toast.success("Reset successful");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={DollarSign} title="Currency Exchange Fee Calculator" description="Uncover hidden exchange rate markups and total foreign transaction fees." actions={<div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset" />
 </div>} />
 
 <div className="grid gap-6 md:grid-cols-2">
 <GlassCard>
 <CardHeader>
 <CardTitle>Conversion Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Amount to Convert (Base Currency)</Label>
 <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>True Mid-Market Rate (from Google/Xe)</Label>
 <Input type="number" step="0.0001" value={midMarketRate} onChange={e => setMidMarketRate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Rate Offered by Exchange/ATM</Label>
 <Input type="number" step="0.0001" value={offeredRate} onChange={e => setOfferedRate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Fixed Transaction Fee (Target Currency)</Label>
 <Input type="number" value={fixedFee} onChange={e => setFixedFee(e.target.value)} />
 </div>
 <Button className="w-full mt-4" onClick={calculate}><Calculator className="w-4 h-4 mr-2" /> Calculate Fees</Button>
 </CardContent>
 </GlassCard>

 {result && <GlassCard>
 <CardHeader>
 <CardTitle>Fee Breakdown</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="text-center p-6 bg-secondary/20 rounded-lg border">
 <p className="text-sm text-muted-foreground mb-2">Total Value Lost to Fees</p>
 <div className="text-4xl font-bold text-red-500">${result.totalLost.toFixed(2)}</div>
 <p className="text-xs text-muted-foreground mt-1">in target currency</p>
 </div>

 <div className="space-y-4">
 <div className="flex justify-between items-center border-b pb-2">
 <span className="text-sm font-medium flex items-center gap-2">
 <AlertTriangle className="w-4 h-4 text-amber-500" /> Hidden Markup
 </span>
 <span className="text-sm font-bold">{result.markupPercent.toFixed(2)}% (${result.markupLost.toFixed(2)})</span>
 </div>
 <div className="flex justify-between items-center border-b pb-2">
 <span className="text-sm font-medium">Fixed Fee</span>
 <span className="text-sm font-bold">${parseFloat(fixedFee || "0").toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center border-b pb-2">
 <span className="text-sm font-medium flex items-center gap-2">
 <Scale className="w-4 h-4 text-primary" /> Effective Exchange Rate
 </span>
 <span className="text-sm font-bold">{result.effectiveRate.toFixed(4)}</span>
 </div>
 </div>

 <div className="bg-blue-500/10 p-4 rounded-md border border-blue-500/20 text-sm">
 <p className="font-semibold text-primary mb-1">Recommendations:</p>
 <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
 <li>Avoid airport exchange booths (often 10-15% markup).</li>
 <li>Always choose"pay in local currency"on card terminals, NOT your home currency.</li>
 <li>Use travel cards with 0% foreign transaction fees and mid-market rates.</li>
 </ul>
 </div>
 </CardContent>
 </GlassCard>}
 </div>
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Enter Amount", description: "Type the amount you want to exchange or send internationally.", icon: DollarSign },
        { step: "02", title: "Select Currencies", description: "Choose the source and target currencies.", icon: ArrowLeftRight },
        { step: "03", title: "Compare Fees", description: "See the total fee and net amount for different exchange methods side by side.", icon: Table },
      ]} badges={["True Cost", "Hidden Fees", "Compare Methods"]} />

      <ToolFeatureGuides features={[
        { icon: DollarSign, title: "True Cost Comparison", description: "See the real cost of currency exchange including hidden markup fees." },
        { icon: Table, title: "Method Comparison", description: "Compare bank transfers, currency exchanges, credit cards, and money transfer services." },
        { icon: AlertTriangle, title: "Hidden Fee Alert", description: "Identifies when a quoted rate includes hidden markup above mid-market rate." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Currency Exchange Fee Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Currency Exchange Fee Calculator provides
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
    </div>
    </div>
);
}

export default ExchangeFeesClient;
