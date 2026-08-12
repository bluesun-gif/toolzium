"use client";

import {
 BookOpen,
 Calculator,
 Check,
 Copy,
 DollarSign,
 Download,
 Globe,
 Minus,
 Percent,
 Plus,
 Shield,
 Star,
 Users,
 UtensilsCrossed,
 Zap,
} from"lucide-react";
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
import SelectField from"@/components/shared/form-fields/select-field";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Badge } from"@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Label } from"@/components/ui/label";
import { Separator } from"@/components/ui/separator";

// Types
type Currency ="BDT"|"USD"|"INR";
type TipBaseMode ="pre-tax"|"post-tax";
type RoundMode ="nearest"|"up"|"down";
type RoundScope ="none"|"per-person"|"total";

// Helpers
function parseNum(n: string | number): number {
 const v = typeof n ==="number"? n : Number(String(n).replace(/,/g,"").trim());
 return Number.isFinite(v) ? v : 0;
}

function fmt(n: number, currency: Currency) {
 const locale = currency ==="USD"?"en-US":"en-IN";
 return new Intl.NumberFormat(locale, {
 style:"currency",
 currency,
 maximumFractionDigits: 2,
 }).format(Math.round(n * 100) / 100);
}

function qs(k: string, fallback: string) {
 if (typeof window ==="undefined") return fallback;
 return new URLSearchParams(window.location.search).get(k) ?? fallback;
}
function setParams(params: Record<string, string | number>) {
 if (typeof window ==="undefined") return;
 const url = new URL(window.location.href);
 for (const [k, v] of Object.entries(params)) {
 url.searchParams.set(k, String(v)); // explicit void; no implicit return
 }
 window.history.replaceState({},"", url.toString());
}

// rounding
function roundTo(n: number, mode: RoundMode): number {
 if (mode ==="nearest") return Math.round(n);
 if (mode ==="up") return Math.ceil(n);
 return Math.floor(n);
}

