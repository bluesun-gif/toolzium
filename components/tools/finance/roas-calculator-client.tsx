"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { ShoppingBag, TrendingUp, DollarSign, Target, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export default function RoasCalculatorClient() {
  const [adSpend, setAdSpend] = useState<number>(1000);
  const [revenue, setRevenue] = useState<number>(4500);
  const [cogs, setCogs] = useState<number>(1500);
  const [shippingCost, setShippingCost] = useState<number>(300);
  const roas = adSpend > 0 ? (revenue / adSpend).toFixed(2) : "0.00";
  const roasPercentage = adSpend > 0 ? (revenue / adSpend * 100).toFixed(0) : "0";
  const netProfit = revenue - adSpend - cogs - shippingCost;
  const netMargin = revenue > 0 ? (netProfit / revenue * 100).toFixed(1) : "0.0";
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={ShoppingBag} title="Shopify & Amazon Profit Margin & Ad Spend (ROAS) Calculator" description="Calculate return on ad spend (ROAS), net profit margins, and breakeven ROAS for e-commerce stores." />

 <GlassCard className="p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Total Ad Spend ($):</label>
 <Input type="number" value={adSpend} onChange={e => setAdSpend(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Total Gross Revenue ($):</label>
 <Input type="number" value={revenue} onChange={e => setRevenue(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Cost of Goods Sold / COGS ($):</label>
 <Input type="number" value={cogs} onChange={e => setCogs(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Shipping & Transaction Fees ($):</label>
 <Input type="number" value={shippingCost} onChange={e => setShippingCost(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>
 </div>
 </GlassCard>

 {/* Results Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <GlassCard className="p-5 space-y-2 text-center border-primary/30 bg-purple-500/5">
 <div className="flex justify-center text-primary">
 <Target className="h-6 w-6" />
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ROAS Ratio</p>
 <p className="text-3xl font-extrabold text-primary">{roas}x ({roasPercentage}%)</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-emerald-500/30 bg-emerald-500/5">
 <div className="flex justify-center text-emerald-500">
 <DollarSign className="h-6 w-6" />
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Net Profit</p>
 <p className="text-3xl font-extrabold text-emerald-500">${netProfit.toLocaleString()}</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-blue-500/30 bg-blue-500/5">
 <div className="flex justify-center text-primary">
 <TrendingUp className="h-6 w-6" />
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Net Profit Margin</p>
 <p className="text-3xl font-extrabold text-primary">{netMargin}%</p>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter ad spend and revenue in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your ROAS, net profit, and margin, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Breakeven ROAS",
        description: "Breakeven ROAS"
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
          <h3>Why Use the Shopify & Amazon Profit Margin & Ad Spend (ROAS) Calculator?</h3>
          <p>
            E-commerce sellers use ROAS to know if ads profit after COGS and fees — the metric that scales spend.
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

      <RelatedTools currentToolUrl="/tools/finance/roas-calculator" max={6} />

    </div></div>;
}