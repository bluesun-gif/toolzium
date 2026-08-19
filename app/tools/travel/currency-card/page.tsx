import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurrencyCardClient from "@/components/tools/travel/currency-card-client";

const TITLE = "Currency Card | Toolzium";
const DESCRIPTION = "Create a travel currency card with live exchange rates for up to 10 currencies. Screenshot and take it offline. Free, real-time rates.";
const PATH = "/tools/travel/currency-card";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Quick Reference Card",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CurrencyCardClient />
    </>
  );
}
