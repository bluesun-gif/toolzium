"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton, ActionButton } from "@/components/shared/action-buttons";
import { DollarSign, Calculator, Calendar, TrendingUp } from "lucide-react";

export function EmergencyGoalCalcClient() {
  const [goalAmount, setGoalAmount] = useState("10000");
  const [currentSavings, setCurrentSavings] = useState("2000");
  const [months, setMonths] = useState("12");
  const [apy, setApy] = useState("4.5");

  const handleReset = () => {
    setGoalAmount("10000");
    setCurrentSavings("2000");
    setMonths("12");
    setApy("4.5");
  };

  const calculate = () => {
    const goal = parseFloat(goalAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const t = parseFloat(months) || 1; // months
    const rate = parseFloat(apy) || 0;
    
    const r = rate / 100 / 12; // monthly rate
    
    let requiredMonthly = 0;
    let totalInterest = 0;
    let futureValueOfCurrent = current;

    if (r === 0) {
      requiredMonthly = (goal - current) / t;
      totalInterest = 0;
    } else {
      // Future value of current savings
      futureValueOfCurrent = current * Math.pow(1 + r, t);
      
      // Amount still needed
      const shortfall = goal - futureValueOfCurrent;
      
      if (shortfall <= 0) {
        requiredMonthly = 0;
        totalInterest = futureValueOfCurrent - current;
      } else {
        // PMT formula for future value
        // FV = PMT * (((1 + r)^t - 1) / r)
        // PMT = FV / (((1 + r)^t - 1) / r)
        requiredMonthly = shortfall / ((Math.pow(1 + r, t) - 1) / r);
        totalInterest = goal - current - (requiredMonthly * t);
      }
    }

    return {
      monthly: Math.max(0, requiredMonthly),
      interest: Math.max(0, totalInterest),
      weekly: Math.max(0, (requiredMonthly * 12) / 52)
    };
  };

  const results = calculate();

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Calculator}
        title="Emergency Savings Goal Calculator"
        description="Calculate how much you need to save per month to reach your emergency savings goal."
        actions={
          <ResetButton onClick={handleReset} label="Reset" />
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Goal Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Goal Amount ($)</Label>
              <Input type="number" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label>Current Savings ($)</Label>
              <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Time to Goal (Months)</Label>
              <Input type="number" value={months} onChange={(e) => setMonths(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Interest Rate / APY (%)</Label>
              <Input type="number" value={apy} onChange={(e) => setApy(e.target.value)} step="0.1" />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Your Savings Plan</CardTitle>
            <CardDescription>Required contributions to hit your goal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/10 p-6 rounded-lg text-center space-y-2 border border-primary/20">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">Monthly Contribution</p>
              <div className="flex items-center justify-center gap-1 text-primary">
                <DollarSign className="w-8 h-8" />
                <span className="text-5xl font-bold">{results.monthly.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1 flex items-center justify-center gap-1">
                  <Calendar className="w-4 h-4" /> Weekly Target
                </p>
                <p className="text-xl font-semibold">${results.weekly.toFixed(2)}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1 flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4" /> Est. Interest Earned
                </p>
                <p className="text-xl font-semibold text-green-600">${results.interest.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Milestone Timeline</h4>
              <div className="space-y-3">
                {[0.25, 0.5, 0.75, 1].map((milestone) => (
                  <div key={milestone} className="flex justify-between items-center text-sm">
                    <span className="w-12 text-muted-foreground">{milestone * 100}%</span>
                    <div className="flex-1 mx-4 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: (milestone * 100) + "%" }}></div>
                    </div>
                    <span className="w-16 text-right font-medium">${(parseFloat(goalAmount || "0") * milestone).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
