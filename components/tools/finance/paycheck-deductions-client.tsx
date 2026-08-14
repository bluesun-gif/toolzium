"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calculator, FileText, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";
export function PaycheckDeductionsClient() {
  const [grossPay, setGrossPay] = useState("2000");
  const [frequency, setFrequency] = useState<PayFrequency>("biweekly");
  const [fedTaxPct, setFedTaxPct] = useState("12");
  const [stateTaxPct, setStateTaxPct] = useState("5");
  const [preTaxDeductions, setPreTaxDeductions] = useState("100");
  const [postTaxDeductions, setPostTaxDeductions] = useState("50");
  const handleReset = () => {
    setGrossPay("2000");
    setFrequency("biweekly");
    setFedTaxPct("12");
    setStateTaxPct("5");
    setPreTaxDeductions("100");
    setPostTaxDeductions("50");
    toast.success("Reset to defaults");
  };
  const gross = parseFloat(grossPay) || 0;
  const fedPct = parseFloat(fedTaxPct) || 0;
  const statePct = parseFloat(stateTaxPct) || 0;
  const preTax = parseFloat(preTaxDeductions) || 0;
  const postTax = parseFloat(postTaxDeductions) || 0;
  const taxableIncome = Math.max(0, gross - preTax);
  const fedTax = taxableIncome * (fedPct / 100);
  const stateTax = taxableIncome * (statePct / 100);

  // FICA = SS (6.2%) + Medicare (1.45%) = 7.65%
  const ficaTax = taxableIncome * 0.0765;
  const totalTaxes = fedTax + stateTax + ficaTax;
  const totalDeductions = preTax + totalTaxes + postTax;
  const netPay = gross - totalDeductions;
  const periodsPerYear = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12
  };
  const annualGross = gross * periodsPerYear[frequency];
  const annualNet = netPay * periodsPerYear[frequency];
  const getReport = () => {
    return "Paycheck Report\nGross Pay: $" + gross.toFixed(2) + "\nPre-Tax Deductions: -$" + preTax.toFixed(2) + "\nTaxable Income: $" + taxableIncome.toFixed(2) + "\nFederal Tax: -$" + fedTax.toFixed(2) + "\nState Tax: -$" + stateTax.toFixed(2) + "\nFICA Tax: -$" + ficaTax.toFixed(2) + "\nPost-Tax Deductions: -$" + postTax.toFixed(2) + "\nNet Take-Home: $" + netPay.toFixed(2);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Paycheck Deductions & Take-Home Calculator" description="Calculate your net paycheck take-home pay after itemized taxes and voluntary deductions." icon={Calculator} actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Income & Taxes</CardTitle>
 <CardDescription>Enter your gross pay and tax estimates.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Gross Pay (per period)</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" className="pl-10" value={grossPay} onChange={e => setGrossPay(e.target.value)} min="0" />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Pay Frequency</Label>
 <Select value={frequency} onValueChange={val => setFrequency(val as PayFrequency)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="weekly">Weekly</SelectItem>
 <SelectItem value="biweekly">Bi-Weekly</SelectItem>
 <SelectItem value="semimonthly">Semi-Monthly</SelectItem>
 <SelectItem value="monthly">Monthly</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Federal Tax (%)</Label>
 <Input type="number" value={fedTaxPct} onChange={e => setFedTaxPct(e.target.value)} min="0" max="100" />
 </div>
 <div className="space-y-2">
 <Label>State Tax (%)</Label>
 <Input type="number" value={stateTaxPct} onChange={e => setStateTaxPct(e.target.value)} min="0" max="100" />
 </div>
 </div>

 <Separator />
 
 <div className="space-y-2">
 <Label>Pre-Tax Deductions (401k, Health Ins.)</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" className="pl-10" value={preTaxDeductions} onChange={e => setPreTaxDeductions(e.target.value)} min="0" />
 </div>
 </div>

 <div className="space-y-2">
 <Label>Post-Tax Deductions (Roth, Garnishments)</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" className="pl-10" value={postTaxDeductions} onChange={e => setPostTaxDeductions(e.target.value)} min="0" />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Paycheck Summary</CardTitle>
 <CardDescription>Your estimated take-home pay.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="p-4 bg-primary/10 rounded-lg text-center border border-primary/20">
 <h3 className="text-sm font-medium text-muted-foreground mb-1">Net Take-Home Pay</h3>
 <p className="text-4xl font-bold text-primary">${netPay.toFixed(2)}</p>
 <p className="text-xs text-muted-foreground mt-1">per pay period</p>
 </div>

 <div className="space-y-3">
 <h4 className="font-semibold flex items-center gap-2">
 <FileText className="h-4 w-4" />
 Itemized Breakdown
 </h4>
 
 <div className="space-y-1 text-sm">
 <div className="flex justify-between py-1">
 <span>Gross Pay</span>
 <span className="font-medium">${gross.toFixed(2)}</span>
 </div>
 <div className="flex justify-between py-1 text-red-500">
 <span>Pre-Tax Deductions</span>
 <span>-${preTax.toFixed(2)}</span>
 </div>
 <Separator />
 <div className="flex justify-between py-1 text-muted-foreground">
 <span>Taxable Income</span>
 <span>${taxableIncome.toFixed(2)}</span>
 </div>
 <div className="flex justify-between py-1 text-red-500">
 <span>Federal Tax ({fedPct}%)</span>
 <span>-${fedTax.toFixed(2)}</span>
 </div>
 <div className="flex justify-between py-1 text-red-500">
 <span>State Tax ({statePct}%)</span>
 <span>-${stateTax.toFixed(2)}</span>
 </div>
 <div className="flex justify-between py-1 text-red-500">
 <span>FICA (7.65%)</span>
 <span>-${ficaTax.toFixed(2)}</span>
 </div>
 <div className="flex justify-between py-1 text-red-500">
 <span>Post-Tax Deductions</span>
 <span>-${postTax.toFixed(2)}</span>
 </div>
 <Separator />
 <div className="flex justify-between py-2 font-bold">
 <span>Net Pay</span>
 <span>${netPay.toFixed(2)}</span>
 </div>
 </div>
 </div>

 <Separator />
 <div className="grid grid-cols-2 gap-4 text-center text-sm">
 <div>
 <span className="block text-muted-foreground">Annual Gross</span>
 <span className="font-medium">${annualGross.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</span>
 </div>
 <div>
 <span className="block text-muted-foreground">Annual Net</span>
 <span className="font-medium">${annualNet.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</span>
 </div>
 </div>

 <div className="pt-4 flex justify-end">
 <CopyButton getText={getReport} label="Copy Summary" />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter gross and each deduction in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your take-home after every line item, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Line-item deductions",
        description: "Line-item deductions"
      }, {
        icon: Shield,
        title: "Private & On-Device",
        description: "Every calculation runs in your browser. Your financial inputs never leave your device or touch a server."
      }, {
        icon: Zap,
        title: "No Signup, Ever",
        description: "Open the tool and get an answer in seconds — no account, no paywall, no usage cap."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use the Paycheck Deductions & Take-Home Calculator?</h3>
          <p>
            Understand every deduction on the stub and what actually lands in your account.
          </p>
          <p>
            Like all Toolzium calculators, it is free, private, and built to give you a paid-product experience without the subscription.
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

      <RelatedTools currentToolUrl="/tools/finance/paycheck-deductions" max={6} />

    </div></div>;
}