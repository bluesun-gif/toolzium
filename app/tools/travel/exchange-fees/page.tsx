import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExchangeFeesClient from "@/components/tools/travel/exchange-fees-client";

const TITLE = "Currency Exchange Fee Calculator | Toolzium";
const DESCRIPTION = "Calculate currency exchange fees and compare true costs including hidden markup. Find the cheapest way to exchange money for travel. Free.";
const PATH = "/tools/travel/exchange-fees";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Exchange Fee & Hidden Markup Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExchangeFeesClient />
    </>
  );
}
