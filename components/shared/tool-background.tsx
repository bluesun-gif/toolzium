import { GridPattern } from "@/components/magicui/grid-pattern";

/**
 * ToolBackground — shared ambient layer for all tool pages.
 * Renders the signature grid-pattern, then a soft radial scrim so centered
 * content stays readable while the grid remains visible at the edges.
 * Place as the FIRST child of a `relative` tool root container.
 */
export function ToolBackground() {
  return (
    <>
      <GridPattern />
      {/* Soft scrim: light tint so text has a readable surface, while the grid
          stays clearly visible (brand identity). Sits above grid but below content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_30%,hsl(var(--background)/0.55),hsl(var(--background)/0.25)_75%,transparent_100%)]"
      />
    </>
  );
}
