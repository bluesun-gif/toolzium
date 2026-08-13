"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Cake, Clock, Star, CalendarHeart, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
interface Age {
  years: number;
  months: number;
  days: number;
}
export function BirthdayCountdownClient() {
  const [birthday, setBirthday] = useState<string>("");
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [age, setAge] = useState<Age | null>(null);
  const [zodiac, setZodiac] = useState<string>("");
  const [birthStone, setBirthStone] = useState<string>("");
  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  useEffect(() => {
    const saved = localStorage.getItem("tz_birthday");
    if (saved) {
      setBirthday(saved);
    }
  }, []);
  useEffect(() => {
    if (!birthday) {
      setCountdown(null);
      setAge(null);
      return;
    }
    const calculate = () => {
      const now = new Date();
      const bdate = new Date(birthday);

      // Calculate next birthday
      let nextBday = new Date(now.getFullYear(), bdate.getMonth(), bdate.getDate());
      if (now > nextBday) {
        nextBday.setFullYear(now.getFullYear() + 1);
      }
      const diff = nextBday.getTime() - now.getTime();
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor(diff / (1000 * 60 * 60) % 24);
      const m = Math.floor(diff / 1000 / 60 % 60);
      const s = Math.floor(diff / 1000 % 60);
      setCountdown({
        days: d,
        hours: h,
        minutes: m,
        seconds: s
      });

      // Calculate Age
      let ageYears = now.getFullYear() - bdate.getFullYear();
      let ageMonths = now.getMonth() - bdate.getMonth();
      let ageDays = now.getDate() - bdate.getDate();
      if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      }
      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }
      if (now.getTime() >= bdate.getTime()) {
        setAge({
          years: ageYears,
          months: ageMonths,
          days: ageDays
        });
      } else {
        setAge(null);
      }
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [birthday]);
  useEffect(() => {
    if (birthday) {
      const date = new Date(birthday);
      const m = date.getMonth() + 1;
      const d = date.getDate();

      // Zodiac
      let sign = "";
      if (m == 1 && d <= 20 || m == 12 && d >= 22) sign = "Capricorn";else if (m == 1 && d >= 21 || m == 2 && d <= 18) sign = "Aquarius";else if (m == 2 && d >= 19 || m == 3 && d <= 20) sign = "Pisces";else if (m == 3 && d >= 21 || m == 4 && d <= 19) sign = "Aries";else if (m == 4 && d >= 20 || m == 5 && d <= 20) sign = "Taurus";else if (m == 5 && d >= 21 || m == 6 && d <= 20) sign = "Gemini";else if (m == 6 && d >= 21 || m == 7 && d <= 22) sign = "Cancer";else if (m == 7 && d >= 23 || m == 8 && d <= 22) sign = "Leo";else if (m == 8 && d >= 23 || m == 9 && d <= 22) sign = "Virgo";else if (m == 9 && d >= 23 || m == 10 && d <= 22) sign = "Libra";else if (m == 10 && d >= 23 || m == 11 && d <= 21) sign = "Scorpio";else if (m == 11 && d >= 22 || m == 12 && d <= 21) sign = "Sagittarius";
      setZodiac(sign);

      // Birthstone
      const stones = ["Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl", "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Turquoise"];
      setBirthStone(stones[m - 1] || "");

      // Day of week
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      setDayOfWeek(days[date.getDay()] || "");
    }
  }, [birthday]);
  const handleSave = () => {
    if (birthday) {
      localStorage.setItem("tz_birthday", birthday);
      toast.success("Birthday saved!");
    }
  };
  const handleReset = () => {
    setBirthday("");
    localStorage.removeItem("tz_birthday");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Cake} title="Birthday Countdown" description="Set your birthday and see a live countdown to your next birthday along with fun facts." actions={<>
 <ActionButton onClick={handleSave} icon={Star} label="Save" variant="default" />
 <ResetButton onClick={handleReset} />
 </>} />

 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
 <div className="md:col-span-4">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <CalendarHeart className="w-5 h-5 text-primary" />
 Your Birthday
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Date of Birth</Label>
 <Input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
 </div>
 <Button onClick={handleSave} className="w-full">
 Save Birthday
 </Button>
 </CardContent>
 </GlassCard>
 </div>

 <div className="md:col-span-8 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Clock className="w-5 h-5 text-primary" />
 Time Until Next Birthday
 </CardTitle>
 </CardHeader>
 <CardContent>
 {countdown ? <div className="grid grid-cols-4 gap-4 text-center">
 <div className="bg-primary/10 rounded-lg p-4">
 <div className="text-3xl md:text-5xl font-bold text-primary">{countdown.days}</div>
 <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Days</div>
 </div>
 <div className="bg-primary/10 rounded-lg p-4">
 <div className="text-3xl md:text-5xl font-bold text-primary">{countdown.hours}</div>
 <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Hours</div>
 </div>
 <div className="bg-primary/10 rounded-lg p-4">
 <div className="text-3xl md:text-5xl font-bold text-primary">{countdown.minutes}</div>
 <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Mins</div>
 </div>
 <div className="bg-primary/10 rounded-lg p-4">
 <div className="text-3xl md:text-5xl font-bold text-primary">{countdown.seconds}</div>
 <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Secs</div>
 </div>
 </div> : <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
 Enter your birthday to see the countdown
 </div>}
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Exact Age</CardTitle>
 </CardHeader>
 <CardContent>
 {age ? <div className="space-y-2 text-lg">
 <div className="flex justify-between border-b pb-2">
 <span className="text-muted-foreground">Years:</span>
 <span className="font-semibold">{age.years}</span>
 </div>
 <div className="flex justify-between border-b pb-2">
 <span className="text-muted-foreground">Months:</span>
 <span className="font-semibold">{age.months}</span>
 </div>
 <div className="flex justify-between pb-2">
 <span className="text-muted-foreground">Days:</span>
 <span className="font-semibold">{age.days}</span>
 </div>
 </div> : <div className="text-muted-foreground">Not born yet or date not set!</div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Fun Facts</CardTitle>
 </CardHeader>
 <CardContent>
 {birthday ? <div className="space-y-2 text-lg">
 <div className="flex justify-between border-b pb-2">
 <span className="text-muted-foreground">Zodiac:</span>
 <span className="font-semibold">{zodiac}</span>
 </div>
 <div className="flex justify-between border-b pb-2">
 <span className="text-muted-foreground">Birthstone:</span>
 <span className="font-semibold">{birthStone}</span>
 </div>
 <div className="flex justify-between pb-2">
 <span className="text-muted-foreground">Born on a:</span>
 <span className="font-semibold">{dayOfWeek}</span>
 </div>
 </div> : <div className="text-muted-foreground">Set your birthday to see facts!</div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>
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
          <h3>Why Use Our Birthday Countdown?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Birthday Countdown provides
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

      <RelatedTools currentToolUrl="/tools/time/birthday-countdown" max={6} />

    </div></div>;
}