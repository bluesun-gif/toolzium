"use client";

"use strict";
"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Zap, Calculator, DollarSign, Plus, Trash2, Sparkles, Shield, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

interface Appliance {
 id: string;
 name: string;
 wattage: number;
 hoursPerDay: number;
 daysPerMonth: number;
}

const PRESETS = [
 { name:"Fridge", wattage: 150, hoursPerDay: 24, daysPerMonth: 30 },
 { name:"AC", wattage: 1500, hoursPerDay: 8, daysPerMonth: 30 },
 { name:"TV", wattage: 100, hoursPerDay: 5, daysPerMonth: 30 },
 { name:"Washer", wattage: 500, hoursPerDay: 1, daysPerMonth: 30 },
 { name:"PC", wattage: 300, hoursPerDay: 8, daysPerMonth: 30 },
];

export function ElectricityCostClient() {
 const [rate, setRate] = useState<number>(0.12);
 const [appliances, setAppliances] = useState<Appliance[]>([]);
 const [newName, setNewName] = useState("");
 const [newWattage, setNewWattage] = useState<number |"">("");
 const [newHours, setNewHours] = useState<number |"">("");
 const [newDays, setNewDays] = useState<number |"">(30);

 const addAppliance = () => {
 if (!newName || !newWattage || !newHours || !newDays) return;
 setAppliances([...appliances, {
 id: Math.random().toString(36).substring(7),
 name: newName,
 wattage: Number(newWattage),
 hoursPerDay: Number(newHours),
 daysPerMonth: Number(newDays)
 }]);
 setNewName("");
 setNewWattage("");
 setNewHours("");
 setNewDays(30);
 };

 const addPreset = (preset: typeof PRESETS[0]) => {
 setAppliances([...appliances, {
 id: Math.random().toString(36).substring(7),
 ...preset
 }]);
 };

 const removeAppliance = (id: string) => {
 setAppliances(appliances.filter(a => a.id !== id));
 };

 const calculateCost = (a: Appliance) => {
 const kwhPerMonth = (a.wattage * a.hoursPerDay * a.daysPerMonth) / 1000;
 return kwhPerMonth * rate;
 };

 const totalMonthlyCost = appliances.reduce((sum, a) => sum + calculateCost(a), 0);
 const totalYearlyCost = totalMonthlyCost * 12;

 const handleReset = () => {
 setAppliances([]);
 setRate(0.12);
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Zap}
 title="Electricity Cost Calculator"
 description="Calculate the electricity cost of your home appliances"
 actions={<ResetButton onClick={handleReset} label="Reset All"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5"/> Settings & Presets</CardTitle>
 <CardDescription>Set your electricity rate and quick-add appliances</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Electricity Rate ($ / kWh)</Label>
 <Input type="number"step="0.01"value={rate} onChange={e => setRate(Number(e.target.value))} />
 </div>
 
 <Separator />
 
 <Label>Quick Add Presets</Label>
 <div className="flex flex-wrap gap-2">
 {PRESETS.map(p => (
 <Button key={p.name} variant="outline"size="sm"onClick={() => addPreset(p)}>
 + {p.name}
 </Button>
 ))}
 </div>
 
 <Separator />

 <div className="space-y-3">
 <Label>Add Custom Appliance</Label>
 <Input placeholder="Appliance Name"value={newName} onChange={e => setNewName(e.target.value)} />
 <div className="grid grid-cols-3 gap-2">
 <Input type="number"placeholder="Watts"value={newWattage} onChange={e => setNewWattage(e.target.value ===""?"": Number(e.target.value))} />
 <Input type="number"placeholder="Hours/Day"value={newHours} onChange={e => setNewHours(e.target.value ===""?"": Number(e.target.value))} />
 <Input type="number"placeholder="Days/Month"value={newDays} onChange={e => setNewDays(e.target.value ===""?"": Number(e.target.value))} />
 </div>
 <Button onClick={addAppliance} className="w-full"><Plus className="w-4 h-4 mr-2"/> Add Appliance</Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5"/> Summary</CardTitle>
 <CardDescription>Your estimated electricity costs</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4 text-center">
 <div className="p-4 bg-muted rounded-lg">
 <p className="text-sm text-muted-foreground">Monthly Cost</p>
 <p className="text-2xl font-bold">${totalMonthlyCost.toFixed(2)}</p>
 </div>
 <div className="p-4 bg-muted rounded-lg">
 <p className="text-sm text-muted-foreground">Yearly Cost</p>
 <p className="text-2xl font-bold">${totalYearlyCost.toFixed(2)}</p>
 </div>
 </div>

 <Separator />

 <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
 <Label>Appliance Breakdown</Label>
 {appliances.length === 0 ? (
 <p className="text-sm text-muted-foreground text-center py-4">No appliances added yet.</p>
 ) : (
 appliances.map(a => (
 <div key={a.id} className="flex justify-between items-center p-3 border rounded-lg">
 <div>
 <p className="font-medium">{a.name}</p>
 <p className="text-xs text-muted-foreground">{a.wattage}W • {a.hoursPerDay}h/d</p>
 </div>
 <div className="flex items-center gap-3">
 <p className="font-bold">${calculateCost(a).toFixed(2)}<span className="text-xs font-normal">/mo</span></p>
 <Button variant="ghost"size="icon"onClick={() => removeAppliance(a.id)} className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4"/></Button>
 </div>
 </div>
 ))
 )}
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
          <h3>Why Use Our Electricity Cost Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Electricity Cost Calculator provides
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

      <RelatedTools currentToolUrl="/tools/finance/electricity-cost" max={6} />

</div>
 );
}
