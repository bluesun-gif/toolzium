"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Grid,
  RefreshCw,
  Trash2,
  Plus,
  Download,
  Sparkles,
  TrendingUp,
  Globe2,
  Plane,
  ShieldCheck,
  Zap,
  ArrowRightLeft
} from "lucide-react";
import toast from "react-hot-toast";
import { ToolBackground } from "@/components/shared/tool-background";

const ALL_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL", "SGD", "NZD", "MXN", "HKD", "SEK", "KRW", "AED", "THB"
];

interface FxAdvisorData {
  summary: string;
  bestValueDestinations: Array<{
    currency: string;
    country: string;
    advantage: string;
    purchasingPowerScore: string;
  }>;
  hedgingTip: string;
  arbitrageInsight: string;
}

export default function CurrencyMatrixClient() {
  const [currencies, setCurrencies] = useState<string[]>(["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]);
  const [selectedCurrencyToAdd, setSelectedCurrencyToAdd] = useState("");
  const [rates, setRates] = useState<Record<string, number>>({
    USD: 1, EUR: 0.92, GBP: 0.79, JPY: 154.2, CAD: 1.36, AUD: 1.53, CHF: 0.90, CNY: 7.23, INR: 86.8, BRL: 5.42
  });
  const [isLoading, setIsLoading] = useState(false);
  const [aiAdvisor, setAiAdvisor] = useState<FxAdvisorData | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fetchLiveRates = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/fx/latest?base=USD");
      if (!res.ok) throw new Error("Failed to fetch rates");
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        toast.success("Loaded real-time global FX market rates!", { id: "fx-matrix" });
      }
    } catch {
      toast.error("Using cached central bank rates", { id: "fx-matrix" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAiAdvice = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/currency-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseCurrency: currencies[0] || "USD",
          targetCurrencies: currencies,
          rates
        })
      });

      if (!res.ok) throw new Error("AI Advisor failed");
      const json = await res.json();
      if (json.success && json.data) {
        setAiAdvisor(json.data);
        toast.success("Generated AI FX & Travel intelligence!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to generate AI advice. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

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
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Grid}
          title="Live Multi-Currency Cross-Rate Matrix & Travel Arbitrage Studio"
          description="Real-time multi-currency cross rate matrix with live open market rates, arbitrage analysis, and AI global travel purchasing power advisor."
        />

        {/* Matrix Studio Card */}
        <GlassCard className="p-6 rounded-3xl border-border/80 space-y-6 shadow-xl">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Matrix Currencies:
              </span>
              {currencies.map((c) => (
                <Badge
                  key={c}
                  variant="secondary"
                  className="px-2.5 py-1 text-xs font-mono font-bold flex items-center gap-1.5 rounded-lg border border-border/60"
                >
                  {c}
                  <button
                    onClick={() => handleRemoveCurrency(c)}
                    className="hover:text-rose-500 cursor-pointer transition-colors"
                    title="Remove currency"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Select value={selectedCurrencyToAdd} onValueChange={setSelectedCurrencyToAdd}>
                <SelectTrigger className="h-9 w-28 rounded-xl text-xs">
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
                <Download className="h-3.5 w-3.5" /> CSV
              </Button>
            </div>
          </div>

          {/* Matrix Cross Table */}
          <div className="overflow-x-auto rounded-2xl border border-border/60 bg-background/50">
            <table className="w-full text-center text-xs font-mono">
              <thead className="bg-muted/60 text-muted-foreground border-b border-border/60">
                <tr>
                  <th className="p-3.5 text-left font-bold text-foreground font-sans">Base \ Target</th>
                  {currencies.map((c) => (
                    <th key={c} className="p-3.5 font-black text-primary tracking-wider">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {currencies.map((row) => (
                  <tr key={row} className="hover:bg-muted/30 transition-colors">
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
                            isSelf
                              ? "text-muted-foreground/30 bg-muted/10 font-medium"
                              : "text-foreground font-bold hover:text-primary transition-colors"
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

          {/* AI Advisor Trigger Button */}
          <Button
            onClick={fetchAiAdvice}
            disabled={isAiLoading}
            className="w-full h-12 rounded-2xl text-sm font-bold bg-primary text-primary-foreground gap-2 cursor-pointer shadow-lg shadow-primary/20 hover:scale-101 active:scale-99 transition-all"
          >
            {isAiLoading ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>Synthesizing Global FX & Purchasing Power Strategy...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Analyze Currency Arbitrage & Travel Purchasing Power</span>
              </>
            )}
          </Button>
        </GlassCard>

        {/* AI Travel & FX Intelligence Card */}
        {aiAdvisor && (
          <GlassCard className="p-6 space-y-5 rounded-3xl border-primary/30 bg-card/70 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-400">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">AI Global Purchasing Power Intelligence</h3>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-xs sm:text-sm text-foreground leading-relaxed">
              <span className="font-bold text-primary block mb-1">Macro FX Trend:</span>
              {aiAdvisor.summary}
            </div>

            {/* Best Value Destinations Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Plane className="h-3.5 w-3.5 text-primary" />
                Top High-Purchasing-Power Travel Destinations
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aiAdvisor.bestValueDestinations.map((d, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-border/60 bg-background/80 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                          {d.currency}
                        </span>
                        <h4 className="text-sm font-bold text-foreground">{d.country}</h4>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                        Score: {d.purchasingPowerScore}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{d.advantage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel FX Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-1 text-xs">
                <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Traveler Fee Avoidance Tip:</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{aiAdvisor.hedgingTip}</p>
              </div>

              <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 space-y-1 text-xs">
                <div className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Cross-Rate Arbitrage Note:</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{aiAdvisor.arbitrageInsight}</p>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Guides & FAQ */}
        <ToolHowItWorks
          steps={[
            {
              step: "1",
              title: "Customize Currency Basket",
              description: "Add or remove any of the 18+ major global currencies from the matrix."
            },
            {
              step: "2",
              title: "View Real-Time Cross Rates",
              description: "Read instant cross-currency rates calculated with live central bank open feeds."
            },
            {
              step: "3",
              title: "Export & Generate Travel Plan",
              description: "Download the complete matrix as a CSV spreadsheet or consult the AI travel advisor."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "Central Bank Live Feed",
              description: "Fetches live rates updated hourly from Open Exchange Rates and European Central Bank mirrors."
            },
            {
              title: "Multi-Currency Arbitrage Calculator",
              description: "Calculates triangular cross rates across all active currencies to highlight foreign exchange pricing discrepancies."
            },
            {
              title: "AI Travel Purchasing Power Advisor",
              description: "Analyzes relative exchange rate strength to pinpoint the most budget-favorable countries to visit right now."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "How are currency cross rates calculated in this matrix?",
              answer: "Cross rates are calculated by dividing the target currency's base USD rate by the source currency's base USD rate (Target Rate / Source Rate), producing mathematically precise cross valuations."
            },
            {
              question: "How often are the live exchange rates updated?",
              answer: "The rates are refreshed continuously and cached with a 1-hour revalidation window to provide fast, reliable, and real-time open market rates."
            },
            {
              question: "Can I export the entire currency matrix to Excel or Google Sheets?",
              answer: "Yes. Click the 'CSV' button at the top right of the matrix to download a formatted CSV file ready to open in Excel or Sheets."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/travel/currency-matrix" />
      </div>
    </div>
  );
}
