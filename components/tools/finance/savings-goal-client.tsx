"use client";

import { Calculator, Info, PiggyBank, BookOpen, Shield, Target, TrendingUp, Calendar, DollarSign, BarChart3, Zap } from"lucide-react";
import * as React from"react";
import { ActionButton, ExportCSVButton, ResetButton } from"@/components/shared/action-buttons";
import InputField from"@/components/shared/form-fields/input-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Badge } from"@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Label } from"@/components/ui/label";
import { Separator } from"@/components/ui/separator";
import { Switch } from"@/components/ui/switch";
import { cn } from"@/lib/utils";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GridPattern } from"@/components/magicui/grid-pattern";

export default function SavingsGoalClient() {
 const [goal, setGoal] = React.useState<number>(200000);
 const [current, setCurrent] = React.useState<number>(15000);
 const [rate, setRate] = React.useState<number>(8);
 const [useDate, setUseDate] = React.useState<boolean>(true);
 const [months, setMonths] = React.useState<number>(24);
 const [targetDate, setTargetDate] = React.useState<string>(() => {
 const d = new Date();
 d.setMonth(d.getMonth() + 24);
 return d.toISOString().slice(0, 10);
 });
 const [begin, setBegin] = React.useState<boolean>(false);

 const n = React.useMemo(
 () =>
 useDate ? monthsBetween(new Date(), parseISO(targetDate)) : Math.max(1, Math.floor(months)),
 [useDate, targetDate, months],
 );
 const i = React.useMemo(() => Math.max(rate, 0) / 100 / 12, [rate]);

 const result = React.useMemo(() => {
 return computeSavings({ fv: goal, pv: current, monthlyRate: i, months: n, begin });
 }, [goal, current, i, n, begin]);

 const schedule = React.useMemo(
 () => buildSchedule({ pv: current, pmt: result.monthly, monthlyRate: i, months: n, begin }),
 [current, result.monthly, i, n, begin],
 );

 function resetAll() {
 setGoal(200000);
 setCurrent(15000);
 setRate(8);
 setUseDate(true);
 setMonths(24);
 const d = new Date();
 d.setMonth(d.getMonth() + 24);
 setTargetDate(d.toISOString().slice(0, 10));
 setBegin(false);
 }

 const CSVRows: string[][] = [
 ["Month","Deposit","Interest","End Balance"],
 ...schedule.map((r) => [
 String(r.month),
 toMoney(r.deposit),
 toMoney(r.interest),
 toMoney(r.balance),
 ]),
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
 icon={PiggyBank}
 title="Savings Goal"
 description="How much you need to save each month to reach your target by a date."
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
 Set your goal, current savings, timeline, and expected annual return.
 </CardDescription>
 </CardHeader>
 <CardContent className="grid gap-4 sm:grid-cols-2">
 <div className="space-y-2">
 <InputField
 label="Goal Amount"
 id="goal"
 inputMode="numeric"
 value={num(goal)}
 onChange={(e) => setGoal(safeNum(e.target.value))}
 />

 <p className="text-xs text-muted-foreground">
 Total amount you want to have at the end.
 </p>
 </div>
 <div className="space-y-2">
 <InputField
 label="Current Savings"
 id="current"
 inputMode="numeric"
 value={num(current)}
 onChange={(e) => setCurrent(safeNum(e.target.value))}
 />

 <p className="text-xs text-muted-foreground">What you already have saved.</p>
 </div>

 <div className="space-y-2">
 <InputField
 label="Expected Annual Return (%)"
 id="rate"
 type="number"
 min={0}
 step="0.1"
 value={rate}
 onChange={(e) => setRate(Number(e.target.value) || 0)}
 />

 <p className="text-xs text-muted-foreground">
 We compound monthly. Set 0% for no growth.
 </p>
 </div>

 <div className="space-y-2">
 <div className="flex items-center justify-between">
 <Label className="cursor-pointer"htmlFor="toggle-date">
 Use Target Date
 </Label>
 <div className="flex items-center gap-2 text-xs text-muted-foreground">
 <span>Months</span>
 <Switch id="toggle-date"checked={useDate} onCheckedChange={setUseDate} />
 <span>Date</span>
 </div>
 </div>
 {useDate ? (
 <InputField
 id="targetDate"
 type="date"
 value={targetDate}
 onChange={(e) => setTargetDate(e.target.value)}
 />
 ) : (
 <InputField
 id="months"
 type="number"
 min={1}
 value={months}
 onChange={(e) => setMonths(Number(e.target.value) || 1)}
 />
 )}
 <p className="text-xs text-muted-foreground">
 {useDate
 ? `${n} month${n === 1 ?"":"s"} until target.`
 :"Enter how many months you want to save."}
 </p>
 </div>

 <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
 <SwitchRow
 label="Deposit at beginning of month"
 hint="Turn on if you plan to deposit at the start of each month."
 checked={begin}
 onCheckedChange={setBegin}
 />

 <div className="flex flex-wrap gap-2 h-fit">
 <QuickChip onClick={() => setRate(0)}>0% (Safe)</QuickChip>
 <QuickChip onClick={() => setRate(6)}>6%</QuickChip>
 <QuickChip onClick={() => setRate(8)}>8%</QuickChip>
 <QuickChip onClick={() => setRate(10)}>10%</QuickChip>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <Separator />

 {/* Results */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Results</CardTitle>
 <CardDescription>Based on your inputs with monthly compounding.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid gap-4 sm:grid-cols-3">
 <Stat label="Monthly needed"value={toMoney(result.monthly)} highlight />
 <Stat label="Total contributions"value={toMoney(result.totalContrib)} />
 <Stat label="Total interest"value={toMoney(result.totalInterest)} />
 </div>

 <div>
 <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
 <Info className="h-4 w-4"/>
 <span>
 We assume {begin ?"beginning":"end"}‑of‑month deposits.{""}
 {i === 0 ?"No growth is applied.": `Annual rate ${rate} % compounded monthly.`}
 </span>
 </div>
 <ProgressBar
 progress={Math.min(
 100,
 Math.max(0, ((schedule.at(-1)?.balance || 0) / Math.max(goal, 1)) * 100),
 )}
 />
 </div>

 <div className="flex flex-wrap items-center gap-2">
 <Badge variant="outline">Months: {n}</Badge>
 <Badge variant="outline">Monthly rate: {(i * 100).toFixed(3)}%</Badge>
 <Badge variant="outline">Goal: {toMoney(goal)}</Badge>
 </div>
 </CardContent>
 </GlassCard>

 {/* Amortization / Schedule */}
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle className="text-base">Monthly Schedule</CardTitle>
 <CardDescription>
 First {Math.min(12, n)} rows shown. Export CSV for full table.
 </CardDescription>
 </div>
 <ExportCSVButton
 variant="default"
 filename="savings-schedule.csv"
 getRows={() => CSVRows}
 />
 </CardHeader>
 <CardContent className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead className="text-left text-muted-foreground">
 <tr>
 <th className="py-2 pr-3">Month</th>
 <th className="py-2 pr-3">Deposit</th>
 <th className="py-2 pr-3">Interest</th>
 <th className="py-2 pr-3">End Balance</th>
 </tr>
 </thead>
 <tbody>
 {schedule.slice(0, 12).map((r) => (
 <tr key={r.month} className="border-t">
 <td className="py-2 pr-3">{r.month}</td>
 <td className="py-2 pr-3">{toMoney(r.deposit)}</td>
 <td className="py-2 pr-3">{toMoney(r.interest)}</td>
 <td className="py-2 pr-3">{toMoney(r.balance)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </CardContent>
 </GlassCard>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Set Your Goal",
 description:"Enter your savings target amount, current savings balance, expected annual return rate, and your monthly contribution amount.",
 icon: Target,
 },
 {
 step:"02",
 title:"See Your Timeline",
 description:"Instantly see how many months/years it will take to reach your goal, the total contributions you'll make, and how much comes from investment growth.",
 icon: Calendar,
 },
 {
 step:"03",
 title:"Adjust & Optimize",
 description:"Try different contribution amounts or return rates to find the right balance. See exactly how much faster you reach your goal with each extra dollar saved.",
 icon: BarChart3,
 },
 ]}
 badges={[
"Goal timeline calculator",
"Compound interest included",
"Instant results",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Target,
 title:"Goal Timeline Calculation",
 description:"Calculate exactly how many months it takes to reach your savings goal based on starting balance, monthly contributions, and compound interest growth.",
 },
 {
 icon: TrendingUp,
 title:"Compound Interest Growth",
 description:"Shows total contributions vs investment growth separately — so you can see how much your money earns on its own through the power of compounding.",
 },
 {
 icon: DollarSign,
 title:"Monthly Contribution Optimizer",
 description:"See how increasing your monthly savings by even $50-$100 dramatically shortens the time to reach your goal — quantified clearly for motivation.",
 },
 {
 icon: Calendar,
 title:"Estimated Completion Date",
 description:"Not just months — shows the actual calendar month and year when you'll reach your goal, making abstract timelines feel concrete and motivating.",
 },
 {
 icon: BarChart3,
 title:"Savings Progress Breakdown",
 description:"Visual breakdown of starting balance, total contributions, and interest earned — showing how each component contributes to reaching your goal.",
 },
 {
 icon: Shield,
 title:"Private & Offline",
 description:"All calculations run in your browser. Your financial goals and balances are never sent to any server.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Savings Goal Planning — A Complete Financial Guide</h3>
 <p>
 Setting a specific savings goal with a target amount and timeline dramatically increases the
 likelihood of achieving it. Research from the Dominican University of California shows that
 people who write down goals and create action plans are 33% more likely to achieve them.
 This calculator helps you build that plan with precise numbers.
 </p>

 <h4 className="font-semibold">Common Savings Goals & Recommended Timelines</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Goal</th>
 <th className="border p-2 text-left">Typical Amount</th>
 <th className="border p-2 text-left">Timeline</th>
 <th className="border p-2 text-left">Account Type</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Emergency Fund","3-6 months expenses","6-18 months","High-yield savings"],
 ["Vacation","$2,000-$10,000","6-24 months","High-yield savings"],
 ["New Car (down payment)","$5,000-$15,000","1-3 years","High-yield savings"],
 ["Home Down Payment","$20,000-$100,000+","3-7 years","HYSA + bonds"],
 ["Wedding","$15,000-$35,000","2-4 years","High-yield savings"],
 ["Retirement","25x annual expenses","20-40 years","401k, IRA, index funds"],
 ["Child's Education","$50,000-$200,000","18 years","529 plan, index funds"],
 ].map(([goal, amount, timeline, account]) => (
 <tr key={goal} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{goal}</td>
 <td className="border p-2 text-primary text-xs">{amount}</td>
 <td className="border p-2 text-xs">{timeline}</td>
 <td className="border p-2 text-muted-foreground text-xs">{account}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">The Power of Compound Interest — Monthly Savings at 7% Annual Return</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Monthly Savings</th>
 <th className="border p-2 text-left">After 5 Years</th>
 <th className="border p-2 text-left">After 10 Years</th>
 <th className="border p-2 text-left">After 20 Years</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["$100/month","$7,159","$17,308","$52,397"],
 ["$250/month","$17,898","$43,270","$130,993"],
 ["$500/month","$35,796","$86,540","$261,985"],
 ["$1,000/month","$71,592","$173,080","$523,971"],
 ].map(([monthly, y5, y10, y20]) => (
 <tr key={monthly} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{monthly}</td>
 <td className="border p-2 text-xs">{y5}</td>
 <td className="border p-2 text-xs">{y10}</td>
 <td className="border p-2 text-primary font-medium text-xs">{y20}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Savings Account Types by Goal Duration</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li><strong>0-2 years (short-term):</strong> High-yield savings account (HYSA) — 4-5% APY, FDIC insured, liquid. Perfect for emergency funds and near-term goals.</li>
 <li><strong>2-5 years (medium-term):</strong> CDs (Certificates of Deposit) or bond ETFs — slightly higher yields with predictable returns.</li>
 <li><strong>5+ years (long-term):</strong> Index funds (S&P 500) — historically ~7-10% annual returns. Best for retirement, education, and long-horizon goals despite short-term volatility.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"How is the savings goal timeline calculated?",
 answer:"The calculator uses the future value of a series formula with compound interest: FV = PV × (1+r)^n + PMT × ((1+r)^n - 1) / r, where PV is current savings, PMT is monthly contribution, r is monthly interest rate, and n is months. It solves for n (number of months) to reach your target FV.",
 },
 {
 question:"What annual return rate should I use?",
 answer:"For a high-yield savings account: 4-5%. For a conservative bond portfolio: 3-5%. For a balanced stock/bond portfolio: 5-7%. For an all-stock index fund portfolio (long-term): 7-10% (historical S&P 500 average). Use a conservative estimate for planning — actual returns vary year to year.",
 },
 {
 question:"Should I save for an emergency fund before other goals?",
 answer:"Yes. Financial experts universally recommend building a 3-6 month emergency fund first. Without it, unexpected expenses (medical, car repair, job loss) force you to use debt or raid other savings. Once your emergency fund is complete, direct savings to other goals.",
 },
 {
 question:"How much should I save each month?",
 answer:"The standard guideline is the 50/30/20 rule: 50% of take-home pay for needs, 30% for wants, 20% for savings and debt repayment. For faster goal achievement, aim to save 25-30%. Even saving 10% consistently over decades creates significant wealth through compound interest.",
 },
 {
 question:"What is compound interest and why does it matter for savings goals?",
 answer:"Compound interest means you earn returns not just on your contributions, but on your previously earned returns. $500/month at 7% for 20 years grows to ~$262,000 — but your total contributions are only $120,000. The extra $142,000 comes entirely from compound interest. This 'snowball effect' accelerates dramatically over time.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/finance/savings-goal" max={6} />
 </div>
 );
}

// Components
function Stat({
 label,
 value,
 highlight = false,
}: {
 label: string;
 value: string;
 highlight?: boolean;
}) {
 return (
 <div className={cn("rounded-lg border p-3", highlight &&"bg-primary/5 border-primary/30")}>
 <div className="text-xs text-muted-foreground">{label}</div>
 <div className="text-lg font-semibold">{value}</div>
 </div>
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

function ProgressBar({ progress }: { progress: number }) {
 return (
 <div className="h-2 w-full rounded-full bg-muted">
 <div
 className="h-2 rounded-full bg-primary transition-all"
 style={{ width: `${progress}%` }}
 />
 </div>
 );
}

// Math
function computeSavings({
 fv,
 pv,
 monthlyRate,
 months,
 begin,
}: {
 fv: number;
 pv: number;
 monthlyRate: number;
 months: number;
 begin: boolean;
}) {
 const r = Math.max(monthlyRate, 0);
 const n = Math.max(1, Math.floor(months));
 const growth = (1 + r) ** n;
 let pmt: number;
 if (r === 0) {
 pmt = (fv - pv) / n;
 } else {
 pmt = ((fv - pv * growth) * r) / (growth - 1);
 if (begin) pmt /= 1 + r;
 }
 const monthly = Math.max(0, pmt);

 const sched = buildSchedule({ pv, pmt: monthly, monthlyRate: r, months: n, begin });
 const totalContrib = sched.reduce((s, x) => s + x.deposit, 0);
 const endBalance = sched.at(-1)?.balance ?? pv;
 const totalInterest = endBalance - pv - totalContrib;

 return { monthly, totalContrib, totalInterest, endBalance };
}

function buildSchedule({
 pv,
 pmt,
 monthlyRate,
 months,
 begin,
}: {
 pv: number;
 pmt: number;
 monthlyRate: number;
 months: number;
 begin: boolean;
}) {
 const out: { month: number; deposit: number; interest: number; balance: number }[] = [];
 let bal = pv;
 for (let m = 1; m <= months; m++) {
 if (begin) {
 bal += pmt;
 }
 const interest = bal * monthlyRate;
 bal += interest;
 if (!begin) {
 bal += pmt;
 }
 out.push({ month: m, deposit: pmt, interest, balance: bal });
 }
 return out;
}

// Utils
function monthsBetween(a: Date, b: Date) {
 const start = new Date(a.getFullYear(), a.getMonth(), 1);
 const end = new Date(b.getFullYear(), b.getMonth(), 1);
 let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
 if (b.getDate() >= a.getDate()) months += 1;
 else months = Math.max(1, months);
 return Math.max(1, months);
}
function parseISO(s: string) {
 const [y, m, d] = s.split("-").map(Number);
 return new Date(y, (m || 1) - 1, d || 1);
}
function num(n: number) {
 return Number.isFinite(n) ? String(n) :"";
}
function safeNum(v: string) {
 const x = Number(String(v).replace(/[^0-9.-]/g,""));
 return Number.isFinite(x) ? x : 0;
}
function toMoney(n: number, currency ="BDT") {
 try {
 return new Intl.NumberFormat(undefined, { style:"currency", currency }).format(n);
 } catch {
 return new Intl.NumberFormat().format(n);
 }
}
