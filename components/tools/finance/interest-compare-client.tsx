"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import {
 CardContent,
 CardHeader,
 CardTitle,
 CardDescription,
} from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from"@/components/ui/select";
import { ResetButton } from"@/components/shared/action-buttons";
import {
 TrendingUp,
 Calculator,
 DollarSign,
 BarChart3,
 Plus,
 Trash2,
} from"lucide-react";
import { Button } from"@/components/ui/button";
import { Separator } from"@/components/ui/separator";

interface RateOption {
 id: string;
 rate: number;
 frequency: number;
}

export function InterestCompareClient() {
 const [principal, setPrincipal] = useState<number>(10000);
 const [options, setOptions] = useState<RateOption[]>([
 { id:"1", rate: 4.0, frequency: 12 },
 { id:"2", rate: 5.0, frequency: 1 },
 ]);

 const addOption = () => {
 if (options.length >= 4) return;
 setOptions([
 ...options,
 { id: Math.random().toString(), rate: 3.5, frequency: 12 },
 ]);
 };

 const removeOption = (id: string) => {
 setOptions(options.filter((o) => o.id !== id));
 };

 const updateOption = (id: string, field: keyof RateOption, value: number) => {
 setOptions(
 options.map((o) => (o.id === id ? { ...o, [field]: value } : o)),
 );
 };

 const handleReset = () => {
 setPrincipal(10000);
 setOptions([
 { id:"1", rate: 4.0, frequency: 12 },
 { id:"2", rate: 5.0, frequency: 1 },
 ]);
 };

 const calculateFutureValue = (
 principalAmount: number,
 rate: number,
 freq: number,
 years: number,
 ) => {
 const r = rate / 100;
 return principalAmount * Math.pow(1 + r / freq, freq * years);
 };

 const yearsToCompare = [1, 5, 10, 20, 30];

 return (
 <div className="space-y-6">
 <ToolPageHeader
 title="Interest Rate Comparison"
 description="Compare savings and investment returns across different interest rates and compounding frequencies."
 icon={TrendingUp}
 actions={<ResetButton onClick={handleReset} />}
 />

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <DollarSign className="h-5 w-5"/> Initial Principal
 </CardTitle>
 <CardDescription>
 Enter the starting amount for your investment or savings
 </CardDescription>
 </CardHeader>
 <CardContent>
 <div className="max-w-xs space-y-2">
 <Label>Principal Amount ($)</Label>
 <Input
 type="number"
 value={principal ||""}
 onChange={(e) => setPrincipal(Number(e.target.value))}
 />
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="h-5 w-5"/> Rate Options
 </CardTitle>
 <CardDescription>
 Add up to 4 different rates to compare
 </CardDescription>
 </div>
 <Button
 variant="outline"
 size="sm"
 onClick={addOption}
 disabled={options.length >= 4}
 >
 <Plus className="h-4 w-4 mr-1"/> Add Rate
 </Button>
 </CardHeader>
 <CardContent className="space-y-4">
 {options.map((option, index) => (
 <div
 key={option.id}
 className="p-4 border rounded-md relative space-y-4"
 >
 <div className="flex justify-between items-center mb-2">
 <h4 className="font-semibold text-sm">Option {index + 1}</h4>
 {options.length > 1 && (
 <Button
 variant="ghost"
 size="icon"
 onClick={() => removeOption(option.id)}
 className="h-6 w-6"
 >
 <Trash2 className="h-4 w-4 text-destructive"/>
 </Button>
 )}
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Interest Rate (%)</Label>
 <Input
 type="number"
 step="0.1"
 value={option.rate ||""}
 onChange={(e) =>
 updateOption(option.id,"rate", Number(e.target.value))
 }
 />
 </div>
 <div className="space-y-2">
 <Label>Compounding</Label>
 <Select
 value={option.frequency.toString()}
 onValueChange={(v) =>
 updateOption(option.id,"frequency", Number(v))
 }
 >
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="365">Daily</SelectItem>
 <SelectItem value="12">Monthly</SelectItem>
 <SelectItem value="4">Quarterly</SelectItem>
 <SelectItem value="1">Annually</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </div>
 ))}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <BarChart3 className="h-5 w-5"/> Comparison Results
 </CardTitle>
 <CardDescription>Growth projection over time</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-xs uppercase bg-muted/50">
 <tr>
 <th className="px-4 py-3">Years</th>
 {options.map((opt, i) => (
 <th key={opt.id} className="px-4 py-3">
 Option {i + 1}
 </th>
 ))}
 </tr>
 </thead>
 <tbody>
 {yearsToCompare.map((year) => {
 const values = options.map((opt) =>
 calculateFutureValue(
 principal || 0,
 opt.rate,
 opt.frequency,
 year,
 ),
 );
 const maxVal = Math.max(...values);
 return (
 <tr key={year} className="border-b">
 <td className="px-4 py-3 font-semibold">
 {year} Year{year > 1 ?"s":""}
 </td>
 {values.map((val, idx) => (
 <td
 key={idx}
 className={"px-4 py-3"+ (val === maxVal && options.length > 1 ?"text-green-600 font-bold dark:text-green-400":"")}
 >
 $
 {val.toLocaleString(undefined, {
 minimumFractionDigits: 2,
 maximumFractionDigits: 2,
 })}
 </td>
 ))}
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>

 <Separator className="my-6"/>

 <h4 className="font-semibold mb-4 text-sm">
 Total Interest Earned (30 Years)
 </h4>
 <div className="space-y-3">
 {options.map((opt, idx) => {
 const totalVal = calculateFutureValue(
 principal || 0,
 opt.rate,
 opt.frequency,
 30,
 );
 const totalInt = totalVal - (principal || 0);
 return (
 <div key={opt.id} className="flex justify-between text-sm">
 <span>
 Option {idx + 1} ({opt.rate}%):
 </span>
 <span className="font-medium">
 $
 {totalInt.toLocaleString(undefined, {
 minimumFractionDigits: 2,
 maximumFractionDigits: 2,
 })}
 </span>
 </div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
