import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SvgOptimizerClient from "@/components/tools/dev/svg-optimizer-client";
export const metadata = {
  title: "SVG Vector Path Optimizer & React JSX Minifier Studio | Toolzium",
  description: "Clean up SVG code, remove comments, minify vector paths, and convert raw SVG code into production-ready React/TypeScript JSX components.",
  path: "/tools/dev/svg-optimizer",
  keywords: ["paths", "into", "minify", "convert", "production", "comments", "clean", "remove", "vector", "ready", "code"],
});

export default function SvgOptimizerPage() {
  return (
    <><SvgOptimizerClient />
      <RelatedTools currentToolUrl="/tools/dev/svg-optimizer" />
    </>
  );
}
