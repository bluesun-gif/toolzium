"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Gauge } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const units = [{
  id: "km/h",
  label: "Kilometers per hour (km/h)",
  toMs: 1 / 3.6
}, {
  id: "mph",
  label: "Miles per hour (mph)",
  toMs: 0.44704
}, {
  id: "m/s",
  label: "Meters per second (m/s)",
  toMs: 1
}, {
  id: "knots",
  label: "Knots (kn)",
  toMs: 0.514444
}, {
  id: "ft/s",
  label: "Feet per second (ft/s)",
  toMs: 0.3048
}];
export default function SpeedConverterClient() {
  const [value, setValue] = useState("100");
  const [sourceUnit, setSourceUnit] = useState("km/h");
  const conversions = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return [];
    const source = units.find(u => u.id === sourceUnit);
    if (!source) return [];
    const valueInMs = num * source.toMs;
    return units.map(u => ({
      id: u.id,
      label: u.label,
      value: (valueInMs / u.toMs).toFixed(4)
    }));
  }, [value, sourceUnit]);
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Gauge} title="Speed Converter" description="Instantly convert speed between km/h, mph, m/s, knots, and ft/s with precision." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Enter Speed</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-sm font-medium">Value</label>
 <Input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="e.g. 100" />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">From Unit</label>
 <select value={sourceUnit} onChange={e => setSourceUnit(e.target.value)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50">
 {units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
 </select>
 </div>
 </div>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
 {conversions.map(c => <div key={c.id} className="p-4 rounded-xl bg-muted/30 border border-border/50">
 <div className="text-xs text-muted-foreground mb-1">{c.label}</div>
 <div className="text-2xl font-bold text-primary">{c.value}</div>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Value",
        description: "Type the speed value you want to convert into the input field.",
        icon: Gauge
      }, {
        step: "02",
        title: "Select Unit",
        description: "Choose the source unit of your speed measurement from the dropdown menu.",
        icon: Gauge
      }, {
        step: "03",
        title: "View Results",
        description: "Instantly see the converted values across all major speed units in the grid.",
        icon: Gauge
      }]} badges={["100% Free", "Client-Side", "Instant"]} />

 <ToolFeatureGuides features={[{
        icon: Gauge,
        title: "Universal Units",
        description: "Supports km/h, mph, m/s, knots, and ft/s for comprehensive conversions."
      }, {
        icon: Gauge,
        title: "Real-Time Calculation",
        description: "Results update instantly as you type without needing to click a submit button."
      }, {
        icon: Gauge,
        title: "High Precision",
        description: "Calculations are performed with up to 4 decimal places of accuracy."
      }, {
        icon: Gauge,
        title: "Privacy Focused",
        description: "All conversions happen locally in your browser. No data is sent to servers."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Speed conversion is a common requirement in physics, engineering, aviation, and everyday driving scenarios. Different countries and industries rely on distinct units of measurement, making a reliable speed converter an essential utility.</p>
 <p>Our Speed Converter uses standard metric and imperial conversion factors to ensure accuracy. Whether you are calculating vehicle speeds, wind knots for sailing, or scientific meters per second, the tool handles the math instantly.</p>
 <p>Because the tool runs entirely in your browser using JavaScript, your inputs are never transmitted over the internet, ensuring complete privacy and zero latency.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "How do I convert km/h to mph?",
        answer: "To convert kilometers per hour to miles per hour, multiply the km/h value by 0.621371. Our tool does this automatically."
      }, {
        question: "What is the speed of sound in these units?",
        answer: "The speed of sound in dry air at 20 °C is approximately 343 m/s, which is 1234.8 km/h, 767 mph, or 667 knots."
      }, {
        question: "Is this tool free to use?",
        answer: "Yes, the Speed Converter is 100% free, requires no signup, and has no usage limits."
      }]} />

 <RelatedTools currentToolUrl="/tools/calc/speed-converter" max={6} />
 </div></div>;
}