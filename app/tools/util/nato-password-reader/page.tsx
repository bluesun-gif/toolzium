import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NatoPasswordReaderClient from "@/components/tools/util/nato-password-reader-client";

const TITLE = "NATO Password Generator & Phonetic Reader | Toolzium";
const DESCRIPTION = "Generate secure passwords with NATO phonetic spelling guides for easy reading.";
const PATH = "/tools/util/nato-password-reader";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "NATO Password Generator & Phonetic Reader",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NatoPasswordReaderClient />
    </>
  );
}
