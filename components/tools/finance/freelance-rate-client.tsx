"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calculator, DollarSign, Clock, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { Separator } from"@/components/ui/separator";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
      <div className="relative space-y-6">
      <GridPattern />

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
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Freelance Rate Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Freelance Rate Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/finance/freelance-rate" max={6} />

</div>
 );
}
