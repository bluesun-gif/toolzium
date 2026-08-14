"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { TrendingUp, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function CompoundGrowthClient() {
  const [initialDeposit, setInitialDeposit] = useState("1000");
  const [monthlyContribution, setMonthlyContribution] = useState("100");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [years, setYears] = useState("10");
  const [compoundFreq, setCompoundFreq] = useState("12");
  const calculate = () => {
    const p = parseFloat(initialDeposit) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualReturn) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = parseFloat(compoundFreq) || 12;
    let futureValue = p;
    let totalContributed = p;
    for (let i = 0; i < t * n; i++) {
      futureValue *= 1 + r / n;
      if (n === 12) {
        futureValue += pmt;
        totalContributed += pmt;
      } else if (n === 4 && i % 3 === 0) {
        futureValue += pmt * 3;
        totalContributed += pmt * 3;
      } else if (n === 1 && i % 12 === 0) {
        futureValue += pmt * 12;
        totalContributed += pmt * 12;
      }
    }
    return {
      futureValue: futureValue.toFixed(2),
      totalContributed: totalContributed.toFixed(2),
      interestEarned: (futureValue - totalContributed).toFixed(2)
    };
  };
  const results = calculate();
  const handleReset = () => {
    setInitialDeposit("1000");
    setMonthlyContribution("100");
    setAnnualReturn("7");
    setYears("10");
    setCompoundFreq("12");
  };
  const getSummary = () => {
    return "Total Future Value: $" + results.futureValue + "\nTotal Contributed: $" + results.totalContributed + "\nInterest Earned: $" + results.interestEarned;
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Investment Compound Growth Visualizer" description="Calculate how your investments could grow over time." icon={TrendingUp} actions={<div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset" />
 </div>} />
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Investment Parameters</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Initial Deposit ($)</Label>
 <Input type="number" value={initialDeposit} onChange={e => setInitialDeposit(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Monthly Contribution ($)</Label>
 <Input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Annual Return Rate (%)</Label>
 <Input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Investment Period (Years)</Label>
 <Input type="number" value={years} onChange={e => setYears(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Compound Frequency</Label>
 <Select value={compoundFreq} onValueChange={setCompoundFreq}>
 <SelectTrigger>
 <SelectValue placeholder="Select frequency" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="12">Monthly</SelectItem>
 <SelectItem value="4">Quarterly</SelectItem>
 <SelectItem value="1">Annually</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Growth Summary</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-4">
 <div className="p-4 rounded-lg bg-primary/10">
 <div className="text-sm font-medium text-primary">Future Value</div>
 <div className="text-3xl font-bold">${results.futureValue}</div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 rounded-lg bg-card border">
 <div className="text-sm text-muted-foreground">Total Contributions</div>
 <div className="text-xl font-semibold">${results.totalContributed}</div>
 </div>
 <div className="p-4 rounded-lg bg-card border">
 <div className="text-sm text-muted-foreground">Interest Earned</div>
 <div className="text-xl font-semibold">${results.interestEarned}</div>
 </div>
 </div>
 </div>
 <Separator />
 <div className="flex justify-end">
 <CopyButton getText={getSummary} label="Copy Summary" />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter starting amount, contribution, and return in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your future value with interest earned broken out, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Monthly/quarterly/annual compounding",
        description: "Monthly/quarterly/annual compounding"
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
          <h3>Why Use the Investment Compound Growth Visualizer?</h3>
          <p>
            Long-term investors use this to see how recurring contributions snowball with compounding — the core driver of wealth building.
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

      <RelatedTools currentToolUrl="/tools/finance/compound-growth" max={6} />

    </div></div>;
}