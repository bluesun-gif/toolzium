import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RetainerAgreementClient from "@/components/tools/office/retainer-agreement-client";

const TITLE = "Professional Service Retainer Agreement Generator | Toolzium";
const DESCRIPTION = "Generate formal Monthly Service Retainer Contracts for freelancers & agencies.";
const PATH = "/tools/office/retainer-agreement";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Professional Service Retainer Agreement Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RetainerAgreementClient />
    </>
  );
}
