"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, AlertTriangle, Scale, Calculator } from "lucide-react";
import { toast } from "react-hot-toast";

export function ExchangeFeesClient() {
  const [amount, setAmount] = useState("1000");
  const [midMarketRate, setMidMarketRate] = useState("1.10");
  const [offeredRate, setOfferedRate] = useState("1.05");
  const [fixedFee, setFixedFee] = useState("5.00");

  const [result, setResult] = useState<{
    markupPercent: number;
    markupLost: number;
    totalLost: number;
    effectiveRate: number;
  } | null>(null);

  const calculate = () => {
    const amt = parseFloat(amount);
    const mid = parseFloat(midMarketRate);
    const off = parseFloat(offeredRate);
    const fee = parseFloat(fixedFee) || 0;

    if (isNaN(amt) || isNaN(mid) || isNaN(off)) {
      toast.error("Please enter valid numbers.");
      return;
    }

    const actualReceived = (amt * off) - fee;
    
    const markupLost = amt * (mid - off);
    const markupPercent = ((mid - off) / mid) * 100;
    const totalLost = markupLost + fee;
    
    let effectiveRate = 0;
    if (amt > 0) {
      effectiveRate = actualReceived / amt;
    }

    setResult({ markupPercent, markupLost, totalLost, effectiveRate });
  };

  const handleReset = () => {
    setAmount("1000");
    setMidMarketRate("1.10");
    setOfferedRate("1.05");
    setFixedFee("5.00");
    setResult(null);
    toast.success("Reset successful");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={DollarSign}
        title="Currency Exchange Fee Calculator"
        description="Uncover hidden exchange rate markups and total foreign transaction fees."
        actions={
          <div className="flex gap-2">
            <ResetButton onClick={handleReset} label="Reset" />
          </div>
        }
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <CardHeader>
            <CardTitle>Conversion Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Amount to Convert (Base Currency)</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>True Mid-Market Rate (from Google/Xe)</Label>
              <Input type="number" step="0.0001" value={midMarketRate} onChange={(e) => setMidMarketRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Rate Offered by Exchange/ATM</Label>
              <Input type="number" step="0.0001" value={offeredRate} onChange={(e) => setOfferedRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Fixed Transaction Fee (Target Currency)</Label>
              <Input type="number" value={fixedFee} onChange={(e) => setFixedFee(e.target.value)} />
            </div>
            <Button className="w-full mt-4" onClick={calculate}><Calculator className="w-4 h-4 mr-2" /> Calculate Fees</Button>
          </CardContent>
        </GlassCard>

        {result && (
          <GlassCard>
            <CardHeader>
              <CardTitle>Fee Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-secondary/20 rounded-lg border">
                <p className="text-sm text-muted-foreground mb-2">Total Value Lost to Fees</p>
                <div className="text-4xl font-bold text-red-500">${result.totalLost.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">in target currency</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Hidden Markup
                  </span>
                  <span className="text-sm font-bold">{result.markupPercent.toFixed(2)}% (${result.markupLost.toFixed(2)})</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm font-medium">Fixed Fee</span>
                  <span className="text-sm font-bold">${parseFloat(fixedFee || "0").toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Scale className="w-4 h-4 text-blue-500" /> Effective Exchange Rate
                  </span>
                  <span className="text-sm font-bold">{result.effectiveRate.toFixed(4)}</span>
                </div>
              </div>

              <div className="bg-blue-500/10 p-4 rounded-md border border-blue-500/20 text-sm">
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Recommendations:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Avoid airport exchange booths (often 10-15% markup).</li>
                  <li>Always choose "pay in local currency" on card terminals, NOT your home currency.</li>
                  <li>Use travel cards with 0% foreign transaction fees and mid-market rates.</li>
                </ul>
              </div>
            </CardContent>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
