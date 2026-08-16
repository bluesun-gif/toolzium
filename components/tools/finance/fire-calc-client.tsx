"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { CalendarClock, Copy, DollarSign, Flame, Percent, TrendingUp, Wallet } from"lucide-react";
import { ResetButton, CopyButton } from"@/components/shared/action-buttons";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, TrendingUp, DollarSign, Copy, Sparkles, Shield, Zap } from "lucide-react";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function FireCalcClient() {
  const [currentAge, setCurrentAge] = useState(30);
  const [netWorth, setNetWorth] = useState(50000);
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [annualExpenses, setAnnualExpenses] = useState(40000);
  const [returnRate, setReturnRate] = useState(7);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const annualSavings = annualIncome - annualExpenses;
  const fireNumber = annualExpenses / (withdrawalRate / 100);
  let yearsToFire = 0;
  let currentNW = netWorth;
  if (annualSavings > 0) {
    while (currentNW < fireNumber && yearsToFire < 100) {
      currentNW = currentNW * (1 + returnRate / 100) + annualSavings;
      yearsToFire++;
    }
  } else if (currentNW >= fireNumber) {
    yearsToFire = 0;
  } else {
    yearsToFire = -1; // Never
  }
  const fireAge = currentAge + yearsToFire;
  const summaryText = "FIRE Number: $" + fireNumber.toFixed(0) + "\nYears to FIRE:" + (yearsToFire >= 0 ? yearsToFire : "Never") + "\nFIRE Age:" + (yearsToFire >= 0 ? fireAge : "N/A");
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Flame} title="FIRE Calculator" description="Calculate your Financial Independence and Retire Early (FIRE) metrics." actions={<React.Fragment>
 <ResetButton onClick={() => {
          setCurrentAge(30);
          setNetWorth(50000);
          setAnnualIncome(80000);
          setAnnualExpenses(40000);
          setReturnRate(7);
          setWithdrawalRate(4);
        }} label="Reset" />
 </React.Fragment>} />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Your Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Current Age</Label>
 <Input type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Current Net Worth ($)</Label>
 <Input type="number" value={netWorth} onChange={e => setNetWorth(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Annual Income ($)</Label>
 <Input type="number" value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Annual Expenses ($)</Label>
 <Input type="number" value={annualExpenses} onChange={e => setAnnualExpenses(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Investment Return (%)</Label>
 <Input type="number" value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Withdrawal Rate (%)</Label>
 <Input type="number" value={withdrawalRate} onChange={e => setWithdrawalRate(Number(e.target.value))} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>FIRE Projection</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <p className="text-sm text-muted-foreground">Your FIRE Number</p>
 <p className="text-4xl font-bold text-primary">${fireNumber.toLocaleString(undefined, {
                  maximumFractionDigits: 0
                })}</p>
 </div>
 
 <Separator />
 
 <div className="grid grid-cols-2 gap-4">
 <div>
 <p className="text-sm text-muted-foreground">Years to FIRE</p>
 <p className="text-2xl font-semibold">{yearsToFire >= 0 ? yearsToFire : "Never"}</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">FIRE Age</p>
 <p className="text-2xl font-semibold">{yearsToFire >= 0 ? fireAge : "N/A"}</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">Annual Savings</p>
 <p className="text-2xl font-semibold">${annualSavings.toLocaleString()}</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">Savings Rate</p>
 <p className="text-2xl font-semibold">{annualIncome > 0 ? (annualSavings / annualIncome * 100).toFixed(1) : "0.0"}%</p>
 </div>
 </div>

 <div className="flex justify-end pt-4">
 <CopyButton getText={() => summaryText} label="Copy Summary" />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Finances",
    description:"Add income, spending, and savings rate.",
    icon: Wallet,
  },
{
    step:"02",
    title:"Set Assumptions",
    description:"Input expected return and withdrawal rate.",
    icon: Percent,
  },
{
    step:"03",
    title:"Project",
    description:"See your financial independence date.",
    icon: CalendarClock,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Wallet,
    title:"Savings Rate Aware",
    description:"Models how saving more accelerates freedom.",
  },
{
    icon: Percent,
    title:"Return Modeling",
    description:"Uses assumed market returns.",
  },
{
    icon: CalendarClock,
    title:"Independence Date",
    description:"Estimates when you can retire.",
  },
{
    icon: TrendingUp,
    title:"Scenario Testing",
    description:"Compare aggressive vs lean paths.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>FIRE is a framework for escaping the paycheck-to-paycheck treadmill by accumulating investments that eventually cover living expenses. The calculator projects your financial independence date by combining your savings rate, assumed returns, and a safe withdrawal rate. It turns a dream into a date you can track.</p>
  <p>The savings rate is the most powerful lever. Saving half your income both builds assets quickly and reduces the total you need, because your expenses — the basis of the target — are lower. The calculator shows how a few percentage points of extra saving pulls the date years earlier, which is more motivating than abstract advice.</p>
  <p>Withdrawal rate sets the finish line. The common 4 percent rule suggests you can withdraw 4 percent of your portfolio annually with low risk of depletion, implying a target of 25 times annual spending. Lower rates demand a bigger pile but add safety. The tool lets you test both, modeling how caution extends or compresses the timeline.</p>
  <p>Treat outputs as planning, not prophecy. Markets fluctuate and spending changes, so revisit assumptions annually and keep a buffer. The calculator's real value is behavioral: seeing a concrete date makes the trade-off between today's spending and tomorrow's freedom tangible, helping you save consistently toward a definable goal.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is FIRE?",
    answer:"Financial Independence, Retire Early: building enough invested assets to cover living costs.",
  },
{
    question:"What withdrawal rate is safe?",
    answer:"The 4 percent rule is common, though many use lower for caution.",
  },
{
    question:"How does savings rate matter?",
    answer:"Higher savings both grows assets faster and lowers the needed total.",
  },
{
    question:"Are returns guaranteed?",
    answer:"No; markets vary, so use conservative assumptions.",
  },
{
    question:"Can I retire earlier than planned?",
    answer:"Yes, if returns exceed assumptions or spending stays low.",
  }
  ]}
/>
</div>
 );
}
=======
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter age, income, expenses, returns in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your FIRE number, years, and FIRE age, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "FIRE number from expenses",
        description: "FIRE number from expenses"
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
          <h3>Why Use the FIRE Calculator?</h3>
          <p>
            FIRE followers use this to see the exact net worth that lets them quit — and how many years it takes.
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

      <RelatedTools currentToolUrl="/tools/finance/fire-calc" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
