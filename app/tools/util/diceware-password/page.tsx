import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DicewarePasswordClient from "@/components/tools/util/diceware-password-client";

const TITLE = "Diceware Passphrase Generator | Toolzium";
const DESCRIPTION = "Generate secure, memorable Diceware passphrases using the EFF wordlist. Cryptographically random — impossible to brute force, easy to remember. Free.";
const PATH = "/tools/util/diceware-password";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Diceware Wordlist Passphrase Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DicewarePasswordClient />
    </>
  );
}
