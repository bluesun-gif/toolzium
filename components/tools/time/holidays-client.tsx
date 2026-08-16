"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calendar, CalendarRange, Copy, Globe, ListChecks, Star } from"lucide-react";
import { cn } from"@/lib/utils";

const MOCK_HOLIDAYS = [
 { name:"New Year's Day", date:"2024-01-01", type:"National", country:"US"},
 { name:"Independence Day", date:"2024-07-04", type:"National", country:"US"},
 { name:"Thanksgiving", date:"2024-11-28", type:"National", country:"US"},
 { name:"Christmas Day", date:"2024-12-25", type:"Religious", country:"US"},
 { name:"Boxing Day", date:"2024-12-26", type:"National", country:"UK"},
 { name:"Canada Day", date:"2024-07-01", type:"National", country:"Canada"},
 { name:"Diwali", date:"2024-10-31", type:"Religious", country:"India"},
 { name:"Australia Day", date:"2024-01-26", type:"National", country:"Australia"},
 { name:"Bastille Day", date:"2024-07-14", type:"National", country:"France"},
 { name:"German Unity Day", date:"2024-10-03", type:"National", country:"Germany"},
];

const COUNTRIES = ["US","UK","Canada","India","Australia","Germany","France","Japan","Brazil","South Africa"];
const MONTHS = ["All","January","February","March","April","May","June","July","August","September","October","November","December"];

export function HolidaysClient() {
 const [country, setCountry] = useState("US");
 const [year, setYear] = useState("2024");
 const [month, setMonth] = useState("All");
 const [favorites, setFavorites] = useState<string[]>([]);

 const filteredHolidays = useMemo(() => {
 return MOCK_HOLIDAYS.filter(h => {
 const hDate = new Date(h.date);
 const isCountryMatch = h.country === country;
 const isYearMatch = h.date.startsWith(year);
 const isMonthMatch = month ==="All"|| hDate.toLocaleString('default', { month: 'long' }) === month;
 return isCountryMatch && isYearMatch && isMonthMatch;
 }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
 }, [country, year, month]);

 const toggleFavorite = (name: string) => {
 setFavorites(prev => 
 prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
 );
 };

 const getHolidaysText = () => {
 return filteredHolidays.map(h => `${h.date}: ${h.name} (${h.type})`).join("\n");
 };

 const resetFilters = () => {
 setCountry("US");
 setYear("2024");
 setMonth("All");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Calendar}
 title="Holiday Calendar"
 description="View public holidays across the world, filter by month, and track upcoming days off."
 actions={
 <>
 <CopyButton getText={getHolidaysText} label="Copy List"/>
 <ResetButton onClick={resetFilters} label="Reset"/>
 </>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5"/> Region & Time</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>Country</Label>
 <Select value={country} onValueChange={setCountry}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Year</Label>
 <Select value={year} onValueChange={setYear}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {["2023","2024","2025"].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Month</Label>
 <Select value={month} onValueChange={setMonth}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Holidays in {country} ({year})</CardTitle>
 <CardDescription>{filteredHolidays.length} holidays found.</CardDescription>
 </CardHeader>
 <CardContent>
 {filteredHolidays.length === 0 ? (
 <div className="text-center py-12 text-muted-foreground">
 No holidays found for this selection.
 </div>
 ) : (
 <div className="space-y-3">
 {filteredHolidays.map((holiday, idx) => {
 const date = new Date(holiday.date);
 const isFav = favorites.includes(holiday.name);
 return (
 <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
 <div className="flex flex-col">
 <span className="font-semibold text-lg">{holiday.name}</span>
 <span className="text-sm text-muted-foreground">
 {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
 </span>
 </div>
 <div className="flex items-center gap-4">
 <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
 {holiday.type}
 </span>
 <Button variant="ghost"size="icon"onClick={() => toggleFavorite(holiday.name)}>
 <Star className={cn("w-5 h-5", isFav ?"fill-yellow-400 text-yellow-400":"text-muted-foreground")} />
 </Button>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Pick Year",
    description:"Choose a year.",
    icon: CalendarRange,
  },
{
    step:"02",
    title:"Select Region",
    description:"Choose a country.",
    icon: Globe,
  },
{
    step:"03",
    title:"View",
    description:"See the holiday list.",
    icon: ListChecks,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: CalendarRange,
    title:"Year",
    description:"Any year.",
  },
{
    icon: Globe,
    title:"Regions",
    description:"Country-specific.",
  },
{
    icon: ListChecks,
    title:"List",
    description:"All holidays.",
  },
{
    icon: Star,
    title:"Plan",
    description:"Around time off.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A holiday calendar lists public holidays for a chosen year and region, essential for planning time off and business schedules. Different countries observe different days; selecting the region keeps it relevant. This tool shows the full list.</p>
  <p>Knowing holidays ahead avoids scheduling conflicts. The calendar supports both personal and operational planning.</p>
  <p>Use it when arranging leave or operations. The tool's value is a clear, region-aware holiday list.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Which countries?",
    answer:"Major regions covered.",
  },
{
    question:"Accurate?",
    answer:"Standard public holidays.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  },
{
    question:"Use case?",
    answer:"Planning time off.",
  }
  ]}
/>
</div>
 );
 })}
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 );
}
