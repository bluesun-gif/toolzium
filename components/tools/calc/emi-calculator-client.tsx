"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { ActionButton, CopyButton, ExportCSVButton, ResetButton } from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SelectField from "@/components/shared/form-fields/select-field";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { Calculator, Calendar as CalendarIcon, Download, History, BookOpen, PieChart, TrendingDown, Shield, Zap, Globe, DollarSign, BarChart3, Info } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { useEffect, useMemo, useState } from "react";
import { GridPattern } from "@/components/magicui/grid-pattern";

// Types
type TermMode = "years" | "months";
type Currency = "BDT" | "USD" | "INR";
type Row = {
  month: number;
  date: string;
  opening: number;
  interest: number;
  principal: number;
  extra: number;
  payment: number;
  closing: number;
};

// Utils
function parseNum(n: string | number): number {
  const v = typeof n === "number" ? n : Number(String(n).replace(/,/g, "").trim());
  return Number.isFinite(v) ? v : 0;
}
function fmt(n: number, currency: Currency) {
  const code = currency === "BDT" ? "BDT" : currency === "INR" ? "INR" : "USD";
  const locale = currency === "USD" ? "en-US" : "en-IN";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    maximumFractionDigits: 2
  }).format(Math.round(n * 100) / 100);
}
function fmtInt(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}
function addMonths(date: Date, m: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + m);
  return d;
}
function yyyymm(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Core EMI math
function computeEMI(P: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return months > 0 ? P / months : 0;
  const factor = (1 + r) ** months;
  return P * r * factor / (factor - 1);
}
function buildSchedule(principal: number, annualRatePct: number, months: number, startDate: Date, extra: number): {
  schedule: Row[];
  totalInterest: number;
  totalPayment: number;
  actualMonths: number;
} {
  const schedule: Row[] = [];
  let bal = principal;
  const baseEmi = computeEMI(principal, annualRatePct, months);
  const r = annualRatePct / 12 / 100;
  let totalInterest = 0;
  let totalPayment = 0;
  let i = 0;
  if (principal <= 0 || months <= 0) {
    return {
      schedule,
      totalInterest: 0,
      totalPayment: 0,
      actualMonths: 0
    };
  }
  while (bal > 0 && i < 1200) {
    const opening = bal;
    const interest = r * opening;
    const principalPay = baseEmi - interest;
    let extraPay = Math.max(0, extra);
    if (principalPay + extraPay > opening) {
      // Near the end, avoid overpayment
      extraPay = Math.max(0, opening - principalPay);
    }
    const payment = Math.max(0, principalPay + interest + extraPay);
    const closing = Math.max(0, opening + interest - (principalPay + extraPay));
    totalInterest += interest;
    totalPayment += payment;
    schedule.push({
      month: i + 1,
      date: yyyymm(addMonths(startDate, i)),
      opening,
      interest,
      principal: principalPay,
      extra: extraPay,
      payment,
      closing
    });
    bal = closing;
    i++;
    if (i > months * 2 && r === 0) break;
  }
  return {
    schedule,
    totalInterest,
    totalPayment,
    actualMonths: schedule.length
  };
}
function useQueryParams() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);
  const setParams = (params: Record<string, string | number | boolean>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([k, v]) => {
      url.searchParams.set(k, String(v));
    });
    window.history.replaceState({}, "", url.toString());
  };
  const get = (key: string, fallback?: string) => {
    if (!ready) return fallback;
    return new URLSearchParams(window.location.search).get(key) ?? fallback;
  };
  return {
    setParams,
    get,
    ready
  };
}
export default function EmiCalculatorClient() {
  const qp = useQueryParams();
  const [currency, setCurrency] = useState<Currency>(qp.get("c", "BDT") as Currency || "BDT");
  const [principal, setPrincipal] = useState<string>(qp.get("p", "500000") || "500000");
  const [rate, setRate] = useState<string>(qp.get("r", "9.5") || "9.5");
  const [termMode, setTermMode] = useState<TermMode>(qp.get("mode", "years") as TermMode || "years");
  const [term, setTerm] = useState<string>(qp.get("t", "3") || "3");
  const [extra, setExtra] = useState<string>(qp.get("x", "0") || "0");
  const [startDate, setStartDate] = useState<string>(qp.get("d", yyyymm(new Date())) || yyyymm(new Date()));

  // Keep URL in sync
  useEffect(() => {
    if (!qp.ready) return;
    qp.setParams({
      p: parseNum(principal),
      r: parseNum(rate),
      mode: termMode,
      t: parseNum(term),
      x: parseNum(extra),
      d: startDate,
      c: currency
    });
  }, [principal, rate, termMode, term, extra, startDate, currency, qp]);
  const months = useMemo(() => {
    const t = parseNum(term);
    return termMode === "years" ? t * 12 : t;
  }, [term, termMode]);
  const numericPrincipal = useMemo(() => Math.max(0, parseNum(principal)), [principal]);
  const numericRate = useMemo(() => Math.max(0, parseNum(rate)), [rate]);
  const numericExtra = useMemo(() => Math.max(0, parseNum(extra)), [extra]);
  const {
    schedule,
    totalInterest,
    totalPayment,
    actualMonths
  } = useMemo(() => buildSchedule(numericPrincipal, numericRate, months, new Date(startDate), numericExtra), [numericPrincipal, numericRate, months, startDate, numericExtra]);
  const baseEmi = useMemo(() => computeEMI(numericPrincipal, numericRate, months), [numericPrincipal, numericRate, months]);
  const payoffDate = useMemo(() => {
    if (!schedule.length) return "";
    return schedule[schedule.length - 1]?.date ?? "";
  }, [schedule]);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const csvRows = useMemo<(string | number)[][]>(() => {
    if (!schedule.length) return [];
    const head = ["Month", "Date", "Opening", "Interest", "Principal", "Extra", "Payment", "Closing"] as const;
    const lines = schedule.map(r => [r.month, r.date, r.opening, r.interest, r.principal, r.extra, r.payment, r.closing]);
    return [Array.from(head), ...lines];
  }, [schedule]);
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

 {/* Header */}
 <ToolPageHeader icon={Calculator} title="Loan / EMI Calculator" description="Monthly installment, total interest & amortization schedule." actions={<>
 <ResetButton onClick={() => {
          setCurrency("BDT");
          setPrincipal("500000");
          setRate("9.5");
          setTermMode("years");
          setTerm("3");
          setExtra("0");
          setStartDate(yyyymm(new Date()));
        }} />
 <CopyButton variant="default" label="Share" getText={() => shareUrl} disabled={!shareUrl} />
 </>} />

 {/* Settings */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Inputs</CardTitle>
 <CardDescription>
 Enter your loan details and optional extra payment.
 </CardDescription>
 </CardHeader>
 <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {/* Currency */}
 <SelectField label="Currency" value={currency} onValueChange={v => setCurrency(v as Currency)} options={[{
            value: "BDT",
            label: "BDT (৳)"
          }, {
            value: "USD",
            label: "USD ($)"
          }, {
            value: "INR",
            label: "INR (₹)"
          }]} />

 {/* Principal */}
 <InputField label="Loan Amount" id="principal" inputMode="decimal" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 500000" />

 {/* Rate */}
 <InputField label="Annual Interest Rate (%)" id="rate" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 9.5" />

 {/* Term */}
 <InputField label={`Term (${termMode === "years" ? "years" : "months"})`} id="term" inputMode="numeric" value={term} onChange={e => setTerm(e.target.value)} placeholder="e.g. 3" />

 {/* Term mode */}
 <div className="space-y-2">
 <Label className="text-sm font-medium">Term Mode</Label>
 <div className="flex items-center gap-3 rounded-md border px-3 py-2">
 <Badge variant={termMode === "years" ? "default" : "outline"} className="cursor-pointer" onClick={() => setTermMode("years")}>
 Years
 </Badge>
 <Badge variant={termMode === "months" ? "default" : "outline"} className="cursor-pointer" onClick={() => setTermMode("months")}>
 Months
 </Badge>
 </div>
 </div>

 {/* Start date */}
 <InputField label="Start Date" id="start" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} icon={CalendarIcon} />

 {/* Extra payment */}
 <div className="space-y-2 lg:col-span-3">
 <InputField label="Extra Monthly Payment (Optional)" id="extra" inputMode="decimal" value={extra} onChange={e => setExtra(e.target.value)} placeholder="e.g. 1000" />
 <div className="text-xs text-muted-foreground">
 Paying extra each month can reduce total interest and end date.
 </div>
 </div>
 </CardContent>
 </GlassCard>

 {/* Summary */}
 <GlassCard className="my-4">
 <CardHeader className="flex items-end justify-between">
 <div>
 <CardTitle className="text-base">Results</CardTitle>
 <CardDescription>Key numbers at a glance.</CardDescription>
 </div>

 <CopyButton size="sm" label="Copy EMI" getText={() => fmt(baseEmi, currency)} />
 </CardHeader>
 <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">
 EMI (without extra)
 </div>
 <div className="mt-1 flex items-center gap-2 text-xl font-semibold">
 {fmt(baseEmi, currency)}
 </div>
 <div className="mt-1 text-xs text-muted-foreground">
 Base monthly installment
 </div>
 </div>

 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">Total Interest</div>
 <div className="mt-1 text-xl font-semibold">
 {fmt(totalInterest, currency)}
 </div>
 <div className="mt-1 text-xs text-muted-foreground">
 Over the loan life
 </div>
 </div>

 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">Total Payment</div>
 <div className="mt-1 text-xl font-semibold">
 {fmt(totalPayment, currency)}
 </div>
 <div className="mt-1 text-xs text-muted-foreground">
 Principal + Interest
 </div>
 </div>

 <div className="rounded-xl border p-4">
 <div className="text-xs text-muted-foreground">Payoff Date</div>
 <div className="mt-1 text-xl font-semibold">
 {payoffDate || "—"}
 </div>
 <div className="mt-1 text-xs text-muted-foreground">
 {actualMonths ? `${fmtInt(actualMonths)} months` : ""}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 {/* Actions */}
 <div className="flex flex-wrap gap-2 mb-4">
 <ExportCSVButton variant="default" icon={Download} label="Download CSV" disabled={!csvRows.length} filename="emi-amortization.csv" getRows={() => csvRows} />
 <ActionButton icon={History} label="Print" onClick={() => {
          window.print();
        }} />
 </div>

 {/* Schedule */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Amortization Schedule</CardTitle>
 <CardDescription>
 Month-by-month breakdown including extra payments.
 </CardDescription>
 </CardHeader>
 <CardContent>
 {schedule.length === 0 ? <p className="text-sm text-muted-foreground">
 Enter loan details to see the schedule.
 </p> : <div className="overflow-auto rounded-md border">
 <table className="w-full min-w-180 border-collapse text-sm">
 <thead className="sticky top-0 bg-background/80 backdrop-blur">
 <tr className="[&>th]:border-b [&>th]:px-3 [&>th]:py-2 text-muted-foreground">
 <th className="text-left">#</th>
 <th className="text-left">Date</th>
 <th className="text-right">Opening</th>
 <th className="text-right">Interest</th>
 <th className="text-right">Principal</th>
 <th className="text-right">Extra</th>
 <th className="text-right">Payment</th>
 <th className="text-right">Closing</th>
 </tr>
 </thead>
 <tbody>
 {schedule.map(r => <tr key={r.month} className="[&>td]:border-b [&>td]:px-3 [&>td]:py-2">
 <td className="text-left">{r.month}</td>
 <td className="text-left">{r.date}</td>
 <td className="text-right">{fmt(r.opening, currency)}</td>
 <td className="text-right">
 {fmt(r.interest, currency)}
 </td>
 <td className="text-right">
 {fmt(r.principal, currency)}
 </td>
 <td className="text-right">{fmt(r.extra, currency)}</td>
 <td className="text-right">{fmt(r.payment, currency)}</td>
 <td className="text-right">{fmt(r.closing, currency)}</td>
 </tr>)}
 </tbody>
 </table>
 </div>}
 </CardContent>
 </GlassCard>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Loan Details",
        description: "Input your principal loan amount, annual interest rate, and loan tenure in months or years. Add optional processing fees for a more accurate estimate.",
        icon: Calculator
      }, {
        step: "02",
        title: "Get Instant EMI Breakdown",
        description: "See your monthly EMI, total interest payable, total payment amount, and an amortization schedule showing every payment over the loan term.",
        icon: PieChart
      }, {
        step: "03",
        title: "Export Your Schedule",
        description: "Download the full amortization table as CSV for your records, or copy the EMI amount directly for use in budget planning.",
        icon: BookOpen
      }]} badges={["100% free — no signup", "Instant calculation", "Export to CSV"]} />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides features={[{
        icon: Calculator,
        title: "Accurate EMI Formula",
        description: "Uses the standard EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1). Handles monthly compounding exactly as banks calculate it."
      }, {
        icon: PieChart,
        title: "Full Amortization Table",
        description: "See month-by-month breakdown of principal vs interest for every payment — so you know exactly how much of each EMI goes to the bank."
      }, {
        icon: TrendingDown,
        title: "Total Interest Cost",
        description: "Instantly see total interest payable over the loan life — a critical number that reveals the true cost of borrowing beyond just the monthly payment."
      }, {
        icon: DollarSign,
        title: "Multi-Currency Support",
        description: "Supports BDT (৳), USD ($), EUR (€), GBP (£), INR (₹), and more — with correct currency symbol display throughout the table."
      }, {
        icon: BarChart3,
        title: "Processing Fee Support",
        description: "Add one-time bank processing fees to see the effective loan amount and total cost including all charges — not just the stated interest rate."
      }, {
        icon: Shield,
        title: "Privacy-First Calculation",
        description: "All calculations run entirely in your browser. No loan details are sent to any server — your financial data stays completely private."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Understanding EMI — A Complete Borrower's Guide</h3>
 <p>
 An <strong>Equated Monthly Installment (EMI)</strong> is the fixed amount you pay to a lender every month
 until your loan is fully repaid. It combines a portion of the principal (the original loan amount) and
 the interest charged by the bank. Understanding how EMI is calculated helps you compare loan offers,
 negotiate better terms, and plan your finances more accurately.
 </p>

 <h4 className="font-semibold">The EMI Formula Explained</h4>
 <p>
 Banks use the <strong>reducing balance method</strong> to calculate EMI:
 </p>
 <div className="bg-muted/40 rounded-lg p-4 font-mono text-sm text-center">
 EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)
 </div>
 <p className="text-sm text-muted-foreground">
 Where: <strong>P</strong> = Principal loan amount | <strong>r</strong> = Monthly interest rate (annual rate ÷ 12 ÷ 100) | <strong>n</strong> = Number of monthly installments
 </p>

 <h4 className="font-semibold">Loan Type Comparison — EMI Rates at a Glance</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Loan Type</th>
 <th className="border p-2 text-left">Typical Rate</th>
 <th className="border p-2 text-left">Typical Tenure</th>
 <th className="border p-2 text-left">Notes</th>
 </tr>
 </thead>
 <tbody>
 {[["Home Loan", "8.5–10% p.a.", "10–30 years", "Lowest rates; property as collateral"], ["Car Loan", "9–12% p.a.", "1–7 years", "Vehicle as collateral; depreciating asset"], ["Personal Loan", "12–24% p.a.", "1–5 years", "Unsecured; higher rates, faster approval"], ["Education Loan", "8–14% p.a.", "5–15 years", "Moratorium during study period"], ["Business Loan", "14–22% p.a.", "1–5 years", "Varies by creditworthiness and collateral"]].map(([type, rate, tenure, notes]) => <tr key={type} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{type}</td>
 <td className="border p-2 text-primary font-mono text-xs">{rate}</td>
 <td className="border p-2 text-muted-foreground text-xs">{tenure}</td>
 <td className="border p-2 text-muted-foreground text-xs">{notes}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">How Tenure Affects Your EMI</h4>
 <p>
 Longer tenure means <strong>lower EMI</strong> but <strong>higher total interest paid</strong>.
 Shorter tenure means <strong>higher EMI</strong> but <strong>significantly less interest</strong>.
 For example, on a ৳10,00,000 loan at 10% p.a.:
 </p>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Tenure</th>
 <th className="border p-2 text-left">Monthly EMI</th>
 <th className="border p-2 text-left">Total Interest</th>
 <th className="border p-2 text-left">Total Payment</th>
 </tr>
 </thead>
 <tbody>
 {[["2 years", "৳ 46,145", "৳ 1,07,480", "৳ 11,07,480"], ["5 years", "৳ 21,247", "৳ 2,74,820", "৳ 12,74,820"], ["10 years", "৳ 13,215", "৳ 5,85,800", "৳ 15,85,800"], ["20 years", "৳ 9,650", "৳ 13,16,000", "৳ 23,16,000"]].map(([tenure, emi, interest, total]) => <tr key={tenure} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{tenure}</td>
 <td className="border p-2 text-primary font-mono text-xs">{emi}</td>
 <td className="border p-2 text-destructive font-mono text-xs">{interest}</td>
 <td className="border p-2 text-muted-foreground font-mono text-xs">{total}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Smart EMI Tips for Borrowers</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li><strong>Pre-pay when possible:</strong> Even one extra EMI per year can cut years off your loan tenure and save substantial interest.</li>
 <li><strong>Compare effective rates:</strong> Always ask for the APR (Annual Percentage Rate) including processing fees — the stated interest rate alone is misleading.</li>
 <li><strong>CIBIL score matters:</strong> A score above 750 can get you 0.5–2% lower interest rate, saving tens of thousands over a loan term.</li>
 <li><strong>EMI-to-income ratio:</strong> Keep total monthly EMIs below 40% of net income to maintain financial health and qualify for future loans.</li>
 <li><strong>Fixed vs floating rate:</strong> Fixed rates give predictability; floating rates may save money when benchmark rates fall.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion faqs={[{
        question: "What is EMI and how is it calculated?",
        answer: "EMI (Equated Monthly Installment) is a fixed monthly payment made to repay a loan. It is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal, r is the monthly interest rate, and n is the number of installments."
      }, {
        question: "Does a longer loan tenure reduce the EMI?",
        answer: "Yes. A longer tenure reduces the monthly EMI amount, but significantly increases the total interest paid over the life of the loan. A shorter tenure means higher EMI but far less total interest paid."
      }, {
        question: "What is a good EMI-to-income ratio?",
        answer: "Financial advisors generally recommend keeping all EMI obligations below 40% of your net monthly income. This ensures you have enough cash flow for living expenses and savings while servicing debt."
      }, {
        question: "How does a processing fee affect my loan?",
        answer: "A processing fee is a one-time charge deducted upfront from the loan disbursement. It increases your effective cost of borrowing. Always calculate the total payment including fees to compare loan offers accurately."
      }, {
        question: "Can I use this for home, car, and personal loans?",
        answer: "Yes. The EMI formula is the same for all loan types. Simply enter the principal amount, the annual interest rate quoted by your lender, and the tenure. The calculator works for home loans, car loans, personal loans, education loans, and business loans."
      }]} />
 <RelatedTools currentToolUrl="/tools/calc/emi" max={6} />
 </div></div>;
}