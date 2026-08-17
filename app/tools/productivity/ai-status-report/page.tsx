import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiStatusReportClient from "@/components/tools/productivity/ai-status-report-client";

const TITLE = "AI Executive Weekly Status Report Generator | Toolzium";
const DESCRIPTION = "Convert weekly task notes, completed tickets, and blockers into structured executive status reports for stakeholders with live AI.";
const PATH = "/tools/productivity/ai-status-report";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Executive Weekly Status Report Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiStatusReportClient />
    </>
  );
}
