import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmailSignatureClient from "@/components/tools/office/email-signature-client";

const TITLE = "Email Signature Generator | Toolzium";
const DESCRIPTION = "Create professional HTML email signatures with social links, custom colors, and templates.";
const PATH = "/tools/office/email-signature";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Email Signature Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmailSignatureClient />
    </>
  );
}
