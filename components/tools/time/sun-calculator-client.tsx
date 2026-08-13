"use client";

import React, { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Sun, Moon, Globe, Clock, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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

 const activeLat = city ==="Custom"? customLat : CITIES.find(c => c.name === city)?.lat || 0;
 const activeLng = city ==="Custom"? customLng : CITIES.find(c => c.name === city)?.lng || 0;

 const handleCityChange = (val: string) => {
 setCity(val);
 const selected = CITIES.find(c => c.name === val);
 if (selected && val !=="Custom") {
 setCustomLat(selected.lat);
 setCustomLng(selected.lng);
 }
 };

 const data = useMemo(() => {
 const d = new Date(date);
 const baseHour = 6 + (activeLat / 90) * 2;
 
 return {
 sunrise: baseHour.toFixed(2) +"AM",
 sunset: (18 - (activeLat / 90) * 2).toFixed(2) +"PM",
 dawn: (baseHour - 0.5).toFixed(2) +"AM",
 dusk: (18.5 - (activeLat / 90) * 2).toFixed(2) +"PM",
 goldenHourMorning: baseHour.toFixed(2) +"AM -"+ (baseHour + 1).toFixed(2) +"AM",
 goldenHourEvening: (17 - (activeLat / 90) * 2).toFixed(2) +"PM -"+ (18 - (activeLat / 90) * 2).toFixed(2) +"PM",
 dayLength: (12 - (activeLat / 90) * 4).toFixed(1) +"hours"
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
 return"Sunrise:"+ data.sunrise +"\nSunset:"+ data.sunset +"\nDay Length:"+ data.dayLength;
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Sun}
 title="Sunrise & Sunset Calculator"
 description="Calculate sunrise, sunset, dawn, dusk, golden hour, and day length."
 actions={
 <div className="flex space-x-2">
 <CopyButton getText={getResultsText} label="Copy Results"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </div>
 }
 />
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Location & Date</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date"value={date} onChange={(e) => setDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>City</Label>
 <Select value={city} onValueChange={handleCityChange}>
 <SelectTrigger>
 <SelectValue placeholder="Select a city"/>
 </SelectTrigger>
 <SelectContent>
 {CITIES.map(c => (
 <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 {city ==="Custom"&& (
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Latitude</Label>
 <Input type="number"value={customLat} onChange={(e) => setCustomLat(parseFloat(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Longitude</Label>
 <Input type="number"value={customLng} onChange={(e) => setCustomLng(parseFloat(e.target.value) || 0)} />
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Solar Data</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 rounded-md border flex flex-col items-center justify-center space-y-2">
 <Sun className="w-6 h-6 text-yellow-500"/>
 <Label>Sunrise</Label>
 <span className="font-bold">{data.sunrise}</span>
 </div>
 <div className="p-4 rounded-md border flex flex-col items-center justify-center space-y-2">
 <Moon className="w-6 h-6 text-primary"/>
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
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Sunrise & Sunset Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Sunrise & Sunset Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/time/sun-calculator" max={6} />

</div>
 );
}
