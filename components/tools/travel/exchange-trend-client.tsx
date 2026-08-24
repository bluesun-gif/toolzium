"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, RefreshCw, ArrowRightLeft, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

const CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL", "SGD", "NZD", "MXN", "HKD", "SEK", "KRW"
];

export default function ExchangeTrendClient() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [rates30Days, setRates30Days] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLiveRates = useCallback(async () => {
    if (baseCurrency === targetCurrency) {
      setCurrentRate(1.0);
      setRates30Days(Array(30).fill(1.0));
      return;
    }

    setIsLoading(true);
    try {
      const endDate = new Date().toISOString().split("T")[0];
      const startDateObj = new Date();
      startDateObj.setDate(startDateObj.getDate() - 30);
      const startDate = startDateObj.toISOString().split("T")[0];

      const res = await fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${baseCurrency}&to=${targetCurrency}`);
      if (!res.ok) throw new Error("Failed to load rates");
      const data = await res.json();

      const ratesObj = data.rates || {};
      const vals: number[] = Object.keys(ratesObj).map((d) => ratesObj[d][targetCurrency] || 0);

      if (vals.length > 0) {
        setRates30Days(vals);
        setCurrentRate(vals[vals.length - 1]);
      }
    } catch {
      toast.error("Connecting to global financial network for live FX rates...", { id: "fx-load" });
    } finally {
      setIsLoading(false);
    }
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    fetchLiveRates();
  }, [fetchLiveRates]);

  const high30 = rates30Days.length ? Math.max(...rates30Days) : 0;
  const low30 = rates30Days.length ? Math.min(...rates30Days) : 0;
  const firstRate = rates30Days[0] || currentRate || 1;
  const lastRate = currentRate || 1;
  const changePct = firstRate ? (((lastRate - firstRate) / firstRate) * 100).toFixed(2) : "0.00";
  const isPositive = parseFloat(changePct) >= 0;

  const handleSwap = () => {
    const temp = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(temp);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <ToolPageHeader
        title="Live Currency Exchange Trend & Momentum Analyzer"
        description="Analyze 30-day currency momentum, volatility range, and real-time live central bank conversion rates."
        icon={BarChart3}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <GlassCard className="p-6 rounded-3xl border-border/80 space-y-5">
          <CardHeader className="p-0">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Currency Pair</span>
              <Badge variant="outline" className="text-[11px] font-mono border-primary/40 text-primary">
                Live Data
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground">From Currency</span>
              <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                <SelectTrigger className="h-10 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwap}
                className="h-8 px-3 rounded-lg text-xs gap-1.5 cursor-pointer hover:border-primary/50"
              >
                <ArrowRightLeft className="h-3.5 w-3.5 text-primary" /> Swap
              </Button>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground">To Currency</span>
              <Select value={targetCurrency} onValueChange={setTargetCurrency}>
                <SelectTrigger className="h-10 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={fetchLiveRates}
              disabled={isLoading}
              className="w-full h-10 rounded-xl font-bold bg-primary text-primary-foreground gap-2 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Fetching Live Trend..." : "Refresh Live Trend"}
            </Button>
          </CardContent>
        </GlassCard>

        {/* Live Momentum Dashboard */}
        <GlassCard className="p-6 rounded-3xl border-border/80 lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <span className="text-xs text-muted-foreground font-semibold">Live Conversion Quotation</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground pt-1">
                1 {baseCurrency} = {currentRate !== null ? currentRate : "..."} {targetCurrency}
              </h2>
            </div>

            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
              isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
            }`}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {isPositive ? "+" : ""}{changePct}% (30-Day Trend)
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
              <span className="text-xs text-muted-foreground font-semibold">30-Day Peak High</span>
              <p className="text-lg font-bold font-mono text-emerald-400">{high30}</p>
            </div>
            <div className="p-4 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
              <span className="text-xs text-muted-foreground font-semibold">30-Day Low</span>
              <p className="text-lg font-bold font-mono text-rose-400">{low30}</p>
            </div>
            <div className="p-4 rounded-2xl border border-border/60 bg-muted/20 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-xs text-muted-foreground font-semibold">Spread Volatility</span>
              <p className="text-lg font-bold font-mono text-primary">
                {high30 && low30 ? (((high30 - low30) / low30) * 100).toFixed(2) : "0.00"}%
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
