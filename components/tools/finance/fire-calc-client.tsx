"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Flame, TrendingUp, DollarSign, Copy } from"lucide-react";
import { ResetButton, CopyButton } from"@/components/shared/action-buttons";

export function FireCalcClient() {
 const [currentAge, setCurrentAge] = useState(30);
 const [netWorth, setNetWorth] = useState(50000);
 const [annualIncome, setAnnualIncome] = useState(80000);
 const [annualExpenses, setAnnualExpenses] = useState(40000);
 const [returnRate, setReturnRate] = useState(7);
 const [withdrawalRate, setWithdrawalRate] = useState(4);

 const annualSavings = annualIncome - annualExpenses;
 const fireNumber = annualExpenses / (withdrawalRate / 100);
 
 let yearsToFire = 0;
 let currentNW = netWorth;
 
 if (annualSavings > 0) {
 while (currentNW < fireNumber && yearsToFire < 100) {
 currentNW = currentNW * (1 + returnRate / 100) + annualSavings;
 yearsToFire++;
 }
 } else if (currentNW >= fireNumber) {
 yearsToFire = 0;
 } else {
 yearsToFire = -1; // Never
 }

 const fireAge = currentAge + yearsToFire;

 const summaryText ="FIRE Number: $"+ fireNumber.toFixed(0) +"\nYears to FIRE:"+ (yearsToFire >= 0 ? yearsToFire :"Never") +"\nFIRE Age:"+ (yearsToFire >= 0 ? fireAge :"N/A");

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Flame}
 title="FIRE Calculator"
 description="Calculate your Financial Independence and Retire Early (FIRE) metrics."
 actions={
 <React.Fragment>
 <ResetButton onClick={() => {
 setCurrentAge(30); setNetWorth(50000); setAnnualIncome(80000); setAnnualExpenses(40000); setReturnRate(7); setWithdrawalRate(4);
 }} label="Reset"/>
 </React.Fragment>
 }
 />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Your Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Current Age</Label>
 <Input type="number"value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Current Net Worth ($)</Label>
 <Input type="number"value={netWorth} onChange={(e) => setNetWorth(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Annual Income ($)</Label>
 <Input type="number"value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Annual Expenses ($)</Label>
 <Input type="number"value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Investment Return (%)</Label>
 <Input type="number"value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Withdrawal Rate (%)</Label>
 <Input type="number"value={withdrawalRate} onChange={(e) => setWithdrawalRate(Number(e.target.value))} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>FIRE Projection</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <p className="text-sm text-muted-foreground">Your FIRE Number</p>
 <p className="text-4xl font-bold text-primary">${fireNumber.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
 </div>
 
 <Separator />
 
 <div className="grid grid-cols-2 gap-4">
 <div>
 <p className="text-sm text-muted-foreground">Years to FIRE</p>
 <p className="text-2xl font-semibold">{yearsToFire >= 0 ? yearsToFire :"Never"}</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">FIRE Age</p>
 <p className="text-2xl font-semibold">{yearsToFire >= 0 ? fireAge :"N/A"}</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">Annual Savings</p>
 <p className="text-2xl font-semibold">${annualSavings.toLocaleString()}</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">Savings Rate</p>
 <p className="text-2xl font-semibold">{((annualSavings/annualIncome)*100).toFixed(1)}%</p>
 </div>
 </div>

 <div className="flex justify-end pt-4">
 <CopyButton getText={() => summaryText} label="Copy Summary"/>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
