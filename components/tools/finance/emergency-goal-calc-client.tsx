"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton, ActionButton } from"@/components/shared/action-buttons";
import { Calculator, Calendar, DollarSign, Receipt, ShieldCheck, Target, TrendingUp } from"lucide-react";

export function EmergencyGoalCalcClient() {
  const [goalAmount, setGoalAmount] = useState("10000");
  const [currentSavings, setCurrentSavings] = useState("2000");
  const [months, setMonths] = useState("12");
  const [apy, setApy] = useState("4.5");
  const handleReset = () => {
    setGoalAmount("10000");
    setCurrentSavings("2000");
    setMonths("12");
    setApy("4.5");
  };
  const calculate = () => {
    const goal = parseFloat(goalAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const t = parseFloat(months) || 1; // months
    const rate = parseFloat(apy) || 0;
    const r = rate / 100 / 12; // monthly rate

    let requiredMonthly = 0;
    let totalInterest = 0;
    let futureValueOfCurrent = current;
    if (r === 0) {
      requiredMonthly = (goal - current) / t;
      totalInterest = 0;
    } else {
      // Future value of current savings
      futureValueOfCurrent = current * Math.pow(1 + r, t);

      // Amount still needed
      const shortfall = goal - futureValueOfCurrent;
      if (shortfall <= 0) {
        requiredMonthly = 0;
        totalInterest = futureValueOfCurrent - current;
      } else {
        // PMT formula for future value
        // FV = PMT * (((1 + r)^t - 1) / r)
        // PMT = FV / (((1 + r)^t - 1) / r)
        requiredMonthly = shortfall / ((Math.pow(1 + r, t) - 1) / r);
        totalInterest = goal - current - requiredMonthly * t;
      }
    }
    return {
      monthly: Math.max(0, requiredMonthly),
      interest: Math.max(0, totalInterest),
      weekly: Math.max(0, requiredMonthly * 12 / 52)
    };
  };
  const results = calculate();
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Calculator} title="Emergency Savings Goal Calculator" description="Calculate how much you need to save per month to reach your emergency savings goal." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Goal Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Goal Amount ($)</Label>
 <Input type="number" value={goalAmount} onChange={e => setGoalAmount(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Current Savings ($)</Label>
 <Input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Time to Goal (Months)</Label>
 <Input type="number" value={months} onChange={e => setMonths(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Interest Rate / APY (%)</Label>
 <Input type="number" value={apy} onChange={e => setApy(e.target.value)} step="0.1" />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Your Savings Plan</CardTitle>
 <CardDescription>Required contributions to hit your goal</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="bg-primary/10 p-6 rounded-lg text-center space-y-2 border border-primary/20">
 <p className="text-sm font-medium text-primary uppercase tracking-wider">Monthly Contribution</p>
 <div className="flex items-center justify-center gap-1 text-primary">
 <DollarSign className="w-8 h-8" />
 <span className="text-5xl font-bold">{results.monthly.toFixed(2)}</span>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="bg-muted p-4 rounded-lg text-center">
 <p className="text-sm text-muted-foreground mb-1 flex items-center justify-center gap-1">
 <Calendar className="w-4 h-4" /> Weekly Target
 </p>
 <p className="text-xl font-semibold">${results.weekly.toFixed(2)}</p>
 </div>
 <div className="bg-muted p-4 rounded-lg text-center">
 <p className="text-sm text-muted-foreground mb-1 flex items-center justify-center gap-1">
 <TrendingUp className="w-4 h-4" /> Est. Interest Earned
 </p>
 <p className="text-xl font-semibold text-green-600">${results.interest.toFixed(2)}</p>
 </div>
 </div>
 
 <div className="pt-4 border-t">
 <h4 className="text-sm font-medium mb-3">Milestone Timeline</h4>
 <div className="space-y-3">
 {[0.25, 0.5, 0.75, 1].map(milestone => <div key={milestone} className="flex justify-between items-center text-sm">
 <span className="w-12 text-muted-foreground">{milestone * 100}%</span>
 <div className="flex-1 mx-4 h-2 bg-muted rounded-full overflow-hidden">
 <div className="h-full bg-primary" style={{
                      width: milestone * 100 + "%"
                    }}></div>
 </div>
 <span className="w-16 text-right font-medium">${(parseFloat(goalAmount || "0") * milestone).toLocaleString(undefined, {
                      maximumFractionDigits: 0
                    })}</span>
 </div>)}
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Essentials",
    description:"Add your core monthly expenses.",
    icon: Receipt,
  },
{
    step:"02",
    title:"Set Goal",
    description:"Choose months of buffer to aim for.",
    icon: Target,
  },
{
    step:"03",
    title:"Calculate",
    description:"Get the dollar target to save.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Receipt,
    title:"Core Expense Based",
    description:"Targets true essentials only.",
  },
{
    icon: Target,
    title:"Adjustable Goal",
    description:"Slide months from 1 to 12.",
  },
{
    icon: Calculator,
    title:"Clear Total",
    description:"Returns a single savings target.",
  },
{
    icon: ShieldCheck,
    title:"Peace of Mind",
    description:"Quantifies your safety buffer.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>The emergency savings goal calculator answers the first question every saver asks: how much is enough? By multiplying essential monthly expenses by a chosen number of months, it produces a single, defensible target. That clarity beats the anxiety of an undefined &quot;save more&quot; intention.</p>
  <p>Anchoring to essentials is the key. Rent, groceries, insurance, and minimum debt payments define survival spending; dining out and subscriptions do not. Including only the former keeps the goal achievable and prevents the fund from ballooning into a second investment account. The calculator respects that discipline.</p>
  <p>Choosing the months is a personal risk decision. A steady salaried worker may feel safe at three months; a freelancer with irregular income benefits from six or more. The tool lets you model both, showing how the target scales so you can pick a level matching your comfort and capacity.</p>
  <p>Once you know the number, the abstract becomes actionable. You can measure progress, automate transfers, and celebrate milestones. Pair the target with a separate liquid account so the boundary between emergency and everyday money stays clear. The calculator's job is to replace guesswork with a specific, fundable figure that turns financial resilience into a concrete project.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How is this different from the planner?",
    answer:"The goal calculator focuses on the end number; the planner adds a funding schedule.",
  },
{
    question:"One month or twelve?",
    answer:"One month is a start; six is a common comfortable target for stability.",
  },
{
    question:"Should I include debt payments?",
    answer:"Yes, minimum payments on existing debt are essential obligations.",
  },
{
    question:"What if my expenses vary?",
    answer:"Use a conservative average or your highest recent month.",
  },
{
    question:"When is the fund done?",
    answer:"When it covers your chosen months of essentials without touching investments.",
  }
  ]}
/>
</div>
 );
}
