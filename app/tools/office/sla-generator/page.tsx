import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SlaGeneratorClient from "@/components/tools/office/sla-generator-client";

const TITLE = "SLA (Service Level Agreement) Document Generator | Toolzium";
const DESCRIPTION = "Generate formal Service Level Agreement (SLA) contracts with customizable uptime, response times, and penalties.";
const PATH = "/tools/office/sla-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SLA (Service Level Agreement) Document Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SlaGeneratorClient />
    </>
  );
}
