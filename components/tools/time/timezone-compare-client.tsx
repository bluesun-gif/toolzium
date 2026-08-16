"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Slider } from"@/components/ui/slider";
import { Clock, Globe, Plus, ShieldCheck, Trash2, Users } from"lucide-react";

const TIMEZONES = [
 { value:"UTC", label:"UTC"},
 { value:"America/New_York", label:"New York (EST/EDT)"},
 { value:"America/Los_Angeles", label:"Los Angeles (PST/PDT)"},
 { value:"Europe/London", label:"London (GMT/BST)"},
 { value:"Europe/Paris", label:"Paris (CET/CEST)"},
 { value:"Asia/Tokyo", label:"Tokyo (JST)"},
 { value:"Asia/Kolkata", label:"India (IST)"},
 { value:"Australia/Sydney", label:"Sydney (AEST/AEDT)"},
];

=======
import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Slider } from "@/components/ui/slider";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Globe, Plus, Trash2, Clock, Shield, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
const TIMEZONES = [{
  value: "UTC",
  label: "UTC (Coordinated Universal Time)"
}, {
  value: "America/New_York",
  label: "New York (EST/EDT)"
}, {
  value: "America/Los_Angeles",
  label: "Los Angeles (PST/PDT)"
}, {
  value: "Europe/London",
  label: "London (GMT/BST)"
}, {
  value: "Europe/Paris",
  label: "Paris (CET/CEST)"
}, {
  value: "Asia/Tokyo",
  label: "Tokyo (JST)"
}, {
  value: "Asia/Kolkata",
  label: "India (IST)"
}, {
  value: "Australia/Sydney",
  label: "Sydney (AEST/AEDT)"
}];
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function TimezoneCompareClient() {
  const [zones, setZones] = useState<string[]>(["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"]);
  const [selectedZone, setSelectedZone] = useState(TIMEZONES[0].value);
  const [baseTimeOffset, setBaseTimeOffset] = useState(12 * 60); // 12:00 PM default in minutes

  useEffect(() => {}, []);
  const addZone = () => {
    if (zones.length >= 8) {
      toast.error("Maximum 8 time zones allowed.");
      return;
    }
    if (!zones.includes(selectedZone)) {
      setZones([...zones, selectedZone]);
      toast.success("Added time zone!");
    } else {
      toast.error("Time zone already added.");
    }
  };
  const removeZone = (zone: string) => {
    if (zones.length > 1) {
      setZones(zones.filter(z => z !== zone));
      toast.success("Removed time zone.");
    }
  };
  const getZoneTime = (zone: string) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setMinutes(baseTimeOffset);
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    const parts = formatter.formatToParts(date);
    const timeStr = formatter.format(date);
    const hourPart = parseInt(parts.find(p => p.type === "hour")?.value || "0", 10);
    const dayPeriod = parts.find(p => p.type === "dayPeriod")?.value || "";
    let hour24 = hourPart;
    if (dayPeriod.toLowerCase() === "pm" && hour24 < 12) hour24 += 12;
    if (dayPeriod.toLowerCase() === "am" && hour24 === 12) hour24 = 0;
    const isBusiness = hour24 >= 9 && hour24 < 17;
    const isDark = hour24 >= 22 || hour24 < 6;
    return {
      text: timeStr,
      isBusiness,
      isDark,
      hour24
    };
  };
  const handleReset = () => {
    setZones(["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"]);
    setBaseTimeOffset(12 * 60);
    toast.success("Reset time zones!");
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Globe} title="Time Zone Comparison Studio" description="Compare real-time meeting schedules across international time zones (EST, PST, GMT, IST, JST) with visual business hours indicators." actions={<div className="flex gap-2">
            <CopyButton getText={() => zones.map(z => `${z}: ${getZoneTime(z).text}`).join("\n")} label="Copy Times" />
            <ResetButton onClick={handleReset} label="Reset" />
          </div>} />

      {/* INPUT ADD ZONE */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="w-5 h-5 text-primary" /> Add Time Zone to Comparison Grid
          </CardTitle>
          <CardDescription>Select global regions to compare overlapping business working hours.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger className="h-11 font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map(tz => <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addZone} disabled={zones.length >= 8} className="h-11 px-6 font-bold gap-2">
            <Plus className="w-4 h-4" /> Add Time Zone
          </Button>
        </CardContent>
      </GlassCard>

      {/* BASE TIME SLIDER & GRID */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5 text-primary" /> Interactive Time Slider
          </CardTitle>
          <CardDescription>Drag the slider to adjust base time and observe real-time city time conversions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 p-4 rounded-xl bg-muted/20 border border-border/60">
            <div className="flex justify-between text-xs font-bold text-muted-foreground">
              <span>00:00 (Midnight)</span>
              <span>12:00 PM (Noon)</span>
              <span>23:45 (Night)</span>
            </div>
            <Slider value={[baseTimeOffset]} min={0} max={24 * 60 - 15} step={15} onValueChange={vals => setBaseTimeOffset(vals[0])} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {zones.map(zone => {
              const {
                text,
                isBusiness,
                isDark
              } = getZoneTime(zone);
              const label = TIMEZONES.find(t => t.value === zone)?.label || zone;
              return <div key={zone} className={cn("p-5 rounded-2xl border relative flex flex-col items-center justify-center space-y-2 transition-all shadow-sm", isBusiness ? "bg-emerald-500/10 border-emerald-500/30 text-foreground" : isDark ? "bg-muted/40 border-border text-muted-foreground" : "bg-background/80 border-border text-foreground")}>
                  {zones.length > 1 && <Button onClick={() => removeZone(zone)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors" title="Remove time zone">
                      <Trash2 className="w-4 h-4" />
                    </Button>}
                  <span className="text-xs font-bold text-center text-muted-foreground line-clamp-1">{label}</span>
                  <span className="text-3xl font-black text-foreground tracking-tight">{text}</span>
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md", isBusiness ? "bg-emerald-500 text-primary-foreground" : isDark ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary")}>
                    {isBusiness ? "🟢 Business Hours" : isDark ? "🌙 Night" : "🌤️ Daytime"}
                  </span>
                </div>;
            })}
          </div>
        </CardContent>
      </GlassCard>

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Add Target Cities",
        description: "Select global time zones (New York, London, Tokyo, Sydney) to add to your side-by-side grid.",
        icon: Globe
      }, {
        step: "02",
        title: "Drag Time Slider",
        description: "Move the 24-hour time slider to calculate exact meeting hours across regions.",
        icon: Clock
      }, {
        step: "03",
        title: "Spot Business Overlaps",
        description: "Green badges highlight working business hours (9am - 5pm) in each destination.",
        icon: Shield
      }]} badges={["Side-by-Side Comparison", "Business Hours Detection", "100% Free"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Globe,
        title: "Global Timezone Support",
        description: "Supports major financial centers and UTC offsets with automatic Daylight Saving adjustment."
      }, {
        icon: Clock,
        title: "Visual Working Hour Highlights",
        description: "Automatically highlights 9 AM - 5 PM business hours in green for easy meeting scheduling."
      }, {
        icon: Shield,
        title: "Client-Side & Confidential",
        description: "Calculated instantly in your browser without tracking or external API calls."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "How does the business hours indicator work?",
        answer: "Green badges automatically highlight cities where local time falls between 9:00 AM and 5:00 PM."
      }, {
        question: "Does this tool automatically handle Daylight Saving Time (DST)?",
        answer: "Yes, standard Internationalization (Intl) browser APIs automatically compute real-time DST offsets."
      }]} />

