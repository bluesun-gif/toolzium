"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { ShoppingBag, TrendingUp, DollarSign, Target } from "lucide-react";

export default function RoasCalculatorClient() {
  const [adSpend, setAdSpend] = useState<number>(1000);
  const [revenue, setRevenue] = useState<number>(4500);
  const [cogs, setCogs] = useState<number>(1500);
  const [shippingCost, setShippingCost] = useState<number>(300);

  const roas = adSpend > 0 ? (revenue / adSpend).toFixed(2) : "0.00";
  const roasPercentage = adSpend > 0 ? ((revenue / adSpend) * 100).toFixed(0) : "0";
  const netProfit = revenue - adSpend - cogs - shippingCost;
  const netMargin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={ShoppingBag}
        title="Shopify & Amazon Profit Margin & Ad Spend (ROAS) Calculator"
        description="Calculate return on ad spend (ROAS), net profit margins, and breakeven ROAS for e-commerce stores."
      />

      <GlassCard className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Total Ad Spend ($):</label>
            <Input
              type="number"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Total Gross Revenue ($):</label>
            <Input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Cost of Goods Sold / COGS ($):</label>
            <Input
              type="number"
              value={cogs}
              onChange={(e) => setCogs(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Shipping & Transaction Fees ($):</label>
            <Input
              type="number"
              value={shippingCost}
              onChange={(e) => setShippingCost(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>
        </div>
      </GlassCard>

      {/* Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-5 space-y-2 text-center border-purple-500/30 bg-purple-500/5">
          <div className="flex justify-center text-purple-500">
            <Target className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ROAS Ratio</p>
          <p className="text-3xl font-extrabold text-purple-500">{roas}x ({roasPercentage}%)</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 text-center border-emerald-500/30 bg-emerald-500/5">
          <div className="flex justify-center text-emerald-500">
            <DollarSign className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Net Profit</p>
          <p className="text-3xl font-extrabold text-emerald-500">${netProfit.toLocaleString()}</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 text-center border-blue-500/30 bg-blue-500/5">
          <div className="flex justify-center text-blue-500">
            <TrendingUp className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Net Profit Margin</p>
          <p className="text-3xl font-extrabold text-blue-500">{netMargin}%</p>
        </GlassCard>
      </div>
    </div>
  );
}
