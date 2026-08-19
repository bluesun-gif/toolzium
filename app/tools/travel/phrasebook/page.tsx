import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PhrasebookClient from "@/components/tools/travel/phrasebook-client";

const TITLE = "Travel Phrasebook | Toolzium";
const DESCRIPTION = "Essential travel phrases in 50+ languages with audio pronunciation. Browse offline — perfect for travel without internet access. Free.";
const PATH = "/tools/travel/phrasebook";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Phrasebook",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PhrasebookClient />
    </>
  );
}
