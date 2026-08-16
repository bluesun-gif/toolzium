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

export default function GtaNamePage() {
  return (
    <><GtaNameClient />
      <RelatedTools currentToolUrl="/tools/gaming/gta-name-generator" />
    </>
  );
}
