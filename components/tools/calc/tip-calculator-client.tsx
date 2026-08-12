"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Receipt } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const presets = [10, 15, 18, 20, 25];

export default function TipCalculatorClient() {
 const [bill, setBill] = useState("100");
 const [tipPercent, setTipPercent] = useState(15);
 const [people, setPeople] = useState("2");

 const calculations = useMemo(() => {
 const b = parseFloat(bill) || 0;
 const p = parseInt(people) || 1;
 const tipAmount = b * (tipPercent / 100);
 const total = b + tipAmount;
 const perPerson = total / p;
 const tipPerPerson = tipAmount / p;
 return { tipAmount, total, perPerson, tipPerPerson };
 }, [bill, tipPercent, people]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader icon={Receipt} title="Tip Calculator"description="Calculate tips and split bills evenly among friends with instant precision."/>
 
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Bill Details</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-4">
 <div className="space-y-2">
 <label className="text-sm font-medium">Bill Amount ($)</label>
 <Input type="number"value={bill} onChange={e => setBill(e.target.value)} placeholder="0.00"/>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Number of People</label>
 <Input type="number"min="1"value={people} onChange={e => setPeople(e.target.value)} placeholder="1"/>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Tip Percentage: {tipPercent}%</label>
 <div className="flex flex-wrap gap-2">
 {presets.map(p => (
 <Button 
 key={p} 
 variant={tipPercent === p ?"default":"outline"} 
 size="sm"
 onClick={() => setTipPercent(p)}
 >
 {p}%
 </Button>
 ))}
 </div>
 <input 
 type="range"
 min="0"
 max="30"
 value={tipPercent} 
 onChange={e => setTipPercent(parseInt(e.target.value))}
 className="w-full mt-2 accent-primary"
 />
 </div>
 </div>
 
 <div className="space-y-4">
 <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
 <div className="text-sm text-muted-foreground">Total Tip</div>
 <div className="text-3xl font-bold text-primary">${calculations.tipAmount.toFixed(2)}</div>
 <div className="text-xs text-muted-foreground mt-1">${calculations.tipPerPerson.toFixed(2)} per person</div>
 </div>
 <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
 <div className="text-sm text-muted-foreground">Total Bill</div>
 <div className="text-3xl font-bold">${calculations.total.toFixed(2)}</div>
 </div>
 <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
 <div className="text-sm text-muted-foreground">Per Person</div>
 <div className="text-3xl font-bold">${calculations.perPerson.toFixed(2)}</div>
 </div>
 </div>
 </div>
 </CardContent>
 </Card>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Enter Bill", description:"Input the total amount of your restaurant or service bill.", icon: Receipt },
 { step:"02", title:"Select Tip", description:"Choose a preset tip percentage or use the slider for a custom amount.", icon: Receipt },
 { step:"03", title:"Split & Pay", description:"See exactly how much each person owes, including their share of the tip.", icon: Receipt }
 ]} 
 badges={["100% Free","Client-Side","Instant"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Receipt, title:"Quick Presets", description:"One-tap buttons for standard tipping percentages like 15%, 18%, and 20%."},
 { icon: Receipt, title:"Group Splitting", description:"Instantly divide the total bill and tip evenly among any number of people."},
 { icon: Receipt, title:"Custom Slider", description:"Fine-tune your tip percentage with a smooth, responsive range slider."},
 { icon: Receipt, title:"Live Updates", description:"Calculations happen in real-time as you adjust the inputs."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Splitting a dinner bill or calculating a tip shouldn't require mental math or pulling out a separate calculator app. Our Tip Calculator streamlines the process so you can focus on enjoying your meal and company.</p>
 <p>Whether you are dining out in the US where tipping is customary, or splitting an AirBnb cost with friends, the tool breaks down the exact amounts owed per person down to the cent.</p>
 <p>All calculations are performed locally in your browser, ensuring your financial inputs remain completely private.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"What is the standard tip percentage?", answer:"In the United States, the standard tip for sit-down restaurant service is typically 15% to 20% of the pre-tax bill."},
 { question:"Does it calculate tip on tax?", answer:"This calculator applies the tip percentage to the total bill amount you enter. It is generally customary to tip on the pre-tax amount, but you can enter whichever base you prefer."},
 { question:"Can I split the bill unevenly?", answer:"Currently, the tool splits the total evenly among the number of people specified. For uneven splits, you would need to calculate individual totals manually."}
 ]} />

 <RelatedTools currentToolUrl="/tools/calc/tip-calculator"max={6} />
 </div>
 );
}
