import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiscountFinderClient from "@/components/tools/calc/discount-finder-client";

const TITLE = "Discount | Toolzium";
const DESCRIPTION = "Free online discount tool with instant calculation and privacy.";
const PATH = "/tools/calc/discount";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Discount",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DiscountFinderClient />
    </>
  );
}
