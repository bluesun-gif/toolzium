"use client";

import React, { useState, useMemo } from "react";
import { Scale, DollarSign, AlertTriangle, Copy } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";

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
    
    const totalLoanCost = (monthlyPayment * tMonths) - p;
    
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

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Scale}
        title="Emergency Loan vs Savings"
        description="Compare financial impact of using emergency savings vs taking a personal loan."
        actions={<ResetButton onClick={resetAll} label="Reset" />}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Emergency Expense Amount ($)</Label>
              <Input type="number" value={expense} onChange={(e) => setExpense(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label>Savings Account APY (%)</Label>
              <Input type="number" value={savingsRate} onChange={(e) => setSavingsRate(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label>Loan Interest Rate (APR %)</Label>
              <Input type="number" value={loanRate} onChange={(e) => setLoanRate(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label>Loan Term (Months)</Label>
              <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className={"p-4 rounded-xl border " + (results.better === "savings" ? "bg-green-500/10 border-green-500/50" : "bg-red-500/10 border-red-500/50")}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={"w-5 h-5 " + (results.better === "savings" ? "text-green-500" : "text-red-500")} />
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
                  <CopyButton getText={() => "Emergency Expense: $" + expense + ". Using savings loses $" + results.savingsLost + " in interest. Taking a loan costs $" + results.loanCost + " in interest. Better option: " + results.better + "."} label="Copy Results" />
                </div>
              </div>
            ) : (
              <div className="text-center p-6 text-muted-foreground">
                Enter valid numbers to see the comparison.
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
