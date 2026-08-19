import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PasswordEntropyClient from "@/components/tools/util/password-entropy-client";

const TITLE = "Password Entropy Calculator | Toolzium";
const DESCRIPTION = "Calculate the true entropy of any password in bits. See crack time estimates and get smart suggestions to improve password strength. Free.";
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
