"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Input } from"@/components/ui/input";
import SelectField from"@/components/shared/form-fields/select-field";
import { Calendar, Coins, DollarSign, LineChart, TrendingUp } from"lucide-react";

const ASSETS = [
 { value:"BTC", label:"₿ Bitcoin (BTC)"},
 { value:"ETH", label:"Ξ Ethereum (ETH)"},
 { value:"SOL", label:"◎ Solana (SOL)"},
];

export default function CryptoDcaClient() {
 const [asset, setAsset] = useState("BTC");
 const [monthlyInvest, setMonthlyInvest] = useState<number>(100);
 const [months, setMonths] = useState<number>(24);
 const [annualGrowthRate, setAnnualGrowthRate] = useState<number>(45);

 const totalInvested = monthlyInvest * months;
 const monthlyRate = annualGrowthRate / 100 / 12;
 
 // Future Value formula for monthly recurring investment: FV = P * [ ((1 + r)^n - 1) / r ]
 const futureValue = monthlyRate > 0 
 ? monthlyInvest * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) 
 : totalInvested;

 const totalProfit = futureValue - totalInvested;
 const roiPercentage = totalInvested > 0 ? ((totalProfit / totalInvested) * 100).toFixed(1) :"0.0";

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={Coins}
 title="Crypto Dollar-Cost-Averaging (DCA) & Profit Calculator"
 description="Calculate compound returns and projected portfolio value when dollar-cost-averaging into Bitcoin, Ethereum, and Solana."
 />

 <GlassCard className="p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <SelectField
 label="Select Crypto Asset"
 value={asset}
 onValueChange={(v) => setAsset(String(v ||"BTC"))}
 options={ASSETS}
 />

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Monthly Investment Amount ($):</label>
 <Input
 type="number"
 value={monthlyInvest}
 onChange={(e) => setMonthlyInvest(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Duration (Months):</label>
 <Input
 type="number"
 value={months}
 onChange={(e) => setMonths(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Expected Annual Growth (%):</label>
 <Input
 type="number"
 value={annualGrowthRate}
 onChange={(e) => setAnnualGrowthRate(Number(e.target.value))}
 className="h-11 font-bold text-base"
 />
 </div>
 </div>
 </GlassCard>

 {/* Results Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <GlassCard className="p-5 space-y-2 text-center border-blue-500/30 bg-blue-500/5">
 <div className="flex justify-center text-primary">
 <DollarSign className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Invested</p>
 <p className="text-3xl font-extrabold text-primary">${totalInvested.toLocaleString()}</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-emerald-500/30 bg-emerald-500/5">
 <div className="flex justify-center text-emerald-500">
 <TrendingUp className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Portfolio Value</p>
 <p className="text-3xl font-extrabold text-emerald-500">${Math.round(futureValue).toLocaleString()}</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-primary/50/30 bg-purple-500/5">
 <div className="flex justify-center text-primary">
 <Coins className="h-6 w-6"/>
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total ROI %</p>
 <p className="text-3xl font-extrabold text-primary">+{roiPercentage}%</p>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Amount",
    description:"Choose a fixed amount to invest regularly.",
    icon: Coins,
  },
{
    step:"02",
    title:"Pick Interval",
    description:"Select weekly, biweekly, or monthly buys.",
    icon: Calendar,
  },
{
    step:"03",
    title:"Project",
    description:"Estimate accumulation across a time horizon.",
    icon: LineChart,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Coins,
    title:"Fixed Investing",
    description:"Models disciplined recurring purchases.",
  },
{
    icon: Calendar,
    title:"Interval Flexibility",
    description:"Weekly, biweekly, or monthly scheduling.",
  },
{
    icon: LineChart,
    title:"Volatility Smoothing",
    description:"Shows how DCA averages entry prices.",
  },
{
    icon: TrendingUp,
    title:"Scenario View",
    description:"Projects outcomes at assumed prices.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Dollar-cost averaging is a strategy that replaces guesswork with consistency. Instead of timing the market, you invest a fixed amount at set intervals, buying more units when prices are low and fewer when high. Over time your average entry price smooths out, which is especially valuable in volatile assets like crypto.</p>
  <p>The core benefit is behavioral. Trying to time bottoms leads to fear and missed opportunities; DCA removes the decision, automating discipline. During downturns you accumulate cheap units that later recover, and during rallies your existing holdings grow. This steadiness historically outperforms emotional trading for most people.</p>
  <p>Fees deserve attention. Very small, very frequent buys can lose more to exchange and network costs than they gain in smoothing. Most investors use weekly or monthly cadences sized to keep fees reasonable while preserving the averaging effect. The calculator projects accumulation so you can see how consistency compounds units over a chosen horizon.</p>
  <p>Treat projections as illustrations, not promises. Crypto can fall as easily as rise, and no calculator predicts direction. Use DCA as a risk-management approach, only with money you can afford to lose, and pair it with secure storage and skepticism of hype. The value of this tool is showing how a boring, repeatable plan behaves across scenarios — the opposite of chasing the next pump.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is dollar-cost averaging?",
    answer:"Investing a fixed amount at regular intervals regardless of price, averaging your entry cost.",
  },
{
    question:"Why use DCA for crypto?",
    answer:"It removes emotion and avoids buying everything at a peak during volatile markets.",
  },
{
    question:"Is DCA better than lump sum?",
    answer:"Lump sum often wins in rising markets, but DCA reduces regret and timing risk.",
  },
{
    question:"What fees should I consider?",
    answer:"Exchange and network fees can erode small frequent buys, so size matters.",
  },
{
    question:"Are projections guarantees?",
    answer:"No. Crypto is highly volatile; models are illustrative, not predictions.",
  }
  ]}
/>
</div>
 );
}
