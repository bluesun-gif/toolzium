import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExchangeHistoryClient from "@/components/tools/travel/exchange-history-client";

const TITLE = "Currency Exchange History | Toolzium";
const DESCRIPTION = "View historical exchange rates for any currency pair. Interactive chart with custom date ranges — find the best time to exchange money. Free.";
const PATH = "/tools/travel/exchange-history";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Exchange Rate History",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExchangeHistoryClient />
    </>
  );
}
