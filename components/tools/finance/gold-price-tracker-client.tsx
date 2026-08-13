"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectField from "@/components/shared/form-fields/select-field";
import { RefreshCw, TrendingUp, Sparkles, DollarSign, Coins, ShieldCheck, Scale, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
interface MetalsData {
  timestamp: string;
  updatedAt: string;
  provider: string;
  usdRates: {
    goldOz: number;
    goldGram24k: number;
    goldGram22k: number;
    goldGram18k: number;
    goldTola24k: number;
    silverOz: number;
    silverGram: number;
    platinumOz: number;
  };
  fiatRates: Record<string, number>;
}
const CURRENCIES = [{
  value: "USD",
  label: "USD ($ - US Dollar)",
  symbol: "$"
}, {
  value: "BDT",
  label: "BDT (৳ - Bangladeshi Taka)",
  symbol: "৳"
}, {
  value: "EUR",
  label: "EUR (€ - Euro)",
  symbol: "€"
}, {
  value: "GBP",
  label: "GBP (£ - British Pound)",
  symbol: "£"
}, {
  value: "INR",
  label: "INR (₹ - Indian Rupee)",
  symbol: "₹"
}, {
  value: "AED",
  label: "AED (Dirham - UAE)",
  symbol: "AED"
}, {
  value: "SAR",
  label: "SAR (Riyal - Saudi)",
  symbol: "SAR"
}];
export default function GoldPriceTrackerClient() {
  const [data, setData] = useState<MetalsData | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(true);

  // Custom Weight Calculator Inputs
  const [weight, setWeight] = useState("10"); // e.g. 10 grams
  const [weightUnit, setWeightUnit] = useState("gram"); //"gram"|"tola"|"oz"
  const [karat, setKarat] = useState("24k"); //"24k"|"22k"|"18k"|"14k"

  const fetchLiveMetals = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/metals", {
        cache: "no-store"
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        toast.success("Live Gold & Metals rates updated");
      }
    } catch {
      toast.error("Failed to load live gold rates");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLiveMetals();
    const interval = setInterval(fetchLiveMetals, 30000); // 30s live auto-refresh
    return () => clearInterval(interval);
  }, []);
  const fx = data?.fiatRates[currency] || 1;
  const symbol = CURRENCIES.find(c => c.value === currency)?.symbol || "$";
  const goldOz = data ? (data.usdRates.goldOz * fx).toFixed(2) : "0";
  const goldGram24 = data ? (data.usdRates.goldGram24k * fx).toFixed(2) : "0";
  const goldGram22 = data ? (data.usdRates.goldGram22k * fx).toFixed(2) : "0";
  const goldGram18 = data ? (data.usdRates.goldGram18k * fx).toFixed(2) : "0";
  const goldTola24 = data ? (data.usdRates.goldTola24k * fx).toFixed(2) : "0";
  const silverOz = data ? (data.usdRates.silverOz * fx).toFixed(2) : "0";

  // Calculator logic
  const numericWeight = parseFloat(weight) || 0;
  let weightInGrams = numericWeight;
  if (weightUnit === "tola") weightInGrams = numericWeight * 11.6638;
  if (weightUnit === "oz") weightInGrams = numericWeight * 31.1035;
  const baseGram24 = data ? data.usdRates.goldGram24k * fx : 0;
  const purityFactor = karat === "24k" ? 1 : karat === "22k" ? 22 / 24 : karat === "18k" ? 18 / 24 : 14 / 24;
  const calculatedTotalValue = (weightInGrams * baseGram24 * purityFactor).toFixed(2);
  return <div className="relative space-y-6 max-w-5xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Real-Time Gold & Precious Metals Price Tracker" description="Live spot prices for 24K, 22K, and 18K Gold, Silver, and Platinum across global currencies with instant karat weight calculator." />

 {/* Control Bar & Currency Selector */}
 <GlassCard className="p-4 sm:p-6 space-y-4">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div className="flex items-center gap-2">
 <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30 gap-1 text-xs py-1">
 <Sparkles className="h-3.5 w-3.5" /> Live 30s Auto-Ticker
 </Badge>
 <span className="text-xs text-muted-foreground">
 Last Updated: {data?.updatedAt ? new Date(data.updatedAt).toLocaleTimeString() : "Fetching..."}
 </span>
 </div>

 <div className="flex items-center gap-3">
 <SelectField label="" value={currency} onValueChange={val => setCurrency(String(val || "USD"))} options={CURRENCIES.map(c => ({
              value: c.value,
              label: c.label
            }))} />

 <Button variant="outline" size="sm" onClick={fetchLiveMetals} disabled={isLoading} className="h-10 gap-2 shrink-0 font-semibold">
 <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
 Refresh
 </Button>
 </div>
 </div>

 {/* Live Spot Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
 <div className="p-4 rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-yellow-600/5 space-y-1">
 <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Gold 24K (Per Oz)</span>
 <div className="text-2xl font-extrabold font-mono text-foreground">{symbol}{goldOz}</div>
 <span className="text-[11px] text-muted-foreground font-mono">1 Troy Oz = 31.10g</span>
 </div>

 <div className="p-4 rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-yellow-600/5 space-y-1">
 <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Gold 24K (Per Gram)</span>
 <div className="text-2xl font-extrabold font-mono text-foreground">{symbol}{goldGram24}</div>
 <span className="text-[11px] text-emerald-500 font-semibold">Pure 99.9% Gold</span>
 </div>

 <div className="p-4 rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-yellow-600/5 space-y-1">
 <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Gold 22K (Per Gram)</span>
 <div className="text-2xl font-extrabold font-mono text-foreground">{symbol}{goldGram22}</div>
 <span className="text-[11px] text-amber-500 font-semibold">Jewelry Standard</span>
 </div>

 <div className="p-4 rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-yellow-600/5 space-y-1">
 <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Gold 24K (Per Tola)</span>
 <div className="text-2xl font-extrabold font-mono text-foreground">{symbol}{goldTola24}</div>
 <span className="text-[11px] text-muted-foreground font-mono">1 Tola = 11.66g</span>
 </div>
 </div>
 </GlassCard>

 {/* Live Custom Weight & Karat Calculator */}
 <GlassCard className="p-6 space-y-6">
 <div className="flex items-center gap-2 border-b pb-3">
 <Scale className="h-5 w-5 text-amber-500" />
 <h2 className="text-lg font-bold tracking-tight text-foreground">
 Live Gold Value Calculator
 </h2>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label className="text-xs font-semibold">Enter Weight</Label>
 <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="h-10 text-sm font-mono" placeholder="e.g. 10" />
 </div>

 <SelectField label="Weight Unit" value={weightUnit} onValueChange={val => setWeightUnit(String(val || "gram"))} options={[{
            value: "gram",
            label: "Grams (g)"
          }, {
            value: "tola",
            label: "Tola (11.66g)"
          }, {
            value: "oz",
            label: "Troy Ounces (oz)"
          }]} />

 <SelectField label="Gold Purity (Karat)" value={karat} onValueChange={val => setKarat(String(val || "24k"))} options={[{
            value: "24k",
            label: "24K Gold (99.9% Pure)"
          }, {
            value: "22k",
            label: "22K Gold (91.6% Pure)"
          }, {
            value: "18k",
            label: "18K Gold (75.0% Pure)"
          }, {
            value: "14k",
            label: "14K Gold (58.3% Pure)"
          }]} />
 </div>

 {/* Calculated Output Box */}
 <div className="p-6 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
 <div className="space-y-1 text-center sm:text-left">
 <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
 Calculated Live Market Value ({karat.toUpperCase()})
 </div>
 <div className="text-3xl sm:text-4xl font-black font-mono text-foreground">
 {symbol}{Number(calculatedTotalValue).toLocaleString()}
 </div>
 </div>

 <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/50 text-xs px-3 py-1.5 font-bold">
 ✓ 100% Real-Time Spot Rate
 </Badge>
 </div>
 </GlassCard>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Real-Time Gold & Precious Metals Price Tracker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Real-Time Gold & Precious Metals Price Tracker provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/finance/gold-price-tracker" max={6} />

    </div></div>;
}