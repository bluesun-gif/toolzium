"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

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
import { BarChart3, Calculator, DollarSign, Percent, Plus, Scale, Trash2, TrendingDown, TrendingUp } from"lucide-react";
import { Button } from"@/components/ui/button";
import { Separator } from"@/components/ui/separator";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { TrendingUp, Calculator, DollarSign, BarChart3, Plus, Trash2, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
interface RateOption {
  id: string;
  rate: number;
  frequency: number;
}
export function InterestCompareClient() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [options, setOptions] = useState<RateOption[]>([{
    id: "1",
    rate: 4.0,
    frequency: 12
  }, {
    id: "2",
    rate: 5.0,
    frequency: 1
  }]);
  const addOption = () => {
    if (options.length >= 4) return;
    setOptions([...options, {
      id: Math.random().toString(),
      rate: 3.5,
      frequency: 12
    }]);
  };
  const removeOption = (id: string) => {
    setOptions(options.filter(o => o.id !== id));
  };
  const updateOption = (id: string, field: keyof RateOption, value: number) => {
    setOptions(options.map(o => o.id === id ? {
      ...o,
      [field]: value
    } : o));
  };
  const handleReset = () => {
    setPrincipal(10000);
    setOptions([{
      id: "1",
      rate: 4.0,
      frequency: 12
    }, {
      id: "2",
      rate: 5.0,
      frequency: 1
    }]);
  };
  const calculateFutureValue = (principalAmount: number, rate: number, freq: number, years: number) => {
    const r = rate / 100;
    return principalAmount * Math.pow(1 + r / freq, freq * years);
  };
  const yearsToCompare = [1, 5, 10, 20, 30];
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Interest Rate Comparison" description="Compare savings and investment returns across different interest rates and compounding frequencies." icon={TrendingUp} actions={<ResetButton onClick={handleReset} />} />

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <DollarSign className="h-5 w-5" /> Initial Principal
 </CardTitle>
 <CardDescription>
 Enter the starting amount for your investment or savings
 </CardDescription>
 </CardHeader>
 <CardContent>
 <div className="max-w-xs space-y-2">
 <Label>Principal Amount ($)</Label>
 <Input type="number" value={principal || ""} onChange={e => setPrincipal(Number(e.target.value))} />
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="h-5 w-5" /> Rate Options
 </CardTitle>
 <CardDescription>
 Add up to 4 different rates to compare
 </CardDescription>
 </div>
 <Button variant="outline" size="sm" onClick={addOption} disabled={options.length >= 4}>
 <Plus className="h-4 w-4 mr-1" /> Add Rate
 </Button>
 </CardHeader>
 <CardContent className="space-y-4">
 {options.map((option, index) => <div key={option.id} className="p-4 border rounded-md relative space-y-4">
 <div className="flex justify-between items-center mb-2">
 <h4 className="font-semibold text-sm">Option {index + 1}</h4>
 {options.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeOption(option.id)} className="h-6 w-6">
 <Trash2 className="h-4 w-4 text-destructive" />
 </Button>}
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Interest Rate (%)</Label>
 <Input type="number" step="0.1" value={option.rate || ""} onChange={e => updateOption(option.id, "rate", Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Compounding</Label>
 <Select value={option.frequency.toString()} onValueChange={v => updateOption(option.id, "frequency", Number(v))}>
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
 </div>)}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <BarChart3 className="h-5 w-5" /> Comparison Results
 </CardTitle>
 <CardDescription>Growth projection over time</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-xs uppercase bg-muted/50">
 <tr>
 <th className="px-4 py-3">Years</th>
 {options.map((opt, i) => <th key={opt.id} className="px-4 py-3">
 Option {i + 1}
 </th>)}
 </tr>
 </thead>
 <tbody>
 {yearsToCompare.map(year => {
                    const values = options.map(opt => calculateFutureValue(principal || 0, opt.rate, opt.frequency, year));
                    const maxVal = Math.max(...values);
                    return <tr key={year} className="border-b">
 <td className="px-4 py-3 font-semibold">
 {year} Year{year > 1 ? "s" : ""}
 </td>
 {values.map((val, idx) => <td key={idx} className={cn("px-4 py-3", val === maxVal && options.length > 1 ? "text-green-600 font-bold dark:text-green-400" : "")}>
 $
 {val.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
 </td>)}
 </tr>;
                  })}
 </tbody>
 </table>
 </div>

 <Separator className="my-6" />

 <h4 className="font-semibold mb-4 text-sm">
 Total Interest Earned (30 Years)
 </h4>
 <div className="space-y-3">
 {options.map((opt, idx) => {
                const totalVal = calculateFutureValue(principal || 0, opt.rate, opt.frequency, 30);
                const totalInt = totalVal - (principal || 0);
                return <div key={opt.id} className="flex justify-between text-sm">
 <span>
 Option {idx + 1} ({opt.rate}%):
 </span>
 <span className="font-medium">
 $
 {totalInt.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
 </span>
<<<<<<< HEAD
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Amount",
    description:"Input the loan or deposit amount.",
    icon: DollarSign,
  },
{
    step:"02",
    title:"Add Rates",
    description:"Enter two or more interest rates to compare.",
    icon: Percent,
  },
{
    step:"03",
    title:"Compare",
    description:"See total interest differ across rates.",
    icon: Scale,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: DollarSign,
    title:"Amount Flexible",
    description:"Works for loans or savings.",
  },
{
    icon: Percent,
    title:"Multi-Rate",
    description:"Compare several rates side by side.",
  },
{
    icon: Scale,
    title:"Total Difference",
    description:"Shows lifetime interest gap.",
  },
{
    icon: TrendingDown,
    title:"Savings View",
    description:"Reveals cost of a higher rate.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Interest rate comparison is one of the highest-leverage checks before borrowing or saving. A single percentage point feels tiny in conversation but compounds into thousands over a loan's life. This tool lets you line up multiple rates and see the total interest difference in plain dollars.</p>
  <p>The mechanics are straightforward: for a given principal and term, a higher rate multiplies into a larger total. What surprises people is the scale — on a long mortgage, a 0.5 percent difference can exceed the cost of a major appliance. Comparing up front turns that hidden cost into a visible number you can negotiate against.</p>
  <p>Term length amplifies everything. Short loans blunt the gap between rates; long loans widen it dramatically. The tool models both so you understand whether a slightly higher rate on a short loan is trivial or whether a long loan demands aggressive rate shopping. For savings, the same logic works in your favor — a better rate quietly builds more wealth.</p>
  <p>Use the comparison as a negotiation anchor. Walk into a lender or bank knowing the dollar cost of each rate tier, and ask them to match a competitor. For deposits, pick the highest insured rate that fits your access needs. The tool's value is making the invisible compound effect concrete before you sign, not after you have paid it.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why compare rates?",
    answer:"Small rate differences compound into large sums over time.",
  },
{
    question:"Does term length matter?",
    answer:"Yes, longer terms magnify the gap between rates.",
  },
{
    question:"APR vs nominal rate?",
    answer:"Use APR for loans since it includes fees.",
  },
{
    question:"How accurate is this?",
    answer:"It models simple vs compound assumptions you set.",
  },
{
    question:"Should I always pick the lowest?",
    answer:"Lowest rate is usually best, but check fees and terms.",
  }
  ]}
/>
</div>
 );
 })}
=======
 </div>;
              })}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter amounts and two rates in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your cost difference between the rates, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Side-by-side cost",
        description: "Side-by-side cost"
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
          <h3>Why Use the Interest Rate Comparison?</h3>
          <p>
            Borrowers use this to see the dollar difference between two interest rates before choosing a loan.
          </p>
          <p>
            Like all Toolzium calculators, it is free, private, and built to give you a paid-product experience without the subscription.
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

      <RelatedTools currentToolUrl="/tools/finance/interest-compare" max={6} />

    </div></div>;
}