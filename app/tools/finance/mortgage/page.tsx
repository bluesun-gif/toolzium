import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MortgageClient from "@/components/tools/finance/mortgage-client";

const TITLE = "Mortgage Calculator | Toolzium";
const DESCRIPTION = "Calculate your monthly mortgage payment, see amortization schedules, and understand total home loan costs.";
const PATH = "/tools/finance/mortgage";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Mortgage Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MortgageClient />
    </>
  );
}
