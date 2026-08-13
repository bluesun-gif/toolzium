"use client";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { CreditCard, DollarSign, Printer, Copy, Sparkles, Shield, Zap } from"lucide-react";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function CurrencyCardClient() {
 const [homeCurrency, setHomeCurrency] = useState("USD");
 const [destCurrency, setDestCurrency] = useState("EUR");
 const [exchangeRate, setExchangeRate] = useState("0.92"); // 1 home = X dest

 const baseAmounts = [1, 5, 10, 20, 50, 100];
 const itemExamples = [
 { label:"Coffee", homeAmount: 4 },
 { label:"Meal", homeAmount: 15 },
 { label:"Taxi", homeAmount: 25 },
 { label:"Hotel", homeAmount: 150 },
 { label:"Souvenir", homeAmount: 30 }
 ];

 useEffect(() => {
 const savedHome = localStorage.getItem("currency-card-home") ||"USD";
 const savedDest = localStorage.getItem("currency-card-dest") ||"EUR";
 setHomeCurrency(savedHome);
 setDestCurrency(savedDest);
 }, []);

 // Fetch real-time live exchange rate when currencies change
 useEffect(() => {
 async function fetchLiveRate() {
 try {
 const res = await fetch(`/api/rates?base=${encodeURIComponent(homeCurrency)}`, { cache:"no-store"});
 if (res.ok) {
 const data = await res.json();
 if (data?.rates && data.rates[destCurrency]) {
 const liveRate = data.rates[destCurrency].toFixed(4);
 setExchangeRate(liveRate);
 localStorage.setItem("currency-card-rate", liveRate);
 }
 }
 } catch (err) {
 console.error("Failed to fetch live rate", err);
 }
 }
 fetchLiveRate();
 }, [homeCurrency, destCurrency]);

 const saveSettings = (h: string, d: string, r: string) => {
 localStorage.setItem("currency-card-home", h);
 localStorage.setItem("currency-card-dest", d);
 localStorage.setItem("currency-card-rate", r);
 };

 const handleHomeChange = (v: string) => { setHomeCurrency(v); saveSettings(v, destCurrency, exchangeRate); };
 const handleDestChange = (v: string) => { setDestCurrency(v); saveSettings(homeCurrency, v, exchangeRate); };
 const handleRateChange = (v: string) => { setExchangeRate(v); saveSettings(homeCurrency, destCurrency, v); };

 const rate = parseFloat(exchangeRate) || 1;

 const handlePrint = () => {
 window.print();
 };

 const handleReset = () => {
 setHomeCurrency("USD");
 setDestCurrency("EUR");
 setExchangeRate("0.92");
 saveSettings("USD","EUR","0.92");
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={CreditCard}
 title="Currency Quick Reference Card"
 description="Printable travel currency conversion cheat card for your wallet."
 actions={
 <>
 <ActionButton onClick={handlePrint} icon={Printer} label="Print Card"variant="outline"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard className="print:hidden">
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 <CardDescription>Configure currency and custom rate.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Home Currency</Label>
 <Input value={homeCurrency} onChange={(e) => handleHomeChange(e.target.value)} placeholder="e.g. USD"/>
 </div>
 <div className="space-y-2">
 <Label>Dest Currency</Label>
 <Input value={destCurrency} onChange={(e) => handleDestChange(e.target.value)} placeholder="e.g. EUR"/>
 </div>
 </div>
 <div className="space-y-2">
 <Label>Exchange Rate (1 {homeCurrency} = X {destCurrency})</Label>
 <Input type="number"step="0.01"value={exchangeRate} onChange={(e) => handleRateChange(e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="print:border-none print:shadow-none print:m-0 print:p-0">
 <CardHeader className="print:p-0 print:mb-4">
 <CardTitle className="text-center">Cheat Card</CardTitle>
 <CardDescription className="text-center">
 1 {homeCurrency} = {rate.toFixed(2)} {destCurrency}
 </CardDescription>
 </CardHeader>
 <CardContent className="print:p-0 flex justify-center">
 <div className="border-2 border-black p-4 w-64 text-black bg-background rounded-md">
 <h3 className="font-bold text-center border-b border-black pb-2 mb-2">
 {homeCurrency} to {destCurrency}
 </h3>
 
 <div className="grid grid-cols-2 gap-2 text-sm mb-4 border-b border-black pb-2">
 <div className="font-bold">{homeCurrency}</div>
 <div className="font-bold text-right">{destCurrency}</div>
 {baseAmounts.map(amt => (
 <div key={amt} className="contents">
 <div>{amt}</div>
 <div className="text-right">{(amt * rate).toFixed(2)}</div>
 </div>
 ))}
 </div>

 <div className="text-xs text-center font-bold mb-2">Common Items</div>
 <div className="grid grid-cols-2 gap-1 text-xs">
 {itemExamples.map(item => (
 <div key={item.label} className="contents">
 <div>{item.label}</div>
 <div className="text-right">~{Math.round(item.homeAmount * rate)} {destCurrency}</div>
 </div>
 ))}
 </div>
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
          <h3>Why Use Our Currency Quick Reference Card?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Currency Quick Reference Card provides
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

      <RelatedTools currentToolUrl="/tools/travel/currency-card" max={6} />

</div>
 );
}
