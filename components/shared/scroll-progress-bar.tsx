"use client";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export function ScrollProgressBar() {
  return (
    <ScrollProgress
      className="fixed top-0 left-0 z-[999] h-[3px] [background:linear-gradient(to_right,hsl(var(--primary)),oklch(0.7_0.2_292))]"
    />
  );
}
