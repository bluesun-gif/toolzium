import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import GtaNameClient from "@/components/tools/gaming/gta-name-client";

const TITLE = "GTA V License Plate & Crew Name Studio";
const DESCRIPTION = "Generate badass GTA Online crew names, NoPixel RP gang tags, and custom vanity license plates with live AI inference.";
const PATH = "/tools/gaming/gta-name-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "GTA V License Plate & Crew Name Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <GtaNameClient />
    </>
  );
}
