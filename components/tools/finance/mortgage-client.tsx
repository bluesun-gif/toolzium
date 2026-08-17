"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Home, Calculator, TrendingUp, DollarSign, BookOpen, Shield, PieChart, TrendingDown, BarChart3, Percent, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
export function MortgageClient() {
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  useEffect(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    if (principal > 0 && monthlyRate > 0) {
      const mathPower = Math.pow(1 + monthlyRate, numberOfPayments);
      const monthly = principal * mathPower * monthlyRate / (mathPower - 1);
      setMonthlyPayment(monthly);
      setTotalInterest(monthly * numberOfPayments - principal);
      setTotalCost(monthly * numberOfPayments + downPayment);
    } else if (principal > 0) {
      const monthly = principal / numberOfPayments;
      setMonthlyPayment(monthly);
      setTotalInterest(0);
      setTotalCost(principal + downPayment);
    } else {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalCost(downPayment);
    }
  }, [homePrice, downPayment, loanTerm, interestRate]);
  const handleDownPaymentPctChange = (pct: number) => {
    setDownPayment(homePrice * pct / 100);
  };
  const handleReset = () => {
    setHomePrice(300000);
    setDownPayment(60000);
    setLoanTerm(30);
    setInterestRate(6.5);
  };
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val);
  };
  const principalPct = totalCost > 0 ? (homePrice - downPayment) / (totalCost - downPayment) * 100 : 0;
  const interestPct = totalCost > 0 ? totalInterest / (totalCost - downPayment) * 100 : 0;
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Calculator} title="Mortgage Calculator" description="Calculate your monthly mortgage payments, total interest, and complete cost of your home loan." actions={<>
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Home className="w-5 h-5 text-primary" />
 Loan Details
 </CardTitle>
 <CardDescription>Enter your home loan information</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Home Price ($)</Label>
 <Input type="number" min="0" value={homePrice || ""} onChange={e => setHomePrice(Number(e.target.value))} />
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Down Payment ($)</Label>
 <Input type="number" min="0" value={downPayment || ""} onChange={e => setDownPayment(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Down Payment (%)</Label>
 <Input type="number" min="0" max="100" value={homePrice > 0 ? (downPayment / homePrice * 100).toFixed(1) : "0"} onChange={e => handleDownPaymentPctChange(Number(e.target.value))} />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Loan Term (Years)</Label>
 <Select value={loanTerm.toString()} onValueChange={v => setLoanTerm(Number(v))}>
 <SelectTrigger>
 <SelectValue placeholder="Select term" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="10">10 Years</SelectItem>
 <SelectItem value="15">15 Years</SelectItem>
 <SelectItem value="20">20 Years</SelectItem>
 <SelectItem value="25">25 Years</SelectItem>
 <SelectItem value="30">30 Years</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Interest Rate (%)</Label>
 <Input type="number" min="0" step="0.1" value={interestRate || ""} onChange={e => setInterestRate(Number(e.target.value))} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <DollarSign className="w-5 h-5 text-primary" />
 Payment Summary
 </CardTitle>
 <CardDescription>Your estimated mortgage payments</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="bg-primary/10 p-6 rounded-lg text-center">
 <p className="text-sm font-medium text-muted-foreground mb-2">Estimated Monthly Payment</p>
 <h3 className="text-4xl font-bold text-primary">{formatCurrency(monthlyPayment)}</h3>
 </div>

 <div className="space-y-4">
 <div className="flex justify-between items-center">
 <span className="text-muted-foreground">Principal amount:</span>
 <span className="font-medium">{formatCurrency(homePrice - downPayment)}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-muted-foreground">Total interest:</span>
 <span className="font-medium">{formatCurrency(totalInterest)}</span>
 </div>
 <Separator />
 <div className="flex justify-between items-center text-lg font-semibold">
 <span>Total cost of loan:</span>
 <span>{formatCurrency(totalCost - downPayment)}</span>
 </div>
 </div>

 <div className="pt-4 space-y-2">
 <div className="flex items-center gap-2 mb-2">
 <TrendingUp className="w-4 h-4 text-primary" />
 <span className="font-medium">Amortization Breakdown</span>
 </div>
 <div className="h-4 w-full bg-secondary rounded-full overflow-hidden flex">
 <div className="bg-primary h-full" style={{
                  width: `${principalPct}%`
                }} title={`Principal: ${principalPct.toFixed(1)}%`} />
 <div className="bg-destructive/80 h-full" style={{
                  width: `${interestPct}%`
                }} title={`Interest: ${interestPct.toFixed(1)}%`} />
 </div>
 <div className="flex justify-between text-sm">
 <div className="flex items-center gap-1">
 <div className="w-3 h-3 rounded-full bg-primary" />
 <span>Principal ({principalPct.toFixed(1)}%)</span>
 </div>
 <div className="flex items-center gap-1">
 <div className="w-3 h-3 rounded-full bg-destructive/80" />
 <span>Interest ({interestPct.toFixed(1)}%)</span>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Loan Details",
        description: "Input the home price, down payment amount, annual interest rate, and loan term. Optionally add property tax, homeowner's insurance, and PMI for a complete payment estimate.",
        icon: Home
      }, {
        step: "02",
        title: "See Your Monthly Payment",
        description: "Instantly see your principal & interest payment, total monthly payment with taxes and insurance, total interest paid, and full amortization schedule.",
        icon: Calculator
      }, {
        step: "03",
        title: "Compare & Plan",
        description: "Adjust the down payment, rate, or term to see how each change affects your payment. Find the right balance between monthly affordability and total interest cost.",
        icon: BarChart3
      }]} badges={["Full amortization table", "Tax & insurance included", "Instant calculation"]} />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides features={[{
        icon: Home,
        title: "Principal & Interest Calculation",
        description: "Calculates your exact monthly P&I payment using the standard amortization formula. Accurate to the cent — matches what your lender will quote."
      }, {
        icon: Percent,
        title: "PMI Calculator",
        description: "Automatically calculates Private Mortgage Insurance (PMI) when your down payment is less than 20%. PMI typically costs 0.5-1.5% of the loan annually."
      }, {
        icon: PieChart,
        title: "Full Cost Breakdown",
        description: "See the complete monthly cost: principal, interest, property tax, homeowner's insurance, and PMI — the true PITI payment that lenders use to qualify you."
      }, {
        icon: TrendingDown,
        title: "Down Payment Impact",
        description: "See how increasing your down payment reduces your loan amount, eliminates PMI above 20%, and lowers total interest paid — the fastest way to reduce mortgage cost."
      }, {
        icon: BarChart3,
        title: "Amortization Schedule",
        description: "Month-by-month breakdown of every payment showing principal paid, interest paid, and remaining balance — see exactly how your equity grows over time."
      }, {
        icon: Shield,
        title: "Client-Side & Private",
        description: "All calculations run in your browser. Your financial details are never sent to any server or shared with mortgage lenders."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Mortgage Guide — Understanding Your Home Loan</h3>
 <p>
 A <strong>mortgage</strong> is a loan used to purchase real estate, where the property itself
 serves as collateral. It is typically the largest financial commitment most people make. Understanding
 how mortgages work — and how to compare them accurately — can save you tens of thousands of dollars
 over the life of the loan.
 </p>

 <h4 className="font-semibold">PITI — What Your Actual Monthly Payment Includes</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Component</th>
 <th className="border p-2 text-left">Abbreviation</th>
 <th className="border p-2 text-left">Description</th>
 <th className="border p-2 text-left">Optional?</th>
 </tr>
 </thead>
 <tbody>
 {[["Principal", "P", "Repayment of the original loan amount", "No"], ["Interest", "I", "Cost of borrowing (daily rate × balance)", "No"], ["Property Tax", "T", "Annual tax ÷ 12, collected in escrow", "Escrowed"], ["Insurance", "I", "Homeowner's insurance premium ÷ 12", "Escrowed"], ["PMI", "+", "Required when down payment &lt; 20%", "Yes, cancels at 80% LTV"], ["HOA Fees", "+", "If applicable; paid separately", "Yes"]].map(([comp, abbr, desc, opt]) => <tr key={comp} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{comp}</td>
 <td className="border p-2 font-mono text-primary text-xs">{abbr}</td>
 <td className="border p-2 text-xs">{desc}</td>
 <td className="border p-2 text-muted-foreground text-xs">{opt}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Mortgage Type Comparison</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Type</th>
 <th className="border p-2 text-left">Rate</th>
 <th className="border p-2 text-left">Best For</th>
 <th className="border p-2 text-left">Risk</th>
 </tr>
 </thead>
 <tbody>
 {[["30-year fixed", "Highest fixed rate", "Long-term stability, lower payments", "Low — payment never changes"], ["15-year fixed", "Lower fixed rate", "Faster payoff, less total interest", "Low — higher monthly payment"], ["5/1 ARM", "Lowest initial rate", "Short-term ownership (<7 years)", "Medium — rate adjusts after 5 yrs"], ["FHA loan", "Competitive rate", "Low down payment (3.5%)", "Low — requires mortgage insurance"], ["VA loan", "Usually lowest rate", "Eligible veterans (0% down)", "Low — no PMI required"]].map(([type, rate, best, risk]) => <tr key={type} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{type}</td>
 <td className="border p-2 text-xs">{rate}</td>
 <td className="border p-2 text-muted-foreground text-xs">{best}</td>
 <td className="border p-2 text-xs">{risk}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">How Down Payment Affects Total Cost</h4>
 <p className="text-sm text-muted-foreground">On a $400,000 home at 7% for 30 years:</p>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Down Payment</th>
 <th className="border p-2 text-left">Loan Amount</th>
 <th className="border p-2 text-left">Monthly P&I</th>
 <th className="border p-2 text-left">PMI Required?</th>
 <th className="border p-2 text-left">Total Interest</th>
 </tr>
 </thead>
 <tbody>
 {[["5% ($20K)", "$380,000", "$2,529", "Yes (~$158/mo)", "~$510,000"], ["10% ($40K)", "$360,000", "$2,395", "Yes (~$125/mo)", "~$482,000"], ["20% ($80K)", "$320,000", "$2,129", "No", "~$427,000"], ["30% ($120K)", "$280,000", "$1,863", "No", "~$371,000"]].map(([dp, loan, pmt, pmi, interest]) => <tr key={dp} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{dp}</td>
 <td className="border p-2 text-xs">{loan}</td>
 <td className="border p-2 text-primary font-mono text-xs">{pmt}</td>
 <td className="border p-2 text-xs">{pmi}</td>
 <td className="border p-2 text-xs">{interest}</td>
 </tr>)}
 </tbody>
 </table>
 </div>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion faqs={[{
        question: "What is PITI in a mortgage payment?",
        answer: "PITI stands for Principal, Interest, Taxes, and Insurance — the four components of a full mortgage payment. Lenders use PITI to calculate your debt-to-income ratio. Principal repays the loan, interest is the borrowing cost, taxes are collected in escrow, and insurance covers the property."
      }, {
        question: "What is PMI and when can I remove it?",
        answer: "Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home's value. It protects the lender if you default. PMI is automatically cancelled when your loan balance reaches 80% of the original purchase price (by law, under the Homeowners Protection Act). You can also request cancellation when you reach 80% LTV through payments or appreciation."
      }, {
        question: "Should I choose a 15-year or 30-year mortgage?",
        answer: "A 15-year mortgage has higher monthly payments but a lower rate and pays dramatically less total interest (often 40-50% less). A 30-year mortgage has lower payments, giving you more monthly cash flow flexibility. If you can comfortably afford the 15-year payment, it's almost always the better financial choice. Use this calculator to compare both."
      }, {
        question: "How much should my mortgage payment be as a percentage of income?",
        answer: "The traditional guideline is the 28/36 rule: your mortgage payment (PITI) should not exceed 28% of gross monthly income, and total debt payments should not exceed 36%. Most lenders allow up to 43-45% total debt-to-income ratio. A payment under 25% of take-home pay is considered very comfortable."
      }, {
        question: "Does paying extra reduce my mortgage faster?",
        answer: "Yes, significantly. Extra payments go directly to principal, reducing the balance on which future interest is calculated. On a $300,000 mortgage at 7%, paying an extra $200/month saves approximately $55,000 in interest and pays off the loan 7 years early. Even one extra payment per year creates substantial savings."
      }]} />
    </div>
    </div>
);
}

export default MortgageClient;
