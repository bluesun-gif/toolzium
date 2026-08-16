"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Switch } from"@/components/ui/switch";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Clock, Globe, Moon, Plus, RefreshCw, Sun, Users, X } from"lucide-react";
import toast from"react-hot-toast";

const ALL_CITIES = [
 { id:"new-york", name:"New York", timezone:"America/New_York"},
 { id:"london", name:"London", timezone:"Europe/London"},
 { id:"tokyo", name:"Tokyo", timezone:"Asia/Tokyo"},
 { id:"dubai", name:"Dubai", timezone:"Asia/Dubai"},
 { id:"sydney", name:"Sydney", timezone:"Australia/Sydney"},
 { id:"paris", name:"Paris", timezone:"Europe/Paris"},
 { id:"berlin", name:"Berlin", timezone:"Europe/Berlin"},
 { id:"moscow", name:"Moscow", timezone:"Europe/Moscow"},
 { id:"singapore", name:"Singapore", timezone:"Asia/Singapore"},
 { id:"hong-kong", name:"Hong Kong", timezone:"Asia/Hong_Kong"},
 { id:"los-angeles", name:"Los Angeles", timezone:"America/Los_Angeles"},
 { id:"chicago", name:"Chicago", timezone:"America/Chicago"},
 { id:"toronto", name:"Toronto", timezone:"America/Toronto"},
 { id:"sao-paulo", name:"São Paulo", timezone:"America/Sao_Paulo"},
 { id:"johannesburg", name:"Johannesburg", timezone:"Africa/Johannesburg"},
 { id:"cairo", name:"Cairo", timezone:"Africa/Cairo"},
 { id:"mumbai", name:"Mumbai", timezone:"Asia/Kolkata"},
 { id:"bangkok", name:"Bangkok", timezone:"Asia/Bangkok"},
 { id:"seoul", name:"Seoul", timezone:"Asia/Seoul"},
 { id:"shanghai", name:"Shanghai", timezone:"Asia/Shanghai"},
 { id:"auckland", name:"Auckland", timezone:"Pacific/Auckland"},
 { id:"fiji", name:"Fiji", timezone:"Pacific/Fiji"},
 { id:"honolulu", name:"Honolulu", timezone:"Pacific/Honolulu"},
 { id:"mexico-city", name:"Mexico City", timezone:"America/Mexico_City"},
 { id:"buenos-aires", name:"Buenos Aires", timezone:"America/Argentina/Buenos_Aires"},
 { id:"rome", name:"Rome", timezone:"Europe/Rome"},
 { id:"istanbul", name:"Istanbul", timezone:"Europe/Istanbul"},
 { id:"riyadh", name:"Riyadh", timezone:"Asia/Riyadh"},
 { id:"jakarta", name:"Jakarta", timezone:"Asia/Jakarta"},
 { id:"manila", name:"Manila", timezone:"Asia/Manila"}
];

const DEFAULT_CITIES = ["new-york","london","tokyo","dubai","sydney"];

