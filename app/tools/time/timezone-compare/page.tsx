import JsonLd from "@/components/seo/json-ld";
import { TimezoneCompareClient } from "@/components/tools/time/timezone-compare-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Time Zone Comparison | Toolzium",
  description: "Compare time across multiple time zones side by side.",
  path: "/tools/time/timezone-compare",
  keywords: ["timezone", "time zone compare", "time tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/timezone-compare`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Time Zone Comparison", url: toolUrl, description: "Compare time across multiple time zones side by side.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: `${siteURL}/tools#cat-time` }, { "@type": "ListItem", position: 3, name: "Time Zone Comparison", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool?", acceptedAnswer: { "@type": "Answer", text: "Compare times across time zones." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><TimezoneCompareClient /></div>);
}
