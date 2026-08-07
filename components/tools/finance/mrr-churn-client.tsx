"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export default function MrrChurnClient() {
  const [startingMrr, setStartingMrr] = useState<number>(10000);
  const [newMrr, setNewMrr] = useState<number>(2500);
  const [expansionMrr, setExpansionMrr] = useState<number>(1200);
  const [churnedMrr, setChurnedMrr] = useState<number>(800);
  const [activeCustomers, setActiveCustomers] = useState<number>(200);

  const netMrrGrowth = newMrr + expansionMrr - churnedMrr;
  const endingMrr = startingMrr + netMrrGrowth;
  const arr = endingMrr * 12;
  const arpu = activeCustomers > 0 ? (endingMrr / activeCustomers).toFixed(2) : "0.00";
  const churnRate = startingMrr > 0 ? ((churnedMrr / startingMrr) * 100).toFixed(2) : "0.00";

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={TrendingUp}
        title="SaaS Monthly Recurring Revenue (MRR) & Churn Rate Calculator"
        description="Calculate SaaS metrics: Net MRR Growth, ARR, Churn Rate %, ARPU, and LTV metrics."
      />

      <GlassCard className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Starting MRR ($):</label>
            <Input
              type="number"
              value={startingMrr}
              onChange={(e) => setStartingMrr(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">New Customer MRR ($):</label>
            <Input
              type="number"
              value={newMrr}
              onChange={(e) => setNewMrr(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Expansion MRR ($):</label>
            <Input
              type="number"
              value={expansionMrr}
              onChange={(e) => setExpansionMrr(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Churned / Lost MRR ($):</label>
            <Input
              type="number"
              value={churnedMrr}
              onChange={(e) => setChurnedMrr(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-semibold text-foreground">Active Customer Count:</label>
            <Input
              type="number"
              value={activeCustomers}
              onChange={(e) => setActiveCustomers(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>
        </div>
      </GlassCard>

      {/* Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-2 text-center border-emerald-500/30 bg-emerald-500/5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ending MRR</p>
          <p className="text-2xl font-extrabold text-emerald-500">${endingMrr.toLocaleString()}</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 text-center border-blue-500/30 bg-blue-500/5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Annual Run Rate (ARR)</p>
          <p className="text-2xl font-extrabold text-blue-500">${arr.toLocaleString()}</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 text-center border-purple-500/30 bg-purple-500/5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ARPU (Per User)</p>
          <p className="text-2xl font-extrabold text-purple-500">${arpu}</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 text-center border-rose-500/30 bg-rose-500/5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">MRR Churn Rate</p>
          <p className="text-2xl font-extrabold text-rose-500">{churnRate}%</p>
        </GlassCard>
      </div>
    </div>
  );
}
