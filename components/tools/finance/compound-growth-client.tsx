"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton, CopyButton } from"@/components/shared/action-buttons";
import { Coins, LineChart, Percent, TrendingUp, Copy } from "lucide-react";

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
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

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
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Principal",
    description:"Enter your starting investment amount.",
    icon: Coins,
  },
{
    step:"02",
    title:"Add Contributions",
    description:"Include regular monthly or annual deposits.",
    icon: TrendingUp,
  },
{
    step:"03",
    title:"Visualize",
    description:"Watch the curve grow with compounding.",
    icon: LineChart,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Coins,
    title:"Lump or Recurring",
    description:"Models one-time or ongoing investments.",
  },
{
    icon: TrendingUp,
    title:"Compounding View",
    description:"Shows growth from returns on returns.",
  },
{
    icon: LineChart,
    title:"Time Lapse",
    description:"Visualizes decades of accumulation.",
  },
{
    icon: Percent,
    title:"Rate Scenarios",
    description:"Compare different annual returns.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Compounding is called the eighth wonder of the world because its effects feel invisible for years, then explosive. The compound growth visualizer makes that abstract power concrete by charting how contributions and returns accumulate across decades. Seeing the curve bend upward is often the moment investing clicks.</p>
  <p>The engine is simple: returns generate more returns. A 7 percent annual return on 10,000 dollars adds 700 the first year, but decades later the same rate applies to a much larger base, so dollar gains accelerate even though the percentage stays constant. Adding monthly contributions layers more fuel on the fire, and starting earlier means more cycles of compounding.</p>
  <p>Time dominates every other variable. Two investors putting in the same monthly amount diverge wildly if one starts ten years earlier, because the early starter's money compounds through more periods. This is why financial advice stresses beginning now, even with small sums, over waiting to invest a larger amount later.</p>
  <p>Use the tool to set realistic expectations. Market returns are not guaranteed, so model conservative scenarios alongside optimistic ones. The visualizer is a planning aid, not a forecast — pair it with diversified, low-cost investments and a long horizon. The habit of consistent contributing plus patience is what turns modest sums into meaningful wealth, and the chart shows exactly why.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is compounding?",
    answer:"Compounding is earning returns on your prior returns, not just your original contribution.",
  },
{
    question:"How often should I contribute?",
    answer:"Regular contributions, even small, dramatically increase final value through more compounding cycles.",
  },
{
    question:"Does starting early matter?",
    answer:"Greatly. Time is the biggest factor; early starters need far less total capital.",
  },
{
    question:"What return should I assume?",
    answer:"Historical market averages are common, but use conservative estimates to avoid overestimating.",
  },
{
    question:"Is this guaranteed?",
    answer:"No. Markets fluctuate; the visualizer models assumptions, not promises.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default CompoundGrowthClient;
