import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiStatusReportClient from "@/components/tools/productivity/ai-status-report-client";
export const metadata: Metadata = {
  title: "AI Executive Weekly Status Report Generator | Toolzium",
  description:
    "Convert weekly task notes, completed tickets, and blockers into structured executive status reports for stakeholders with live AI.",
};

export default function AiStatusReportPage() {
  return (
    <><AiStatusReportClient />
      <RelatedTools currentToolUrl="/tools/productivity/ai-status-report" />
    </>
  );
}
