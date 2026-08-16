import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmailSubjectGeneratorClient from "@/components/tools/writing/email-subject-generator-client";
<<<<<<< HEAD
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
=======

export const metadata = buildMetadata({
  title: "AI High Open-Rate Email Subject Line Generator",
  description: "Generate irresistible email subject lines for newsletter campaigns, sales outreach, and promotional announcements powered by live AI.",
  path: "/tools/writing/email-subject-generator",
  keywords: ["campaigns", "sales", "irresistible", "generate", "powered", "promotional", "email", "announcements", "subject", "lines", "newsletter", "outreach"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI High Open-Rate Email Subject Line Generator",
    description: "Generate irresistible email subject lines for newsletter campaigns, sales outreach, and promotional announcements powered by live AI.",
    path: "/tools/writing/email-subject-generator",
    categoryName: "Writing",
    categoryPath: "/tools/writing",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <EmailSubjectGeneratorClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
