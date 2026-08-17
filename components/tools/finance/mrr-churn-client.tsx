"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Input } from"@/components/ui/input";
import { Activity, DollarSign, LineChart, TrendingDown, TrendingUp, Users, Calculator } from "lucide-react";

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
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

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
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter MRR",
    description:"Input monthly recurring revenue.",
    icon: DollarSign,
  },
{
    step:"02",
    title:"Add Churn",
    description:"Enter monthly churn percentage.",
    icon: TrendingDown,
  },
{
    step:"03",
    title:"Project",
    description:"See revenue trajectory over time.",
    icon: LineChart,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: DollarSign,
    title:"MRR Core",
    description:"Tracks recurring revenue base.",
  },
{
    icon: TrendingDown,
    title:"Churn Impact",
    description:"Shows how retention drives growth.",
  },
{
    icon: LineChart,
    title:"Trajectory",
    description:"Projects with and without churn.",
  },
{
    icon: Users,
    title:"Expansion View",
    description:"Models upsell offsetting losses.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>For a SaaS business, MRR and churn are the two numbers that decide survival. Monthly Recurring Revenue shows the base; churn shows how fast it leaks. This calculator combines them to project whether you are growing or slowly declining — a reality many founders miss until it is too late.</p>
  <p>Churn's compounding effect is brutal. Losing 5 percent of customers monthly sounds minor but means losing nearly half your base annually, requiring constant new sales just to stand still. The tool makes this visible by projecting revenue with and without churn, so you see the hidden tax on growth that retention work would eliminate.</p>
  <p>Expansion changes the math. If existing customers upgrade, net revenue retention can exceed 100 percent, meaning the base grows even with some churn. The calculator models upsell offsetting losses, illustrating why reducing churn and increasing expansion both beat pure acquisition on cost and durability.</p>
  <p>Use it for planning and investor conversations. Track MRR and churn monthly, set retention targets, and model how small improvements compound into valuation. Acquisition gets attention, but retention is cheaper and more predictable. The calculator's value is framing churn not as a support metric but as the core growth lever it truly is.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is MRR?",
    answer:"Monthly Recurring Revenue from active subscriptions.",
  },
{
    question:"Why does churn matter?",
    answer:"Even small churn compounds into large losses.",
  },
{
    question:"How to reduce churn?",
    answer:"Improve onboarding, support, and value delivery.",
  },
{
    question:"What is net retention?",
    answer:"Revenue kept plus expansion from existing users.",
  },
{
    question:"Is this a forecast?",
    answer:"It models assumptions you provide.",
  }
  ]}
/>
    </div>
    </div>
);
}
