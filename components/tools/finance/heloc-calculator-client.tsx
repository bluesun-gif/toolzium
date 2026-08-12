"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { DollarSign, Calculator, Home, Copy } from"lucide-react";
import toast from"react-hot-toast";

export function HelocCalculatorClient() {
 const [creditLimit, setCreditLimit] = useState("100000");
 const [drawAmount, setDrawAmount] = useState("50000");
 const [interestRate, setInterestRate] = useState("7.5");
 const [drawPeriod, setDrawPeriod] = useState("10");
 const [repayPeriod, setRepayPeriod] = useState("20");

 const [interestPayment, setInterestPayment] = useState("0");
 const [repayPayment, setRepayPayment] = useState("0");
 const [totalInterest, setTotalInterest] = useState("0");
 const [totalPayment, setTotalPayment] = useState("0");

 const calculate = () => {
 const cl = parseFloat(creditLimit);
 const draw = parseFloat(drawAmount);
 const rate = parseFloat(interestRate);
 const dp = parseInt(drawPeriod);
 const rp = parseInt(repayPeriod);

 if (isNaN(cl) || isNaN(draw) || isNaN(rate) || isNaN(dp) || isNaN(rp)) {
 toast.error("Please enter valid numbers");
 return;
 }

 if (draw > cl) {
 toast.error("Draw amount cannot exceed credit limit");
 return;
 }

 const monthlyRate = (rate / 100) / 12;
 const drawInterestMonthly = draw * monthlyRate;

 const repayMonths = rp * 12;
 const repayMonthly = (monthlyRate * draw) / (1 - Math.pow(1 + monthlyRate, -repayMonths));

 const totalDrawInterest = drawInterestMonthly * (dp * 12);
 const totalRepayAmount = repayMonthly * repayMonths;
 const totalRepayInterest = totalRepayAmount - draw;
 const totInt = totalDrawInterest + totalRepayInterest;

 setInterestPayment(drawInterestMonthly.toFixed(2));
 setRepayPayment(repayMonthly.toFixed(2));
 setTotalInterest(totInt.toFixed(2));
 setTotalPayment((draw + totInt).toFixed(2));
 };

 const handleReset = () => {
 setCreditLimit("100000");
 setDrawAmount("50000");
 setInterestRate("7.5");
 setDrawPeriod("10");
 setRepayPeriod("20");
 setInterestPayment("0");
 setRepayPayment("0");
 setTotalInterest("0");
 setTotalPayment("0");
 };

 const report ="Draw Phase Monthly (Interest-Only): $"+ interestPayment +"\n"+
"Repayment Phase Monthly: $"+ repayPayment +"\n"+
"Total Interest Paid: $"+ totalInterest +"\n"+
"Total Amount Paid: $"+ totalPayment;

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Home}
 title="HELOC Payment Calculator"
 description="Calculate draw period and repayment period monthly payments for HELOC."
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Loan Details</CardTitle>
 <CardDescription>Enter your HELOC terms</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Credit Limit ($)</Label>
 <Input type="number"min="0"value={creditLimit} onChange={(e) => setCreditLimit(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Draw Amount Used ($)</Label>
 <Input type="number"min="0"value={drawAmount} onChange={(e) => setDrawAmount(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Interest Rate (APY %)</Label>
 <Input type="number"min="0"step="0.1"value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Draw Period</Label>
 <Select value={drawPeriod} onValueChange={setDrawPeriod}>
 <SelectTrigger><SelectValue placeholder="Draw Phase"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="5">5 Years</SelectItem>
 <SelectItem value="10">10 Years</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Repayment Period</Label>
 <Select value={repayPeriod} onValueChange={setRepayPeriod}>
 <SelectTrigger><SelectValue placeholder="Repayment Phase"/></SelectTrigger>
 <SelectContent>
 <SelectItem value="10">10 Years</SelectItem>
 <SelectItem value="15">15 Years</SelectItem>
 <SelectItem value="20">20 Years</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <ActionButton onClick={calculate} icon={Calculator} label="Calculate Payments"/>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Payment Breakdown</CardTitle>
 <CardDescription>Estimated costs over time</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-secondary/50 p-4 rounded-xl text-center">
 <div className="text-2xl font-bold text-primary">{"$"+ interestPayment}</div>
 <div className="text-sm text-muted-foreground">Draw Phase Monthly<br/>(Interest Only)</div>
 </div>
 <div className="bg-secondary/50 p-4 rounded-xl text-center">
 <div className="text-2xl font-bold text-primary">{"$"+ repayPayment}</div>
 <div className="text-sm text-muted-foreground">Repayment Phase Monthly<br/>(Prin + Int)</div>
 </div>
 </div>

 <Separator />

 <div className="space-y-2">
 <div className="flex justify-between items-center bg-secondary/30 p-3 rounded-lg">
 <span className="font-medium">Total Interest Paid</span>
 <span className="font-bold">{"$"+ totalInterest}</span>
 </div>
 <div className="flex justify-between items-center bg-secondary/30 p-3 rounded-lg">
 <span className="font-medium">Total Amount Paid</span>
 <span className="font-bold">{"$"+ totalPayment}</span>
 </div>
 </div>

 <CopyButton getText={() => report} label="Copy Report"/>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
