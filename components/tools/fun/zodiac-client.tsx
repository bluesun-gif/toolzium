"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { Star, Calendar, Sparkles, Moon } from "lucide-react";

type WesternZodiac = {
  sign: string;
  symbol: string;
  element: string;
  ruler: string;
  compatible: string;
  luckyNumbers: string;
  traits: string;
  dates: string;
};

const WESTERN_ZODIACS: WesternZodiac[] = [
  { sign: "Capricorn", symbol: "♑", element: "Earth", ruler: "Saturn", compatible: "Taurus, Virgo", luckyNumbers: "4, 8, 13, 22", traits: "Responsible, disciplined, self-control", dates: "Dec 22 - Jan 19" },
  { sign: "Aquarius", symbol: "♒", element: "Air", ruler: "Uranus", compatible: "Gemini, Libra", luckyNumbers: "4, 7, 11, 22, 29", traits: "Progressive, original, independent", dates: "Jan 20 - Feb 18" },
  { sign: "Pisces", symbol: "♓", element: "Water", ruler: "Neptune", compatible: "Cancer, Scorpio", luckyNumbers: "3, 9, 12, 15, 18, 24", traits: "Compassionate, artistic, intuitive", dates: "Feb 19 - Mar 20" },
  { sign: "Aries", symbol: "♈", element: "Fire", ruler: "Mars", compatible: "Leo, Sagittarius", luckyNumbers: "1, 8, 17", traits: "Courageous, determined, confident", dates: "Mar 21 - Apr 19" },
  { sign: "Taurus", symbol: "♉", element: "Earth", ruler: "Venus", compatible: "Virgo, Capricorn", luckyNumbers: "2, 6, 9, 12, 24", traits: "Reliable, patient, practical", dates: "Apr 20 - May 20" },
  { sign: "Gemini", symbol: "♊", element: "Air", ruler: "Mercury", compatible: "Libra, Aquarius", luckyNumbers: "5, 7, 14, 23", traits: "Adaptable, outgoing, intelligent", dates: "May 21 - Jun 20" },
  { sign: "Cancer", symbol: "♋", element: "Water", ruler: "Moon", compatible: "Scorpio, Pisces", luckyNumbers: "2, 3, 15, 20", traits: "Tenacious, highly imaginative, loyal", dates: "Jun 21 - Jul 22" },
  { sign: "Leo", symbol: "♌", element: "Fire", ruler: "Sun", compatible: "Aries, Sagittarius", luckyNumbers: "1, 3, 10, 19", traits: "Creative, passionate, generous", dates: "Jul 23 - Aug 22" },
  { sign: "Virgo", symbol: "♍", element: "Earth", ruler: "Mercury", compatible: "Taurus, Capricorn", luckyNumbers: "5, 14, 15, 23, 32", traits: "Loyal, analytical, kind", dates: "Aug 23 - Sep 22" },
  { sign: "Libra", symbol: "♎", element: "Air", ruler: "Venus", compatible: "Gemini, Aquarius", luckyNumbers: "4, 6, 13, 15, 24", traits: "Cooperative, diplomatic, gracious", dates: "Sep 23 - Oct 22" },
  { sign: "Scorpio", symbol: "♏", element: "Water", ruler: "Pluto", compatible: "Cancer, Pisces", luckyNumbers: "8, 11, 18, 22", traits: "Resourceful, brave, passionate", dates: "Oct 23 - Nov 21" },
  { sign: "Sagittarius", symbol: "♐", element: "Fire", ruler: "Jupiter", compatible: "Aries, Leo", luckyNumbers: "3, 7, 9, 12, 21", traits: "Generous, idealistic, great sense of humor", dates: "Nov 22 - Dec 21" },
];

const CHINESE_ZODIACS = [
  "Monkey 🐒", "Rooster 🐓", "Dog 🐕", "Pig 🐖", "Rat 🐀", "Ox 🐂", 
  "Tiger 🐅", "Rabbit 🐇", "Dragon 🐉", "Snake 🐍", "Horse 🐎", "Goat 🐐"
];

const CHINESE_ELEMENTS = ["Metal", "Water", "Wood", "Fire", "Earth"];

function getWesternZodiac(month: number, day: number): WesternZodiac {
  if ((month === 1 && day <= 19) || (month === 12 && day >= 22)) return WESTERN_ZODIACS[0];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return WESTERN_ZODIACS[1];
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return WESTERN_ZODIACS[2];
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return WESTERN_ZODIACS[3];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return WESTERN_ZODIACS[4];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return WESTERN_ZODIACS[5];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return WESTERN_ZODIACS[6];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return WESTERN_ZODIACS[7];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return WESTERN_ZODIACS[8];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return WESTERN_ZODIACS[9];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return WESTERN_ZODIACS[10];
  return WESTERN_ZODIACS[11]; // Sagittarius
}

function getChineseZodiac(year: number) {
  const animal = CHINESE_ZODIACS[year % 12];
  const element = CHINESE_ELEMENTS[Math.floor((year % 10) / 2)];
  return { animal, element };
}

export function ZodiacClient() {
  const [dateStr, setDateStr] = useState("");

  const calculateZodiac = () => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    
    const western = getWesternZodiac(date.getUTCMonth() + 1, date.getUTCDate());
    const chinese = getChineseZodiac(date.getUTCFullYear());
    
    return { western, chinese, year: date.getUTCFullYear() };
  };

  const result = calculateZodiac();

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Star}
        title="Zodiac Sign Finder"
        description="Discover your Western zodiac sign and Chinese zodiac animal."
        actions={
          <ResetButton onClick={() => setDateStr("")} label="Clear" />
        }
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Enter Birth Date</CardTitle>
          <CardDescription>We'll calculate your zodiac based on this date.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <Label htmlFor="bdate">Birth Date</Label>
            <Input 
              id="bdate"
              type="date" 
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="mt-2"
            />
          </div>
        </CardContent>
      </GlassCard>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="relative overflow-hidden border-indigo-500/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-500" />
                <CardTitle>Western Zodiac</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-6xl">{result.western.symbol}</div>
                <h3 className="text-2xl font-bold text-indigo-500">{result.western.sign}</h3>
                <p className="text-sm text-muted-foreground">{result.western.dates}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-muted-foreground">Element:</span>
                  <p>{result.western.element}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Ruling Planet:</span>
                  <p>{result.western.ruler}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Compatible With:</span>
                  <p>{result.western.compatible}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Lucky Numbers:</span>
                  <p>{result.western.luckyNumbers}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-muted-foreground">Traits:</span>
                  <p>{result.western.traits}</p>
                </div>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard className="relative overflow-hidden border-rose-500/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Calendar className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-500" />
                <CardTitle>Chinese Zodiac</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-6xl">{result.chinese.animal.split(" ")[1]}</div>
                <h3 className="text-2xl font-bold text-rose-500">{result.chinese.animal.split(" ")[0]}</h3>
                <p className="text-sm text-muted-foreground">Year of {result.year}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4 text-sm text-center">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <span className="font-semibold text-muted-foreground block mb-1">Element</span>
                  <p className="text-lg font-medium">{result.chinese.element}</p>
                </div>
                <p className="text-muted-foreground text-sm mt-4 italic">
                  Note: The Chinese zodiac year traditionally starts at the Lunar New Year (usually late January or February). If you were born in January or early February, you might belong to the previous year's animal!
                </p>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
