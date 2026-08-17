import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PhoneticPasswordClient from "@/components/tools/util/phonetic-password-client";

const TITLE = "Phonetic Pronunciation Password Generator | Toolzium";
const DESCRIPTION = "Generate strong, memorable passwords with NATO phonetic pronunciation guides.";
const PATH = "/tools/util/phonetic-password";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Phonetic Pronunciation Password Generator",
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
