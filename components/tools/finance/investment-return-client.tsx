"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { BarChart3, Calculator, Coins, DollarSign, LineChart, Percent, TrendingUp } from"lucide-react";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { TrendingUp, DollarSign, Calculator, BarChart3, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function InvestmentReturnClient() {
  const [initialInvestment, setInitialInvestment] = useState<string>("10000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("500");
  const [annualReturnRate, setAnnualReturnRate] = useState<string>("7");
  const [years, setYears] = useState<string>("10");
  const [results, setResults] = useState<{
    finalBalance: number;
    totalContributions: number;
    totalReturns: number;
    returnMultiple: number;
    yearlyBreakdown: {
      year: number;
      balance: number;
      contributions: number;
      returns: number;
    }[];
  } | null>(null);
  const calculate = () => {
    const p = parseFloat(initialInvestment) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualReturnRate) || 0) / 100 / 12;
    const t = parseFloat(years) || 0;
    const n = t * 12;
    if (t <= 0) return;
    let currentBalance = p;
    let currentContributions = p;
    const breakdown = [];
    for (let i = 1; i <= n; i++) {
      currentBalance = currentBalance * (1 + r) + pmt;
      currentContributions += pmt;
      if (i % 12 === 0) {
        breakdown.push({
          year: i / 12,
          balance: currentBalance,
          contributions: currentContributions,
          returns: currentBalance - currentContributions
        });
      }
    }
    setResults({
      finalBalance: currentBalance,
      totalContributions: currentContributions,
      totalReturns: currentBalance - currentContributions,
      returnMultiple: currentContributions > 0 ? currentBalance / currentContributions : 0,
      yearlyBreakdown: breakdown
    });
  };
  useEffect(() => {
    calculate();
  }, [initialInvestment, monthlyContribution, annualReturnRate, years]);
  const handleReset = () => {
    setInitialInvestment("10000");
    setMonthlyContribution("500");
    setAnnualReturnRate("7");
    setYears("10");
  };
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={TrendingUp} title="Investment Return Calculator" description="Calculate the future value of your investments with monthly contributions and compound interest." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="h-5 w-5 text-primary" />
 Investment Details
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Initial Investment ($)</Label>
 <Input type="number" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} min="0" step="100" />
 </div>
 <div className="space-y-2">
 <Label>Monthly Contribution ($)</Label>
 <Input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} min="0" step="50" />
 </div>
 <div className="space-y-2">
 <Label>Annual Return Rate (%)</Label>
 <Input type="number" value={annualReturnRate} onChange={e => setAnnualReturnRate(e.target.value)} step="0.1" />
 </div>
 <div className="space-y-2">
 <Label>Investment Period (Years)</Label>
 <Input type="number" value={years} onChange={e => setYears(e.target.value)} min="1" step="1" />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <DollarSign className="h-5 w-5 text-primary" />
 Results Summary
 </CardTitle>
 </CardHeader>
 <CardContent>
 {results ? <div className="space-y-6">
 <div className="text-center p-4 bg-primary/10 rounded-lg">
 <div className="text-sm text-muted-foreground mb-1">Final Balance</div>
 <div className="text-3xl font-bold text-primary">{formatCurrency(results.finalBalance)}</div>
 </div>
 
 <div className="space-y-3">
 <div className="flex justify-between">
 <span className="text-muted-foreground">Total Contributions:</span>
 <span className="font-medium">{formatCurrency(results.totalContributions)}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Total Returns:</span>
 <span className="font-medium text-green-500">+{formatCurrency(results.totalReturns)}</span>
 </div>
 <Separator />
 <div className="flex justify-between">
 <span className="text-muted-foreground">Return Multiple:</span>
 <span className="font-medium">{results.returnMultiple.toFixed(2)}x</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Gains vs Contributions:</span>
 <span className="font-medium">
 {results.totalContributions > 0 ? (results.totalReturns / results.totalContributions * 100).toFixed(1) : 0}%
 </span>
 </div>
 </div>
 </div> : <div className="text-center text-muted-foreground py-8">
 Enter your investment details to see results
 </div>}
 </CardContent>
 </GlassCard>
 </div>

 {results && results.yearlyBreakdown.length > 0 && <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <BarChart3 className="h-5 w-5 text-primary" />
 Year-by-Year Breakdown
 </CardTitle>
 <CardDescription>How your investment grows over time.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-xs uppercase bg-muted/50 rounded-t-lg">
 <tr>
 <th className="px-4 py-3">Year</th>
 <th className="px-4 py-3">Balance</th>
 <th className="px-4 py-3">Total Contributed</th>
 <th className="px-4 py-3">Total Earned</th>
 </tr>
 </thead>
 <tbody>
 {results.yearlyBreakdown.map(row => <tr key={row.year} className="border-b last:border-0 hover:bg-muted/20">
 <td className="px-4 py-3 font-medium">Year {row.year}</td>
 <td className="px-4 py-3">{formatCurrency(row.balance)}</td>
 <td className="px-4 py-3">{formatCurrency(row.contributions)}</td>
 <td className="px-4 py-3 text-green-500">{formatCurrency(row.returns)}</td>
 </tr>)}
 </tbody>
 </table>
 </div>
 </CardContent>
<<<<<<< HEAD
 </GlassCard>
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Principal",
    description:"Enter starting investment.",
    icon: Coins,
  },
{
    step:"02",
    title:"Add Return",
    description:"Input expected annual return rate.",
    icon: Percent,
  },
{
    step:"03",
    title:"Project",
    description:"See growth over chosen years.",
    icon: LineChart,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Coins,
    title:"Lump Sum",
    description:"Models a one-time investment.",
  },
{
    icon: Percent,
    title:"Rate Scenarios",
    description:"Compare conservative vs aggressive returns.",
  },
{
    icon: LineChart,
    title:"Growth Curve",
    description:"Visualizes compounding over time.",
  },
{
    icon: TrendingUp,
    title:"Contribution Option",
    description:"Add periodic deposits too.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An investment return calculator translates a percentage into a future balance, which is the only way to grasp compounding's power. Enter a principal, an assumed annual return, and a time horizon, and the tool shows how the balance grows — not linearly, but accelerating as returns build on returns.</p>
  <p>Rate assumptions drive everything. A 5 percent return and a 9 percent return look similar in a headline but diverge enormously over 30 years. The tool lets you model conservative and optimistic scenarios side by side, so you plan around realistic expectations rather than hopeful ones. Pairing with periodic contributions further compounds the effect.</p>
  <p>Inflation is the silent factor. A nominal return ignores purchasing power; a 7 percent gain with 3 percent inflation is really 4 percent in real terms. The calculator models your stated rate, so subtract inflation mentally for true growth. This keeps expectations honest and prevents disappointment when nominal numbers underdeliver in spending power.</p>
  <p>Use it for goal planning, not predictions. Whether saving for retirement, a home, or education, projecting the balance helps you set contribution targets. Diversified, low-cost investments held long term historically smooth volatility, but no tool forecasts direction. The calculator's job is to show what consistent, patient investing can compound into, motivating the habit that actually gets you there.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Is the return guaranteed?",
    answer:"No, market returns vary; this models assumptions.",
  },
{
    question:"What rate should I use?",
    answer:"Use conservative estimates to avoid overestimating.",
  },
{
    question:"Does it include inflation?",
    answer:"Not by default; consider real return after inflation.",
  },
{
    question:"Should I add contributions?",
    answer:"Yes, regular contributions greatly boost outcomes.",
  },
{
    question:"How long should I project?",
    answer:"Longer horizons show compounding's full effect.",
  }
  ]}
/>
</div>
 );
}
=======
 </GlassCard>}
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter start, end, and time in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your absolute and annualized return %, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "CAGR included",
        description: "CAGR included"
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
          <h3>Why Use the Investment Return Calculator?</h3>
          <p>
            Investors use this to measure true performance — annualized return, not just the raw gain.
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

      <RelatedTools currentToolUrl="/tools/finance/investment-return" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
