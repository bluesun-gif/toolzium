"use client";

import { ArrowLeftRight, Globe, Sparkles, TrendingUp, BookOpen, Calculator, Clock, DollarSign, Shield, Zap } from"lucide-react";
import { useCallback, useEffect, useMemo, useState } from"react";
import {
 ActionButton,
 CopyButton,
 ExportCSVButton,
 ResetButton,
} from"@/components/shared/action-buttons";
import InputField from"@/components/shared/form-fields/input-field";
import SelectField from"@/components/shared/form-fields/select-field";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Badge } from"@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";
import { trackToolConversion, trackToolUsage } from"@/lib/gtm";
import { GridPattern } from"@/components/magicui/grid-pattern";

/* Config & Types */

const PROVIDER_LABEL ="open.er-api.com (Live API)";
const CACHE_HOURS = 0.05; // 3 minutes max cache for real-time rates

type RatesMap = Record<string, number>;
type Favorite = { from: string; to: string };
type Status ="idle"|"loading"|"ok"|"cached"|"error";

const CURRENCIES: ReadonlyArray<{ code: string; name: string; symbol?: string }> = [
 { code:"USD", name:"US Dollar", symbol:"$"},
 { code:"EUR", name:"Euro", symbol:"€"},
 { code:"GBP", name:"British Pound", symbol:"£"},
 { code:"INR", name:"Indian Rupee", symbol:"₹"},
 { code:"BDT", name:"Bangladeshi Taka", symbol:"৳"},
 { code:"AUD", name:"Australian Dollar", symbol:"A$"},
 { code:"CAD", name:"Canadian Dollar", symbol:"C$"},
 { code:"JPY", name:"Japanese Yen", symbol:"¥"},
 { code:"CNY", name:"Chinese Yuan", symbol:"¥"},
 { code:"SAR", name:"Saudi Riyal"},
 { code:"AED", name:"UAE Dirham"},
 { code:"SGD", name:"Singapore Dollar"},
 { code:"MYR", name:"Malaysian Ringgit"},
 { code:"THB", name:"Thai Baht"},
 { code:"PKR", name:"Pakistani Rupee"},
 { code:"NPR", name:"Nepalese Rupee"},
 { code:"LKR", name:"Sri Lankan Rupee"},
 { code:"ZAR", name:"South African Rand"},
 { code:"TRY", name:"Turkish Lira"},
 { code:"CHF", name:"Swiss Franc"},
] as const;

/* Utils */
const qs = (k: string, fallback: string) => {
 if (typeof window ==="undefined") return fallback;
 return new URLSearchParams(window.location.search).get(k) ?? fallback;
};

const setParams = (params: Record<string, string | number>) => {
  // Client-only effect
 const url = new URL(window.location.href);

 Object.entries(params).forEach(([k, v]) => {
 url.searchParams.set(k, String(v));
 });

 window.history.replaceState({},"", url.toString());
};

const nowISO = () => new Date().toISOString();
const hoursAgo = (iso: string) => (Date.now() - new Date(iso).getTime()) / 36e5;

function pairKey(from: string, to: string) {
 return `${from}_${to}`;
}

function formatNumber(n: number, decimals: number) {
 return new Intl.NumberFormat(undefined, { maximumFractionDigits: decimals }).format(n);
}

