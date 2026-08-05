"use client";

import * as React from "react";

export function Progress({
  value = 0,
  className = "",
}: {
  value?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-full bg-primary/20 ${className}`}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}
