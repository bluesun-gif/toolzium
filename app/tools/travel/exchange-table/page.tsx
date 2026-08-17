import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExchangeTableClient from "@/components/tools/travel/exchange-table-client";

const TITLE = "Currency Exchange Comparison Table | Toolzium";
const DESCRIPTION = "Quick currency exchange conversion reference table for traveler pockets.";
const PATH = "/tools/travel/exchange-table";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Exchange Comparison Table",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExchangeTableClient />
    </>
  );
}
