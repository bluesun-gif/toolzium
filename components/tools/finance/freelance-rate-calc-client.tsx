"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Input } from"@/components/ui/input";
import { Briefcase, Calculator, Clock, DollarSign, Receipt, Target } from"lucide-react";

export default function FreelanceRateCalcClient() {
 const [targetIncome, setTargetIncome] = useState<number>(85000);
 const [annualExpenses, setAnnualExpenses] = useState<number>(12000);
 const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
 const [vacationWeeks, setVacationWeeks] = useState<number>(4);
 const [taxPercent, setTaxPercent] = useState<number>(25);

 const totalRequiredRevenue = (targetIncome + annualExpenses) / (1 - taxPercent / 100);
 const workingWeeks = 52 - vacationWeeks;
 const totalAnnualBillableHours = workingWeeks * billableHoursPerWeek;

 const minHourlyRate = totalAnnualBillableHours > 0 ? (totalRequiredRevenue / totalAnnualBillableHours).toFixed(2) :"0.00";
 const dayRate = (Number(minHourlyRate) * 8).toFixed(0);

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Briefcase}
 title="Freelance Hourly Rate & Project Pricing Calculator"
 description="Calculate your minimum required hourly rate, day rate, and project pricing based on target annual income, taxes, and overhead."
 />

 <GlassCard className="p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Target Annual Take-Home Income ($):</label>
 <Input
 type="number"
 value={targetIncome}
 onChange={(e) => setTargetIncome(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Annual Business Overhead / Expenses ($):</label>
 <Input
 type="number"
 value={annualExpenses}
 onChange={(e) => setAnnualExpenses(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Billable Hours Per Week:</label>
 <Input
 type="number"
 value={billableHoursPerWeek}
 onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Vacation & Time Off (Weeks/Year):</label>
 <Input
 type="number"
 value={vacationWeeks}
 onChange={(e) => setVacationWeeks(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2 sm:col-span-2">
 <label className="text-xs font-semibold text-foreground">Estimated Tax Rate (%):</label>
 <Input
 type="number"
 value={taxPercent}
 onChange={(e) => setTaxPercent(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>
 </div>
 </GlassCard>

 {/* Results Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <GlassCard className="p-5 space-y-2 text-center border-emerald-500/30 bg-emerald-500/5">
 <div className="flex justify-center text-emerald-500">
 <Clock className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Min Hourly Rate</p>
 <p className="text-3xl font-extrabold text-emerald-500">${minHourlyRate}/hr</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-blue-500/30 bg-blue-500/5">
 <div className="flex justify-center text-primary">
 <Briefcase className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended Day Rate</p>
 <p className="text-3xl font-extrabold text-primary">${dayRate}/day</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-primary/50/30 bg-purple-500/5">
 <div className="flex justify-center text-primary">
 <DollarSign className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Gross Target</p>
 <p className="text-3xl font-extrabold text-primary">${Math.round(totalRequiredRevenue).toLocaleString()}</p>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Goals",
    description:"Add desired annual income and billable hours.",
    icon: Target,
  },
{
    step:"02",
    title:"Add Costs",
    description:"Include taxes, software, and non-billable time.",
    icon: Receipt,
  },
{
    step:"03",
    title:"Calculate",
    description:"Get your required hourly rate.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Target,
    title:"Income Driven",
    description:"Works backward from take-home goals.",
  },
{
    icon: Receipt,
    title:"True Cost Included",
    description:"Factors taxes and business expenses.",
  },
{
    icon: Calculator,
    title:"Hourly Output",
    description:"Returns a defensible rate.",
  },
{
    icon: Briefcase,
    title:"Freelance Focused",
    description:"Accounts for non-billable admin time.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>New freelancers chronically underprice because they forget everything beyond their own salary. The freelance rate calculator builds the rate from the ground up: desired take-home income, business expenses, taxes, and the reality that not all hours are billable. The result is a rate that actually sustains the business.</p>
  <p>Billable hours are the crux. A 40-hour week is rarely 40 billable hours; admin, marketing, and learning consume much of it. The calculator divides your income goal across only the hours you can sell, which raises the effective rate. Ignoring this is why many freelancers earn less than their old job while working more.</p>
  <p>Costs compound the picture. Software subscriptions, insurance, equipment, and self-employment tax all sit between revenue and take-home pay. Baking them into the rate prevents the nasty surprise of a &quot;profitable&quot; project that leaves little after expenses. The tool makes those hidden costs explicit upfront.</p>
  <p>Recalculate as you grow. As expenses, tax situations, and market rates change, so should your rate. Use the output as a floor in negotiations, and raise it as you gain expertise. The calculator's purpose is replacing guesswork with a number that covers the real cost of staying independent and profitable.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why is my rate higher than I expected?",
    answer:"You must cover taxes, software, and unpaid admin, not just living costs.",
  },
{
    question:"What are billable hours?",
    answer:"Only hours actually working for clients; the rest is overhead.",
  },
{
    question:"Should I charge hourly or flat?",
    answer:"Hourly suits uncertain scope; flat rewards efficiency.",
  },
{
    question:"How do taxes affect rate?",
    answer:"Self-employment tax and income tax can take a large share, built into the rate.",
  },
{
    question:"How often should I recalculate?",
    answer:"Annually or when costs, goals, or market rates shift.",
  }
  ]}
/>
</div>
 );
}
