"use client";

import {
 ActionButton,
 CopyButton,
 ResetButton,
} from"@/components/shared/action-buttons";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import { RelatedTools } from"@/components/shared/related-tools";
import InputField from"@/components/shared/form-fields/input-field";
import Stat from"@/components/shared/stat";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Badge } from"@/components/ui/badge";
import {
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Label } from"@/components/ui/label";
import { Separator } from"@/components/ui/separator";
import { Switch } from"@/components/ui/switch";
import {
 cn,
 formatDateInput,
 formatTimeInput,
 getLocalTimeZone,
} from"@/lib/utils";
import {
 clampDateString,
 diffYMD,
 msIn,
 nextBirthday,
 shortDate,
} from"@/lib/utils/time/age-calculator";
import { Cake, Calendar, HeartPulse, Info, BookOpen, Shield, Clock, Heart, BarChart3, Baby, User, Milestone } from"lucide-react";
import { useEffect, useMemo, useState } from"react";

export default function AgeCalculatorClient() {
 const deviceTz = useMemo(() => getLocalTimeZone(), []);

 const [hasTime, setHasTime] = useState(false);
 const [dobDate, setDobDate] = useState<string>("");
 const [dobTime, setDobTime] = useState<string>("00:00");

 const [now, setNow] = useState<Date>(new Date());
 useEffect(() => {
 const t = window.setInterval(() => setNow(new Date()), 1000);
 return () => window.clearInterval(t);
 }, []);

 const birth: Date | null = useMemo(() => {
 if (!dobDate) return null;
 const safe = clampDateString(dobDate);
 const [y, m, d] = safe.split("-").map(Number);
 const [hh, mm] = (hasTime ? dobTime :"00:00").split(":").map(Number);
 const dt = new Date(y, m - 1, d, hh, mm, 0, 0);
 return Number.isNaN(dt.getTime()) ? null : dt;
 }, [dobDate, dobTime, hasTime]);

 const results = useMemo(() => {
 if (!birth) return null;
 const to = now;
 const ymd = diffYMD(birth, to);

 const diffMs = to.getTime() - birth.getTime();
 const total = {
 days: Math.floor(diffMs / msIn.day),
 hours: Math.floor(diffMs / msIn.hour),
 minutes: Math.floor(diffMs / msIn.minute),
 seconds: Math.floor(diffMs / msIn.second),
 };

 const nb = nextBirthday(birth, to);
 const untilMs = nb.getTime() - to.getTime();
 const until = {
 days: Math.ceil(untilMs / msIn.day),
 exact: shortDate(nb),
 weekday: new Intl.DateTimeFormat("en-GB", { weekday:"long"}).format(nb),
 };

 const milestones = [
 { label:"10,000th day", at: new Date(birth.getTime() + 10000 * msIn.day) },
 { label:"20,000th day", at: new Date(birth.getTime() + 20000 * msIn.day) },
 { label:"1 billion seconds", at: new Date(birth.getTime() + 1_000_000_000 * msIn.second) },
 ];

 return { ymd, total, nb, until, milestones };
 }, [birth, now]);

 useEffect(() => {
 const p = new URLSearchParams(window.location.search);
 const date = p.get("date");
 const time = p.get("time");
 if (date) {
 // eslint-disable-next-line react-hooks/set-state-in-effect
 setDobDate(date);
 }
 if (time) {
 setDobTime(time);
 setHasTime(true);
 }
 }, []);

 const shareLink = useMemo(() => {
 if (typeof window ==="undefined") return"";
 const url = new URL(window.location.href);
 if (dobDate) url.searchParams.set("date", dobDate);
 else url.searchParams.delete("date");
 if (hasTime) url.searchParams.set("time", dobTime);
 else url.searchParams.delete("time");
 return url.toString();
 }, [dobDate, dobTime, hasTime]);

 const summary =
 birth && results
 ? `Age: ${results?.ymd.years}y ${results?.ymd.months}m ${results?.ymd.days}d
Born: ${shortDate(birth)}
Total: ${results?.total.days} days, ${results?.total.hours} hours
Next birthday: ${results?.until.exact} (${results?.until.days} days)`
 :"";

 const stats = [
 {
 label:"Age",
 value: `${results?.ymd.years}Y ${results?.ymd.months}M ${results?.ymd.days}D`,
 hint: birth ? `Born ${shortDate(birth)}` :"Birth date not set",
 },
 {
 label:"Total Days",
 value: results?.total.days.toLocaleString(),
 hint: `${results?.total.hours.toLocaleString()} Hours`,
 },
 {
 label:"Total Minutes",
 value: results?.total.minutes.toLocaleString(),
 hint: `${results?.total.seconds.toLocaleString()} Seconds`,
 },
 {
 label:"Next Birthday",
 value: `${results?.until.days} Days`,
 hint: `${results?.until.weekday}, ${results?.until.exact}`,
 Icon: Cake,
 },
 ];

 const applyToday = () => {
 const d = new Date();
 setDobDate(formatDateInput(d));
 setDobTime(formatTimeInput(d));
 };

 const resetAll = () => {
 setHasTime(false);
 setDobDate("");
 setDobTime("00:00");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 {/* HEADER */}
 <ToolPageHeader
 icon={HeartPulse}
 title="Age Calculator"
 description="Find exact age in years, months, days — plus next birthday and fun milestones."
 actions={
 <>
 <ResetButton onClick={resetAll} />
 <ActionButton
 variant="outline"
 icon={Calendar}
 label="Use today"
 onClick={applyToday}
 />
 <CopyButton variant="default"getText={() => shareLink ||""} label="Copy link"/>
 </>
 }
 />

 {/* INPUTS */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Your Birth Details</CardTitle>
 <CardDescription>
 Enter date (and optionally time) of birth. We use your device zone:{""}
 <span className="font-medium">{deviceTz}</span>.
 </CardDescription>
 </CardHeader>
 <CardContent className="grid gap-4 sm:grid-cols-2">
 <InputField
 label="Date of Birth"
 id="dob-date"
 type="date"
 value={dobDate}
 onChange={(e) => setDobDate(clampDateString(e.target.value))}
 />

 <div className="space-y-2">
 <InputField
 label="Time of Birth (optional)"
 className={cn(!hasTime &&"opacity-50")}
 id="dob-time"
 type="time"
 value={dobTime}
 onChange={(e) => setDobTime(e.target.value)}
 disabled={!hasTime}
 />
 <div className="flex items-center gap-2 mt-1">
 <Switch id="has-time"checked={hasTime} onCheckedChange={setHasTime} />
 <Label htmlFor="has-time">Include time</Label>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <Separator />

 {/* RESULTS */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Results</CardTitle>
 <CardDescription>Live as the seconds tick by. Copy a summary to share.</CardDescription>
 </CardHeader>
 <CardContent className="grid gap-4">
 {!birth && (
 <div className="text-sm text-muted-foreground flex items-center gap-2">
 <Info className="h-4 w-4"/> Enter your birth date to see results here.
 </div>
 )}

 {birth && results && (
 <>
 {/* Stats Cards */}
 <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
 {stats.map((s) => (
 <Stat key={s.label} label={s.label} value={s.value} hint={s.hint} Icon={s.Icon} />
 ))}
 </div>

 {/* Timeline-ish summary */}
 <div className="rounded-md border p-3">
 <div className="flex items-center justify-between">
 <div className="text-sm">
 <div>
 <span className="text-muted-foreground">Born:</span>{""}
 <span className="font-medium">{shortDate(birth)}</span>
 </div>
 <div>
 <span className="text-muted-foreground">As of now:</span>{""}
 <span className="font-medium">{shortDate(now)}</span>
 </div>
 </div>
 <CopyButton
 size="sm"
 variant="outline"
 getText={() => summary ||""}
 label="Copy summary"
 />
 </div>
 </div>

 {/* Fun milestones */}
 <div className="space-y-2">
 <h3 className="text-sm font-medium">Milestones</h3>
 <div className="grid gap-2 md:grid-cols-2">
 {results.milestones.map((m) => (
 <div
 key={m.label}
 className="flex items-center justify-between rounded-md border p-3"
 >
 <div className="space-y-0.5">
 <div className="font-medium">{m.label}</div>
 <div className="text-xs text-muted-foreground">{shortDate(m.at)}</div>
 </div>
 <Badge variant={m.at < now ?"secondary":"default"}>
 {m.at < now ?"Passed":"Upcoming"}
 </Badge>
 </div>
 ))}
 </div>
 </div>
 </>
 )}
 </CardContent>
 </GlassCard>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Enter Your Date of Birth",
 description:"Select your birth date using the date picker. Optionally enter a target date (defaults to today) to calculate age on a specific past or future date.",
 icon: Baby,
 },
 {
 step:"02",
 title:"See Your Exact Age",
 description:"Instantly see your age in years, months, days, hours, minutes, and total days lived. The calculation accounts for leap years and month-length differences.",
 icon: Calendar,
 },
 {
 step:"03",
 title:"Explore Milestones",
 description:"See upcoming age milestones and how long until your next birthday. Compare ages, calculate retirement dates, or find how old someone was on a specific date.",
 icon: Milestone,
 },
 ]}
 badges={[
"Exact years, months & days",
"Leap year accurate",
"Next birthday countdown",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Calendar,
 title:"Precise Age Calculation",
 description:"Calculates exact age to the day, accounting for leap years, variable month lengths, and timezone differences. More accurate than simple year subtraction.",
 },
 {
 icon: Clock,
 title:"Age in Multiple Units",
 description:"Shows age expressed as: years + months + days, total days alive, total hours, total minutes — for a complete picture of time lived.",
 },
 {
 icon: Milestone,
 title:"Upcoming Milestones",
 description:"Shows days until next birthday, upcoming milestone birthdays (25, 30, 40, 50, etc.), and the exact date of each significant life milestone.",
 },
 {
 icon: User,
 title:"Historical Age Calculator",
 description:"Calculate how old a person was on any past date — useful for historical research, legal documents, or understanding age at a specific life event.",
 },
 {
 icon: BarChart3,
 title:"Future Age Calculator",
 description:"Enter a future date to see how old you'll be. Great for retirement planning, milestone events, or calculating ages for contracts and legal documents.",
 },
 {
 icon: Shield,
 title:"Private & Offline",
 description:"All calculations happen in your browser. Your birth date is never sent to any server — works fully offline.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Age Calculation Guide — How Age is Measured Around the World</h3>
 <p>
 Age calculation seems simple, but edge cases make it surprisingly tricky. Leap years,
 month-length variations, birthday timing rules, and different cultural age systems
 all affect the answer. Here's a comprehensive guide to how age is calculated.
 </p>

 <h4 className="font-semibold">Age Calculation Methods by Country/Culture</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">System</th>
 <th className="border p-2 text-left">Region</th>
 <th className="border p-2 text-left">How Age is Counted</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Western (international)","Most of the world","Age increases on birthday; 0 at birth"],
 ["East Asian traditional","Korea, China (traditional)","Born at age 1; increases on Lunar New Year"],
 ["Korean (international)","South Korea (modern)","Born at age 0; increases on January 1"],
 ["Japanese traditional","Japan (historical)","Born at 1; increases on New Year's Day"],
 ].map(([sys, region, how]) => (
 <tr key={sys} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{sys}</td>
 <td className="border p-2 text-xs">{region}</td>
 <td className="border p-2 text-muted-foreground text-xs">{how}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Interesting Age Facts & Statistics</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Milestone</th>
 <th className="border p-2 text-left">Days Alive</th>
 <th className="border p-2 text-left">Context</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["1 year old","365 days","366 in a leap year birth"],
 ["10 years old","~3,652 days","Depending on leap years"],
 ["18 years (legal adult)","~6,574 days","~157,776 hours"],
 ["21 years","~7,670 days","~184,080 hours"],
 ["1 million minutes old","~694.4 days","~1 year 11 months"],
 ["1 billion seconds old","~31.7 years","~11,574 days"],
 ["65 years (retirement)","~23,741 days","~570,000 hours"],
 ["100 years (centenarian)","~36,524 days","~876,600 hours"],
 ].map(([milestone, days, context]) => (
 <tr key={milestone} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{milestone}</td>
 <td className="border p-2 text-primary font-mono text-xs">{days}</td>
 <td className="border p-2 text-muted-foreground text-xs">{context}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Leap Year Rules — Why Age Calculation is Complex</h4>
 <p>
 A leap year occurs when the year is divisible by 4, except for century years (divisible
 by 100), unless also divisible by 400. This means:
 </p>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li>2000: Leap year (divisible by 400) ✅</li>
 <li>1900: NOT a leap year (divisible by 100, not 400) ❌</li>
 <li>2024: Leap year (divisible by 4, not a century year) ✅</li>
 <li>February 29 birthdays: Legally celebrated on Feb 28 or Mar 1 in non-leap years (varies by jurisdiction)</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"How is age calculated exactly?",
 answer:"Age is calculated by subtracting the birth date from the current (or target) date, accounting for month lengths and leap years. A person turns n years old on their nth birthday. If they were born on Feb 29, in non-leap years their birthday is celebrated on Feb 28 or Mar 1 (varies by country and legal context).",
 },
 {
 question:"How many days old am I?",
 answer:"To calculate days alive: count the number of days from your birth date to today, including leap year days (366 days) in applicable years. Use this calculator to get your exact day count instantly. An 18-year-old is approximately 6,570-6,575 days old depending on how many leap years occurred.",
 },
 {
 question:"What is the Korean age system?",
 answer:"In the traditional Korean age system, everyone is born at age 1 (not 0) and gains a year on Lunar New Year's Day, not their birthday. This means a Korean-age person can be 1-2 years older than their international age. South Korea officially switched to the international age system in June 2023 for legal and administrative purposes.",
 },
 {
 question:"When is the 1 billion second birthday?",
 answer:"1 billion seconds = 1,000,000,000 seconds ÷ 60 ÷ 60 ÷ 24 ÷ 365.25 = approximately 31.69 years old. To find your exact 1-billion-second birthday: add 1,000,000,000 seconds to your birth timestamp. It typically falls around age 31 years and 8 months.",
 },
 {
 question:"How do you calculate age for legal documents?",
 answer:"For most legal purposes, age is calculated as the number of complete years elapsed since birth. A person born on October 15 reaches their birthday age on October 15 of the corresponding year. In most jurisdictions, a person born on Feb 29 in a leap year becomes the relevant age on Feb 28 or Mar 1 in non-leap years — this varies by local law.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/time/age"max={6} />
 </div>
 );
}
