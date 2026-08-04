"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, BarChart3, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const taxData = {
  US: {
    Single: [
      { max: 11600, rate: 0.1 },
      { max: 47150, rate: 0.12 },
      { max: 100525, rate: 0.22 },
      { max: 191950, rate: 0.24 },
      { max: 243725, rate: 0.32 },
      { max: 609350, rate: 0.35 },
      { max: Infinity, rate: 0.37 },
    ],
    Married: [
      { max: 23200, rate: 0.1 },
      { max: 94300, rate: 0.12 },
      { max: 201050, rate: 0.22 },
      { max: 383900, rate: 0.24 },
      { max: 487450, rate: 0.32 },
      { max: 731200, rate: 0.35 },
      { max: Infinity, rate: 0.37 },
    ],
    HeadOfHousehold: [
      { max: 16550, rate: 0.1 },
      { max: 63100, rate: 0.12 },
      { max: 100500, rate: 0.22 },
      { max: 191950, rate: 0.24 },
      { max: 243700, rate: 0.32 },
      { max: 609350, rate: 0.35 },
      { max: Infinity, rate: 0.37 },
    ]
  },
  UK: {
    Standard: [
      { max: 12570, rate: 0 },
      { max: 50270, rate: 0.2 },
      { max: 125140, rate: 0.4 },
      { max: Infinity, rate: 0.45 },
    ]
  },
  Canada: {
    Standard: [
      { max: 55867, rate: 0.15 },
      { max: 111733, rate: 0.205 },
      { max: 173205, rate: 0.26 },
      { max: 246752, rate: 0.29 },
      { max: Infinity, rate: 0.33 },
    ]
  },
  Australia: {
    Standard: [
      { max: 18200, rate: 0 },
      { max: 45000, rate: 0.19 },
      { max: 135000, rate: 0.30 },
      { max: 190000, rate: 0.37 },
      { max: Infinity, rate: 0.45 },
    ]
  },
  India: {
    Standard: [
      { max: 300000, rate: 0 },
      { max: 600000, rate: 0.05 },
      { max: 900000, rate: 0.10 },
      { max: 1200000, rate: 0.15 },
      { max: 1500000, rate: 0.20 },
      { max: Infinity, rate: 0.30 },
    ]
  }
};

export function TaxBracketClient() {
  const [country, setCountry] = useState("US");
  const [status, setStatus] = useState("Single");
  const [income, setIncome] = useState("75000");

  const brackets = (taxData[country as keyof typeof taxData] as any)?.[status] || (taxData[country as keyof typeof taxData] as any)?.Standard || taxData.US.Single;

  let remaining = Number(income) || 0;
  let previousMax = 0;
  let totalTax = 0;
  const breakdown = [];

  for (const b of brackets) {
    if (remaining <= 0) break;
    const range = b.max - previousMax;
    const taxableInBracket = Math.min(remaining, range);
    const taxInBracket = taxableInBracket * b.rate;
    totalTax += taxInBracket;
    breakdown.push({ rate: b.rate, amount: taxableInBracket, tax: taxInBracket });
    remaining -= taxableInBracket;
    previousMax = b.max;
  }

  const effectiveRate = Number(income) > 0 ? (totalTax / Number(income)) * 100 : 0;
  const takeHome = Number(income) - totalTax;

  const currencySymbols: Record<string, string> = { US: "$", UK: "£", Canada: "$", Australia: "$", India: "₹" };
  const symbol = currencySymbols[country] || "$";

  return (
    <div className="space-y-6">
      <ToolPageHeader icon={Calculator} title="Tax Bracket Calculator" description="Estimate your income tax by brackets and see your effective tax rate." actions={<></>} />
      
      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <CardHeader>
            <CardTitle>Income Details</CardTitle>
            <CardDescription>Enter your gross income and filing details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Country</Label>
              <Select value={country} onValueChange={(v) => { setCountry(v); setStatus("Single"); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="India">India (New Regime)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {country === "US" && (
              <div className="space-y-2">
                <Label>Filing Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married Filing Jointly</SelectItem>
                    <SelectItem value="HeadOfHousehold">Head of Household</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label>Gross Income</Label>
              <div className="relative">
                <div className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground flex items-center justify-center font-medium">{symbol}</div>
                <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="pl-9" />
              </div>
            </div>
          </CardContent>
        </GlassCard>
        
        <GlassCard>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Estimated tax breakdown for 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Total Tax</Label>
                <div className="text-2xl font-bold text-destructive">{symbol}{totalTax.toFixed(2)}</div>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Take Home Pay</Label>
                <div className="text-2xl font-bold text-primary">{symbol}{takeHome.toFixed(2)}</div>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">Effective Rate</Label>
                <div className="text-2xl font-bold">{effectiveRate.toFixed(2)}%</div>
              </div>
            </div>
            
            <Separator />
            <div className="space-y-3">
              <Label className="flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Bracket Breakdown</Label>
              <div className="space-y-2">
                {breakdown.map((b, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
                    <div className="font-medium">{(b.rate * 100).toFixed(0)}% Bracket</div>
                    <div className="text-right">
                      <div className="font-semibold text-destructive">{symbol}{b.tax.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">on {symbol}{b.amount.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 text-xs text-muted-foreground bg-primary/5 p-3 rounded-md">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <p>For estimation purposes only. Represents federal/national income tax brackets. Does not include state/local taxes, national insurance, medicare, or specific deductions/credits.</p>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
