"use client";
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
import { AlertCircle, Calculator, Calendar, CreditCard, ListChecks, Shuffle, TrendingDown } from"lucide-react";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";

export function DebtPayoffClient() {
 const [balance, setBalance] = useState<string>("10000");
 const [interestRate, setInterestRate] = useState<string>("18.9");
 const [monthlyPayment, setMonthlyPayment] = useState<string>("300");
 
 type Scenario = {
 months: number;
 totalInterest: number;
 totalPaid: number;
 payoffDate: string;
 };

 const [results, setResults] = useState<{
 baseScenario: Scenario;
 extra50: Scenario;
 extra100: Scenario;
 extra200: Scenario;
 amortization: { month: number; date: string; balance: number; interest: number; principal: number }[];
 error: string | null;
 } | null>(null);

 const calculateScenario = (principal: number, rate: number, payment: number) => {
 let currentBalance = principal;
 const monthlyRate = rate / 100 / 12;
 let months = 0;
 let totalInterest = 0;
 
 if (principal * monthlyRate >= payment) {
 return null;
 }
 
 while (currentBalance > 0 && months < 1200) {
 months++;
 const interestPayment = currentBalance * monthlyRate;
 totalInterest += interestPayment;
 
 let principalPayment = payment - interestPayment;
 if (principalPayment > currentBalance) {
 principalPayment = currentBalance;
 }
 
 currentBalance -= principalPayment;
 }

 const today = new Date();
 const payoffDate = new Date(today.getFullYear(), today.getMonth() + months, 1);
 
 return {
 months,
 totalInterest,
 totalPaid: principal + totalInterest,
 payoffDate: payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
 };
 };

 const generateAmortization = (principal: number, rate: number, payment: number) => {
 const amortization = [];
 let currentBalance = principal;
 const monthlyRate = rate / 100 / 12;
 let months = 0;
 const today = new Date();
 
 if (principal * monthlyRate >= payment) return [];
 
 while (currentBalance > 0.01 && months < 360) { 
 months++;
 const interestPayment = currentBalance * monthlyRate;
 
 let principalPayment = payment - interestPayment;
 if (principalPayment > currentBalance) {
 principalPayment = currentBalance;
 }
 
 currentBalance -= principalPayment;
 const date = new Date(today.getFullYear(), today.getMonth() + months, 1);
 
 if (months % 12 === 0 || currentBalance <= 0.01) {
 amortization.push({
 month: months,
 date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
 balance: currentBalance > 0 ? currentBalance : 0,
 interest: interestPayment,
 principal: principalPayment
 });
 }
 }
 return amortization;
 };

 const calculate = () => {
 const p = parseFloat(balance) || 0;
 const r = parseFloat(interestRate) || 0;
 const pmt = parseFloat(monthlyPayment) || 0;

 if (p <= 0 || r < 0 || pmt <= 0) {
 setResults(null);
 return;
 }

 const monthlyInterest = p * (r / 100 / 12);
 if (pmt <= monthlyInterest) {
 setResults({
 baseScenario: { months: 0, totalInterest: 0, totalPaid: 0, payoffDate:""},
 extra50: { months: 0, totalInterest: 0, totalPaid: 0, payoffDate:""},
 extra100: { months: 0, totalInterest: 0, totalPaid: 0, payoffDate:""},
 extra200: { months: 0, totalInterest: 0, totalPaid: 0, payoffDate:""},
 amortization: [],
 error: `Your payment must be greater than the monthly interest charge of ${formatCurrency(monthlyInterest)}.`
 });
 return;
 }

 const base = calculateScenario(p, r, pmt);
 const e50 = calculateScenario(p, r, pmt + 50);
 const e100 = calculateScenario(p, r, pmt + 100);
 const e200 = calculateScenario(p, r, pmt + 200);
 const amort = generateAmortization(p, r, pmt);

 if (base && e50 && e100 && e200) {
 setResults({
 baseScenario: base,
 extra50: e50,
 extra100: e100,
 extra200: e200,
 amortization: amort,
 error: null
 });
 }
 };

 useEffect(() => {
 calculate();
 }, [balance, interestRate, monthlyPayment]);

 const handleReset = () => {
 setBalance("10000");
 setInterestRate("18.9");
 setMonthlyPayment("300");
 };

 const formatCurrency = (val: number) => {
 return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={CreditCard}
 title="Debt Payoff Calculator"
 description="Calculate how long it takes to pay off your debt and how extra payments can save you money."
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="h-5 w-5 text-primary"/>
 Debt Details
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Total Debt Balance ($)</Label>
 <Input
 type="number"
 value={balance}
 onChange={(e) => setBalance(e.target.value)}
 min="0"
 step="100"
 />
 </div>
 <div className="space-y-2">
 <Label>Interest Rate (APR %)</Label>
 <Input
 type="number"
 value={interestRate}
 onChange={(e) => setInterestRate(e.target.value)}
 step="0.1"
 />
 </div>
 <div className="space-y-2">
 <Label>Monthly Payment ($)</Label>
 <Input
 type="number"
 value={monthlyPayment}
 onChange={(e) => setMonthlyPayment(e.target.value)}
 min="0"
 step="10"
 />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calendar className="h-5 w-5 text-primary"/>
 Payoff Summary
 </CardTitle>
 </CardHeader>
 <CardContent>
 {results?.error ? (
 <Alert variant="destructive">
 <AlertCircle className="h-4 w-4"/>
 <AlertTitle>Warning</AlertTitle>
 <AlertDescription>{results.error}</AlertDescription>
 </Alert>
 ) : results ? (
 <div className="space-y-6">
 <div className="text-center p-4 bg-primary/10 rounded-lg">
 <div className="text-sm text-muted-foreground mb-1">Debt Free By</div>
 <div className="text-3xl font-bold text-primary">{results.baseScenario.payoffDate}</div>
 <div className="text-sm mt-1">({results.baseScenario.months} months)</div>
 </div>
 
 <div className="space-y-3">
 <div className="flex justify-between">
 <span className="text-muted-foreground">Total Principal:</span>
 <span className="font-medium">{formatCurrency(parseFloat(balance) || 0)}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Total Interest Paid:</span>
 <span className="font-medium text-destructive">{formatCurrency(results.baseScenario.totalInterest)}</span>
 </div>
 <Separator />
 <div className="flex justify-between">
 <span className="text-muted-foreground font-semibold">Total Amount Paid:</span>
 <span className="font-bold">{formatCurrency(results.baseScenario.totalPaid)}</span>
 </div>
 </div>
 </div>
 ) : (
 <div className="text-center text-muted-foreground py-8">
 Enter your debt details to see results
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>

 {results && !results.error && (
 <>
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <TrendingDown className="h-5 w-5 text-primary"/>
 Impact of Extra Payments
 </CardTitle>
 <CardDescription>See how paying extra each month affects your timeline and total cost.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="p-4 border rounded-lg space-y-2">
 <div className="font-semibold text-lg text-primary">+$50 / mo</div>
 <div className="text-sm flex justify-between">
 <span>Payoff:</span>
 <span className="font-medium">{results.extra50.payoffDate}</span>
 </div>
 <div className="text-sm flex justify-between">
 <span>Interest Saved:</span>
 <span className="font-medium text-green-500">
 {formatCurrency(results.baseScenario.totalInterest - results.extra50.totalInterest)}
 </span>
 </div>
 <div className="text-sm flex justify-between">
 <span>Time Saved:</span>
 <span className="font-medium">{results.baseScenario.months - results.extra50.months} mo</span>
 </div>
 </div>
 <div className="p-4 border rounded-lg space-y-2">
 <div className="font-semibold text-lg text-primary">+$100 / mo</div>
 <div className="text-sm flex justify-between">
 <span>Payoff:</span>
 <span className="font-medium">{results.extra100.payoffDate}</span>
 </div>
 <div className="text-sm flex justify-between">
 <span>Interest Saved:</span>
 <span className="font-medium text-green-500">
 {formatCurrency(results.baseScenario.totalInterest - results.extra100.totalInterest)}
 </span>
 </div>
 <div className="text-sm flex justify-between">
 <span>Time Saved:</span>
 <span className="font-medium">{results.baseScenario.months - results.extra100.months} mo</span>
 </div>
 </div>
 <div className="p-4 border rounded-lg space-y-2">
 <div className="font-semibold text-lg text-primary">+$200 / mo</div>
 <div className="text-sm flex justify-between">
 <span>Payoff:</span>
 <span className="font-medium">{results.extra200.payoffDate}</span>
 </div>
 <div className="text-sm flex justify-between">
 <span>Interest Saved:</span>
 <span className="font-medium text-green-500">
 {formatCurrency(results.baseScenario.totalInterest - results.extra200.totalInterest)}
 </span>
 </div>
 <div className="text-sm flex justify-between">
 <span>Time Saved:</span>
 <span className="font-medium">{results.baseScenario.months - results.extra200.months} mo</span>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Yearly Amortization Schedule</CardTitle>
 <CardDescription>A summary of your balance over time (showing yearly snapshots).</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-xs uppercase bg-muted/50 rounded-t-lg">
 <tr>
 <th className="px-4 py-3">Month</th>
 <th className="px-4 py-3">Date</th>
 <th className="px-4 py-3">Remaining Balance</th>
 </tr>
 </thead>
 <tbody>
 {results.amortization.map((row) => (
 <tr key={row.month} className="border-b last:border-0 hover:bg-muted/20">
 <td className="px-4 py-3 font-medium">{row.month}</td>
 <td className="px-4 py-3">{row.date}</td>
 <td className="px-4 py-3">{formatCurrency(row.balance)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </GlassCard>
 </>
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"List Debts",
    description:"Enter balances, rates, and minimums.",
    icon: ListChecks,
  },
{
    step:"02",
    title:"Choose Strategy",
    description:"Pick avalanche or snowball method.",
    icon: Shuffle,
  },
{
    step:"03",
    title:"Project",
    description:"See total interest and freedom date.",
    icon: Calendar,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListChecks,
    title:"Multi-Debt",
    description:"Handles several loans and cards together.",
  },
{
    icon: Shuffle,
    title:"Method Choice",
    description:"Compares avalanche versus snowball.",
  },
{
    icon: Calendar,
    title:"Payoff Date",
    description:"Shows when you become debt-free.",
  },
{
    icon: TrendingDown,
    title:"Interest Saved",
    description:"Quantifies savings from extra payments.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Debt feels overwhelming because minimum payments stretch it into forever. A debt payoff calculator turns that fog into a plan by modeling every balance, rate, and payment together. The single most useful output is the debt-free date — a concrete goal that makes sacrifice feel purposeful.</p>
  <p>Two strategies frame the approach. The avalanche method pays the highest-interest debt first, minimizing total interest and mathematically optimal. The snowball method pays the smallest balance first, sacrificing some interest for quick psychological wins that keep you motivated. Research shows behavior matters as much as math, so choose the one you will actually stick with.</p>
  <p>Extra payments are the accelerator. Every dollar above the minimum attacks principal directly, and because interest is calculated on the remaining balance, early extra payments save disproportionately. The calculator shows the months and dollars saved, helping you find a sustainable extra amount rather than an unrealistic one that you abandon.</p>
  <p>If minimums are genuinely unaffordable, proactive communication with lenders about hardship options protects credit and opens breathing room. Consolidation can help when it lowers rates, but watch for fees and longer terms that increase total cost. Use the plan to automate payments, roll cleared balances into the next debt, and track the date approaching. A clear finish line is what turns debt from a weight into a project with an end.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Avalanche vs snowball?",
    answer:"Avalanche targets highest rate first saving interest; snowball clears smallest balances first for momentum.",
  },
{
    question:"Should I consolidate debt?",
    answer:"Consolidation can lower rate or simplify payments, but watch for fees and extended terms.",
  },
{
    question:"How much extra should I pay?",
    answer:"Pay as much above minimums as possible; even small extras cut years of interest.",
  },
{
    question:"What if I cannot meet minimums?",
    answer:"Contact lenders about hardship plans before missing payments to protect your credit.",
  },
{
    question:"Is all debt bad?",
    answer:"Some debt, like low-rate mortgages, can be reasonable; high-interest consumer debt usually is not.",
  }
  ]}
/>
</div>
 );
}
