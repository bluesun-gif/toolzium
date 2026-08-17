import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import QuoteGeneratorClient from "@/components/tools/fun/quote-generator-client";

const TITLE = "Quote Generator | Toolzium";
const DESCRIPTION = "Free online quote generator tool with instant calculation and privacy.";
const PATH = "/tools/fun/quote-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Quote Generator",
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
