import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ApiStatusClient from "@/components/tools/dev/api-status-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "API Status Monitor",
  description: "Check if popular APIs and services are reachable. Pre-loaded services: Google, GitHub, AWS, Cloudflare, Vercel, NPM. Custom URL checking. Visual status indicators.",
  path: "/tools/dev/api-status",
  keywords: ["check", "cloudflare", "custom", "vercel", "google", "reachable", "apis", "loaded", "services", "popular", "github"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/api-status`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "API Status Monitor", url: toolUrl, description: "Check API status and uptime.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "API Status Monitor", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What does this tool do?", acceptedAnswer: { "@type": "Answer", text: "It helps you check if common APIs and custom endpoints are currently reachable." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ApiStatusClient />
      <RelatedTools currentToolUrl="/tools/dev/api-status" />
</div>);
}
