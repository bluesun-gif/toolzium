"use client";

import { BookOpen, Shield, Percent, DollarSign, Calculator, Globe, Receipt, BarChart3, ArrowUpDown, Info } from"lucide-react";
import * as React from"react";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import {
 ActionButton,
 CopyButton,
 ExportCSVButton,
 ResetButton,
} from"@/components/shared/action-buttons";
import InputField from"@/components/shared/form-fields/input-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Badge } from"@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Label } from"@/components/ui/label";
import { Separator } from"@/components/ui/separator";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";

export default function VatCalculatorClient() {
 // State
 const [mode, setMode] = React.useState<"add"|"remove">("add");
 const [price, setPrice] = React.useState<number>(1000);
 const [rate, setRate] = React.useState<number>(15);
 const [round2, setRound2] = React.useState<boolean>(true);
 const [currency, setCurrency] = React.useState<string>("BDT");

 // Derived
 const r = Math.max(0, rate) / 100;
 const calc = React.useMemo(() => computeVat({ price, r, mode }), [price, r, mode]);

 function resetAll() {
 setMode("add");
 setPrice(1000);
 setRate(15);
 setRound2(true);
 setCurrency("BDT");
 }

 const CSVRows: string[][] = [
 ["Mode","Input Price","Rate %","Net","Tax","Gross"],
 [
 mode ==="add"?"Add Tax":"Remove Tax",
 numStr(price),
 String(rate),
 numStr(calc.net),
 numStr(calc.tax),
 numStr(calc.gross),
 ],
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 {/* Header */}
 <ToolPageHeader
 icon={Percent}
 title="GST/VAT Calculator"
 description="Add tax to a net price or remove tax from a gross price."
 actions={
 <>
 <ResetButton onClick={resetAll} />
 <ActionButton variant="default"icon={Calculator} label="Calculate"/>
 </>
 }
 />

 {/* Inputs */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Inputs</CardTitle>
 <CardDescription>
 Choose mode, set price and tax rate. Use quick chips for common rates.
 </CardDescription>
 </CardHeader>
 <CardContent className="grid gap-4 sm:grid-cols-2">
 <div className="space-y-2">
 <Label>Mode</Label>
 <div className="grid grid-cols-2 gap-2">
 <ModeButton active={mode ==="add"} onClick={() => setMode("add")}>
 Add Tax
 </ModeButton>
 <ModeButton active={mode ==="remove"} onClick={() => setMode("remove")}>
 Remove Tax
 </ModeButton>
 </div>
 <p className="text-xs text-muted-foreground">
 Add = price is net (pre‑tax). Remove = price is gross (tax‑inclusive).
 </p>
 </div>

 <div className="space-y-2">
 <InputField
 label={mode ==="add"?"Net Price":"Gross Price"}
 id="price"
 inputMode="decimal"
 value={numDisplay(price)}
 onChange={(e) => setPrice(safeNum(e.target.value))}
 />

 <p className="text-xs text-muted-foreground">
 Enter the {mode ==="add"?"pre‑tax":"tax‑inclusive"} amount.
 </p>
 </div>

 <div className="space-y-2">
 <InputField
 label="Tax Rate (%)"
 id="rate"
 type="number"
 min={0}
 step="0.1"
 value={rate}
 onChange={(e) => setRate(Number(e.target.value) || 0)}
 />
 <div className="flex flex-wrap gap-2 pt-1">
 {[5, 7.5, 10, 12, 15].map((v) => (
 <QuickChip key={v} onClick={() => setRate(v)}>
 {v}%
 </QuickChip>
 ))}
 </div>
 </div>

 <div className="space-y-2">
 <SwitchRow label="Round to 2 decimals"checked={round2} onCheckedChange={setRound2} />
 <div className="text-xs text-muted-foreground">
 Currency formatting defaults to your locale. Current: <strong>{currency}</strong>
 </div>
 <div className="flex flex-wrap gap-2 pt-1">
 {["BDT","USD","INR","EUR"].map((c) => (
 <QuickChip key={c} onClick={() => setCurrency(c)}>
 {c}
 </QuickChip>
 ))}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <Separator />

 {/* Results */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Results</CardTitle>
 <CardDescription>Calculated amounts based on your inputs.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid gap-4 sm:grid-cols-3">
 <ResultBox
 label="Net"
 value={formatMoney(calc.net, currency, round2)}
 onCopyText={formatMoney(calc.net, currency, round2)}
 />
 <ResultBox
 label="Tax"
 value={formatMoney(calc.tax, currency, round2)}
 onCopyText={formatMoney(calc.tax, currency, round2)}
 />
 <ResultBox
 label="Gross"
 value={formatMoney(calc.gross, currency, round2)}
 onCopyText={formatMoney(calc.gross, currency, round2)}
 />
 </div>

 <div className="flex flex-wrap items-center gap-2">
 <Badge variant="outline">Mode: {mode ==="add"?"Add Tax":"Remove Tax"}</Badge>
 <Badge variant="outline">Rate: {rate}%</Badge>
 <Badge variant="outline">Currency: {currency}</Badge>
 </div>

 <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
 <Info className="h-4 w-4"/>
 <span>
 Add Tax: gross = net × (1 + r). Remove Tax: net = gross ÷ (1 + r). Tax = gross − net.
 </span>
 </div>

 <div className="pt-2">
 <ExportCSVButton
 variant="default"
 filename="vat-calculation.csv"
 getRows={() => CSVRows}
 />
 </div>
 </CardContent>
 </GlassCard>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Enter the Price & VAT Rate",
 description:"Enter either the price before VAT (exclusive) or the price including VAT (inclusive). Set the VAT rate — common rates like 5%, 10%, 15%, 20%, 21%, 23% are pre-loaded.",
 icon: Calculator,
 },
 {
 step:"02",
 title:"Choose Add or Remove VAT",
 description:"Adding VAT: calculates the VAT amount and final price. Removing VAT: extracts the VAT from a VAT-inclusive price to find the net amount.",
 icon: ArrowUpDown,
 },
 {
 step:"03",
 title:"Copy Results",
 description:"See the net price, VAT amount, and gross price clearly. Copy any value for use in invoices, quotes, accounting software, or financial reports.",
 icon: Receipt,
 },
 ]}
 badges={[
"Add or remove VAT",
"Global VAT rates",
"Instant calculation",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Percent,
 title:"Add VAT to Price",
 description:"Calculate the VAT amount and final customer price from a net (ex-VAT) price. Formula: VAT Amount = Net × (Rate/100); Gross = Net + VAT Amount.",
 },
 {
 icon: ArrowUpDown,
 title:"Remove VAT from Price",
 description:"Extract the net price and VAT amount from a VAT-inclusive price. Formula: Net = Gross / (1 + Rate/100); VAT Amount = Gross - Net.",
 },
 {
 icon: Globe,
 title:"Global VAT Rate Reference",
 description:"Quick-select buttons for common international VAT rates: UK 20%, EU standard 21-23%, India GST 18%, Australia GST 10%, Canada HST 13-15%, and more.",
 },
 {
 icon: Receipt,
 title:"Invoice-Ready Output",
 description:"Results show net price, VAT amount, and gross price — exactly the three values needed for a compliant VAT invoice. Copy each value individually.",
 },
 {
 icon: BarChart3,
 title:"Multiple Rate Support",
 description:"Handles any VAT rate from 0% to 99%. Useful for jurisdictions with reduced rates (e.g., 5% for food/books in UK) or super-reduced rates (2.1% in France).",
 },
 {
 icon: Shield,
 title:"Client-Side & Private",
 description:"All calculations run in your browser. No pricing data is sent to any server — safe for commercial and confidential pricing work.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">VAT & GST Around the World — A Business Reference Guide</h3>
 <p>
 <strong>Value Added Tax (VAT)</strong> is a consumption tax applied at each stage of production and
 distribution. It is used by 170+ countries worldwide. Unlike sales tax (applied only at the final
 sale), VAT is collected incrementally — each business in the supply chain charges VAT and can
 reclaim the VAT they paid on inputs. The end consumer bears the full tax burden.
 </p>

 <h4 className="font-semibold">Standard VAT / GST Rates by Country</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Country / Region</th>
 <th className="border p-2 text-left">Tax Name</th>
 <th className="border p-2 text-left">Standard Rate</th>
 <th className="border p-2 text-left">Reduced Rate</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["United Kingdom","VAT","20%","5% (energy, children's car seats)"],
 ["Germany","MwSt (VAT)","19%","7% (food, books, transport)"],
 ["France","TVA (VAT)","20%","10% / 5.5% / 2.1%"],
 ["European Union avg.","VAT","21%","Varies by country"],
 ["Australia","GST","10%","0% (fresh food, health)"],
 ["Canada","HST/GST","5–15%","Varies by province"],
 ["India","GST","18%","5% / 12% (tiered)"],
 ["Bangladesh","VAT","15%","5% / 10% (selected goods)"],
 ["USA","Sales Tax","0–13%","No federal VAT (state only)"],
 ["Japan","Consumption Tax","10%","8% (food & non-alcoholic drinks)"],
 ].map(([country, name, standard, reduced]) => (
 <tr key={country} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{country}</td>
 <td className="border p-2 text-xs">{name}</td>
 <td className="border p-2 text-primary font-mono text-xs">{standard}</td>
 <td className="border p-2 text-muted-foreground text-xs">{reduced}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">VAT Invoice Requirements</h4>
 <p>
 A valid VAT invoice must typically include: supplier's name, address, and VAT registration number;
 invoice date and unique invoice number; description of goods/services; net amount (ex-VAT);
 VAT rate applied; VAT amount; and gross total (including VAT). Missing any of these can make the
 invoice non-compliant for your customer's VAT reclaim.
 </p>

 <h4 className="font-semibold">VAT vs Sales Tax — Key Differences</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Feature</th>
 <th className="border p-2 text-left">VAT</th>
 <th className="border p-2 text-left">Sales Tax (USA)</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Collection point","At each production stage","Only at final retail sale"],
 ["Who collects","Every business in chain","Only the retailer"],
 ["B2B transactions","Charged, then reclaimed","Often exempt"],
 ["Invoice requirement","VAT invoice required","Receipt sufficient"],
 ["Used by","170+ countries","USA (state level)"],
 ].map(([feat, vat, sales]) => (
 <tr key={feat} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{feat}</td>
 <td className="border p-2 text-xs">{vat}</td>
 <td className="border p-2 text-xs">{sales}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"How do I calculate VAT from a price that already includes VAT?",
 answer:"Use the 'Remove VAT' mode. The formula is: Net Price = Gross Price / (1 + VAT Rate/100); VAT Amount = Gross Price - Net Price. For example, removing 20% VAT from £120: Net = £120 / 1.20 = £100; VAT = £120 - £100 = £20.",
 },
 {
 question:"What is the difference between net and gross price?",
 answer:"Net price is the price before VAT (also called ex-VAT or ex-tax price). Gross price is the price including VAT (also called inc-VAT or the final customer price). On a VAT invoice, both must be shown separately along with the VAT amount and rate.",
 },
 {
 question:"Can businesses reclaim VAT?",
 answer:"Yes. VAT-registered businesses can reclaim the VAT they paid on business purchases (input VAT) by offsetting it against the VAT they charge customers (output VAT). Only the net VAT (output minus input) is paid to the tax authority. Consumers cannot reclaim VAT.",
 },
 {
 question:"What VAT rate should I use?",
 answer:"Use the rate applicable in the country where the sale takes place (place of supply rules). In the UK: 20% standard, 5% reduced (energy, children's car seats), 0% zero-rated (food, books, children's clothing). In the EU: standard rates range from 17-27%. When in doubt, consult your country's tax authority or an accountant.",
 },
 {
 question:"Does the USA have VAT?",
 answer:"No. The USA does not have a federal VAT. Instead, individual states levy sales tax, which is only collected at the final point of sale to the consumer. Rates vary from 0% (Oregon, Montana, New Hampshire, Delaware) to over 13% in some cities/counties. This is fundamentally different from VAT.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/finance/vat" max={6} />
 </div>
 );
}

// Components
function ModeButton({
 active,
 onClick,
 children,
}: React.PropsWithChildren<{ active?: boolean; onClick?: () => void }>) {
 return (
 <button
 type="button"
 onClick={onClick}
 className={cn(
"rounded-md border px-3 py-2 text-sm transition",
 active ?"bg-primary/10 border-primary/40":"hover:bg-accent hover:text-accent-foreground",
 )}
 >
 {children}
 </button>
 );
}

function QuickChip({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
 return (
 <button
 type="button"
 onClick={onClick}
 className="rounded-full border px-3 py-1 text-xs hover:bg-accent hover:text-accent-foreground transition"
 >
 {children}
 </button>
 );
}

function ResultBox({
 label,
 value,
 onCopyText,
}: {
 label: string;
 value: string;
 onCopyText: string;
}) {
 return (
 <div className="rounded-lg border p-3">
 <div className="mb-1 flex items-center justify-between">
 <span className="text-xs text-muted-foreground">{label}</span>
 <CopyButton size="sm"getText={() => onCopyText} />
 </div>
 <div className="text-lg font-semibold tabular-nums">{value}</div>
 </div>
 );
}

// Logic
function computeVat({ price, r, mode }: { price: number; r: number; mode:"add"|"remove"}) {
 const p = Math.max(0, Number(price) || 0);
 const rate = Math.max(0, Number(r) || 0);
 let net = 0,
 gross = 0,
 tax = 0;

 if (mode ==="add") {
 net = p;
 gross = p * (1 + rate);
 tax = gross - net;
 } else {
 gross = p;
 net = rate === 0 ? p : p / (1 + rate);
 tax = gross - net;
 }

 return { net, tax, gross };
}

// Utils
function numDisplay(n: number) {
 return Number.isFinite(n) ? String(n) :"";
}
function numStr(n: number) {
 return String(n);
}
function safeNum(v: string) {
 const x = Number(String(v).replace(/[^0-9.-]/g,""));
 return Number.isFinite(x) ? x : 0;
}
function formatMoney(n: number, currency: string, round2: boolean) {
 const val = round2 ? Math.round(n * 100) / 100 : n;
 try {
 return new Intl.NumberFormat(undefined, { style:"currency", currency }).format(val);
 } catch {
 return `${new Intl.NumberFormat().format(val)} ${currency}`;
 }
}
