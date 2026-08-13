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
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, Calculator, FileText, TrendingDown, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function PaycheckCalculatorClient() {
  const [grossPay, setGrossPay] = useState<string>("50000");
  const [payPeriod, setPayPeriod] = useState<string>("annual");
  const [stateTaxRate, setStateTaxRate] = useState<string>("5");
  const [preTax401k, setPreTax401k] = useState<string>("0");
  const [healthInsurance, setHealthInsurance] = useState<string>("0");
  const periodsPerYear = useMemo(() => {
    switch (payPeriod) {
      case "annual":
        return 1;
      case "monthly":
        return 12;
      case "biweekly":
        return 26;
      case "weekly":
        return 52;
      default:
        return 1;
    }
  }, [payPeriod]);
  const results = useMemo(() => {
    const gross = parseFloat(grossPay) || 0;
    const grossAnnual = gross * (payPeriod === "annual" ? 1 : periodsPerYear);
    const periodGross = grossAnnual / periodsPerYear;
    const preTaxDed = (parseFloat(preTax401k) || 0) + (parseFloat(healthInsurance) || 0);
    const taxablePeriod = Math.max(0, periodGross - preTaxDed);

    // Simplified federal tax (flat 12% for demo)
    const fedTax = taxablePeriod * 0.12;
    const stateTax = taxablePeriod * ((parseFloat(stateTaxRate) || 0) / 100);
    const socialSecurity = taxablePeriod * 0.062;
    const medicare = taxablePeriod * 0.0145;
    const totalTaxes = fedTax + stateTax + socialSecurity + medicare;
    const netPay = taxablePeriod - totalTaxes;
    return {
      periodGross,
      preTaxDed,
      taxablePeriod,
      fedTax,
      stateTax,
      socialSecurity,
      medicare,
      totalTaxes,
      netPay
    };
  }, [grossPay, payPeriod, stateTaxRate, preTax401k, healthInsurance, periodsPerYear]);
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(val);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={DollarSign} title="Paycheck Calculator" description="Calculate take-home pay from gross salary with taxes and deductions." actions={<ResetButton onClick={() => {
        setGrossPay("50000");
        setPayPeriod("annual");
        setStateTaxRate("5");
        setPreTax401k("0");
        setHealthInsurance("0");
      }} label="Reset" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Income & Deductions</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Gross Pay</Label>
 <Input type="number" value={grossPay} onChange={e => setGrossPay(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Pay Period</Label>
 <Select value={payPeriod} onValueChange={setPayPeriod}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="annual">Annual</SelectItem>
 <SelectItem value="monthly">Monthly</SelectItem>
 <SelectItem value="biweekly">Bi-weekly</SelectItem>
 <SelectItem value="weekly">Weekly</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <Separator />
 <h4 className="text-sm font-medium">Pre-Tax Deductions (per period)</h4>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>401(k) / Retirement ($)</Label>
 <Input type="number" value={preTax401k} onChange={e => setPreTax401k(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Health Insurance ($)</Label>
 <Input type="number" value={healthInsurance} onChange={e => setHealthInsurance(e.target.value)} />
 </div>
 </div>

 <Separator />
 <div className="space-y-2">
 <Label>State Tax Rate (%)</Label>
 <Input type="number" value={stateTaxRate} onChange={e => setStateTaxRate(e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Paycheck Breakdown</CardTitle>
 <CardDescription>Per {payPeriod} period</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex justify-between font-medium">
 <span>Gross Pay</span>
 <span>{formatCurrency(results.periodGross)}</span>
 </div>
 <div className="flex justify-between text-muted-foreground text-sm">
 <span>Pre-Tax Deductions</span>
 <span>-{formatCurrency(results.preTaxDed)}</span>
 </div>
 <Separator />
 <div className="flex justify-between text-muted-foreground text-sm">
 <span>Federal Tax (Est.)</span>
 <span>-{formatCurrency(results.fedTax)}</span>
 </div>
 <div className="flex justify-between text-muted-foreground text-sm">
 <span>State Tax</span>
 <span>-{formatCurrency(results.stateTax)}</span>
 </div>
 <div className="flex justify-between text-muted-foreground text-sm">
 <span>Social Security (6.2%)</span>
 <span>-{formatCurrency(results.socialSecurity)}</span>
 </div>
 <div className="flex justify-between text-muted-foreground text-sm">
 <span>Medicare (1.45%)</span>
 <span>-{formatCurrency(results.medicare)}</span>
 </div>
 <Separator />
 <div className="flex justify-between font-bold text-lg text-primary">
 <span>Net Pay</span>
 <span>{formatCurrency(results.netPay)}</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
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
          <h3>Why Use Our Paycheck Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Paycheck Calculator provides
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

      <RelatedTools currentToolUrl="/tools/finance/paycheck" max={6} />

    </div></div>;
}