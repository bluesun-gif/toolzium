import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmailSubjectGeneratorClient from "@/components/tools/writing/email-subject-generator-client";
export const metadata: Metadata = {
  title: "AI High Open-Rate Email Subject Line Generator | Toolzium",
  description:
    "Generate irresistible email subject lines for newsletter campaigns, sales outreach, and promotional announcements powered by live AI.",
};

export default function EmailSubjectGeneratorPage() {
  return (
    <><EmailSubjectGeneratorClient />
      <RelatedTools currentToolUrl="/tools/writing/email-subject-generator" />
    </>
  );
}
