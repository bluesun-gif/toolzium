import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RegexTesterClient from "@/components/tools/dev/regex-tester-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Regex Tester",
  description: "Test and debug regular expressions online with real-time matching. RegEx tester with syntax highlighting, match groups, and test cases. Support for JavaScript, Python, PHP regex patterns.",
  path: "/tools/dev/regex-tester",
  keywords: ["debug", "with", "matching", "time", "expressions", "online", "test", "regular", "real", "tester", "regex"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Regex Tester",
    description: "Test and debug regular expressions online with real-time matching. RegEx tester with syntax highlighting, match groups, and test cases. Support for JavaScript, Python, PHP regex patterns.",
    path: "/tools/dev/regex-tester",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <RegexTesterClient />
    
      <RelatedTools currentToolUrl="/tools/dev/regex-tester" />
</div>
  );
}
