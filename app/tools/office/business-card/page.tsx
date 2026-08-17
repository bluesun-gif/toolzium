import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BusinessCardClient from "@/components/tools/office/business-card-client";

const TITLE = "Business Card Generator | Toolzium";
const DESCRIPTION = "Design and generate custom digital business cards with QR codes and download as PNG.";
const PATH = "/tools/office/business-card";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Business Card Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BusinessCardClient />
    </>
  );
}
