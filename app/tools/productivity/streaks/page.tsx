import JsonLd from "@/components/seo/json-ld";
import { StreaksClient } from "@/components/tools/productivity/streaks-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Habit Streak Counter | Toolzium",
  description: "Track habit streaks for daily activities.",
  path: "/tools/productivity/streaks",
  keywords: ["habit tracker", "streak counter", "productivity", "daily habits"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/streaks`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Habit Streak Counter", url: toolUrl, description: "Track habit streaks for daily activities.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Habit Streak Counter", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I use this tool?", acceptedAnswer: { "@type": "Answer", text: "Add a habit and click mark as done every day to build a streak." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><StreaksClient />
      <RelatedTools currentToolUrl="/tools/productivity/streaks" />
</div>);
}
