"use client";

import React from "react";

interface AdSlotProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "vertical" | "auto" | "leaderboard";
  className?: string;
  title?: string;
}

export function AdSlot({
  slotId = "default-slot",
  format = "horizontal",
  className = "",
  title = "Advertisement",
}: AdSlotProps) {
  // Height presets based on ad format standard sizes
  const heightClasses = {
    horizontal: "min-h-[90px] sm:min-h-[100px]",
    rectangle: "min-h-[250px] max-w-[336px]",
    vertical: "min-h-[600px] max-w-[300px]",
    leaderboard: "min-h-[90px] max-w-[728px]",
    auto: "min-h-[90px] sm:min-h-[120px]",
  }[format];

  return (
    <div
      className={`my-6 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/60 bg-muted/20 p-3 text-center transition-all ${heightClasses} ${className}`}
      data-ad-slot={slotId}
      data-ad-format={format}
    >
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/80 mb-1">
        <span>{title}</span>
      </div>

      {/* Auto-Ads / Ezoic / AdSense Injection Container */}
      <div className="w-full flex-1 flex items-center justify-center text-xs text-muted-foreground">
        <span className="font-mono text-xs text-muted-foreground/80">
          Ezoic / AdSense Responsive Container • Slot: {slotId}
        </span>
      </div>
    </div>
  );
}

export default AdSlot;
