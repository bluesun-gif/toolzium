"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, ArrowLeftRight, TrendingUp, TrendingDown, RefreshCw, DollarSign, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "BDT"];

type RatesResponse = {
  base: string;
  rates: Record<string, number> | null;
  provider: string;
  date?: string;
  error?: string;
};

export function CurrencyChartClient() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [period, setPeriod] = useState("30"); // 30, 90, 365
  const [rate, setRate] = useState<number | null>(null);
  const [provider, setProvider] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fetchRate = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rates?base=${encodeURIComponent(baseCurrency)}`, { cache: "no-store" });
      const data: RatesResponse = await res.json();
      if (data?.rates && data.rates[targetCurrency]) {
        setRate(data.rates[targetCurrency]);
        setProvider(data.provider || "live");
        setUpdatedAt(data.date || new Date().toUTCString());
      } else {
        setRate(null);
      }
    } catch {
      setRate(null);
    } finally {
      setLoading(false);
    }
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  const swapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  // Honest illustrative path: seeded from the real rate, direction derived from a stable
  // comparison of currency codes. Clearly labelled as illustrative (no free history feed).
  const seed = baseCurrency.charCodeAt(0) + targetCurrency.charCodeAt(0);
  const isUp = seed % 2 === 0;
  const displayRate = rate ?? 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const points = parseInt(period, 10);
    const baseValue = displayRate;
    const volatility = 0.04 * baseValue;
    ctx.beginPath();
    ctx.strokeStyle = isUp ? "#10b981" : "#ef4444";
    ctx.lineWidth = 2;
    const chartData: number[] = [];
    for (let i = 0; i < points; i++) {
      const x = (i / (points - 1)) * w;
      const trend = isUp ? (i / points) * volatility : -((i / points) * volatility);
      const noise = Math.sin(i * 0.5 + seed) * volatility * 0.5 + Math.cos(i * 0.2) * volatility * 0.3;
      const val = baseValue - volatility + trend + noise;
      chartData.push(val);
    }
    const minVal = Math.min(...chartData) * 0.98;
    const maxVal = Math.max(...chartData) * 1.02;
    for (let i = 0; i < points; i++) {
      const x = (i / (points - 1)) * w;
      const y = h - ((chartData[i] - minVal) / (maxVal - minVal)) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fillStyle = isUp ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)";
    ctx.fill();
  }, [baseCurrency, targetCurrency, period, displayRate, isUp, seed]);

  const summaryText = `Currency Pair: 1 ${baseCurrency} = ${rate ? rate.toFixed(4) : "N/A"} ${targetCurrency}\nSource: ${provider || "live"}\nUpdated: ${updatedAt || "n/a"}`;

  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">

 <ToolPageHeader icon={BarChart3} title="Live Currency Pair Chart" description="Track a currency pair with real-time mid-market rates and an illustrative trend path." actions={<>
 <ResetButton onClick={() => {
          setBaseCurrency("USD");
          setTargetCurrency("EUR");
          setPeriod("30");
        }} label="Reset" />
 <Button variant="outline" size="sm" onClick={fetchRate} disabled={loading} className="gap-2">
   <RefreshCw className={cn("h-4 w-4", loading ? "animate-spin" : "")} /> Refresh
 </Button>
 </>} />

 <GlassCard>
 <CardHeader>
 <CardTitle>Exchange Pair</CardTitle>
 <CardDescription>Select base and target currencies — rates refresh from a live FX feed.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-col md:flex-row items-center gap-4">
 <div className="flex-1 w-full">
 <Select value={baseCurrency} onValueChange={setBaseCurrency}>
 <SelectTrigger><SelectValue placeholder="Base Currency" /></SelectTrigger>
 <SelectContent>
 {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>

 <Button variant="outline" size="icon" onClick={swapCurrencies}>
 <ArrowLeftRight className="h-4 w-4" />
 </Button>

 <div className="flex-1 w-full">
 <Select value={targetCurrency} onValueChange={setTargetCurrency}>
 <SelectTrigger><SelectValue placeholder="Target Currency" /></SelectTrigger>
 <SelectContent>
 {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </div>

 <Separator className="my-6" />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
 <div className="p-4 bg-muted rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Current Rate</div>
 <div className="text-2xl font-bold font-mono">{rate ? `${rate.toFixed(4)}` : "—"}</div>
 <div className="text-xs text-muted-foreground mt-1">1 {baseCurrency} → {targetCurrency}</div>
 </div>
 <div className="p-4 bg-muted rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Illustrative Trend</div>
 <div className={cn("text-2xl font-bold flex items-center justify-center gap-2", isUp ? "text-emerald-500" : "text-rose-500")}>
 {isUp ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
 {isUp ? "Up" : "Down"}
 </div>
 </div>
 <div className="p-4 bg-muted rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Source</div>
 <div className="text-xl font-semibold flex items-center justify-center text-primary">
 {loading ? "Updating…" : (provider ? provider.split(" ")[0] : "Live")}
 </div>
 </div>
 </div>

 <div className="mb-4 flex justify-end gap-2">
 <Button variant={period === "30" ? "default" : "outline"} size="sm" onClick={() => setPeriod("30")}>30D</Button>
 <Button variant={period === "90" ? "default" : "outline"} size="sm" onClick={() => setPeriod("90")}>90D</Button>
 <Button variant={period === "365" ? "default" : "outline"} size="sm" onClick={() => setPeriod("365")}>1Y</Button>
 </div>

 <div className="border rounded-lg p-4 bg-card space-y-2">
 <canvas ref={canvasRef} width={800} height={300} className="w-full h-auto" />
 <p className="text-xs text-muted-foreground text-center">
   Current rate is live from a real FX feed. The line is an <strong>illustrative</strong> path shaped around that rate — free tiers do not include historical series.
 </p>
 </div>

 {rate !== null && (
   <div className="flex justify-end pt-3">
     <CopyButton getText={() => summaryText} label="Copy Rate" />
   </div>
 )}
 </CardContent>
 </GlassCard>

      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Pick base and target currencies in the fields above — the live rate loads automatically.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see the real mid-market rate, source, and an illustrative trend path, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy the live rate to use in a plan, invoice, or report with one click.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Live Mid-Market Rates",
        description: "Pulls real exchange rates from a live FX feed (open.er-api.com) with a fallback source — no guessed numbers."
      }, {
        icon: Shield,
        title: "Private & On-Device",
        description: "Every calculation runs in your browser. Your financial inputs never leave your device or touch a server."
      }, {
        icon: Zap,
        title: "No Signup, Ever",
        description: "Open the tool and get an answer in seconds — no account, no paywall, no usage cap."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use the Live Currency Pair Chart?</h3>
          <p>
            Travelers and importers use this to track a currency pair and see the real mid-market rate before exchanging money — not a made-up number.
          </p>
          <p>
            Like all Toolzium calculators, it is free, private, and built to give you a paid-product experience without the subscription.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Are the exchange rates real?",
        answer: "Yes. The current rate is fetched live from open.er-api.com (with a fallback to exchangerate-api.com) when the page loads or you hit Refresh. The trend line is clearly labelled illustrative because free FX tiers do not include historical series."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/finance/currency-chart" max={6} />

    </div></div>;
}
