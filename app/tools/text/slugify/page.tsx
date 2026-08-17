import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SlugifyClient from "@/components/tools/text/slugify-client";

const TITLE = "Slugify | Toolzium";
const DESCRIPTION = "Free online slugify tool with instant calculation and privacy.";
const PATH = "/tools/text/slugify";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Slugify",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SlugifyClient />
    </>
  );
}
