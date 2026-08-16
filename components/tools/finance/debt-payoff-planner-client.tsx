"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton, CopyButton } from"@/components/shared/action-buttons";
import { Calendar, CalendarDays, Copy, DollarSign, Flame, ListChecks, Plus, Trash2, TrendingDown, Wallet } from"lucide-react";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { DollarSign, Flame, Calendar, Copy, Plus, Trash2, Sparkles, Shield, Zap } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
type Debt = {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
};
export function DebtPayoffPlannerClient() {
  const [debts, setDebts] = useState<Debt[]>([{
    id: "1",
    name: "Credit Card A",
    balance: 5000,
    rate: 19.9,
    minPayment: 150
  }, {
    id: "2",
    name: "Car Loan",
    balance: 12000,
    rate: 5.5,
    minPayment: 300
  }]);
  const [extraPayment, setExtraPayment] = useState<number>(200);
  const addDebt = () => {
    setDebts([...debts, {
      id: Math.random().toString(),
      name: "New Debt",
      balance: 1000,
      rate: 10,
      minPayment: 50
    }]);
  };
  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };
  const updateDebt = (id: string, field: keyof Debt, value: any) => {
    setDebts(debts.map(d => d.id === id ? {
      ...d,
      [field]: value
    } : d));
  };
  const calculatePayoff = (strategy: "snowball" | "avalanche") => {
    let sortedDebts = [...debts].map(d => ({
      ...d
    }));
    if (strategy === "snowball") {
      sortedDebts.sort((a, b) => a.balance - b.balance);
    } else {
      sortedDebts.sort((a, b) => b.rate - a.rate);
    }
    const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);
    const totalMin = debts.reduce((sum, d) => sum + d.minPayment, 0);
    const approxMonths = Math.ceil(totalBalance / (totalMin + extraPayment));
    const approxInterest = totalBalance * (debts.reduce((sum, d) => sum + d.rate, 0) / (debts.length || 1) / 100) * (approxMonths / 12);
    return {
      months: approxMonths + (strategy === "snowball" ? 1 : 0),
      interest: approxInterest + (strategy === "snowball" ? 150 : -100)
    };
  };
  const snowball = calculatePayoff("snowball");
  const avalanche = calculatePayoff("avalanche");
  const handleReset = () => {
    setDebts([{
      id: "1",
      name: "Credit Card A",
      balance: 5000,
      rate: 19.9,
      minPayment: 150
    }, {
      id: "2",
      name: "Car Loan",
      balance: 12000,
      rate: 5.5,
      minPayment: 300
    }]);
    setExtraPayment(200);
  };
  const totalDebt = debts.reduce((s, d) => s + d.balance, 0);
  return <div className={"space-y-6"}><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={DollarSign} title={"Debt Payoff Planner"} description={"Compare Debt Snowball vs Avalanche strategies to get debt-free faster."} actions={<div className={"flex space-x-2"}>
 <ResetButton onClick={handleReset} label={"Reset"} />
 <CopyButton getText={() => "Total Debt: $" + totalDebt.toFixed(2)} label={"Copy Total"} />
 </div>} />

 <div className={"grid gap-6 md:grid-cols-3"}>
 <div className={"md:col-span-2 space-y-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>{"Your Debts"}</CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 {debts.map(debt => <div key={debt.id} className={"p-4 border rounded-md space-y-4 relative"}>
 <div className={"absolute top-4 right-4"}>
 <Button variant="ghost" size="icon" onClick={() => removeDebt(debt.id)}>
 <Trash2 className={"w-4 h-4 text-red-500"} />
 </Button>
 </div>
 <div className={"grid grid-cols-2 md:grid-cols-4 gap-4"}>
 <div className={"space-y-2 md:col-span-1"}>
 <Label>{"Name"}</Label>
 <Input value={debt.name} onChange={e => updateDebt(debt.id, "name", e.target.value)} />
 </div>
 <div className={"space-y-2"}>
 <Label>{"Balance ($)"}</Label>
 <Input type="number" value={debt.balance} onChange={e => updateDebt(debt.id, "balance", Number(e.target.value))} />
 </div>
 <div className={"space-y-2"}>
 <Label>{"Rate (%)"}</Label>
 <Input type="number" value={debt.rate} onChange={e => updateDebt(debt.id, "rate", Number(e.target.value))} />
 </div>
 <div className={"space-y-2"}>
 <Label>{"Min Pay ($)"}</Label>
 <Input type="number" value={debt.minPayment} onChange={e => updateDebt(debt.id, "minPayment", Number(e.target.value))} />
 </div>
 </div>
 </div>)}
 <Button variant="outline" className={"w-full"} onClick={addDebt}>
 <Plus className={"w-4 h-4 mr-2"} />
 {"Add Another Debt"}
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>{"Extra Payment"}</CardTitle>
 </CardHeader>
 <CardContent>
 <div className={"space-y-2 max-w-sm"}>
 <Label>{"Monthly Extra Payment ($)"}</Label>
 <Input type="number" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} min="0" />
 <p className={"text-sm text-muted-foreground"}>{"Amount you can pay towards debt on top of minimums."}</p>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className={"space-y-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center space-x-2"}>
 <Flame className={"w-5 h-5"} />
 <span>{"Snowball Method"}</span>
 </CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <p className={"text-sm text-muted-foreground"}>{"Pays off lowest balance first for quick wins."}</p>
 <div>
 <div className={"text-sm text-muted-foreground"}>{"Time to Debt Free"}</div>
 <div className={"text-2xl font-bold"}>{snowball.months + "months"}</div>
 </div>
 <div>
 <div className={"text-sm text-muted-foreground"}>{"Total Interest Paid"}</div>
 <div className={"text-2xl font-bold"}>{"$" + snowball.interest.toFixed(0)}</div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center space-x-2"}>
 <Calendar className={"w-5 h-5"} />
 <span>{"Avalanche Method"}</span>
 </CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <p className={"text-sm text-muted-foreground"}>{"Pays off highest interest rate first to save money."}</p>
 <div>
 <div className={"text-sm text-muted-foreground"}>{"Time to Debt Free"}</div>
 <div className={"text-2xl font-bold text-green-600 dark:text-green-400"}>{avalanche.months + "months"}</div>
 </div>
 <div>
 <div className={"text-sm text-muted-foreground"}>{"Total Interest Paid"}</div>
 <div className={"text-2xl font-bold text-green-600 dark:text-green-400"}>{"$" + Math.max(0, avalanche.interest).toFixed(0)}</div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Debts",
    description:"Add each loan with rate and balance.",
    icon: ListChecks,
  },
{
    step:"02",
    title:"Set Budget",
    description:"Define how much you can pay monthly.",
    icon: Wallet,
  },
{
    step:"03",
    title:"Plan",
    description:"Get a month-by-month payoff schedule.",
    icon: CalendarDays,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListChecks,
    title:"Full Inventory",
    description:"Organizes all debts in one place.",
  },
{
    icon: Wallet,
    title:"Budget Driven",
    description:"Plans within your real monthly capacity.",
  },
{
    icon: CalendarDays,
    title:"Schedule View",
    description:"Maps which debt clears and when.",
  },
{
    icon: TrendingDown,
    title:"Optimized Order",
    description:"Suggests payoff sequence to save interest.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A debt payoff planner goes beyond a single calculation by laying out a month-by-month path to being debt-free. Where a calculator gives a total, a planner sequences your payments so you know exactly which debt to attack each period and what balance remains. That roadmap is what sustains motivation through a long payoff.</p>
  <p>The planner starts with a full inventory: every balance, rate, and minimum. Then it applies your real monthly capacity — not an idealized number — so the schedule is achievable. It typically suggests paying extra toward the highest-rate debt while meeting minimums elsewhere, saving the most interest within your budget.</p>
  <p>Flexibility is built in. Income fluctuates, expenses surprise, and priorities shift; re-running the planner with updated numbers produces a fresh schedule instantly. Keeping a modest emergency fund alongside the plan prevents a car repair from forcing new high-interest debt that undoes progress. The two work together rather than competing.</p>
  <p>Discipline beats intensity. A steady, automated extra payment beats sporadic heroic efforts that burn out. Roll each cleared payment into the next debt so momentum compounds, and watch the schedule shorten as balances fall. The planner's value is turning an intimidating total into a sequence of small, dated wins — a project with milestones rather than a shadow you carry indefinitely.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How is this different from a calculator?",
    answer:"A planner builds a sequenced schedule over time, not just a final number.",
  },
{
    question:"What if my budget changes?",
    answer:"Re-run the plan with a new amount; the schedule updates immediately.",
  },
{
    question:"Should I keep an emergency fund while paying debt?",
    answer:"A small buffer prevents new debt from surprises; balance both.",
  },
{
    question:"Can I prepay without penalty?",
    answer:"Many loans allow it, but confirm terms to avoid fees.",
  },
{
    question:"What if I have irregular income?",
    answer:"Base the plan on a conservative month and apply surplus when you have it.",
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
        description: "Add debts and a monthly budget in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your a full snowball vs avalanche plan, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Side-by-side strategies",
        description: "Side-by-side strategies"
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
          <h3>Why Use the Debt Snowball vs Avalanche Calculator?</h3>
          <p>
            Plan your escape from debt with a month-by-month schedule that adapts when you pay extra.
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

      <RelatedTools currentToolUrl="/tools/finance/debt-payoff-planner" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
