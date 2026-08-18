"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Label } from"@/components/ui/label";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calculator, DollarSign, Eye, PieChart, Target, Wallet, Copy } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";

export function Budget503020Client() {
  const [income, setIncome] = useState("4000");
  const [frequency, setFrequency] = useState("Monthly");
  const handleReset = () => {
    setIncome("4000");
    setFrequency("Monthly");
  };
  const calculateBudget = () => {
    const amt = parseFloat(income);
    if (isNaN(amt) || amt <= 0) return {
      monthly: 0,
      needs: 0,
      wants: 0,
      savings: 0
    };
    let monthlyIncome = amt;
    if (frequency === "Weekly") monthlyIncome = amt * 52 / 12;
    if (frequency === "Bi-Weekly") monthlyIncome = amt * 26 / 12;
    if (frequency === "Annually") monthlyIncome = amt / 12;
    return {
      monthly: monthlyIncome,
      needs: monthlyIncome * 0.5,
      wants: monthlyIncome * 0.3,
      savings: monthlyIncome * 0.2
    };
  };
  const formatCurrency = (val: number) => {
    return "$" + val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  const results = calculateBudget();
  const getCopyText = () => {
    return "Budget Plan (Monthly):\n" + "Total Income:" + formatCurrency(results.monthly) + "\n" + "Needs (50%):" + formatCurrency(results.needs) + "\n" + "Wants (30%):" + formatCurrency(results.wants) + "\n" + "Savings/Debt (20%):" + formatCurrency(results.savings);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Calculator} title="50/30/20 Rule Budget Allocator" description="Calculate income allocation using the 50/30/20 budgeting rule for needs, wants, and savings." actions={<ResetButton onClick={handleReset} label="Clear Data" />} />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Income Info</CardTitle>
 <CardDescription>Enter your after-tax take-home pay.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>After-Tax Income</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
 <Input type="number" className="pl-10" value={income} onChange={e => setIncome(e.target.value)} min="0" />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Pay Frequency</Label>
 <Select value={frequency} onValueChange={setFrequency}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Weekly">Weekly</SelectItem>
 <SelectItem value="Bi-Weekly">Bi-Weekly</SelectItem>
 <SelectItem value="Monthly">Monthly</SelectItem>
 <SelectItem value="Annually">Annually</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="md:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center justify-between">
 <span>Monthly Allocation</span>
 <CopyButton getText={getCopyText} label="Copy Plan" />
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
 <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
 <h4 className="text-primary font-semibold mb-1">Needs (50%)</h4>
 <p className="text-2xl font-bold">{formatCurrency(results.needs)}</p>
 <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc pl-4">
 <li>Housing / Rent</li>
 <li>Utilities</li>
 <li>Groceries</li>
 <li>Insurance</li>
 </ul>
 </div>
 
 <div className="bg-purple-500/10 border border-primary/50/20 p-4 rounded-xl">
 <h4 className="text-primary font-semibold mb-1">Wants (30%)</h4>
 <p className="text-2xl font-bold">{formatCurrency(results.wants)}</p>
 <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc pl-4">
 <li>Dining Out</li>
 <li>Entertainment</li>
 <li>Shopping</li>
 <li>Hobbies</li>
 </ul>
 </div>

 <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
 <h4 className="text-green-600 font-semibold mb-1">Savings (20%)</h4>
 <p className="text-2xl font-bold">{formatCurrency(results.savings)}</p>
 <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc pl-4">
 <li>Emergency Fund</li>
 <li>Retirement</li>
 <li>Investments</li>
 <li>Debt Payoff</li>
 </ul>
 </div>
 </div>

 <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex">
 <div className="bg-blue-500 h-full" style={{
                  width: "50%"
                }}></div>
 <div className="bg-purple-500 h-full" style={{
                  width: "30%"
                }}></div>
 <div className="bg-green-500 h-full" style={{
                  width: "20%"
                }}></div>
 </div>
 <div className="flex justify-between text-xs text-muted-foreground mt-2">
 <span>Total Monthly Income: {formatCurrency(results.monthly)}</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Income",
    description:"Add your take-home pay after taxes.",
    icon: Wallet,
  },
{
    step:"02",
    title:"Allocate",
    description:"The tool splits needs, wants, and savings automatically.",
    icon: PieChart,
  },
{
    step:"03",
    title:"Review",
    description:"See if your spending fits the 50/30/20 split.",
    icon: Eye,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Wallet,
    title:"Income Based",
    description:"Works from net pay so the plan matches reality.",
  },
{
    icon: PieChart,
    title:"Clear Splits",
    description:"50 percent needs, 30 percent wants, 20 percent savings.",
  },
{
    icon: Eye,
    title:"Visual Feedback",
    description:"Highlights categories that drift from the rule.",
  },
{
    icon: Target,
    title:"Savings Focus",
    description:"Protects the 20 percent savings bucket first.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>The 50/30/20 rule is a simple framework that makes budgeting approachable. After taxes, you allocate 50 percent of income to needs, 30 percent to wants, and 20 percent to savings and debt payoff. Its power is simplicity: you do not track every coffee, you track three buckets.</p>
  <p>Start with net income, not gross. Taxes, insurance premiums, and pre-tax deductions already left your paycheck, so planning from take-home pay reflects money you can actually spend. The allocator divides it instantly, showing what 50 percent of your income looks like in real dollar terms.</p>
  <p>Needs are the foundation. Housing, food, transportation, and minimum debt payments belong here. If your needs exceed 50 percent, the rule signals a structural problem — perhaps housing costs too much — that you may need to address directly rather than by trimming coffee. Wants are discretionary: dining out, hobbies, entertainment. The 20 percent savings bucket should be protected first, treated as a bill you pay yourself.</p>
  <p>Flexibility keeps the system sustainable. High-cost cities may push needs above 50 percent, and that is acceptable as long as you understand the trade-off. The value is awareness, not perfection. Use the allocator monthly to spot drift, automate the savings transfer, and let the rule guide decisions without drowning in spreadsheets. Consistent habits built on this simple split outperform complex budgets most people abandon.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/finance/budget-50-30-20" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What counts as a need?",
    answer:"Needs are essentials you cannot avoid: rent, groceries, insurance, minimum debt payments, utilities.",
  },
{
    question:"Are subscriptions wants or needs?",
    answer:"Most streaming and discretionary subscriptions are wants unless tied to work you cannot do without.",
  },
{
    question:"What if I cannot save 20 percent?",
    answer:"Save what you can and treat 20 percent as a target; even small consistent savings build security.",
  },
{
    question:"Should retirement come from the 20 percent?",
    answer:"Yes, retirement and emergency savings both live in the savings and debt category.",
  },
{
    question:"Is the rule rigid?",
    answer:"It is a guideline; adjust proportions if your cost of living demands a higher needs share.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default Budget503020Client;
