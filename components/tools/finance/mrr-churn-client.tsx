"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { TrendingUp, Users, DollarSign, Activity, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
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
  const churnRate = startingMrr > 0 ? (churnedMrr / startingMrr * 100).toFixed(2) : "0.00";
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={TrendingUp} title="SaaS Monthly Recurring Revenue (MRR) & Churn Rate Calculator" description="Calculate SaaS metrics: Net MRR Growth, ARR, Churn Rate %, ARPU, and LTV metrics." />

 <GlassCard className="p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Starting MRR ($):</label>
 <Input type="number" value={startingMrr} onChange={e => setStartingMrr(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">New Customer MRR ($):</label>
 <Input type="number" value={newMrr} onChange={e => setNewMrr(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Expansion MRR ($):</label>
 <Input type="number" value={expansionMrr} onChange={e => setExpansionMrr(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Churned / Lost MRR ($):</label>
 <Input type="number" value={churnedMrr} onChange={e => setChurnedMrr(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>

 <div className="space-y-2 sm:col-span-2">
 <label className="text-xs font-semibold text-foreground">Active Customer Count:</label>
 <Input type="number" value={activeCustomers} onChange={e => setActiveCustomers(Number(e.target.value))} className="h-11 font-bold text-base" />
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
 <p className="text-2xl font-extrabold text-primary">${arr.toLocaleString()}</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-primary/30 bg-purple-500/5">
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ARPU (Per User)</p>
 <p className="text-2xl font-extrabold text-primary">${arpu}</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-rose-500/30 bg-rose-500/5">
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">MRR Churn Rate</p>
 <p className="text-2xl font-extrabold text-rose-500">{churnRate}%</p>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter MRR flows and customers in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your ending MRR, ARR, churn, ARPU, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Net MRR growth",
        description: "Net MRR growth"
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
          <h3>Why Use the mrr-churn?</h3>
          <p>
            SaaS operators track MRR, churn, and ARPU — the metrics that decide if the business is healthy.
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

      <RelatedTools currentToolUrl="/tools/finance/mrr-churn" max={6} />

    </div></div>;
}