"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { ResetButton } from"@/components/shared/action-buttons";
import { Scale, Calculator, DollarSign, BarChart3, Plus, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type LoanInput = {
 id: string;
 name: string;
 principal: string;
 rate: string;
 years: string;
};

const defaultLoans: LoanInput[] = [
 { id:"1", name:"Loan Offer A", principal:"20000", rate:"5.5", years:"5"},
 { id:"2", name:"Loan Offer B", principal:"20000", rate:"6.0", years:"4"}
];

export function LoanComparisonClient() {
 const [loans, setLoans] = useState<LoanInput[]>(defaultLoans);

 const results = useMemo(() => {
 const computed = loans.map(loan => {
 const p = parseFloat(loan.principal) || 0;
 const r = parseFloat(loan.rate) || 0;
 const y = parseFloat(loan.years) || 0;
 
 let monthlyPayment = 0;
 let totalPayment = 0;
 let totalInterest = 0;

 if (p > 0 && y > 0) {
 if (r > 0) {
 const monthlyRate = r / 100 / 12;
 const numPayments = y * 12;
 monthlyPayment = (p * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
 } else {
 monthlyPayment = p / (y * 12);
 }
 totalPayment = monthlyPayment * y * 12;
 totalInterest = totalPayment - p;
 }

 return {
 ...loan,
 monthlyPayment,
 totalPayment,
 totalInterest,
 isValid: p > 0 && y > 0
 };
 });

 const validLoans = computed.filter(c => c.isValid);
 let minCostId ="";
 let maxCostId ="";
 if (validLoans.length > 0) {
 minCostId = validLoans.reduce((prev, curr) => prev.totalPayment < curr.totalPayment ? prev : curr).id;
 maxCostId = validLoans.reduce((prev, curr) => prev.totalPayment > curr.totalPayment ? prev : curr).id;
 }

 const minCostLoan = computed.find(l => l.id === minCostId);
 const maxCostLoan = computed.find(l => l.id === maxCostId);
 const maxSavings = (maxCostLoan?.totalPayment || 0) - (minCostLoan?.totalPayment || 0);

 return {
 computed,
 minCostId,
 maxCostId,
 maxSavings
 };
 }, [loans]);

 const addLoan = () => {
 if (loans.length >= 3) return;
 const newId = Math.random().toString(36).substring(7);
 setLoans([...loans, { id: newId, name: `Loan Offer ${String.fromCharCode(65 + loans.length)}`, principal:"20000", rate:"5.0", years:"5"}]);
 };

 const removeLoan = (id: string) => {
 setLoans(loans.filter(l => l.id !== id));
 };

 const updateLoan = (id: string, field: keyof LoanInput, value: string) => {
 setLoans(loans.map(l => l.id === id ? { ...l, [field]: value } : l));
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
 icon={Scale}
 title="Loan Comparison Calculator"
 description="Compare multiple loan offers side by side to find the best option."
 actions={
 <ResetButton onClick={() => setLoans(defaultLoans)} label="Reset"/>
 }
 />

 <div className="flex justify-end">
 <Button variant="outline"onClick={addLoan} disabled={loans.length >= 3}>
 <Plus className="w-4 h-4 mr-2"/>
 Add Loan Offer
 </Button>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {loans.map((loan, idx) => {
 const result = results.computed.find(c => c.id === loan.id);
 const isCheapest = result?.id === results.minCostId && loans.length > 1;

 return (
 <GlassCard key={loan.id} className={cn("relative transition-all", isCheapest &&"ring-2 ring-green-500")}>
 {isCheapest && (
 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
 Best Value
 </div>
 )}
 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
 <CardTitle className="text-lg">
 <Input 
 value={loan.name}
 onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
 className="h-8 border-transparent hover:border-border font-semibold px-2 -ml-2 w-[160px]"
 />
 </CardTitle>
 {loans.length > 1 && (
 <Button variant="ghost"size="icon"onClick={() => removeLoan(loan.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
 <Trash2 className="w-4 h-4"/>
 </Button>
 )}
 </CardHeader>
 <CardContent className="space-y-6 pt-4">
 <div className="space-y-3">
 <div className="space-y-1.5">
 <Label className="text-xs">Principal Amount ($)</Label>
 <Input
 type="number"
 value={loan.principal}
 onChange={(e) => updateLoan(loan.id, 'principal', e.target.value)}
 />
 </div>
 <div className="space-y-1.5">
 <Label className="text-xs">Interest Rate (%)</Label>
 <Input
 type="number"
 value={loan.rate}
 onChange={(e) => updateLoan(loan.id, 'rate', e.target.value)}
 />
 </div>
 <div className="space-y-1.5">
 <Label className="text-xs">Loan Term (Years)</Label>
 <Input
 type="number"
 value={loan.years}
 onChange={(e) => updateLoan(loan.id, 'years', e.target.value)}
 />
 </div>
 </div>

 <Separator />

 <div className="space-y-3">
 <div className="bg-primary/5 rounded-lg p-3 text-center border border-primary/10">
 <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
 <Calculator className="w-3 h-3"/> Monthly Payment
 </div>
 <div className="text-xl font-bold">${result?.monthlyPayment.toFixed(2) || '0.00'}</div>
 </div>
 
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Total Interest:</span>
 <span className="font-medium">${result?.totalInterest.toFixed(2) || '0.00'}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Total Cost:</span>
 <span className="font-medium">${result?.totalPayment.toFixed(2) || '0.00'}</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 );
 })}
 </div>

 {loans.length > 1 && results.maxSavings > 0 && (
 <GlassCard className="bg-primary/5 border-primary/20">
 <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
 <BarChart3 className="w-6 h-6"/>
 </div>
 <div>
 <h3 className="font-semibold text-lg">Comparison Summary</h3>
 <p className="text-sm text-muted-foreground">
 Choosing the cheapest option saves you money over the life of the loan.
 </p>
 </div>
 </div>
 <div className="text-right">
 <div className="text-sm text-muted-foreground">Potential Savings</div>
 <div className="text-2xl font-bold text-green-500">${results.maxSavings.toFixed(2)}</div>
 </div>
 </CardContent>
 </GlassCard>
 )}
 
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
          <h3>Why Use Our Loan Comparison Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Loan Comparison Calculator provides
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

      <RelatedTools currentToolUrl="/tools/finance/loan-comparison" max={6} />

</div>
 );
}
