"use client";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { BarChart2, Calculator, DollarSign, ShieldCheck, SlidersHorizontal, Copy } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";

// Simplified 2024 brackets for demonstration purposes
const BRACKETS = {
  single: [{
    rate: 0.10,
    upTo: 11600
  }, {
    rate: 0.12,
    upTo: 47150
  }, {
    rate: 0.22,
    upTo: 100525
  }, {
    rate: 0.24,
    upTo: 191950
  }, {
    rate: 0.32,
    upTo: 243725
  }, {
    rate: 0.35,
    upTo: 609350
  }, {
    rate: 0.37,
    upTo: Infinity
  }],
  mfj: [{
    rate: 0.10,
    upTo: 23200
  }, {
    rate: 0.12,
    upTo: 94300
  }, {
    rate: 0.22,
    upTo: 201050
  }, {
    rate: 0.24,
    upTo: 383900
  }, {
    rate: 0.32,
    upTo: 487450
  }, {
    rate: 0.35,
    upTo: 731200
  }, {
    rate: 0.37,
    upTo: Infinity
  }],
  hoh: [{
    rate: 0.10,
    upTo: 16550
  }, {
    rate: 0.12,
    upTo: 63100
  }, {
    rate: 0.22,
    upTo: 100500
  }, {
    rate: 0.24,
    upTo: 191950
  }, {
    rate: 0.32,
    upTo: 243700
  }, {
    rate: 0.35,
    upTo: 609350
  }, {
    rate: 0.37,
    upTo: Infinity
  }]
};
const STANDARD_DEDUCTION = {
  single: 14600,
  mfj: 29200,
  mfs: 14600,
  hoh: 21900
};
type FilingStatus = "single" | "mfj" | "mfs" | "hoh";
type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly" | "annually";
const FREQ_DIVISORS: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  annually: 1
};
export function TaxWithholdingClient() {
  const [income, setIncome] = useState("75000");
  const [status, setStatus] = useState<FilingStatus>("single");
  const [freq, setFreq] = useState<PayFrequency>("biweekly");
  const [extra, setExtra] = useState("0");
  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    const extraWithholding = parseFloat(extra) || 0;

    // Determine bracket set
    const bracketSet = status === "mfs" ? BRACKETS.single : BRACKETS[status];
    const deduction = STANDARD_DEDUCTION[status];
    const taxableIncome = Math.max(0, grossIncome - deduction);
    let totalTax = 0;
    let prevUpTo = 0;
    let marginalRate = 0;
    for (const b of bracketSet) {
      if (taxableIncome > prevUpTo) {
        const taxableAtThisRate = Math.min(taxableIncome - prevUpTo, b.upTo - prevUpTo);
        totalTax += taxableAtThisRate * b.rate;
        marginalRate = b.rate;
        if (taxableIncome <= b.upTo) break;
        prevUpTo = b.upTo;
      } else {
        break;
      }
    }
    const divisor = FREQ_DIVISORS[freq];
    const totalTaxWithExtra = totalTax + extraWithholding * divisor;
    return {
      grossIncome,
      taxableIncome,
      annualTax: totalTax,
      totalAnnualWithExtra: totalTaxWithExtra,
      marginalRate: marginalRate * 100,
      effectiveRate: grossIncome > 0 ? totalTaxWithExtra / grossIncome * 100 : 0,
      grossPerPeriod: grossIncome / divisor,
      taxPerPeriod: totalTaxWithExtra / divisor,
      netPerPeriod: (grossIncome - totalTaxWithExtra) / divisor
    };
  };
  const results = calculateTax();
  const handleReset = () => {
    setIncome("75000");
    setStatus("single");
    setFreq("biweekly");
    setExtra("0");
  };
  const getCopyText = () => {
    return `Tax Estimate for $${income} / yr (${status}):\n- Gross Per Period: $${results.grossPerPeriod.toFixed(2)}\n- Tax Withheld: $${results.taxPerPeriod.toFixed(2)}\n- Net Pay: $${results.netPerPeriod.toFixed(2)}\n- Effective Tax Rate: ${results.effectiveRate.toFixed(1)}%`;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Calculator} title="Tax Withholding Estimator" description="Estimate US federal tax withholding and view effective tax rates (2024)." actions={<>
 <CopyButton getText={getCopyText} label="Copy Results" />
 <ResetButton onClick={handleReset} />
 </>} />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <DollarSign className="w-5 h-5" />
 Input Details
 </CardTitle>
 <CardDescription>Enter your income and filing details.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Annual Gross Income ($)</Label>
 <Input type="number" value={income} onChange={e => setIncome(e.target.value)} min="0" step="1000" />
 </div>
 
 <div className="space-y-2">
 <Label>Filing Status</Label>
 <Select value={status} onValueChange={(val: FilingStatus) => setStatus(val)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="single">Single</SelectItem>
 <SelectItem value="mfj">Married Filing Jointly</SelectItem>
 <SelectItem value="mfs">Married Filing Separately</SelectItem>
 <SelectItem value="hoh">Head of Household</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Pay Frequency</Label>
 <Select value={freq} onValueChange={(val: PayFrequency) => setFreq(val)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="weekly">Weekly</SelectItem>
 <SelectItem value="biweekly">Bi-weekly</SelectItem>
 <SelectItem value="semimonthly">Semi-monthly</SelectItem>
 <SelectItem value="monthly">Monthly</SelectItem>
 <SelectItem value="annually">Annually</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Extra Withholding per Period ($)</Label>
 <Input type="number" value={extra} onChange={e => setExtra(e.target.value)} min="0" />
 <p className="text-xs text-muted-foreground">Additional amount to withhold per paycheck.</p>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <BarChart2 className="w-5 h-5" />
 Estimation Results
 </CardTitle>
 <CardDescription>Federal tax estimates based on standard deduction.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 
 <div className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-muted/30 border rounded-lg">
 <div className="text-sm text-muted-foreground mb-1">Gross Pay / Period</div>
 <div className="text-xl font-bold text-foreground">
 ${results.grossPerPeriod.toFixed(2)}
 </div>
 </div>
 <div className="p-4 bg-muted/30 border rounded-lg">
 <div className="text-sm text-muted-foreground mb-1">Tax Withheld</div>
 <div className="text-xl font-bold text-destructive">
 -${results.taxPerPeriod.toFixed(2)}
 </div>
 </div>
 </div>
 
 <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
 <div className="text-sm text-primary mb-1 font-medium">Estimated Net Pay / Period</div>
 <div className="text-3xl font-bold text-primary">
 ${results.netPerPeriod.toFixed(2)}
 </div>
 </div>
 </div>

 <Separator />
 
 <div className="space-y-3">
 <h4 className="font-medium text-sm">Tax Analysis (Annual)</h4>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Gross Income:</span>
 <span className="font-medium">${results.grossIncome.toLocaleString()}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Standard Deduction:</span>
 <span className="font-medium">${STANDARD_DEDUCTION[status].toLocaleString()}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Taxable Income:</span>
 <span className="font-medium">${results.taxableIncome.toLocaleString()}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Total Annual Tax:</span>
 <span className="font-medium">${results.totalAnnualWithExtra.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</span>
 </div>
 
 <div className="pt-2">
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Marginal Tax Bracket:</span>
 <span className="font-medium">{results.marginalRate.toFixed(1)}%</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Effective Tax Rate:</span>
 <span className="font-medium">{results.effectiveRate.toFixed(2)}%</span>
 </div>
 </div>
 </div>

 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Pay",
    description:"Input income and filing details.",
    icon: DollarSign,
  },
{
    step:"02",
    title:"Estimate",
    description:"See expected annual tax.",
    icon: Calculator,
  },
{
    step:"03",
    title:"Adjust",
    description:"Set withholding to match.",
    icon: SlidersHorizontal,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: DollarSign,
    title:"Income Based",
    description:"Estimates from your pay.",
  },
{
    icon: Calculator,
    title:"Annual Tax",
    description:"Projects total liability.",
  },
{
    icon: SlidersHorizontal,
    title:"Withholding Tune",
    description:"Aligns paycheck with liability.",
  },
{
    icon: ShieldCheck,
    title:"Avoid Surprises",
    description:"Prevents big refunds or bills.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A tax withholding estimator prevents the two unpleasant outcomes of poor paycheck withholding: a shocking tax bill or a large interest-free loan to the government via a big refund. Withholding is the amount taken from each paycheck toward year-end tax; this tool estimates your actual liability so you can align the two.</p>
  <p>The refund myth distorts behavior. A large refund feels like a windfall but means you overpaid all year, handing the government an interest-free loan while your cash could have grown or paid debt. The estimator shows your true liability so you can reduce withholding and keep more per paycheck, improving monthly cash flow.</p>
  <p>Under-withholding is the mirror risk. Too little taken can lead to a bill and penalties at filing. The tool helps you land in the sweet spot: enough withheld to avoid penalties, not so much you starve your own cash flow. Adjusting allowances or estimated payments after the estimate achieves this balance.</p>
  <p>Recheck after income changes, marriage, or new dependents, since these shift liability. This is estimation, not advice; a professional confirms your specific situation. The calculator's value is control: replacing tax-season surprises with a calibrated withholding that matches your real obligation year-round.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/finance/tax-withholding" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"Why adjust withholding?",
    answer:"To avoid a large bill or interest-free loan to government.",
  },
{
    question:"Big refund good?",
    answer:"It means you overpaid; that cash could have earned interest.",
  },
{
    question:"Under-withholding risk?",
    answer:"Can trigger penalties if too low.",
  },
{
    question:"How often to check?",
    answer:"After income or life changes.",
  },
{
    question:"Is this advice?",
    answer:"No, confirm with a tax professional.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default TaxWithholdingClient;
