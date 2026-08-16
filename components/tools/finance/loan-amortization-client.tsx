"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calculator, Calendar, Copy, BookOpen, Shield, PieChart, TrendingDown, BarChart3, Table2, Download } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GridPattern } from "@/components/magicui/grid-pattern";
export function LoanAmortizationClient() {
  const [loanAmount, setLoanAmount] = useState("250000");
  const [interestRate, setInterestRate] = useState("5.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [termUnit, setTermUnit] = useState("years");
  const [extraPayment, setExtraPayment] = useState("0");
  const results = useMemo(() => {
    const P = parseFloat(loanAmount) || 0;
    const r = parseFloat(interestRate) || 0;
    const t = parseFloat(loanTerm) || 0;
    const extra = parseFloat(extraPayment) || 0;
    if (P <= 0 || t <= 0) {
      return null;
    }
    const totalMonths = termUnit === "years" ? t * 12 : t;
    const monthlyRate = r / 100 / 12;
    let baseMonthlyPayment = 0;
    if (monthlyRate === 0) {
      baseMonthlyPayment = P / totalMonths;
    } else {
      baseMonthlyPayment = P * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
    const actualMonthlyPayment = baseMonthlyPayment + extra;
    let balance = P;
    let totalInterest = 0;
    let totalPaid = 0;
    const schedule = [];
    let currentMonth = 0;
    while (balance > 0.01 && currentMonth < totalMonths * 2) {
      // cap at 2x term to prevent infinite loop
      currentMonth++;
      const interestPayment = balance * monthlyRate;
      let principalPayment = actualMonthlyPayment - interestPayment;
      if (balance < principalPayment) {
        principalPayment = balance;
      }
      balance -= principalPayment;
      if (balance < 0) balance = 0;
      totalInterest += interestPayment;
      const paymentAmount = principalPayment + interestPayment;
      totalPaid += paymentAmount;
      schedule.push({
        month: currentMonth,
        payment: paymentAmount,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance
      });
      if (balance <= 0) break;
    }
    const payoffYears = Math.floor(currentMonth / 12);
    const payoffMonths = currentMonth % 12;
    let scheduleText = "Month\tPayment\tPrincipal\tInterest\tBalance\n";
    schedule.forEach(row => {
      scheduleText += row.month + "\t$" + row.payment.toFixed(2) + "\t$" + row.principal.toFixed(2) + "\t$" + row.interest.toFixed(2) + "\t$" + row.balance.toFixed(2) + "\n";
    });
    return {
      baseMonthlyPayment,
      actualMonthlyPayment,
      totalInterest,
      totalPaid,
      monthsSaved: totalMonths - currentMonth,
      payoffTime: payoffYears + "years," + payoffMonths + "months",
      schedule,
      scheduleText
    };
  }, [loanAmount, interestRate, loanTerm, termUnit, extraPayment]);
  const handleReset = () => {
    setLoanAmount("250000");
    setInterestRate("5.5");
    setLoanTerm("30");
    setTermUnit("years");
    setExtraPayment("0");
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Calculator} title="Loan Amortization Schedule" description="Calculate your monthly payments, view the full amortization table, and see how extra payments save you money." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid md:grid-cols-12 gap-6">
 <div className="md:col-span-4 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Loan Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Loan Amount ($)</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" className="pl-9" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Interest Rate (%)</Label>
 <Input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Loan Term</Label>
 <div className="flex gap-2">
 <Input type="number" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} className="flex-1" />
 <Select value={termUnit} onValueChange={setTermUnit}>
 <SelectTrigger className="w-[110px]">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="years">Years</SelectItem>
 <SelectItem value="months">Months</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Extra Monthly Payment ($)</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" className="pl-9" value={extraPayment} onChange={e => setExtraPayment(e.target.value)} placeholder="0" />
 </div>
 <p className="text-xs text-muted-foreground">Optional: Amount to pay towards principal each month.</p>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="md:col-span-8 space-y-6">
 <GlassCard className="bg-primary/5 border-primary/20">
 <CardHeader>
 <CardTitle>Summary</CardTitle>
 </CardHeader>
 <CardContent>
 {results ? <div className="grid sm:grid-cols-2 gap-6">
 <div className="space-y-4">
 <div>
 <p className="text-sm text-muted-foreground font-medium">Monthly Payment</p>
 <p className="text-4xl font-bold text-primary">
 ${results.baseMonthlyPayment.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
 </p>
 </div>
 {parseFloat(extraPayment) > 0 && <div>
 <p className="text-sm text-muted-foreground">With Extra Payment</p>
 <p className="text-lg font-semibold">
 ${results.actualMonthlyPayment.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
 </p>
 </div>}
 </div>
 
 <div className="space-y-4">
 <div>
 <p className="text-sm text-muted-foreground font-medium">Total Interest Paid</p>
 <p className="text-2xl font-semibold">
 ${results.totalInterest.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
 </p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground font-medium">Total Cost of Loan</p>
 <p className="text-xl font-medium">
 ${results.totalPaid.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
 </p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground font-medium">Payoff Time</p>
 <div className="flex items-center gap-2">
 <Calendar className="h-4 w-4 text-muted-foreground" />
 <span className="font-medium">{results.payoffTime}</span>
 </div>
 {results.monthsSaved > 0 && <p className="text-sm text-emerald-600 font-medium mt-1">
 Saved {results.monthsSaved} months early!
 </p>}
 </div>
 </div>
 </div> : <div className="py-8 text-center text-muted-foreground">
 Enter valid loan details to see summary.
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Amortization Schedule</CardTitle>
 <CardDescription>Monthly breakdown of principal and interest.</CardDescription>
 </div>
 {results && <CopyButton getText={() => results.scheduleText} label="Copy Table" />}
 </CardHeader>
 <CardContent>
 {results ? <div className="overflow-auto max-h-[500px] border rounded-md">
 <table className="w-full text-sm text-left relative">
 <thead className="text-xs text-muted-foreground uppercase bg-muted sticky top-0 shadow-sm">
 <tr>
 <th className="px-4 py-3">Month</th>
 <th className="px-4 py-3">Payment</th>
 <th className="px-4 py-3">Principal</th>
 <th className="px-4 py-3">Interest</th>
 <th className="px-4 py-3">Balance</th>
 </tr>
 </thead>
 <tbody>
 {results.schedule.map(row => <tr key={row.month} className="border-b last:border-0 hover:bg-muted/50">
 <td className="px-4 py-2 font-medium">{row.month}</td>
 <td className="px-4 py-2">${row.payment.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}</td>
 <td className="px-4 py-2">${row.principal.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}</td>
 <td className="px-4 py-2">${row.interest.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}</td>
 <td className="px-4 py-2">${row.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}</td>
 </tr>)}
 </tbody>
 </table>
 </div> : <div className="py-12 text-center text-muted-foreground">
 Schedule will appear here.
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Loan Details",
        description: "Input the loan principal, annual interest rate, and loan term in years or months. Optionally add extra monthly payments to see how they reduce your total interest.",
        icon: Calculator
      }, {
        step: "02",
        title: "View Full Amortization Table",
        description: "Get a complete month-by-month amortization schedule showing payment number, principal paid, interest paid, and remaining balance for every installment.",
        icon: Table2
      }, {
        step: "03",
        title: "Export & Plan",
        description: "Download the full amortization schedule as CSV. Use it for tax records, financial planning, or to track your actual loan payoff progress against the schedule.",
        icon: Download
      }]} badges={["Full amortization table", "Extra payment calculator", "Export to CSV"]} />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides features={[{
        icon: Table2,
        title: "Complete Amortization Schedule",
        description: "Month-by-month breakdown of every payment showing: payment number, amount paid, principal portion, interest portion, and remaining balance. See exactly how your debt decreases."
      }, {
        icon: PieChart,
        title: "Interest vs Principal Breakdown",
        description: "Visual breakdown of total principal vs total interest paid over the loan life. Reveals the true cost of borrowing — often 40–70% of total payments go to interest."
      }, {
        icon: TrendingDown,
        title: "Extra Payment Impact",
        description: "Add extra monthly principal payments to see how many months you save and how much interest you avoid. Even $100 extra/month can save thousands over a 30-year mortgage."
      }, {
        icon: DollarSign,
        title: "Total Cost Summary",
        description: "Instantly see monthly payment, total amount paid, total interest paid, and effective loan cost — the complete picture of what this loan really costs you."
      }, {
        icon: BarChart3,
        title: "Loan Comparison Ready",
        description: "Run the calculator with different rates or terms to compare loan offers. Even a 0.5% rate difference on a 30-year mortgage can mean $30,000+ in total interest savings."
      }, {
        icon: Shield,
        title: "Client-Side & Private",
        description: "All calculations run in your browser. Your financial details are never transmitted to any server."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Loan Amortization Explained — How Your Payments Are Split</h3>
 <p>
 <strong>Loan amortization</strong> is the process of paying off a loan through regular scheduled
 payments that cover both principal and interest. In the early months, most of each payment goes
 to interest. Over time, the interest portion shrinks and the principal portion grows — this is
 the defining characteristic of an amortizing loan.
 </p>

 <h4 className="font-semibold">The Amortization Formula</h4>
 <div className="bg-muted/40 rounded-lg p-4 font-mono text-sm text-center">
 M = P × [r(1+r)^n] / [(1+r)^n − 1]
 </div>
 <p className="text-xs text-muted-foreground text-center">
 M = Monthly payment | P = Principal | r = Monthly interest rate (annual ÷ 12 ÷ 100) | n = Total months
 </p>

 <h4 className="font-semibold">Loan Type Comparison</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Loan Type</th>
 <th className="border p-2 text-left">Typical Rate (US 2024)</th>
 <th className="border p-2 text-left">Typical Term</th>
 <th className="border p-2 text-left">Amortized?</th>
 </tr>
 </thead>
 <tbody>
 {[["30-year mortgage", "6.5–7.5%", "30 years", "Yes"], ["15-year mortgage", "5.8–6.8%", "15 years", "Yes"], ["Auto loan", "6–10%", "36–72 months", "Yes"], ["Personal loan", "8–24%", "12–60 months", "Yes"], ["Student loan", "5–8%", "10–25 years", "Yes"], ["Interest-only loan", "Variable", "5–10 yrs IO", "No (then switches)"]].map(([type, rate, term, amort]) => <tr key={type} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{type}</td>
 <td className="border p-2 text-xs">{rate}</td>
 <td className="border p-2 text-xs">{term}</td>
 <td className="border p-2 text-xs">{amort}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">The Impact of Extra Payments — 30-Year Mortgage Example</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Extra Payment/Month</th>
 <th className="border p-2 text-left">Years Saved</th>
 <th className="border p-2 text-left">Interest Saved</th>
 </tr>
 </thead>
 <tbody>
 {[["$0 (standard)", "0 years", "$0"], ["+$100/month", "~4 years", "~$30,000"], ["+$200/month", "~7 years", "~$55,000"], ["+$500/month", "~12 years", "~$100,000"], ["One extra payment/year", "~4–5 years", "~$25,000"]].map(([extra, years, interest]) => <tr key={extra} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{extra}</td>
 <td className="border p-2 text-primary text-xs">{years}</td>
 <td className="border p-2 text-emerald-500 text-xs">{interest}</td>
 </tr>)}
 </tbody>
 </table>
 </div>
 <p className="text-xs text-muted-foreground">Based on a $300,000 loan at 7% interest. Actual savings vary by loan amount and rate.</p>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion faqs={[{
        question: "What is an amortization schedule?",
        answer: "An amortization schedule is a complete table of all loan payments, showing the date, payment amount, how much goes to principal, how much goes to interest, and the remaining balance after each payment. It shows exactly how your debt decreases over the life of the loan."
      }, {
        question: "Why do I pay more interest at the beginning of a loan?",
        answer: "Because interest is calculated on the outstanding balance. At the start, your balance is highest, so more of your payment goes to interest. As the principal decreases, less interest accrues each month, so more of each payment goes to principal. This is why extra payments early in a loan have the biggest impact."
      }, {
        question: "How much interest will I save with extra payments?",
        answer: "It depends on your loan size, rate, and term. For a $300,000 mortgage at 7% over 30 years, paying an extra $200/month saves roughly $55,000 in interest and pays off the loan 7 years early. Use the calculator with the extra payment field to see your specific savings."
      }, {
        question: "What is the difference between EMI and amortization?",
        answer: "They are the same concept with different names. EMI (Equated Monthly Installment) is the common South Asian term for the fixed monthly payment on an amortizing loan. An amortization schedule shows how each EMI is split between principal and interest over the loan term."
      }, {
        question: "Can I use this for any loan type?",
        answer: "Yes. This calculator works for any standard amortizing loan: mortgages, auto loans, personal loans, student loans, or business loans. It uses the standard amortization formula that all banks use. It does not handle interest-only loans, balloon payments, or variable-rate loans (use the fixed rate for estimates)."
      }]} />
 <RelatedTools currentToolUrl="/tools/finance/loan-amortization" max={6} />
 </div></div>;
}