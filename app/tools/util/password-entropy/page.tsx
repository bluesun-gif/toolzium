import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PasswordEntropyClient from "@/components/tools/util/password-entropy-client";

const TITLE = "Password Strength & Entropy Calculator | Toolzium";
const DESCRIPTION = "Analyze password security, information entropy (bits), and estimated crack time.";
const PATH = "/tools/util/password-entropy";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Password Strength & Entropy Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PasswordEntropyClient />
    </>
  );
}
