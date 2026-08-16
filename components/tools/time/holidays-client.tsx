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
      const isMonthMatch = month === "All" || hDate.toLocaleString('default', {
        month: 'long'
      }) === month;
      return isCountryMatch && isYearMatch && isMonthMatch;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [country, year, month]);
  const toggleFavorite = (name: string) => {
    setFavorites(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
  };
  const getHolidaysText = () => {
    return filteredHolidays.map(h => `${h.date}: ${h.name} (${h.type})`).join("\n");
  };
  const resetFilters = () => {
    setCountry("US");
    setYear("2024");
    setMonth("All");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Calendar} title="Holiday Calendar" description="View public holidays across the world, filter by month, and track upcoming days off." actions={<>
 <CopyButton getText={getHolidaysText} label="Copy List" />
 <ResetButton onClick={resetFilters} label="Reset" />
 </>} />

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" /> Region & Time</CardTitle>
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
 {["2023", "2024", "2025"].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
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
 {filteredHolidays.length === 0 ? <div className="text-center py-12 text-muted-foreground">
 No holidays found for this selection.
 </div> : <div className="space-y-3">
 {filteredHolidays.map((holiday, idx) => {
              const date = new Date(holiday.date);
              const isFav = favorites.includes(holiday.name);
              return <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
 <div className="flex flex-col">
 <span className="font-semibold text-lg">{holiday.name}</span>
 <span className="text-sm text-muted-foreground">
 {date.toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
 </span>
 </div>
 <div className="flex items-center gap-4">
 <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
 {holiday.type}
 </span>
 <Button variant="ghost" size="icon" onClick={() => toggleFavorite(holiday.name)}>
 <Star className={cn("w-5 h-5", isFav ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
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
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Holiday Calendar?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Holiday Calendar provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/time/holidays" max={6} />

    </div></div>;
}