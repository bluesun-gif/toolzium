import type * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Layout
        "flex min-h-[80px] w-full rounded-lg border px-3 py-2.5 text-sm",
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
        // Focus
        "outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30",
        // Hover
        "hover:border-ring/50",
        // Resize
        "resize-y",
        // Line height for readability
        "leading-relaxed",
        // Invalid
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
