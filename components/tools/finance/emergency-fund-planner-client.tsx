"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Shield, DollarSign, Sparkles, Zap, Copy } from "lucide-react";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Separator } from "@/components/ui/separator";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function EmergencyFundPlannerClient() {
  const [housing, setHousing] = useState("1500");
  const [utilities, setUtilities] = useState("200");
  const [food, setFood] = useState("400");
  const [debt, setDebt] = useState("300");
  const [transport, setTransport] = useState("200");
  const [insurance, setInsurance] = useState("150");
  const [targetMonths, setTargetMonths] = useState("6");
  const [currentSaved, setCurrentSaved] = useState("5000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const calculatePlan = () => {
    const totalExpenses = (parseFloat(housing) || 0) + (parseFloat(utilities) || 0) + (parseFloat(food) || 0) + (parseFloat(debt) || 0) + (parseFloat(transport) || 0) + (parseFloat(insurance) || 0);
    const targetFund = totalExpenses * parseInt(targetMonths, 10);
    const saved = parseFloat(currentSaved) || 0;
    const gap = Math.max(0, targetFund - saved);
    const contribution = parseFloat(monthlyContribution) || 0;
    let monthsToGoal = 0;
    if (gap > 0 && contribution > 0) {
      monthsToGoal = Math.ceil(gap / contribution);
    } else if (gap > 0 && contribution <= 0) {
      monthsToGoal = -1; // infinite
    }
    const progress = targetFund > 0 ? Math.min(100, saved / targetFund * 100) : 0;
    return {
      totalExpenses,
      targetFund,
      gap,
      monthsToGoal,
      progress,
      saved
    };
  };
  const results = calculatePlan();
  const handleReset = () => {
    setHousing("1500");
    setUtilities("200");
    setFood("400");
    setDebt("300");
    setTransport("200");
    setInsurance("150");
    setTargetMonths("6");
    setCurrentSaved("5000");
    setMonthlyContribution("500");
  };
  const getCopyText = () => {
    return "Emergency Fund Target: $" + results.targetFund + ", Current Saved: $" + results.saved + ", Gap: $" + results.gap + ", Months to Goal:" + (results.monthsToGoal === -1 ? "Never" : results.monthsToGoal) + "months.";
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Shield} title="Emergency Fund Savings & Target Planner" description="Calculate your recommended safety net emergency fund size and monthly savings target timeline." actions={<div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset" />
 <CopyButton getText={getCopyText} label="Copy Results" />
 </div>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Monthly Essential Expenses</CardTitle>
 <CardDescription>Enter your necessary monthly costs</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Housing / Rent</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={housing} onChange={e => setHousing(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Utilities</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={utilities} onChange={e => setUtilities(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Food / Groceries</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={food} onChange={e => setFood(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Debt Minimums</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={debt} onChange={e => setDebt(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Transportation</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={transport} onChange={e => setTransport(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Insurance / Medical</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={insurance} onChange={e => setInsurance(e.target.value)} className="pl-9" />
 </div>
 </div>
 </div>

 <Separator className="my-4" />
 
 <div className="space-y-4">
 <div className="space-y-2">
 <Label>Target Fund Coverage</Label>
 <Select value={targetMonths} onValueChange={setTargetMonths}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="3">3 Months (Minimum)</SelectItem>
 <SelectItem value="6">6 Months (Recommended)</SelectItem>
 <SelectItem value="9">9 Months (Conservative)</SelectItem>
 <SelectItem value="12">12 Months (Very Conservative)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Current Saved Amount</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={currentSaved} onChange={e => setCurrentSaved(e.target.value)} className="pl-9" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Monthly Contribution</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
 <Input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="pl-9" />
 </div>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Your Plan</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="p-6 bg-primary/10 rounded-xl text-center space-y-2">
 <Wallet className="w-8 h-8 text-primary mx-auto mb-2" />
 <div className="text-4xl font-bold text-primary">${results.targetFund.toLocaleString()}</div>
 <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Target Fund</div>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Progress: {results.progress.toFixed(1)}%</span>
 <span>${results.saved.toLocaleString()} / ${results.targetFund.toLocaleString()}</span>
 </div>
 <div className="h-4 bg-muted rounded-full overflow-hidden">
 <div className="h-full bg-primary transition-all duration-500 ease-out" style={{
                  width: results.progress + "%"
                }}></div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-muted rounded-lg text-center space-y-1">
 <div className="text-2xl font-bold text-red-500">${results.gap.toLocaleString()}</div>
 <div className="text-xs text-muted-foreground uppercase">Gap Remaining</div>
 </div>
 <div className="p-4 bg-muted rounded-lg text-center space-y-1">
 <div className="text-2xl font-bold text-primary">
 {results.gap === 0 ? "Goal Reached!" : results.monthsToGoal === -1 ? "Infinite" : results.monthsToGoal + "mo"}
 </div>
 <div className="text-xs text-muted-foreground uppercase">Time to Goal</div>
 </div>
 </div>

 <div className="p-4 bg-muted rounded-lg flex items-center justify-between">
 <span className="font-medium text-sm">Monthly Expenses Total</span>
 <span className="font-bold">${results.totalExpenses.toLocaleString()} / month</span>
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
          <h3>Why Use Our Emergency Fund Savings & Target Planner?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Emergency Fund Savings & Target Planner provides
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

      <RelatedTools currentToolUrl="/tools/finance/emergency-fund-planner" max={6} />

    </div></div>;
}