"use client";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { DollarSign, Calculator, Calendar, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

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
          <h3>Why Use Our Freelance Tax & Quarterly Estimate Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Freelance Tax & Quarterly Estimate Calculator provides
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

      <RelatedTools currentToolUrl="/tools/finance/freelance-tax-calc" max={6} />

</div>
 );
}
