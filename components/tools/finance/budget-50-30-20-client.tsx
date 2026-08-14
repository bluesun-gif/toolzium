"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, Calculator, PieChart, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
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
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

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
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter your monthly take-home income in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your needs, wants, and savings splits in dollars and percent, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Auto-allocates into 50/30/20 buckets",
        description: "Auto-allocates into 50/30/20 buckets"
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
          <h3>Why Use the 50/30/20 Rule Budget Calculator?</h3>
          <p>
            The 50/30/20 rule is the most recommended starter budgeting method — this calculator shows exactly how many dollars land in each bucket from your real income.
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

      <RelatedTools currentToolUrl="/tools/finance/budget-50-30-20" max={6} />

    </div></div>;
}