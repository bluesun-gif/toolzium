"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { Home, Calculator, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export function MortgageClient() {
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0) {
      const mathPower = Math.pow(1 + monthlyRate, numberOfPayments);
      const monthly = (principal * mathPower * monthlyRate) / (mathPower - 1);
      
      setMonthlyPayment(monthly);
      setTotalInterest((monthly * numberOfPayments) - principal);
      setTotalCost((monthly * numberOfPayments) + downPayment);
    } else if (principal > 0) {
      const monthly = principal / numberOfPayments;
      setMonthlyPayment(monthly);
      setTotalInterest(0);
      setTotalCost(principal + downPayment);
    } else {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalCost(downPayment);
    }
  }, [homePrice, downPayment, loanTerm, interestRate]);

  const handleDownPaymentPctChange = (pct: number) => {
    setDownPayment((homePrice * pct) / 100);
  };

  const handleReset = () => {
    setHomePrice(300000);
    setDownPayment(60000);
    setLoanTerm(30);
    setInterestRate(6.5);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const principalPct = totalCost > 0 ? ((homePrice - downPayment) / (totalCost - downPayment)) * 100 : 0;
  const interestPct = totalCost > 0 ? (totalInterest / (totalCost - downPayment)) * 100 : 0;

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Calculator}
        title="Mortgage Calculator"
        description="Calculate your monthly mortgage payments, total interest, and complete cost of your home loan."
        actions={
          <>
            <ResetButton onClick={handleReset} label="Reset" />
          </>
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Loan Details
            </CardTitle>
            <CardDescription>Enter your home loan information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Home Price ($)</Label>
              <Input
                type="number"
                min="0"
                value={homePrice || ""}
                onChange={(e) => setHomePrice(Number(e.target.value))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Down Payment ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={downPayment || ""}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Down Payment (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : "0"}
                  onChange={(e) => handleDownPaymentPctChange(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Loan Term (Years)</Label>
              <Select value={loanTerm.toString()} onValueChange={(v) => setLoanTerm(Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="15">15 Years</SelectItem>
                  <SelectItem value="20">20 Years</SelectItem>
                  <SelectItem value="25">25 Years</SelectItem>
                  <SelectItem value="30">30 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Interest Rate (%)</Label>
              <Input
                type="number"
                min="0"
                step="0.1"
                value={interestRate || ""}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Payment Summary
            </CardTitle>
            <CardDescription>Your estimated mortgage payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/10 p-6 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Estimated Monthly Payment</p>
              <h3 className="text-4xl font-bold text-primary">{formatCurrency(monthlyPayment)}</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Principal amount:</span>
                <span className="font-medium">{formatCurrency(homePrice - downPayment)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total interest:</span>
                <span className="font-medium">{formatCurrency(totalInterest)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total cost of loan:</span>
                <span>{formatCurrency(totalCost - downPayment)}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-medium">Amortization Breakdown</span>
              </div>
              <div className="h-4 w-full bg-secondary rounded-full overflow-hidden flex">
                <div 
                  className="bg-primary h-full" 
                  style={{ width: `${principalPct}%` }}
                  title={`Principal: ${principalPct.toFixed(1)}%`}
                />
                <div 
                  className="bg-destructive/80 h-full" 
                  style={{ width: `${interestPct}%` }}
                  title={`Interest: ${interestPct.toFixed(1)}%`}
                />
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Principal ({principalPct.toFixed(1)}%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <span>Interest ({interestPct.toFixed(1)}%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
