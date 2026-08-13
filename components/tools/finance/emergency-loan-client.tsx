"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import { Scale, DollarSign, AlertTriangle, Copy, Sparkles, Shield, Zap } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
export function EmergencyLoanClient() {
  const [expense, setExpense] = useState("1000");
  const [savingsRate, setSavingsRate] = useState("4");
  const [loanRate, setLoanRate] = useState("20");
  const [loanTerm, setLoanTerm] = useState("12");
  const resetAll = () => {
    setExpense("1000");
    setSavingsRate("4");
    setLoanRate("20");
    setLoanTerm("12");
  };
  const results = useMemo(() => {
    const p = parseFloat(expense);
    const rSavings = parseFloat(savingsRate) / 100;
    const rLoan = parseFloat(loanRate) / 100;
    const tMonths = parseFloat(loanTerm);
    if (isNaN(p) || isNaN(rSavings) || isNaN(rLoan) || isNaN(tMonths) || p <= 0 || tMonths <= 0) return null;

    // Monthly loan payment (amortized)
    const monthlyRate = rLoan / 12;
    const monthlyPayment = p * (monthlyRate * Math.pow(1 + monthlyRate, tMonths)) / (Math.pow(1 + monthlyRate, tMonths) - 1);
    const totalLoanCost = monthlyPayment * tMonths - p;

    // Savings lost interest (simple estimate)
    const tYears = tMonths / 12;
    const savingsLost = p * rSavings * tYears;
    return {
      loanCost: totalLoanCost.toFixed(2),
      savingsLost: savingsLost.toFixed(2),
      difference: Math.abs(totalLoanCost - savingsLost).toFixed(2),
      better: totalLoanCost > savingsLost ? "savings" : "loan",
      monthlyPayment: monthlyPayment.toFixed(2)
    };
  }, [expense, savingsRate, loanRate, loanTerm]);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Scale} title="Emergency Loan vs Savings" description="Compare financial impact of using emergency savings vs taking a personal loan." actions={<ResetButton onClick={resetAll} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Inputs</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Emergency Expense Amount ($)</Label>
 <Input type="number" value={expense} onChange={e => setExpense(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Savings Account APY (%)</Label>
 <Input type="number" value={savingsRate} onChange={e => setSavingsRate(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Loan Interest Rate (APR %)</Label>
 <Input type="number" value={loanRate} onChange={e => setLoanRate(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Loan Term (Months)</Label>
 <Input type="number" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Comparison Results</CardTitle>
 </CardHeader>
 <CardContent>
 {results ? <div className="space-y-6">
 <div className={cn("p-4 rounded-xl border", results.better === "savings" ? "bg-green-500/10 border-green-500/50" : "bg-red-500/10 border-red-500/50")}>
 <div className="flex items-center gap-2 mb-2">
 <AlertTriangle className={cn("w-5 h-5", results.better === "savings" ? "text-green-500" : "text-red-500")} />
 <h3 className="font-bold">Recommendation</h3>
 </div>
 <p>
 Using your <strong>{results.better}</strong> is cheaper by <strong>${results.difference}</strong> over the {loanTerm} month period.
 </p>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-muted p-4 rounded-lg">
 <h4 className="text-sm font-semibold mb-2">If you use savings:</h4>
 <div className="text-2xl font-bold text-destructive">${results.savingsLost}</div>
 <div className="text-xs text-muted-foreground mt-1">Lost interest earnings</div>
 </div>
 
 <div className="bg-muted p-4 rounded-lg">
 <h4 className="text-sm font-semibold mb-2">If you take a loan:</h4>
 <div className="text-2xl font-bold text-destructive">${results.loanCost}</div>
 <div className="text-xs text-muted-foreground mt-1">Total interest paid</div>
 <div className="text-xs text-muted-foreground mt-1">Monthly payment: ${results.monthlyPayment}</div>
 </div>
 </div>
 
 <div className="flex justify-end">
 <CopyButton getText={() => "Emergency Expense: $" + expense + ". Using savings loses $" + results.savingsLost + "in interest. Taking a loan costs $" + results.loanCost + "in interest. Better option:" + results.better + "."} label="Copy Results" />
 </div>
 </div> : <div className="text-center p-6 text-muted-foreground">
 Enter valid numbers to see the comparison.
 </div>}
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
          <h3>Why Use Our Emergency Loan vs Savings?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Emergency Loan vs Savings provides
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

      <RelatedTools currentToolUrl="/tools/finance/emergency-loan" max={6} />

    </div></div>;
}