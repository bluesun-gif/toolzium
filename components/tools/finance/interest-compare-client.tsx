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
import { TrendingUp, Calculator, DollarSign, BarChart3, Plus, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { Button } from"@/components/ui/button";
import { Separator } from"@/components/ui/separator";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

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
      <div className="relative space-y-6">
      <GridPattern />

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
 className={cn("px-4 py-3", (val === maxVal && options.length > 1 ?"text-green-600 font-bold dark:text-green-400":""))}
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
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Interest Rate Comparison?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Interest Rate Comparison provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/finance/interest-compare" max={6} />

</div>
 );
}
