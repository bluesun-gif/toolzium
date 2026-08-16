import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ApiTesterClient from "@/components/tools/dev/api-tester-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "API Request Tester",
  description: "Test REST API endpoints without Postman. Send GET, POST, PUT, DELETE requests with custom headers, body, and authentication. Free online API testing tool for developers.",
  path: "/tools/dev/api-tester",
  keywords: ["delete", "requests", "with", "endpoints", "without", "test", "postman", "headers", "post", "send", "custom", "rest"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "API Request Tester",
    description: "Test REST API endpoints without Postman. Send GET, POST, PUT, DELETE requests with custom headers, body, and authentication. Free online API testing tool for developers.",
    path: "/tools/dev/api-tester",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ApiTesterClient />
    
      <RelatedTools currentToolUrl="/tools/dev/api-tester" />
</div>
  );
}
