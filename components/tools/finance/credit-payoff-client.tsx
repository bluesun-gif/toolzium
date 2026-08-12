"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Label } from"@/components/ui/label";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import { CreditCard, DollarSign, AlertTriangle } from"lucide-react";

export function CreditPayoffClient() {
 const [balance, setBalance] = useState("5000");
 const [apr, setApr] = useState("18.9");
 const [mode, setMode] = useState("fixed_payment");
 const [monthlyPayment, setMonthlyPayment] = useState("200");
 const [targetMonths, setTargetMonths] = useState("24");

 const calculatePayoff = () => {
 const b = parseFloat(balance);
 const r = parseFloat(apr) / 100 / 12; // monthly rate
 
 if (isNaN(b) || isNaN(r) || b <= 0) return { months: 0, interest: 0, requiredPayment: 0 };

 if (mode ==="fixed_payment") {
 const p = parseFloat(monthlyPayment);
 if (isNaN(p) || p <= (b * r)) return { months: -1, interest: 0, requiredPayment: p }; // Payment too low

 const months = Math.ceil(-Math.log(1 - b * r / p) / Math.log(1 + r));
 const totalPaid = p * months;
 const interest = totalPaid - b;
 return { months, interest, requiredPayment: p };
 } else {
 const m = parseInt(targetMonths);
 if (isNaN(m) || m <= 0) return { months: 0, interest: 0, requiredPayment: 0 };
 
 const p = b * (r * Math.pow(1 + r, m)) / (Math.pow(1 + r, m) - 1);
 const totalPaid = p * m;
 const interest = totalPaid - b;
 return { months: m, interest, requiredPayment: p };
 }
 };

 const results = calculatePayoff();
 const formatMoney = (n: number) =>"$"+ n.toFixed(2);

 const handleReset = () => {
 setBalance("5000");
 setApr("18.9");
 setMonthlyPayment("200");
 setTargetMonths("24");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader 
 icon={CreditCard} 
 title="Credit Card Payoff Calculator"
 description="Calculate time and interest required to pay off your credit card debt."
 actions={
 <ResetButton onClick={handleReset} label="Reset"/>
 } 
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Debt Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Current Balance ($)</Label>
 <Input type="number"value={balance} onChange={(e) => setBalance(e.target.value)} min="1"/>
 </div>
 <div className="space-y-2">
 <Label>Interest Rate (APR %)</Label>
 <Input type="number"value={apr} onChange={(e) => setApr(e.target.value)} min="0"step="0.1"/>
 </div>
 
 <Separator />
 
 <div className="space-y-2">
 <Label>Calculation Mode</Label>
 <Select value={mode} onValueChange={setMode}>
 <SelectTrigger>
 <SelectValue placeholder="Select mode"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="fixed_payment">I have a fixed monthly payment</SelectItem>
 <SelectItem value="target_time">I want to pay it off in X months</SelectItem>
 </SelectContent>
 </Select>
 </div>

 {mode ==="fixed_payment"? (
 <div className="space-y-2">
 <Label>Monthly Payment ($)</Label>
 <Input type="number"value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} min="1"/>
 {results.months === -1 && (
 <p className="text-sm text-destructive flex items-center mt-1">
 <AlertTriangle className="w-4 h-4 mr-1"/> Payment must be greater than monthly interest.
 </p>
 )}
 </div>
 ) : (
 <div className="space-y-2">
 <Label>Target Payoff Time (months)</Label>
 <Input type="number"value={targetMonths} onChange={(e) => setTargetMonths(e.target.value)} min="1"/>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Payoff Summary</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 {results.months > 0 ? (
 <>
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-muted rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Time to Payoff</div>
 <div className="text-2xl font-bold text-primary">{results.months} months</div>
 <div className="text-xs text-muted-foreground mt-1">({(results.months / 12).toFixed(1)} years)</div>
 </div>
 <div className="p-4 bg-muted rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
 <div className="text-2xl font-bold text-destructive">{formatMoney(results.interest)}</div>
 </div>
 </div>
 
 <Separator />
 
 <div className="space-y-3">
 <div className="flex justify-between items-center">
 <span className="text-muted-foreground">Monthly Payment</span>
 <span className="font-semibold">{formatMoney(results.requiredPayment)}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-muted-foreground">Total Principal Paid</span>
 <span className="font-semibold">{formatMoney(parseFloat(balance) || 0)}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-muted-foreground">Total Amount Paid</span>
 <span className="font-semibold">{formatMoney((parseFloat(balance) || 0) + results.interest)}</span>
 </div>
 </div>
 
 {mode ==="fixed_payment"&& parseFloat(balance) > 0 && parseFloat(monthlyPayment) > 0 && (
 <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md text-sm text-amber-600 dark:text-amber-400 flex items-start">
 <AlertTriangle className="w-5 h-5 mr-2 shrink-0 mt-0.5"/>
 <div>
 Minimum payments usually take much longer and cost significantly more in interest. Paying just a little extra each month can save you hundreds!
 </div>
 </div>
 )}
 </>
 ) : results.months === -1 ? (
 <div className="flex flex-col items-center justify-center h-full text-center p-6 text-muted-foreground">
 <AlertTriangle className="w-12 h-12 text-destructive mb-4"/>
 <p>Your monthly payment is lower than the interest being added. You will never pay off this debt with the current payment.</p>
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
 <DollarSign className="w-12 h-12 mb-2 opacity-20"/>
 <p>Enter valid numbers to see your payoff summary</p>
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
