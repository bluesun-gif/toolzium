"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Calculator, Clock, Coins, Copy, Download, Percent } from"lucide-react";

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
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Principal",
    description:"Input the starting amount.",
    icon: Coins,
  },
{
    step:"02",
    title:"Set Rate & Time",
    description:"Add interest rate and number of years.",
    icon: Percent,
  },
{
    step:"03",
    title:"Calculate",
    description:"See final balance and total interest.",
    icon: Calculator,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Coins,
    title:"Principal Flexibility",
    description:"Works for savings, loans, or investments.",
  },
{
    icon: Percent,
    title:"Compounding Frequency",
    description:"Models daily, monthly, or annual compounding.",
  },
{
    icon: Calculator,
    title:"Interest Breakdown",
    description:"Separates contributions from earned interest.",
  },
{
    icon: Clock,
    title:"Time Impact",
    description:"Shows how extra years multiply results.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Compound interest is the mechanism behind both wealth building and debt spirals, which makes understanding it essential. The calculator shows what happens when interest is earned on interest rather than just the original amount. For savers this is a friend; for borrowers it is a quiet cost.</p>
  <p>Frequency changes the outcome. Interest compounded monthly grows faster than annually because earnings begin earning sooner. The difference is small over one year but meaningful over decades, which is why the calculator lets you set the compounding period. Banks advertise annual percentage yield precisely because it reflects this effect.</p>
  <p>For savings and investments, the lesson is to start now and stay invested. Each year of delay removes a compounding cycle that can never be recovered. For debt, the same math works in reverse: a high-rate balance compounds against you, so extra payments early save disproportionately. The interest breakdown separating your contributions from earnings makes this visible.</p>
  <p>Use the calculator to set goals and model trade-offs. Comparing a 5 percent savings account to a 7 percent investment over 20 years illustrates why rate and time matter more than the initial sum. Whether planning a down payment or measuring loan cost, the tool turns an abstract formula into a number you can act on. Pair it with automated contributions so compounding does the heavy lifting automatically.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Compound vs simple interest?",
    answer:"Simple interest pays only on principal; compound pays on principal plus accumulated interest.",
  },
{
    question:"Does compounding frequency matter?",
    answer:"More frequent compounding yields slightly more, all else equal.",
  },
{
    question:"How do I maximize compounding?",
    answer:"Start early, contribute regularly, and avoid withdrawing gains.",
  },
{
    question:"Can I use this for loans?",
    answer:"Yes, though for loans compounding works against you as debt grows.",
  },
{
    question:"What rate should I use?",
    answer:"Use the stated annual rate; the calculator handles the frequency conversion.",
  }
  ]}
/>
</>
 );
}
