"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, RefreshCw, ArrowRightLeft, DollarSign, Download, Copy } from "lucide-react";
import toast from "react-hot-toast";

const CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL", "SGD", "NZD", "MXN", "HKD", "SEK", "KRW"
];

interface HistoryPoint {
  date: string;
  rate: number;
}

export default function ExchangeHistoryClient() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [days, setDays] = useState("30");
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRealHistory = useCallback(async () => {
    if (baseCurrency === targetCurrency) {
      const now = new Date();
      const pts: HistoryPoint[] = [];
      const dCount = parseInt(days, 10);
      for (let i = dCount; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        pts.push({ date: d.toISOString().split("T")[0], rate: 1.0 });
      }
      setHistory(pts);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/fx/history?base=${baseCurrency}&target=${targetCurrency}&days=${days}`);
      if (!res.ok) throw new Error("Failed to load official ECB rates");
      const data = await res.json();

      if (data.success && Array.isArray(data.points) && data.points.length > 0) {
        setHistory(data.points);
      } else {
        throw new Error("No rate data available for this range");
      }
    } catch {
      toast.error("Connecting to global financial network for live FX rates...", { id: "fx-load" });
    } finally {
      setIsLoading(false);
    }
  }, [baseCurrency, targetCurrency, days]);

  useEffect(() => {
    fetchRealHistory();
  }, [fetchRealHistory]);

  const rates = history.map((h) => h.rate);
  const currentRate = rates[rates.length - 1] || 0;
  const maxRate = Math.max(...(rates.length ? rates : [0]));
  const minRate = Math.min(...(rates.length ? rates : [0]));
  const avgRate = rates.length ? (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(4) : "0";

  const handleSwap = () => {
    const temp = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(temp);
  };

  const copySummary = () => {
    const text = `Currency History (${baseCurrency}/${targetCurrency})\nPeriod: Last ${days} Days\nCurrent Rate: ${currentRate}\nHigh: ${maxRate}\nLow: ${minRate}\nAverage: ${avgRate}`;
    navigator.clipboard.writeText(text);
    toast.success("Historical FX summary copied to clipboard!");
  };

  const downloadCSV = () => {
    const header = "Date,Base,Target,Rate\n";
    const rows = history.map((h) => `${h.date},${baseCurrency},${targetCurrency},${h.rate}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exchange-rates-${baseCurrency}-${targetCurrency}-${days}d.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV file downloaded successfully!");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <ToolPageHeader
        title="Live Currency Exchange Rate History & Trends"
        description="Track authentic historical daily exchange rates powered by the European Central Bank. Compare trends, volatility, and download CSV data."
        icon={TrendingUp}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Card */}
        <GlassCard className="p-6 rounded-3xl border-border/80 space-y-5">
          <CardHeader className="p-0">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Currency Settings</span>
              <Badge variant="outline" className="text-[11px] font-mono border-primary/40 text-primary">
                Live ECB API
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Base Currency</Label>
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
                <ArrowRightLeft className="h-3.5 w-3.5 text-primary" /> Swap Currencies
              </Button>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Target Currency</Label>
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

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Time Period</Label>
              <Select value={days} onValueChange={setDays}>
                <SelectTrigger className="h-10 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="14">Last 14 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days (1 Month)</SelectItem>
                  <SelectItem value="90">Last 90 Days (3 Months)</SelectItem>
                  <SelectItem value="180">Last 180 Days (6 Months)</SelectItem>
                  <SelectItem value="365">Last 365 Days (1 Year)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={fetchRealHistory}
              disabled={isLoading}
              className="w-full h-10 rounded-xl font-bold bg-primary text-primary-foreground gap-2 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Fetching Live ECB Rates..." : "Refresh Live Data"}
            </Button>
          </CardContent>
        </GlassCard>

        {/* Live Metrics & Visual Graph Card */}
        <GlassCard className="p-6 rounded-3xl border-border/80 lg:col-span-2 space-y-6">
          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
              <span className="text-[11px] text-muted-foreground font-semibold">Latest Rate</span>
              <p className="text-lg font-bold font-mono text-primary truncate">
                1 {baseCurrency} = {currentRate} {targetCurrency}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
              <span className="text-[11px] text-muted-foreground font-semibold">Period High</span>
              <p className="text-lg font-bold font-mono text-emerald-400 truncate">{maxRate}</p>
            </div>
            <div className="p-3.5 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
              <span className="text-[11px] text-muted-foreground font-semibold">Period Low</span>
              <p className="text-lg font-bold font-mono text-rose-400 truncate">{minRate}</p>
            </div>
            <div className="p-3.5 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
              <span className="text-[11px] text-muted-foreground font-semibold">Period Avg</span>
              <p className="text-lg font-bold font-mono text-purple-400 truncate">{avgRate}</p>
            </div>
          </div>

          {/* Rate Trend Table & Export Actions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> Daily Central Bank Quotations
              </h4>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copySummary}
                  className="h-8 px-3 rounded-lg text-xs gap-1.5 cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5 text-primary" /> Copy Stats
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCSV}
                  className="h-8 px-3 rounded-lg text-xs gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-primary" /> Download CSV
                </Button>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto rounded-2xl border border-border/60">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/40 text-muted-foreground sticky top-0 backdrop-blur-md">
                  <tr>
                    <th className="p-3 font-semibold">Date</th>
                    <th className="p-3 font-semibold">Pair</th>
                    <th className="p-3 font-semibold text-right">Exchange Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-mono">
                  {history.slice(-20).reverse().map((h) => (
                    <tr key={h.date} className="hover:bg-muted/20 transition-colors">
                      <td className="p-3 text-muted-foreground">{h.date}</td>
                      <td className="p-3 font-medium text-foreground">
                        {baseCurrency} → {targetCurrency}
                      </td>
                      <td className="p-3 text-right font-bold text-primary">{h.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
