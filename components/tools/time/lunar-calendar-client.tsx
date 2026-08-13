"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Moon, Calendar, ChevronLeft, ChevronRight, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function LunarCalendarClient() {
 const [currentDate, setCurrentDate] = useState(new Date());

 const getMoonPhase = (year: number, month: number, day: number) => {
 let c = 0;
 let e = 0;
 let jd = 0;
 let b = 0;
 
 if (month < 3) {
 year--;
 month += 12;
 }
 
 ++month;
 c = 365.25 * year;
 e = 30.6 * month;
 jd = c + e + day - 694039.09;
 jd /= 29.5305882;
 b = jd | 0;
 jd -= b;
 b = Math.round(jd * 8);
 if (b >= 8) b = 0;
 
 const phases = [
 { name:"New Moon", emoji:"🌑"},
 { name:"Waxing Crescent", emoji:"🌒"},
 { name:"First Quarter", emoji:"🌓"},
 { name:"Waxing Gibbous", emoji:"🌔"},
 { name:"Full Moon", emoji:"🌕"},
 { name:"Waning Gibbous", emoji:"🌖"},
 { name:"Last Quarter", emoji:"🌗"},
 { name:"Waning Crescent", emoji:"🌘"}
 ];
 return phases[b];
 };

 const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
 const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
 
 const handlePrevMonth = () => {
 setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
 };
 
 const handleNextMonth = () => {
 setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
 };

 const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

 const days = [];
 for (let i = 0; i < firstDay; i++) {
 days.push(null);
 }
 for (let i = 1; i <= daysInMonth; i++) {
 days.push(i);
 }

 const todayPhase = getMoonPhase(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

 return (
 <div className={"space-y-6"}>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Moon}
 title="Lunar Calendar"
 description="Calculate and view moon phases."
 />

 <GlassCard>
 <CardHeader className={"flex flex-col md:flex-row items-center justify-between gap-4"}>
 <CardTitle>Moon Phases</CardTitle>
 <div className={"flex items-center gap-4"}>
 <Button variant="outline"size="icon"onClick={handlePrevMonth}>
 <ChevronLeft className={"w-4 h-4"} />
 </Button>
 <span className={"font-medium text-lg w-40 text-center"}>
 {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
 </span>
 <Button variant="outline"size="icon"onClick={handleNextMonth}>
 <ChevronRight className={"w-4 h-4"} />
 </Button>
 </div>
 </CardHeader>
 <Separator />
 <CardContent className={"pt-6"}>
 <div className={"mb-6 p-4 bg-muted/50 rounded-lg text-center"}>
 <h3 className={"text-lg font-medium mb-2"}>Today's Phase</h3>
 <div className={"text-4xl mb-2"}>{todayPhase.emoji}</div>
 <p>{todayPhase.name}</p>
 </div>
 
 <div className={"grid grid-cols-7 gap-2 text-center mb-2 font-medium"}>
 <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
 </div>
 <div className={"grid grid-cols-7 gap-2"}>
 {days.map((day, idx) => {
 if (!day) return <div key={"empty-"+ idx} className={"p-2"} />;
 const phase = getMoonPhase(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
 return (
 <div key={"day-"+ day} className={"p-2 border rounded-md flex flex-col items-center gap-1 hover:bg-muted/50 transition-colors"}>
 <span className={"text-sm text-muted-foreground"}>{day}</span>
 <span className={"text-2xl"} title={phase.name}>{phase.emoji}</span>
 </div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>
 
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
          <h3>Why Use Our phase.name?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our phase.name provides
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

      <RelatedTools currentToolUrl="/tools/time/lunar-calendar" max={6} />

</div>
 );
}
