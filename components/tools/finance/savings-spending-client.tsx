"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { Wallet, TrendingUp, BarChart2, Lightbulb } from "lucide-react";
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
  housing: 0,
  food: 0,
  transport: 0,
  entertainment: 0,
  shopping: 0,
  utilities: 0,
  other: 0,
};

export function SavingsSpendingClient() {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expenses>(defaultExpenses);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem("savings-spending-data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setIncome(parsed.income || 0);
        setExpenses(parsed.expenses || defaultExpenses);
      } catch (e) {
        // ignore
      }
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
    setIncome(0);
    setExpenses(defaultExpenses);
    localStorage.removeItem("savings-spending-data");
    toast.success("Data reset");
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

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Savings vs Spending Analyzer"
        description="Compare saving vs spending habits."
        icon={Wallet}
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      <div className={"grid " + "gap-6 " + "md:grid-cols-2"}>
        <GlassCard>
          <CardHeader>
            <CardTitle>Input Data</CardTitle>
            <CardDescription>Enter your monthly income and expenses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Monthly Income</Label>
              <Input type="number" value={income || ""} onChange={(e) => setIncome(Number(e.target.value) || 0)} placeholder="e.g. 5000" />
            </div>
            
            <Separator />
            <h4 className={"text-sm " + "font-medium " + "text-muted-foreground"}>Expenses</h4>

            <div className={"grid " + "grid-cols-2 " + "gap-4"}>
              <div className="space-y-2">
                <Label>Housing</Label>
                <Input type="number" value={expenses.housing || ""} onChange={(e) => handleExpenseChange("housing", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Food</Label>
                <Input type="number" value={expenses.food || ""} onChange={(e) => handleExpenseChange("food", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Transport</Label>
                <Input type="number" value={expenses.transport || ""} onChange={(e) => handleExpenseChange("transport", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Utilities</Label>
                <Input type="number" value={expenses.utilities || ""} onChange={(e) => handleExpenseChange("utilities", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Entertainment</Label>
                <Input type="number" value={expenses.entertainment || ""} onChange={(e) => handleExpenseChange("entertainment", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Shopping</Label>
                <Input type="number" value={expenses.shopping || ""} onChange={(e) => handleExpenseChange("shopping", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Other</Label>
                <Input type="number" value={expenses.other || ""} onChange={(e) => handleExpenseChange("other", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={"grid " + "grid-cols-2 " + "gap-4"}>
                <div className={"p-4 " + "rounded-lg " + "bg-muted " + "text-center"}>
                  <p className={"text-sm " + "text-muted-foreground"}>Total Expenses</p>
                  <p className={"text-2xl " + "font-bold"}>${totalExpenses.toFixed(2)}</p>
                </div>
                <div className={"p-4 " + "rounded-lg " + "bg-primary/10 " + "text-center"}>
                  <p className={"text-sm " + "text-muted-foreground"}>Savings</p>
                  <p className={"text-2xl " + "font-bold " + "text-primary"}>${savings.toFixed(2)}</p>
                </div>
              </div>
              <div className={"flex " + "items-center " + "justify-between " + "p-4 " + "rounded-lg " + "border"}>
                <span className="font-medium">Savings Rate</span>
                <span className={"text-xl " + "font-bold"}>{savingsRate}%</span>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>50/30/20 Rule</CardTitle>
              <CardDescription>Target: 50% Needs, 30% Wants, 20% Savings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className={"flex " + "justify-between " + "text-sm"}>
                  <span>Needs (Housing, Food, Transport, Utilities)</span>
                  <span className={actualNeedsPct > 50 ? "text-destructive" : ""}>{actualNeedsPct.toFixed(1)}%</span>
                </div>
                <div className={"h-2 " + "w-full " + "bg-muted " + "rounded-full " + "overflow-hidden"}>
                  <div className={"h-full " + "bg-blue-500"} style={{ width: Math.min(100, actualNeedsPct) + "%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className={"flex " + "justify-between " + "text-sm"}>
                  <span>Wants (Entertainment, Shopping, Other)</span>
                  <span className={actualWantsPct > 30 ? "text-destructive" : ""}>{actualWantsPct.toFixed(1)}%</span>
                </div>
                <div className={"h-2 " + "w-full " + "bg-muted " + "rounded-full " + "overflow-hidden"}>
                  <div className={"h-full " + "bg-yellow-500"} style={{ width: Math.min(100, actualWantsPct) + "%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className={"flex " + "justify-between " + "text-sm"}>
                  <span>Savings</span>
                  <span className={actualSavingsPct < 20 ? "text-destructive" : "text-green-500"}>{actualSavingsPct.toFixed(1)}%</span>
                </div>
                <div className={"h-2 " + "w-full " + "bg-muted " + "rounded-full " + "overflow-hidden"}>
                  <div className={"h-full " + "bg-green-500"} style={{ width: Math.min(100, actualSavingsPct) + "%" }} />
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
