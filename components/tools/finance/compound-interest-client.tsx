"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Copy, Download, Calculator, Sparkles, Shield, Zap } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

interface YearData {
 year: number;
 startBalance: number;
 interestEarned: number;
 contributions: number;
 endBalance: number;
}

export default function CompoundInterestClient() {
 const [principal, setPrincipal] = useState<string>("10000");
 const [rate, setRate] = useState<string>("5");
 const [frequency, setFrequency] = useState<string>("12");
 const [years, setYears] = useState<string>("10");
 const [contribution, setContribution] = useState<string>("100");

 const results = useMemo(() => {
 const p = parseFloat(principal) || 0;
 const r = (parseFloat(rate) || 0) / 100;
 const n = parseInt(frequency) || 12;
 const t = parseInt(years) || 0;
 const pmt = parseFloat(contribution) || 0;

 let currentBalance = p;
 let totalContributions = 0;
 const yearByYear: YearData[] = [];

 let monthlyRate = 0;
 if (r > 0) {
 if (n === 12) {
 monthlyRate = r / 12;
 } else {
 monthlyRate = Math.pow(1 + r / n, n / 12) - 1;
 }
 }

 for (let year = 1; year <= t; year++) {
 const startBalance = currentBalance;
 let yearInterest = 0;
 let yearContrib = 0;

 for (let month = 1; month <= 12; month++) {
 const interestThisMonth = currentBalance * monthlyRate;
 yearInterest += interestThisMonth;
 currentBalance += interestThisMonth;
 currentBalance += pmt;
 yearContrib += pmt;
 totalContributions += pmt;
 }

 yearByYear.push({
 year,
 startBalance,
 interestEarned: yearInterest,
 contributions: yearContrib,
 endBalance: currentBalance,
 });
 }

 const totalInterest = currentBalance - p - totalContributions;

 return {
 finalBalance: currentBalance,
 totalInterest,
 totalContributions,
 principal: p,
 yearByYear,
 };
 }, [principal, rate, frequency, years, contribution]);

 const formatCurrency = (value: number) => {
 return new Intl.NumberFormat("en-US", {
 style:"currency",
 currency:"USD",
 minimumFractionDigits: 2,
 maximumFractionDigits: 2,
 }).format(value);
 };

 const handleCopy = () => {
 const text = `Compound Interest Results:
Initial Principal: ${formatCurrency(results.principal)}
Total Contributions: ${formatCurrency(results.totalContributions)}
Total Interest Earned: ${formatCurrency(results.totalInterest)}
Final Balance: ${formatCurrency(results.finalBalance)}`;
 navigator.clipboard.writeText(text);
 };

 const handleExportCSV = () => {
 const headers = ["Year","Starting Balance","Interest Earned","Contributions","Ending Balance"];
 const rows = results.yearByYear.map((y) => [
 y.year,
 y.startBalance.toFixed(2),
 y.interestEarned.toFixed(2),
 y.contributions.toFixed(2),
 y.endBalance.toFixed(2),
 ]);

 const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
 const blob = new Blob([csvContent], { type:"text/csv;charset=utf-8;"});
 const url = URL.createObjectURL(blob);
 const link = document.createElement("a");
 link.setAttribute("href", url);
 link.setAttribute("download","compound_interest_breakdown.csv");
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 };

 return (
 <>
 <ToolPageHeader title="Compound Interest Calculator"description="Calculate how your investments can grow over time with compound interest."/>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <ToolBackground />

 {/* Input Section */}
 <Card className="lg:col-span-1">
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="w-5 h-5"/>
 Calculator Inputs
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label htmlFor="principal">Initial Principal Amount ($)</Label>
 <Input id="principal"type="number"min="0"step="0.01"value={principal} onChange={(e) => setPrincipal(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label htmlFor="contribution">Monthly Contribution ($)</Label>
 <Input id="contribution"type="number"min="0"step="0.01"value={contribution} onChange={(e) => setContribution(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label htmlFor="years">Time Period (Years)</Label>
 <Input id="years"type="number"min="0"step="1"value={years} onChange={(e) => setYears(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label htmlFor="rate">Annual Interest Rate (%)</Label>
 <Input id="rate"type="number"min="0"step="0.01"value={rate} onChange={(e) => setRate(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label htmlFor="frequency">Compounding Frequency</Label>
 <Select value={frequency} onValueChange={setFrequency}>
 <SelectTrigger id="frequency">
 <SelectValue placeholder="Select frequency"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="12">Monthly</SelectItem>
 <SelectItem value="4">Quarterly</SelectItem>
 <SelectItem value="2">Semi-annually</SelectItem>
 <SelectItem value="1">Annually</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className="pt-4 border-t">
 <Label className="text-muted-foreground text-xs font-mono">Formula: A = P(1 + r/n)^(nt)</Label>
 </div>
 </CardContent>
 </Card>

 {/* Results Section */}
 <div className="lg:col-span-2 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 <Card>
 <CardContent className="p-6">
 <p className="text-sm font-medium text-muted-foreground mb-1">Final Balance</p>
 <p className="text-2xl font-bold text-primary">{formatCurrency(results.finalBalance)}</p>
 </CardContent>
 </Card>
 <Card>
 <CardContent className="p-6">
 <p className="text-sm font-medium text-muted-foreground mb-1">Total Interest</p>
 <p className="text-2xl font-bold text-emerald-600">{formatCurrency(results.totalInterest)}</p>
 </CardContent>
 </Card>
 <Card>
 <CardContent className="p-6">
 <p className="text-sm font-medium text-muted-foreground mb-1">Total Contributions</p>
 <p className="text-2xl font-bold">{formatCurrency(results.totalContributions)}</p>
 </CardContent>
 </Card>
 <Card>
 <CardContent className="p-6">
 <p className="text-sm font-medium text-muted-foreground mb-1">Initial Principal</p>
 <p className="text-2xl font-bold">{formatCurrency(results.principal)}</p>
 </CardContent>
 </Card>
 </div>

 <Card>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Year-by-Year Breakdown</CardTitle>
 <CardDescription>A detailed view of how your balance grows over time.</CardDescription>
 </div>
 <div className="flex gap-2">
 <Button variant="outline"size="sm"onClick={handleCopy}>
 <Copy className="w-4 h-4 mr-2"/>
 Copy Summary
 </Button>
 <Button variant="outline"size="sm"onClick={handleExportCSV}>
 <Download className="w-4 h-4 mr-2"/>
 Export CSV
 </Button>
 </div>
 </CardHeader>
 <CardContent>
 {results.yearByYear.length > 0 ? (
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
 <tr>
 <th className="px-4 py-3 rounded-tl-md">Year</th>
 <th className="px-4 py-3">Start Balance</th>
 <th className="px-4 py-3">Contributions</th>
 <th className="px-4 py-3">Interest Earned</th>
 <th className="px-4 py-3 rounded-tr-md">End Balance</th>
 </tr>
 </thead>
 <tbody>
 {results.yearByYear.map((row) => (
 <tr key={row.year} className="border-b last:border-0 hover:bg-muted/30">
 <td className="px-4 py-3 font-medium">{row.year}</td>
 <td className="px-4 py-3">{formatCurrency(row.startBalance)}</td>
 <td className="px-4 py-3">{formatCurrency(row.contributions)}</td>
 <td className="px-4 py-3 text-emerald-600">{formatCurrency(row.interestEarned)}</td>
 <td className="px-4 py-3 font-medium">{formatCurrency(row.endBalance)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 ) : (
 <div className="text-center py-8 text-muted-foreground">
 Enter a time period of at least 1 year to see the breakdown.
 </div>
 )}
 </CardContent>
 </Card>
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
          <h3>Why Use Our Compound Interest Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Compound Interest Calculator provides
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

      <RelatedTools currentToolUrl="/tools/finance/compound-interest" max={6} />

</div>
 </>
 );
}
