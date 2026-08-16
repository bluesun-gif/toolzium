import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import GtaNameClient from "@/components/tools/gaming/gta-name-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "GTA V License Plate & Crew Name Studio",
  description: "Generate badass GTA Online crew names, NoPixel RP gang tags, and custom vanity license plates with live AI inference.",
  path: "/tools/gaming/gta-name-generator",
  keywords: ["plates", "generate", "crew", "names", "custom", "vanity", "online", "badass", "gang", "nopixel", "tags", "license"],
});

<<<<<<< HEAD
export default function GtaNamePage() {
  return (
    <><GtaNameClient />
      <RelatedTools currentToolUrl="/tools/gaming/gta-name-generator" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "GTA V License Plate & Crew Name Studio",
    description: "Generate badass GTA Online crew names, NoPixel RP gang tags, and custom vanity license plates with live AI inference.",
    path: "/tools/gaming/gta-name-generator",
    categoryName: "Gaming",
    categoryPath: "/tools/gaming",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <GtaNameClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
