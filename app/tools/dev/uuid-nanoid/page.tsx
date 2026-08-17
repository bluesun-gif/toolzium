import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UuidNanoidClient from "@/components/tools/dev/uuid-nanoid-client";

const TITLE = "Uuid Nanoid | Toolzium";
const DESCRIPTION = "Free online uuid nanoid tool with instant calculation and privacy.";
const PATH = "/tools/dev/uuid-nanoid";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Uuid Nanoid",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <UuidNanoidClient />
    </>
  );
}
