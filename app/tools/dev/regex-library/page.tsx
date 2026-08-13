import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RegexLibraryClient from "@/components/tools/dev/regex-library-client";

export const metadata = buildMetadata({
  title: "Regex Library",
  description: "Collection of useful regular expression patterns for email, URL, phone, credit card validation, and more. Ready-to-use regex patterns with explanations and test cases.",
  path: "/tools/dev/regex-library",
  keywords: ["expression", "useful", "credit", "validation", "card", "more", "regular", "email", "ready", "patterns", "phone", "collection"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Regex Library",
    description: "Collection of useful regular expression patterns for email, URL, phone, credit card validation, and more. Ready-to-use regex patterns with explanations and test cases.",
    path: "/tools/dev/regex-library",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <RegexLibraryClient />
    </div>
  );
}
