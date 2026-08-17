import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PasswordStrengthClient from "@/components/tools/text/password-strength-client";

const TITLE = "Password Strength | Toolzium";
const DESCRIPTION = "Free online password strength tool with instant calculation and privacy.";
const PATH = "/tools/text/password-strength";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Password Strength",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PasswordStrengthClient />
    </>
  );
}
