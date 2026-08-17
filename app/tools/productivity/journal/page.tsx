import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JournalClient from "@/components/tools/productivity/journal-client";

const TITLE = "Daily Journal | Toolzium";
const DESCRIPTION = "Simple daily journal with mood tracking and date navigation.";
const PATH = "/tools/productivity/journal";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Daily Journal",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JournalClient />
    </>
  );
}
