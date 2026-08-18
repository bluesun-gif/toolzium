import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DicewarePasswordClient from "@/components/tools/dev/password-generator-client";

const TITLE = "Password Generator — Secure Random Password & Passphrase Generator | Toolzium";
const DESCRIPTION =
  "Generate ultra-secure, cryptographically random passwords and Diceware passphrases online for free. Choose word count, separator, capitalization, and append numbers. Calculates entropy bits and crack time estimate. 100% client-side — your passwords are never sent to any server.";
const PATH = "/tools/dev/password-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Password Generator",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DicewarePasswordClient />
    </>
  );
}
