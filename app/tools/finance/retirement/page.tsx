import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RetirementClient from "@/components/tools/finance/retirement-client";

const TITLE = "Retirement Calculator | Toolzium";
const DESCRIPTION = "Calculate retirement savings projections. Find out total at retirement, monthly income, and more.";
const PATH = "/tools/finance/retirement";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Retirement Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RetirementClient />
    </>
  );
}
