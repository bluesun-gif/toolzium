import { GridPattern } from "@/components/magicui/grid-pattern";

/**
 * ToolBackground — shared ambient layer for all tool pages.
 * Multi-layer: grid pattern → radial center scrim → ambient color orbs.
 * Place as the FIRST child of a `relative` tool root container.
 */
export function ToolBackground() {
  return (
    <>
      {/* Layer 1: Grid pattern — brand identity texture */}
      <GridPattern className="[&>rect]:stroke-muted-foreground/8 [&>svg]:opacity-50" />

      {/* Layer 2: Center readability scrim — fades grid behind text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,
            hsl(var(--background)/0.92),
            hsl(var(--background)/0.70)_55%,
            hsl(var(--background)/0.30)_100%)]"
      />

      {/* Layer 3: Ambient color orbs — subtle purple/blue glow in corners */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-20 inset-0 overflow-hidden"
      >
        {/* Top-right warm orb */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full
          bg-primary/6 blur-3xl opacity-60 dark:opacity-40" />
        {/* Bottom-left cool orb */}
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full
          bg-primary/5 blur-3xl opacity-40 dark:opacity-30" />
        {/* Center subtle accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-48
          bg-primary/4 blur-3xl opacity-30 dark:opacity-20 rounded-full" />
      </div>
    </>
  );
}
