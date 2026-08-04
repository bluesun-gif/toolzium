"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, Calculator, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function DtiCalculatorClient() {
  const [income, setIncome] = useState("5000");
  const [housing, setHousing] = useState("1500");
  const [creditCards, setCreditCards] = useState("200");
  const [autoLoans, setAutoLoans] = useState("300");
  const [studentLoans, setStudentLoans] = useState("150");
  const [otherDebt, setOtherDebt] = useState("0");

  const calculateDTI = () => {
    const grossIncome = parseFloat(income) || 0;
    const housingDebt = parseFloat(housing) || 0;
    const cardsDebt = parseFloat(creditCards) || 0;
    const autoDebt = parseFloat(autoLoans) || 0;
    const studentDebt = parseFloat(studentLoans) || 0;
    const other = parseFloat(otherDebt) || 0;

    if (grossIncome <= 0) return null;

    const totalDebt = housingDebt + cardsDebt + autoDebt + studentDebt + other;
    
    // Front-end: just housing
    const frontEndDti = (housingDebt / grossIncome) * 100;
    // Back-end: all debt
    const backEndDti = (totalDebt / grossIncome) * 100;
    
    let status = "High Risk";
    let statusClass = "text-destructive";
    if (backEndDti <= 36) {
      status = "Ideal";
      statusClass = "text-green-500";
    } else if (backEndDti <= 43) {
      status = "Acceptable";
      statusClass = "text-yellow-500";
    }

    // Maximum allowable housing for 36% rule (total debt shouldn't exceed 36% of income)
    const otherDebtOnly = cardsDebt + autoDebt + studentDebt + other;
    const maxHousing36 = (grossIncome * 0.36) - otherDebtOnly;
    const maxHousing43 = (grossIncome * 0.43) - otherDebtOnly;

    return {
      totalDebt,
      frontEndDti: frontEndDti.toFixed(1),
      backEndDti: backEndDti.toFixed(1),
      status,
      statusClass,
      maxHousing36: Math.max(0, maxHousing36).toFixed(2),
      maxHousing43: Math.max(0, maxHousing43).toFixed(2),
    };
  };

  const results = calculateDTI();

  const handleReset = () => {
    setIncome("5000");
    setHousing("1500");
    setCreditCards("200");
    setAutoLoans("300");
    setStudentLoans("150");
    setOtherDebt("0");
  };

  const getResultsText = () => {
    if (!results) return "";
    return "Front-End DTI: " + results.frontEndDti + "%\nBack-End DTI: " + results.backEndDti + "%\nStatus: " + results.status;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Calculator}
        title="Debt-to-Income (DTI) Ratio Calculator"
        description="Calculate your DTI ratio for mortgage and loan eligibility."
        actions={
          <>
            <CopyButton getText={getResultsText} label="Copy Results" />
            <ResetButton onClick={handleReset} label="Reset" />
          </>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
            <CardDescription>Enter your monthly income and debts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Gross Monthly Income ($)</Label>
              <Input
                type="number"
                min="0"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            
            <Separator />
            <div className="text-sm font-semibold text-muted-foreground">Monthly Debts</div>
            
            <div className="space-y-2">
              <Label>Rent / Proposed Mortgage ($)</Label>
              <Input
                type="number"
                min="0"
                value={housing}
                onChange={(e) => setHousing(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Credit Card Min Payments ($)</Label>
              <Input
                type="number"
                min="0"
                value={creditCards}
                onChange={(e) => setCreditCards(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Auto Loan Payments ($)</Label>
              <Input
                type="number"
                min="0"
                value={autoLoans}
                onChange={(e) => setAutoLoans(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Student Loan Payments ($)</Label>
              <Input
                type="number"
                min="0"
                value={studentLoans}
                onChange={(e) => setStudentLoans(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Other Debt ($)</Label>
              <Input
                type="number"
                min="0"
                value={otherDebt}
                onChange={(e) => setOtherDebt(e.target.value)}
              />
            </div>
          </CardContent>
        </GlassCard>
        
        <GlassCard>
          <CardHeader>
            <CardTitle>DTI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className="text-center p-6 bg-primary/10 rounded-lg relative overflow-hidden">
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">
                    Back-End DTI Ratio
                  </div>
                  <div className={"text-5xl font-bold " + results.statusClass}>
                    {results.backEndDti}%
                  </div>
                  <div className="mt-2 text-sm font-medium">
                    Status: <span className={results.statusClass}>{results.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/20 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Front-End DTI</div>
                    <div className="text-xl font-semibold">{results.frontEndDti}%</div>
                    <div className="text-xs text-muted-foreground mt-1">Housing only</div>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Total Monthly Debt</div>
                    <div className="text-xl font-semibold">${results.totalDebt.toFixed(2)}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" /> 
                    Mortgage Eligibility Estimates
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    Based on your non-housing debts, here is the maximum mortgage payment you might qualify for:
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <span className="text-sm">Conservative (36% Limit)</span>
                    <span className="font-semibold text-green-600">${results.maxHousing36}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <span className="text-sm">Standard (43% Limit)</span>
                    <span className="font-semibold text-yellow-600">${results.maxHousing43}</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex items-center justify-center min-h-[200px] text-muted-foreground">
                Enter valid income to calculate DTI.
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
