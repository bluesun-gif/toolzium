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
      {/* Soft scrim: strong behind the central content column, fades to transparent
          at the edges so the grid pattern stays visible around the periphery. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_35%,hsl(var(--background)/0.82),hsl(var(--background)/0.35)_75%,transparent_100%)]"
      />
    </>
  );
}
