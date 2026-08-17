import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ConsultingAgreementClient from "@/components/tools/office/consulting-agreement-client";

const TITLE = "Consulting Services Agreement Generator | Toolzium";
const DESCRIPTION = "Generate formal Consulting Services & Client Engagement Contracts easily.";
const PATH = "/tools/office/consulting-agreement";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Consulting Services Agreement Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ConsultingAgreementClient />
    </>
  );
}
