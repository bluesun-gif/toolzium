"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Shield, DollarSign, Target, Copy } from"lucide-react";
import toast from"react-hot-toast";

export function EmergencyFundClient() {
 const [expenses, setExpenses] = useState({
 housing:"", food:"", utilities:"", debt:"", insurance:"", transport:"", dependents:""
 });
 const [targetMonths, setTargetMonths] = useState("6");
 const [currentSavings, setCurrentSavings] = useState("");
 const [monthlyContribution, setMonthlyContribution] = useState("");

 const totalMonthlyExpenses = 
 (Number(expenses.housing) || 0) + 
 (Number(expenses.food) || 0) + 
 (Number(expenses.utilities) || 0) + 
 (Number(expenses.debt) || 0) + 
 (Number(expenses.insurance) || 0) + 
 (Number(expenses.transport) || 0) + 
 (Number(expenses.dependents) || 0);

 const goal = totalMonthlyExpenses * Number(targetMonths);
 const gap = Math.max(0, goal - (Number(currentSavings) || 0));
 const monthsToGoal = (Number(monthlyContribution) || 0) > 0 ? gap / Number(monthlyContribution) : 0;
 
 const handleReset = () => {
 setExpenses({ housing:"", food:"", utilities:"", debt:"", insurance:"", transport:"", dependents:""});
 setTargetMonths("6");
 setCurrentSavings("");
 setMonthlyContribution("");
 toast.success("Reset successful");
 };

 const getSummary = () => {
 return"Emergency Fund Goal: $"+ goal.toFixed(2) +"\n"+
"Current Savings: $"+ (Number(currentSavings) || 0).toFixed(2) +"\n"+
"Remaining Gap: $"+ gap.toFixed(2) +"\n"+
"Est. Time to Goal:"+ (monthsToGoal > 0 ? monthsToGoal.toFixed(1) +"months":"N/A");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Shield}
 title="Emergency Fund Calculator"
 description="Calculate your required safety net and plan your savings."
 actions={
 <React.Fragment>
 <ResetButton onClick={handleReset} label="Reset"/>
 </React.Fragment>
 }
 />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Inputs</CardTitle>
 <CardDescription>Monthly Essential Expenses</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Housing</Label>
 <Input type="number"value={expenses.housing} onChange={e => setExpenses({...expenses, housing: e.target.value})} />
 </div>
 <div className="space-y-2">
 <Label>Food</Label>
 <Input type="number"value={expenses.food} onChange={e => setExpenses({...expenses, food: e.target.value})} />
 </div>
 <div className="space-y-2">
 <Label>Utilities</Label>
 <Input type="number"value={expenses.utilities} onChange={e => setExpenses({...expenses, utilities: e.target.value})} />
 </div>
 <div className="space-y-2">
 <Label>Debt / Loans</Label>
 <Input type="number"value={expenses.debt} onChange={e => setExpenses({...expenses, debt: e.target.value})} />
 </div>
 <div className="space-y-2">
 <Label>Insurance</Label>
 <Input type="number"value={expenses.insurance} onChange={e => setExpenses({...expenses, insurance: e.target.value})} />
 </div>
 <div className="space-y-2">
 <Label>Transportation</Label>
 <Input type="number"value={expenses.transport} onChange={e => setExpenses({...expenses, transport: e.target.value})} />
 </div>
 </div>
 
 <Separator />
 
 <div className="space-y-2">
 <Label>Target Safety Buffer (Months)</Label>
 <Select value={targetMonths} onValueChange={setTargetMonths}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="3">3 Months (Minimum)</SelectItem>
 <SelectItem value="6">6 Months (Recommended)</SelectItem>
 <SelectItem value="9">9 Months (Conservative)</SelectItem>
 <SelectItem value="12">12 Months (Maximum)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>Current Savings</Label>
 <Input type="number"value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Monthly Savings Contribution</Label>
 <Input type="number"value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} />
 </div>

 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Results</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2 text-center">
 <h3 className="text-2xl font-bold text-primary">${goal.toFixed(2)}</h3>
 <p className="text-muted-foreground">Total Emergency Fund Goal</p>
 </div>
 
 <Separator />
 
 <div className="space-y-2">
 <div className="flex justify-between">
 <span>Total Monthly Expenses:</span>
 <span className="font-semibold">${totalMonthlyExpenses.toFixed(2)}</span>
 </div>
 <div className="flex justify-between">
 <span>Current Savings:</span>
 <span className="font-semibold">${(Number(currentSavings) || 0).toFixed(2)}</span>
 </div>
 <div className="flex justify-between">
 <span>Remaining Gap:</span>
 <span className="font-semibold">${gap.toFixed(2)}</span>
 </div>
 <div className="flex justify-between text-primary">
 <span>Est. Time to Goal:</span>
 <span className="font-semibold">{monthsToGoal > 0 ? monthsToGoal.toFixed(1) +"months":"Need contribution"}</span>
 </div>
 </div>
 
 <CopyButton getText={getSummary} label="Copy Summary"/>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
