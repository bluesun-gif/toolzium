import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurrencyCardClient from "@/components/tools/travel/currency-card-client";

const TITLE = "Currency Quick Reference Card | Toolzium";
const DESCRIPTION = "Generate a pocket-sized printable travel currency conversion cheat card.";
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
