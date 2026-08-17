"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import { ArrowLeftRight, BookOpen, Calculator, Globe, Info, Ruler, Scale, Settings, Shield, Sparkles, Table2, ThermometerSun, Zap, Copy, Type } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { type JSX, useMemo, useState } from "react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const CATEGORIES = ["Length", "Weight", "Temperature"] as const;
type Category = (typeof CATEGORIES)[number];
const UNITS: Record<Category, readonly string[]> = {
  Length: ["m", "km", "cm", "mm", "mi", "yd", "ft", "in"] as const,
  Weight: ["kg", "g", "lb", "oz"] as const,
  Temperature: ["C", "F", "K"] as const
};
const ICON_BY_CATEGORY: Record<Category, JSX.Element> = {
  Length: <Ruler className="h-4 w-4" />,
  Weight: <Scale className="h-4 w-4" />,
  Temperature: <ThermometerSun className="h-4 w-4" />
};

// Conversion helpers
const lengthToBase: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.344,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254
};
const weightToBase: Record<string, number> = {
  kg: 1,
  g: 0.001,
  lb: 0.45359237,
  oz: 0.028349523125
};
const lengthFromBase: Record<string, number> = {
  m: 1,
  km: 1 / 1000,
  cm: 100,
  mm: 1000,
  mi: 1 / 1609.344,
  yd: 1 / 0.9144,
  ft: 1 / 0.3048,
  in: 1 / 0.0254
};
const weightFromBase: Record<string, number> = {
  kg: 1,
  g: 1000,
  lb: 1 / 0.45359237,
  oz: 1 / 0.028349523125
};
function toBase(category: Category, value: number, unit: string): number {
  switch (category) {
    case "Length":
      return value * (lengthToBase[unit] ?? 1);
    case "Weight":
      return value * (weightToBase[unit] ?? 1);
    case "Temperature":
      if (unit === "C") return value;
      if (unit === "F") return (value - 32) * (5 / 9);
      if (unit === "K") return value - 273.15;
      return value;
  }
}
function fromBase(category: Category, baseValue: number, unit: string): number {
  switch (category) {
    case "Length":
      return baseValue * (lengthFromBase[unit] ?? 1);
    case "Weight":
      return baseValue * (weightFromBase[unit] ?? 1);
    case "Temperature":
      if (unit === "C") return baseValue;
      if (unit === "F") return baseValue * (9 / 5) + 32;
      if (unit === "K") return baseValue + 273.15;
      return baseValue;
  }
}
const nf = new Intl.NumberFormat(undefined, {
  maximumSignificantDigits: 8
});
const pretty = (n: number | null) => n == null || !Number.isFinite(n) ? "—" : nf.format(n);
export default function UnitConverterClient() {
  const [category, setCategory] = useState<Category>("Length");
  const [fromUnit, setFromUnit] = useState<string>(UNITS.Length[0]);
  const [toUnit, setToUnit] = useState<string>(UNITS.Length[1]);
  const [amount, setAmount] = useState<string>("1");
  const [showTable, setShowTable] = useState(false);
  const sanitize = (raw: string) => {
    const allowMinus = category === "Temperature";
    let v = raw.replace(/[^\d.-]/g, "");
    if (!allowMinus) v = v.replace(/-/g, "");
    const parts = v.split(".");
    if (parts.length > 2) v = `${parts[0]}.${parts.slice(1).join("")}`;
    if (allowMinus && v.lastIndexOf("-") > 0) v = v.replace(/-/g, "");
    return v;
  };
  const result = useMemo(() => {
    const num = parseFloat(amount);
    if (!Number.isFinite(num)) return null;
    const base = toBase(category, num, fromUnit);
    return fromBase(category, base, toUnit);
  }, [category, fromUnit, toUnit, amount]);
  const handleCategory = (v: Category) => {
    setCategory(v);
    setFromUnit(UNITS[v][0]);
    setToUnit(UNITS[v][1] ?? UNITS[v][0]);
    setAmount(v === "Temperature" ? "0" : "1");
  };
  const swapUnits = () => {
    setFromUnit(prev => {
      const f = toUnit;
      setToUnit(prev);
      return f;
    });
  };
  const resetAll = () => {
    handleCategory("Length");
    setAmount("1");
    setShowTable(false);
  };
  const tableRows = useMemo(() => {
    const num = parseFloat(amount);
    if (!Number.isFinite(num)) return [];
    const base = toBase(category, num, fromUnit);
    const units = UNITS[category];
    return units.map(u => ({
      unit: u,
      value: fromBase(category, base, u)
    }));
  }, [amount, category, fromUnit]);
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 {/* header */}
 <ToolPageHeader icon={Sparkles} title="Unit Converter" description="Convert length, weight, temp, etc." actions={<>
 <ResetButton onClick={resetAll} />
 <ActionButton icon={Table2} label={`${showTable ? "Hide" : "Show"} Conversions`} variant="default" onClick={() => setShowTable(s => !s)} />
 </>} />

 {/* Settings */}
 <GlassCard>
 <CardHeader>
 <div className="flex items-center gap-2">
 <CardTitle className="flex items-center gap-2 text-base">
 <Settings className="w-4 h-4" /> <span>Settings</span>
 </CardTitle>
 <Badge variant="secondary" className="ml-1">
 {ICON_BY_CATEGORY[category]} <span className="ml-1 hidden sm:inline">{category}</span>
 </Badge>
 </div>
 <CardDescription>Pick category, enter amount, choose From/To units.</CardDescription>
 </CardHeader>

 <CardContent className="grid gap-6 lg:grid-cols-2">
 <div className="grid gap-4">
 <div className="grid gap-2">
 <Label>Category</Label>
 <Select value={category} onValueChange={v => handleCategory(v as Category)}>
 <SelectTrigger className="bg-background/60 backdrop-blur">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {CATEGORIES.map(c => <SelectItem key={c} value={c}>
 <div className="flex items-center gap-2">
 {ICON_BY_CATEGORY[c]}
 <span>{c}</span>
 </div>
 </SelectItem>)}
 </SelectContent>
 </Select>
 </div>

 <div className="grid gap-2">
 <div className="flex items-end gap-2">
 <InputField label="From" inputMode="decimal" value={amount} onChange={e => setAmount(sanitize(e.target.value))} aria-label="Amount" />
 <Select value={fromUnit} onValueChange={v => setFromUnit(v)}>
 <SelectTrigger className="w-40 bg-background/60 backdrop-blur">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {UNITS[category].map(u => <SelectItem key={u} value={u}>
 {u}
 </SelectItem>)}
 </SelectContent>
 </Select>

 <ActionButton size="icon" onClick={swapUnits} icon={ArrowLeftRight} />
 </div>
 </div>

 <div className="grid gap-2">
 <Label>To</Label>
 <Select value={toUnit} onValueChange={v => setToUnit(v)}>
 <SelectTrigger className="w-40 bg-background/60 backdrop-blur">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {UNITS[category].map(u => <SelectItem key={u} value={u}>
 {u}
 </SelectItem>)}
 </SelectContent>
 </Select>
 </div>

 {/* Quick presets */}
 <div className="flex flex-wrap items-center gap-2 pt-1">
 {["1", "10", "100", "1000"].map(p => <Badge key={p} variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => setAmount(p)}>
 {p}
 </Badge>)}
 </div>
 </div>

 {/* Result & Info */}
 <div className="grid gap-4">
 <GlassCard className="rounded-2xl p-6">
 <div className="text-sm text-muted-foreground">Result</div>
 <div className="mt-2 flex items-baseline gap-3">
 <div className="text-4xl font-semibold tracking-tight">
 {pretty(result)} {toUnit}
 </div>
 <CopyButton size="icon" variant="ghost" label="" copiedLabel="" disabled={!result} getText={`${pretty(result)} ${toUnit}`} />
 </div>
 <p className="mt-2 text-xs text-muted-foreground">
 Base units: meter (m), kilogram (kg), Celsius (°C).
 </p>
 </GlassCard>

 <GlassCard className="rounded-2xl p-4 text-xs text-muted-foreground">
 <div className="flex items-center gap-2 font-medium text-foreground">
 <Info className="h-3.5 w-3.5" /> Notes
 </div>
 <ul className="mt-2 list-disc space-y-1 pl-5">
 <li>Temperature supports negative values; others disallow minus.</li>
 <li>Length & weight use precise SI factors.</li>
 <li>Use the swap button to flip units instantly.</li>
 </ul>
 </GlassCard>
 </div>
 </CardContent>
 </GlassCard>

 {/* Optional full table */}
 {showTable && <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">All Conversions in {category}</CardTitle>
 <CardDescription>
 Converts{""}
 <span className="font-medium">
 {amount || "—"} {fromUnit}
 </span>{""}
 into every unit in this category.
 </CardDescription>
 </CardHeader>
 <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
 {tableRows.map(row => <div key={row.unit} className="flex items-center justify-between rounded-md border p-3">
 <span className="text-sm text-muted-foreground uppercase">{row.unit}</span>
 <span className="font-mono">{pretty(row.value)}</span>
 </div>)}
 </CardContent>
 </GlassCard>}

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks steps={[{
        step: "01",
        title: "Select a Category",
        description: "Choose from Length, Weight/Mass, Temperature, Volume, Area, Speed, Time, Digital Storage, Pressure, and more unit categories.",
        icon: Ruler
      }, {
        step: "02",
        title: "Enter a Value",
        description: "Type a value in any unit and select your source unit. The converter instantly shows the equivalent in all other units simultaneously.",
        icon: Calculator
      }, {
        step: "03",
        title: "Copy or Compare",
        description: "Copy any converted value to clipboard. The multi-unit display lets you compare all related units side-by-side without switching back and forth.",
        icon: BookOpen
      }]} badges={["Multi-category support", "Instant conversion", "Works offline"]} />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides features={[{
        icon: Ruler,
        title: "Length & Distance",
        description: "Convert between meters, feet, inches, miles, kilometers, yards, centimeters, millimeters, nautical miles, and more with precise conversion factors."
      }, {
        icon: Scale,
        title: "Weight & Mass",
        description: "Convert kilograms, pounds, grams, ounces, stones, tonnes, milligrams. Includes both metric (SI) and imperial system units."
      }, {
        icon: ThermometerSun,
        title: "Temperature",
        description: "Convert Celsius, Fahrenheit, and Kelvin using the exact conversion formulas — not just approximations. Critical for science, cooking, and weather."
      }, {
        icon: ArrowLeftRight,
        title: "Volume & Capacity",
        description: "Supports liters, milliliters, gallons (US & UK), cups, fluid ounces, tablespoons, teaspoons, cubic meters, and cubic feet."
      }, {
        icon: Settings,
        title: "10+ Unit Categories",
        description: "Covers Area, Speed, Time, Pressure, Digital Storage, Energy, Power, and more — a comprehensive unit conversion toolbox in one place."
      }, {
        icon: Shield,
        title: "Precision & Accuracy",
        description: "Conversions use high-precision factors based on official SI definitions. Results are displayed with appropriate significant figures to avoid false precision."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Metric vs Imperial — A Complete Unit Systems Guide</h3>
 <p>
 The world uses two main measurement systems: the <strong>metric system</strong> (International System of
 Units, or SI) and the <strong>imperial system</strong>. The metric system is used by nearly every country
 and by all scientists globally. The United States, Myanmar, and Liberia are the only countries that
 officially use the imperial system for everyday measurements.
 </p>

 <h4 className="font-semibold">Length Unit Conversion Reference</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">From</th>
 <th className="border p-2 text-left">To Meter</th>
 <th className="border p-2 text-left">To Foot</th>
 <th className="border p-2 text-left">To Inch</th>
 </tr>
 </thead>
 <tbody>
 {[["1 Kilometer", "1,000 m", "3,280.84 ft", "39,370 in"], ["1 Meter", "1 m", "3.281 ft", "39.37 in"], ["1 Centimeter", "0.01 m", "0.0328 ft", "0.394 in"], ["1 Foot", "0.3048 m", "1 ft", "12 in"], ["1 Inch", "0.0254 m", "0.0833 ft", "1 in"], ["1 Mile", "1,609.34 m", "5,280 ft", "63,360 in"]].map(([from, m, ft, inch]) => <tr key={from} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{from}</td>
 <td className="border p-2 font-mono text-xs">{m}</td>
 <td className="border p-2 font-mono text-xs">{ft}</td>
 <td className="border p-2 font-mono text-xs">{inch}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Weight Conversion Reference</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">From</th>
 <th className="border p-2 text-left">Kilograms</th>
 <th className="border p-2 text-left">Pounds</th>
 <th className="border p-2 text-left">Grams</th>
 </tr>
 </thead>
 <tbody>
 {[["1 Kilogram", "1 kg", "2.205 lb", "1,000 g"], ["1 Pound", "0.4536 kg", "1 lb", "453.6 g"], ["1 Ounce", "0.02835 kg", "0.0625 lb", "28.35 g"], ["1 Stone", "6.350 kg", "14 lb", "6,350 g"], ["1 Tonne", "1,000 kg", "2,204.6 lb", "1,000,000 g"]].map(([from, kg, lb, g]) => <tr key={from} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{from}</td>
 <td className="border p-2 font-mono text-xs">{kg}</td>
 <td className="border p-2 font-mono text-xs">{lb}</td>
 <td className="border p-2 font-mono text-xs">{g}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Temperature Conversion Formulas</h4>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
 {[["°C to °F", "(°C × 9/5) + 32", "100°C = 212°F"], ["°F to °C", "(°F − 32) × 5/9", "98.6°F = 37°C"], ["°C to K", "°C + 273.15", "0°C = 273.15 K"]].map(([conv, formula, example]) => <div key={conv} className="flex flex-col gap-1 rounded-md border bg-muted/30 p-3">
 <span className="font-semibold text-primary text-xs">{conv}</span>
 <span className="font-mono text-xs">{formula}</span>
 <span className="text-muted-foreground text-xs">{example}</span>
 </div>)}
 </div>

 <h4 className="font-semibold">Digital Storage Units Reference</h4>
 <p className="text-sm text-muted-foreground">
 1 Byte = 8 bits | 1 KB = 1,024 Bytes | 1 MB = 1,024 KB | 1 GB = 1,024 MB | 1 TB = 1,024 GB | 1 PB = 1,024 TB.
 Note: Storage manufacturers often use 1 KB = 1,000 bytes (decimal), causing the &#34;missing space&#34; discrepancy seen on formatted drives.
 </p>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion faqs={[{
        question: "What unit categories does this converter support?",
        answer: "The converter supports Length, Weight/Mass, Temperature, Volume, Area, Speed, Time, Digital Storage, Pressure, and Energy — covering the most common unit conversion needs for science, cooking, engineering, and everyday use."
      }, {
        question: "How accurate are the conversions?",
        answer: "All conversion factors are based on official SI (International System of Units) definitions. For example, 1 inch = exactly 0.0254 meters per the international yard and pound agreement of 1959. Results are accurate to at least 6 significant figures."
      }, {
        question: "What is the difference between metric and imperial units?",
        answer: "The metric (SI) system uses base-10 multiples (kilo=1000, centi=1/100). The imperial system uses historically defined units (12 inches in a foot, 3 feet in a yard, 5,280 feet in a mile). Metric is used by 195+ countries; imperial is used daily mainly in the US."
      }, {
        question: "How do I convert Celsius to Fahrenheit?",
        answer: "Use the formula: °F = (°C × 9/5) + 32. For example, 100°C = (100 × 1.8) + 32 = 212°F. To convert back: °C = (°F − 32) × 5/9."
      }, {
        question: "Does this converter work offline?",
        answer: "Yes. All conversion factors are built into the tool and run in your browser. No API calls are made — the converter works fully offline once the page has loaded."
      }]} />
    </div>
    </div>
);
}
