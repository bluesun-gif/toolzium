import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SloganGeneratorClient from "@/components/tools/marketing/slogan-generator-client";

export const metadata = buildMetadata({
  title: "AI Product Slogan & Brand Tagline Generator",
  description: "Brainstorm memorable brand slogans, catchy product taglines, and marketing motto ideas with live AI inference.",
  path: "/tools/marketing/slogan-generator",
  keywords: ["memorable", "brainstorm", "product", "with", "ideas", "marketing", "motto", "brand", "catchy", "slogans", "live", "taglines"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Product Slogan & Brand Tagline Generator",
    description: "Brainstorm memorable brand slogans, catchy product taglines, and marketing motto ideas with live AI inference.",
    path: "/tools/marketing/slogan-generator",
    categoryName: "Marketing",
    categoryPath: "/tools/marketing",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SloganGeneratorClient />
    </div>
  );
}
