"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { TrendingUp, DollarSign, Calculator, BarChart3 } from "lucide-react";

export function InvestmentReturnClient() {
  const [initialInvestment, setInitialInvestment] = useState<string>("10000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("500");
  const [annualReturnRate, setAnnualReturnRate] = useState<string>("7");
  const [years, setYears] = useState<string>("10");

  const [results, setResults] = useState<{
    finalBalance: number;
    totalContributions: number;
    totalReturns: number;
    returnMultiple: number;
    yearlyBreakdown: { year: number; balance: number; contributions: number; returns: number }[];
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(initialInvestment) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualReturnRate) || 0) / 100 / 12;
    const t = parseFloat(years) || 0;
    const n = t * 12;

    if (t <= 0) return;

    let currentBalance = p;
    let currentContributions = p;
    
    const breakdown = [];

    for (let i = 1; i <= n; i++) {
      currentBalance = currentBalance * (1 + r) + pmt;
      currentContributions += pmt;

      if (i % 12 === 0) {
        breakdown.push({
          year: i / 12,
          balance: currentBalance,
          contributions: currentContributions,
          returns: currentBalance - currentContributions
        });
      }
    }

    setResults({
      finalBalance: currentBalance,
      totalContributions: currentContributions,
      totalReturns: currentBalance - currentContributions,
      returnMultiple: currentContributions > 0 ? currentBalance / currentContributions : 0,
      yearlyBreakdown: breakdown
    });
  };

  useEffect(() => {
    calculate();
  }, [initialInvestment, monthlyContribution, annualReturnRate, years]);

  const handleReset = () => {
    setInitialInvestment("10000");
    setMonthlyContribution("500");
    setAnnualReturnRate("7");
    setYears("10");
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={TrendingUp}
        title="Investment Return Calculator"
        description="Calculate the future value of your investments with monthly contributions and compound interest."
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Investment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Initial Investment ($)</Label>
              <Input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                min="0"
                step="100"
              />
            </div>
            <div className="space-y-2">
              <Label>Monthly Contribution ($)</Label>
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                min="0"
                step="50"
              />
            </div>
            <div className="space-y-2">
              <Label>Annual Return Rate (%)</Label>
              <Input
                type="number"
                value={annualReturnRate}
                onChange={(e) => setAnnualReturnRate(e.target.value)}
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label>Investment Period (Years)</Label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                min="1"
                step="1"
              />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Results Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Final Balance</div>
                  <div className="text-3xl font-bold text-primary">{formatCurrency(results.finalBalance)}</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Contributions:</span>
                    <span className="font-medium">{formatCurrency(results.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Returns:</span>
                    <span className="font-medium text-green-500">+{formatCurrency(results.totalReturns)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Return Multiple:</span>
                    <span className="font-medium">{results.returnMultiple.toFixed(2)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gains vs Contributions:</span>
                    <span className="font-medium">
                      {results.totalContributions > 0 ? ((results.totalReturns / results.totalContributions) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Enter your investment details to see results
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>

      {results && results.yearlyBreakdown.length > 0 && (
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Year-by-Year Breakdown
            </CardTitle>
            <CardDescription>How your investment grows over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/50 rounded-t-lg">
                  <tr>
                    <th className="px-4 py-3">Year</th>
                    <th className="px-4 py-3">Balance</th>
                    <th className="px-4 py-3">Total Contributed</th>
                    <th className="px-4 py-3">Total Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="px-4 py-3 font-medium">Year {row.year}</td>
                      <td className="px-4 py-3">{formatCurrency(row.balance)}</td>
                      <td className="px-4 py-3">{formatCurrency(row.contributions)}</td>
                      <td className="px-4 py-3 text-green-500">{formatCurrency(row.returns)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </GlassCard>
      )}
    </div>
  );
}