export function WorldClockClient() {
  const [cities, setCities] = useState<typeof ALL_CITIES>([]);
  const [is24Hour, setIs24Hour] = useState(false);
  const [selectedCityToAdd, setSelectedCityToAdd] = useState<string>("");
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    const saved = localStorage.getItem("world-clock-cities");
    if (saved) {
      try {
        setCities(JSON.parse(saved));
      } catch (e) {
        setCities(ALL_CITIES.filter(c => DEFAULT_CITIES.includes(c.id)));
      }
    } else {
      setCities(ALL_CITIES.filter(c => DEFAULT_CITIES.includes(c.id)));
    }
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const saveCities = (newCities: typeof ALL_CITIES) => {
    setCities(newCities);
    localStorage.setItem("world-clock-cities", JSON.stringify(newCities));
  };
  const addCity = () => {
    if (!selectedCityToAdd) return;
    const cityObj = ALL_CITIES.find(c => c.id === selectedCityToAdd);
    if (!cityObj) return;
    if (cities.some(c => c.id === selectedCityToAdd)) {
      toast.error("City is already in your list");
      return;
    }
    saveCities([...cities, cityObj]);
    setSelectedCityToAdd("");
    toast.success(`${cityObj.name} added`);
  };
  const removeCity = (id: string) => {
    saveCities(cities.filter(c => c.id !== id));
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="World Clock" description="Monitor time across different cities and timezones simultaneously." icon={Globe} actions={<div className="flex items-center space-x-2 bg-secondary/30 p-2 rounded-md">
 <Label htmlFor="time-format" className="text-sm cursor-pointer">12h</Label>
 <Switch id="time-format" checked={is24Hour} onCheckedChange={setIs24Hour} />
 <Label htmlFor="time-format" className="text-sm cursor-pointer">24h</Label>
 </div>} />
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Add Timezone</CardTitle>
 <CardDescription>Select a city to add to your world clock.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-col sm:flex-row items-center gap-4">
 <div className="flex-1 w-full max-w-sm">
 <Select value={selectedCityToAdd} onValueChange={setSelectedCityToAdd}>
 <SelectTrigger>
 <SelectValue placeholder="Select a city..." />
 </SelectTrigger>
 <SelectContent>
 {ALL_CITIES.filter(c => !cities.some(sc => sc.id === c.id)).map(city => <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <Button onClick={addCity} disabled={!selectedCityToAdd} className="w-full sm:w-auto">
 <Plus className="w-4 h-4 mr-2" /> Add City
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {cities.map(city => {
          if (!time) return null;
          const formatterOptions: Intl.DateTimeFormatOptions = {
            timeZone: city.timezone,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: !is24Hour
          };
          const timeString = new Intl.DateTimeFormat('en-US', formatterOptions).format(time);
          const dateString = new Intl.DateTimeFormat('en-US', {
            timeZone: city.timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          }).format(time);
          const hour = parseInt(new Intl.DateTimeFormat('en-US', {
            timeZone: city.timezone,
            hour: 'numeric',
            hour12: false
          }).format(time));
          const isDay = hour >= 6 && hour < 18;
          const offsetParts = new Intl.DateTimeFormat('en-US', {
            timeZone: city.timezone,
            timeZoneName: 'shortOffset'
          }).formatToParts(time);
          const offsetString = offsetParts.find(p => p.type === 'timeZoneName')?.value || 'UTC';
          const timeParts = timeString.split(' ');
          const mainTime = timeParts[0];
          const ampm = timeParts[1];
          return <GlassCard key={city.id} className="relative group">
 <CardContent className="p-6">
 <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeCity(city.id)}>
 <X className="w-4 h-4 text-muted-foreground" />
 </Button>
 <div className="flex justify-between items-start mb-4">
 <div>
 <h3 className="text-xl font-bold">{city.name}</h3>
 <p className="text-sm text-muted-foreground flex items-center gap-2">
 {dateString} <span className="text-xs bg-secondary px-1.5 py-0.5 rounded">{offsetString}</span>
 </p>
 </div>
 <div className={cn("p-2 rounded-full", isDay ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-100 text-slate-600 ')}>
 {isDay ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
 </div>
 </div>
 <div className="text-3xl font-mono tracking-tight flex items-baseline gap-2">
 {mainTime}
 {!is24Hour && ampm && <span className="text-lg font-sans text-muted-foreground">{ampm}</span>}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Cities",
    description:"Pick time zones.",
    icon: Globe,
  },
{
    step:"02",
    title:"View",
    description:"See all current times.",
    icon: Clock,
  },
{
    step:"03",
    title:"Update",
    description:"Times tick live.",
    icon: RefreshCw,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Globe,
    title:"Cities",
    description:"Multiple zones.",
  },
{
    icon: Clock,
    title:"Current",
    description:"Live times.",
  },
{
    icon: RefreshCw,
    title:"Live",
    description:"Updates continuously.",
  },
{
    icon: Users,
    title:"Compare",
    description:"Side by side.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A world clock displays current time across chosen cities at once, keeping you aware of colleagues' and family's local hours. Live updates mean no stale reads. This tool shows them side by side.</p>
  <p>Awareness prevents calling someone at 3am. The clock supports courteous global coordination.</p>
  <p>Use it for always-on time awareness. The tool's value is live, multi-city time at a glance.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What shows?",
    answer:"Current time per city.",
  },
{
    question:"Live?",
    answer:"Yes, updates.",
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
    answer:"Global awareness.",
  }
  ]}
/>
</div>
 </CardContent>
 </GlassCard>;
        })}
 </div>
 
 {cities.length === 0 && <div className="text-center p-12 border rounded-lg border-dashed">
 <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
 <h3 className="text-lg font-medium">No cities added</h3>
 <p className="text-muted-foreground">Add cities to your world clock to see their current time.</p>
 </div>}
 
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
          <h3>Why Use Our World Clock?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our World Clock provides
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

      <RelatedTools currentToolUrl="/tools/time/world-clock" max={6} />

    </div></div>;
}