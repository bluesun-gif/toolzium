"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calculator, Car, DollarSign, Percent, Receipt } from"lucide-react";

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
 const monthlyRate = (r / 100) / 12;
 monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
 }

 const totalInt = (monthlyPayment * n) - principal;
 const totalInterest = Math.max(0, totalInt);
 const totalCost = p + taxAmount + Math.max(0, totalInt);

 // Amortization Table
 let balance = principal;
 const monthlyRate = (r / 100) / 12;
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
 
 const { monthlyPayment, totalInterest, amountFinanced, totalCost, amortization } = results;

 const handleReset = () => {
 setPrice("30000");
 setDownPayment("5000");
 setTradeIn("0");
 setTaxRate("7");
 setInterestRate("5.5");
 setTerm("60");
 };

 const getResultsText = () => {
 return"Monthly Payment: $"+ monthlyPayment.toFixed(2) +"\n"+
"Amount Financed: $"+ amountFinanced.toFixed(2) +"\n"+
"Total Interest: $"+ totalInterest.toFixed(2) +"\n"+
"Total Vehicle Cost: $"+ totalCost.toFixed(2);
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader 
 icon={DollarSign} 
 title="Auto Loan Monthly Payment Calculator"
 description="Calculate auto loan monthly payments, total interest, sales tax, and trade-in value."
 actions={
 <ResetButton onClick={handleReset} label="Reset"/>
 } 
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Loan Details</CardTitle>
 <CardDescription>Enter the vehicle and loan information.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Vehicle Purchase Price ($)</Label>
 <Input type="number"value={price} onChange={(e) => setPrice(e.target.value)} />
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Down Payment ($)</Label>
 <Input type="number"value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Trade-in Value ($)</Label>
 <Input type="number"value={tradeIn} onChange={(e) => setTradeIn(e.target.value)} />
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Interest Rate (APY %)</Label>
 <Input type="number"step="0.1"value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Sales Tax Rate (%)</Label>
 <Input type="number"step="0.1"value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
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

 <CopyButton getText={getResultsText} label="Copy Summary"/>
 </CardContent>
 </GlassCard>
 </div>
 
 {amortization.length > 0 && (
 <GlassCard>
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
 {amortization.slice(0, 12).map((row) => (
 <tr key={row.month} className="border-b last:border-0">
 <td className="p-3">{row.month}</td>
 <td className="p-3">${row.payment.toFixed(2)}</td>
 <td className="p-3">${row.principal.toFixed(2)}</td>
 <td className="p-3">${row.interest.toFixed(2)}</td>
 <td className="p-3 font-medium">${row.balance.toFixed(2)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 {amortization.length > 12 && (
 <div className="mt-4 text-center text-sm text-muted-foreground">
 Showing the first 12 months of your {term}-month term.
 </div>
 )}
 </CardContent>
 </GlassCard>
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Loan Details",
    description:"Input vehicle price, down payment, and loan term.",
    icon: Car,
  },
{
    step:"02",
    title:"Set Interest Rate",
    description:"Add the APR from your lender offer.",
    icon: Percent,
  },
{
    step:"03",
    title:"Calculate",
    description:"See monthly payment and total interest.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Car,
    title:"Total Cost View",
    description:"Shows full price including interest, not just the sticker.",
  },
{
    icon: Percent,
    title:"APR Aware",
    description:"Models how rate changes move your monthly payment.",
  },
{
    icon: Calculator,
    title:"Term Comparison",
    description:"Compare 36, 48, and 60 month loans side by side.",
  },
{
    icon: Receipt,
    title:"Amortization",
    description:"Breaks down principal versus interest over time.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Buying a car is one of the largest financed purchases most people make, yet the monthly payment is where budgets feel it. An auto loan calculator turns a confusing offer into clear numbers you can compare. By entering the price, down payment, term, and APR, you see exactly what you will owe each month and over the life of the loan.</p>
  <p>The two biggest levers are term length and interest rate. A longer term lowers the monthly payment but increases total interest dramatically — a 60-month loan can cost hundreds more than 36 months for the same car. The APR, meanwhile, compounds that difference; even one point of rate can mean thousands over the loan. The calculator lets you model both before you sign.</p>
  <p>Down payment matters more than many realize. Putting 20 percent down not only shrinks the loan but can unlock better rates and avoid being upside-down, where you owe more than the car is worth. If a large down payment is not possible, the calculator shows how the payment changes so you can choose a term you can actually afford.</p>
  <p>Always compare the full cost, not just the monthly figure. A dealer may emphasize a low payment achieved through a long term; the amortization view reveals the true price. Use the numbers to negotiate from strength, and consider getting pre-approved at a bank or credit union so you know your real rate. A few minutes of calculation can save years of overpayment.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is APR vs interest rate?",
    answer:"The interest rate is the cost of borrowing; APR includes that plus fees, giving a fuller cost picture.",
  },
{
    question:"Does a longer term lower my payment?",
    answer:"Yes, spreading payments over more months reduces each one, but you pay more total interest.",
  },
{
    question:"How much should I put down?",
    answer:"A larger down payment lowers the loan amount and often secures a better rate.",
  },
{
    question:"Should I buy new or used?",
    answer:"Used cars cost less and depreciate slower initially, but rates can be higher than new-car promotions.",
  },
{
    question:"Can I pay the loan off early?",
    answer:"Often yes, but check for prepayment penalties in your contract before doing so.",
  }
  ]}
/>
</div>
 );
}
