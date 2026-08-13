"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Wallet, TrendingUp, BarChart2, Shield, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type Expenses = {
  housing: number;
  food: number;
  transport: number;
  entertainment: number;
  shopping: number;
  utilities: number;
  other: number;
};

const defaultExpenses: Expenses = {
  housing: 1200,
  food: 400,
  transport: 200,
  entertainment: 150,
  shopping: 150,
  utilities: 200,
  other: 100,
};

export function SavingsSpendingClient() {
  const [income, setIncome] = useState<number>(4000);
  const [expenses, setExpenses] = useState<Expenses>(defaultExpenses);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem("savings-spending-data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.income !== undefined) setIncome(parsed.income);
        if (parsed.expenses) setExpenses(parsed.expenses);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("savings-spending-data", JSON.stringify({ income, expenses }));
    }
  }, [income, expenses, mounted]);

  const handleExpenseChange = (key: keyof Expenses, value: string) => {
    setExpenses((prev) => ({
      ...prev,
      [key]: Number(value) || 0,
    }));
  };

  const handleReset = () => {
    setIncome(4000);
    setExpenses(defaultExpenses);
    localStorage.removeItem("savings-spending-data");
    toast.success("Data reset to defaults!");
  };

  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
  const savings = Math.max(0, income - totalExpenses);
  const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : "0.0";

  // 50/30/20 rule
  const needs = expenses.housing + expenses.food + expenses.transport + expenses.utilities;
  const wants = expenses.entertainment + expenses.shopping + expenses.other;

  const actualNeedsPct = income > 0 ? (needs / income) * 100 : 0;
  const actualWantsPct = income > 0 ? (wants / income) * 100 : 0;
  const actualSavingsPct = income > 0 ? (savings / income) * 100 : 0;

  if (!mounted) return null;

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      <ToolPageHeader
        title="Savings vs Spending Analyzer & 50/30/20 Budget Calculator"
        description="Analyze your monthly income against categorized expenses, calculate your net savings rate, and benchmark against the 50/30/20 rule."
        icon={Wallet}
        actions={<ResetButton onClick={handleReset} label="Reset Budget" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* INPUT CARD */}
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wallet className="w-5 h-5 text-primary" /> Monthly Income & Expense Breakdown
            </CardTitle>
            <CardDescription>Enter gross monthly income and categorized expense estimates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-income" className="font-bold">Gross Monthly Income ($)</Label>
              <Input
                id="monthly-income"
                type="number"
                value={income || ""}
                onChange={(e) => setIncome(Number(e.target.value) || 0)}
                placeholder="e.g. 4000"
                className="h-11 font-bold text-foreground"
              />
            </div>

            <Separator />
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Categorized Monthly Expenses</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Housing (Rent/Mortgage)</Label>
                <Input type="number" value={expenses.housing || ""} onChange={(e) => handleExpenseChange("housing", e.target.value)} className="h-9 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Food & Groceries</Label>
                <Input type="number" value={expenses.food || ""} onChange={(e) => handleExpenseChange("food", e.target.value)} className="h-9 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Transportation</Label>
                <Input type="number" value={expenses.transport || ""} onChange={(e) => handleExpenseChange("transport", e.target.value)} className="h-9 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Utilities & Bills</Label>
                <Input type="number" value={expenses.utilities || ""} onChange={(e) => handleExpenseChange("utilities", e.target.value)} className="h-9 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Entertainment & Dining</Label>
                <Input type="number" value={expenses.entertainment || ""} onChange={(e) => handleExpenseChange("entertainment", e.target.value)} className="h-9 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Shopping & Subscriptions</Label>
                <Input type="number" value={expenses.shopping || ""} onChange={(e) => handleExpenseChange("shopping", e.target.value)} className="h-9 text-xs" />
              </div>
              <div className="space-y-1 col-span-2">
                <Label className="text-xs font-semibold">Other Misc Expenses</Label>
                <Input type="number" value={expenses.other || ""} onChange={(e) => handleExpenseChange("other", e.target.value)} className="h-9 text-xs" />
              </div>
            </div>
          </CardContent>
        </GlassCard>

        {/* SUMMARY CARDS */}
        <div className="space-y-6">
          <GlassCard>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-primary" /> Net Savings & Rate Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/40 border border-border text-center">
                  <p className="text-xs font-bold text-muted-foreground uppercase">Total Expenses</p>
                  <p className="text-2xl font-black text-foreground">${totalExpenses.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Monthly Savings</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">${savings.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-primary/10">
                <span className="font-bold text-sm text-foreground">Net Savings Rate</span>
                <span className="text-2xl font-black text-primary">{savingsRate}%</span>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart2 className="w-5 h-5 text-primary" /> 50/30/20 Rule Benchmark
              </CardTitle>
              <CardDescription>Target: 50% Needs, 30% Wants, 20% Savings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Needs (Housing, Food, Transport, Utilities)</span>
                  <span className={cn(actualNeedsPct > 50 ? "text-destructive font-black" : "text-foreground")}>{actualNeedsPct.toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, actualNeedsPct)}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Wants (Entertainment, Shopping, Misc)</span>
                  <span className={cn(actualWantsPct > 30 ? "text-destructive font-black" : "text-foreground")}>{actualWantsPct.toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, actualWantsPct)}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Savings / Investment</span>
                  <span className={cn(actualSavingsPct < 20 ? "text-destructive font-black" : "text-emerald-500 font-black")}>{actualSavingsPct.toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, actualSavingsPct)}%` }} />
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Monthly Income",
            description: "Enter your take-home after-tax monthly income in dollars.",
            icon: Wallet,
          },
          {
            step: "02",
            title: "Enter Categorized Expenses",
            description: "Specify estimates for Housing, Groceries, Transport, Utilities, Entertainment, and Shopping.",
            icon: TrendingUp,
          },
          {
            step: "03",
            title: "Analyze Savings Rate",
            description: "Instantly compare your savings percentage against the 50/30/20 financial rule.",
            icon: BarChart2,
          },
        ]}
        badges={["50/30/20 Rule", "Real-Time Savings Rate", "Auto-Saved"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Wallet,
            title: "50/30/20 Rule Benchmark",
            description: "Compares your spending profile against 50% Needs, 30% Wants, and 20% Savings target ratios.",
          },
          {
            icon: TrendingUp,
            title: "Real-Time Savings Rate Percentage",
            description: "Calculates net savings after subtracting total categorized monthly expenses.",
          },
          {
            icon: Shield,
            title: "100% Private & Confidential",
            description: "All financial data remains strictly in your browser's local storage.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What is the 50/30/20 budget rule?",
            answer: "The 50/30/20 rule suggests spending 50% of income on Needs (rent, food), 30% on Wants (entertainment, shopping), and 20% on Savings or Debt Paydown.",
          },
          {
            question: "Is my income data sent to any server?",
            answer: "No, all calculations and budget entries remain 100% confidential in your local browser.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/finance/savings-spending" max={6} />
    </div>
  );
}
