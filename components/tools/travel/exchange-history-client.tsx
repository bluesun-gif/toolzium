"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { TrendingUp, DollarSign } from"lucide-react";

const CURRENCIES = ["USD","EUR","GBP","JPY","CAD","AUD","CHF","CNY","INR"];

export function ExchangeHistoryClient() {
 const [baseCurrency, setBaseCurrency] = useState("USD");
 const [targetCurrency, setTargetCurrency] = useState("EUR");
 const [days, setDays] = useState("30");
 const [history, setHistory] = useState<{date: string, rate: number}[]>([]);

 useEffect(() => {
 generateHistory();
 }, [baseCurrency, targetCurrency, days]);

 const generateHistory = () => {
 const data = [];
 let currentRate = 1.0;
 
 if (baseCurrency !== targetCurrency) {
 currentRate = 0.8 + Math.random() * 0.4;
 }
 
 const dCount = parseInt(days, 10);
 const now = new Date();
 
 for (let i = dCount; i >= 0; i--) {
 const d = new Date(now);
 d.setDate(d.getDate() - i);
 
 const change = (Math.random() - 0.5) * 0.02;
 currentRate = Math.max(0.01, currentRate + change);
 
 data.push({
 date: d.toISOString().split("T")[0],
 rate: parseFloat(currentRate.toFixed(4))
 });
 }
 
 setHistory(data);
 };

 const getSummary = () => {
 if (history.length === 0) return"No data";
 const rates = history.map(h => h.rate);
 const min = Math.min(...rates);
 const max = Math.max(...rates);
 const avg = (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(4);
 const current = rates[rates.length - 1];
 
 return"Base:"+ baseCurrency +"\nTarget:"+ targetCurrency +"\nPeriod:"+ days +"days\n"+
"Current Rate:"+ current +"\nMin:"+ min +"\nMax:"+ max +"\nAverage:"+ avg;
 };

 const handleReset = () => {
 setBaseCurrency("USD");
 setTargetCurrency("EUR");
 setDays("30");
 };

 const rates = history.map(h => h.rate);
 const currentRate = rates[rates.length - 1] || 0;
 const maxRate = Math.max(...(rates.length ? rates : [0]));
 const minRate = Math.min(...(rates.length ? rates : [0]));
 const avgRate = rates.length ? (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(4) : 0;

 return (
 <div className={"space-y-6"}>
 <ToolPageHeader
 icon={TrendingUp}
 title="Currency Exchange Rate History"
 description="View mock historical exchange rate trends."
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />

 <div className={"grid gap-6 md:grid-cols-3"}>
 <GlassCard className={"md:col-span-1"}>
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"space-y-2"}>
 <Label>Base Currency</Label>
 <Select value={baseCurrency} onValueChange={setBaseCurrency}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className={"space-y-2"}>
 <Label>Target Currency</Label>
 <Select value={targetCurrency} onValueChange={setTargetCurrency}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className={"space-y-2"}>
 <Label>Time Period</Label>
 <Select value={days} onValueChange={setDays}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="30">30 Days</SelectItem>
 <SelectItem value="90">90 Days</SelectItem>
 <SelectItem value="180">6 Months</SelectItem>
 <SelectItem value="365">1 Year</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className={"md:col-span-2"}>
 <CardHeader className={"flex flex-row items-center justify-between"}>
 <CardTitle>Rate Trends</CardTitle>
 <CopyButton getText={getSummary} label="Copy Summary"/>
 </CardHeader>
 <Separator />
 <CardContent className={"pt-6"}>
 <div className={"grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"}>
 <div className={"p-4 bg-muted/50 rounded-lg text-center"}>
 <p className={"text-sm text-muted-foreground"}>Current</p>
 <p className={"text-xl font-bold"}>{currentRate}</p>
 </div>
 <div className={"p-4 bg-muted/50 rounded-lg text-center"}>
 <p className={"text-sm text-muted-foreground"}>Average</p>
 <p className={"text-xl font-bold"}>{avgRate}</p>
 </div>
 <div className={"p-4 bg-muted/50 rounded-lg text-center"}>
 <p className={"text-sm text-muted-foreground"}>Highest</p>
 <p className={"text-xl font-bold text-green-600"}>{maxRate}</p>
 </div>
 <div className={"p-4 bg-muted/50 rounded-lg text-center"}>
 <p className={"text-sm text-muted-foreground"}>Lowest</p>
 <p className={"text-xl font-bold text-red-600"}>{minRate}</p>
 </div>
 </div>

 <div className={"h-[200px] flex items-end gap-1 px-4 border-b border-l pb-2 relative"}>
 {history.map((h, i) => {
 const height = maxRate === minRate ? 50 : ((h.rate - minRate) / (maxRate - minRate)) * 100;
 return (
 <div 
 key={i} 
 className={"flex-1 bg-primary/60 hover:bg-primary transition-all rounded-t-sm"}
 style={{ height: Math.max(2, height) +"%"}}
 title={h.date +":"+ h.rate}
 />
 );
 })}
 </div>
 <div className={"flex justify-between text-xs text-muted-foreground mt-2 px-4"}>
 <span>{history[0]?.date}</span>
 <span>{history[history.length - 1]?.date}</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
