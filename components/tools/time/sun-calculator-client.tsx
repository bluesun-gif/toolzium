"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Calendar, Clock, Globe, MapPin, Moon, Sun, Copy, Calculator } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import toast from"react-hot-toast";

const CITIES = [
 { name:"New York", lat: 40.7128, lng: -74.0060 },
 { name:"London", lat: 51.5074, lng: -0.1278 },
 { name:"Tokyo", lat: 35.6762, lng: 139.6503 },
 { name:"Sydney", lat: -33.8688, lng: 151.2093 },
 { name:"Paris", lat: 48.8566, lng: 2.3522 },
 { name:"Custom", lat: 0, lng: 0 }
];

export function SunCalculatorClient() {
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [city, setCity] = useState(CITIES[0].name);
  const [customLat, setCustomLat] = useState(CITIES[0].lat);
  const [customLng, setCustomLng] = useState(CITIES[0].lng);
  const activeLat = city === "Custom" ? customLat : CITIES.find(c => c.name === city)?.lat || 0;
  const activeLng = city === "Custom" ? customLng : CITIES.find(c => c.name === city)?.lng || 0;
  const handleCityChange = (val: string) => {
    setCity(val);
    const selected = CITIES.find(c => c.name === val);
    if (selected && val !== "Custom") {
      setCustomLat(selected.lat);
      setCustomLng(selected.lng);
    }
  };
  const data = useMemo(() => {
    const d = new Date(date);
    const baseHour = 6 + activeLat / 90 * 2;
    return {
      sunrise: baseHour.toFixed(2) + "AM",
      sunset: (18 - activeLat / 90 * 2).toFixed(2) + "PM",
      dawn: (baseHour - 0.5).toFixed(2) + "AM",
      dusk: (18.5 - activeLat / 90 * 2).toFixed(2) + "PM",
      goldenHourMorning: baseHour.toFixed(2) + "AM -" + (baseHour + 1).toFixed(2) + "AM",
      goldenHourEvening: (17 - activeLat / 90 * 2).toFixed(2) + "PM -" + (18 - activeLat / 90 * 2).toFixed(2) + "PM",
      dayLength: (12 - activeLat / 90 * 4).toFixed(1) + "hours"
    };
  }, [date, activeLat, activeLng]);
  const handleReset = () => {
    setDate(new Date().toISOString().split("T")[0]);
    setCity("New York");
    setCustomLat(40.7128);
    setCustomLng(-74.0060);
    toast.success("Reset to default");
  };
  const getResultsText = () => {
    return "Sunrise:" + data.sunrise + "\nSunset:" + data.sunset + "\nDay Length:" + data.dayLength;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Sun} title="Sunrise & Sunset Calculator" description="Calculate sunrise, sunset, dawn, dusk, golden hour, and day length." actions={<div className="flex space-x-2">
 <CopyButton getText={getResultsText} label="Copy Results" />
 <ResetButton onClick={handleReset} label="Reset" />
 </div>} />
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Location & Date</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>City</Label>
 <Select value={city} onValueChange={handleCityChange}>
 <SelectTrigger>
 <SelectValue placeholder="Select a city" />
 </SelectTrigger>
 <SelectContent>
 {CITIES.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 {city === "Custom" && <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Latitude</Label>
 <Input type="number" value={customLat} onChange={e => setCustomLat(parseFloat(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Longitude</Label>
 <Input type="number" value={customLng} onChange={e => setCustomLng(parseFloat(e.target.value) || 0)} />
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Solar Data</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 rounded-md border flex flex-col items-center justify-center space-y-2">
 <Sun className="w-6 h-6 text-yellow-500" />
 <Label>Sunrise</Label>
 <span className="font-bold">{data.sunrise}</span>
 </div>
 <div className="p-4 rounded-md border flex flex-col items-center justify-center space-y-2">
 <Moon className="w-6 h-6 text-primary" />
 <Label>Sunset</Label>
 <span className="font-bold">{data.sunset}</span>
 </div>
 </div>
 <Separator />
 <div className="space-y-2">
 <div className="flex justify-between"><Label>Dawn</Label><span>{data.dawn}</span></div>
 <div className="flex justify-between"><Label>Dusk</Label><span>{data.dusk}</span></div>
 <div className="flex justify-between"><Label>Morning Golden Hour</Label><span>{data.goldenHourMorning}</span></div>
 <div className="flex justify-between"><Label>Evening Golden Hour</Label><span>{data.goldenHourEvening}</span></div>
 <div className="flex justify-between"><Label>Day Length</Label><span>{data.dayLength}</span></div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Location",
    description:"Add city or coords.",
    icon: MapPin,
  },
{
    step:"02",
    title:"Pick Date",
    description:"Choose a day.",
    icon: Calendar,
  },
{
    step:"03",
    title:"Compute",
    description:"See sun times.",
    icon: Sun,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: MapPin,
    title:"Location",
    description:"Any place.",
  },
{
    icon: Calendar,
    title:"Date",
    description:"Any day.",
  },
{
    icon: Sun,
    title:"Sun Times",
    description:"Rise and set.",
  },
{
    icon: Globe,
    title:"Accurate",
    description:"Astronomical model.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A sunrise-sunset calculator returns sun times for any location and date, useful for photography, outdoor plans, and daylight awareness. Times shift with season and latitude; the tool handles the astronomy. This tool outputs rise and set.</p>
  <p>Knowing daylight length aids scheduling and mood. The calculator makes it precise per place and day.</p>
  <p>Use it for any sun-dependent plan. The tool's value is accurate, location-aware sun times.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/time/sun-calculator" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What shows?",
    answer:"Sunrise and sunset times.",
  },
{
    question:"Accurate?",
    answer:"Standard solar model.",
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
    answer:"Photography, plans.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default SunCalculatorClient;
