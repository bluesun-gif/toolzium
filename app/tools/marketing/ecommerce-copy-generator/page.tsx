import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EcommerceCopyGeneratorClient from "@/components/tools/marketing/ecommerce-copy-generator-client";

const TITLE = "Shopify & Amazon Product Listing AI Copy Generator";
const DESCRIPTION = "Generate high-converting Amazon product bullet points, Shopify descriptions, and high-search SEO product titles with live AI.";
const PATH = "/tools/marketing/ecommerce-copy-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Shopify & Amazon Product Listing AI Copy Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EcommerceCopyGeneratorClient />
    </>
  );
}
