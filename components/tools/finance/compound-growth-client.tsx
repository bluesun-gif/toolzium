"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { TrendingUp } from "lucide-react";

export function CompoundGrowthClient() {
  const [initialDeposit, setInitialDeposit] = useState("1000");
  const [monthlyContribution, setMonthlyContribution] = useState("100");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [years, setYears] = useState("10");
  const [compoundFreq, setCompoundFreq] = useState("12");

  const calculate = () => {
    const p = parseFloat(initialDeposit) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualReturn) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = parseFloat(compoundFreq) || 12;

    let futureValue = p;
    let totalContributed = p;
    
    for (let i = 0; i < t * n; i++) {
      futureValue *= (1 + r / n);
      if (n === 12) {
        futureValue += pmt;
        totalContributed += pmt;
      } else if (n === 4 && i % 3 === 0) {
         futureValue += pmt * 3;
         totalContributed += pmt * 3;
      } else if (n === 1 && i % 12 === 0) {
         futureValue += pmt * 12;
         totalContributed += pmt * 12;
      }
    }

    return {
      futureValue: futureValue.toFixed(2),
      totalContributed: totalContributed.toFixed(2),
      interestEarned: (futureValue - totalContributed).toFixed(2)
    };
  };

  const results = calculate();

  const handleReset = () => {
    setInitialDeposit("1000");
    setMonthlyContribution("100");
    setAnnualReturn("7");
    setYears("10");
    setCompoundFreq("12");
  };

  const getSummary = () => {
    return "Total Future Value: $" + results.futureValue + "\nTotal Contributed: $" + results.totalContributed + "\nInterest Earned: $" + results.interestEarned;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Investment Compound Growth Visualizer"
        description="Calculate how your investments could grow over time."
        icon={TrendingUp}
        actions={
          <div className="flex gap-2">
            <ResetButton onClick={handleReset} label="Reset" />
          </div>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Investment Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Initial Deposit ($)</Label>
              <Input type="number" value={initialDeposit} onChange={(e) => setInitialDeposit(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Monthly Contribution ($)</Label>
              <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Annual Return Rate (%)</Label>
              <Input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Investment Period (Years)</Label>
              <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Compound Frequency</Label>
              <Select value={compoundFreq} onValueChange={setCompoundFreq}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="1">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Growth Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-sm font-medium text-primary">Future Value</div>
                <div className="text-3xl font-bold">${results.futureValue}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card border">
                  <div className="text-sm text-muted-foreground">Total Contributions</div>
                  <div className="text-xl font-semibold">${results.totalContributed}</div>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <div className="text-sm text-muted-foreground">Interest Earned</div>
                  <div className="text-xl font-semibold">${results.interestEarned}</div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-end">
              <CopyButton getText={getSummary} label="Copy Summary" />
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
