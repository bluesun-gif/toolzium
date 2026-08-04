"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, Calculator, FileText, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function PaycheckCalculatorClient() {
  const [grossPay, setGrossPay] = useState<string>("50000");
  const [payPeriod, setPayPeriod] = useState<string>("annual");
  const [stateTaxRate, setStateTaxRate] = useState<string>("5");
  const [preTax401k, setPreTax401k] = useState<string>("0");
  const [healthInsurance, setHealthInsurance] = useState<string>("0");
  
  const periodsPerYear = useMemo(() => {
    switch (payPeriod) {
      case "annual": return 1;
      case "monthly": return 12;
      case "biweekly": return 26;
      case "weekly": return 52;
      default: return 1;
    }
  }, [payPeriod]);

  const results = useMemo(() => {
    const gross = parseFloat(grossPay) || 0;
    const grossAnnual = gross * (payPeriod === "annual" ? 1 : periodsPerYear);
    const periodGross = grossAnnual / periodsPerYear;
    
    const preTaxDed = (parseFloat(preTax401k) || 0) + (parseFloat(healthInsurance) || 0);
    const taxablePeriod = Math.max(0, periodGross - preTaxDed);
    
    // Simplified federal tax (flat 12% for demo)
    const fedTax = taxablePeriod * 0.12;
    const stateTax = taxablePeriod * ((parseFloat(stateTaxRate) || 0) / 100);
    
    const socialSecurity = taxablePeriod * 0.062;
    const medicare = taxablePeriod * 0.0145;
    
    const totalTaxes = fedTax + stateTax + socialSecurity + medicare;
    const netPay = taxablePeriod - totalTaxes;
    
    return {
      periodGross,
      preTaxDed,
      taxablePeriod,
      fedTax,
      stateTax,
      socialSecurity,
      medicare,
      totalTaxes,
      netPay
    };
  }, [grossPay, payPeriod, stateTaxRate, preTax401k, healthInsurance, periodsPerYear]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={DollarSign}
        title="Paycheck Calculator"
        description="Calculate take-home pay from gross salary with taxes and deductions."
        actions={<ResetButton onClick={() => {
          setGrossPay("50000");
          setPayPeriod("annual");
          setStateTaxRate("5");
          setPreTax401k("0");
          setHealthInsurance("0");
        }} label="Reset" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Income & Deductions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gross Pay</Label>
                <Input type="number" value={grossPay} onChange={e => setGrossPay(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Pay Period</Label>
                <Select value={payPeriod} onValueChange={setPayPeriod}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            <h4 className="text-sm font-medium">Pre-Tax Deductions (per period)</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>401(k) / Retirement ($)</Label>
                <Input type="number" value={preTax401k} onChange={e => setPreTax401k(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Health Insurance ($)</Label>
                <Input type="number" value={healthInsurance} onChange={e => setHealthInsurance(e.target.value)} />
              </div>
            </div>

            <Separator />
            <div className="space-y-2">
              <Label>State Tax Rate (%)</Label>
              <Input type="number" value={stateTaxRate} onChange={e => setStateTaxRate(e.target.value)} />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Paycheck Breakdown</CardTitle>
            <CardDescription>Per {payPeriod} period</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between font-medium">
              <span>Gross Pay</span>
              <span>{formatCurrency(results.periodGross)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>Pre-Tax Deductions</span>
              <span>-{formatCurrency(results.preTaxDed)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>Federal Tax (Est.)</span>
              <span>-{formatCurrency(results.fedTax)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>State Tax</span>
              <span>-{formatCurrency(results.stateTax)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>Social Security (6.2%)</span>
              <span>-{formatCurrency(results.socialSecurity)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>Medicare (1.45%)</span>
              <span>-{formatCurrency(results.medicare)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg text-primary">
              <span>Net Pay</span>
              <span>{formatCurrency(results.netPay)}</span>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
