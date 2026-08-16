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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { ArrowDown, Calculator, DollarSign, PieChart, PiggyBank, Receipt, Wallet } from"lucide-react";
import { cn } from"@/lib/utils";

const US_TAX_BRACKETS = [
 { rate: 0.10, max: 11600 },
 { rate: 0.12, max: 47150 },
 { rate: 0.22, max: 100525 },
 { rate: 0.24, max: 191950 },
 { rate: 0.32, max: 243725 },
 { rate: 0.35, max: 609350 },
 { rate: 0.37, max: Infinity }
];

export function NetSalaryClient() {
  const [grossSalary, setGrossSalary] = useState<string>("50000");
  const [frequency, setFrequency] = useState<"yearly" | "monthly">("yearly");
  const [taxSystem, setTaxSystem] = useState<"US" | "Custom">("US");
  const [customTaxRate, setCustomTaxRate] = useState<string>("20");
  const results = useMemo(() => {
    const gross = parseFloat(grossSalary) || 0;
    const annualGross = frequency === "monthly" ? gross * 12 : gross;
    let tax = 0;
    if (taxSystem === "US") {
      let remaining = annualGross;
      let prevMax = 0;
      for (const bracket of US_TAX_BRACKETS) {
        if (remaining > 0) {
          const taxableInBracket = Math.min(remaining, bracket.max - prevMax);
          tax += taxableInBracket * bracket.rate;
          remaining -= taxableInBracket;
          prevMax = bracket.max;
        } else {
          break;
        }
      }
    } else {
      const rate = parseFloat(customTaxRate) || 0;
      tax = annualGross * (rate / 100);
    }
    const annualNet = annualGross - tax;
    const effectiveRate = annualGross > 0 ? tax / annualGross * 100 : 0;
    return {
      annualGross,
      monthlyGross: annualGross / 12,
      annualNet,
      monthlyNet: annualNet / 12,
      annualTax: tax,
      monthlyTax: tax / 12,
      effectiveRate
    };
  }, [grossSalary, frequency, taxSystem, customTaxRate]);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Calculator} title="Net Salary Calculator" description="Calculate your take-home pay after tax deductions." actions={<ResetButton onClick={() => {
        setGrossSalary("50000");
        setFrequency("yearly");
        setTaxSystem("US");
        setCustomTaxRate("20");
      }} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Salary Details</CardTitle>
 <CardDescription>Enter your gross income and tax settings</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Gross Salary</Label>
 <Input type="number" value={grossSalary} onChange={e => setGrossSalary(e.target.value)} placeholder="e.g. 50000" />
 </div>
 <div className="space-y-2">
 <Label>Frequency</Label>
 <Select value={frequency} onValueChange={(v: "yearly" | "monthly") => setFrequency(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="yearly">Yearly</SelectItem>
 <SelectItem value="monthly">Monthly</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Tax System</Label>
 <Select value={taxSystem} onValueChange={(v: "US" | "Custom") => setTaxSystem(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="US">US Federal (Simplified 2024)</SelectItem>
 <SelectItem value="Custom">Custom Tax Rate</SelectItem>
 </SelectContent>
 </Select>
 </div>
 {taxSystem === "Custom" && <div className="space-y-2">
 <Label>Custom Tax Rate (%)</Label>
 <Input type="number" value={customTaxRate} onChange={e => setCustomTaxRate(e.target.value)} placeholder="e.g. 20" />
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Net Salary Results</CardTitle>
 <CardDescription>Your estimated take-home pay</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
 <div className="text-sm text-muted-foreground flex items-center justify-center gap-2 mb-1">
 <DollarSign className="w-4 h-4 text-green-500" />
 Monthly Net
 </div>
 <div className="text-2xl font-bold">${results.monthlyNet.toFixed(2)}</div>
 </div>
 <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
 <div className="text-sm text-muted-foreground flex items-center justify-center gap-2 mb-1">
 <DollarSign className="w-4 h-4 text-green-500" />
 Yearly Net
 </div>
 <div className="text-2xl font-bold">${results.annualNet.toFixed(2)}</div>
 </div>
 </div>

 <Separator />

 <div className="space-y-3">
 <div className="flex justify-between items-center">
 <span className="text-muted-foreground">Gross Pay (Yearly)</span>
 <span className="font-medium">${results.annualGross.toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center text-red-500">
 <span>Total Tax (Yearly)</span>
 <span className="font-medium">-${results.annualTax.toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-muted-foreground">Effective Tax Rate</span>
 <span className="font-medium">{results.effectiveRate.toFixed(1)}%</span>
 </div>
 </div>

 <Separator />
 
 <div className="pt-2">
 <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
 <PieChart className="w-4 h-4" />
 Distribution
 </div>
 <div className="h-4 w-full bg-red-500/20 rounded-full overflow-hidden flex">
 <div className="h-full bg-green-500 transition-all duration-500" style={{
                  width: `${100 - results.effectiveRate}%`
                }} title={`Net: ${100 - results.effectiveRate}%`} />
 <div className="h-full bg-red-500 transition-all duration-500" style={{
                  width: `${results.effectiveRate}%`
                }} title={`Tax: ${results.effectiveRate}%`} />
 </div>
 <div className="flex justify-between mt-2 text-xs text-muted-foreground">
 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Take-home</span>
 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Tax</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Gross",
    description:"Input gross annual or monthly pay.",
    icon: Wallet,
  },
{
    step:"02",
    title:"Add Deductions",
    description:"Include tax, insurance, retirement.",
    icon: Receipt,
  },
{
    step:"03",
    title:"Calculate",
    description:"See take-home pay.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Wallet,
    title:"Gross to Net",
    description:"Converts headline pay to real income.",
  },
{
    icon: Receipt,
    title:"Deduction Aware",
    description:"Accounts for tax and benefits.",
  },
{
    icon: Calculator,
    title:"Take-Home",
    description:"Shows actual spendable amount.",
  },
{
    icon: PiggyBank,
    title:"Savings Base",
    description:"Budgets from net, not gross.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A net salary calculator closes the gap between the number on a job offer and the money that actually lands in your account. Gross pay is a headline; take-home pay is what you live on. Converting between them prevents the common mistake of budgeting against income you never receive.</p>
  <p>Deductions explain the gap. Income tax, social contributions, insurance, and retirement contributions all reduce gross to net. The tool subtracts these so you see spendable income clearly. Pre-tax benefits like health or retirement plans lower taxable income, which the calculator can reflect, showing their double benefit of coverage and tax savings.</p>
  <p>Budgeting from net is essential. Plans built on gross inevitably overspend because they assume money that goes straight to taxes. Knowing true take-home lets you set realistic savings and expense targets. For job comparisons, net matters more than gross: a higher gross with heavier deductions may yield less. Use the calculator to compare offers on the only number that affects your life.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why gross differs from net?",
    answer:"Taxes and deductions reduce take-home pay.",
  },
{
    question:"Should I budget on gross?",
    answer:"No, budget on net to avoid overspending.",
  },
{
    question:"Are benefits deducted?",
    answer:"Pre-tax benefits reduce taxable income.",
  },
{
    question:"Does this handle bonuses?",
    answer:"Model separately; bonuses are taxed differently.",
  },
{
    question:"Is it location specific?",
    answer:"Tax rules vary; enter your rates.",
  }
  ]}
/>
</div>
 );
}