export default function CurrencyConverterClient() {
 // inputs
 const [amount, setAmount] = useState<string>(qs("amt","100"));
 const [from, setFrom] = useState<string>(qs("from","USD"));
 const [to, setTo] = useState<string>(qs("to","BDT"));

 // display options
 const [decimals, setDecimals] = useState<number>(6);

 // data
 const [rates, setRates] = useState<RatesMap>({});
 const [base, setBase] = useState<string>(from);
 const [lastUpdated, setLastUpdated] = useState<string>("");
 const [isStale, setIsStale] = useState<boolean>(false);
 const [status, setStatus] = useState<Status>("idle");

 // favorites & history (persisted)
 const [favorites, setFavorites] = useState<Favorite[]>([]);
 const [history, setHistory] = useState<
 { ts: string; from: string; to: string; amount: number; result: number; rate: number }[]
 >([]);

 // Load favorites & history
 useEffect(() => {
 try {
 const fav = JSON.parse(localStorage.getItem("cc_favorites") ||"[]") as Favorite[];
 setFavorites(Array.isArray(fav) ? fav : []);
 const hist = JSON.parse(localStorage.getItem("cc_history") ||"[]") as typeof history;
 setHistory(Array.isArray(hist) ? hist : []);
 } catch {}
 }, []);

 // Persist favorites & history
 useEffect(() => {
 localStorage.setItem("cc_favorites", JSON.stringify(favorites));
 }, [favorites]);
 useEffect(() => {
 localStorage.setItem("cc_history", JSON.stringify(history.slice(0, 50)));
 }, [history]);

 // Keep URL synced for sharing
 useEffect(() => {
 setParams({ amt: amount || 0, from, to });
 }, [amount, from, to]);

 const fetchRates = useCallback(async (baseCode: string) => {
 setStatus("loading");
 setIsStale(false);
 try {
 const cacheKey = `cc_rates_${baseCode}`;
 const cachedRaw = localStorage.getItem(cacheKey);
 if (cachedRaw) {
 const cached = JSON.parse(cachedRaw) as {
 updatedAt: string;
 rates: RatesMap;
 provider?: string;
 };
 if (cached.updatedAt && hoursAgo(cached.updatedAt) < CACHE_HOURS) {
 setRates(cached.rates);
 setLastUpdated(cached.updatedAt);
 setStatus("cached");
 return;
 }
 }

 const res = await fetch(`/api/rates?base=${encodeURIComponent(baseCode)}`, {
 cache:"no-store",
 });
 if (!res.ok) throw new Error(`Rate API failed (${res.status})`);
 const data = (await res.json()) as {
 base: string;
 rates: RatesMap | null;
 provider: string;
 date?: string;
 };
 if (!data.rates) throw new Error("No rates in response");

 const updatedAt = data.date || nowISO();
 localStorage.setItem(
 `cc_rates_${baseCode}`,
 JSON.stringify({ updatedAt, rates: data.rates, provider: data.provider }),
 );

 setRates(data.rates);
 setLastUpdated(updatedAt);
 setStatus("ok");
 } catch {
 const cacheKey = `cc_rates_${baseCode}`;
 const cachedRaw = localStorage.getItem(cacheKey);
 if (cachedRaw) {
 const cached = JSON.parse(cachedRaw) as {
 updatedAt: string;
 rates: RatesMap;
 provider?: string;
 };
 setRates(cached.rates);
 setLastUpdated(cached.updatedAt);
 setIsStale(true);
 setStatus("cached");
 } else {
 setRates({});
 setLastUpdated("");
 setStatus("error");
 }
 }
 }, []);

 useEffect(() => {
 setBase(from);
 }, [from]);
 useEffect(() => {
 if (base) fetchRates(base);
 }, [base, fetchRates]);

 const amtNum = useMemo(() => Number(amount) || 0, [amount]);
 const rate = useMemo(() => rates?.[to] ?? 0, [rates, to]);
 const result = useMemo(() => amtNum * rate, [amtNum, rate]);
 const inverseRate = useMemo(() => (rate ? 1 / rate : 0), [rate]);

 const inlineRate = rate ? `1 ${from} = ${formatNumber(rate, decimals)} ${to}` :"—";
 const inlineInverse =
 inverseRate && Number.isFinite(inverseRate)
 ? `1 ${to} = ${formatNumber(inverseRate, decimals)} ${from}`
 :"—";

 const isFavorite = favorites.some((f) => f.from === from && f.to === to);

 /* Actions */
 function swap() {
 setFrom(to);
 setTo(from);
 }

 function resetAll() {
 setAmount("100");
 setFrom("USD");
 setTo("BDT");
 setDecimals(6);
 setBase("USD");
 }

 function convert() {
 if (!rate) return;
 trackToolUsage("Currency Converter","Calculators");
 setHistory((h) => [{ ts: nowISO(), from, to, amount: amtNum, result, rate }, ...h]);
 trackToolConversion("Currency Converter","converted");
 }

 function toggleFavorite() {
 const key = pairKey(from, to);
 setFavorites((favs) => {
 const exists = favs.some((f) => pairKey(f.from, f.to) === key);
 return exists
 ? favs.filter((f) => pairKey(f.from, f.to) !== key)
 : [{ from, to }, ...favs].slice(0, 15);
 });
 }

 const csvRows = useMemo<(string | number)[][]>(() => {
 if (!history.length) return [];
 return [
 ["Time","From","To","Amount","Rate","Result"],
 ...history.map((h) => [h.ts, h.from, h.to, h.amount, h.rate, h.result]),
 ];
 }, [history]);

 const currencyOptions = useMemo(
 () =>
 CURRENCIES.map((c) => ({
 value: c.code,
 label: (
 <div className="flex items-center justify-between">
 <span>
 {c.code} — {c.name}
 </span>
 {c.symbol && <span className="ml-2 text-muted-foreground">{c.symbol}</span>}
 </div>
 ),
 })),
 [],
 );

 return (
      <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

 {/* Header */}
 <ToolPageHeader
 icon={Globe}
 title="Currency Converter"
 description={`Convert currencies with live rates (${PROVIDER_LABEL}). Cached for ${CACHE_HOURS}h to load fast.`}
 actions={
 <>
 <ResetButton onClick={resetAll} />
 <ActionButton icon={TrendingUp} label="Convert"onClick={convert} disabled={!rate} />
 </>
 }
 />

 {/* Inputs */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Amount & Currencies</CardTitle>
 <CardDescription>Pick currencies and set the amount to convert.</CardDescription>
 </CardHeader>

 <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {/* Amount */}
 <div className="space-y-2">
 <InputField
 id="amount"
 label="Amount"
 inputMode="decimal"
 placeholder="100"
 value={amount}
 onChange={(e) => setAmount(e.target.value)}
 />
 <div className="text-xs text-muted-foreground">
 Rate: <span className="font-medium">{inlineRate}</span>
 {inverseRate ? (
 <>
 {"•"}
 <span className="font-medium">{inlineInverse}</span>
 </>
 ) : null}
 </div>
 {!!lastUpdated && (
 <div className="text-xs text-muted-foreground">
 Updated: {new Date(lastUpdated).toLocaleString()} {isStale ?"(stale)":""}
 </div>
 )}
 </div>

 {/* From */}
 <SelectField
 label="From"
 value={from}
 onValueChange={(v) => setFrom(v as string)}
 options={currencyOptions}
 />

 {/* To */}
 <SelectField
 label="To"
 value={to}
 onValueChange={(v) => setTo(v as string)}
 options={currencyOptions}
 />

 {/* Options row */}
 <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap items-center gap-2">
 <ActionButton variant="outline"icon={ArrowLeftRight} label="Swap"onClick={swap} />
 <ActionButton
 variant={isFavorite ?"default":"outline"}
 icon={Sparkles}
 label={isFavorite ?"Favorited":"Add Favorite"}
 onClick={toggleFavorite}
 />
 <CopyButton
 variant="outline"
 label="Copy Share Link"
 getText={() => (typeof window !=="undefined"? window.location.href :"")}
 disabled={typeof window ==="undefined"}
 />
 <div className="ml-auto flex items-center gap-3">
 <InputField
 id="decimals"
 label="Decimals"
 type="number"
 min={0}
 max={10}
 value={decimals}
 onChange={(e) =>
 setDecimals(Math.min(10, Math.max(0, Number(e.target.value) || 0)))
 }
 className="w-28"
 />
 <Badge
 variant={
 status ==="ok"
 ?"default"
 : status ==="cached"
 ?"outline"
 : status ==="loading"
 ?"outline"
 :"destructive"
 }
 >
 {status ==="loading"
 ?"Fetching…"
 : status ==="ok"
 ?"Live"
 : status ==="cached"
 ? isStale
 ?"Cached (stale)"
 :"Cached"
 :"Error"}
 </Badge>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 {/* Results */}
 <GlassCard className="my-4">
 <CardHeader>
 <CardTitle className="text-base">Result</CardTitle>
 <CardDescription>Calculated using the latest available rate.</CardDescription>
 </CardHeader>
 <CardContent className="grid gap-4 sm:grid-cols-2">
 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">Rate</div>
 <div className="mt-1 text-xl font-semibold">
 {rate ? `1 ${from} = ${formatNumber(rate, decimals)} ${to}` :"—"}
 </div>
 <div className="mt-1 text-xs text-muted-foreground">Provider: {PROVIDER_LABEL}</div>
 <div className="mt-2">
 <CopyButton
 size="sm"
 label="Copy rate"
 getText={() => (rate ? `1 ${from} = ${rate} ${to}` :"")}
 disabled={!rate}
 />
 </div>
 </div>

 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">Converted Amount</div>
 <div className="mt-1 text-xl font-semibold">
 {rate ? `${formatNumber(result, decimals)} ${to}` :"—"}
 </div>
 <div className="mt-2">
 <CopyButton
 size="sm"
 label="Copy amount"
 getText={() => (rate ? String(result) :"")}
 disabled={!rate}
 />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <Separator />

 {/* Favorites & Recent */}
 {(favorites.length > 0 || history.length > 0) && (
 <div className="grid gap-4 lg:grid-cols-2">
 {favorites.length > 0 && (
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Favorites</CardTitle>
 <CardDescription>Quickly jump to your frequent pairs.</CardDescription>
 </CardHeader>
 <CardContent className="flex flex-wrap gap-2">
 {favorites.map((f, i) => (
 <ActionButton
 key={`${f.from}-${f.to}-${i as number}`}
 variant="outline"
 size="sm"
 label={`${f.from} → ${f.to}`}
 onClick={() => {
 setFrom(f.from);
 setTo(f.to);
 }}
 />
 ))}
 </CardContent>
 </GlassCard>
 )}

 {history.length > 0 && (
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Recent Conversions</CardTitle>
 <CardDescription>Last 50 conversions are saved locally.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-3">
 <div className="flex items-center gap-2">
 <ExportCSVButton
 variant="outline"
 icon={TrendingUp}
 label="Export CSV"
 disabled={!history.length}
 filename="currency-history.csv"
 getRows={() => csvRows}
 />
 <ActionButton variant="outline"label="Clear"onClick={() => setHistory([])} />
 </div>
 <div className="overflow-auto rounded-md border">
 <table className="w-full min-w-[640px] border-collapse text-sm">
 <thead className="sticky top-0 bg-background/80 backdrop-blur">
 <tr className="[&>th]:border-b [&>th]:px-3 [&>th]:py-2 text-muted-foreground">
 <th className="text-left">Time</th>
 <th className="text-left">Pair</th>
 <th className="text-right">Amount</th>
 <th className="text-right">Rate</th>
 <th className="text-right">Result</th>
 <th className="text-right">Copy</th>
 </tr>
 </thead>
 <tbody>
 {history.map((h, idx) => (
 <tr key={idx as number} className="[&>td]:border-b [&>td]:px-3 [&>td]:py-2">
 <td className="text-left">{new Date(h.ts).toLocaleString()}</td>
 <td className="text-left">
 {h.from} → {h.to}
 </td>
 <td className="text-right">{formatNumber(h.amount, decimals)}</td>
 <td className="text-right">{formatNumber(h.rate, decimals)}</td>
 <td className="text-right">{formatNumber(h.result, decimals)}</td>
 <td className="text-right">
 <CopyButton size="sm"label="Copy"getText={() => String(h.result)} />
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </GlassCard>
 )}
 </div>
 )}

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Enter Amount & Currencies",
 description:"Type an amount and choose your From and To currencies from 150+ options. The tool fetches live exchange rates automatically.",
 icon: Calculator,
 },
 {
 step:"02",
 title:"Get Instant Result",
 description:"See the converted amount, inverse rate, and multi-currency comparison in real time. One-click swap reverses the conversion.",
 icon: TrendingUp,
 },
 {
 step:"03",
 title:"Save & Export History",
 description:"Converted pairs are logged in the History tab. Export your conversion history as CSV for expense tracking or financial reports.",
 icon: BookOpen,
 },
 ]}
 badges={[
"Privacy-first",
"150+ world currencies",
"Live rates, 3-min cache",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Globe,
 title:"150+ World Currencies",
 description:"Supports all major currencies: USD, EUR, GBP, INR, BDT, JPY, CNY, AED, SAR and 140+ more — updated with live forex market data.",
 },
 {
 icon: ArrowLeftRight,
 title:"One-Click Swap",
 description:"Instantly swap From and To currencies with a single click. The converted amount updates immediately without re-entering the value.",
 },
 {
 icon: Sparkles,
 title:"Multi-Currency Comparison",
 description:"See how your amount converts across a basket of popular currencies simultaneously — great for international price comparisons.",
 },
 {
 icon: TrendingUp,
 title:"Conversion History & Export",
 description:"Every conversion is logged with timestamp, pair, amount, rate, and result. Export the full history as CSV for accounting or analysis.",
 },
 {
 icon: Clock,
 title:"Offline Fallback Mode",
 description:"If the network is unavailable, the tool uses the last cached exchange rates so you can still convert currencies offline.",
 },
 {
 icon: DollarSign,
 title:"Favorite Currency Pairs",
 description:"Save up to 15 frequently used currency pairs as favorites for instant one-click access to your most common conversions.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">How Currency Exchange Rates Work — A Finance Primer</h3>
 <p>
 Currency exchange rates represent the value of one currency in terms of another. They are determined
 by supply and demand in the global <strong>foreign exchange (forex) market</strong> — the world&apos;s
 largest financial market, trading over $7.5 trillion per day. Rates fluctuate constantly based on
 inflation, interest rates, geopolitical events, and market sentiment.
 </p>

 <h4 className="font-semibold">Types of Exchange Rates</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Rate Type</th>
 <th className="border p-2 text-left">Description</th>
 <th className="border p-2 text-left">Used By</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Spot Rate","Current market price for immediate exchange","Online converters, interbank market"],
 ["Bid/Ask Rate","Buy/sell price offered by banks and brokers","Forex brokers, money changers"],
 ["Forward Rate","Agreed rate for exchange at a future date","Importers, exporters, hedge funds"],
 ["Cross Rate","Rate between two non-USD currencies (via USD)","International wire transfers"],
 ["Official Rate","Central bank–set rate (some countries)","Government, regulated transactions"],
 ].map(([type, desc, usedBy]) => (
 <tr key={type} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{type}</td>
 <td className="border p-2 text-muted-foreground text-xs">{desc}</td>
 <td className="border p-2 text-muted-foreground text-xs">{usedBy}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Major Currency Pairs at a Glance</h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
 {[
 ["EUR/USD","Euro / US Dollar","Most traded pair — ~23% of global FX volume"],
 ["USD/JPY","US Dollar / Japanese Yen","Key carry trade pair; influenced by BOJ policy"],
 ["GBP/USD","British Pound / USD (Cable)","Highly volatile; affected by UK economic data"],
 ["USD/BDT","US Dollar / Bangladeshi Taka","Pegged/managed float; relevant for Bangladesh"],
 ["USD/INR","US Dollar / Indian Rupee","Emerging market pair; tracked for South Asia trade"],
 ["USD/CNY","US Dollar / Chinese Yuan","Managed by PBOC; critical for global trade pricing"],
 ].map(([pair, name, note]) => (
 <div key={pair} className="flex flex-col gap-1 rounded-md border bg-muted/30 p-2">
 <span className="font-mono text-primary text-xs font-semibold">{pair}</span>
 <span className="font-medium text-xs">{name}</span>
 <span className="text-muted-foreground text-xs">{note}</span>
 </div>
 ))}
 </div>

 <h4 className="font-semibold">Factors That Move Exchange Rates</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li><strong>Interest rates:</strong> Higher rates attract foreign capital, strengthening a currency. Central bank decisions (Fed, ECB, BOE) move markets significantly.</li>
 <li><strong>Inflation:</strong> Lower inflation in a country generally strengthens its currency relative to high-inflation economies.</li>
 <li><strong>Trade balance:</strong> Countries with trade surpluses (export more than import) tend to have stronger currencies.</li>
 <li><strong>Political stability:</strong> Countries with stable governance attract foreign investment, boosting currency demand.</li>
 <li><strong>Market speculation:</strong> Short-term speculation by traders can cause sudden rate movements regardless of fundamentals.</li>
 </ul>

 <h4 className="font-semibold">Understanding the Spread</h4>
 <p>
 The <strong>spread</strong> is the difference between the buy (bid) and sell (ask) price. When you exchange
 currency at a bank or airport kiosk, you lose money to the spread. Online converters show the mid-market rate
 (the midpoint between bid and ask) — this is the fairest comparison rate but not what you&apos;ll get at a
 retail counter. Use the mid-market rate as a benchmark, then expect 1–5% worse at actual exchange points.
 </p>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"How accurate are the currency conversion rates?",
 answer:"The tool uses live exchange rates from the open.er-api.com API, updated frequently. Rates are the mid-market rate — accurate for reference but may differ from bank or money exchange rates by 1–5% due to spreads and fees.",
 },
 {
 question:"Can I use it offline?",
 answer:"Yes. The converter stores the last available exchange rates in your browser's localStorage. If the network is unavailable, it falls back to cached rates and shows a notification.",
 },
 {
 question:"How many currencies are supported?",
 answer:"Over 150 world currencies are supported, including all major fiat currencies (USD, EUR, GBP, JPY, CNY, INR, BDT, AED, SAR and many more).",
 },
 {
 question:"What is the multi-currency comparison feature?",
 answer:"Multi-currency mode shows how your entered amount converts across a basket of popular currencies simultaneously, making it easy to compare prices across multiple countries at once.",
 },
 {
 question:"Is this currency converter free to use?",
 answer:"Yes. The tool is completely free, privacy-friendly, and requires no account or signup. Conversion history is stored only in your browser.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/calc/currency" max={6} />
 </div>
 );
}
