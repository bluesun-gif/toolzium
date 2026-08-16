import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SvgOptimizerClient from "@/components/tools/dev/svg-optimizer-client";
<<<<<<< HEAD
export const metadata = {
=======

export const metadata = buildMetadata({
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  title: "SVG Vector Path Optimizer & React JSX Minifier Studio | Toolzium",
  description: "Clean up SVG code, remove comments, minify vector paths, and convert raw SVG code into production-ready React/TypeScript JSX components.",
  path: "/tools/dev/svg-optimizer",
  keywords: ["paths", "into", "minify", "convert", "production", "comments", "clean", "remove", "vector", "ready", "code"],
});

<<<<<<< HEAD
export default function SvgOptimizerPage() {
  return (
    <><SvgOptimizerClient />
      <RelatedTools currentToolUrl="/tools/dev/svg-optimizer" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SVG Vector Path Optimizer & React JSX Minifier Studio",
    description: "Clean up SVG code, remove comments, minify vector paths, and convert raw SVG code into production-ready React/TypeScript JSX components.",
    path: "/tools/dev/svg-optimizer",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SvgOptimizerClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
