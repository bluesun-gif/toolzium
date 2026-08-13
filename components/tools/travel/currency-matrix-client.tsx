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
import { Grid, DollarSign, Globe, Trash, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

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
          <h3>Why Use Our Multi-Currency Exchange Matrix?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Multi-Currency Exchange Matrix provides
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

      <RelatedTools currentToolUrl="/tools/travel/currency-matrix" max={6} />

</div>
 );
}
