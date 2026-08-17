import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SitemapGeneratorClient from "@/components/tools/seo/sitemap-generator-client";

const TITLE = "Sitemap Generator | Toolzium";
const DESCRIPTION = "Free online sitemap generator tool with instant calculation and privacy.";
const PATH = "/tools/seo/sitemap-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sitemap Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SitemapGeneratorClient />
    </>
  );
}
