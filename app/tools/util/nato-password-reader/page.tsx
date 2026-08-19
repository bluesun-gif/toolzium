import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NatoPasswordReaderClient from "@/components/tools/util/nato-password-reader-client";

const TITLE = "NATO Phonetic Password Reader | Toolzium";
const DESCRIPTION = "Convert any password or code to NATO phonetic alphabet for clear verbal communication. Alpha, Bravo, Charlie — no more confusion. Free.";
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
