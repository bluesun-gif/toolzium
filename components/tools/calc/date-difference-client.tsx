"use client";

import { Calendar, CalendarDays, CalendarRange, Info, RefreshCcw, BookOpen, Shield, Clock, Timer, Layers, Globe, Calculator, AlignLeft } from"lucide-react";
import { useMemo, useState } from"react";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import InputField from"@/components/shared/form-fields/input-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import Stat from"@/components/shared/stat";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";
import { GridPattern } from"@/components/magicui/grid-pattern";

// Types
type PresetRange ="today"|"yesterday"|"last7"|"last30"|"thisMonth";
type StatItem = { key: string; label: string; value: string; className?: string };

/* Date helpers */

// Calendar-style Y/M/D diff + running totals
function diffYMD(a: Date, b: Date) {
 let from = new Date(a.getFullYear(), a.getMonth(), a.getDate());
 let to = new Date(b.getFullYear(), b.getMonth(), b.getDate());
 if (to < from) [from, to] = [to, from];

 let years = to.getFullYear() - from.getFullYear();
 let months = to.getMonth() - from.getMonth();
 let days = to.getDate() - from.getDate();

 if (days < 0) {
 months -= 1;
 const prevMonthDays = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
 days += prevMonthDays;
 }
 if (months < 0) {
 months += 12;
 years -= 1;
 }

 const ms = Math.abs(b.getTime() - a.getTime());
 const totalDays = Math.floor(ms / (1000 * 60 * 60 * 24));
 const totalWeeks = Math.floor(totalDays / 7);
 const totalHours = Math.floor(ms / (1000 * 60 * 60));
 const totalMinutes = Math.floor(ms / (1000 * 60));
 const totalSeconds = Math.floor(ms / 1000);
 return { years, months, days, totalDays, totalWeeks, totalHours, totalMinutes, totalSeconds };
}

// Count business days (Mon–Fri).
function businessDaysBetween(a: Date, b: Date, inclusive = false) {
 const [from, to] = a <= b ? [a, b] : [b, a];
 let days = 0;
 const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
 const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
 if (inclusive) {
 end.setDate(end.getDate() + 1);
 }
 for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
 const wd = d.getDay();
 if (wd !== 0 && wd !== 6) days++;
 }
 return days;
}

const fmt = new Intl.DateTimeFormat(undefined, {
 year:"numeric",
 month:"short",
 day:"2-digit",
});

