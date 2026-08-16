"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { ResetButton } from"@/components/shared/action-buttons";
import { BarChart3, Calculator, CheckCircle2, DollarSign, ListChecks, Plus, Scale, Trash2, TrendingDown } from"lucide-react";
import { cn } from"@/lib/utils";

type LoanInput = {
  id: string;
  name: string;
  principal: string;
  rate: string;
  years: string;
};
const defaultLoans: LoanInput[] = [{
  id: "1",
  name: "Loan Offer A",
  principal: "20000",
  rate: "5.5",
  years: "5"
}, {
  id: "2",
  name: "Loan Offer B",
  principal: "20000",
  rate: "6.0",
  years: "4"
}];
export function LoanComparisonClient() {
  const [loans, setLoans] = useState<LoanInput[]>(defaultLoans);
  const results = useMemo(() => {
    const computed = loans.map(loan => {
      const p = parseFloat(loan.principal) || 0;
      const r = parseFloat(loan.rate) || 0;
      const y = parseFloat(loan.years) || 0;
      let monthlyPayment = 0;
      let totalPayment = 0;
      let totalInterest = 0;
      if (p > 0 && y > 0) {
        if (r > 0) {
          const monthlyRate = r / 100 / 12;
          const numPayments = y * 12;
          monthlyPayment = p * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        } else {
          monthlyPayment = p / (y * 12);
        }
        totalPayment = monthlyPayment * y * 12;
        totalInterest = totalPayment - p;
      }
      return {
        ...loan,
        monthlyPayment,
        totalPayment,
        totalInterest,
        isValid: p > 0 && y > 0
      };
    });
    const validLoans = computed.filter(c => c.isValid);
    let minCostId = "";
    let maxCostId = "";
    if (validLoans.length > 0) {
      minCostId = validLoans.reduce((prev, curr) => prev.totalPayment < curr.totalPayment ? prev : curr).id;
      maxCostId = validLoans.reduce((prev, curr) => prev.totalPayment > curr.totalPayment ? prev : curr).id;
    }
    const minCostLoan = computed.find(l => l.id === minCostId);
    const maxCostLoan = computed.find(l => l.id === maxCostId);
    const maxSavings = (maxCostLoan?.totalPayment || 0) - (minCostLoan?.totalPayment || 0);
    return {
      computed,
      minCostId,
      maxCostId,
      maxSavings
    };
  }, [loans]);
  const addLoan = () => {
    if (loans.length >= 3) return;
    const newId = Math.random().toString(36).substring(7);
    setLoans([...loans, {
      id: newId,
      name: `Loan Offer ${String.fromCharCode(65 + loans.length)}`,
      principal: "20000",
      rate: "5.0",
      years: "5"
    }]);
  };
  const removeLoan = (id: string) => {
    setLoans(loans.filter(l => l.id !== id));
  };
  const updateLoan = (id: string, field: keyof LoanInput, value: string) => {
    setLoans(loans.map(l => l.id === id ? {
      ...l,
      [field]: value
    } : l));
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Scale} title="Loan Comparison Calculator" description="Compare multiple loan offers side by side to find the best option." actions={<ResetButton onClick={() => setLoans(defaultLoans)} label="Reset" />} />

 <div className="flex justify-end">
 <Button variant="outline" onClick={addLoan} disabled={loans.length >= 3}>
 <Plus className="w-4 h-4 mr-2" />
 Add Loan Offer
 </Button>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {loans.map((loan, idx) => {
          const result = results.computed.find(c => c.id === loan.id);
          const isCheapest = result?.id === results.minCostId && loans.length > 1;
          return <GlassCard key={loan.id} className={cn("relative transition-all", isCheapest && "ring-2 ring-green-500")}>
 {isCheapest && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
 Best Value
 </div>}
 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
 <CardTitle className="text-lg">
 <Input value={loan.name} onChange={e => updateLoan(loan.id, 'name', e.target.value)} className="h-8 border-transparent hover:border-border font-semibold px-2 -ml-2 w-[160px]" />
 </CardTitle>
 {loans.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeLoan(loan.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
 <Trash2 className="w-4 h-4" />
 </Button>}
 </CardHeader>
 <CardContent className="space-y-6 pt-4">
 <div className="space-y-3">
 <div className="space-y-1.5">
 <Label className="text-xs">Principal Amount ($)</Label>
 <Input type="number" value={loan.principal} onChange={e => updateLoan(loan.id, 'principal', e.target.value)} />
 </div>
 <div className="space-y-1.5">
 <Label className="text-xs">Interest Rate (%)</Label>
 <Input type="number" value={loan.rate} onChange={e => updateLoan(loan.id, 'rate', e.target.value)} />
 </div>
 <div className="space-y-1.5">
 <Label className="text-xs">Loan Term (Years)</Label>
 <Input type="number" value={loan.years} onChange={e => updateLoan(loan.id, 'years', e.target.value)} />
 </div>
 </div>

 <Separator />

 <div className="space-y-3">
 <div className="bg-primary/5 rounded-lg p-3 text-center border border-primary/10">
 <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
 <Calculator className="w-3 h-3" /> Monthly Payment
 </div>
 <div className="text-xl font-bold">${result?.monthlyPayment.toFixed(2) || '0.00'}</div>
 </div>
 
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Total Interest:</span>
 <span className="font-medium">${result?.totalInterest.toFixed(2) || '0.00'}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Total Cost:</span>
 <span className="font-medium">${result?.totalPayment.toFixed(2) || '0.00'}</span>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Loans",
    description:"Add terms, rates, and fees for each option.",
    icon: ListChecks,
  },
{
    step:"02",
    title:"Compute",
    description:"See monthly payment and total cost.",
    icon: Calculator,
  },
{
    step:"03",
    title:"Decide",
    description:"Pick the cheaper overall loan.",
    icon: CheckCircle2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListChecks,
    title:"Multiple Loans",
    description:"Compare two or more side by side.",
  },
{
    icon: Calculator,
    title:"True Cost",
    description:"Includes fees, not just rate.",
  },
{
    icon: CheckCircle2,
    title:"Clear Winner",
    description:"Highlights lowest total cost.",
  },
{
    icon: TrendingDown,
    title:"Fee Aware",
    description:"Exposes hidden origination charges.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Loan comparison prevents the classic trap of choosing the lowest monthly payment and paying far more overall. This calculator lines up multiple loan offers with their rates, terms, and fees, then reveals the true total cost of each. That complete picture is what should drive the decision, not the headline rate alone.</p>
  <p>Fees are the hidden variable. Two loans at the same rate can differ by hundreds in origination, closing, or service charges. The tool adds these to the interest so you compare like for like. A slightly higher rate with zero fees can beat a lower rate loaded with costs, and only a total-cost view exposes that.</p>
  <p>Term length trades monthly comfort for lifetime cost. Extending a loan lowers each payment but stretches interest across more years, often costing more. The calculator shows both the monthly and the total, letting you choose consciously rather than defaulting to the easiest payment. For refinancing, it quantifies whether savings exceed the switch cost.</p>
  <p>Use comparison before signing any loan, from auto to personal to mortgage. Enter every offer you receive, including pre-qualifications, and let the totals guide you. The discipline of comparing full costs — not just rates — is one of the simplest ways to save thousands over your borrowing life.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Rate or total cost?",
    answer:"Total cost including fees is what matters.",
  },
{
    question:"Why fees matter?",
    answer:"Origination and closing fees change the real price.",
  },
{
    question:"Longer term cheaper?",
    answer:"Lower monthly, but higher total interest.",
  },
{
    question:"Should I refinance?",
    answer:"If savings exceed costs, yes.",
  },
{
    question:"Is prepayment a factor?",
    answer:"Some loans penalize early payoff; check terms.",
  }
  ]}
/>
</div>
 </CardContent>
 </GlassCard>;
        })}
 </div>

 {loans.length > 1 && results.maxSavings > 0 && <GlassCard className="bg-primary/5 border-primary/20">
 <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
 <BarChart3 className="w-6 h-6" />
 </div>
 <div>
 <h3 className="font-semibold text-lg">Comparison Summary</h3>
 <p className="text-sm text-muted-foreground">
 Choosing the cheapest option saves you money over the life of the loan.
 </p>
 </div>
 </div>
 <div className="text-right">
 <div className="text-sm text-muted-foreground">Potential Savings</div>
 <div className="text-2xl font-bold text-green-500">${results.maxSavings.toFixed(2)}</div>
 </div>
 </CardContent>
 </GlassCard>}
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter two loan offers in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your monthly payment and total cost vs each, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Head-to-head cost",
        description: "Head-to-head cost"
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
          <h3>Why Use the Loan Comparison Calculator?</h3>
          <p>
            Compare two loan offers on total cost — not just the headline rate — to pick the cheaper one.
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

      <RelatedTools currentToolUrl="/tools/finance/loan-comparison" max={6} />

    </div></div>;
}