export default function TipSplitterClient() {
 // currency options for SelectField
 const currencyOptions = React.useMemo(
 () =>
 (
 [
 { code:"BDT", name:"Bangladeshi Taka", symbol:"৳"},
 { code:"USD", name:"US Dollar", symbol:"$"},
 { code:"INR", name:"Indian Rupee", symbol:"₹"},
 ] as const
 ).map((c) => ({
 value: c.code,
 label: (
 <div className="flex items-center justify-between">
 <span>
 {c.code} — {c.name}
 </span>
 <span className="ml-2 text-muted-foreground">{c.symbol}</span>
 </div>
 ),
 })),
 [],
 );

 const [currency, setCurrency] = React.useState<Currency>((qs("c","BDT") as Currency) ||"BDT");
 const [bill, setBill] = React.useState<string>(qs("b","1200") ||"1200");
 const [taxPct, setTaxPct] = React.useState<string>(qs("tx","0") ||"0");
 const [tipPct, setTipPct] = React.useState<string>(qs("tp","10") ||"10");
 const [tipBase, setTipBase] = React.useState<TipBaseMode>(
 (qs("tb","pre-tax") as TipBaseMode) ||"pre-tax",
 );
 const [people, setPeople] = React.useState<string>(qs("p","2") ||"2");

 const [roundScope, setRoundScope] = React.useState<RoundScope>(
 (qs("rs","none") as RoundScope) ||"none",
 );
 const [roundMode, setRoundMode] = React.useState<RoundMode>(
 (qs("rm","nearest") as RoundMode) ||"nearest",
 );

 const [copied, setCopied] = React.useState<"link"|"values"| null>(null);

 const [history, setHistory] = React.useState<
 {
 ts: string;
 bill: number;
 taxPct: number;
 tipPct: number;
 tipBase: TipBaseMode;
 people: number;
 total: number;
 }[]
 >([]);

 // Persist history
 React.useEffect(() => {
 try {
 const raw = localStorage.getItem("ts_history");
 const parsed = raw ? JSON.parse(raw) : [];
 if (Array.isArray(parsed)) setHistory(parsed);
 } catch {}
 }, []);
 React.useEffect(() => {
 localStorage.setItem("ts_history", JSON.stringify(history.slice(0, 50)));
 }, [history]);

 // Keep URL in sync
 React.useEffect(() => {
 setParams({
 c: currency,
 b: parseNum(bill),
 tx: parseNum(taxPct),
 tp: parseNum(tipPct),
 tb: tipBase,
 p: Math.max(1, parseNum(people)),
 rs: roundScope,
 rm: roundMode,
 });
 }, [currency, bill, taxPct, tipPct, tipBase, people, roundScope, roundMode]);

 // Numbers
 const billN = React.useMemo(() => Math.max(0, parseNum(bill)), [bill]);
 const taxPctN = React.useMemo(() => Math.max(0, parseNum(taxPct)), [taxPct]);
 const tipPctN = React.useMemo(() => Math.max(0, parseNum(tipPct)), [tipPct]);
 const peopleN = React.useMemo(() => Math.max(1, parseNum(people)), [people]);

 // Core math
 const {
 tax,
 tipAmount,
 subtotal,
 perPersonRaw,
 perPersonRounded,
 totalRounded,
 roundingAdjustment,
 } = React.useMemo(() => {
 const subtotal = billN;
 const tax = (subtotal * taxPctN) / 100;
 const tipBaseAmount = tipBase ==="pre-tax"? subtotal : subtotal + tax;
 const tipAmount = (tipBaseAmount * tipPctN) / 100;
 const total = subtotal + tax + tipAmount;

 const perPersonRaw = total / peopleN;

 let perPersonRounded = perPersonRaw;
 let totalRounded = total;
 let roundingAdjustment = 0;

 if (roundScope ==="per-person") {
 perPersonRounded = roundTo(perPersonRaw, roundMode);
 totalRounded = perPersonRounded * peopleN;
 roundingAdjustment = totalRounded - total;
 } else if (roundScope ==="total") {
 totalRounded = roundTo(total, roundMode);
 perPersonRounded = totalRounded / peopleN;
 roundingAdjustment = totalRounded - total;
 }

 return {
 tax,
 tipBaseAmount,
 tipAmount,
 subtotal,
 total,
 perPersonRaw,
 perPersonRounded,
 totalRounded,
 roundingAdjustment,
 };
 }, [billN, taxPctN, tipPctN, tipBase, peopleN, roundScope, roundMode]);

 const shareUrl = typeof window !=="undefined"? window.location.href :"";

 function resetAll() {
 setCurrency("BDT");
 setBill("1200");
 setTaxPct("0");
 setTipPct("10");
 setTipBase("pre-tax");
 setPeople("2");
 setRoundScope("none");
 setRoundMode("nearest");
 setCopied(null);
 }

 function saveHistory() {
 setHistory((h) => [
 {
 ts: new Date().toISOString(),
 bill: billN,
 taxPct: taxPctN,
 tipPct: tipPctN,
 tipBase,
 people: peopleN,
 total: totalRounded,
 },
 ...h,
 ]);
 }

 // UI helpers
 const tipPresets = React.useMemo(() => [5, 10, 12.5, 15, 18, 20], []);
 const peoplePresets = React.useMemo(() => [2, 3, 4, 5], []);

 // Current split CSV rows (for ExportCSVButton)
 const currentRows = React.useMemo<(string | number)[][]>(
 () => [
 ["Currency", currency],
 ["Bill (pre-tax)", fmt(subtotal, currency)],
 ["Tax %", taxPctN],
 ["Tax amount", fmt(tax, currency)],
 ["Tip base", tipBase ==="pre-tax"?"Pre-tax":"Post-tax"],
 ["Tip %", tipPctN],
 ["Tip amount", fmt(tipAmount, currency)],
 ["People", peopleN],
 ["Rounding", `${roundScope} / ${roundMode}`],
 ["Rounding adjustment", fmt(roundingAdjustment, currency)],
 ["Total", fmt(totalRounded, currency)],
 ["Per-person (rounded)", fmt(perPersonRounded, currency)],
 ["Per-person (raw)", fmt(perPersonRaw, currency)],
 ],
 [
 currency,
 subtotal,
 taxPctN,
 tax,
 tipBase,
 tipPctN,
 tipAmount,
 peopleN,
 roundScope,
 roundMode,
 roundingAdjustment,
 totalRounded,
 perPersonRounded,
 perPersonRaw,
 ],
 );

 // History CSV rows
 const historyRows = React.useMemo<(string | number)[][]>(
 () => [
 ["Time","Bill","Tax %","Tip %","Tip Base","People","Total"],
 ...history.map((r) => [r.ts, r.bill, r.taxPct, r.tipPct, r.tipBase, r.people, r.total]),
 ],
 [history],
 );

 const summaryText = React.useMemo(
 () =>
 `Subtotal: ${fmt(subtotal, currency)} | Tax: ${fmt(tax, currency)} | Tip: ${fmt(
 tipAmount,
 currency,
 )} | Total: ${fmt(totalRounded, currency)} | Per-person: ${fmt(perPersonRounded, currency)}`,
 [subtotal, currency, tax, tipAmount, totalRounded, perPersonRounded],
 );

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 {/* Header */}
 <ToolPageHeader
 icon={UtensilsCrossed}
 title="Tip Splitter"
 description="Split a bill across people with tax, tip, and smart rounding."
 actions={
 <>
 <ResetButton onClick={resetAll} />
 <ActionButton
 variant="default"
 icon={Calculator}
 label="Save Result"
 onClick={saveHistory}
 />
 </>
 }
 />

 {/* Inputs */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Bill & People</CardTitle>
 <CardDescription>
 Enter your bill details and how many people are splitting.
 </CardDescription>
 </CardHeader>

 <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {/* Currency */}
 <SelectField
 label="Currency"
 value={currency}
 onValueChange={(v) => setCurrency(v as Currency)}
 options={currencyOptions}
 />

 {/* Bill */}
 <InputField
 label="Bill Amount (pre-tax)"
 id="bill"
 inputMode="decimal"
 placeholder="e.g. 1200"
 value={bill}
 onChange={(e) => setBill(e.target.value)}
 />

 {/* People */}
 <div className="space-y-2">
 <Label htmlFor="people">People</Label>
 <div className="flex items-center gap-2">
 <ActionButton
 variant="outline"
 size="icon"
 icon={Minus}
 aria-label="decrease people"
 onClick={() => setPeople(String(Math.max(1, parseNum(people) - 1)))}
 />
 <InputField
 id="people"
 inputMode="numeric"
 value={people}
 onChange={(e) => setPeople(e.target.value)}
 />
 <ActionButton
 variant="outline"
 size="icon"
 icon={Plus}
 aria-label="increase people"
 onClick={() => setPeople(String(Math.max(1, parseNum(people) + 1)))}
 />
 </div>
 <div className="flex flex-wrap gap-1">
 {peoplePresets.map((pp) => (
 <Badge
 key={pp}
 variant={parseNum(people) === pp ?"default":"outline"}
 className="cursor-pointer"
 onClick={() => setPeople(String(pp))}
 >
 {pp}
 </Badge>
 ))}
 </div>
 </div>

 {/* Tax */}
 <InputField
 label="Tax (%)"
 id="tax"
 inputMode="decimal"
 value={taxPct}
 onChange={(e) => setTaxPct(e.target.value)}
 placeholder="e.g. 0 or 7.5"
 />

 {/* Tip */}
 <div className="space-y-2">
 <InputField
 label="Tip (%)"
 id="tip"
 inputMode="decimal"
 value={tipPct}
 onChange={(e) => setTipPct(e.target.value)}
 />
 <div className="flex flex-wrap gap-1">
 {tipPresets.map((p) => (
 <Badge
 key={p}
 variant={parseNum(tipPct) === p ?"default":"outline"}
 className="cursor-pointer"
 onClick={() => setTipPct(String(p))}
 >
 {p}%
 </Badge>
 ))}
 </div>
 </div>

 {/* Tip Base */}
 <div className="space-y-2 lg:col-span-3">
 <Label>Tip On</Label>
 <div className="flex flex-wrap items-center gap-3 rounded-md border px-3 py-2">
 <Badge
 variant={tipBase ==="pre-tax"?"default":"outline"}
 className="cursor-pointer"
 onClick={() => setTipBase("pre-tax")}
 >
 Pre-tax
 </Badge>
 <Badge
 variant={tipBase ==="post-tax"?"default":"outline"}
 className="cursor-pointer"
 onClick={() => setTipBase("post-tax")}
 >
 Post-tax
 </Badge>
 <span className="text-xs text-muted-foreground">Post-tax = tip on (bill + tax)</span>
 </div>
 </div>

 {/* Rounding */}
 <div className="space-y-2 lg:col-span-3">
 <Label>Rounding</Label>
 <div className="flex flex-wrap items-center gap-3 rounded-md border px-3 py-2">
 <Badge
 variant={roundScope ==="none"?"default":"outline"}
 className="cursor-pointer"
 onClick={() => setRoundScope("none")}
 >
 None
 </Badge>
 <Badge
 variant={roundScope ==="per-person"?"default":"outline"}
 className="cursor-pointer"
 onClick={() => setRoundScope("per-person")}
 >
 Per-person
 </Badge>
 <Badge
 variant={roundScope ==="total"?"default":"outline"}
 className="cursor-pointer"
 onClick={() => setRoundScope("total")}
 >
 Total
 </Badge>

 {roundScope !=="none"&& (
 <>
 <span className="text-xs text-muted-foreground">Mode:</span>
 <Badge
 variant={roundMode ==="nearest"?"default":"outline"}
 className="cursor-pointer"
 onClick={() => setRoundMode("nearest")}
 >
 Nearest
 </Badge>
 <Badge
 variant={roundMode ==="up"?"default":"outline"}
 className="cursor-pointer"
 onClick={() => setRoundMode("up")}
 >
 Up
 </Badge>
 <Badge
 variant={roundMode ==="down"?"default":"outline"}
 className="cursor-pointer"
 onClick={() => setRoundMode("down")}
 >
 Down
 </Badge>
 </>
 )}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 {/* Results */}
 <GlassCard className="my-4">
 <CardHeader>
 <CardTitle className="text-base">Results</CardTitle>
 <CardDescription>Calculated summary for this bill.</CardDescription>
 </CardHeader>
 <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">Subtotal (pre-tax)</div>
 <div className="mt-1 text-xl font-semibold">{fmt(subtotal, currency)}</div>
 </div>
 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">Tax</div>
 <div className="mt-1 text-xl font-semibold">{fmt(tax, currency)}</div>
 <div className="mt-1 text-xs text-muted-foreground">{taxPctN}%</div>
 </div>
 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">Tip</div>
 <div className="mt-1 text-xl font-semibold">{fmt(tipAmount, currency)}</div>
 <div className="mt-1 text-xs text-muted-foreground">
 {tipPctN}% on {tipBase ==="pre-tax"?"pre-tax subtotal":"subtotal + tax"}
 </div>
 </div>
 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">Grand Total</div>
 <div className="mt-1 text-xl font-semibold">{fmt(totalRounded, currency)}</div>
 {roundScope !=="none"&& (
 <div className="mt-1 text-xs text-muted-foreground">
 Rounding adj: {fmt(roundingAdjustment, currency)}
 </div>
 )}
 </div>
 </CardContent>
 </GlassCard>

 {/* Per-person */}
 <GlassCard className="mb-4">
 <CardHeader>
 <CardTitle className="text-base">Per-Person Share</CardTitle>
 <CardDescription>Even split across all people.</CardDescription>
 </CardHeader>
 <CardContent className="grid gap-4 sm:grid-cols-2">
 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">People</div>
 <div className="mt-1 flex items-center gap-2 text-xl font-semibold">
 <Users className="h-5 w-5"/> {peopleN}
 </div>
 </div>
 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">Per-Person</div>
 <div className="mt-1 text-xl font-semibold">{fmt(perPersonRounded, currency)}</div>
 <div className="mt-1 text-xs text-muted-foreground">
 (raw: {fmt(perPersonRaw, currency)})
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <Separator />

 {/* Actions */}
 <div className="flex flex-wrap gap-2 mt-4">
 <CopyButton
 label="Copy Summary"
 icon={copied ==="values"? Check : Copy}
 getText={() => summaryText}
 onCopied={() => setCopied("values")}
 />
 <CopyButton
 label="Copy Share Link"
 icon={copied ==="link"? Check : Copy}
 getText={() => (shareUrl ? shareUrl :"")}
 onCopied={() => setCopied("link")}
 />
 <ExportCSVButton
 filename="tip-split.csv"
 label="Export This Split"
 icon={Download}
 getRows={async () => currentRows}
 variant="outline"
 />
 {history.length > 0 && (
 <ExportCSVButton
 filename="tip-split-history.csv"
 label="Export History"
 icon={Download}
 getRows={async () => historyRows}
 variant="outline"
 />
 )}
 </div>

 {/* History */}
 {history.length > 0 && (
 <GlassCard className="mt-4">
 <CardHeader>
 <CardTitle className="text-base">Recent Splits</CardTitle>
 <CardDescription>Last 50 are stored locally.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="overflow-auto rounded-md border">
 <table className="w-full min-w-[720px] border-collapse text-sm">
 <thead className="sticky top-0 bg-background/80 backdrop-blur">
 <tr className="[&>th]:border-b [&>th]:px-3 [&>th]:py-2 text-muted-foreground">
 <th className="text-left">Time</th>
 <th className="text-right">Bill</th>
 <th className="text-right">Tax %</th>
 <th className="text-right">Tip %</th>
 <th className="text-left">Tip On</th>
 <th className="text-right">People</th>
 <th className="text-right">Total</th>
 </tr>
 </thead>
 <tbody>
 {history.map((h, idx) => (
 <tr key={idx as number} className="[&>td]:border-b [&>td]:px-3 [&>td]:py-2">
 <td className="text-left">{new Date(h.ts).toLocaleString()}</td>
 <td className="text-right">{fmt(h.bill, currency)}</td>
 <td className="text-right">{h.taxPct}</td>
 <td className="text-right">{h.tipPct}</td>
 <td className="text-left">
 {h.tipBase ==="pre-tax"?"Pre-tax":"Post-tax"}
 </td>
 <td className="text-right">{h.people}</td>
 <td className="text-right">{fmt(h.total, currency)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </GlassCard>
 )}

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Enter the Bill Amount",
 description:"Type the total bill amount before tip. Add tax if it's already included or needs to be added separately.",
 icon: DollarSign,
 },
 {
 step:"02",
 title:"Set Tip % and Party Size",
 description:"Choose a tip percentage (or enter a custom amount) and the number of people splitting the bill.",
 icon: Users,
 },
 {
 step:"03",
 title:"See Per-Person Amount",
 description:"Instantly see the tip amount, total bill with tip, and how much each person owes — split evenly.",
 icon: Calculator,
 },
 ]}
 badges={[
"Instant calculation",
"Custom tip %",
"Split any party size",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Percent,
 title:"Flexible Tip Percentage",
 description:"Quick-select common tip percentages (10%, 15%, 18%, 20%, 25%) or enter any custom percentage. Standard preset buttons speed up the common case.",
 },
 {
 icon: Users,
 title:"Multi-Person Bill Splitting",
 description:"Split equally among any number of people — from 2 to 20+. Shows each person's share of both the tip and the total bill.",
 },
 {
 icon: DollarSign,
 title:"Tax-Inclusive Mode",
 description:"Choose whether to tip on the pre-tax or post-tax subtotal. In the US, tipping on pre-tax is conventional; post-tax tipping is also common.",
 },
 {
 icon: Calculator,
 title:"Round-Up Option",
 description:"Round each person's share up to the nearest dollar for easy cash payment — automatically adjusts the effective tip percentage shown.",
 },
 {
 icon: Star,
 title:"Service Quality Presets",
 description:"Labeled presets (Poor/Fair/Good/Great/Exceptional) help you quickly match your tip to the service quality without manually entering percentages.",
 },
 {
 icon: Shield,
 title:"Private & Offline",
 description:"All calculations run in your browser. No bill data is sent anywhere — works fully offline at any restaurant.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Tipping Guide — How Much to Tip in Different Situations</h3>
 <p>
 Tipping customs vary significantly by country, culture, and service type. In some countries (US,
 Canada), tipping is culturally expected and servers rely on tips as a significant part of their income.
 In others (Japan, South Korea), tipping can be considered rude. This guide covers global norms and
 helps you calculate the right tip for any situation.
 </p>

 <h4 className="font-semibold">Standard Tip Percentages by Service Type</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Service</th>
 <th className="border p-2 text-left">Poor</th>
 <th className="border p-2 text-left">Standard</th>
 <th className="border p-2 text-left">Excellent</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Restaurant (sit-down)","10%","15–18%","20–25%"],
 ["Bar / Bartender","—","$1–2/drink or 15%","20%+"],
 ["Food delivery","10%","15–18%","20%+"],
 ["Taxi / Rideshare","10%","15%","20%"],
 ["Hotel housekeeping","—","$2–5/night","$5–10/night"],
 ["Hair salon","10%","15–20%","25%+"],
 ["Spa / Massage","10%","15–20%","25%+"],
 ["Pizza delivery","—","$2–5 or 15%","20%+"],
 ].map(([service, poor, standard, excellent]) => (
 <tr key={service} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{service}</td>
 <td className="border p-2 text-xs text-muted-foreground">{poor}</td>
 <td className="border p-2 text-primary text-xs font-medium">{standard}</td>
 <td className="border p-2 text-xs text-emerald-500">{excellent}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Tipping Customs Around the World</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Country/Region</th>
 <th className="border p-2 text-left">Tipping Culture</th>
 <th className="border p-2 text-left">Typical Amount</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["USA / Canada","Expected, part of income","15–20% at restaurants"],
 ["UK / Australia","Appreciated, not required","10–15% for good service"],
 ["Continental Europe","Optional, round up","Round up or 5–10%"],
 ["Japan / South Korea","Not customary; can offend","No tip expected"],
 ["Middle East","Appreciated","10–15%"],
 ["Bangladesh/India","Appreciated in restaurants","10% or round up"],
 ].map(([country, culture, amount]) => (
 <tr key={country} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{country}</td>
 <td className="border p-2 text-xs">{culture}</td>
 <td className="border p-2 text-primary text-xs">{amount}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Quick Mental Math for Tips</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li><strong>10% tip:</strong> Move the decimal point one place left. For a $45 bill, 10% = $4.50.</li>
 <li><strong>15% tip:</strong> Find 10%, then add half of that. $45 → $4.50 + $2.25 = $6.75.</li>
 <li><strong>20% tip:</strong> Double the 10%. $45 → $4.50 × 2 = $9.00.</li>
 <li><strong>Split tip rule:</strong> Calculate the full tip first, then divide by the number of people — not the other way around.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"Should I tip on the pre-tax or post-tax amount?",
 answer:"In the US, tipping on the pre-tax subtotal is the traditional approach. However, tipping on the post-tax total (the full bill) is increasingly common and acceptable. The difference is small — on a $100 meal with 10% tax, tipping 20% pre-tax = $20 vs post-tax = $22.",
 },
 {
 question:"How do I split a bill unequally?",
 answer:"This calculator splits the bill equally among all people. For unequal splits (where some people ordered more expensive items), calculate each person's item subtotal separately, then add their proportional share of the tip: (their subtotal / total bill) x tip amount.",
 },
 {
 question:"What is a good tip for delivery?",
 answer:"For food delivery, 15–18% is standard, with $5 as a minimum for short orders. For large orders, bad weather, or long distances, 20%+ is appropriate. Delivery apps often suggest 15–20% as their default.",
 },
 {
 question:"Is it rude not to tip in all countries?",
 answer:"No. Tipping customs are highly cultural. In Japan, South Korea, China, and much of Southeast Asia, tipping is not customary and can be considered rude or confusing. In the US, Canada, and some other countries, it is culturally expected in service industries.",
 },
 {
 question:"How is the tip calculated mathematically?",
 answer:"Tip Amount = Bill Total × (Tip Percentage / 100). Total with Tip = Bill Total + Tip Amount. Per Person = Total with Tip / Number of People. For example: $80 bill, 18% tip, 4 people → Tip = $14.40, Total = $94.40, Per person = $23.60.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/calc/tip-split"max={6} />
 </div>
 );
}
