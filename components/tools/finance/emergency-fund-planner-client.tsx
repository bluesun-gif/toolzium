"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Calendar, DollarSign, PiggyBank, Receipt, Shield, TrendingUp, Wallet, Copy } from "lucide-react";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Separator } from"@/components/ui/separator";

export function EmergencyFundPlannerClient() {
  const [housing, setHousing] = useState("1500");
  const [utilities, setUtilities] = useState("200");
  const [food, setFood] = useState("400");
  const [debt, setDebt] = useState("300");
  const [transport, setTransport] = useState("200");
  const [insurance, setInsurance] = useState("150");
  const [targetMonths, setTargetMonths] = useState("6");
  const [currentSaved, setCurrentSaved] = useState("5000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const calculatePlan = () => {
    const totalExpenses = (parseFloat(housing) || 0) + (parseFloat(utilities) || 0) + (parseFloat(food) || 0) + (parseFloat(debt) || 0) + (parseFloat(transport) || 0) + (parseFloat(insurance) || 0);
    const targetFund = totalExpenses * parseInt(targetMonths, 10);
    const saved = parseFloat(currentSaved) || 0;
    const gap = Math.max(0, targetFund - saved);
    const contribution = parseFloat(monthlyContribution) || 0;
    let monthsToGoal = 0;
    if (gap > 0 && contribution > 0) {
      monthsToGoal = Math.ceil(gap / contribution);
    } else if (gap > 0 && contribution <= 0) {
      monthsToGoal = -1; // infinite
    }
    const progress = targetFund > 0 ? Math.min(100, saved / targetFund * 100) : 0;
    return {
      totalExpenses,
      targetFund,
      gap,
      monthsToGoal,
      progress,
      saved
    };
  };
  const results = calculatePlan();
  const handleReset = () => {
    setHousing("1500");
    setUtilities("200");
    setFood("400");
    setDebt("300");
    setTransport("200");
    setInsurance("150");
    setTargetMonths("6");
    setCurrentSaved("5000");
    setMonthlyContribution("500");
  };
  const getCopyText = () => {
    return "Emergency Fund Target: $" + results.targetFund + ", Current Saved: $" + results.saved + ", Gap: $" + results.gap + ", Months to Goal:" + (results.monthsToGoal === -1 ? "Never" : results.monthsToGoal) + "months.";
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Shield} title="Emergency Fund Savings & Target Planner" description="Calculate your recommended safety net emergency fund size and monthly savings target timeline." actions={<div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset" />
 <CopyButton getText={getCopyText} label="Copy Results" />
 </div>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Monthly Essential Expenses</CardTitle>
 <CardDescription>Enter your necessary monthly costs</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Housing / Rent</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={housing} onChange={e => setHousing(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Utilities</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={utilities} onChange={e => setUtilities(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Food / Groceries</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={food} onChange={e => setFood(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Debt Minimums</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={debt} onChange={e => setDebt(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Transportation</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={transport} onChange={e => setTransport(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Insurance / Medical</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={insurance} onChange={e => setInsurance(e.target.value)} className="pl-9" />
 </div>
 </div>
 </div>

 <Separator className="my-4" />
 
 <div className="space-y-4">
 <div className="space-y-2">
 <Label>Target Fund Coverage</Label>
 <Select value={targetMonths} onValueChange={setTargetMonths}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="3">3 Months (Minimum)</SelectItem>
 <SelectItem value="6">6 Months (Recommended)</SelectItem>
 <SelectItem value="9">9 Months (Conservative)</SelectItem>
 <SelectItem value="12">12 Months (Very Conservative)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Current Saved Amount</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={currentSaved} onChange={e => setCurrentSaved(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Monthly Contribution</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="pl-9" />
 </div>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Your Plan</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="p-6 bg-primary/10 rounded-xl text-center space-y-2">
 <Wallet className="w-8 h-8 text-primary mx-auto mb-2" />
 <div className="text-4xl font-bold text-primary">${results.targetFund.toLocaleString()}</div>
 <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Target Fund</div>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Progress: {results.progress.toFixed(1)}%</span>
 <span>${results.saved.toLocaleString()} / ${results.targetFund.toLocaleString()}</span>
 </div>
 <div className="h-4 bg-muted rounded-full overflow-hidden">
 <div className="h-full bg-primary transition-all duration-500 ease-out" style={{
                  width: results.progress + "%"
                }}></div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-muted rounded-lg text-center space-y-1">
 <div className="text-2xl font-bold text-red-500">${results.gap.toLocaleString()}</div>
 <div className="text-xs text-muted-foreground uppercase">Gap Remaining</div>
 </div>
 <div className="p-4 bg-muted rounded-lg text-center space-y-1">
 <div className="text-2xl font-bold text-primary">
 {results.gap === 0 ? "Goal Reached!" : results.monthsToGoal === -1 ? "Infinite" : results.monthsToGoal + "mo"}
 </div>
 <div className="text-xs text-muted-foreground uppercase">Time to Goal</div>
 </div>
 </div>

 <div className="p-4 bg-muted rounded-lg flex items-center justify-between">
 <span className="font-medium text-sm">Monthly Expenses Total</span>
 <span className="font-bold">${results.totalExpenses.toLocaleString()} / month</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Essentials",
    description:"Enter monthly must-pay expenses.",
    icon: Receipt,
  },
{
    step:"02",
    title:"Choose Months",
    description:"Pick 3-6 months of coverage.",
    icon: Calendar,
  },
{
    step:"03",
    title:"Plan Funding",
    description:"See monthly savings needed to hit target.",
    icon: PiggyBank,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Receipt,
    title:"Expense Driven",
    description:"Builds the goal from real essential costs.",
  },
{
    icon: Calendar,
    title:"Flexible Timeline",
    description:"Adjust months to match your risk.",
  },
{
    icon: PiggyBank,
    title:"Monthly Target",
    description:"Tells you exactly what to save each month.",
  },
{
    icon: TrendingUp,
    title:"Progress View",
    description:"Track toward the finish line.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An emergency fund planner turns a vague savings intention into a dated plan. Beyond stating the total you need, it calculates how much to set aside each month to arrive there, which is the difference between wishing and achieving. By anchoring the goal to essential expenses, the target reflects your actual life rather than a generic rule.</p>
  <p>The planner starts with must-pay costs — housing, food, insurance, minimum debt — excluding discretionary spending that would inflate the goal unnecessarily. You then choose a coverage window, typically three to six months, longer for variable income. The tool divides the total by your chosen horizon to reveal the monthly contribution, making the habit concrete.</p>
  <p>Flexibility keeps it realistic. If the suggested monthly amount strains your budget, extending the timeline lowers it, trading speed for affordability. The point is a plan you will follow, not a perfect one you abandon. Automating the transfer on payday removes the decision and builds the habit passively.</p>
  <p>Keep the fund accessible and separate from checking so it is not spent on non-emergencies. A high-yield savings account preserves liquidity while earning a little. Revisit the plan after income or expense changes so the target stays accurate. The planner's value is converting an abstract safety net into a monthly action with a visible finish line.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Is this different from the basic calculator?",
    answer:"Yes. The planner adds a monthly savings schedule to reach the target, not just the total.",
  },
{
    question:"What if I cannot save the monthly amount?",
    answer:"Extend the timeline; a longer horizon lowers the monthly requirement.",
  },
{
    question:"Should I invest the fund?",
    answer:"Keep it liquid and safe; investing risks needing it during a downturn.",
  },
{
    question:"Where should it live?",
    answer:"A separate high-yield savings account you do not touch for daily spending.",
  },
{
    question:"Can I pause contributions?",
    answer:"Yes, but resuming quickly limits the time you are unprotected.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default EmergencyFundPlannerClient;
