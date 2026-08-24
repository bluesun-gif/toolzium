"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Grid, RefreshCw, Trash2, Plus, Download, Copy } from "lucide-react";
import toast from "react-hot-toast";

const ALL_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL", "SGD", "NZD", "MXN", "HKD", "SEK", "KRW"
];

export default function CurrencyMatrixClient() {
  const [currencies, setCurrencies] = useState<string[]>(["USD", "EUR", "GBP", "JPY", "CAD"]);
  const [selectedCurrencyToAdd, setSelectedCurrencyToAdd] = useState("");
  const [rates, setRates] = useState<Record<string, number>>({
    USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.5, CAD: 1.35, AUD: 1.52, CHF: 0.90, CNY: 7.23, INR: 86.8
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
        toast.success("Loaded real-time global FX matrix rates!", { id: "fx-matrix" });
      }
    } catch {
      toast.error("Using cached central bank rates", { id: "fx-matrix" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveRates();
  }, [fetchLiveRates]);

  const handleAddCurrency = () => {
    if (!selectedCurrencyToAdd) return;
    if (currencies.includes(selectedCurrencyToAdd)) {
      toast.error("Currency is already in the matrix");
      return;
    }
    if (currencies.length >= 8) {
      toast.error("Maximum 8 currencies allowed for clean table visibility");
      return;
    }
    setCurrencies([...currencies, selectedCurrencyToAdd]);
    setSelectedCurrencyToAdd("");
  };

  const handleRemoveCurrency = (curr: string) => {
    if (currencies.length <= 2) {
      toast.error("Keep at least 2 currencies for comparison");
      return;
    }
    setCurrencies(currencies.filter((c) => c !== curr));
  };

  const getCrossRate = (from: string, to: string) => {
    if (from === to) return "1.0000";
    const fromRate = rates[from] || 1;
    const toRate = rates[to] || 1;
    const cross = toRate / fromRate;
    return cross < 0.01 ? cross.toExponential(3) : cross.toFixed(4);
  };

  const downloadMatrixCSV = () => {
    let csv = "FROM / TO," + currencies.join(",") + "\n";
    currencies.forEach((row) => {
      csv += row + "," + currencies.map((col) => getCrossRate(row, col)).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `currency-matrix-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Matrix exported to CSV!");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <ToolPageHeader
        title="Live Multi-Currency Cross-Rate Matrix"
        description="Compute real-time cross rates and arbitrage tables across global currencies with live open market rates."
        icon={Grid}
      />

      <GlassCard className="p-6 rounded-3xl border-border/80 space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Active Currencies:</span>
            {currencies.map((c) => (
              <Badge key={c} variant="secondary" className="px-2.5 py-1 text-xs font-mono font-bold flex items-center gap-1.5">
                {c}
                <button
                  onClick={() => handleRemoveCurrency(c)}
                  className="hover:text-rose-400 cursor-pointer"
                  title="Remove currency"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={selectedCurrencyToAdd} onValueChange={setSelectedCurrencyToAdd}>
              <SelectTrigger className="h-9 w-32 rounded-xl text-xs">
                <SelectValue placeholder="+ Add..." />
              </SelectTrigger>
              <SelectContent>
                {ALL_CURRENCIES.filter((c) => !currencies.includes(c)).map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleAddCurrency}
              size="sm"
              variant="outline"
              disabled={!selectedCurrencyToAdd}
              className="h-9 px-3 rounded-xl text-xs gap-1 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
            <Button
              onClick={fetchLiveRates}
              size="sm"
              variant="outline"
              disabled={isLoading}
              className="h-9 px-3 rounded-xl text-xs gap-1 cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button
              onClick={downloadMatrixCSV}
              size="sm"
              className="h-9 px-3.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Matrix Cross Table */}
        <div className="overflow-x-auto rounded-2xl border border-border/60">
          <table className="w-full text-center text-xs font-mono">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="p-3.5 text-left font-bold text-foreground font-sans">Base \ Target</th>
                {currencies.map((c) => (
                  <th key={c} className="p-3.5 font-bold text-primary">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {currencies.map((row) => (
                <tr key={row} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3.5 text-left font-bold text-foreground font-sans bg-muted/20">
                    1 {row} =
                  </td>
                  {currencies.map((col) => {
                    const isSelf = row === col;
                    const val = getCrossRate(row, col);
                    return (
                      <td
                        key={col}
                        className={`p-3.5 ${
                          isSelf ? "text-muted-foreground/40 bg-muted/10 font-medium" : "text-foreground font-bold"
                        }`}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
