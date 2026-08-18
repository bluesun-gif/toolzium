"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Input } from"@/components/ui/input";
import { Calculator, DollarSign, Megaphone, ShoppingBag, Target, TrendingUp } from"lucide-react";

export default function RoasCalculatorClient() {
  const [adSpend, setAdSpend] = useState<number>(1000);
  const [revenue, setRevenue] = useState<number>(4500);
  const [cogs, setCogs] = useState<number>(1500);
  const [shippingCost, setShippingCost] = useState<number>(300);
  const roas = adSpend > 0 ? (revenue / adSpend).toFixed(2) : "0.00";
  const roasPercentage = adSpend > 0 ? (revenue / adSpend * 100).toFixed(0) : "0";
  const netProfit = revenue - adSpend - cogs - shippingCost;
  const netMargin = revenue > 0 ? (netProfit / revenue * 100).toFixed(1) : "0.0";
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

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
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Revenue",
    description:"Input sales and product cost.",
    icon: DollarSign,
  },
{
    step:"02",
    title:"Add Ad Spend",
    description:"Include marketing and ad costs.",
    icon: Megaphone,
  },
{
    step:"03",
    title:"Calculate",
    description:"See margin and return on ad spend.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: DollarSign,
    title:"Revenue In",
    description:"Tracks sales and COGS.",
  },
{
    icon: Megaphone,
    title:"Ad Spend",
    description:"Factors marketing cost.",
  },
{
    icon: Calculator,
    title:"ROAS",
    description:"Revenue per ad dollar.",
  },
{
    icon: TrendingUp,
    title:"Profit View",
    description:"True margin after ads.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A ROAS calculator connects marketing spend to profit, the question every ecommerce seller must answer. Return on ad spend measures revenue per ad dollar, but revenue alone is misleading without margin. This tool pairs ROAS with product cost and ad spend to reveal true profitability, not vanity revenue.</p>
  <p>The trap is celebrating ROAS while losing money. A 4x ROAS sounds great, but if product margin is thin and overhead high, the net may be negative after ad cost. The calculator subtracts COGS and ad spend to show real margin, exposing campaigns that look successful yet drain profit.</p>
  <p>Improvement comes from three levers: conversion rate, margin, and waste reduction. Better targeting and landing pages raise revenue per visit; higher margin products amplify each sale; cutting underperforming ads stops the bleed. The tool quantifies each, helping you prioritize. A small ROAS gain on a high-margin product often beats a large gain on a low-margin one.</p>
  <p>Use it before scaling any campaign. Set a profitability threshold that includes all costs, not just ad spend, and only scale what clears it. The calculator's value is converting marketing activity into a profit lens, so growth compounds money rather than burning it on impressive but unprofitable numbers.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/finance/roas-calculator" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What is ROAS?",
    answer:"Return on ad spend: revenue generated per dollar spent.",
  },
{
    question:"What is a good ROAS?",
    answer:"Above breakeven once margin and overhead are accounted.",
  },
{
    question:"Why include COGS?",
    answer:"Gross margin determines whether ad spend is profitable.",
  },
{
    question:"ROAS vs ROI?",
    answer:"ROAS measures ad efficiency; ROI includes all costs.",
  },
{
    question:"How to improve it?",
    answer:"Raise conversion, margin, or cut wasted spend.",
  }
  ]}
/>
    </div>
    </div>
);
}
