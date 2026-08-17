import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ShortenerClient from "@/components/tools/url/shortener-client";

const TITLE = "URL Shortener";
const DESCRIPTION = "Create short, custom URLs with analytics. Free link shortener with QR codes, click tracking, and custom slugs. Perfect for social media, marketing campaigns, and link management.";
const PATH = "/tools/url/shortener";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "URL Shortener",
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
