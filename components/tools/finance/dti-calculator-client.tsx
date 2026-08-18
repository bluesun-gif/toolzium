"use client";

import { Card } from "@/components/ui/card";

import { ToolBackground } from "@/components/shared/tool-background";
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
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calculator, CreditCard, DollarSign, Percent, Shield, ShieldCheck, Wallet, Copy } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from"@/lib/utils";

export function DtiCalculatorClient() {
  const [income, setIncome] = useState("5000");
  const [housing, setHousing] = useState("1500");
  const [creditCards, setCreditCards] = useState("200");
  const [autoLoans, setAutoLoans] = useState("300");
  const [studentLoans, setStudentLoans] = useState("150");
  const [otherDebt, setOtherDebt] = useState("0");
  const calculateDTI = () => {
    const grossIncome = parseFloat(income) || 0;
    const housingDebt = parseFloat(housing) || 0;
    const cardsDebt = parseFloat(creditCards) || 0;
    const autoDebt = parseFloat(autoLoans) || 0;
    const studentDebt = parseFloat(studentLoans) || 0;
    const other = parseFloat(otherDebt) || 0;
    if (grossIncome <= 0) return null;
    const totalDebt = housingDebt + cardsDebt + autoDebt + studentDebt + other;

    // Front-end: just housing
    const frontEndDti = housingDebt / grossIncome * 100;
    // Back-end: all debt
    const backEndDti = totalDebt / grossIncome * 100;
    let status = "High Risk";
    let statusClass = "text-destructive";
    if (backEndDti <= 36) {
      status = "Ideal";
      statusClass = "text-green-500";
    } else if (backEndDti <= 43) {
      status = "Acceptable";
      statusClass = "text-yellow-500";
    }

    // Maximum allowable housing for 36% rule (total debt shouldn't exceed 36% of income)
    const otherDebtOnly = cardsDebt + autoDebt + studentDebt + other;
    const maxHousing36 = grossIncome * 0.36 - otherDebtOnly;
    const maxHousing43 = grossIncome * 0.43 - otherDebtOnly;
    return {
      totalDebt,
      frontEndDti: frontEndDti.toFixed(1),
      backEndDti: backEndDti.toFixed(1),
      status,
      statusClass,
      maxHousing36: Math.max(0, maxHousing36).toFixed(2),
      maxHousing43: Math.max(0, maxHousing43).toFixed(2)
    };
  };
  const results = calculateDTI();
  const handleReset = () => {
    setIncome("5000");
    setHousing("1500");
    setCreditCards("200");
    setAutoLoans("300");
    setStudentLoans("150");
    setOtherDebt("0");
  };
  const getResultsText = () => {
    if (!results) return "";
    return "Front-End DTI:" + results.frontEndDti + "%\nBack-End DTI:" + results.backEndDti + "%\nStatus:" + results.status;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Calculator} title="Debt-to-Income (DTI) Ratio Calculator" description="Calculate your DTI ratio for mortgage and loan eligibility." actions={<>
 <CopyButton getText={getResultsText} label="Copy Results" />
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Financial Details</CardTitle>
 <CardDescription>Enter your monthly income and debts</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Gross Monthly Income ($)</Label>
 <Input type="number" min="0" value={income} onChange={e => setIncome(e.target.value)} />
 </div>
 
 <Separator />
 <div className="text-sm font-semibold text-muted-foreground">Monthly Debts</div>
 
 <div className="space-y-2">
 <Label>Rent / Proposed Mortgage ($)</Label>
 <Input type="number" min="0" value={housing} onChange={e => setHousing(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Credit Card Min Payments ($)</Label>
 <Input type="number" min="0" value={creditCards} onChange={e => setCreditCards(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Auto Loan Payments ($)</Label>
 <Input type="number" min="0" value={autoLoans} onChange={e => setAutoLoans(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Student Loan Payments ($)</Label>
 <Input type="number" min="0" value={studentLoans} onChange={e => setStudentLoans(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Other Debt ($)</Label>
 <Input type="number" min="0" value={otherDebt} onChange={e => setOtherDebt(e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>DTI Analysis</CardTitle>
 </CardHeader>
 <CardContent>
 {results ? <div className="space-y-6">
 <div className="text-center p-6 bg-primary/10 rounded-lg relative overflow-hidden">
 <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">
 Back-End DTI Ratio
 </div>
 <div className={cn("text-5xl font-bold", results.statusClass)}>
 {results.backEndDti}%
 </div>
 <div className="mt-2 text-sm font-medium">
 Status: <span className={results.statusClass}>{results.status}</span>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-secondary/20 rounded-md">
 <div className="text-sm text-muted-foreground mb-1">Front-End DTI</div>
 <div className="text-xl font-semibold">{results.frontEndDti}%</div>
 <div className="text-xs text-muted-foreground mt-1">Housing only</div>
 </div>
 <div className="p-4 bg-secondary/20 rounded-md">
 <div className="text-sm text-muted-foreground mb-1">Total Monthly Debt</div>
 <div className="text-xl font-semibold">${results.totalDebt.toFixed(2)}</div>
 </div>
 </div>
 
 <Separator />
 
 <div className="space-y-3">
 <h4 className="font-semibold flex items-center gap-2">
 <Shield className="w-4 h-4 text-primary" /> 
 Mortgage Eligibility Estimates
 </h4>
 <div className="text-sm text-muted-foreground">
 Based on your non-housing debts, here is the maximum mortgage payment you might qualify for:
 </div>
 <div className="flex justify-between items-center p-3 border rounded-md">
 <span className="text-sm">Conservative (36% Limit)</span>
 <span className="font-semibold text-green-600">${results.maxHousing36}</span>
 </div>
 <div className="flex justify-between items-center p-3 border rounded-md">
 <span className="text-sm">Standard (43% Limit)</span>
 <span className="font-semibold text-yellow-600">${results.maxHousing43}</span>
 </div>
 </div>

 </div> : <div className="h-full flex items-center justify-center min-h-[200px] text-muted-foreground">
 Enter valid income to calculate DTI.
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Income",
    description:"Add your gross monthly income.",
    icon: Wallet,
  },
{
    step:"02",
    title:"Enter Debts",
    description:"List monthly debt payments.",
    icon: CreditCard,
  },
{
    step:"03",
    title:"Calculate",
    description:"Get your DTI percentage.",
    icon: Percent,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Wallet,
    title:"Gross Based",
    description:"Uses gross income as lenders do.",
  },
{
    icon: CreditCard,
    title:"Debt Sum",
    description:"Includes loans, cards, and housing.",
  },
{
    icon: Percent,
    title:"Ratio Output",
    description:"Returns front-end and back-end DTI.",
  },
{
    icon: ShieldCheck,
    title:"Threshold Guide",
    description:"Shows typical lender cutoffs.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Debt-to-income ratio is the number lenders weigh most when approving loans. It compares your monthly debt payments to gross monthly income, expressed as a percentage. A low DTI signals you have room for a new payment; a high one suggests you are stretched. Understanding it before applying saves rejection and surprises.</p>
  <p>Two versions matter. The front-end ratio looks only at housing costs relative to income, while the back-end includes all debt payments — cards, loans, and housing together. Most mortgage decisions hinge on the back-end, though both are reviewed. The calculator returns both so you see your full picture as an underwriter would.</p>
  <p>Improving DTI is straightforward in theory: lower debt or raise income. Paying down a credit card balance reduces the monthly obligation counted, and a raise increases the denominator. Because the ratio uses gross income, a promotion helps immediately even before taxes. Small debt reductions can move you below a key threshold that unlocks better loan terms.</p>
  <p>Use the result to time applications. If your DTI sits above typical lender cutoffs, focus on debt paydown before house or loan shopping. Avoid taking new credit just before applying, since it raises the ratio. The calculator gives a clear target — get under it, and your borrowing power expands. Treat DTI as a dashboard gauge you can actively manage rather than a fixed verdict.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/finance/dti-calculator" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What is a good DTI?",
    answer:"Lenders often prefer below 36 percent, with some programs allowing up to 43 or 50.",
  },
{
    question:"Front-end vs back-end?",
    answer:"Front-end is housing-only; back-end includes all debt payments.",
  },
{
    question:"Does DTI use gross or net?",
    answer:"Gross monthly income, because that is the standard lenders apply.",
  },
{
    question:"Which debts count?",
    answer:"Minimum payments on loans, cards, and housing — not living expenses.",
  },
{
    question:"How do I lower my DTI?",
    answer:"Pay down debt or increase income; both reduce the ratio.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default DtiCalculatorClient;
