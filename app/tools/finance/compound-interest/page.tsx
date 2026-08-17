import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CompoundInterestClient from "@/components/tools/finance/compound-interest-client";

const TITLE = "Compound Interest | Toolzium";
const DESCRIPTION = "Free online compound interest tool with instant calculation and privacy.";
const PATH = "/tools/finance/compound-interest";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Compound Interest",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CompoundInterestClient />
    </>
  );
}
