"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Calculator, DollarSign, PieChart, ArrowDown, Sparkles, Shield, Zap, Copy } from"lucide-react";;
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
 const [frequency, setFrequency] = useState<"yearly"|"monthly">("yearly");
 const [taxSystem, setTaxSystem] = useState<"US"|"Custom">("US");
 const [customTaxRate, setCustomTaxRate] = useState<string>("20");

 const results = useMemo(() => {
 const gross = parseFloat(grossSalary) || 0;
 const annualGross = frequency ==="monthly"? gross * 12 : gross;

 let tax = 0;
 if (taxSystem ==="US") {
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
 const effectiveRate = annualGross > 0 ? (tax / annualGross) * 100 : 0;

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

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Calculator}
 title="Net Salary Calculator"
 description="Calculate your take-home pay after tax deductions."
 actions={
 <ResetButton onClick={() => {
 setGrossSalary("50000");
 setFrequency("yearly");
 setTaxSystem("US");
 setCustomTaxRate("20");
 }} label="Reset"/>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Salary Details</CardTitle>
 <CardDescription>Enter your gross income and tax settings</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Gross Salary</Label>
 <Input
 type="number"
 value={grossSalary}
 onChange={(e) => setGrossSalary(e.target.value)}
 placeholder="e.g. 50000"
 />
 </div>
 <div className="space-y-2">
 <Label>Frequency</Label>
 <Select value={frequency} onValueChange={(v:"yearly"|"monthly") => setFrequency(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="yearly">Yearly</SelectItem>
 <SelectItem value="monthly">Monthly</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Tax System</Label>
 <Select value={taxSystem} onValueChange={(v:"US"|"Custom") => setTaxSystem(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="US">US Federal (Simplified 2024)</SelectItem>
 <SelectItem value="Custom">Custom Tax Rate</SelectItem>
 </SelectContent>
 </Select>
 </div>
 {taxSystem ==="Custom"&& (
 <div className="space-y-2">
 <Label>Custom Tax Rate (%)</Label>
 <Input
 type="number"
 value={customTaxRate}
 onChange={(e) => setCustomTaxRate(e.target.value)}
 placeholder="e.g. 20"
 />
 </div>
 )}
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
 <DollarSign className="w-4 h-4 text-green-500"/>
 Monthly Net
 </div>
 <div className="text-2xl font-bold">${results.monthlyNet.toFixed(2)}</div>
 </div>
 <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
 <div className="text-sm text-muted-foreground flex items-center justify-center gap-2 mb-1">
 <DollarSign className="w-4 h-4 text-green-500"/>
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
 <PieChart className="w-4 h-4"/>
 Distribution
 </div>
 <div className="h-4 w-full bg-red-500/20 rounded-full overflow-hidden flex">
 <div 
 className="h-full bg-green-500 transition-all duration-500"
 style={{ width: `${100 - results.effectiveRate}%` }} 
 title={`Net: ${100 - results.effectiveRate}%`}
 />
 <div 
 className="h-full bg-red-500 transition-all duration-500"
 style={{ width: `${results.effectiveRate}%` }} 
 title={`Tax: ${results.effectiveRate}%`}
 />
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
          <h3>Why Use Our Net Salary Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Net Salary Calculator provides
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

      <RelatedTools currentToolUrl="/tools/finance/net-salary" max={6} />

</div>
 );
}
