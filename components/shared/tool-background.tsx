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
      <GridPattern className="absolute inset-0 -z-20 opacity-70 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_35%,transparent_45%,white_100%)]" />
      {/* Soft scrim (research-best: gradient overlay dims grid behind text,
          keeps grid visible at edges). Sits above grid (-z-20) but below content (z-10). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_65%_at_50%_30%,hsl(var(--background)/0.85),hsl(var(--background)/0.4)_70%,transparent_100%)]"
      />
    </>
  );
}
