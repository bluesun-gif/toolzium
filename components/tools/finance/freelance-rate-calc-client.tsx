"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { DollarSign, Clock, Briefcase } from "lucide-react";

export default function FreelanceRateCalcClient() {
  const [targetIncome, setTargetIncome] = useState<number>(85000);
  const [annualExpenses, setAnnualExpenses] = useState<number>(12000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);
  const [taxPercent, setTaxPercent] = useState<number>(25);

  const totalRequiredRevenue = (targetIncome + annualExpenses) / (1 - taxPercent / 100);
  const workingWeeks = 52 - vacationWeeks;
  const totalAnnualBillableHours = workingWeeks * billableHoursPerWeek;

  const minHourlyRate = totalAnnualBillableHours > 0 ? (totalRequiredRevenue / totalAnnualBillableHours).toFixed(2) : "0.00";
  const dayRate = (Number(minHourlyRate) * 8).toFixed(0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Briefcase}
        title="Freelance Hourly Rate & Project Pricing Calculator"
        description="Calculate your minimum required hourly rate, day rate, and project pricing based on target annual income, taxes, and overhead."
      />

      <GlassCard className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Target Annual Take-Home Income ($):</label>
            <Input
              type="number"
              value={targetIncome}
              onChange={(e) => setTargetIncome(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Annual Business Overhead / Expenses ($):</label>
            <Input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Billable Hours Per Week:</label>
            <Input
              type="number"
              value={billableHoursPerWeek}
              onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Vacation & Time Off (Weeks/Year):</label>
            <Input
              type="number"
              value={vacationWeeks}
              onChange={(e) => setVacationWeeks(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-semibold text-foreground">Estimated Tax Rate (%):</label>
            <Input
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(Number(e.target.value))}
              className="h-11 font-bold text-base"
            />
          </div>
        </div>
      </GlassCard>

      {/* Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-5 space-y-2 text-center border-emerald-500/30 bg-emerald-500/5">
          <div className="flex justify-center text-emerald-500">
            <Clock className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Min Hourly Rate</p>
          <p className="text-3xl font-extrabold text-emerald-500">${minHourlyRate}/hr</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 text-center border-blue-500/30 bg-blue-500/5">
          <div className="flex justify-center text-blue-500">
            <Briefcase className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended Day Rate</p>
          <p className="text-3xl font-extrabold text-blue-500">${dayRate}/day</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 text-center border-purple-500/30 bg-purple-500/5">
          <div className="flex justify-center text-purple-500">
            <DollarSign className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Gross Target</p>
          <p className="text-3xl font-extrabold text-purple-500">${Math.round(totalRequiredRevenue).toLocaleString()}</p>
        </GlassCard>
      </div>
    </div>
  );
}
