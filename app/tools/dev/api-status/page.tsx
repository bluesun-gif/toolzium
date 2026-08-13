import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ApiStatusClient from "@/components/tools/dev/api-status-client";

export const metadata = buildMetadata({
  title: "API Status Monitor",
  description: "Check if popular APIs and services are reachable. Pre-loaded services: Google, GitHub, AWS, Cloudflare, Vercel, NPM. Custom URL checking. Visual status indicators.",
  path: "/tools/dev/api-status",
  keywords: ["check", "cloudflare", "custom", "vercel", "google", "reachable", "apis", "loaded", "services", "popular", "github"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "API Status Monitor",
    description: "Check if popular APIs and services are reachable. Pre-loaded services: Google, GitHub, AWS, Cloudflare, Vercel, NPM. Custom URL checking. Visual status indicators.",
    path: "/tools/dev/api-status",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ApiStatusClient />
    </div>
  );
}
