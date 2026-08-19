import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExchangeTableClient from "@/components/tools/travel/exchange-table-client";

const TITLE = "Currency Exchange Rate Table | Toolzium";
const DESCRIPTION = "View live exchange rates for 40+ currencies in one table. Sort, filter, and convert any amount at real-time forex rates. Free.";
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
