"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, Calendar, Table as TableIcon, Download } from "lucide-react";
import { toast } from "react-hot-toast";

type ScheduleRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export function LoanAmortizationClient() {
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("5");
  const [termYears, setTermYears] = useState("5");
  
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [summary, setSummary] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(termYears) * 12;
    
    if (!p || !r || !n) return;
    
    const monthlyPayment = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    
    let balance = p;
    let totalInterest = 0;
    const newSchedule: ScheduleRow[] = [];
    
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = monthlyPayment - interest;
      balance = balance - principal;
      if (balance < 0) balance = 0;
      
      totalInterest += interest;
      
      newSchedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principal,
        interest: interest,
        balance: balance
      });
    }
    
    setSchedule(newSchedule);
    setSummary({
      payment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: (p + totalInterest).toFixed(2)
    });
  };

  const downloadCSV = () => {
    if (schedule.length === 0) return;
    const header = "Month,Payment,Principal,Interest,Balance\n";
    const rows = schedule.map(r => [r.month, r.payment.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2), r.balance.toFixed(2)].join(",")).join("\n");
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "amortization_schedule.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader icon={DollarSign} title="Loan Amortization Calculator" description="Detailed loan repayment amortization schedule." actions={
        <React.Fragment>
          <ResetButton onClick={() => { setSchedule([]); setSummary(null); }} label="Clear" />
          <ActionButton onClick={downloadCSV} icon={Download} label="Export CSV" />
        </React.Fragment>
      } />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Loan Amount ($)</Label>
              <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Annual Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Term (Years)</Label>
              <Input type="number" value={termYears} onChange={e => setTermYears(e.target.value)} />
            </div>
            <Button onClick={calculate} className="w-full">Calculate Schedule</Button>
          </CardContent>
        </GlassCard>
        
        <div className="md:col-span-2 space-y-4">
          {summary && (
            <GlassCard>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Monthly Payment</Label>
                  <div className="text-xl font-bold">${summary.payment}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Total Interest</Label>
                  <div className="text-xl font-bold">${summary.totalInterest}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Total Cost</Label>
                  <div className="text-xl font-bold">${summary.totalCost}</div>
                </div>
              </CardContent>
            </GlassCard>
          )}
          
          {schedule.length > 0 && (
            <GlassCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TableIcon className="w-5 h-5" /> Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-[500px] overflow-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-muted text-muted-foreground sticky top-0">
                      <tr>
                        <th className="px-4 py-3">Month</th>
                        <th className="px-4 py-3">Payment</th>
                        <th className="px-4 py-3">Principal</th>
                        <th className="px-4 py-3">Interest</th>
                        <th className="px-4 py-3">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((row) => (
                        <tr key={row.month} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="px-4 py-2">{row.month}</td>
                          <td className="px-4 py-2">${row.payment.toFixed(2)}</td>
                          <td className="px-4 py-2">${row.principal.toFixed(2)}</td>
                          <td className="px-4 py-2">${row.interest.toFixed(2)}</td>
                          <td className="px-4 py-2">${row.balance.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