export default function DateDifferenceClient() {
 const [start, setStart] = useState<string>("");
 const [end, setEnd] = useState<string>("");
 const [inclusive, setInclusive] = useState<boolean>(false);

 const parsed = useMemo(() => {
 if (!start || !end) return null;
 const a = new Date(start);
 const b = new Date(end);
 const isInvalidDate = (d: Date) => Number.isNaN(d.getTime());
 if (isInvalidDate(a) || isInvalidDate(b)) return null;

 const base = diffYMD(a, b);

 // If inclusive, totals +1 day (calendar Y/M/D stays)
 const totals = inclusive
 ? {
 ...base,
 totalDays: base.totalDays + 1,
 totalWeeks: Math.floor((base.totalDays + 1) / 7),
 totalHours: (base.totalDays + 1) * 24,
 totalMinutes: (base.totalDays + 1) * 24 * 60,
 totalSeconds: (base.totalDays + 1) * 24 * 60 * 60,
 }
 : base;

 const biz = businessDaysBetween(a, b, inclusive);
 const aFmt = fmt.format(a);
 const bFmt = fmt.format(b);

 return { ...totals, a, b, aFmt, bFmt, bizDays: biz };
 }, [start, end, inclusive]);

 const swap = () => {
 setStart((s) => {
 const t = end;
 setEnd(s);
 return t;
 });
 };

 const setTodayStart = () => setStart(new Date().toISOString().split("T")[0]);
 const setTodayEnd = () => setEnd(new Date().toISOString().split("T")[0]);

 // Quick presets
 const preset = (range:"today"|"yesterday"|"last7"|"last30"|"thisMonth") => {
 const now = new Date();
 const to = new Date(now.getFullYear(), now.getMonth(), now.getDate());
 if (range ==="today") {
 setStart(to.toISOString().split("T")[0]);
 setEnd(to.toISOString().split("T")[0]);
 setInclusive(false);
 return;
 }
 if (range ==="yesterday") {
 const y = new Date(to);
 y.setDate(y.getDate() - 1);
 setStart(y.toISOString().split("T")[0]);
 setEnd(y.toISOString().split("T")[0]);
 setInclusive(false);
 return;
 }
 if (range ==="last7") {
 const from = new Date(to);
 from.setDate(from.getDate() - 6);
 setStart(from.toISOString().split("T")[0]);
 setEnd(to.toISOString().split("T")[0]);
 setInclusive(true);
 return;
 }
 if (range ==="last30") {
 const from = new Date(to);
 from.setDate(from.getDate() - 29);
 setStart(from.toISOString().split("T")[0]);
 setEnd(to.toISOString().split("T")[0]);
 setInclusive(true);
 return;
 }
 if (range ==="thisMonth") {
 const first = new Date(to.getFullYear(), to.getMonth(), 1);
 setStart(first.toISOString().split("T")[0]);
 setEnd(to.toISOString().split("T")[0]);
 setInclusive(true);
 return;
 }
 };

 const resetAll = () => {
 setStart("");
 setEnd("");
 setInclusive(false);
 };

 const summary = useMemo(() => {
 if (!parsed) return"";
 return [
 `Date difference (${parsed.aFmt} → ${parsed.bFmt})${inclusive ?"[inclusive]":""}`,
 `Calendar diff: ${parsed.years}y ${parsed.months}m ${parsed.days}d`,
 `Total days: ${parsed.totalDays}`,
 `Total weeks: ${parsed.totalWeeks}`,
 `Total hours: ${parsed.totalHours}`,
 `Total minutes: ${parsed.totalMinutes}`,
 `Total seconds: ${parsed.totalSeconds}`,
 `Business days (Mon–Fri): ${parsed.bizDays}`,
 ].join("\n");
 }, [parsed, inclusive]);

 const QUICK_PRESETS: ReadonlyArray<{ label: string; value: PresetRange }> = [
 { label:"Today", value:"today"},
 { label:"Yesterday", value:"yesterday"},
 { label:"Last 7 days", value:"last7"},
 { label:"Last 30 days", value:"last30"},
 { label:"This month", value:"thisMonth"},
 ] as const;

 const statItems = useMemo<StatItem[]>(() => {
 const dash ="—";
 return [
 {
 key:"cal",
 label:"Calendar diff",
 value: parsed ? `${parsed.years}y ${parsed.months}m ${parsed.days}d` : dash,
 },
 { key:"days", label:"Total days", value: parsed ? String(parsed.totalDays) : dash },
 { key:"weeks", label:"Total weeks", value: parsed ? String(parsed.totalWeeks) : dash },
 { key:"hours", label:"Total hours", value: parsed ? String(parsed.totalHours) : dash },
 {
 key:"minutes",
 label:"Total minutes",
 value: parsed ? String(parsed.totalMinutes) : dash,
 },
 {
 key:"seconds",
 label:"Total seconds",
 value: parsed ? String(parsed.totalSeconds) : dash,
 },
 {
 key:"biz",
 label:"Business days (Mon–Fri)",
 value: parsed ? String(parsed.bizDays) : dash,
 className:"md:col-span-2",
 },
 ];
 }, [parsed]);

 return (
      <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

 {/* Header */}
 <ToolPageHeader
 icon={CalendarRange}
 title="Date Difference"
 description="Uses your local timezone. Toggle inclusive to count both start and end dates."
 actions={
 <>
 <ResetButton onClick={resetAll} />
 <ActionButton variant="outline"icon={RefreshCcw} label="Swap"onClick={swap} />
 <CopyButton
 variant="default"
 label="Copy Summary"
 getText={() => summary}
 disabled={!summary}
 />
 </>
 }
 />

 {/* Inputs */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calendar className="h-5 w-5"/> Pick Dates
 </CardTitle>
 <CardDescription>
 Quick presets or pick any two dates. Local timezone is applied.
 </CardDescription>
 </CardHeader>

 <CardContent>
 {/* Presets */}
 <div className="flex flex-wrap gap-2 pb-4">
 {QUICK_PRESETS.map((p) => (
 <ActionButton
 key={p.value}
 variant="secondary"
 size="sm"
 label={p.label}
 onClick={() => preset(p.value)}
 />
 ))}
 </div>

 <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-end">
 <div className="grid gap-2">
 <InputField
 label="Start date"
 type="date"
 value={start}
 onChange={(e) => setStart(e.target.value)}
 />
 <ActionButton
 variant="outline"
 size="sm"
 icon={CalendarDays}
 label="Today"
 onClick={setTodayStart}
 />
 </div>

 <div className="flex items-end justify-center">
 <ActionButton variant="outline"icon={RefreshCcw} label="Swap"onClick={swap} />
 </div>

 <div className="grid gap-2">
 <InputField
 label="End date"
 type="date"
 value={end}
 onChange={(e) => setEnd(e.target.value)}
 />
 <ActionButton
 variant="outline"
 size="sm"
 icon={CalendarDays}
 label="Today"
 onClick={setTodayEnd}
 />
 </div>
 </div>

 {/* Inclusive toggle */}
 <div className="mt-4">
 <SwitchRow
 label="Count both start and end dates (inclusive)"
 checked={inclusive}
 onCheckedChange={setInclusive}
 />
 </div>

 <Separator className="my-6"/>

 {/* Results */}
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {statItems.map((s) => (
 <Stat key={s.key} label={s.label} value={s.value} className={s.className} />
 ))}

 <GlassCard className="p-4">
 <div className="space-y-1">
 <div className="text-sm text-muted-foreground">Range</div>
 <div className="text-sm font-medium">
 {parsed
 ? `${parsed.aFmt} → ${parsed.bFmt}${inclusive ?"(inclusive)":""}`
 :"—"}
 </div>
 <div className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
 <Info className="mt-0.5 h-3.5 w-3.5"/>
 <span>
 Calendar diff shows Y/M/D; totals are day-based. Business days exclude weekends;
 holidays not excluded.
 </span>
 </div>
 </div>
 </GlassCard>
 </div>
 </CardContent>
 </GlassCard>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Select Two Dates",
 description:"Pick a start date and end date using the date pickers. You can enter past or future dates. The calculation is bidirectional.",
 icon: Calendar,
 },
 {
 step:"02",
 title:"See the Difference",
 description:"Instantly see the difference expressed in years, months, weeks, days, hours, minutes, and seconds. All units are shown simultaneously.",
 icon: Clock,
 },
 {
 step:"03",
 title:"Copy or Use",
 description:"Copy any result for use in reports, legal documents, project timelines, age calculations, or countdown planning.",
 icon: BookOpen,
 },
 ]}
 badges={[
"Years, months & days",
"Instant calculation",
"Works offline",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Calendar,
 title:"Multi-Unit Output",
 description:"Shows the difference in years, months, weeks, days, hours, minutes, and seconds — all at once. No need to recalculate for each unit.",
 },
 {
 icon: Clock,
 title:"Age Calculator",
 description:"Use it as an age calculator by setting the start date to a birthdate and end date to today. Get exact age in years, months, and days.",
 },
 {
 icon: Timer,
 title:"Project Duration",
 description:"Calculate how many working days, weeks, or months a project lasted. Useful for timesheets, invoicing, and project retrospectives.",
 },
 {
 icon: Globe,
 title:"Past & Future Dates",
 description:"Works with any date range — past or future. Calculate days until an event, deadline countdown, or days since a historical date.",
 },
 {
 icon: Layers,
 title:"Inclusive/Exclusive Counting",
 description:"Understand the difference between inclusive counting (counting both start and end date) vs exclusive (counting only the gap) — important for legal and contractual calculations.",
 },
 {
 icon: Shield,
 title:"Client-Side & Private",
 description:"All calculations run entirely in your browser using JavaScript's Date API. No data is sent to any server.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Date Difference Calculations — A Practical Reference</h3>
 <p>
 Calculating the difference between two dates is a surprisingly complex problem due to varying
 month lengths, leap years, and daylight saving time transitions. This tool handles all edge cases
 correctly using JavaScript's Date API, giving you accurate results across any date range.
 </p>

 <h4 className="font-semibold">Date Difference Use Cases</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Use Case</th>
 <th className="border p-2 text-left">Start Date</th>
 <th className="border p-2 text-left">End Date</th>
 <th className="border p-2 text-left">Useful Unit</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Age calculation","Date of birth","Today","Years + months + days"],
 ["Project duration","Project start","Project end","Days or weeks"],
 ["Loan tenure","Loan disbursement","Final payment","Months"],
 ["Event countdown","Today","Event date","Days"],
 ["Contract duration","Signing date","Expiry date","Months or years"],
 ["Subscription renewal","Start date","Renewal date","Days"],
 ].map(([useCase, start, end, unit]) => (
 <tr key={useCase} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{useCase}</td>
 <td className="border p-2 text-muted-foreground text-xs">{start}</td>
 <td className="border p-2 text-muted-foreground text-xs">{end}</td>
 <td className="border p-2 text-primary text-xs">{unit}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Days in Each Month (Leap Year Reference)</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Month</th>
 <th className="border p-2 text-left">Normal Year</th>
 <th className="border p-2 text-left">Leap Year</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["January","31","31"],
 ["February","28","29"],
 ["March","31","31"],
 ["April","30","30"],
 ["May","31","31"],
 ["June","30","30"],
 ["July","31","31"],
 ["August","31","31"],
 ["September","30","30"],
 ["October","31","31"],
 ["November","30","30"],
 ["December","31","31"],
 ].map(([month, normal, leap]) => (
 <tr key={month} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{month}</td>
 <td className="border p-2 text-center text-xs">{normal}</td>
 <td className="border p-2 text-center text-xs font-medium"style={{ color: month === 'February' ? 'var(--primary)' : undefined }}>{leap}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Leap Year Rules</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li>A year is a leap year if it is divisible by <strong>4</strong>.</li>
 <li>Exception: years divisible by <strong>100</strong> are NOT leap years.</li>
 <li>Exception to the exception: years divisible by <strong>400</strong> ARE leap years.</li>
 <li>So: 2000 → leap year. 1900 → not a leap year. 2024 → leap year. 2100 → not a leap year.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"How is the date difference calculated?",
 answer:"The tool subtracts the start date from the end date using JavaScript's Date API, which handles varying month lengths, leap years, and DST transitions automatically. The result is then expressed in years, months, weeks, days, hours, minutes, and seconds.",
 },
 {
 question:"Can I use this as an age calculator?",
 answer:"Yes. Set the start date to your birth date and the end date to today. The result shows your exact age in years, months, and days — accounting for leap years and varying month lengths.",
 },
 {
 question:"What is the difference between inclusive and exclusive day counting?",
 answer:"Exclusive counting (the default): counts only the days between the dates (e.g., Jan 1 to Jan 3 = 2 days). Inclusive counting: counts both the start and end date (Jan 1 to Jan 3 = 3 days). Legal contracts often use inclusive counting — always clarify which method applies.",
 },
 {
 question:"How do leap years affect the calculation?",
 answer:"Leap years add an extra day (Feb 29) to the year. If your date range spans a February 29th, the tool counts it correctly as an extra day. A full calendar year from Jan 1 to Dec 31 in a leap year is 366 days, not 365.",
 },
 {
 question:"Can I calculate working days excluding weekends?",
 answer:"This tool calculates the total calendar day difference including weekends. For working day calculations (excluding weekends and holidays), use a dedicated business day calculator. Working days = Total days - (number of Saturdays + Sundays in the range) - public holidays.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/calc/date-diff" max={6} />
 </div>
 );
}
