"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coins, DollarSign, Gem, LineChart, RefreshCw, Scale, ShieldCheck, Sparkles, TrendingUp, Calculator, Download, Copy } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import toast from "react-hot-toast";

interface MetalsData {
  timestamp: string;
  updatedAt: string;
  provider: string;
  usdRates: {
    goldOz: number;
    goldGram24k: number;
    goldGram22k: number;
    goldGram21k: number;
    goldGram18k: number;
    goldGram14k: number;
    goldGram10k: number;
    goldTola24k: number;
    goldTola22k: number;
    goldSovereign22k: number;
    silverOz: number;
    silverGram: number;
    platinumOz: number;
    platinumGram: number;
    palladiumOz: number;
  };
  fiatRates: Record<string, number>;
}

const CURRENCIES = [
  { value: "USD", label: "USD ($ - US Dollar)", symbol: "$" },
  { value: "EUR", label: "EUR (€ - Euro)", symbol: "€" },
  { value: "GBP", label: "GBP (£ - British Pound)", symbol: "£" },
  { value: "BDT", label: "BDT (৳ - Bangladeshi Taka)", symbol: "৳" },
  { value: "INR", label: "INR (₹ - Indian Rupee)", symbol: "₹" },
  { value: "AED", label: "AED (Dirham - UAE)", symbol: "AED" },
  { value: "SAR", label: "SAR (Riyal - Saudi Arabia)", symbol: "SAR" },
  { value: "CAD", label: "CAD (C$ - Canadian Dollar)", symbol: "C$" },
  { value: "AUD", label: "AUD (A$ - Australian Dollar)", symbol: "A$" },
  { value: "JPY", label: "JPY (¥ - Japanese Yen)", symbol: "¥" }
];

const KARAT_PURITIES: Record<string, { label: string; purity: number; description: string }> = {
  "24k": { label: "24K (99.9% Pure Bullion)", purity: 1.0, description: "Fine Gold / Investment Bars & Coins" },
  "22k": { label: "22K (91.6% Crown Gold)", purity: 22 / 24, description: "Traditional Fine Jewelry & Sovereigns" },
  "21k": { label: "21K (87.5% Standard)", purity: 21 / 24, description: "Popular Middle East & Arabic Jewelry" },
  "18k": { label: "18K (75.0% Luxury)", purity: 18 / 24, description: "Luxury Western & Diamond Set Jewelry" },
  "14k": { label: "14K (58.3% Standard)", purity: 14 / 24, description: "Most Popular Everyday US Jewelry" },
  "10k": { label: "10K (41.7% Minimum)", purity: 10 / 24, description: "Durable US Minimum Gold Standard" }
};

