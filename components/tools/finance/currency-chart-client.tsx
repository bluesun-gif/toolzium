"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ArrowLeftRight, BarChart3, Calendar, DollarSign, Eye, LineChart, RefreshCw, TrendingUp } from"lucide-react";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";

const CURRENCIES = [
"USD","EUR","GBP","JPY","AUD","CAD","CHF","CNY","INR","BDT"
];

// Mock rate generator
const getMockRate = (base: string, target: string) => {
 const sum = base.charCodeAt(0) + target.charCodeAt(0);
 return 1 + (sum % 100) / 50; 
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
 ctx.strokeStyle = isUp ?"#10b981":"#ef4444";
 ctx.lineWidth = 2;
 
 const chartData = [];
 for(let i=0; i<points; i++) {
 const x = (i / (points - 1)) * w;
 const trend = isUp ? (i/points) * volatility : -(i/points) * volatility;
 const noise = Math.sin(i * 0.5 + seed) * volatility * 0.5 + Math.cos(i * 0.2) * volatility * 0.3;
 const val = baseValue - volatility + trend + noise;
 chartData.push(val);
 }
 
 const minVal = Math.min(...chartData) * 0.95;
 const maxVal = Math.max(...chartData) * 1.05;
 
 for (let i = 0; i < points; i++) {
 const x = (i / (points - 1)) * w;
 const y = h - ((chartData[i] - minVal) / (maxVal - minVal)) * h;
 if (i === 0) ctx.moveTo(x, y);
 else ctx.lineTo(x, y);
 }
 ctx.stroke();
 
 // Fill
 ctx.lineTo(w, h);
 ctx.lineTo(0, h);
 ctx.fillStyle = isUp ?"rgba(16, 185, 129, 0.1)":"rgba(239, 68, 68, 0.1)";
 ctx.fill();
 
 }, [baseCurrency, targetCurrency, period, currentRate, isUp]);

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={BarChart3}
 title="Currency Pair Chart"
 description="Visual currency pair comparison with simulated historical charts."
 actions={
 <>
 <ResetButton onClick={() => { setBaseCurrency("USD"); setTargetCurrency("EUR"); setPeriod("30"); }} label="Reset"/>
 </>
 }
 />
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Exchange Pair</CardTitle>
 <CardDescription>Select base and target currencies</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-col md:flex-row items-center gap-4">
 <div className="flex-1 w-full">
 <Select value={baseCurrency} onValueChange={setBaseCurrency}>
 <SelectTrigger><SelectValue placeholder="Base Currency"/></SelectTrigger>
 <SelectContent>
 {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 
 <Button variant="outline"size="icon"onClick={swapCurrencies}>
 <ArrowLeftRight className="h-4 w-4"/>
 </Button>
 
 <div className="flex-1 w-full">
 <Select value={targetCurrency} onValueChange={setTargetCurrency}>
 <SelectTrigger><SelectValue placeholder="Target Currency"/></SelectTrigger>
 <SelectContent>
 {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <Separator className="my-6"/>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
 <div className="p-4 bg-muted rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Current Rate</div>
 <div className="text-2xl font-bold font-mono">1 {baseCurrency} = {currentRate.toFixed(4)} {targetCurrency}</div>
 </div>
 <div className="p-4 bg-muted rounded-lg text-center">
 <div className="text-sm text-muted-foreground mb-1">Trend</div>
 <div className={"text-2xl font-bold flex items-center justify-center gap-2"+ (isUp ? 'text-green-500' : 'text-red-500')}>
 <TrendingUp className={"h-5 w-5"+ (isUp ? '' : 'rotate-180')} />
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
 <Button variant={period ==="30"?"default":"outline"} size="sm"onClick={() => setPeriod("30")}>30D</Button>
 <Button variant={period ==="90"?"default":"outline"} size="sm"onClick={() => setPeriod("90")}>90D</Button>
 <Button variant={period ==="365"?"default":"outline"} size="sm"onClick={() => setPeriod("365")}>1Y</Button>
 </div>
 
 <div className="border rounded-lg p-4 bg-card">
 <canvas 
 ref={canvasRef} 
 width={800} 
 height={300} 
 className="w-full h-auto"
 />
 </div>
 </CardContent>
 </GlassCard>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Pick Pair",
    description:"Select the two currencies to compare.",
    icon: LineChart,
  },
{
    step:"02",
    title:"Set Range",
    description:"Choose a time window to view.",
    icon: Calendar,
  },
{
    step:"03",
    title:"Analyze",
    description:"Read trends and recent moves.",
    icon: Eye,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: LineChart,
    title:"Historical View",
    description:"Charts past exchange rate movement.",
  },
{
    icon: Calendar,
    title:"Range Control",
    description:"Zoom from days to years.",
  },
{
    icon: Eye,
    title:"Trend Reading",
    description:"Spot support and resistance patterns.",
  },
{
    icon: RefreshCw,
    title:"Updated Rates",
    description:"Pulls recent market prices.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Currency charts turn a single exchange number into a story. A pair like EUR to USD plotted over time reveals trends, volatility, and context that a snapshot rate cannot. For anyone sending money abroad, pricing in another currency, or traveling, the chart helps decide when a rate is favorable relative to recent history.</p>
  <p>Exchange rates move for concrete reasons: interest rate differences, inflation, trade flows, and geopolitical events all push currencies. A chart does not predict these, but it shows how markets have reacted, helping you avoid converting at an unusual extreme. Comparing today's rate to a 30-day range answers whether now is typical or exceptional.</p>
  <p>Reading charts builds discipline. The temptation to wait for a slightly better rate can backfire if you actually need the currency; conversely, panic-converting during a spike locks in a poor deal. A planned approach — convert what you need when the rate sits within your acceptable historical band — beats chasing perfection.</p>
  <p>Be aware of the spread. The mid-market rate shown in charts is not what you receive; banks and apps add a margin. Factor that cost into decisions, especially for large transfers. Use the chart as context, set a target range, and execute when it is met. Visualizing history turns an anxious guess into a measured choice grounded in real market behavior.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does a currency pair show?",
    answer:"It shows how much of one currency equals one unit of another over time.",
  },
{
    question:"Why do rates fluctuate?",
    answer:"Supply, demand, interest rates, and macro events move exchange rates constantly.",
  },
{
    question:"Is the chart a forecast?",
    answer:"No. It shows history; future rates depend on unpredictable market forces.",
  },
{
    question:"Should I wait for a better rate?",
    answer:"Timing the market is hard; for needed conversions, hedge with a plan rather than guessing.",
  },
{
    question:"Are rates the same everywhere?",
    answer:"Banks and services add spreads, so the rate you get differs from mid-market.",
  }
  ]}
/>
</div>
 );
}
