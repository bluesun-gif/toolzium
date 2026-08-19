import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NatoPhoneticPasswordClient from "@/components/tools/util/nato-phonetic-password-client";

const TITLE = "NATO Phonetic Alphabet Converter | Toolzium";
const DESCRIPTION = "Convert any text to NATO phonetic alphabet — Alpha, Bravo, Charlie. Perfect for verbally communicating passwords, codes, and serial numbers. Free.";
const PATH = "/tools/util/nato-phonetic-password";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "NATO Phonetic Password Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NatoPhoneticPasswordClient />
    </>
  );
}
