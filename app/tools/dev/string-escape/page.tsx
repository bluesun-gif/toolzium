import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StringEscapeClient from "@/components/tools/dev/string-escape-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "String Escape/Unescape",
  description: "Escape and unescape strings for HTML, URL, JavaScript, JSON, XML, SQL, CSS, Base64. Bidirectional conversion. Copy output instantly.",
  path: "/tools/dev/string-escape",
  keywords: ["output", "javascript", "escape", "bidirectional", "strings", "copy", "instantly", "unescape", "conversion", "html", "json"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "String Escape/Unescape",
    description: "Escape and unescape strings for HTML, URL, JavaScript, JSON, XML, SQL, CSS, Base64. Bidirectional conversion. Copy output instantly.",
    path: "/tools/dev/string-escape",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <StringEscapeClient />
    
      <RelatedTools currentToolUrl="/tools/dev/string-escape" />
</div>
  );
}
