"use client";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Percent, ArrowLeftRight, Calculator, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
export function RateConverterClient() {
  const [rate, setRate] = useState("5");
  const [rateType, setRateType] = useState("nominal");
  const [frequency, setFrequency] = useState("12"); // Monthly default

  const handleReset = () => {
    setRate("5");
    setRateType("nominal");
    setFrequency("12");
  };
  const calculateRates = () => {
    const r = parseFloat(rate) / 100;
    if (isNaN(r) || r < 0) return null;
    const n = parseInt(frequency);
    let nominalRate = 0;
    let effectiveRate = 0;
    if (rateType === "nominal") {
      nominalRate = r;
      effectiveRate = Math.pow(1 + nominalRate / n, n) - 1;
    } else {
      effectiveRate = r;
      nominalRate = n * (Math.pow(1 + effectiveRate, 1 / n) - 1);
    }
    const frequencies = [{
      label: "Daily",
      n: 365
    }, {
      label: "Weekly",
      n: 52
    }, {
      label: "Monthly",
      n: 12
    }, {
      label: "Quarterly",
      n: 4
    }, {
      label: "Semi-Annually",
      n: 2
    }, {
      label: "Annually",
      n: 1
    }];
    return {
      nominalRate,
      effectiveRate,
      conversions: frequencies.map(f => {
        const nom = f.n === n && rateType === "nominal" ? r : rateType === "effective" ? f.n * (Math.pow(1 + effectiveRate, 1 / f.n) - 1) : f.n * (Math.pow(1 + nominalRate / n, n / f.n) - 1);
        const eff = Math.pow(1 + nom / f.n, f.n) - 1;
        return {
          frequency: f.label,
          nominal: (nom * 100).toFixed(4),
          effective: (eff * 100).toFixed(4)
        };
      })
    };
  };
  const results = calculateRates();
  const getResultsText = () => {
    if (!results) return "";
    return results.conversions.map(c => `${c.frequency}: Nominal ${c.nominal}% | Effective (APY) ${c.effective}%`).join('\n');
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Percent} title="Interest Rate Converter" description="Convert between APR/Nominal and APY/Effective rates across different compounding frequencies." actions={<ResetButton onClick={handleReset} label="Reset" />} />
 
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
 <div className="lg:col-span-4 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Input Rate</CardTitle>
 <CardDescription>Enter the rate you want to convert.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Interest Rate (%)</Label>
 <Input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.01" min="0" />
 </div>
 <div className="space-y-2">
 <Label>Rate Type</Label>
 <Select value={rateType} onValueChange={setRateType}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="nominal">Nominal Rate (APR)</SelectItem>
 <SelectItem value="effective">Effective Rate (APY/EAR)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Compounding Frequency</Label>
 <Select value={frequency} onValueChange={setFrequency}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="365">Daily</SelectItem>
 <SelectItem value="52">Weekly</SelectItem>
 <SelectItem value="12">Monthly</SelectItem>
 <SelectItem value="4">Quarterly</SelectItem>
 <SelectItem value="2">Semi-Annually</SelectItem>
 <SelectItem value="1">Annually</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2 text-base">
 <Calculator className="w-4 h-4" /> Formulas
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4 text-sm text-muted-foreground">
 <div>
 <strong className="text-foreground">Nominal to Effective (APY):</strong>
 <p>r<sub>eff</sub> = (1 + r<sub>nom</sub> / n)<sup>n</sup> - 1</p>
 </div>
 <Separator />
 <div>
 <strong className="text-foreground">Effective to Nominal (APR):</strong>
 <p>r<sub>nom</sub> = n × ((1 + r<sub>eff</sub>)<sup>1/n</sup> - 1)</p>
 </div>
 <div className="text-xs pt-2">
 * n = number of compounding periods per year
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="lg:col-span-8">
 <GlassCard className="h-full">
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle className="flex items-center gap-2">
 <ArrowLeftRight className="w-5 h-5" /> Conversion Results
 </CardTitle>
 <CardDescription>Equivalent rates for different frequencies</CardDescription>
 </div>
 {results && <CopyButton getText={getResultsText} label="Copy Table" />}
 </CardHeader>
 <CardContent>
 {results ? <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-lg">
 <tr>
 <th className="px-4 py-3 rounded-tl-lg">Frequency</th>
 <th className="px-4 py-3">Nominal Rate (APR)</th>
 <th className="px-4 py-3 rounded-tr-lg">Effective Rate (APY)</th>
 </tr>
 </thead>
 <tbody>
 {results.conversions.map((conv, idx) => {
                      const isSelected = frequency === (conv.frequency === "Daily" ? "365" : conv.frequency === "Weekly" ? "52" : conv.frequency === "Monthly" ? "12" : conv.frequency === "Quarterly" ? "4" : conv.frequency === "Semi-Annually" ? "2" : "1");
                      return <tr key={idx} className={cn("border-b last:border-0", isSelected ? 'bg-primary/10 font-medium' : '')}>
 <td className="px-4 py-3">{conv.frequency} {isSelected && <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Input</span>}</td>
 <td className="px-4 py-3">{conv.nominal}%</td>
 <td className="px-4 py-3">{conv.effective}%</td>
 </tr>;
                    })}
 </tbody>
 </table>
 <div className="mt-6 p-4 bg-muted/30 rounded-lg border text-sm">
 <strong>Summary: </strong> 
 A {rateType === "nominal" ? "Nominal (APR)" : "Effective (APY)"} rate of <strong>{rate}%</strong> compounded <strong>
 {frequency === "365" ? "Daily" : frequency === "52" ? "Weekly" : frequency === "12" ? "Monthly" : frequency === "4" ? "Quarterly" : frequency === "2" ? "Semi-Annually" : "Annually"}
 </strong> is mathematically equivalent to a true Annual Percentage Yield (APY) of <strong>{(results.effectiveRate * 100).toFixed(4)}%</strong>.
 </div>
 </div> : <div className="text-center py-12 text-muted-foreground">
 Enter a valid interest rate to see conversions.
 </div>}
 </CardContent>
 

<ToolHowItWorks
  steps={[
  {
    step:"01",
    title:"Enter Rate",
    description:"Input an annual or periodic rate.",
    icon: Percent,
  },
  {
    step:"02",
    title:"Pick Bases",
    description:"Choose annual, monthly, or daily basis.",
    icon: Calendar,
  },
  {
    step:"03",
    title:"Convert",
    description:"See the equivalent on another basis.",
    icon: RefreshCw,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
  {
    icon: Percent,
    title:"Any Rate",
    description:"Convert between nominal bases.",
  },
  {
    icon: Calendar,
    title:"Period Flex",
    description:"Annual, monthly, daily conversion.",
  },
  {
    icon: RefreshCw,
    title:"Instant",
    description:"Recalculates equivalents live.",
  },
  {
    icon: Calculator,
    title:"APY View",
    description:"Shows effective annual yield.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An interest rate converter untangles the confusion of differently quoted rates. A loan at 12 percent compounded monthly is not the same as 12 percent compounded daily, and savings products quote APY while loans quote APR. This tool converts between bases so you compare offers on equal footing.</p>
  <p>The key distinction is nominal versus effective rate. Nominal is the stated periodic rate; effective (APY) includes compounding, revealing the true annual cost or yield. Two products with identical nominal rates but different compounding frequencies are not equal, and conversion exposes the difference before you commit.</p>
  <p>Basis choice matters for comparison. Monthly, daily, and annual quotations all describe the same underlying rate differently. The converter translates among them so a daily-compounded savings account and a monthly-compounded loan can be weighed directly. This prevents the common error of comparing apples to oranges.</p>
  <p>Use it whenever evaluating credit or deposit products. Enter the quoted rate and basis, then see the equivalent on the basis your other options use. The tool's value is fairness: it strips marketing ambiguity from rate quotes so your decision rests on the real number, not the most flattering presentation.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
  {
    question:"Why convert rate bases?",
    answer:"Lenders quote different bases; conversion enables fair comparison.",
  },
  {
    question:"Nominal vs effective?",
    answer:"Effective includes compounding; nominal does not.",
  },
  {
    question:"Daily vs monthly?",
    answer:"More frequent compounding yields slightly more.",
  },
  {
    question:"Is this for loans or savings?",
    answer:"Both; the math is symmetric.",
  },
  {
    question:"What is APY?",
    answer:"Annual Percentage Yield reflects true annual return with compounding.",
  }
  ]}
/>
</GlassCard>
 </div>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter a rate and basis in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your APR, APY, and periodic equivalents, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "APR to APY",
        description: "APR to APY"
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
          <h3>Why Use the Interest Rate Converter?</h3>
          <p>
            Convert between nominal and effective rates so '12% APR' and '12.68% APY' finally mean the same thing.
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

      <RelatedTools currentToolUrl="/tools/finance/rate-converter" max={6} />

    </div></div>;
}