export default function GoldPriceTrackerClient() {
  const [data, setData] = useState<MetalsData | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(true);

  // Custom Weight Calculator Inputs
  const [weight, setWeight] = useState("10"); // e.g. 10
  const [weightUnit, setWeightUnit] = useState("gram"); // "gram" | "tola" | "oz" | "sovereign" | "kg"
  const [karat, setKarat] = useState("24k");

  const fetchLiveMetals = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/metals", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      toast.error("Failed to load live gold rates");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMetals();
  }, []);

  const fx = data?.fiatRates[currency] || 1;
  const symbol = CURRENCIES.find((c) => c.value === currency)?.symbol || "$";

  // Compute live price cards in selected currency
  const rates = useMemo(() => {
    if (!data) return null;
    const g24k = data.usdRates.goldGram24k * fx;
    return {
      goldOz: (data.usdRates.goldOz * fx).toFixed(2),
      goldGram24k: g24k.toFixed(2),
      goldGram22k: (data.usdRates.goldGram22k * fx).toFixed(2),
      goldGram21k: (data.usdRates.goldGram21k * fx).toFixed(2),
      goldGram18k: (data.usdRates.goldGram18k * fx).toFixed(2),
      goldGram14k: (data.usdRates.goldGram14k * fx).toFixed(2),
      goldGram10k: (data.usdRates.goldGram10k * fx).toFixed(2),
      goldTola24k: (data.usdRates.goldTola24k * fx).toFixed(2),
      goldTola22k: (data.usdRates.goldTola22k * fx).toFixed(2),
      goldSovereign22k: (data.usdRates.goldSovereign22k * fx).toFixed(2),
      silverOz: (data.usdRates.silverOz * fx).toFixed(2),
      silverGram: (data.usdRates.silverGram * fx).toFixed(2),
      platinumOz: (data.usdRates.platinumOz * fx).toFixed(2),
      platinumGram: (data.usdRates.platinumGram * fx).toFixed(2),
    };
  }, [data, fx]);

  // Custom Scrap / Jewelry Value Calculation
  const customValue = useMemo(() => {
    if (!data) return "0.00";
    const numWeight = parseFloat(weight) || 0;
    const baseGram24kUsd = data.usdRates.goldGram24k;
    const purity = KARAT_PURITIES[karat]?.purity || 1.0;

    let totalGrams = numWeight;
    if (weightUnit === "tola") totalGrams = numWeight * 11.6638;
    else if (weightUnit === "oz") totalGrams = numWeight * 31.1034768;
    else if (weightUnit === "sovereign") totalGrams = numWeight * 8.0;
    else if (weightUnit === "kg") totalGrams = numWeight * 1000;

    const totalValUsd = totalGrams * baseGram24kUsd * purity;
    return (totalValUsd * fx).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [data, weight, weightUnit, karat, fx]);

  const copyCustomValue = () => {
    navigator.clipboard.writeText(`${symbol} ${customValue} (${weight} ${weightUnit} of ${karat} Gold in ${currency})`);
    toast.success("Valuation copied to clipboard!");
  };

  const exportPriceSheet = () => {
    if (!rates) return;
    const csv = "Metal / Karat,Unit,Price (" + currency + ")\n" +
      `Gold 24K,1 Troy Ounce,${rates.goldOz}\n` +
      `Gold 24K,1 Gram,${rates.goldGram24k}\n` +
      `Gold 22K (Jewelry),1 Gram,${rates.goldGram22k}\n` +
      `Gold 21K (Middle East),1 Gram,${rates.goldGram21k}\n` +
      `Gold 18K (Luxury),1 Gram,${rates.goldGram18k}\n` +
      `Gold 14K (Standard),1 Gram,${rates.goldGram14k}\n` +
      `Gold 10K,1 Gram,${rates.goldGram10k}\n` +
      `Gold 24K,1 Tola (11.66g),${rates.goldTola24k}\n` +
      `Gold 22K,1 Sovereign (8g),${rates.goldSovereign22k}\n` +
      `Silver,1 Troy Ounce,${rates.silverOz}\n` +
      `Silver,1 Gram,${rates.silverGram}\n` +
      `Platinum,1 Troy Ounce,${rates.platinumOz}\n`;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gold-metals-rates-${currency}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Live price sheet downloaded!");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Coins}
          title="Live Gold Price Tracker & Scrap Melt Calculator"
          description="Real-time 24K, 22K, 21K, 18K, 14K, and 10K live gold spot rates per gram, troy ounce, tola, and sovereign across 160+ global currencies."
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchLiveMetals} disabled={isLoading} className="h-9 px-3 rounded-xl text-xs gap-1.5 cursor-pointer">
                <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} /> Refresh Rates
              </Button>
              <Button size="sm" onClick={exportPriceSheet} className="h-9 px-3.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5 cursor-pointer">
                <Download className="h-3.5 w-3.5" /> Export Rates CSV
              </Button>
            </div>
          }
        />

        {/* Currency Selector Bar */}
        <GlassCard className="p-4 rounded-2xl border-border/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Select Display Currency:</span>
          </div>

          <div className="w-full sm:w-64">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="h-10 rounded-xl font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </GlassCard>

        {/* Live Spot Prices Grid (Google Query Target: 18k, 22k, 24k gold price live) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 24K Gold Card */}
          <GlassCard className="p-5 rounded-3xl border-amber-500/30 bg-amber-500/5 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-[10px] font-bold text-amber-500 border-amber-500/40">
                24K Pure Bullion (99.9%)
              </Badge>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">1 Gram</p>
              <p className="text-2xl font-black font-mono text-foreground mt-0.5">
                {symbol} {rates?.goldGram24k || "..."}
              </p>
            </div>
            <div className="pt-2 border-t border-border/40 flex justify-between text-xs text-muted-foreground">
              <span>Per Oz: {symbol}{rates?.goldOz}</span>
              <span>Tola: {symbol}{rates?.goldTola24k}</span>
            </div>
          </GlassCard>

          {/* 22K Gold Card */}
          <GlassCard className="p-5 rounded-3xl border-amber-400/30 bg-amber-400/5 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-[10px] font-bold text-amber-400 border-amber-400/40">
                22K Jewelry (91.6%)
              </Badge>
              <Gem className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">1 Gram</p>
              <p className="text-2xl font-black font-mono text-foreground mt-0.5">
                {symbol} {rates?.goldGram22k || "..."}
              </p>
            </div>
            <div className="pt-2 border-t border-border/40 flex justify-between text-xs text-muted-foreground">
              <span>Sovereign (8g): {symbol}{rates?.goldSovereign22k}</span>
              <span>Tola: {symbol}{rates?.goldTola22k}</span>
            </div>
          </GlassCard>

          {/* 18K Gold Card (Targeting GSC query "18k gold price live") */}
          <GlassCard className="p-5 rounded-3xl border-purple-400/30 bg-purple-400/5 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-[10px] font-bold text-purple-400 border-purple-400/40">
                18K Luxury (75.0%)
              </Badge>
              <Coins className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">1 Gram</p>
              <p className="text-2xl font-black font-mono text-foreground mt-0.5">
                {symbol} {rates?.goldGram18k || "..."}
              </p>
            </div>
            <div className="pt-2 border-t border-border/40 flex justify-between text-xs text-muted-foreground">
              <span>14K Gram: {symbol}{rates?.goldGram14k}</span>
              <span>10K Gram: {symbol}{rates?.goldGram10k}</span>
            </div>
          </GlassCard>

          {/* Silver & Platinum Card */}
          <GlassCard className="p-5 rounded-3xl border-border/80 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-[10px] font-bold text-muted-foreground border-border">
                Silver & Platinum Spot
              </Badge>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-muted-foreground">Silver (Oz):</span>
                <span className="text-base font-bold font-mono text-foreground">{symbol} {rates?.silverOz}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-muted-foreground">Platinum (Oz):</span>
                <span className="text-base font-bold font-mono text-foreground">{symbol} {rates?.platinumOz}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Interactive Custom Scrap & Jewelry Melt Value Calculator */}
        <GlassCard className="p-6 rounded-3xl border-border/80 space-y-6">
          <CardHeader className="p-0">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Calculator className="h-4 w-4 text-primary" /> Custom Gold Weight & Scrap Melt Value Calculator
            </CardTitle>
            <CardDescription className="text-xs">
              Calculate exact melt cash value for any gold jewelry weight, karat purity, and regional unit.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Gold Weight Amount</Label>
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="h-10 rounded-xl font-mono text-sm font-bold"
                  placeholder="10"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Weight Unit</Label>
                <Select value={weightUnit} onValueChange={setWeightUnit}>
                  <SelectTrigger className="h-10 rounded-xl font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gram">Grams (g)</SelectItem>
                    <SelectItem value="tola">Tola (11.6638g - South Asia)</SelectItem>
                    <SelectItem value="oz">Troy Ounces (31.1035g)</SelectItem>
                    <SelectItem value="sovereign">Sovereigns / Pavan (8.0g)</SelectItem>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Gold Karat Purity</Label>
                <Select value={karat} onValueChange={setKarat}>
                  <SelectTrigger className="h-10 rounded-xl font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(KARAT_PURITIES).map(([k, info]) => (
                      <SelectItem key={k} value={k}>
                        {info.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Calculated Valuation Hero Result */}
            <div className="p-5 rounded-2xl bg-muted/30 border border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-semibold">
                  Estimated Cash Melt Value for {weight} {weightUnit} ({KARAT_PURITIES[karat]?.description}):
                </p>
                <p className="text-3xl sm:text-4xl font-black font-mono text-primary mt-1">
                  {symbol} {customValue}
                </p>
              </div>

              <Button onClick={copyCustomValue} variant="outline" size="sm" className="h-9 rounded-xl text-xs gap-1.5 cursor-pointer">
                <Copy className="h-3.5 w-3.5" /> Copy Valuation
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        {/* How It Works, Features & SEO Target FAQs */}
        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Select Currency & Metal",
              description: "Choose from 160+ fiat currencies to view instant spot rates per gram, troy oz, tola, and sovereign."
            },
            {
              step: "02",
              title: "Choose Karat Purity",
              description: "Select 24K (pure bullion), 22K (crown jewelry), 21K (Middle East), 18K (luxury), 14K, or 10K."
            },
            {
              step: "03",
              title: "Calculate Cash Melt Value",
              description: "Enter your exact jewelry weight to get immediate cash melt estimates and export CSV price sheets."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "LBMA Spot Commodity Benchmark",
              description: "Direct real-time spot valuation benchmarked against the London Bullion Market Association (LBMA)."
            },
            {
              title: "Comprehensive Karat Matrix",
              description: "Full purity evaluation across 24k, 22k, 21k, 18k, 14k, and 10k purity standards."
            },
            {
              title: "Regional Unit Conversions",
              description: "Built-in automated conversions for Troy Ounces (31.10g), Tola (11.66g), Sovereigns (8g), and Grams."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "What is the live spot price of 18K gold per gram?",
              answer: "18K gold contains 75.0% pure gold (18 parts pure gold out of 24) and 25.0% alloy metals (such as copper, silver, or palladium). Its spot price per gram is calculated by multiplying the live 24K gold per-gram price by 0.75 (18/24)."
            },
            {
              question: "What is the difference between 24K, 22K, and 18K gold?",
              answer: "24K is 99.9% pure investment gold. 22K (91.6% pure) is the traditional benchmark for high-karat Asian and Middle Eastern bridal jewelry. 18K (75.0% pure) is the global standard for luxury fine jewelry, offering superior hardness for setting diamonds and gemstones."
            },
            {
              question: "How many grams are in 1 tola of gold?",
              answer: "1 standard Tola is exactly 11.6638 grams (or 180 troy grains). In South Asian markets (Bangladesh, India, Pakistan), gold is frequently quoted in Tola."
            },
            {
              question: "How is gold scrap and jewelry melt value calculated?",
              answer: "Melt value equals: (Weight in Grams) × (Karat Purity % / 24) × (Live 24K Gold Price per Gram). Jewelers and scrap buyers typically offer 90% to 98% of this spot melt value to account for refining costs."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/finance/gold-price-tracker" />
      </div>
    </div>
  );
}
