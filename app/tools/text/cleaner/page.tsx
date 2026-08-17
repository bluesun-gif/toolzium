import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextCleanerClient from "@/components/tools/text/text-cleaner-client";

const TITLE = "Cleaner | Toolzium";
const DESCRIPTION = "Free online cleaner tool with instant calculation and privacy.";
const PATH = "/tools/text/cleaner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Cleaner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TextCleanerClient />
    </>
  );
}
