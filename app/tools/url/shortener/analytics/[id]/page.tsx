import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ShortenerClient from "@/components/tools/url/shortener-client";

const TITLE = "Link Analytics Dashboard";
const DESCRIPTION = "View detailed analytics for your shortened links including clicks, referrers, countries, and trends over time.";
const PATH = "/tools/url/shortener/analytics/[id]";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Link Analytics Dashboard",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ShortenerClient />
    </>
  );
}
