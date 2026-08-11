"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

const zodiacData = [
  { name: "Capricorn", symbol: "♑", range: "Dec 22 - Jan 19", element: "Earth", planet: "Saturn", traits: "Responsible, disciplined, self-controlled", start: [12, 22], end: [1, 19] },
  { name: "Aquarius", symbol: "♒", range: "Jan 20 - Feb 18", element: "Air", planet: "Uranus", traits: "Progressive, original, independent", start: [1, 20], end: [2, 18] },
  { name: "Pisces", symbol: "♓", range: "Feb 19 - Mar 20", element: "Water", planet: "Neptune", traits: "Compassionate, artistic, intuitive", start: [2, 19], end: [3, 20] },
  { name: "Aries", symbol: "♈", range: "Mar 21 - Apr 19", element: "Fire", planet: "Mars", traits: "Courageous, determined, confident", start: [3, 21], end: [4, 19] },
  { name: "Taurus", symbol: "♉", range: "Apr 20 - May 20", element: "Earth", planet: "Venus", traits: "Reliable, patient, practical", start: [4, 20], end: [5, 20] },
  { name: "Gemini", symbol: "♊", range: "May 21 - Jun 20", element: "Air", planet: "Mercury", traits: "Gentle, affectionate, curious", start: [5, 21], end: [6, 20] },
  { name: "Cancer", symbol: "♋", range: "Jun 21 - Jul 22", element: "Water", planet: "Moon", traits: "Tenacious, highly imaginative, loyal", start: [6, 21], end: [7, 22] },
  { name: "Leo", symbol: "♌", range: "Jul 23 - Aug 22", element: "Fire", planet: "Sun", traits: "Creative, passionate, generous", start: [7, 23], end: [8, 22] },
  { name: "Virgo", symbol: "♍", range: "Aug 23 - Sep 22", element: "Earth", planet: "Mercury", traits: "Loyal, analytical, kind", start: [8, 23], end: [9, 22] },
  { name: "Libra", symbol: "♎", range: "Sep 23 - Oct 22", element: "Air", planet: "Venus", traits: "Cooperative, diplomatic, gracious", start: [9, 23], end: [10, 22] },
  { name: "Scorpio", symbol: "♏", range: "Oct 23 - Nov 21", element: "Water", planet: "Pluto", traits: "Resourceful, brave, passionate", start: [10, 23], end: [11, 21] },
  { name: "Sagittarius", symbol: "♐", range: "Nov 22 - Dec 21", element: "Fire", planet: "Jupiter", traits: "Generous, idealistic, great sense of humor", start: [11, 22], end: [12, 21] }
];

const getZodiac = (month: number, day: number) => {
  for (const sign of zodiacData) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    
    if (sm === em) {
      if (month === sm && day >= sd && day <= ed) return sign;
    } else if (sm > em) { 
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return sign;
    } else {
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return sign;
    }
  }
  return zodiacData[0];
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function ZodiacClient() {
  const [month, setMonth] = useState(3);
  const [day, setDay] = useState(21);

  const sign = useMemo(() => getZodiac(month, day), [month, day]);

  const daysInMonth = new Date(2024, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader icon={Star} title="Zodiac Sign Finder" description="Discover your astrological sign, ruling planet, and personality traits based on your birthdate." />
      
      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>Enter Birthdate</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="space-y-2">
              <label className="text-sm font-medium">Month</label>
              <select 
                value={month} 
                onChange={e => {
                  const m = parseInt(e.target.value);
                  setMonth(m);
                  const maxDays = new Date(2024, m, 0).getDate();
                  if (day > maxDays) setDay(maxDays);
                }}
                className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
              >
                {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Day</label>
              <select 
                value={day} 
                onChange={e => setDay(parseInt(e.target.value))}
                className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
              >
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center space-y-4 mt-6">
            <div className="text-7xl sm:text-8xl text-primary">{sign.symbol}</div>
            <h2 className="text-3xl sm:text-4xl font-bold">{sign.name}</h2>
            <p className="text-muted-foreground">{sign.range}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 max-w-2xl mx-auto">
              <div className="p-3 bg-background/50 rounded-xl border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">Element</div>
                <div className="font-bold text-sm">{sign.element}</div>
              </div>
              <div className="p-3 bg-background/50 rounded-xl border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">Planet</div>
                <div className="font-bold text-sm">{sign.planet}</div>
              </div>
              <div className="p-3 bg-background/50 rounded-xl border border-border/50 col-span-2">
                <div className="text-xs text-muted-foreground mb-1">Key Traits</div>
                <div className="font-bold text-sm">{sign.traits}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ToolHowItWorks 
        steps={[
          { step: "01", title: "Select Month", description: "Choose the month of your birth from the dropdown menu.", icon: Star },
          { step: "02", title: "Select Day", description: "Pick the exact day you were born to pinpoint your astrological window.", icon: Star },
          { step: "03", title: "Read Profile", description: "Instantly view your zodiac sign, symbol, element, and personality traits.", icon: Star }
        ]} 
        badges={["100% Free", "Client-Side", "Fun"]} 
      />

      <ToolFeatureGuides features={[
        { icon: Star, title: "All 12 Signs", description: "Includes complete data for Aries through Pisces, including cusp dates." },
        { icon: Star, title: "Dynamic Calendar", description: "Automatically adjusts the number of days based on the selected month." },
        { icon: Star, title: "Astrological Data", description: "Displays ruling planets and elemental associations (Fire, Earth, Air, Water)." },
        { icon: Star, title: "Instant Profiling", description: "Provides a quick summary of the core personality traits associated with your sign." }
      ]}>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>Astrology has fascinated humanity for millennia, offering a framework to understand personality and destiny based on the position of the stars at the time of birth. Our finder makes it easy to identify your Sun sign.</p>
          <p>Beyond just the name and symbol, this tool provides the deeper astrological context: the element that grounds your sign, and the celestial body that rules your house. This is essential for anyone looking to read their daily horoscope accurately.</p>
          <p>Whether you are a skeptic looking for a quick laugh or a dedicated astrologer checking cusp dates, the calculator handles the date logic instantly and accurately.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[
        { question: "What if I was born on a cusp?", answer: "If your birthday falls on the exact day a sign changes (e.g., March 20), astrologers often recommend checking your exact birth time and location, as the sun may have shifted mid-day." },
        { question: "Is this my Sun, Moon, or Rising sign?", answer: "This calculator determines your Sun sign, which is based solely on your birth month and day. Moon and Rising signs require your exact birth time and location." },
        { question: "Why are the elements important?", answer: "The four elements (Fire, Earth, Air, Water) group the signs into fundamental temperaments, explaining why certain signs naturally get along better than others." }
      ]} />

      <RelatedTools currentToolUrl="/tools/fun/zodiac" max={6} />
    </div>
  );
}
