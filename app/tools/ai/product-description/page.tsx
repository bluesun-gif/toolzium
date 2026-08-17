import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ProductDescriptionClient from "@/components/tools/ai/product-description-client";

const TITLE = "AI E-Commerce Product Description Generator — Shopify & Amazon Copy | Toolzium";
const DESCRIPTION = "Free AI product description generator. Instantly create high-converting SEO product titles, Amazon bullet points, benefit hooks, and meta tags for Shopify, Amazon, Etsy, and WooCommerce.";
const PATH = "/tools/ai/product-description";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI E-Commerce Product Description Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProductDescriptionClient />
    </>
  );
}
