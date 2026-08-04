"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calculator, Calendar, Copy } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";

export function LoanAmortizationClient() {
  const [loanAmount, setLoanAmount] = useState("250000");
  const [interestRate, setInterestRate] = useState("5.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [termUnit, setTermUnit] = useState("years");
  const [extraPayment, setExtraPayment] = useState("0");

  const results = useMemo(() => {
    const P = parseFloat(loanAmount) || 0;
    const r = parseFloat(interestRate) || 0;
    const t = parseFloat(loanTerm) || 0;
    const extra = parseFloat(extraPayment) || 0;

    if (P <= 0 || t <= 0) {
      return null;
    }

    const totalMonths = termUnit === "years" ? t * 12 : t;
    const monthlyRate = r / 100 / 12;

    let baseMonthlyPayment = 0;
    if (monthlyRate === 0) {
      baseMonthlyPayment = P / totalMonths;
    } else {
      baseMonthlyPayment = (P * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const actualMonthlyPayment = baseMonthlyPayment + extra;

    let balance = P;
    let totalInterest = 0;
    let totalPaid = 0;
    const schedule = [];

    let currentMonth = 0;

    while (balance > 0.01 && currentMonth < totalMonths * 2) { // cap at 2x term to prevent infinite loop
      currentMonth++;
      
      const interestPayment = balance * monthlyRate;
      let principalPayment = actualMonthlyPayment - interestPayment;

      if (balance < principalPayment) {
        principalPayment = balance;
      }

      balance -= principalPayment;
      if (balance < 0) balance = 0;

      totalInterest += interestPayment;
      const paymentAmount = principalPayment + interestPayment;
      totalPaid += paymentAmount;

      schedule.push({
        month: currentMonth,
        payment: paymentAmount,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance,
      });
      
      if (balance <= 0) break;
    }

    const payoffYears = Math.floor(currentMonth / 12);
    const payoffMonths = currentMonth % 12;

    let scheduleText = "Month\tPayment\tPrincipal\tInterest\tBalance\n";
    schedule.forEach(row => {
      scheduleText += row.month + "\t$" + row.payment.toFixed(2) + "\t$" + row.principal.toFixed(2) + "\t$" + row.interest.toFixed(2) + "\t$" + row.balance.toFixed(2) + "\n";
    });

    return {
      baseMonthlyPayment,
      actualMonthlyPayment,
      totalInterest,
      totalPaid,
      monthsSaved: totalMonths - currentMonth,
      payoffTime: payoffYears + " years, " + payoffMonths + " months",
      schedule,
      scheduleText
    };
  }, [loanAmount, interestRate, loanTerm, termUnit, extraPayment]);

  const handleReset = () => {
    setLoanAmount("250000");
    setInterestRate("5.5");
    setLoanTerm("30");
    setTermUnit("years");
    setExtraPayment("0");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Calculator}
        title="Loan Amortization Schedule"
        description="Calculate your monthly payments, view the full amortization table, and see how extra payments save you money."
        actions={
          <ResetButton onClick={handleReset} label="Reset" />
        }
      />

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Loan Amount ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    className="pl-9"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Interest Rate (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Loan Term</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={termUnit} onValueChange={setTermUnit}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="years">Years</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Extra Monthly Payment ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    className="pl-9"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Optional: Amount to pay towards principal each month.</p>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className="md:col-span-8 space-y-6">
          <GlassCard className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Monthly Payment</p>
                      <p className="text-4xl font-bold text-primary">
                        ${results.baseMonthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    {parseFloat(extraPayment) > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground">With Extra Payment</p>
                        <p className="text-lg font-semibold">
                          ${results.actualMonthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Total Interest Paid</p>
                      <p className="text-2xl font-semibold">
                        ${results.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Total Cost of Loan</p>
                      <p className="text-xl font-medium">
                        ${results.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Payoff Time</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{results.payoffTime}</span>
                      </div>
                      {results.monthsSaved > 0 && (
                        <p className="text-sm text-emerald-600 font-medium mt-1">
                          Saved {results.monthsSaved} months early!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  Enter valid loan details to see summary.
                </div>
              )}
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Amortization Schedule</CardTitle>
                <CardDescription>Monthly breakdown of principal and interest.</CardDescription>
              </div>
              {results && (
                <CopyButton getText={() => results.scheduleText} label="Copy Table" />
              )}
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="overflow-auto max-h-[500px] border rounded-md">
                  <table className="w-full text-sm text-left relative">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted sticky top-0 shadow-sm">
                      <tr>
                        <th className="px-4 py-3">Month</th>
                        <th className="px-4 py-3">Payment</th>
                        <th className="px-4 py-3">Principal</th>
                        <th className="px-4 py-3">Interest</th>
                        <th className="px-4 py-3">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.schedule.map((row) => (
                        <tr key={row.month} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="px-4 py-2 font-medium">{row.month}</td>
                          <td className="px-4 py-2">${row.payment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className="px-4 py-2">${row.principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className="px-4 py-2">${row.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className="px-4 py-2">${row.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  Schedule will appear here.
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
