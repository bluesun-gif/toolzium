import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ClipboardCleanerClient from "@/components/tools/util/clipboard-cleaner-client";

const TITLE = "Clipboard Cleaner | Toolzium";
const DESCRIPTION = "Free online clipboard cleaner tool with instant calculation and privacy.";
const PATH = "/tools/util/clipboard-cleaner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Clipboard Cleaner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ClipboardCleanerClient />
    </>
  );
}
