import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ShortenerClient from "@/components/tools/url/shortener-client";

const TITLE = "Safe Link Preview";
const DESCRIPTION = "Preview this link before continuing. Tools Cube helps protect you from potentially harmful links.";
const PATH = "/tools/url/shortener/interstitial/[id]";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Safe Link Preview",
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
