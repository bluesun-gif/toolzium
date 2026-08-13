"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { DollarSign, Globe, Calculator, Copy, Save, Sparkles, Shield, Zap } from"lucide-react";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

const MOCK_RATES: Record<string, number> = {
 USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.1, AUD: 1.52, CAD: 1.36, INR: 83.1, CHF: 0.88, CNY: 7.2
};

const CURRENCIES = Object.keys(MOCK_RATES);

export function TravelBudgetMatrixClient() {
 const [budget, setBudget] = useState("1000");
 const [baseCurrency, setBaseCurrency] = useState("USD");
 const [targetCurrencies, setTargetCurrencies] = useState<string[]>(["EUR","JPY","GBP"]);
 
 useEffect(() => {
 const saved = localStorage.getItem("travel-budget-prefs");
 if (saved) {
 try {
 const parsed = JSON.parse(saved);
 if (parsed.budget) setBudget(parsed.budget);
 if (parsed.baseCurrency) setBaseCurrency(parsed.baseCurrency);
 if (parsed.targetCurrencies) setTargetCurrencies(parsed.targetCurrencies);
 } catch (e) {}
 }
 }, []);
 
 const savePrefs = () => {
 localStorage.setItem("travel-budget-prefs", JSON.stringify({ budget, baseCurrency, targetCurrencies }));
 toast.success("Preferences saved!");
 };

 const handleReset = () => {
 setBudget("1000");
 setBaseCurrency("USD");
 setTargetCurrencies(["EUR","JPY","GBP"]);
 localStorage.removeItem("travel-budget-prefs");
 toast.success("Form reset");
 };

 const toggleTarget = (curr: string) => {
 if (targetCurrencies.includes(curr)) {
 setTargetCurrencies(targetCurrencies.filter(c => c !== curr));
 } else {
 if (targetCurrencies.length >= 5) {
 toast.error("You can select up to 5 currencies");
 return;
 }
 setTargetCurrencies([...targetCurrencies, curr]);
 }
 };

 const results = targetCurrencies.map(t => {
 const baseRate = MOCK_RATES[baseCurrency] || 1;
 const targetRate = MOCK_RATES[t] || 1;
 const amountInUSD = parseFloat(budget ||"0") / baseRate;
 const amountInTarget = amountInUSD * targetRate;
 return {
 currency: t,
 total: amountInTarget,
 day7: amountInTarget / 7,
 day14: amountInTarget / 14,
 day30: amountInTarget / 30,
 };
 });

 const getCopyText = () => {
 let txt ="Travel Budget Matrix (Base:"+ budget +""+ baseCurrency +")\n\n";
 results.forEach(r => {
 txt += r.currency +": Total"+ r.total.toFixed(2) +"| 7-day:"+ r.day7.toFixed(2) +"/day | 14-day:"+ r.day14.toFixed(2) +"/day\n";
 });
 return txt;
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
 icon={Globe}
 title="Travel Budget Currency Comparison Matrix"
 description="Compare travel budgets across multiple destination currencies."
 actions={
 <div className="flex gap-2">
 <ActionButton onClick={savePrefs} icon={Save} label="Save"variant="outline"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </div>
 }
 />
 
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5"/> Base Budget</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Total Travel Budget</Label>
 <Input type="number"value={budget} onChange={(e) => setBudget(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Home Currency</Label>
 <Select value={baseCurrency} onValueChange={setBaseCurrency}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Destination Currencies</CardTitle>
 <CardDescription>Select up to 5 currencies</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-wrap gap-2">
 {CURRENCIES.filter(c => c !== baseCurrency).map(c => {
 const isSelected = targetCurrencies.includes(c);
 return (
 <button
 key={c}
 onClick={() => toggleTarget(c)}
 className={cn("px-3 py-1.5 rounded-full text-sm font-medium transition-colors border", (isSelected ?"bg-primary text-primary-foreground border-primary":"bg-background text-muted-foreground hover:bg-muted"))}
 >
 {c}
 </button>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="lg:col-span-2">
 <GlassCard>
 <CardHeader>
 <div className="flex justify-between items-center">
 <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5"/> Comparison Matrix</CardTitle>
 <CopyButton getText={getCopyText} label="Copy Results"/>
 </div>
 </CardHeader>
 <CardContent>
 {results.length > 0 ? (
 <div className="space-y-4">
 {results.map((res) => (
 <div key={res.currency} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
 <div className="flex justify-between items-center mb-4">
 <div className="text-xl font-bold">{res.currency}</div>
 <div className="text-2xl font-semibold text-primary">{res.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
 </div>
 <Separator className="my-2"/>
 <div className="grid grid-cols-3 gap-2 text-center text-sm pt-2">
 <div>
 <div className="text-muted-foreground mb-1">7-Day Trip</div>
 <div className="font-medium">{res.day7.toLocaleString(undefined, { maximumFractionDigits: 2 })} / day</div>
 </div>
 <div className="border-l border-r px-2">
 <div className="text-muted-foreground mb-1">14-Day Trip</div>
 <div className="font-medium">{res.day14.toLocaleString(undefined, { maximumFractionDigits: 2 })} / day</div>
 </div>
 <div>
 <div className="text-muted-foreground mb-1">30-Day Trip</div>
 <div className="font-medium">{res.day30.toLocaleString(undefined, { maximumFractionDigits: 2 })} / day</div>
 </div>
 </div>
 </div>
 ))}
 </div>
 ) : (
 <div className="text-center py-12 text-muted-foreground">
 Select destination currencies to see the comparison matrix.
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
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
          <h3>Why Use Our Travel Budget Currency Comparison Matrix?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Travel Budget Currency Comparison Matrix provides
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

      <RelatedTools currentToolUrl="/tools/travel/travel-budget-matrix" max={6} />

</div>
 );
}
