"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, TrendingUp, TrendingDown, Copy, Sparkles, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function CryptoProfitClient() {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [buyFee, setBuyFee] = useState("0.1");
  const [sellFee, setSellFee] = useState("0.1");
  const bPrice = parseFloat(buyPrice) || 0;
  const sPrice = parseFloat(sellPrice) || 0;
  const amt = parseFloat(amount) || 0;
  const bFeePct = parseFloat(buyFee) || 0;
  const sFeePct = parseFloat(sellFee) || 0;
  const initialInvestment = bPrice * amt;
  const buyFeeAmount = initialInvestment * (bFeePct / 100);
  const totalInvestment = initialInvestment + buyFeeAmount;
  const grossExitValue = sPrice * amt;
  const sellFeeAmount = grossExitValue * (sFeePct / 100);
  const netExitValue = grossExitValue - sellFeeAmount;
  const totalFees = buyFeeAmount + sellFeeAmount;
  const profitLoss = netExitValue - totalInvestment;
  const roi = totalInvestment > 0 ? profitLoss / totalInvestment * 100 : 0;
  const isProfit = profitLoss >= 0;
  const handleReset = () => {
    setBuyPrice("");
    setSellPrice("");
    setAmount("");
    setBuyFee("0.1");
    setSellFee("0.1");
  };
  const getSummary = () => {
    return "Crypto Trade Summary:\n" + "Investment: $" + totalInvestment.toFixed(2) + "\n" + "Exit Value: $" + netExitValue.toFixed(2) + "\n" + "Profit/Loss: $" + profitLoss.toFixed(2) + "(" + roi.toFixed(2) + "%)\n" + "Total Fees: $" + totalFees.toFixed(2);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={DollarSign} title="Crypto Profit Calculator" description="Calculate ROI and net profit for cryptocurrency trades including exchange fees." actions={<ResetButton onClick={handleReset} />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Trade Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Buy Price ($)</Label>
 <Input type="number" step="0.01" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Sell Price ($)</Label>
 <Input type="number" step="0.01" value={sellPrice} onChange={e => setSellPrice(e.target.value)} />
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Amount / Coins</Label>
 <Input type="number" step="0.000001" value={amount} onChange={e => setAmount(e.target.value)} />
 </div>

 <Separator className="my-2" />
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Buy Fee (%)</Label>
 <Input type="number" step="0.01" value={buyFee} onChange={e => setBuyFee(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Sell Fee (%)</Label>
 <Input type="number" step="0.01" value={sellFee} onChange={e => setSellFee(e.target.value)} />
 </div>
 </div>
 
 <div className="flex gap-2 pt-2">
 <Button variant="outline" size="sm" onClick={() => setBuyPrice("60000")}>BTC ($60k)</Button>
 <Button variant="outline" size="sm" onClick={() => setBuyPrice("3000")}>ETH ($3k)</Button>
 <Button variant="outline" size="sm" onClick={() => setBuyPrice("150")}>SOL ($150)</Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row justify-between items-center pb-2">
 <CardTitle>Results</CardTitle>
 <CopyButton getText={getSummary} label="Copy Summary" />
 </CardHeader>
 <CardContent className="space-y-6">
 <div className={cn("p-6 rounded-lg text-center border-2", isProfit ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20")}>
 <div className="flex items-center justify-center gap-2 mb-2">
 {isProfit ? <TrendingUp className="text-green-500 w-6 h-6" /> : <TrendingDown className="text-red-500 w-6 h-6" />}
 <h3 className="text-lg font-semibold text-foreground">
 Net {isProfit ? "Profit" : "Loss"}
 </h3>
 </div>
 <div className={cn("text-4xl font-bold", isProfit ? "text-green-500" : "text-red-500")}>
 ${Math.abs(profitLoss).toFixed(2)}
 </div>
 <div className={cn("text-sm font-medium mt-1", isProfit ? "text-green-500" : "text-red-500")}>
 {isProfit ? "+" : ""}{roi.toFixed(2)}% ROI
 </div>
 </div>

 <div className="space-y-3 text-sm">
 <div className="flex justify-between">
 <span className="text-muted-foreground">Total Investment:</span>
 <span className="font-medium">${totalInvestment.toFixed(2)}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Total Exit Value:</span>
 <span className="font-medium">${netExitValue.toFixed(2)}</span>
 </div>
 <Separator />
 <div className="flex justify-between">
 <span className="text-muted-foreground">Total Fees Paid:</span>
 <span className="font-medium">${totalFees.toFixed(2)}</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter buy/sell price and amount in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your net profit, ROI, and total fees paid, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Includes buy & sell fees",
        description: "Includes buy & sell fees"
      }, {
        icon: Shield,
        title: "Private & On-Device",
        description: "Every calculation runs in your browser. Your financial inputs never leave your device or touch a server."
      }, {
        icon: Zap,
        title: "No Signup, Ever",
        description: "Open the tool and get an answer in seconds — no account, no paywall, no usage cap."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use the Crypto Profit Calculator?</h3>
          <p>
            Traders use this to know true ROI after exchange fees — the number that decides whether a trade actually made money.
          </p>
          <p>
            Like all Toolzium calculators, it is free, private, and built to give you a paid-product experience without the subscription.
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

      <RelatedTools currentToolUrl="/tools/finance/crypto-profit" max={6} />

    </div></div>;
}