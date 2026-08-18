import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Layout & sizing
        "flex h-9 w-full min-w-0 rounded-lg border px-3 py-1 text-sm",
        // Colors — light mode
        "border-input bg-background text-foreground",
        // Colors — dark mode
        "dark:bg-input/20 dark:border-input/60 dark:text-foreground",
        // Placeholder
        "placeholder:text-muted-foreground/60",
        // Selection
        "selection:bg-primary selection:text-primary-foreground",
        // Shadow & transition
        "shadow-xs transition-[color,box-shadow,border-color] duration-150",
        // Focus ring
        "outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30",
        // Hover
        "hover:border-ring/50",
        // File input
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Invalid
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Number input — no spinners for cleanliness (handled in globals.css)
        type === "number" && "font-mono tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
