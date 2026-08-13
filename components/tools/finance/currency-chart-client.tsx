"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, ArrowLeftRight, TrendingUp, DollarSign, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "BDT"];

// Mock rate generator
const getMockRate = (base: string, target: string) => {
  const sum = base.charCodeAt(0) + target.charCodeAt(0);
  return 1 + sum % 100 / 50;
};
export function CurrencyChartClient() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [period, setPeriod] = useState("30"); // 30, 90, 365
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentRate = getMockRate(baseCurrency, targetCurrency);
  const isUp = baseCurrency.charCodeAt(0) > targetCurrency.charCodeAt(0);
  const swapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw chart
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const points = parseInt(period);
    const baseValue = currentRate;
    const volatility = 0.05 * baseValue;
    const seed = baseCurrency.charCodeAt(0) + targetCurrency.charCodeAt(0);
    ctx.beginPath();
    ctx.strokeStyle = isUp ? "#10b981" : "#ef4444";
    ctx.lineWidth = 2;
    const chartData = [];
    for (let i = 0; i < points; i++) {
      const x = i / (points - 1) * w;
      const trend = isUp ? i / points * volatility : -(i / points) * volatility;
      const noise = Math.sin(i * 0.5 + seed) * volatility * 0.5 + Math.cos(i * 0.2) * volatility * 0.3;
      const val = baseValue - volatility + trend + noise;
      chartData.push(val);
    }
    const minVal = Math.min(...chartData) * 0.95;
    const maxVal = Math.max(...chartData) * 1.05;
    for (let i = 0; i < points; i++) {
      const x = i / (points - 1) * w;
      const y = h - (chartData[i] - minVal) / (maxVal - minVal) * h;
      if (i === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Fill
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fillStyle = isUp ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)";
    ctx.fill();
  }, [baseCurrency, targetCurrency, period, currentRate, isUp]);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={BarChart3} title="Currency Pair Chart" description="Visual currency pair comparison with simulated historical charts." actions={<>
 <ResetButton onClick={() => {
          setBaseCurrency("USD");
          setTargetCurrency("EUR");
          setPeriod("30");
        }} label="Reset" />
 </>} />
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Exchange Pair</CardTitle>
 <CardDescription>Select base and target currencies</CardDescription>
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
 <div className="text-2xl font-bold font-mono">1 {baseCurrency} = {currentRate.toFixed(4)} {targetCurrency}</div>
 </div>
 <div className="p-4 bg-muted rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Trend</div>
 <div className={cn("text-2xl font-bold flex items-center justify-center gap-2", isUp ? 'text-green-500' : 'text-red-500')}>
 <TrendingUp className={cn("h-5 w-5", isUp ? '' : 'rotate-180')} />
 {isUp ? '+2.4%' : '-1.8%'}
 </div>
 </div>
 <div className="p-4 bg-muted rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Status</div>
 <div className="text-xl font-semibold flex items-center justify-center text-primary">
 Simulated
 </div>
 </div>
 </div>
 
 <div className="mb-4 flex justify-end gap-2">
 <Button variant={period === "30" ? "default" : "outline"} size="sm" onClick={() => setPeriod("30")}>30D</Button>
 <Button variant={period === "90" ? "default" : "outline"} size="sm" onClick={() => setPeriod("90")}>90D</Button>
 <Button variant={period === "365" ? "default" : "outline"} size="sm" onClick={() => setPeriod("365")}>1Y</Button>
 </div>
 
 <div className="border rounded-lg p-4 bg-card">
 <canvas ref={canvasRef} width={800} height={300} className="w-full h-auto" />
 </div>
 </CardContent>
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
          <h3>Why Use Our Currency Pair Chart?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Currency Pair Chart provides
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

      <RelatedTools currentToolUrl="/tools/finance/currency-chart" max={6} />

    </div></div>;
}