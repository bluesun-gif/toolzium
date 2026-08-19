import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import OfflineCurrencyClient from "@/components/tools/travel/offline-currency-client";

const TITLE = "Offline Currency Converter | Toolzium";
const DESCRIPTION = "Save exchange rates for offline use — perfect for travel in areas without internet. Convert currencies anywhere, anytime. Free.";
const PATH = "/tools/travel/offline-currency";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Offline Currency Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <OfflineCurrencyClient />
    </>
  );
}
