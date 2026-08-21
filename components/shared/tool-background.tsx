import { GridPattern } from "@/components/magicui/grid-pattern";

/**
 * ToolBackground — shared ambient layer for all tool pages.
 * Multi-layer: grid pattern → radial center scrim → ambient color orbs.
 * Place as the FIRST child of a `relative` tool root container.
 */
export function ToolBackground() {
  return (
    <>
      {/* Layer 1: Grid pattern with smooth center fade */}
      <GridPattern className="pointer-events-none absolute inset-0 h-full w-full stroke-border/25 fill-transparent [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,transparent_10%,black_100%)] opacity-60" />

      {/* Layer 2: Center readability scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-[at_50%_20%] from-background/40 via-background/80 to-background"
      />

      {/* Layer 3: Ambient color orbs — subtle purple glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-20 inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-50 dark:opacity-30" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-primary/5 blur-3xl opacity-30 dark:opacity-20" />
      </div>
    </>
  );
}
