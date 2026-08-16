import { GridPattern } from "@/components/magicui/grid-pattern";

/**
 * ToolBackground — shared ambient layer for all tool pages.
 * Renders the signature grid-pattern, then a soft radial scrim so centered
 * content stays readable while the grid remains visible at the edges.
 * Place as the FIRST child of a `relative` tool root container.
 *
 * Softened for reading comfort: the grid is theme-tinted and faint, the
 * scrim is strong enough to fade it out behind text (so sharp lines never
 * compete with reading), and a gentle blur keeps residual lines from being
 * harsh. Brand identity is preserved at the page edges.
 */
export function ToolBackground() {
  return (
    <>
      <GridPattern className="[&>rect]:stroke-muted-foreground/10 [&>svg]:opacity-60" />
      {/* Soft scrim: strong center tint so text has a calm, readable surface
          while the grid survives only at the edges (brand identity). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_65%_at_50%_25%,hsl(var(--background)/0.85),hsl(var(--background)/0.55)_60%,hsl(var(--background)/0.25)_100%)] blur-[1px]"
      />
    </>
  );
}
