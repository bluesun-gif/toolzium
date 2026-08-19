import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PhoneticPasswordClient from "@/components/tools/util/phonetic-password-nato-client";

const TITLE = "Phonetic Password + NATO Reader | Toolzium";
const DESCRIPTION = "Generate strong passwords and immediately see them in NATO phonetic spelling. Dictate passwords verbally without errors. Free.";
const PATH = "/tools/util/phonetic-password-nato";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Phonetic Password Generator & NATO Guide",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PhoneticPasswordClient />
    </>
  );
}
