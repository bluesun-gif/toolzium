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
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calendar, Copy, DollarSign, Receipt, Shield, ShieldCheck, Target, Wallet } from"lucide-react";
import toast from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Shield, DollarSign, Target, Copy, Sparkles, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function EmergencyFundClient() {
  const [expenses, setExpenses] = useState({
    housing: "",
    food: "",
    utilities: "",
    debt: "",
    insurance: "",
    transport: "",
    dependents: ""
  });
  const [targetMonths, setTargetMonths] = useState("6");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const totalMonthlyExpenses = (Number(expenses.housing) || 0) + (Number(expenses.food) || 0) + (Number(expenses.utilities) || 0) + (Number(expenses.debt) || 0) + (Number(expenses.insurance) || 0) + (Number(expenses.transport) || 0) + (Number(expenses.dependents) || 0);
  const goal = totalMonthlyExpenses * Number(targetMonths);
  const gap = Math.max(0, goal - (Number(currentSavings) || 0));
  const monthsToGoal = (Number(monthlyContribution) || 0) > 0 ? gap / Number(monthlyContribution) : 0;
  const handleReset = () => {
    setExpenses({
      housing: "",
      food: "",
      utilities: "",
      debt: "",
      insurance: "",
      transport: "",
      dependents: ""
    });
    setTargetMonths("6");
    setCurrentSavings("");
    setMonthlyContribution("");
    toast.success("Reset successful");
  };
  const getSummary = () => {
    return "Emergency Fund Goal: $" + goal.toFixed(2) + "\n" + "Current Savings: $" + (Number(currentSavings) || 0).toFixed(2) + "\n" + "Remaining Gap: $" + gap.toFixed(2) + "\n" + "Est. Time to Goal:" + (monthsToGoal > 0 ? monthsToGoal.toFixed(1) + "months" : "N/A");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Shield} title="Emergency Fund Calculator" description="Calculate your required safety net and plan your savings." actions={<React.Fragment>
 <ResetButton onClick={handleReset} label="Reset" />
 </React.Fragment>} />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Inputs</CardTitle>
 <CardDescription>Monthly Essential Expenses</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Housing</Label>
 <Input type="number" value={expenses.housing} onChange={e => setExpenses({
                  ...expenses,
                  housing: e.target.value
                })} />
 </div>
 <div className="space-y-2">
 <Label>Food</Label>
 <Input type="number" value={expenses.food} onChange={e => setExpenses({
                  ...expenses,
                  food: e.target.value
                })} />
 </div>
 <div className="space-y-2">
 <Label>Utilities</Label>
 <Input type="number" value={expenses.utilities} onChange={e => setExpenses({
                  ...expenses,
                  utilities: e.target.value
                })} />
 </div>
 <div className="space-y-2">
 <Label>Debt / Loans</Label>
 <Input type="number" value={expenses.debt} onChange={e => setExpenses({
                  ...expenses,
                  debt: e.target.value
                })} />
 </div>
 <div className="space-y-2">
 <Label>Insurance</Label>
 <Input type="number" value={expenses.insurance} onChange={e => setExpenses({
                  ...expenses,
                  insurance: e.target.value
                })} />
 </div>
 <div className="space-y-2">
 <Label>Transportation</Label>
 <Input type="number" value={expenses.transport} onChange={e => setExpenses({
                  ...expenses,
                  transport: e.target.value
                })} />
 </div>
 </div>
 
 <Separator />
 
 <div className="space-y-2">
 <Label>Target Safety Buffer (Months)</Label>
 <Select value={targetMonths} onValueChange={setTargetMonths}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="3">3 Months (Minimum)</SelectItem>
 <SelectItem value="6">6 Months (Recommended)</SelectItem>
 <SelectItem value="9">9 Months (Conservative)</SelectItem>
 <SelectItem value="12">12 Months (Maximum)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>Current Savings</Label>
 <Input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Monthly Savings Contribution</Label>
 <Input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} />
 </div>

 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2 text-center">
 <h3 className="text-2xl font-bold text-primary">${goal.toFixed(2)}</h3>
 <p className="text-muted-foreground">Total Emergency Fund Goal</p>
 </div>
 
 <Separator />
 
 <div className="space-y-2">
 <div className="flex justify-between">
 <span>Total Monthly Expenses:</span>
 <span className="font-semibold">${totalMonthlyExpenses.toFixed(2)}</span>
 </div>
 <div className="flex justify-between">
 <span>Current Savings:</span>
 <span className="font-semibold">${(Number(currentSavings) || 0).toFixed(2)}</span>
 </div>
 <div className="flex justify-between">
 <span>Remaining Gap:</span>
 <span className="font-semibold">${gap.toFixed(2)}</span>
 </div>
 <div className="flex justify-between text-primary">
 <span>Est. Time to Goal:</span>
 <span className="font-semibold">{monthsToGoal > 0 ? monthsToGoal.toFixed(1) + "months" : "Need contribution"}</span>
 </div>
 </div>
 
 <CopyButton getText={getSummary} label="Copy Summary" />
 </CardContent>
 </GlassCard>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Expenses",
    description:"Add your essential monthly spending.",
    icon: Receipt,
  },
{
    step:"02",
    title:"Set Months",
    description:"Choose 3, 6, or more months of coverage.",
    icon: Calendar,
  },
{
    step:"03",
    title:"Calculate",
    description:"See your target savings amount.",
    icon: Wallet,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Receipt,
    title:"Essential Based",
    description:"Uses must-pay expenses, not total spending.",
  },
{
    icon: Calendar,
    title:"Coverage Choice",
    description:"Models 3 to 12 months of buffer.",
  },
{
    icon: Wallet,
    title:"Target Amount",
    description:"Returns a clear savings goal.",
  },
{
    icon: ShieldCheck,
    title:"Risk Adjusted",
    description:"Bigger buffer for variable income.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An emergency fund is the foundation of financial stability, yet many skip it and rely on credit when crises hit. The calculator defines your target by multiplying essential monthly expenses by a chosen number of months. The result is a concrete number rather than the vague idea that you should save something.</p>
  <p>Base the fund on essentials, not lifestyle. Rent, food, insurance, and minimum debt payments belong; dining out and hobbies do not. This keeps the target realistic and reachable. Three months covers most short disruptions; six or more suits freelancers or anyone with variable income where gaps last longer.</p>
  <p>Accessibility matters as much as amount. The fund should sit in a safe, liquid account you can reach immediately, not tied up in investments that could be down when you need them. Separating it from daily spending prevents accidental erosion. The calculator's target becomes a savings milestone you build toward automatically.</p>
  <p>Start before optimizing. Even one month of expenses dramatically reduces panic when something breaks, and progress compounds motivation. Treat the fund as insurance, not an investment — its job is to keep you out of high-interest debt during bad luck. Once funded, redirect those contributions to other goals. Knowing the exact number turns an abstract safety habit into a finishable objective.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How many months should I save?",
    answer:"Three to six months of essentials is common; more if income is unstable.",
  },
{
    question:"What counts as an emergency?",
    answer:"Job loss, medical, or urgent repairs — not vacations or sales.",
  },
{
    question:"Where should I keep it?",
    answer:"A liquid, safe account you can access quickly, separate from daily spending.",
  },
{
    question:"Do I include subscriptions?",
    answer:"Only if essential; trim discretionary items from the target.",
  },
{
    question:"Can I invest the fund?",
    answer:"Keep it safe and accessible; investing risks needing it during a downturn.",
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
        description: "Enter monthly expenses and target months in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your the emergency fund size you need, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "3/6/9-month presets",
        description: "3/6/9-month presets"
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
          <h3>Why Use the Emergency Fund Calculator?</h3>
          <p>
            Anyone building a safety net uses this to size an emergency fund to real expenses, not a guess.
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

      <RelatedTools currentToolUrl="/tools/finance/emergency-fund" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
