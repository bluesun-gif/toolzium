"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calculator, Clock, DollarSign, Target, TrendingUp } from"lucide-react";
import { Separator } from"@/components/ui/separator";

export function FreelanceRateClient() {
 const [targetIncome, setTargetIncome] = useState(60000);
 const [expenses, setExpenses] = useState(5000);
 const [hoursPerWeek, setHoursPerWeek] = useState(30);
 const [vacationWeeks, setVacationWeeks] = useState(4);
 const [taxRate, setTaxRate] = useState(25);
 const [profitMargin, setProfitMargin] = useState(10);

 const calculateRates = () => {
 const workWeeks = 52 - vacationWeeks;
 const totalBillableHours = workWeeks * hoursPerWeek;
 
 if (totalBillableHours <= 0) return { minHourly: 0, recHourly: 0, daily: 0, weekly: 0, totalGross: 0, totalBillableHours: 0 };
 
 // Total net target before taxes
 const taxMultiplier = 1 / (1 - (taxRate / 100));
 const grossIncomeNeeded = targetIncome * taxMultiplier;
 
 // Add expenses
 const totalRevenueNeeded = grossIncomeNeeded + expenses;
 
 // Add profit margin
 const finalRevenueNeeded = totalRevenueNeeded * (1 + (profitMargin / 100));
 
 const minHourly = totalRevenueNeeded / totalBillableHours;
 const recHourly = finalRevenueNeeded / totalBillableHours;
 const daily = recHourly * (hoursPerWeek / 5);
 const weekly = recHourly * hoursPerWeek;
 
 return {
 minHourly: minHourly || 0,
 recHourly: recHourly || 0,
 daily: daily || 0,
 weekly: weekly || 0,
 totalGross: finalRevenueNeeded || 0,
 totalBillableHours
 };
 };

 const results = calculateRates();
 
 const formatCurrency = (val: number) =>"$"+ val.toFixed(2);
 
 const getSummary = () => {
 return"Freelance Rate Calculation:\n"+
"Target Net Income:"+ formatCurrency(targetIncome) +"\n"+
"Recommended Hourly Rate:"+ formatCurrency(results.recHourly) +"\n"+
"Minimum Hourly Rate:"+ formatCurrency(results.minHourly) +"\n"+
"Daily Rate:"+ formatCurrency(results.daily) +"\n"+
"Weekly Rate:"+ formatCurrency(results.weekly) +"\n"+
"Billable Hours/Year:"+ results.totalBillableHours;
 };

 const reset = () => {
 setTargetIncome(60000);
 setExpenses(5000);
 setHoursPerWeek(30);
 setVacationWeeks(4);
 setTaxRate(25);
 setProfitMargin(10);
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader 
 icon={Calculator} 
 title="Freelance Rate Calculator"
 description="Calculate required hourly and project rate for freelancers."
 actions={
 <React.Fragment>
 <CopyButton getText={getSummary} label="Copy Results"/>
 <ResetButton onClick={reset} label="Reset Fields"/>
 </React.Fragment>
 } 
 />
 
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <GlassCard className="lg:col-span-1">
 <CardHeader>
 <CardTitle>Inputs</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Target Annual Net Income ($)</Label>
 <Input type="number"value={targetIncome} onChange={e => setTargetIncome(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Annual Expenses/Overhead ($)</Label>
 <Input type="number"value={expenses} onChange={e => setExpenses(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Billable Hours per Week</Label>
 <Input type="number"value={hoursPerWeek} onChange={e => setHoursPerWeek(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Vacation Weeks per Year</Label>
 <Input type="number"value={vacationWeeks} onChange={e => setVacationWeeks(Number(e.target.value))} max={52} />
 </div>
 <div className="space-y-2">
 <Label>Estimated Tax Rate (%)</Label>
 <Input type="number"value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} max={100} />
 </div>
 <div className="space-y-2">
 <Label>Target Profit Margin (%)</Label>
 <Input type="number"value={profitMargin} onChange={e => setProfitMargin(Number(e.target.value))} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="lg:col-span-2">
 <CardHeader>
 <CardTitle>Your Rates</CardTitle>
 <CardDescription>{"Based on"+ results.totalBillableHours +"billable hours per year."}</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="p-6 bg-primary/10 rounded-xl mb-6 text-center">
 <p className="text-sm text-muted-foreground mb-2">Recommended Hourly Rate</p>
 <p className="text-5xl font-bold text-primary">{formatCurrency(results.recHourly)}</p>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
 <div className="p-4 border rounded-lg text-center">
 <p className="text-xs text-muted-foreground mb-1">Minimum Hourly</p>
 <p className="text-xl font-semibold">{formatCurrency(results.minHourly)}</p>
 </div>
 <div className="p-4 border rounded-lg text-center">
 <p className="text-xs text-muted-foreground mb-1">Daily Rate</p>
 <p className="text-xl font-semibold">{formatCurrency(results.daily)}</p>
 </div>
 <div className="p-4 border rounded-lg text-center">
 <p className="text-xs text-muted-foreground mb-1">Weekly Rate</p>
 <p className="text-xl font-semibold">{formatCurrency(results.weekly)}</p>
 </div>
 </div>
 
 <Separator className="my-6"/>
 
 <div className="space-y-3">
 <h3 className="font-semibold text-lg">Financial Breakdown</h3>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Target Net Income</span>
 <span className="font-medium">{formatCurrency(targetIncome)}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">{"Estimated Taxes ("+ taxRate +"%)"}</span>
 <span className="font-medium">{formatCurrency((targetIncome / (1 - (taxRate / 100))) - targetIncome)}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Expenses</span>
 <span className="font-medium">{formatCurrency(expenses)}</span>
 </div>
 <div className="flex justify-between text-sm border-t pt-2 mt-2">
 <span className="font-semibold">Gross Revenue Needed</span>
 <span className="font-bold">{formatCurrency(results.totalGross)}</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Set Income Target",
    description:"Enter the yearly take-home you want.",
    icon: Target,
  },
{
    step:"02",
    title:"Estimate Billable",
    description:"Input realistic weekly billable hours.",
    icon: Clock,
  },
{
    step:"03",
    title:"Compute Rate",
    description:"See the hourly rate to charge.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Target,
    title:"Goal Based",
    description:"Derives rate from desired income.",
  },
{
    icon: Clock,
    title:"Realistic Hours",
    description:"Uses billable, not calendar, hours.",
  },
{
    icon: Calculator,
    title:"Clear Output",
    description:"A rate you can quote confidently.",
  },
{
    icon: TrendingUp,
    title:"What-If Mode",
    description:"Test different hour assumptions.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Pricing freelance work starts with a simple question: what do I need to earn? This calculator reverses the usual guess by taking your income target and the hours you can actually bill, then deriving the rate required to hit it. The simplicity makes it easy to revisit often, which pricing should be.</p>
  <p>The billable-hour input is honest accounting. Freelancers rarely bill a full 40-hour week once admin, outreach, and downtime are removed. Using realistic billable hours — perhaps 20 to 30 — produces a rate that reflects truth, not hope. Under counting here is the most common pricing error.</p>
  <p>Seasonality deserves a buffer. Demand dips, clients delay, and invoices lag, so a rate built on best-case hours leaves you short in lean months. Adding a cushion or saving from busy periods smooths the ride. The what-if mode lets you see how fewer hours push the rate up, informing both pricing and how much work to pursue.</p>
  <p>Use the number as a baseline, not a ceiling. As you gain testimonials and skill, raise rates confidently; good clients pay for reliability. Recompute whenever your income goal or available hours change. The calculator's role is removing the anxiety from pricing by grounding it in your actual financial needs.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How is this different from the rate calc?",
    answer:"It is a streamlined version focused on income goal and billable hours.",
  },
{
    question:"What if I work part time?",
    answer:"Enter your actual billable hours; the rate scales accordingly.",
  },
{
    question:"Should rate include vacation?",
    answer:"Yes, fewer working weeks mean higher per-hour needs.",
  },
{
    question:"How do I handle slow months?",
    answer:"Build a buffer into the rate to smooth uneven demand.",
  },
{
    question:"When to raise rates?",
    answer:"As demand and skill grow, typically annually.",
  }
  ]}
/>
</div>
 );
}
