import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssGridClient from "@/components/tools/dev/css-grid-client";

export const metadata = buildMetadata({
  title: "CSS Grid Generator",
  description: "Visual CSS Grid layout generator. Set columns, rows, gap. Define grid-template with fr, px, auto. Span cells. Generate and copy CSS.",
  path: "/tools/dev/css-grid",
  keywords: ["columns", "with", "visual", "rows", "generator", "layout", "template", "grid", "auto", "span", "define"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Grid Generator",
    description: "Visual CSS Grid layout generator. Set columns, rows, gap. Define grid-template with fr, px, auto. Span cells. Generate and copy CSS.",
    path: "/tools/dev/css-grid",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CssGridClient />
    </div>
  );
}
