"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Label } from"@/components/ui/label";
import { Input } from"@/components/ui/input";
import { ResetButton } from"@/components/shared/action-buttons";
import { Switch } from"@/components/ui/switch";
import { Landmark, TrendingUp, Calendar, DollarSign, BookOpen, Shield, Target, PiggyBank, BarChart3 } from"lucide-react";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GridPattern } from"@/components/magicui/grid-pattern";

export function RetirementClient() {
 const [currentAge, setCurrentAge] = useState(30);
 const [retirementAge, setRetirementAge] = useState(65);
 const [currentSavings, setCurrentSavings] = useState(50000);
 const [monthlyContribution, setMonthlyContribution] = useState(500);
 const [annualReturn, setAnnualReturn] = useState(7);
 const [inflationAdjusted, setInflationAdjusted] = useState(false);
 const inflationRate = 2.5;

 const yearsToRetire = Math.max(0, retirementAge - currentAge);
 const effectiveReturnRate = inflationAdjusted ? ((1 + annualReturn / 100) / (1 + inflationRate / 100) - 1) : annualReturn / 100;
 const monthlyRate = effectiveReturnRate / 12;
 const totalMonths = yearsToRetire * 12;

 let futureValue = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
 let futureContributions = 0;
 if (monthlyRate > 0) {
 futureContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
 } else {
 futureContributions = monthlyContribution * totalMonths;
 }
 
 const totalAtRetirement = futureValue + futureContributions;
 const totalContributed = currentSavings + (monthlyContribution * totalMonths);
 const totalInterest = totalAtRetirement - totalContributed;
 
 const monthlyIncome = (totalAtRetirement * 0.04) / 12;

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

 <ToolPageHeader
 icon={Landmark}
 title="Retirement Calculator"
 description="Calculate retirement savings projections and monthly income based on the 4% rule."
 actions={
 <ResetButton onClick={() => {
 setCurrentAge(30);
 setRetirementAge(65);
 setCurrentSavings(50000);
 setMonthlyContribution(500);
 setAnnualReturn(7);
 setInflationAdjusted(false);
 }} label="Reset"/>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
 <div className="md:col-span-4 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Inputs</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Current Age</Label>
 <Input type="number"value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Retirement Age</Label>
 <Input type="number"value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Current Savings ($)</Label>
 <Input type="number"value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Monthly Contribution ($)</Label>
 <Input type="number"value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Expected Annual Return (%)</Label>
 <Input type="number"value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} />
 </div>
 <div className="flex items-center space-x-2 pt-2">
 <Switch checked={inflationAdjusted} onCheckedChange={setInflationAdjusted} id="inflation-switch"/>
 <Label htmlFor="inflation-switch">Adjust for Inflation (2.5%)</Label>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="md:col-span-8 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Projections</CardTitle>
 <CardDescription>Estimated totals at age {retirementAge}</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
 <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
 <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-1">
 <TrendingUp className="w-4 h-4"/> Total at Retirement
 </div>
 <div className="text-3xl font-bold text-primary">${totalAtRetirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
 </div>
 <div className="bg-primary/5 p-4 rounded-xl border border-border">
 <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-1">
 <Calendar className="w-4 h-4"/> Monthly Income (4% Rule)
 </div>
 <div className="text-3xl font-bold">${monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
 </div>
 </div>

 <div className="space-y-4">
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">Total Contributions</span>
 <span className="font-medium">${totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
 </div>
 <Separator />
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">Total Interest Earned</span>
 <span className="font-medium text-green-600">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Enter Your Details",
 description:"Input your current age, planned retirement age, current savings, monthly contribution, and expected annual return rate. Add expected Social Security or pension income if applicable.",
 icon: Target,
 },
 {
 step:"02",
 title:"See Your Retirement Projection",
 description:"Instantly see your projected retirement savings at retirement age, estimated monthly income in retirement, and whether you're on track to fund your desired retirement lifestyle.",
 icon: BarChart3,
 },
 {
 step:"03",
 title:"Adjust & Optimize",
 description:"Change your contribution amount, retirement age, or return rate to find the ideal savings strategy. See the exact impact of retiring 2 years later or saving $200 more per month.",
 icon: TrendingUp,
 },
 ]}
 badges={[
"Retirement projection",
"Compound growth",
"Free & private",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: BarChart3,
 title:"Retirement Savings Projection",
 description:"Projects your retirement nest egg using compound growth on both existing savings and ongoing monthly contributions, adjusted for your expected annual return rate.",
 },
 {
 icon: DollarSign,
 title:"Monthly Income Estimate",
 description:"Converts your projected savings into a sustainable monthly withdrawal amount using the 4% safe withdrawal rule — the gold standard in retirement planning.",
 },
 {
 icon: TrendingUp,
 title:"On-Track Indicator",
 description:"Compares your projected savings against your retirement income target, showing clearly whether you're on track, ahead, or need to adjust your savings strategy.",
 },
 {
 icon: Calendar,
 title:"Years to Retirement",
 description:"Calculates your exact number of working years remaining and shows a year-by-year savings growth projection so you can track progress at any life stage.",
 },
 {
 icon: Landmark,
 title:"Social Security Integration",
 description:"Add expected Social Security or pension income to get a complete picture of retirement income — not just from savings but from all sources combined.",
 },
 {
 icon: Shield,
 title:"Private & Offline",
 description:"All retirement projections run in your browser. Your age, savings, and financial goals are never transmitted to any server or financial institution.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Retirement Planning Guide — How Much Do You Need?</h3>
 <p>
 Retirement planning answers one fundamental question: <strong>how much money do I need saved
 to never run out of money in retirement?</strong> The answer depends on your desired lifestyle,
 expected lifespan, investment returns, inflation, and other income sources. This guide covers
 the core frameworks used by financial planners worldwide.
 </p>

 <h4 className="font-semibold">The 4% Rule — Foundation of Retirement Planning</h4>
 <p>
 The <strong>4% Rule</strong> (from the 1994 Trinity Study) states that you can withdraw 4% of
 your retirement portfolio annually and it will last 30+ years with high probability. This means:
 </p>
 <div className="bg-muted/40 rounded-lg p-4 font-mono text-sm text-center">
 Retirement Nest Egg = Annual Expenses × 25
 </div>
 <p className="text-xs text-muted-foreground text-center">Example: $60,000/year expenses × 25 = $1,500,000 target savings</p>

 <h4 className="font-semibold">Retirement Savings Benchmarks by Age</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Age</th>
 <th className="border p-2 text-left">Fidelity Benchmark</th>
 <th className="border p-2 text-left">Target (1x salary = $60K)</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["30","1× salary","$60,000"],
 ["35","2× salary","$120,000"],
 ["40","3× salary","$180,000"],
 ["45","4× salary","$240,000"],
 ["50","6× salary","$360,000"],
 ["55","7× salary","$420,000"],
 ["60","8× salary","$480,000"],
 ["67","10× salary","$600,000"],
 ].map(([age, bench, target]) => (
 <tr key={age} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{age}</td>
 <td className="border p-2 text-primary text-xs">{bench}</td>
 <td className="border p-2 text-xs">{target}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Retirement Account Types Comparison</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Account</th>
 <th className="border p-2 text-left">2024 Limit</th>
 <th className="border p-2 text-left">Tax Treatment</th>
 <th className="border p-2 text-left">Best For</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["401(k) Traditional","$23,000 (+$7,500 catch-up)","Pre-tax contributions","Reducing current tax burden"],
 ["Roth 401(k)","$23,000 combined","After-tax; tax-free withdrawals","Expecting higher taxes in retirement"],
 ["Traditional IRA","$7,000 (+$1,000 catch-up)","May be pre-tax","No workplace plan access"],
 ["Roth IRA","$7,000 (+$1,000 catch-up)","After-tax; tax-free growth","Under income limits"],
 ["SEP-IRA","Up to $69,000","Pre-tax","Self-employed / freelancers"],
 ].map(([acct, limit, tax, best]) => (
 <tr key={acct} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{acct}</td>
 <td className="border p-2 text-xs">{limit}</td>
 <td className="border p-2 text-xs">{tax}</td>
 <td className="border p-2 text-muted-foreground text-xs">{best}</td>
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
 question:"How much do I need to retire comfortably?",
 answer:"The standard guideline is 25× your annual expenses (the 4% rule). For $50,000/year in retirement, you need $1,250,000. For $80,000/year, you need $2,000,000. This assumes a 30-year retirement, a diversified portfolio, and 4% annual withdrawals. Some planners recommend 3.3% for longer retirements.",
 },
 {
 question:"What is the 4% rule in retirement planning?",
 answer:"The 4% rule (from the 1994 Trinity Study) states that retirees can withdraw 4% of their portfolio in the first year of retirement, then adjust for inflation annually, with very low probability of running out of money over a 30-year period. It's based on historical US stock and bond market returns.",
 },
 {
 question:"What annual return rate should I use for retirement projections?",
 answer:"Conservative: 4-5% (balanced portfolio, bonds). Moderate: 6-7% (60/40 stocks/bonds). Aggressive: 8-10% (all-stock index funds, long horizon). The historical S&P 500 average is ~10% nominal, ~7% real (inflation-adjusted). Use 6-7% for planning to be conservative.",
 },
 {
 question:"How does delaying retirement affect my savings?",
 answer:"Every extra year of work has triple benefits: more contributions, more compound growth time, and fewer withdrawal years. Delaying retirement from 62 to 67 often increases sustainable income by 40-60%. It also delays Social Security, which increases your monthly benefit by 8% per year between 62-70.",
 },
 {
 question:"Should I use a Traditional or Roth retirement account?",
 answer:"Traditional (pre-tax): better if you're in a high tax bracket now and expect lower taxes in retirement. Roth (after-tax): better if you're young, in a lower bracket now, or expect higher taxes later. Many advisors recommend diversifying across both types for tax flexibility in retirement.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/finance/retirement" max={6} />
 </div>
 );
}
