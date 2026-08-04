"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Moon, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

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
      { name: "New Moon", emoji: "🌑" },
      { name: "Waxing Crescent", emoji: "🌒" },
      { name: "First Quarter", emoji: "🌓" },
      { name: "Waxing Gibbous", emoji: "🌔" },
      { name: "Full Moon", emoji: "🌕" },
      { name: "Waning Gibbous", emoji: "🌖" },
      { name: "Last Quarter", emoji: "🌗" },
      { name: "Waning Crescent", emoji: "🌘" }
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

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
      <ToolPageHeader
        icon={Moon}
        title="Lunar Calendar"
        description="Calculate and view moon phases."
      />

      <GlassCard>
        <CardHeader className={"flex flex-col md:flex-row items-center justify-between gap-4"}>
          <CardTitle>Moon Phases</CardTitle>
          <div className={"flex items-center gap-4"}>
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className={"w-4 h-4"} />
            </Button>
            <span className={"font-medium text-lg w-40 text-center"}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
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
              if (!day) return <div key={"empty-" + idx} className={"p-2"} />;
              const phase = getMoonPhase(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
              return (
                <div key={"day-" + day} className={"p-2 border rounded-md flex flex-col items-center gap-1 hover:bg-muted/50 transition-colors"}>
                  <span className={"text-sm text-muted-foreground"}>{day}</span>
                  <span className={"text-2xl"} title={phase.name}>{phase.emoji}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
