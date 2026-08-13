"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Table as TableIcon, DollarSign, Globe, Copy, Printer, Sparkles, Shield, Zap } from"lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from"@/components/ui/table";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function ExchangeTableClient() {
 const [baseCur, setBaseCur] = useState("USD");
 const [targetCur, setTargetCur] = useState("EUR");
 const [rate, setRate] = useState<number>(0.92);

 useEffect(() => {
 const saved = localStorage.getItem("exchange-table-settings");
 if (saved) {
 try {
 const p = JSON.parse(saved);
 if (p.baseCur) setBaseCur(p.baseCur);
 if (p.targetCur) setTargetCur(p.targetCur);
 if (p.rate) setRate(p.rate);
 } catch (e) {}
 }
 }, []);

 const saveSettings = () => {
 localStorage.setItem("exchange-table-settings", JSON.stringify({ baseCur, targetCur, rate }));
 };

 const handleReset = () => {
 setBaseCur("USD");
 setTargetCur("EUR");
 setRate(0.92);
 };

 const units = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];

 const getTableText = () => {
 let text ="Exchange Reference:"+ baseCur +"to"+ targetCur +"\nRate: 1"+ baseCur +"="+ rate +""+ targetCur +"\n\n";
 text += baseCur +"->"+ targetCur +"|"+ targetCur +"->"+ baseCur +"\n";
 text +="--------------------------------------\n";
 units.forEach(u => {
 const bToT = (u * rate).toFixed(2);
 const tToB = (rate > 0 ? (u / rate).toFixed(2) :"0.00");
 text += u +""+ baseCur +"="+ bToT +""+ targetCur +"|"+ u +""+ targetCur +"="+ tToB +""+ baseCur +"\n";
 });
 return text;
 };

 const handlePrint = () => {
 const printWindow = window.open("","_blank");
 if (printWindow) {
 printWindow.document.write("<html><head><title>Print Exchange Table</title><style>body { font-family: sans-serif; padding: 2rem; } table { border-collapse: collapse; width: 100%; max-width: 600px; margin-bottom: 2rem; } th, td { border: 1px solid #ddd; padding: 8px; text-align: right; } th { background-color: #f2f2f2; }</style></head><body>");
 printWindow.document.write("<h2>Exchange Reference:"+ baseCur +"to"+ targetCur +"</h2>");
 printWindow.document.write("<p>Rate: 1"+ baseCur +"="+ rate +""+ targetCur +"</p>");
 
 printWindow.document.write("<table><thead><tr><th>"+ baseCur +"</th><th>"+ targetCur +"</th><th>"+ targetCur +"</th><th>"+ baseCur +"</th></tr></thead><tbody>");
 units.forEach(u => {
 const bToT = (u * rate).toFixed(2);
 const tToB = (rate > 0 ? (u / rate).toFixed(2) :"0.00");
 printWindow.document.write("<tr><td>"+ u +"</td><td>"+ bToT +"</td><td>"+ u +"</td><td>"+ tToB +"</td></tr>");
 });
 printWindow.document.write("</tbody></table>");
 printWindow.document.write("</body></html>");
 printWindow.document.close();
 printWindow.print();
 }
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
 icon={TableIcon}
 title="Currency Exchange Comparison Table"
 description="Quick currency exchange conversion reference table for traveler pockets."
 actions={
 <React.Fragment>
 <ResetButton onClick={handleReset} label="Reset"/>
 </React.Fragment>
 }
 />

 <div className={"grid grid-cols-1 lg:grid-cols-3 gap-6"}>
 <GlassCard className="lg:col-span-1">
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 <CardDescription>Configure currency and rate.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Base Currency (e.g. USD)</Label>
 <Input value={baseCur} onChange={(e) => setBaseCur(e.target.value.toUpperCase())} maxLength={3} />
 </div>
 <div className="space-y-2">
 <Label>Target Currency (e.g. EUR)</Label>
 <Input value={targetCur} onChange={(e) => setTargetCur(e.target.value.toUpperCase())} maxLength={3} />
 </div>
 <div className="space-y-2">
 <Label>Exchange Rate (1 {baseCur} = ? {targetCur})</Label>
 <Input type="number"step="0.0001"value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} />
 </div>
 <Button className="w-full"onClick={saveSettings}>Save Settings</Button>
 </CardContent>
 </GlassCard>

 <GlassCard className="lg:col-span-2">
 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
 <div>
 <CardTitle>Reference Table</CardTitle>
 <CardDescription>Print or copy for your wallet.</CardDescription>
 </div>
 <div className={"flex gap-2"}>
 <CopyButton getText={getTableText} label="Copy Text"/>
 <ActionButton onClick={handlePrint} icon={Printer} label="Print"/>
 </div>
 </CardHeader>
 <CardContent>
 <div className="overflow-x-auto">
 <Table>
 <TableHeader>
 <TableRow>
 <TableHead className="text-right w-1/4">{baseCur}</TableHead>
 <TableHead className="text-right w-1/4 font-bold border-r">{targetCur}</TableHead>
 <TableHead className="text-right w-1/4">{targetCur}</TableHead>
 <TableHead className="text-right w-1/4 font-bold">{baseCur}</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {units.map(u => (
 <TableRow key={u}>
 <TableCell className="text-right">{u}</TableCell>
 <TableCell className="text-right font-medium border-r">{(u * rate).toFixed(2)}</TableCell>
 <TableCell className="text-right">{u}</TableCell>
 <TableCell className="text-right font-medium">{(rate > 0 ? (u / rate).toFixed(2) :"0.00")}</TableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
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
          <h3>Why Use Our Currency Exchange Comparison Table?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Currency Exchange Comparison Table provides
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

      <RelatedTools currentToolUrl="/tools/travel/exchange-table" max={6} />

</div>
 );
}
