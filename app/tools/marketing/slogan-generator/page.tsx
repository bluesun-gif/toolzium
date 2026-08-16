import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SloganGeneratorClient from "@/components/tools/marketing/slogan-generator-client";
<<<<<<< HEAD
export const metadata: Metadata = {
  title: "AI Product Slogan & Brand Tagline Generator | Toolzium",
  description:
    "Brainstorm memorable brand slogans, catchy product taglines, and marketing motto ideas with live AI inference.",
};

export default function SloganGeneratorPage() {
  return (
    <><SloganGeneratorClient />
      <RelatedTools currentToolUrl="/tools/marketing/slogan-generator" />
    </>
=======

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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
