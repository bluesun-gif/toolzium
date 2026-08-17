import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import QuoteGeneratorClient from "@/components/tools/office/quote-generator-client";

const TITLE = "Price Quotation & Estimate Generator | Toolzium";
const DESCRIPTION = "Create and generate professional price quotes and business estimates quickly. Add items, apply taxes, and manage terms effortlessly.";
const PATH = "/tools/office/quote-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Price Quotation & Estimate Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <QuoteGeneratorClient />
    </>
  );
}
