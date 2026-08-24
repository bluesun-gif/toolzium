"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, DollarSign, Save, RotateCcw, Copy, RefreshCw, Layers } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const ALL_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL", "SGD", "NZD", "MXN", "HKD", "SEK", "KRW"
];

export default function TravelBudgetMatrixClient() {
  const [budget, setBudget] = useState("2500");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrencies, setTargetCurrencies] = useState<string[]>(["EUR", "JPY", "GBP", "AUD"]);
  const [rates, setRates] = useState<Record<string, number>>({
    USD: 1, EUR: 0.8547, GBP: 0.738, JPY: 147.2, AUD: 1.48, CAD: 1.34, CHF: 0.88, CNY: 7.15, INR: 86.8
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchLiveRates = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/fx/latest?base=USD");
      if (!res.ok) throw new Error("Failed to fetch rates");
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        toast.success("Loaded live central bank exchange rates!", { id: "travel-budget-rates" });
      }
    } catch {
      toast.error("Using cached central bank rates", { id: "travel-budget-rates" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveRates();
  }, [fetchLiveRates]);

  const toggleTarget = (curr: string) => {
    if (targetCurrencies.includes(curr)) {
      if (targetCurrencies.length <= 1) {
        toast.error("Keep at least 1 destination currency");
        return;
      }
      setTargetCurrencies(targetCurrencies.filter((c) => c !== curr));
    } else {
      if (targetCurrencies.length >= 6) {
        toast.error("You can select up to 6 destination currencies");
        return;
      }
      setTargetCurrencies([...targetCurrencies, curr]);
    }
  };

  const results = targetCurrencies.map((t) => {
    const baseRate = rates[baseCurrency] || 1;
    const targetRate = rates[t] || 1;
    const amountInUSD = parseFloat(budget || "0") / baseRate;
    const amountInTarget = amountInUSD * targetRate;
    return {
      currency: t,
      rate: (targetRate / baseRate).toFixed(4),
      total: amountInTarget,
      day7: amountInTarget / 7,
      day14: amountInTarget / 14,
      day30: amountInTarget / 30,
    };
  });

  const handleCopy = () => {
    let txt = `🌍 Multi-Country Travel Budget Breakdown (Base: ${budget} ${baseCurrency})\n\n`;
    results.forEach((r) => {
      txt += `${r.currency}: Total ${r.total.toFixed(2)} ${r.currency} | 7-Day: ${(r.total / 7).toFixed(2)}/day | 14-Day: ${(r.total / 14).toFixed(2)}/day | 30-Day: ${(r.total / 30).toFixed(2)}/day\n`;
    });
    navigator.clipboard.writeText(txt);
    toast.success("Budget matrix breakdown copied to clipboard!");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <ToolPageHeader
        title="Live Multi-Country Travel Budget Matrix"
        description="Calculate authentic purchasing power and daily vacation spending limits across international destinations with live exchange rates."
        icon={Globe}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Controls */}
        <GlassCard className="p-6 rounded-3xl border-border/80 space-y-5">
          <CardHeader className="p-0">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Budget Parameters</span>
              <Badge variant="outline" className="text-[11px] font-mono border-primary/40 text-primary">
                Live Rates
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Total Trip Budget</Label>
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 2500"
                className="h-10 rounded-xl font-mono text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Home Base Currency</Label>
              <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                <SelectTrigger className="h-10 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ALL_CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 pt-2 border-t border-border/60">
              <Label className="text-xs font-semibold flex items-center justify-between">
                <span>Select Destination Currencies</span>
                <span className="text-[11px] text-muted-foreground">{targetCurrencies.length}/6</span>
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_CURRENCIES.filter((c) => c !== baseCurrency).map((c) => {
                  const isSelected = targetCurrencies.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleTarget(c)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-muted/40 text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={fetchLiveRates}
              disabled={isLoading}
              className="w-full h-10 rounded-xl font-bold bg-primary text-primary-foreground gap-2 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} /> Refresh Live Rates
            </Button>
          </CardContent>
        </GlassCard>

        {/* Matrix Comparison Results Card */}
        <GlassCard className="p-6 rounded-3xl border-border/80 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <span className="text-xs text-muted-foreground font-semibold">Total Allocated Fund</span>
              <h2 className="text-2xl font-extrabold font-mono text-foreground pt-1">
                {budget} {baseCurrency}
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-9 px-3.5 rounded-xl text-xs gap-1.5 cursor-pointer hover:border-primary/50"
            >
              <Copy className="h-3.5 w-3.5 text-primary" /> Copy Breakdown
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((r) => (
              <div
                key={r.currency}
                className="p-4 rounded-2xl border border-border/60 bg-muted/20 hover:border-primary/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="px-2.5 py-1 font-mono font-bold text-sm">
                    {r.currency}
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">
                    1 {baseCurrency} = {r.rate} {r.currency}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-muted-foreground font-semibold">Total Converted Budget</span>
                  <p className="text-xl font-bold font-mono text-primary">
                    {r.total.toLocaleString(undefined, { maximumFractionDigits: 2 })} {r.currency}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40 text-center font-mono">
                  <div className="p-1.5 rounded-lg bg-background/60">
                    <span className="text-[10px] text-muted-foreground block">7-Day</span>
                    <span className="text-xs font-bold text-foreground">
                      {(r.total / 7).toFixed(0)}/d
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-background/60">
                    <span className="text-[10px] text-muted-foreground block">14-Day</span>
                    <span className="text-xs font-bold text-foreground">
                      {(r.total / 14).toFixed(0)}/d
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-background/60">
                    <span className="text-[10px] text-muted-foreground block">30-Day</span>
                    <span className="text-xs font-bold text-foreground">
                      {(r.total / 30).toFixed(0)}/d
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
