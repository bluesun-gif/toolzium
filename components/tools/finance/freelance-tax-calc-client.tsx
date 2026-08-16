"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calculator, Calendar, DollarSign, Receipt, ShieldCheck } from"lucide-react";
import { toast } from"react-hot-toast";

export function FreelanceTaxCalcClient() {
 const [income, setIncome] = useState(80000);
 const [expenses, setExpenses] = useState(5000);
 const [filingStatus, setFilingStatus] = useState("single");
 const [stateTaxRate, setStateTaxRate] = useState(4.5);

 const results = useMemo(() => {
 const netProfit = Math.max(0, income - expenses);
 
 // SE Tax (15.3% on 92.35% of net profit)
 const taxableSEIncome = netProfit * 0.9235;
 const seTax = taxableSEIncome * 0.153;
 
 // Deduct half of SE tax from gross income for standard income tax calc
 const halfSETax = seTax / 2;
 
 // Standard deduction based on 2024 approximate numbers
 let stdDeduction = 14600; // Single
 if (filingStatus ==="married") stdDeduction = 29200;
 if (filingStatus ==="head") stdDeduction = 21900;
 
 const taxableIncome = Math.max(0, netProfit - halfSETax - stdDeduction);
 
 // Simplistic progressive federal tax bracket estimation
 let fedTax = 0;
 if (taxableIncome > 0) {
 // Very rough approximation for federal income tax rate based on effective rate
 const effectiveRate = taxableIncome < 50000 ? 0.12 : taxableIncome < 100000 ? 0.18 : 0.22;
 fedTax = taxableIncome * effectiveRate;
 }
 
 const stateTax = taxableIncome * (stateTaxRate / 100);
 
 const totalTax = seTax + fedTax + stateTax;
 const netIncome = netProfit - totalTax;
 const quarterly = totalTax / 4;
 
 return {
 netProfit,
 seTax,
 fedTax,
 stateTax,
 totalTax,
 netIncome,
 quarterly,
 effectiveTaxRate: netProfit > 0 ? (totalTax / netProfit) * 100 : 0
 };
 }, [income, expenses, filingStatus, stateTaxRate]);

 const reset = () => {
 setIncome(80000);
 setExpenses(5000);
 setFilingStatus("single");
 setStateTaxRate(4.5);
 toast.success("Reset to defaults");
 };

 const copyResults = () => {
 const text ="Freelance Tax Estimate:\n"+
"Gross Income: $"+ income.toFixed(2) +"\n"+
"Expenses: $"+ expenses.toFixed(2) +"\n"+
"Net Profit: $"+ results.netProfit.toFixed(2) +"\n"+
"Estimated SE Tax: $"+ results.seTax.toFixed(2) +"\n"+
"Estimated Fed Tax: $"+ results.fedTax.toFixed(2) +"\n"+
"Estimated State Tax: $"+ results.stateTax.toFixed(2) +"\n"+
"Total Est. Tax: $"+ results.totalTax.toFixed(2) +"\n"+
"Recommended Quarterly Payment: $"+ results.quarterly.toFixed(2) +"\n";
 return text;
 };
 
 const formatMoney = (val: number) => {
 return"$"+ val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Calculator}
 title="Freelance Tax & Quarterly Estimate Calculator"
 description="Estimate self-employment tax, income tax, and quarterly estimated payments for your freelance business."
 actions={
 <>
 <CopyButton getText={copyResults} label="Copy Summary"/>
 <ResetButton onClick={reset} label="Reset"/>
 </>
 }
 />
 
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
 <div className="lg:col-span-5 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5"/> Income & Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Gross 1099 Income ($)</Label>
 <Input type="number"min="0"value={income ||""} onChange={(e) => setIncome(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Business Expenses / Deductions ($)</Label>
 <Input type="number"min="0"value={expenses ||""} onChange={(e) => setExpenses(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Filing Status</Label>
 <Select value={filingStatus} onValueChange={setFilingStatus}>
 <SelectTrigger><SelectValue placeholder="Status"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="single">Single</SelectItem>
 <SelectItem value="married">Married Filing Jointly</SelectItem>
 <SelectItem value="head">Head of Household</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Est. State Income Tax Rate (%)</Label>
 <Input type="number"min="0"max="20"step="0.1"value={stateTaxRate ||""} onChange={(e) => setStateTaxRate(Number(e.target.value))} />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
 <div className="lg:col-span-7 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Tax Estimates</CardTitle>
 <CardDescription>Rough estimates based on standard deductions and basic brackets.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 
 <div className="p-4 bg-muted/30 rounded-lg border flex flex-col sm:flex-row justify-between items-center gap-4">
 <div className="text-center sm:text-left">
 <p className="text-sm font-medium text-muted-foreground">Net Business Profit</p>
 <p className="text-2xl font-bold text-primary">{formatMoney(results.netProfit)}</p>
 </div>
 <div className="text-center sm:text-right">
 <p className="text-sm font-medium text-muted-foreground">Effective Tax Rate</p>
 <p className="text-2xl font-bold">{results.effectiveTaxRate.toFixed(1)}%</p>
 </div>
 </div>

 <div className="space-y-3">
 <div className="flex justify-between items-center">
 <span className="text-muted-foreground">Self-Employment Tax (15.3%)</span>
 <span className="font-semibold">{formatMoney(results.seTax)}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-muted-foreground">Est. Federal Income Tax</span>
 <span className="font-semibold">{formatMoney(results.fedTax)}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-muted-foreground">Est. State Income Tax</span>
 <span className="font-semibold">{formatMoney(results.stateTax)}</span>
 </div>
 <Separator />
 <div className="flex justify-between items-center pt-2">
 <span className="font-bold text-lg">Total Estimated Tax</span>
 <span className="font-bold text-lg text-destructive">{formatMoney(results.totalTax)}</span>
 </div>
 <div className="flex justify-between items-center pt-2">
 <span className="font-bold text-lg">Estimated Net After Taxes</span>
 <span className="font-bold text-lg text-green-600">{formatMoney(results.netIncome)}</span>
 </div>
 </div>
 
 <div className="bg-primary/10 border border-primary/20 rounded-lg p-5 flex flex-col items-center justify-center text-center">
 <div className="flex items-center gap-2 mb-2 text-primary">
 <Calendar className="h-5 w-5"/>
 <span className="font-semibold">Recommended Quarterly Payment</span>
 </div>
 <span className="text-4xl font-bold text-primary">{formatMoney(results.quarterly)}</span>
 <p className="text-xs text-muted-foreground mt-2">Pay 4 times a year to avoid underpayment penalties.</p>
 </div>

 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Income",
    description:"Add expected self-employment revenue.",
    icon: DollarSign,
  },
{
    step:"02",
    title:"Deduct Expenses",
    description:"Subtract business costs and deductions.",
    icon: Receipt,
  },
{
    step:"03",
    title:"Estimate",
    description:"See quarterly tax payments due.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: DollarSign,
    title:"Revenue Based",
    description:"Starts from gross freelance income.",
  },
{
    icon: Receipt,
    title:"Deduction Aware",
    description:"Subtract eligible business expenses.",
  },
{
    icon: Calculator,
    title:"Quarterly Split",
    description:"Divides annual tax into four payments.",
  },
{
    icon: ShieldCheck,
    title:"Penalty Avoidance",
    description:"Helps avoid underpayment penalties.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Freelancers face a tax reality employees never see: no withholding, plus self-employment tax on top. The quarterly estimate calculator turns projected income and deductions into four concrete payments, preventing the spring surprise of a massive bill and the penalties that follow underpayment.</p>
  <p>The math starts with gross revenue minus legitimate business expenses. Software, a portion of rent for a home office, equipment, and client travel all reduce taxable income when properly documented. The calculator applies appropriate rates to the net, then splits the annual total into quarterly installments that match payment schedules.</p>
  <p>Setting aside money continuously is the habit that makes this painless. Rather than scrambling each quarter, transfer a fraction of every payment received into a tax account. The estimate tells you the target fraction, so the discipline has a number behind it. This separation also clarifies true take-home pay.</p>
  <p>This tool informs but does not replace professional advice. Tax rules vary by location and situation, and deductions have specific criteria; a professional confirms what applies to you. Use the calculator to plan cash flow and avoid penalties, then validate with an expert before filing. The goal is transforming tax from a yearly crisis into a managed, predictable obligation.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why pay quarterly?",
    answer:"Tax authorities expect periodic payments; annual lump sums risk penalties.",
  },
{
    question:"What expenses are deductible?",
    answer:"Costs directly tied to work: software, home office, equipment, travel.",
  },
{
    question:"What is self-employment tax?",
    answer:"The payroll tax freelancers pay for Social Security and Medicare.",
  },
{
    question:"Should I set aside a percentage?",
    answer:"Commonly 25-30 percent of net income, but estimates are precise.",
  },
{
    question:"Is this legal advice?",
    answer:"No; consult a tax professional for your jurisdiction.",
  }
  ]}
/>
</div>
 );
}
