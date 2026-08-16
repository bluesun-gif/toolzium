import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmailHeadersClient from "@/components/tools/network/email-headers-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Email Header Analyzer",
  description: "Analyze email headers to trace delivery path, check SPF/DKIM/DMARC authentication, and identify spam. Paste raw headers and see the full hop-by-hop route.",
  path: "/tools/network/email-headers",
  keywords: ["identify", "check", "dmarc", "spam", "headers", "email", "trace", "dkim", "path", "authentication", "delivery", "analyze"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Email Header Analyzer",
    description: "Analyze email headers to trace delivery path, check SPF/DKIM/DMARC authentication, and identify spam. Paste raw headers and see the full hop-by-hop route.",
    path: "/tools/network/email-headers",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <EmailHeadersClient />
    
      <RelatedTools currentToolUrl="/tools/network/email-headers" />
</div>
  );
}
