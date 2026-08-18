import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CompoundInterestClient from "@/components/tools/finance/compound-interest-client";

const TITLE = "Compound Interest Calculator — Investment Growth & Schedule | Toolzium";
const DESCRIPTION = "Free compound interest calculator. Calculate future portfolio value with monthly contributions, compounding frequencies, inflation adjustments, and exportable year-by-year schedule tables.";
const PATH = "/tools/finance/compound-interest";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Compound Interest Calculator",
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
