"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useMemo } from"react";
import { AlertTriangle, CheckCircle2, Copy, DollarSign, PiggyBank, Scale } from"lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import { Scale, DollarSign, AlertTriangle, Copy, Sparkles, Shield, Zap } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function EmergencyLoanClient() {
  const [expense, setExpense] = useState("1000");
  const [savingsRate, setSavingsRate] = useState("4");
  const [loanRate, setLoanRate] = useState("20");
  const [loanTerm, setLoanTerm] = useState("12");
  const resetAll = () => {
    setExpense("1000");
    setSavingsRate("4");
    setLoanRate("20");
    setLoanTerm("12");
  };
  const results = useMemo(() => {
    const p = parseFloat(expense);
    const rSavings = parseFloat(savingsRate) / 100;
    const rLoan = parseFloat(loanRate) / 100;
    const tMonths = parseFloat(loanTerm);
    if (isNaN(p) || isNaN(rSavings) || isNaN(rLoan) || isNaN(tMonths) || p <= 0 || tMonths <= 0) return null;

    // Monthly loan payment (amortized)
    const monthlyRate = rLoan / 12;
    const monthlyPayment = p * (monthlyRate * Math.pow(1 + monthlyRate, tMonths)) / (Math.pow(1 + monthlyRate, tMonths) - 1);
    const totalLoanCost = monthlyPayment * tMonths - p;

    // Savings lost interest (simple estimate)
    const tYears = tMonths / 12;
    const savingsLost = p * rSavings * tYears;
    return {
      loanCost: totalLoanCost.toFixed(2),
      savingsLost: savingsLost.toFixed(2),
      difference: Math.abs(totalLoanCost - savingsLost).toFixed(2),
      better: totalLoanCost > savingsLost ? "savings" : "loan",
      monthlyPayment: monthlyPayment.toFixed(2)
    };
  }, [expense, savingsRate, loanRate, loanTerm]);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Scale} title="Emergency Loan vs Savings" description="Compare financial impact of using emergency savings vs taking a personal loan." actions={<ResetButton onClick={resetAll} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Inputs</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Emergency Expense Amount ($)</Label>
 <Input type="number" value={expense} onChange={e => setExpense(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Savings Account APY (%)</Label>
 <Input type="number" value={savingsRate} onChange={e => setSavingsRate(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Loan Interest Rate (APR %)</Label>
 <Input type="number" value={loanRate} onChange={e => setLoanRate(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Loan Term (Months)</Label>
 <Input type="number" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Comparison Results</CardTitle>
 </CardHeader>
 <CardContent>
 {results ? <div className="space-y-6">
 <div className={cn("p-4 rounded-xl border", results.better === "savings" ? "bg-green-500/10 border-green-500/50" : "bg-red-500/10 border-red-500/50")}>
 <div className="flex items-center gap-2 mb-2">
 <AlertTriangle className={cn("w-5 h-5", results.better === "savings" ? "text-green-500" : "text-red-500")} />
 <h3 className="font-bold">Recommendation</h3>
 </div>
 <p>
 Using your <strong>{results.better}</strong> is cheaper by <strong>${results.difference}</strong> over the {loanTerm} month period.
 </p>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-muted p-4 rounded-lg">
 <h4 className="text-sm font-semibold mb-2">If you use savings:</h4>
 <div className="text-2xl font-bold text-destructive">${results.savingsLost}</div>
 <div className="text-xs text-muted-foreground mt-1">Lost interest earnings</div>
 </div>
 
 <div className="bg-muted p-4 rounded-lg">
 <h4 className="text-sm font-semibold mb-2">If you take a loan:</h4>
 <div className="text-2xl font-bold text-destructive">${results.loanCost}</div>
 <div className="text-xs text-muted-foreground mt-1">Total interest paid</div>
 <div className="text-xs text-muted-foreground mt-1">Monthly payment: ${results.monthlyPayment}</div>
 </div>
 </div>
 
 <div className="flex justify-end">
 <CopyButton getText={() => "Emergency Expense: $" + expense + ". Using savings loses $" + results.savingsLost + "in interest. Taking a loan costs $" + results.loanCost + "in interest. Better option:" + results.better + "."} label="Copy Results" />
 </div>
 </div> : <div className="text-center p-6 text-muted-foreground">
 Enter valid numbers to see the comparison.
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Need",
    description:"Input the emergency amount required.",
    icon: AlertTriangle,
  },
{
    step:"02",
    title:"Compare Options",
    description:"Model loan cost versus drawing savings.",
    icon: Scale,
  },
{
    step:"03",
    title:"Decide",
    description:"See which path costs less overall.",
    icon: CheckCircle2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: AlertTriangle,
    title:"Scenario Modeling",
    description:"Compares borrowing against self-funding.",
  },
{
    icon: Scale,
    title:"Cost Comparison",
    description:"Shows interest paid vs savings interest lost.",
  },
{
    icon: CheckCircle2,
    title:"Clear Recommendation",
    description:"Highlights the cheaper path.",
  },
{
    icon: PiggyBank,
    title:"Savings Impact",
    description:"Estimates opportunity cost of using savings.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>When an unexpected bill arrives, the choice is often borrow or self-fund. This calculator frames that decision in hard numbers rather than panic. It compares the total cost of a loan — principal, interest, and fees — against the opportunity cost of withdrawing from savings, so you see which path is cheaper.</p>
  <p>Loans carry explicit costs that are easy to underestimate. Emergency credit, especially short-term products, can charge steep rates that turn a modest need into a large repayment. Even a reasonable personal loan accrues interest that the calculator surfaces, making the true price visible before you commit.</p>
  <p>Using savings has a subtler cost: the interest you would have earned and the lost buffer. But for a genuine emergency, that cost is usually far smaller than loan interest, and the money returns faster than people fear. The calculator quantifies both sides so the trade-off is rational, not emotional.</p>
  <p>The deeper lesson is preparation. The best outcome is avoiding the choice entirely by holding a funded emergency account, which keeps your options open and your dignity intact during crises. If you must borrow, comparing total cost first prevents the worst terms. Use this tool to make the decision once, calmly, with numbers — then rebuild savings immediately after.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"When is a loan better than savings?",
    answer:"Rarely, unless draining savings risks a larger penalty like missed rent or a desperate later loan.",
  },
{
    question:"What does a loan really cost?",
    answer:"Interest plus fees, often high for fast emergency credit; total cost exceeds the principal.",
  },
{
    question:"Why avoid dipping into savings?",
    answer:"Once spent, the buffer is gone and rebuilding takes time you may not have.",
  },
{
    question:"Are payday loans ever wise?",
    answer:"Generally no; their rates are extreme and trap borrowers in cycles.",
  },
{
    question:"What is the best preparation?",
    answer:"A funded emergency account avoids the whole trade-off.",
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
        description: "Enter expense, savings APY, loan APR in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your loan vs savings cost comparison, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "True cost of each side",
        description: "True cost of each side"
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
          <h3>Why Use the Emergency Loan vs Savings Comparison?</h3>
          <p>
            When an emergency hits, this shows whether a loan or your savings is cheaper after interest.
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

      <RelatedTools currentToolUrl="/tools/finance/emergency-loan" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
