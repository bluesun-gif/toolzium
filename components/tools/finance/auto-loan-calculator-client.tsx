"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type AmortizationRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};
export function AutoLoanCalculatorClient() {
  const [price, setPrice] = useState("30000");
  const [downPayment, setDownPayment] = useState("5000");
  const [tradeIn, setTradeIn] = useState("0");
  const [taxRate, setTaxRate] = useState("7");
  const [interestRate, setInterestRate] = useState("5.5");
  const [term, setTerm] = useState("60");
  const results = useMemo(() => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(downPayment) || 0;
    const t = parseFloat(tradeIn) || 0;
    const tax = parseFloat(taxRate) || 0;
    const r = parseFloat(interestRate) || 0;
    const n = parseInt(term) || 1;

    // Typically tax is calculated on (price - tradeIn) in many states
    const taxableAmount = Math.max(0, p - t);
    const taxAmount = taxableAmount * (tax / 100);
    const principal = p - d - t + taxAmount;
    const amountFinanced = Math.max(0, principal);
    if (principal <= 0) {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        amountFinanced: 0,
        totalCost: p + taxAmount,
        amortization: []
      };
    }
    let monthlyPayment = 0;
    if (r === 0) {
      monthlyPayment = principal / n;
    } else {
      const monthlyRate = r / 100 / 12;
      monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -n));
    }
    const totalInt = monthlyPayment * n - principal;
    const totalInterest = Math.max(0, totalInt);
    const totalCost = p + taxAmount + Math.max(0, totalInt);

    // Amortization Table
    let balance = principal;
    const monthlyRate = r / 100 / 12;
    const schedule: AmortizationRow[] = [];
    for (let month = 1; month <= n; month++) {
      let interestPayment = balance * monthlyRate;
      if (r === 0) interestPayment = 0;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      if (balance < 0.01) balance = 0;
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance
      });
    }
    return {
      monthlyPayment,
      totalInterest,
      amountFinanced,
      totalCost,
      amortization: schedule
    };
  }, [price, downPayment, tradeIn, taxRate, interestRate, term]);
  const {
    monthlyPayment,
    totalInterest,
    amountFinanced,
    totalCost,
    amortization
  } = results;
  const handleReset = () => {
    setPrice("30000");
    setDownPayment("5000");
    setTradeIn("0");
    setTaxRate("7");
    setInterestRate("5.5");
    setTerm("60");
  };
  const getResultsText = () => {
    return "Monthly Payment: $" + monthlyPayment.toFixed(2) + "\n" + "Amount Financed: $" + amountFinanced.toFixed(2) + "\n" + "Total Interest: $" + totalInterest.toFixed(2) + "\n" + "Total Vehicle Cost: $" + totalCost.toFixed(2);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={DollarSign} title="Auto Loan Monthly Payment Calculator" description="Calculate auto loan monthly payments, total interest, sales tax, and trade-in value." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Loan Details</CardTitle>
 <CardDescription>Enter the vehicle and loan information.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Vehicle Purchase Price ($)</Label>
 <Input type="number" value={price} onChange={e => setPrice(e.target.value)} />
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Down Payment ($)</Label>
 <Input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Trade-in Value ($)</Label>
 <Input type="number" value={tradeIn} onChange={e => setTradeIn(e.target.value)} />
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Interest Rate (APY %)</Label>
 <Input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Sales Tax Rate (%)</Label>
 <Input type="number" step="0.1" value={taxRate} onChange={e => setTaxRate(e.target.value)} />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Loan Term (Months)</Label>
 <Select value={term} onValueChange={setTerm}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="24">24 months</SelectItem>
 <SelectItem value="36">36 months</SelectItem>
 <SelectItem value="48">48 months</SelectItem>
 <SelectItem value="60">60 months</SelectItem>
 <SelectItem value="72">72 months</SelectItem>
 <SelectItem value="84">84 months</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Payment Breakdown</CardTitle>
 <CardDescription>Your estimated loan costs.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="p-6 bg-primary/10 rounded-lg flex flex-col items-center justify-center border border-primary/20">
 <div className="text-sm text-muted-foreground mb-1">Estimated Monthly Payment</div>
 <div className="text-4xl font-bold text-primary">${monthlyPayment.toFixed(2)}</div>
 </div>

 <div className="space-y-3">
 <div className="flex justify-between items-center py-2 border-b">
 <span className="text-muted-foreground">Amount Financed</span>
 <span className="font-medium">${amountFinanced.toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center py-2 border-b">
 <span className="text-muted-foreground">Total Interest Paid</span>
 <span className="font-medium">${totalInterest.toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center py-2">
 <span className="text-muted-foreground">Total Vehicle Cost</span>
 <span className="font-bold">${totalCost.toFixed(2)}</span>
 </div>
 </div>

 <CopyButton getText={getResultsText} label="Copy Summary" />
 </CardContent>
 </GlassCard>
 </div>
 
 {amortization.length > 0 && <GlassCard>
 <CardHeader>
 <CardTitle>Amortization Schedule (First 12 Months)</CardTitle>
 <CardDescription>Breakdown of your monthly payments.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="bg-muted text-muted-foreground">
 <tr>
 <th className="p-3 rounded-tl-md">Month</th>
 <th className="p-3">Payment</th>
 <th className="p-3">Principal</th>
 <th className="p-3">Interest</th>
 <th className="p-3 rounded-tr-md">Balance</th>
 </tr>
 </thead>
 <tbody>
 {amortization.slice(0, 12).map(row => <tr key={row.month} className="border-b last:border-0">
 <td className="p-3">{row.month}</td>
 <td className="p-3">${row.payment.toFixed(2)}</td>
 <td className="p-3">${row.principal.toFixed(2)}</td>
 <td className="p-3">${row.interest.toFixed(2)}</td>
 <td className="p-3 font-medium">${row.balance.toFixed(2)}</td>
 </tr>)}
 </tbody>
 </table>
 </div>
 {amortization.length > 12 && <div className="mt-4 text-center text-sm text-muted-foreground">
 Showing the first 12 months of your {term}-month term.
 </div>}
 </CardContent>
 </GlassCard>}
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Auto Loan Monthly Payment Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Auto Loan Monthly Payment Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
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

      <RelatedTools currentToolUrl="/tools/finance/auto-loan-calculator" max={6} />

    </div></div>;
}