"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ResetButton } from "@/components/shared/action-buttons";
import { Switch } from "@/components/ui/switch";
import { Landmark, TrendingUp, Calendar, DollarSign } from "lucide-react";

export function RetirementClient() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [inflationAdjusted, setInflationAdjusted] = useState(false);
  const inflationRate = 2.5;

  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  const effectiveReturnRate = inflationAdjusted ? ((1 + annualReturn / 100) / (1 + inflationRate / 100) - 1) : annualReturn / 100;
  const monthlyRate = effectiveReturnRate / 12;
  const totalMonths = yearsToRetire * 12;

  let futureValue = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
  let futureContributions = 0;
  if (monthlyRate > 0) {
    futureContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  } else {
    futureContributions = monthlyContribution * totalMonths;
  }
  
  const totalAtRetirement = futureValue + futureContributions;
  const totalContributed = currentSavings + (monthlyContribution * totalMonths);
  const totalInterest = totalAtRetirement - totalContributed;
  
  const monthlyIncome = (totalAtRetirement * 0.04) / 12;

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Landmark}
        title="Retirement Calculator"
        description="Calculate retirement savings projections and monthly income based on the 4% rule."
        actions={
          <ResetButton onClick={() => {
            setCurrentAge(30);
            setRetirementAge(65);
            setCurrentSavings(50000);
            setMonthlyContribution(500);
            setAnnualReturn(7);
            setInflationAdjusted(false);
          }} label="Reset" />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Age</Label>
                <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Retirement Age</Label>
                <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Current Savings ($)</Label>
                <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Monthly Contribution ($)</Label>
                <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Expected Annual Return (%)</Label>
                <Input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch checked={inflationAdjusted} onCheckedChange={setInflationAdjusted} id="inflation-switch" />
                <Label htmlFor="inflation-switch">Adjust for Inflation (2.5%)</Label>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className="md:col-span-8 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Projections</CardTitle>
              <CardDescription>Estimated totals at age {retirementAge}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-1">
                    <TrendingUp className="w-4 h-4" /> Total at Retirement
                  </div>
                  <div className="text-3xl font-bold text-primary">${totalAtRetirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl border border-border">
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-1">
                    <Calendar className="w-4 h-4" /> Monthly Income (4% Rule)
                  </div>
                  <div className="text-3xl font-bold">${monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Total Contributions</span>
                  <span className="font-medium">${totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Total Interest Earned</span>
                  <span className="font-medium text-green-600">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
