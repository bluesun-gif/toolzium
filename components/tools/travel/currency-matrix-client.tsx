"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Grid, DollarSign, Globe, Trash } from"lucide-react";
import toast from"react-hot-toast";

const ALL_CURRENCIES = ["USD","EUR","GBP","JPY","CAD","AUD","BDT","INR"];

// Mock exchange rates relative to USD
const MOCK_RATES: Record<string, number> = {
 USD: 1,
 EUR: 0.92,
 GBP: 0.79,
 JPY: 150.5,
 CAD: 1.35,
 AUD: 1.53,
 BDT: 110.0,
 INR: 83.0,
};

export function CurrencyMatrixClient() {
 const [currencies, setCurrencies] = useState<string[]>(["USD","EUR","GBP","JPY"]);
 const [newCurrency, setNewCurrency] = useState("");

 useEffect(() => {
 const saved = localStorage.getItem("currency-matrix");
 if (saved) {
 try {
 setCurrencies(JSON.parse(saved));
 } catch (e) {
 // ignore
 }
 }
 }, []);

 const saveCurrencies = (newCurrencies: string[]) => {
 setCurrencies(newCurrencies);
 localStorage.setItem("currency-matrix", JSON.stringify(newCurrencies));
 };

 const handleAddCurrency = () => {
 if (!newCurrency) return;
 if (currencies.includes(newCurrency)) {
 toast.error("Currency already in the matrix");
 return;
 }
 if (currencies.length >= 8) {
 toast.error("Maximum 8 currencies allowed");
 return;
 }
 saveCurrencies([...currencies, newCurrency]);
 setNewCurrency("");
 };

 const handleRemoveCurrency = (c: string) => {
 if (currencies.length <= 2) {
 toast.error("Minimum 2 currencies required");
 return;
 }
 saveCurrencies(currencies.filter(curr => curr !== c));
 };

 const handleReset = () => {
 saveCurrencies(["USD","EUR","GBP","JPY"]);
 toast.success("Reset to default");
 };

 const getMatrixText = () => {
 let text ="Currency Matrix\n\n\t"+ currencies.join("\t") +"\n";
 currencies.forEach(row => {
 text += row +"\t";
 currencies.forEach(col => {
 const rate = MOCK_RATES[col] / MOCK_RATES[row];
 text += rate.toFixed(4) +"\t";
 });
 text +="\n";
 });
 return text;
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Grid}
 title="Multi-Currency Exchange Matrix"
 description="Cross-rate matrix table for multi-currency travel planning."
 actions={
 <div className="flex space-x-2">
 <CopyButton getText={getMatrixText} label="Copy Matrix"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </div>
 }
 />
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Manage Currencies</CardTitle>
 <CardDescription>Select up to 8 currencies to view cross rates.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex items-center space-x-2">
 <Select value={newCurrency} onValueChange={setNewCurrency}>
 <SelectTrigger className="w-[180px]">
 <SelectValue placeholder="Add currency"/>
 </SelectTrigger>
 <SelectContent>
 {ALL_CURRENCIES.filter(c => !currencies.includes(c)).map(c => (
 <SelectItem key={c} value={c}>{c}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 <Button onClick={handleAddCurrency}>Add</Button>
 </div>
 
 <div className="flex flex-wrap gap-2">
 {currencies.map(c => (
 <div key={c} className="flex items-center space-x-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
 <span>{c}</span>
 <button onClick={() => handleRemoveCurrency(c)} className="hover:text-red-500">
 <Trash className="w-3 h-3"/>
 </button>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Exchange Matrix</CardTitle>
 <CardDescription>Row = Base Currency, Column = Target Currency. Values are illustrative.</CardDescription>
 </CardHeader>
 <CardContent className="overflow-x-auto">
 <table className="w-full text-sm text-left border-collapse">
 <thead>
 <tr>
 <th className="p-3 border-b bg-muted/50 font-medium">Base \ Target</th>
 {currencies.map(col => (
 <th key={col} className="p-3 border-b bg-muted/50 font-medium">{col}</th>
 ))}
 </tr>
 </thead>
 <tbody>
 {currencies.map(row => (
 <tr key={row} className="hover:bg-muted/50 transition-colors">
 <td className="p-3 border-b font-medium">{row}</td>
 {currencies.map(col => {
 const rate = MOCK_RATES[col] / MOCK_RATES[row];
 return (
 <td key={col} className="p-3 border-b">
 {rate.toFixed(4)}
 </td>
 );
 })}
 </tr>
 ))}
 </tbody>
 </table>
 </CardContent>
 </GlassCard>
 </div>
 );
}
