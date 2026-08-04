import JsonLd from "@/components/seo/json-ld";
import { VisionTestClient } from "@/components/tools/health/vision-test-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Vision Test | Toolzium",
  description: "Simple online vision screening tool.",
  path: "/tools/health/vision-test",
  keywords: ["vision", "test", "eye", "snellen", "health tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/vision-test";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Vision Test", url: toolUrl, description: "Simple online vision screening tool.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Vision Test", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool?", acceptedAnswer: { "@type": "Answer", text: "It provides a basic vision screening." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><VisionTestClient /></div>);
}