<<<<<<< HEAD
 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Globe}
 title="Time Zone Comparison"
 description="Compare time across multiple time zones side by side."
 actions={
 <>
 <CopyButton getText={() => zones.map(z => `${z}: ${getZoneTime(z).text}`).join("\n")} label="Copy Times"/>
 <ResetButton onClick={() => { setZones(["UTC","America/New_York"]); setBaseTimeOffset(0); }} label="Reset"/>
 </>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Add Time Zone</CardTitle>
 </CardHeader>
 <CardContent className="flex gap-4 items-center">
 <Select value={selectedZone} onValueChange={setSelectedZone}>
 <SelectTrigger className="w-[300px]"><SelectValue /></SelectTrigger>
 <SelectContent>
 {TIMEZONES.map(tz => <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>)}
 </SelectContent>
 </Select>
 <Button onClick={addZone} disabled={zones.length >= 8}><Plus className="w-4 h-4 mr-2"/> Add</Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Base Time Selector</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <Slider
 value={[baseTimeOffset]}
 min={0}
 max={24 * 60 - 15}
 step={15}
 onValueChange={(vals) => setBaseTimeOffset(vals[0])}
 />
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 {zones.map(zone => {
 const { text, isBusiness, isDark } = getZoneTime(zone);
 const label = TIMEZONES.find(t => t.value === zone)?.label || zone;
 let bgClass ="bg-muted/50";
 if (isBusiness) bgClass ="bg-green-500/20 border-green-500/50";
 else if (isDark) bgClass ="bg-muted/50 text-slate-200 border-border/50";

 return (
 <div key={zone} className={"p-4 rounded-xl border relative flex flex-col items-center justify-center space-y-2"+ (bgClass)}>
 <button 
 onClick={() => removeZone(zone)}
 className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
 >
 <Trash2 className="w-4 h-4"/>
 </button>
 <span className="text-sm font-medium text-center">{label}</span>
 <span className="text-3xl font-bold">{text}</span>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Zones",
    description:"Pick cities.",
    icon: Globe,
  },
{
    step:"02",
    title:"Pick Time",
    description:"A reference moment.",
    icon: Clock,
  },
{
    step:"03",
    title:"Compare",
    description:"See all local times.",
    icon: Users,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Globe,
    title:"Zones",
    description:"Multiple cities.",
  },
{
    icon: Clock,
    title:"Reference",
    description:"A base time.",
  },
{
    icon: Users,
    title:"Compare",
    description:"All conversions.",
  },
{
    icon: ShieldCheck,
    title:"Clarity",
    description:"No mental math.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A time zone comparison shows one moment across many cities at once, eliminating the mental math of conversions. For global teams and travel, seeing all local times together prevents mistakes. This tool handles the conversion.</p>
  <p>Clarity avoids missed calls and wrong deadlines. The comparison makes coordination trivial.</p>
  <p>Use it whenever zones differ. The tool's value is instant, multi-zone time clarity.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why compare?",
    answer:"Coordinate across regions.",
  },
{
    question:"Many zones?",
    answer:"Add several.",
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
    answer:"Remote teams.",
  }
  ]}
/>
</div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 );
}
=======
      <RelatedTools currentToolUrl="/tools/time/timezone-compare" max={6} />
    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
