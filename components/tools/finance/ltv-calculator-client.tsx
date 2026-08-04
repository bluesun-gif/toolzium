"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { DollarSign, Calculator, Home, AlertTriangle, CheckCircle2 } from "lucide-react";

export function LtvCalculatorClient() {
  const [homeValue, setHomeValue] = useState("400000");
  const [primaryMortgage, setPrimaryMortgage] = useState("280000");
  const [secondMortgage, setSecondMortgage] = useState("0");

  const [ltv, setLtv] = useState(0);
  const [cltv, setCltv] = useState(0);
  const [equity, setEquity] = useState(0);
  const [maxCashOut, setMaxCashOut] = useState(0);
  const [pmiRisk, setPmiRisk] = useState(false);

  useEffect(() => {
    calculateLTV();
  }, [homeValue, primaryMortgage, secondMortgage]);

  const calculateLTV = () => {
    const value = parseFloat(homeValue) || 0;
    const mortgage1 = parseFloat(primaryMortgage) || 0;
    const mortgage2 = parseFloat(secondMortgage) || 0;

    if (value <= 0) {
      setLtv(0);
      setCltv(0);
      setEquity(0);
      setMaxCashOut(0);
      setPmiRisk(false);
      return;
    }

    const calculatedLtv = (mortgage1 / value) * 100;
    const calculatedCltv = ((mortgage1 + mortgage2) / value) * 100;
    
    setLtv(calculatedLtv);
    setCltv(calculatedCltv);
    
    const currentEquity = value - (mortgage1 + mortgage2);
    setEquity(Math.max(0, currentEquity));

    const maxLoans80Percent = value * 0.80;
    const cashOut = maxLoans80Percent - (mortgage1 + mortgage2);
    setMaxCashOut(Math.max(0, cashOut));

    setPmiRisk(calculatedCltv > 80);
  };

  const handleReset = () => {
    setHomeValue("400000");
    setPrimaryMortgage("280000");
    setSecondMortgage("0");
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };
  
  const getResultsText = () => {
    return "Home Value: " + formatCurrency(parseFloat(homeValue) || 0) + "\n" +
           "LTV: " + ltv.toFixed(2) + "%\n" +
           "CLTV: " + cltv.toFixed(2) + "%\n" +
           "Equity: " + formatCurrency(equity) + "\n" +
           "Max Cash-out (at 80% LTV): " + formatCurrency(maxCashOut);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Calculator}
        title="Loan-to-Value (LTV) Calculator"
        description="Calculate your LTV, CLTV, and available home equity for refinancing or HELOCs."
        actions={
          <>
            <ResetButton onClick={handleReset} label="Reset" />
            <CopyButton getText={getResultsText} label="Copy Results" />
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Enter your home value and current loan balances</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Home Appraised Value ($)</Label>
              <div className="relative">
                <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="number" min="0" value={homeValue} onChange={(e) => setHomeValue(e.target.value)} className="pl-9" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Primary Mortgage Balance ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="number" min="0" value={primaryMortgage} onChange={(e) => setPrimaryMortgage(e.target.value)} className="pl-9" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Second Mortgage / HELOC Balance ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="number" min="0" value={secondMortgage} onChange={(e) => setSecondMortgage(e.target.value)} className="pl-9" />
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">LTV Ratios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Loan-to-Value (LTV)</Label>
                  <span className="font-bold text-2xl">{ltv.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className={"h-full " + (ltv > 80 ? "bg-red-500" : "bg-primary")} style={{ width: Math.min(100, ltv) + "%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Combined LTV (CLTV)</Label>
                  <span className="font-bold text-xl">{cltv.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className={"h-full " + (cltv > 80 ? "bg-red-500" : "bg-primary")} style={{ width: Math.min(100, cltv) + "%" }}></div>
                </div>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Equity Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Current Dollar Equity</span>
                <span className="font-semibold text-lg text-green-600 dark:text-green-400">{formatCurrency(equity)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Max Cash-Out (at 80% LTV)</span>
                <span className="font-semibold text-lg">{formatCurrency(maxCashOut)}</span>
              </div>
              
              <div className={"mt-4 p-4 rounded-lg flex items-start gap-3 " + (pmiRisk ? "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200" : "bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200")}>
                {pmiRisk ? <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" /> : <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />}
                <div>
                  <h4 className="font-semibold">{pmiRisk ? "PMI Required" : "No PMI Required"}</h4>
                  <p className="text-sm opacity-90">
                    {pmiRisk 
                      ? "Your CLTV is above 80%. Lenders typically require Private Mortgage Insurance (PMI)." 
                      : "Your CLTV is 80% or below. You generally will not need Private Mortgage Insurance (PMI)."}
                  </p>
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
