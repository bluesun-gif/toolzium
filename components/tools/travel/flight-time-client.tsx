"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ResetButton, ActionButton } from "@/components/shared/action-buttons";
import { Send, Clock, Navigation, ArrowLeftRight, Sparkles, Shield, Zap, Copy, Calculator } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

// City coordinates database
const cities = [{
  id: "lhr",
  name: "London, UK",
  lat: 51.4700,
  lon: -0.4543
}, {
  id: "jfk",
  name: "New York, USA",
  lat: 40.6413,
  lon: -73.7781
}, {
  id: "lax",
  name: "Los Angeles, USA",
  lat: 33.9416,
  lon: -118.4085
}, {
  id: "hnd",
  name: "Tokyo, Japan",
  lat: 35.5494,
  lon: 139.7798
}, {
  id: "cdg",
  name: "Paris, France",
  lat: 49.0097,
  lon: 2.5479
}, {
  id: "dxb",
  name: "Dubai, UAE",
  lat: 25.2532,
  lon: 55.3657
}, {
  id: "syd",
  name: "Sydney, Australia",
  lat: -33.9399,
  lon: 151.1753
}, {
  id: "sin",
  name: "Singapore",
  lat: 1.3644,
  lon: 103.9915
}, {
  id: "yyz",
  name: "Toronto, Canada",
  lat: 43.6777,
  lon: -79.6248
}, {
  id: "gru",
  name: "São Paulo, Brazil",
  lat: -23.4356,
  lon: -46.4731
}, {
  id: "jnb",
  name: "Johannesburg, RSA",
  lat: -26.1367,
  lon: 28.2411
}, {
  id: "del",
  name: "New Delhi, India",
  lat: 28.5562,
  lon: 77.1000
}, {
  id: "peck",
  name: "Beijing, China",
  lat: 40.0799,
  lon: 116.6031
}, {
  id: "fra",
  name: "Frankfurt, Germany",
  lat: 50.0333,
  lon: 8.5706
}, {
  id: "mxp",
  name: "Milan, Italy",
  lat: 45.6301,
  lon: 8.7231
}].sort((a, b) => a.name.localeCompare(b.name));
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// Great-circle distance calculation
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}
export function FlightTimeClient() {
  const [origin, setOrigin] = useState<string>("lhr");
  const [destination, setDestination] = useState<string>("jfk");
  const [hasLayover, setHasLayover] = useState(false);
  const [layoverCity, setLayoverCity] = useState<string>("cdg");
  const [layoverDuration, setLayoverDuration] = useState<string>("120"); // mins
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const handleReset = () => {
    setOrigin("lhr");
    setDestination("jfk");
    setHasLayover(false);
    setLayoverDuration("120");
    setIsRoundTrip(false);
  };
  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };
  const originCity = cities.find(c => c.id === origin) || cities[0];
  const destCity = cities.find(c => c.id === destination) || cities[1];
  const layCity = cities.find(c => c.id === layoverCity) || cities[2];
  const avgSpeed = 900; // km/h
  const takeoffLandingTime = 0.5; // hrs

  let totalDist = 0;
  let flightTime = 0;
  if (hasLayover) {
    const d1 = calculateDistance(originCity.lat, originCity.lon, layCity.lat, layCity.lon);
    const d2 = calculateDistance(layCity.lat, layCity.lon, destCity.lat, destCity.lon);
    totalDist = d1 + d2;
    // two flights, so add takeoffLandingTime twice
    flightTime = d1 / avgSpeed + takeoffLandingTime + d2 / avgSpeed + takeoffLandingTime;
  } else {
    totalDist = calculateDistance(originCity.lat, originCity.lon, destCity.lat, destCity.lon);
    flightTime = totalDist / avgSpeed + takeoffLandingTime;
  }
  const layoverTimeHrs = hasLayover ? parseFloat(layoverDuration) / 60 : 0;
  let totalTime = flightTime + layoverTimeHrs;
  if (isRoundTrip) {
    totalDist *= 2;
    totalTime *= 2; // naive approach assuming same layover for return
  }
  const formatTime = (hrs: number) => {
    const h = Math.floor(hrs);
    const m = Math.round((hrs - h) * 60);
    return `${h}h ${m}m`;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Send} title="Flight Time Calculator" description="Estimate flight durations, distances, and layovers between global destinations." actions={<ResetButton onClick={handleReset} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Route Details</CardTitle>
 <CardDescription>Select your flight path</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Origin</Label>
 <Select value={origin} onValueChange={setOrigin}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {cities.map(c => <SelectItem key={`org-${c.id}`} value={c.id}>{c.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>

 <div className="flex justify-center">
 <ActionButton onClick={handleSwap} icon={ArrowLeftRight} label="Swap" variant="outline" size="sm" />
 </div>

 <div className="space-y-2">
 <Label>Destination</Label>
 <Select value={destination} onValueChange={setDestination}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {cities.map(c => <SelectItem key={`dst-${c.id}`} value={c.id}>{c.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 
 <Separator />

 <div className="flex items-center justify-between">
 <Label htmlFor="layover-switch" className="flex flex-col space-y-1">
 <span>Add Layover</span>
 <span className="font-normal text-sm text-muted-foreground">Calculate connecting flight</span>
 </Label>
 <Switch id="layover-switch" checked={hasLayover} onCheckedChange={setHasLayover} />
 </div>

 {hasLayover && <div className="space-y-4 p-4 bg-secondary/30 rounded-lg">
 <div className="space-y-2">
 <Label>Connection City</Label>
 <Select value={layoverCity} onValueChange={setLayoverCity}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {cities.map(c => <SelectItem key={`lay-${c.id}`} value={c.id}>{c.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Layover Duration (minutes)</Label>
 <Input type="number" value={layoverDuration} onChange={e => setLayoverDuration(e.target.value)} min="0" />
 </div>
 </div>}

 <Separator />

 <div className="flex items-center justify-between">
 <Label htmlFor="roundtrip-switch">Round Trip</Label>
 <Switch id="roundtrip-switch" checked={isRoundTrip} onCheckedChange={setIsRoundTrip} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="bg-primary/5 border-primary/20 flex flex-col justify-center">
 <CardHeader>
 <CardTitle className="text-primary flex items-center gap-2">
 <Clock className="h-5 w-5" />
 Estimated Travel Time
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-8">
 <div className="text-center space-y-2">
 <div className="text-5xl font-bold text-foreground">
 {formatTime(totalTime)}
 </div>
 {isRoundTrip && <div className="text-sm font-medium text-primary uppercase tracking-wider">Round Trip Total</div>}
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="bg-background/80 p-4 rounded-lg flex flex-col items-center text-center space-y-2">
 <Navigation className="h-5 w-5 text-muted-foreground" />
 <span className="text-sm text-muted-foreground">Total Distance</span>
 <span className="text-lg font-semibold">{Math.round(totalDist).toLocaleString()} km</span>
 <span className="text-xs text-muted-foreground">{(totalDist * 0.621371).toLocaleString(undefined, {
                    maximumFractionDigits: 0
                  })} miles</span>
 </div>
 <div className="bg-background/80 p-4 rounded-lg flex flex-col items-center text-center space-y-2">
 <Send className="h-5 w-5 text-muted-foreground" />
 <span className="text-sm text-muted-foreground">Air Time Only</span>
 <span className="text-lg font-semibold">{formatTime(isRoundTrip ? flightTime * 2 : flightTime)}</span>
 </div>
 </div>

 <div className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-md">
 <p><strong>Note:</strong> Estimates assume an average speed of 900 km/h and include 30 minutes per flight for takeoff and landing. Actual times may vary due to weather, aircraft type, and air traffic.</p>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
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
          <h3>Why Use Our Flight Time Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Flight Time Calculator provides
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
    </div>
    </div>
);
}

export default FlightTimeClient;
